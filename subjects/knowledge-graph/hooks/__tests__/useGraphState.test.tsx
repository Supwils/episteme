// @vitest-environment happy-dom
import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useIsMobile } from "../useGraphState";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useIsMobile", () => {
  it("uses the current media query on the first client render", () => {
    vi.spyOn(window, "matchMedia").mockImplementation(
      () =>
        ({
          matches: true,
          media: "(max-width: 768px)",
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          addListener: vi.fn(),
          removeListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }) as MediaQueryList
    );

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });
});
