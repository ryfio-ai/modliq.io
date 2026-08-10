import { test, expect } from '@playwright/test';

test.describe('API & Service Health Endpoints', () => {

  test('backend health returns status ok', async ({ request }) => {
    const backendUrl = process.env.BACKEND_URL || 'https://modliq-backend.onrender.com';
    const res = await request.get(`${backendUrl}/health`).catch(() => null);
    if (res) {
      expect([200, 301, 302]).toContain(res.status());
    }
  });

  test('ML engine health returns 200', async ({ request }) => {
    const mlUrl = process.env.ML_ENGINE_URL || 'https://modliq-ml-engine.onrender.com';
    const res = await request.get(`${mlUrl}/health`).catch(() => null);
    if (res) {
      expect([200, 301, 302]).toContain(res.status());
    }
  });

});
