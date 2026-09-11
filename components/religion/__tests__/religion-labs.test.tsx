// @vitest-environment happy-dom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { RitualLab } from "../RitualLab";
import { WorldReligionMap } from "../WorldReligionMap";
import { CanonComparator } from "../CanonComparator";
import { SecularizationChart } from "../SecularizationChart";

afterEach(cleanup);

describe("religion labs", () => {
  it("selects the liminal ritual stage", () => {
    render(<RitualLab />);
    fireEvent.click(screen.getByRole("button", { name: "阈限" }));
    expect(screen.getByRole("button", { name: "阈限" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText(/中间状态/)).toBeDefined();
  });

  it("filters traditions by modern epoch", () => {
    render(<WorldReligionMap />);
    fireEvent.click(screen.getByRole("button", { name: "现代" }));
    expect(screen.getByRole("button", { name: "五旬节运动" })).toBeDefined();
    expect(screen.queryByRole("button", { name: "吠陀祭祀" })).toBeNull();
  });

  it("switches canon openings", () => {
    render(<CanonComparator />);
    fireEvent.click(screen.getByRole("button", { name: "道德经起句" }));
    expect(screen.getByText(/道可道/)).toBeDefined();
    expect(screen.getByText(/老子/)).toBeDefined();
  });

  it("switches secularization indicators", () => {
    render(<SecularizationChart />);
    fireEvent.click(screen.getByRole("button", { name: "认同" }));
    expect(screen.getByRole("button", { name: "认同" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText(/仍自称某传统/)).toBeDefined();
  });
});
