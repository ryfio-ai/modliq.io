import { test, expect } from '@playwright/test';

test.describe('Quality Passport Public Verification', () => {

  test('quality passport feature page loads', async ({ page }) => {
    await page.goto('/features');
    await expect(page.locator('h1')).toBeVisible();
  });

});
