// @vitest-environment happy-dom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { KinshipDiagram } from "../KinshipDiagram";
import { MaterialCultureMap } from "../MaterialCultureMap";
import { ChronologyScale } from "../ChronologyScale";
import { ReciprocityLab } from "../ReciprocityLab";

afterEach(cleanup);

describe("anthropology labs", () => {
  it("switches to the Iroquois kinship type", () => {
    render(<KinshipDiagram />);
    fireEvent.click(screen.getByRole("button", { name: "易洛魁型" }));
    expect(screen.getByRole("button", { name: "易洛魁型" }).getAttribute("aria-pressed")).toBe(
      "true"
    );
    expect(screen.getByText(/另成一类/)).toBeDefined();
  });

  it("keeps svg kinship names distinct from chips", () => {
    render(<KinshipDiagram />);
    fireEvent.click(screen.getByRole("button", { name: "生父称谓位置" }));
    expect(screen.getByRole("button", { name: "生父称谓位置" }).getAttribute("aria-pressed")).toBe(
      "true"
    );
  });

  it("selects a schematic material region", () => {
    render(<MaterialCultureMap />);
    fireEvent.click(screen.getByRole("button", { name: "西非铜铸示意位置" }));
    expect(screen.getByText(/贝宁铜饰板/)).toBeDefined();
  });

  it("switches chronology from relative to absolute", () => {
    render(<ChronologyScale />);
    fireEvent.click(screen.getByRole("button", { name: "绝对测年" }));
    expect(screen.getByRole("button", { name: "绝对测年" }).getAttribute("aria-pressed")).toBe(
      "true"
    );
    expect(screen.getByText(/碳十四/)).toBeDefined();
  });

  it("selects balanced reciprocity", () => {
    render(<ReciprocityLab />);
    fireEvent.click(screen.getByRole("button", { name: "均衡互惠" }));
    expect(screen.getByRole("button", { name: "均衡互惠" }).getAttribute("aria-pressed")).toBe(
      "true"
    );
    expect(screen.getByText(/库拉圈/)).toBeDefined();
  });
});
