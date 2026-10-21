// @vitest-environment happy-dom
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { LearningPlanRoute } from "../LearningPlanRoute";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("LearningPlanRoute", () => {
  it("shows zero progress when the plan has no steps", () => {
    render(
      <LearningPlanRoute planId="empty-plan" question="空路线" summary="没有步骤" steps={[]} />
    );
    expect(screen.getByText("0/0")).toBeTruthy();
    const bar = document.querySelector(".bg-accent-gold");
    expect(bar?.getAttribute("style")).toContain("width: 0%");
  });
});
