import { handleAdminProxy } from '../../../adminProxy';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const resolvedParams = await params;
  return handleAdminProxy(request, `jobs/${resolvedParams.jobId}/retry`, 'POST', { success: true });
}
