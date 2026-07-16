import type { GraphEdge, GraphNode } from "../data/types";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";

export type GraphLayoutMode = "force" | "cluster" | "cognitive";
export type CognitiveLayoutOrientation = "horizontal" | "vertical";

export const COGNITIVE_LANES = [
  { id: "universe-matter", label: "宇宙与物质" },
  { id: "earth-life-body", label: "地球、生命与身体" },
  { id: "patterns-computation", label: "数量、逻辑与机器" },
  { id: "mind-meaning", label: "心智、意义与价值" },
  { id: "people-institutions", label: "人群、历史与制度" },
  { id: "shared-future", label: "共同未来" },
] as const;

type CognitiveLaneId = (typeof COGNITIVE_LANES)[number]["id"];

const DOMAIN_LANES: Record<GraphNode["domain"], CognitiveLaneId> = {
  physics: "universe-matter",
  cosmology: "universe-matter",
  chemistry: "universe-matter",
  "earth-science": "earth-life-body",
  "life-science": "earth-life-body",
  medicine: "earth-life-body",
  mathematics: "patterns-computation",
  "computer-science": "patterns-computation",
  psychology: "mind-meaning",
  philosophy: "mind-meaning",
  history: "people-institutions",
  sociology: "people-institutions",
  economics: "people-institutions",
  "political-science": "people-institutions",
  linguistics: "mind-meaning",
};

const NODE_GAP = 64;
const CELL_PADDING = 220;

function stableJitter(id: string): { x: number; y: number } {
  let hash = 2166136261;
  for (let index = 0; index < id.length; index++) {
    hash ^= id.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return {
    x: ((hash & 15) - 7.5) * 0.8,
    y: (((hash >>> 4) & 15) - 7.5) * 0.8,
  };
}

function sortByConnectivity(nodes: GraphNode[], degree: Map<string, number>): GraphNode[] {
  return [...nodes].sort(
    (left, right) =>
      (degree.get(right.id) ?? 0) - (degree.get(left.id) ?? 0) ||
      left.label.localeCompare(right.label, "zh-CN")
  );
}

function gridDimensions(count: number): { columns: number; rows: number } {
  const columns = Math.max(1, Math.ceil(Math.sqrt(count * 1.45)));
  return { columns, rows: Math.ceil(count / columns) };
}

export function buildCognitiveLayoutPositions(
  nodes: readonly GraphNode[],
  edges: readonly GraphEdge[],
  orientation: CognitiveLayoutOrientation
): Map<string, { x: number; y: number }> {
  const degree = new Map<string, number>();
  for (const edge of edges) {
    degree.set(edge.source, (degree.get(edge.source) ?? 0) + 1);
    degree.set(edge.target, (degree.get(edge.target) ?? 0) + 1);
  }

  return orientation === "vertical"
    ? buildVerticalPositions(nodes, degree)
    : buildHorizontalPositions(nodes, degree);
}

function buildHorizontalPositions(
  nodes: readonly GraphNode[],
  degree: Map<string, number>
): Map<string, { x: number; y: number }> {
  const groups = new Map<string, GraphNode[]>();
  let maxColumns = 1;
  const laneRows = new Map<CognitiveLaneId, number>();

  for (const node of nodes) {
    const level = node.knowledgeLevel ?? 2;
    const lane = DOMAIN_LANES[node.domain];
    const key = `${level}:${lane}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(node);
  }

  for (const [key, group] of groups) {
    const lane = key.slice(key.indexOf(":") + 1) as CognitiveLaneId;
    const { columns, rows } = gridDimensions(group.length);
    maxColumns = Math.max(maxColumns, columns);
    laneRows.set(lane, Math.max(laneRows.get(lane) ?? 1, rows));
  }

  const levelGap = Math.max(760, maxColumns * NODE_GAP + CELL_PADDING);
  const laneCenters = new Map<CognitiveLaneId, number>();
  let yCursor = 0;
  for (const lane of COGNITIVE_LANES) {
    const height = Math.max(360, (laneRows.get(lane.id) ?? 1) * NODE_GAP + CELL_PADDING);
    laneCenters.set(lane.id, yCursor + height / 2);
    yCursor += height;
  }
  const yOffset = yCursor / 2;

  const positions = new Map<string, { x: number; y: number }>();
  for (const [key, group] of groups) {
    const separator = key.indexOf(":");
    const level = Number(key.slice(0, separator)) as KnowledgeLevel;
    const lane = key.slice(separator + 1) as CognitiveLaneId;
    const sorted = sortByConnectivity(group, degree);
    const { columns, rows } = gridDimensions(sorted.length);
    const xCenter = (level - 3) * levelGap;
    const yCenter = laneCenters.get(lane)! - yOffset;

    sorted.forEach((node, index) => {
      const column = index % columns;
      const row = Math.floor(index / columns);
      const jitter = stableJitter(node.id);
      positions.set(node.id, {
        x: xCenter + (column - (columns - 1) / 2) * NODE_GAP + jitter.x,
        y: yCenter + (row - (rows - 1) / 2) * NODE_GAP + jitter.y,
      });
    });
  }
  return positions;
}

function buildVerticalPositions(
  nodes: readonly GraphNode[],
  degree: Map<string, number>
): Map<string, { x: number; y: number }> {
  const groups = new Map<KnowledgeLevel, GraphNode[]>();
  for (const node of nodes) {
    const level = node.knowledgeLevel ?? 2;
    if (!groups.has(level)) groups.set(level, []);
    groups.get(level)!.push(node);
  }

  const levelCenters = new Map<KnowledgeLevel, number>();
  let yCursor = 0;
  for (let level = 1 as KnowledgeLevel; level <= 5; level = (level + 1) as KnowledgeLevel) {
    const group = groups.get(level) ?? [];
    const { rows } = gridDimensions(group.length);
    const height = Math.max(340, rows * NODE_GAP + CELL_PADDING);
    levelCenters.set(level, yCursor + height / 2);
    yCursor += height;
  }
  const yOffset = yCursor / 2;

  const positions = new Map<string, { x: number; y: number }>();
  for (const [level, group] of groups) {
    const sorted = sortByConnectivity(group, degree);
    const { columns, rows } = gridDimensions(sorted.length);
    sorted.forEach((node, index) => {
      const column = index % columns;
      const row = Math.floor(index / columns);
      const jitter = stableJitter(node.id);
      positions.set(node.id, {
        x: (column - (columns - 1) / 2) * NODE_GAP + jitter.x,
        y: levelCenters.get(level)! - yOffset + (row - (rows - 1) / 2) * NODE_GAP + jitter.y,
      });
    });
  }
  return positions;
}
