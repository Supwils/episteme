import type { KnowledgeDomainId } from "./knowledge-continuum";
import type { KnowledgeLevel } from "./knowledge-levels";

export type LiteratureArticlePlan = {
  slug: string;
  title: string;
  level: KnowledgeLevel;
  section: LiteratureSectionId;
  wave: "W1" | "W2" | "W3";
  bridgeDomains: readonly KnowledgeDomainId[];
};

export type LiteratureSectionId =
  | "narrative-basics"
  | "poetics-and-form"
  | "world-traditions"
  | "theory-and-method"
  | "reading-and-reception"
  | "contemporary-edges";

export const LITERATURE_SECTIONS: readonly {
  id: LiteratureSectionId;
  label: string;
}[] = [
  { id: "narrative-basics", label: "叙事基础" },
  { id: "poetics-and-form", label: "诗学与形式" },
  { id: "world-traditions", label: "世界文学传统" },
  { id: "theory-and-method", label: "文学理论与方法" },
  { id: "reading-and-reception", label: "阅读与接受" },
  { id: "contemporary-edges", label: "当代边界" },
];

export const LITERATURE_ARTICLES: readonly LiteratureArticlePlan[] = [
  {
    slug: "what-is-a-story",
    title: "故事是什么",
    level: 1,
    section: "narrative-basics",
    wave: "W1",
    bridgeDomains: ["psychology", "linguistics"],
  },
  {
    slug: "plot-character-conflict",
    title: "情节、人物与冲突",
    level: 1,
    section: "narrative-basics",
    wave: "W2",
    bridgeDomains: ["psychology", "human-history"],
  },
  {
    slug: "narrative-point-of-view",
    title: "叙述视角",
    level: 2,
    section: "narrative-basics",
    wave: "W2",
    bridgeDomains: ["linguistics", "philosophy"],
  },
  {
    slug: "time-and-narrative-order",
    title: "时间与叙述次序",
    level: 2,
    section: "narrative-basics",
    wave: "W2",
    bridgeDomains: ["philosophy", "psychology"],
  },
  {
    slug: "oral-storytelling",
    title: "口头讲述与记忆",
    level: 1,
    section: "narrative-basics",
    wave: "W3",
    bridgeDomains: ["linguistics", "sociology"],
  },
  {
    slug: "fiction-and-make-believe",
    title: "虚构与假装相信",
    level: 2,
    section: "narrative-basics",
    wave: "W3",
    bridgeDomains: ["philosophy", "psychology"],
  },
  {
    slug: "meter-and-the-line",
    title: "韵律与诗行",
    level: 2,
    section: "poetics-and-form",
    wave: "W1",
    bridgeDomains: ["linguistics", "universe-physics"],
  },
  {
    slug: "metaphor-and-image",
    title: "隐喻与意象",
    level: 2,
    section: "poetics-and-form",
    wave: "W2",
    bridgeDomains: ["linguistics", "philosophy"],
  },
  {
    slug: "narrator-and-voice",
    title: "叙述者与声音",
    level: 2,
    section: "poetics-and-form",
    wave: "W2",
    bridgeDomains: ["linguistics", "psychology"],
  },
  {
    slug: "genre-as-contract",
    title: "文类是一种约定",
    level: 3,
    section: "poetics-and-form",
    wave: "W2",
    bridgeDomains: ["sociology", "arts"],
  },
  {
    slug: "drama-and-performance-text",
    title: "戏剧文本与演出",
    level: 3,
    section: "poetics-and-form",
    wave: "W3",
    bridgeDomains: ["arts", "human-history"],
  },
  {
    slug: "novel-as-a-form",
    title: "小说作为一种形式",
    level: 3,
    section: "poetics-and-form",
    wave: "W3",
    bridgeDomains: ["human-history", "sociology"],
  },
  {
    slug: "epic-as-public-memory",
    title: "史诗作为公共记忆",
    level: 3,
    section: "world-traditions",
    wave: "W1",
    bridgeDomains: ["human-history", "linguistics"],
  },
  {
    slug: "chinese-narrative-tradition",
    title: "汉语叙事传统",
    level: 3,
    section: "world-traditions",
    wave: "W2",
    bridgeDomains: ["human-history", "philosophy"],
  },
  {
    slug: "arabic-persian-narrative",
    title: "阿拉伯—波斯叙事",
    level: 3,
    section: "world-traditions",
    wave: "W2",
    bridgeDomains: ["human-history", "philosophy"],
  },
  {
    slug: "south-asian-epic-and-poetics",
    title: "南亚史诗与诗学",
    level: 3,
    section: "world-traditions",
    wave: "W2",
    bridgeDomains: ["human-history", "philosophy"],
  },
  {
    slug: "african-oral-literature",
    title: "非洲口头文学",
    level: 3,
    section: "world-traditions",
    wave: "W3",
    bridgeDomains: ["linguistics", "sociology"],
  },
  {
    slug: "latin-american-and-caribbean",
    title: "拉美与加勒比文学",
    level: 3,
    section: "world-traditions",
    wave: "W3",
    bridgeDomains: ["human-history", "political-science"],
  },
  {
    slug: "east-and-southeast-asian-modern",
    title: "东亚与东南亚现代文学",
    level: 4,
    section: "world-traditions",
    wave: "W3",
    bridgeDomains: ["human-history", "political-science"],
  },
  {
    slug: "european-canon-and-its-critics",
    title: "欧洲正典及其批评",
    level: 4,
    section: "world-traditions",
    wave: "W3",
    bridgeDomains: ["philosophy", "political-science"],
  },
  {
    slug: "close-reading",
    title: "细读",
    level: 4,
    section: "theory-and-method",
    wave: "W1",
    bridgeDomains: ["linguistics", "philosophy"],
  },
  {
    slug: "narratology",
    title: "叙事学",
    level: 4,
    section: "theory-and-method",
    wave: "W2",
    bridgeDomains: ["linguistics", "computer-science"],
  },
  {
    slug: "textual-criticism",
    title: "文本考据",
    level: 4,
    section: "theory-and-method",
    wave: "W2",
    bridgeDomains: ["human-history", "linguistics"],
  },
  {
    slug: "reception-aesthetics",
    title: "接受美学",
    level: 4,
    section: "theory-and-method",
    wave: "W3",
    bridgeDomains: ["psychology", "philosophy"],
  },
  {
    slug: "comparative-literature-method",
    title: "比较文学的方法",
    level: 4,
    section: "theory-and-method",
    wave: "W3",
    bridgeDomains: ["linguistics", "human-history"],
  },
  {
    slug: "how-readers-make-meaning",
    title: "读者如何生产意义",
    level: 4,
    section: "reading-and-reception",
    wave: "W1",
    bridgeDomains: ["psychology", "linguistics"],
  },
  {
    slug: "translation-as-rewriting",
    title: "翻译即改写",
    level: 4,
    section: "reading-and-reception",
    wave: "W2",
    bridgeDomains: ["linguistics", "sociology"],
  },
  {
    slug: "school-canon-and-exams",
    title: "教材、考试与阅读制度",
    level: 4,
    section: "reading-and-reception",
    wave: "W3",
    bridgeDomains: ["sociology", "political-science"],
  },
  {
    slug: "fandom-and-secondary-creation",
    title: "粉丝与二次创作",
    level: 5,
    section: "reading-and-reception",
    wave: "W3",
    bridgeDomains: ["sociology", "law"],
  },
  {
    slug: "libraries-and-the-book-trade",
    title: "图书馆与书籍市场",
    level: 4,
    section: "reading-and-reception",
    wave: "W3",
    bridgeDomains: ["economics", "human-history"],
  },
  {
    slug: "canon-wars",
    title: "正典之争",
    level: 5,
    section: "contemporary-edges",
    wave: "W1",
    bridgeDomains: ["political-science", "sociology"],
  },
  {
    slug: "distant-reading",
    title: "远读与数字人文",
    level: 5,
    section: "contemporary-edges",
    wave: "W2",
    bridgeDomains: ["computer-science", "mathematics"],
  },
  {
    slug: "generated-text-and-authorship",
    title: "生成文本与作者身份",
    level: 5,
    section: "contemporary-edges",
    wave: "W2",
    bridgeDomains: ["computer-science", "law"],
  },
  {
    slug: "world-literature-as-a-market",
    title: "作为市场的世界文学",
    level: 5,
    section: "contemporary-edges",
    wave: "W3",
    bridgeDomains: ["economics", "sociology"],
  },
  {
    slug: "copyright-and-the-public-domain",
    title: "版权与公有领域",
    level: 5,
    section: "contemporary-edges",
    wave: "W3",
    bridgeDomains: ["law", "political-science"],
  },
  {
    slug: "climate-and-the-literary-present",
    title: "气候与当代写作",
    level: 5,
    section: "contemporary-edges",
    wave: "W3",
    bridgeDomains: ["earth-science", "sociology"],
  },
];

export const LITERATURE_W1_SLUGS: readonly string[] = LITERATURE_ARTICLES.filter(
  (article) => article.wave === "W1"
).map((article) => article.slug);

export const LITERATURE_GLOBAL_COVERAGE = [
  "汉语文学传统",
  "欧洲正典与其批评",
  "阿拉伯—波斯叙事",
  "南亚史诗与诗学",
  "非洲口头文学",
  "拉美与加勒比文学",
  "东亚与东南亚现代文学",
] as const;

export const LITERATURE_VISUALIZATIONS = [
  {
    id: "narrative-graph",
    title: "叙事结构图谱",
    prerequisiteSlugs: ["what-is-a-story", "narratology"],
  },
  { id: "meter-lab", title: "格律与音步实验室", prerequisiteSlugs: ["meter-and-the-line"] },
  { id: "world-map", title: "世界文学时空地图", prerequisiteSlugs: ["epic-as-public-memory"] },
  {
    id: "translation-comparator",
    title: "译本比较器",
    prerequisiteSlugs: ["translation-as-rewriting"],
  },
] as const;
