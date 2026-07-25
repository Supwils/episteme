import { getBacklinks, type Backlink } from "./backlinks-index";
import { DOMAIN_LABELS } from "./cross-domain-refs/types";
import { getDomainConfig } from "./new-domains";

export type { Backlink };

export type CrossDomainGroup = {
  domain: string;
  label: string;
  links: Backlink[];
};

export type GroupedBacklinks = {
  /** Inbound links from the same knowledge domain. */
  sameDomain: Backlink[];
  /** Inbound links from other domains, bucketed and ordered densest-first. */
  crossDomain: CrossDomainGroup[];
  total: number;
};

/**
 * Article urls reach us from several places — a route's own `${domain}/${section}/${slug}`
 * template, a pathname, a link href — and the generated index is keyed by the
 * plain decoded path. Normalising here is what lets CJK-slugged articles
 * (cosmology / universe-physics / life-science / human-history knowledge bases,
 * 225 of them) resolve at all.
 */
export function normalizeArticleUrl(url: string): string {
  const path = url.split(/[?#]/)[0] ?? "";
  let decoded = path;
  try {
    decoded = decodeURIComponent(path);
  } catch {
    // A malformed escape ("100%") is not worth a 500 — keep the raw path.
  }
  return decoded.length > 1 && decoded.endsWith("/") ? decoded.slice(0, -1) : decoded;
}

export function domainOf(url: string): string {
  return url.split("/")[1] ?? "";
}

export function domainLabelOf(domain: string): string {
  return (
    DOMAIN_LABELS[domain as keyof typeof DOMAIN_LABELS] ?? getDomainConfig(domain)?.label ?? domain
  );
}

/**
 * Splits an article's inbound wiki-links into "from this domain" and "from
 * elsewhere". The cross-domain half is the platform's differentiator — 319 of
 * the 2740 inbound links cross a domain boundary — and it stayed invisible
 * while every backlink rendered as one undifferentiated pill list.
 */
export function groupBacklinks(url: string): GroupedBacklinks {
  const self = normalizeArticleUrl(url);
  const links = getBacklinks(self);
  if (links.length === 0) return { sameDomain: [], crossDomain: [], total: 0 };

  const home = domainOf(self);
  const sameDomain: Backlink[] = [];
  const buckets = new Map<string, Backlink[]>();

  for (const link of links) {
    if (normalizeArticleUrl(link.url) === self) continue;
    const domain = domainOf(link.url);
    if (domain === home) {
      sameDomain.push(link);
      continue;
    }
    const bucket = buckets.get(domain);
    if (bucket) bucket.push(link);
    else buckets.set(domain, [link]);
  }

  const crossDomain = [...buckets.entries()]
    .map(([domain, groupLinks]) => ({ domain, label: domainLabelOf(domain), links: groupLinks }))
    .sort((a, b) => b.links.length - a.links.length || a.domain.localeCompare(b.domain));

  return {
    sameDomain,
    crossDomain,
    total: sameDomain.length + crossDomain.reduce((n, d) => n + d.links.length, 0),
  };
}
