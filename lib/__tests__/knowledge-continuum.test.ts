import { describe, expect, it } from "vitest";
import { buildValidRoutes } from "@/scripts/valid-routes";
import {
  ALL_KNOWLEDGE_CONTINUUM_NODES,
  KNOWLEDGE_BRIDGES,
  KNOWLEDGE_DOMAINS,
  KNOWLEDGE_STAGES,
  KNOWLEDGE_THREADS,
} from "@/lib/knowledge-continuum";
import { CONTINUUM_GRAPH_NODE_IDS, buildContinuumGraphHref } from "@/lib/knowledge-continuum-graph";
import { ALL_NODES } from "@/subjects/knowledge-graph/data/graph-data";
import { buildKnowledgeCoverageSnapshot } from "@/lib/knowledge-continuum-coverage";
import { CURATED_LEARNING_PATHS } from "@/subjects/knowledge-graph/data/curated-learning-paths";

const coverage = buildKnowledgeCoverageSnapshot();

describe("homepage knowledge continuum", () => {
  it("forms six complete five-stage prerequisite chains", () => {
    expect(KNOWLEDGE_STAGES).toHaveLength(5);
    expect(KNOWLEDGE_THREADS).toHaveLength(6);
    expect(ALL_KNOWLEDGE_CONTINUUM_NODES).toHaveLength(30);

    for (const thread of KNOWLEDGE_THREADS) {
      expect(thread.nodes.map((node) => node.stage)).toEqual([1, 2, 3, 4, 5]);
      expect(new Set(thread.nodes.map((node) => node.id)).size).toBe(5);
    }
  });

  it("represents every platform subject", () => {
    const representedDomains = new Set(
      ALL_KNOWLEDGE_CONTINUUM_NODES.flatMap((node) => node.domains)
    );
    expect([...representedDomains].sort()).toEqual(Object.keys(KNOWLEDGE_DOMAINS).sort());
  });

  it("links every node to a real route", () => {
    const validRoutes = buildValidRoutes();
    const brokenRoutes = ALL_KNOWLEDGE_CONTINUUM_NODES.map((node) => node.href).filter(
      (href) => !validRoutes.has(href)
    );
    expect(brokenRoutes).toEqual([]);
  });

  it("keeps every cross-disciplinary bridge connected to known nodes", () => {
    const nodeIds = new Set(ALL_KNOWLEDGE_CONTINUUM_NODES.map((node) => node.id));
    const brokenBridges = KNOWLEDGE_BRIDGES.filter(
      ([from, to]) => from === to || !nodeIds.has(from) || !nodeIds.has(to)
    );
    expect(brokenBridges).toEqual([]);
  });

  it("maps every homepage anchor to a real graph node at the same cognitive stage", () => {
    const graphNodeMap = new Map(ALL_NODES.map((node) => [node.id, node]));
    expect(Object.keys(CONTINUUM_GRAPH_NODE_IDS).sort()).toEqual(
      ALL_KNOWLEDGE_CONTINUUM_NODES.map((node) => node.id).sort()
    );

    for (const continuumNode of ALL_KNOWLEDGE_CONTINUUM_NODES) {
      const graphNodeId = CONTINUUM_GRAPH_NODE_IDS[continuumNode.id];
      const graphNode = graphNodeId ? graphNodeMap.get(graphNodeId) : undefined;
      expect(graphNode, continuumNode.id).toBeDefined();
      expect(graphNode?.knowledgeLevel, continuumNode.id).toBe(continuumNode.stage);

      const href = new URL(buildContinuumGraphHref(continuumNode), "https://episteme.test");
      expect(href.pathname).toBe("/knowledge-graph");
      expect(href.searchParams.get("focus")).toBe(graphNodeId);
      expect(href.searchParams.get("level")).toBe(String(continuumNode.stage));
    }
  });

  it("derives an extensible coverage snapshot from the curated paths", () => {
    expect(coverage.summary).toMatchObject({
      nodeCount: 230,
      pathCount: 46,
      prerequisiteCount: 184,
      establishedDomainCount: 15,
      previewDomainCount: 0,
    });
    expect(coverage.domains).toHaveLength(15);
    expect(coverage.domains.every((row) => row.total > 0)).toBe(true);
    expect(coverage.domains.find((row) => row.id === "linguistics")?.status).toBe("established");

    const totalsByLevel = [0, 1, 2, 3, 4].map((index) =>
      coverage.domains.reduce((sum, row) => sum + row.levels[index]!, 0)
    );
    expect(totalsByLevel).toEqual([46, 46, 46, 46, 46]);
  });

  it("fills all five stages for every established subject", () => {
    const establishedDomains = coverage.domains.filter((row) => row.status === "established");
    expect(establishedDomains).toHaveLength(15);
    for (const row of establishedDomains) {
      expect(
        row.levels.every((count) => count > 0),
        row.id
      ).toBe(true);
    }
  });

  it("accounts for every curated node by evidence mode", () => {
    expect(coverage.evidenceModes).toHaveLength(7);
    expect(coverage.evidenceModes.reduce((sum, row) => sum + row.total, 0)).toBe(230);
    expect(coverage.evidenceModes.every((row) => row.total > 0)).toBe(true);
    expect(coverage.evidenceModes.find((row) => row.id === "synthesis")?.levels[4]).toBe(46);
  });

  it("keeps cross-domain bridge counts symmetric and traceable to real paths", () => {
    const bridgeTotal = coverage.domains.reduce(
      (sum, row) => sum + row.bridges.reduce((rowSum, bridge) => rowSum + bridge.count, 0),
      0
    );
    expect(bridgeTotal / 2).toBe(coverage.summary.crossDomainTransitionCount);

    const pathIds = new Set(CURATED_LEARNING_PATHS.map((path) => path.id));
    const nodeIds = new Set(ALL_NODES.map((node) => node.id));
    expect(coverage.bridgeTransitions).toHaveLength(coverage.summary.crossDomainTransitionCount);
    expect(new Set(coverage.bridgeTransitions.map((transition) => transition.id)).size).toBe(
      coverage.bridgeTransitions.length
    );
    for (const transition of coverage.bridgeTransitions) {
      expect(pathIds.has(transition.pathId)).toBe(true);
      expect(nodeIds.has(transition.fromNodeId)).toBe(true);
      expect(nodeIds.has(transition.toNodeId)).toBe(true);
      expect(transition.fromDomain).not.toBe(transition.toDomain);
      expect(transition.level).toBe(transition.fromLevel + 1);
    }
    for (const row of coverage.domains) {
      for (const bridge of row.bridges) {
        expect(coverage.domains.some((candidate) => candidate.id === bridge.id)).toBe(true);
        expect(
          coverage.domains
            .find((candidate) => candidate.id === bridge.id)
            ?.bridges.find((candidate) => candidate.id === row.id)?.count
        ).toBe(bridge.count);
      }
      for (const reference of row.references) {
        expect(pathIds.has(reference.pathId)).toBe(true);
        expect(nodeIds.has(reference.nodeId)).toBe(true);
      }
    }
  });
});
