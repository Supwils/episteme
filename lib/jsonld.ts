import { SITE_URL } from "./constants";

/**
 * Serialize an object for safe injection into a `<script type="application/ld+json">`
 * via dangerouslySetInnerHTML. Plain JSON.stringify does NOT escape `<`, so any value
 * containing the literal `</script>` would close the tag early and let the remainder
 * be parsed as HTML. Escaping `<`/`>`/`&` makes the payload inert while keeping it
 * valid JSON (the content is parsed as JSON-LD, not JS, so the U+2028/U+2029 JS-string
 * hazard does not apply here).
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

interface ArticleJsonLdParams {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  author?: string;
  keywords?: string[];
  citations?: string[];
}

export function createArticleJsonLd({
  title,
  description,
  url,
  datePublished = "2025-01-01",
  dateModified,
  image,
  author = "Episteme · 格致",
  keywords,
  citations,
}: ArticleJsonLdParams): Record<string, unknown> {
  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    author: { "@type": "Organization", name: author },
    publisher: {
      "@type": "Organization",
      name: "Episteme · 格致",
      url: SITE_URL,
    },
    datePublished,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  if (dateModified) ld.dateModified = dateModified;
  if (image) ld.image = image;
  if (keywords && keywords.length > 0) ld.keywords = keywords;
  // Surface the article's bibliography to search engines as a credibility
  // signal — a sourced article is a trustworthy one.
  if (citations && citations.length > 0) ld.citation = citations;
  return ld;
}

interface PersonJsonLdParams {
  name: string;
  description: string;
  url: string;
  birthDate?: string;
  deathDate?: string;
  nationality?: string;
  jobTitle?: string;
  knowsAbout?: string[];
  memberOf?: string;
  image?: string;
}

export function createPersonJsonLd({
  name,
  description,
  url,
  birthDate,
  deathDate,
  nationality,
  jobTitle,
  knowsAbout,
  memberOf,
  image,
}: PersonJsonLdParams): Record<string, unknown> {
  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  if (birthDate) ld.birthDate = birthDate;
  if (deathDate) ld.deathDate = deathDate;
  if (nationality) ld.nationality = { "@type": "Country", name: nationality };
  if (jobTitle) ld.jobTitle = jobTitle;
  if (knowsAbout && knowsAbout.length > 0) ld.knowsAbout = knowsAbout;
  if (memberOf) ld.memberOf = { "@type": "Organization", name: memberOf };
  if (image) ld.image = image;
  return ld;
}

interface DefinedTermJsonLdParams {
  name: string;
  description: string;
  url: string;
  inDefinedTermSet?: string;
  keywords?: string[];
}

export function createDefinedTermJsonLd({
  name,
  description,
  url,
  inDefinedTermSet,
  keywords,
}: DefinedTermJsonLdParams): Record<string, unknown> {
  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name,
    description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  if (inDefinedTermSet) ld.inDefinedTermSet = inDefinedTermSet;
  if (keywords && keywords.length > 0) ld.keywords = keywords;
  return ld;
}
