import type { GraphNode, GraphEdge } from "./types";
import { SOCIOLOGY_COVERAGE_EDGES, SOCIOLOGY_COVERAGE_NODES } from "./sociology-coverage";

const n = (
  slug: string,
  label: string,
  type: GraphNode["type"],
  section: string,
  description: string,
  tags: string[]
): GraphNode => ({
  id: `sociology:${slug}`,
  label,
  domain: "sociology",
  type,
  slug,
  section,
  url: `/sociology/${section}/${slug}`,
  tags,
  description,
});

export const SOCIOLOGY_NODES: GraphNode[] = [
  n("emile-durkheim", "涂尔干", "thinker", "thinkers", "社会事实、分工、宗教与自杀研究。", [
    "社会事实",
    "分工",
    "宗教",
  ]),
  n("max-weber-sociology", "韦伯（社会学）", "thinker", "thinkers", "理性化、合法支配与官僚制。", [
    "理性化",
    "官僚制",
  ]),
  n("pierre-bourdieu", "布迪厄", "thinker", "thinkers", "场域、资本、惯习与象征暴力。", [
    "场域",
    "文化资本",
  ]),
  n("erving-goffman", "戈夫曼", "thinker", "thinkers", "拟剧论、互动秩序、面子工作与污名。", [
    "拟剧论",
    "污名",
  ]),
  n("w-e-b-du-bois", "杜波依斯", "thinker", "thinkers", "双重意识、色线与城市社会学先驱。", [
    "双重意识",
    "种族",
  ]),
  n("social-structure", "社会结构", "concept", "concepts", "角色、制度和资源分布构成行动条件。", [
    "结构",
    "角色",
  ]),
  n("social-capital", "社会资本", "concept", "concepts", "关系网络中的信任、互惠与机会。", [
    "网络",
    "信任",
  ]),
  n(
    "social-support-mental-health",
    "社会支持、孤独与心理健康",
    "concept",
    "concepts",
    "区分孤立、孤独、支持与归属，并追踪关系质量如何影响压力、求助和持续照护。",
    ["社会支持", "孤独", "心理健康", "社会网络"]
  ),
  n(
    "social-stratification",
    "社会分层",
    "concept",
    "concepts",
    "阶层、流动和生活机会的不平等结构。",
    ["阶层", "流动"]
  ),
  n(
    "gender-and-society",
    "社会性别",
    "concept",
    "concepts",
    "性别角色、父权制、交叉性与照护劳动。",
    ["性别", "照护"]
  ),
  n(
    "social-network-analysis",
    "社会网络分析",
    "concept",
    "concepts",
    "节点、边、弱关系、中心性与结构洞。",
    ["网络", "弱关系"]
  ),
  n(
    "deviance-and-social-control",
    "越轨与社会控制",
    "concept",
    "concepts",
    "越轨标签、规范执行、医学化、监控与修复性正义。",
    ["越轨", "标签"]
  ),
  n(
    "chinese-social-thought",
    "中国社会思想",
    "concept",
    "concepts",
    "差序格局、礼治、家国关系、乡土社会和中国现代性。",
    ["中国社会思想", "差序格局"]
  ),
  n(
    "indian-social-thought",
    "印度社会思想",
    "concept",
    "concepts",
    "种姓、村落研究、梵化、民主政治和 Ambedkar 的社会正义。",
    ["印度社会", "种姓"]
  ),
  n(
    "islamic-social-thought",
    "伊斯兰社会思想",
    "concept",
    "concepts",
    "伊本·赫勒敦、乌玛、瓦克夫、法学共同体和殖民现代性。",
    ["伊斯兰社会", "伊本赫勒敦"]
  ),
  n(
    "latin-american-dependency-liberation-sociology",
    "拉美依附理论与解放社会学",
    "concept",
    "concepts",
    "中心—外围、依附、参与式行动研究和解放社会学。",
    ["依附理论", "解放社会学"]
  ),
  n("bureaucracy", "官僚制", "institution", "institutions", "规则、档案、层级与现代组织技术。", [
    "组织",
    "规则",
  ]),
  n("urbanization", "城市化", "institution", "institutions", "城市生活、空间不平等与公共空间。", [
    "城市",
    "空间",
  ]),
  n(
    "family-and-kinship",
    "家庭与亲属关系",
    "institution",
    "institutions",
    "亲密关系、照护劳动、代际契约和不平等再生产。",
    ["家庭", "亲属"]
  ),
  n(
    "education-and-credentialism",
    "教育与文凭社会",
    "institution",
    "institutions",
    "学校、隐性课程、文化资本与文凭主义。",
    ["教育", "文凭"]
  ),
  n(
    "digital-platform-society",
    "数字平台社会",
    "institution",
    "institutions",
    "平台、数据化、算法治理和平台劳动。",
    ["平台", "算法"]
  ),
  n(
    "migration-and-diaspora",
    "迁移与离散",
    "institution",
    "institutions",
    "迁移网络、跨国主义、边界、离散社群和二代经验。",
    ["迁移", "离散"]
  ),
  n(
    "work-and-labor-organizations",
    "工作与劳动组织",
    "institution",
    "institutions",
    "劳动过程、组织控制、情绪劳动、平台劳动和工会。",
    ["劳动", "组织"]
  ),
  n(
    "religion-and-secularization",
    "宗教与世俗化",
    "institution",
    "institutions",
    "宗教共同体、世俗化、公共宗教和社会整合。",
    ["宗教", "世俗化"]
  ),
  n(
    "african-urbanization",
    "非洲城市化",
    "institution",
    "institutions",
    "非正规住区、青年劳动、基础设施、气候风险和城市治理。",
    ["非洲城市", "非正规性"]
  ),
  n("ethnography", "民族志", "concept", "methods", "长期田野、参与观察、厚描与反身性。", [
    "田野",
    "质性",
  ]),
  n(
    "survey-research",
    "调查研究",
    "concept",
    "methods",
    "抽样、测量和统计推断连接个体回答与群体知识。",
    ["抽样", "问卷"]
  ),
  n(
    "in-depth-interviews",
    "深度访谈",
    "concept",
    "methods",
    "用提纲、追问和叙事分析理解生活经验与制度遭遇。",
    ["访谈", "叙事"]
  ),
  n(
    "comparative-historical-analysis",
    "比较历史分析",
    "concept",
    "methods",
    "用案例比较、过程追踪和路径依赖解释长期制度变化。",
    ["历史", "路径依赖"]
  ),
  n(
    "content-analysis",
    "内容分析",
    "concept",
    "methods",
    "系统编码文本、图像和平台内容中的意义结构。",
    ["文本", "编码"]
  ),
  n(
    "statistical-modeling",
    "统计模型",
    "concept",
    "methods",
    "用模型表达关联、效应大小、不确定性与因果边界。",
    ["回归", "不确定性"]
  ),
  n(
    "experiments-and-quasi-experiments",
    "实验与准实验",
    "concept",
    "methods",
    "通过随机化、自然实验和制度阈值强化因果识别。",
    ["因果", "政策评估"]
  ),
  n(
    "computational-social-science",
    "计算社会科学",
    "concept",
    "methods",
    "用数字痕迹、文本计算、网络和仿真研究社会行为。",
    ["数字痕迹", "机器学习"]
  ),
  n(
    "platform-governance",
    "平台治理前沿",
    "concept",
    "frontier",
    "以系统风险、审计、数据访问和公共问责研究平台权力。",
    ["平台治理", "系统风险"]
  ),
  n("ai-and-labor", "AI 与劳动", "concept", "frontier", "AI、算法管理和劳动过程再组织。", [
    "AI",
    "劳动过程",
  ]),
  n(
    "computational-social-science-frontier",
    "计算社会科学前沿",
    "concept",
    "frontier",
    "可审计测量、平台数据访问、LLM 编码和数字痕迹治理。",
    ["计算社会科学", "可审计"]
  ),
  n(
    "ageing-societies",
    "人口老龄化前沿",
    "concept",
    "frontier",
    "健康老龄化、长期照护、代际契约和社会基础设施。",
    ["老龄化", "照护"]
  ),
  n(
    "urban-climate-adaptation",
    "城市气候适应",
    "concept",
    "frontier",
    "城市热浪、洪水、非正规住区和适应正义。",
    ["城市气候", "适应"]
  ),
  n(
    "global-south-sociology",
    "全球南方社会学",
    "concept",
    "frontier",
    "南方理论、去殖民社会学和全球知识生产再平衡。",
    ["全球南方", "去殖民"]
  ),
  ...SOCIOLOGY_COVERAGE_NODES,
];

const e = (from: string, to: string, label: string): GraphEdge => ({
  source: `sociology:${from}`,
  target: `sociology:${to}`,
  type: "cross-reference",
  label,
});

export const SOCIOLOGY_EDGES: GraphEdge[] = [
  e("emile-durkheim", "social-structure", "社会事实"),
  e("max-weber-sociology", "bureaucracy", "理性化组织"),
  e("pierre-bourdieu", "social-stratification", "再生产"),
  e("pierre-bourdieu", "education-and-credentialism", "文化资本"),
  e("erving-goffman", "gender-and-society", "互动表演"),
  e("w-e-b-du-bois", "social-stratification", "种族分层"),
  e("social-structure", "social-stratification", "分配机会"),
  e("social-capital", "social-network-analysis", "关系资源"),
  e("social-capital", "social-support-mental-health", "从关系资源到健康支持"),
  e("social-support-mental-health", "social-network-analysis", "测量结构与关系质量"),
  e("chinese-social-thought", "family-and-kinship", "家国与亲属"),
  e("chinese-social-thought", "comparative-historical-analysis", "帝国与现代性"),
  e("indian-social-thought", "social-stratification", "种姓与分层"),
  e("indian-social-thought", "survey-research", "村落与调查"),
  e("islamic-social-thought", "religion-and-secularization", "宗教与公共秩序"),
  e("islamic-social-thought", "comparative-historical-analysis", "伊本·赫勒敦"),
  e("latin-american-dependency-liberation-sociology", "global-south-sociology", "南方理论与解放"),
  e("global-south-sociology", "african-urbanization", "南方城市理论"),
  e(
    "latin-american-dependency-liberation-sociology",
    "comparative-historical-analysis",
    "中心外围路径"
  ),
  e("family-and-kinship", "gender-and-society", "照护分工"),
  e("family-and-kinship", "social-support-mental-health", "家庭关系与支持质量"),
  e("education-and-credentialism", "social-stratification", "流动与再生产"),
  e("urbanization", "social-network-analysis", "城市弱关系"),
  e("african-urbanization", "urbanization", "非洲城市理论"),
  e("african-urbanization", "migration-and-diaspora", "迁移与城市增长"),
  e("african-urbanization", "urban-climate-adaptation", "城市气候风险"),
  e("digital-platform-society", "social-network-analysis", "平台连接"),
  e("bureaucracy", "digital-platform-society", "数字官僚制"),
  e("ethnography", "in-depth-interviews", "田野与叙事"),
  e("ethnography", "bureaucracy", "街头官僚观察"),
  e("in-depth-interviews", "survey-research", "从经验到题项"),
  e("survey-research", "statistical-modeling", "样本推断"),
  e("survey-research", "social-capital", "测量关系资源"),
  e("in-depth-interviews", "gender-and-society", "照护经验"),
  e("comparative-historical-analysis", "social-structure", "长期结构变迁"),
  e("comparative-historical-analysis", "bureaucracy", "国家能力路径"),
  e("content-analysis", "digital-platform-society", "平台话语"),
  e("content-analysis", "in-depth-interviews", "文本与叙事"),
  e("statistical-modeling", "social-stratification", "不平等估计"),
  e("experiments-and-quasi-experiments", "statistical-modeling", "因果估计"),
  e("experiments-and-quasi-experiments", "deviance-and-social-control", "标签与审计实验"),
  e("computational-social-science", "content-analysis", "文本即数据"),
  e("computational-social-science", "social-network-analysis", "大规模网络"),
  e("computational-social-science", "digital-platform-society", "平台数据"),
  e("statistical-modeling", "computational-social-science", "模型与大规模数据"),
  e("digital-platform-society", "platform-governance", "系统风险治理"),
  e("platform-governance", "computational-social-science-frontier", "审计与数据访问"),
  e("computational-social-science-frontier", "computational-social-science", "方法前沿"),
  e("computational-social-science-frontier", "content-analysis", "LLM 辅助文本分析"),
  e("digital-platform-society", "ai-and-labor", "算法管理"),
  e("ai-and-labor", "work-and-labor-organizations", "劳动过程"),
  e("ai-and-labor", "experiments-and-quasi-experiments", "审计与评估"),
  e("urbanization", "urban-climate-adaptation", "城市风险"),
  e("urban-climate-adaptation", "migration-and-diaspora", "气候迁移"),
  e("urban-climate-adaptation", "ageing-societies", "热浪与脆弱性"),
  e("ageing-societies", "family-and-kinship", "长期照护"),
  e("ageing-societies", "work-and-labor-organizations", "退休与劳动"),
  e("comparative-historical-analysis", "global-south-sociology", "多路径现代性"),
  e("global-south-sociology", "w-e-b-du-bois", "色线与全球知识"),
  e("global-south-sociology", "content-analysis", "去殖民课程与文本"),
  {
    source: "sociology:pierre-bourdieu",
    target: "political-science:power",
    type: "domain-link",
    label: "权力与象征",
  },
  {
    source: "sociology:social-stratification",
    target: "economics:thomas-piketty",
    type: "domain-link",
    label: "不平等研究",
  },
  {
    source: "sociology:latin-american-dependency-liberation-sociology",
    target: "economics:latin-american-structuralism-dependency",
    type: "domain-link",
    label: "依附与发展经济学",
  },
  {
    source: "sociology:global-south-sociology",
    target: "philosophy:decolonial-epistemology",
    type: "domain-link",
    label: "知识殖民批判",
  },
  {
    source: "sociology:digital-platform-society",
    target: "computer-science:machine-learning-overview",
    type: "domain-link",
    label: "算法治理",
  },
  {
    source: "sociology:computational-social-science",
    target: "computer-science:machine-learning-overview",
    type: "domain-link",
    label: "机器学习与社会数据",
  },
  {
    source: "sociology:statistical-modeling",
    target: "mathematics:probability",
    type: "domain-link",
    label: "概率与不确定性",
  },
  {
    source: "sociology:urbanization",
    target: "earth-science:greenhouse-effect",
    type: "domain-link",
    label: "城市气候风险",
  },
  {
    source: "sociology:social-support-mental-health",
    target: "medicine:depression",
    type: "domain-link",
    label: "关系机制进入症状与照护",
  },
  ...SOCIOLOGY_COVERAGE_EDGES,
];
