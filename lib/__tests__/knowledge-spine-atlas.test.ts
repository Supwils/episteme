import { describe, expect, it } from "vitest";
import { buildKnowledgeCoverageSnapshot } from "@/lib/knowledge-continuum-coverage";
import { buildLearningPlanCatalog } from "@/lib/knowledge-learning-plan-catalog";
import {
  PRIMARY_DOMAIN_SPINE_PATH_IDS,
  buildKnowledgeSpineAtlas,
  rankKnowledgeSpineBridges,
} from "@/lib/knowledge-spine-atlas";

const coverage = buildKnowledgeCoverageSnapshot();
const catalog = buildLearningPlanCatalog();
const atlas = buildKnowledgeSpineAtlas(catalog, coverage);

describe("all-subject knowledge spine atlas", () => {
  it("publishes one complete five-stage spine for every established subject", () => {
    expect(atlas.summary).toEqual({
      domainCount: 15,
      stageCount: 5,
      nodeCount: 75,
      crossDomainTransitionCount: 73,
    });
    expect(atlas.rows.map((row) => row.domainId)).toEqual(
      coverage.domains.map((domain) => domain.id)
    );
    expect(new Set(atlas.rows.map((row) => row.pathId)).size).toBe(15);

    for (const row of atlas.rows) {
      expect(row.pathId).toBe(PRIMARY_DOMAIN_SPINE_PATH_IDS[row.domainId]);
      expect(row.steps.map((step) => step.level)).toEqual([1, 2, 3, 4, 5]);
      expect(row.steps.every((step) => step.domainId === row.domainId)).toBe(true);
      expect(row.steps.every((step) => step.articleHref)).toBe(true);
      expect(row.steps.every((step) => step.graphHref.includes(`path=${row.pathId}`))).toBe(true);
      expect(row.bridges.every((bridge) => bridge.id !== row.domainId)).toBe(true);
    }

    const nodeIds = atlas.rows.flatMap((row) => row.steps.map((step) => step.nodeId));
    expect(new Set(nodeIds).size).toBe(75);
  });

  it("fills the previously missing physical, mathematical and computational spines", () => {
    expect(
      atlas.rows.find((row) => row.domainId === "physics")?.steps.map((step) => step.nodeId)
    ).toEqual([
      "physics:measurement-motion-energy",
      "physics:P0",
      "physics:P3",
      "physics:P7",
      "physics:前沿物理--弦理论",
    ]);
    expect(atlas.rows.find((row) => row.domainId === "mathematics")?.steps.at(-1)?.label).toBe(
      "黎曼猜想"
    );
    expect(atlas.rows.find((row) => row.domainId === "computer-science")?.steps.at(-1)?.label).toBe(
      "大语言模型与基础模型"
    );
  });

  it("projects every directed transition into two traceable subject perspectives", () => {
    const bridgeViews = atlas.rows.flatMap((row) => row.bridgeTransitions);
    expect(bridgeViews).toHaveLength(coverage.summary.crossDomainTransitionCount * 2);

    for (const transition of coverage.bridgeTransitions) {
      const perspectives = bridgeViews.filter((bridge) => bridge.transitionId === transition.id);
      expect(perspectives).toHaveLength(2);
      expect(perspectives.map((bridge) => bridge.direction).sort()).toEqual([
        "incoming",
        "outgoing",
      ]);
      expect(perspectives.every((bridge) => bridge.fromArticleHref && bridge.toArticleHref)).toBe(
        true
      );
      expect(perspectives.every((bridge) => bridge.graphHref.includes("source=spine-bridge"))).toBe(
        true
      );
      expect(perspectives.every((bridge) => bridge.toLevel === bridge.fromLevel + 1)).toBe(true);
    }

    for (const row of atlas.rows) {
      const aggregateCount = row.bridges.reduce((total, bridge) => total + bridge.count, 0);
      expect(row.bridgeTransitions).toHaveLength(aggregateCount);
      expect(
        row.bridgeTransitions.every((bridge) => bridge.counterpartDomainId !== row.domainId)
      ).toBe(true);
    }
  });

  it("ranks bridges nearest to the selected subject stage without changing source direction", () => {
    const physics = atlas.rows.find((row) => row.domainId === "physics")!;
    const originalDirections = new Map(
      physics.bridgeTransitions.map((bridge) => [bridge.id, bridge.direction])
    );
    const atLevelTwo = rankKnowledgeSpineBridges(physics.bridgeTransitions, 2);

    expect(atLevelTwo[0]!.selectedDomainLevel).toBe(2);
    expect(atLevelTwo.map((bridge) => bridge.id)).toEqual(
      expect.arrayContaining(physics.bridgeTransitions.map((bridge) => bridge.id))
    );
    expect(
      atLevelTwo.every((bridge) => originalDirections.get(bridge.id) === bridge.direction)
    ).toBe(true);
  });
});
