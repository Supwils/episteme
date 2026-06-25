export interface NavItem {
  href: string;
  label: string;
  en: string;
  /** Domain accent (first stop of its gradient in lib/data) for the dropdown dot. */
  color: string;
}

export interface NavGroup {
  label: string;
  en: string;
  items: NavItem[];
}

export const HOME_LINK = { href: "/", label: "首页" };

/** Subjects grouped into a few category dropdowns instead of one crowded row. */
export const NAV_GROUPS: NavGroup[] = [
  {
    label: "自然与形式",
    en: "Natural & Formal",
    items: [
      { href: "/universe-physics", label: "物理学", en: "Physics", color: "#6366f1" },
      { href: "/cosmology", label: "宇宙学", en: "Cosmology", color: "#3b82f6" },
      { href: "/earth-science", label: "地球科学", en: "Earth Science", color: "#4f9d76" },
      { href: "/life-science", label: "生命科学", en: "Life Science", color: "#10b981" },
      { href: "/medicine", label: "医学与公共卫生", en: "Medicine", color: "#d9544d" },
      { href: "/chemistry", label: "化学", en: "Chemistry", color: "#e08a3c" },
      { href: "/mathematics", label: "数学与逻辑", en: "Mathematics & Logic", color: "#22d3ee" },
      { href: "/computer-science", label: "计算机科学", en: "Computer Science", color: "#4f9cf0" },
    ],
  },
  {
    label: "人文与社会",
    en: "Humanities & Society",
    items: [
      { href: "/human-history", label: "人类历史", en: "Human History", color: "#f59e0b" },
      { href: "/philosophy", label: "哲学", en: "Philosophy", color: "#10b981" },
      { href: "/psychology", label: "心理学", en: "Psychology", color: "#d4789c" },
      { href: "/economics", label: "经济学", en: "Economics", color: "#e8b84a" },
      { href: "/political-science", label: "政治学", en: "Political Science", color: "#c25b5b" },
    ],
  },
  {
    label: "探索",
    en: "Explore",
    items: [
      { href: "/read", label: "阅读路线", en: "Reading Paths", color: "#c8a45a" },
      { href: "/knowledge-graph", label: "知识图谱", en: "Knowledge Graph", color: "#9b8cff" },
      { href: "/daily", label: "每日知识", en: "Daily Knowledge", color: "#6fb0f5" },
      { href: "/curiosities", label: "奇趣知识", en: "Curiosities", color: "#e89ab5" },
    ],
  },
];

/** Flat list (home + every subject) for the mobile drawer. */
export const NAV_LINKS_FLAT = [
  HOME_LINK,
  ...NAV_GROUPS.flatMap((g) => g.items.map((i) => ({ href: i.href, label: i.label }))),
];
