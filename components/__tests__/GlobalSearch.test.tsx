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

    fireEvent.keyDown(document, { key: "ArrowDown" });
    fireEvent.keyDown(document, { key: "Enter" });
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

    fireEvent.keyDown(document, { key: "ArrowDown" });
    fireEvent.keyDown(document, { key: "ArrowDown" });
    fireEvent.keyDown(document, { key: "Enter" });
    // Entering a history term fills the box and triggers a title search.
    expect((screen.getByRole("textbox", { name: "搜索" }) as HTMLInputElement).value).toBe(
      "苏格拉底"
    );
    await waitFor(() => expect(releaseTitleSearch).toBeDefined());
  });
});
