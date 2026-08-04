import type { GraphEdge, GraphNode } from "./types";

const node = (
  slug: string,
  label: string,
  type: GraphNode["type"],
  section: string,
  description: string,
  tags: string[],
  metadata: Pick<GraphNode, "knowledgeLevel" | "prerequisiteIds"> = {}
): GraphNode => ({
  id: `computer-science:${slug}`,
  label,
  domain: "computer-science",
  type,
  slug,
  section,
  url: `/computer-science/${section}/${slug}`,
  description,
  tags,
  ...metadata,
});

const edge = (source: string, target: string, label: string): GraphEdge => ({
  source: `computer-science:${source}`,
  target: `computer-science:${target}`,
  type: "cross-reference",
  label,
});

export const COMPUTER_SCIENCE_COVERAGE_NODES: GraphNode[] = [
  node(
    "edgar-codd",
    "埃德加·科德",
    "pioneer",
    "pioneers",
    "关系模型把数据库从物理存储细节中解放出来。",
    ["关系数据库", "关系代数"]
  ),
  node(
    "leslie-lamport",
    "莱斯利·兰波特",
    "pioneer",
    "pioneers",
    "以逻辑时钟、Paxos 与形式化规范奠定分布式计算基础。",
    ["逻辑时钟", "Paxos"]
  ),
  node(
    "computer-architecture",
    "计算机体系结构",
    "concept",
    "concepts",
    "指令、处理器、存储与 I/O 如何组成可执行计算的机器。",
    ["冯·诺伊曼架构", "指令集"]
  ),
  node(
    "compilers",
    "编译器",
    "concept",
    "concepts",
    "把高级语言变成机器执行过程，并在语义与性能之间架桥。",
    ["语法分析", "代码生成"]
  ),
  node(
    "networking-protocols",
    "网络协议栈 TCP/IP",
    "concept",
    "concepts",
    "用分层协议在异构网络中完成寻址、传输与互操作。",
    ["TCP/IP", "分层协议"]
  ),
  node(
    "computer-security-principles",
    "计算机安全原则",
    "concept",
    "concepts",
    "从威胁模型、最小权限和纵深防御建立可验证的安全边界。",
    ["威胁模型", "最小权限"]
  ),
  node(
    "encryption-basics",
    "加密协议基础",
    "concept",
    "concepts",
    "把加密、认证、完整性和密钥生命周期组合成面向具体对手的通信控制。",
    ["AEAD", "密钥交换", "TLS"],
    {
      knowledgeLevel: 3,
      prerequisiteIds: ["computer-science:computer-security-principles"],
    }
  ),
  node(
    "authentication-authorization",
    "身份验证与授权",
    "concept",
    "concepts",
    "区分身份核验、认证、授权和会话，并在对象与租户边界执行策略。",
    ["身份验证", "OAuth", "访问控制"],
    {
      knowledgeLevel: 4,
      prerequisiteIds: ["computer-science:encryption-basics"],
    }
  ),
  node(
    "software-supply-chain-security",
    "软件供应链安全",
    "concept",
    "concepts",
    "用依赖锁定、隔离构建、来源证明、SBOM、签名和透明日志保护交付链。",
    ["SBOM", "SLSA", "来源证明"],
    {
      knowledgeLevel: 5,
      prerequisiteIds: ["computer-science:authentication-authorization"],
    }
  ),
  node(
    "privacy-engineering",
    "隐私工程",
    "concept",
    "concepts",
    "从数据流、处理目的和可链接性风险出发设计最小化、匿名化与可审计控制。",
    ["数据最小化", "差分隐私", "隐私风险"],
    {
      knowledgeLevel: 5,
      prerequisiteIds: ["computer-science:formal-methods-and-verification"],
    }
  ),
  node(
    "formal-methods-and-verification",
    "形式化方法与程序验证",
    "concept",
    "concepts",
    "用逻辑规范、模型检查与证明说明系统满足关键性质。",
    ["形式化验证", "模型检查"]
  ),
  node(
    "human-computer-interaction",
    "人机交互",
    "concept",
    "concepts",
    "研究人、界面与社会情境如何共同决定技术是否真正可用。",
    ["可用性", "交互设计"]
  ),
  node(
    "dynamic-programming",
    "动态规划",
    "algorithm",
    "algorithms",
    "把重叠子问题的答案保存下来，以状态和转移重组复杂问题。",
    ["最优子结构", "状态转移"]
  ),
  node(
    "a-star-search",
    "A* 搜索",
    "algorithm",
    "algorithms",
    "用启发式估计引导最短路径搜索，在最优性与搜索代价之间建立可验证条件。",
    ["启发式搜索", "最短路径"]
  ),
  node(
    "graph-traversal",
    "图遍历：BFS 与 DFS",
    "algorithm",
    "algorithms",
    "以广度优先或深度优先系统访问图结构，是路径、连通性和依赖分析的基本操作。",
    ["BFS", "DFS"]
  ),
  node(
    "binary-search",
    "二分查找",
    "algorithm",
    "algorithms",
    "在有序空间中每一步排除一半候选，展示前提条件如何决定对数级效率。",
    ["有序性", "对数复杂度"]
  ),
  node(
    "hashing",
    "哈希",
    "algorithm",
    "algorithms",
    "把键映射到有限地址空间，以均匀性、冲突处理和负载因子换取快速查找。",
    ["哈希表", "冲突"]
  ),
  node(
    "attention-and-transformers",
    "注意力机制与 Transformer",
    "algorithm",
    "algorithms",
    "通过注意力直接建模序列关系，成为基础模型的核心架构。",
    ["注意力", "Transformer"]
  ),
  node(
    "large-language-models",
    "大语言模型与基础模型",
    "concept",
    "frontier",
    "规模化预训练带来通用能力，也放大评测、对齐、数据与治理难题。",
    ["大语言模型", "基础模型"]
  ),
  node(
    "ai-interpretability",
    "机制可解释性",
    "concept",
    "frontier",
    "尝试把神经网络内部表征和计算回路转化为可检验解释。",
    ["机制可解释性", "神经网络"]
  ),
  node(
    "post-quantum-cryptography",
    "后量子密码",
    "concept",
    "frontier",
    "在能破解 RSA 的机器出现之前迁移全球公钥基础设施：格密码、尺寸代价与时间表。",
    ["后量子密码", "格密码", "密码敏捷性"]
  ),
  node(
    "retrieval-augmented-generation-and-agents",
    "检索增强与智能体",
    "concept",
    "frontier",
    "把语言模型接到外部知识与工具上：检索管线、智能体控制流与复合误差。",
    ["检索增强生成", "AI 智能体", "工具调用"]
  ),
  node(
    "confidential-computing-and-tees",
    "机密计算与可信执行环境",
    "concept",
    "frontier",
    "让数据在使用中也保持隔离，并用远程证明取代对运维方的信任。",
    ["机密计算", "可信执行环境", "远程证明"]
  ),
  node(
    "neuromorphic-and-beyond-cmos-computing",
    "神经形态与后 CMOS 计算",
    "concept",
    "frontier",
    "当搬运数据比计算更贵：脉冲网络、存内计算与换材料的三条路线。",
    ["神经形态计算", "存内计算", "内存墙"]
  ),
  node(
    "statistical-learning-theory-pac",
    "统计学习理论与 PAC 学习",
    "theory",
    "theory",
    "泛化为何可能：PAC 框架、VC 维、以及深度学习带来的理论危机。",
    ["PAC 学习", "VC 维", "泛化界"],
    { knowledgeLevel: 4 }
  ),
  node(
    "online-algorithms-and-competitive-analysis",
    "在线算法与竞争分析",
    "theory",
    "theory",
    "不知道未来要付多少代价：竞争比、k-服务器问题与带预测的算法。",
    ["在线算法", "竞争比", "带预测的算法"],
    { knowledgeLevel: 4 }
  ),
  node(
    "approximate-nearest-neighbor-search",
    "近似最近邻搜索",
    "algorithm",
    "algorithms",
    "高维空间里精确最近邻退化为暴力扫描；LSH、图索引与量化各自的取舍。",
    ["近似最近邻", "向量检索", "HNSW"],
    { knowledgeLevel: 3 }
  ),
  node(
    "information-retrieval-and-search",
    "信息检索与搜索",
    "concept",
    "concepts",
    "倒排索引、BM25、召回与精排：半个世纪的检索传统在向量时代重新变得必读。",
    ["信息检索", "倒排索引", "排序"],
    { knowledgeLevel: 2 }
  ),
  node(
    "cloud-computing",
    "云计算",
    "concept",
    "concepts",
    "把基础设施交给别人所需要的信任，以及它在计费、弹性与隔离上的形态。",
    ["云计算", "弹性伸缩", "多租户"],
    { knowledgeLevel: 3 }
  ),
  node(
    "gpu-and-parallel-computing",
    "GPU 与并行计算",
    "concept",
    "concepts",
    "稠密规则计算与高内存带宽的组合，以及它在稀疏低延迟负载上的失效。",
    ["GPU", "并行计算", "内存带宽"],
    { knowledgeLevel: 3 }
  ),
  node(
    "caching-strategies",
    "缓存策略",
    "concept",
    "concepts",
    "命中率的天花板由信息缺失而非算法聪明程度决定。",
    ["缓存", "置换策略", "局部性"],
    { knowledgeLevel: 3 }
  ),
  node(
    "approximation-algorithms",
    "近似算法理论",
    "theory",
    "theory",
    "NP 难问题的可行退让：近似比、PTAS 与不可近似性。",
    ["近似比", "PTAS", "不可近似性"],
    { knowledgeLevel: 3 }
  ),
];
export const COMPUTER_SCIENCE_COVERAGE_EDGES: GraphEdge[] = [
  edge("john-von-neumann", "computer-architecture", "存储程序架构"),
  edge("computer-architecture", "operating-systems", "提供硬件抽象"),
  edge("grace-hopper", "compilers", "编译器先驱"),
  edge("lambda-calculus-type-theory", "compilers", "语言理论基础"),
  edge("compilers", "formal-methods-and-verification", "验证语义与实现"),
  edge("formal-methods-and-verification", "computer-security-principles", "证明关键安全性质"),
  edge("computer-security-principles", "cryptography-foundations", "组合安全机制"),
  edge("networking-protocols", "computer-security-principles", "暴露通信信任边界"),
  edge("cryptography-foundations", "encryption-basics", "从原语进入协议组合"),
  edge("computer-security-principles", "encryption-basics", "按威胁模型选择控制"),
  edge("encryption-basics", "authentication-authorization", "保护主体与会话"),
  edge("authentication-authorization", "software-supply-chain-security", "约束构建与发布身份"),
  edge("software-supply-chain-security", "privacy-engineering", "治理依赖与数据处理"),
  edge("privacy-engineering", "formal-methods-and-verification", "验证信息流与隐私性质"),
  edge("computer-security-principles", "distributed-systems", "扩大威胁边界"),
  edge("tim-berners-lee", "networking-protocols", "建立在互联网协议之上"),
  edge("networking-protocols", "distributed-systems", "提供通信基础"),
  edge("leslie-lamport", "distributed-systems", "奠定理论"),
  edge("leslie-lamport", "consensus-algorithms", "提出 Paxos"),
  edge("edgar-codd", "databases-transactions", "创立关系模型"),
  edge("data-structures", "dynamic-programming", "组织状态"),
  edge("sorting-algorithms", "binary-search", "有序输入支持查找"),
  edge("data-structures", "hashing", "组织键值访问"),
  edge("graph-traversal", "a-star-search", "在图上引导路径搜索"),
  edge("graph-traversal", "pagerank", "图上传播与迭代"),
  edge("hashing", "databases-transactions", "索引与键访问"),
  edge("computational-complexity", "dynamic-programming", "界定代价"),
  edge("machine-learning-overview", "attention-and-transformers", "架构演进"),
  edge("gradient-descent-backprop", "attention-and-transformers", "训练方法"),
  edge("attention-and-transformers", "large-language-models", "核心架构"),
  edge("large-language-models", "ai-interpretability", "提出解释挑战"),
  edge("human-computer-interaction", "large-language-models", "评估人与模型协作"),
  {
    source: "computer-science:formal-methods-and-verification",
    target: "mathematics:proof",
    type: "domain-link",
    label: "把证明用于程序",
  },
  {
    source: "computer-science:dynamic-programming",
    target: "mathematics:optimization",
    type: "domain-link",
    label: "离散最优化",
  },
  {
    source: "computer-science:attention-and-transformers",
    target: "mathematics:linear-algebra",
    type: "domain-link",
    label: "矩阵表示与变换",
  },
  edge("cryptography-foundations", "post-quantum-cryptography", "换掉被量子算法击穿的数学假设"),
  edge("public-key-rsa", "post-quantum-cryptography", "首要迁移对象"),
  edge("large-language-models", "retrieval-augmented-generation-and-agents", "外接知识与工具"),
  edge(
    "information-retrieval-and-search",
    "retrieval-augmented-generation-and-agents",
    "召回与精排的老传统"
  ),
  edge(
    "approximate-nearest-neighbor-search",
    "retrieval-augmented-generation-and-agents",
    "向量检索是管线地基"
  ),
  edge("hashing", "approximate-nearest-neighbor-search", "局部敏感哈希刻意制造碰撞"),
  edge("computer-security-principles", "confidential-computing-and-tees", "最小化可信计算基"),
  edge("cloud-computing", "confidential-computing-and-tees", "把信任从运维方收回硬件"),
  edge("computer-architecture", "neuromorphic-and-beyond-cmos-computing", "内存墙催生的架构转向"),
  edge(
    "gpu-and-parallel-computing",
    "neuromorphic-and-beyond-cmos-computing",
    "稠密与稀疏负载的分工"
  ),
  edge("machine-learning-overview", "statistical-learning-theory-pac", "泛化的理论基础"),
  edge("computational-complexity", "statistical-learning-theory-pac", "可学习性也是计算问题"),
  edge(
    "approximation-algorithms",
    "online-algorithms-and-competitive-analysis",
    "受限资源下的最优性度量"
  ),
  edge("caching-strategies", "online-algorithms-and-competitive-analysis", "LRU 的竞争比下界"),
  edge("data-structures", "information-retrieval-and-search", "索引结构支撑检索"),
  edge("data-structures", "approximate-nearest-neighbor-search", "高维索引的数据结构基础"),
  edge("distributed-systems", "cloud-computing", "多租户与弹性的系统基础"),
  edge("computer-architecture", "gpu-and-parallel-computing", "吞吐导向的并行架构"),
  edge("operating-systems", "caching-strategies", "内存层级与页面置换"),
  edge("computational-complexity", "approximation-algorithms", "NP 难之后的可行退让"),
  edge(
    "computational-complexity",
    "online-algorithms-and-competitive-analysis",
    "信息受限而非时间受限"
  ),
];
