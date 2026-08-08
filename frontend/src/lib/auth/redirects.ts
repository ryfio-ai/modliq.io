export interface AuthUserLike {
  id: string;
  email?: string | null;
  name?: string | null;
  role?: string | null;
}

export function isAdmin(user: AuthUserLike | null | undefined): boolean {
  if (!user) return false;
  return user.role === 'ADMIN' || user.email === 'admin@modliq.io';
}

export function getUserDashboardPath(userId: string): string {
  if (!userId) return '/login';
  return `/${userId}/modliq-console/dashboard`;
}

export function getPostLoginRedirect(user: AuthUserLike | null | undefined): string {
  if (!user) return '/login';
  if (isAdmin(user)) {
    return '/admin';
  }
  return getUserDashboardPath(user.id);
}
