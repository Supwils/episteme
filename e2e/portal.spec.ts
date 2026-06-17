import { test, expect } from "@playwright/test";

test("portal home page loads", async ({ page }) => {
  await page.goto("/");
  // The hero H1 ("探索人类知识的边界") is unique; the brand string appears in
  // both the nav and the hero eyebrow, so target the heading instead.
  await expect(page.getByRole("heading", { name: /探索人类/ })).toBeVisible();
});

test("domain cards are visible", async ({ page }) => {
  await page.goto("/");
  // Each DomainCard carries a stable data-domain attribute; the plain domain
  // names also appear in the hero copy, daily cards and footer, so scope to
  // the cards to test what we actually mean.
  await expect(page.locator('[data-domain="universe-physics"]')).toBeVisible();
  await expect(page.locator('[data-domain="human-history"]')).toBeVisible();
  await expect(page.locator('[data-domain="philosophy"]')).toBeVisible();
});

test("navigation to philosophy works", async ({ page }) => {
  await page.goto("/philosophy");
  await expect(page.locator(".philosophy-root")).toBeVisible();
  await expect(page.getByText("哲学家").first()).toBeVisible();
});
