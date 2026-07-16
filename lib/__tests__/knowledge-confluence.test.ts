import { describe, expect, it } from "vitest";
import {
  buildKnowledgeConfluenceCatalog,
  buildKnowledgeConfluenceSummaryCatalog,
} from "@/lib/knowledge-confluence-catalog";
import {
  buildKnowledgeConfluenceGraphHref,
  buildKnowledgeConfluencePlan,
} from "@/lib/knowledge-confluence-plan";
import { buildLearningPlanCatalog } from "@/lib/knowledge-learning-plan-catalog";
import { buildCognitiveSubgraph } from "@/subjects/knowledge-graph/data/cognitive-metadata";
import { ALL_NODES } from "@/subjects/knowledge-graph/data/graph-data";
import {
  CURATED_KNOWLEDGE_CONFLUENCES,
  getCuratedConfluenceBridgeEdges,
  getCuratedConfluenceEdgeKeys,
  getCuratedConfluenceNodeIds,
  getCuratedConfluenceTargetNodeId,
} from "@/subjects/knowledge-graph/data/curated-confluences";

const catalog = buildKnowledgeConfluenceCatalog(buildLearningPlanCatalog());
const summaryCatalog = buildKnowledgeConfluenceSummaryCatalog();

describe("knowledge confluences", () => {
  it("curates five multi-domain L1-L4 routes into real L5 targets", () => {
    expect(catalog.confluences).toHaveLength(5);
    expect(catalog.confluences.map((confluence) => confluence.id)).toEqual([
      "ai-governance",
      "urban-climate-adaptation",
      "population-ageing",
      "macro-fiscal-governance",
      "public-health-priority",
    ]);

    for (const confluence of catalog.confluences) {
      expect(confluence.strands).toHaveLength(4);
      expect(new Set(confluence.strands.map((strand) => strand.role))).toEqual(
        new Set(["required", "complementary", "contested"])
      );
      expect(confluence.target.level).toBe(5);
      expect(confluence.nodeCount).toBe(17);
      expect(confluence.domainCount).toBeGreaterThanOrEqual(4);
      for (const strand of confluence.strands) {
        expect(strand.steps.map((step) => step.level)).toEqual([1, 2, 3, 4]);
      }
    }
  });

  it("keeps the homepage catalog compact while retaining auditable status", () => {
    expect(summaryCatalog.confluences).toHaveLength(5);
    expect(summaryCatalog.confluences.map((item) => item.id)).toEqual(
      catalog.confluences.map((item) => item.id)
    );
    expect(summaryCatalog.confluences.every((item) => item.evidenceSourceCount >= 3)).toBe(true);
    expect(summaryCatalog.confluences.every((item) => item.reviewedAt === "2026-07-12")).toBe(true);
    expect(JSON.stringify(summaryCatalog).length).toBeLessThan(8_000);
    expect(JSON.stringify(summaryCatalog).length).toBeLessThan(
      JSON.stringify(catalog).length * 0.25
    );
  });

  it("attaches one sourced evidence record to every strand", () => {
    for (const confluence of catalog.confluences) {
      expect(confluence.strands.every((strand) => strand.evidence.sources.length > 0)).toBe(true);
      expect(new Set(confluence.strands.map((strand) => strand.evidence.strandId)).size).toBe(4);
      for (const strand of confluence.strands) {
        expect(strand.evidence.sourcePathId).toBe(strand.pathId);
        expect(strand.evidence.sourceNode.level).toBe(4);
        expect(strand.evidence.sources.every((source) => source.href.startsWith("https://"))).toBe(
          true
        );
      }
    }
  });

  it("keeps every curated confluence node real and visible in the L5 cognitive graph", () => {
    const nodeIds = new Set(ALL_NODES.map((node) => node.id));
    const visibleIds = new Set(
      buildCognitiveSubgraph(ALL_NODES, 5, null).nodes.map((node) => node.id)
    );

    for (const definition of CURATED_KNOWLEDGE_CONFLUENCES) {
      const confluenceNodeIds = getCuratedConfluenceNodeIds(definition);
      expect(confluenceNodeIds).toHaveLength(17);
      expect(getCuratedConfluenceEdgeKeys(definition).size).toBe(32);
      expect(getCuratedConfluenceBridgeEdges(definition)).toHaveLength(4);
      expect(confluenceNodeIds.at(-1)).toBe(getCuratedConfluenceTargetNodeId(definition));
      for (const nodeId of confluenceNodeIds) {
        expect(nodeIds.has(nodeId), `${definition.id}/${nodeId}`).toBe(true);
        expect(visibleIds.has(nodeId), `${definition.id}/${nodeId}`).toBe(true);
      }
    }
  });

  it.each([20, 45, 90] as const)("allocates an exact %i minute parallel plan", (minutes) => {
    for (const confluence of catalog.confluences) {
      const plan = buildKnowledgeConfluencePlan(confluence, minutes);
      const steps = [...plan.strands.flatMap((strand) => strand.steps), plan.synthesis];
      expect(steps.reduce((sum, step) => sum + step.minutes, 0)).toBe(minutes);
      expect(steps.every((step) => step.minutes > 0)).toBe(true);
      expect(plan.checkpointCount).toBe(minutes === 20 ? 5 : minutes === 45 ? 9 : 17);
      expect(plan.strands).toHaveLength(4);
    }
  });

  it("builds a compact graph deep link for the complete confluence", () => {
    expect(
      buildKnowledgeConfluenceGraphHref(
        "ai-governance",
        "political-science:ai-governance-surveillance"
      )
    ).toBe(
      "/knowledge-graph?confluence=ai-governance&level=5&source=knowledge-confluence&focus=political-science%3Aai-governance-surveillance"
    );
  });
});
