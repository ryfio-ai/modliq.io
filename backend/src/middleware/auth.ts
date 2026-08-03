import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../auth/jwt';

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

  (req as any).user = payload;
  next();
}
