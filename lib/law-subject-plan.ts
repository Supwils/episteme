import type { KnowledgeDomainId } from "./knowledge-continuum";
import type { KnowledgeLevel } from "./knowledge-levels";

/**
 * 比较法与法律制度（comparative-law）发布计划——linguistics 模式的第二次应用。
 * 候选条目：lib/subject-candidate-matrix.ts 的 comparative-law。
 * 领域定位：比较不同法律传统如何界定权利、义务、程序与公共权力。
 * 内容纪律（launchGate）：每篇 frontmatter 必须声明司法辖区视野与
 * 「通识解释，不构成法律建议」——见 guardrail 字段与检查。
 */

export type LawArticlePlan = {
  slug: string;
  title: string;
  level: KnowledgeLevel;
  bridgeDomains: readonly KnowledgeDomainId[];
};

export type LawSectionPlan = {
  id: string;
  label: string;
  articles: readonly LawArticlePlan[];
};

export type LawReleaseWave = {
  id: string;
  label: string;
  articleSlugs: readonly string[];
};

export const LAW_SECTIONS: readonly LawSectionPlan[] = [
  {
    id: "foundations",
    label: "法律基础",
    articles: [
      {
        slug: "why-law-exists",
        title: "法律为什么存在",
        level: 1,
        bridgeDomains: ["philosophy", "sociology"],
      },
      {
        slug: "rights-and-duties",
        title: "权利与义务：法律语言的最小单位",
        level: 1,
        bridgeDomains: ["philosophy", "political-science"],
      },
      {
        slug: "rule-of-law",
        title: "法治与人治：规则之治的条件",
        level: 2,
        bridgeDomains: ["political-science", "philosophy"],
      },
      {
        slug: "sources-of-law",
        title: "法律的渊源与层级",
        level: 2,
        bridgeDomains: ["political-science", "human-history"],
      },
      {
        slug: "legal-persons-acts-liability",
        title: "主体、行为与责任",
        level: 2,
        bridgeDomains: ["philosophy", "sociology"],
      },
      {
        slug: "how-courts-decide",
        title: "法官如何裁判：事实、规范与解释",
        level: 3,
        bridgeDomains: ["philosophy", "linguistics"],
      },
    ],
  },
  {
    id: "public-law",
    label: "公法",
    articles: [
      {
        slug: "constitution-what-it-does",
        title: "宪法做什么",
        level: 1,
        bridgeDomains: ["political-science", "human-history"],
      },
      {
        slug: "separation-of-powers",
        title: "权力分立与制衡",
        level: 2,
        bridgeDomains: ["political-science", "philosophy"],
      },
      {
        slug: "constitutional-review",
        title: "违宪审查：谁来审查宪法",
        level: 3,
        bridgeDomains: ["political-science", "human-history"],
      },
      {
        slug: "administrative-law",
        title: "行政法：约束行政权的缰绳",
        level: 3,
        bridgeDomains: ["political-science", "sociology"],
      },
      {
        slug: "fundamental-rights",
        title: "基本权利体系：从自由权到社会权",
        level: 3,
        bridgeDomains: ["political-science", "philosophy"],
      },
      {
        slug: "china-constitutional-development",
        title: "中国宪法与法治发展",
        level: 4,
        bridgeDomains: ["political-science", "human-history"],
      },
    ],
  },
  {
    id: "private-law",
    label: "私法",
    articles: [
      {
        slug: "contract-lifecycle",
        title: "合同的生命周期：从要约到违约",
        level: 2,
        bridgeDomains: ["economics", "sociology"],
      },
      {
        slug: "tort-and-liability",
        title: "侵权与责任：损害的分配",
        level: 2,
        bridgeDomains: ["economics", "philosophy"],
      },
      {
        slug: "property-and-ownership",
        title: "物与所有权：排他的边界",
        level: 2,
        bridgeDomains: ["economics", "philosophy"],
      },
      {
        slug: "family-and-inheritance-law",
        title: "婚姻、家庭与继承",
        level: 3,
        bridgeDomains: ["sociology", "human-history"],
      },
      {
        slug: "company-and-market-law",
        title: "公司与市场组织的法律构造",
        level: 3,
        bridgeDomains: ["economics", "sociology"],
      },
      {
        slug: "law-and-economics",
        title: "法经济学：把激励写进规则",
        level: 4,
        bridgeDomains: ["economics", "mathematics"],
      },
    ],
  },
  {
    id: "criminal-and-procedure",
    label: "刑法与程序",
    articles: [
      {
        slug: "crime-and-punishment",
        title: "犯罪与刑罚的目的",
        level: 2,
        bridgeDomains: ["philosophy", "sociology"],
      },
      {
        slug: "procedural-justice",
        title: "程序正义：为什么过程比结果更根本",
        level: 2,
        bridgeDomains: ["philosophy", "political-science"],
      },
      {
        slug: "elements-of-crime",
        title: "犯罪构成：行为、过错与因果",
        level: 3,
        bridgeDomains: ["philosophy", "psychology"],
      },
      {
        slug: "evidence-and-proof",
        title: "证据与证明：法庭上如何认定事实",
        level: 3,
        bridgeDomains: ["psychology", "linguistics"],
      },
      {
        slug: "criminal-justice-reform",
        title: "刑事司法改革的争议现场",
        level: 4,
        bridgeDomains: ["sociology", "political-science"],
      },
    ],
  },
  {
    id: "legal-traditions",
    label: "比较法律传统",
    articles: [
      {
        slug: "civil-vs-common-law",
        title: "大陆法与普通法：两种法律心智",
        level: 2,
        bridgeDomains: ["human-history", "political-science"],
      },
      {
        slug: "chinese-legal-tradition",
        title: "中华法传统与现代转型",
        level: 3,
        bridgeDomains: ["human-history", "philosophy"],
      },
      {
        slug: "islamic-law-tradition",
        title: "伊斯兰法传统",
        level: 3,
        bridgeDomains: ["human-history", "sociology"],
      },
      {
        slug: "customary-law-pluralism",
        title: "习惯法与法律多元主义",
        level: 3,
        bridgeDomains: ["sociology", "human-history"],
      },
      {
        slug: "mixed-legal-systems",
        title: "混合法系：当传统相遇",
        level: 4,
        bridgeDomains: ["human-history", "political-science"],
      },
      {
        slug: "comparative-law-methods",
        title: "比较法的方法：可比性从何而来",
        level: 4,
        bridgeDomains: ["linguistics", "sociology"],
      },
    ],
  },
  {
    id: "global-and-digital",
    label: "全球与数字治理",
    articles: [
      {
        slug: "international-law",
        title: "国际法如何约束国家",
        level: 2,
        bridgeDomains: ["political-science", "human-history"],
      },
      {
        slug: "human-rights-law",
        title: "国际人权法：从宣言到执行",
        level: 3,
        bridgeDomains: ["political-science", "philosophy"],
      },
      {
        slug: "digital-rights-and-privacy",
        title: "数据权利与隐私：数字时代的人格权",
        level: 3,
        bridgeDomains: ["computer-science", "sociology"],
      },
      {
        slug: "ai-and-algorithm-governance",
        title: "AI 与算法治理：法律的追赶",
        level: 5,
        bridgeDomains: ["computer-science", "philosophy"],
      },
      {
        slug: "climate-litigation",
        title: "气候诉讼：把未来告上法庭",
        level: 5,
        bridgeDomains: ["earth-science", "political-science"],
      },
    ],
  },
] as const;

export const ALL_LAW_ARTICLES = LAW_SECTIONS.flatMap((section) => section.articles);

export const LAW_RELEASE_WAVES: readonly LawReleaseWave[] = [
  {
    id: "foundations",
    label: "L1–L2 法律语言与制度基础",
    articleSlugs: ALL_LAW_ARTICLES.filter((article) => article.level <= 2).map(
      (article) => article.slug
    ),
  },
  {
    id: "institutions-and-traditions",
    label: "L3 制度、程序与传统",
    articleSlugs: [
      "how-courts-decide",
      "constitutional-review",
      "administrative-law",
      "fundamental-rights",
      "family-and-inheritance-law",
      "company-and-market-law",
      "elements-of-crime",
      "evidence-and-proof",
      "chinese-legal-tradition",
      "islamic-law-tradition",
      "customary-law-pluralism",
      "human-rights-law",
      "digital-rights-and-privacy",
    ],
  },
  {
    id: "methods-and-frontiers",
    label: "L4–L5 方法与前沿",
    articleSlugs: [
      "china-constitutional-development",
      "law-and-economics",
      "criminal-justice-reform",
      "mixed-legal-systems",
      "comparative-law-methods",
      "ai-and-algorithm-governance",
      "climate-litigation",
    ],
  },
] as const;

export const RELEASED_LAW_ARTICLES = LAW_RELEASE_WAVES.flatMap((wave) => wave.articleSlugs).map(
  (slug) => ALL_LAW_ARTICLES.find((article) => article.slug === slug)!
);

export const LAW_VISUALIZATIONS = [
  {
    id: "case-procedure-path",
    label: "案件程序路径图",
    prerequisiteSlugs: ["procedural-justice", "how-courts-decide"],
  },
  {
    id: "constitutional-structure-comparator",
    label: "宪法权力结构比较器",
    prerequisiteSlugs: ["constitution-what-it-does", "separation-of-powers"],
  },
  {
    id: "legal-traditions-map",
    label: "法律传统地图",
    prerequisiteSlugs: ["civil-vs-common-law", "chinese-legal-tradition"],
  },
] as const;

export const LAW_GLOBAL_COVERAGE = [
  "中华法传统与现代转型",
  "南亚法律多元主义",
  "伊斯兰法传统",
  "非洲习惯法与成文法",
  "拉美宪政",
  "原住民法秩序",
] as const;
