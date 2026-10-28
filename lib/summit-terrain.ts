import { ridgeHeight } from "@/lib/summit-place";

/** 高度场边长。48² 足够看出五级台阶，又不会把布局文件撑大。 */
export const SUMMIT_GRID = 48;

/** 网格覆盖的半宽（归一化）。比山体半径略大，四角落在平地上。 */
export const SUMMIT_SPAN = 1.12;

export function summitHeightField(): number[] {
  const height: number[] = [];
  for (let iz = 0; iz < SUMMIT_GRID; iz++) {
    const z = summitGridCoord(iz);
    for (let ix = 0; ix < SUMMIT_GRID; ix++) {
      const x = summitGridCoord(ix);
      height.push(ridgeHeight(Math.hypot(x, z)));
    }
  }
  return height;
}

export function summitGridCoord(index: number): number {
  return -SUMMIT_SPAN + (2 * SUMMIT_SPAN * index) / (SUMMIT_GRID - 1);
}

/**
 * 由高度场做出山体网格。三角形绕序不保证朝上，渲染侧用双面，
 * 避免绕序和法线各写一套然后对不上。
 */
export function summitTerrainMesh(
  height: readonly number[],
  scale: number
): { positions: Float32Array; indices: Uint32Array } {
  const count = SUMMIT_GRID * SUMMIT_GRID;
  const positions = new Float32Array(count * 3);
  for (let iz = 0; iz < SUMMIT_GRID; iz++) {
    for (let ix = 0; ix < SUMMIT_GRID; ix++) {
      const sample = height[iz * SUMMIT_GRID + ix] ?? 0;
      const offset = (iz * SUMMIT_GRID + ix) * 3;
      positions[offset] = summitGridCoord(ix);
      positions[offset + 1] = sample / scale;
      positions[offset + 2] = summitGridCoord(iz);
    }
  }
  const triangles: number[] = [];
  for (let iz = 0; iz < SUMMIT_GRID - 1; iz++) {
    for (let ix = 0; ix < SUMMIT_GRID - 1; ix++) {
      const a = iz * SUMMIT_GRID + ix;
      const b = a + 1;
      const c = a + SUMMIT_GRID;
      const d = c + 1;
      if (summitCellOutside(positions, a, b, c, d)) continue;
      triangles.push(a, c, b, b, c, d);
    }
  }
  return { positions, indices: Uint32Array.from(triangles) };
}

function summitCellOutside(
  positions: Float32Array,
  a: number,
  b: number,
  c: number,
  d: number
): boolean {
  return [a, b, c, d].every((index) => {
    const x = positions[index * 3] ?? 0;
    const z = positions[index * 3 + 2] ?? 0;
    return Math.hypot(x, z) > 1.04;
  });
}
