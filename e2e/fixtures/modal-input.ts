import { expect, type Locator, type Page } from "@playwright/test";

export async function nativeSwipe(page: Page, { x = 8, y = 500, dy = -100, cancel = false } = {}) {
  const session = await page.context().newCDPSession(page);
  try {
    await session.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x, y, id: 1 }],
    });
    for (let step = 1; step <= 10; step++) {
      await session.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x, y: y + (dy * step) / 10, id: 1 }],
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

export async function tabToDialogStart(page: Page, dialog: Locator) {
  await page.keyboard.press("Tab");
  if (!(await dialog.evaluate((element) => element.contains(document.activeElement)))) {
    // The native sequence may visit browser chrome; an active background control is never allowed.
    expect(
      await page.evaluate(() => document.activeElement === document.body && !document.hasFocus())
    ).toBe(true);
    await page.keyboard.press("Tab");
  }
  expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
}
