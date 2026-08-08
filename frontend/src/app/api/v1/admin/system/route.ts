import { handleAdminProxy, MOCK_SYSTEM } from '../adminProxy';

export async function GET(request: Request) {
  return handleAdminProxy(request, 'system', 'GET', MOCK_SYSTEM);
}
