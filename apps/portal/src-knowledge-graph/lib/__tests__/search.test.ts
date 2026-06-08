import { describe, it, expect } from 'vitest';
import { searchNodes, levenshtein } from '@universe/graph-engine';
import type { GraphNode } from '../../data/types';

function node(overrides: Partial<GraphNode> & { id: string }): GraphNode {
  return {
    label: overrides.id,
    domain: 'physics',
    type: 'concept',
    slug: overrides.id,
    tags: [],
    description: '',
    ...overrides,
  };
}

const NODES: GraphNode[] = [
  node({ id: 'newton', label: 'Isaac Newton', tags: ['gravity', 'calculus'], description: 'English physicist and mathematician' }),
  node({ id: 'einstein', label: 'Albert Einstein', tags: ['relativity', 'photoelectric'], description: 'Theoretical physicist, developed the theory of relativity' }),
  node({ id: 'darwin', label: 'Charles Darwin', domain: 'life-science', type: 'scientist', tags: ['evolution', 'natural-selection'], description: 'English naturalist who proposed evolution by natural selection' }),
  node({ id: 'plato', label: 'Plato', domain: 'philosophy', type: 'thinker', tags: ['forms', 'republic'], description: 'Ancient Greek philosopher, student of Socrates' }),
  node({ id: 'quantum', label: 'Quantum Mechanics', tags: ['physics', 'wave-function'], description: 'Fundamental theory in physics describing nature at atomic scales' }),
  node({ id: 'gravity', label: 'Gravity', tags: ['force', 'newton'], description: 'Fundamental force of attraction between masses' }),
  node({ id: 'relativity', label: 'General Relativity', tags: ['einstein', 'spacetime'], description: 'Geometric theory of gravitation published by Einstein in 1915' }),
];

describe('searchNodes', () => {
  it('finds exact match', () => {
    const results = searchNodes('Isaac Newton', NODES);

    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results[0]!.node.id).toBe('newton');
    expect(results[0]!.matchField).toBe('label-exact');
    expect(results[0]!.score).toBe(100);
  });

  it('finds exact match case-insensitive', () => {
    const results = searchNodes('isaac newton', NODES);

    expect(results[0]!.node.id).toBe('newton');
    expect(results[0]!.matchField).toBe('label-exact');
  });

  it('finds substring match', () => {
    const results = searchNodes('Newton', NODES);

    expect(results.length).toBeGreaterThanOrEqual(1);
    const newton = results.find((r) => r.node.id === 'newton');
    expect(newton).toBeDefined();
    expect(newton!.matchField).toBe('label-substring');
  });

  it('returns empty for no match', () => {
    const results = searchNodes('xyznonexistent', NODES);

    expect(results).toEqual([]);
  });

  it('respects maxResults', () => {
    const results = searchNodes('a', NODES, { maxResults: 2 });

    expect(results.length).toBeLessThanOrEqual(2);
  });

  it('matches by tag', () => {
    const results = searchNodes('gravity', NODES);

    const byTag = results.find((r) => r.node.id === 'newton' && r.matchField === 'tag');
    expect(byTag).toBeDefined();
  });

  it('matches by description', () => {
    const results = searchNodes('naturalist', NODES);

    const darwin = results.find((r) => r.node.id === 'darwin');
    expect(darwin).toBeDefined();
    expect(darwin!.matchField).toBe('description');
  });

  it('filters by domain', () => {
    const results = searchNodes('a', NODES, { domains: ['philosophy'] });

    for (const r of results) {
      expect(r.node.domain).toBe('philosophy');
    }
  });

  it('filters by type', () => {
    const results = searchNodes('a', NODES, { types: ['thinker'] });

    for (const r of results) {
      expect(r.node.type).toBe('thinker');
    }
  });

  it('returns empty for blank query', () => {
    expect(searchNodes('', NODES)).toEqual([]);
    expect(searchNodes('   ', NODES)).toEqual([]);
  });

  it('sorts results by score descending', () => {
    const results = searchNodes('einstein', NODES);

    for (let i = 1; i < results.length; i++) {
      expect(results[i]!.score).toBeLessThanOrEqual(results[i - 1]!.score);
    }
  });

  it('fuzzy matches with levenshtein distance <= 2', () => {
    const results = searchNodes('Graviti', NODES);

    const fuzzy = results.find((r) => r.matchField === 'label-fuzzy');
    expect(fuzzy).toBeDefined();
    expect(fuzzy!.node.id).toBe('gravity');
  });
});

describe('levenshtein', () => {
  it('returns 0 for identical strings', () => {
    expect(levenshtein('hello', 'hello')).toBe(0);
    expect(levenshtein('', '')).toBe(0);
  });

  it('returns length of other string when one is empty', () => {
    expect(levenshtein('', 'abc')).toBe(3);
    expect(levenshtein('abc', '')).toBe(3);
  });

  it('returns correct distance for single substitution', () => {
    expect(levenshtein('cat', 'bat')).toBe(1);
  });

  it('returns correct distance for single insertion', () => {
    expect(levenshtein('cat', 'cats')).toBe(1);
  });

  it('returns correct distance for single deletion', () => {
    expect(levenshtein('cats', 'cat')).toBe(1);
  });

  it('returns correct distance for multiple edits', () => {
    expect(levenshtein('kitten', 'sitting')).toBe(3);
    expect(levenshtein('saturday', 'sunday')).toBe(3);
  });

  it('returns max distance for completely different strings', () => {
    expect(levenshtein('abc', 'xyz')).toBe(3);
  });
});
