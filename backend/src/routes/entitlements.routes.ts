import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { ensureUserOrganization } from '../services/orgBootstrap.service';

const router = Router();
router.use(requireAuth);

// GET /api/v1/entitlements/me — Return current plan, enabled modules, and quota summary
router.get('/me', async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    let orgId = user.defaultOrgId;

    if (!orgId) {
      const org = await ensureUserOrganization(user);
      if (org) orgId = org.id;
    }

    if (!orgId) {
      const membership = await prisma.organizationMember.findFirst({
        where: { userId: user.userId },
      });
      if (membership) orgId = membership.organizationId;
    }

    let entitlement = orgId ? await prisma.entitlement.findUnique({ where: { organizationId: orgId } }) : null;

    if (!entitlement && orgId) {
      entitlement = await prisma.entitlement.create({
        data: {
          organizationId: orgId,
          plan: 'DEMO',
          modulesJson: JSON.stringify({
            coreOptimization: true,
            qualityStudio: true,
            operations: true,
            supplyChain: true,
            lean: true,
            aiCopilot: true,
            qualityPassport: true,
            databaseConnectors: true,
            buyerShareLinks: true,
            adminConsole: true,
          }),
          limitsJson: JSON.stringify({
            projects: 10,
            datasets: 50,
            monthlyOptimizations: 200,
            monthlyAiCalls: 500,
            connectors: 10,
            passportExports: 50,
            maxUploadMb: 100,
          }),
        },
      });
    }

    const modules = entitlement?.modulesJson ? JSON.parse(entitlement.modulesJson) : {};
    const limits = entitlement?.limitsJson ? JSON.parse(entitlement.limitsJson) : {};

    // Get current 30-day usage summary
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const optimizationCount = orgId
      ? await prisma.usageEvent.count({
          where: { organizationId: orgId, eventType: 'OPTIMIZATION_STARTED', createdAt: { gte: thirtyDaysAgo } },
        })
      : 0;

    const aiCallCount = orgId
      ? await prisma.usageEvent.count({
          where: { organizationId: orgId, eventType: 'AI_CALL', createdAt: { gte: thirtyDaysAgo } },
        })
      : 0;

    res.json({
      success: true,
      data: {
        plan: entitlement?.plan || 'DEMO',
        organizationId: orgId,
        modules,
        limits,
        usage: {
          monthlyOptimizations: optimizationCount,
          monthlyAiCalls: aiCallCount,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
