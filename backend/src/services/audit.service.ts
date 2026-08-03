import { prisma } from '../lib/prisma';

export interface AuditLogPayload {
  userId?: string;
  actorId?: string;
  organizationId?: string;
  projectId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: Record<string, any>;
}

export async function logAuditEvent(payload: AuditLogPayload) {
  try {
    return await prisma.auditLog.create({
      data: {
        userId: payload.userId,
        actorId: payload.actorId || payload.userId,
        organizationId: payload.organizationId,
        projectId: payload.projectId,
        action: payload.action,
        entityType: payload.entityType,
        entityId: payload.entityId,
        metadataJson: payload.metadata ? JSON.stringify(payload.metadata) : null,
      },
    });
  } catch (error) {
    console.error('Failed to log audit event:', error);
    return null;
  }
}
