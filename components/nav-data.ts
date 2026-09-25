import type { GlyphName } from "@/components/design/Glyph";

export interface NavItem {
  href: string;
  label: string;
  en: string;
  /** Accent for the item's rule (subject tabs); ignored when a glyph is given. */
  color: string;
  /** Engraved function icon (components/design/Glyph). */
  glyph?: GlyphName;
}

/** A cluster subsection inside a dropdown panel. */
export interface NavSection {
  label: string;
  en: string;
  items: NavItem[];
}

export interface NavGroup {
  label: string;
  en: string;
  sections: NavSection[];
}

/**
 * Cross-domain entry points. The 22 domains themselves are not listed here:
 * the header's six cluster buttons and 全部领域 open the atlas panel, which is
 * derived from DOMAINS (lib/atlas.ts).
 */
export const EXPLORE_GROUP: NavGroup = {
  label: "探索",
  en: "Explore",
  sections: [
    {
      label: "探索",
      en: "Explore",
      items: [
        { href: "/read", label: "阅读路线", en: "Reading Paths", color: "", glyph: "route" },
        { href: "/random", label: "随机一篇", en: "Random Article", color: "", glyph: "random" },
        {
          href: "/knowledge-graph",
          label: "知识图谱",
          en: "Knowledge Graph",
          color: "",
          glyph: "graph",
        },
        { href: "/daily", label: "每日知识", en: "Daily Knowledge", color: "", glyph: "daily" },
        {
          href: "/curiosities",
          label: "奇趣知识",
          en: "Curiosities",
          color: "",
          glyph: "curiosity",
        },
        { href: "/search", label: "全站搜索", en: "Search", color: "", glyph: "search" },
        { href: "/molecules", label: "分子图鉴", en: "Molecules", color: "", glyph: "molecules" },
      ],
    },
  ],
};
