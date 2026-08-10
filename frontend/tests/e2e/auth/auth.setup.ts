import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../.auth/user.json');
const adminFile = path.join(__dirname, '../.auth/admin.json');

// Regular user auth state
setup('authenticate as engineer', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', process.env.TEST_USER_EMAIL || 'test@modliq.io');
  await page.fill('[name="password"]', process.env.TEST_USER_PASSWORD || 'TestPass123!');
  await page.click('[type="submit"]');
  await page.waitForURL('**/modliq-console/**');
  await expect(page).toHaveURL(/modliq-console/);
  await page.context().storageState({ path: authFile });
});

// Admin auth state
setup('authenticate as admin', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', process.env.TEST_ADMIN_EMAIL || 'admin@modliq.io');
  await page.fill('[name="password"]', process.env.TEST_ADMIN_PASSWORD || 'AdminPass123!');
  await page.click('[type="submit"]');
  await page.waitForURL('**/admin**');
  await page.context().storageState({ path: adminFile });
});
