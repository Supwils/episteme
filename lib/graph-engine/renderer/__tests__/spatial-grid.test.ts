import { describe, it, expect } from 'vitest';
import { SpatialGrid } from '../spatial-grid';
import type { RenderNode } from '../types';

function renderNode(id: string, x: number, y: number): RenderNode {
  return {
    id,
    x,
    y,
    label: id,
    domain: 'physics',
    type: 'concept',
    radius: 10,
    color: '#fff',
    hovered: false,
    selected: false,
    searchMatched: false,
    alpha: 1,
  };
}

describe('SpatialGrid', () => {
  it('finds nodes within radius', () => {
    const grid = new SpatialGrid(100);
    const nodes = [
      renderNode('a', 50, 50),
      renderNode('b', 55, 55),
      renderNode('c', 500, 500),
    ];
    grid.build(nodes);

    const results = grid.query(50, 50, 20);

    expect(results.map((n) => n.id).sort()).toEqual(['a', 'b']);
  });

  it('returns empty for query with no nearby nodes', () => {
    const grid = new SpatialGrid(100);
    grid.build([renderNode('a', 50, 50)]);

    const results = grid.query(500, 500, 10);

    expect(results).toEqual([]);
  });

  it('returns empty for empty grid', () => {
    const grid = new SpatialGrid(100);
    grid.build([]);

    const results = grid.query(0, 0, 100);

    expect(results).toEqual([]);
  });

  it('includes nodes exactly on the radius boundary', () => {
    const grid = new SpatialGrid(100);
    grid.build([renderNode('a', 0, 0), renderNode('b', 10, 0)]);

    const results = grid.query(0, 0, 10);

    expect(results.map((n) => n.id).sort()).toEqual(['a', 'b']);
  });

  it('rebuilds when marked dirty', () => {
    const grid = new SpatialGrid(100);
    const nodes = [renderNode('a', 50, 50)];
    grid.build(nodes);

    expect(grid.query(50, 50, 10).length).toBe(1);

    grid.markDirty();
    const newNodes = [renderNode('a', 200, 200)];
    grid.buildIfNeeded(newNodes);

    expect(grid.query(50, 50, 10).length).toBe(0);
    expect(grid.query(200, 200, 10).length).toBe(1);
  });

  it('skips rebuild when not dirty and same nodes', () => {
    const grid = new SpatialGrid(100);
    const nodes = [renderNode('a', 50, 50)];
    grid.build(nodes);

    grid.buildIfNeeded(nodes);

    expect(grid.query(50, 50, 10).length).toBe(1);
  });

  it('handles negative coordinates', () => {
    const grid = new SpatialGrid(100);
    grid.build([renderNode('a', -50, -50), renderNode('b', -55, -55)]);

    const results = grid.query(-50, -50, 20);

    expect(results.map((n) => n.id).sort()).toEqual(['a', 'b']);
  });

  it('handles nodes across multiple cells', () => {
    const grid = new SpatialGrid(50);
    const nodes = [
      renderNode('a', 10, 10),
      renderNode('b', 60, 10),
      renderNode('c', 10, 60),
      renderNode('d', 60, 60),
    ];
    grid.build(nodes);

    const results = grid.query(35, 35, 50);

    expect(results.length).toBe(4);
  });

  it('handles small cell sizes', () => {
    const grid = new SpatialGrid(1);
    const nodes = [
      renderNode('a', 0.5, 0.5),
      renderNode('b', 0.7, 0.7),
      renderNode('c', 100, 100),
    ];
    grid.build(nodes);

    const results = grid.query(0.5, 0.5, 1);

    expect(results.map((n) => n.id).sort()).toEqual(['a', 'b']);
  });
});
