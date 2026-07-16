import { describe, expect, it } from "vitest";
import { buildLearningPlanCatalog } from "@/lib/knowledge-learning-plan-catalog";
import { buildPersonalLearningPlan } from "@/lib/knowledge-learning-plan";

const catalog = buildLearningPlanCatalog();

describe("personal knowledge learning plans", () => {
  it("turns every curated path into a complete and unique goal", () => {
    expect(catalog.goals).toHaveLength(46);
    expect(catalog.goals.filter((goal) => goal.kind === "main-thread")).toHaveLength(6);
    expect(new Set(catalog.goals.map((goal) => goal.id)).size).toBe(46);

    const nodeIds = catalog.goals.flatMap((goal) => goal.steps.map((step) => step.nodeId));
    expect(nodeIds).toHaveLength(230);
    expect(new Set(nodeIds).size).toBe(230);
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
