import type { RenderGuide } from "@/lib/graph-engine";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";
import type { GraphEdge, GraphNode } from "../data/types";
import { ALL_DOMAINS, DOMAIN_COLORS } from "./constants";

const BASE_RING_RADIUS = 1_850;
const RING_RADIUS_STEP = 125;
const LEVEL_GAP = 620;
const DEPTH_TILT = 0.14;
const TANGENT_GAP = 38;
const RADIAL_GAP = 36;
const MAX_DEPTH_EXTENT = 2_500;

export type SpatialGraphProjection = {
  positions: Map<string, { x: number; y: number }>;
  depthByNode: Map<string, number>;
  importanceByNode: Map<string, number>;
  guides: RenderGuide[];
  frontDomainId: GraphNode["domain"];
};

export function normalizeSpatialRotation(rotation: number): number {
  return ((((rotation + 180) % 360) + 360) % 360) - 180;
}

function clampDepth(value: number): number {
  return Math.max(-1, Math.min(1, value / MAX_DEPTH_EXTENT));
}

function stableJitter(id: string): number {
  let hash = 2166136261;
  for (let index = 0; index < id.length; index++) {
    hash ^= id.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return ((hash >>> 8) % 1_001) / 1_000 - 0.5;
}

function ringRadius(level: KnowledgeLevel): number {
  return BASE_RING_RADIUS - (level - 1) * RING_RADIUS_STEP;
}

function levelY(level: KnowledgeLevel): number {
  return (3 - level) * LEVEL_GAP;
}

function domainAngle(domainIndex: number, rotationDegrees: number): number {
  return (domainIndex / ALL_DOMAINS.length) * Math.PI * 2 + (rotationDegrees * Math.PI) / 180;
}

function gridColumns(count: number, radius: number): number {
  const wedgeWidth = (radius * Math.PI * 2 * 0.82) / ALL_DOMAINS.length;
  const maximum = Math.max(3, Math.floor(wedgeWidth / TANGENT_GAP));
  return Math.min(maximum, Math.max(1, Math.ceil(Math.sqrt(count * 1.35))));
}

function degreeMap(edges: readonly GraphEdge[]): Map<string, number> {
  const degree = new Map<string, number>();
  for (const edge of edges) {
    degree.set(edge.source, (degree.get(edge.source) ?? 0) + 1);
    degree.set(edge.target, (degree.get(edge.target) ?? 0) + 1);
  }
  return degree;
}

function buildImportanceMap(
  nodes: readonly GraphNode[],
  degree: ReadonlyMap<string, number>
): Map<string, number> {
  const rankedDegrees = nodes
    .map((node) => degree.get(node.id) ?? 0)
    .sort((left, right) => left - right);
  const denominator = Math.max(rankedDegrees.length - 1, 1);
  const percentileByDegree = new Map<number, number>();
  rankedDegrees.forEach((nodeDegree, index) => {
    percentileByDegree.set(nodeDegree, index / denominator);
  });
  return new Map(
    nodes.map((node) => [node.id, percentileByDegree.get(degree.get(node.id) ?? 0) ?? 0])
  );
}

function buildGuides(rotationDegrees: number, frontDomainIndex: number): RenderGuide[] {
  const guides: RenderGuide[] = [
    {
      kind: "line",
      x1: 0,
      y1: levelY(5) - 280,
      x2: 0,
      y2: levelY(1) + 360,
      color: "rgba(255,255,255,0.16)",
      alpha: 0.7,
      width: 1,
      dash: [8, 12],
    },
  ];

  for (let level = 1 as KnowledgeLevel; level <= 5; level = (level + 1) as KnowledgeLevel) {
    const radius = ringRadius(level);
    guides.push(
      {
        kind: "ellipse",
        x: 0,
        y: levelY(level),
        radiusX: radius,
        radiusY: radius * DEPTH_TILT,
        color: "rgba(255,255,255,0.18)",
        alpha: level === 5 ? 0.82 : 0.58,
        width: level === 5 ? 2 : 1,
      },
      {
        kind: "label",
        x: -radius - 80,
        y: levelY(level),
        text: `L${level}`,
        color: "rgba(255,255,255,0.58)",
        alpha: 0.9,
        align: "right",
      }
    );
  }

  const angle = domainAngle(frontDomainIndex, rotationDegrees);
  const color = DOMAIN_COLORS[ALL_DOMAINS[frontDomainIndex]!] ?? "#818cf8";
  const anchors = [1, 2, 3, 4, 5].map((rawLevel) => {
    const level = rawLevel as KnowledgeLevel;
    const radius = ringRadius(level);
    const depth = Math.sin(angle) * radius;
    return {
      x: Math.cos(angle) * radius,
      y: levelY(level) + depth * DEPTH_TILT,
    };
  });
  for (let index = 0; index < anchors.length - 1; index++) {
    guides.push({
      kind: "line",
      x1: anchors[index]!.x,
      y1: anchors[index]!.y,
      x2: anchors[index + 1]!.x,
      y2: anchors[index + 1]!.y,
      color,
      alpha: 0.82,
      width: 3,
    });
  }

  return guides;
}

export function rotationForSpatialDomain(domainId: GraphNode["domain"]): number {
  const domainIndex = Math.max(0, ALL_DOMAINS.indexOf(domainId));
  return 90 - (domainIndex / ALL_DOMAINS.length) * 360;
}

export function buildSpatialGraphProjection(
  nodes: readonly GraphNode[],
  edges: readonly GraphEdge[],
  rotationDegrees: number
): SpatialGraphProjection {
  const degree = degreeMap(edges);
  const importanceByNode = buildImportanceMap(nodes, degree);
  const groups = new Map<string, GraphNode[]>();

  for (const node of nodes) {
    const level = node.knowledgeLevel ?? 2;
    const key = `${node.domain}:${level}`;
    const group = groups.get(key) ?? [];
    group.push(node);
    groups.set(key, group);
  }

  const positions = new Map<string, { x: number; y: number }>();
  const depthByNode = new Map<string, number>();
  let frontDomainIndex = 0;
  let frontDepth = -Infinity;

  ALL_DOMAINS.forEach((domainId, domainIndex) => {
    const angle = domainAngle(domainIndex, rotationDegrees);
    const anchorDepth = Math.sin(angle);
    if (anchorDepth > frontDepth) {
      frontDepth = anchorDepth;
      frontDomainIndex = domainIndex;
    }

    for (let level = 1 as KnowledgeLevel; level <= 5; level = (level + 1) as KnowledgeLevel) {
      const group = [...(groups.get(`${domainId}:${level}`) ?? [])].sort(
        (left, right) =>
          (degree.get(right.id) ?? 0) - (degree.get(left.id) ?? 0) ||
          left.label.localeCompare(right.label, "zh-CN")
      );
      const radius = ringRadius(level);
      const columns = gridColumns(group.length, radius);
      const rows = Math.max(1, Math.ceil(group.length / columns));

      group.forEach((node, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);
        const tangent = (column - (columns - 1) / 2) * TANGENT_GAP;
        const radial = (row - (rows - 1) / 2) * RADIAL_GAP;
        const localRadius = radius + radial;
        const x = Math.cos(angle) * localRadius - Math.sin(angle) * tangent;
        const depth = Math.sin(angle) * localRadius + Math.cos(angle) * tangent;
        positions.set(node.id, {
          x,
          y: levelY(level) + depth * DEPTH_TILT + stableJitter(node.id) * 10,
        });
        depthByNode.set(node.id, clampDepth(depth));
      });
    }
  });

  return {
    positions,
    depthByNode,
    importanceByNode,
    guides: buildGuides(rotationDegrees, frontDomainIndex),
    frontDomainId: ALL_DOMAINS[frontDomainIndex]!,
  };
}
