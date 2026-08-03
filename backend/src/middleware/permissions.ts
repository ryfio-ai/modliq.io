import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

export function requireOrgRole(allowedRoles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId;
      const orgId = (req.params.orgId || req.query.orgId || req.body?.organizationId || (req as any).user?.defaultOrgId) as string;

      if (!userId) {
        return res.status(401).json({ success: false, error: 'Unauthorized: Authentication required' });
      }

      // Check system admin role fallback
      const systemRole = (req as any).user?.role;
      if (systemRole === 'ADMIN') {
        return next();
      }

      if (!orgId) {
        // If orgId not provided in route, check if user is a member of any organization
        const anyMembership = await prisma.organizationMember.findFirst({
          where: { userId },
        });
        if (anyMembership && allowedRoles.includes(anyMembership.role)) {
          (req as any).orgId = anyMembership.organizationId;
          (req as any).orgRole = anyMembership.role;
          return next();
        }
        return res.status(400).json({ success: false, error: 'Organization ID is required' });
      }

      const membership = await prisma.organizationMember.findFirst({
        where: { organizationId: orgId, userId, status: 'ACTIVE' },
      });

      if (!membership) {
        return res.status(403).json({ success: false, error: 'Forbidden: You are not an active member of this organization' });
      }

      if (!allowedRoles.includes(membership.role)) {
        return res.status(403).json({
          success: false,
          error: `Forbidden: Action requires one of [${allowedRoles.join(', ')}] roles. Your role: ${membership.role}`,
        });
      }

      (req as any).orgId = orgId;
      (req as any).orgRole = membership.role;
      next();
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message || 'Permission evaluation error' });
    }
  };
}

export function requireProjectAccess(projectIdParam: string = 'projectId') {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId;
      const projectId = req.params[projectIdParam] || req.body?.projectId || req.query.projectId;

      if (!userId) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
      }

      // System Admin bypass
      if ((req as any).user?.role === 'ADMIN') {
        return next();
      }

      if (!projectId) {
        return res.status(400).json({ success: false, error: 'Project ID is required' });
      }

      const project = await prisma.project.findUnique({
        where: { id: projectId as string },
      });

      if (!project) {
        return res.status(404).json({ success: false, error: 'Project not found' });
      }

      // Allow owner
      if (project.userId === userId) {
        return next();
      }

      // Allow organization members
      if (project.organizationId) {
        const membership = await prisma.organizationMember.findFirst({
          where: { organizationId: project.organizationId, userId, status: 'ACTIVE' },
        });
        if (membership) {
          (req as any).orgRole = membership.role;
          return next();
        }
      }

      return res.status(403).json({ success: false, error: 'Forbidden: No access to this project' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message || 'Project access verification failed' });
    }
  };
}

export function requirePermission(permission: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const role = (req as any).orgRole || (req as any).user?.role || 'ENGINEER';
    if (role === 'VIEWER' && (permission.includes('WRITE') || permission.includes('DELETE') || permission.includes('CREATE'))) {
      return res.status(403).json({ success: false, error: `Forbidden: Read-only VIEWER role cannot perform ${permission}` });
    }
    next();
  };
}
