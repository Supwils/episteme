import { describe, expect, it } from "vitest";
import { ALL_EDGES, ALL_NODES } from "../graph-data";

const canonicalPhilosophyNodes = [
  "buddhism-philosophy",
  "epicureanism",
  "idealism",
  "philosophy-of-mind",
  "skepticism",
  "utilitarianism",
];

describe("knowledge graph integrity", () => {
  it("keeps every node id globally unique", () => {
    const nodeIds = ALL_NODES.map((node) => node.id);
    expect(new Set(nodeIds).size).toBe(nodeIds.length);
  });

  it("uses the school article as the canonical graph node for merged philosophy topics", () => {
    for (const slug of canonicalPhilosophyNodes) {
      expect(ALL_NODES.filter((node) => node.id === `philosophy:${slug}`)).toEqual([
        expect.objectContaining({ type: "school", slug }),
      ]);
    }
  });

  it("keeps distinct experiment and phenomenon pages separately addressable", () => {
    expect(ALL_NODES).toContainEqual(
      expect.objectContaining({
        id: "psychology:learned-helplessness",
        type: "experiment",
        url: "/psychology/experiments/learned-helplessness",
      })
    );
    expect(ALL_NODES).toContainEqual(
      expect.objectContaining({
        id: "psychology:learned-helplessness-phenomenon",
        type: "phenomenon",
        url: "/psychology/phenomena/learned-helplessness",
      })
    );
  });

  it("keeps every edge attached to a real node", () => {
    const nodeIds = new Set(ALL_NODES.map((node) => node.id));
    const danglingEdges = ALL_EDGES.filter(
      (edge) => !nodeIds.has(edge.source) || !nodeIds.has(edge.target)
    ).map((edge) => `${edge.source} -> ${edge.target}`);

    expect(danglingEdges).toEqual([]);
  });
});
