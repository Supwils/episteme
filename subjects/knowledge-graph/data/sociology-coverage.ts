import type { GraphEdge, GraphNode } from "./types";

export const SOCIOLOGY_COVERAGE_NODES: GraphNode[] = [
  {
    id: "sociology:georg-simmel",
    label: "格奥尔格·齐美尔",
    domain: "sociology",
    type: "thinker",
    slug: "georg-simmel",
    section: "thinkers",
    url: "/sociology/thinkers/georg-simmel",
    description: "以形式社会学、大都市、陌生人和货币分析现代互动中的距离、交换与群体结构。",
    tags: ["形式社会学", "大都市", "陌生人"],
  },
  {
    id: "sociology:media-and-public-sphere",
    label: "媒介与公共领域",
    domain: "sociology",
    type: "institution",
    slug: "media-and-public-sphere",
    section: "institutions",
    url: "/sociology/institutions/media-and-public-sphere",
    description: "研究新闻、舆论、平台与公共讨论空间如何决定哪些声音获得可见性。",
    tags: ["媒介", "公共领域", "舆论", "平台"],
  },
];

export const SOCIOLOGY_COVERAGE_EDGES: GraphEdge[] = [
  {
    source: "sociology:georg-simmel",
    target: "sociology:urbanization",
    type: "cross-reference",
    label: "大都市精神生活",
  },
  {
    source: "sociology:georg-simmel",
    target: "sociology:social-network-analysis",
    type: "cross-reference",
    label: "群体规模与关系形式",
  },
  {
    source: "sociology:media-and-public-sphere",
    target: "sociology:digital-platform-society",
    type: "cross-reference",
    label: "公共讨论的平台化",
  },
  {
    source: "sociology:media-and-public-sphere",
    target: "sociology:content-analysis",
    type: "cross-reference",
    label: "分析媒介话语",
  },
];
