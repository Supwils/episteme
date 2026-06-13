import type { SearchDocument } from "./types";

/** Frontier articles live per-domain but the search UI groups by these sections. */
const DOMAIN_TO_SECTION: Record<string, string> = {
  "universe-physics": "physics",
  "human-history": "history",
  cosmology: "cosmology",
  philosophy: "philosophy",
  "life-science": "life-science",
  economics: "economics",
  psychology: "psychology",
  mathematics: "mathematics",
  "computer-science": "computer-science",
  "political-science": "political-science",
};

export function indexFrontier(
  frontierDataMod: {
    FRONTIER_DATA: ReadonlyArray<{
      slug: string;
      title: string;
      titleEn: string;
      domain: string;
      category: string;
    }>;
  } | null
): SearchDocument[] {
  if (!frontierDataMod) return [];
  return frontierDataMod.FRONTIER_DATA.map((a) => ({
    id: `frontier-${a.domain}-${a.slug}`,
    title: a.title,
    subtitle: a.titleEn,
    content: `${a.category} · 研究前沿`,
    section: DOMAIN_TO_SECTION[a.domain] ?? a.domain,
    url: `/${a.domain}/frontier/${a.slug}`,
    type: "frontier",
  }));
}
