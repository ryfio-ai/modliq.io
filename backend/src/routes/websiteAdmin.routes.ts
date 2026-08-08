import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { logAuditEvent } from '../services/audit.service';
import {
  DEFAULT_NAVBAR_CONFIG,
  DEFAULT_FOOTER_CONFIG,
  DEFAULT_SEO_CONFIG,
  DEFAULT_CHATBOT_CONFIG,
  DEFAULT_ANNOUNCEMENT_CONFIG,
  DEFAULT_CONTACT_CONFIG,
  DEFAULT_HOME_SECTIONS,
} from '../data/defaultWebsiteConfig';

const router = Router();

router.use(requireAuth);

const requireAdmin = (req: Request, res: Response, next: () => void) => {
  const userRole = (req as any).user?.role;
  if (userRole !== 'ADMIN') {
    return res.status(403).json({ success: false, error: 'Forbidden: Admin access required' });
  }
  next();
};

router.use(requireAdmin);

// Utility: Sanitize text against script injection
function sanitizeText(str: any): any {
  if (typeof str === 'string') {
    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/data:/gi, '')
      .replace(/vbscript:/gi, '');
  }
  if (Array.isArray(str)) return str.map(sanitizeText);
  if (typeof str === 'object' && str !== null) {
    const cleaned: any = {};
    for (const key of Object.keys(str)) {
      cleaned[key] = sanitizeText(str[key]);
    }
    return cleaned;
  }
  return str;
}

// GET /api/v1/admin/website — Get all website settings and sections
router.get('/', async (req: Request, res: Response) => {
  try {
    const [settingsList, dbSections] = await Promise.all([
      prisma.websiteSettings.findMany(),
      prisma.homePageSection.findMany({ orderBy: { order: 'asc' } }),
    ]);

    const settingsMap: Record<string, any> = {};
    settingsList.forEach((item) => {
      try {
        settingsMap[item.key] = JSON.parse(item.valueJson);
      } catch {
        // Fallback
      }
    });

    const navbar = settingsMap.navbar || DEFAULT_NAVBAR_CONFIG;
    const footer = settingsMap.footer || DEFAULT_FOOTER_CONFIG;
    const seo = settingsMap.seo || DEFAULT_SEO_CONFIG;
    const chatbot = settingsMap.chatbot || DEFAULT_CHATBOT_CONFIG;
    const announcement = settingsMap.announcement || DEFAULT_ANNOUNCEMENT_CONFIG;
    const contact = settingsMap.contact || DEFAULT_CONTACT_CONFIG;

    let homeSections = dbSections.map((sec) => ({
      id: sec.id,
      sectionKey: sec.sectionKey,
      title: sec.title,
      subtitle: sec.subtitle,
      visible: sec.visible,
      order: sec.order,
      content: (() => {
        try {
          return JSON.parse(sec.contentJson);
        } catch {
          return {};
        }
      })(),
    }));

    if (homeSections.length === 0) {
      homeSections = DEFAULT_HOME_SECTIONS.map((sec) => ({
        id: sec.sectionKey,
        sectionKey: sec.sectionKey,
        title: sec.title,
        subtitle: sec.subtitle,
        visible: sec.visible,
        order: sec.order,
        content: JSON.parse(sec.contentJson),
      }));
    }

    res.json({
      success: true,
      data: {
        navbar,
        footer,
        seo,
        chatbot,
        announcement,
        contact,
        homeSections,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH /api/v1/admin/website/settings/:key — Update website setting (navbar, footer, seo, chatbot, announcement, contact)
router.patch('/settings/:key', async (req: Request, res: Response) => {
  try {
    const key = req.params.key as string;
    const adminId = (req as any).user?.userId;
    const sanitizedValue = sanitizeText(req.body);

    const valueJson = JSON.stringify(sanitizedValue);

    const setting = await prisma.websiteSettings.upsert({
      where: { key },
      update: { valueJson, updatedBy: adminId },
      create: { key, valueJson, updatedBy: adminId },
    });

    await logAuditEvent({
      userId: adminId,
      action: `WEBSITE_SETTING_UPDATED_${key.toUpperCase()}`,
      entityType: 'WEBSITE_SETTINGS',
      entityId: setting.id,
      metadata: { key },
    });

    res.json({ success: true, data: sanitizedValue });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/v1/admin/website/home-sections — Get homepage sections
router.get('/home-sections', async (req: Request, res: Response) => {
  try {
    let sections = await prisma.homePageSection.findMany({ orderBy: { order: 'asc' } });
    if (sections.length === 0) {
      // Seed default sections into DB
      sections = await Promise.all(
        DEFAULT_HOME_SECTIONS.map((sec) =>
          prisma.homePageSection.create({
            data: {
              sectionKey: sec.sectionKey,
              title: sec.title,
              subtitle: sec.subtitle,
              contentJson: sec.contentJson,
              visible: sec.visible,
              order: sec.order,
            },
          })
        )
      );
    }

    const formatted = sections.map((sec) => ({
      id: sec.id,
      sectionKey: sec.sectionKey,
      title: sec.title,
      subtitle: sec.subtitle,
      visible: sec.visible,
      order: sec.order,
      content: (() => {
        try {
          return JSON.parse(sec.contentJson);
        } catch {
          return {};
        }
      })(),
    }));

    res.json({ success: true, data: formatted });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH /api/v1/admin/website/home-sections/:sectionKey — Update specific section
router.patch('/home-sections/:sectionKey', async (req: Request, res: Response) => {
  try {
    const sectionKey = req.params.sectionKey as string;
    const adminId = (req as any).user?.userId;
    const { title, subtitle, visible, order, content } = req.body;

    const sanitizedTitle = title ? sanitizeText(title) : undefined;
    const sanitizedSubtitle = subtitle ? sanitizeText(subtitle) : undefined;
    const sanitizedContent = content ? sanitizeText(content) : undefined;

    const existing = await prisma.homePageSection.findUnique({ where: { sectionKey } });

    let updated;
    if (existing) {
      updated = await prisma.homePageSection.update({
        where: { sectionKey },
        data: {
          ...(sanitizedTitle ? { title: sanitizedTitle } : {}),
          ...(sanitizedSubtitle !== undefined ? { subtitle: sanitizedSubtitle } : {}),
          ...(typeof visible === 'boolean' ? { visible } : {}),
          ...(typeof order === 'number' ? { order } : {}),
          ...(sanitizedContent ? { contentJson: JSON.stringify(sanitizedContent) } : {}),
          updatedBy: adminId,
        },
      });
    } else {
      const defaultSec = DEFAULT_HOME_SECTIONS.find((s) => s.sectionKey === sectionKey) || {
        title: 'Section Title',
        order: 1,
        contentJson: '{}',
      };

      updated = await prisma.homePageSection.create({
        data: {
          sectionKey,
          title: sanitizedTitle || defaultSec.title,
          subtitle: sanitizedSubtitle,
          contentJson: sanitizedContent ? JSON.stringify(sanitizedContent) : defaultSec.contentJson,
          visible: typeof visible === 'boolean' ? visible : true,
          order: typeof order === 'number' ? order : defaultSec.order,
          updatedBy: adminId,
        },
      });
    }

    await logAuditEvent({
      userId: adminId,
      action: 'HOMEPAGE_SECTION_UPDATED',
      entityType: 'HOMEPAGE_SECTION',
      entityId: updated.id,
      metadata: { sectionKey, visible, order },
    });

    res.json({
      success: true,
      data: {
        ...updated,
        content: JSON.parse(updated.contentJson),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/v1/admin/website/home-sections/reorder — Reorder homepage sections
router.post('/home-sections/reorder', async (req: Request, res: Response) => {
  try {
    const { sectionKeys } = req.body as { sectionKeys: string[] };
    const adminId = (req as any).user?.userId;

    if (!Array.isArray(sectionKeys)) {
      return res.status(400).json({ success: false, error: 'sectionKeys must be an array' });
    }

    await Promise.all(
      sectionKeys.map((key, index) =>
        prisma.homePageSection.upsert({
          where: { sectionKey: key },
          update: { order: index + 1, updatedBy: adminId },
          create: {
            sectionKey: key,
            title: key,
            order: index + 1,
            contentJson: '{}',
            updatedBy: adminId,
          },
        })
      )
    );

    await logAuditEvent({
      userId: adminId,
      action: 'HOMEPAGE_SECTIONS_REORDERED',
      entityType: 'HOMEPAGE_SECTION',
      metadata: { sectionKeys },
    });

    res.json({ success: true, message: 'Sections reordered successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/v1/admin/website/reset — Reset website settings to default
router.post('/reset', async (req: Request, res: Response) => {
  try {
    const adminId = (req as any).user?.userId;

    await prisma.websiteSettings.deleteMany();
    await prisma.homePageSection.deleteMany();

    await logAuditEvent({
      userId: adminId,
      action: 'WEBSITE_SETTINGS_RESET_DEFAULTS',
      entityType: 'WEBSITE_SETTINGS',
    });

    res.json({ success: true, message: 'Website settings reset to defaults' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
