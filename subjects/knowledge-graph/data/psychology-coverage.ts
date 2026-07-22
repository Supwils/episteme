import type { GraphEdge, GraphNode } from "./types";

const node = (
  slug: string,
  label: string,
  type: GraphNode["type"],
  section: string,
  description: string,
  tags: string[]
): GraphNode => ({
  id: `psychology:${slug}`,
  label,
  domain: "psychology",
  type,
  slug,
  section,
  url: `/psychology/${section}/${slug}`,
  description,
  tags,
});

const edge = (source: string, target: string, label: string): GraphEdge => ({
  source: `psychology:${source}`,
  target: `psychology:${target}`,
  type: "cross-reference",
  label,
});

export const PSYCHOLOGY_COVERAGE_NODES: GraphNode[] = [
  node(
    "attachment-theory",
    "依恋理论：爱的科学",
    "concept",
    "knowledge-base",
    "从早期照护关系、内部工作模型与陌生情境研究解释亲密关系的发展。",
    ["依恋", "内部工作模型"]
  ),
  node(
    "developmental-psychology",
    "发展心理学",
    "concept",
    "knowledge-base",
    "研究认知、社会情感与身份如何在生命历程中形成和改变。",
    ["认知发展", "毕生发展"]
  ),
  node(
    "sleep-and-mind",
    "睡眠与心智",
    "concept",
    "knowledge-base",
    "从睡眠稳态、昼夜节律和社会时间理解睡眠如何关联学习、情绪与青少年发展，并区分机制证据与健康建议。",
    ["睡眠稳态", "昼夜节律", "青少年睡眠"]
  ),
  node(
    "cultural-psychology",
    "文化心理学",
    "concept",
    "knowledge-base",
    "检验自我、认知和情绪如何由文化实践塑造，并审查 WEIRD 样本外推。",
    ["文化心理学", "跨文化"]
  ),
  node(
    "psychology-of-decisions",
    "决策心理学",
    "concept",
    "knowledge-base",
    "把启发式、偏误、风险与选择架构组织为可检验的判断过程。",
    ["决策", "认知偏误"]
  ),
  node(
    "major-depressive",
    "重度抑郁症",
    "disease",
    "disorders",
    "以持续情绪、认知和功能改变理解抑郁，同时区分风险因素、机制与诊断标准。",
    ["抑郁", "情绪障碍"]
  ),
  node(
    "ptsd",
    "创伤后应激障碍",
    "disease",
    "disorders",
    "创伤后的侵入、回避、警觉与认知情绪变化，需要结合记忆、环境和恢复条件理解。",
    ["PTSD", "创伤记忆"]
  ),
  node(
    "social-media-teen-mental-health",
    "社交媒体与青少年心理健康",
    "concept",
    "frontier",
    "在选择效应、使用方式、平台设计与个体差异之间辨析因果证据。",
    ["社交媒体", "青少年心理健康"]
  ),
  node(
    "predictive-processing-psychiatry",
    "计算精神病学与预测加工",
    "concept",
    "frontier",
    "用生成模型、预测误差和贝叶斯更新提出可检验的精神症状机制。",
    ["预测加工", "计算精神病学"]
  ),
];

export const PSYCHOLOGY_COVERAGE_EDGES: GraphEdge[] = [
  edge("attachment-theory", "john-bowlby", "理论奠基"),
  edge("attachment-theory", "strange-situation", "实验操作化"),
  edge("attachment-theory", "attachment-styles", "形成关系模式"),
  edge("developmental-psychology", "jean-piaget", "认知发展"),
  edge("developmental-psychology", "lev-vygotsky", "社会文化发展"),
  edge("developmental-psychology", "erik-erikson", "生命历程"),
  edge("developmental-psychology", "sleep-and-mind", "青春期节律与社会时间"),
  edge("cultural-psychology", "social-identity", "文化与群体自我"),
  edge("cultural-psychology", "measurement-invariance-fair-comparison", "检验跨文化可比性"),
  edge("psychology-of-decisions", "daniel-kahneman", "判断与决策研究"),
  edge("psychology-of-decisions", "cognitive-bias", "系统性判断偏差"),
  edge("major-depressive", "aaron-beck", "认知模型"),
  edge("major-depressive", "learned-helplessness-phenomenon", "无助与归因路径"),
  edge("ptsd", "memory-systems", "创伤记忆加工"),
  edge("ptsd", "emotion-theories", "威胁与情绪调节"),
  edge("social-media-teen-mental-health", "social-identity", "同伴比较与身份"),
  edge("social-media-teen-mental-health", "developmental-psychology", "青少年发展阶段"),
  edge("social-media-teen-mental-health", "sleep-and-mind", "夜间使用、睡眠置换与双向影响"),
  edge(
    "social-media-teen-mental-health",
    "causal-inference-experiments-observational-studies",
    "区分选择效应、机制与因果影响"
  ),
  edge("predictive-processing-psychiatry", "bayesian-modeling-psychology", "生成模型与更新"),
  edge("predictive-processing-psychiatry", "perception-physiology", "知觉预测误差"),
  {
    source: "psychology:sleep-and-mind",
    target: "sociology:family-and-kinship",
    type: "domain-link",
    label: "家庭作息、照护与社会时间",
  },
  {
    source: "psychology:social-media-teen-mental-health",
    target: "sociology:social-support-mental-health",
    type: "domain-link",
    label: "线上联结既可能支持也可能施压",
  },
];
