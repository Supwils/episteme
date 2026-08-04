import { DOMAINS } from "@/lib/data";
import { getNavSuperGroups, getClustersWithDomains } from "@/lib/domain-clusters";

export interface NavItem {
  href: string;
  label: string;
  en: string;
  /** Domain glowColor (from lib/data) for the dropdown dot. */
  color: string;
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

export const HOME_LINK = { href: "/", label: "首页" };

const toItem = (domain: (typeof DOMAINS)[number]): NavItem => ({
  href: `/${domain.id}`,
  label: domain.title,
  en: domain.titleEn,
  color: domain.glowColor,
});

/**
 * Subjects grouped into super-group dropdowns. Derived from DOMAINS' cluster
 * field (lib/data.tsx) — never hand-maintain a domain list here again: the old
 * hand-written copy silently dropped sociology and linguistics for months.
 */
export const NAV_GROUPS: NavGroup[] = [
  ...getNavSuperGroups(DOMAINS).map((superGroup) => ({
    label: superGroup.label,
    en: superGroup.en,
    sections: superGroup.sections.map((section) => ({
      label: section.label,
      en: section.en,
      items: section.domains.map(toItem),
    })),
  })),
  {
    label: "探索",
    en: "Explore",
    sections: [
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
    ],
  },
];

/** Flat list (home + every subject) for the mobile drawer. */
export const NAV_LINKS_FLAT = [
  HOME_LINK,
  ...NAV_GROUPS.flatMap((g) =>
    g.sections.flatMap((s) => s.items.map((i) => ({ href: i.href, label: i.label })))
  ),
];

/**
 * All six clusters in one synthetic group — used by SubjectHeader so every
 * domain page gets direct cross-domain switching (previously: none at all).
 */
export const ALL_DOMAINS_GROUP: NavGroup = {
  label: "全部领域",
  en: "All Domains",
  sections: getClustersWithDomains(DOMAINS).map((cluster) => ({
    label: cluster.label,
    en: cluster.en,
    items: cluster.domains.map(toItem),
  })),
};
