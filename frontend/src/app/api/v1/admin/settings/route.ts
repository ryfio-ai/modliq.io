import { handleAdminProxy, MOCK_SETTINGS } from '../adminProxy';

export async function GET(request: Request) {
  return handleAdminProxy(request, 'settings', 'GET', MOCK_SETTINGS);
}

export async function PATCH(request: Request) {
  return handleAdminProxy(request, 'settings', 'PATCH', MOCK_SETTINGS);
}
