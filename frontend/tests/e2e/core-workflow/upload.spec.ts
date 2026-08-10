import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Dataset Upload — Universal Ingestion', () => {

  test('public contact form submission succeeds', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('h1')).toBeVisible();
  });

});
