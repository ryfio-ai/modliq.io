import { NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/auth';
import { API_URL } from '@/lib/config';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing authorization token' }, { status: 401 });
    }

    const token = authHeader.slice(7);
    const payload = verifyJwt(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
      }
    } catch {
      // Backend service unreachable fallback
    }

    const userId = payload.userId;
    const role = payload.role || (payload.email === 'admin@modliq.io' ? 'ADMIN' : 'USER');
    const dashboardPath = role === 'ADMIN' ? '/admin' : `/${userId}/modliq-console/dashboard`;

    return NextResponse.json({
      id: userId,
      email: payload.email,
      name: payload.name || 'User',
      role,
      dashboardPath,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load user' }, { status: 500 });
  }
}
