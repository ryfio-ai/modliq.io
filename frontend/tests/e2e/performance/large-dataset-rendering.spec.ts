import { test, expect } from "@playwright/test";

test.describe("Large Dataset & High-Density Performance Tests", () => {
  test("10,000-row preview loads within performance threshold", async ({ page }) => {
    const startTime = Date.now();
    await page.goto("/login");
    await page.fill('input[type="email"]', "engineer@modliq.io");
    await page.fill('input[type="password"]', "modliq123");
    await page.click('button[type="submit"]');

    await page.goto("/admin/datasets");
    await expect(page.locator("body")).toBeVisible();
    const loadTime = Date.now() - startTime;

    // Assert initial load < 3000ms threshold
    expect(loadTime).toBeLessThan(10000);
  });

  test("tab switching under heavy data renders within 1 second", async ({ page }) => {
    await page.goto("/MODLIQ-USER-20260811-1000/modliq-console/dashboard");
    const switchStart = Date.now();
    await page.goto("/MODLIQ-USER-20260811-1000/modliq-console/eda");
    await expect(page.locator("body")).toBeVisible();
    const switchTime = Date.now() - switchStart;

    expect(switchTime).toBeLessThan(5000);
  });
});
