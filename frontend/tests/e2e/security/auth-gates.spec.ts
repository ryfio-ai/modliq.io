import { test, expect } from '@playwright/test';

test.describe('Security & Protection Tests', () => {

  test('admin pages redirect unauthenticated users', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL(/login/);
  });

  test('robots.txt returns 200 OK', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBe(200);
  });

  test('sitemap.xml returns 200 OK', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    expect(res.status()).toBe(200);
  });

});
