import type { GraphEdge, GraphNode } from "./types";

export const DOMAIN_SPINE_COVERAGE_NODES: GraphNode[] = [
  {
    id: "economics:economic-vitals-growth-prices-jobs",
    label: "经济的三个体征：增长、物价与工作",
    domain: "economics",
    type: "concept",
    slug: "economic-vitals-growth-prices-jobs",
    section: "concepts",
    url: "/economics/concepts/economic-vitals-growth-prices-jobs",
    description: "从增长、物价与就业三个生活问题学习读取经济状态，并识别指标的边界。",
    tags: ["经济指标", "GDP", "通胀", "就业"],
  },
  {
    id: "political-science:taxes-and-public-budget",
    label: "税收与公共预算",
    domain: "political-science",
    type: "concept",
    slug: "taxes-and-public-budget",
    section: "concepts",
    url: "/political-science/concepts/taxes-and-public-budget",
    description: "从学校、道路等共同支出理解税收来源、预算选择、执行和公共问责。",
    tags: ["税收", "公共预算", "公共品", "财政透明"],
  },
  {
    id: "sociology:algorithmic-management-worker-power",
    label: "算法管理、工人权力与可审计工作",
    domain: "sociology",
    type: "concept",
    slug: "algorithmic-management-worker-power",
    section: "frontier",
    url: "/sociology/frontier/algorithmic-management-worker-power",
    description:
      "研究任务分配、监控、评分与奖惩如何被写入算法，以及劳动者如何获得解释、申诉和集体协商能力。",
    tags: ["算法管理", "平台劳动", "工作场所监控", "工人权力"],
  },
];

export const DOMAIN_SPINE_COVERAGE_EDGES: GraphEdge[] = [
  {
    source: "economics:economic-vitals-growth-prices-jobs",
    target: "economics:modern-money-fiscal-deficits",
    type: "cross-reference",
    label: "从经济体征进入政策约束",
  },
  {
    source: "economics:economic-vitals-growth-prices-jobs",
    target: "psychology:inflation-psychology",
    type: "domain-link",
    label: "区分价格指标与通胀感受",
  },
  {
    source: "political-science:taxes-and-public-budget",
    target: "political-science:fiscal-state",
    type: "cross-reference",
    label: "从共同筹资进入国家财政能力",
  },
  {
    source: "political-science:taxes-and-public-budget",
    target: "economics:economic-vitals-growth-prices-jobs",
    type: "domain-link",
    label: "经济状态约束预算选择",
  },
  {
    source: "sociology:algorithmic-management-worker-power",
    target: "sociology:work-and-labor-organizations",
    type: "cross-reference",
    label: "延伸劳动过程与组织控制",
  },
  {
    source: "sociology:algorithmic-management-worker-power",
    target: "sociology:digital-platform-society",
    type: "cross-reference",
    label: "平台基础设施组织劳动",
  },
  {
    source: "sociology:algorithmic-management-worker-power",
    target: "sociology:experiments-and-quasi-experiments",
    type: "cross-reference",
    label: "评估规则变化的因果影响",
  },
  {
    source: "sociology:algorithmic-management-worker-power",
    target: "computer-science:ai-interpretability",
    type: "domain-link",
    label: "连接模型解释与劳动问责",
  },
];
