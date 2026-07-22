import { describe, expect, it } from "vitest";
import type { GraphEdge, GraphNode } from "../../data/types";
import { buildSpatialDomainSummary } from "../spatial-aggregation";

const node = (
  id: string,
  domain: GraphNode["domain"],
  knowledgeLevel: GraphNode["knowledgeLevel"],
  url?: string
): GraphNode => ({
  id,
  label: id,
  domain,
  type: "concept",
  slug: id.split(":")[1]!,
  tags: [],
  description: id,
  knowledgeLevel,
  url,
});

const nodes: GraphNode[] = [
  node("medicine:foundation", "medicine", 1, "/medicine/concepts/foundation"),
  node("medicine:screening", "medicine", 2, "/medicine/concepts/screening"),
  node("medicine:diagnosis", "medicine", 2),
  node("medicine:trial", "medicine", 4, "/medicine/concepts/trial"),
  node("mathematics:bayes", "mathematics", 2, "/mathematics/concepts/bayes"),
];

const edges: GraphEdge[] = [
  {
    source: "medicine:foundation",
    target: "medicine:screening",
    type: "hierarchy",
  },
  {
    source: "medicine:screening",
    target: "mathematics:bayes",
    type: "domain-link",
  },
  {
    source: "medicine:trial",
    target: "mathematics:bayes",
    type: "domain-link",
  },
];

describe("spatial domain aggregation", () => {
  it("conserves domain nodes across five stages and counts article access", () => {
    const summary = buildSpatialDomainSummary(
      nodes,
      edges,
      "medicine",
      new Map(nodes.map((item, index) => [item.id, index / nodes.length]))
    );

    expect(summary.nodeCount).toBe(4);
    expect(summary.articleCount).toBe(3);
    expect(summary.stages).toHaveLength(5);
    expect(summary.stages.reduce((sum, stage) => sum + stage.nodeCount, 0)).toBe(4);
    expect(summary.stages.find((stage) => stage.level === 2)).toMatchObject({
      nodeCount: 2,
      articleCount: 1,
      crossDomainEdgeCount: 1,
    });
  });

  it("counts visible cross-domain relations and prioritizes readable anchors", () => {
    const summary = buildSpatialDomainSummary(
      nodes,
      edges,
      "medicine",
      new Map([
        ["medicine:diagnosis", 1],
        ["medicine:screening", 0.2],
      ])
    );

    expect(summary.crossDomainEdgeCount).toBe(2);
    expect(summary.stages.find((stage) => stage.level === 2)?.anchorNodes[0]?.id).toBe(
      "medicine:screening"
    );
    expect(summary.anchorNodes.every((anchor, index) => index >= 3 || Boolean(anchor.url))).toBe(
      true
    );
  });
});
