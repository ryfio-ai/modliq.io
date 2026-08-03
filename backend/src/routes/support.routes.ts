import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { logAuditEvent } from '../services/audit.service';

const router = Router();
router.use(requireAuth);

// GET /api/v1/support/tickets — List user tickets
router.get('/tickets', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    const tickets = await prisma.supportTicket.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, data: tickets });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/v1/support/tickets — Create new support/feedback ticket
router.post('/tickets', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    const { subject, message, category, priority } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ success: false, error: 'Subject and message are required' });
    }

    const ticket = await prisma.supportTicket.create({
      data: {
        userId,
        subject: subject.trim(),
        message: message.trim(),
        category: category || 'OTHER',
        priority: priority || 'MEDIUM',
        status: 'OPEN',
      },
    });

    await logAuditEvent({
      userId,
      action: 'SUPPORT_TICKET_CREATED',
      entityType: 'SUPPORT_TICKET',
      entityId: ticket.id,
      metadata: { subject, category },
    });

    res.status(201).json({ success: true, data: ticket });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
