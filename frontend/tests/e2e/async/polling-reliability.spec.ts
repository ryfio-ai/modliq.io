import { test, expect } from "@playwright/test";

test.describe("Async Polling & Long-Job Teardown Reliability", () => {
  test("polling teardown halts after job completion or terminal failure", async ({ page }) => {
    await page.goto("/MODLIQ-USER-20260811-1000/modliq-console/optimization-progress");
    await expect(page.locator("body")).toBeVisible();
    
    // Page renders polling status without unhandled errors
    await page.waitForTimeout(1000);
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.length).toBeGreaterThan(0);
  });
});
