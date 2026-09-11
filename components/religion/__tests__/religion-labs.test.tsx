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

  it("switches a public ritual case", () => {
    render(<RitualLab />);
    fireEvent.click(screen.getByRole("button", { name: "朝圣作为结构" }));
    fireEvent.click(screen.getByRole("button", { name: "阈限" }));
    expect(screen.getByText(/communitas/)).toBeDefined();
  });

  it("filters traditions by modern epoch", () => {
    render(<WorldReligionMap />);
    fireEvent.click(screen.getByRole("button", { name: "现代" }));
    expect(screen.getByRole("button", { name: /五旬节运动/ })).toBeDefined();
    expect(screen.queryByRole("button", { name: /吠陀祭祀/ })).toBeNull();
  });

  it("opens a tradition note from the modern band", () => {
    render(<WorldReligionMap />);
    fireEvent.click(screen.getByRole("button", { name: "现代" }));
    fireEvent.click(screen.getByRole("button", { name: /无宗教身份/ }));
    expect(screen.getByText(/29%/)).toBeDefined();
  });

  it("switches canon openings", () => {
    render(<CanonComparator />);
    fireEvent.click(screen.getByRole("button", { name: "道德经起句" }));
    expect(screen.getByText(/道可道/)).toBeDefined();
    expect(screen.getByText(/老子/)).toBeDefined();
  });

  it("switches a teaching lens on a canon opening", () => {
    render(<CanonComparator />);
    fireEvent.click(screen.getByRole("button", { name: "体裁" }));
    expect(screen.getByText(/叙事宇宙论/)).toBeDefined();
  });

  it("switches secularization indicators", () => {
    render(<SecularizationChart />);
    fireEvent.click(screen.getByRole("button", { name: "认同" }));
    expect(screen.getByRole("button", { name: "认同" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText(/仍自称某传统/)).toBeDefined();
  });

  it("shows Western Europe practice medians", () => {
    render(<SecularizationChart />);
    fireEvent.click(screen.getByRole("button", { name: "西欧皮尤 2018" }));
    expect(screen.getAllByText(/十五国中位/).length).toBeGreaterThan(0);
    expect(screen.getByText("22%")).toBeDefined();
  });
});
