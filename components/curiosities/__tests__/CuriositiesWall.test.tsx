// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CuriositiesWall } from "../CuriositiesWall";
import type { CuriosityWithSubject } from "@/lib/curiosities";

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

afterEach(cleanup);

describe("CuriositiesWall subject filter", () => {
  it("exposes the active subject as a pressed toggle", () => {
    render(<CuriositiesWall items={items} />);
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
    render(<CuriositiesWall items={items} />);
    const coincidence = screen.getByRole("button", { name: /跨学科巧合/ });
    fireEvent.click(coincidence);
    expect(coincidence.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText("一条巧合")).toBeTruthy();
    expect(screen.queryByText("一条钩子")).toBeNull();
  });

  it("can open already filtered to coincidences", () => {
    render(<CuriositiesWall items={items} initialFilter="cross-domain" />);
    expect(screen.getByRole("button", { name: /跨学科巧合/ }).getAttribute("aria-pressed")).toBe(
      "true"
    );
    expect(screen.getByText("一条巧合")).toBeTruthy();
    expect(screen.queryByText("一条钩子")).toBeNull();
  });
});
