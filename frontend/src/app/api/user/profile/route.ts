import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, name, mobileNo, organization, city, industry } = body || {};

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://modliq-backend.onrender.com';

    try {
      await fetch(`${backendUrl}/api/v1/account/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, name, mobileNo, organization, city, industry }),
      });
    } catch {
      // ignore backend sync offline errors
    }

    return NextResponse.json({
      success: true,
      message: 'User profile updated successfully',
      profile: { userId, name, mobileNo, organization, city, industry, updatedAt: new Date().toISOString() },
    });
  } catch (error: any) {
    console.error('Profile API error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update profile' }, { status: 500 });
  }
}
