import { test, expect } from '@playwright/test';

test.describe('Goal Parser & Optimization Setup', () => {

  test('public workflow page renders', async ({ page }) => {
    await page.goto('/workflow');
    await expect(page.locator('h1')).toBeVisible();
  });

});
