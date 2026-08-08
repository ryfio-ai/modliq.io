import { handleAdminProxy, MOCK_SUPPORT } from '../../adminProxy';

export async function GET(request: Request) {
  return handleAdminProxy(request, 'support/tickets', 'GET', MOCK_SUPPORT);
}
