import type { GraphNode, GraphEdge } from "./types";

const n = (
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
  tags,
  description,
});

export const EARTH_SCIENCE_NODES: GraphNode[] = [
  // ── pioneers ──────────────────────────────────────────────
  n(
    "james-hutton",
    "詹姆斯·赫顿",
    "pioneer",
    "pioneers",
    "深时与均变论的奠基者，看见地球漫长的循环。",
    ["深时", "均变论"]
  ),
  n(
    "charles-lyell",
    "查尔斯·莱伊尔",
    "pioneer",
    "pioneers",
    "《地质学原理》系统化均变论，影响达尔文。",
    ["均变论", "地质学"]
  ),
  n(
    "alfred-wegener",
    "阿尔弗雷德·魏格纳",
    "pioneer",
    "pioneers",
    "提出大陆漂移说，板块构造的先声。",
    ["大陆漂移", "板块构造"]
  ),
  n("inge-lehmann", "英厄·莱曼", "pioneer", "pioneers", "用地震波发现地球有固态内核。", [
    "地震波",
    "内核",
  ]),
  n("marie-tharp", "玛丽·撒普", "pioneer", "pioneers", "绘出大洋中脊地图，为海底扩张提供铁证。", [
    "大洋中脊",
    "海底扩张",
  ]),
  n(
    "milutin-milankovitch",
    "米卢廷·米兰科维奇",
    "pioneer",
    "pioneers",
    "用地球轨道参数解释冰期节律。",
    ["米兰科维奇循环", "冰期"]
  ),
  n(
    "vilhelm-bjerknes",
    "威廉·皮叶克尼斯",
    "pioneer",
    "pioneers",
    "把天气预报奠基为流体力学初值问题。",
    ["数值天气预报", "锋面"]
  ),
  n("charles-keeling", "查尔斯·基林", "pioneer", "pioneers", "基林曲线：持续测量证实 CO₂ 上升。", [
    "基林曲线",
    "二氧化碳",
  ]),

  // ── concepts ──────────────────────────────────────────────
  n("earth-interior", "地球内部结构", "concept", "concepts", "地壳、地幔、外核、内核的分层结构。", [
    "地核",
    "地幔",
  ]),
  n("plate-boundaries", "板块边界", "concept", "concepts", "离散、汇聚、转换三类边界塑造地表。", [
    "板块",
    "边界",
  ]),
  n("rock-cycle", "岩石循环", "concept", "concepts", "火成、沉积、变质岩在地质时间里相互转化。", [
    "岩石",
    "循环",
  ]),
  n(
    "earths-magnetic-field",
    "地球磁场",
    "concept",
    "concepts",
    "外核地磁发电机产生的保护性磁场。",
    ["地磁", "地磁发电机"]
  ),
  n(
    "greenhouse-effect",
    "温室效应",
    "concept",
    "concepts",
    "温室气体捕获红外辐射、维持宜居温度。",
    ["温室气体", "气候"]
  ),
  n("carbon-cycle", "碳循环", "concept", "concepts", "碳在大气、海洋、岩石与生物间的长期流转。", [
    "碳",
    "循环",
  ]),
  n("water-cycle", "水循环", "concept", "concepts", "蒸发、降水、径流驱动的全球水分循环。", [
    "水",
    "循环",
  ]),
  n(
    "thermohaline-circulation",
    "温盐环流",
    "concept",
    "concepts",
    "由温度盐度差驱动的全球深海「传送带」。",
    ["洋流", "AMOC"]
  ),
  n(
    "coriolis-effect",
    "科里奥利效应",
    "concept",
    "concepts",
    "地球自转使运动偏转，塑造风带与洋流。",
    ["自转", "偏转"]
  ),
  n("map-projections", "地图投影", "concept", "concepts", "把球面铺到平面的取舍——没有完美投影。", [
    "投影",
    "制图",
  ]),

  // ── processes ─────────────────────────────────────────────
  n("plate-tectonics", "板块构造", "process", "processes", "统一地球科学的「大一统理论」。", [
    "板块",
    "地幔对流",
  ]),
  n("volcanism", "火山作用", "process", "processes", "岩浆上涌、喷发，重塑地表与大气。", [
    "岩浆",
    "喷发",
  ]),
  n("earthquakes", "地震", "process", "processes", "断层应力骤释，地震波揭示地球内部。", [
    "断层",
    "地震波",
  ]),
  n(
    "orogeny-mountain-building",
    "造山运动",
    "process",
    "processes",
    "板块碰撞抬升山脉，如喜马拉雅。",
    ["造山", "碰撞"]
  ),
  n(
    "weathering-soil",
    "风化与成土",
    "process",
    "processes",
    "岩石分解为土壤，连接岩石圈与生物圈。",
    ["风化", "土壤"]
  ),
  n("erosion-deposition", "侵蚀与沉积", "process", "processes", "水、风、冰搬运物质，雕刻地貌。", [
    "侵蚀",
    "沉积",
  ]),
  n(
    "glaciation-ice-ages",
    "冰期与冰川作用",
    "process",
    "processes",
    "冰盖进退由轨道节律驱动，改写地貌与海平面。",
    ["冰期", "冰川"]
  ),
  n("weather-systems", "天气系统", "process", "processes", "气团、锋面与气旋构成日常天气。", [
    "锋面",
    "气旋",
  ]),
  n(
    "el-nino-enso",
    "厄尔尼诺与 ENSO",
    "process",
    "processes",
    "热带太平洋海气耦合的年际气候摆动。",
    ["ENSO", "海气耦合"]
  ),

  // ── events ────────────────────────────────────────────────
  n(
    "great-oxidation-event",
    "大氧化事件",
    "event",
    "events",
    "约 24 亿年前蓝藻产氧，永久改变大气。",
    ["大氧化", "蓝藻"]
  ),
  n("snowball-earth", "雪球地球", "event", "events", "地球数次几乎完全封冻的极端冰期。", [
    "雪球地球",
    "成冰纪",
  ]),
  n(
    "messinian-salinity-crisis",
    "墨西拿盐度危机",
    "event",
    "events",
    "约 6 百万年前地中海近乎干涸。",
    ["地中海", "蒸发岩"]
  ),
  n("pangaea-breakup", "泛大陆裂解", "event", "events", "超大陆解体，塑造今日海陆格局。", [
    "泛大陆",
    "裂解",
  ]),
  n(
    "lisbon-1755",
    "里斯本大地震（1755）",
    "event",
    "events",
    "地震、海啸、火灾同袭，催生地震学。",
    ["里斯本", "海啸"]
  ),
  n("tambora-1815", "坦博拉火山爆发（1815）", "event", "events", "VEI-7 喷发，导致「无夏之年」。", [
    "坦博拉",
    "无夏之年",
  ]),
  n(
    "krakatoa-1883",
    "喀拉喀托火山爆发（1883）",
    "event",
    "events",
    "爆发声 4800 公里外可闻，海啸夺去数万生命。",
    ["喀拉喀托", "海啸"]
  ),
  n(
    "indian-ocean-tsunami-2004",
    "印度洋海啸（2004）",
    "event",
    "events",
    "苏门答腊 9.1 级地震引发史上最致命海啸之一。",
    ["海啸", "苏门答腊"]
  ),
];

const e = (from: string, to: string, label: string): GraphEdge => ({
  source: `earth-science:${from}`,
  target: `earth-science:${to}`,
  type: "cross-reference",
  label,
});

export const EARTH_SCIENCE_EDGES: GraphEdge[] = [
  // pioneers → their contributions
  e("james-hutton", "rock-cycle", "奠定"),
  e("charles-lyell", "rock-cycle", "系统化"),
  e("alfred-wegener", "plate-tectonics", "先声"),
  e("marie-tharp", "plate-tectonics", "提供证据"),
  e("inge-lehmann", "earth-interior", "发现内核"),
  e("milutin-milankovitch", "glaciation-ice-ages", "解释节律"),
  e("vilhelm-bjerknes", "weather-systems", "奠基预报"),
  e("charles-keeling", "greenhouse-effect", "实证 CO₂"),
  // concepts ↔ processes
  e("earth-interior", "plate-tectonics", "驱动"),
  e("plate-boundaries", "plate-tectonics", "界定"),
  e("plate-tectonics", "volcanism", "引发"),
  e("plate-tectonics", "earthquakes", "引发"),
  e("plate-tectonics", "orogeny-mountain-building", "造山"),
  e("earths-magnetic-field", "earth-interior", "源于外核"),
  e("rock-cycle", "weathering-soil", "包含"),
  e("rock-cycle", "erosion-deposition", "包含"),
  e("water-cycle", "erosion-deposition", "驱动"),
  e("coriolis-effect", "thermohaline-circulation", "影响"),
  e("coriolis-effect", "weather-systems", "塑造"),
  e("carbon-cycle", "greenhouse-effect", "调节"),
  e("thermohaline-circulation", "el-nino-enso", "关联气候"),
  // processes ↔ events
  e("glaciation-ice-ages", "snowball-earth", "极端形态"),
  e("plate-tectonics", "pangaea-breakup", "导致"),
  e("volcanism", "tambora-1815", "实例"),
  e("volcanism", "krakatoa-1883", "实例"),
  e("earthquakes", "lisbon-1755", "实例"),
  e("earthquakes", "indian-ocean-tsunami-2004", "实例"),
  e("plate-tectonics", "messinian-salinity-crisis", "构造背景"),
  e("carbon-cycle", "great-oxidation-event", "改写大气"),

  // ── cross-domain bridges (targets verified to exist in other domains' nodes) ──
  {
    source: "earth-science:great-oxidation-event",
    target: "lifescience:great-oxidation",
    type: "domain-link",
    label: "生命与地球协同演化",
  },
  {
    source: "earth-science:great-oxidation-event",
    target: "lifescience:cyanobacteria",
    type: "domain-link",
    label: "蓝藻产氧",
  },
  {
    source: "earth-science:snowball-earth",
    target: "lifescience:cambrian-explosion",
    type: "domain-link",
    label: "解冻后生命爆发",
  },
  {
    source: "earth-science:earth-interior",
    target: "physics:T7",
    type: "domain-link",
    label: "地球的内部",
  },
];
