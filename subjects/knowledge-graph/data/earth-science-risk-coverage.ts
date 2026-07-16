import type { GraphEdge, GraphNode } from "./types";

const riskNode = (
  slug: string,
  label: string,
  section: "processes" | "climate-risks",
  description: string,
  tags: string[]
): GraphNode => ({
  id: `earth-science:${slug}`,
  label,
  domain: "earth-science",
  type: "concept",
  slug,
  section,
  url: `/earth-science/${section}/${slug}`,
  description,
  tags,
});

const riskEdge = (source: string, target: string, label: string): GraphEdge => ({
  source: `earth-science:${source}`,
  target: `earth-science:${target}`,
  type: "cross-reference",
  label,
});

export const EARTH_SCIENCE_RISK_NODES: GraphNode[] = [
  riskNode(
    "climate-modeling",
    "气候建模",
    "processes",
    "以物理约束的地球系统模拟检验长期统计变化、情景与不确定性。",
    ["气候模型", "地球系统模式", "CMIP"]
  ),
  riskNode(
    "sea-level-change",
    "海平面变化",
    "processes",
    "由海洋热膨胀、陆地冰与局地沉降共同塑造的沿海基线变化。",
    ["海平面", "冰盖", "沉降"]
  ),
  riskNode(
    "extreme-event-attribution",
    "极端事件归因",
    "climate-risks",
    "用观测、模型与反事实比较估计人为变暖如何改变极端事件概率或强度。",
    ["事件归因", "反事实", "风险比"]
  ),
  riskNode(
    "compound-climate-risks",
    "复合气候风险",
    "climate-risks",
    "分析热、旱、雨、潮和基础设施失效如何共现、连续并级联放大伤害。",
    ["复合事件", "级联风险", "脆弱性"]
  ),
  riskNode(
    "ensemble-prediction-and-decision",
    "集合预测、不确定性与气候决策",
    "climate-risks",
    "区分内部变率、模型与情景不确定性，并用稳健路径支持可调整决策。",
    ["集合预测", "不确定性", "适应路径"]
  ),
  riskNode(
    "urban-heat-risk-adaptation",
    "城市热风险与适应",
    "climate-risks",
    "把热岛、湿热、住房、劳动、医疗与热健康行动计划放进同一风险框架。",
    ["热浪", "城市热岛", "热健康"]
  ),
  riskNode(
    "sea-level-adaptation-pathways",
    "海平面上升与适应路径",
    "climate-risks",
    "在海平面、沉降和复合洪水的不确定性下规划保护、容纳与公平后退。",
    ["海平面适应", "沿海风险", "公平迁移"]
  ),
  riskNode(
    "carbon-budgets-and-net-zero",
    "碳预算、净零与气候目标",
    "climate-risks",
    "解释累计 CO2 排放、剩余预算、净零和高完整性碳移除之间的物理与治理边界。",
    ["碳预算", "净零", "碳移除"]
  ),
];

export const EARTH_SCIENCE_RISK_EDGES: GraphEdge[] = [
  riskEdge("climate-modeling", "ensemble-prediction-and-decision", "量化多源不确定性"),
  riskEdge("ensemble-prediction-and-decision", "extreme-event-attribution", "构造反事实集合"),
  riskEdge("extreme-event-attribution", "compound-climate-risks", "识别危险变化"),
  riskEdge("compound-climate-risks", "urban-heat-risk-adaptation", "揭示热与系统级联"),
  riskEdge("compound-climate-risks", "sea-level-adaptation-pathways", "评估复合洪水"),
  riskEdge("sea-level-change", "sea-level-adaptation-pathways", "抬高风险基线"),
  riskEdge("carbon-budgets-and-net-zero", "climate-modeling", "约束排放情景"),
  riskEdge("sea-level-adaptation-pathways", "carbon-budgets-and-net-zero", "适应不能替代减排"),
  {
    source: "earth-science:urban-heat-risk-adaptation",
    target: "medicine:environmental-occupational-health",
    type: "domain-link",
    label: "热健康与劳动暴露",
  },
  {
    source: "earth-science:urban-heat-risk-adaptation",
    target: "sociology:urban-climate-adaptation",
    type: "domain-link",
    label: "城市适应公平",
  },
  {
    source: "earth-science:carbon-budgets-and-net-zero",
    target: "economics:environmental-economics",
    type: "domain-link",
    label: "外部性与转型成本",
  },
  {
    source: "earth-science:carbon-budgets-and-net-zero",
    target: "political-science:fiscal-state",
    type: "domain-link",
    label: "公共投资与跨期责任",
  },
];
