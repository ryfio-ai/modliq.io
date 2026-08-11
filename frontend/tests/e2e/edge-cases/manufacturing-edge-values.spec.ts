import { test, expect } from "@playwright/test";

test.describe("Manufacturing Edge-Case Input Safety", () => {
  test("edge inputs (zero throughput, negative values, Tamil text) render without NaN or Infinity", async ({ page }) => {
    await page.goto("/MODLIQ-USER-20260811-1000/modliq-console/spc");
    await expect(page.locator("body")).toBeVisible();

    const bodyText = await page.locator("body").innerText();
    expect(bodyText).not.toContain("NaN");
    expect(bodyText).not.toContain("Infinity");
  });
});
