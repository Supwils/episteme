// @vitest-environment happy-dom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MentalHealthAccessLab } from "../MentalHealthAccessLab";

afterEach(cleanup);

describe("MentalHealthAccessLab", () => {
  it("renders all stages and updates the model from an explicit scenario", () => {
    render(<MentalHealthAccessLab />);

    expect(screen.getByRole("img", { name: /心理健康服务有效覆盖级联/ })).toBeDefined();
    expect(screen.getAllByRole("row")).toHaveLength(6);

    const baselineCoverage = screen.getByText("总体有效覆盖").nextElementSibling?.textContent;
    fireEvent.click(screen.getByRole("button", { name: "社区网络" }));
    const improvedCoverage = screen.getByText("总体有效覆盖").nextElementSibling?.textContent;

    expect(improvedCoverage).not.toBe(baselineCoverage);
    expect(screen.getByRole("button", { name: "社区网络" }).getAttribute("aria-pressed")).toBe(
      "true"
    );
  });

  it("marks direct slider edits as a custom scenario", () => {
    render(<MentalHealthAccessLab />);

    const recognition = screen.getByLabelText("识别与表达") as HTMLInputElement;
    fireEvent.change(recognition, { target: { value: "0.9" } });

    expect(recognition.value).toBe("0.9");
    for (const scenario of ["服务分散", "基层整合", "连续照护", "社区网络"]) {
      expect(screen.getByRole("button", { name: scenario }).getAttribute("aria-pressed")).toBe(
        "false"
      );
    }
  });
});
