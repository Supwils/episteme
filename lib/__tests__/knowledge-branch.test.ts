import { describe, expect, it } from "vitest";
import graphSnapshot from "@/subjects/knowledge-graph/data/aggregate-snapshot.json";
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
    // Aggregates live in the snapshot — after content or graph changes run
    // `pnpm update-graph-snapshot` instead of editing literals here.
    expect(branchCatalog.summary).toEqual(graphSnapshot.branch);
    expect(new Set(branchCatalog.targets.map((target) => target.id)).size).toBe(
      graphSnapshot.branch.nodeCount
    );
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
    // 该节点的等距候选数会随正文跨域链接增减而变，只断言"确有多个等距候选"这一不变量
    expect(target.candidateCount).toBeGreaterThan(3);
    expect(target.anchorCandidates).toHaveLength(3);
    const alternative = selectKnowledgeTargetAnchor(
      target,
      target.anchorCandidates[1]!.anchorNodeId
    );
    expect(alternative.anchorNodeId).not.toBe(target.anchorNodeId);
    expect(alternative.distance).toBe(target.distance);
    expect(alternative.anchorCandidates[1]?.selectionReason).toContain(
      `${target.candidateCount}个最短候选等距`
    );
    const plan = buildKnowledgeTargetPlan(learningCatalog, alternative, {
      startLevel: 1,
      minutes: 45,
    });
    expect(plan.anchorLabel).toBe(alternative.anchorLabel);
    expect(plan.steps.at(-1)?.nodeId).toBe(target.id);
    expect(plan.steps.reduce((sum, step) => sum + step.minutes, 0)).toBe(45);
  });

  it("uses the explicit semantic edge for formerly isolated targets", () => {
    // 不变量：ai-ethics 不孤立、距离 1、候选里至少有一条显式语义边的目标。
    // 候选取 top-3（slice(0,3) 封顶）：2026-07-27 的 machine-learning-overview
    // 与 2026-08-03 的 arts:generative-art-and-ai 语义边进入后，top-3 由
    // tie-break 决定，因此不断言单个特定目标——任一显式语义边目标在场即成立。
    const aiEthics = branchCatalog.targets.find((target) => target.id === "philosophy:ai-ethics")!;
    expect(aiEthics.distance).toBe(1);
    expect(aiEthics.confidence).toBe("direct");
    const aiEthicsCandidates = aiEthics.anchorCandidates.map((c) => c.anchorNodeId);
    expect(
      aiEthicsCandidates.includes("computer-science:ai-interpretability") ||
        aiEthicsCandidates.includes("arts:generative-art-and-ai")
    ).toBe(true);

    // 显式语义边保证 x-ray-crystallography 始终是距离 1 的锚点候选；
    // 正文新增 [[atomic-structure]] 链接后，最终锚点由等距 tie-break 决定
    const xRay = branchCatalog.targets.find((target) => target.id === "medicine:x-ray-imaging")!;
    expect(xRay.distance).toBe(1);
    expect(xRay.anchorCandidates.map((candidate) => candidate.anchorNodeId)).toContain(
      "chemistry:x-ray-crystallography"
    );
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
    // 断言的是结构（若干条策展前置 + 恰好最后一条推断旁支），不是步数——
    // 步数随锚点的等距 tie-break 变化，见上一个用例的说明。
    expect(plan.steps.length).toBeGreaterThanOrEqual(2);
    expect(plan.steps.slice(0, -1).every((step) => step.source === "curated-prerequisite")).toBe(
      true
    );
    expect(plan.steps.at(-1)?.source).toBe("inferred-branch");
    expect(plan.steps.at(-1)?.reason).toContain("不是人工验证的前置关系");
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
