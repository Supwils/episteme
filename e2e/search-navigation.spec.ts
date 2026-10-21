import { expect, test, type Page, type Route } from "@playwright/test";

type SearchProbe = { documentId: number; calls: Array<{ query: string | null; aborted: boolean }> };
declare global {
  interface Window {
    searchNavigationProbe: SearchProbe;
  }
}
const errors = new WeakMap<Page, string[]>();
const dialog = (page: Page) => page.getByRole("dialog", { name: "全站搜索", exact: true });
const probe = (page: Page) => page.evaluate(() => window.searchNavigationProbe);

test.beforeEach(async ({ page }) => {
  const messages: string[] = [];
  errors.set(page, messages);
  page.on("pageerror", (error) => messages.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    const state: SearchProbe = { documentId: Math.random(), calls: [] };
    window.searchNavigationProbe = state;
    const nativeFetch = window.fetch;
    window.fetch = function (resource, init) {
      const url = new URL(
        resource instanceof Request ? resource.url : String(resource),
        location.href
      );
      if (url.pathname === "/api/search") {
        const call = { query: url.searchParams.get("q"), aborted: init?.signal?.aborted ?? false };
        init?.signal?.addEventListener("abort", () => (call.aborted = true), { once: true });
        state.calls.push(call);
      }
      return nativeFetch.call(this, resource, init);
    };
  });
});
test.afterEach(({ page }) => expect(errors.get(page)).toEqual([]));

async function openSearch(page: Page) {
  // This entry also exists on the minimal /curiosities shell without a header trigger.
  await expect(async () => {
    await page.keyboard.press("Control+k");
    await expect(dialog(page)).toBeVisible({ timeout: 1000 });
  }).toPass({ timeout: 15_000 });
  await expect(dialog(page).getByRole("textbox", { name: "搜索", exact: true })).toBeFocused();
}

async function prepareParameters(page: Page, traversal: string) {
  await page.goto("/curiosities");
  // History must be changed after hydration installs Next's native-history integration.
  await openSearch(page);
  await page.keyboard.press("Escape");
  if (traversal !== "back" && traversal !== "forward") return;
  await page.evaluate(() => history.pushState(null, "", "?filter=cross-domain"));
  await expect(page).toHaveURL(/\?filter=cross-domain$/);
  if (traversal === "forward") {
    await page.goBack();
    await expect(page).toHaveURL(/\/curiosities$/);
  }
}

async function holdBodySearch(page: Page) {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => (release = resolve));
  let markStarted!: () => void;
  const started = new Promise<void>((resolve) => (markStarted = resolve));
  let markFinished!: () => void;
  const finished = new Promise<void>((resolve) => (markFinished = resolve));
  const handler = async (route: Route) => {
    markStarted();
    await gate;
    const query = new URL(route.request().url()).searchParams.get("q");
    try {
      await route.fulfill({ json: { query, hits: [] } });
    } finally {
      markFinished();
    }
  };
  await page.route("**/api/search?**", handler);
  await dialog(page).getByRole("textbox", { name: "搜索", exact: true }).fill("旧查询");
  await expect.poll(async () => (await probe(page)).calls.length).toBe(1);
  await started;
  expect((await probe(page)).calls[0]!.aborted).toBe(false);
  return async () => {
    release();
    await finished;
    await page.unroute("**/api/search?**", handler);
  };
}

async function expectReleased(page: Page, documentId: number) {
  await expect(dialog(page)).toHaveCount(0);
  await expect.poll(async () => (await probe(page)).calls[0]!.aborted).toBe(true);
  expect((await probe(page)).documentId).toBe(documentId);
  expect(await page.evaluate(() => document.documentElement.style.overflowY)).toBe("");
  expect(await page.evaluate(() => document.body.style.overflowY)).toBe("");
}

for (const traversal of ["back", "forward"] as const) {
  test(`path ${traversal} releases the search session without replacing the document`, async ({
    page,
  }) => {
    await page.goto("/life-science");
    await page.getByRole("link", { name: "返回首页", exact: true }).click();
    await expect(page).toHaveURL(/\/$/);
    if (traversal === "forward") {
      await page.goBack();
      await expect(page).toHaveURL(/\/life-science$/);
    }
    await openSearch(page);
    const release = await holdBodySearch(page);
    try {
      const { documentId } = await probe(page);
      if (traversal === "back") await page.goBack();
      else await page.goForward();
      await expect(page).toHaveURL(traversal === "back" ? /\/life-science$/ : /\/$/);
      await expectReleased(page, documentId);
    } finally {
      await release();
    }
  });
}

for (const traversal of ["push", "replace", "back", "forward"] as const) {
  test(`query parameter ${traversal} closes search and aborts its pending request`, async ({
    page,
  }) => {
    await prepareParameters(page, traversal);
    await openSearch(page);
    const release = await holdBodySearch(page);
    try {
      const { documentId } = await probe(page);
      if (traversal === "back") await page.goBack();
      else if (traversal === "forward") await page.goForward();
      else
        await page.evaluate((replace) => {
          if (replace) history.replaceState(null, "", "?filter=cross-domain");
          else history.pushState(null, "", "?filter=cross-domain");
        }, traversal === "replace");
      await expect(page).toHaveURL(
        traversal === "back" ? /\/curiosities$/ : /\?filter=cross-domain$/
      );
      await expectReleased(page, documentId);
    } finally {
      await release();
    }
  });
}

test("same-URL history updates preserve the query until the reader closes it", async ({ page }) => {
  await prepareParameters(page, "replace");
  await openSearch(page);
  const release = await holdBodySearch(page);
  try {
    const { documentId } = await probe(page);
    await page.evaluate(() => history.replaceState({ marker: "same-url" }, "", location.href));
    await page.waitForTimeout(300);
    await expect(dialog(page)).toBeVisible();
    await expect(dialog(page).getByRole("textbox", { name: "搜索", exact: true })).toHaveValue(
      "旧查询"
    );
    expect((await probe(page)).calls[0]!.aborted).toBe(false);
    await dialog(page).getByRole("button", { name: "关闭搜索", exact: true }).click();
    await expectReleased(page, documentId);
  } finally {
    await release();
  }
  await openSearch(page);
  await expect(dialog(page).getByRole("textbox", { name: "搜索", exact: true })).toHaveValue("");
  await dialog(page).getByRole("textbox", { name: "搜索", exact: true }).fill("双缝干涉实验");
  await expect(dialog(page).getByTestId("gs-body-group")).toContainText("光的干涉与衍射");
});
