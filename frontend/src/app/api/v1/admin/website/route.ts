import { handleAdminProxy, MOCK_WEBSITE } from '../adminProxy';

export async function GET(request: Request) {
  return handleAdminProxy(request, 'website', 'GET', MOCK_WEBSITE);
}

export async function PATCH(request: Request) {
  return handleAdminProxy(request, 'website', 'PATCH', MOCK_WEBSITE);
}
