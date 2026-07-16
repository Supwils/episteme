import type { CuratedLearningPath } from "./curated-learning-paths";

export const LIFE_HISTORY_LEARNING_PATHS: readonly CuratedLearningPath[] = [
  {
    id: "biodiversity-risk",
    title: "从寒武纪生命到复合生态风险",
    question: "生物多样性怎样形成、崩塌，又如何在今天被监测？",
    steps: [
      {
        nodeId: "lifescience:cambrian-explosion",
        level: 1,
        evidenceMode: "observation",
        transition: "寒武纪化石展示动物身体结构在地质记录中的快速多样化。",
      },
      {
        nodeId: "lifescience:trilobite",
        level: 2,
        evidenceMode: "observation",
        transition: "三叶虫让形态、生态位与长期演化成为具体对象。",
      },
      {
        nodeId: "lifescience:end-permian",
        level: 3,
        evidenceMode: "simulation",
        transition: "二叠纪末灭绝揭示气候、海洋与食物网可能同步失稳。",
      },
      {
        nodeId: "earth-science:remote-sensing-and-gis",
        level: 4,
        evidenceMode: "observation",
        transition: "遥感与GIS把栖息地变化转化为可重复的空间证据。",
      },
      {
        nodeId: "earth-science:compound-climate-risks",
        level: 5,
        evidenceMode: "synthesis",
        transition: "复合风险研究多个气候冲击如何共同放大生态与社会损失。",
      },
    ],
  },
  {
    id: "genetics-biotechnology",
    title: "从遗传规律到基因编辑时代",
    question: "遗传信息怎样被发现、解释并转化为医学技术？",
    steps: [
      {
        nodeId: "history:event-进化论问世",
        level: 1,
        evidenceMode: "observation",
        transition: "进化论提出物种变化需要可遗传差异这一关键问题。",
      },
      {
        nodeId: "lifescience:mendel",
        level: 2,
        evidenceMode: "experimental",
        transition: "孟德尔实验从后代比例识别离散遗传规律。",
      },
      {
        nodeId: "medicine:medical-genetics-and-genomics",
        level: 3,
        evidenceMode: "comparative",
        transition: "医学基因组学连接变异、功能、疾病风险与人群差异。",
      },
      {
        nodeId: "medicine:drug-development",
        level: 4,
        evidenceMode: "experimental",
        transition: "药物研发把机制假设推进到临床前与分期人体证据。",
      },
      {
        nodeId: "history:event-基因编辑时代",
        level: 5,
        evidenceMode: "synthesis",
        transition: "基因编辑时代要求同时评估疗效、脱靶、遗传后果和治理。",
      },
    ],
  },
  {
    id: "chemical-reactions",
    title: "从酸碱现象到安全化学制造",
    question: "实验室反应怎样被理解、优化并安全放大？",
    steps: [
      {
        nodeId: "history:figure-拉瓦锡",
        level: 1,
        evidenceMode: "observation",
        transition: "拉瓦锡以精确称量让化学反应遵守物质守恒。",
      },
      {
        nodeId: "chemistry:acids-and-bases",
        level: 2,
        evidenceMode: "experimental",
        transition: "酸碱理论从日常性质进入质子转移与平衡。",
      },
      {
        nodeId: "chemistry:reaction-kinetics",
        level: 3,
        evidenceMode: "experimental",
        transition: "反应动力学研究速率、路径、温度与浓度的关系。",
      },
      {
        nodeId: "chemistry:retrosynthesis-and-reaction-optimization",
        level: 4,
        evidenceMode: "simulation",
        transition: "逆合成与优化在巨大方案空间中寻找可行路线。",
      },
      {
        nodeId: "chemistry:process-safety",
        level: 5,
        evidenceMode: "synthesis",
        transition: "过程安全综合热失控、设备、人因与组织风险。",
      },
    ],
  },
  {
    id: "materials-energy",
    title: "从元素规律到下一代储能材料",
    question: "分子结构怎样跨尺度决定材料性能与能源技术？",
    steps: [
      {
        nodeId: "history:figure-门捷列夫",
        level: 1,
        evidenceMode: "observation",
        transition: "门捷列夫从元素性质的重复模式预测未知元素。",
      },
      {
        nodeId: "chemistry:polymer-chemistry",
        level: 2,
        evidenceMode: "formal",
        transition: "高分子化学连接单体结构、链构象与宏观性质。",
      },
      {
        nodeId: "chemistry:polymerization",
        level: 3,
        evidenceMode: "experimental",
        transition: "聚合反应控制分子量、支化和材料加工窗口。",
      },
      {
        nodeId: "chemistry:electron-microscopy-and-surface-analysis",
        level: 4,
        evidenceMode: "experimental",
        transition: "电子显微与表面分析检验微观结构和界面缺陷。",
      },
      {
        nodeId: "chemistry:beyond-lithium-batteries",
        level: 5,
        evidenceMode: "synthesis",
        transition: "下一代电池综合材料稳定性、资源约束、安全与规模制造。",
      },
    ],
  },
  {
    id: "historical-causation",
    title: "从古典国家到全球化因果",
    question: "历史事件怎样累积为制度能力与全球结构？",
    steps: [
      {
        nodeId: "history:era-classical",
        level: 1,
        evidenceMode: "observation",
        transition: "古典时期提供城市、帝国、法律和公民制度的可见案例。",
      },
      {
        nodeId: "history:event-罗马共和国",
        level: 2,
        evidenceMode: "interpretation",
        transition: "罗马共和国展示代表、精英竞争与制度扩张的张力。",
      },
      {
        nodeId: "political-science:state-capacity",
        level: 3,
        evidenceMode: "comparative",
        transition: "国家能力把征税、行政、暴力控制与公共服务连接起来。",
      },
      {
        nodeId: "political-science:process-tracing",
        level: 4,
        evidenceMode: "comparative",
        transition: "过程追踪以时序证据检查制度变化中的因果机制。",
      },
      {
        nodeId: "history:event-全球化",
        level: 5,
        evidenceMode: "synthesis",
        transition: "全球化研究综合国家、资本、迁移、技术与文化网络。",
      },
    ],
  },
  {
    id: "global-exchange",
    title: "从丝绸之路到全球金融危机",
    question: "跨境交换怎样创造繁荣，也怎样传播权力与危机？",
    steps: [
      {
        nodeId: "history:event-丝绸之路",
        level: 1,
        evidenceMode: "observation",
        transition: "丝绸之路展示商品、技术、宗教和疾病共同流动。",
      },
      {
        nodeId: "economics:comparative-advantage",
        level: 2,
        evidenceMode: "formal",
        transition: "比较优势解释相对成本差异如何产生贸易收益。",
      },
      {
        nodeId: "history:event-大航海时代",
        level: 3,
        evidenceMode: "interpretation",
        transition: "远洋扩张把贸易、殖民、强制劳动与生态交换连在一起。",
      },
      {
        nodeId: "political-science:trade-politics-and-wto",
        level: 4,
        evidenceMode: "comparative",
        transition: "贸易政治研究国内联盟、规则谈判与国际组织。",
      },
      {
        nodeId: "history:event-全球金融危机",
        level: 5,
        evidenceMode: "synthesis",
        transition: "全球金融危机连接杠杆、监管、跨境传染与政治反应。",
      },
    ],
  },
];
