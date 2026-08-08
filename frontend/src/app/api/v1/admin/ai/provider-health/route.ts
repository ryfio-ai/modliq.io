import { handleAdminProxy, MOCK_AI } from '../../adminProxy';

export async function GET(request: Request) {
  return handleAdminProxy(request, 'ai/provider-health', 'GET', MOCK_AI);
}
