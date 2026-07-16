import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { CHEMISTRY_COVERAGE_EDGES, CHEMISTRY_COVERAGE_NODES } from "../chemistry-coverage";
import {
  COMPUTER_SCIENCE_COVERAGE_EDGES,
  COMPUTER_SCIENCE_COVERAGE_NODES,
} from "../computer-science-coverage";
import { ALL_NODES } from "../graph-data";
import { MATHEMATICS_COVERAGE_EDGES, MATHEMATICS_COVERAGE_NODES } from "../mathematics-coverage";
import { MEDICINE_COVERAGE_EDGES, MEDICINE_COVERAGE_NODES } from "../medicine-coverage";

const coverageNodes = [
  ...COMPUTER_SCIENCE_COVERAGE_NODES,
  ...MATHEMATICS_COVERAGE_NODES,
  ...CHEMISTRY_COVERAGE_NODES,
  ...MEDICINE_COVERAGE_NODES,
];

const coverageEdges = [
  ...COMPUTER_SCIENCE_COVERAGE_EDGES,
  ...MATHEMATICS_COVERAGE_EDGES,
  ...CHEMISTRY_COVERAGE_EDGES,
  ...MEDICINE_COVERAGE_EDGES,
];

const allNodeIds = new Set(ALL_NODES.map((node) => node.id));

describe("mature content graph coverage", () => {
  it("keeps every curated node id unique", () => {
    const nodeIds = coverageNodes.map((node) => node.id);
    expect(new Set(nodeIds).size).toBe(nodeIds.length);
  });

  it("maps every curated node to a real article", () => {
    const missingArticles = coverageNodes
      .filter((node) => {
        if (!node.url) return true;
        const contentPath = path.join(process.cwd(), "content", node.url);
        return !fs.existsSync(`${contentPath}.mdx`) && !fs.existsSync(`${contentPath}.md`);
      })
      .map((node) => `${node.id} -> ${node.url ?? "missing URL"}`);

    expect(missingArticles).toEqual([]);
  });

  it("keeps every curated edge attached to real graph nodes", () => {
    const danglingEdges = coverageEdges
      .filter((edge) => !allNodeIds.has(edge.source) || !allNodeIds.has(edge.target))
      .map((edge) => `${edge.source} -> ${edge.target}`);

    expect(danglingEdges).toEqual([]);
  });
});
