import { expect, test } from "@playwright/test";

test("loads the secondary history timeline only after explicit interaction", async ({ page }) => {
  await page.goto("/human-history");

  const featuredFigures = page.locator(".figures-grid");
  await expect(featuredFigures).toBeVisible();
  await expect(featuredFigures).toHaveCSS("display", "grid");
  await expect(featuredFigures.locator(".figure-card").first()).toHaveCSS(
    "border-top-style",
    "solid"
  );

  const revealTimeline = page.getByRole("button", {
    name: "展开交互时间线",
  });
  await expect(revealTimeline).toBeVisible();
  await expect(page.getByText("埃及金字塔", { exact: true })).toHaveCount(0);

  await revealTimeline.click();

  await expect(page.getByText("埃及金字塔", { exact: true })).toBeVisible();
  await expect(revealTimeline).toHaveCount(0);
});

test("loads timeline prose on demand and exposes the exact event article", async ({
  page,
}) => {
  await page.goto(
    `/human-history/timeline?event=${encodeURIComponent("农业革命")}`,
  );

  const detailCard = page.locator(".paginated-card");
  await expect(detailCard).toBeVisible();
  await expect(detailCard.locator(".pc-title")).toHaveText("农业革命");
  await expect(detailCard.locator(".pc-page-body")).not.toBeEmpty();

  const articleLink = page
    .locator('.tl-event[data-title="农业革命"]')
    .getByRole("link", { name: "查看详情页" });
  await expect(articleLink).toHaveAttribute(
    "href",
    `/human-history/events/${encodeURIComponent("农业革命")}`,
  );

  await articleLink.click();
  await expect(page).toHaveURL(
    new RegExp(`/human-history/events/${encodeURIComponent("农业革命")}$`),
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "农业革命",
  );
});
