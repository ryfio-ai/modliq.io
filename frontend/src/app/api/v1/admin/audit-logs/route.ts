import { handleAdminProxy, MOCK_AUDIT_LOGS } from '../adminProxy';

export async function GET(request: Request) {
  return handleAdminProxy(request, 'audit-logs', 'GET', MOCK_AUDIT_LOGS);
}
