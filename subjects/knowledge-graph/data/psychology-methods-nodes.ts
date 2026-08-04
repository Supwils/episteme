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
    "causal-inference-experiments-observational-studies",
    "心理学因果推断：实验与观察研究",
    "methods",
    "从随机实验、纵向观察、自然实验和因果图中识别反事实问题，并说明每种设计仍依赖的假设。",
    ["因果推断", "随机实验", "观察研究", "因果图"]
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
  methodNode(
    "psychophysics-and-signal-detection",
    "心理物理学与信号检测论",
    "methods",
    "把“看得准”与“倾向于说是”分开：阈限、心理测量函数、敏感性与判断标准。",
    ["心理物理学", "信号检测论", "ROC"]
  ),
  methodNode(
    "experience-sampling-and-ema",
    "经验取样与生态瞬时评估",
    "methods",
    "在日常生活中反复截取“此刻”，把个体内动态与个体间差异分开。",
    ["经验取样", "EMA", "密集纵向数据"]
  ),
  methodNode(
    "neuroimaging-methods-and-their-limits",
    "神经影像方法及其限度",
    "methods",
    "BOLD 测的是什么、反向推理为何无效、以及分析自由度造成的结论分歧。",
    ["功能磁共振", "反向推理", "分析自由度"]
  ),
  methodNode(
    "computational-modeling-of-cognition",
    "认知的计算建模",
    "methods",
    "把理论写成能生成行为的方程，并用参数恢复与模型恢复检验它是否可被检验。",
    ["漂移扩散模型", "参数恢复", "模型比较"]
  ),
  methodNode(
    "weird-samples-and-generalizability",
    "WEIRD 样本与可推广性",
    "methods",
    "从有限样本推广到普遍结论的正当性，通常从未被论证过。",
    ["WEIRD 样本", "跨文化效度", "随机效应"]
  ),
  methodNode(
    "psychopathology-network-theory",
    "精神病理的网络理论",
    "frontier",
    "把障碍视为症状之间彼此激活的自我维持系统，而非潜在疾病实体的表现。",
    ["症状网络", "共病", "临界慢化"]
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
  methodEdge(
    "longitudinal-multilevel-models",
    "causal-inference-experiments-observational-studies",
    "从变化轨迹走向因果识别"
  ),
  methodEdge(
    "causal-inference-experiments-observational-studies",
    "meta-analysis-evidence-synthesis",
    "按识别假设综合证据"
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
  {
    source: "psychology:causal-inference-experiments-observational-studies",
    target: "sociology:platform-governance",
    type: "domain-link",
    label: "用自然实验与审计检验平台干预",
  },
  methodEdge(
    "psychometrics-reliability-validity",
    "psychophysics-and-signal-detection",
    "有外部标尺的测量与无标尺的构念测量"
  ),
  methodEdge(
    "psychophysics-and-signal-detection",
    "effect-size-and-power",
    "敏感性指标与功效的关系"
  ),
  methodEdge(
    "longitudinal-multilevel-models",
    "experience-sampling-and-ema",
    "嵌套结构决定估计的是哪一种效应"
  ),
  methodEdge(
    "experience-sampling-and-ema",
    "digital-phenotyping-computational-ethics",
    "被动感知把负担降到零、把伦理推到前台"
  ),
  methodEdge(
    "neuroimaging-methods-and-their-limits",
    "effect-size-and-power",
    "小效应下的低功效与效应量夸大"
  ),
  methodEdge(
    "bayesian-modeling-psychology",
    "computational-modeling-of-cognition",
    "分层贝叶斯是主流实现方式"
  ),
  methodEdge(
    "measurement-invariance-fair-comparison",
    "weird-samples-and-generalizability",
    "跨群体比较的前置条件"
  ),
  methodEdge(
    "causal-inference-experiments-observational-studies",
    "weird-samples-and-generalizability",
    "外部效度与内部效度的取舍"
  ),
  methodEdge(
    "experience-sampling-and-ema",
    "psychopathology-network-theory",
    "个体化动态网络依赖密集纵向数据"
  ),
];
