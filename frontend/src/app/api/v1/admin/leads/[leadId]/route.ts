import { handleAdminProxy } from '../../adminProxy';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ leadId: string }> }
) {
  const resolvedParams = await params;
  return handleAdminProxy(request, `leads/${resolvedParams.leadId}`, 'PATCH', { success: true });
}
