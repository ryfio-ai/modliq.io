import { prisma } from '../lib/prisma';

export interface NotificationPayload {
  userId: string;
  organizationId?: string;
  projectId?: string;
  type: string;
  title: string;
  message: string;
  severity?: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  actionUrl?: string;
}

export async function createNotification(payload: NotificationPayload) {
  try {
    return await prisma.notification.create({
      data: {
        userId: payload.userId,
        organizationId: payload.organizationId,
        projectId: payload.projectId,
        type: payload.type,
        title: payload.title,
        message: payload.message,
        severity: payload.severity || 'INFO',
        actionUrl: payload.actionUrl,
      },
    });
  } catch (error) {
    console.error('Failed to create notification:', error);
    return null;
  }
}
