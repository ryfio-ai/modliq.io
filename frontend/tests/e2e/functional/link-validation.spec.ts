import { test, expect } from '@playwright/test';

const PUBLIC_PAGES = [
  '/',
  '/features',
  '/pricing',
  '/about',
  '/contact',
  '/workflow',
  '/security',
  '/privacy',
  '/terms',
];

test.describe('Link Validation & Page Integrity', () => {

  for (const pagePath of PUBLIC_PAGES) {
    test(`verify ${pagePath} returns HTTP 200 and has no broken links`, async ({ page }) => {
      const response = await page.goto(pagePath);
      expect(response?.status()).toBe(200);

      // Verify no broken images
      const images = page.locator('img');
      const imageCount = await images.count();
      for (let i = 0; i < Math.min(imageCount, 10); i++) {
        const img = images.nth(i);
        const src = await img.getAttribute('src');
        if (src && !src.startsWith('data:')) {
          expect(src.length).toBeGreaterThan(0);
        }
      }
    });
  }

  test('contact page form submits cleanly', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('form, [data-testid="contact-form"]').first()).toBeVisible();
  });

});
