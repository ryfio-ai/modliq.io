import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { requireOrgRole } from '../middleware/permissions';
import { logAuditEvent } from '../services/audit.service';
import { trackUsage } from '../services/usage.service';

const router = Router();
router.use(requireAuth);

// GET /api/v1/organizations — List user organizations
router.get('/', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    const members = await prisma.organizationMember.findMany({
      where: { userId, status: 'ACTIVE' },
    });

    const orgIds = members.map((m: any) => m.organizationId);
    const orgs = await prisma.organization.findMany({
      where: { id: { in: orgIds } },
      orderBy: { updatedAt: 'desc' },
    });

    const mappedOrgs = orgs.map((org: any) => {
      const member = members.find((m: any) => m.organizationId === org.id);
      return { ...org, userRole: member?.role || 'MEMBER' };
    });

    res.json({ success: true, data: mappedOrgs });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/v1/organizations — Create new organization workspace
router.post('/', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    const { name, industry, companySize, country, state, city } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Organization name is required' });
    }

    const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 7)}`;

    const org = await prisma.organization.create({
      data: {
        name: name.trim(),
        slug,
        ownerUserId: userId,
        industry: industry || 'Manufacturing',
        companySize: companySize || '10-50',
        country,
        state,
        city,
      },
    });

    await prisma.organizationMember.create({
      data: {
        organizationId: org.id,
        userId,
        role: 'OWNER',
        status: 'ACTIVE',
      },
    });

    await logAuditEvent({
      userId,
      organizationId: org.id,
      action: 'ORG_CREATED',
      entityType: 'ORGANIZATION',
      entityId: org.id,
    });

    await trackUsage({
      userId,
      organizationId: org.id,
      eventType: 'ORG_CREATED',
    });

    res.status(201).json({ success: true, data: org });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/v1/organizations/:orgId — Get organization detail
router.get('/:orgId', requireOrgRole(['OWNER', 'ADMIN', 'MANAGER', 'ENGINEER', 'VIEWER']), async (req: Request, res: Response) => {
  try {
    const orgId = req.params.orgId as string;
    const org = await prisma.organization.findUnique({
      where: { id: orgId },
    });

    if (!org) {
      return res.status(404).json({ success: false, error: 'Organization not found' });
    }

    res.json({ success: true, data: org });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH /api/v1/organizations/:orgId — Update organization settings
router.patch('/:orgId', requireOrgRole(['OWNER', 'ADMIN']), async (req: Request, res: Response) => {
  try {
    const orgId = req.params.orgId as string;
    const { name, industry, companySize, country, state, city } = req.body;

    const updated = await prisma.organization.update({
      where: { id: orgId },
      data: {
        ...(name ? { name: name.trim() } : {}),
        ...(industry ? { industry } : {}),
        ...(companySize ? { companySize } : {}),
        ...(country !== undefined ? { country } : {}),
        ...(state !== undefined ? { state } : {}),
        ...(city !== undefined ? { city } : {}),
      },
    });

    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/v1/organizations/:orgId/members — List team members
router.get('/:orgId/members', requireOrgRole(['OWNER', 'ADMIN', 'MANAGER', 'ENGINEER', 'VIEWER']), async (req: Request, res: Response) => {
  try {
    const orgId = req.params.orgId as string;
    const members = await prisma.organizationMember.findMany({
      where: { organizationId: orgId },
      orderBy: { createdAt: 'desc' },
    });

    // Populate user emails/names
    const userIds = members.map((m: any) => m.userId).filter(Boolean);
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true, email: true, image: true },
    });

    const populated = members.map((m: any) => {
      const u = users.find((user: any) => user.id === m.userId);
      return {
        ...m,
        user: u || { email: m.invitedEmail || 'Pending user' },
      };
    });

    res.json({ success: true, data: populated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/v1/organizations/:orgId/members/invite — Invite team member by email
router.post('/:orgId/members/invite', requireOrgRole(['OWNER', 'ADMIN']), async (req: Request, res: Response) => {
  try {
    const orgId = req.params.orgId as string;
    const { email, role } = req.body;
    const inviterId = (req as any).user?.userId;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Valid email address is required' });
    }

    const assignedRole = ['OWNER', 'ADMIN', 'MANAGER', 'ENGINEER', 'VIEWER'].includes(role) ? role : 'ENGINEER';

    // Check if user already exists
    const targetUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    const targetUserId = targetUser ? targetUser.id : `invited_${Date.now()}`;

    const member = await prisma.organizationMember.create({
      data: {
        organizationId: orgId,
        userId: targetUserId,
        role: assignedRole,
        status: targetUser ? 'ACTIVE' : 'INVITED',
        invitedEmail: email.toLowerCase(),
      },
    });

    await logAuditEvent({
      userId: inviterId,
      organizationId: orgId,
      action: 'MEMBER_INVITED',
      entityType: 'ORGANIZATION_MEMBER',
      entityId: member.id,
      metadata: { email, role: assignedRole },
    });

    res.status(201).json({ success: true, data: member });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH /api/v1/organizations/:orgId/members/:memberId — Update member role
router.patch('/:orgId/members/:memberId', requireOrgRole(['OWNER', 'ADMIN']), async (req: Request, res: Response) => {
  try {
    const memberId = req.params.memberId as string;
    const { role, status } = req.body;

    const updated = await prisma.organizationMember.update({
      where: { id: memberId },
      data: {
        ...(role ? { role } : {}),
        ...(status ? { status } : {}),
      },
    });

    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/v1/organizations/:orgId/members/:memberId — Remove member
router.delete('/:orgId/members/:memberId', requireOrgRole(['OWNER', 'ADMIN']), async (req: Request, res: Response) => {
  try {
    const memberId = req.params.memberId as string;
    await prisma.organizationMember.delete({
      where: { id: memberId },
    });

    res.json({ success: true, message: 'Member removed successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
