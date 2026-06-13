import type { SearchDocument } from "./types";

export function indexDomains(
  domainDataMod: {
    DOMAIN_DATA: ReadonlyArray<{
      slug: string;
      title: string;
      titleEn: string;
      domain: string;
      section: string;
      sectionLabel: string;
      category: string;
    }>;
  } | null
): SearchDocument[] {
  if (!domainDataMod) return [];
  return domainDataMod.DOMAIN_DATA.map((a) => ({
    id: `domain-${a.domain}-${a.section}-${a.slug}`,
    title: a.title,
    subtitle: a.titleEn,
    content: `${a.category} · ${a.sectionLabel}`,
    section: a.domain,
    url: `/${a.domain}/${a.section}/${a.slug}`,
    type: "entry",
  }));
}
