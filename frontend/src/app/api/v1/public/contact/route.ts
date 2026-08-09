import { NextResponse } from 'next/server';
import { saveLeadToGlobalStore } from '../../admin/adminProxy';

export async function POST(req: Request) {
  try {
    let body: any = {};
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      body = await req.json();
    } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
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

    const newLeadRecord = {
      id: `lead_${Date.now()}`,
      name: String(name).trim(),
      company: company ? String(company).trim() : null,
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : null,
      city: city ? String(city).trim() : null,
      industry: industry ? String(industry).trim() : null,
      role: role ? String(role).trim() : null,
      interest: Array.isArray(interest) ? interest.join(', ') : (interest ? String(interest) : null),
      message: message ? String(message).trim() : null,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };

    // Always persist in local memory store so it immediately appears in Admin Dashboard
    saveLeadToGlobalStore(newLeadRecord);

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://modliq-backend.onrender.com';

    try {
      const backendRes = await fetch(`${backendUrl}/api/v1/public/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
        return NextResponse.json({ success: true, message: 'Thank you! Your contact message has been received.', id: data.id || newLeadRecord.id });
      }
    } catch {
      // Ignore backend fetch error and fall back to success response with stored memory lead
    }

    // High availability fallback response for public marketing site
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
