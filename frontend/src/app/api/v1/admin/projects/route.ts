import { handleAdminProxy, MOCK_PROJECTS } from '../adminProxy';

export async function GET(request: Request) {
  return handleAdminProxy(request, 'projects', 'GET', MOCK_PROJECTS);
}
