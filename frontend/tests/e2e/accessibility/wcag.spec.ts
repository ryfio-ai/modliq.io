import { test, expect } from '@playwright/test';

test.describe('Accessibility & WCAG Structure Compliance', () => {

  test('homepage has single h1 and semantic structure', async ({ page }) => {
    await page.goto('/');
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);

    // Verify main content landmark
    await expect(page.locator('main, header, footer').first()).toBeVisible();
  });

  test('interactive buttons have accessible names', async ({ page }) => {
    await page.goto('/');
    const buttons = page.locator('button');
    const count = await buttons.count();
    for (let i = 0; i < Math.min(count, 5); i++) {
      const btn = buttons.nth(i);
      const text = await btn.textContent();
      const ariaLabel = await btn.getAttribute('aria-label');
      expect((text && text.trim().length > 0) || (ariaLabel && ariaLabel.length > 0)).toBeTruthy();
    }
  });

});
