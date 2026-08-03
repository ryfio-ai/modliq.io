import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { logAuditEvent } from '../services/audit.service';

const router = Router();
router.use(requireAuth);

// GET /api/v1/account/export — Download user data export (JSON payload)
router.get('/export', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true, updatedAt: true },
    });

    const orgMemberships = await prisma.organizationMember.findMany({
      where: { userId },
    });

    const projects = await prisma.project.findMany({
      where: { userId },
      select: { id: true, name: true, status: true, parsedGoal: true, createdAt: true },
    });

    const datasets = await prisma.dataset.findMany({
      where: { userId },
      select: { id: true, filename: true, originalName: true, totalRows: true, totalColumns: true, healthScore: true, createdAt: true },
    });

    const passports = await prisma.qualityPassport.findMany({
      where: { userId },
      select: { id: true, projectId: true, title: true, auditScore: true, readinessStatus: true, createdAt: true },
    });

    const tickets = await prisma.supportTicket.findMany({
      where: { userId },
      select: { id: true, subject: true, category: true, status: true, createdAt: true },
    });

    await logAuditEvent({
      userId,
      action: 'ACCOUNT_DATA_EXPORTED',
      entityType: 'USER',
      entityId: userId,
    });

    const exportData = {
      exportedAt: new Date().toISOString(),
      user,
      organizations: orgMemberships,
      projects,
      datasets,
      qualityPassports: passports,
      supportTickets: tickets,
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="modliq_user_export_${userId}.json"`);
    res.json(exportData);
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/v1/account/delete-request — Request account deletion
router.post('/delete-request', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    const { reason } = req.body;

    const ticket = await prisma.supportTicket.create({
      data: {
        userId,
        subject: 'Account & Workspace Deletion Request',
        message: `User requested complete deletion of account and data. Reason: ${reason || 'Not specified'}`,
        category: 'DATA',
        priority: 'HIGH',
        status: 'OPEN',
      },
    });

    await logAuditEvent({
      userId,
      action: 'ACCOUNT_DELETE_REQUESTED',
      entityType: 'USER',
      entityId: userId,
      metadata: { reason },
    });

    res.json({
      success: true,
      message: 'Account deletion request submitted to platform administration for review.',
      ticketId: ticket.id,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
