// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ReadingModeControls } from "../ReadingModeControls";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  window.localStorage.clear();
  delete document.documentElement.dataset.readingMode;
});

describe("reading mode storage boundary", () => {
  it("restores a supported saved mode", () => {
    window.localStorage.setItem("episteme-reading-mode", "focus");
    render(<ReadingModeControls />);
    expect(screen.getByRole("button", { name: "专注阅读模式" }).getAttribute("aria-pressed")).toBe(
      "true"
    );
    expect(document.documentElement.dataset.readingMode).toBe("focus");
  });

  it("ignores unsupported stored modes", () => {
    window.localStorage.setItem("episteme-reading-mode", "unknown");
    render(<ReadingModeControls />);
    expect(document.documentElement.dataset.readingMode).toBe("standard");
  });

  it("keeps the standard mode when reading storage throws", () => {
    vi.spyOn(window.localStorage, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(() => render(<ReadingModeControls />)).not.toThrow();
    expect(document.documentElement.dataset.readingMode).toBe("standard");
  });

  it("remains usable even when accessing localStorage itself throws", () => {
    vi.spyOn(window, "localStorage", "get").mockImplementation(() => {
      throw new Error("disabled");
    });
    expect(() => render(<ReadingModeControls />)).not.toThrow();
    fireEvent.click(screen.getByRole("button", { name: "专注阅读模式" }));
    expect(document.documentElement.dataset.readingMode).toBe("focus");
  });

  it("updates the current mode when persisting it fails", () => {
    vi.spyOn(window.localStorage, "setItem").mockImplementation(() => {
      throw new Error("quota exceeded");
    });
    render(<ReadingModeControls />);
    const onError = vi.fn((event: ErrorEvent) => event.preventDefault());
    window.addEventListener("error", onError);
    try {
      fireEvent.click(screen.getByRole("button", { name: "宽松阅读模式" }));
      expect(onError).not.toHaveBeenCalled();
    } finally {
      window.removeEventListener("error", onError);
    }
    expect(document.documentElement.dataset.readingMode).toBe("spacious");
    expect(screen.getByRole("button", { name: "宽松阅读模式" }).getAttribute("aria-pressed")).toBe(
      "true"
    );
  });
});
