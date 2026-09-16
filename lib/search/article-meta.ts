import { KNOWLEDGE_DOMAINS } from "@/lib/new-domains";
import type { Article } from "./articles";
import type { SearchDoc } from "./types";

/** Entity documents label these domains by their subject rather than their route
 *  prefix. Articles must agree, or they land in a group the UI cannot render. */
export const SECTION_BY_DOMAIN: Record<string, string> = {
  "human-history": "history",
  "universe-physics": "physics",
};

/** The exact `<domain>/<section>` set the retired domain mirror covered — the
 *  engine-driven domains render from MDX, so their search metadata now comes
 *  straight from frontmatter. Matching the mirror's granularity keeps the
 *  content type identical (e.g. psychology/debates stays an "article"). */
const ENGINE_SECTIONS = new Set(
  Object.values(KNOWLEDGE_DOMAINS).flatMap((config) =>
    config.sections.map((section) => `${config.domain}/${section.key}`)
  )
);

/** The content type for an article with no typed entity, matching what the
 *  retired domain/frontier/math index mirrors used to assign. */
export function articleType(article: Pick<Article, "url" | "domain">): string {
  if (article.url.includes("/frontier/")) return "frontier";
  const [, domain, section] = article.url.split("/");
  if (ENGINE_SECTIONS.has(`${domain}/${section}`) || article.domain === "mathematics") {
    return "entry";
  }
  return "article";
}

export function searchSectionForDomain(domain: string): string {
  return SECTION_BY_DOMAIN[domain] ?? domain;
}

/** Dev-time phrase-corpus metadata. Matches the generator's domain remap and
 *  article kind so overlay grouping and `/search?domain=` still work without
 *  `generated/`. Entity subtitle overlay stays generator-only. */
export function toCorpusSearchDoc(article: Article): SearchDoc {
  return {
    t: article.title,
    s: "",
    u: article.url,
    c: searchSectionForDomain(article.domain),
    k: articleType(article),
  };
}
