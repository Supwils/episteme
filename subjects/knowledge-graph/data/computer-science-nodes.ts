import type { GraphNode, GraphEdge } from "./types";

const n = (
  slug: string,
  label: string,
  type: GraphNode["type"],
  section: string,
  description: string,
  tags: string[]
): GraphNode => ({
  id: `computer-science:${slug}`,
  label,
  domain: "computer-science",
  type,
  slug,
  section,
  url: `/computer-science/${section}/${slug}`,
  tags,
  description,
});

export const COMPUTER_SCIENCE_NODES: GraphNode[] = [
  n("alan-turing", "艾伦·图灵", "pioneer", "pioneers", "图灵机与可计算性的奠基者，提出图灵测试。", [
    "图灵机",
    "可计算性",
    "AI",
  ]),
  n("john-von-neumann", "冯·诺伊曼", "pioneer", "pioneers", "存储程序架构与博弈论的奠基者。", [
    "存储程序",
    "博弈论",
  ]),
  n("claude-shannon", "香农", "pioneer", "pioneers", "信息论之父，用比特量化信息。", [
    "信息论",
    "熵",
  ]),
  n(
    "ada-lovelace",
    "阿达·洛夫莱斯",
    "pioneer",
    "pioneers",
    "第一位程序员，预见了通用计算的潜力。",
    ["分析机", "程序"]
  ),
  n("geoffrey-hinton", "杰弗里·辛顿", "pioneer", "pioneers", "深度学习先驱，反向传播的推广者。", [
    "深度学习",
    "反向传播",
  ]),
  n("computability", "可计算性", "theory", "theory", "停机问题与邱奇-图灵论题，计算的能力边界。", [
    "停机问题",
    "图灵机",
  ]),
  n(
    "computational-complexity",
    "计算复杂性",
    "theory",
    "theory",
    "P vs NP 与 NP-完全，问题难度的分类。",
    ["P vs NP", "NP"]
  ),
  n("information-theory", "信息论", "theory", "theory", "熵、信道容量与编码的数学理论。", [
    "熵",
    "信道容量",
  ]),
  n("abstraction", "抽象与分层", "concept", "concepts", "用分层隐藏复杂性，是计算思维的核心。", [
    "分层",
    "抽象",
  ]),
  n("recursion", "递归", "concept", "concepts", "函数调用自身，用有限描述无限。", ["递归", "归纳"]),
  n("data-structures", "数据结构", "concept", "concepts", "数组、树、图、哈希表与其复杂度。", [
    "数据结构",
    "复杂度",
  ]),
  n(
    "sorting-algorithms",
    "排序算法",
    "algorithm",
    "algorithms",
    "比较排序的 n log n 下界与各类策略。",
    ["排序", "复杂度"]
  ),
  n(
    "public-key-rsa",
    "RSA 公钥密码",
    "algorithm",
    "algorithms",
    "基于数论的公钥密码，现代安全通信的基石。",
    ["RSA", "密码学", "数论"]
  ),
  n(
    "gradient-descent-backprop",
    "梯度下降与反向传播",
    "algorithm",
    "algorithms",
    "深度学习的优化引擎。",
    ["梯度下降", "反向传播"]
  ),
];

const e = (from: string, to: string, label: string): GraphEdge => ({
  source: `computer-science:${from}`,
  target: `computer-science:${to}`,
  type: "cross-reference",
  label,
});

export const COMPUTER_SCIENCE_EDGES: GraphEdge[] = [
  e("alan-turing", "computability", "奠定"),
  e("claude-shannon", "information-theory", "创立"),
  e("geoffrey-hinton", "gradient-descent-backprop", "推广"),
  e("computability", "computational-complexity", "延伸"),
  e("recursion", "sorting-algorithms", "应用于"),
  e("data-structures", "sorting-algorithms", "支撑"),
  e("public-key-rsa", "computational-complexity", "依赖难度"),
  // cross-domain bridges (targets exist in other domains' node sets)
  {
    source: "computer-science:john-von-neumann",
    target: "economics:john-nash",
    type: "domain-link",
    label: "博弈论",
  },
];
