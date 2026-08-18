import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth';
import {
  createCredentialReference,
  getCredentialReferences,
  revokeCredentialReference,
} from '../services/credentialVault.service';

const router = Router();

router.get('/projects/:projectId/credentials', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { projectId } = req.params as Record<string, string>;
    const credentials = await getCredentialReferences(userId, projectId);
    return res.json(credentials);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/projects/:projectId/credentials', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { projectId } = req.params as Record<string, string>;
    const { name, type, secret, allowedTools } = req.body;

    const cred = await createCredentialReference({
      userId,
      projectId,
      name,
      type: type || 'CONNECTOR',
      secret,
      allowedTools,
    });
    return res.status(201).json(cred);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

router.post('/projects/:projectId/credentials/:id/revoke', requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params as Record<string, string>;
    const revoked = await revokeCredentialReference(id);
    return res.json({ success: true, credential: revoked });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});


export default router;
