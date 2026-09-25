import { expect, type Page } from "@playwright/test";

/**
 * The homepage continuum keeps its five deep modules behind tabs (E4). Bring
 * the continuum in, wait for it to hydrate, and open the named tab.
 */
export async function openContinuumTab(page: Page, name: RegExp) {
  const continuum = page.getByTestId("home-knowledge-continuum");
  await continuum.scrollIntoViewIfNeeded();
  await continuum.evaluate((element) => {
    const expand = Array.from(element.querySelectorAll("button")).find(
      (button) => button.textContent?.trim() === "展开交互图谱"
    );
    expand?.click();
  });
  const tab = continuum.getByRole("tab", { name });
  await expect(tab).toBeVisible({ timeout: 15_000 });
  await tab.click();
  await expect(tab).toHaveAttribute("aria-selected", "true");
}
