import { handleAdminProxy, MOCK_LEADS } from '../adminProxy';

export async function GET(request: Request) {
  return handleAdminProxy(request, 'leads', 'GET', MOCK_LEADS);
}

export async function POST(request: Request) {
  return handleAdminProxy(request, 'leads', 'POST', MOCK_LEADS[0]);
}
