import { test, expect } from '@playwright/test';

test('global search opens with Ctrl+K', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Control+k');
  await expect(page.locator('[placeholder*="搜索"]')).toBeVisible();
});
