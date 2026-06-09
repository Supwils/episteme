import { test, expect } from '@playwright/test';

test('portal home page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=Universe Knowledge')).toBeVisible();
});

test('domain cards are visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=宇宙物理')).toBeVisible();
  await expect(page.locator('text=人类历史')).toBeVisible();
  await expect(page.locator('text=哲学思想')).toBeVisible();
});

test('navigation to philosophy works', async ({ page }) => {
  await page.goto('/philosophy');
  await expect(page.locator('text=哲学家')).toBeVisible();
});
