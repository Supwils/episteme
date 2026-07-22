import type { GraphNode, GraphEdge } from "./types";
import { CHEMISTRY_COVERAGE_EDGES, CHEMISTRY_COVERAGE_NODES } from "./chemistry-coverage";

const n = (
  slug: string,
  label: string,
  type: GraphNode["type"],
  section: string,
  description: string,
  tags: string[]
): GraphNode => ({
  id: `chemistry:${slug}`,
  label,
  domain: "chemistry",
  type,
  slug,
  section,
  url: `/chemistry/${section}/${slug}`,
  tags,
  description,
});

export const CHEMISTRY_NODES: GraphNode[] = [
  // ── figures ───────────────────────────────────────────────
  n("lavoisier", "拉瓦锡", "figure", "figures", "氧化学说与质量守恒，推翻燃素说的现代化学之父。", [
    "氧化",
    "质量守恒",
  ]),
  n("dalton", "道尔顿", "figure", "figures", "原子论的奠基者，把物质还原为不可分的原子。", [
    "原子论",
  ]),
  n("mendeleev", "门捷列夫", "figure", "figures", "排出元素周期表，并据空位预言未知元素。", [
    "周期表",
    "元素",
  ]),
  n("marie-curie", "居里夫人", "figure", "figures", "放射性研究、钋与镭的发现，两度获诺奖。", [
    "放射性",
    "镭",
  ]),
  n("linus-pauling", "鲍林", "figure", "figures", "化学键的本质、杂化与电负性的阐释者。", [
    "化学键",
    "电负性",
  ]),
  n("fritz-haber", "哈伯", "figure", "figures", "合成氨养活世界，也背负化学战的伦理阴影。", [
    "合成氨",
    "伦理",
  ]),
  n("kekule", "凯库勒", "figure", "figures", "苯环结构与有机结构理论的提出者。", [
    "苯环",
    "有机结构",
  ]),
  n("robert-boyle", "波义耳", "figure", "figures", "《怀疑的化学家》让化学从炼金术中独立。", [
    "波义耳定律",
    "近代化学",
  ]),

  // ── concepts ──────────────────────────────────────────────
  n(
    "atomic-structure",
    "原子结构",
    "concept",
    "concepts",
    "质子中子电子与量子化能级，物质的基本图景。",
    ["原子", "电子"]
  ),
  n(
    "chemical-bond",
    "化学键",
    "concept",
    "concepts",
    "离子键、共价键、金属键——原子为何结合在一起。",
    ["共价键", "电负性"]
  ),
  n("periodic-table", "元素周期表", "concept", "concepts", "周期律把元素性质的递变织成一张表。", [
    "周期律",
    "元素",
  ]),
  n(
    "acids-and-bases",
    "酸碱",
    "concept",
    "concepts",
    "质子的给受、pH 与中和，化学最常见的对立统一。",
    ["pH", "中和"]
  ),
  n("redox-reactions", "氧化还原", "concept", "concepts", "电子转移驱动从呼吸到电池的能量流动。", [
    "电子转移",
    "氧化数",
  ]),
  n(
    "chemical-equilibrium",
    "化学平衡",
    "concept",
    "concepts",
    "可逆反应的动态平衡与勒夏特列原理。",
    ["平衡常数", "勒夏特列"]
  ),
  n("thermochemistry", "热化学", "concept", "concepts", "焓、熵与吉布斯自由能决定反应能否自发。", [
    "焓",
    "熵",
    "自由能",
  ]),
  n(
    "electrochemistry",
    "电化学",
    "concept",
    "concepts",
    "用自由能、电势、界面动力学和传质闭合电子、物料、能量与热的账。",
    ["电势", "过电位", "电池", "电解"]
  ),

  // ── substances ────────────────────────────────────────────
  n("water", "水", "substance", "substances", "极性与氢键造就的反常物性，生命之基。", [
    "氢键",
    "极性",
  ]),
  n(
    "carbon-allotropes",
    "碳的同素异形体",
    "substance",
    "substances",
    "同是碳：金刚石、石墨、石墨烯、富勒烯。",
    ["石墨烯", "金刚石"]
  ),
  n("polymers", "高分子聚合物", "substance", "substances", "单体连成长链，塑料、橡胶与纤维之本。", [
    "塑料",
    "聚合",
  ]),
  n(
    "metals-and-alloys",
    "金属与合金",
    "substance",
    "substances",
    "金属键与合金强化，从青铜到不锈钢。",
    ["金属键", "合金"]
  ),
  n(
    "semiconductors-materials",
    "半导体材料",
    "substance",
    "substances",
    "硅与掺杂、能带——信息时代的物质基础。",
    ["硅", "能带"]
  ),
  n(
    "catalysts",
    "催化剂",
    "substance",
    "substances",
    "由活性相、载体、助剂和孔结构组成，在循环中再生，也会中毒、积碳、烧结或流失。",
    ["活性位", "载体", "失活"]
  ),

  // ── reactions ─────────────────────────────────────────────
  n("combustion", "燃烧", "reaction", "reactions", "氧化放热，火的化学与能源的起点。", [
    "氧化",
    "放热",
  ]),
  n("polymerization", "聚合反应", "reaction", "reactions", "单体如何长成高分子长链。", [
    "加聚",
    "缩聚",
  ]),
  n(
    "catalysis-reaction",
    "催化作用",
    "reaction",
    "reactions",
    "以催化循环重组反应路径，并把本征速率、选择性、传递限制与寿命连成可比较证据。",
    ["催化循环", "周转频率", "选择性"]
  ),
  n("electrolysis", "电解", "reaction", "reactions", "电能驱动非自发反应，电解水/铝/食盐水。", [
    "电解",
    "电能",
  ]),
  n(
    "precipitation-reactions",
    "沉淀反应",
    "reaction",
    "reactions",
    "以活度积、过饱和与成核生长控制溶液中的固相分离。",
    ["溶度积", "结晶", "水处理"]
  ),
  n(
    "grignard-reaction",
    "格氏反应",
    "reaction",
    "reactions",
    "以有机镁试剂构筑碳碳键，并把分子机理连接到引发、量热与放大安全。",
    ["有机镁", "碳碳键", "过程安全"]
  ),

  // ── milestones ────────────────────────────────────────────
  n(
    "lavoisier-oxygen-revolution",
    "氧化学革命（1789）",
    "event",
    "milestones",
    "拉瓦锡推翻燃素说，化学进入定量时代。",
    ["燃素说", "1789"]
  ),
  n(
    "mendeleev-periodic-law",
    "门捷列夫周期律（1869）",
    "event",
    "milestones",
    "排出周期表并成功预言未知元素。",
    ["周期律", "1869"]
  ),
  n(
    "haber-bosch-process",
    "哈伯-博施合成氨（1913）",
    "event",
    "milestones",
    "把空气中的氮变成肥料，养活数十亿人。",
    ["合成氨", "肥料"]
  ),
  n(
    "the-plastics-age",
    "塑料时代（1907）",
    "event",
    "milestones",
    "从酚醛树脂到今日无处不在的塑料与塑料危机。",
    ["塑料", "高分子"]
  ),
  ...CHEMISTRY_COVERAGE_NODES,
];

const e = (from: string, to: string, label: string): GraphEdge => ({
  source: `chemistry:${from}`,
  target: `chemistry:${to}`,
  type: "cross-reference",
  label,
});

export const CHEMISTRY_EDGES: GraphEdge[] = [
  // figures → contributions
  e("lavoisier", "lavoisier-oxygen-revolution", "完成"),
  e("lavoisier", "combustion", "正确解释"),
  e("dalton", "atomic-structure", "奠基"),
  e("mendeleev", "periodic-table", "创立"),
  e("mendeleev", "mendeleev-periodic-law", "完成"),
  e("linus-pauling", "chemical-bond", "阐明"),
  e("fritz-haber", "haber-bosch-process", "发明"),
  e("kekule", "polymers", "结构理论"),
  e("marie-curie", "atomic-structure", "揭示放射性"),
  // concept web
  e("atomic-structure", "chemical-bond", "决定"),
  e("atomic-structure", "periodic-table", "解释"),
  e("chemical-bond", "water", "氢键"),
  e("redox-reactions", "electrochemistry", "本质"),
  e("redox-reactions", "combustion", "包含"),
  e("thermochemistry", "chemical-equilibrium", "支配"),
  e("electrochemistry", "electrolysis", "应用"),
  e("acids-and-bases", "chemical-equilibrium", "电离平衡"),
  e("chemical-equilibrium", "precipitation-reactions", "溶解平衡"),
  e("acids-and-bases", "precipitation-reactions", "控制物种分布"),
  e("precipitation-reactions", "electrochemistry", "共享溶液物种控制"),
  // substances ↔ reactions
  e("catalysts", "catalysis-reaction", "实现"),
  e("reaction-mechanisms", "catalysts", "定位势垒与活性位"),
  e("catalysts", "electron-microscopy-and-surface-analysis", "测量位点结构与失活"),
  e("catalysis-reaction", "process-scale-up", "耦合动力学与传递"),
  e("catalysis-reaction", "process-safety", "约束热点与失控路径"),
  e("polymers", "polymerization", "由其生成"),
  e("metals-and-alloys", "electrolysis", "冶炼"),
  e("electrolysis", "process-scale-up", "依赖传质传热放大"),
  e("reaction-mechanisms", "grignard-reaction", "解释极性与副反应"),
  e("grignard-reaction", "organic-synthesis", "构筑碳碳键"),
  e("organic-synthesis", "polymerization", "扩展为链增长设计"),
  e("polymerization", "polymer-chemistry", "控制链结构与分布"),
  e("polymers", "electron-microscopy-and-surface-analysis", "表征形态与界面"),
  e("electron-microscopy-and-surface-analysis", "process-scale-up", "验证放大后材料结构"),
  e("haber-bosch-process", "catalysis-reaction", "依赖催化"),
  e("the-plastics-age", "polymers", "造就"),
  e("carbon-allotropes", "semiconductors-materials", "材料家族"),

  // ── cross-domain bridges (verified existing node ids) ──
  {
    source: "chemistry:thermochemistry",
    target: "physics:热力学--熵与时间之箭",
    type: "domain-link",
    label: "化学热力学的物理根基",
  },
  {
    source: "chemistry:atomic-structure",
    target: "physics:量子物理--波粒二象性",
    type: "domain-link",
    label: "电子能级源于量子力学",
  },
  {
    source: "chemistry:electrochemistry",
    target: "physics:电磁学--法拉第与电磁感应",
    type: "domain-link",
    label: "法拉第同奠基电与化学",
  },
  {
    source: "chemistry:water",
    target: "earth-science:water-cycle",
    type: "domain-link",
    label: "水的化学性质驱动水循环",
  },
  ...CHEMISTRY_COVERAGE_EDGES,
];
