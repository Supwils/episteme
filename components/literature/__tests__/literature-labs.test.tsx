// @vitest-environment happy-dom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MeterLab } from "../MeterLab";
import { NarrativeGraph } from "../NarrativeGraph";
import { TranslationComparator } from "../TranslationComparator";
import { WorldTraditionsMap } from "../WorldTraditionsMap";

afterEach(cleanup);

describe("literature labs", () => {
  it("switches discourse order", () => {
    render(<NarrativeGraph />);
    fireEvent.click(screen.getByRole("button", { name: "从中段起" }));
    expect(screen.getByRole("button", { name: "从中段起" }).getAttribute("aria-pressed")).toBe(
      "true"
    );
    expect(screen.getByText(/先看见守株/)).toBeDefined();
  });

  it("selects a seven-character line", () => {
    render(<MeterLab />);
    fireEvent.click(screen.getByRole("button", { name: "七言" }));
    expect(screen.getByText("鹂")).toBeDefined();
    expect(screen.getByText(/七言常见/)).toBeDefined();
  });

  it("filters traditions by epoch", () => {
    render(<WorldTraditionsMap />);
    fireEvent.click(screen.getByRole("button", { name: "现代" }));
    expect(screen.getByRole("button", { name: "呐喊" })).toBeDefined();
    expect(screen.queryByRole("button", { name: "荷马史诗" })).toBeNull();
  });

  it("switches translation pairs", () => {
    render(<TranslationComparator />);
    fireEvent.click(screen.getByRole("button", { name: "奥德赛起句" }));
    expect(screen.getByText(/Samuel Butler/)).toBeDefined();
    expect(screen.getByText(/The Odyssey, 1900/)).toBeDefined();
  });
});
