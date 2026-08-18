import { NextResponse } from 'next/server';
import { saveLeadToGlobalStore } from '../../admin/adminProxy';
import prisma from '../../../../../lib/prisma';

async function generateSequentialLeadId(dateObj?: Date): Promise<string> {
  const d = dateObj || new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const dateKey = `${year}${month}${day}`;

  const hours = String(d.getHours()).padStart(2, '0');
  const mins = String(d.getMinutes()).padStart(2, '0');
  const secs = String(d.getSeconds()).padStart(2, '0');
  const timeKey = `${hours}${mins}${secs}`;

  let seq = 1;

  try {
    const existing = await (prisma as any).publicIdSequence.findUnique({
      where: {
        entityType_dateKey: {
          entityType: 'LEAD',
          dateKey,
        },
      },
    });

    if (!existing) {
      await (prisma as any).publicIdSequence.create({
        data: {
          entityType: 'LEAD',
          dateKey,
          nextSeq: 2,
        },
      });
      seq = 1;
    } else {
      seq = existing.nextSeq;
      await (prisma as any).publicIdSequence.update({
        where: { id: existing.id },
        data: { nextSeq: seq + 1 },
      });
    }
  } catch (err) {
    try {
      const dbCount = await (prisma as any).contactLead.count();
      seq = dbCount + 1;
    } catch {
      seq = 1;
    }
  }

  const seqStr = String(seq).padStart(5, '0');
  return `MODLIQER-LEAD-${dateKey}-${timeKey}-${seqStr}`;
}

async function syncDirectToGoogleSheets(leadRecord: any) {
  const webappUrl =
    process.env.GOOGLE_SHEETS_WEBAPP_URL ||
    process.env.GOOGLE_SCRIPT_WEBAPP_URL ||
    'https://script.google.com/macros/s/AKfycbzCr2KJAgrbuWM0AN1iPTcxv8cYewBeqEFnKskS8dtQFXcDTOQqZpbzzL0B6IvAXUORRA/exec';

  try {
    await fetch(webappUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: leadRecord.id,
        name: leadRecord.name,
        company: leadRecord.company || 'N/A',
        email: leadRecord.email,
        phone: leadRecord.phone || 'N/A',
        city: leadRecord.city || 'N/A',
        industry: leadRecord.industry || 'General',
        role: leadRecord.role || 'N/A',
        interest: leadRecord.interest || 'Demo Booking / Quote',
        message: leadRecord.message || 'N/A',
        status: leadRecord.status || 'NEW',
        createdAt: leadRecord.createdAt,
      }),
    });
  } catch (err) {
    console.warn('[Vercel Contact API] Google Sheets direct sync exception:', err);
  }
}

export async function POST(req: Request) {
  try {
    let body: any = {};
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      body = await req.json();
    } else if (
      contentType.includes('application/x-www-form-urlencoded') ||
      contentType.includes('multipart/form-data')
    ) {
      const formData = await req.formData();
      const obj: Record<string, any> = {};
      formData.forEach((value, key) => {
        if (obj[key]) {
          if (Array.isArray(obj[key])) {
            obj[key].push(value);
          } else {
            obj[key] = [obj[key], value];
          }
        } else {
          obj[key] = value;
        }
      });
      body = obj;
    }

    const { name, company, email, phone, city, industry, role, interest, message } = body;

    if (!name || !String(name).trim()) {
      return NextResponse.json({ success: false, error: 'Name is required.' }, { status: 400 });
    }

    if (!email || !String(email).trim()) {
      return NextResponse.json({ success: false, error: 'Email is required.' }, { status: 400 });
    }

    const leadId = await generateSequentialLeadId();
    const newLeadRecord = {
      id: leadId,
      name: String(name).trim(),
      company: company ? String(company).trim() : null,
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : null,
      city: city ? String(city).trim() : null,
      industry: industry ? String(industry).trim() : null,
      role: role ? String(role).trim() : null,
      interest: Array.isArray(interest) ? interest.join(', ') : interest ? String(interest) : null,
      message: message ? String(message).trim() : null,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };

    // 1. Always persist in local Vercel memory store for Admin Dashboard
    saveLeadToGlobalStore(newLeadRecord);

    // 2. Directly sync to Google Sheets from Vercel Serverless Function
    syncDirectToGoogleSheets(newLeadRecord).catch(() => {});

    // 3. Forward to Render Backend API Gateway
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://modliq-backend.onrender.com';

    try {
      const backendRes = await fetch(`${backendUrl}/api/v1/public/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: leadId,
          name: String(name).trim(),
          company: company ? String(company).trim() : null,
          email: String(email).trim(),
          phone: phone ? String(phone).trim() : null,
          city: city ? String(city).trim() : null,
          industry: industry ? String(industry).trim() : null,
          role: role ? String(role).trim() : null,
          interest,
          message: message ? String(message).trim() : null,
        }),
      });

      if (backendRes.ok) {
        const data = await backendRes.json();
        return NextResponse.json({
          success: true,
          message: 'Thank you! Your contact message has been received.',
          id: data.id || newLeadRecord.id,
        });
      }
    } catch (backendErr) {
      console.warn('[Vercel Contact API] Backend forward notice:', backendErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your contact message has been received. Our team will contact you shortly.',
        id: newLeadRecord.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Next.js contact API route error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit contact form. Please try again.' },
      { status: 500 }
    );
  }
}
