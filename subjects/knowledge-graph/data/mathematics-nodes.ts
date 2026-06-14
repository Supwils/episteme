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
];
