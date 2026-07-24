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
