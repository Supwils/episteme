// @vitest-environment happy-dom
import React from "react";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GlobalSearch } from "../GlobalSearch";
import type { SearchHit } from "@/lib/search/client";

const socrates: SearchHit = {
  title: "苏格拉底",
  subtitle: "Socrates",
  url: "/philosophy/thinkers/socrates",
  section: "philosophy",
  kind: "thinker",
  score: 10,
};

/** Held open so a test can decide when the index becomes available. */
let releaseTitleSearch: ((hits: SearchHit[]) => void) | undefined;

vi.mock("@/lib/search/client", () => ({
  createSearchClient: () => ({
    search: () =>
      new Promise<SearchHit[]>((resolve) => {
        releaseTitleSearch = resolve;
      }),
    dispose: () => {},
  }),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const routerPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: routerPush }),
}));

function open() {
  render(<GlobalSearch />);
  act(() => document.dispatchEvent(new Event("open-global-search")));
}

function type(value: string) {
  fireEvent.change(screen.getByRole("textbox", { name: "搜索" }), { target: { value } });
}

afterEach(() => {
  cleanup();
  releaseTitleSearch = undefined;
  routerPush.mockClear();
  window.localStorage.clear();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("GlobalSearch", () => {
  it("recomputes results when the index finishes loading after the user types", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    open();
    type("苏格拉底");

    await waitFor(() => expect(releaseTitleSearch).toBeDefined());
    expect(screen.queryByRole("option")).toBeNull();

    await act(async () => releaseTitleSearch?.([socrates]));

    const result = await screen.findByRole("option");
    expect(result.getAttribute("href")).toBe("/philosophy/thinkers/socrates");
  });

  it("shows body-phrase matches under their own heading", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          query: "认识你自己",
          hits: [
            {
              title: "德尔斐神谕",
              subtitle: "",
              url: "/philosophy/concepts/delphi",
              section: "philosophy",
              kind: "concept",
              snippet: "神庙上刻着认识你自己这句箴言",
              matchStart: 4,
            },
          ],
        }),
      })
    );
    open();
    type("认识你自己");

    await waitFor(() => expect(releaseTitleSearch).toBeDefined());
    await act(async () => releaseTitleSearch?.([]));

    expect(await screen.findByTestId("gs-body-group")).toBeTruthy();
    expect(await screen.findByText(/正文中提到/)).toBeTruthy();
    const hit = await screen.findByRole("option");
    expect(hit.getAttribute("href")).toBe("/philosophy/concepts/delphi");
    expect(hit.textContent).toContain("哲学思想");
  });

  it("offers curated exits on the idle empty panel", () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    open();
    expect(screen.getByRole("link", { name: "阅读路线" }).getAttribute("href")).toBe("/read");
    expect(screen.getByRole("link", { name: "每日知识" }).getAttribute("href")).toBe("/daily");
    expect(screen.getByRole("link", { name: "奇趣知识" }).getAttribute("href")).toBe(
      "/curiosities"
    );
  });

  it("offers curated exits and Enter-to-search when a query returns nothing", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    open();
    type("zzzznotanarticlezzzz");

    await waitFor(() => expect(releaseTitleSearch).toBeDefined());
    await act(async () => releaseTitleSearch?.([]));

    expect(await screen.findByText(/未找到/)).toBeTruthy();
    expect(screen.getByRole("link", { name: "阅读路线" }).getAttribute("href")).toBe("/read");
    expect(screen.getByRole("link", { name: "奇趣知识" }).getAttribute("href")).toBe(
      "/curiosities"
    );

    fireEvent.keyDown(screen.getByRole("textbox", { name: "搜索" }), { key: "Enter" });
    expect(routerPush).toHaveBeenCalledWith(
      `/search?q=${encodeURIComponent("zzzznotanarticlezzzz")}`
    );
  });

  it("offers a link to the full results page while a query is active", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    open();
    type("熵");

    await waitFor(() => expect(releaseTitleSearch).toBeDefined());
    await act(async () => releaseTitleSearch?.([]));

    const link = screen.getByText("查看全部结果");
    expect(link.getAttribute("href")).toBe(`/search?q=${encodeURIComponent("熵")}`);
  });
});

describe("GlobalSearch keyboard and session behaviour", () => {
  it("does not navigate an old result when Enter arrives before the input debounce", async () => {
    vi.useFakeTimers();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    open();
    type("苏格拉底");
    await act(async () => vi.advanceTimersByTimeAsync(100));
    await act(async () => releaseTitleSearch?.([socrates]));
    expect(screen.getByRole("option")).toBeTruthy();
    type("柏拉图");
    fireEvent.keyDown(screen.getByRole("textbox", { name: "搜索" }), { key: "Enter" });
    expect(routerPush).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog")).toBeTruthy();
    await act(async () => vi.advanceTimersByTimeAsync(100));
    expect(screen.queryByRole("option")).toBeNull();
  });

  it("aborts body work when the search overlay closes", async () => {
    const fetchMock = vi.fn().mockReturnValue(new Promise(() => {}));
    vi.stubGlobal("fetch", fetchMock);
    open();
    type("苏格拉底");
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    const signal = (fetchMock.mock.calls[0]?.[1] as RequestInit | undefined)?.signal;
    fireEvent.keyDown(document, { key: "Escape" });
    expect(signal?.aborted).toBe(true);
  });

  it("preserves Enter on the full-results link", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    open();
    type("苏格拉底");
    await waitFor(() => expect(releaseTitleSearch).toBeDefined());
    await act(async () => releaseTitleSearch?.([socrates]));
    const link = screen.getByText("查看全部结果");
    expect(fireEvent.keyDown(link, { key: "Enter" })).toBe(true);
    expect(routerPush).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  it.each(["清除", "删除搜索记录「苏格拉底」"])(
    "does not select history when Enter is pressed on %s",
    (name) => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
      window.localStorage.setItem("uk-search-history", JSON.stringify(["苏格拉底"]));
      open();
      expect(fireEvent.keyDown(screen.getByRole("button", { name }), { key: "Enter" })).toBe(true);
      expect((screen.getByRole("textbox", { name: "搜索" }) as HTMLInputElement).value).toBe("");
      expect(screen.queryByText("查看全部结果")).toBeNull();
    }
  );

  it.each(["escape", "shortcut", "backdrop"])(
    "cancels queued input when closed by %s",
    async (method) => {
      vi.useFakeTimers();
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
      open();
      type("旧查询");
      if (method === "backdrop") fireEvent.click(screen.getByRole("dialog"));
      else
        fireEvent.keyDown(
          document,
          method === "escape" ? { key: "Escape" } : { key: "k", ctrlKey: true }
        );
      expect(screen.queryByRole("dialog")).toBeNull();
      act(() => document.dispatchEvent(new Event("open-global-search")));
      await act(async () => vi.advanceTimersByTimeAsync(300));
      expect(releaseTitleSearch).toBeUndefined();
      expect(screen.queryByText("查看全部结果")).toBeNull();
      expect((screen.getByRole("textbox", { name: "搜索" }) as HTMLInputElement).value).toBe("");
    }
  );

  it("does not let queued input overwrite a chosen history entry", async () => {
    vi.useFakeTimers();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    window.localStorage.setItem("uk-search-history", JSON.stringify(["苏格拉底"]));
    open();
    type("旧查询");
    fireEvent.click(screen.getByRole("option"));
    await act(async () => vi.advanceTimersByTimeAsync(300));
    expect(screen.getByText("查看全部结果").getAttribute("href")).toBe(
      `/search?q=${encodeURIComponent("苏格拉底")}`
    );
  });

  it.each([{ isComposing: true }, { keyCode: 229 }])(
    "leaves IME keys to composition: %j",
    async (composition) => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
      open();
      type("苏格拉底");
      await waitFor(() => expect(releaseTitleSearch).toBeDefined());
      await act(async () =>
        releaseTitleSearch?.([
          socrates,
          { ...socrates, title: "柏拉图", url: "/philosophy/thinkers/plato" },
        ])
      );
      const input = screen.getByRole("textbox", { name: "搜索" });
      fireEvent.keyDown(input, { key: "ArrowDown", ...composition });
      expect(screen.getAllByRole("option")[0]!.getAttribute("aria-selected")).toBe("true");
      fireEvent.keyDown(input, { key: "ArrowDown" });
      fireEvent.keyDown(input, { key: "ArrowUp", ...composition });
      expect(screen.getAllByRole("option")[1]!.getAttribute("aria-selected")).toBe("true");
      fireEvent.keyDown(input, { key: "Escape", ...composition });
      fireEvent.keyDown(input, { key: "k", ctrlKey: true, ...composition });
      fireEvent.keyDown(input, { key: "Enter", ...composition });
      expect(screen.getByRole("dialog")).toBeTruthy();
      expect(routerPush).not.toHaveBeenCalled();
      fireEvent.keyDown(input, { key: "Enter" });
      expect(routerPush).toHaveBeenCalledWith("/philosophy/thinkers/plato");
    }
  );

  it("resets stale query and results when reopened", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    open();
    type("苏格拉底");
    await waitFor(() => expect(releaseTitleSearch).toBeDefined());
    await act(async () => releaseTitleSearch?.([socrates]));
    expect(await screen.findByRole("option")).toBeTruthy();

    // Close with Escape, reopen — no stale results, empty input.
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
    act(() => document.dispatchEvent(new Event("open-global-search")));
    expect(screen.queryByRole("option")).toBeNull();
    expect((screen.getByRole("textbox", { name: "搜索" }) as HTMLInputElement).value).toBe("");
  });

  it("navigates with arrow keys and opens the active result with Enter", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    open();
    type("苏格拉底");
    await waitFor(() => expect(releaseTitleSearch).toBeDefined());
    await act(async () => releaseTitleSearch?.([socrates]));
    await screen.findByRole("option");

    fireEvent.keyDown(screen.getByRole("textbox", { name: "搜索" }), { key: "ArrowDown" });
    fireEvent.keyDown(screen.getByRole("textbox", { name: "搜索" }), { key: "Enter" });
    expect(routerPush).toHaveBeenCalledWith("/philosophy/thinkers/socrates");
  });

  it("walks search history with arrow keys and re-runs it with Enter", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    window.localStorage.setItem(
      "uk-search-history",
      JSON.stringify(["热力学第二定律", "苏格拉底"])
    );
    open();
    expect(await screen.findByText("搜索历史")).toBeTruthy();

    const input = screen.getByRole("textbox", { name: "搜索" });
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    // Entering a history term fills the box and triggers a title search.
    expect((screen.getByRole("textbox", { name: "搜索" }) as HTMLInputElement).value).toBe(
      "苏格拉底"
    );
    await waitFor(() => expect(releaseTitleSearch).toBeDefined());
  });
});
