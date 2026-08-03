import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyJwt } from '@/lib/auth';
import { getApiUrl } from '@/lib/config/env';
import { buildWorkspaceAIContext } from '@/lib/ai/context-builder';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('modliq_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const payload = verifyJwt(token);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = payload.userId;
    const body = await request.json();
    const { message, messages = [] } = body;

    const workspaceContext = await buildWorkspaceAIContext(userId).catch(() => ({}));

    // Forward to Backend Gateway API
    const backendRes = await fetch(getApiUrl('/api/v1/ai/chat'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message,
        history: messages,
        context: workspaceContext,
      }),
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error in AI Copilot Chat proxy:', error);
    return NextResponse.json(
      {
        success: false,
        code: 'SERVER_ERROR',
        answer: 'AI Copilot is currently offline. Your calculations remain fully functional.',
      },
      { status: 500 }
    );
  }
}
