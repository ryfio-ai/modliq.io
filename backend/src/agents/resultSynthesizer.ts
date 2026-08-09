import { AgentPlan } from './planner';
import { ToolExecutionResult } from './toolRegistry';
import { AgentContext } from './contextBuilder';

export interface SynthesizedResult {
  runId?: string;
  publicId?: string;
  mode: string;
  intent: string;
  status: 'COMPLETED' | 'WAITING_APPROVAL' | 'FAILED';
  whatChecked: string[];
  whatFound: string[];
  whatRecommended: string[];
  whatNeedsApproval: string | null;
  evidenceUsed: string[];
  toolResults: ToolExecutionResult[];
  naturalLanguageSummary: string;
}

export function synthesizeAgentResult(
  plan: AgentPlan,
  toolResults: ToolExecutionResult[],
  context: AgentContext,
  approvalId?: string
): SynthesizedResult {
  const whatChecked: string[] = [];
  const whatFound: string[] = [];
  const whatRecommended: string[] = [];
  const evidenceUsed: string[] = [];

  whatChecked.push(`Project Context: ${context.projectName || 'Active Manufacturing Session'}`);
  if (context.datasetFilename) {
    whatChecked.push(`Dataset Profile: ${context.datasetFilename} (${context.datasetRows || 0} rows)`);
    evidenceUsed.push(`Dataset Baseline: ${context.datasetFilename}`);
  }
  if (context.healthScore) {
    evidenceUsed.push(`Dataset Health Score: ${context.healthScore}/100`);
  }

  toolResults.forEach((tr) => {
    whatChecked.push(`Tool Executed: ${tr.toolName}`);
    if (tr.success && tr.data) {
      if (tr.data.topCorrelations) {
        tr.data.topCorrelations.forEach((c: any) => {
          whatFound.push(`Correlation Driver: ${c.pair} (r = ${c.score})`);
        });
      }
      if (tr.data.recommendations) {
        tr.data.recommendations.forEach((r: string) => {
          whatRecommended.push(r);
        });
      }
      if (tr.data.target && tr.data.recommendedSettings) {
        whatFound.push(`Target Objective: ${tr.data.target} (Yield gain: +${tr.data.yieldGainPct}%)`);
        Object.entries(tr.data.recommendedSettings).forEach(([k, v]) => {
          whatRecommended.push(`Set ${k} to ${v}`);
        });
        evidenceUsed.push(`XGBoost/RandomForest Setpoints for ${tr.data.target}`);
      }
      if (tr.data.cpk) {
        whatFound.push(`Process Capability Cpk = ${tr.data.cpk} (Cp = ${tr.data.cp}) - ${tr.data.status}`);
      }
      if (tr.data.oee) {
        whatFound.push(`Overall Equipment Effectiveness OEE = ${tr.data.oee}% (Availability ${tr.data.availability}%, Quality ${tr.data.quality}%)`);
      }
      if (tr.data.suppliers) {
        tr.data.suppliers.forEach((s: any) => {
          whatFound.push(`Supplier Performance: ${s.name} (Yield: ${s.yield}%, Defect Rate: ${s.defectRate}%)`);
        });
      }
      if (tr.data.capaNumber) {
        whatRecommended.push(`CAPA Draft ${tr.data.capaNumber}: ${tr.data.correctiveAction}`);
      }
      if (tr.data.passportId) {
        whatFound.push(`Quality Passport Generated: ${tr.data.passportId} (Score: ${tr.data.readinessScore})`);
      }
    }
  });

  if (whatFound.length === 0) {
    whatFound.push(`Analyzed manufacturing workspace signals for ${context.projectName || 'active session'}.`);
  }
  if (whatRecommended.length === 0) {
    whatRecommended.push('Review process stability charts and verify parameters before next production shift.');
  }

  const whatNeedsApproval = plan.requiresApproval
    ? `Human approval required for action: ${plan.approvalActionType || 'CRITICAL_ACTION'} (Approval ID: ${approvalId || 'PENDING'})`
    : null;

  const summary = `Modliq Agent completed analysis under ${plan.mode} mode.${whatNeedsApproval ? ' Awaiting your confirmation to execute critical action.' : ''}`;

  return {
    mode: plan.mode,
    intent: plan.intent,
    status: plan.requiresApproval ? 'WAITING_APPROVAL' : 'COMPLETED',
    whatChecked,
    whatFound,
    whatRecommended,
    whatNeedsApproval,
    evidenceUsed,
    toolResults,
    naturalLanguageSummary: summary,
  };
}
