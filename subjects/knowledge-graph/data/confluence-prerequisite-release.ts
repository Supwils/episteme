import type { KnowledgeConfluenceRole } from "@/lib/knowledge-confluence";
import { CURATED_KNOWLEDGE_CONFLUENCES } from "./curated-confluences";
import { CURATED_LEARNING_PATHS } from "./curated-learning-paths";
import type { LearningRelationRole, ReviewedLearningRelation } from "./learning-relation-types";

export const CONFLUENCE_MULTIPARENT_RELEASE_META = {
  id: "confluence-multiparent-v2",
  version: "2.1.0",
  title: "L3–L5 高影响多前置关系",
  reviewedAt: "2026-07-13",
  status: "published",
} as const;

const pathMap = new Map(CURATED_LEARNING_PATHS.map((path) => [path.id, path]));

const roleMap: Record<KnowledgeConfluenceRole, LearningRelationRole> = {
  required: "required-prerequisite",
  complementary: "recommended-background",
  contested: "related-context",
};

function getPath(pathId: string) {
  const path = pathMap.get(pathId);
  if (!path) throw new Error(`Confluence prerequisite path is missing: ${pathId}`);
  return path;
}

function getLevelNodeId(pathId: string, level: 4 | 5): string {
  const step = getPath(pathId).steps.find((candidate) => candidate.level === level);
  if (!step) throw new Error(`Confluence path ${pathId} has no L${level} step`);
  return step.nodeId;
}

export interface ConfluenceMultiparentReleaseTarget {
  confluenceId: string;
  confluenceTitle: string;
  targetId: string;
  baselinePrerequisiteIds: readonly string[];
  evidenceHref?: string;
}

const CONFLUENCE_RELEASE_TARGETS: readonly ConfluenceMultiparentReleaseTarget[] =
  CURATED_KNOWLEDGE_CONFLUENCES.map((confluence) => ({
    confluenceId: confluence.id,
    confluenceTitle: confluence.title,
    targetId: getLevelNodeId(confluence.targetPathId, 5),
    baselinePrerequisiteIds: [getLevelNodeId(confluence.targetPathId, 4)],
    evidenceHref: `/knowledge-confluence/${confluence.id}`,
  }));

const CONFLUENCE_RELATIONS: readonly ReviewedLearningRelation[] =
  CURATED_KNOWLEDGE_CONFLUENCES.flatMap((confluence) => {
    const targetId = getLevelNodeId(confluence.targetPathId, 5);
    return confluence.strands.map((strand) => {
      const sourceId = getLevelNodeId(strand.pathId, 4);
      const role = roleMap[strand.role];
      return {
        id: `${CONFLUENCE_MULTIPARENT_RELEASE_META.id}:${confluence.id}:${strand.id}`,
        sourceId,
        targetId,
        role,
        rationale:
          role === "required-prerequisite"
            ? `${strand.contribution} 该路线被汇流审校标为回答目标前必须共同具备的支撑。`
            : role === "recommended-background"
              ? `${strand.contribution} 它扩展判断边界，但不作为开始综合任务的硬门槛。`
              : `${strand.contribution} 它用于检验反例与证据边界，不构成单向前置。`,
        reviewBasis: "content-dependency" as const,
        reviewStatus: "reviewed" as const,
        reviewedAt: CONFLUENCE_MULTIPARENT_RELEASE_META.reviewedAt,
        releaseId: CONFLUENCE_MULTIPARENT_RELEASE_META.id,
        version: CONFLUENCE_MULTIPARENT_RELEASE_META.version,
        evidence: [
          {
            kind: "curated-path" as const,
            ref: strand.pathId,
            label: getPath(strand.pathId).title,
          },
          {
            kind: "confluence-ledger" as const,
            ref: `${confluence.id}:${strand.id}`,
            label: `${confluence.title} · ${strand.title}证据台账`,
            href: `/knowledge-confluence/${confluence.id}`,
          },
        ],
      };
    });
  });

interface HighImpactRelationDefinition {
  id: string;
  targetId: string;
  targetLabel: string;
  targetHref: string;
  baselinePrerequisiteId: string;
  sourceId: string;
  sourceLabel: string;
  sourceHref: string;
  rationale: string;
}

const HIGH_IMPACT_RELATION_DEFINITIONS: readonly HighImpactRelationDefinition[] = [
  {
    id: "public-policy-budget",
    targetId: "political-science:public-policy",
    targetLabel: "公共政策",
    targetHref: "/political-science/concepts/public-policy",
    baselinePrerequisiteId: "economics:environmental-economics",
    sourceId: "political-science:taxes-and-public-budget",
    sourceLabel: "税收与公共预算",
    sourceHref: "/political-science/concepts/taxes-and-public-budget",
    rationale:
      "公共政策不仅要识别外部性，也必须理解收入从何而来、支出如何授权以及预算约束怎样改变政策组合。",
  },
  {
    id: "environmental-health-climate-models",
    targetId: "medicine:environmental-occupational-health",
    targetLabel: "环境与职业健康",
    targetHref: "/medicine/public-health/environmental-occupational-health",
    baselinePrerequisiteId: "political-science:public-policy",
    sourceId: "earth-science:climate-modeling",
    sourceLabel: "气候建模",
    sourceHref: "/earth-science/processes/climate-modeling",
    rationale:
      "评估环境暴露与适应收益需要气候基线、情景和不确定性，政策框架本身不足以给出暴露变化。",
  },
  {
    id: "debt-sustainability-bond-market",
    targetId: "economics:debt-sustainability-macro-framework",
    targetLabel: "债务可持续性与宏观框架",
    targetHref: "/economics/concepts/debt-sustainability-macro-framework",
    baselinePrerequisiteId: "economics:modern-money-fiscal-deficits",
    sourceId: "economics:bond-market",
    sourceLabel: "债券市场",
    sourceHref: "/economics/concepts/bond-market",
    rationale:
      "债务算术必须同时理解利率、期限、再融资和投资者需求；财政赤字概念不能单独解释市场融资风险。",
  },
  {
    id: "effect-size-statistics",
    targetId: "psychology:effect-size-and-power",
    targetLabel: "效应量与统计功效",
    targetHref: "/psychology/knowledge-base/effect-size-and-power",
    baselinePrerequisiteId: "psychology:memory-systems",
    sourceId: "mathematics:statistics",
    sourceLabel: "统计学",
    sourceHref: "/mathematics/concepts/statistics",
    rationale:
      "效应量、抽样误差、功效和置信区间都建立在统计分布与估计之上，领域案例不能替代形式基础。",
  },
  {
    id: "machine-learning-linear-algebra",
    targetId: "computer-science:machine-learning-overview",
    targetLabel: "机器学习",
    targetHref: "/computer-science/concepts/machine-learning-overview",
    baselinePrerequisiteId: "computer-science:networking-protocols",
    sourceId: "mathematics:linear-algebra",
    sourceLabel: "线性代数",
    sourceHref: "/mathematics/concepts/linear-algebra",
    rationale: "特征、参数、变换与优化都依赖向量和矩阵表达；系统连接知识不能替代模型表示基础。",
  },
  {
    id: "graph-traversal-data-structures",
    targetId: "computer-science:graph-traversal",
    targetLabel: "图遍历：BFS 与 DFS",
    targetHref: "/computer-science/algorithms/graph-traversal",
    baselinePrerequisiteId: "mathematics:probability",
    sourceId: "computer-science:data-structures",
    sourceLabel: "数据结构",
    sourceHref: "/computer-science/concepts/data-structures",
    rationale:
      "BFS 与 DFS 的正确实现依赖图表示、队列、栈和访问标记；概率直觉并不能提供这些操作结构。",
  },
  {
    id: "bayesian-inference-probability",
    targetId: "mathematics:bayesian-inference",
    targetLabel: "贝叶斯推断",
    targetHref: "/mathematics/concepts/bayesian-inference",
    baselinePrerequisiteId: "psychology:psychometrics-reliability-validity",
    sourceId: "mathematics:probability",
    sourceLabel: "概率论",
    sourceHref: "/mathematics/concepts/probability",
    rationale:
      "先验、似然、后验与条件化直接使用概率规则；测量案例可以说明用途，但不能替代概率基础。",
  },
  {
    id: "differential-equation-functions",
    targetId: "mathematics:differential-equation",
    targetLabel: "微分方程",
    targetHref: "/mathematics/concepts/differential-equation",
    baselinePrerequisiteId: "physics:经典物理--牛顿三大定律",
    sourceId: "mathematics:function",
    sourceLabel: "函数",
    sourceHref: "/mathematics/concepts/function",
    rationale:
      "微分方程描述函数及其变化率之间的关系；物理实例提供动机，但必须先理解函数表示和变量依赖。",
  },
  {
    id: "spectroscopy-atomic-structure",
    targetId: "chemistry:spectroscopy",
    targetLabel: "光谱学",
    targetHref: "/chemistry/concepts/spectroscopy",
    baselinePrerequisiteId: "mathematics:statistics",
    sourceId: "chemistry:atomic-structure",
    sourceLabel: "原子结构",
    sourceHref: "/chemistry/concepts/atomic-structure",
    rationale: "谱线来自原子和分子能级跃迁；统计处理可以量化信号，却不能解释峰的位置与选择规则。",
  },
  {
    id: "family-kinship-social-structure",
    targetId: "sociology:family-and-kinship",
    targetLabel: "家庭与亲属关系",
    targetHref: "/sociology/institutions/family-and-kinship",
    baselinePrerequisiteId: "psychology:developmental-psychology",
    sourceId: "sociology:social-structure",
    sourceLabel: "社会结构",
    sourceHref: "/sociology/concepts/social-structure",
    rationale: "家庭既是发展环境也是制度关系，理解亲属、继承、照护和分层必须加入社会结构视角。",
  },
];

const HIGH_IMPACT_RELEASE_TARGETS: readonly ConfluenceMultiparentReleaseTarget[] =
  HIGH_IMPACT_RELATION_DEFINITIONS.map((definition) => ({
    confluenceId: `high-impact:${definition.id}`,
    confluenceTitle: "高扇出 L3–L4 依赖审校",
    targetId: definition.targetId,
    baselinePrerequisiteIds: [definition.baselinePrerequisiteId],
    evidenceHref: definition.targetHref,
  }));

const HIGH_IMPACT_RELATIONS: readonly ReviewedLearningRelation[] =
  HIGH_IMPACT_RELATION_DEFINITIONS.map((definition) => ({
    id: `${CONFLUENCE_MULTIPARENT_RELEASE_META.id}:high-impact:${definition.id}`,
    sourceId: definition.sourceId,
    targetId: definition.targetId,
    role: "required-prerequisite",
    rationale: definition.rationale,
    reviewBasis: "content-dependency",
    reviewStatus: "reviewed",
    reviewedAt: CONFLUENCE_MULTIPARENT_RELEASE_META.reviewedAt,
    releaseId: CONFLUENCE_MULTIPARENT_RELEASE_META.id,
    version: CONFLUENCE_MULTIPARENT_RELEASE_META.version,
    evidence: [
      {
        kind: "editorial-audit",
        ref: `${definition.id}:source`,
        label: `${definition.sourceLabel}正文`,
        href: definition.sourceHref,
      },
      {
        kind: "editorial-audit",
        ref: `${definition.id}:target`,
        label: `${definition.targetLabel}正文`,
        href: definition.targetHref,
      },
    ],
  }));

export const CONFLUENCE_MULTIPARENT_RELEASE_TARGETS: readonly ConfluenceMultiparentReleaseTarget[] =
  [...CONFLUENCE_RELEASE_TARGETS, ...HIGH_IMPACT_RELEASE_TARGETS];

export const CONFLUENCE_MULTIPARENT_RELATIONS: readonly ReviewedLearningRelation[] = [
  ...CONFLUENCE_RELATIONS,
  ...HIGH_IMPACT_RELATIONS,
];
