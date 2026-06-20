import type { GraphNode, GraphEdge } from "./types";

const n = (
  slug: string,
  label: string,
  type: GraphNode["type"],
  section: string,
  description: string,
  tags: string[]
): GraphNode => ({
  id: `mathematics:${slug}`,
  label,
  domain: "mathematics",
  type,
  slug,
  section,
  url: `/mathematics/${section}/${slug}`,
  tags,
  description,
});

export const MATHEMATICS_NODES: GraphNode[] = [
  n(
    "euler",
    "欧拉",
    "mathematician",
    "mathematicians",
    "历史上最多产的数学家之一，遍及分析、数论与拓扑。",
    ["分析", "数论"]
  ),
  n(
    "gauss",
    "高斯",
    "mathematician",
    "mathematicians",
    "「数学王子」，从数论到微分几何无所不及。",
    ["数论", "几何"]
  ),
  n("riemann", "黎曼", "mathematician", "mathematicians", "黎曼几何与黎曼猜想的提出者。", [
    "几何",
    "复分析",
  ]),
  n(
    "noether",
    "诺特",
    "mathematician",
    "mathematicians",
    "抽象代数奠基者，诺特定理连接对称与守恒。",
    ["代数", "对称性"]
  ),
  n(
    "hilbert",
    "希尔伯特",
    "mathematician",
    "mathematicians",
    "形式主义旗手，提出二十三个问题与希尔伯特纲领。",
    ["形式主义", "公理化"]
  ),
  n(
    "turing",
    "图灵",
    "mathematician",
    "mathematicians",
    "可计算性理论的奠基者，连接数学与计算机科学。",
    ["可计算性", "逻辑"]
  ),
  n("godel", "哥德尔", "mathematician", "mathematicians", "不完备定理的证明者，震动了数学基础。", [
    "逻辑",
    "基础",
  ]),
  n(
    "euler-identity",
    "欧拉恒等式",
    "theorem",
    "theorems",
    "把五个最重要的常数凝于一式，常被誉为最美公式。",
    ["复分析", "常数"]
  ),
  n(
    "godel-incompleteness",
    "哥德尔不完备定理",
    "theorem",
    "theorems",
    "任何足够强的形式系统都有无法证明的真命题。",
    ["逻辑", "基础"]
  ),
  n("noethers-theorem", "诺特定理", "theorem", "theorems", "每一种连续对称性都对应一条守恒律。", [
    "对称性",
    "守恒律",
  ]),
  n("pythagorean-theorem", "勾股定理", "theorem", "theorems", "最古老也最著名的几何定理。", [
    "几何",
    "毕达哥拉斯",
  ]),
  n("riemann-hypothesis", "黎曼猜想", "theorem", "theorems", "关于素数分布的百万美元难题。", [
    "数论",
    "素数",
  ]),
  // ── core concepts (real /mathematics/concepts/* articles) ──
  n("set-theory", "集合论", "concept", "concepts", "现代数学的通用语言与公理化地基。", [
    "基础",
    "无穷",
  ]),
  n("group", "群论", "concept", "concepts", "研究对称性的代数结构，贯通几何、物理与密码学。", [
    "代数",
    "对称",
  ]),
  n("number-theory", "数论", "concept", "concepts", "整数的性质与素数之谜，最纯粹也最深邃。", [
    "素数",
    "整数",
  ]),
  n("topology", "拓扑学", "concept", "concepts", "研究连续形变下不变的「橡皮几何」。", [
    "连续",
    "不变量",
  ]),
  n(
    "differential-geometry",
    "微分几何",
    "concept",
    "concepts",
    "曲率与流形的语言，广义相对论的数学骨架。",
    ["曲率", "流形"]
  ),
  n("probability", "概率论", "concept", "concepts", "量化不确定性，统计与现代科学的基石。", [
    "随机",
    "统计",
  ]),
  n(
    "linear-algebra",
    "线性代数",
    "concept",
    "concepts",
    "向量、矩阵与变换，应用最广的数学分支之一。",
    ["矩阵", "向量空间"]
  ),
  n(
    "category-theory",
    "范畴论",
    "concept",
    "concepts",
    "用对象与态射统一数学结构的「数学的数学」。",
    ["结构", "函子"]
  ),
  n("graph-theory", "图论", "concept", "concepts", "点与边的科学，网络、算法与组合的核心。", [
    "网络",
    "组合",
  ]),
  n("game-theory", "博弈论", "concept", "concepts", "理性决策的互动数学，连接经济学与生物学。", [
    "纳什均衡",
    "策略",
  ]),
  n("complexity", "计算复杂性", "concept", "concepts", "问题难度的分类，P vs NP 的舞台。", [
    "P vs NP",
    "算法",
  ]),
  n(
    "dynamical-systems",
    "动力系统",
    "concept",
    "concepts",
    "随时间演化的系统，混沌与分岔的家园。",
    ["混沌", "分岔"]
  ),
];

const e = (from: string, to: string, label: string): GraphEdge => ({
  source: `mathematics:${from}`,
  target: `mathematics:${to}`,
  type: "cross-reference",
  label,
});

export const MATHEMATICS_EDGES: GraphEdge[] = [
  e("euler", "euler-identity", "提出"),
  e("riemann", "riemann-hypothesis", "提出"),
  e("noether", "noethers-theorem", "证明"),
  e("godel", "godel-incompleteness", "证明"),
  e("hilbert", "godel-incompleteness", "纲领被它终结"),
  e("euler", "gauss", "影响"),
  e("gauss", "riemann", "影响"),
  e("turing", "godel-incompleteness", "停机问题与之呼应"),
  // cross-domain bridges (targets exist in computer-science node set)
  {
    source: "mathematics:turing",
    target: "computer-science:alan-turing",
    type: "domain-link",
    label: "可计算性",
  },
  {
    source: "mathematics:godel-incompleteness",
    target: "computer-science:computability",
    type: "domain-link",
    label: "不可判定性",
  },
  // ── concept web ──
  e("set-theory", "topology", "奠定"),
  e("set-theory", "number-theory", "支撑"),
  e("group", "number-theory", "应用于"),
  e("group", "differential-geometry", "对称性"),
  e("topology", "differential-geometry", "底层结构"),
  e("linear-algebra", "differential-geometry", "局部线性化"),
  e("probability", "dynamical-systems", "随机化"),
  e("graph-theory", "complexity", "经典难题来源"),
  e("game-theory", "probability", "依赖"),
  e("noether", "group", "奠基"),
  e("gauss", "number-theory", "深耕"),
  e("riemann", "topology", "黎曼面"),
  e("godel-incompleteness", "set-theory", "撼动其基础"),
  e("hilbert", "set-theory", "公理化"),
  e("category-theory", "topology", "抽象自"),
  // cross-domain bridges (verified targets)
  {
    source: "mathematics:game-theory",
    target: "economics:john-nash",
    type: "domain-link",
    label: "纳什均衡",
  },
  {
    source: "mathematics:complexity",
    target: "computer-science:computational-complexity",
    type: "domain-link",
    label: "P vs NP",
  },
  {
    source: "mathematics:graph-theory",
    target: "computer-science:data-structures",
    type: "domain-link",
    label: "图算法",
  },
  {
    source: "mathematics:differential-geometry",
    target: "physics:T0",
    type: "domain-link",
    label: "广义相对论的语言",
  },
];
