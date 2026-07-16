import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ALL_NODES } from "../graph-data";
import { EARTH_SCIENCE_RISK_EDGES, EARTH_SCIENCE_RISK_NODES } from "../earth-science-risk-coverage";

const allNodeIds = new Set(ALL_NODES.map((node) => node.id));

describe("earth-science risk graph coverage", () => {
  it("keeps every risk node id unique", () => {
    const nodeIds = EARTH_SCIENCE_RISK_NODES.map((node) => node.id);
    expect(new Set(nodeIds).size).toBe(nodeIds.length);
  });

  it("maps every risk node to a real article", () => {
    const missingArticles = EARTH_SCIENCE_RISK_NODES.filter((node) => {
      if (!node.url) return true;
      const contentPath = path.join(process.cwd(), "content", node.url);
      return !fs.existsSync(`${contentPath}.mdx`) && !fs.existsSync(`${contentPath}.md`);
    }).map((node) => `${node.id} -> ${node.url ?? "missing URL"}`);

    expect(missingArticles).toEqual([]);
  });

  it("keeps every risk edge attached to real graph nodes", () => {
    const danglingEdges = EARTH_SCIENCE_RISK_EDGES.filter(
      (edge) => !allNodeIds.has(edge.source) || !allNodeIds.has(edge.target)
    ).map((edge) => `${edge.source} -> ${edge.target}`);

    expect(danglingEdges).toEqual([]);
  });
});
