import prisma from '../lib/prisma';
import { generatePublicId } from '../services/publicId.service';
import { logAuditEvent } from '../services/audit.service';

export interface CreateApprovalInput {
  userId: string;
  projectId?: string;
  agentRunId?: string;
  actionType: string;
  payload: Record<string, any>;
}

export async function createApprovalRequest(input: CreateApprovalInput) {
  const publicId = await generatePublicId('APPROVAL');

  const approval = await prisma.approvalRequest.create({
    data: {
      publicId,
      userId: input.userId,
      projectId: input.projectId,
      agentRunId: input.agentRunId,
      actionType: input.actionType,
      payloadJson: JSON.stringify(input.payload),
      status: 'PENDING',
    },
  });

  return approval;
}

export async function handleApprovalDecision(
  approvalId: string,
  userId: string,
  decision: 'APPROVED' | 'REJECTED'
) {
  const approval = await prisma.approvalRequest.findFirst({
    where: {
      OR: [{ id: approvalId }, { publicId: approvalId }],
      userId,
    },
  });

  if (!approval) {
    throw new Error('Approval request not found or unauthorized.');
  }

  if (approval.status !== 'PENDING') {
    throw new Error(`Approval request has already been ${approval.status.toLowerCase()}.`);
  }

  const updated = await prisma.approvalRequest.update({
    where: { id: approval.id },
    data: {
      status: decision,
      approvedAt: decision === 'APPROVED' ? new Date() : null,
    },
  });

  await logAuditEvent({
    userId,
    projectId: approval.projectId || undefined,
    action: decision === 'APPROVED' ? 'AGENT_APPROVAL_APPROVED' : 'AGENT_APPROVAL_REJECTED',
    entityType: 'APPROVAL_REQUEST',
    entityId: approval.id,
    metadata: { actionType: approval.actionType, decision },
  });

  // If approved, update associated AgentRun status if present
  if (approval.agentRunId) {
    await prisma.agentRun.update({
      where: { id: approval.agentRunId },
      data: {
        status: decision === 'APPROVED' ? 'RUNNING' : 'CANCELLED',
      },
    }).catch(() => {});
  }

  return updated;
}
