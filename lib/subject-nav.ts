import { KNOWLEDGE_DOMAINS } from "./new-domains";

/** One sub-section tab inside a subject's header. */
export interface SubjectNavItem {
  href: string;
  label: string;
}

/** Everything the unified SubjectHeader needs for one subject. */
export interface SubjectNavConfig {
  /** Subject home, used by the brand link and active-state logic. */
  home: string;
  /** Brand label shown next to the back link (accent-coloured). */
  label: string;
  /** Single domain accent (hex) used for the brand + active pill. */
  accent: string;
  /** Horizontally-scrollable sub-section tabs. */
  items: SubjectNavItem[];
  /** When the home route is a full-screen immersive splash, hide the header
   *  there (it would cover the splash's own top chrome) but keep it on every
   *  sub-page. */
  immersiveHome?: boolean;
}

/**
 * Single source of truth for every subject's header. Each subject's layout
 * renders <SubjectHeader subject="…" /> and this config drives it — so the
 * markup/style is identical everywhere and only the items + accent differ.
 * computer-science / political-science are derived from new-domains so their
 * sections stay defined in one place.
 */
export const SUBJECT_NAV: Record<string, SubjectNavConfig> = {
  economics: {
    home: "/economics",
    label: "经济学",
    accent: "#c9a23e",
    items: [
      { href: "/economics/economists", label: "经济学家" },
      { href: "/economics/theories", label: "理论" },
      { href: "/economics/concepts", label: "概念" },
      { href: "/economics/case-studies", label: "案例" },
      { href: "/economics/schools", label: "学派" },
      { href: "/economics/simulations", label: "模拟器" },
      { href: "/economics/debates", label: "大争论" },
      { href: "/economics/dialogues", label: "对话" },
      { href: "/economics/knowledge-base", label: "知识库" },
      { href: "/economics/frontier", label: "前沿" },
    ],
  },
  philosophy: {
    home: "/philosophy",
    label: "哲学",
    accent: "#4a9e74",
    items: [
      { href: "/philosophy/thinkers", label: "哲学家" },
      { href: "/philosophy/schools", label: "流派" },
      { href: "/philosophy/isms", label: "主义" },
      { href: "/philosophy/experiments", label: "思想实验" },
      { href: "/philosophy/questions", label: "大问题" },
      { href: "/philosophy/concepts", label: "概念" },
      { href: "/philosophy/dialogues", label: "对话" },
      { href: "/philosophy/timeline", label: "时间线" },
      { href: "/philosophy/tree", label: "传承树" },
      { href: "/philosophy/frontier", label: "前沿" },
    ],
  },
  psychology: {
    home: "/psychology",
    label: "心理学",
    accent: "#cc7a9e",
    items: [
      { href: "/psychology/theorists", label: "心理学家" },
      { href: "/psychology/experiments", label: "经典实验" },
      { href: "/psychology/phenomena", label: "心理现象" },
      { href: "/psychology/schools", label: "学派" },
      { href: "/psychology/disorders", label: "心理障碍" },
      { href: "/psychology/debates", label: "大争论" },
      { href: "/psychology/dialogues", label: "对话" },
      { href: "/psychology/knowledge-base", label: "知识库" },
      { href: "/psychology/frontier", label: "前沿" },
    ],
  },
  mathematics: {
    home: "/mathematics",
    label: "数学",
    accent: "#8b6fd0",
    items: [
      { href: "/mathematics/mathematicians", label: "数学家" },
      { href: "/mathematics/theorems", label: "定理" },
      { href: "/mathematics/concepts", label: "概念" },
      { href: "/mathematics/distributions", label: "概率分布" },
      { href: "/mathematics/paradoxes", label: "悖论" },
      { href: "/mathematics/dialogues", label: "对话" },
      { href: "/mathematics/timeline", label: "时间线" },
      { href: "/mathematics/frontier", label: "前沿" },
    ],
  },
  "life-science": {
    home: "/life-science",
    label: "生命科学",
    accent: "#5b9e52",
    items: [
      { href: "/life-science/timeline", label: "进化时间线" },
      { href: "/life-science/tree", label: "生命之树" },
      { href: "/life-science/species", label: "物种图鉴" },
      { href: "/life-science/food-web", label: "食物网" },
      { href: "/life-science/extinctions", label: "大灭绝" },
      { href: "/life-science/scientists", label: "科学家" },
      { href: "/life-science/dialogues", label: "对话" },
      { href: "/life-science/knowledge-base", label: "知识库" },
      { href: "/life-science/frontier", label: "前沿" },
    ],
  },
  "universe-physics": {
    home: "/universe-physics",
    label: "物理学",
    accent: "#6a6fd0",
    immersiveHome: true,
    items: [
      { href: "/universe-physics/universe", label: "宇宙地图" },
      { href: "/universe-physics/physics", label: "物理板块" },
      { href: "/universe-physics/experiments", label: "实验" },
      { href: "/universe-physics/dialogues", label: "对话" },
      { href: "/universe-physics/knowledge-base", label: "知识库" },
      { href: "/universe-physics/frontier", label: "前沿" },
    ],
  },
  cosmology: {
    home: "/cosmology",
    label: "宇宙学",
    accent: "#4f7fd0",
    items: [
      { href: "/cosmology/universe", label: "可见宇宙" },
      { href: "/cosmology/timeline", label: "时间线" },
      { href: "/cosmology/stellar-evolution", label: "恒星演化" },
      { href: "/cosmology/dialogues", label: "对话" },
      { href: "/cosmology/knowledge-base", label: "知识库" },
      { href: "/cosmology/frontier", label: "前沿" },
    ],
  },
  "human-history": {
    home: "/human-history",
    label: "人类历史",
    accent: "#c08a3e",
    items: [
      { href: "/human-history/timeline", label: "时间线" },
      { href: "/human-history/atlas", label: "知识图谱" },
      { href: "/human-history/graph", label: "关系图" },
      { href: "/human-history/civilizations", label: "文明对比" },
      { href: "/human-history/map", label: "大洲" },
      { href: "/human-history/figures", label: "人物" },
      { href: "/human-history/lessons", label: "借鉴" },
      { href: "/human-history/simulations", label: "模拟" },
      { href: "/human-history/scholarly", label: "深度阅读" },
      { href: "/human-history/knowledge", label: "知识库" },
      { href: "/human-history/frontier", label: "研究前沿" },
    ],
  },
};

// Engine domains (computer-science / political-science) reuse their section
// definitions from new-domains so there is no second copy to drift.
for (const [domain, config] of Object.entries(KNOWLEDGE_DOMAINS)) {
  SUBJECT_NAV[domain] = {
    home: `/${domain}`,
    label: config.label,
    accent: config.accent,
    items: [
      ...config.sections.map((s) => ({ href: `/${domain}/${s.key}`, label: s.label })),
      { href: `/${domain}/frontier`, label: "前沿" },
    ],
  };
}

export function getSubjectNav(subject: string): SubjectNavConfig | null {
  return SUBJECT_NAV[subject] ?? null;
}
