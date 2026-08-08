import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

const memoryContactLeads: any[] = [];

router.post('/contact', async (req, res) => {
  try {
    const { name, company, email, phone, city, industry, role, interest, message } = (req.body || {}) as {
      name?: string;
      company?: string;
      email?: string;
      phone?: string;
      city?: string;
      industry?: string;
      role?: string;
      interest?: string;
      message?: string;
    };

    if (!name || !String(name).trim()) {
      return res.status(400).json({ error: 'Name is required.' });
    }

    if (!email || !String(email).trim()) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    const leadData = {
      name: String(name).trim(),
      company: company ? String(company).trim() : null,
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : null,
      city: city ? String(city).trim() : null,
      industry: industry ? String(industry).trim() : null,
      role: role ? String(role).trim() : null,
      interest: Array.isArray(interest) ? interest.join(', ') : (interest ? String(interest) : null),
      message: message ? String(message).trim() : null,
    };

    let leadId = `lead_${Date.now()}`;

    try {
      const lead = await prisma.contactLead.create({
        data: leadData,
      });
      leadId = lead.id;
    } catch (dbErr) {
      console.warn('[public.routes] DB lead save failed, storing lead in memory:', (dbErr as any)?.message || dbErr);
      memoryContactLeads.push({ id: leadId, ...leadData });
    }

    res.status(201).json({ success: true, id: leadId });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ error: 'Failed to submit contact form. Please try again.' });
  }
});

export default router;
