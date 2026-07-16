import { describe, expect, it } from "vitest";
import { buildValidRoutes } from "@/scripts/valid-routes";
import { RELEASED_LINGUISTICS_ARTICLES } from "@/lib/linguistics-subject-plan";
import { ALL_EDGES, ALL_NODES } from "../graph-data";

const plannedRelease = RELEASED_LINGUISTICS_ARTICLES;
const linguisticsNodes = ALL_NODES.filter((node) => node.domain === "linguistics");

describe("linguistics graph release", () => {
  it("maps all released articles to same-level graph nodes and real routes", () => {
    const plannedBySlug = new Map(plannedRelease.map((article) => [article.slug, article]));
    const validRoutes = buildValidRoutes();
    expect(linguisticsNodes).toHaveLength(36);
    expect(new Set(linguisticsNodes.map((node) => node.slug))).toEqual(
      new Set(plannedBySlug.keys())
    );

    for (const node of linguisticsNodes) {
      expect(node.knowledgeLevel, node.id).toBe(plannedBySlug.get(node.slug)?.level);
      expect(node.knowledgeLevelSource, node.id).toBe("curated");
      expect(node.url && validRoutes.has(node.url), node.id).toBe(true);
    }
  });

  it("bridges all eight disciplines promised by the release design", () => {
    const nodeMap = new Map(ALL_NODES.map((node) => [node.id, node]));
    const bridgeDomains = new Set<string>();
    for (const edge of ALL_EDGES) {
      const source = nodeMap.get(edge.source);
      const target = nodeMap.get(edge.target);
      if (source?.domain === "linguistics" && target && target.domain !== "linguistics") {
        bridgeDomains.add(target.domain);
      }
      if (target?.domain === "linguistics" && source && source.domain !== "linguistics") {
        bridgeDomains.add(source.domain);
      }
    }

    expect(bridgeDomains).toEqual(
      new Set([
        "psychology",
        "philosophy",
        "computer-science",
        "history",
        "sociology",
        "life-science",
        "mathematics",
        "political-science",
      ])
    );
  });

  it("gives every released node both internal structure and at least one connected edge", () => {
    const connectedIds = new Set(ALL_EDGES.flatMap((edge) => [edge.source, edge.target]));
    for (const node of linguisticsNodes) expect(connectedIds.has(node.id), node.id).toBe(true);
    const internalEdges = ALL_EDGES.filter(
      (edge) => edge.source.startsWith("linguistics:") && edge.target.startsWith("linguistics:")
    );
    expect(internalEdges.length).toBeGreaterThanOrEqual(70);
  });
});
