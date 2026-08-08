import { handleAdminProxy, MOCK_ORGANIZATIONS } from '../adminProxy';

export async function GET(request: Request) {
  return handleAdminProxy(request, 'organizations', 'GET', MOCK_ORGANIZATIONS);
}
