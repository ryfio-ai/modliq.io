import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth';
import { exportFineTuneDataset, getFineTuneDatasets } from '../services/fineTuning.service';

const router = Router();

router.post('/projects/:projectId/fine-tuning/export', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { projectId } = req.params as Record<string, string>;
    const { labelingProjectId, format, systemPrompt } = req.body;

    const dataset = await exportFineTuneDataset({
      userId,
      projectId,
      labelingProjectId,
      format: format || 'OPENAI_CHAT_JSONL',
      systemPrompt,
    });

    return res.status(201).json(dataset);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

router.get('/projects/:projectId/fine-tuning/exports', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { projectId } = req.params as Record<string, string>;
    const exports = await getFineTuneDatasets(userId, projectId);
    return res.json(exports);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});


export default router;
