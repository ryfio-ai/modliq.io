import { test, expect } from '@playwright/test';

test.describe('RBAC enforcement', () => {

  test('unauthenticated access to admin redirects to login', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL(/login/);
  });

  test('public pages are accessible without auth', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    await page.goto('/features');
    await expect(page.locator('h1')).toBeVisible();
    await page.goto('/pricing');
    await expect(page.locator('h1')).toBeVisible();
  });

});
