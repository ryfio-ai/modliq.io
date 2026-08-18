import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth';
import { getAgentRunsHistory, getAgentRunDetails } from '../services/agentRunManager.service';

const router = Router();

router.get('/projects/:projectId/agents/runs', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { projectId } = req.params as Record<string, string>;
    const runs = await getAgentRunsHistory(userId, projectId);
    return res.json(runs);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/projects/:projectId/agents/runs/:runId', requireAuth, async (req: Request, res: Response) => {
  try {
    const { runId } = req.params as Record<string, string>;
    const details = await getAgentRunDetails(runId);
    return res.json(details);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});


router.get('/admin/ai-stack/agent-runs', requireAuth, async (_req: Request, res: Response) => {
  try {
    const runs = await getAgentRunsHistory();
    return res.json(runs);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
