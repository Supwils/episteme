import type { KnowledgeDomainId } from "./knowledge-continuum";
import type { KnowledgeLevel } from "./knowledge-levels";

/**
 * 艺术、建筑与美学（arts）发布计划——linguistics/law 模式的第三次应用。
 * 候选条目：lib/subject-candidate-matrix.ts 的 arts-aesthetics。
 * 领域定位：从观看、材料与制作进入全球视觉文化。
 * 图像纪律（launchGate）：文章配图一律走 docs/图像管线指南.md——
 * 逐件登记权利元数据（优先 The Met CC0 与 Wikimedia 公有领域）。
 */

export type ArtsArticlePlan = {
  slug: string;
  title: string;
  level: KnowledgeLevel;
  bridgeDomains: readonly KnowledgeDomainId[];
};

export type ArtsSectionPlan = {
  id: string;
  label: string;
  articles: readonly ArtsArticlePlan[];
};

export type ArtsReleaseWave = {
  id: string;
  label: string;
  articleSlugs: readonly string[];
};

export const ARTS_SECTIONS: readonly ArtsSectionPlan[] = [
  {
    id: "foundations",
    label: "视觉基础",
    articles: [
      {
        slug: "seeing-and-perception",
        title: "观看的机制：眼睛如何建构世界",
        level: 1,
        bridgeDomains: ["psychology", "life-science"],
      },
      {
        slug: "line-shape-form",
        title: "线条、形状与形体",
        level: 1,
        bridgeDomains: ["mathematics", "psychology"],
      },
      {
        slug: "color-and-light",
        title: "色彩与光",
        level: 1,
        bridgeDomains: ["universe-physics", "chemistry"],
      },
      {
        slug: "composition-balance",
        title: "构图与平衡",
        level: 2,
        bridgeDomains: ["mathematics", "psychology"],
      },
      {
        slug: "perspective-and-space",
        title: "透视与空间：一场视觉革命",
        level: 2,
        bridgeDomains: ["mathematics", "human-history"],
      },
      {
        slug: "proportion-and-harmony",
        title: "比例与和谐：美的数学",
        level: 2,
        bridgeDomains: ["mathematics", "philosophy"],
      },
    ],
  },
  {
    id: "media",
    label: "媒介与材料",
    articles: [
      {
        slug: "drawing-and-sketching",
        title: "素描：一切造型艺术的基础",
        level: 2,
        bridgeDomains: ["human-history", "psychology"],
      },
      {
        slug: "painting-media",
        title: "蛋彩、油彩与丙烯：颜料如何改变绘画",
        level: 2,
        bridgeDomains: ["chemistry", "human-history"],
      },
      {
        slug: "fresco-and-wall-painting",
        title: "湿壁画与墙面传统",
        level: 2,
        bridgeDomains: ["chemistry", "human-history"],
      },
      {
        slug: "sculpture-materials",
        title: "石雕、青铜与木雕",
        level: 2,
        bridgeDomains: ["chemistry", "earth-science"],
      },
      {
        slug: "ceramics-and-glaze",
        title: "陶瓷与釉：火与土的化学",
        level: 3,
        bridgeDomains: ["chemistry", "human-history"],
      },
      {
        slug: "photography-medium",
        title: "摄影作为媒介",
        level: 3,
        bridgeDomains: ["universe-physics", "sociology"],
      },
      {
        slug: "printmaking",
        title: "版画与复制技术",
        level: 3,
        bridgeDomains: ["human-history", "chemistry"],
      },
    ],
  },
  {
    id: "architecture",
    label: "建筑与空间",
    articles: [
      {
        slug: "building-as-structure",
        title: "建筑作为结构：墙、梁与穹顶",
        level: 1,
        bridgeDomains: ["universe-physics", "earth-science"],
      },
      {
        slug: "orders-and-arches",
        title: "柱式、拱与穹顶",
        level: 2,
        bridgeDomains: ["human-history", "mathematics"],
      },
      {
        slug: "sacred-spaces",
        title: "神圣空间：神庙、教堂与清真寺",
        level: 3,
        bridgeDomains: ["human-history", "sociology"],
      },
      {
        slug: "east-asian-timber-frame",
        title: "东亚木构：斗拱与院落",
        level: 3,
        bridgeDomains: ["human-history", "earth-science"],
      },
      {
        slug: "modernism-and-international-style",
        title: "现代主义与国际式",
        level: 3,
        bridgeDomains: ["human-history", "sociology"],
      },
      {
        slug: "landscape-and-gardens",
        title: "园林与景观：被设计的自然",
        level: 3,
        bridgeDomains: ["human-history", "philosophy"],
      },
    ],
  },
  {
    id: "traditions",
    label: "全球艺术传统",
    articles: [
      {
        slug: "chinese-painting",
        title: "中国书画：笔墨与意境",
        level: 3,
        bridgeDomains: ["human-history", "philosophy"],
      },
      {
        slug: "calligraphy",
        title: "书法作为艺术",
        level: 2,
        bridgeDomains: ["linguistics", "human-history"],
      },
      {
        slug: "japanese-ukiyoe",
        title: "浮世绘与江户视觉文化",
        level: 3,
        bridgeDomains: ["human-history", "sociology"],
      },
      {
        slug: "south-asian-sacred-art",
        title: "南亚宗教艺术：神像、寺庙与曼荼罗",
        level: 3,
        bridgeDomains: ["human-history", "philosophy"],
      },
      {
        slug: "islamic-visual-culture",
        title: "伊斯兰视觉文化：几何、书法与花卉",
        level: 3,
        bridgeDomains: ["human-history", "mathematics"],
      },
      {
        slug: "african-art-modernity",
        title: "非洲艺术与现代性",
        level: 3,
        bridgeDomains: ["human-history", "sociology"],
      },
      {
        slug: "latin-american-art",
        title: "拉美艺术：从殖民巴洛克到壁画运动",
        level: 3,
        bridgeDomains: ["human-history", "political-science"],
      },
      {
        slug: "indigenous-oceanic-art",
        title: "大洋洲与原住民艺术",
        level: 4,
        bridgeDomains: ["human-history", "sociology"],
      },
    ],
  },
  {
    id: "aesthetics",
    label: "美学与视觉文化",
    articles: [
      {
        slug: "what-is-beauty",
        title: "美是什么",
        level: 1,
        bridgeDomains: ["philosophy", "psychology"],
      },
      {
        slug: "art-and-skill",
        title: "技艺之争：艺术何时成为艺术",
        level: 2,
        bridgeDomains: ["philosophy", "sociology"],
      },
      {
        slug: "aesthetics-taste-judgment",
        title: "审美判断：休谟与康德",
        level: 3,
        bridgeDomains: ["philosophy", "psychology"],
      },
      {
        slug: "iconoclasm-and-censorship",
        title: "破坏圣像与审查：图像的危险",
        level: 3,
        bridgeDomains: ["human-history", "political-science"],
      },
      {
        slug: "museums-and-display",
        title: "博物馆与展示的政治",
        level: 4,
        bridgeDomains: ["sociology", "political-science"],
      },
      {
        slug: "art-market-and-value",
        title: "艺术市场与价值：谁决定杰作",
        level: 4,
        bridgeDomains: ["economics", "sociology"],
      },
      {
        slug: "visual-culture-everyday",
        title: "视觉文化：从广告到表情包",
        level: 4,
        bridgeDomains: ["sociology", "linguistics"],
      },
    ],
  },
  {
    id: "methods",
    label: "方法与数字前沿",
    articles: [
      {
        slug: "formal-analysis",
        title: "形式分析：如何读一张画",
        level: 3,
        bridgeDomains: ["philosophy", "psychology"],
      },
      {
        slug: "iconography-iconology",
        title: "图像志与图像学",
        level: 4,
        bridgeDomains: ["human-history", "linguistics"],
      },
      {
        slug: "conservation-science",
        title: "保护科学：让作品活过时间",
        level: 4,
        bridgeDomains: ["chemistry", "medicine"],
      },
      {
        slug: "provenance-and-attribution",
        title: "归属与来源研究",
        level: 4,
        bridgeDomains: ["human-history", "chemistry"],
      },
      {
        slug: "digital-humanities-art",
        title: "数字人文与艺术史",
        level: 5,
        bridgeDomains: ["computer-science", "mathematics"],
      },
      {
        slug: "generative-art-and-ai",
        title: "生成艺术与 AI：作者性的新边界",
        level: 5,
        bridgeDomains: ["computer-science", "philosophy"],
      },
    ],
  },
] as const;

export const ALL_ARTS_ARTICLES = ARTS_SECTIONS.flatMap((section) => section.articles);

export const ARTS_RELEASE_WAVES: readonly ArtsReleaseWave[] = [
  {
    id: "foundations",
    label: "L1–L2 观看、媒介与形式",
    articleSlugs: ALL_ARTS_ARTICLES.filter((article) => article.level <= 2).map(
      (article) => article.slug
    ),
  },
  {
    id: "traditions-and-institutions",
    label: "L3 传统、制度与审美",
    articleSlugs: [
      "ceramics-and-glaze",
      "photography-medium",
      "printmaking",
      "sacred-spaces",
      "east-asian-timber-frame",
      "modernism-and-international-style",
      "landscape-and-gardens",
      "chinese-painting",
      "japanese-ukiyoe",
      "south-asian-sacred-art",
      "islamic-visual-culture",
      "african-art-modernity",
      "latin-american-art",
      "aesthetics-taste-judgment",
      "iconoclasm-and-censorship",
      "formal-analysis",
    ],
  },
  {
    id: "methods-and-frontiers",
    label: "L4–L5 方法、价值与前沿",
    articleSlugs: [
      "indigenous-oceanic-art",
      "museums-and-display",
      "art-market-and-value",
      "visual-culture-everyday",
      "iconography-iconology",
      "conservation-science",
      "provenance-and-attribution",
      "digital-humanities-art",
      "generative-art-and-ai",
    ],
  },
] as const;

export const RELEASED_ARTS_ARTICLES = ARTS_RELEASE_WAVES.flatMap((wave) => wave.articleSlugs).map(
  (slug) => ALL_ARTS_ARTICLES.find((article) => article.slug === slug)!
);

export const ARTS_VISUALIZATIONS = [
  { id: "detail-comparator", label: "作品细节比较器", prerequisiteSlugs: ["formal-analysis"] },
  {
    id: "perspective-lab",
    label: "透视与构图实验室",
    prerequisiteSlugs: ["perspective-and-space", "composition-balance"],
  },
  {
    id: "pigment-profile",
    label: "材料与颜料剖面",
    prerequisiteSlugs: ["painting-media", "color-and-light"],
  },
  {
    id: "art-exchange-map",
    label: "全球艺术交流地图",
    prerequisiteSlugs: ["chinese-painting", "islamic-visual-culture"],
  },
  {
    id: "arch-space-explorer",
    label: "建筑空间探索器",
    prerequisiteSlugs: ["building-as-structure", "orders-and-arches"],
  },
] as const;

export const ARTS_GLOBAL_COVERAGE = [
  "东亚书画与建筑",
  "南亚宗教艺术",
  "伊斯兰视觉文化",
  "非洲艺术与现代性",
  "拉美与加勒比艺术",
  "大洋洲与原住民艺术",
] as const;
