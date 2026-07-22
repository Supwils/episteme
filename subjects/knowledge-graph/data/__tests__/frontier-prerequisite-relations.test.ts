import { describe, expect, it } from "vitest";
import { ALL_NODES } from "../graph-data";
import {
  FRONTIER_FOUNDATION_NODES,
  REVIEWED_LEARNING_RELATIONS,
  REVIEWED_REQUIRED_PREREQUISITES,
} from "../frontier-prerequisite-relations";

const nodeMap = new Map(ALL_NODES.map((node) => [node.id, node]));

describe("reviewed frontier prerequisite relations", () => {
  it("keeps every reviewed relation attached and auditable", () => {
    expect(REVIEWED_LEARNING_RELATIONS).toHaveLength(197);
    expect(new Set(REVIEWED_LEARNING_RELATIONS.map((relation) => relation.id)).size).toBe(197);
    for (const relation of REVIEWED_LEARNING_RELATIONS) {
      expect(nodeMap.has(relation.sourceId), relation.sourceId).toBe(true);
      expect(nodeMap.has(relation.targetId), relation.targetId).toBe(true);
      expect(relation.rationale.length).toBeGreaterThan(10);
      expect(relation.reviewStatus).toBe("reviewed");
      expect(relation.version).toMatch(/^\d+\.\d+\.\d+$/);
      expect(relation.evidence.length).toBeGreaterThan(0);
    }
  });

  it("uses only lower-level reviewed relations as hard prerequisites", () => {
    for (const [targetId, prerequisiteIds] of REVIEWED_REQUIRED_PREREQUISITES) {
      const target = nodeMap.get(targetId)!;
      for (const prerequisiteId of prerequisiteIds) {
        const prerequisite = nodeMap.get(prerequisiteId)!;
        expect(prerequisite.knowledgeLevel, `${prerequisiteId} -> ${targetId}`).toBeLessThan(
          target.knowledgeLevel!
        );
        expect(target.prerequisiteIds).toContain(prerequisiteId);
      }
    }
  });

  it("does not leave higher-level nodes without a reviewed or inferred anchor", () => {
    expect(
      ALL_NODES.filter(
        (node) => (node.knowledgeLevel ?? 0) > 1 && (node.prerequisiteIds?.length ?? 0) === 0
      )
    ).toEqual([]);
  });

  it("provides one natural-entry foundation for each governed domain", () => {
    expect(FRONTIER_FOUNDATION_NODES).toHaveLength(10);
    expect(FRONTIER_FOUNDATION_NODES.every((node) => node.knowledgeLevel === 1)).toBe(true);
    expect(new Set(FRONTIER_FOUNDATION_NODES.map((node) => node.domain)).size).toBe(10);
  });
});
