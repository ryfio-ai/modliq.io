import { handleAdminProxy, MOCK_SUMMARY } from '../adminProxy';

export async function GET(request: Request) {
  return handleAdminProxy(request, 'summary', 'GET', MOCK_SUMMARY);
}
