import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

router.post('/contact', async (req, res) => {
  try {
    const { name, company, email, phone, city, industry, role, interest, message } = req.body as {
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

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required.' });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    const lead = await prisma.contactLead.create({
      data: {
        name: name.trim(),
        company: company?.trim(),
        email: email.trim(),
        phone: phone?.trim(),
        city: city?.trim(),
        industry: industry?.trim(),
        role: role?.trim(),
        interest: interest,
        message: message?.trim(),
      },
    });

    res.status(201).json({ success: true, id: lead.id });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ error: 'Failed to submit contact form. Please try again.' });
  }
});

export default router;
