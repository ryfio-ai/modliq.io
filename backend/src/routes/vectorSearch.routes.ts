import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth';
import {
  createVectorCollection,
  getVectorCollections,
  queryVectorSearch,
} from '../services/vectorSearch.service';

const router = Router();

router.post('/projects/:projectId/vector/collections', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { projectId } = req.params as Record<string, string>;
    const { name, collectionName } = req.body;

    const collection = await createVectorCollection({
      userId,
      projectId,
      name,
      collectionName,
    });
    return res.status(201).json(collection);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

router.get('/projects/:projectId/vector/collections', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { projectId } = req.params as Record<string, string>;
    const collections = await getVectorCollections(userId, projectId);
    return res.json(collections);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});


router.post('/projects/:projectId/vector/query', requireAuth, async (req: Request, res: Response) => {
  try {
    const { collectionName, queryText, limit } = req.body;
    const searchResults = await queryVectorSearch(collectionName || 'modliq_docs', queryText, limit || 5);
    return res.json(searchResults);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
