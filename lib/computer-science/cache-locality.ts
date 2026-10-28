// Four lines tile addresses 0..15 exactly, so the direct-mapped slot is the
// line index itself. A larger address space would be required before two
// blocks could collide; this schematic can only cold-miss.

export const WORD_COUNT = 16;
export const LINE_WORDS = 4;
export const LINE_COUNT = WORD_COUNT / LINE_WORDS;
export const CACHE_STRIDES = [1, 2, 4, 8] as const;

export type CacheStride = (typeof CACHE_STRIDES)[number];

export type CacheStep = {
  address: number;
  line: number;
  hit: boolean;
};

export type CacheStrideResult = {
  accesses: number;
  hits: number;
  misses: number;
  stride: CacheStride;
  steps: readonly CacheStep[];
};

const ALLOWED_STRIDES = new Set<number>(CACHE_STRIDES);

export function clampStride(stride: number): CacheStride {
  return ALLOWED_STRIDES.has(stride) ? (stride as CacheStride) : 1;
}

export function lineOf(address: number): number {
  return Math.floor(address / LINE_WORDS);
}

export function simulateCacheStride(stride: number): CacheStrideResult {
  const step = clampStride(stride);
  const loaded = new Set<number>();
  const steps: CacheStep[] = [];
  let hits = 0;
  let misses = 0;

  for (let index = 0; index < WORD_COUNT; index += 1) {
    const address = index * step;
    if (address >= WORD_COUNT) break;
    const line = lineOf(address);
    const hit = loaded.has(line);
    if (hit) hits += 1;
    else {
      misses += 1;
      loaded.add(line);
    }
    steps.push({ address, line, hit });
  }

  return { accesses: steps.length, hits, misses, stride: step, steps };
}
