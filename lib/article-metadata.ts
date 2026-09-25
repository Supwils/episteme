import type { Metadata } from "next";

const OG_SIZE = { width: 1200, height: 630 } as const;
// /api/og truncates at 120 characters; sending more only lengthens the URL.
const OG_DESCRIPTION_CHARS = 120;

export interface ArticleMetadataInput {
  /** Site-relative path; `metadataBase` in the root layout makes it absolute. */
  path: string;
  /** The article's own title, without the domain suffix. */
  title: string;
  /** Trail appended to the page <title>, e.g. ["研究前沿", "法学"]. */
  titleTrail?: string[];
  description: string;
  /** Domain id — selects the accent on the share card. */
  domain: string;
}

export function articleOgImagePath({ title, description, domain }: ArticleMetadataInput): string {
  const query = new URLSearchParams({
    title,
    section: domain,
    description: description.slice(0, OG_DESCRIPTION_CHARS),
  });
  return `/api/og?${query.toString()}`;
}

/**
 * One metadata shape for every article: its own title, description, canonical,
 * Open Graph card and Twitter card. Without the explicit og/twitter blocks Next
 * inherits the domain layout's description and the site-wide Twitter defaults.
 */
export function buildArticleMetadata(input: ArticleMetadataInput): Metadata {
  const pageTitle = [input.title, ...(input.titleTrail ?? [])].join(" — ");
  const image = articleOgImagePath(input);
  return {
    title: pageTitle,
    description: input.description,
    alternates: { canonical: input.path },
    openGraph: {
      type: "article",
      url: input.path,
      title: pageTitle,
      description: input.description,
      images: [{ url: image, ...OG_SIZE, alt: input.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: input.description,
      images: [image],
    },
  };
}
