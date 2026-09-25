import type { Metadata } from "next";
import { createFrontier, FRONTIER_DOMAIN_CONFIG, type FrontierDomain } from "@/lib/frontier";
import { createKnowledgeSection } from "@/lib/knowledge-domain";
import { getDomainConfig, getSectionConfig } from "@/lib/new-domains";
import { articleOgImagePath, buildArticleMetadata } from "@/lib/article-metadata";

/**
 * Relative canonical path (`metadataBase` makes it absolute), plus a complete
 * share card: pages that set only title/description would otherwise inherit the
 * domain layout's og:description and the site-wide Twitter card.
 */
export function withCanonicalPath(path: string, meta: Metadata): Metadata {
  const prior = meta.alternates && typeof meta.alternates === "object" ? meta.alternates : {};
  const title = typeof meta.title === "string" ? meta.title : undefined;
  const description = meta.description ?? undefined;
  if (!title || !description) {
    return { ...meta, alternates: { ...prior, canonical: path } };
  }
  const image =
    meta.openGraph?.images ??
    articleOgImagePath({
      path,
      title: title.split(" — ")[0]!,
      description,
      domain: path.split("/")[1] ?? "",
    });
  return {
    ...meta,
    alternates: { ...prior, canonical: path },
    openGraph: { title, description, url: path, ...meta.openGraph, images: image },
    twitter: meta.twitter ?? {
      card: "summary_large_image",
      title: meta.openGraph?.title?.toString() ?? title,
      description,
      images: typeof image === "string" ? [image] : image,
    },
  };
}

export function engineArticleMetadata(domain: string, section: string, slug: string): Metadata {
  const article = createKnowledgeSection(domain, section).getBySlug(slug);
  if (!article) return {};
  const sc = getSectionConfig(domain, section);
  const dc = getDomainConfig(domain);
  return buildArticleMetadata({
    path: `/${domain}/${section}/${slug}`,
    title: article.title,
    titleTrail: [sc?.label, dc?.label].filter((label): label is string => Boolean(label)),
    description: article.excerpt,
    domain,
  });
}

export function frontierArticleMetadata(domain: FrontierDomain, slug: string): Metadata {
  const article = createFrontier(domain).getArticleBySlug(slug);
  if (!article) return {};
  return buildArticleMetadata({
    path: `/${domain}/frontier/${slug}`,
    title: article.title,
    titleTrail: ["研究前沿", FRONTIER_DOMAIN_CONFIG[domain].label],
    description: article.excerpt,
    domain,
  });
}
