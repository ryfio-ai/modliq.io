import { Router, Request, Response } from 'express';
import { requireAuth, requireAdmin } from '../middleware/auth';
import { getInferenceMonitorStats, recordInferenceLog } from '../services/inferenceMonitor.service';

const router = Router();

router.get('/admin/ai-stack/inference-monitor', requireAuth, requireAdmin, async (req: Request, res: Response) => {
  try {
    const timeframe = req.query.hours ? parseInt(req.query.hours as string, 10) : 24;
    const stats = await getInferenceMonitorStats(timeframe);
    return res.json(stats);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/ai-stack/inference-log', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { projectId, inferenceType, provider, model, latencyMs, success, errorCode, metadata } = req.body;

    const log = await recordInferenceLog({
      userId,
      projectId,
      inferenceType: inferenceType || 'LLM',
      provider,
      model,
      latencyMs,
      success: success ?? true,
      errorCode,
      metadata,
    });

    return res.status(201).json(log);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

export default router;
