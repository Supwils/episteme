import {
  getCrossReferences,
  resolveReference,
  type Domain,
  type CrossReference,
} from "./cross-domain-refs";

export interface LinkSuggestion {
  domain: Domain;
  id: string;
  title: string;
  route: string;
  relation: string;
  score: number;
  source: "cross-ref" | "tag-match" | "field-match";
}

function jaccardSimilarity(a: string[], b: string[]): number {
  if (a.length === 0 || b.length === 0) return 0;
  const setA = new Set(a.map((s) => s.toLowerCase()));
  const setB = new Set(b.map((s) => s.toLowerCase()));
  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

export function getLinkSuggestions(opts: {
  domain: Domain;
  id: string;
  tags?: string[];
  fields?: string[];
  related?: string[];
  limit?: number;
}): LinkSuggestion[] {
  const { domain, id, tags = [], fields = [], related = [], limit = 5 } = opts;
  const suggestions: LinkSuggestion[] = [];
  const seen = new Set<string>();

  const crossRefs = getCrossReferences(domain, id);
  for (const ref of crossRefs) {
    const resolved = resolveReference(ref, domain);
    const key = `${resolved.targetDomain}:${resolved.targetId}`;
    if (seen.has(key)) continue;
    seen.add(key);
    suggestions.push({
      domain: resolved.targetDomain,
      id: resolved.targetId,
      title: resolved.targetTitle,
      route: resolved.targetRoute,
      relation: resolved.relation,
      score: 1.0,
      source: "cross-ref",
    });
  }

  for (const ref of crossRefs) {
    const resolved = resolveReference(ref, domain);
    if (tags.length > 0) {
      const tagBoost = jaccardSimilarity(tags, [resolved.targetTitle]);
      if (tagBoost > 0) {
        const key = `${resolved.targetDomain}:${resolved.targetId}`;
        const existing = suggestions.find(
          (s) => `${s.domain}:${s.id}` === key
        );
        if (existing) {
          existing.score = Math.min(1, existing.score + tagBoost * 0.3);
        }
      }
    }
  }

  if (related.length > 0) {
    for (const relTitle of related) {
      const key = `related:${relTitle}`;
      if (seen.has(key)) continue;
      seen.add(key);
    }
  }

  suggestions.sort((a, b) => b.score - a.score);
  return suggestions.slice(0, limit);
}

export function buildLinkContext(opts: {
  domain: Domain;
  id: string;
  title: string;
  tags?: string[];
  fields?: string[];
}): {
  outgoing: LinkSuggestion[];
  incoming: LinkSuggestion[];
  totalConnections: number;
} {
  const { domain, id, tags = [], fields = [] } = opts;
  const crossRefs = getCrossReferences(domain, id);

  const outgoing: LinkSuggestion[] = [];
  const incoming: LinkSuggestion[] = [];
  const seen = new Set<string>();

  for (const ref of crossRefs) {
    const resolved = resolveReference(ref, domain);
    const key = `${resolved.targetDomain}:${resolved.targetId}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const suggestion: LinkSuggestion = {
      domain: resolved.targetDomain,
      id: resolved.targetId,
      title: resolved.targetTitle,
      route: resolved.targetRoute,
      relation: resolved.relation,
      score: 1.0,
      source: "cross-ref",
    };

    if (resolved.direction === "outgoing") {
      outgoing.push(suggestion);
    } else {
      incoming.push(suggestion);
    }
  }

  return {
    outgoing,
    incoming,
    totalConnections: outgoing.length + incoming.length,
  };
}
