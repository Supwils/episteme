import type { GraphNode, GraphEdge, GraphNodeType } from "../../data/types";

type Domain = GraphNode["domain"];

export const PRODUCT_EASE = [0.22, 0.61, 0.36, 1] as const;

export const DOMAIN_META: Record<
  Domain,
  { label: string; color: string; bg: string; border: string; dot: string }
> = {
  physics: {
    label: "宇宙物理",
    color: "text-indigo-400",
    bg: "bg-indigo-500/15",
    border: "border-indigo-500/30",
    dot: "bg-indigo-400",
  },
  history: {
    label: "人类历史",
    color: "text-red-400",
    bg: "bg-red-500/15",
    border: "border-red-400/30",
    dot: "bg-red-400",
  },
  philosophy: {
    label: "哲学思想",
    color: "text-amber-400",
    bg: "bg-amber-500/15",
    border: "border-amber-500/30",
    dot: "bg-amber-400",
  },
  "life-science": {
    label: "生命科学",
    color: "text-emerald-400",
    bg: "bg-emerald-500/15",
    border: "border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  economics: {
    label: "经济学",
    color: "text-yellow-400",
    bg: "bg-yellow-500/15",
    border: "border-yellow-500/30",
    dot: "bg-yellow-400",
  },
  psychology: {
    label: "心理学",
    color: "text-pink-400",
    bg: "bg-pink-500/15",
    border: "border-pink-500/30",
    dot: "bg-pink-400",
  },
};

export const NODE_TYPE_LABEL: Record<GraphNodeType, string> = {
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
};

export const DOMAIN_ACCENT_GRADIENT: Record<Domain, string> = {
  physics: "linear-gradient(90deg, #6366f1 0%, #818cf8 100%)",
  history: "linear-gradient(90deg, #ef4444 0%, #f87171 100%)",
  philosophy: "linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)",
  "life-science": "linear-gradient(90deg, #10b981 0%, #34d399 100%)",
  economics: "linear-gradient(90deg, #e8b84a 0%, #f0d060 100%)",
  psychology: "linear-gradient(90deg, #d4789c 0%, #e8a0bf 100%)",
};

export function resolveNodeUrl(node: GraphNode): string | null {
  switch (node.type) {
    case "thinker":
      return `/philosophy/thinkers/${node.slug}`;
    case "school":
      return `/philosophy/schools/${node.slug}`;
    case "concept":
      return `/philosophy/concepts/${node.slug}`;
    case "event":
      return "/human-history/timeline";
    case "figure":
      return "/human-history/figures";
    case "species":
      return `/life-science/species`;
    case "extinction":
      return "/life-science/extinctions";
    case "cosmos-tier":
      return `/universe-physics/universe/${node.slug}`;
    case "physics-tier":
      return `/universe-physics/physics/${node.slug}`;
    case "scientist":
      return `/life-science/scientists/${node.slug}`;
    case "economist":
      return `/economics/economists/${node.slug}`;
    case "theory":
      return `/economics/theories/${node.slug}`;
    case "theorist":
      return `/psychology/theorists/${node.slug}`;
    case "phenomenon":
      return `/psychology/phenomena/${node.slug}`;
    case "experiment":
      if (node.domain === "psychology") return `/psychology/experiments/${node.slug}`;
      return null;
    case "question":
    case "ism":
    case "era":
      return null;
  }
}

export function groupByDomain(nodes: GraphNode[]): Map<Domain, GraphNode[]> {
  const groups = new Map<Domain, GraphNode[]>();
  for (const node of nodes) {
    const list = groups.get(node.domain) ?? [];
    list.push(node);
    groups.set(node.domain, list);
  }
  return groups;
}

export function buildEdgeMap(edges: GraphEdge[]): Map<string, GraphEdge> {
  const map = new Map<string, GraphEdge>();
  for (const edge of edges) {
    map.set(`${edge.source}->${edge.target}`, edge);
  }
  return map;
}
