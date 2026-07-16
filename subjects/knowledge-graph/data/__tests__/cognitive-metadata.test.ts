import { describe, expect, it } from "vitest";
import { KNOWLEDGE_LEVELS, parseKnowledgeLevel } from "@/lib/knowledge-levels";
import { ALL_EDGES, ALL_NODES } from "../graph-data";
import { buildCognitiveSubgraph } from "../cognitive-metadata";

describe("knowledge graph cognitive metadata", () => {
  it("assigns every graph node to one of the five knowledge levels", () => {
    const validLevels = new Set(KNOWLEDGE_LEVELS.map((level) => level.id));
    expect(
      ALL_NODES.every((node) => node.knowledgeLevel && validLevels.has(node.knowledgeLevel))
    ).toBe(true);

    for (const level of KNOWLEDGE_LEVELS) {
      expect(ALL_NODES.filter((node) => node.knowledgeLevel === level.id).length).toBeGreaterThan(
        0
      );
    }
  });

  it("assigns an evidence mode to every node", () => {
    expect(ALL_NODES.every((node) => Boolean(node.evidenceMode))).toBe(true);
  });

  it("derives prerequisites only from real edges and lower knowledge levels", () => {
    const nodeMap = new Map(ALL_NODES.map((node) => [node.id, node]));
    const edgePairs = new Set<string>();
    for (const edge of ALL_EDGES) {
      edgePairs.add(`${edge.source}|${edge.target}`);
      edgePairs.add(`${edge.target}|${edge.source}`);
    }

    const invalid: string[] = [];
    for (const node of ALL_NODES) {
      for (const prerequisiteId of node.prerequisiteIds ?? []) {
        const prerequisite = nodeMap.get(prerequisiteId);
        if (
          !prerequisite ||
          !edgePairs.has(`${node.id}|${prerequisiteId}`) ||
          !prerequisite.knowledgeLevel ||
          !node.knowledgeLevel ||
          prerequisite.knowledgeLevel >= node.knowledgeLevel
        ) {
          invalid.push(`${prerequisiteId} -> ${node.id}`);
        }
      }
    }
    expect(invalid).toEqual([]);
    expect(
      ALL_NODES.filter((node) => (node.prerequisiteIds?.length ?? 0) > 0).length
    ).toBeGreaterThan(ALL_NODES.length * 0.3);
  });

  it("keeps an author's explicit lower-level prerequisite ahead of graph inference", () => {
    const syntax = ALL_NODES.find((node) => node.id === "linguistics:syntax");
    expect(syntax?.prerequisiteIds).toEqual(["linguistics:words-and-sentences"]);
  });

  it("parses only supported URL levels", () => {
    expect(parseKnowledgeLevel("1")).toBe(1);
    expect(parseKnowledgeLevel("5")).toBe(5);
    expect(parseKnowledgeLevel("0")).toBeNull();
    expect(parseKnowledgeLevel("unknown")).toBeNull();
  });

  it("keeps target nodes and their recursive prerequisites in a stage subgraph", () => {
    const result = buildCognitiveSubgraph(ALL_NODES, 5, null);
    const visibleIds = new Set(result.nodes.map((node) => node.id));

    expect(result.targetNodeIds.size).toBe(
      ALL_NODES.filter((node) => node.knowledgeLevel === 5).length
    );
    expect(result.nodes.length).toBeGreaterThan(result.targetNodeIds.size);
    expect(
      result.nodes.every((node) =>
        (node.prerequisiteIds ?? []).every((prerequisiteId) => visibleIds.has(prerequisiteId))
      )
    ).toBe(true);
  });
});
