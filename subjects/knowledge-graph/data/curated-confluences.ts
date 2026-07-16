import type { KnowledgeConfluenceDefinition } from "@/lib/knowledge-confluence";
import type { GraphEdge } from "./types";
import { CURATED_LEARNING_PATHS } from "./curated-learning-paths";

export const CURATED_KNOWLEDGE_CONFLUENCES: readonly KnowledgeConfluenceDefinition[] = [
  {
    id: "ai-governance",
    title: "AI 治理",
    question: "怎样让 AI 系统既可验证、可问责，又不把成本转嫁给劳动者和弱势群体？",
    summary:
      "技术可靠性不能替代公共授权，伦理原则也不能替代组织与劳动证据。这条汇流路线把四种判断同时保留。",
    targetPathId: "ethics-justice",
    synthesisTask: "为一个高风险 AI 场景写出技术约束、权利边界、机构责任与劳动影响四栏治理方案。",
    unresolvedQuestions: [
      "谁有权定义系统的可接受风险？",
      "模型可解释性何时足以支持法律与组织问责？",
      "自动化收益与转型成本应如何分配？",
    ],
    strands: [
      {
        id: "technical-assurance",
        pathId: "patterns-computation",
        role: "required",
        title: "计算与技术保证",
        contribution: "说明系统能做什么、怎样失败，以及哪些性质能够被测试或形式验证。",
        boundary: "技术保证无法自行决定何种风险在社会上可接受。",
        reviewQuestion: "性能、鲁棒性、可解释性与可审计性分别由什么证据支持？",
      },
      {
        id: "rights-legitimacy",
        pathId: "ethics-justice",
        role: "required",
        title: "权利与政治合法性",
        contribution: "把隐私、歧视、正当程序和民主授权变成治理约束，而非附加口号。",
        boundary: "规范原则若没有执行机构和申诉机制，难以改变实际系统。",
        reviewQuestion: "哪些权利不能被平均效用或便利性抵消？",
      },
      {
        id: "platform-institutions",
        pathId: "people-institutions",
        role: "complementary",
        title: "平台市场与制度",
        contribution: "解释平台权力、市场失灵和监管能力怎样塑造算法的真实使用环境。",
        boundary: "制度比较不能直接证明某个模型内部为何产生特定输出。",
        reviewQuestion: "责任应落在模型、部署者、平台还是监管者的哪一层？",
      },
      {
        id: "labor-evidence",
        pathId: "sociology-algorithmic-work-spine",
        role: "contested",
        title: "劳动现场与因果检验",
        contribution: "用组织研究和实验或准实验检查效率承诺、控制强化与工人议价变化。",
        boundary: "单一企业或平台的发现未必能外推到不同劳动制度。",
        reviewQuestion: "谁承担错误、监控和技能贬值的成本，反事实是什么？",
      },
    ],
  },
  {
    id: "urban-climate-adaptation",
    title: "城市气候适应",
    question: "城市应怎样在不确定气候风险下选择既有效、可实施又公平的适应路径？",
    summary:
      "适应不是一项孤立工程，而是物理风险、财政取舍、制度能力与历史不平等共同作用的动态路径。",
    targetPathId: "energy-climate",
    synthesisTask: "为一个沿海或高温城市画出风险链、分阶段投资触发点、受影响群体与政策复盘条件。",
    unresolvedQuestions: [
      "何时应加固原地系统，何时应规划迁移？",
      "不确定性应提高还是推迟近期投入？",
      "谁为历史排放、土地升值与适应收益买单？",
    ],
    strands: [
      {
        id: "physical-risk",
        pathId: "energy-climate",
        role: "required",
        title: "气候机制与风险边界",
        contribution: "从大气、能量与碳循环建立风险机制，并把目标转成可监测约束。",
        boundary: "物理模型不能单独决定社会可接受损失或投资顺序。",
        reviewQuestion: "关键危害、暴露、脆弱性与触发阈值分别是什么？",
      },
      {
        id: "collective-allocation",
        pathId: "shared-future",
        role: "required",
        title: "公共资源与政策分配",
        contribution: "把外部性、公共政策和环境健康纳入跨部门资源选择。",
        boundary: "成本收益总量可能遮蔽损失落在谁身上。",
        reviewQuestion: "每项适应措施替代了什么，机会成本由谁承担？",
      },
      {
        id: "institutional-capacity",
        pathId: "people-institutions",
        role: "complementary",
        title: "城市制度与实施能力",
        contribution: "检查土地、平台、市场与政府层级怎样改变政策执行和维护。",
        boundary: "制度相似不意味着气候暴露和空间形态相同。",
        reviewQuestion: "规划、财政、社区和基础设施运营之间由谁协调？",
      },
      {
        id: "southern-urbanism",
        pathId: "global-south-development",
        role: "contested",
        title: "全球南方与案例偏差",
        contribution: "检验由高收入正式城市形成的适应模型能否解释非正规住区和殖民遗产。",
        boundary: "“全球南方”不是同质案例类别，仍需具体比较。",
        reviewQuestion: "哪些居民、知识和城市形态被主流证据框架排除？",
      },
    ],
  },
  {
    id: "population-ageing",
    title: "人口老龄化",
    question: "社会怎样在寿命延长、照护需求与代际财政之间重建可持续制度？",
    summary:
      "老龄化既不是单一医疗问题，也不能只化约为抚养比；生命历程、家庭结构、生产率和制度证据必须汇流。",
    targetPathId: "history-institutions",
    synthesisTask:
      "比较两个老龄社会的照护、劳动、住房与财政组合，标出可迁移机制和不可直接类比的制度条件。",
    unresolvedQuestions: [
      "更长寿命应怎样改变工作、退休与教育的边界？",
      "家庭、市场与国家之间如何分担照护？",
      "代际公平应比较缴费、服务、财富还是能力？",
    ],
    strands: [
      {
        id: "institutional-history",
        pathId: "history-institutions",
        role: "required",
        title: "人口转型与制度历史",
        contribution: "解释官僚制、工业化与长期制度路径怎样塑造养老和照护安排。",
        boundary: "宏观制度叙事容易掩盖家庭内部和群体之间的差异。",
        reviewQuestion: "哪些结果来自人口结构，哪些来自可改变的制度规则？",
      },
      {
        id: "life-course-family",
        pathId: "cognition-development",
        role: "required",
        title: "生命历程与家庭关系",
        contribution: "把儿童发展、家庭结构和纵向证据连接到全生命周期能力与照护。",
        boundary: "个体发展证据不能直接推导国家层面的财政制度。",
        reviewQuestion: "早期条件、家庭资源与晚年结果之间有哪些累积机制？",
      },
      {
        id: "macro-capacity",
        pathId: "economics-macro-diagnostics-spine",
        role: "complementary",
        title: "宏观财政与融资能力",
        contribution: "检查增长、利率、债务和财政空间怎样约束养老金与公共服务。",
        boundary: "财政可持续不等于社会安排公平或照护质量充分。",
        reviewQuestion: "政策压力来自人口、生产率、利率还是制度设计？",
      },
      {
        id: "measurement-transfer",
        pathId: "measurement-evidence",
        role: "contested",
        title: "测量等值与跨国比较",
        contribution: "检验健康、依赖、幸福与照护负担指标能否跨年龄和制度环境公平比较。",
        boundary: "高可重复性仍不能修复错误构念或遗漏群体。",
        reviewQuestion: "同一个指标在不同年龄、文化与家庭制度中是否测量同一件事？",
      },
    ],
  },
  {
    id: "macro-fiscal-governance",
    title: "宏观财政",
    question: "一国财政路径何时可持续、可信，并同时保有民主选择空间？",
    summary:
      "债务算术提供约束，国家能力决定执行，预期与市场改变传导，而可靠证据负责阻止把情景当成预测。",
    targetPathId: "political-science-fiscal-governance-spine",
    synthesisTask:
      "用增长、通胀、利率、初级余额、制度授权和公众信任六栏写出基准、压力与政策响应情景。",
    unresolvedQuestions: [
      "财政空间是固定上限，还是由制度可信度和货币结构共同形成？",
      "规则如何约束短视而不封死民主调整？",
      "市场压力、通胀感受与政治极化怎样反馈到政策？",
    ],
    strands: [
      {
        id: "debt-arithmetic",
        pathId: "economics-macro-diagnostics-spine",
        role: "required",
        title: "宏观体征与债务算术",
        contribution: "区分名义约束、真实资源、债务动态和外部融资条件。",
        boundary: "会计恒等式与情景模型不能自行决定政策优先级。",
        reviewQuestion: "结论由哪些增长、通胀、利率和汇率假设驱动？",
      },
      {
        id: "fiscal-legitimacy",
        pathId: "political-science-fiscal-governance-spine",
        role: "required",
        title: "财政国家与民主授权",
        contribution: "解释征税能力、预算过程、央行边界和财政规则怎样形成可信承诺。",
        boundary: "制度独立若缺少授权、透明和纠错，也可能削弱合法性。",
        reviewQuestion: "谁能作出跨期承诺，谁监督，何时允许例外？",
      },
      {
        id: "country-diagnostics",
        pathId: "markets-macro",
        role: "complementary",
        title: "国家诊断与市场传导",
        contribution: "把统一框架放进具体国家的增长、价格、金融系统与国债市场。",
        boundary: "单国市场结构和货币地位不能无条件外推。",
        reviewQuestion: "同一赤字在何种国家结构下会产生不同结果？",
      },
      {
        id: "behavioral-evidence",
        pathId: "psychology-reliable-evidence-spine",
        role: "contested",
        title: "预期、风险感知与证据可靠性",
        contribution: "要求通胀心理、风险感知和政治态度的测量具有足够效应、重复性与综合证据。",
        boundary: "心理机制不能替代资产负债表、制度和分配结构。",
        reviewQuestion: "观察到的信任或预期变化是否稳定、可重复且具有政策意义？",
      },
    ],
  },
  {
    id: "public-health-priority",
    title: "公共卫生优先排序",
    question: "有限卫生预算应怎样组合项目，才能兼顾健康收益、公平与真实交付能力？",
    summary:
      "排序不是用一个比值替代政治判断，而是把效果、机会成本、分配价值、预算程序和证据不确定性公开。",
    targetPathId: "medicine-health-priority-spine",
    synthesisTask:
      "为一组候选项目形成组合建议，同时记录被排除方案、敏感性阈值、公平理由与复审触发条件。",
    unresolvedQuestions: [
      "哪些健康差异应获得额外权重，依据是什么？",
      "成本效果、预算影响和可实施性冲突时如何排序？",
      "谁参与价值判断，决定如何被申诉和修订？",
    ],
    strands: [
      {
        id: "health-evidence",
        pathId: "medicine-health-priority-spine",
        role: "required",
        title: "疾病负担与卫生评价",
        contribution: "从人群结果、疾病负担、系统覆盖走到增量评价和组合决策。",
        boundary: "DALY、QALY 和成本效果阈值都包含规范选择，不能被当作自然事实。",
        reviewQuestion: "效果、成本与不确定性是否使用同一比较基线？",
      },
      {
        id: "collective-choice",
        pathId: "shared-future",
        role: "required",
        title: "共同资源与政策选择",
        contribution: "说明外部性、公共政策和上游环境暴露为何必须进入卫生组合。",
        boundary: "跨部门收益更难测量，也更容易被预算边界遗漏。",
        reviewQuestion: "卫生部门之外的成本、收益和责任是否被计算？",
      },
      {
        id: "budget-accountability",
        pathId: "political-science-fiscal-governance-spine",
        role: "complementary",
        title: "预算治理与公共问责",
        contribution: "把技术排序嵌入征税、预算授权、执行监督和民主纠错。",
        boundary: "程序合法不保证技术估计正确，也不自动消除权力不平等。",
        reviewQuestion: "组合由谁授权、执行、审计并向受影响群体解释？",
      },
      {
        id: "evidence-robustness",
        pathId: "measurement-evidence",
        role: "contested",
        title: "测量、可重复性与敏感性",
        contribution: "检验结果指标是否公平可比，结论是否随假设变化，并揭示证据缺口。",
        boundary: "更精确的估计仍可能围绕错误目标进行优化。",
        reviewQuestion: "哪些参数一改变就会翻转组合，哪些结论在合理范围内稳定？",
      },
    ],
  },
] as const;

export function getCuratedKnowledgeConfluence(
  id: string | null | undefined
): KnowledgeConfluenceDefinition | undefined {
  return CURATED_KNOWLEDGE_CONFLUENCES.find((confluence) => confluence.id === id);
}

export function getCuratedConfluenceNodeIds(
  confluence: KnowledgeConfluenceDefinition
): readonly string[] {
  const pathMap = new Map(CURATED_LEARNING_PATHS.map((path) => [path.id, path]));
  const strandNodeIds = confluence.strands.flatMap((strand) => {
    const path = pathMap.get(strand.pathId);
    if (!path)
      throw new Error(`Confluence strand path is missing: ${confluence.id}/${strand.pathId}`);
    return path.steps.filter((step) => step.level <= 4).map((step) => step.nodeId);
  });
  const targetPath = pathMap.get(confluence.targetPathId);
  const targetNodeId = targetPath?.steps.at(-1)?.nodeId;
  if (!targetNodeId) {
    throw new Error(
      `Confluence target path is missing: ${confluence.id}/${confluence.targetPathId}`
    );
  }
  return [...new Set([...strandNodeIds, targetNodeId])];
}

export function getCuratedConfluenceTargetNodeId(
  confluence: KnowledgeConfluenceDefinition
): string {
  return getCuratedConfluenceNodeIds(confluence).at(-1)!;
}

export function getCuratedConfluenceEdgeKeys(
  confluence: KnowledgeConfluenceDefinition
): ReadonlySet<string> {
  const pathMap = new Map(CURATED_LEARNING_PATHS.map((path) => [path.id, path]));
  const targetNodeId = getCuratedConfluenceTargetNodeId(confluence);
  const keys = new Set<string>();
  for (const strand of confluence.strands) {
    const steps = pathMap.get(strand.pathId)!.steps.filter((step) => step.level <= 4);
    const route = [...steps.map((step) => step.nodeId), targetNodeId];
    for (let index = 0; index < route.length - 1; index += 1) {
      keys.add(`${route[index]}->${route[index + 1]}`);
      keys.add(`${route[index + 1]}->${route[index]}`);
    }
  }
  return keys;
}

const ROLE_EDGE_LABELS = {
  required: "必要主线汇入研究问题",
  complementary: "互补视角汇入研究问题",
  contested: "争议检验汇入研究问题",
} as const;

export const CURATED_CONFLUENCE_EDGES: readonly GraphEdge[] = CURATED_KNOWLEDGE_CONFLUENCES.flatMap(
  (confluence) => {
    const pathMap = new Map(CURATED_LEARNING_PATHS.map((path) => [path.id, path]));
    const targetNodeId = getCuratedConfluenceTargetNodeId(confluence);
    return confluence.strands.map((strand) => ({
      source: pathMap.get(strand.pathId)!.steps.find((step) => step.level === 4)!.nodeId,
      target: targetNodeId,
      type: "domain-link" as const,
      label: ROLE_EDGE_LABELS[strand.role],
    }));
  }
);

export function getCuratedConfluenceBridgeEdges(
  confluence: KnowledgeConfluenceDefinition
): readonly GraphEdge[] {
  const nodeIds = new Set(getCuratedConfluenceNodeIds(confluence));
  const targetNodeId = getCuratedConfluenceTargetNodeId(confluence);
  return CURATED_CONFLUENCE_EDGES.filter(
    (edge) => edge.target === targetNodeId && nodeIds.has(edge.source)
  );
}
