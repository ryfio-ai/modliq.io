export interface JwtPayload {
  userId: string;
  email?: string;
  name?: string;
  role?: string;
}

export function signClientJwt(payload: JwtPayload): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify(payload));
  return `${header}.${body}.mock_signature`;
}

export function verifyJwt(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = JSON.parse(atob(parts[1]));
    const userId = payload.userId || payload.id;
    const email = payload.email || '';
    if (userId) {
      const role = payload.role || (email.toLowerCase() === 'admin@modliq.io' ? 'ADMIN' : 'USER');
      return {
        userId,
        email,
        name: payload.name || '',
        role,
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function getAuthFromHeaders(headers: Headers) {
  const auth = headers.get('authorization') || '';
  if (auth.startsWith('Bearer ')) return auth.slice(7);
  return null;
}
