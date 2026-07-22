import { describe, expect, it } from "vitest";
import { ALL_EDGES, ALL_NODES } from "../../data/graph-data";
import { buildSpatialGraphProjection, rotationForSpatialDomain } from "../spatial-layout";
import { toRenderNodes } from "../constants";

describe("spatial graph layout", () => {
  it("projects every graph node to one deterministic finite coordinate", () => {
    const first = buildSpatialGraphProjection(ALL_NODES, ALL_EDGES, 0);
    const second = buildSpatialGraphProjection(ALL_NODES, ALL_EDGES, 0);

    expect(first.positions).toEqual(second.positions);
    expect(first.positions.size).toBe(ALL_NODES.length);
    expect(first.depthByNode.size).toBe(ALL_NODES.length);
    expect(first.importanceByNode.size).toBe(ALL_NODES.length);
    expect(
      [...first.positions.values()].every(({ x, y }) => Number.isFinite(x) && Number.isFinite(y))
    ).toBe(true);
    expect(
      new Set([...first.positions.values()].map(({ x, y }) => `${x.toFixed(3)},${y.toFixed(3)}`))
        .size
    ).toBe(ALL_NODES.length);
    expect([...first.depthByNode.values()].every((depth) => depth >= -1 && depth <= 1)).toBe(true);
    expect(
      [...first.importanceByNode.values()].every((importance) => importance >= 0 && importance <= 1)
    ).toBe(true);
    expect(Math.max(...first.importanceByNode.values())).toBe(1);

    const degree = new Map<string, number>();
    for (const edge of ALL_EDGES) {
      degree.set(edge.source, (degree.get(edge.source) ?? 0) + 1);
      degree.set(edge.target, (degree.get(edge.target) ?? 0) + 1);
    }
    const equalDegreeNodes = ALL_NODES.filter((node) => (degree.get(node.id) ?? 0) === 1).slice(
      0,
      2
    );
    expect(equalDegreeNodes).toHaveLength(2);
    expect(new Set(equalDegreeNodes.map((node) => first.importanceByNode.get(node.id))).size).toBe(
      1
    );
  });

  it("orders average knowledge levels from bottom to top", () => {
    const projection = buildSpatialGraphProjection(ALL_NODES, ALL_EDGES, 0);
    const averages = [1, 2, 3, 4, 5].map((level) => {
      const positions = ALL_NODES.filter((node) => node.knowledgeLevel === level).map(
        (node) => projection.positions.get(node.id)!.y
      );
      return positions.reduce((sum, value) => sum + value, 0) / positions.length;
    });

    expect(averages).toEqual([...averages].sort((bottom, top) => top - bottom));
  });

  it("rotates a chosen domain to the front without changing graph membership", () => {
    const rotation = rotationForSpatialDomain("computer-science");
    const projection = buildSpatialGraphProjection(ALL_NODES, ALL_EDGES, rotation);
    const rotated = buildSpatialGraphProjection(ALL_NODES, ALL_EDGES, rotation + 24);

    expect(projection.frontDomainId).toBe("computer-science");
    expect(rotated.positions.size).toBe(projection.positions.size);
    expect(rotated.positions.get("computer-science:abstraction")).not.toEqual(
      projection.positions.get("computer-science:abstraction")
    );
    expect(projection.guides.filter((guide) => guide.kind === "ellipse")).toHaveLength(5);
    expect(projection.guides.filter((guide) => guide.kind === "label")).toHaveLength(5);
  });

  it("draws distant nodes first and gives foreground nodes stronger visual weight", () => {
    const backNode = ALL_NODES[0]!;
    const frontNode = ALL_NODES[1]!;
    const positions = new Map([
      [backNode.id, { x: -10, y: 0 }],
      [frontNode.id, { x: 10, y: 0 }],
    ]);
    const depth = new Map([
      [backNode.id, -1],
      [frontNode.id, 1],
    ]);
    const rendered = toRenderNodes(
      [frontNode, backNode],
      positions,
      null,
      null,
      new Set([frontNode.domain, backNode.domain]),
      undefined,
      undefined,
      depth,
      new Map([
        [backNode.id, 0.1],
        [frontNode.id, 0.99],
      ])
    );

    expect(rendered.map((node) => node.id)).toEqual([backNode.id, frontNode.id]);
    expect(rendered[1]!.radius).toBeGreaterThan(rendered[0]!.radius);
    expect(rendered[1]!.alpha).toBeGreaterThan(rendered[0]!.alpha);
    expect(rendered[1]!.importance).toBe(0.99);
  });
});
