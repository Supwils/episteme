import { describe, expect, it } from "vitest";
import {
  buildKnowledgeBranchCatalog,
  searchKnowledgeBranchTargets,
} from "@/lib/knowledge-branch-catalog";
import { buildKnowledgeTargetPlan, selectKnowledgeTargetAnchor } from "@/lib/knowledge-branch";
import { buildLearningPlanCatalog } from "@/lib/knowledge-learning-plan-catalog";

const branchCatalog = buildKnowledgeBranchCatalog();
const learningCatalog = buildLearningPlanCatalog();

describe("full graph branch attachments", () => {
  it("attaches every graph node to one traceable curated anchor", () => {
    expect(branchCatalog.summary).toEqual({
      nodeCount: 1362,
      anchorCount: 230,
      inferredBranchCount: 1132,
      maximumDistance: 5,
      ambiguousTargetCount: 674,
      maximumCandidateCount: 18,
      confidenceCounts: {
        curated: 230,
        direct: 458,
        contextual: 537,
        exploratory: 137,
      },
    });
    expect(new Set(branchCatalog.targets.map((target) => target.id)).size).toBe(1362);
    const goalIds = new Set(learningCatalog.goals.map((goal) => goal.id));
    for (const target of branchCatalog.targets) {
      expect(goalIds.has(target.anchorPathId), target.id).toBe(true);
      expect(target.branchPath[0]?.nodeId, target.id).toBe(target.anchorNodeId);
      expect(target.branchPath.at(-1)?.nodeId, target.id).toBe(target.id);
      expect(target.branchPath, target.id).toHaveLength(target.distance + 1);
      expect(target.branchPath.slice(1).every((step) => step.relationFromPrevious)).toBe(true);
      expect(target.anchorCandidates).toHaveLength(Math.min(target.candidateCount, 3));
      expect(target.anchorCandidates[0]?.anchorNodeId).toBe(target.anchorNodeId);
      expect(
        target.anchorCandidates.every((candidate) => candidate.distance === target.distance),
        target.id
      ).toBe(true);
    }
  });

  it("exposes equivalent nearest anchors and can build an alternative route", () => {
    const target = branchCatalog.targets.find(
      (item) => item.id === "medicine:body-disease-evidence"
    )!;
    expect(target.candidateCount).toBe(18);
    expect(target.anchorCandidates).toHaveLength(3);
    const alternative = selectKnowledgeTargetAnchor(
      target,
      target.anchorCandidates[1]!.anchorNodeId
    );
    expect(alternative.anchorNodeId).not.toBe(target.anchorNodeId);
    expect(alternative.distance).toBe(target.distance);
    expect(alternative.anchorCandidates[1]?.selectionReason).toContain("18个最短候选等距");
    const plan = buildKnowledgeTargetPlan(learningCatalog, alternative, {
      startLevel: 1,
      minutes: 45,
    });
    expect(plan.anchorLabel).toBe(alternative.anchorLabel);
    expect(plan.steps.at(-1)?.nodeId).toBe(target.id);
    expect(plan.steps.reduce((sum, step) => sum + step.minutes, 0)).toBe(45);
  });

  it("uses the explicit semantic edge for formerly isolated targets", () => {
    const aiEthics = branchCatalog.targets.find((target) => target.id === "philosophy:ai-ethics")!;
    expect(aiEthics.anchorNodeId).toBe("computer-science:ai-interpretability");
    expect(aiEthics.distance).toBe(1);
    expect(aiEthics.confidence).toBe("direct");
    expect(aiEthics.branchPath[1]?.relationFromPrevious).toContain("伦理治理");

    const xRay = branchCatalog.targets.find((target) => target.id === "medicine:x-ray-imaging")!;
    expect(xRay.anchorNodeId).toBe("chemistry:x-ray-crystallography");
    expect(xRay.distance).toBe(1);
  });

  it("searches labels and keywords without returning the entire catalog", () => {
    expect(searchKnowledgeBranchTargets(branchCatalog, "AI 伦理")[0]?.id).toBe(
      "philosophy:ai-ethics"
    );
    expect(
      searchKnowledgeBranchTargets(branchCatalog, "屠呦呦").map((target) => target.id)
    ).toEqual(expect.arrayContaining(["medicine:tu-youyou", "lifescience:youyou"]));
    expect(searchKnowledgeBranchTargets(branchCatalog, "", 12)).toHaveLength(12);
    expect(
      searchKnowledgeBranchTargets(branchCatalog, "", 20, {
        domainId: "sociology",
        level: 4,
        confidence: "contextual",
      }).every(
        (target) =>
          target.domainId === "sociology" &&
          target.level === 4 &&
          target.confidence === "contextual"
      )
    ).toBe(true);
  });

  it("keeps curated prerequisites and inferred branches visibly separate", () => {
    const target = branchCatalog.targets.find((item) => item.id === "philosophy:ai-ethics")!;
    const plan = buildKnowledgeTargetPlan(learningCatalog, target, {
      startLevel: 1,
      minutes: 45,
    });
    expect(plan.steps).toHaveLength(6);
    expect(plan.steps.slice(0, 5).every((step) => step.source === "curated-prerequisite")).toBe(
      true
    );
    expect(plan.steps[5]?.source).toBe("inferred-branch");
    expect(plan.steps[5]?.reason).toContain("不是人工验证的前置关系");
    expect(plan.steps.reduce((sum, step) => sum + step.minutes, 0)).toBe(45);
  });

  it("conserves short budgets even on the longest branch routes", () => {
    const target = branchCatalog.targets.find(
      (item) => item.distance === branchCatalog.summary.maximumDistance
    )!;
    const plan = buildKnowledgeTargetPlan(learningCatalog, target, {
      startLevel: 1,
      minutes: 20,
    });
    expect(plan.steps.reduce((sum, step) => sum + step.minutes, 0)).toBe(20);
    expect(plan.steps.every((step) => step.minutes >= 1)).toBe(true);
  });
});
