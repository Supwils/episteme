// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from "vitest";
import { READING_MODE_BOOT_SCRIPT, READING_MODE_STORAGE_KEY } from "../reading-mode";

const boot = () => new Function(READING_MODE_BOOT_SCRIPT)();

afterEach(() => {
  window.localStorage.clear();
  delete document.documentElement.dataset.readingMode;
});

describe("reading mode boot script", () => {
  it("applies a saved mode before the page hydrates", () => {
    window.localStorage.setItem(READING_MODE_STORAGE_KEY, "spacious");
    boot();
    expect(document.documentElement.dataset.readingMode).toBe("spacious");
  });

  it("ignores an unknown stored value", () => {
    window.localStorage.setItem(READING_MODE_STORAGE_KEY, "<img>");
    boot();
    expect(document.documentElement.dataset.readingMode).toBeUndefined();
  });
});
