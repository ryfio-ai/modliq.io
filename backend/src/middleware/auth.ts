import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../auth/jwt';
import prisma from '../lib/prisma';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  let token = '';
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.slice(7);
  } else if (req.headers.cookie) {
    const cookies = req.headers.cookie.split(';').map((c) => c.trim());
    const match = cookies.find((c) => c.startsWith('modliq_token='));
    if (match) token = match.split('=')[1];
  }

  if (!token) {
    // In local development, default to demo user if no token is provided
    if (process.env.NODE_ENV !== 'production') {
      (req as any).user = { userId: 'demo-user-static-backend', email: 'demo@modliq.com' };
      return next();
    }
    return res.status(401).json({ error: 'Missing authorization token' });
  }

  const payload = verifyJwt(token);
  if (!payload) {
    if (process.env.NODE_ENV !== 'production') {
      (req as any).user = { userId: 'demo-user-static-backend', email: 'demo@modliq.com' };
      return next();
    }
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  const effectiveUserId = payload.userId || (payload as any).id || 'demo-user-static-backend';
  (req as any).user = { ...payload, userId: effectiveUserId };

  // Auto-upsert user in DB so relations (e.g. Dataset -> User) never fail with foreign key errors
  try {
    const existing = await prisma.user.findUnique({ where: { id: effectiveUserId } });
    if (!existing) {
      await prisma.user.create({
        data: {
          id: effectiveUserId,
          email: payload.email || `${effectiveUserId}@modliq.io`,
          name: payload.name || 'Modliq User',
          role: payload.role || 'USER',
          isDemo: effectiveUserId.includes('demo') || effectiveUserId.includes('google'),
        },
      }).catch(() => {});
    }
  } catch (e) {}

  next();
}
