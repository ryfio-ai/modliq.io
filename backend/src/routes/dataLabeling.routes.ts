import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth';
import {
  createLabelingProject,
  getLabelingProjects,
  getLabelingProjectById,
  addLabeledExample,
  updateLabeledExample,
} from '../services/dataLabeling.service';

const router = Router();

router.post('/projects/:projectId/labeling/projects', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { projectId } = req.params as Record<string, string>;
    const { name, taskType, labels } = req.body;

    const project = await createLabelingProject({
      userId,
      projectId,
      name,
      taskType: taskType || 'CLASSIFICATION',
      labels,
    });
    return res.status(201).json(project);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

router.get('/projects/:projectId/labeling/projects', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { projectId } = req.params as Record<string, string>;
    const projects = await getLabelingProjects(userId, projectId);
    return res.json(projects);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/projects/:projectId/labeling/projects/:labelingProjectId', requireAuth, async (req: Request, res: Response) => {
  try {
    const { labelingProjectId } = req.params as Record<string, string>;
    const project = await getLabelingProjectById(labelingProjectId);
    if (!project) return res.status(404).json({ error: 'Labeling project not found' });
    return res.json(project);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/projects/:projectId/labeling/projects/:labelingProjectId/examples', requireAuth, async (req: Request, res: Response) => {
  try {
    const { labelingProjectId } = req.params as Record<string, string>;
    const { input, label } = req.body;
    const example = await addLabeledExample(labelingProjectId, input, label);
    return res.status(201).json(example);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

router.patch('/projects/:projectId/labeling/examples/:exampleId', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { exampleId } = req.params as Record<string, string>;
    const { label, status } = req.body;
    const updated = await updateLabeledExample(exampleId, label, status || 'LABELED', userId);
    return res.json(updated);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});


export default router;
