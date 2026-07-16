import type { GraphEdge, GraphNode } from "./types";

const lifeScienceNode = (
  slug: string,
  label: string,
  section: string,
  url: string,
  description: string,
  tags: string[]
): GraphNode => ({
  id: `lifescience:${slug}`,
  label,
  domain: "life-science",
  type: "concept",
  slug,
  section,
  url,
  description,
  tags,
});

const lifeScienceEdge = (source: string, target: string, label: string): GraphEdge => ({
  source: `lifescience:${source}`,
  target: `lifescience:${target}`,
  type: "cross-reference",
  label,
});

export const LIFESCIENCE_COVERAGE_NODES: GraphNode[] = [
  lifeScienceNode(
    "natural-selection",
    "自然选择",
    "knowledge-base",
    "/life-science/knowledge-base/进化机制--自然选择",
    "可遗传变异造成差异繁殖成功，使种群性状在世代中改变。",
    ["自然选择", "适应", "种群演化"]
  ),
  lifeScienceNode(
    "evo-devo",
    "演化发育生物学",
    "knowledge-base",
    "/life-science/knowledge-base/进化机制--evo-devo",
    "比较发育基因网络，解释身体结构如何在演化中产生与受限。",
    ["evo-devo", "发育基因", "同源结构"]
  ),
  lifeScienceNode(
    "phylogenetic-inference",
    "系统发育推断",
    "knowledge-base",
    "/life-science/knowledge-base/进化机制--tree-of-life-phylogenetics",
    "用形态或分子序列与显式演化模型估计共同祖先和分支关系。",
    ["系统发育", "生命之树", "演化模型"]
  ),
  lifeScienceNode(
    "single-cell-human-cell-atlas",
    "单细胞与人类细胞图谱",
    "frontier",
    "/life-science/frontier/single-cell-human-cell-atlas",
    "整合单细胞测量、空间位置与谱系信息，重建人体细胞状态及其变化。",
    ["单细胞组学", "空间转录组", "Human Cell Atlas"]
  ),
];

export const LIFESCIENCE_COVERAGE_EDGES: GraphEdge[] = [
  lifeScienceEdge("natural-selection", "evo-devo", "从性状适应追问发育机制"),
  lifeScienceEdge("evo-devo", "phylogenetic-inference", "在共同祖先框架中比较发育变化"),
  lifeScienceEdge(
    "phylogenetic-inference",
    "single-cell-human-cell-atlas",
    "连接谱系关系与细胞状态"
  ),
  {
    source: "lifescience:wallace",
    target: "lifescience:natural-selection",
    type: "cross-reference",
    label: "独立提出自然选择",
  },
  {
    source: "lifescience:phylogenetic-inference",
    target: "mathematics:bayesian-inference",
    type: "domain-link",
    label: "用概率模型比较演化树",
  },
  {
    source: "lifescience:single-cell-human-cell-atlas",
    target: "medicine:medical-genetics-and-genomics",
    type: "domain-link",
    label: "连接细胞状态与疾病变异",
  },
];
