// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { GraphNode } from "../../data/types";
import { buildSpatialDomainSummary } from "../../lib/spatial-aggregation";
import { SpatialClusterSummary } from "../SpatialClusterSummary";

const screeningNode: GraphNode = {
  id: "medicine:screening",
  label: "筛查与早期发现",
  domain: "medicine",
  type: "concept",
  slug: "screening",
  tags: ["筛查"],
  description: "筛查净获益",
  knowledgeLevel: 2,
  url: "/medicine/concepts/screening",
};

afterEach(cleanup);

describe("SpatialClusterSummary", () => {
  it("switches stage focus and exposes a direct article route", () => {
    const onLevelSelect = vi.fn();
    const onNodeFocus = vi.fn();
    const summary = buildSpatialDomainSummary(
      [screeningNode],
      [],
      "medicine",
      new Map([[screeningNode.id, 1]])
    );

    render(
      <SpatialClusterSummary
        summary={summary}
        selectedLevel={2}
        onLevelSelect={onLevelSelect}
        onNodeFocus={onNodeFocus}
        isMobile={false}
      />
    );

    expect(screen.getByText("医学与公共卫生")).toBeDefined();
    expect(screen.getByText("L2 · 基础语言")).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: /聚焦 L2 基础语言/ }));
    expect(onLevelSelect).toHaveBeenCalledWith(null);

    fireEvent.click(screen.getByRole("button", { name: /筛查与早期发现/ }));
    expect(onNodeFocus).toHaveBeenCalledWith("medicine:screening");
    expect(screen.getByRole("link", { name: "阅读筛查与早期发现" }).getAttribute("href")).toBe(
      "/medicine/concepts/screening"
    );
  });
});
