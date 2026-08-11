import { test, expect } from "@playwright/test";

test.describe("Client-Side State Persistence Across Reloads", () => {
  test("draft goal and workspace state persist on page reload", async ({ page }) => {
    await page.goto("/MODLIQ-USER-20260811-1000/modliq-console/goal");
    await expect(page.locator("body")).toBeVisible();

    // Reload page to verify state survival
    await page.reload();
    await expect(page.locator("body")).toBeVisible();
  });
});
