import { describe, expect, it } from "vitest";
import type { GraphNode } from "@/lib/graph-engine";
import { buildKnowledgeGapPlan } from "../knowledge-gap-plan";
import { buildCatalogKnowledgeGapPlan } from "../knowledge-gap-plan-catalog";
import type { ReviewedLearningRelation } from "@/subjects/knowledge-graph/data/frontier-prerequisite-relations";

function node(
  id: string,
  label: string,
  level: 1 | 2 | 3,
  prerequisiteIds: string[] = []
): GraphNode {
  return {
    id,
    label,
    domain: "economics",
    type: "concept",
    slug: id,
    tags: [],
    description: label,
    knowledgeLevel: level,
    knowledgeLevelSource: "curated",
    prerequisiteIds,
    evidenceMode: "comparative",
  };
}

const nodes = [
  node("root-a", "入口 A", 1),
  node("root-b", "入口 B", 1),
  node("concept-a", "概念 A", 2, ["root-a"]),
  node("concept-b", "概念 B", 2, ["root-b"]),
  node("target", "汇流目标", 3, ["concept-a", "concept-b"]),
];

const relations: ReviewedLearningRelation[] = [
  {
    id: "test-release:root-a->target:recommended-background",
    sourceId: "root-a",
    targetId: "target",
    role: "recommended-background",
    rationale: "这是一条用于测试的推荐背景，不参与目标解锁。",
    reviewBasis: "content-dependency",
    reviewStatus: "reviewed",
    reviewedAt: "2026-07-13",
    releaseId: "test-release",
    version: "1.0.0",
    evidence: [{ kind: "editorial-audit", ref: "test", label: "测试关系依据" }],
  },
];

describe("knowledge gap plan", () => {
  it("builds a complete topological DAG and allocates the selected time", () => {
    const plan = buildKnowledgeGapPlan(nodes, relations, "target", [], 45);
    expect(plan.steps.map((step) => step.id)).toEqual([
      "root-a",
      "concept-a",
      "root-b",
      "concept-b",
      "target",
    ]);
    expect(plan.steps.map((step) => step.layer)).toEqual([1, 2, 1, 2, 3]);
    expect(plan.edges).toHaveLength(4);
    expect(plan.steps.reduce((sum, step) => sum + step.minutes, 0)).toBe(45);
    expect(plan.version).toEqual(
      expect.objectContaining({ schemaVersion: 1, fingerprint: expect.stringMatching(/^kgp-1-/) })
    );
    expect(plan.contexts).toEqual([
      expect.objectContaining({
        role: "recommended-background",
        node: expect.objectContaining({ id: "root-a" }),
      }),
    ]);
  });

  it("keeps the route fingerprint stable across time budgets", () => {
    const shortPlan = buildKnowledgeGapPlan(nodes, relations, "target", [], 20);
    const deepPlan = buildKnowledgeGapPlan(nodes, relations, "target", [], 90);
    expect(shortPlan.version.fingerprint).toBe(deepPlan.version.fingerprint);
    expect(shortPlan.steps.map((step) => step.minutes)).not.toEqual(
      deepPlan.steps.map((step) => step.minutes)
    );
  });

  it("removes mastered ancestors while preserving the known boundary", () => {
    const plan = buildKnowledgeGapPlan(nodes, relations, "target", ["root-a", "concept-a"], 20);
    expect(plan.steps.map((step) => step.id)).toEqual(["root-b", "concept-b", "target"]);
    expect(plan.knownBoundary.map((item) => item.id)).toEqual(["concept-a"]);
    expect(plan.gapCount).toBe(2);
  });

  it("builds the governed real-graph route for a macro diagnosis", () => {
    const plan = buildCatalogKnowledgeGapPlan("economics:us-macro-diagnosis-2026", [], 90);
    expect(plan.available).toBe(true);
    expect(plan.steps.at(-1)?.id).toBe("economics:us-macro-diagnosis-2026");
    expect(plan.steps[0]?.id).toBe("economics:scarcity-flows-incentives");
    expect(plan.contexts.map((context) => context.role)).toEqual([
      "recommended-background",
      "recommended-background",
    ]);
    expect(plan.steps.reduce((sum, step) => sum + step.minutes, 0)).toBe(90);
  });
});
