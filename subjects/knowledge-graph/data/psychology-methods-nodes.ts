import type { GraphEdge, GraphNode } from "./types";

const methodNode = (
  slug: string,
  label: string,
  section: "knowledge-base" | "methods" | "frontier",
  description: string,
  tags: string[]
): GraphNode => ({
  id: `psychology:${slug}`,
  label,
  domain: "psychology",
  type: "concept",
  slug,
  section,
  url: `/psychology/${section}/${slug}`,
  description,
  tags,
});

const methodEdge = (source: string, target: string, label: string): GraphEdge => ({
  source: `psychology:${source}`,
  target: `psychology:${target}`,
  type: "cross-reference",
  label,
});

export const PSYCHOLOGY_METHOD_NODES: GraphNode[] = [
  methodNode(
    "psychometrics-reliability-validity",
    "心理测量：信度与效度",
    "knowledge-base",
    "把不可直接观测的心理构念转化为可检验分数，并审查测量的一致性与解释边界。",
    ["心理测量", "信度", "效度"]
  ),
  methodNode(
    "measurement-invariance-fair-comparison",
    "测量等值与公平比较",
    "methods",
    "检验量表的结构、刻度与零点能否跨群体或时间保持可比。",
    ["测量等值", "跨文化比较", "测验公平"]
  ),
  methodNode(
    "longitudinal-multilevel-models",
    "纵向研究与多层模型",
    "methods",
    "区分个体间差异与个体内变化，并建模时间、个人和情境的嵌套结构。",
    ["纵向研究", "多层模型", "发展轨迹"]
  ),
  methodNode(
    "bayesian-modeling-psychology",
    "贝叶斯建模与心理科学",
    "methods",
    "用生成模型、先验和后验预测检查表达心理证据及其不确定性。",
    ["贝叶斯推断", "生成模型", "不确定性"]
  ),
  methodNode(
    "effect-size-and-power",
    "效应量与统计功效",
    "knowledge-base",
    "把研究判断从是否显著推进到效应多大、估计多准以及设计能否发现重要差异。",
    ["效应量", "统计功效", "精度"]
  ),
  methodNode(
    "meta-analysis-evidence-synthesis",
    "元分析与证据综合",
    "methods",
    "系统检索、评价并综合多项研究，同时解释异质性、偏倚与证据确定性。",
    ["元分析", "系统综述", "发表偏差"]
  ),
  methodNode(
    "preregistration-registered-reports",
    "预注册、注册报告与开放科学",
    "methods",
    "区分事前检验与事后探索，让研究承诺、偏离、材料、数据和代码可审计。",
    ["预注册", "注册报告", "开放科学"]
  ),
  methodNode(
    "replication-crisis-open-science",
    "可重复性危机与开放科学",
    "frontier",
    "从选择性报告、低功效与发表激励理解心理学的证据校准和制度改革。",
    ["可重复性", "发表偏差", "科研激励"]
  ),
  methodNode(
    "digital-phenotyping-computational-ethics",
    "数字表型、计算方法与研究伦理",
    "methods",
    "审查传感器行为痕迹如何连接心理构念，以及预测、公平、隐私和干预责任。",
    ["数字表型", "机器学习", "数据伦理"]
  ),
];

export const PSYCHOLOGY_METHOD_EDGES: GraphEdge[] = [
  methodEdge(
    "psychometrics-reliability-validity",
    "measurement-invariance-fair-comparison",
    "建立跨群体可比性"
  ),
  methodEdge(
    "measurement-invariance-fair-comparison",
    "longitudinal-multilevel-models",
    "保证变化可解释"
  ),
  methodEdge("longitudinal-multilevel-models", "bayesian-modeling-psychology", "层级不确定性"),
  methodEdge("bayesian-modeling-psychology", "effect-size-and-power", "校准效应证据"),
  methodEdge("effect-size-and-power", "meta-analysis-evidence-synthesis", "统一效应尺度"),
  methodEdge(
    "meta-analysis-evidence-synthesis",
    "preregistration-registered-reports",
    "减少选择性证据"
  ),
  methodEdge(
    "preregistration-registered-reports",
    "replication-crisis-open-science",
    "回应证据危机"
  ),
  methodEdge(
    "replication-crisis-open-science",
    "digital-phenotyping-computational-ethics",
    "扩展透明与治理"
  ),
  {
    source: "psychology:bayesian-modeling-psychology",
    target: "mathematics:bayesian-inference",
    type: "domain-link",
    label: "概率更新基础",
  },
  {
    source: "psychology:effect-size-and-power",
    target: "mathematics:statistics",
    type: "domain-link",
    label: "抽样与估计",
  },
  {
    source: "psychology:longitudinal-multilevel-models",
    target: "sociology:statistical-modeling",
    type: "domain-link",
    label: "共享层级模型",
  },
  {
    source: "psychology:preregistration-registered-reports",
    target: "medicine:clinical-trials",
    type: "domain-link",
    label: "预设方案与终点",
  },
  {
    source: "psychology:digital-phenotyping-computational-ethics",
    target: "computer-science:machine-learning-overview",
    type: "domain-link",
    label: "行为预测模型",
  },
];
