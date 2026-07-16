import { describe, expect, it } from "vitest";
import { ALL_EDGES, ALL_NODES } from "../../data/graph-data";
import { buildCognitiveSubgraph } from "../../data/cognitive-metadata";
import { buildCognitiveLayoutPositions } from "../cognitive-layout";

const subgraph = buildCognitiveSubgraph(ALL_NODES, 5, null);
const visibleIds = new Set(subgraph.nodes.map((node) => node.id));
const subgraphEdges = ALL_EDGES.filter(
  (edge) => visibleIds.has(edge.source) && visibleIds.has(edge.target)
);

function averageCoordinate(
  level: number,
  axis: "x" | "y",
  positions: Map<string, { x: number; y: number }>
): number {
  const values = subgraph.nodes
    .filter((node) => node.knowledgeLevel === level)
    .map((node) => positions.get(node.id)![axis]);
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

describe("cognitive graph layout", () => {
  it("places every visible node at a deterministic finite position", () => {
    const first = buildCognitiveLayoutPositions(subgraph.nodes, subgraphEdges, "horizontal");
    const second = buildCognitiveLayoutPositions(subgraph.nodes, subgraphEdges, "horizontal");

    expect(first).toEqual(second);
    expect(first.size).toBe(subgraph.nodes.length);
    expect([...first.values()].every((position) => Number.isFinite(position.x + position.y))).toBe(
      true
    );
    expect(new Set([...first.values()].map(({ x, y }) => `${x},${y}`)).size).toBe(first.size);
  });

  it("orders knowledge levels from left to right on desktop", () => {
    const positions = buildCognitiveLayoutPositions(subgraph.nodes, subgraphEdges, "horizontal");
    const levelCenters = [1, 2, 3, 4, 5].map((level) => averageCoordinate(level, "x", positions));

    expect(levelCenters).toEqual([...levelCenters].sort((left, right) => left - right));
  });

  it("orders knowledge levels from top to bottom on mobile", () => {
    const positions = buildCognitiveLayoutPositions(subgraph.nodes, subgraphEdges, "vertical");
    const levelCenters = [1, 2, 3, 4, 5].map((level) => averageCoordinate(level, "y", positions));

    expect(levelCenters).toEqual([...levelCenters].sort((top, bottom) => top - bottom));
  });
});
