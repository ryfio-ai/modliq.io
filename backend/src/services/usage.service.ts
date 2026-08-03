import { prisma } from '../lib/prisma';

export interface UsageEventPayload {
  userId?: string;
  organizationId?: string;
  projectId?: string;
  eventType: string;
  quantity?: number;
  metadata?: Record<string, any>;
}

export async function trackUsage(payload: UsageEventPayload) {
  try {
    return await prisma.usageEvent.create({
      data: {
        userId: payload.userId,
        organizationId: payload.organizationId,
        projectId: payload.projectId,
        eventType: payload.eventType,
        quantity: payload.quantity || 1,
        metadataJson: payload.metadata ? JSON.stringify(payload.metadata) : null,
      },
    });
  } catch (error) {
    console.error('Failed to record usage event:', error);
    return null;
  }
}

export async function checkQuota(organizationId: string, eventType: string): Promise<{ allowed: boolean; reason?: string }> {
  try {
    if (!organizationId) return { allowed: true };

    const entitlement = await prisma.entitlement.findUnique({
      where: { organizationId },
    });

    if (!entitlement) return { allowed: true };

    const limits = entitlement.limitsJson ? JSON.parse(entitlement.limitsJson) : {};
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    if (eventType === 'OPTIMIZATION_STARTED' && limits.monthlyOptimizations) {
      const count = await prisma.usageEvent.count({
        where: {
          organizationId,
          eventType: 'OPTIMIZATION_STARTED',
          createdAt: { gte: thirtyDaysAgo },
        },
      });
      if (count >= limits.monthlyOptimizations) {
        return { allowed: false, reason: `Monthly optimization limit reached (${limits.monthlyOptimizations})` };
      }
    }

    if (eventType === 'AI_CALL' && limits.monthlyAiCalls) {
      const count = await prisma.usageEvent.count({
        where: {
          organizationId,
          eventType: 'AI_CALL',
          createdAt: { gte: thirtyDaysAgo },
        },
      });
      if (count >= limits.monthlyAiCalls) {
        return { allowed: false, reason: `Monthly AI interaction limit reached (${limits.monthlyAiCalls})` };
      }
    }

    return { allowed: true };
  } catch (error) {
    return { allowed: true };
  }
}
