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
  // ── more pioneers ──
  n(
    "edsger-dijkstra",
    "迪杰斯特拉",
    "pioneer",
    "pioneers",
    "结构化编程、最短路径算法与并发原语。",
    ["算法", "结构化编程"]
  ),
  n("donald-knuth", "高德纳", "pioneer", "pioneers", "《计算机程序设计艺术》与算法分析的奠基者。", [
    "算法分析",
    "TAOCP",
  ]),
  n("dennis-ritchie", "丹尼斯·里奇", "pioneer", "pioneers", "C 语言与 Unix 的共同创造者。", [
    "C 语言",
    "Unix",
  ]),
  n("tim-berners-lee", "蒂姆·伯纳斯-李", "pioneer", "pioneers", "万维网、HTTP 与 HTML 的发明者。", [
    "万维网",
    "HTTP",
  ]),
  n("grace-hopper", "格蕾丝·霍珀", "pioneer", "pioneers", "编译器先驱，推动了高级语言与 COBOL。", [
    "编译器",
    "COBOL",
  ]),
  // ── more concepts ──
  n(
    "operating-systems",
    "操作系统",
    "concept",
    "concepts",
    "管理硬件与进程的软件层，计算的基础设施。",
    ["进程", "内核"]
  ),
  n(
    "distributed-systems",
    "分布式系统",
    "concept",
    "concepts",
    "多机协作的系统，CAP 与一致性的舞台。",
    ["CAP", "一致性"]
  ),
  n(
    "databases-transactions",
    "数据库与事务",
    "concept",
    "concepts",
    "ACID、并发控制与持久化的工程。",
    ["ACID", "事务"]
  ),
  n(
    "machine-learning-overview",
    "机器学习",
    "concept",
    "concepts",
    "从数据中学习规律，现代 AI 的引擎。",
    ["机器学习", "AI"]
  ),
  n(
    "consensus-algorithms",
    "分布式共识",
    "concept",
    "concepts",
    "Paxos/Raft：在不可靠网络里让多机达成一致。",
    ["Paxos", "Raft", "FLP"]
  ),
  // ── more theory ──
  n(
    "cryptography-foundations",
    "密码学基础",
    "theory",
    "theory",
    "对称/非对称加密、哈希与零知识的数学根基。",
    ["加密", "哈希"]
  ),
  n(
    "lambda-calculus-type-theory",
    "λ 演算与类型论",
    "theory",
    "theory",
    "函数式计算的数学根基，连接逻辑与编程语言。",
    ["λ演算", "类型论"]
  ),
  n("pagerank", "PageRank", "algorithm", "algorithms", "用链接结构给网页排序，谷歌的起家算法。", [
    "排序",
    "图算法",
  ]),
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
  // new node web
  e("dennis-ritchie", "operating-systems", "Unix 奠基"),
  e("edsger-dijkstra", "operating-systems", "并发原语"),
  e("operating-systems", "distributed-systems", "扩展为"),
  e("distributed-systems", "consensus-algorithms", "核心难题"),
  e("distributed-systems", "databases-transactions", "一致性挑战"),
  e("databases-transactions", "data-structures", "依赖 B 树"),
  e("geoffrey-hinton", "machine-learning-overview", "推动"),
  e("machine-learning-overview", "gradient-descent-backprop", "依赖"),
  e("cryptography-foundations", "public-key-rsa", "支撑"),
  e("cryptography-foundations", "computational-complexity", "依赖难度"),
  e("lambda-calculus-type-theory", "computability", "等价刻画"),
  e("tim-berners-lee", "pagerank", "Web 催生"),
  e("donald-knuth", "sorting-algorithms", "分析"),
  // cross-domain bridges (targets exist in other domains' node sets)
  {
    source: "computer-science:john-von-neumann",
    target: "economics:john-nash",
    type: "domain-link",
    label: "博弈论",
  },
  {
    source: "computer-science:lambda-calculus-type-theory",
    target: "mathematics:godel-incompleteness",
    type: "domain-link",
    label: "可计算性与逻辑",
  },
  {
    source: "computer-science:cryptography-foundations",
    target: "mathematics:number-theory",
    type: "domain-link",
    label: "数论的应用",
  },
];
