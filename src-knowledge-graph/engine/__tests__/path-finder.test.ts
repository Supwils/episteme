import { describe, it, expect } from 'vitest';
import { findShortestPath, getNodesWithinHops, buildAdjacency } from '@/lib/graph-engine';

function makeAdjacency(pairs: [string, string][]): Map<string, string[]> {
  return buildAdjacency(
    pairs.map(([s, t]) => ({ source: s, target: t, type: 'hierarchy' as const })),
  );
}

describe('path-finder', () => {
  describe('findShortestPath', () => {
    it('finds shortest path between connected nodes', () => {
      const adj = makeAdjacency([
        ['a', 'b'],
        ['b', 'c'],
        ['c', 'd'],
        ['a', 'd'],
      ]);

      const path = findShortestPath('a', 'd', adj);

      expect(path).toEqual(['a', 'd']);
    });

    it('finds path through intermediate nodes', () => {
      const adj = makeAdjacency([
        ['a', 'b'],
        ['b', 'c'],
        ['c', 'd'],
      ]);

      const path = findShortestPath('a', 'd', adj);

      expect(path).toEqual(['a', 'b', 'c', 'd']);
    });

    it('returns null for disconnected nodes', () => {
      const adj = makeAdjacency([
        ['a', 'b'],
        ['c', 'd'],
      ]);

      const path = findShortestPath('a', 'c', adj);

      expect(path).toBeNull();
    });

    it('returns single-element array for same start and end', () => {
      const adj = makeAdjacency([['a', 'b']]);

      const path = findShortestPath('a', 'a', adj);

      expect(path).toEqual(['a']);
    });

    it('returns null when start node has no edges', () => {
      const adj = makeAdjacency([['b', 'c']]);

      const path = findShortestPath('a', 'c', adj);

      expect(path).toBeNull();
    });
  });

  describe('getNodesWithinHops', () => {
    it('returns only start node for 0 hops', () => {
      const adj = makeAdjacency([['a', 'b']]);

      const result = getNodesWithinHops('a', 0, adj);

      expect(result).toEqual(new Set(['a']));
    });

    it('returns correct count for 1 hop', () => {
      const adj = makeAdjacency([
        ['a', 'b'],
        ['a', 'c'],
        ['b', 'd'],
      ]);

      const result = getNodesWithinHops('a', 1, adj);

      expect(result).toEqual(new Set(['a', 'b', 'c']));
    });

    it('returns correct count for 2 hops', () => {
      const adj = makeAdjacency([
        ['a', 'b'],
        ['a', 'c'],
        ['b', 'd'],
        ['c', 'e'],
      ]);

      const result = getNodesWithinHops('a', 2, adj);

      expect(result).toEqual(new Set(['a', 'b', 'c', 'd', 'e']));
    });

    it('does not revisit nodes', () => {
      const adj = makeAdjacency([
        ['a', 'b'],
        ['b', 'c'],
        ['c', 'a'],
      ]);

      const result = getNodesWithinHops('a', 5, adj);

      expect(result.size).toBe(3);
    });

    it('handles disconnected start node', () => {
      const adj = makeAdjacency([['b', 'c']]);

      const result = getNodesWithinHops('a', 3, adj);

      expect(result).toEqual(new Set(['a']));
    });
  });

  describe('buildAdjacency', () => {
    it('builds bidirectional adjacency map', () => {
      const edges = [
        { source: 'a', target: 'b', type: 'hierarchy' as const },
        { source: 'b', target: 'c', type: 'hierarchy' as const },
      ];

      const adj = buildAdjacency(edges);

      expect(adj.get('a')).toEqual(['b']);
      expect(adj.get('b')).toEqual(expect.arrayContaining(['a', 'c']));
      expect(adj.get('c')).toEqual(['b']);
    });

    it('handles empty edges', () => {
      const adj = buildAdjacency([]);
      expect(adj.size).toBe(0);
    });
  });
});
