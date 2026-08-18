/**
 * Shared helpers for the per-domain link-preview shards
 * (`public/link-previews/<domain>.json`, produced by gen-wiki-links-index).
 * The generator groups preview entries into shards; the client picks the
 * shard for a hovered wiki link. Both sides agree on one fact: an article
 * URL's first path segment always equals its domain (enforced by
 * collectArticles), which is what makes the split reliable — including for
 * multi-domain slugs, since `resolveWikiLink` has already picked one URL.
 */
export type LinkPreview = { t: string; e: string; d: string };

/** Domain whose shard contains the preview for `href`, or null for non-article URLs. */
export function shardDomainForHref(href: string): string | null {
  return /^\/([a-z0-9-]+)\//.exec(href)?.[1] ?? null;
}

/** Group a flat URL → preview map into one map per domain, keyed for shard files. */
export function groupPreviewsByDomain(
  previews: Record<string, LinkPreview>
): Map<string, Record<string, LinkPreview>> {
  const byDomain = new Map<string, Record<string, LinkPreview>>();
  for (const [url, preview] of Object.entries(previews)) {
    const shard = byDomain.get(preview.d) ?? {};
    shard[url] = preview;
    byDomain.set(preview.d, shard);
  }
  return byDomain;
}
