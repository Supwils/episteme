import type { KnowledgeDomainId } from "./knowledge-continuum";
import type { KnowledgeLevel } from "./knowledge-levels";

export type ReligionArticlePlan = {
  slug: string;
  title: string;
  level: KnowledgeLevel;
  section: ReligionSectionId;
  wave: "W1" | "W2" | "W3";
  bridgeDomains: readonly KnowledgeDomainId[];
};

export type ReligionSectionId =
  | "religion-foundations"
  | "religious-history"
  | "texts-and-canons"
  | "comparative-religion"
  | "religion-and-society"
  | "secularization";

export const RELIGION_SECTIONS: readonly {
  id: ReligionSectionId;
  label: string;
}[] = [
  { id: "religion-foundations", label: "宗教基础" },
  { id: "religious-history", label: "宗教史" },
  { id: "texts-and-canons", label: "经典与文本" },
  { id: "comparative-religion", label: "比较宗教" },
  { id: "religion-and-society", label: "宗教与社会" },
  { id: "secularization", label: "世俗化" },
];

export const RELIGION_ARTICLES: readonly ReligionArticlePlan[] = [
  {
    slug: "what-is-religion",
    title: "什么是宗教",
    level: 1,
    section: "religion-foundations",
    wave: "W1",
    bridgeDomains: ["philosophy", "sociology"],
  },
  {
    slug: "sacred-and-profane",
    title: "神圣与凡俗",
    level: 1,
    section: "religion-foundations",
    wave: "W1",
    bridgeDomains: ["sociology", "philosophy"],
  },
  {
    slug: "ritual-and-practice",
    title: "仪式与实践",
    level: 1,
    section: "religion-foundations",
    wave: "W2",
    bridgeDomains: ["sociology", "psychology"],
  },
  {
    slug: "myth-and-cosmos",
    title: "神话与宇宙论",
    level: 2,
    section: "religion-foundations",
    wave: "W2",
    bridgeDomains: ["philosophy", "human-history"],
  },
  {
    slug: "religious-experience",
    title: "宗教经验",
    level: 2,
    section: "religion-foundations",
    wave: "W3",
    bridgeDomains: ["psychology", "philosophy"],
  },
  {
    slug: "axial-age-religions",
    title: "轴心时代",
    level: 2,
    section: "religious-history",
    wave: "W1",
    bridgeDomains: ["human-history", "philosophy"],
  },
  {
    slug: "formation-of-world-religions",
    title: "世界宗教的形成",
    level: 2,
    section: "religious-history",
    wave: "W2",
    bridgeDomains: ["human-history", "sociology"],
  },
  {
    slug: "empire-and-mission",
    title: "帝国与传教",
    level: 3,
    section: "religious-history",
    wave: "W2",
    bridgeDomains: ["human-history", "political-science"],
  },
  {
    slug: "reform-and-revival",
    title: "改革与复兴",
    level: 3,
    section: "religious-history",
    wave: "W3",
    bridgeDomains: ["human-history", "sociology"],
  },
  {
    slug: "religion-in-the-twentieth-century",
    title: "二十世纪的宗教",
    level: 3,
    section: "religious-history",
    wave: "W3",
    bridgeDomains: ["human-history", "political-science"],
  },
  {
    slug: "scripture-and-canon",
    title: "经典与正典",
    level: 3,
    section: "texts-and-canons",
    wave: "W1",
    bridgeDomains: ["linguistics", "philosophy"],
  },
  {
    slug: "commentary-and-interpretation",
    title: "注疏与解释",
    level: 3,
    section: "texts-and-canons",
    wave: "W2",
    bridgeDomains: ["linguistics", "literature"],
  },
  {
    slug: "oral-and-written-transmission",
    title: "口传与书写",
    level: 2,
    section: "texts-and-canons",
    wave: "W2",
    bridgeDomains: ["linguistics", "human-history"],
  },
  {
    slug: "translation-of-sacred-texts",
    title: "圣典翻译",
    level: 3,
    section: "texts-and-canons",
    wave: "W3",
    bridgeDomains: ["linguistics", "literature"],
  },
  {
    slug: "apocrypha-and-canon-contests",
    title: "伪经与正典之争",
    level: 4,
    section: "texts-and-canons",
    wave: "W3",
    bridgeDomains: ["philosophy", "human-history"],
  },
  {
    slug: "comparing-religions",
    title: "比较宗教如何可能",
    level: 3,
    section: "comparative-religion",
    wave: "W1",
    bridgeDomains: ["philosophy", "sociology"],
  },
  {
    slug: "gods-and-the-one",
    title: "多神与一神",
    level: 3,
    section: "comparative-religion",
    wave: "W2",
    bridgeDomains: ["philosophy", "human-history"],
  },
  {
    slug: "afterlife-and-salvation",
    title: "来世与救赎",
    level: 3,
    section: "comparative-religion",
    wave: "W2",
    bridgeDomains: ["philosophy", "psychology"],
  },
  {
    slug: "religious-law-and-ethics",
    title: "宗教法与伦理",
    level: 4,
    section: "comparative-religion",
    wave: "W3",
    bridgeDomains: ["law", "philosophy"],
  },
  {
    slug: "mysticism-across-traditions",
    title: "跨传统的神秘主义",
    level: 4,
    section: "comparative-religion",
    wave: "W3",
    bridgeDomains: ["philosophy", "psychology"],
  },
  {
    slug: "religion-and-politics",
    title: "宗教与政治",
    level: 4,
    section: "religion-and-society",
    wave: "W1",
    bridgeDomains: ["political-science", "sociology"],
  },
  {
    slug: "religion-and-gender",
    title: "宗教与性别",
    level: 4,
    section: "religion-and-society",
    wave: "W2",
    bridgeDomains: ["sociology", "political-science"],
  },
  {
    slug: "religion-and-violence",
    title: "宗教与暴力",
    level: 4,
    section: "religion-and-society",
    wave: "W2",
    bridgeDomains: ["political-science", "human-history"],
  },
  {
    slug: "pilgrimage-and-sacred-space",
    title: "朝圣与圣地",
    level: 3,
    section: "religion-and-society",
    wave: "W3",
    bridgeDomains: ["human-history", "sociology"],
  },
  {
    slug: "diaspora-and-conversion",
    title: "离散与改宗",
    level: 3,
    section: "religion-and-society",
    wave: "W3",
    bridgeDomains: ["sociology", "human-history"],
  },
  {
    slug: "secularization-debate",
    title: "世俗化之争",
    level: 5,
    section: "secularization",
    wave: "W1",
    bridgeDomains: ["sociology", "philosophy"],
  },
  {
    slug: "disenchantment-and-reenchantment",
    title: "祛魅与再魅",
    level: 5,
    section: "secularization",
    wave: "W2",
    bridgeDomains: ["philosophy", "sociology"],
  },
  {
    slug: "civil-religion",
    title: "公民宗教",
    level: 4,
    section: "secularization",
    wave: "W2",
    bridgeDomains: ["political-science", "sociology"],
  },
  {
    slug: "atheism-and-nonreligion",
    title: "无神论与非宗教",
    level: 4,
    section: "secularization",
    wave: "W3",
    bridgeDomains: ["philosophy", "sociology"],
  },
  {
    slug: "religion-and-science",
    title: "宗教与科学",
    level: 5,
    section: "secularization",
    wave: "W3",
    bridgeDomains: ["philosophy", "universe-physics"],
  },
];

export const ALL_RELIGION_ARTICLES = RELIGION_ARTICLES;

export const RELIGION_VISUALIZATIONS = [
  "仪式结构实验室",
  "世界宗教示意地图",
  "经典开篇比较器",
  "世俗化指标示意",
] as const;

export const RELIGION_GLOBAL_COVERAGE = [
  "西亚一神教传统",
  "南亚与内亚",
  "东亚儒教—佛教—道教交叠",
  "非洲本土宗教与基督教/伊斯兰教",
  "美洲原住民与殖民后宗教",
  "欧洲基督教与世俗化",
  "当代离散与全球南方",
] as const;
