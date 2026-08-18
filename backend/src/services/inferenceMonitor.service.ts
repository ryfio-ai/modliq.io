import prisma from '../lib/prisma';

export interface LogInferenceInput {
  userId?: string;
  projectId?: string;
  inferenceType: 'LLM' | 'ML' | 'RAG' | 'AGENT' | 'VOICE' | 'AUTOQA';
  provider?: string;
  model?: string;
  latencyMs?: number;
  success: boolean;
  errorCode?: string;
  metadata?: any;
}

export async function recordInferenceLog(input: LogInferenceInput) {
  return prisma.inferenceLog.create({
    data: {
      userId: input.userId || null,
      projectId: input.projectId || null,
      inferenceType: input.inferenceType,
      provider: input.provider || null,
      model: input.model || null,
      latencyMs: input.latencyMs || null,
      success: input.success,
      errorCode: input.errorCode || null,
      metadataJson: input.metadata ? JSON.stringify(input.metadata) : null,
    },
  });
}

export async function getInferenceMonitorStats(timeframeHours = 24) {
  const since = new Date(Date.now() - timeframeHours * 3600 * 1000);

  const logs = await prisma.inferenceLog.findMany({
    where: { createdAt: { gte: since } },
    orderBy: { createdAt: 'desc' },
    take: 500,
  });

  const totalCalls = logs.length;
  const successfulCalls = logs.filter((l) => l.success).length;
  const failedCalls = totalCalls - successfulCalls;
  const avgLatency =
    totalCalls > 0
      ? Math.round(logs.reduce((acc, curr) => acc + (curr.latencyMs || 0), 0) / totalCalls)
      : 0;

  const providerBreakdown: Record<string, { total: number; failed: number; avgLatency: number }> = {};

  for (const l of logs) {
    const prov = l.provider || 'internal';
    if (!providerBreakdown[prov]) {
      providerBreakdown[prov] = { total: 0, failed: 0, avgLatency: 0 };
    }
    providerBreakdown[prov].total += 1;
    if (!l.success) providerBreakdown[prov].failed += 1;
    providerBreakdown[prov].avgLatency += l.latencyMs || 0;
  }

  Object.keys(providerBreakdown).forEach((prov) => {
    if (providerBreakdown[prov].total > 0) {
      providerBreakdown[prov].avgLatency = Math.round(
        providerBreakdown[prov].avgLatency / providerBreakdown[prov].total
      );
    }
  });

  return {
    timeframeHours,
    summary: {
      totalInferences: totalCalls,
      successfulInferences: successfulCalls,
      failedInferences: failedCalls,
      successRatePct: totalCalls > 0 ? parseFloat(((successfulCalls / totalCalls) * 100).toFixed(2)) : 100.0,
      avgLatencyMs: avgLatency,
    },
    providerBreakdown,
    recentLogs: logs.slice(0, 50).map((l) => ({
      ...l,
      metadata: l.metadataJson ? JSON.parse(l.metadataJson) : null,
    })),
  };
}
