import { handleAdminProxy, MOCK_USAGE } from '../adminProxy';

export async function GET(request: Request) {
  return handleAdminProxy(request, 'usage', 'GET', MOCK_USAGE);
}
