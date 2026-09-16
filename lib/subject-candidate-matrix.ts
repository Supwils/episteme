import type { KnowledgeDomainId } from "./knowledge-continuum";
import type { KnowledgeLevel } from "./knowledge-levels";

export type SubjectCandidateId =
  | "linguistics"
  | "comparative-law"
  | "arts-aesthetics"
  | "engineering"
  | "literature-narrative"
  | "religion-studies"
  | "anthropology-archaeology"
  | "education-learning-sciences";

export const SUBJECT_SCORE_DIMENSIONS = {
  existingSeeds: { label: "现有内容种子", weight: 0.2 },
  crossDomainReach: { label: "跨学科连接", weight: 0.2 },
  levelCoherence: { label: "五级递进完整性", weight: 0.15 },
  sourceReadiness: { label: "权威开放来源", weight: 0.15 },
  visualizationFit: { label: "可视化适配", weight: 0.1 },
  globalCoverage: { label: "全球与非西方覆盖", weight: 0.1 },
  deliveryFeasibility: { label: "交付与维护可行性", weight: 0.1 },
} as const;

export type SubjectScoreDimension = keyof typeof SUBJECT_SCORE_DIMENSIONS;
export type SubjectScores = Record<SubjectScoreDimension, 1 | 2 | 3 | 4 | 5>;

export type SubjectLearningStage = {
  level: KnowledgeLevel;
  title: string;
  question: string;
  concepts: readonly string[];
};

export type SubjectSource = {
  name: string;
  url: string;
  role: string;
  access: "open" | "reference";
};

export type SubjectCandidate = {
  id: SubjectCandidateId;
  label: string;
  positioning: string;
  scores: SubjectScores;
  bridgeDomains: readonly KnowledgeDomainId[];
  learningSpine: readonly SubjectLearningStage[];
  releaseArticleCount: number;
  releaseSections: readonly string[];
  visualizations: readonly string[];
  globalCoverageCommitments: readonly string[];
  sources: readonly SubjectSource[];
  risks: readonly string[];
  launchGate: string;
};

export function calculateCandidateScore(scores: SubjectScores): number {
  return Object.entries(SUBJECT_SCORE_DIMENSIONS).reduce((total, [dimension, definition]) => {
    return total + scores[dimension as SubjectScoreDimension] * definition.weight;
  }, 0);
}

export const SUBJECT_CANDIDATES: readonly SubjectCandidate[] = [
  {
    id: "linguistics",
    label: "语言学",
    positioning: "研究人类如何以声音、手势和文字组织意义，以及语言怎样在心智、社会与技术中变化。",
    scores: {
      existingSeeds: 5,
      crossDomainReach: 5,
      levelCoherence: 5,
      sourceReadiness: 5,
      visualizationFit: 4,
      globalCoverage: 5,
      deliveryFeasibility: 4,
    },
    bridgeDomains: [
      "psychology",
      "philosophy",
      "computer-science",
      "human-history",
      "sociology",
      "life-science",
      "mathematics",
      "political-science",
    ],
    learningSpine: [
      {
        level: 1,
        title: "听见、看见与表达",
        question: "人为什么能用声音、手势和符号互相理解？",
        concepts: ["语言与言语", "声音与手语", "词与句子", "文字不是语言本身"],
      },
      {
        level: 2,
        title: "语言的结构层次",
        question: "有限的单位怎样组合出无限表达？",
        concepts: ["语音学", "音系学", "形态学", "句法学", "语义学", "语用学"],
      },
      {
        level: 3,
        title: "语言在时间与社会中变化",
        question: "语言为何分化、接触、改变，也为何与身份和权力相连？",
        concepts: ["语言习得", "历史语言学", "类型学", "社会语言学", "多语现象"],
      },
      {
        level: 4,
        title: "记录、比较与建模",
        question: "怎样用田野、语料、实验和计算证据检验语言理论？",
        concepts: ["语言田野调查", "语料库", "心理语言实验", "声学测量", "计算模型"],
      },
      {
        level: 5,
        title: "语言、心智与机器的边界",
        question: "语言能力从何而来，人工智能又真正掌握了什么？",
        concepts: ["语言演化", "濒危语言", "语言与认知", "低资源语言技术", "大模型语言能力"],
      },
    ],
    releaseArticleCount: 63,
    releaseSections: [
      "声音与手势",
      "词句与意义",
      "习得与心智",
      "历史、类型与社会",
      "文字系统",
      "方法与前沿",
    ],
    visualizations: [
      "发音与 IPA 探索器",
      "句法树构造器",
      "语言谱系与类型地图",
      "文字系统时间轴",
      "音变模拟器",
    ],
    globalCoverageCommitments: [
      "汉语与汉藏语系",
      "南亚语言",
      "阿拉伯语与亚非语系",
      "尼日尔-刚果语系",
      "南岛语系",
      "美洲与澳洲原住民语言",
      "手语",
    ],
    sources: [
      {
        name: "Linguistic Society of America",
        url: "https://www.lsadc.org/",
        role: "学科边界、研究议题与专业规范",
        access: "reference",
      },
      {
        name: "Glottolog",
        url: "https://glottolog.org/",
        role: "语言、方言、语系与稳定标识",
        access: "open",
      },
      {
        name: "Unicode Standard",
        url: "https://www.unicode.org/standard/standard.html",
        role: "全球文字系统与字符编码",
        access: "open",
      },
      {
        name: "UNESCO multilingualism",
        url: "https://www.unesco.org/en/multilingualism-linguistic-diversity",
        role: "多语、原住民语言与语言权利",
        access: "open",
      },
    ],
    risks: [
      "音频与字体资产体积",
      "语言/方言命名具有社会政治含义",
      "主流理论与英语材料偏置",
      "低资源语言资料质量不均",
    ],
    launchGate: "36 篇内容、5 个可用可视化、至少 7 个全球覆盖簇及 8 条现有学科桥全部通过审计。",
  },
  {
    id: "comparative-law",
    label: "比较法与法律制度",
    positioning:
      "比较不同法律传统如何界定权利、义务、程序与公共权力，而不是提供特定司法辖区的法律建议。",
    scores: {
      existingSeeds: 4,
      crossDomainReach: 4,
      levelCoherence: 4,
      sourceReadiness: 3,
      visualizationFit: 3,
      globalCoverage: 3,
      deliveryFeasibility: 2,
    },
    bridgeDomains: [
      "political-science",
      "philosophy",
      "human-history",
      "economics",
      "sociology",
      "computer-science",
    ],
    learningSpine: [
      {
        level: 1,
        title: "规则、公平与冲突",
        question: "共同生活为什么需要可公开执行的规则？",
        concepts: ["规则", "权利", "责任", "证据"],
      },
      {
        level: 2,
        title: "法律的基本部门",
        question: "公法、私法、刑法与程序法分别处理什么？",
        concepts: ["宪法", "合同", "侵权", "刑法", "诉讼"],
      },
      {
        level: 3,
        title: "法律传统与制度",
        question: "不同社会如何组织立法、司法与习惯法？",
        concepts: ["大陆法", "普通法", "伊斯兰法", "习惯法", "混合法系"],
      },
      {
        level: 4,
        title: "解释、比较与实证",
        question: "怎样解释规范并评估法律实际产生的效果？",
        concepts: ["法律解释", "比较法", "案例研究", "法律实证", "法经济学"],
      },
      {
        level: 5,
        title: "跨境与技术治理",
        question: "全球规则如何应对平台、AI、气候与跨境风险？",
        concepts: ["国际法", "数字权利", "AI 治理", "气候诉讼", "法律多元主义"],
      },
    ],
    releaseArticleCount: 34,
    releaseSections: ["法律基础", "公法", "私法", "刑法与程序", "比较法律传统", "全球与数字治理"],
    visualizations: ["案件程序路径图", "宪法权力结构比较器", "法律传统地图", "权利冲突论证图"],
    globalCoverageCommitments: [
      "中华法传统与现代转型",
      "南亚法律多元主义",
      "伊斯兰法传统",
      "非洲习惯法与成文法",
      "拉美宪政",
      "原住民法秩序",
    ],
    sources: [
      {
        name: "United Nations Rule of Law",
        url: "https://www.un.org/ruleoflaw/what-is-the-rule-of-law/",
        role: "法治与人权的全球规范基线",
        access: "open",
      },
      {
        name: "World Legal Information Institute",
        url: "https://www.worldlii.org/",
        role: "多司法辖区法律资料入口",
        access: "open",
      },
    ],
    risks: [
      "法律随司法辖区与时间变化",
      "不能混同知识解释与法律建议",
      "全球材料的可比性不足",
      "敏感争议需并列呈现",
    ],
    launchGate: "建立司法辖区、适用日期、法源层级和非法律建议标识后，才进入内容生产。",
  },
  {
    id: "arts-aesthetics",
    label: "艺术、建筑与美学",
    positioning: "从观看、材料与制作进入全球视觉文化，并连接审美经验、技术、社会制度和历史语境。",
    scores: {
      existingSeeds: 4,
      crossDomainReach: 5,
      levelCoherence: 4,
      sourceReadiness: 4,
      visualizationFit: 5,
      globalCoverage: 4,
      deliveryFeasibility: 2,
    },
    bridgeDomains: [
      "philosophy",
      "human-history",
      "psychology",
      "mathematics",
      "universe-physics",
      "chemistry",
      "sociology",
    ],
    learningSpine: [
      {
        level: 1,
        title: "观看、聆听与制作",
        question: "颜色、形状、空间和材料怎样引发感受？",
        concepts: ["线条", "色彩", "构图", "材料", "观看"],
      },
      {
        level: 2,
        title: "媒介与形式",
        question: "绘画、雕塑、建筑、摄影与数字媒介如何工作？",
        concepts: ["媒介", "透视", "比例", "图像", "空间"],
      },
      {
        level: 3,
        title: "作品、传统与制度",
        question: "风格如何在历史、市场、博物馆与社群中形成？",
        concepts: ["图像学", "风格", "赞助", "博物馆", "视觉文化"],
      },
      {
        level: 4,
        title: "分析、保护与数据",
        question: "怎样验证归属、材料、年代和传播路径？",
        concepts: ["形式分析", "档案", "材料分析", "保护科学", "数字人文"],
      },
      {
        level: 5,
        title: "全球艺术史与生成文化",
        question: "谁定义艺术，算法和去殖民实践又改变了什么？",
        concepts: ["全球艺术史", "去殖民", "生成艺术", "文化遗产", "审美政治"],
      },
    ],
    releaseArticleCount: 40,
    releaseSections: [
      "视觉基础",
      "媒介与材料",
      "建筑与空间",
      "全球艺术传统",
      "美学与视觉文化",
      "方法与数字前沿",
    ],
    visualizations: [
      "作品细节比较器",
      "透视与构图实验室",
      "材料和颜料剖面",
      "全球艺术交流地图",
      "建筑空间探索器",
    ],
    globalCoverageCommitments: [
      "东亚书画与建筑",
      "南亚宗教艺术",
      "伊斯兰视觉文化",
      "非洲艺术与现代性",
      "拉美与加勒比艺术",
      "大洋洲与原住民艺术",
    ],
    sources: [
      {
        name: "UNESCO Culture and Arts Education Framework",
        url: "https://www.unesco.org/sites/default/files/medias/fichiers/2024/02/WCCAE_UNESCO%20Framework_EN_0.pdf",
        role: "文化艺术教育的全球范围与原则",
        access: "open",
      },
      {
        name: "Getty Vocabularies",
        url: "https://www.getty.edu/research/tools/vocabularies/",
        role: "艺术、建筑、对象、人物与地点的受控词表",
        access: "open",
      },
      {
        name: "The Met Open Access",
        url: "https://www.metmuseum.org/policies/terms-and-conditions",
        role: "CC0 作品图像与对象数据",
        access: "open",
      },
    ],
    risks: [
      "对象元数据与图像许可必须逐件核验",
      "视觉经典容易重复西方正典",
      "大图和 3D 资产影响性能",
      "归属与年代可能持续修订",
    ],
    launchGate:
      "先建立逐对象 rights/provenance/source 元数据和图片性能预算，再生产首批 40 篇内容。",
  },
  {
    id: "engineering",
    label: "工程与技术",
    positioning: "从能量、材料与系统进入人造物世界——工程如何把科学变成能可靠运转的东西。",
    scores: {
      existingSeeds: 3,
      crossDomainReach: 5,
      levelCoherence: 4,
      sourceReadiness: 4,
      visualizationFit: 4,
      globalCoverage: 3,
      deliveryFeasibility: 3,
    },
    bridgeDomains: [
      "universe-physics",
      "chemistry",
      "computer-science",
      "mathematics",
      "earth-science",
      "economics",
      "medicine",
    ],
    learningSpine: [
      {
        level: 1,
        title: "工具与机器",
        question: "杠杆、轮轴与引擎怎样放大人的力量？",
        concepts: ["简单机械", "热机", "电动机", "测量"],
      },
      {
        level: 2,
        title: "能量与材料",
        question: "电、钢、混凝土与硅各自能做什么？",
        concepts: ["电力", "钢铁", "混凝土", "半导体", "强度"],
      },
      {
        level: 3,
        title: "系统与基础设施",
        question: "电网、交通网与供水系统怎样作为整体运转？",
        concepts: ["电网", "交通", "供水", "物流", "冗余"],
      },
      {
        level: 4,
        title: "设计、安全与失效",
        question: "怎样在设计中管理误差、疲劳与最坏情况？",
        concepts: ["安全系数", "失效分析", "可靠性", "维护", "韧性"],
      },
      {
        level: 5,
        title: "工程前沿与伦理",
        question: "能源转型、先进芯片与深空工程面临什么开放难题？",
        concepts: ["能源转型", "先进制造", "航天工程", "工程伦理", "军民两用"],
      },
    ],
    releaseArticleCount: 36,
    releaseSections: [
      "工程基础",
      "能源与动力",
      "材料与制造",
      "信息与机器",
      "土木与建造",
      "重大工程与伦理",
    ],
    visualizations: ["电网潮流模拟器", "结构受力实验室", "材料性能剖面", "芯片制造流程图"],
    globalCoverageCommitments: [
      "中国工程传统与现代基建",
      "欧洲工业遗产",
      "北美技术体系",
      "日本精密制造",
      "印度与南亚工程",
      "非洲基础设施",
      "拉美能源",
    ],
    sources: [
      {
        name: "NAE Grand Challenges for Engineering",
        url: "https://www.nae.edu/19582/19582/21403/22529/23174/Grand-Challenges-for-Engineering",
        role: "工程前沿议题的全球框架",
        access: "open",
      },
      {
        name: "MIT OpenCourseWare Engineering",
        url: "https://ocw.mit.edu/",
        role: "工程基础概念的开放课程材料",
        access: "open",
      },
    ],
    risks: ["军民两用技术的内容边界", "设备与实验的安全提示", "工程数据随项目进展快速过时"],
    launchGate: "建立军民两用内容边界与工程安全提示规范后，再进入内容生产。",
  },
  {
    id: "literature-narrative",
    label: "文学与叙事",
    positioning:
      "从“故事为什么有效”进入文学——叙事结构、诗学形式、世界经典与阅读方法，把文本当作可分析的对象而不只是品味。",
    scores: {
      existingSeeds: 3,
      crossDomainReach: 4,
      levelCoherence: 5,
      sourceReadiness: 5,
      visualizationFit: 3,
      globalCoverage: 4,
      deliveryFeasibility: 4,
    },
    bridgeDomains: [
      "linguistics",
      "philosophy",
      "human-history",
      "psychology",
      "sociology",
      "arts",
    ],
    learningSpine: [
      {
        level: 1,
        title: "故事是什么",
        question: "为什么人会被一个虚构的故事牵动？",
        concepts: ["情节", "人物", "冲突", "视角"],
      },
      {
        level: 2,
        title: "形式与技艺",
        question: "诗、小说与戏剧各自靠什么手段起作用？",
        concepts: ["韵律", "叙述者", "隐喻", "文体"],
      },
      {
        level: 3,
        title: "世界文学的多中心",
        question: "不同文明的叙事传统提出了哪些不同的问题？",
        concepts: ["史诗", "抒情传统", "小说兴起", "口头文学"],
      },
      {
        level: 4,
        title: "阅读方法与理论",
        question: "怎样在细读、历史语境与理论视角之间做出有依据的解释？",
        concepts: ["细读", "叙事学", "接受美学", "文本考据"],
      },
      {
        level: 5,
        title: "文学的当代边界",
        question: "数字阅读、翻译政治与机器生成如何改变文学的定义？",
        concepts: ["远读", "翻译研究", "正典之争", "生成文本"],
      },
    ],
    releaseArticleCount: 38,
    releaseSections: [
      "叙事基础",
      "诗学与形式",
      "世界文学传统",
      "文学理论与方法",
      "阅读与接受",
      "当代边界",
    ],
    visualizations: ["叙事结构图谱", "格律与音步实验室", "世界文学时空地图", "译本比较器"],
    globalCoverageCommitments: [
      "汉语文学传统",
      "欧洲正典与其批评",
      "阿拉伯—波斯叙事",
      "南亚史诗与诗学",
      "非洲口头文学",
      "拉美与加勒比文学",
      "东亚与东南亚现代文学",
    ],
    sources: [
      {
        name: "Project Gutenberg",
        url: "https://www.gutenberg.org/",
        role: "公有领域文学文本的一手来源",
        access: "open",
      },
      {
        name: "中国哲学书电子化计划（ctext.org）",
        url: "https://ctext.org/",
        role: "汉语古典文本的可引用原文库",
        access: "open",
      },
    ],
    risks: [
      "文学判断的主观性需要与可核查的事实分层表述",
      "在版权保护期内的作品只能引用片段",
      "正典选择容易滑向单一文明中心",
    ],
    launchGate:
      "先确立“事实层（版本、年代、生平）与解释层（读法、评价）分离表述”的写作规范，以及引文长度的版权口径。",
  },
  {
    id: "religion-studies",
    label: "宗教学",
    positioning:
      "从制度、文本与比较进入宗教——神圣与凡俗、经典与正典、宗教与社会、世俗化之争。描述人类如何组织神圣，不替任何传统认信。",
    scores: {
      existingSeeds: 2,
      crossDomainReach: 5,
      levelCoherence: 5,
      sourceReadiness: 5,
      visualizationFit: 3,
      globalCoverage: 5,
      deliveryFeasibility: 3,
    },
    bridgeDomains: [
      "philosophy",
      "human-history",
      "sociology",
      "psychology",
      "linguistics",
      "political-science",
    ],
    learningSpine: [
      {
        level: 1,
        title: "什么是宗教",
        question: "把一堆实践叫做“宗教”，依据的是定义还是制度？",
        concepts: ["神圣", "仪式", "共同体", "分类"],
      },
      {
        level: 2,
        title: "仪式、神话与历史",
        question: "实践和叙述怎样在时间里被做成可识别的传统？",
        concepts: ["仪式过程", "神话", "轴心时代", "正典"],
      },
      {
        level: 3,
        title: "比较如何可能",
        question: "跨传统比较会不会把别人的神做成自己的范畴？",
        concepts: ["一神与多神", "救赎", "宗教法", "翻译"],
      },
      {
        level: 4,
        title: "宗教与社会",
        question: "权力、性别、暴力与圣地如何进入宗教制度？",
        concepts: ["政教", "性别", "朝圣", "离散"],
      },
      {
        level: 5,
        title: "世俗化之后",
        question: "现代社会是宗教消退，还是宗教改道？",
        concepts: ["世俗化命题", "祛魅", "公民宗教", "科学"],
      },
    ],
    releaseArticleCount: 30,
    releaseSections: ["宗教基础", "宗教史", "经典与文本", "比较宗教", "宗教与社会", "世俗化"],
    visualizations: ["仪式结构实验室", "世界宗教示意地图", "经典开篇比较器", "世俗化指标示意"],
    globalCoverageCommitments: [
      "西亚一神教传统",
      "南亚与内亚",
      "东亚儒教—佛教—道教交叠",
      "非洲本土宗教与基督教/伊斯兰教",
      "美洲原住民与殖民后宗教",
      "欧洲基督教与世俗化",
      "当代离散与全球南方",
    ],
    sources: [
      {
        name: "Internet Sacred Text Archive",
        url: "https://www.sacred-texts.com/",
        role: "公有领域圣典译本与比较材料的开放库",
        access: "open",
      },
      {
        name: "中国哲学书电子化计划（ctext.org）",
        url: "https://ctext.org/",
        role: "汉语古典宗教—哲学文本的可引用原文库",
        access: "open",
      },
    ],
    risks: [
      "认信口吻会把教义写成世界属性",
      "世界宗教百分比图容易假装精确底图",
      "仪式条目滑向可操作步骤",
    ],
    launchGate:
      "先确立描述性而非认信的写法：事实层（制度、文本、年代）与解释层（神义、救赎主张）分离，并禁止可复现的仪式操作步骤。",
  },
  {
    id: "anthropology-archaeology",
    label: "人类学 / 考古学",
    positioning:
      "从亲属、物质文化与考古记录进入人类差异——民族志方法、史前年代、交换与遗产。描述群体如何组织生活与遗存，不写田野采集手册，也不把在世人群做成标本。",
    scores: {
      existingSeeds: 2,
      crossDomainReach: 5,
      levelCoherence: 4,
      sourceReadiness: 4,
      visualizationFit: 4,
      globalCoverage: 5,
      deliveryFeasibility: 3,
    },
    bridgeDomains: [
      "sociology",
      "human-history",
      "linguistics",
      "life-science",
      "earth-science",
      "religion",
    ],
    learningSpine: [
      {
        level: 1,
        title: "文化不是常识",
        question: "把别人的做法叫做“文化”，依据的是观察还是刻板印象？",
        concepts: ["文化", "民族志", "主位与客位", "比较"],
      },
      {
        level: 2,
        title: "亲属、交换与物",
        question: "人怎样用称谓、礼物和器物把关系做出来？",
        concepts: ["亲属称谓", "互惠", "物质文化", "技术"],
      },
      {
        level: 3,
        title: "考古记录如何说话",
        question: "地层、年代和器物组合能证明什么，不能证明什么？",
        concepts: ["地层学", "测年", "遗址", "类型学"],
      },
      {
        level: 4,
        title: "方法与证据",
        question: "田野笔记、发掘报告和实验室数据怎样互相校正？",
        concepts: ["参与观察", "发掘记录", "残差与取样", "口头传统"],
      },
      {
        level: 5,
        title: "遗产、都市与伦理",
        question: "谁有权讲述、收藏和归还过去？",
        concepts: ["遗产", "都市人类学", "归还", "知情同意"],
      },
    ],
    releaseArticleCount: 36,
    releaseSections: [
      "文化与方法",
      "亲属与交换",
      "物质文化",
      "史前与考古",
      "都市与遗产",
      "比较与伦理",
    ],
    visualizations: ["亲属称谓示意图", "物质文化分布示意地图", "史前年代标尺", "交换与互惠实验室"],
    globalCoverageCommitments: [
      "非洲",
      "大洋洲",
      "美洲原住民",
      "东亚与东南亚",
      "南亚",
      "近东与地中海",
      "北极与环极",
    ],
    sources: [
      {
        name: "Smithsonian Open Access",
        url: "https://www.si.edu/openaccess",
        role: "公有领域与开放许可的物质文化图像与元数据",
        access: "open",
      },
      {
        name: "Open Context",
        url: "https://opencontext.org/",
        role: "考古与物质文化的开放数据集与发掘记录引用",
        access: "open",
      },
    ],
    risks: [
      "田野条目滑向可操作的采集或盗掘指南",
      "示意地图把遗址坐标写成寻宝图",
      "把在世群体写成无历史的标本",
    ],
    launchGate:
      "先确立描述性民族志与考古学写法：事实层（遗址、器物、称谓、制度）与解释层（文化本质、单线进化）分离；禁止田野采集步骤，物质文化地图不得提供盗掘可用的地点精度。",
  },
  {
    id: "education-learning-sciences",
    label: "教育学 / 学习科学",
    positioning:
      "从学习理论、记忆与评估进入教育——教学设计、测量与公平、教育技术。描述学校与学习如何被组织，不写可复现的应试刷题手册，也不把“学习风格”写成已被证实的神经事实。",
    scores: {
      existingSeeds: 3,
      crossDomainReach: 4,
      levelCoherence: 4,
      sourceReadiness: 4,
      visualizationFit: 3,
      globalCoverage: 3,
      deliveryFeasibility: 3,
    },
    bridgeDomains: [
      "psychology",
      "linguistics",
      "sociology",
      "computer-science",
      "philosophy",
      "political-science",
    ],
    learningSpine: [
      {
        level: 1,
        title: "学习不是灌输",
        question: "把“学会了”写成可观察的改变，依据的是作业、谈话还是脑区彩图？",
        concepts: ["学习", "教学", "课程", "评估"],
      },
      {
        level: 2,
        title: "记忆、注意与迁移",
        question: "遗忘曲线和练习间隔能证明什么，不能证明什么？",
        concepts: ["工作记忆", "间隔练习", "迁移", "元认知"],
      },
      {
        level: 3,
        title: "课堂、制度与公平",
        question: "分班、考试和经费怎样分配谁被当成可教的学生？",
        concepts: ["课程政治", "标准化测验", "教育公平", "学校组织"],
      },
      {
        level: 4,
        title: "测量与证据",
        question: "信效度、随机对照与课堂民族志怎样互相校正？",
        concepts: ["教育测量", "实验设计", "形成性评价", "学习分析"],
      },
      {
        level: 5,
        title: "技术、政策与开放问题",
        question: "自适应系统与生成式模型改的是练习条件，还是证书与监视？",
        concepts: ["教育技术", "学习分析伦理", "教师劳动", "全球南方学校"],
      },
    ],
    releaseArticleCount: 36,
    releaseSections: [
      "学习基础",
      "认知与记忆",
      "课程与教学",
      "评估与公平",
      "教育技术",
      "比较与政策",
    ],
    visualizations: ["遗忘与间隔练习示意", "课堂互动结构图", "测验分数分解器", "自适应路径示意"],
    globalCoverageCommitments: [
      "东亚考试文化",
      "北欧综合学校",
      "撒哈拉以南普及教育",
      "拉丁美洲条件现金与就学",
      "南亚与殖民课程遗产",
      "原住民与双语教育",
    ],
    sources: [
      {
        name: "ERIC",
        url: "https://eric.ed.gov/",
        role: "教育研究报告与同行评审论文的开放索引",
        access: "open",
      },
      {
        name: "UNESCO Institute for Statistics",
        url: "https://uis.unesco.org/",
        role: "入学、完成与学习成果的国际统计",
        access: "open",
      },
    ],
    risks: [
      "把学习风格、左脑右脑写成已证实的教学处方",
      "课堂条目滑向可复现的应试刷题或监视学生的操作手册",
      "把某国分数神话写成文明本质",
    ],
    launchGate:
      "先确立描述性学习科学写法：事实层（实验、测验技术、学校制度）与解释层（天赋、文化本质、技术救世）分离；禁止把有争议的神经神话写成课堂处方。",
  },
] as const;

export const RANKED_SUBJECT_CANDIDATES = [...SUBJECT_CANDIDATES].sort(
  (left, right) => calculateCandidateScore(right.scores) - calculateCandidateScore(left.scores)
);

export const LAUNCHED_SUBJECT_CANDIDATE_IDS: ReadonlySet<SubjectCandidateId> = new Set([
  "linguistics",
  "comparative-law",
  "arts-aesthetics",
  "engineering",
  "literature-narrative",
  "religion-studies",
  "anthropology-archaeology",
  "education-learning-sciences",
]);

export const RANKED_NEXT_SUBJECT_CANDIDATES = RANKED_SUBJECT_CANDIDATES.filter(
  (candidate) => !LAUNCHED_SUBJECT_CANDIDATE_IDS.has(candidate.id)
);

/** Undefined once every matrix candidate is launched; do not invent a B7 to keep this defined. */
export const RECOMMENDED_SUBJECT_CANDIDATE: SubjectCandidate | undefined =
  RANKED_NEXT_SUBJECT_CANDIDATES[0];
