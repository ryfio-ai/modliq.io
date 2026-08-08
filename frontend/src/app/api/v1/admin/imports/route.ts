import { handleAdminProxy, MOCK_IMPORTS } from '../adminProxy';

export async function GET(request: Request) {
  return handleAdminProxy(request, 'imports', 'GET', MOCK_IMPORTS);
}
