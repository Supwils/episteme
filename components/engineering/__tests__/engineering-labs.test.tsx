// @vitest-environment happy-dom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ChipProcessFlow } from "../ChipProcessFlow";
import { GridFlowSimulator } from "../GridFlowSimulator";
import { MaterialsProfile } from "../MaterialsProfile";
import { StructureLoadLab } from "../StructureLoadLab";

afterEach(cleanup);

describe("engineering labs", () => {
  it("lists line flows and updates when wind rises", () => {
    render(<GridFlowSimulator />);
    const before = screen.getByText(/最重走廊负载率/).nextElementSibling?.textContent;
    fireEvent.change(screen.getByLabelText("风电出力"), { target: { value: "90" } });
    const after = screen.getByText(/最重走廊负载率/).nextElementSibling?.textContent;
    expect(after).not.toBe(before);
    expect(screen.getByLabelText("五节点直流潮流教学电网，线路颜色表示负载率")).toBeDefined();
  });

  it("moves the peak moment with the load position", () => {
    render(<StructureLoadLab />);
    expect(screen.getByLabelText("简支梁弯矩图")).toBeDefined();
    const before = screen.getByText(/最大弯矩/).nextElementSibling?.textContent;
    fireEvent.change(screen.getByLabelText("作用位置"), { target: { value: "5" } });
    const after = screen.getByText(/最大弯矩/).nextElementSibling?.textContent;
    expect(after).not.toBe(before);
  });

  it("switches the materials profile", () => {
    render(<MaterialsProfile />);
    expect(screen.getByRole("button", { name: "结构钢" }).getAttribute("aria-pressed")).toBe(
      "true"
    );
    fireEvent.click(screen.getByRole("button", { name: "铝合金" }));
    expect(screen.getByRole("button", { name: "铝合金" }).getAttribute("aria-pressed")).toBe(
      "true"
    );
    expect(screen.getByText(/6061-T6/)).toBeDefined();
  });

  it("opens each chip process stage", () => {
    render(<ChipProcessFlow />);
    fireEvent.click(screen.getByRole("button", { name: "8. 封装测试" }));
    expect(screen.getByRole("heading", { name: /封装测试/ })).toBeDefined();
    expect(screen.getByText(/不写具体键合图/)).toBeDefined();
  });
});
