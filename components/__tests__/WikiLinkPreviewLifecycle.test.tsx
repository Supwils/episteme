// @vitest-environment happy-dom
import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { WikiLinkPreview } from "../markdown/MarkdownInteractions";

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
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

// Each scenario uses a different domain because successful shards are shared.
function setup(domain: string) {
  vi.useFakeTimers();
  const href = `/${domain}/concepts/example`;
  let release!: (response: unknown) => void;
  const fetchMock = vi.fn().mockReturnValue(
    new Promise((resolve) => {
      release = resolve;
    })
  );
  vi.stubGlobal("fetch", fetchMock);
  const view = render(<WikiLinkPreview href={href} label="预览条目" />);
  const link = screen.getByRole("link", { name: "预览条目" });
  return {
    ...view,
    link,
    fetchMock,
    finish: () =>
      act(async () =>
        release({ ok: true, json: async () => ({ [href]: { t: "标题", e: "摘要", d: domain } }) })
      ),
  };
}

describe("wiki preview request lifecycle", () => {
  it.each([
    { domain: "philosophy", event: "leave" },
    { domain: "economics", event: "blur" },
  ])(
    "ignores a late response after $event but allows a fresh interaction",
    async ({ domain, event }) => {
      const { link, fetchMock, finish } = setup(domain);
      fireEvent.focus(link);
      await act(async () => vi.advanceTimersByTimeAsync(200));
      expect(fetchMock).toHaveBeenCalledTimes(1);
      if (event === "leave") fireEvent.mouseLeave(link.parentElement!);
      else fireEvent.blur(link);
      await finish();
      expect(screen.queryByRole("tooltip")).toBeNull();
      fireEvent.focus(link);
      await act(async () => vi.advanceTimersByTimeAsync(200));
      expect(screen.getByRole("tooltip")).toBeTruthy();
      expect(fetchMock).toHaveBeenCalledTimes(1);
    }
  );

  it("invalidates a pending touch preview on an outside tap", async () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({ matches: true } as MediaQueryList);
    const { link, finish } = setup("psychology");
    fireEvent.click(link);
    fireEvent.pointerDown(document.body);
    await finish();
    expect(screen.queryByRole("tooltip")).toBeNull();
    fireEvent.click(link);
    await act(async () => {});
    expect(screen.getByRole("tooltip")).toBeTruthy();
  });

  it("does not show the old href's preview after the link changes", async () => {
    const { link, rerender, finish } = setup("medicine");
    fireEvent.focus(link);
    await act(async () => vi.advanceTimersByTimeAsync(200));
    rerender(<WikiLinkPreview href="/chemistry/concepts/new" label="新条目" />);
    await finish();
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("clears the hover delay when unmounted before the request starts", async () => {
    const { link, unmount, fetchMock } = setup("engineering");
    fireEvent.focus(link);
    unmount();
    await act(async () => vi.advanceTimersByTimeAsync(200));
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
