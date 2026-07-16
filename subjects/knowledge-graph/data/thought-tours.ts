// Curated cross-domain "思想之线" (thought lines): each tour is an ordered list
// of waypoint node ids. At runtime the path-finder stitches the shortest path
// between consecutive waypoints, so every step is a REAL edge in the graph and
// the relationship labels along the way narrate the connection themselves.
// Waypoints are verified to exist and connect (see scripts/route-audit pattern).
import { MATURE_CONTENT_TOURS } from "./mature-content-tours";
import { EARTH_SCIENCE_RISK_TOUR } from "./earth-science-risk-tour";
import { CHEMISTRY_METHODS_TOUR } from "./chemistry-methods-tour";
import { PSYCHOLOGY_METHODS_TOUR } from "./psychology-methods-tour";

export type ThoughtTour = {
  id: string;
  title: string;
  subtitle: string;
  waypoints: string[];
  steps?: ThoughtTourStep[];
};

export type ThoughtTourStep = {
  nodeId: string;
  title: string;
  summary: string;
  focus: string;
};

export const THOUGHT_TOURS: ThoughtTour[] = [
  {
    id: "entropy-thread",
    title: "熵之线索",
    subtitle: "从热力学的无序，经概率与博弈，到可计算的极限",
    waypoints: [
      "physics:热力学--熵与时间之箭",
      "mathematics:probability",
      "computer-science:alan-turing",
    ],
  },
  ...MATURE_CONTENT_TOURS,
  EARTH_SCIENCE_RISK_TOUR,
  CHEMISTRY_METHODS_TOUR,
  {
    id: "limits-of-reason",
    title: "理性的极限",
    subtitle: "苏格拉底的追问，如何通向哥德尔与图灵划定的边界",
    waypoints: [
      "philosophy:socrates",
      "mathematics:godel-incompleteness",
      "computer-science:computability",
    ],
  },
  {
    id: "riddle-of-mind",
    title: "心智之谜",
    subtitle: "从笛卡尔的身心二元，到无意识，再到行为经济学",
    waypoints: [
      "philosophy:descartes",
      "psychology:sigmund-freud",
      "psychology:cognitive-bias",
      "economics:daniel-kahneman",
    ],
  },
  {
    id: "earth-to-life",
    title: "从大地到生命",
    subtitle: "漂移的板块如何一次次改写生命的命运",
    waypoints: [
      "earth-science:plate-tectonics",
      "lifescience:end-cretaceous",
      "lifescience:darwin",
    ],
  },
  {
    id: "stars-to-atoms",
    title: "从恒星到原子",
    subtitle: "你身上的每一个重原子，都曾在恒星内部熔炼",
    waypoints: [
      "cosmology:stellar-evolution",
      "cosmology:恒星核合成",
      "chemistry:atomic-structure",
    ],
  },
  {
    id: "epic-of-evolution",
    title: "演化的史诗",
    subtitle: "四十亿年，从第一个细胞到仰望星空的人类",
    waypoints: ["lifescience:origin-of-life", "lifescience:darwin", "lifescience:human-evolution"],
  },
  {
    id: "evolution-and-society",
    title: "进化与社会",
    subtitle: "达尔文、尼采、马克思与斯密之间意想不到的思想之链",
    waypoints: ["lifescience:darwin", "economics:adam-smith"],
  },
  {
    id: "sociological-methods",
    title: "社会研究方法之线",
    subtitle: "从田野和访谈，到调查、统计、实验与计算社会科学",
    waypoints: [
      "sociology:ethnography",
      "sociology:in-depth-interviews",
      "sociology:survey-research",
      "sociology:statistical-modeling",
      "sociology:experiments-and-quasi-experiments",
      "sociology:computational-social-science",
      "sociology:content-analysis",
    ],
  },
  PSYCHOLOGY_METHODS_TOUR,
  {
    id: "how-to-study-politics",
    title: "如何研究政治",
    subtitle: "从问题与案例，到机制、测量、因果识别、模型和文本证据",
    waypoints: [
      "political-science:political-methodology-behavioralism",
      "political-science:comparative-method",
      "political-science:case-selection-and-small-n",
      "political-science:process-tracing",
      "political-science:survey-public-opinion-measurement",
      "political-science:experiments-natural-experiments",
      "political-science:formal-models-game-theory",
      "political-science:text-as-data-political-analysis",
    ],
    steps: [
      {
        nodeId: "political-science:political-methodology-behavioralism",
        title: "先问什么算政治知识",
        summary:
          "行为主义革命把政治学从制度描述推向可检验经验命题，但当代方法论同时承认价值、语境与多方法证据。",
        focus: "方法论总论",
      },
      {
        nodeId: "political-science:comparative-method",
        title: "比较让差异变成证据",
        summary:
          "最相似与最不同设计利用案例差异检验解释，同时要求概念、测量和因果含义跨案例保持可比。",
        focus: "跨案例推断",
      },
      {
        nodeId: "political-science:case-selection-and-small-n",
        title: "案例必须承担推断任务",
        summary:
          "典型、异常、极端和关键案例回答不同问题；选择策略决定研究能推广什么，也决定哪些结论不能说。",
        focus: "选择偏差",
      },
      {
        nodeId: "political-science:process-tracing",
        title: "进入案例内部寻找机制",
        summary:
          "过程追踪用档案、访谈与制度记录检验竞争假设，区分普通线索、必要门槛和高诊断价值证据。",
        focus: "机制证据",
      },
      {
        nodeId: "political-science:survey-public-opinion-measurement",
        title: "民意数字先是测量结果",
        summary:
          "抽样框、非应答、问题措辞、题序与加权共同塑造调查估计，百分比不能脱离生产过程解释。",
        focus: "抽样与测量",
      },
      {
        nodeId: "political-science:experiments-natural-experiments",
        title: "可信反事实支撑因果声称",
        summary:
          "随机实验和自然实验通过分配机制建立对照，但仍需处理依从、溢出、外部效度和真实政治伤害。",
        focus: "因果识别",
      },
      {
        nodeId: "political-science:formal-models-game-theory",
        title: "形式模型暴露战略假设",
        summary:
          "模型明确行动者、偏好、信息与规则，再推导均衡和比较静态；数学严谨最终仍要接受经验检验。",
        focus: "战略逻辑",
      },
      {
        nodeId: "political-science:text-as-data-political-analysis",
        title: "规模化阅读仍需语境验证",
        summary:
          "文本模型能处理海量政治表达，但语料边界、标注误差、语言漂移和平台选择决定输出能否成为可靠证据。",
        focus: "计算文本",
      },
    ],
  },
  {
    id: "population-health-systems",
    title: "如何改善人群健康",
    subtitle: "从测量健康损失，到制度供给、真实实施、公平审计与预防行动",
    waypoints: [
      "medicine:burden-of-disease-daly-qaly",
      "medicine:health-economic-evaluation-priority-setting",
      "medicine:health-systems-universal-health-coverage",
      "medicine:implementation-science-health-policy",
      "medicine:global-health-inequality-coloniality",
      "medicine:environmental-occupational-health",
      "medicine:maternal-child-health-life-course",
      "medicine:vaccine-policy-programs-hesitancy",
      "medicine:infectious-disease-modeling-surveillance",
    ],
    steps: [
      {
        nodeId: "medicine:burden-of-disease-daly-qaly",
        title: "先把健康损失测量清楚",
        summary:
          "死亡、发病、YLL、YLD、DALY 与 QALY 回答不同问题；指标选择同时包含证据判断与分配价值。",
        focus: "负担测量",
      },
      {
        nodeId: "medicine:health-economic-evaluation-priority-setting",
        title: "把效率、公平和预算放进同一张决策桌",
        summary:
          "成本效果只能比较增量健康收益；预算影响、严重度、长期未覆盖人群和实施能力决定一个福利包是否可支付、可交付且可说明。",
        focus: "优先排序",
      },
      {
        nodeId: "medicine:health-systems-universal-health-coverage",
        title: "把优先级变成制度供给",
        summary:
          "全民健康覆盖同时要求人口纳入、优质服务与财务保护，保险登记或医院数量都不能单独代表有效覆盖。",
        focus: "系统设计",
      },
      {
        nodeId: "medicine:implementation-science-health-policy",
        title: "跨越有效与可实施的断层",
        summary:
          "真实世界中的人力、采购、工作流和信任会改变干预效果，实施科学据此诊断瓶颈、记录适配并评价扩展。",
        focus: "执行机制",
      },
      {
        nodeId: "medicine:global-health-inequality-coloniality",
        title: "追问收益和权力如何分配",
        summary:
          "全国平均可能掩盖社会梯度，全球项目还要审计谁设定议程、控制资源、拥有数据并从知识生产中受益。",
        focus: "健康公平",
      },
      {
        nodeId: "medicine:environmental-occupational-health",
        title: "把预防推到暴露源头",
        summary:
          "环境和职业风险由生产、住房、交通与劳动制度塑造，源头消除和工程控制通常比个人末端防护更可靠。",
        focus: "上游预防",
      },
      {
        nodeId: "medicine:maternal-child-health-life-course",
        title: "用生命周期检查连续照护",
        summary:
          "孕前、产前、分娩、产后、新生儿和儿童发展构成连续链条，三类延误能定位家庭、交通与机构瓶颈。",
        focus: "生命早期",
      },
      {
        nodeId: "medicine:vaccine-policy-programs-hesitancy",
        title: "把接种缺口拆成可行动原因",
        summary:
          "未接种可能来自信念、社会规范、动机或现实障碍，免疫项目必须同时监测覆盖、安全、疾病影响和公平。",
        focus: "项目行为",
      },
      {
        nodeId: "medicine:infectious-disease-modeling-surveillance",
        title: "让监测形成下一轮反馈",
        summary:
          "病例只是数据生成过程的末端，传播模型应以情景而非预言沟通，并把不确定性持续反馈给项目和系统。",
        focus: "监测学习",
      },
    ],
  },
  {
    id: "platform-society",
    title: "平台社会如何被治理",
    subtitle: "从平台制度，到系统风险、可审计测量与劳动过程",
    waypoints: [
      "sociology:digital-platform-society",
      "sociology:platform-governance",
      "sociology:computational-social-science-frontier",
      "sociology:ai-and-labor",
      "sociology:work-and-labor-organizations",
    ],
  },
  {
    id: "climate-ageing-city",
    title: "气候、城市与老龄化",
    subtitle: "城市化如何把热浪、迁移、照护和代际契约连接起来",
    waypoints: [
      "sociology:urbanization",
      "sociology:urban-climate-adaptation",
      "sociology:ageing-societies",
      "sociology:family-and-kinship",
    ],
  },
  {
    id: "global-south-sociology",
    title: "全球南方与社会理论",
    subtitle: "从杜波依斯的色线，到比较历史与去殖民知识生产",
    waypoints: [
      "sociology:w-e-b-du-bois",
      "sociology:comparative-historical-analysis",
      "sociology:global-south-sociology",
      "sociology:content-analysis",
    ],
  },
  {
    id: "non-western-social-theory",
    title: "非西方社会理论",
    subtitle: "从中国、印度、伊斯兰、非洲城市到拉美解放社会学",
    waypoints: [
      "sociology:chinese-social-thought",
      "sociology:family-and-kinship",
      "sociology:indian-social-thought",
      "sociology:social-stratification",
      "sociology:islamic-social-thought",
      "sociology:comparative-historical-analysis",
      "sociology:latin-american-dependency-liberation-sociology",
      "sociology:global-south-sociology",
      "sociology:african-urbanization",
    ],
  },
  {
    id: "global-south-political-economy",
    title: "全球南方政治经济思想",
    subtitle: "从解殖民知识、后殖民国家，到非洲发展与印度制度经济",
    waypoints: [
      "philosophy:modern-chinese-thought",
      "philosophy:decolonial-epistemology",
      "sociology:global-south-sociology",
      "economics:african-development-economics",
      "political-science:postcolonial-state-building",
      "political-science:african-regional-organizations",
      "economics:indian-institutional-economics",
    ],
    steps: [
      {
        nodeId: "philosophy:modern-chinese-thought",
        title: "从非西方现代性出发",
        summary:
          "现代中国思想提醒我们，现代化不是单一路线，而是在国家危机、革命、改革和世界体系压力中不断重写的问题。",
        focus: "多重现代性",
      },
      {
        nodeId: "philosophy:decolonial-epistemology",
        title: "知识本身也有权力结构",
        summary:
          "去殖民知识论追问谁被允许生产理论、谁只能提供案例，为理解全球南方政治经济学建立方法前提。",
        focus: "知识去中心化",
      },
      {
        nodeId: "sociology:global-south-sociology",
        title: "全球南方不是地理标签",
        summary: "全球南方社会学把殖民遗产、发展不平等、迁移、城市化和知识生产放在同一张结构图里。",
        focus: "结构位置",
      },
      {
        nodeId: "economics:african-development-economics",
        title: "非洲发展经济学进入制度问题",
        summary:
          "非洲发展不能只看增长率，还要看结构转型、国家能力、区域市场、债务空间和公共品供给。",
        focus: "结构转型",
      },
      {
        nodeId: "political-science:postcolonial-state-building",
        title: "后殖民国家建设解释约束",
        summary: "殖民边界、税收能力、安全垄断和合法性，决定发展政策为什么常常被国家能力卡住。",
        focus: "国家能力",
      },
      {
        nodeId: "political-science:african-regional-organizations",
        title: "区域组织补足单国能力",
        summary: "非洲联盟、ECOWAS、SADC、EAC 与 AfCFTA 让贸易、安全和公共品治理超出单一国家边界。",
        focus: "区域公共品",
      },
      {
        nodeId: "economics:indian-institutional-economics",
        title: "印度制度经济学提供比较坐标",
        summary:
          "印度案例把联邦制、数字公共基础设施、非正规就业、种姓性别和税收能力放入发展经济学比较。",
        focus: "制度多样性",
      },
    ],
  },
  {
    id: "modern-macro-diagnosis",
    title: "现代宏观诊断",
    subtitle: "从货币与赤字，到债务可持续性，再到国家经济情景分析",
    waypoints: [
      "economics:modern-money-fiscal-deficits",
      "economics:expectations-credibility-policy-transmission",
      "economics:debt-sustainability-macro-framework",
      "economics:country-macro-diagnostics-forecasting",
      "economics:macro-diagnostics-matrix-guide",
    ],
    steps: [
      {
        nodeId: "economics:modern-money-fiscal-deficits",
        title: "先拆掉家庭账本类比",
        summary: "现代货币和财政赤字要从主权货币、资源约束、通胀压力、汇率和制度可信度一起理解。",
        focus: "赤字边界",
      },
      {
        nodeId: "economics:expectations-credibility-policy-transmission",
        title: "政策要穿过预期系统",
        summary:
          "宏观政策不是按钮，它要通过家庭、企业、银行、债券市场和公众信任才能变成真实经济行为。",
        focus: "预期传导",
      },
      {
        nodeId: "economics:debt-sustainability-macro-framework",
        title: "债务风险看动态而非静态",
        summary: "债务可持续性取决于增长、利率、初级余额、币种期限结构和政治调整能力的组合。",
        focus: "r-g 与政治可信度",
      },
      {
        nodeId: "economics:country-macro-diagnostics-forecasting",
        title: "把框架应用到国家",
        summary:
          "国家诊断需要同时阅读增长、通胀、财政、外部账户、金融系统和政策情景，而不是孤立预测一个数字。",
        focus: "统一诊断",
      },
      {
        nodeId: "economics:macro-diagnostics-matrix-guide",
        title: "矩阵把比较变成可视化",
        summary:
          "宏观矩阵把不同国家放在同一坐标中，帮助识别相同指标在不同制度和外部约束下的不同含义。",
        focus: "七维矩阵",
      },
    ],
  },
  {
    id: "country-macro-map",
    title: "国家宏观诊断地图",
    subtitle: "同一框架如何读懂美国、中国、欧元区、日本、印度与债务国",
    waypoints: [
      "economics:country-macro-diagnostics-forecasting",
      "economics:macro-diagnostics-matrix-guide",
      "economics:us-macro-diagnosis-2026",
      "economics:us-fiscal-path-treasury-market-2026",
      "economics:china-macro-diagnosis-2026",
      "economics:china-property-local-finance-financial-system-2026",
      "economics:euro-area-macro-diagnosis-2026",
      "economics:euro-area-fiscal-rules-energy-transition-2026",
      "economics:japan-macro-diagnosis-2026",
      "economics:japan-yield-normalization-aging-fiscal-2026",
      "economics:india-macro-diagnosis-2026",
      "economics:india-growth-employment-constraints-2026",
      "economics:commodity-exporters-macro-diagnosis-2026",
      "economics:commodity-exporters-fiscal-rules-sovereign-wealth-funds-2026",
      "economics:low-income-debt-countries-macro-diagnosis-2026",
      "economics:low-income-debt-restructuring-development-finance-2026",
    ],
    steps: [
      {
        nodeId: "economics:country-macro-diagnostics-forecasting",
        title: "统一诊断框架",
        summary:
          "先把所有经济体放进同一张问卷：增长来自哪里，通胀是否黏住，财政和债务能否承受下一轮冲击。",
        focus: "框架先行",
      },
      {
        nodeId: "economics:macro-diagnostics-matrix-guide",
        title: "矩阵读图手册",
        summary:
          "矩阵把增长、通胀、财政、债务、外部账户、金融系统与政策情景并排，避免只盯单一指标。",
        focus: "七维比较",
      },
      {
        nodeId: "economics:us-macro-diagnosis-2026",
        title: "美国：韧性与赤字并存",
        summary: "美国的增长和金融深度仍强，但赤字、净利息和国债期限溢价决定软着陆是否能持续。",
        focus: "财政-利率反馈",
      },
      {
        nodeId: "economics:us-fiscal-path-treasury-market-2026",
        title: "美国深挖：国债市场",
        summary:
          "财政路径不只影响预算表，也会通过发行结构、期限溢价和美元资产定价影响全球金融条件。",
        focus: "安全资产供给",
      },
      {
        nodeId: "economics:china-macro-diagnosis-2026",
        title: "中国：地产退潮后的再平衡",
        summary:
          "中国诊断的关键是地产、地方财政和低通胀如何共同拖累需求，同时制造业出口仍提供支撑。",
        focus: "资产负债表修复",
      },
      {
        nodeId: "economics:china-property-local-finance-financial-system-2026",
        title: "中国深挖：地产-地方财政-金融",
        summary:
          "地产调整通过土地收入、城投融资、抵押品价值和银行资产质量，把地方财政与金融系统连在一起。",
        focus: "地方财政循环",
      },
      {
        nodeId: "economics:euro-area-macro-diagnosis-2026",
        title: "欧元区：共同货币下的分化",
        summary: "欧元区风险来自统一货币和分散财政之间的张力，能源转型与财政规则会放大成员国差异。",
        focus: "南北财政空间",
      },
      {
        nodeId: "economics:euro-area-fiscal-rules-energy-transition-2026",
        title: "欧元区深挖：规则与转型",
        summary:
          "新的财政规则要求控制债务路径，但能源安全、产业政策和绿色投资又需要更长期的公共投入。",
        focus: "规则-投资权衡",
      },
      {
        nodeId: "economics:japan-macro-diagnosis-2026",
        title: "日本：正常化的慢变量",
        summary:
          "日本不是典型危机剧本，而是工资-物价循环、老龄化财政和国债收益率正常化的长期拉扯。",
        focus: "收益率正常化",
      },
      {
        nodeId: "economics:japan-yield-normalization-aging-fiscal-2026",
        title: "日本深挖：收益率与老龄化",
        summary: "当长期利率逐步上行，政府利息支出、金融机构久期敞口和日元汇率会一起检验政策空间。",
        focus: "久期风险",
      },
      {
        nodeId: "economics:india-macro-diagnosis-2026",
        title: "印度：高增长的吸纳能力",
        summary: "印度增长动能强，真正的问题是基建、制造业和服务业能否把人口红利转化为高质量就业。",
        focus: "就业约束",
      },
      {
        nodeId: "economics:india-growth-employment-constraints-2026",
        title: "印度深挖：增长与就业",
        summary:
          "如果高增长主要停留在资本密集部门，食品通胀、非正规就业和女性劳动参与会限制收入改善。",
        focus: "人口红利兑现",
      },
      {
        nodeId: "economics:commodity-exporters-macro-diagnosis-2026",
        title: "资源出口国：顺周期风险",
        summary: "资源出口国的宏观质量取决于是否能把商品繁荣期收入转化为逆周期储蓄和生产率投资。",
        focus: "商品周期",
      },
      {
        nodeId: "economics:commodity-exporters-fiscal-rules-sovereign-wealth-funds-2026",
        title: "资源出口国深挖：规则与主权基金",
        summary:
          "财政规则、主权财富基金和汇率弹性共同决定资源收入是稳定器，还是下一轮债务压力的来源。",
        focus: "跨周期储蓄",
      },
      {
        nodeId: "economics:low-income-debt-countries-macro-diagnosis-2026",
        title: "低收入债务国：外币约束",
        summary:
          "低收入债务国的核心矛盾是发展支出需求很高，但外币债务、进口刚性和税基狭窄限制政策空间。",
        focus: "外部融资脆弱性",
      },
      {
        nodeId: "economics:low-income-debt-restructuring-development-finance-2026",
        title: "低收入债务国深挖：重组与融资",
        summary:
          "债务重组速度、债权人协调、公共投资选择和多边融资条件，决定危机后能否回到发展轨道。",
        focus: "债务-发展权衡",
      },
    ],
  },
  {
    id: "macro-politics-psychology",
    title: "宏观、政治与心理",
    subtitle: "通胀和债务如何进入风险感知、极化、预算治理与央行独立",
    waypoints: [
      "economics:modern-money-fiscal-deficits",
      "economics:expectations-credibility-policy-transmission",
      "psychology:inflation-expectations-and-trust",
      "psychology:inflation-psychology",
      "psychology:risk-perception-and-macro-decisions",
      "psychology:political-psychology-of-fiscal-austerity",
      "psychology:political-polarization-psychology",
      "political-science:budget-governance",
      "political-science:fiscal-rules-democratic-legitimacy",
      "political-science:central-bank-communication-public-understanding",
      "political-science:central-bank-independence-political-economy",
      "political-science:fiscal-state",
      "economics:debt-sustainability-macro-framework",
    ],
    steps: [
      {
        nodeId: "economics:modern-money-fiscal-deficits",
        title: "赤字首先是政治选择",
        summary:
          "现代货币和财政赤字不是单纯会计问题，它把政府支出、税收承诺、央行配合和公众信任放进同一张政治账本。",
        focus: "财政承诺",
      },
      {
        nodeId: "economics:expectations-credibility-policy-transmission",
        title: "政策穿过预期与可信度",
        summary:
          "赤字、加息、紧缩和公共投资都要经过公众信任、市场预期和制度执行，才会变成消费、投资和定价行为。",
        focus: "可信传导",
      },
      {
        nodeId: "psychology:inflation-expectations-and-trust",
        title: "通胀预期需要信任锚",
        summary:
          "公众不会只按统计模型形成预期，价格记忆、生活成本、央行可信度和财政路径共同决定通胀是否被锚定。",
        focus: "预期与信任",
      },
      {
        nodeId: "psychology:inflation-psychology",
        title: "通胀进入日常感受",
        summary:
          "价格上涨会通过食品、房租和能源这些高频体验进入心理账户，使人们比统计口径更快感到生活成本失控。",
        focus: "通胀感知",
      },
      {
        nodeId: "psychology:risk-perception-and-macro-decisions",
        title: "风险感知改变政策容忍度",
        summary:
          "当家庭和企业把未来看得更危险，储蓄、投资、消费和投票都会变得更保守，宏观政策空间随之收缩。",
        focus: "不确定性",
      },
      {
        nodeId: "psychology:political-psychology-of-fiscal-austerity",
        title: "财政紧缩触发损失感",
        summary:
          "削支、加税和福利改革会被体验为生活安全网收缩；如果分配不透明，技术上合理的调整也会变成信任危机。",
        focus: "紧缩合法性",
      },
      {
        nodeId: "psychology:political-polarization-psychology",
        title: "极化重写经济归因",
        summary:
          "同一组通胀、债务或失业数据，会被不同阵营解释成完全不同的责任故事，预算协商因此更难达成稳定共识。",
        focus: "责任归因",
      },
      {
        nodeId: "political-science:budget-governance",
        title: "预算治理把冲突制度化",
        summary:
          "预算规则、审议程序和中期框架决定社会冲突是被转化为可谈判的优先级，还是变成临时停摆和债务上限危机。",
        focus: "支出优先级",
      },
      {
        nodeId: "political-science:fiscal-rules-democratic-legitimacy",
        title: "财政规则需要民主授权",
        summary:
          "规则能约束短期政治冲动，但只有当目标、例外、分配影响和退出路径能被公众理解时，才不会变成反弹对象。",
        focus: "规则合法性",
      },
      {
        nodeId: "political-science:central-bank-communication-public-understanding",
        title: "央行沟通连接专家与公众",
        summary:
          "央行需要把通胀目标、利率工具、预测误差和政策边界翻译成公众能检验的语言，否则独立性会失去社会授权。",
        focus: "公众理解",
      },
      {
        nodeId: "political-science:central-bank-independence-political-economy",
        title: "央行独立需要社会授权",
        summary:
          "央行独立不是脱离政治，而是在通胀控制、就业目标和财政压力之间保留可信边界；边界是否被接受取决于公众理解。",
        focus: "可信边界",
      },
      {
        nodeId: "political-science:fiscal-state",
        title: "财政国家决定承压能力",
        summary:
          "财政国家的税收能力、行政能力和福利承诺，决定政府在危机中能否融资、补偿和维持社会契约。",
        focus: "国家能力",
      },
      {
        nodeId: "economics:debt-sustainability-macro-framework",
        title: "债务可持续性回到信任",
        summary:
          "债务是否可持续，最终取决于增长、利率、初级余额和政治可信度能否形成自洽路径，而不只是债务率的一条线。",
        focus: "增长-利率-信任",
      },
    ],
  },
];
