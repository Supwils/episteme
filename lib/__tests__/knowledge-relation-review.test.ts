import { describe, expect, it } from "vitest";
import type { GraphNode } from "@/lib/graph-engine";
import {
  buildKnowledgeRelationReviewView,
  wouldCreatePrerequisiteCycle,
} from "../knowledge-relation-review";
import { buildCatalogKnowledgeRelationReview } from "../knowledge-relation-review-catalog";
import { ALL_NODES } from "@/subjects/knowledge-graph/data/graph-data";
import {
  CONFLUENCE_MULTIPARENT_RELATIONS,
  CONFLUENCE_MULTIPARENT_RELEASE_META,
  CONFLUENCE_MULTIPARENT_RELEASE_TARGETS,
} from "@/subjects/knowledge-graph/data/confluence-prerequisite-release";

describe("multi-parent relation review", () => {
  it("publishes five evidence-backed L5 confluences with role-safe semantics", () => {
    const nodeMap = new Map(ALL_NODES.map((node) => [node.id, node]));
    expect(CONFLUENCE_MULTIPARENT_RELEASE_TARGETS).toHaveLength(15);
    expect(CONFLUENCE_MULTIPARENT_RELATIONS).toHaveLength(30);
    expect(
      CONFLUENCE_MULTIPARENT_RELATIONS.filter(
        (relation) => relation.role === "required-prerequisite"
      )
    ).toHaveLength(20);
    expect(
      CONFLUENCE_MULTIPARENT_RELATIONS.filter(
        (relation) => relation.role === "recommended-background"
      )
    ).toHaveLength(5);
    expect(
      CONFLUENCE_MULTIPARENT_RELATIONS.filter((relation) => relation.role === "related-context")
    ).toHaveLength(5);

    for (const relation of CONFLUENCE_MULTIPARENT_RELATIONS) {
      const source = nodeMap.get(relation.sourceId)!;
      const target = nodeMap.get(relation.targetId)!;
      expect(source.knowledgeLevel).toBeLessThan(target.knowledgeLevel!);
      expect(relation.evidence).toHaveLength(2);
      expect(
        relation.evidence.some((evidence) => evidence.kind === "confluence-ledger") ||
          relation.evidence.every((evidence) => evidence.kind === "editorial-audit")
      ).toBe(true);
    }

    for (const target of CONFLUENCE_MULTIPARENT_RELEASE_TARGETS) {
      expect(nodeMap.get(target.targetId)?.prerequisiteIds).toHaveLength(2);
    }
  });

  it("replays route, frontier and cycle impact without inventing user counts", () => {
    const view = buildCatalogKnowledgeRelationReview([]);
    expect(view.summary).toMatchObject({
      targetCount: 15,
      relationCount: 30,
      requiredRelationCount: 20,
      netNewRequiredCount: 15,
      recommendedRelationCount: 5,
      contextRelationCount: 5,
      routeNodeDelta: 52,
      cycleCount: 0,
      personalChangedTargetCount: 0,
      referenceReadyBefore: 15,
      referenceReadyAfter: 0,
      referenceBlockedAfter: 15,
    });
    expect(
      view.targets.every(
        (target) =>
          target.baselineRequiredCount === 1 &&
          target.currentRequiredCount === 2 &&
          target.currentRouteNodeCount > target.baselineRouteNodeCount &&
          target.cycleRisk === "none"
      )
    ).toBe(true);
  });

  it("detects a candidate edge that would close a prerequisite cycle", () => {
    const nodes: GraphNode[] = [
      {
        id: "source",
        label: "source",
        domain: "mathematics",
        type: "concept",
        slug: "source",
        tags: [],
        description: "source",
        knowledgeLevel: 2,
        prerequisiteIds: [],
      },
      {
        id: "target",
        label: "target",
        domain: "mathematics",
        type: "concept",
        slug: "target",
        tags: [],
        description: "target",
        knowledgeLevel: 3,
        prerequisiteIds: ["source"],
      },
    ];
    expect(wouldCreatePrerequisiteCycle("target", "source", nodes)).toBe(true);
    expect(wouldCreatePrerequisiteCycle("source", "target", nodes)).toBe(false);
  });

  it("accepts the release data through the pure review builder", () => {
    const view = buildKnowledgeRelationReviewView(
      ALL_NODES,
      CONFLUENCE_MULTIPARENT_RELATIONS,
      CONFLUENCE_MULTIPARENT_RELEASE_TARGETS,
      CONFLUENCE_MULTIPARENT_RELEASE_META,
      []
    );
    expect(view.release.version).toBe("2.1.0");
  });
});
