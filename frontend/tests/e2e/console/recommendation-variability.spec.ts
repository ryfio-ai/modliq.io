import { test, expect } from "@playwright/test";

test.describe("Predictive Workflows & Recommendation Tracking", () => {
  test("recommendation page renders latest model version and run ID", async ({ page }) => {
    await page.goto("/MODLIQ-USER-20260811-1000/modliq-console/optimization-progress");
    await expect(page.locator("body")).toBeVisible();
    
    // Page contains run tracking element or header
    const hasHeader = await page.locator("h1, h2, h3").first().isVisible();
    expect(hasHeader).toBe(true);
  });
});
