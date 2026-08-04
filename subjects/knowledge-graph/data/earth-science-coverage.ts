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
    "karst-and-caves",
    "岩溶与洞穴",
    "concept",
    "concepts",
    "溶蚀造出的地下空间：洞穴分层、石笋生长与铀钍定年的陆地气候档案。",
    ["岩溶", "洞穴", "石笋", "铀钍测年"]
  ),
  node(
    "ice-ages-and-milankovitch",
    "冰期与米兰科维奇周期",
    "concept",
    "concepts",
    "轨道三参数调制日照节拍，深海岩芯与冰芯证实冰期旋回的天文驱动。",
    ["米兰科维奇周期", "冰期", "轨道强迫"]
  ),
  node(
    "chicxulub-impact",
    "希克苏鲁伯撞击",
    "event",
    "events",
    "撞击证据把瞬时地质灾变与白垩纪末全球环境变化和大灭绝连接起来。",
    ["小行星撞击", "K-Pg 界线"]
  ),
  // ── spine anchors (T-GRAPH-12) ────────────────────────────
  node(
    "harry-hess",
    "哈里·赫斯",
    "pioneer",
    "pioneers",
    "提出海底扩张说：大洋中脊造出新洋壳，给大陆漂移装上引擎。",
    ["海底扩张", "大洋中脊"]
  ),
  node(
    "wallace-broecker",
    "沃利·布罗克",
    "pioneer",
    "pioneers",
    "大洋传送带与气候突变研究的奠基者。",
    ["大洋传送带", "气候突变"]
  ),
  node(
    "eunice-foote",
    "尤妮斯·富特",
    "pioneer",
    "pioneers",
    "1856 年实验证明二氧化碳与水汽潴留太阳热量。",
    ["温室效应", "二氧化碳"]
  ),
  node(
    "geologic-time-scale",
    "地质年代表",
    "concept",
    "concepts",
    "由无数地层界线拼成的 45.4 亿年地球历史目录。",
    ["深时", "地层界线"]
  ),
  node(
    "igneous-sedimentary-metamorphic-rocks",
    "三大类岩石",
    "concept",
    "concepts",
    "按成因分类：火成、沉积、变质——三类岩石讲三段故事。",
    ["火成岩", "沉积岩", "变质岩"]
  ),
  node(
    "paleontology-and-stratigraphy",
    "古生物学与地层学",
    "concept",
    "concepts",
    "化石与岩层顺序合起来，是人类读懂深时的语言。",
    ["化石", "地层"]
  ),
  node(
    "paleontology-and-fossils",
    "古生物学与化石记录",
    "concept",
    "concepts",
    "从残缺、被筛选的化石记录中诚实地读出生命史。",
    ["化石记录", "演化"]
  ),
  node("tides", "潮汐", "concept", "concepts", "引潮力之差驱动的海面涨落，可精确预报到分钟。", [
    "引潮力",
    "月球",
  ]),
  node(
    "global-atmospheric-circulation",
    "全球大气环流",
    "process",
    "processes",
    "在赤道与极地之间搬运热量的行星尺度热机。",
    ["哈德莱环流", "风带"]
  ),
  node(
    "ocean-surface-circulation",
    "表层洋流与风成环流",
    "process",
    "processes",
    "信风与西风带驱动的副热带环流，搬运热量与物质。",
    ["风成环流", "洋流"]
  ),
  node(
    "fluvial-processes",
    "河流过程与地貌",
    "process",
    "processes",
    "侵蚀、搬运与堆积塑造河流地貌，堆出文明的沃土。",
    ["河流", "地貌"]
  ),
  node(
    "marine-biogeochemistry",
    "海洋生物地球化学",
    "process",
    "processes",
    "生物泵与物理环流共同维持海洋碳库与氧最小层。",
    ["生物泵", "碳库"]
  ),
  node(
    "paleoclimate-ice-cores",
    "冰芯与古气候",
    "concept",
    "frontier",
    "冰芯气泡封存古代大气，把气候变化放进百万年尺度。",
    ["冰芯", "古气候"]
  ),
  node(
    "carbon-capture-geoengineering",
    "碳捕集与地球工程",
    "concept",
    "frontier",
    "碳移除与太阳辐射管理两条路线的科学、代价与争议。",
    ["地球工程", "碳移除"]
  ),
  node(
    "tohoku-2011",
    "东日本大地震与海啸（2011）",
    "event",
    "events",
    "Mw9.0–9.1 巨型逆冲地震引发毁灭性海啸与核事故。",
    ["东北地震", "海啸"]
  ),
  node(
    "pompeii-vesuvius-79",
    "维苏威火山爆发与庞贝（79）",
    "event",
    "events",
    "普林尼式喷发瞬间封存一座罗马城市。",
    ["维苏威", "庞贝"]
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
  // ── spine anchor edges (T-GRAPH-12) ───────────────────────
  edge("harry-hess", "plate-tectonics", "海底扩张奠基"),
  edge("harry-hess", "marie-tharp", "证据互补"),
  edge("wallace-broecker", "thermohaline-circulation", "大洋传送带"),
  edge("wallace-broecker", "carbon-cycle", "气候突变与碳"),
  edge("eunice-foote", "greenhouse-effect", "早期实验证据"),
  edge("geologic-time-scale", "james-hutton", "深时奠基"),
  edge("geologic-time-scale", "paleontology-and-stratigraphy", "界线依据"),
  edge("paleontology-and-stratigraphy", "charles-lyell", "均变论与地层"),
  edge("paleontology-and-stratigraphy", "rock-cycle", "地层记录"),
  edge("paleontology-and-fossils", "charles-lyell", "化石层序"),
  edge("paleontology-and-fossils", "paleontology-and-stratigraphy", "同源的深时证据"),
  edge("igneous-sedimentary-metamorphic-rocks", "james-hutton", "深时岩石记录"),
  edge("igneous-sedimentary-metamorphic-rocks", "rock-cycle", "循环中的三类岩石"),
  edge("global-atmospheric-circulation", "coriolis-effect", "偏转塑造风带"),
  edge("global-atmospheric-circulation", "weather-systems", "天气的环流背景"),
  edge("global-atmospheric-circulation", "monsoon-systems", "驱动季节环流"),
  edge("ocean-surface-circulation", "coriolis-effect", "风应力与偏转"),
  edge("ocean-surface-circulation", "thermohaline-circulation", "表层与深层耦合"),
  edge("ocean-surface-circulation", "global-atmospheric-circulation", "风驱动"),
  edge("fluvial-processes", "water-cycle", "径流环节"),
  edge("fluvial-processes", "erosion-deposition", "河流侵蚀与堆积"),
  edge("marine-biogeochemistry", "ocean-acidification", "碳酸盐化学"),
  edge("marine-biogeochemistry", "carbon-cycle", "海洋碳库"),
  edge("marine-biogeochemistry", "thermohaline-circulation", "物理环流输送"),
  edge("paleoclimate-ice-cores", "glaciation-ice-ages", "冰体记录"),
  edge("paleoclimate-ice-cores", "milutin-milankovitch", "验证轨道节律"),
  edge("paleoclimate-ice-cores", "climate-tipping-points", "气候突变证据"),
  edge("carbon-capture-geoengineering", "carbon-cycle", "干预碳循环"),
  edge("carbon-capture-geoengineering", "carbon-budgets-and-net-zero", "减排之外的选项"),
  edge("carbon-capture-geoengineering", "climate-tipping-points", "逼近临界点的动机"),
  edge("tohoku-2011", "earthquakes", "实例"),
  edge("tohoku-2011", "indian-ocean-tsunami-2004", "同为海啸灾难"),
  edge("pompeii-vesuvius-79", "volcanism", "普林尼式喷发实例"),
  // ── new concepts: karst caves & Milankovitch cycles ─────────
  edge("water-cycle", "karst-and-caves", "溶蚀作用由水循环驱动"),
  edge("karst-and-caves", "groundwater-aquifers", "洞穴是岩溶含水层的窗口"),
  edge("karst-and-caves", "geologic-time-scale", "铀钍测年接入深时标尺"),
  edge("karst-and-caves", "monsoon-systems", "石笋记录季风强弱"),
  edge("ice-ages-and-milankovitch", "glaciation-ice-ages", "轨道驱动机制"),
  edge("ice-ages-and-milankovitch", "milutin-milankovitch", "理论提出者"),
  edge("ice-ages-and-milankovitch", "paleoclimate-ice-cores", "冰芯验证轨道节拍"),
  edge("ice-ages-and-milankovitch", "sea-level-change", "冰量变化驱动海平面"),
  {
    source: "earth-science:chicxulub-impact",
    target: "lifescience:end-cretaceous",
    type: "domain-link",
    label: "撞击与白垩纪末灭绝",
  },
  {
    source: "earth-science:tides",
    target: "physics:T6",
    type: "domain-link",
    label: "月球与太阳的引潮力",
  },
  {
    source: "earth-science:paleontology-and-fossils",
    target: "lifescience:cambrian-explosion",
    type: "domain-link",
    label: "化石记录生命爆发",
  },
];
