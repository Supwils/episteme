// @vitest-environment happy-dom
import React from "react";
import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { NavDropdown } from "../NavDropdown";
import type { NavGroup } from "../nav-data";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

const GROUP: NavGroup = {
  label: "自然与数理",
  en: "Nature & Math",
  sections: [
    {
      label: "自然与数理",
      en: "Nature & Math",
      items: [
        { href: "/universe-physics", label: "物理学", en: "Physics", color: "#6a6fd0" },
        { href: "/cosmology", label: "宇宙学", en: "Cosmology", color: "#4f7fd0" },
        { href: "/mathematics", label: "数学与逻辑", en: "Mathematics", color: "#c9a23e" },
      ],
    },
  ],
};

afterEach(cleanup);

describe("NavDropdown keyboard support", () => {
  it("opens with ArrowDown on the trigger and focuses the first item", async () => {
    render(<NavDropdown group={GROUP} />);
    const trigger = screen.getByRole("button", { name: /自然与数理/ });
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    await act(async () => {});
    const first = screen.getByRole("menuitem", { name: /物理学/ });
    expect(screen.getByRole("menu")).toBeTruthy();
    expect(document.activeElement).toBe(first);
  });

  it("cycles items with arrows and wraps at both ends", async () => {
    render(<NavDropdown group={GROUP} />);
    const trigger = screen.getByRole("button", { name: /自然与数理/ });
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    await act(async () => {});
    const menu = screen.getByRole("menu");
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toBe(screen.getByRole("menuitem", { name: /宇宙学/ }));
    fireEvent.keyDown(menu, { key: "ArrowUp" });
    expect(document.activeElement).toBe(screen.getByRole("menuitem", { name: /物理学/ }));
    fireEvent.keyDown(menu, { key: "ArrowUp" });
    expect(document.activeElement).toBe(screen.getByRole("menuitem", { name: /数学与逻辑/ }));
    fireEvent.keyDown(menu, { key: "Home" });
    expect(document.activeElement).toBe(screen.getByRole("menuitem", { name: /物理学/ }));
    fireEvent.keyDown(menu, { key: "End" });
    expect(document.activeElement).toBe(screen.getByRole("menuitem", { name: /数学与逻辑/ }));
  });

  it("returns focus to the trigger on Escape", async () => {
    render(<NavDropdown group={GROUP} />);
    const trigger = screen.getByRole("button", { name: /自然与数理/ });
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    await act(async () => {});
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("menu")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
});
