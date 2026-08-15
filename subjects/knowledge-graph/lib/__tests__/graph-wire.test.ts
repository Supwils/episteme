import { describe, expect, it } from "vitest";
import { packGraphData, unpackGraphData, GRAPH_WIRE_VERSION } from "../graph-wire";
import { ALL_NODES, ALL_EDGES } from "../../data/graph-data";
import type { GraphEdge, GraphNode } from "@/lib/graph-engine";

const NODES: GraphNode[] = [
  {
    id: "a",
    label: "甲",
    domain: "physics",
    type: "concept",
    slug: "a",
    tags: [],
    description: "",
  },
  {
    id: "b",
    label: "乙",
    domain: "physics",
    type: "concept",
    slug: "b",
    tags: [],
    description: "",
  },
  {
    id: "c",
    label: "丙",
    domain: "mathematics",
    type: "concept",
    slug: "c",
    tags: [],
    description: "",
  },
];
const EDGES: GraphEdge[] = [
  { source: "a", target: "b", type: "hierarchy", label: "下钻" },
  { source: "b", target: "c", type: "cross-reference" },
];

describe("graph wire v2", () => {
  it("round-trips edges with and without labels", () => {
    const packed = packGraphData(NODES, EDGES);
    expect(packed.v).toBe(GRAPH_WIRE_VERSION);
    expect(packed.edges[0]).toEqual([0, 1, 2, "下钻"]);
    expect(packed.edges[1]).toEqual([1, 2, 0]);
    expect(unpackGraphData(packed)).toEqual({ nodes: NODES, edges: EDGES });
  });

  it("round-trips the full catalog without loss", () => {
    const packed = packGraphData(ALL_NODES, ALL_EDGES);
    const restored = unpackGraphData(packed);
    expect(restored.nodes).toEqual(ALL_NODES);
    expect(restored.edges).toEqual(ALL_EDGES);
    // Guard the size win: packed JSON must stay meaningfully smaller.
    const v1Bytes = JSON.stringify({ nodes: ALL_NODES, edges: ALL_EDGES }).length;
    const v2Bytes = JSON.stringify(packed).length;
    expect(v2Bytes).toBeLessThan(v1Bytes * 0.75);
  });
});
