import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import {
  getRecommendedCharts,
  previewChart,
  saveChart,
  getSavedCharts,
  deleteSavedChart,
} from '../services/chart.service';

const router = Router({ mergeParams: true });

/**
 * GET /api/v1/projects/:projectId/datasets/:datasetId/charts/recommend
 * Auto-generate recommended charts for dataset
 */
router.get('/recommend', authMiddleware, async (req: Request, res: Response) => {
  const datasetId = req.params.datasetId as string;
  try {
    const result = await getRecommendedCharts(datasetId);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to generate recommendations' });
  }
});

/**
 * POST /api/v1/projects/:projectId/datasets/:datasetId/charts/preview
 * Generate chart-ready data preview
 */
router.post('/preview', authMiddleware, async (req: Request, res: Response) => {
  const datasetId = req.params.datasetId as string;
  const config = req.body;

  try {
    const result = await previewChart(datasetId, config);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to preview chart' });
  }
});

/**
 * POST /api/v1/projects/:projectId/datasets/:datasetId/charts/save
 * Save chart to project
 */
router.post('/save', authMiddleware, async (req: Request, res: Response) => {
  const userId = (req as any).user?.id || 'demo_user';
  const projectId = req.params.projectId as string;
  const datasetId = req.params.datasetId as string;
  const { title, chartType, config, source } = req.body;

  try {
    const result = await saveChart(userId, projectId, datasetId, title, chartType, config, source);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to save chart' });
  }
});

/**
 * GET /api/v1/projects/:projectId/datasets/:datasetId/charts
 * List saved charts for project
 */
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  const userId = (req as any).user?.id || 'demo_user';
  const projectId = req.params.projectId as string;

  try {
    const result = await getSavedCharts(userId, projectId);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to fetch saved charts' });
  }
});

/**
 * DELETE /api/v1/projects/:projectId/datasets/:datasetId/charts/:chartId
 * Delete saved chart
 */
router.delete('/:chartId', authMiddleware, async (req: Request, res: Response) => {
  const userId = (req as any).user?.id || 'demo_user';
  const chartId = req.params.chartId as string;

  try {
    const result = await deleteSavedChart(userId, chartId);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to delete chart' });
  }
});

/**
 * POST /api/v1/projects/:projectId/datasets/:datasetId/charts/export
 * Export chart summary for Quality Passport or external reports
 */
router.post('/export', authMiddleware, async (req: Request, res: Response) => {
  const datasetId = req.params.datasetId as string;
  const { chartType, config, format } = req.body;

  try {
    const preview = await previewChart(datasetId, config);
    res.json({
      success: true,
      exportFormat: format || 'json',
      chartTitle: preview.title,
      chartType: preview.chartType,
      insight: preview.insight,
      dataSummary: preview.data.slice(0, 50),
      config: preview.config,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to export chart' });
  }
});

export default router;
