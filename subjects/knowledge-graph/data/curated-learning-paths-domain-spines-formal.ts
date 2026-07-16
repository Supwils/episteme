import type { CuratedLearningPath } from "./curated-learning-paths";

export const FORMAL_SCIENCE_DOMAIN_SPINE_PATHS: readonly CuratedLearningPath[] = [
  {
    id: "physics-unification-spine",
    scope: "domain-spine",
    title: "从测量运动到量子引力",
    question: "日常运动的可测规律，怎样一步步把我们带到时空与量子能否统一的边界？",
    steps: [
      {
        nodeId: "physics:measurement-motion-energy",
        level: 1,
        evidenceMode: "observation",
        transition: "从长度、时间、运动和能量的日常测量建立可比较的物理问题。",
      },
      {
        nodeId: "physics:P0",
        level: 2,
        evidenceMode: "formal",
        transition: "经典力学用力、运动方程和守恒量把观察压缩为可计算规律。",
      },
      {
        nodeId: "physics:P3",
        level: 3,
        evidenceMode: "formal",
        transition: "相对论重写绝对空间和时间，并把引力解释为时空几何。",
      },
      {
        nodeId: "physics:P7",
        level: 4,
        evidenceMode: "experimental",
        transition: "标准模型与量子场论把对称性、粒子碰撞和精密测量连接成可检验体系。",
      },
      {
        nodeId: "physics:前沿物理--弦理论",
        level: 5,
        evidenceMode: "synthesis",
        transition: "量子引力前沿比较统一框架、数学成果、实验边界和仍未解决的可检验性问题。",
      },
    ],
  },
  {
    id: "mathematics-prime-frontier-spine",
    scope: "domain-spine",
    title: "从数轴到黎曼猜想",
    question: "最熟悉的数怎样扩展为复杂结构，并把素数规律带到尚未证明的前沿？",
    steps: [
      {
        nodeId: "mathematics:number-line",
        level: 1,
        evidenceMode: "formal",
        transition: "从数轴上的位置、顺序和距离建立数的直观模型。",
      },
      {
        nodeId: "mathematics:number-theory",
        level: 2,
        evidenceMode: "formal",
        transition: "数论把整除、素数和同余组织成可证明的基本规律。",
      },
      {
        nodeId: "mathematics:complex-number",
        level: 3,
        evidenceMode: "formal",
        transition: "复数把数轴扩展为复平面，为研究复变量函数提供语言。",
      },
      {
        nodeId: "mathematics:numerical-methods",
        level: 4,
        evidenceMode: "experimental",
        transition: "数值方法用误差界、稳定性和计算实验检查大量具体情形。",
      },
      {
        nodeId: "mathematics:riemann-hypothesis",
        level: 5,
        evidenceMode: "synthesis",
        transition:
          "黎曼猜想连接复分析、素数分布和海量数值证据，同时提醒计算验证不能替代一般证明。",
      },
    ],
  },
  {
    id: "computer-science-learning-systems-spine",
    scope: "domain-spine",
    title: "从程序构想到基础模型",
    question: "明确指令和数据结构，怎样发展为能够从数据学习的大规模计算系统？",
    steps: [
      {
        nodeId: "computer-science:ada-lovelace",
        level: 1,
        evidenceMode: "interpretation",
        transition: "从可由机器执行的步骤出发，理解程序不只是算数，也能操作符号。",
      },
      {
        nodeId: "computer-science:data-structures",
        level: 2,
        evidenceMode: "formal",
        transition: "数据结构说明表示方式怎样决定程序能高效完成什么操作。",
      },
      {
        nodeId: "computer-science:gradient-descent-backprop",
        level: 3,
        evidenceMode: "formal",
        transition: "梯度下降与反向传播把明确目标转化为可迭代优化的学习过程。",
      },
      {
        nodeId: "computer-science:attention-and-transformers",
        level: 4,
        evidenceMode: "experimental",
        transition: "Transformer 用注意力、训练数据和基准实验建立可扩展的序列模型。",
      },
      {
        nodeId: "computer-science:large-language-models",
        level: 5,
        evidenceMode: "synthesis",
        transition: "基础模型前沿综合规模规律、能力评测、偏差、可解释性、安全与治理问题。",
      },
    ],
  },
];
