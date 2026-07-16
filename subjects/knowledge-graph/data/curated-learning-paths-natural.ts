import type { CuratedLearningPath } from "./curated-learning-paths";

export const NATURAL_SCIENCE_LEARNING_PATHS: readonly CuratedLearningPath[] = [
  {
    id: "mechanics-symmetry",
    title: "从运动直觉到对称性定律",
    question: "物体为什么这样运动，更深层的守恒规律从何而来？",
    steps: [
      {
        nodeId: "history:event-牛顿力学",
        level: 1,
        evidenceMode: "observation",
        transition: "牛顿力学把日常运动与天体运动放进同一问题。",
      },
      {
        nodeId: "physics:经典物理--牛顿三大定律",
        level: 2,
        evidenceMode: "formal",
        transition: "运动定律用力、质量和加速度建立可计算关系。",
      },
      {
        nodeId: "mathematics:differential-equation",
        level: 3,
        evidenceMode: "formal",
        transition: "微分方程描述系统状态如何随时间连续变化。",
      },
      {
        nodeId: "physics:经典物理--lagrangian-hamiltonian-mechanics",
        level: 4,
        evidenceMode: "formal",
        transition: "分析力学用作用量和状态空间统一不同运动系统。",
      },
      {
        nodeId: "mathematics:noethers-theorem",
        level: 5,
        evidenceMode: "synthesis",
        transition: "诺特定理揭示每一种连续对称性都对应一种守恒量。",
      },
    ],
  },
  {
    id: "electromagnetism-information",
    title: "从电磁实验到信息世界",
    question: "电、磁、波和通信为什么能由同一套结构解释？",
    steps: [
      {
        nodeId: "history:figure-法拉第",
        level: 1,
        evidenceMode: "observation",
        transition: "法拉第从线圈、磁铁和电流的实验现象开始追问。",
      },
      {
        nodeId: "physics:电磁学--法拉第与电磁感应",
        level: 2,
        evidenceMode: "experimental",
        transition: "电磁感应说明变化的磁场能够产生电场。",
      },
      {
        nodeId: "physics:电磁学--麦克斯韦方程组",
        level: 3,
        evidenceMode: "formal",
        transition: "麦克斯韦方程组统一电场、磁场与电磁波。",
      },
      {
        nodeId: "mathematics:fourier-analysis",
        level: 4,
        evidenceMode: "formal",
        transition: "傅里叶分析把复杂信号分解为可测量的频率成分。",
      },
      {
        nodeId: "computer-science:information-theory",
        level: 5,
        evidenceMode: "synthesis",
        transition: "信息论给出编码、压缩与可靠通信的根本边界。",
      },
    ],
  },
  {
    id: "quantum-materials",
    title: "从元素分类到量子材料",
    question: "原子的量子规律怎样决定材料可被设计的性质？",
    steps: [
      {
        nodeId: "history:figure-居里夫人",
        level: 1,
        evidenceMode: "observation",
        transition: "放射性研究表明原子并不是不可改变的最小实体。",
      },
      {
        nodeId: "chemistry:periodic-table",
        level: 2,
        evidenceMode: "comparative",
        transition: "周期表把元素性质组织为可预测的重复模式。",
      },
      {
        nodeId: "physics:量子物理--波粒二象性",
        level: 3,
        evidenceMode: "experimental",
        transition: "波粒二象性迫使经典直觉让位于量子状态描述。",
      },
      {
        nodeId: "chemistry:quantum-chemistry",
        level: 4,
        evidenceMode: "simulation",
        transition: "量子化学从电子结构计算分子成键与反应性质。",
      },
      {
        nodeId: "chemistry:computational-materials-design",
        level: 5,
        evidenceMode: "synthesis",
        transition: "计算材料设计结合量子模型、数据与实验筛选新材料。",
      },
    ],
  },
  {
    id: "cosmic-origins",
    title: "从可见宇宙到哈勃张力",
    question: "宇宙从何而来，我们如何知道早期宇宙发生过什么？",
    steps: [
      {
        nodeId: "physics:T0",
        level: 1,
        evidenceMode: "observation",
        transition: "先建立可见宇宙、光行时间与观测边界的尺度感。",
      },
      {
        nodeId: "cosmology:大爆炸理论",
        level: 2,
        evidenceMode: "interpretation",
        transition: "大爆炸模型用膨胀宇宙解释共同的早期热历史。",
      },
      {
        nodeId: "cosmology:cosmic-inflation",
        level: 3,
        evidenceMode: "simulation",
        transition: "暴胀解释宇宙为何近乎平坦、均匀又存在微小涨落。",
      },
      {
        nodeId: "cosmology:宇宙微波背景",
        level: 4,
        evidenceMode: "observation",
        transition: "微波背景把早期涨落留下为可做精密统计的天空图。",
      },
      {
        nodeId: "cosmology:宇宙学基础--哈勃张力",
        level: 5,
        evidenceMode: "synthesis",
        transition: "哈勃张力检验早期与晚期宇宙测量是否需要新物理。",
      },
    ],
  },
  {
    id: "cosmic-structure",
    title: "从银河系到暗宇宙",
    question: "微小密度涨落怎样长成恒星、星系和宇宙网络？",
    steps: [
      {
        nodeId: "physics:T4",
        level: 1,
        evidenceMode: "observation",
        transition: "从银河系的恒星、气体和旋转结构建立局部图景。",
      },
      {
        nodeId: "cosmology:恒星核合成",
        level: 2,
        evidenceMode: "simulation",
        transition: "恒星核合成说明可见物质的元素如何在恒星中形成。",
      },
      {
        nodeId: "cosmology:星系形成与演化",
        level: 3,
        evidenceMode: "simulation",
        transition: "星系演化连接气体冷却、恒星形成、反馈与并合。",
      },
      {
        nodeId: "cosmology:宇宙大尺度结构",
        level: 4,
        evidenceMode: "simulation",
        transition: "大尺度结构用统计与模拟比较宇宙网络的形成。",
      },
      {
        nodeId: "cosmology:暗物质与暗能量",
        level: 5,
        evidenceMode: "synthesis",
        transition: "暗物质与暗能量研究综合引力证据、结构增长和宇宙膨胀。",
      },
    ],
  },
  {
    id: "origins-astrobiology",
    title: "从生命起源到系外生命搜寻",
    question: "非生命化学如何形成生命，我们又该在宇宙何处寻找它？",
    steps: [
      {
        nodeId: "lifescience:origin-of-life",
        level: 1,
        evidenceMode: "observation",
        transition: "生命起源把复制、代谢与边界如何出现作为基本问题。",
      },
      {
        nodeId: "chemistry:chemical-thermodynamics",
        level: 2,
        evidenceMode: "formal",
        transition: "化学热力学约束反应能否自发发生以及能量如何耦合。",
      },
      {
        nodeId: "chemistry:enzymatic-catalysis",
        level: 3,
        evidenceMode: "experimental",
        transition: "酶催化说明生命如何选择性加速复杂反应网络。",
      },
      {
        nodeId: "medicine:microbiome-and-health",
        level: 4,
        evidenceMode: "synthesis",
        transition: "微生物组揭示生命系统由群落互作而非孤立个体构成。",
      },
      {
        nodeId: "cosmology:系外行星探测",
        level: 5,
        evidenceMode: "synthesis",
        transition: "系外行星研究综合光谱、行星环境和生命标志物假设。",
      },
    ],
  },
];
