import { handleAdminProxy } from '../../adminProxy';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const resolvedParams = await params;
  return handleAdminProxy(request, `users/${resolvedParams.userId}`, 'GET', null);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const resolvedParams = await params;
  return handleAdminProxy(request, `users/${resolvedParams.userId}`, 'PATCH', { success: true });
}
