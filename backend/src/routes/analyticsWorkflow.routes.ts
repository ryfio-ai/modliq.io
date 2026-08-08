import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth';
import {
  executeDataQuery,
  getCleaningRecommendations,
  applyCleaningRecommendations,
  getSmartChartSuggestions,
  generateInsightNarrative,
  getKpiMapping,
  getFeatureEngineeringSuggestions,
  runAutoMlBenchmark,
  checkModelTrustAndDrift,
} from '../services/analyticsWorkflow.service';

const router = Router({ mergeParams: true });

// POST /data-query — Ask Your Factory Data
router.post('/data-query', requireAuth, async (req: Request, res: Response) => {
  const projectId = req.params.projectId as string;
  const { datasetId, question } = req.body;

  try {
    const result = await executeDataQuery(projectId, datasetId || 'demo', question);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to execute query' });
  }
});

// GET /cleaning/recommend — Data Cleaning Advisor
router.get('/datasets/:datasetId/cleaning/recommend', requireAuth, async (req: Request, res: Response) => {
  const datasetId = req.params.datasetId as string;

  try {
    const result = await getCleaningRecommendations(datasetId);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to get cleaning recommendations' });
  }
});

// POST /cleaning/apply — Apply Recommendations (Version 2)
router.post('/datasets/:datasetId/cleaning/apply', requireAuth, async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId || (req as any).user?.id;
  const projectId = req.params.projectId as string;
  const datasetId = req.params.datasetId as string;
  const { recommendationIds } = req.body;

  try {
    const result = await applyCleaningRecommendations(userId, projectId, datasetId, recommendationIds || []);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to apply cleaning recommendations' });
  }
});

// GET /charts/suggest — Smart Charts Suggestions
router.get('/datasets/:datasetId/charts/suggest', requireAuth, async (req: Request, res: Response) => {
  const datasetId = req.params.datasetId as string;

  try {
    const result = await getSmartChartSuggestions(datasetId);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to fetch chart suggestions' });
  }
});

// GET /insights/narrative — Insight Narratives
router.get('/insights/narrative', requireAuth, async (req: Request, res: Response) => {
  const projectId = req.params.projectId as string;

  try {
    const result = await generateInsightNarrative(projectId);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to generate insight narrative' });
  }
});

// GET /kpi-map — Manufacturing KPI Auto-Mapping
router.get('/datasets/:datasetId/kpi-map', requireAuth, async (req: Request, res: Response) => {
  const datasetId = req.params.datasetId as string;

  try {
    const result = await getKpiMapping(datasetId);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to fetch KPI mapping' });
  }
});

// GET /features/suggest — Feature Engineering Suggestions
router.get('/datasets/:datasetId/features/suggest', requireAuth, async (req: Request, res: Response) => {
  const datasetId = req.params.datasetId as string;

  try {
    const result = await getFeatureEngineeringSuggestions(datasetId);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to fetch feature suggestions' });
  }
});

// POST /automl/benchmark — AutoML Leaderboard
router.post('/datasets/:datasetId/automl/benchmark', requireAuth, async (req: Request, res: Response) => {
  const projectId = req.params.projectId as string;
  const datasetId = req.params.datasetId as string;
  const { targetColumn } = req.body;

  try {
    const result = await runAutoMlBenchmark(projectId, datasetId, targetColumn || 'yield');
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to run AutoML benchmark' });
  }
});

// GET /drift-check — Model Trust Monitor
router.get('/datasets/:datasetId/drift-check', requireAuth, async (req: Request, res: Response) => {
  const projectId = req.params.projectId as string;
  const datasetId = req.params.datasetId as string;

  try {
    const result = await checkModelTrustAndDrift(projectId, datasetId);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to run drift check' });
  }
});

export default router;
