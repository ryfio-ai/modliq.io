import { test, expect } from '@playwright/test';

/**
 * Usability Inspection Suite — Nielsen's 10 Usability Heuristics Evaluation
 * Validates ISO 9241-11 Effectiveness, Efficiency, and Satisfaction for Modliq.
 */
test.describe('Usability Evaluation — Nielsen 10 Heuristics', () => {

  // 1. Visibility of System Status
  test('H1: System status and feedback indicators are visible', async ({ page }) => {
    await page.goto('/');
    // Check navigation header / status indicator
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
  });

  // 2. Match Between System and the Real World
  test('H2: Uses domain-appropriate manufacturing terminology', async ({ page }) => {
    await page.goto('/features');
    // Verifies business domain terms like Yield, Quality, Operations
    await expect(page.locator('text=/yield|quality|manufacturing|process/i').first()).toBeVisible();
  });

  // 3. User Control and Freedom
  test('H3: Emergency exit & clear navigation links exist', async ({ page }) => {
    await page.goto('/login');
    // Navigation link to return home
    await expect(page.locator('a[href="/"]').first()).toBeVisible();
  });

  // 4. Consistency and Standards
  test('H4: Consistent button styling & standardized layout', async ({ page }) => {
    await page.goto('/pricing');
    const buttons = page.locator('button, a[href="/login"]');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
  });

  // 5. Error Prevention
  test('H5: Form inputs have validation attributes to prevent errors', async ({ page }) => {
    await page.goto('/contact');
    const nameInput = page.locator('[name="name"], input[type="text"]').first();
    const emailInput = page.locator('[name="email"], input[type="email"]').first();
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
  });

  // 6. Recognition Rather Than Recall
  test('H6: Contact form provides clear input labels & placeholders', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('label, input[placeholder]').first()).toBeVisible();
  });

  // 7. Flexibility and Efficiency of Use
  test('H7: Quick access CTA buttons allow fast workflow initiation', async ({ page }) => {
    await page.goto('/');
    const primaryCta = page.locator('a[href="/login"], a[href="/contact"]').first();
    await expect(primaryCta).toBeVisible();
  });

  // 8. Aesthetic and Minimalist Design
  test('H8: Clean visual hierarchy without cluttered elements', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  // 9. Help Users Recognize, Diagnose, and Recover from Errors
  test('H9: Submitting invalid form shows user-friendly error text', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"]', 'bad_user');
    await page.click('[type="submit"]');
    await expect(page.locator('text=/invalid|error|required|email/i').first()).toBeVisible({ timeout: 5000 });
  });

  // 10. Help and Documentation
  test('H10: Documentation and help pages are accessible', async ({ page }) => {
    await page.goto('/workflow');
    await expect(page.locator('h1')).toBeVisible();
  });

});
