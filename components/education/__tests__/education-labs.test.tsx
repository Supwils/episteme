// @vitest-environment happy-dom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SpacingLab } from "../SpacingLab";
import { ClassroomTalkLab } from "../ClassroomTalkLab";
import { ScoreDecomposer } from "../ScoreDecomposer";
import { AdaptivePathLab } from "../AdaptivePathLab";

afterEach(cleanup);

describe("education labs", () => {
  it("switches spacing from massed to spaced", () => {
    render(<SpacingLab />);
    fireEvent.click(screen.getByRole("button", { name: "间隔练习" }));
    expect(screen.getByRole("button", { name: "间隔练习" }).getAttribute("aria-pressed")).toBe(
      "true"
    );
    expect(screen.getByText(/不是背词器/)).toBeDefined();
  });

  it("selects a wait-time classroom turn", () => {
    render(<ClassroomTalkLab />);
    fireEvent.click(screen.getByRole("button", { name: "长等待" }));
    fireEvent.click(screen.getByRole("button", { name: "空白：等待" }));
    expect(screen.getByRole("button", { name: "空白：等待" }).getAttribute("aria-pressed")).toBe(
      "true"
    );
    expect(screen.getByText(/不被打断/)).toBeDefined();
  });

  it("decomposes a schematic score into language medium", () => {
    render(<ScoreDecomposer />);
    fireEvent.click(screen.getByRole("button", { name: "示意分数乙" }));
    fireEvent.click(screen.getByRole("button", { name: "语言介质，约 22" }));
    expect(screen.getByText(/证书处作废/)).toBeDefined();
  });

  it("reads the green light as a model inference", () => {
    render(<AdaptivePathLab />);
    fireEvent.click(screen.getByRole("button", { name: "系统记录" }));
    fireEvent.click(screen.getByRole("button", { name: "绿灯" }));
    expect(screen.getByRole("button", { name: "绿灯" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText(/不是已经学会的照片/)).toBeDefined();
  });
});
