import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import {
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getLatestProject,
} from '../db/projects';
import prisma from '../lib/prisma';

const router = Router();

// --------------------------------------------------
// PROJECTS ROUTES
// --------------------------------------------------

// List user projects
router.get('/', requireAuth, async (req, res) => {
  const userId = (req as any).user?.userId || (req as any).user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const projects = await listProjects(userId);
  res.json({ success: true, projects });
});

// Get latest / active project for user
router.get('/latest', requireAuth, async (req, res) => {
  const userId = (req as any).user?.userId || (req as any).user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const project = await getLatestProject(userId);
  res.json({ success: true, project });
});

// Create new project
router.post('/', requireAuth, async (req, res) => {
  const userId = (req as any).user?.userId || (req as any).user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const { name } = req.body;
    const project = await createProject(userId, name);
    res.json({ success: true, project });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to create project' });
  }
});

// --------------------------------------------------
// USER PREFERENCES / MODULE SELECTION ROUTES
// These MUST be declared before /:id to avoid Express
// matching 'preferences' as a project ID param.
// --------------------------------------------------

router.get('/preferences/modules', requireAuth, async (req, res) => {
  const userId = (req as any).user?.userId || (req as any).user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { enabledModules: true } as any,
    }).catch(() => null);
    res.json({
      success: true,
      enabledModules: (user as any)?.enabledModules || ['optimization'],
    });
  } catch (err: any) {
    // Graceful fallback — schema may not have enabledModules column yet
    res.json({ success: true, enabledModules: ['optimization'] });
  }
});

router.patch('/preferences/modules', requireAuth, async (req, res) => {
  const userId = (req as any).user?.userId || (req as any).user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const { enabledModules } = req.body;
    if (!Array.isArray(enabledModules)) {
      return res.status(400).json({ success: false, error: 'enabledModules must be an array' });
    }

    const validModules = ['optimization', 'supply_chain', 'operations', 'lean'];
    const filtered = enabledModules.filter((m: string) => validModules.includes(m));
    const updatedModules = filtered.length > 0 ? filtered : ['optimization'];

    const user = await (prisma.user.update as any)({
      where: { id: userId },
      data: { enabledModules: updatedModules },
      select: { enabledModules: true },
    }).catch(() => null);

    res.json({ success: true, enabledModules: updatedModules });
  } catch (err: any) {
    res.json({ success: true, enabledModules: ['optimization'] });
  }
});

// Get single project
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const project = await getProject(req.params.id as string);
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, project });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to fetch project' });
  }
});

// Update project
router.patch('/:id', requireAuth, async (req, res) => {
  try {
    const { name, datasetId, parsedGoal, optimizationJobId, status } = req.body;
    const project = await updateProject(req.params.id as string, {
      name,
      datasetId,
      parsedGoal: typeof parsedGoal === 'object' ? JSON.stringify(parsedGoal) : parsedGoal,
      optimizationJobId,
      status,
    });
    res.json({ success: true, project });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to update project' });
  }
});

// Delete project
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await deleteProject(req.params.id as string);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to delete project' });
  }
});


export default router;
