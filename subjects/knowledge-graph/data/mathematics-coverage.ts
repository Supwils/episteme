import type { GraphEdge, GraphNode } from "./types";

const node = (
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
  description,
  tags,
});

const edge = (source: string, target: string, label: string): GraphEdge => ({
  source: `mathematics:${source}`,
  target: `mathematics:${target}`,
  type: "cross-reference",
  label,
});

export const MATHEMATICS_COVERAGE_NODES: GraphNode[] = [
  node(
    "euclid",
    "欧几里得",
    "mathematician",
    "mathematicians",
    "以公理、定义和证明组织《几何原本》。",
    ["公理化", "几何原本"]
  ),
  node("newton", "牛顿", "mathematician", "mathematicians", "以微积分和微分方程描述运动与变化。", [
    "微积分",
    "力学",
  ]),
  node(
    "axiom",
    "公理",
    "concept",
    "concepts",
    "形式系统中被接受为起点的命题，决定可推导世界的边界。",
    ["形式系统", "数学基础"]
  ),
  node(
    "proof",
    "证明",
    "concept",
    "concepts",
    "从明确前提经有效推理建立结论，而非依赖样例或直觉。",
    ["演绎", "严谨性"]
  ),
  node(
    "statistics",
    "统计学",
    "concept",
    "concepts",
    "从有限且有噪声的数据推断总体规律与不确定性。",
    ["估计", "假设检验"]
  ),
  node(
    "bayesian-inference",
    "贝叶斯推断",
    "concept",
    "concepts",
    "用先验、似然和后验更新对未知量的概率认识。",
    ["贝叶斯", "后验"]
  ),
  node(
    "differential-equation",
    "微分方程",
    "concept",
    "concepts",
    "用变化率之间的关系表达物理、生物与社会系统的演化。",
    ["变化率", "动力模型"]
  ),
  node("optimization", "最优化", "concept", "concepts", "在约束中寻找目标函数的最佳可行解。", [
    "目标函数",
    "约束",
  ]),
  node(
    "numerical-methods",
    "数值方法",
    "concept",
    "concepts",
    "以离散近似、误差分析和迭代算法求解无法解析计算的问题。",
    ["数值误差", "迭代"]
  ),
  node(
    "fourier-analysis",
    "傅里叶分析",
    "concept",
    "concepts",
    "把复杂信号分解为频率成分，连接方程、信息与观测。",
    ["频域", "信号"]
  ),
  node(
    "information-theory",
    "信息论",
    "concept",
    "concepts",
    "用熵、互信息和信道容量量化信息与通信极限。",
    ["熵", "信道容量"]
  ),
  node(
    "control-theory",
    "控制论",
    "concept",
    "concepts",
    "利用反馈使动态系统稳定、跟踪目标并抵抗扰动。",
    ["反馈", "稳定性"]
  ),
  node(
    "combinatorics",
    "组合数学",
    "concept",
    "concepts",
    "研究离散对象的计数、构造与极值结构，为概率、算法和编码提供基础。",
    ["计数", "离散结构"]
  ),
  node(
    "complex-number",
    "复数",
    "concept",
    "concepts",
    "把实数轴扩展为复平面，使旋转、振动和多项式根能在统一代数结构中处理。",
    ["复平面", "欧拉公式"]
  ),
  node(
    "matrix",
    "矩阵",
    "concept",
    "concepts",
    "以行列组织线性变换、方程组与数据表示，是线性代数进入计算的基本载体。",
    ["线性变换", "矩阵运算"]
  ),
  node(
    "chaos-theory",
    "混沌理论",
    "concept",
    "concepts",
    "研究确定性系统对初始条件的敏感依赖，区分长期不可预测与随机性。",
    ["敏感依赖", "非线性动力学"]
  ),
  node(
    "central-limit-theorem",
    "中心极限定理",
    "theorem",
    "theorems",
    "在广泛条件下，独立随机变量之和经标准化后趋近正态分布。",
    ["正态分布", "抽样"]
  ),
  node(
    "ai-formal-proof",
    "定理形式化与 AI 证明助手",
    "concept",
    "frontier",
    "让机器检查每一步推理，并探索自动化证明与数学发现的边界。",
    ["证明助手", "形式化数学"]
  ),
];

export const MATHEMATICS_COVERAGE_EDGES: GraphEdge[] = [
  edge("euclid", "axiom", "以公理组织几何"),
  edge("axiom", "proof", "提供推理起点"),
  edge("hilbert", "axiom", "推进形式化"),
  edge("godel-incompleteness", "axiom", "揭示系统边界"),
  edge("proof", "ai-formal-proof", "转化为机器可检验对象"),
  edge("probability", "statistics", "提供不确定性语言"),
  edge("probability", "central-limit-theorem", "产生极限定律"),
  edge("central-limit-theorem", "statistics", "支撑抽样推断"),
  edge("statistics", "bayesian-inference", "推断范式"),
  edge("newton", "differential-equation", "建立变化语言"),
  edge("differential-equation", "dynamical-systems", "定义演化规则"),
  edge("differential-equation", "numerical-methods", "需要近似求解"),
  edge("fourier-analysis", "differential-equation", "频域求解"),
  edge("optimization", "numerical-methods", "依赖迭代算法"),
  edge("dynamical-systems", "control-theory", "被反馈调节"),
  edge("linear-algebra", "numerical-methods", "计算基础"),
  edge("fourier-analysis", "information-theory", "连接信号与信息"),
  edge("combinatorics", "probability", "计数构成概率空间"),
  edge("complex-number", "fourier-analysis", "复指数表示振动"),
  edge("matrix", "linear-algebra", "承载线性变换"),
  edge("chaos-theory", "dynamical-systems", "研究非线性演化"),
  {
    source: "mathematics:proof",
    target: "computer-science:lambda-calculus-type-theory",
    type: "domain-link",
    label: "命题即类型",
  },
  {
    source: "mathematics:ai-formal-proof",
    target: "computer-science:formal-methods-and-verification",
    type: "domain-link",
    label: "机器检查证明",
  },
  {
    source: "mathematics:optimization",
    target: "computer-science:gradient-descent-backprop",
    type: "domain-link",
    label: "训练即优化",
  },
  {
    source: "mathematics:information-theory",
    target: "computer-science:information-theory",
    type: "domain-link",
    label: "通信极限的数学基础",
  },
];
