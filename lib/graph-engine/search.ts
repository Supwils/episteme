import type { GraphNode } from './graph-types';

export type SearchResult = {
  node: GraphNode;
  score: number;
  matchField: 'label-exact' | 'label-substring' | 'tag' | 'description' | 'label-fuzzy';
};

export function levenshtein(a: string, b: string): number {
  const la = a.length;
  const lb = b.length;
  if (la === 0) return lb;
  if (lb === 0) return la;

  const dp: number[] = Array.from({ length: lb + 1 }, (_, i) => i);

  for (let i = 1; i <= la; i++) {
    let prev = dp[0]!;
    dp[0] = i;
    for (let j = 1; j <= lb; j++) {
      const temp = dp[j]!;
      if (a[i - 1] === b[j - 1]) {
        dp[j] = prev;
      } else {
        dp[j] = 1 + Math.min(prev, dp[j]!, dp[j - 1]!);
      }
      prev = temp;
    }
  }
  return dp[lb]!;
}

function normalizeText(s: string): string {
  return s.toLowerCase().trim();
}

function containsChinese(s: string): boolean {
  return /[\u4e00-\u9fff]/.test(s);
}

function chineseMatch(query: string, text: string): boolean {
  if (!containsChinese(query)) return false;
  return text.includes(query);
}

export function searchNodes(
  query: string,
  nodes: GraphNode[],
  options?: {
    maxResults?: number;
    domains?: string[];
    types?: string[];
  },
): SearchResult[] {
  const raw = query.trim();
  if (!raw) return [];

  const maxResults = options?.maxResults ?? 10;
  const domainFilter = options?.domains;
  const typeFilter = options?.types;

  const q = normalizeText(raw);
  const results: SearchResult[] = [];

  for (const node of nodes) {
    if (domainFilter && !domainFilter.includes(node.domain)) continue;
    if (typeFilter && !typeFilter.includes(node.type)) continue;

    const labelNorm = normalizeText(node.label);
    const descNorm = normalizeText(node.description);

    if (labelNorm === q) {
      results.push({ node, score: 100, matchField: 'label-exact' });
      continue;
    }

    if (chineseMatch(raw, node.label)) {
      results.push({ node, score: 95, matchField: 'label-exact' });
      continue;
    }

    if (labelNorm.includes(q)) {
      const positionBonus = labelNorm.startsWith(q) ? 10 : 0;
      const lengthRatio = q.length / labelNorm.length;
      results.push({
        node,
        score: 70 + positionBonus + lengthRatio * 10,
        matchField: 'label-substring',
      });
      continue;
    }

    const tagMatch = node.tags.some((t) => normalizeText(t).includes(q));
    if (tagMatch) {
      results.push({ node, score: 50, matchField: 'tag' });
      continue;
    }

    if (descNorm.includes(q)) {
      results.push({ node, score: 30, matchField: 'description' });
      continue;
    }

    if (chineseMatch(raw, node.description)) {
      results.push({ node, score: 28, matchField: 'description' });
      continue;
    }

    const dist = levenshtein(q, labelNorm);
    if (dist <= 2 && q.length >= 3) {
      results.push({ node, score: 10 - dist * 3, matchField: 'label-fuzzy' });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, maxResults);
}
