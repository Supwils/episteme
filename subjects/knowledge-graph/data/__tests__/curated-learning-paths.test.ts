import { describe, expect, it } from "vitest";
import { ALL_EDGES, ALL_NODES } from "../graph-data";
import { CURATED_LEARNING_PATHS } from "../curated-learning-paths";
import { buildPrimaryPrerequisitePath } from "../cognitive-metadata";
import { buildValidRoutes } from "@/scripts/valid-routes";

const nodeMap = new Map(ALL_NODES.map((node) => [node.id, node]));
const edgePairs = new Set(
  ALL_EDGES.flatMap((edge) => [`${edge.source}|${edge.target}`, `${edge.target}|${edge.source}`])
);

describe("curated learning paths", () => {
  it("defines complete and non-overlapping L1-L5 paths", () => {
    expect(CURATED_LEARNING_PATHS.length).toBeGreaterThanOrEqual(41);
    const ids = CURATED_LEARNING_PATHS.flatMap((path) => path.steps.map((step) => step.nodeId));
    expect(ids).toHaveLength(CURATED_LEARNING_PATHS.length * 5);
    expect(new Set(ids).size).toBe(ids.length);

    for (const path of CURATED_LEARNING_PATHS) {
      expect(path.steps.map((step) => step.level)).toEqual([1, 2, 3, 4, 5]);
      const domains = new Set(path.steps.map((step) => nodeMap.get(step.nodeId)?.domain));
      if (path.scope === "domain-spine") {
        expect(domains.size, path.id).toBe(1);
      } else {
        expect(domains.size, path.id).toBeGreaterThanOrEqual(2);
      }
    }

    const graphDomains = new Set(ALL_NODES.map((node) => node.domain));
    const curatedDomains = new Set(ids.map((id) => nodeMap.get(id)!.domain));
    expect(curatedDomains).toEqual(graphDomains);
  });

  it("only references real nodes and real prerequisite edges", () => {
    for (const path of CURATED_LEARNING_PATHS) {
      for (const [index, step] of path.steps.entries()) {
        const node = nodeMap.get(step.nodeId);
        expect(node, `${path.id}: ${step.nodeId}`).toBeDefined();
        expect(node?.knowledgeLevel).toBe(step.level);
        expect(node?.knowledgeLevelSource).toBe("curated");
        expect(node?.evidenceMode).toBe(step.evidenceMode);

        if (index === 0) {
          expect(node?.prerequisiteIds).toEqual([]);
          continue;
        }
        const prerequisiteId = path.steps[index - 1]!.nodeId;
        expect(node?.prerequisiteIds).toContain(prerequisiteId);
        expect(edgePairs.has(`${prerequisiteId}|${step.nodeId}`)).toBe(true);
      }
    }
  });

  it("reconstructs each canonical route from foundation to selected target", () => {
    for (const path of CURATED_LEARNING_PATHS) {
      const targetId = path.steps.at(-1)!.nodeId;
      expect(buildPrimaryPrerequisitePath(targetId, ALL_NODES)).toEqual(
        path.steps.map((step) => step.nodeId)
      );
    }
  });

  it("keeps every domain-spine step connected to a real article", () => {
    const validRoutes = buildValidRoutes();
    for (const path of CURATED_LEARNING_PATHS.filter(
      (candidate) => candidate.scope === "domain-spine"
    )) {
      for (const step of path.steps) {
        const node = nodeMap.get(step.nodeId);
        expect(node?.url, `${path.id}: ${step.nodeId}`).toBeDefined();
        expect(validRoutes.has(node!.url!), `${path.id}: ${node!.url}`).toBe(true);
      }
    }
  });
});
