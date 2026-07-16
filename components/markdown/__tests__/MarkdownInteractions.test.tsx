// @vitest-environment happy-dom
import React from "react";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MarkdownCodeBlock, MarkdownZoomableImage, WikiLinkPreview } from "../MarkdownInteractions";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

beforeEach(() => {
  vi.useRealTimers();
});

describe("Markdown interactions", () => {
  it("fetches a wiki preview only after keyboard focus settles", async () => {
    vi.useFakeTimers();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        "/sociology/institutions/bureaucracy": {
          t: "科层制",
          e: "以职位、规则与层级组织行政行动。",
          d: "sociology",
        },
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<WikiLinkPreview href="/sociology/institutions/bureaucracy" label="科层制" />);
    fireEvent.focus(screen.getByRole("link", { name: "科层制" }));
    expect(fetchMock).not.toHaveBeenCalled();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(200);
    });

    expect(fetchMock).toHaveBeenCalledWith("/link-previews.json");
    expect(screen.getByRole("tooltip").textContent).toContain("社会学");
    expect(screen.getByRole("tooltip").textContent).toContain("以职位、规则与层级组织行政行动。");
  });

  it("copies a code block without hydrating the surrounding article", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(<MarkdownCodeBlock code="const answer = 42;" language="ts" accentColor="#fff" />);
    fireEvent.click(screen.getByRole("button", { name: "复制代码" }));

    expect(writeText).toHaveBeenCalledWith("const answer = 42;");
    await waitFor(() => expect(screen.getByRole("button", { name: "已复制" })).toBeDefined());
  });

  it("opens and closes the image dialog locally", () => {
    render(<MarkdownZoomableImage src="/example.png" alt="示意图" accentColor="#fff" />);

    fireEvent.click(screen.getByRole("button"));
    const dialog = screen.getByRole("dialog", { name: "示意图" });
    expect(dialog).toBeDefined();
    fireEvent.click(dialog);
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
