import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';

const router = Router();
router.use(requireAuth);

// GET /api/v1/onboarding — Fetch onboarding state
router.get('/', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    let state = await prisma.onboardingState.findUnique({
      where: { userId },
    });

    if (!state) {
      state = await prisma.onboardingState.create({
        data: {
          userId,
          completedJson: JSON.stringify([]),
          dismissed: false,
        },
      });
    }

    res.json({
      success: true,
      data: {
        completedSteps: JSON.parse(state.completedJson || '[]'),
        dismissed: state.dismissed,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH /api/v1/onboarding — Update onboarding progress or dismiss
router.patch('/', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    const { completedStepId, dismissed } = req.body;

    let state = await prisma.onboardingState.findUnique({
      where: { userId },
    });

    let currentCompleted: string[] = state?.completedJson ? JSON.parse(state.completedJson) : [];

    if (completedStepId && !currentCompleted.includes(completedStepId)) {
      currentCompleted.push(completedStepId);
    }

    const updated = await prisma.onboardingState.upsert({
      where: { userId },
      create: {
        userId,
        completedJson: JSON.stringify(currentCompleted),
        dismissed: dismissed !== undefined ? Boolean(dismissed) : false,
      },
      update: {
        completedJson: JSON.stringify(currentCompleted),
        ...(dismissed !== undefined ? { dismissed: Boolean(dismissed) } : {}),
      },
    });

    res.json({
      success: true,
      data: {
        completedSteps: JSON.parse(updated.completedJson || '[]'),
        dismissed: updated.dismissed,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
