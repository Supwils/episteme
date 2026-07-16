import type { CuratedLearningPath } from "./curated-learning-paths";

export const DOMAIN_SPINE_LEARNING_PATHS: readonly CuratedLearningPath[] = [
  {
    id: "medicine-public-health-spine",
    scope: "domain-spine",
    title: "从疫情线索到可实施的卫生决策",
    question: "人群中的疾病线索，怎样经过模型、实施与验证变成可靠行动？",
    steps: [
      {
        nodeId: "medicine:snow-cholera-broad-street",
        level: 1,
        evidenceMode: "observation",
        transition: "从病例位置与共同暴露中辨认可调查的疫情模式。",
      },
      {
        nodeId: "medicine:public-health",
        level: 2,
        evidenceMode: "observation",
        transition: "公共卫生把个体病例扩大为人群分布、预防与集体行动问题。",
      },
      {
        nodeId: "medicine:infectious-disease-modeling-surveillance",
        level: 3,
        evidenceMode: "simulation",
        transition: "监测与传播模型把病例记录转化为可比较的机制和情景。",
      },
      {
        nodeId: "medicine:implementation-science-health-policy",
        level: 4,
        evidenceMode: "comparative",
        transition: "实施科学检验有效干预能否在真实组织、资源与人群中持续运行。",
      },
      {
        nodeId: "medicine:ai-in-medical-diagnosis",
        level: 5,
        evidenceMode: "synthesis",
        transition: "医学 AI 必须综合外部验证、工作流、偏差、责任与实施证据。",
      },
    ],
  },
  {
    id: "life-science-evidence-spine",
    scope: "domain-spine",
    title: "从自然选择到细胞图谱",
    question: "生命科学怎样从可见差异走向谱系推断与单细胞前沿？",
    steps: [
      {
        nodeId: "lifescience:wallace",
        level: 1,
        evidenceMode: "observation",
        transition: "从物种地理分布与性状差异建立演化问题。",
      },
      {
        nodeId: "lifescience:natural-selection",
        level: 2,
        evidenceMode: "comparative",
        transition: "自然选择说明可遗传差异怎样改变种群组成。",
      },
      {
        nodeId: "lifescience:evo-devo",
        level: 3,
        evidenceMode: "experimental",
        transition: "演化发育生物学用基因调控与胚胎证据解释形态变化。",
      },
      {
        nodeId: "lifescience:phylogenetic-inference",
        level: 4,
        evidenceMode: "formal",
        transition: "系统发育推断用显式模型比较演化树及其不确定性。",
      },
      {
        nodeId: "lifescience:single-cell-human-cell-atlas",
        level: 5,
        evidenceMode: "synthesis",
        transition: "细胞图谱综合单细胞、空间与谱系证据重建动态生命系统。",
      },
    ],
  },
  {
    id: "philosophy-consciousness-spine",
    scope: "domain-spine",
    title: "从意识之问到竞争理论",
    question: "主观体验怎样从直觉难题推进为可比较的哲学与科学理论？",
    steps: [
      {
        nodeId: "philosophy:chalmers",
        level: 1,
        evidenceMode: "interpretation",
        transition: "从意识为何伴随主观体验这一清晰问题开始。",
      },
      {
        nodeId: "philosophy:philosophy-of-mind",
        level: 2,
        evidenceMode: "interpretation",
        transition: "心灵哲学区分心身关系、意识功能与主观体验。",
      },
      {
        nodeId: "philosophy:perception",
        level: 3,
        evidenceMode: "interpretation",
        transition: "知觉理论迫使我们区分外部对象、神经表征与感受质。",
      },
      {
        nodeId: "philosophy:marys-room",
        level: 4,
        evidenceMode: "interpretation",
        transition: "玛丽的房间以知识论证检验物理事实是否穷尽体验知识。",
      },
      {
        nodeId: "philosophy:consciousness-iit-gnw",
        level: 5,
        evidenceMode: "synthesis",
        transition: "IIT 与 GNW 的竞争要求概念分析、神经测量和可区分预测共同工作。",
      },
    ],
  },
  {
    id: "economics-macro-diagnostics-spine",
    scope: "domain-spine",
    title: "从经济体征到债务重组",
    question: "怎样从增长、物价和工作，走到国家债务与发展融资的专业判断？",
    steps: [
      {
        nodeId: "economics:economic-vitals-growth-prices-jobs",
        level: 1,
        evidenceMode: "observation",
        transition: "先从增长、物价和就业三个可观察体征辨认经济状态。",
      },
      {
        nodeId: "economics:modern-money-fiscal-deficits",
        level: 2,
        evidenceMode: "interpretation",
        transition: "再区分主权货币、财政赤字与真实资源约束。",
      },
      {
        nodeId: "economics:debt-sustainability-macro-framework",
        level: 3,
        evidenceMode: "formal",
        transition: "债务动态把利率、增长、基本余额、币种和期限写进同一框架。",
      },
      {
        nodeId: "economics:macro-diagnostics-matrix-guide",
        level: 4,
        evidenceMode: "comparative",
        transition: "诊断矩阵系统比较财政、外部账户、金融系统和政策情景。",
      },
      {
        nodeId: "economics:low-income-debt-restructuring-development-finance-2026",
        level: 5,
        evidenceMode: "synthesis",
        transition: "低收入债务国要求把重组、优惠融资、税收能力和发展目标共同决策。",
      },
    ],
  },
  {
    id: "political-science-fiscal-governance-spine",
    scope: "domain-spine",
    title: "从公共预算到民主财政规则",
    question: "共同的钱怎样经过国家能力、预算程序与央行制度获得民主约束？",
    steps: [
      {
        nodeId: "political-science:taxes-and-public-budget",
        level: 1,
        evidenceMode: "observation",
        transition: "从学校、道路和医疗的共同筹资问题进入公共预算。",
      },
      {
        nodeId: "political-science:fiscal-state",
        level: 2,
        evidenceMode: "interpretation",
        transition: "财政国家解释征税、借债、行政与政治代表如何共同形成。",
      },
      {
        nodeId: "political-science:budget-governance",
        level: 3,
        evidenceMode: "comparative",
        transition: "预算治理连接预测、授权、执行、审计与政策反馈。",
      },
      {
        nodeId: "political-science:central-bank-independence-political-economy",
        level: 4,
        evidenceMode: "comparative",
        transition: "央行独立研究授权边界、可信度、分配后果与民主问责。",
      },
      {
        nodeId: "political-science:fiscal-rules-democratic-legitimacy",
        level: 5,
        evidenceMode: "synthesis",
        transition: "财政规则前沿要在跨期约束、危机弹性和民主合法性之间权衡。",
      },
    ],
  },
  {
    id: "sociology-algorithmic-work-spine",
    scope: "domain-spine",
    title: "从组织规则到可审计算法劳动",
    question: "工作规则怎样被写入平台算法，劳动者又怎样获得证据与权力？",
    steps: [
      {
        nodeId: "sociology:max-weber-sociology",
        level: 1,
        evidenceMode: "interpretation",
        transition: "从韦伯对规则、权威与官僚组织的直观问题开始。",
      },
      {
        nodeId: "sociology:work-and-labor-organizations",
        level: 2,
        evidenceMode: "interpretation",
        transition: "劳动过程把时间、技能、监督、尊严和议价能力放进组织关系。",
      },
      {
        nodeId: "sociology:digital-platform-society",
        level: 3,
        evidenceMode: "comparative",
        transition: "平台社会解释数据、网络效应和规则基础设施怎样重组劳动。",
      },
      {
        nodeId: "sociology:experiments-and-quasi-experiments",
        level: 4,
        evidenceMode: "experimental",
        transition: "实验与准实验检验派单、评分或保障变化是否真正造成结果差异。",
      },
      {
        nodeId: "sociology:algorithmic-management-worker-power",
        level: 5,
        evidenceMode: "synthesis",
        transition: "算法管理前沿综合组织控制、技术审计、工人行动和劳动治理。",
      },
    ],
  },
];
