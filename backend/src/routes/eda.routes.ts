import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth';
import { generateEdaReport, getLatestEdaReport, exportEdaMarkdownReport } from '../services/eda.service';
import prisma from '../lib/prisma';

const router = Router({ mergeParams: true });

// POST / — Generate EDA Analysis
router.post('/', requireAuth, async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId || (req as any).user?.id;
  const projectId = req.params.projectId as string;
  const datasetId = req.params.datasetId as string;
  const { targetColumn, options } = req.body;

  try {
    const result = await generateEdaReport(userId, projectId, datasetId, targetColumn, options);
    res.status(201).json({ success: true, data: result });
  } catch (err: any) {
    console.error('[eda.routes] Failed to generate EDA report:', err);
    res.status(500).json({ success: false, error: err.message || 'Failed to generate EDA report' });
  }
});

// GET / — Get latest EDA Analysis
router.get('/', requireAuth, async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId || (req as any).user?.id;
  const datasetId = req.params.datasetId as string;

  try {
    const result = await getLatestEdaReport(userId, datasetId);
    res.json({ success: true, data: result });
  } catch (err: any) {
    console.error('[eda.routes] Failed to fetch EDA report:', err);
    res.status(500).json({ success: false, error: err.message || 'Failed to fetch EDA report' });
  }
});

// POST /export — Export Markdown Report
router.post('/export', requireAuth, async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId || (req as any).user?.id;
  const projectId = req.params.projectId as string;
  const datasetId = req.params.datasetId as string;

  try {
    const latest = await getLatestEdaReport(userId, datasetId);
    if (!latest || !latest.report) {
      return res.status(404).json({ success: false, error: 'No EDA report available to export' });
    }

    const project = await prisma.project.findUnique({ where: { id: projectId } });
    const markdownContent = exportEdaMarkdownReport(latest.report, project?.name || undefined);

    res.json({
      success: true,
      filename: `modliq-eda-report-${projectId.slice(-6)}.md`,
      content: markdownContent,
    });
  } catch (err: any) {
    console.error('[eda.routes] Failed to export EDA report:', err);
    res.status(500).json({ success: false, error: err.message || 'Failed to export EDA report' });
  }
});

export default router;
