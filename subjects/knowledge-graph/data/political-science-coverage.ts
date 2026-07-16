import type { GraphEdge, GraphNode } from "./types";

const node = (
  slug: string,
  label: string,
  type: GraphNode["type"],
  section: string,
  description: string,
  tags: string[]
): GraphNode => ({
  id: `political-science:${slug}`,
  label,
  domain: "political-science",
  type,
  slug,
  section,
  url: `/political-science/${section}/${slug}`,
  description,
  tags,
});

const edge = (source: string, target: string, label: string): GraphEdge => ({
  source: `political-science:${source}`,
  target: `political-science:${target}`,
  type: "cross-reference",
  label,
});

export const POLITICAL_SCIENCE_COVERAGE_NODES: GraphNode[] = [
  node(
    "accountability",
    "政治问责",
    "concept",
    "concepts",
    "通过选举、议会、司法、审计与公共监督要求掌权者解释并承担后果。",
    ["问责", "权力监督"]
  ),
  node(
    "legitimacy",
    "合法性与正当性",
    "concept",
    "concepts",
    "解释政治权威为何被服从，以及制度如何获得、维持或失去正当性。",
    ["合法性", "政治权威"]
  ),
  node(
    "public-policy",
    "公共政策",
    "concept",
    "concepts",
    "把议程设置、政策设计、执行、评价与反馈组织为可检验的治理过程。",
    ["政策过程", "政策评估"]
  ),
  node(
    "political-economy",
    "政治经济学",
    "concept",
    "concepts",
    "研究国家、市场、制度与分配联盟如何共同塑造经济结果。",
    ["国家与市场", "分配政治"]
  ),
  node(
    "electoral-systems",
    "选举制度：多数制与比例制",
    "institution",
    "institutions",
    "选票转化为席位的规则会改变政党竞争、代表性与政府形成。",
    ["选举制度", "比例代表制"]
  ),
  node(
    "rule-of-law",
    "法治",
    "institution",
    "institutions",
    "以一般规则、正当程序和独立司法限制任意权力。",
    ["法治", "司法独立"]
  ),
  node(
    "political-parties",
    "政党与政党制度",
    "institution",
    "institutions",
    "政党聚合利益、组织选举并连接社会与国家，也可能垄断代表渠道。",
    ["政党", "政党制度"]
  ),
  node(
    "bureaucracy",
    "官僚制与行政国家",
    "institution",
    "institutions",
    "层级、专业、规则和档案使国家能够持续执行政策，同时产生自主性与问责难题。",
    ["官僚制", "公共行政"]
  ),
  node(
    "democratic-backsliding",
    "民主衰退",
    "concept",
    "frontier",
    "跟踪民选政府如何渐进侵蚀制衡、竞争、权利与信息环境。",
    ["民主衰退", "选举威权"]
  ),
  node(
    "ai-governance-surveillance",
    "AI、算法治理与监控的政治",
    "concept",
    "frontier",
    "审查算法决策、监控基础设施、权力不对称与公共问责。",
    ["AI 治理", "算法监控"]
  ),
  node(
    "security-dilemma-war-peace",
    "安全困境、战争与和平",
    "concept",
    "international-relations",
    "一方为自保采取的措施可能被他方视为威胁，形成军备与误判循环。",
    ["安全困境", "战争与和平"]
  ),
  node(
    "the-un-system",
    "联合国体系",
    "institution",
    "international-relations",
    "从安理会、专门机构与维和行动理解多边治理的能力和结构性限制。",
    ["联合国", "多边主义"]
  ),
];

export const POLITICAL_SCIENCE_COVERAGE_EDGES: GraphEdge[] = [
  edge("accountability", "democracy", "使授权可追责"),
  edge("accountability", "state-capacity", "约束能力的运用"),
  edge("legitimacy", "the-state", "支持政治服从"),
  edge("legitimacy", "max-weber", "合法支配类型"),
  edge("public-policy", "state-capacity", "把目标转为执行"),
  edge("public-policy", "budget-governance", "通过预算配置资源"),
  edge("political-economy", "fiscal-state", "连接分配与财政"),
  edge("political-economy", "welfare-state", "解释再分配联盟"),
  edge("electoral-systems", "political-parties", "塑造竞争结构"),
  edge("electoral-systems", "democracy", "组织代表授权"),
  edge("rule-of-law", "liberalism", "限制任意权力"),
  edge("rule-of-law", "accountability", "提供法律责任机制"),
  edge("political-parties", "social-movements", "连接制度内外动员"),
  edge("bureaucracy", "state-capacity", "形成持续执行能力"),
  edge("bureaucracy", "max-weber", "理性化组织模型"),
  edge("democratic-backsliding", "democracy", "渐进侵蚀"),
  edge("democratic-backsliding", "rule-of-law", "削弱制度制衡"),
  edge("ai-governance-surveillance", "power", "扩展信息权力"),
  edge("ai-governance-surveillance", "accountability", "要求算法可追责"),
  edge("security-dilemma-war-peace", "realism-ir", "无政府状态下的不确定性"),
  edge("the-un-system", "peacekeeping", "授权与组织行动"),
  edge("the-un-system", "regional-organizations", "多层全球治理"),
];
