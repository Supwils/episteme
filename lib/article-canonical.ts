import type { Metadata } from "next";
import { createFrontier, FRONTIER_DOMAIN_CONFIG, type FrontierDomain } from "@/lib/frontier";
import { createKnowledgeSection } from "@/lib/knowledge-domain";
import { getDomainConfig, getSectionConfig } from "@/lib/new-domains";

/** Relative canonical path; `metadataBase` in the root layout makes it absolute. */
export function withCanonicalPath(path: string, meta: Metadata): Metadata {
  const prior = meta.alternates && typeof meta.alternates === "object" ? meta.alternates : {};
  return {
    ...meta,
    alternates: { ...prior, canonical: path },
  };
}

export function engineArticleMetadata(domain: string, section: string, slug: string): Metadata {
  const article = createKnowledgeSection(domain, section).getBySlug(slug);
  if (!article) return {};
  const sc = getSectionConfig(domain, section);
  const dc = getDomainConfig(domain);
  return withCanonicalPath(`/${domain}/${section}/${slug}`, {
    title: `${article.title} — ${sc?.label} — ${dc?.label}`,
    description: article.excerpt,
  });
}

export function frontierArticleMetadata(domain: FrontierDomain, slug: string): Metadata {
  const article = createFrontier(domain).getArticleBySlug(slug);
  if (!article) return {};
  return withCanonicalPath(`/${domain}/frontier/${slug}`, {
    title: `${article.title} — 研究前沿 — ${FRONTIER_DOMAIN_CONFIG[domain].label}`,
    description: article.excerpt,
  });
}
