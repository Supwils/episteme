import { describe, expect, it } from "vitest";
import { resolveCollisions } from "../forces";
import { buildQuadTree, initQuadTreePool } from "../quadtree";
import { DEFAULT_CONFIG, type LayoutNode } from "../types";

function node(id: string, x: number, y: number): LayoutNode {
  return { id, x, y, vx: 0, vy: 0, domain: "physics" };
}

describe("coincident graph nodes", () => {
  it("does not overflow the quadtree when many nodes share a coordinate", () => {
    initQuadTreePool();
    const nodes = Array.from({ length: 48 }, (_, index) => node(String(index), 50, 50));
    expect(() => buildQuadTree(nodes, 0, 0, 100, 100)).not.toThrow();
  });

  it("nudges perfectly overlapping nodes apart so the next tick can subdivide", () => {
    const nodes = [node("a", 0, 0), node("b", 0, 0)];
    resolveCollisions(nodes, DEFAULT_CONFIG);
    expect(nodes[0]!.x !== nodes[1]!.x || nodes[0]!.y !== nodes[1]!.y).toBe(true);
  });
});
