import { Request, Response, NextFunction } from 'express';
import { requireAuth } from './auth';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  return requireAuth(req, res, next);
};
