import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth';
import {
  runEvaluationSuite,
  getEvaluationRuns,
  getEvaluationRunById,
} from '../services/evaluationStudio.service';

const router = Router();

router.post('/projects/:projectId/evals/run', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { projectId } = req.params as Record<string, string>;
    const { evalType, testCases } = req.body;

    const run = await runEvaluationSuite({
      userId,
      projectId,
      evalType: evalType || 'RAG',
      testCases: testCases || [
        { input: { query: 'What is the tolerance limit for batch yield?' }, expected: { minCpk: 1.33 } },
      ],
    });

    return res.status(201).json(run);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

router.get('/projects/:projectId/evals', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { projectId } = req.params as Record<string, string>;
    const runs = await getEvaluationRuns(userId, projectId);
    return res.json(runs);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/projects/:projectId/evals/:evalRunId', requireAuth, async (req: Request, res: Response) => {
  try {
    const { evalRunId } = req.params as Record<string, string>;
    const details = await getEvaluationRunById(evalRunId);
    if (!details) return res.status(404).json({ error: 'Evaluation run not found' });
    return res.json(details);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});


export default router;
