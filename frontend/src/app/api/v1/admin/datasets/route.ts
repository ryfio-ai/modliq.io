import { handleAdminProxy, MOCK_DATASETS } from '../adminProxy';

export async function GET(request: Request) {
  return handleAdminProxy(request, 'datasets', 'GET', MOCK_DATASETS);
}
