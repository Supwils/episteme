export const PHYSICS_EXPERIMENTS = [
  { id: "miller-urey", title: "米勒-尤里实验", subtitle: "生命起源的化学基础", year: "1953", field: "化学 / 生物学", description: "在模拟原始地球条件下，无机物可以自发形成有机分子（氨基酸），为生命起源的化学进化论提供了实验依据。" },
  { id: "double-slit", title: "双缝实验", subtitle: "量子力学的核心实验", year: "1801", field: "量子力学", description: "单个粒子同时穿过两个缝产生干涉 pattern，但一旦观测，pattern 消失。观测行为本身改变了结果。" },
  { id: "galileos-ramp", title: "伽利略斜面实验", subtitle: "运动学的开端", year: "1604", field: "经典力学", description: "球滚过的距离与时间的平方成正比（d ∝ t²），证明匀加速运动的存在，为牛顿运动定律奠基。" },
  { id: "rutherford", title: "卢瑟福散射实验", subtitle: "发现原子核", year: "1911", field: "原子物理", description: "绝大多数α粒子穿过金箔，极少数被大角度反弹，证明原子内部大部分是空的，正电荷集中在极小的原子核中。" },
  { id: "cavendish", title: "卡文迪什扭秤实验", subtitle: "称量地球", year: "1798", field: "引力物理", description: "通过精密的扭秤测量两个已知质量之间的引力，首次计算出万有引力常数 G。" },
  { id: "michelson-morley", title: "迈克尔逊-莫雷实验", subtitle: "以太不存在", year: "1887", field: "光学 / 相对论", description: "试图检测地球相对于以太的运动，结果为零，为爱因斯坦狭义相对论铺平道路。" },
  { id: "stern-gerlach", title: "施特恩-格拉赫实验", subtitle: "空间量子化", year: "1922", field: "量子力学", description: "银原子束通过不均匀磁场后分裂为两束，证明角动量的空间量子化和电子自旋的存在。" },
  { id: "ligo", title: "LIGO 引力波探测", subtitle: "时空的涟漪", year: "2015", field: "引力物理 / 天体物理", description: "首次直接探测到两个黑洞合并产生的引力波，验证了爱因斯坦广义相对论的最后一个重要预言。" },
] as const;
