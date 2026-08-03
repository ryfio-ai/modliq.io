import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { requireProjectAccess } from '../middleware/permissions';
import { runGoalCrosscheck } from '../services/goalCrosscheck.service';
import { getTemplatesForDatasetColumns, MODLIQ_TEMPLATES } from '../data/templates';
import { logAuditEvent } from '../services/audit.service';

const router = Router({ mergeParams: true });
router.use(requireAuth);

// POST /api/v1/projects/:projectId/goal/crosscheck
router.post('/crosscheck', requireProjectAccess('projectId'), async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId as string;
    const userId = (req as any).user?.userId;
    const { datasetId, parsedGoal } = req.body;

    if (!parsedGoal || !parsedGoal.target) {
      return res.status(400).json({ success: false, error: 'parsedGoal object with a target variable is required' });
    }

    // Fetch dataset details if datasetId provided
    let datasetColumns: string[] = [];
    let healthReport: any = null;

    if (datasetId) {
      const dataset = await prisma.dataset.findUnique({
        where: { id: datasetId },
      });
      if (dataset) {
        if (dataset.columnsJson) {
          try {
            datasetColumns = JSON.parse(dataset.columnsJson);
          } catch {
            // Ignore
          }
        }
        if ((dataset as any).healthReportJson || (dataset as any).summaryJson) {
          try {
            healthReport = JSON.parse((dataset as any).healthReportJson || (dataset as any).summaryJson);
          } catch {
            // Ignore
          }
        }
      }
    } else {
      // Find latest dataset for project
      const latestDs = await prisma.dataset.findFirst({
        where: { projectId },
        orderBy: { createdAt: 'desc' },
      });
      if (latestDs) {
        if (latestDs.columnsJson) {
          try {
            datasetColumns = JSON.parse(latestDs.columnsJson);
          } catch {
            // Ignore
          }
        }
        if ((latestDs as any).healthReportJson || (latestDs as any).summaryJson) {
          try {
            healthReport = JSON.parse((latestDs as any).healthReportJson || (latestDs as any).summaryJson);
          } catch {
            // Ignore
          }
        }
      }
    }

    const review = runGoalCrosscheck({
      parsedGoal,
      datasetColumns,
      healthReport,
    });

    // Create GoalReview record in DRAFT status
    const goalReview = await prisma.goalReview.create({
      data: {
        userId,
        projectId,
        datasetId: datasetId || null,
        parsedGoalJson: JSON.stringify(parsedGoal),
        reviewJson: JSON.stringify(review),
        status: 'DRAFT',
      },
    });

    await logAuditEvent({
      userId,
      projectId,
      action: 'GOAL_CROSSCHECKED',
      entityType: 'GOAL_REVIEW',
      entityId: goalReview.id,
      metadata: { target: review.target, warningsCount: review.warnings.length },
    });

    res.json({
      success: true,
      goalReviewId: goalReview.id,
      review,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/v1/projects/:projectId/goal/confirm
router.post('/confirm', requireProjectAccess('projectId'), async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId as string;
    const userId = (req as any).user?.userId;
    const { goalReviewId, confirmed, safetyAcknowledged } = req.body;

    if (!safetyAcknowledged) {
      return res.status(400).json({
        success: false,
        error: 'Safety acknowledgement is required before running optimization.',
      });
    }

    if (!confirmed || !confirmed.target || !confirmed.features || confirmed.features.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Confirmed configuration must include target variable and at least one controllable feature.',
      });
    }

    let existingId = goalReviewId;
    if (!existingId) {
      // Find latest draft for project
      const latestDraft = await prisma.goalReview.findFirst({
        where: { projectId, userId, status: 'DRAFT' },
        orderBy: { createdAt: 'desc' },
      });
      if (latestDraft) {
        existingId = latestDraft.id;
      }
    }

    let updatedReview;

    if (existingId) {
      updatedReview = await prisma.goalReview.update({
        where: { id: existingId },
        data: {
          confirmedJson: JSON.stringify(confirmed),
          status: 'CONFIRMED',
          safetyAcknowledgedAt: new Date(),
        },
      });
    } else {
      updatedReview = await prisma.goalReview.create({
        data: {
          userId,
          projectId,
          parsedGoalJson: JSON.stringify(confirmed),
          reviewJson: JSON.stringify({ target: confirmed.target, controllableFeatures: confirmed.features }),
          confirmedJson: JSON.stringify(confirmed),
          status: 'CONFIRMED',
          safetyAcknowledgedAt: new Date(),
        },
      });
    }

    // Also update project setup if confirmed
    await prisma.project.update({
      where: { id: projectId },
      data: {
        status: 'setup_confirmed',
      },
    });

    await logAuditEvent({
      userId,
      projectId,
      action: 'GOAL_REVIEW_CONFIRMED',
      entityType: 'GOAL_REVIEW',
      entityId: updatedReview.id,
      metadata: { target: confirmed.target, featuresCount: confirmed.features.length },
    });

    res.json({
      success: true,
      message: 'Optimization setup confirmed successfully',
      data: {
        goalReviewId: updatedReview.id,
        status: updatedReview.status,
        safetyAcknowledgedAt: updatedReview.safetyAcknowledgedAt,
        confirmed,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/v1/projects/:projectId/goal/confirmed
router.get('/confirmed', requireProjectAccess('projectId'), async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId as string;

    const confirmedReview = await prisma.goalReview.findFirst({
      where: { projectId, status: 'CONFIRMED' },
      orderBy: { updatedAt: 'desc' },
    });

    if (!confirmedReview || !confirmedReview.confirmedJson) {
      return res.json({ success: true, confirmed: null, message: 'No confirmed goal review found for this project.' });
    }

    res.json({
      success: true,
      data: {
        id: confirmedReview.id,
        status: confirmedReview.status,
        safetyAcknowledgedAt: confirmedReview.safetyAcknowledgedAt,
        confirmed: JSON.parse(confirmedReview.confirmedJson),
        createdAt: confirmedReview.createdAt,
        updatedAt: confirmedReview.updatedAt,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/v1/projects/:projectId/templates/recommended
router.get('/templates/recommended', requireProjectAccess('projectId'), async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId as string;

    // Get project's latest dataset columns
    const latestDs = await prisma.dataset.findFirst({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
    });

    let columns: string[] = [];
    if (latestDs && latestDs.columnsJson) {
      try {
        columns = JSON.parse(latestDs.columnsJson);
      } catch {
        // Ignore
      }
    }

    const templates = columns.length > 0 ? getTemplatesForDatasetColumns(columns) : MODLIQ_TEMPLATES;

    res.json({
      success: true,
      templates,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
