// @vitest-environment happy-dom
import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { GraphNode } from "@/lib/graph-engine";
import { buildKnowledgeGapPlan } from "@/lib/knowledge-gap-plan";
import { KNOWLEDGE_GAP_JOURNEY_STORAGE_KEY } from "@/lib/knowledge-gap-journey-store";
import { KnowledgeGapJourneyPanel } from "../KnowledgeGapJourneyPanel";

function node(id: string, level: 1 | 2 | 3, prerequisiteIds: string[] = []): GraphNode {
  return {
    id,
    label: id,
    domain: "economics",
    type: "concept",
    slug: id,
    tags: [],
    description: id,
    knowledgeLevel: level,
    knowledgeLevelSource: "curated",
    prerequisiteIds,
    evidenceMode: "comparative",
  };
}

const nodes = [node("root", 1), node("old-step", 2, ["root"]), node("new-step", 2, ["root"])];
const firstPlan = buildKnowledgeGapPlan(
  [...nodes, node("target", 3, ["old-step"])],
  [],
  "target",
  [],
  45
);
const nextPlan = buildKnowledgeGapPlan(
  [...nodes, node("target", 3, ["new-step"])],
  [],
  "target",
  [],
  45
);

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("KnowledgeGapJourneyPanel", () => {
  it("separates evidence from mastery and requires an explicit route migration", async () => {
    const onConfirmMastered = vi.fn();
    const { rerender } = render(
      <KnowledgeGapJourneyPanel
        plan={firstPlan}
        masteredIds={new Set()}
        onConfirmMastered={onConfirmMastered}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "保存为学习路线" }));
    const reading = await screen.findByRole("checkbox", { name: "target：阅读正文" });
    fireEvent.click(reading);
    expect(onConfirmMastered).not.toHaveBeenCalled();
    expect(window.localStorage.getItem(KNOWLEDGE_GAP_JOURNEY_STORAGE_KEY)).toContain(
      '"reading":true'
    );

    fireEvent.click(screen.getByRole("button", { name: "target：确认已掌握" }));
    expect(onConfirmMastered).toHaveBeenCalledWith("target");

    rerender(
      <KnowledgeGapJourneyPanel
        plan={nextPlan}
        masteredIds={new Set()}
        onConfirmMastered={onConfirmMastered}
      />
    );
    expect(screen.getByText("检测到新的路线版本，旧快照尚未改写")).toBeDefined();
    expect(screen.getByRole("status").textContent).toContain("新增：new-step");
    expect(screen.getByRole("status").textContent).toContain("移除：old-step");
    expect(screen.getAllByText("old-step").length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("button", { name: "继续旧版路线" }));
    await screen.findByText("你已选择继续旧版路线");
    expect(screen.getAllByText("old-step").length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("button", { name: "迁移到当前路线" }));
    await waitFor(() => expect(screen.queryByText("你已选择继续旧版路线")).toBeNull());
    expect(screen.getByText("new-step")).toBeDefined();
    expect(screen.queryByText("old-step")).toBeNull();
  });
});
