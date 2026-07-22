import type { GraphNode, GraphEdge } from "../data/types";
import type { LayoutNode, LayoutEdge } from "@/lib/graph-engine";
import type { RenderNode, RenderEdge } from "@/lib/graph-engine";

export const DOMAIN_COLORS: Record<string, string> = {
  physics: "#6366f1",
  history: "#f59e0b",
  philosophy: "#10b981",
  "life-science": "#ec4899",
  economics: "#e8b84a",
  psychology: "#d4789c",
  "computer-science": "#4f9cf0",
  "political-science": "#c25b5b",
  cosmology: "#3b82f6",
  mathematics: "#8b5cf6",
  "earth-science": "#4f9d76",
  medicine: "#d9544d",
  chemistry: "#e08a3c",
  sociology: "#7a8f5a",
  linguistics: "#3f8f8a",
};

export const NODE_RADIUS: Record<string, number> = {
  "cosmos-tier": 28,
  "physics-tier": 22,
  event: 16,
  figure: 16,
  school: 20,
  thinker: 18,
  concept: 14,
  era: 20,
  species: 14,
  extinction: 18,
  scientist: 16,
  experiment: 14,
  ism: 16,
  question: 14,
  economist: 16,
  theory: 14,
  theorist: 16,
  phenomenon: 14,
  pioneer: 18,
  algorithm: 14,
  institution: 16,
  mathematician: 16,
  theorem: 14,
  process: 16,
  disease: 16,
  technology: 14,
  substance: 15,
  reaction: 14,
  cosmic: 16,
};

export const EDGE_COLOR = "rgba(255, 255, 255, 0.08)";
export const BG_COLOR = "#08080f";
export const LABEL_FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
export const LABEL_COLOR = "rgba(255, 255, 255, 0.7)";
export const HIGHLIGHT_COLOR = "#818cf8";

export const ALL_DOMAINS = [
  "physics",
  "history",
  "philosophy",
  "life-science",
  "economics",
  "psychology",
  "computer-science",
  "political-science",
  "cosmology",
  "mathematics",
  "earth-science",
  "medicine",
  "chemistry",
  "sociology",
  "linguistics",
] as const;

export const NODE_TYPE_LABELS: Record<string, string> = {
  "cosmos-tier": "宇宙层级",
  "physics-tier": "物理层级",
  event: "历史事件",
  figure: "历史人物",
  school: "哲学流派",
  thinker: "哲学家",
  concept: "哲学概念",
  experiment: "实验",
  question: "哲学问题",
  ism: "主义",
  era: "时代",
  species: "物种",
  scientist: "科学家",
  extinction: "大灭绝",
  economist: "经济学家",
  theory: "经济理论",
  theorist: "心理学家",
  phenomenon: "心理现象",
  pioneer: "计算机先驱",
  algorithm: "算法",
  institution: "制度与政体",
  mathematician: "数学家",
  theorem: "数学定理",
  process: "地质过程",
  disease: "疾病",
  technology: "医学技术",
  substance: "物质与材料",
  reaction: "化学反应",
  cosmic: "宇宙学",
};

export const CLUSTER_RADIUS = 350;
export const CLUSTER_CENTERS: Record<string, { x: number; y: number }> = {};
ALL_DOMAINS.forEach((domain, i) => {
  const angle = (2 * Math.PI * i) / ALL_DOMAINS.length - Math.PI / 2;
  CLUSTER_CENTERS[domain] = {
    x: Math.cos(angle) * CLUSTER_RADIUS,
    y: Math.sin(angle) * CLUSTER_RADIUS,
  };
});

export function buildLayoutNodes(nodes: GraphNode[]): LayoutNode[] {
  return nodes.map((node) => {
    const domainIndex = ALL_DOMAINS.indexOf(node.domain as (typeof ALL_DOMAINS)[number]);
    const domainAngle = (2 * Math.PI * domainIndex) / ALL_DOMAINS.length;
    const jitterR = 80 + Math.random() * 150;
    const jitterA = domainAngle + (Math.random() - 0.5) * 1.2;
    return {
      id: node.id,
      x: Math.cos(jitterA) * jitterR,
      y: Math.sin(jitterA) * jitterR,
      vx: 0,
      vy: 0,
      domain: node.domain,
    };
  });
}

export function buildLayoutEdges(edges: GraphEdge[]): LayoutEdge[] {
  return edges.map((e) => ({
    source: e.source,
    target: e.target,
    strength: e.type === "domain-link" ? 0.3 : 1,
  }));
}

export function toRenderNodes(
  nodes: GraphNode[],
  positions: Map<string, { x: number; y: number }>,
  hoveredId: string | null,
  selectedId: string | null,
  activeDomains: Set<string>,
  spreadOffsets?: Map<string, { x: number; y: number }>,
  searchMatchedIds?: Set<string>,
  nodeDepth?: ReadonlyMap<string, number>,
  nodeImportance?: ReadonlyMap<string, number>
): RenderNode[] {
  const rendered = nodes
    .filter((n) => activeDomains.has(n.domain))
    .map((node) => {
      const pos = positions.get(node.id);
      const spread = spreadOffsets?.get(node.id);
      const depth = nodeDepth?.get(node.id);
      const depthScale = depth === undefined ? 1 : 0.7 + (depth + 1) * 0.18;
      const depthOpacity = depth === undefined ? 1 : 0.38 + (depth + 1) * 0.29;
      const prominent = node.id === hoveredId || node.id === selectedId;
      return {
        id: node.id,
        x: (pos?.x ?? 0) + (spread?.x ?? 0),
        y: (pos?.y ?? 0) + (spread?.y ?? 0),
        label: node.label,
        domain: node.domain,
        type: node.type,
        radius: (NODE_RADIUS[node.type] ?? 16) * depthScale,
        color: DOMAIN_COLORS[node.domain] ?? "#9ca3af",
        hovered: node.id === hoveredId,
        selected: node.id === selectedId,
        searchMatched: searchMatchedIds?.has(node.id) ?? false,
        alpha: prominent ? 1 : depthOpacity,
        importance: nodeImportance?.get(node.id),
      };
    });
  return nodeDepth
    ? rendered.sort((left, right) => (nodeDepth.get(left.id) ?? 0) - (nodeDepth.get(right.id) ?? 0))
    : rendered;
}

export function toRenderEdges(
  edges: GraphEdge[],
  positions: Map<string, { x: number; y: number }>,
  activeDomains: Set<string>,
  nodeDomainMap: Map<string, string>,
  nodeDepth?: ReadonlyMap<string, number>,
  nodeImportance?: ReadonlyMap<string, number>
): RenderEdge[] {
  return edges
    .filter((e) => {
      const sd = nodeDomainMap.get(e.source);
      const td = nodeDomainMap.get(e.target);
      return sd !== undefined && td !== undefined && activeDomains.has(sd) && activeDomains.has(td);
    })
    .map((edge) => {
      const s = positions.get(edge.source);
      const t = positions.get(edge.target);
      const sd = nodeDomainMap.get(edge.source);
      const td = nodeDomainMap.get(edge.target);
      const crossDomain = sd !== undefined && td !== undefined && sd !== td;
      const averageDepth =
        nodeDepth && nodeDepth.has(edge.source) && nodeDepth.has(edge.target)
          ? ((nodeDepth.get(edge.source) ?? 0) + (nodeDepth.get(edge.target) ?? 0)) / 2
          : undefined;
      // Cross-domain edges are the interdisciplinary "bridges" that make this
      // graph more than a pile of silos — render them brighter so they pop.
      const color = crossDomain
        ? "rgba(216, 180, 110, 0.42)"
        : edge.type === "cross-reference"
          ? "rgba(200, 164, 90, 0.2)"
          : edge.type === "domain-link"
            ? "rgba(255, 255, 255, 0.12)"
            : "rgba(255, 255, 255, 0.06)";
      return {
        x1: s?.x ?? 0,
        y1: s?.y ?? 0,
        x2: t?.x ?? 0,
        y2: t?.y ?? 0,
        color,
        width:
          crossDomain || edge.type === "cross-reference" || edge.type === "domain-link" ? 1.5 : 0.8,
        alpha: averageDepth === undefined ? 0.6 : 0.28 + (averageDepth + 1) * 0.22,
        sourceId: edge.source,
        targetId: edge.target,
        label: edge.label,
        crossDomain,
        importance: nodeImportance
          ? Math.max(
              nodeImportance.get(edge.source) ?? 0,
              nodeImportance.get(edge.target) ?? 0,
              crossDomain ? 0.94 : 0
            )
          : undefined,
      };
    });
}

export function computeNodeCounts(
  nodes: GraphNode[],
  activeDomains: Set<string>
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const node of nodes) {
    if (!activeDomains.has(node.domain)) continue;
    counts[node.domain] = (counts[node.domain] ?? 0) + 1;
    counts[node.type] = (counts[node.type] ?? 0) + 1;
  }
  return counts;
}

export function computeEdgeCounts(edges: GraphEdge[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const edge of edges) {
    counts[edge.type] = (counts[edge.type] ?? 0) + 1;
  }
  return counts;
}
