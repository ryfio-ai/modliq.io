import prisma from '../lib/prisma';

export async function getAgentRunsHistory(userId?: string, projectId?: string) {
  const toolCalls = await prisma.toolCallLog.findMany({
    where: {
      ...(userId ? { userId } : {}),
      ...(projectId ? { projectId } : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  const pendingApprovals = await prisma.approvalRequest.findMany({
    where: {
      ...(userId ? { userId } : {}),
      ...(projectId ? { projectId } : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return {
    totalToolCalls: toolCalls.length,
    totalPendingApprovals: pendingApprovals.filter((a: any) => a.status === 'PENDING').length,
    recentToolCalls: toolCalls.map((t: any) => ({
      ...t,
      metadata: t.metadataJson ? JSON.parse(t.metadataJson) : null,
    })),
    approvals: pendingApprovals.map((a: any) => ({
      ...a,
      payload: JSON.parse(a.payloadJson),
    })),
  };
}

export async function getAgentRunDetails(agentRunId: string) {
  const toolCalls = await prisma.toolCallLog.findMany({
    where: { agentRunId },
    orderBy: { createdAt: 'asc' },
  });

  const approvals = await prisma.approvalRequest.findMany({
    where: { agentRunId },
    orderBy: { createdAt: 'asc' },
  });

  return {
    agentRunId,
    toolCalls: toolCalls.map((t: any) => ({
      ...t,
      metadata: t.metadataJson ? JSON.parse(t.metadataJson) : null,
    })),
    approvals: approvals.map((a: any) => ({
      ...a,
      payload: JSON.parse(a.payloadJson),
    })),
  };
}
