// @vitest-environment happy-dom
import { StrictMode } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CuriositiesWall } from "../CuriositiesWall";
import type { CuriosityWithSubject } from "@/lib/curiosities";

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(window.location.search),
}));

const items: CuriosityWithSubject[] = [
  {
    id: "hook",
    title: "一条钩子",
    detail: "细节",
    subject: "physics",
    url: "/universe-physics/physics/thermodynamics",
  },
  {
    id: "coincidence",
    title: "一条巧合",
    detail: "细节",
    subject: "chemistry",
    tags: ["cross-domain"],
    url: "/chemistry/concepts/chirality",
  },
];

const wallProps = { items, domainCountText: "两个" };

beforeEach(() => window.history.replaceState(null, "", "/curiosities"));
afterEach(() => {
  cleanup();
  window.history.replaceState(null, "", "/");
});

describe("CuriositiesWall subject filter", () => {
  it("exposes the active subject as a pressed toggle", () => {
    render(<CuriositiesWall {...wallProps} />);
    const group = screen.getByRole("group", { name: "学科筛选" });
    expect(group).toBeTruthy();
    expect(screen.getByRole("button", { name: /全部/ }).getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(screen.getByRole("button", { name: /宇宙物理/ }));
    expect(screen.getByRole("button", { name: /宇宙物理/ }).getAttribute("aria-pressed")).toBe(
      "true"
    );
    expect(screen.getByRole("button", { name: /全部/ }).getAttribute("aria-pressed")).toBe("false");
  });

  it("exposes a coincidence filter that is not a domain chip", () => {
    render(<CuriositiesWall {...wallProps} />);
    const coincidence = screen.getByRole("button", { name: /跨学科巧合/ });
    fireEvent.click(coincidence);
    expect(coincidence.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText("一条巧合")).toBeTruthy();
    expect(screen.queryByText("一条钩子")).toBeNull();
  });

  it("can open already filtered to coincidences", () => {
    render(<CuriositiesWall {...wallProps} initialFilter="cross-domain" />);
    expect(screen.getByRole("button", { name: /跨学科巧合/ }).getAttribute("aria-pressed")).toBe(
      "true"
    );
    expect(screen.getByText("一条巧合")).toBeTruthy();
    expect(screen.queryByText("一条钩子")).toBeNull();
  });

  it("records a subject in the address so it survives a remount", () => {
    const view = render(<CuriositiesWall {...wallProps} />);
    fireEvent.click(screen.getByRole("button", { name: /宇宙物理/ }));
    expect(new URLSearchParams(window.location.search).get("filter")).toBe("physics");
    view.unmount();
    render(<CuriositiesWall {...wallProps} />);
    expect(screen.getByRole("button", { name: /宇宙物理/ }).getAttribute("aria-pressed")).toBe(
      "true"
    );
    expect(screen.queryByText("一条巧合")).toBeNull();
  });

  it.each([
    { filter: "cross-domain", label: /跨学科巧合/, title: "一条巧合" },
    { filter: "physics", label: /宇宙物理/, title: "一条钩子" },
  ])("opens the $filter URL with the matching cards", ({ filter, label, title }) => {
    window.history.replaceState(null, "", `/curiosities?filter=${filter}`);
    render(<CuriositiesWall {...wallProps} />);
    expect(screen.getByRole("button", { name: label }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getAllByRole("heading", { level: 3 }).map((node) => node.textContent)).toEqual([
      title,
    ]);
  });

  it("follows URL changes and clearing without writing its own old selection back", () => {
    const view = render(<CuriositiesWall {...wallProps} />);
    fireEvent.click(screen.getByRole("button", { name: /宇宙物理/ }));
    window.history.replaceState(null, "", "/curiosities?filter=cross-domain");
    view.rerender(<CuriositiesWall {...wallProps} />);
    expect(screen.getByRole("button", { name: /跨学科巧合/ }).getAttribute("aria-pressed")).toBe(
      "true"
    );
    expect(screen.queryByText("一条钩子")).toBeNull();
    window.history.replaceState(null, "", "/curiosities");
    view.rerender(<CuriositiesWall {...wallProps} />);
    expect(screen.getByRole("button", { name: /全部/ }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(items.length);
    expect(window.location.search).toBe("");
  });

  it.each(["unknown", "constructor", "__proto__", "toString", ""])(
    "falls back to all cards for the invalid filter %j",
    (filter) => {
      window.history.replaceState(null, "", `/curiosities?filter=${filter}`);
      render(<CuriositiesWall {...wallProps} />);
      expect(screen.getByRole("button", { name: /全部/ }).getAttribute("aria-pressed")).toBe(
        "true"
      );
      expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(items.length);
    }
  );

  it("preserves other parameters and the fragment when choosing and clearing a filter", () => {
    window.history.replaceState(null, "", "/curiosities?from=daily&filter=cross-domain#wall");
    render(<CuriositiesWall {...wallProps} />);
    fireEvent.click(screen.getByRole("button", { name: /宇宙物理/ }));
    expect(window.location.search).toBe("?from=daily&filter=physics");
    expect(window.location.hash).toBe("#wall");
    fireEvent.click(screen.getByRole("button", { name: /全部/ }));
    expect(window.location.search).toBe("?from=daily");
    expect(window.location.hash).toBe("#wall");
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(items.length);
  });

  it("keeps the URL selection through StrictMode replay", () => {
    window.history.replaceState(null, "", "/curiosities?filter=physics");
    render(
      <StrictMode>
        <CuriositiesWall {...wallProps} initialFilter="cross-domain" />
      </StrictMode>
    );
    expect(screen.getByRole("button", { name: /宇宙物理/ }).getAttribute("aria-pressed")).toBe(
      "true"
    );
    expect(screen.queryByText("一条巧合")).toBeNull();
  });
});
