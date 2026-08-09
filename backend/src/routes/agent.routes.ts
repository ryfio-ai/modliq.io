import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth';
import prisma from '../lib/prisma';
import { runAgent } from '../agents/agentOrchestrator';
import { handleApprovalDecision } from '../agents/approvalManager';

const router = Router({ mergeParams: true });

// ── Rate Limiter Map for Agent Runs ──────────────────────────────────────────
const agentRateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkAgentRateLimit(userId: string): boolean {
  const now = Date.now();
  const userLimit = agentRateLimitMap.get(userId);

  if (!userLimit || now > userLimit.resetTime) {
    agentRateLimitMap.set(userId, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return true;
  }

  if (userLimit.count >= 10) { // 10 agent runs per minute
    return false;
  }

  userLimit.count += 1;
  return true;
}

// ── Run Modliq Agent ─────────────────────────────────────────────────────────
router.post('/agent/run', requireAuth, async (req: Request, res: Response) => {
  const userId = (req as any).user?.id || 'admin';
  const rawProjId = req.params.projectId || req.body.projectId;
  const projectId = typeof rawProjId === 'string' ? rawProjId : undefined;
  const { prompt, mode } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ success: false, error: 'Prompt is required.' });
  }

  if (!checkAgentRateLimit(userId)) {
    return res.status(429).json({
      success: false,
      error: 'Rate limit exceeded: Maximum 10 Modliq Agent runs per minute allowed.',
    });
  }

  try {
    const result = await runAgent({
      userId,
      projectId,
      prompt,
      mode,
    });
    res.json(result);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Modliq Agent run failed.',
    });
  }
});

// ── Get Agent Runs List ──────────────────────────────────────────────────────
router.get('/agent/runs', requireAuth, async (req: Request, res: Response) => {
  const userId = (req as any).user?.id || 'admin';
  const rawProjId = req.params.projectId;
  const projectId = typeof rawProjId === 'string' ? rawProjId : undefined;

  try {
    const runs = await prisma.agentRun.findMany({
      where: { userId, ...(projectId ? { projectId } : {}) },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    res.json({ success: true, runs });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to list agent runs' });
  }
});

// ── Get Single Agent Run Details ─────────────────────────────────────────────
router.get('/agent/runs/:agentRunId', requireAuth, async (req: Request, res: Response) => {
  const userId = (req as any).user?.id || 'admin';
  const rawRunId = req.params.agentRunId;
  const agentRunId = typeof rawRunId === 'string' ? rawRunId : '';

  try {
    const run = await prisma.agentRun.findFirst({
      where: {
        OR: [{ id: agentRunId }, { publicId: agentRunId }],
        userId,
      },
    });

    if (!run) {
      return res.status(404).json({ success: false, error: 'Agent run not found.' });
    }

    const tasks = await prisma.agentTask.findMany({
      where: { agentRunId: run.id },
      orderBy: { createdAt: 'asc' },
    });

    res.json({ success: true, run, tasks });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to get agent run' });
  }
});

// ── Get Pending Approvals List ───────────────────────────────────────────────
router.get('/agent/approvals', requireAuth, async (req: Request, res: Response) => {
  const userId = (req as any).user?.id || 'admin';
  const rawProjId = req.params.projectId;
  const projectId = typeof rawProjId === 'string' ? rawProjId : undefined;

  try {
    const approvals = await prisma.approvalRequest.findMany({
      where: { userId, ...(projectId ? { projectId } : {}), status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, approvals });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to list approvals' });
  }
});

// ── Approve Action Request ───────────────────────────────────────────────────
router.post('/agent/approvals/:approvalId/approve', requireAuth, async (req: Request, res: Response) => {
  const userId = (req as any).user?.id || 'admin';
  const rawApprovalId = req.params.approvalId;
  const approvalId = typeof rawApprovalId === 'string' ? rawApprovalId : '';

  try {
    const updated = await handleApprovalDecision(approvalId, userId, 'APPROVED');
    res.json({ success: true, message: 'Action approved successfully.', approval: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message || 'Failed to approve action' });
  }
});

// ── Reject Action Request ────────────────────────────────────────────────────
router.post('/agent/approvals/:approvalId/reject', requireAuth, async (req: Request, res: Response) => {
  const userId = (req as any).user?.id || 'admin';
  const rawApprovalId = req.params.approvalId;
  const approvalId = typeof rawApprovalId === 'string' ? rawApprovalId : '';

  try {
    const updated = await handleApprovalDecision(approvalId, userId, 'REJECTED');
    res.json({ success: true, message: 'Action rejected.', approval: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message || 'Failed to reject action' });
  }
});

export default router;
