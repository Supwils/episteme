import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ALL_NODES } from "../graph-data";
import { PSYCHOLOGY_METHOD_EDGES, PSYCHOLOGY_METHOD_NODES } from "../psychology-methods-nodes";

const allNodeIds = new Set(ALL_NODES.map((node) => node.id));

describe("psychology methods graph coverage", () => {
  it("keeps every method node id unique", () => {
    const nodeIds = PSYCHOLOGY_METHOD_NODES.map((node) => node.id);
    expect(new Set(nodeIds).size).toBe(nodeIds.length);
  });

  it("maps every method node to a real article", () => {
    const missingArticles = PSYCHOLOGY_METHOD_NODES.filter((node) => {
      if (!node.url) return true;
      const contentPath = path.join(process.cwd(), "content", node.url);
      return !fs.existsSync(`${contentPath}.mdx`) && !fs.existsSync(`${contentPath}.md`);
    }).map((node) => `${node.id} -> ${node.url ?? "missing URL"}`);

    expect(missingArticles).toEqual([]);
  });

  it("keeps every method edge attached to real graph nodes", () => {
    const danglingEdges = PSYCHOLOGY_METHOD_EDGES.filter(
      (edge) => !allNodeIds.has(edge.source) || !allNodeIds.has(edge.target)
    ).map((edge) => `${edge.source} -> ${edge.target}`);

    expect(danglingEdges).toEqual([]);
  });
});
