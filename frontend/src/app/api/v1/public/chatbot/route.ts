import { NextResponse } from 'next/server';
import { API_URL } from '@/lib/config';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const res = await fetch(`${API_URL}/api/v1/public/chatbot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        return NextResponse.json(data);
      }
    }
  } catch {}

  return NextResponse.json({
    success: true,
    answer: 'Modliq is a B2B SaaS manufacturing intelligence platform for process optimization and Quality Passports.',
    source: 'faq',
  });
}
