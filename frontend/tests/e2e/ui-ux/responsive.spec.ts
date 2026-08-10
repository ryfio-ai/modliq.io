import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: 'Desktop HD', width: 1920, height: 1080 },
  { name: 'Laptop Standard', width: 1366, height: 768 },
  { name: 'Tablet Portrait', width: 768, height: 1024 },
  { name: 'Mobile Portrait', width: 375, height: 812 },
];

test.describe('UI / Front-End & Responsive Design', () => {

  for (const vp of VIEWPORTS) {
    test(`renders homepage cleanly at ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');
      await expect(page.locator('h1')).toBeVisible();

      // Check header visibility or mobile menu toggle
      if (vp.width < 768) {
        // Mobile header check
        await expect(page.locator('header')).toBeVisible();
      } else {
        // Desktop navigation check
        await expect(page.locator('nav, header')).toBeVisible();
      }
    });
  }

});
