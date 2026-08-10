import { test, expect } from '@playwright/test';

test.describe('Authentication flows', () => {

  test('login page renders correctly', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/Modliq/);
    await expect(page.locator('h1, h2')).toBeVisible();
    await expect(page.locator('[name="email"]')).toBeVisible();
    await expect(page.locator('[name="password"]')).toBeVisible();
    await expect(page.locator('[type="submit"]')).toBeVisible();
  });

  test('shows error on invalid credentials', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"]', 'invalid_random_user@email.com');
    await page.fill('[name="password"]', 'wrongpassword123');
    await page.click('[type="submit"]');
    await expect(page.locator('text=/invalid|error|failed/i'))
      .toBeVisible({ timeout: 10000 });
  });

  test('redirects unauthenticated user from dashboard', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL(/login/);
  });

  test('OAuth buttons visible on signin page', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('button, a').filter({ hasText: /google|github/i }).first()).toBeVisible();
  });

});
