import type { GraphNode, GraphEdge } from "./types";

// Physics knowledge-base article nodes. Unlike PHYSICS_NODES (the 3D scene
// tiers, which are mapped through computeUrl), these carry their own url and
// are spread directly into ALL_NODES. slug is the generic-kb form
// (子目录--文件名) so /universe-physics/knowledge-base/<slug> resolves.
const n = (slug: string, label: string, description: string, tags: string[]): GraphNode => ({
  id: `physics:${slug}`,
  label,
  domain: "physics",
  type: "concept",
  slug,
  section: "knowledge-base",
  url: `/universe-physics/knowledge-base/${slug}`,
  tags,
  description,
});

export const PHYSICS_KB_NODES: GraphNode[] = [
  // 量子物理
  n(
    "量子物理--量子纠缠",
    "量子纠缠",
    "粒子间超越距离的关联，爱因斯坦口中的「鬼魅般的超距作用」。",
    ["量子", "纠缠"]
  ),
  n("量子物理--不确定性原理", "不确定性原理", "位置与动量无法同时确定，量子世界的根本边界。", [
    "量子",
    "海森堡",
  ]),
  n("量子物理--波粒二象性", "波粒二象性", "光与物质既是波又是粒子，取决于你如何提问。", [
    "量子",
    "双缝",
  ]),
  // 相对论
  n("相对论--狭义相对论", "狭义相对论", "时间与空间随速度相对，光速是宇宙的不变天花板。", [
    "相对论",
    "时空",
  ]),
  n("相对论--广义相对论", "广义相对论", "引力不是力，而是质量弯曲了时空本身。", [
    "引力",
    "时空弯曲",
  ]),
  n("相对论--引力波", "引力波", "时空的涟漪，2015 年首次被 LIGO 直接探测到。", ["引力波", "LIGO"]),
  // 经典物理
  n("经典物理--牛顿三大定律", "牛顿三大定律", "经典力学的基石，描述力与运动的关系。", [
    "牛顿",
    "力学",
  ]),
  n(
    "经典物理--能量守恒",
    "能量守恒",
    "能量不会凭空产生或消失，只会转化——物理学最深的守恒律之一。",
    ["守恒", "能量"]
  ),
  n(
    "经典物理--lagrangian-hamiltonian-mechanics",
    "拉格朗日与哈密顿力学",
    "用作用量与能量重述力学，通往量子与场论的桥。",
    ["分析力学", "作用量"]
  ),
  // 热力学
  n("热力学--熵与时间之箭", "熵与时间之箭", "熵增定义了时间的方向，为何过去不同于未来。", [
    "熵",
    "时间之箭",
  ]),
  n("热力学--麦克斯韦妖", "麦克斯韦妖", "一个能违反热力学第二定律的小妖？信息与熵的深刻联系。", [
    "麦克斯韦妖",
    "信息熵",
  ]),
  // 电磁学
  n("电磁学--麦克斯韦方程组", "麦克斯韦方程组", "四个方程统一电、磁与光，经典物理的巅峰。", [
    "麦克斯韦",
    "电磁",
  ]),
  n(
    "电磁学--法拉第与电磁感应",
    "法拉第与电磁感应",
    "变化的磁场产生电场——发电机与现代电力的根基。",
    ["法拉第", "电磁感应"]
  ),
  // 粒子物理
  n("粒子物理--higgs-mechanism", "希格斯机制", "赋予基本粒子质量的场，2012 年在 LHC 被证实。", [
    "希格斯",
    "标准模型",
  ]),
  n("粒子物理--quarks-and-leptons", "夸克与轻子", "构成物质的基本粒子，标准模型的砖块。", [
    "夸克",
    "标准模型",
  ]),
  // 凝聚态
  n(
    "凝聚态物理--bose-einstein-condensate",
    "玻色–爱因斯坦凝聚",
    "接近绝对零度时物质进入的第五态，宏观量子现象。",
    ["BEC", "超冷原子"]
  ),
  // 前沿物理
  n(
    "前沿物理--弦理论",
    "弦理论与量子引力",
    "尝试在同一量子框架中描述粒子、相互作用与引力，并公开面对可检验性和理论景观问题。",
    ["弦理论", "量子引力", "统一理论", "可检验性"]
  ),
];

const e = (from: string, to: string, label: string): GraphEdge => ({
  source: `physics:${from}`,
  target: `physics:${to}`,
  type: "cross-reference",
  label,
});

export const PHYSICS_KB_EDGES: GraphEdge[] = [
  // intra-physics conceptual web
  e("经典物理--牛顿三大定律", "经典物理--能量守恒", "蕴含"),
  e("经典物理--牛顿三大定律", "经典物理--lagrangian-hamiltonian-mechanics", "被重述为"),
  e("相对论--狭义相对论", "相对论--广义相对论", "推广为"),
  e("相对论--广义相对论", "相对论--引力波", "预言"),
  e("量子物理--波粒二象性", "量子物理--不确定性原理", "引出"),
  e("量子物理--波粒二象性", "量子物理--量子纠缠", "量子怪异性"),
  e("电磁学--麦克斯韦方程组", "电磁学--法拉第与电磁感应", "包含"),
  e("电磁学--麦克斯韦方程组", "相对论--狭义相对论", "催生"),
  e("热力学--熵与时间之箭", "热力学--麦克斯韦妖", "被其拷问"),
  e("粒子物理--quarks-and-leptons", "粒子物理--higgs-mechanism", "获得质量"),
  e("量子物理--不确定性原理", "凝聚态物理--bose-einstein-condensate", "支配"),
  e("经典物理--lagrangian-hamiltonian-mechanics", "量子物理--波粒二象性", "通往量子"),
  e("P7", "前沿物理--弦理论", "走向量子引力边界"),

  // ── cross-domain bridges (verified existing node ids) ──
  {
    source: "physics:相对论--广义相对论",
    target: "mathematics:differential-geometry",
    type: "domain-link",
    label: "其数学语言",
  },
  {
    source: "physics:量子物理--不确定性原理",
    target: "philosophy:determinism",
    type: "domain-link",
    label: "挑战经典决定论",
  },
  {
    source: "physics:热力学--熵与时间之箭",
    target: "mathematics:probability",
    type: "domain-link",
    label: "统计力学的根基",
  },
];
