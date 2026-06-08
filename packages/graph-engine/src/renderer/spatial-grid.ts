import type { RenderNode } from "./types";

export class SpatialGrid {
  private cellSize: number;
  private grid = new Map<string, RenderNode[]>();
  private nodeIds: string[] = [];
  private dirty = true;

  constructor(cellSize: number) {
    this.cellSize = cellSize;
  }

  markDirty(): void {
    this.dirty = true;
  }

  buildIfNeeded(nodes: RenderNode[]): void {
    if (!this.dirty && this.nodeIds.length === nodes.length) {
      let same = true;
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i]!.id !== this.nodeIds[i]) {
          same = false;
          break;
        }
      }
      if (same) return;
    }
    this.build(nodes);
  }

  build(nodes: RenderNode[]): void {
    this.grid.clear();
    this.nodeIds = new Array(nodes.length);
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]!;
      this.nodeIds[i] = node.id;
      const key = this.key(node.x, node.y);
      let cell = this.grid.get(key);
      if (!cell) {
        cell = [];
        this.grid.set(key, cell);
      }
      cell.push(node);
    }
    this.dirty = false;
  }

  query(x: number, y: number, radius: number): RenderNode[] {
    const results: RenderNode[] = [];
    const cs = this.cellSize;
    const minCX = Math.floor((x - radius) / cs);
    const maxCX = Math.floor((x + radius) / cs);
    const minCY = Math.floor((y - radius) / cs);
    const maxCY = Math.floor((y + radius) / cs);
    const r2 = radius * radius;

    for (let cx = minCX; cx <= maxCX; cx++) {
      for (let cy = minCY; cy <= maxCY; cy++) {
        const cell = this.grid.get(`${cx},${cy}`);
        if (!cell) continue;
        for (let i = 0; i < cell.length; i++) {
          const node = cell[i]!;
          const dx = node.x - x;
          const dy = node.y - y;
          if (dx * dx + dy * dy <= r2) {
            results.push(node);
          }
        }
      }
    }
    return results;
  }

  private key(x: number, y: number): string {
    return `${Math.floor(x / this.cellSize)},${Math.floor(y / this.cellSize)}`;
  }
}
