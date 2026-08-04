import { describe, expect, it } from "vitest";
import graphSnapshot from "@/subjects/knowledge-graph/data/aggregate-snapshot.json";
import { buildLearningPlanCatalog } from "@/lib/knowledge-learning-plan-catalog";
import { buildPersonalLearningPlan } from "@/lib/knowledge-learning-plan";

const catalog = buildLearningPlanCatalog();

describe("personal knowledge learning plans", () => {
  it("turns every curated path into a complete and unique goal", () => {
    // Goal and step counts track the curated paths — pinned by the snapshot
    // (`pnpm update-graph-snapshot` after editing curated learning paths).
    expect(catalog.goals).toHaveLength(graphSnapshot.coverage.goalCount);
    expect(catalog.goals.filter((goal) => goal.kind === "main-thread")).toHaveLength(
      graphSnapshot.coverage.mainThreadGoalCount
    );
    expect(new Set(catalog.goals.map((goal) => goal.id)).size).toBe(
      graphSnapshot.coverage.goalCount
    );

    const nodeIds = catalog.goals.flatMap((goal) => goal.steps.map((step) => step.nodeId));
    // Every goal is a complete five-step chain, and no curated node is
    // shared between goals.
    expect(nodeIds).toHaveLength(5 * graphSnapshot.coverage.goalCount);
    expect(new Set(nodeIds).size).toBe(nodeIds.length);
    for (const goal of catalog.goals) {
      expect(goal.steps.map((step) => step.level)).toEqual([1, 2, 3, 4, 5]);
      expect(goal.steps.every((step) => step.graphHref.includes(`path=${goal.id}`))).toBe(true);
      expect(goal.steps.every((step) => step.graphHref.includes("source=learning-plan"))).toBe(
        true
      );
    }
  });

  it("keeps the full prerequisite chain and conserves the time budget", () => {
    const plan = buildPersonalLearningPlan(catalog, {
      goalId: "universe-matter",
      startLevel: 1,
      minutes: 45,
    });
    expect(plan.steps).toHaveLength(5);
    expect(plan.steps.map((step) => step.level)).toEqual([1, 2, 3, 4, 5]);
    expect(plan.steps.reduce((sum, step) => sum + step.minutes, 0)).toBe(45);
    expect(plan.assumedMasteredCount).toBe(0);
    expect(plan.steps.every((step) => step.minutes >= 6)).toBe(true);
  });

  it("starts from the declared level without dropping later prerequisites", () => {
    const plan = buildPersonalLearningPlan(catalog, {
      goalId: "people-institutions",
      startLevel: 3,
      minutes: 20,
    });
    expect(plan.steps.map((step) => step.nodeId)).toEqual([
      "economics:market-failures",
      "political-science:comparative-method",
      "sociology:platform-governance",
    ]);
    expect(plan.steps.reduce((sum, step) => sum + step.minutes, 0)).toBe(20);
    expect(plan.assumedMasteredCount).toBe(2);
    expect(plan.domainCount).toBe(3);
    expect(plan.steps[0]?.reason).toContain("L3 起点");
  });

  it("assigns the entire deep-reading budget to a direct frontier entry", () => {
    const plan = buildPersonalLearningPlan(catalog, {
      goalId: "mind-meaning",
      startLevel: 5,
      minutes: 90,
    });
    expect(plan.steps).toHaveLength(1);
    expect(plan.steps[0]?.minutes).toBe(90);
    expect(plan.steps[0]?.activity).toContain("深度任务");
  });

  it("rejects an unknown target instead of silently substituting another route", () => {
    expect(() =>
      buildPersonalLearningPlan(catalog, {
        goalId: "missing-goal",
        startLevel: 1,
        minutes: 20,
      })
    ).toThrow("Unknown learning goal");
  });
});
