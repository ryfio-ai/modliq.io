import prisma from '../lib/prisma';
import { generatePublicId } from '../services/publicId.service';
import { validateUserPrompt, sanitizeAgentOutput } from './agentGuardrails';
import { buildAgentContext, AgentContext } from './contextBuilder';
import { classifyUserPrompt, AgentMode } from './intentClassifier';
import { planAgentExecution, AgentPlan } from './planner';
import { executeAgentTool, ToolExecutionResult } from './toolRegistry';
import { createApprovalRequest } from './approvalManager';
import { synthesizeAgentResult, SynthesizedResult } from './resultSynthesizer';

export interface RunAgentInput {
  userId: string;
  projectId?: string;
  prompt: string;
  mode?: string;
}

export interface AgentRunResponse {
  success: boolean;
  agentRunId: string;
  publicId?: string;
  mode: AgentMode;
  status: 'COMPLETED' | 'WAITING_APPROVAL' | 'FAILED';
  approvalId?: string;
  approvalPublicId?: string;
  plan: AgentPlan;
  result: SynthesizedResult;
  error?: string;
}

export async function runAgent(input: RunAgentInput): Promise<AgentRunResponse> {
  const { userId, projectId, prompt, mode: requestedMode } = input;

  // 1. Guardrail Validation
  const validation = validateUserPrompt(prompt);
  if (!validation.safe) {
    throw new Error(validation.warning || 'Security Guardrail violation.');
  }

  // 2. Build Context
  const context = await buildAgentContext(userId, projectId);

  // 3. Classify Intent
  const intent = classifyUserPrompt(prompt, requestedMode);

  // 4. Create Plan
  const plan = planAgentExecution(intent, context, prompt);

  // 5. Generate Public ID & Create AgentRun in DB
  const publicId = await generatePublicId('AGENT');
  const agentRun = await prisma.agentRun.create({
    data: {
      publicId,
      userId,
      projectId: context.projectId,
      mode: intent.mode,
      userPrompt: prompt,
      status: plan.requiresApproval ? 'WAITING_APPROVAL' : 'RUNNING',
      planJson: JSON.stringify(plan),
    },
  });

  plan.runId = agentRun.id;

  const toolResults: ToolExecutionResult[] = [];
  let approvalId: string | undefined = undefined;
  let approvalPublicId: string | undefined = undefined;

  // 6. Tool Execution
  for (const task of plan.tasks) {
    if (task.requiresApproval) {
      // Create Approval Request
      const approval = await createApprovalRequest({
        userId,
        projectId: context.projectId,
        agentRunId: agentRun.id,
        actionType: task.actionType || 'CRITICAL_ACTION',
        payload: {
          prompt,
          mode: intent.mode,
          toolName: task.toolName,
          target: context.datasetColumns?.[0] || 'Yield',
          suggestedAction: task.description,
        },
      });

      approvalId = approval.id;
      approvalPublicId = approval.publicId || undefined;

      await prisma.agentTask.create({
        data: {
          agentRunId: agentRun.id,
          toolName: task.toolName,
          status: 'PENDING',
          inputJson: JSON.stringify(task.input),
        },
      });
      break; // Stop execution until human approves
    }

    // Execute Read-Only Tool
    const result = await executeAgentTool(task.toolName, task.input, context);
    toolResults.push(result);

    await prisma.agentTask.create({
      data: {
        agentRunId: agentRun.id,
        toolName: task.toolName,
        status: result.success ? 'COMPLETED' : 'FAILED',
        inputJson: JSON.stringify(task.input),
        outputJson: JSON.stringify(result.data),
        error: result.error,
      },
    });
  }

  // 7. Synthesize Result
  const synthesized = synthesizeAgentResult(plan, toolResults, context, approvalPublicId || approvalId);
  synthesized.runId = agentRun.id;
  synthesized.publicId = publicId;

  const finalStatus = plan.requiresApproval ? 'WAITING_APPROVAL' : 'COMPLETED';

  // 8. Update AgentRun record
  await prisma.agentRun.update({
    where: { id: agentRun.id },
    data: {
      status: finalStatus,
      resultJson: JSON.stringify(sanitizeAgentOutput(synthesized)),
    },
  });

  return {
    success: true,
    agentRunId: agentRun.id,
    publicId,
    mode: intent.mode,
    status: finalStatus,
    approvalId: approvalPublicId || approvalId,
    approvalPublicId,
    plan,
    result: synthesized,
  };
}
