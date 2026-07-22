import type { ThoughtTour } from "./thought-tours";

const ION_SEPARATION_TOUR: ThoughtTour = {
  id: "from-ion-equilibrium-to-safe-separation",
  title: "从离子平衡到安全分离",
  subtitle: "物种分布如何决定沉淀与电解，又如何进入可测量、可放大的工业过程",
  waypoints: [
    "chemistry:acids-and-bases",
    "chemistry:chemical-equilibrium",
    "chemistry:precipitation-reactions",
    "chemistry:electrochemistry",
    "chemistry:electrolysis",
    "chemistry:process-scale-up",
    "chemistry:process-safety",
    "chemistry:green-chemistry",
  ],
  steps: [
    {
      nodeId: "chemistry:acids-and-bases",
      title: "先确认溶液里真正存在的物种",
      summary: "pH 改变质子化、络合与自由离子比例，因此同一总浓度可以对应完全不同的反应性。",
      focus: "物种分布",
    },
    {
      nodeId: "chemistry:chemical-equilibrium",
      title: "平衡常数给出方向而非速度",
      summary: "活度、离子强度和耦合平衡共同决定体系离饱和或电极平衡还有多远，浓度本身不是充分判据。",
      focus: "热力学边界",
    },
    {
      nodeId: "chemistry:precipitation-reactions",
      title: "过饱和要穿过成核门槛",
      summary: "Qsp 超过 Ksp 只说明形成固体在热力学上有利，颗粒大小、纯度与可滤性还由成核生长控制。",
      focus: "固相分离",
    },
    {
      nodeId: "chemistry:electrochemistry",
      title: "电势把物种选择变成电子选择",
      summary: "电极电势、界面动力学和传质决定电子流向哪个竞争反应，离子到达电极不等于必然放电。",
      focus: "界面反应",
    },
    {
      nodeId: "chemistry:electrolysis",
      title: "法拉第效率闭合电子账",
      summary: "电量给出理论产量，产物分析与法拉第效率揭示副反应；槽电压则把热力学、过电位和电阻损失相加。",
      focus: "物料与能量",
    },
    {
      nodeId: "chemistry:process-scale-up",
      title: "放大改变混合、传质与散热",
      summary: "烧杯中的均匀条件不会按体积自动复制，局部 pH、电流分布、气泡和晶体停留时间都需要工程控制。",
      focus: "操作窗口",
    },
    {
      nodeId: "chemistry:process-safety",
      title: "偏差情景定义真实边界",
      summary: "失冷、误加料、膜破损、气体交叉和污泥累积必须进入监测、联锁与泄放设计。",
      focus: "失败路径",
    },
    {
      nodeId: "chemistry:green-chemistry",
      title: "污染物转相不等于风险消失",
      summary: "绿色评价要同时计算电力、药剂、产品纯化、污泥和设备寿命，避免只优化反应器中的单一指标。",
      focus: "生命周期",
    },
  ],
};

const CARBON_TO_POLYMER_TOUR: ThoughtTour = {
  id: "from-carbon-bond-to-polymer-performance",
  title: "从碳碳键到聚合物性能",
  subtitle: "单步成键如何扩展为链结构、材料形态、表征证据与工业质量窗口",
  waypoints: [
    "chemistry:reaction-mechanisms",
    "chemistry:grignard-reaction",
    "chemistry:organic-synthesis",
    "chemistry:polymerization",
    "chemistry:polymer-chemistry",
    "chemistry:polymers",
    "chemistry:electron-microscopy-and-surface-analysis",
    "chemistry:process-scale-up",
    "chemistry:process-safety",
  ],
  steps: [
    {
      nodeId: "chemistry:reaction-mechanisms",
      title: "电子移动提出可检验预测",
      summary: "亲核、亲电、酸碱与单电子路径决定成键机会，机理价值在于能预言速率、选择性和副产物。",
      focus: "反应模型",
    },
    {
      nodeId: "chemistry:grignard-reaction",
      title: "极性匹配构筑新的碳碳键",
      summary: "有机镁物种把碳变成强亲核中心，但聚集平衡、官能团兼容与延迟引发限制其真实表现。",
      focus: "碳骨架构筑",
    },
    {
      nodeId: "chemistry:organic-synthesis",
      title: "单步反应进入完整路线",
      summary: "逆合成、保护策略、杂质控制和后处理共同决定一个漂亮反应是否适合目标分子的供应。",
      focus: "路线选择",
    },
    {
      nodeId: "chemistry:polymerization",
      title: "重复成键产生链长分布",
      summary: "链增长或逐步增长把单体变成统计分布，转化率、终止、支化和放热会共同塑造产品。",
      focus: "链生成",
    },
    {
      nodeId: "chemistry:polymer-chemistry",
      title: "结构变量跨越多个尺度",
      summary: "摩尔质量分布、立构、拓扑、结晶和相分离连接分子化学与材料行为，单一重复单元不足以预测性能。",
      focus: "结构-性能",
    },
    {
      nodeId: "chemistry:polymers",
      title: "配方与加工历史进入制品",
      summary: "添加剂、取向、冷却与老化让同一树脂形成不同材料；可熔融也不等于现实中必然可循环。",
      focus: "材料系统",
    },
    {
      nodeId: "chemistry:electron-microscopy-and-surface-analysis",
      title: "局部图像要和整体测试互证",
      summary: "显微形貌和表面化学能定位界面与失效起点，但必须与热分析、流变和力学数据共同解释。",
      focus: "多尺度证据",
    },
    {
      nodeId: "chemistry:process-scale-up",
      title: "树脂、配方与成型协同放大",
      summary: "混合、传热、剪切和停留时间决定摩尔质量、取向与晶体，烧瓶产率不能代表制品质量。",
      focus: "制造窗口",
    },
    {
      nodeId: "chemistry:process-safety",
      title: "聚合放热与格氏引发都要防积累",
      summary: "反应量热、受控加料、失冷分析和独立保护层把机理知识转化为可运行的工业边界。",
      focus: "可控生产",
    },
  ],
};

const KINETICS_TO_GREEN_PROCESS_TOUR: ThoughtTour = {
  id: "from-rate-data-to-defensible-green-process",
  title: "从速率数据到可辩护绿色工艺",
  subtitle: "怎样把热力学边界、动力学推断、催化位点、操作态证据、放大与全流程指标连成一条判断链",
  waypoints: [
    "chemistry:chemical-thermodynamics",
    "chemistry:reaction-kinetics",
    "chemistry:reaction-mechanisms",
    "chemistry:catalysts",
    "chemistry:catalysis-reaction",
    "chemistry:electron-microscopy-and-surface-analysis",
    "chemistry:process-scale-up",
    "chemistry:process-safety",
    "chemistry:green-chemistry",
  ],
  steps: [
    {
      nodeId: "chemistry:chemical-thermodynamics",
      title: "先划清驱动力与平衡边界",
      summary:
        "自由能和化学势判断给定条件下的方向与平衡，但不提供时间表；能量耦合也必须明确由谁输入。",
      focus: "热力学许可",
    },
    {
      nodeId: "chemistry:reaction-kinetics",
      title: "把时间序列变成可检验速率模型",
      summary:
        "速率方程、反应级数与活化参数应由校准数据识别，并排除仪器响应、混合、传质和传热造成的表观规律。",
      focus: "动力学证据",
    },
    {
      nodeId: "chemistry:reaction-mechanisms",
      title: "用多类证据约束候选路径",
      summary:
        "级数、同位素效应、中间体、扰动实验和质量守恒共同筛选机理；单一拟合或单个计算势垒不能证明唯一答案。",
      focus: "机理辨识",
    },
    {
      nodeId: "chemistry:catalysts",
      title: "区分配方、候选位点与工作位点",
      summary:
        "活性相、载体、助剂和孔结构共同形成动态材料；反应前结构不一定等于操作条件下真正承担周转的状态。",
      focus: "活性材料",
    },
    {
      nodeId: "chemistry:catalysis-reaction",
      title: "同时比较活性、选择性与寿命",
      summary:
        "TOF 依赖条件与位点计数，TON 反映累计寿命；转化率必须与选择性、产物谱和完整质量衡算配对。",
      focus: "催化循环",
    },
    {
      nodeId: "chemistry:electron-microscopy-and-surface-analysis",
      title: "让局部结构与整体反应互证",
      summary:
        "显微、XPS、XAS和吸附探针从不同尺度观察颗粒与化学态，操作态数据还要与速率和位点滴定共同解释。",
      focus: "操作态表征",
    },
    {
      nodeId: "chemistry:process-scale-up",
      title: "把本征速率放进真实反应器",
      summary:
        "颗粒尺寸、孔内扩散、混合、压降、停留时间和热交换决定实验室催化活性是否能转化为单位设备生产率。",
      focus: "反应器放大",
    },
    {
      nodeId: "chemistry:process-safety",
      title: "用偏差情景检查操作窗口",
      summary:
        "热点、失冷、原料积累、催化剂失活和误加料会重写速率与选择性，必须进入量热、联锁、泄放和独立保护层。",
      focus: "失败路径",
    },
    {
      nodeId: "chemistry:green-chemistry",
      title: "在共同边界内比较真实方案",
      summary:
        "产率、原子经济性、PMI、危害、能耗和生命周期各回答不同问题；只有统一功能单位和系统边界，绿色结论才可复核。",
      focus: "多维绿色指标",
    },
  ],
};

export const CHEMISTRY_TRANSFORMATION_TOURS: ThoughtTour[] = [
  ION_SEPARATION_TOUR,
  CARBON_TO_POLYMER_TOUR,
  KINETICS_TO_GREEN_PROCESS_TOUR,
];
