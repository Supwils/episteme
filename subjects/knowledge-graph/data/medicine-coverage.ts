import type { GraphEdge, GraphNode } from "./types";

const node = (
  slug: string,
  label: string,
  type: GraphNode["type"],
  section: string,
  description: string,
  tags: string[]
): GraphNode => ({
  id: `medicine:${slug}`,
  label,
  domain: "medicine",
  type,
  slug,
  section,
  url: `/medicine/${section}/${slug}`,
  description,
  tags,
});

const edge = (source: string, target: string, label: string): GraphEdge => ({
  source: `medicine:${source}`,
  target: `medicine:${target}`,
  type: "cross-reference",
  label,
});

export const MEDICINE_COVERAGE_NODES: GraphNode[] = [
  node(
    "clinical-diagnosis",
    "临床诊断",
    "concept",
    "concepts",
    "把病史、体征和检查整合为可更新的鉴别诊断。",
    ["鉴别诊断", "贝叶斯推断"]
  ),
  node(
    "clinical-trials",
    "临床试验",
    "concept",
    "concepts",
    "以分期、对照和预设终点评价干预的获益与风险。",
    ["随机对照", "试验分期"]
  ),
  node(
    "drug-development",
    "药物研发与临床试验",
    "concept",
    "concepts",
    "从靶点、先导化合物到监管评价的高失败率转化过程。",
    ["药物研发", "转化医学"]
  ),
  node(
    "pharmacology",
    "药理学基础",
    "concept",
    "concepts",
    "研究药物如何到达靶点、产生效应并被机体处理。",
    ["药效学", "药代动力学"]
  ),
  node(
    "medical-genetics-and-genomics",
    "医学遗传学与基因组医学",
    "concept",
    "concepts",
    "连接遗传变异、疾病风险、诊断和个体化治疗。",
    ["遗传变异", "基因组医学"]
  ),
  node(
    "microbiome-and-health",
    "微生物组与健康",
    "concept",
    "concepts",
    "研究人体微生物生态与免疫、代谢和疾病之间的双向关系。",
    ["微生物组", "宿主互作"]
  ),
  node(
    "surgery",
    "外科学",
    "concept",
    "concepts",
    "以解剖、麻醉、无菌和围手术期系统共同控制创伤风险。",
    ["手术", "围手术期"]
  ),
  node(
    "sepsis",
    "败血症（脓毒症）",
    "disease",
    "diseases",
    "感染触发失调宿主反应并造成危及生命的器官功能障碍。",
    ["感染", "器官功能障碍"]
  ),
  node(
    "cardiovascular-disease",
    "心血管疾病",
    "disease",
    "diseases",
    "由动脉粥样硬化、血压和代谢风险共同塑造的主要慢病负担。",
    ["冠心病", "心血管风险"]
  ),
  node(
    "inflammation",
    "炎症",
    "concept",
    "concepts",
    "组织对感染或损伤的保护性反应，也可能在失控后推动慢性病和器官损伤。",
    ["免疫反应", "组织修复"]
  ),
  node(
    "pathology",
    "病理学",
    "concept",
    "concepts",
    "从细胞、组织到分子层面解释疾病机制，并为诊断、分型和治疗选择提供证据。",
    ["组织学", "疾病机制"]
  ),
  node(
    "diabetes",
    "糖尿病",
    "disease",
    "diseases",
    "以持续高血糖和代谢失衡为核心，连接慢病预防、长期照护与并发症管理。",
    ["高血糖", "代谢"]
  ),
  node(
    "stroke",
    "脑卒中",
    "disease",
    "diseases",
    "脑血管事件造成急性神经损伤，治疗时间窗、康复与人群预防必须连续衔接。",
    ["脑血管", "康复"]
  ),
  node(
    "nutrition-science",
    "营养科学",
    "concept",
    "concepts",
    "把膳食模式、营养素、代谢与社会环境连接到疾病预防，同时检验观察研究的因果边界。",
    ["膳食", "代谢健康"]
  ),
  node(
    "crispr-gene-editing",
    "CRISPR 基因编辑",
    "technology",
    "technologies",
    "以可编程核酸识别修改基因组，同时带来脱靶、递送和伦理挑战。",
    ["CRISPR", "基因治疗"]
  ),
  node(
    "ai-in-medical-diagnosis",
    "AI 医学诊断",
    "concept",
    "frontier",
    "算法读片和风险预测必须跨越数据偏移、校准、临床工作流与责任边界。",
    ["医学 AI", "临床验证"]
  ),
];

export const MEDICINE_COVERAGE_EDGES: GraphEdge[] = [
  edge("epidemiology", "clinical-diagnosis", "提供患病率与检验解释"),
  edge("evidence-based-medicine", "clinical-diagnosis", "校准诊断证据"),
  edge("clinical-diagnosis", "clinical-trials", "定义入组与结局"),
  edge("clinical-trials", "evidence-based-medicine", "提供干预证据"),
  edge("drug-development", "clinical-trials", "进入人体评价"),
  edge("pharmacology", "drug-development", "连接剂量与机制"),
  edge("medical-genetics-and-genomics", "crispr-gene-editing", "提供编辑靶点"),
  edge("crispr-gene-editing", "drug-development", "形成治疗平台"),
  edge("immune-system", "microbiome-and-health", "双向调节"),
  edge("microbiome-and-health", "sepsis", "屏障与感染风险"),
  edge("germ-theory", "sepsis", "解释感染起点"),
  edge("anesthesia", "surgery", "使复杂手术可行"),
  edge("antisepsis", "surgery", "控制围术期感染"),
  edge("surgery", "clinical-trials", "接受效果评价"),
  edge("burden-of-disease-daly-qaly", "cardiovascular-disease", "量化慢病负担"),
  edge("clinical-diagnosis", "cardiovascular-disease", "风险分层"),
  edge("immune-system", "inflammation", "启动并调节反应"),
  edge("inflammation", "pathology", "形成组织损伤与修复证据"),
  edge("pathology", "clinical-diagnosis", "确认疾病分型"),
  edge("diabetes", "cardiovascular-disease", "共享代谢与血管风险"),
  edge("nutrition-science", "diabetes", "连接膳食与代谢预防"),
  edge("cardiovascular-disease", "stroke", "共享血管风险路径"),
  edge("stroke", "clinical-diagnosis", "依赖快速识别与影像分流"),
  edge("clinical-diagnosis", "ai-in-medical-diagnosis", "引入算法支持"),
  edge("ai-in-medical-diagnosis", "evidence-based-medicine", "需要外部验证"),
  {
    source: "medicine:clinical-diagnosis",
    target: "mathematics:bayesian-inference",
    type: "domain-link",
    label: "检验结果更新概率",
  },
  {
    source: "medicine:clinical-trials",
    target: "mathematics:statistics",
    type: "domain-link",
    label: "设计与推断",
  },
  {
    source: "medicine:ai-in-medical-diagnosis",
    target: "computer-science:ai-interpretability",
    type: "domain-link",
    label: "临床解释与审计",
  },
  {
    source: "medicine:medical-genetics-and-genomics",
    target: "chemistry:mass-spectrometry",
    type: "domain-link",
    label: "多组学测量",
  },
];
