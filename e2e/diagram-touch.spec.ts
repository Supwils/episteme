import { expect, test, type Locator, type Page } from "@playwright/test";

const diagrams = [
  {
    name: "function plot",
    route: "/mathematics/concepts/derivative",
    selector: "svg:has(#plot-area)",
    tree: false,
  },
  {
    name: "phylogenetic tree",
    route: "/life-science/tree",
    selector: 'svg[role="tree"]',
    tree: true,
  },
];
const errors = new WeakMap<Page, string[]>();
test.beforeEach(async ({ page }) => {
  const messages: string[] = [];
  errors.set(page, messages);
  page.on("pageerror", (error) => messages.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
});
test.afterEach(({ page }) => expect(errors.get(page)).toEqual([]));

function panButton(page: Page) {
  return page.getByRole("button", { name: "触屏平移", exact: true });
}
async function surfaceOf(page: Page): Promise<Locator> {
  const id = await panButton(page).getAttribute("aria-controls");
  return page.locator(`[id=${JSON.stringify(id)}]`);
}
async function shapeOf(graph: Locator, tree: boolean) {
  return graph.evaluate(
    (element, tree) =>
      tree
        ? (element as SVGElement).style.transform
        : element.querySelector("g[clip-path] > path")?.getAttribute("d"),
    tree
  );
}
async function waitForSettledLayout(target: Locator) {
  await expect
    .poll(() =>
      target.evaluate((element) => {
        for (let ancestor: Element | null = element; ancestor; ancestor = ancestor.parentElement) {
          const style = getComputedStyle(ancestor);
          if (
            style.opacity !== "1" ||
            (style.transform !== "none" && !new DOMMatrixReadOnly(style.transform).isIdentity)
          )
            return false;
        }
        return true;
      })
    )
    .toBe(true);
}
async function placeSurface(surface: Locator) {
  await surface.scrollIntoViewIfNeeded();
  await waitForSettledLayout(surface);
  await surface.evaluate((element) =>
    window.scrollBy(0, element.getBoundingClientRect().top - 180)
  );
  return surface.boundingBox().then((box) => {
    if (!box) throw new Error("Missing diagram surface");
    return box;
  });
}
async function swipe(page: Page, surface: Locator, dx = 0, dy = -100, cancel = false) {
  const box = await placeSurface(surface);
  const x = box.x + box.width * 0.65,
    y = box.y + Math.min(200, box.height * 0.8);
  const session = await page.context().newCDPSession(page);
  try {
    await session.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x, y, id: 1 }],
    });
    for (let step = 1; step <= 10; step++) {
      await session.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x: x + (dx * step) / 10, y: y + (dy * step) / 10, id: 1 }],
      });
      await page.waitForTimeout(20);
    }
    await session.send("Input.dispatchTouchEvent", {
      type: cancel ? "touchCancel" : "touchEnd",
      touchPoints: [],
    });
    await page.waitForTimeout(200);
  } finally {
    await session.detach();
  }
}
async function expectDefault(surface: Locator, page: Page) {
  await expect(panButton(page)).toHaveAttribute("aria-pressed", "false");
  await expect(surface).toHaveCSS("touch-action", "manipulation");
}

for (const diagram of diagrams) {
  test(`${diagram.name}: native touch scroll, one-shot pan and cancel recovery`, async ({
    page,
    browserName,
    isMobile,
  }, testInfo) => {
    test.skip(
      browserName !== "chromium" || !isMobile,
      "Native swipes use Chromium CDP; WebKit tap/mouse checks do not prove Safari touch scrolling."
    );
    await page.goto(diagram.route);
    const graph = page.locator(diagram.selector),
      surface = await surfaceOf(page);
    await placeSurface(surface);
    const initial = await shapeOf(graph, diagram.tree),
      before = await page.evaluate(() => scrollY);
    await swipe(page, surface);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before + 25);
    expect(await shapeOf(graph, diagram.tree)).toBe(initial);
    await expectDefault(surface, page);
    await panButton(page).tap();
    await expect(panButton(page)).toHaveAttribute("aria-pressed", "true");
    await placeSurface(surface);
    const armedY = await page.evaluate(() => scrollY);
    await swipe(page, surface, -40, -80);
    await expect.poll(() => shapeOf(graph, diagram.tree)).not.toBe(initial);
    expect(await page.evaluate(() => scrollY)).toBe(armedY);
    await expectDefault(surface, page);
    const panned = await shapeOf(graph, diagram.tree);
    await placeSurface(surface);
    const nextY = await page.evaluate(() => scrollY);
    await swipe(page, surface);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(nextY + 25);
    expect(await shapeOf(graph, diagram.tree)).toBe(panned);
    await panButton(page).tap();
    await swipe(page, surface, 30, 30, true);
    await expectDefault(surface, page);
    await testInfo.attach("native-touch-evidence", {
      contentType: "application/json",
      body: JSON.stringify({
        route: diagram.route,
        defaultScrollStart: before,
        armedScrollY: armedY,
        graphChanged: panned !== initial,
      }),
    });
  });

  test(`${diagram.name}: mouse drag survives leaving the surface and controls can cancel`, async ({
    page,
  }) => {
    await page.goto(diagram.route);
    const graph = page.locator(diagram.selector),
      surface = await surfaceOf(page);
    const box = await placeSurface(surface),
      before = await shapeOf(graph, diagram.tree);
    await page.mouse.move(box.x + box.width * 0.65, box.y + 100);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.65 - 20, box.y + 60, { steps: 5 });
    await page.mouse.move(box.x - 10, box.y + 60, { steps: 5 });
    await page.mouse.up();
    await expect.poll(() => shapeOf(graph, diagram.tree)).not.toBe(before);
    await expectDefault(surface, page);
    const after = await shapeOf(graph, diagram.tree);
    await page.mouse.move(box.x + 100, box.y + 100);
    expect(await shapeOf(graph, diagram.tree)).toBe(after);
    await panButton(page).focus();
    await page.keyboard.press("Enter");
    await expect(panButton(page)).toHaveAttribute("aria-pressed", "true");
    await page.keyboard.press("Escape");
    await expectDefault(surface, page);
    await panButton(page).click();
    await page.getByRole("button", { name: "重置", exact: true }).click();
    await expectDefault(surface, page);
    await expect.poll(() => shapeOf(graph, diagram.tree)).toBe(before);
  });

  for (const width of [320, 390])
    for (const theme of ["dark", "light"]) {
      test(`${diagram.name}: ${width}px ${theme} keeps controls visible in both modes`, async ({
        page,
      }) => {
        await page.setViewportSize({ width, height: 800 });
        await page.addInitScript((theme) => localStorage.setItem("theme", theme), theme);
        await page.goto(diagram.route);
        const button = panButton(page),
          surface = await surfaceOf(page);
        await page.evaluate(() => document.fonts.ready.then(() => undefined));
        await button.scrollIntoViewIfNeeded();
        await waitForSettledLayout(button);
        await expect(button).toBeVisible();
        const box = await button.boundingBox();
        expect(box!.height).toBeGreaterThanOrEqual(44);
        for (const control of [button, page.getByRole("button", { name: "重置", exact: true })]) {
          expect(
            await control.evaluate((element) => {
              const range = document.createRange();
              range.selectNodeContents(element);
              return range.getClientRects().length;
            })
          ).toBe(1);
        }
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(width);
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
          width
        );
        const documentY = await button.evaluate(
          (element) => element.getBoundingClientRect().top + scrollY
        );
        await button.click();
        await expect(surface).toHaveCSS("touch-action", "none");
        const armedBox = await button.boundingBox();
        expect(armedBox!.x).toBe(box!.x);
        expect(armedBox!.width).toBe(box!.width);
        expect(armedBox!.height).toBe(box!.height);
        expect(
          await button.evaluate((element) => element.getBoundingClientRect().top + scrollY)
        ).toBeCloseTo(documentY, 0);
        await button.click();
        await expectDefault(surface, page);
      });
    }
}

test("tree node taps and keyboard expansion survive a drag", async ({ page, isMobile }) => {
  await page.goto("/life-science/tree");
  const surface = await surfaceOf(page),
    root = page.getByRole("treeitem", { name: /LUCA/ });
  await expect(root).toHaveAttribute("aria-expanded", "true");
  if (isMobile) await root.locator("circle").last().tap();
  else await root.locator("circle").last().click();
  await expect(root).toHaveAttribute("aria-expanded", "false");
  await root.focus();
  await page.keyboard.press("Enter");
  await expect(root).toHaveAttribute("aria-expanded", "true");
  await root.scrollIntoViewIfNeeded();
  const node = await root.locator("circle").last().boundingBox();
  await page.mouse.move(node!.x + node!.width / 2, node!.y + node!.height / 2);
  await page.mouse.down();
  await page.mouse.move(node!.x + 50, node!.y + 30, { steps: 10 });
  await page.mouse.up();
  await expect(root).toHaveAttribute("aria-expanded", "true");
  await expectDefault(surface, page);
});

test("function taps, preset selection, zoom and overlays remain usable", async ({
  page,
  isMobile,
}) => {
  await page.goto("/mathematics/concepts/derivative");
  const graph = page.locator("svg:has(#plot-area)"),
    surface = await surfaceOf(page);
  const box = await placeSurface(surface);
  if (isMobile) await page.touchscreen.tap(box.x + box.width * 0.6, box.y + box.height * 0.6);
  else await page.mouse.click(box.x + box.width * 0.6, box.y + box.height * 0.6);
  await expect(page.getByText(/\(-?\d+\.\d{2}, -?\d+\.\d{2}\)/)).toBeVisible();
  await panButton(page).click();
  await page.getByLabel("选择函数预设").selectOption("1");
  await expectDefault(surface, page);
  await page.getByRole("button", { name: "放大", exact: true }).click();
  await expect(page.getByText("1.3×", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "f'(x) 导数", exact: true }).click();
  await page.getByRole("button", { name: "∫f(x) 积分", exact: true }).click();
  await expect(graph.locator('path[stroke="#ef4444"]')).toBeAttached();
  await expect(graph.locator('path[fill="#22c55e"]')).toBeAttached();
});
