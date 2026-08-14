import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwt, getAuthFromHeaders } from '@/lib/auth';
import { isAdmin } from '@/lib/auth/redirects';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Skip static assets & API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 1.5 Pre-Launch Gate Enforcement
  const launchGateEnabled = process.env.NEXT_PUBLIC_LAUNCH_GATE_ENABLED !== 'false';
  const launchTarget = process.env.NEXT_PUBLIC_LAUNCH_DATETIME || '2026-08-20T10:00:00+05:30';
  const isBeforeLaunch = new Date().getTime() < new Date(launchTarget).getTime();

  const previewParam = req.nextUrl.searchParams.get('preview');
  const bypassCookie = req.cookies.get('modliq_gate_bypass')?.value === 'true';
  const isBypassed = previewParam === 'admin-secret' || previewParam === 'true' || bypassCookie;

  if (launchGateEnabled && isBeforeLaunch && !isBypassed) {
    const allowedPreLaunchRoutes = [
      '/launch',
      '/contact',
      '/privacy',
      '/terms',
      '/disclaimer',
    ];

    if (!allowedPreLaunchRoutes.includes(pathname)) {
      const url = req.nextUrl.clone();
      url.pathname = '/launch';
      return NextResponse.redirect(url);
    }
  }

  // Extract session token from cookie or Authorization header
  const token = req.cookies.get('modliq_token')?.value || getAuthFromHeaders(req.headers);
  let payload = token ? verifyJwt(token) : null;

  // Local Dev Auto-Session fallback for /admin testing
  if (!payload && process.env.NODE_ENV !== 'production' && pathname.startsWith('/admin')) {
    payload = {
      userId: 'admin_user_static',
      email: 'admin@modliq.io',
      name: 'Platform Admin',
      role: 'ADMIN',
    };
  }

  const session = payload
    ? {
        user: {
          id: payload.userId,
          email: payload.email,
          name: payload.name,
          role: payload.role || (payload.email === 'admin@modliq.io' ? 'ADMIN' : 'USER'),
        },
      }
    : null;

  // 2. Public Routes
  const publicRoutes = [
    '/',
    '/login',
    '/signup',
    '/about',
    '/product',
    '/workflow',
    '/features',
    '/algorithms',
    '/quality-passport',
    '/pricing',
    '/docs',
    '/contact',
    '/comparison',
    '/roi',
    '/privacy',
    '/terms',
    '/disclaimer',
    '/developer',
    '/system-architecture',
    '/case-studies',
    '/solutions',
    '/security',
  ];

  const isPublicRoute =
    publicRoutes.includes(pathname) ||
    pathname.startsWith('/share/') ||
    pathname.startsWith('/developer/');

  if (isPublicRoute) {
    // If visitor visits /login or /signup directly, redirect to /contact?interest=demo until sign-in opens
    if (pathname === '/login' || pathname === '/signup') {
      if (session) {
        const url = req.nextUrl.clone();
        url.pathname = isAdmin(session.user) ? '/admin' : `/${session.user.id}/modliq-console/dashboard`;
        return NextResponse.redirect(url);
      } else if (!isBypassed) {
        const url = req.nextUrl.clone();
        url.pathname = '/contact';
        url.searchParams.set('interest', 'demo');
        return NextResponse.redirect(url);
      }
    }
    return NextResponse.next();
  }

  // 3. Admin Routes (/admin, /admin/*)
  if (pathname.startsWith('/admin')) {
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }
    if (!isAdmin(session.user)) {
      const url = req.nextUrl.clone();
      url.pathname = `/${session.user.id}/modliq-console/dashboard`;
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // 4. Legacy Shortcut Routes (/dashboard, /data-upload, etc.)
  const legacyRoutes = [
    '/dashboard',
    '/data-upload',
    '/goal',
    '/optimization-progress',
    '/model-training',
    '/results',
    '/studio',
    '/operations',
    '/supply-chain',
    '/lean',
    '/quality-passport',
  ];

  if (legacyRoutes.some((route) => pathname.startsWith(route))) {
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    const url = req.nextUrl.clone();
    if (isAdmin(session.user)) {
      url.pathname = '/admin';
    } else {
      url.pathname = `/${session.user.id}/modliq-console${pathname}`;
    }
    return NextResponse.redirect(url);
  }

  // 5. User Console Routes (/[userId]/modliq-console/*)
  const consoleRouteMatch = pathname.match(/^\/([^/]+)\/modliq-console/);
  if (consoleRouteMatch) {
    const routeUserId = consoleRouteMatch[1];

    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    if (isAdmin(session.user)) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }

    if (session.user.id && session.user.id !== routeUserId) {
      const url = req.nextUrl.clone();
      url.pathname = `/${session.user.id}/modliq-console/dashboard`;
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
