export const PHYSICS_EXPERIMENTS = [
  {
    id: "miller-urey",
    title: "米勒-尤里实验",
    subtitle: "生命起源的化学基础",
    year: "1953",
    field: "化学 / 生物学",
    description:
      "1953年论文报告：甲烷、氨、氢气和水蒸气的还原性气体模型，在加热与电放电供能下可非生物合成氨基酸；实验没有制造生命。",
  },
  {
    id: "double-slit",
    title: "双缝实验",
    subtitle: "从经典干涉到单粒子统计",
    year: "1801",
    field: "量子力学",
    description:
      "19世纪初杨研究经典光干涉；20世纪单粒子实验显示，相干路径可形成干涉，完全可区分的路径标记会消除两路交叉项，不依赖有人阅读记录。",
  },
  {
    id: "galileos-ramp",
    title: "伽利略斜面实验",
    subtitle: "运动学的开端",
    year: "1638（著作叙述）",
    field: "经典力学",
    description:
      "从静止出发的理想匀加速运动满足s ∝ t²。伽利略1638年著作叙述斜面与水钟实验；本页用实心球纯滚动模型比较距离和时间。",
  },
  {
    id: "rutherford",
    title: "卢瑟福散射实验",
    subtitle: "发现原子核",
    year: "1911",
    field: "原子物理",
    description:
      "盖革与马斯登1909年报告α粒子的大角度散射；卢瑟福1911年以集中的核电荷解释散射，建立原子核模型。",
  },
  {
    id: "cavendish",
    title: "卡文迪什扭秤实验",
    subtitle: "称量地球",
    year: "1798",
    field: "引力物理",
    description:
      "利用扭秤比较实验室质量产生的引力与地球引力，报告地球平均密度；这些测量也可换算为万有引力常数 G。",
  },
  {
    id: "michelson-morley",
    title: "迈克尔逊-莫雷实验",
    subtitle: "对以太漂移的近零约束",
    year: "1887",
    field: "光学 / 相对论",
    description:
      "未检出简单静止以太模型预期的旋转条纹位移；近零结果约束模型假设，也可与后来的长度收缩解释相容。",
  },
  {
    id: "stern-gerlach",
    title: "施特恩-格拉赫实验",
    subtitle: "空间量子化",
    year: "1922",
    field: "量子力学",
    description:
      "银原子束经过不均匀磁场分成两束，显示磁矩投影的量子化；后来以电子自旋解释，1922年实验当时尚无自旋理论。",
  },
  {
    id: "ligo",
    title: "LIGO 引力波探测",
    subtitle: "时空的涟漪",
    year: "2015",
    field: "引力物理 / 天体物理",
    description:
      "2015年记录GW150914、2016年发表，首次直接探测到与双黑洞合并相符的引力波；这是对广义相对论的进一步检验。",
  },
] as const;
