import { handleAdminProxy, MOCK_JOBS } from '../adminProxy';

export async function GET(request: Request) {
  return handleAdminProxy(request, 'jobs', 'GET', MOCK_JOBS);
}
