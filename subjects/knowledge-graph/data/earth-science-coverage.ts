import type { GraphEdge, GraphNode } from "./types";

const node = (
  slug: string,
  label: string,
  type: GraphNode["type"],
  section: string,
  description: string,
  tags: string[]
): GraphNode => ({
  id: `earth-science:${slug}`,
  label,
  domain: "earth-science",
  type,
  slug,
  section,
  url: `/earth-science/${section}/${slug}`,
  description,
  tags,
});

const edge = (source: string, target: string, label: string): GraphEdge => ({
  source: `earth-science:${source}`,
  target: `earth-science:${target}`,
  type: "cross-reference",
  label,
});

export const EARTH_SCIENCE_COVERAGE_NODES: GraphNode[] = [
  node(
    "atmosphere-structure",
    "大气层的结构",
    "concept",
    "concepts",
    "从对流层到热层理解温度结构、臭氧吸收与天气发生的垂直边界。",
    ["大气层", "对流层"]
  ),
  node(
    "cryosphere",
    "冰冻圈",
    "concept",
    "concepts",
    "冰川、冰盖、海冰、积雪和冻土通过反照率与海平面影响地球系统。",
    ["冰冻圈", "反照率"]
  ),
  node(
    "ocean-acidification",
    "海洋酸化",
    "concept",
    "concepts",
    "海洋吸收二氧化碳后改变碳酸盐化学，影响钙化生物与食物网。",
    ["海洋酸化", "碳酸盐化学"]
  ),
  node(
    "remote-sensing-and-gis",
    "遥感与地理信息系统",
    "concept",
    "concepts",
    "把卫星、传感器与空间分析结合，用于观测土地、灾害、气候和资源变化。",
    ["遥感", "GIS"]
  ),
  node(
    "climate-tipping-points",
    "气候临界点",
    "concept",
    "frontier",
    "研究冰盖、环流与生态系统是否会跨越自我强化、难以逆转的状态阈值。",
    ["气候临界点", "不可逆性"]
  ),
  node(
    "monsoon-systems",
    "季风系统",
    "process",
    "processes",
    "海陆热力差异、环流与地形共同组织季节性风向和降水。",
    ["季风", "大气环流"]
  ),
  node(
    "groundwater-aquifers",
    "地下水与含水层",
    "process",
    "processes",
    "补给、抽取和地质介质控制地下水储量、流动与枯竭风险。",
    ["地下水", "含水层"]
  ),
  node(
    "mineral-resources-and-critical-metals",
    "矿产资源与关键金属",
    "concept",
    "concepts",
    "从矿床、精炼和副产品供给解释关键性，并把能源转型连接到社区、回收与供应链风险。",
    ["关键矿产", "经济地质", "供应链", "回收"]
  ),
  node(
    "chicxulub-impact",
    "希克苏鲁伯撞击",
    "event",
    "events",
    "撞击证据把瞬时地质灾变与白垩纪末全球环境变化和大灭绝连接起来。",
    ["小行星撞击", "K-Pg 界线"]
  ),
];

export const EARTH_SCIENCE_COVERAGE_EDGES: GraphEdge[] = [
  edge("atmosphere-structure", "weather-systems", "天气发生的垂直环境"),
  edge("atmosphere-structure", "greenhouse-effect", "辐射吸收与温度结构"),
  edge("cryosphere", "glaciation-ice-ages", "记录冰体进退"),
  edge("cryosphere", "sea-level-change", "陆地冰量改变海平面"),
  edge("ocean-acidification", "carbon-cycle", "海洋吸收二氧化碳"),
  edge("ocean-acidification", "thermohaline-circulation", "海洋碳输送背景"),
  edge("remote-sensing-and-gis", "map-projections", "组织空间观测"),
  edge("remote-sensing-and-gis", "extreme-event-attribution", "提供暴露与事件观测"),
  edge("climate-tipping-points", "climate-modeling", "用模型检验阈值"),
  edge("climate-tipping-points", "sea-level-change", "冰盖临界风险"),
  edge("monsoon-systems", "weather-systems", "季节性环流"),
  edge("monsoon-systems", "el-nino-enso", "海气遥相关"),
  edge("groundwater-aquifers", "water-cycle", "地下储存与补给"),
  edge("groundwater-aquifers", "weathering-soil", "地质介质控制渗流"),
  edge("rock-cycle", "mineral-resources-and-critical-metals", "形成并富集矿产"),
  edge("plate-tectonics", "mineral-resources-and-critical-metals", "控制成矿环境"),
  {
    source: "earth-science:chicxulub-impact",
    target: "lifescience:end-cretaceous",
    type: "domain-link",
    label: "撞击与白垩纪末灭绝",
  },
];
