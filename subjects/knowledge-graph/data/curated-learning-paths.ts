import type { GraphEdge, GraphNode } from "./types";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";
import { NATURAL_SCIENCE_LEARNING_PATHS } from "./curated-learning-paths-natural";
import { LIFE_HISTORY_LEARNING_PATHS } from "./curated-learning-paths-life-history";
import { DOMAIN_SPINE_LEARNING_PATHS } from "./curated-learning-paths-domain-spines";
import { COMPLETION_DOMAIN_SPINE_PATHS } from "./curated-learning-paths-domain-spines-completion";
import { FORMAL_SCIENCE_DOMAIN_SPINE_PATHS } from "./curated-learning-paths-domain-spines-formal";

type EvidenceMode = NonNullable<GraphNode["evidenceMode"]>;

export type CuratedLearningStep = {
  nodeId: string;
  level: KnowledgeLevel;
  evidenceMode: EvidenceMode;
  transition: string;
};

export type CuratedLearningPath = {
  id: string;
  scope?: "cross-domain" | "domain-spine";
  title: string;
  question: string;
  steps: readonly CuratedLearningStep[];
};

const BASE_CURATED_LEARNING_PATHS: readonly CuratedLearningPath[] = [
  {
    id: "universe-matter",
    title: "从天空到物理边界",
    question: "我们怎样从观察天空，走到检验宇宙最深层的规律？",
    steps: [
      {
        nodeId: "physics:T6",
        level: 1,
        evidenceMode: "observation",
        transition: "先建立太阳系的尺度与运动直觉。",
      },
      {
        nodeId: "chemistry:atomic-structure",
        level: 2,
        evidenceMode: "observation",
        transition: "再用原子描述可见物质的共同构件。",
      },
      {
        nodeId: "cosmology:stellar-evolution",
        level: 3,
        evidenceMode: "simulation",
        transition: "恒星演化解释原子核怎样被制造和散播。",
      },
      {
        nodeId: "chemistry:x-ray-crystallography",
        level: 4,
        evidenceMode: "experimental",
        transition: "衍射实验把不可见结构转化为可检验数据。",
      },
      {
        nodeId: "physics:P8",
        level: 5,
        evidenceMode: "synthesis",
        transition: "最后把实验、观测与理论共同带到开放问题。",
      },
    ],
  },
  {
    id: "earth-life-body",
    title: "从生命形态到可设计医学",
    question: "生命怎样演化，我们又怎样可靠地改变它？",
    steps: [
      {
        nodeId: "lifescience:human-evolution",
        level: 1,
        evidenceMode: "observation",
        transition: "从人类与其他生命的相似和差异开始。",
      },
      {
        nodeId: "chemistry:chemical-bond",
        level: 2,
        evidenceMode: "formal",
        transition: "化学键说明生命分子为何能形成稳定结构。",
      },
      {
        nodeId: "earth-science:plate-tectonics",
        level: 3,
        evidenceMode: "simulation",
        transition: "地球系统提供生命长期演化的动态环境。",
      },
      {
        nodeId: "medicine:clinical-trials",
        level: 4,
        evidenceMode: "experimental",
        transition: "临床试验检验干预是否有效、安全且可比较。",
      },
      {
        nodeId: "medicine:crispr-gene-editing",
        level: 5,
        evidenceMode: "synthesis",
        transition: "基因编辑迫使证据、演化风险与伦理共同决策。",
      },
    ],
  },
  {
    id: "patterns-computation",
    title: "从抽象模式到可信人工智能",
    question: "有限规则怎样变成复杂计算，又怎样保持可解释？",
    steps: [
      {
        nodeId: "computer-science:abstraction",
        level: 1,
        evidenceMode: "formal",
        transition: "先学会忽略细节并保留结构。",
      },
      {
        nodeId: "mathematics:probability",
        level: 2,
        evidenceMode: "formal",
        transition: "概率为不确定性提供可计算语言。",
      },
      {
        nodeId: "computer-science:graph-traversal",
        level: 3,
        evidenceMode: "formal",
        transition: "图遍历把关系结构转化为可执行步骤。",
      },
      {
        nodeId: "computer-science:formal-methods-and-verification",
        level: 4,
        evidenceMode: "formal",
        transition: "形式验证检查程序是否满足明确约束。",
      },
      {
        nodeId: "computer-science:ai-interpretability",
        level: 5,
        evidenceMode: "synthesis",
        transition: "可解释性研究把预测能力推进到机制与问责。",
      },
    ],
  },
  {
    id: "mind-meaning",
    title: "从关系经验到心智理论",
    question: "主观经验如何成为可反驳、可累积的知识？",
    steps: [
      {
        nodeId: "psychology:attachment-styles",
        level: 1,
        evidenceMode: "observation",
        transition: "从熟悉的关系差异辨认可观察模式。",
      },
      {
        nodeId: "psychology:attachment-theory",
        level: 2,
        evidenceMode: "interpretation",
        transition: "理论把分散现象组织为发展机制。",
      },
      {
        nodeId: "philosophy:causation",
        level: 3,
        evidenceMode: "interpretation",
        transition: "因果分析区分相关、理由与真正机制。",
      },
      {
        nodeId: "psychology:preregistration-registered-reports",
        level: 4,
        evidenceMode: "experimental",
        transition: "预注册减少事后选择与只报告成功结果。",
      },
      {
        nodeId: "psychology:predictive-processing-psychiatry",
        level: 5,
        evidenceMode: "synthesis",
        transition: "竞争模型必须连接行为、计算与临床证据。",
      },
    ],
  },
  {
    id: "people-institutions",
    title: "从共同生活到平台制度",
    question: "个人行动怎样累积成制度，制度又怎样塑造机会？",
    steps: [
      {
        nodeId: "history:event-农业革命",
        level: 1,
        evidenceMode: "observation",
        transition: "定居与生产变化让制度问题第一次清晰可见。",
      },
      {
        nodeId: "sociology:social-structure",
        level: 2,
        evidenceMode: "comparative",
        transition: "社会结构描述角色、资源与机会的稳定关系。",
      },
      {
        nodeId: "economics:market-failures",
        level: 3,
        evidenceMode: "comparative",
        transition: "市场失灵说明个体选择未必产生共同利益。",
      },
      {
        nodeId: "political-science:comparative-method",
        level: 4,
        evidenceMode: "comparative",
        transition: "比较方法检验制度差异是否真正造成结果。",
      },
      {
        nodeId: "sociology:platform-governance",
        level: 5,
        evidenceMode: "synthesis",
        transition: "平台治理综合技术架构、市场权力与公共规则。",
      },
    ],
  },
  {
    id: "shared-future",
    title: "从共同资源到气候决策",
    question: "面对跨代风险，证据、资源与公平如何共同进入决策？",
    steps: [
      {
        nodeId: "earth-science:water-cycle",
        level: 1,
        evidenceMode: "observation",
        transition: "水循环让共同资源与相互依赖变得可见。",
      },
      {
        nodeId: "economics:environmental-economics",
        level: 2,
        evidenceMode: "comparative",
        transition: "环境经济学描述外部性、激励与资源约束。",
      },
      {
        nodeId: "political-science:public-policy",
        level: 3,
        evidenceMode: "comparative",
        transition: "公共政策把知识转化为可执行的集体选择。",
      },
      {
        nodeId: "medicine:environmental-occupational-health",
        level: 4,
        evidenceMode: "comparative",
        transition: "环境健康把气候暴露、脆弱性、公平与可执行干预放进同一比较框架。",
      },
      {
        nodeId: "earth-science:climate-tipping-points",
        level: 5,
        evidenceMode: "synthesis",
        transition: "临界点要求在不确定性和不可逆性下提前行动。",
      },
    ],
  },
  {
    id: "measurement-evidence",
    title: "从观察记录到可重复证据",
    question: "怎样把一次观察变成其他人也能检验的知识？",
    steps: [
      {
        nodeId: "history:event-文艺复兴科学革命",
        level: 1,
        evidenceMode: "observation",
        transition: "科学革命把系统观察、公开论证和重复检验连接起来。",
      },
      {
        nodeId: "mathematics:statistics",
        level: 2,
        evidenceMode: "formal",
        transition: "统计学提供描述变异与判断不确定性的共同语言。",
      },
      {
        nodeId: "chemistry:spectroscopy",
        level: 3,
        evidenceMode: "experimental",
        transition: "光谱把不可见结构转化为可测量、可比较的信号。",
      },
      {
        nodeId: "psychology:measurement-invariance-fair-comparison",
        level: 4,
        evidenceMode: "experimental",
        transition: "测量等值检查同一指标在不同人群中是否仍表示同一概念。",
      },
      {
        nodeId: "psychology:replication-crisis-open-science",
        level: 5,
        evidenceMode: "synthesis",
        transition: "开放科学研究整条证据生产链怎样抵抗偏差并持续纠错。",
      },
    ],
  },
  {
    id: "energy-climate",
    title: "从大气结构到城市气候适应",
    question: "能量怎样驱动气候，社会又怎样应对已经发生的变化？",
    steps: [
      {
        nodeId: "earth-science:atmosphere-structure",
        level: 1,
        evidenceMode: "observation",
        transition: "先认识大气分层以及温度、密度随高度的变化。",
      },
      {
        nodeId: "physics:热力学--熵与时间之箭",
        level: 2,
        evidenceMode: "formal",
        transition: "热力学说明能量转换为何有方向、效率为何存在边界。",
      },
      {
        nodeId: "earth-science:carbon-cycle",
        level: 3,
        evidenceMode: "simulation",
        transition: "碳循环把大气、海洋、岩石与生命连成动态系统。",
      },
      {
        nodeId: "earth-science:carbon-budgets-and-net-zero",
        level: 4,
        evidenceMode: "simulation",
        transition: "碳预算把物理约束转换为可比较的政策情景。",
      },
      {
        nodeId: "sociology:urban-climate-adaptation",
        level: 5,
        evidenceMode: "synthesis",
        transition: "城市适应综合基础设施、分配公平、治理能力与居民行为。",
      },
    ],
  },
  {
    id: "evolution-health",
    title: "从早期生命到耐药性危机",
    question: "演化规律如何帮助我们理解疾病与医学干预？",
    steps: [
      {
        nodeId: "lifescience:stromatolite",
        level: 1,
        evidenceMode: "observation",
        transition: "叠层石让早期生命活动留下可观察的地质记录。",
      },
      {
        nodeId: "lifescience:darwin",
        level: 2,
        evidenceMode: "interpretation",
        transition: "自然选择解释可遗传差异怎样跨世代改变种群。",
      },
      {
        nodeId: "lifescience:end-cretaceous",
        level: 3,
        evidenceMode: "simulation",
        transition: "大灭绝揭示环境突变、选择压力与生态重组的系统效应。",
      },
      {
        nodeId: "medicine:epidemiology",
        level: 4,
        evidenceMode: "comparative",
        transition: "流行病学在真实人群中比较暴露、传播与健康结果。",
      },
      {
        nodeId: "medicine:antibiotic-resistance",
        level: 5,
        evidenceMode: "synthesis",
        transition: "耐药性把微生物演化、临床用药、农业与全球治理汇成同一危机。",
      },
    ],
  },
  {
    id: "proof-computation",
    title: "从公理到机器辅助证明",
    question: "什么可以被严格证明，机器又能把证明推进多远？",
    steps: [
      {
        nodeId: "mathematics:axiom",
        level: 1,
        evidenceMode: "formal",
        transition: "公理明确推理从哪些基本约定出发。",
      },
      {
        nodeId: "mathematics:proof",
        level: 2,
        evidenceMode: "formal",
        transition: "证明用可检查步骤把前提连接到结论。",
      },
      {
        nodeId: "computer-science:computability",
        level: 3,
        evidenceMode: "formal",
        transition: "可计算性区分有算法可解的问题与原则上不可解的问题。",
      },
      {
        nodeId: "mathematics:godel-incompleteness",
        level: 4,
        evidenceMode: "formal",
        transition: "不完备定理揭示足够强的形式系统存在内在边界。",
      },
      {
        nodeId: "mathematics:ai-formal-proof",
        level: 5,
        evidenceMode: "synthesis",
        transition: "AI证明助手结合形式验证、搜索策略与人类数学直觉。",
      },
    ],
  },
  {
    id: "data-causal-inference",
    title: "从测量偏差到计算社会科学",
    question: "有噪声、有偏差的数据怎样支持因果解释？",
    steps: [
      {
        nodeId: "psychology:cognitive-bias",
        level: 1,
        evidenceMode: "observation",
        transition: "先意识到观察者和判断本身也可能系统性偏离。",
      },
      {
        nodeId: "psychology:psychometrics-reliability-validity",
        level: 2,
        evidenceMode: "experimental",
        transition: "信度与效度检查测量是否稳定、是否真的测到目标概念。",
      },
      {
        nodeId: "mathematics:bayesian-inference",
        level: 3,
        evidenceMode: "formal",
        transition: "贝叶斯推断用概率表达先验、证据与更新后的不确定性。",
      },
      {
        nodeId: "sociology:statistical-modeling",
        level: 4,
        evidenceMode: "comparative",
        transition: "统计模型把变量关系、层级结构与反事实假设显式化。",
      },
      {
        nodeId: "sociology:computational-social-science-frontier",
        level: 5,
        evidenceMode: "synthesis",
        transition: "计算社会科学综合大规模行为痕迹、因果识别、伦理与可复现性。",
      },
    ],
  },
  {
    id: "cognition-development",
    title: "从儿童语言到数字环境",
    question: "儿童怎样进入语言与社会，又怎样被新的信息环境改变？",
    steps: [
      {
        nodeId: "linguistics:children-learn-language",
        level: 1,
        evidenceMode: "experimental",
        transition: "从儿童如何在感知与互动中建立第一语言开始。",
      },
      {
        nodeId: "psychology:developmental-psychology",
        level: 2,
        evidenceMode: "interpretation",
        transition: "发展心理学把语言扩展到认知、情绪、关系与生命周期。",
      },
      {
        nodeId: "sociology:family-and-kinship",
        level: 3,
        evidenceMode: "comparative",
        transition: "家庭与亲属制度把个体发展放回关系、照护与文化环境。",
      },
      {
        nodeId: "psychology:longitudinal-multilevel-models",
        level: 4,
        evidenceMode: "comparative",
        transition: "纵向与多层模型区分个体变化、群体差异和环境影响。",
      },
      {
        nodeId: "psychology:social-media-teen-mental-health",
        level: 5,
        evidenceMode: "synthesis",
        transition: "青少年数字健康研究必须综合平台机制、发展阶段与因果证据。",
      },
    ],
  },
  {
    id: "ethics-justice",
    title: "从追问善恶到算法治理",
    question: "价值判断怎样进入技术、医学与公共制度？",
    steps: [
      {
        nodeId: "philosophy:socrates",
        level: 1,
        evidenceMode: "interpretation",
        transition: "苏格拉底式追问要求为习惯性的价值判断给出理由。",
      },
      {
        nodeId: "philosophy:bioethics",
        level: 2,
        evidenceMode: "interpretation",
        transition: "生命伦理把自主、伤害、公平与照护放进具体困境。",
      },
      {
        nodeId: "philosophy:political-philosophy",
        level: 3,
        evidenceMode: "interpretation",
        transition: "政治哲学追问规则、权利与资源分配何以正当。",
      },
      {
        nodeId: "psychology:digital-phenotyping-computational-ethics",
        level: 4,
        evidenceMode: "experimental",
        transition: "数字表型暴露同意、隐私、测量偏差与临床责任的冲突。",
      },
      {
        nodeId: "political-science:ai-governance-surveillance",
        level: 5,
        evidenceMode: "synthesis",
        transition: "算法治理综合权力结构、技术审计、法律边界与民主问责。",
      },
    ],
  },
  {
    id: "history-institutions",
    title: "从文字记录到制度比较",
    question: "制度怎样形成、扩张、危机并留下可比较的历史轨迹？",
    steps: [
      {
        nodeId: "history:event-楔形文字",
        level: 1,
        evidenceMode: "observation",
        transition: "文字记录让税收、法律、交换和统治获得跨代记忆。",
      },
      {
        nodeId: "sociology:bureaucracy",
        level: 2,
        evidenceMode: "comparative",
        transition: "官僚制描述规则、职位与文书怎样组织大规模协作。",
      },
      {
        nodeId: "history:event-工业革命",
        level: 3,
        evidenceMode: "interpretation",
        transition: "工业革命把技术、劳动、城市与国家能力同时推向重组。",
      },
      {
        nodeId: "sociology:comparative-historical-analysis",
        level: 4,
        evidenceMode: "comparative",
        transition: "比较历史分析用时序、机制与反事实解释不同制度道路。",
      },
      {
        nodeId: "sociology:ageing-societies",
        level: 5,
        evidenceMode: "synthesis",
        transition: "老龄化研究综合人口结构、照护制度、财政与代际关系。",
      },
    ],
  },
  {
    id: "markets-macro",
    title: "从交换直觉到国家宏观诊断",
    question: "价格、产出、货币与财政怎样共同塑造一国经济？",
    steps: [
      {
        nodeId: "history:event-大萧条",
        level: 1,
        evidenceMode: "observation",
        transition: "从大萧条中产出崩落、失业扩散与金融脆弱的历史经验出发。",
      },
      {
        nodeId: "economics:supply-demand",
        level: 2,
        evidenceMode: "formal",
        transition: "供需模型把价格与数量变化组织为可比较机制。",
      },
      {
        nodeId: "economics:keynesian-economics",
        level: 3,
        evidenceMode: "comparative",
        transition: "凯恩斯框架解释总需求不足、失业与政策稳定作用。",
      },
      {
        nodeId: "economics:country-macro-diagnostics-forecasting",
        level: 4,
        evidenceMode: "simulation",
        transition: "宏观诊断同时检查增长、通胀、财政、外部账户与金融系统。",
      },
      {
        nodeId: "economics:us-fiscal-path-treasury-market-2026",
        level: 5,
        evidenceMode: "synthesis",
        transition: "美国财政路径案例把债务动态、国债市场与政策情景放在一起。",
      },
    ],
  },
  {
    id: "democracy-governance",
    title: "从政治权利到民主韧性",
    question: "民主制度怎样代表意见、约束权力并抵抗倒退？",
    steps: [
      {
        nodeId: "philosophy:democracy",
        level: 1,
        evidenceMode: "interpretation",
        transition: "先追问人民统治、平等参与和政治正当性意味着什么。",
      },
      {
        nodeId: "political-science:democracy",
        level: 2,
        evidenceMode: "comparative",
        transition: "民主概念区分参与、竞争、代表与权力更替。",
      },
      {
        nodeId: "political-science:electoral-systems",
        level: 3,
        evidenceMode: "comparative",
        transition: "选举制度把选票转换为席位，也改变政党和代表策略。",
      },
      {
        nodeId: "political-science:survey-public-opinion-measurement",
        level: 4,
        evidenceMode: "experimental",
        transition: "民意测量检查抽样、提问、代表性与意见变化。",
      },
      {
        nodeId: "political-science:democratic-backsliding",
        level: 5,
        evidenceMode: "synthesis",
        transition: "民主衰退研究连接制度侵蚀、极化、信息环境与国际扩散。",
      },
    ],
  },
  {
    id: "technology-society",
    title: "从网络连接到 AI 劳动变迁",
    question: "计算基础设施怎样改变组织、平台与劳动关系？",
    steps: [
      {
        nodeId: "history:event-数字革命",
        level: 1,
        evidenceMode: "observation",
        transition: "数字革命提供个人生活与组织结构共同变化的历史入口。",
      },
      {
        nodeId: "computer-science:networking-protocols",
        level: 2,
        evidenceMode: "formal",
        transition: "网络协议解释异构机器怎样可靠交换信息。",
      },
      {
        nodeId: "computer-science:machine-learning-overview",
        level: 3,
        evidenceMode: "formal",
        transition: "机器学习把数据、目标函数与泛化能力连接起来。",
      },
      {
        nodeId: "sociology:computational-social-science",
        level: 4,
        evidenceMode: "comparative",
        transition: "计算社会科学分析平台行为痕迹，同时审查数据偏差与伦理。",
      },
      {
        nodeId: "sociology:ai-and-labor",
        level: 5,
        evidenceMode: "synthesis",
        transition: "AI劳动研究综合任务重组、管理控制、技能分化与政策保护。",
      },
    ],
  },
  {
    id: "global-south-development",
    title: "从非殖民化到全球南方知识",
    question: "国家建设与发展理论如何摆脱单一西方经验？",
    steps: [
      {
        nodeId: "history:event-非洲独立运动",
        level: 1,
        evidenceMode: "observation",
        transition: "非洲独立运动让主权、边界与殖民遗产成为具体历史问题。",
      },
      {
        nodeId: "political-science:postcolonial-state-building",
        level: 2,
        evidenceMode: "comparative",
        transition: "后殖民国家建设比较制度移植、国家能力与社会联盟。",
      },
      {
        nodeId: "economics:african-development-economics",
        level: 3,
        evidenceMode: "comparative",
        transition: "非洲发展经济学把结构转型、非正规经济与全球约束纳入分析。",
      },
      {
        nodeId: "political-science:case-selection-and-small-n",
        level: 4,
        evidenceMode: "comparative",
        transition: "案例选择方法防止只用方便案例证明既有结论。",
      },
      {
        nodeId: "sociology:global-south-sociology",
        level: 5,
        evidenceMode: "synthesis",
        transition: "全球南方社会学重构概念来源、比较尺度与知识生产权力。",
      },
    ],
  },
] as const;

export const CURATED_LEARNING_PATHS: readonly CuratedLearningPath[] = [
  ...BASE_CURATED_LEARNING_PATHS,
  ...NATURAL_SCIENCE_LEARNING_PATHS,
  ...LIFE_HISTORY_LEARNING_PATHS,
  ...DOMAIN_SPINE_LEARNING_PATHS,
  ...COMPLETION_DOMAIN_SPINE_PATHS,
  ...FORMAL_SCIENCE_DOMAIN_SPINE_PATHS,
];

export type CuratedCognitiveOverride = {
  knowledgeLevel: KnowledgeLevel;
  evidenceMode: EvidenceMode;
  prerequisiteIds: string[];
  pathIds: string[];
};

export const CURATED_COGNITIVE_OVERRIDES = new Map<string, CuratedCognitiveOverride>();

for (const path of CURATED_LEARNING_PATHS) {
  path.steps.forEach((step, index) => {
    const existing = CURATED_COGNITIVE_OVERRIDES.get(step.nodeId);
    const prerequisiteId = index > 0 ? path.steps[index - 1]!.nodeId : null;
    CURATED_COGNITIVE_OVERRIDES.set(step.nodeId, {
      knowledgeLevel: step.level,
      evidenceMode: step.evidenceMode,
      prerequisiteIds: prerequisiteId
        ? [...new Set([...(existing?.prerequisiteIds ?? []), prerequisiteId])]
        : (existing?.prerequisiteIds ?? []),
      pathIds: [...new Set([...(existing?.pathIds ?? []), path.id])],
    });
  });
}

export const CURATED_PREREQUISITE_EDGES: readonly GraphEdge[] = CURATED_LEARNING_PATHS.flatMap(
  (path) =>
    path.steps.slice(1).map((step, index) => ({
      source: path.steps[index]!.nodeId,
      target: step.nodeId,
      type: "domain-link" as const,
      label: `前置：${step.transition}`,
    }))
);

export function getCuratedPathForNode(nodeId: string): CuratedLearningPath | undefined {
  return CURATED_LEARNING_PATHS.find((path) => path.steps.some((step) => step.nodeId === nodeId));
}
