// @vitest-environment happy-dom
import React from "react";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GlobalSearch } from "../GlobalSearch";

const engine = {
  documents: [
    {
      id: "philosophy-thinker-socrates",
      title: "苏格拉底",
      subtitle: "Socrates",
      content: "苏格拉底方法与雅典哲学",
      section: "philosophy",
      type: "thinker",
      url: "/philosophy/thinkers/socrates",
    },
  ],
  index: {
    search: vi.fn(() => [
      {
        id: "philosophy-thinker-socrates",
        score: 10,
        match: { 苏格拉底: ["title"] },
      },
    ]),
  },
};

let resolveEngine: ((value: typeof engine) => void) | undefined;

vi.mock("@/lib/search-index", () => ({
  getSearchIndex: () =>
    new Promise<typeof engine>((resolve) => {
      resolveEngine = resolve;
    }),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

afterEach(() => {
  cleanup();
  resolveEngine = undefined;
});

describe("GlobalSearch", () => {
  it("recomputes results when the index finishes loading after the user types", async () => {
    render(<GlobalSearch />);
    act(() => document.dispatchEvent(new Event("open-global-search")));

    fireEvent.change(screen.getByRole("textbox", { name: "搜索" }), {
      target: { value: "苏格拉底" },
    });
    await waitFor(() => expect(resolveEngine).toBeDefined());
    expect(screen.queryByRole("option")).toBeNull();

    await act(async () => resolveEngine?.(engine));

    const result = await screen.findByRole("option");
    expect(result.getAttribute("href")).toBe("/philosophy/thinkers/socrates");
  });
});
