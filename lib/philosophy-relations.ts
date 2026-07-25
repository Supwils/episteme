import {
  findBySlug,
  getBackReferences,
  getRelatedItems,
  type ContentItem,
} from "./cross-references";

/**
 * `cross-references` indexes `content/philosophy` alone, but <RelatedContent>
 * renders on mathematics, life-science and every engine-driven domain too. Slug
 * lookups there are only meaningful for philosophy — for any other domain a
 * matching slug would be a coincidence, and would quietly attach philosophy's
 * relations to an unrelated article. Scoping the lookup here keeps that
 * impossible instead of merely improbable.
 */
export function philosophyRelations(
  slug: string,
  domain: string | undefined
): { related: ContentItem[]; backRefs: ContentItem[] } {
  if (domain && domain !== "philosophy") return { related: [], backRefs: [] };
  const item = findBySlug(slug);
  if (!item) return { related: [], backRefs: [] };
  return { related: getRelatedItems(item), backRefs: getBackReferences(slug) };
}
