// @vitest-environment happy-dom
import React from "react";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { WikiLinkPreview } from "../markdown/MarkdownInteractions";

const PREVIEWS = {
  "/sociology/concepts/social-capital": {
    t: "社会资本",
    e: "关系网络中的信任、互惠与机会。",
    d: "sociology",
  },
};

function mockTouch(matches: boolean) {
  window.matchMedia = ((query: string) => ({
    matches: query === "(hover: none)" ? matches : false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    onchange: null,
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
}

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(PREVIEWS) }))
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("WikiLinkPreview touch behavior", () => {
  it("first tap on a touch device opens the preview card instead of navigating", async () => {
    mockTouch(true);
    render(<WikiLinkPreview href="/sociology/concepts/social-capital" label="社会资本" />);

    const link = screen.getByRole("link", { name: "社会资本" });
    fireEvent.click(link);

    // Navigation suppressed on first tap; preview card appears with a go-link.
    await waitFor(() => expect(screen.getByRole("tooltip")).toBeTruthy());
    expect(screen.getByText("前往阅读 →")).toBeTruthy();
    expect(link.getAttribute("aria-expanded")).toBe("true");
  });

  it("hover still drives the preview on non-touch devices", async () => {
    mockTouch(false);
    render(<WikiLinkPreview href="/sociology/concepts/social-capital" label="社会资本" />);

    fireEvent.mouseEnter(screen.getByRole("link", { name: "社会资本" }));
    await waitFor(() => expect(screen.getByRole("tooltip")).toBeTruthy());
    // Desktop tooltip has no go-link (the hovered link itself navigates).
    expect(screen.queryByText("前往阅读 →")).toBeNull();
  });
});
