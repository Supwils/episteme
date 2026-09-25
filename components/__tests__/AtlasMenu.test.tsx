// @vitest-environment happy-dom
import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AtlasGrid } from "../chrome/AtlasGrid";
import { AtlasMenu } from "../chrome/AtlasMenu";
import { ATLAS, ATLAS_LINES } from "@/lib/atlas";
import { DOMAINS } from "@/lib/data";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/law/foundations",
}));

afterEach(cleanup);

const cell = (col: number, row: number) =>
  document.querySelector<HTMLElement>(`[data-col="${col}"][data-row="${row}"]`)!;

describe("atlas data", () => {
  it("lists every domain once, in its cluster, with a short line and a count", () => {
    const ids = ATLAS.flatMap((cluster) => cluster.domains.map((d) => d.id));
    expect([...ids].sort()).toEqual(DOMAINS.map((d) => d.id).sort());
    for (const cluster of ATLAS) {
      for (const domain of cluster.domains) {
        expect(domain.articles, domain.id).toBeGreaterThan(0);
        expect([...ATLAS_LINES[domain.id]].length, domain.id).toBeLessThanOrEqual(16);
      }
    }
  });
});

describe("atlas panel keyboard", () => {
  it("moves across columns and wraps within a column", () => {
    render(<AtlasGrid variant="panel" />);
    cell(0, 0).focus();
    fireEvent.keyDown(cell(0, 0), { key: "ArrowRight" });
    expect(document.activeElement).toBe(cell(1, 0));
    fireEvent.keyDown(cell(1, 0), { key: "ArrowUp" });
    const lastRow = ATLAS[1]!.domains.length - 1;
    expect(document.activeElement).toBe(cell(1, lastRow));
    // Moving right from a row the next column lacks clamps to its last row.
    fireEvent.keyDown(cell(1, lastRow), { key: "ArrowRight" });
    expect(document.activeElement).toBe(cell(2, ATLAS[2]!.domains.length - 1));
    fireEvent.keyDown(document.activeElement!, { key: "Home" });
    expect(document.activeElement).toBe(cell(2, 0));
    fireEvent.keyDown(cell(2, 0), { key: "ArrowLeft" });
    fireEvent.keyDown(cell(1, 0), { key: "ArrowLeft" });
    fireEvent.keyDown(cell(0, 0), { key: "ArrowLeft" });
    expect(document.activeElement).toBe(cell(ATLAS.length - 1, 0));
  });

  it("marks the current domain", () => {
    render(<AtlasGrid variant="panel" />);
    expect(screen.getByRole("link", { current: "page" }).getAttribute("href")).toBe("/law");
  });

  it("opens from a cluster button and returns focus to it on Escape", async () => {
    render(<AtlasMenu triggers="clusters" />);
    const trigger = screen.getByRole("button", { name: "历史与文明" });
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    await screen.findByRole("link", { name: /人类历史/ });
    await act(async () => {
      fireEvent.keyDown(document, { key: "Escape" });
    });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(trigger);
  });
});

describe("atlas sheet", () => {
  it("opens the reader's own cluster and folds the rest", () => {
    render(<AtlasGrid variant="sheet" />);
    const society = screen.getByRole("button", { name: /社会与制度/ });
    const cosmos = screen.getByRole("button", { name: /宇宙与自然/ });
    expect(society.getAttribute("aria-expanded")).toBe("true");
    expect(cosmos.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(cosmos);
    expect(cosmos.getAttribute("aria-expanded")).toBe("true");
    expect(society.getAttribute("aria-expanded")).toBe("false");
  });
});
