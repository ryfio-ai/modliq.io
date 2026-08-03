import { Request, Response, NextFunction } from 'express';

export function requireRole(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).user?.role || 'EDITOR';
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        error: `Forbidden: Action requires one of [${allowedRoles.join(', ')}] roles. Current role: ${userRole}`,
      });
    }
    next();
  };
}
