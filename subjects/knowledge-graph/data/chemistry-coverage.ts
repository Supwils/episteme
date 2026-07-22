import type { GraphEdge, GraphNode } from "./types";

const node = (
  slug: string,
  label: string,
  type: GraphNode["type"],
  section: string,
  description: string,
  tags: string[]
): GraphNode => ({
  id: `chemistry:${slug}`,
  label,
  domain: "chemistry",
  type,
  slug,
  section,
  url: `/chemistry/${section}/${slug}`,
  description,
  tags,
});

const edge = (source: string, target: string, label: string): GraphEdge => ({
  source: `chemistry:${source}`,
  target: `chemistry:${target}`,
  type: "cross-reference",
  label,
});

export const CHEMISTRY_COVERAGE_NODES: GraphNode[] = [
  node(
    "spectroscopy",
    "光谱学",
    "concept",
    "concepts",
    "利用物质与电磁辐射的相互作用读取结构、能级和组成。",
    ["光谱", "结构鉴定"]
  ),
  node(
    "chromatography",
    "色谱分离",
    "concept",
    "concepts",
    "利用组分在流动相与固定相之间分配差异实现分离。",
    ["分离", "保留时间"]
  ),
  node(
    "mass-spectrometry",
    "质谱法",
    "concept",
    "concepts",
    "把分子离子化并按质荷比分离，以识别组成和结构。",
    ["质荷比", "分子鉴定"]
  ),
  node(
    "reaction-kinetics",
    "反应速率",
    "concept",
    "concepts",
    "从时间序列识别速率方程、活化参数和受控步骤，并排除混合、传质与传热伪象。",
    ["速率方程", "活化参数", "机理推断"]
  ),
  node(
    "reaction-mechanisms",
    "有机反应机理",
    "concept",
    "concepts",
    "以电子移动和中间体解释反应物如何逐步变成产物。",
    ["电子箭头", "中间体"]
  ),
  node(
    "chirality",
    "手性与对映异构",
    "concept",
    "concepts",
    "镜像分子可拥有相同组成，却在生物系统中产生不同作用。",
    ["对映体", "立体化学"]
  ),
  node(
    "medicinal-chemistry",
    "药物化学",
    "concept",
    "concepts",
    "在活性、选择性、药代和安全性之间迭代分子设计。",
    ["构效关系", "先导优化"]
  ),
  node(
    "quantum-chemistry",
    "量子化学",
    "concept",
    "concepts",
    "以量子力学近似求解分子的电子结构、能量与反应性质。",
    ["电子结构", "分子轨道"]
  ),
  node(
    "chemical-thermodynamics",
    "化学热力学",
    "concept",
    "concepts",
    "用能量、熵、自由能和化学势判断反应与相变的方向、平衡和耦合条件。",
    ["吉布斯自由能", "化学势"]
  ),
  node(
    "bonding-theory",
    "化学键理论",
    "concept",
    "concepts",
    "以价键、分子轨道与电子结构解释原子为何结合，以及结构如何塑造反应性。",
    ["分子轨道", "键级"]
  ),
  node(
    "buffer-systems",
    "缓冲体系",
    "concept",
    "concepts",
    "弱酸碱共轭对抵抗 pH 改变，把平衡、浓度与实验控制连接起来。",
    ["pH", "弱酸弱碱"]
  ),
  node(
    "polymer-chemistry",
    "高分子化学",
    "concept",
    "concepts",
    "研究重复单元、分子量、链结构和加工条件如何共同决定材料性质与环境代价。",
    ["聚合物", "分子量"]
  ),
  node(
    "organic-synthesis",
    "有机合成",
    "reaction",
    "reactions",
    "规划成键、官能团转换和保护策略以构建目标分子。",
    ["逆合成", "选择性"]
  ),
  node(
    "enzymatic-catalysis",
    "酶催化",
    "reaction",
    "reactions",
    "生物大分子以精确结合和过渡态稳定加速反应。",
    ["酶", "过渡态"]
  ),
  node(
    "green-chemistry",
    "绿色化学（1998）",
    "event",
    "milestones",
    "以原子经济性、PMI、危害、能量和生命周期边界审查化学产品与过程。",
    ["原子经济性", "过程质量强度", "本质安全"]
  ),
  node(
    "beyond-lithium-batteries",
    "超越锂离子：可制造电池",
    "concept",
    "frontier",
    "用材料、电极、电芯、电池包和系统五层口径审查钠离子、固态、锂硫与长时储能。",
    ["储能", "电池材料", "制造验证"]
  ),
  node(
    "battery-performance-safety-and-circularity",
    "电池评价：性能、安全与循环",
    "concept",
    "concepts",
    "把容量、能量、功率、寿命、热失控、制造边界和回收质量组织成可审计证据链。",
    ["电池评价", "热失控", "生命周期", "回收"]
  ),
  node(
    "computational-materials-design",
    "计算材料设计",
    "concept",
    "frontier",
    "结合量子计算、数据库和机器学习，从候选空间预测材料性质。",
    ["材料信息学", "计算化学"]
  ),
  node(
    "nmr-spectroscopy-structure-elucidation",
    "NMR：分子结构推断",
    "concept",
    "methods",
    "用化学位移、耦合、积分和二维相关把局部核环境组织为可检验的结构假设。",
    ["NMR", "化学位移", "二维谱"]
  ),
  node(
    "x-ray-crystallography",
    "X 射线晶体学",
    "concept",
    "methods",
    "由晶体衍射强度、相位求解与精修重建电子密度和三维结构。",
    ["X 射线衍射", "晶体结构", "相位问题"]
  ),
  node(
    "electron-microscopy-and-surface-analysis",
    "电子显微与表面表征",
    "concept",
    "methods",
    "把 SEM/TEM 的局部结构与 EDS、XPS 的元素和表面化学态组合成材料证据。",
    ["SEM", "TEM", "XPS"]
  ),
  node(
    "retrosynthesis-and-reaction-optimization",
    "逆合成与反应优化",
    "concept",
    "methods",
    "以战略断键、机理、设计实验和质量属性把目标分子变成稳健路线。",
    ["逆合成", "设计实验", "选择性"]
  ),
  node(
    "process-scale-up",
    "工艺放大",
    "concept",
    "methods",
    "在传热、混合、传质、结晶与质量窗口中把烧瓶反应转为可控过程。",
    ["放大", "传热", "结晶"]
  ),
  node(
    "process-safety",
    "过程安全",
    "concept",
    "methods",
    "通过反应量热、偏差审查和本质安全设计识别热失控、超压与操作风险。",
    ["过程安全", "热失控", "HAZOP"]
  ),
];

export const CHEMISTRY_COVERAGE_EDGES: GraphEdge[] = [
  edge("atomic-structure", "spectroscopy", "能级产生光谱"),
  edge("chemical-bond", "spectroscopy", "振动与电子跃迁"),
  edge("spectroscopy", "mass-spectrometry", "互补结构证据"),
  edge("chromatography", "mass-spectrometry", "联用分析"),
  edge("reaction-kinetics", "reaction-mechanisms", "检验反应步骤"),
  edge("thermochemistry", "reaction-kinetics", "区分可行与快慢"),
  edge("catalysis-reaction", "reaction-kinetics", "降低动力学壁垒"),
  edge("reaction-mechanisms", "organic-synthesis", "指导路线设计"),
  edge("chirality", "organic-synthesis", "要求立体选择性"),
  edge("chirality", "spectroscopy", "需要立体结构证据"),
  edge("mass-spectrometry", "medicinal-chemistry", "确认候选分子"),
  edge("organic-synthesis", "medicinal-chemistry", "构建候选分子"),
  edge("chirality", "medicinal-chemistry", "决定生物选择性"),
  edge("enzymatic-catalysis", "catalysis-reaction", "生物催化"),
  edge("enzymatic-catalysis", "medicinal-chemistry", "影响代谢与靶点"),
  edge("green-chemistry", "organic-synthesis", "重构合成路线"),
  edge("green-chemistry", "catalysis-reaction", "减少能耗与废物"),
  edge("electrochemistry", "beyond-lithium-batteries", "储能原理"),
  edge("chemical-thermodynamics", "electrochemistry", "把自由能映射为电势"),
  edge("electrochemistry", "battery-performance-safety-and-circularity", "定义电压容量与效率"),
  edge(
    "battery-performance-safety-and-circularity",
    "beyond-lithium-batteries",
    "用统一边界比较候选体系"
  ),
  edge(
    "battery-performance-safety-and-circularity",
    "electron-microscopy-and-surface-analysis",
    "诊断界面与失效"
  ),
  edge(
    "electron-microscopy-and-surface-analysis",
    "process-safety",
    "把失效证据送入安全设计"
  ),
  edge("process-safety", "beyond-lithium-batteries", "约束新体系规模化"),
  edge("battery-performance-safety-and-circularity", "green-chemistry", "核算全生命周期"),
  edge("semiconductors-materials", "computational-materials-design", "材料筛选对象"),
  edge("quantum-chemistry", "computational-materials-design", "电子结构计算"),
  edge("atomic-structure", "quantum-chemistry", "量子描述"),
  edge("chemical-thermodynamics", "reaction-kinetics", "区分平衡与反应速度"),
  edge("chemical-thermodynamics", "enzymatic-catalysis", "限定反应耦合方向"),
  edge("bonding-theory", "quantum-chemistry", "从电子结构解释成键"),
  edge("bonding-theory", "chemical-bond", "解释键的形成与性质"),
  edge("buffer-systems", "acids-and-bases", "控制酸碱平衡"),
  edge("polymer-chemistry", "polymers", "连接材料结构与性质"),
  edge("polymer-chemistry", "green-chemistry", "审视材料生命周期"),
  edge("spectroscopy", "nmr-spectroscopy-structure-elucidation", "核环境结构证据"),
  edge("nmr-spectroscopy-structure-elucidation", "x-ray-crystallography", "互证三维构型"),
  edge("spectroscopy", "electron-microscopy-and-surface-analysis", "连接尺度与化学态"),
  edge("x-ray-crystallography", "electron-microscopy-and-surface-analysis", "晶相与局部结构互证"),
  edge("reaction-mechanisms", "retrosynthesis-and-reaction-optimization", "缩小条件空间"),
  edge("retrosynthesis-and-reaction-optimization", "process-scale-up", "定义稳健操作窗口"),
  edge("process-scale-up", "process-safety", "量化放大失效路径"),
  edge("process-safety", "green-chemistry", "源头减少危险"),
  {
    source: "chemistry:mass-spectrometry",
    target: "medicine:clinical-diagnosis",
    type: "domain-link",
    label: "分子诊断证据",
  },
  {
    source: "chemistry:medicinal-chemistry",
    target: "medicine:drug-development",
    type: "domain-link",
    label: "从先导分子到候选药物",
  },
  {
    source: "chemistry:enzymatic-catalysis",
    target: "medicine:pharmacology",
    type: "domain-link",
    label: "药物代谢与作用靶点",
  },
  {
    source: "chemistry:computational-materials-design",
    target: "computer-science:machine-learning-overview",
    type: "domain-link",
    label: "机器学习筛选材料",
  },
  {
    source: "chemistry:process-scale-up",
    target: "medicine:drug-development",
    type: "domain-link",
    label: "供应临床与商业批次",
  },
  {
    source: "chemistry:process-safety",
    target: "medicine:environmental-occupational-health",
    type: "domain-link",
    label: "保护工人与社区",
  },
  {
    source: "chemistry:beyond-lithium-batteries",
    target: "earth-science:mineral-resources-and-critical-metals",
    type: "domain-link",
    label: "技术替代重排矿产需求",
  },
  {
    source: "chemistry:battery-performance-safety-and-circularity",
    target: "earth-science:mineral-resources-and-critical-metals",
    type: "domain-link",
    label: "生命周期追溯原料与回收",
  },
  {
    source: "earth-science:mineral-resources-and-critical-metals",
    target: "economics:commodity-exporters-macro-diagnosis-2026",
    type: "domain-link",
    label: "矿产需求进入资源经济周期",
  },
  {
    source: "economics:commodity-exporters-macro-diagnosis-2026",
    target: "chemistry:green-chemistry",
    type: "domain-link",
    label: "资源收益接受生命周期约束",
  },
];
