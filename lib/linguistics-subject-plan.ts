import type { KnowledgeDomainId } from "./knowledge-continuum";
import type { KnowledgeLevel } from "./knowledge-levels";

export type LinguisticsArticlePlan = {
  slug: string;
  title: string;
  level: KnowledgeLevel;
  bridgeDomains: readonly KnowledgeDomainId[];
};

export type LinguisticsSectionPlan = {
  id: string;
  label: string;
  articles: readonly LinguisticsArticlePlan[];
};

export type LinguisticsReleaseWave = {
  id: string;
  label: string;
  articleSlugs: readonly string[];
};

export const LINGUISTICS_SECTIONS: readonly LinguisticsSectionPlan[] = [
  {
    id: "sounds-and-signs",
    label: "声音与手势",
    articles: [
      {
        slug: "language-speech-and-sign",
        title: "语言、言语与手语",
        level: 1,
        bridgeDomains: ["psychology", "sociology"],
      },
      {
        slug: "how-speech-is-made",
        title: "人怎样发出语音",
        level: 1,
        bridgeDomains: ["life-science", "universe-physics"],
      },
      {
        slug: "phonetics-and-ipa",
        title: "语音学与国际音标",
        level: 2,
        bridgeDomains: ["universe-physics", "medicine"],
      },
      {
        slug: "phonemes-and-sound-systems",
        title: "音位与音系系统",
        level: 2,
        bridgeDomains: ["psychology", "mathematics"],
      },
      {
        slug: "sign-language-structure",
        title: "手语的空间语法",
        level: 3,
        bridgeDomains: ["psychology", "sociology"],
      },
      {
        slug: "sign-language-research",
        title: "手语研究：一门学科的诞生",
        level: 3,
        bridgeDomains: ["psychology", "medicine"],
      },
      {
        slug: "acoustic-phonetics",
        title: "声学语音学与语音测量",
        level: 4,
        bridgeDomains: ["universe-physics", "computer-science"],
      },
      {
        slug: "tone-and-prosody",
        title: "声调与韵律",
        level: 2,
        bridgeDomains: ["universe-physics", "psychology"],
      },
      {
        slug: "speech-perception",
        title: "言语感知：从连续声波到离散单位",
        level: 4,
        bridgeDomains: ["psychology", "computer-science"],
      },
    ],
  },
  {
    id: "words-sentences-meaning",
    label: "词句与意义",
    articles: [
      {
        slug: "words-and-sentences",
        title: "词如何组成句子",
        level: 1,
        bridgeDomains: ["psychology", "philosophy"],
      },
      {
        slug: "morphology",
        title: "形态学：词的内部结构",
        level: 2,
        bridgeDomains: ["computer-science", "mathematics"],
      },
      {
        slug: "syntax",
        title: "句法学：结构与依存",
        level: 2,
        bridgeDomains: ["computer-science", "philosophy"],
      },
      {
        slug: "semantics",
        title: "语义学：表达如何承载意义",
        level: 2,
        bridgeDomains: ["philosophy", "mathematics"],
      },
      {
        slug: "pragmatics",
        title: "语用学：语境、意图与会话",
        level: 3,
        bridgeDomains: ["philosophy", "psychology"],
      },
      {
        slug: "discourse-analysis",
        title: "话语与篇章分析：句子以上的语言组织",
        level: 3,
        bridgeDomains: ["philosophy", "sociology"],
      },
      {
        slug: "grammar-theories",
        title: "语法理论的证据与争论",
        level: 5,
        bridgeDomains: ["philosophy", "psychology"],
      },
      {
        slug: "lexicography",
        title: "词典学：词典是怎样编出来的",
        level: 3,
        bridgeDomains: ["computer-science", "human-history"],
      },
      {
        slug: "stylistics",
        title: "文体学：风格作为选择的科学",
        level: 3,
        bridgeDomains: ["sociology", "psychology"],
      },
    ],
  },
  {
    id: "acquisition-and-mind",
    label: "习得与心智",
    articles: [
      {
        slug: "children-learn-language",
        title: "儿童怎样学会语言",
        level: 1,
        bridgeDomains: ["psychology", "life-science"],
      },
      {
        slug: "first-language-acquisition",
        title: "第一语言习得",
        level: 3,
        bridgeDomains: ["psychology", "life-science"],
      },
      {
        slug: "multilingual-mind",
        title: "多语心智与语言切换",
        level: 3,
        bridgeDomains: ["psychology", "sociology"],
      },
      {
        slug: "psycholinguistic-processing",
        title: "语言理解与产生",
        level: 4,
        bridgeDomains: ["psychology", "medicine"],
      },
      {
        slug: "language-and-brain",
        title: "语言、脑与失语症",
        level: 4,
        bridgeDomains: ["psychology", "medicine"],
      },
      {
        slug: "language-thought-debate",
        title: "语言是否塑造思维",
        level: 5,
        bridgeDomains: ["psychology", "philosophy"],
      },
      {
        slug: "second-language-acquisition",
        title: "第二语言习得",
        level: 2,
        bridgeDomains: ["psychology", "computer-science"],
      },
      {
        slug: "reading-and-dyslexia",
        title: "阅读习得与读写困难",
        level: 4,
        bridgeDomains: ["psychology", "medicine"],
      },
    ],
  },
  {
    id: "history-typology-society",
    label: "历史、类型与社会",
    articles: [
      {
        slug: "languages-change",
        title: "语言为什么会变化",
        level: 1,
        bridgeDomains: ["human-history", "sociology"],
      },
      {
        slug: "language-families",
        title: "语系与比较方法",
        level: 3,
        bridgeDomains: ["human-history", "mathematics"],
      },
      {
        slug: "primitive-languages-myth",
        title: "「原始语言」神话：一个被语言学自己推翻的排序",
        level: 3,
        bridgeDomains: ["human-history", "sociology"],
      },
      {
        slug: "eskimo-snow-words-hoax",
        title: "爱斯基摩雪词神话：一个学术都市传说的完整解剖",
        level: 3,
        bridgeDomains: ["human-history", "psychology"],
      },
      {
        slug: "linguistic-typology",
        title: "语言类型学与跨语言共性",
        level: 3,
        bridgeDomains: ["mathematics", "computer-science"],
      },
      {
        slug: "language-contact",
        title: "语言接触、借词与混合",
        level: 3,
        bridgeDomains: ["human-history", "sociology"],
      },
      {
        slug: "language-identity-power",
        title: "语言、身份与权力",
        level: 3,
        bridgeDomains: ["sociology", "political-science"],
      },
      {
        slug: "endangered-language-revitalization",
        title: "濒危语言与语言复振",
        level: 5,
        bridgeDomains: ["sociology", "political-science"],
      },
      {
        slug: "chinese-dialects",
        title: "汉语方言与变体",
        level: 2,
        bridgeDomains: ["human-history", "sociology"],
      },
      {
        slug: "sociolinguistic-variation",
        title: "社会语言学变异",
        level: 2,
        bridgeDomains: ["sociology", "psychology"],
      },
      {
        slug: "constructed-languages",
        title: "人工语言：从世界语到道本语",
        level: 3,
        bridgeDomains: ["sociology", "political-science"],
      },
    ],
  },
  {
    id: "writing-systems",
    label: "文字系统",
    articles: [
      {
        slug: "language-and-writing",
        title: "语言与文字不是一回事",
        level: 1,
        bridgeDomains: ["human-history", "philosophy"],
      },
      {
        slug: "writing-system-types",
        title: "文字系统的主要类型",
        level: 2,
        bridgeDomains: ["human-history", "computer-science"],
      },
      {
        slug: "chinese-writing",
        title: "汉字：形、音、义与历史层次",
        level: 3,
        bridgeDomains: ["human-history", "philosophy"],
      },
      {
        slug: "south-asian-scripts",
        title: "南亚婆罗米系文字",
        level: 3,
        bridgeDomains: ["human-history", "political-science"],
      },
      {
        slug: "arabic-and-african-scripts",
        title: "阿拉伯文字与非洲文字实践",
        level: 3,
        bridgeDomains: ["human-history", "sociology"],
      },
      {
        slug: "unicode-and-digital-writing",
        title: "Unicode 与数字文字基础设施",
        level: 4,
        bridgeDomains: ["computer-science", "political-science"],
      },
      {
        slug: "origin-of-writing",
        title: "文字的起源：从记账到书写语言",
        level: 2,
        bridgeDomains: ["human-history", "sociology"],
      },
      {
        slug: "input-methods",
        title: "输入法与文字信息化",
        level: 4,
        bridgeDomains: ["computer-science", "human-history"],
      },
    ],
  },
  {
    id: "methods-and-frontiers",
    label: "方法与前沿",
    articles: [
      {
        slug: "linguistic-fieldwork",
        title: "语言田野调查与社区协作",
        level: 3,
        bridgeDomains: ["sociology", "human-history"],
      },
      {
        slug: "corpus-linguistics",
        title: "语料库语言学",
        level: 4,
        bridgeDomains: ["computer-science", "mathematics"],
      },
      {
        slug: "experimental-linguistics",
        title: "实验语言学与因果推断",
        level: 4,
        bridgeDomains: ["psychology", "mathematics"],
      },
      {
        slug: "computational-linguistics",
        title: "计算语言学与自然语言处理",
        level: 4,
        bridgeDomains: ["computer-science", "mathematics"],
      },
      {
        slug: "language-evolution",
        title: "语言能力如何演化",
        level: 5,
        bridgeDomains: ["life-science", "psychology"],
      },
      {
        slug: "multilingual-ai",
        title: "多语 AI、低资源语言与评测公平",
        level: 5,
        bridgeDomains: ["computer-science", "sociology", "political-science"],
      },
      {
        slug: "speech-technology",
        title: "言语技术：机器如何听懂与说出语言",
        level: 4,
        bridgeDomains: ["computer-science", "psychology"],
      },
      {
        slug: "llm-and-linguistic-theory",
        title: "大语言模型与语言学理论",
        level: 5,
        bridgeDomains: ["computer-science", "philosophy"],
      },
    ],
  },
] as const;

export const ALL_LINGUISTICS_ARTICLES = LINGUISTICS_SECTIONS.flatMap((section) => section.articles);

export const LINGUISTICS_RELEASE_WAVES: readonly LinguisticsReleaseWave[] = [
  {
    id: "foundation",
    label: "L1–L2 结构基础",
    articleSlugs: ALL_LINGUISTICS_ARTICLES.filter((article) => article.level <= 2).map(
      (article) => article.slug
    ),
  },
  {
    id: "comparison-and-fieldwork",
    label: "L3 比较、接触与田野方法",
    articleSlugs: [
      "language-families",
      "linguistic-typology",
      "language-contact",
      "linguistic-fieldwork",
      "primitive-languages-myth",
      "eskimo-snow-words-hoax",
    ],
  },
  {
    id: "meaning-mind-and-global-writing",
    label: "L3 意义、心智与全球文字实践",
    articleSlugs: [
      "sign-language-structure",
      "sign-language-research",
      "pragmatics",
      "discourse-analysis",
      "lexicography",
      "stylistics",
      "first-language-acquisition",
      "multilingual-mind",
      "language-identity-power",
      "constructed-languages",
      "chinese-writing",
      "south-asian-scripts",
      "arabic-and-african-scripts",
    ],
  },
  {
    id: "measurement-models-and-digital-infrastructure",
    label: "L4 测量、模型与数字基础设施",
    articleSlugs: [
      "acoustic-phonetics",
      "psycholinguistic-processing",
      "language-and-brain",
      "unicode-and-digital-writing",
      "corpus-linguistics",
      "experimental-linguistics",
      "computational-linguistics",
      "speech-technology",
      "reading-and-dyslexia",
      "input-methods",
      "speech-perception",
    ],
  },
  {
    id: "theory-evolution-and-language-justice",
    label: "L5 理论、演化与语言正义",
    articleSlugs: [
      "grammar-theories",
      "language-thought-debate",
      "endangered-language-revitalization",
      "language-evolution",
      "multilingual-ai",
      "llm-and-linguistic-theory",
    ],
  },
] as const;

export const RELEASED_LINGUISTICS_ARTICLES = LINGUISTICS_RELEASE_WAVES.flatMap(
  (wave) => wave.articleSlugs
).map((slug) => ALL_LINGUISTICS_ARTICLES.find((article) => article.slug === slug)!);

export const LINGUISTICS_VISUALIZATIONS = [
  {
    id: "ipa-explorer",
    label: "发音与 IPA 探索器",
    prerequisiteSlugs: ["how-speech-is-made", "phonetics-and-ipa"],
  },
  {
    id: "syntax-tree-builder",
    label: "句法树构造器",
    prerequisiteSlugs: ["words-and-sentences", "syntax"],
  },
  {
    id: "language-map",
    label: "语言谱系与类型地图",
    prerequisiteSlugs: ["language-families", "linguistic-typology"],
  },
  {
    id: "writing-timeline",
    label: "文字系统时间轴",
    prerequisiteSlugs: ["language-and-writing", "writing-system-types"],
  },
  {
    id: "sound-change-lab",
    label: "音变模拟器",
    prerequisiteSlugs: ["phonemes-and-sound-systems", "languages-change"],
  },
] as const;

export const LINGUISTICS_GLOBAL_COVERAGE = [
  "Sinitic and Sino-Tibetan",
  "Indo-Aryan and Dravidian",
  "Arabic and Afroasiatic",
  "Niger-Congo and Bantu",
  "Austronesian",
  "Indigenous languages of the Americas and Australia",
  "Signed languages",
] as const;
