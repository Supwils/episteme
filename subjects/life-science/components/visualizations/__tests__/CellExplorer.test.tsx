// @vitest-environment happy-dom
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CellExplorer } from "../CellExplorer";

afterEach(cleanup);

describe("CellExplorer accessibility", () => {
  it("uses the shared readable text color for scale and empty-state guidance", () => {
    render(<CellExplorer />);

    expect(screen.getByText(/比例尺:/).classList.contains("text-fg-muted")).toBe(true);
    expect(screen.getByText(/点击左侧细胞器/).classList.contains("text-fg-muted")).toBe(true);
  });
});
