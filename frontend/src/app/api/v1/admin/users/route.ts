import { handleAdminProxy, MOCK_USERS } from '../adminProxy';

export async function GET(request: Request) {
  return handleAdminProxy(request, 'users', 'GET', MOCK_USERS);
}

export async function POST(request: Request) {
  return handleAdminProxy(request, 'users', 'POST', MOCK_USERS[0]);
}
