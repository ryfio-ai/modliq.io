import { Router, Request, Response } from 'express';
import axios from 'axios';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { logAuditEvent } from '../services/audit.service';

const router = Router();
router.use(requireAuth);

// Admin RBAC Guard
const requireAdmin = (req: Request, res: Response, next: () => void) => {
  const userRole = (req as any).user?.role;
  if (userRole !== 'ADMIN') {
    return res.status(403).json({ success: false, error: 'Forbidden: Admin access required' });
  }
  next();
};

router.use(requireAdmin);

// GET /api/v1/admin/summary — Platform metrics summary
router.get('/summary', async (req: Request, res: Response) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalOrgs = await prisma.organization.count();
    const totalProjects = await prisma.project.count();
    const totalDatasets = await prisma.dataset.count();
    const totalJobs = await prisma.optimizationJob.count();
    const failedJobs = await prisma.optimizationJob.count({ where: { status: 'failed' } });
    const passportCount = await prisma.qualityPassport.count();
    const activeShareLinks = await prisma.shareLink.count({ where: { revoked: false } });
    const openTickets = await prisma.supportTicket.count({ where: { status: 'OPEN' } });

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const aiCallCount = await prisma.usageEvent.count({
      where: { eventType: 'AI_CALL', createdAt: { gte: thirtyDaysAgo } },
    });

    res.json({
      success: true,
      data: {
        totalUsers,
        totalOrganizations: totalOrgs,
        totalProjects,
        totalDatasets,
        totalOptimizationJobs: totalJobs,
        failedOptimizationJobs: failedJobs,
        qualityPassports: passportCount,
        activeShareLinks,
        openSupportTickets: openTickets,
        monthlyAiCalls: aiCallCount,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/v1/admin/users — List platform users
router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isDemo: true,
        defaultOrgId: true,
        updatedAt: true,
      },
    });
    res.json({ success: true, data: users });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH /api/v1/admin/users/:userId — Update user role or status
router.patch('/users/:userId', async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as string;
    const { role } = req.body;
    const adminId = (req as any).user?.userId;

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { ...(role ? { role } : {}) },
      select: { id: true, email: true, role: true },
    });

    await logAuditEvent({
      userId: adminId,
      action: 'ADMIN_CHANGED_ROLE',
      entityType: 'USER',
      entityId: userId,
      metadata: { newRole: role },
    });

    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/v1/admin/organizations — List organizations
router.get('/organizations', async (req: Request, res: Response) => {
  try {
    const orgs = await prisma.organization.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: orgs });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/v1/admin/projects — List projects
router.get('/projects', async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    res.json({ success: true, data: projects });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/v1/admin/datasets — List datasets
router.get('/datasets', async (req: Request, res: Response) => {
  try {
    const datasets = await prisma.dataset.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    res.json({ success: true, data: datasets });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/v1/admin/jobs — List optimization & import jobs
router.get('/jobs', async (req: Request, res: Response) => {
  try {
    const jobs = await prisma.optimizationJob.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    res.json({ success: true, data: jobs });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/v1/admin/ai/provider-health — Multi-provider AI health matrix
router.get('/ai/provider-health', async (req: Request, res: Response) => {
  const providers = [
    { name: 'Groq', envKey: 'GROQ_API_KEY', configured: Boolean(process.env.GROQ_API_KEY) },
    { name: 'Google Gemini', envKey: 'GEMINI_API_KEY', configured: Boolean(process.env.GEMINI_API_KEY) },
    { name: 'NVIDIA NIM', envKey: 'NVIDIA_API_KEY', configured: Boolean(process.env.NVIDIA_API_KEY) },
    { name: 'Cohere', envKey: 'COHERE_API_KEY', configured: Boolean(process.env.COHERE_API_KEY) },
    { name: 'Cloudflare Workers AI', envKey: 'CLOUDFLARE_API_TOKEN', configured: Boolean(process.env.CLOUDFLARE_API_TOKEN) },
    { name: 'OpenRouter', envKey: 'OPENROUTER_API_KEY', configured: Boolean(process.env.OPENROUTER_API_KEY) },
  ];

  res.json({
    success: true,
    data: {
      providerMode: process.env.LLM_PROVIDER || 'auto',
      failoverOrder: ['Groq', 'Gemini', 'NVIDIA', 'Cohere', 'Cloudflare', 'OpenRouter'],
      providers,
    },
  });
});

// GET /api/v1/admin/system — Platform system status & component health
router.get('/system', async (req: Request, res: Response) => {
  try {
    const mlEngineUrl = process.env.ML_ENGINE_URL || 'http://localhost:8000';
    let mlHealth = 'offline';

    try {
      const resp = await axios.get(`${mlEngineUrl}/health`, { timeout: 3000 });
      if (resp.status === 200) mlHealth = 'healthy';
    } catch {
      mlHealth = 'degraded_fallback';
    }

    res.json({
      success: true,
      data: {
        backendVersion: '2.0.0',
        nodeEnv: process.env.NODE_ENV || 'development',
        databaseStatus: 'connected',
        mlEngineHealth: mlHealth,
        mlEngineUrl,
        redisQueueStatus: process.env.REDIS_URL ? 'configured' : 'in_memory_fallback',
        clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
        uptimeSeconds: Math.floor(process.uptime()),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/v1/admin/usage — Usage events log
router.get('/usage', async (req: Request, res: Response) => {
  try {
    const events = await prisma.usageEvent.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    res.json({ success: true, data: events });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/v1/admin/support/tickets — Admin support tickets view
router.get('/support/tickets', async (req: Request, res: Response) => {
  try {
    const tickets = await prisma.supportTicket.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: tickets });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH /api/v1/admin/support/tickets/:id — Update ticket status/response
router.patch('/support/tickets/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { status, adminResponse } = req.body;

    const updated = await prisma.supportTicket.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(adminResponse !== undefined ? { adminResponse } : {}),
      },
    });

    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/v1/admin/audit-logs — Security audit trails
router.get('/audit-logs', async (req: Request, res: Response) => {
  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    res.json({ success: true, data: logs });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
