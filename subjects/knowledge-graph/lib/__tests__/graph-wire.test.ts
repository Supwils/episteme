import { describe, expect, it } from "vitest";
import {
  applyGraphDescriptions,
  packGraphData,
  packGraphDescriptions,
  unpackGraphData,
  GRAPH_WIRE_VERSION,
} from "../graph-wire";
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

describe("graph wire v3", () => {
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
    expect(applyGraphDescriptions(restored.nodes, packGraphDescriptions(ALL_NODES))).toBe(true);
    expect(restored.nodes).toEqual(ALL_NODES);
    expect(restored.edges).toEqual(ALL_EDGES);
    // Guard the size win: packed JSON must stay meaningfully smaller.
    const v1Bytes = JSON.stringify({ nodes: ALL_NODES, edges: ALL_EDGES }).length;
    const v2Bytes = JSON.stringify(packed).length;
    expect(v2Bytes).toBeLessThan(v1Bytes * 0.75);
  });

  it("keeps descriptions out of the first payload and refuses a mismatched file", () => {
    const withText = NODES.map((node) => ({ ...node, description: `关于${node.label}` }));
    const packed = packGraphData(withText, EDGES);
    expect(JSON.stringify(packed)).not.toContain("关于");
    const nodes = unpackGraphData(packed).nodes;
    expect(nodes.every((node) => node.description === "")).toBe(true);

    const stale = { ...packGraphDescriptions(withText), lastId: "z" };
    expect(applyGraphDescriptions(nodes, stale)).toBe(false);
    expect(nodes[0]!.description).toBe("");
    expect(applyGraphDescriptions(nodes, packGraphDescriptions(withText))).toBe(true);
    expect(nodes.map((node) => node.description)).toEqual(["关于甲", "关于乙", "关于丙"]);
  });

  it("carries a precomputed layout to one decimal in node order", () => {
    const positions = new Map([
      ["a", { x: 12.34, y: -5.06 }],
      ["b", { x: 0, y: 0 }],
      ["c", { x: -300.96, y: 440.01 }],
    ]);
    const packed = packGraphData(NODES, EDGES, positions);
    expect(packed.p).toEqual([123, -51, 0, 0, -3010, 4400]);
    const restored = unpackGraphData(packed).initialPositions!;
    expect(restored.get("a")).toEqual({ x: 12.3, y: -5.1 });
    expect(restored.get("c")).toEqual({ x: -301, y: 440 });
    expect(unpackGraphData(packGraphData(NODES, EDGES)).initialPositions).toBeUndefined();
  });
});
