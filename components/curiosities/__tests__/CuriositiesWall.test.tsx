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
});
