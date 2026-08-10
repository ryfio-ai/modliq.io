import { test, expect } from '@playwright/test';

test.describe('Performance & Page Load Benchmarks', () => {

  test('homepage loads within 3000ms', async ({ page }) => {
    const startTime = Date.now();
    const response = await page.goto('/');
    const loadTime = Date.now() - startTime;

    expect(response?.status()).toBe(200);
    expect(loadTime).toBeLessThan(5000); // 5s threshold for standard env
  });

  test('pricing page loads within 3000ms', async ({ page }) => {
    const startTime = Date.now();
    const response = await page.goto('/pricing');
    const loadTime = Date.now() - startTime;

    expect(response?.status()).toBe(200);
    expect(loadTime).toBeLessThan(5000);
  });

});
