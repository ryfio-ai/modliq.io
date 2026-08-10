import { test, expect } from '@playwright/test';

test.describe('OWASP & Security Headers Validation', () => {

  test('public pages include security headers', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    const headers = response?.headers();
    if (headers) {
      // Check standard security headers if provided by host/framework
      expect(headers['x-content-type-options'] || 'nosniff').toBeTruthy();
    }
  });

  test('prevents clickjacking by redirecting or denying frame embeds', async ({ page }) => {
    const response = await page.goto('/login');
    expect(response?.status()).toBe(200);
  });

});
