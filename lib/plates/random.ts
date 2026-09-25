/**
 * Seeded randomness shared by the seals and specimen plates. Everything drawn
 * from a seed is identical on the server and in the browser, so generated SVG
 * never causes a hydration mismatch.
 */

/** FNV-1a string hash → 32-bit unsigned seed. */
export function hashSeed(text: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash;
}

/** mulberry32: small, fast, well-distributed; returns floats in [0, 1). */
export function seededRandom(seed: string | number): () => number {
  let state = typeof seed === "number" ? seed >>> 0 : hashSeed(seed);
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Uniform float in [min, max). */
export function between(random: () => number, min: number, max: number): number {
  return min + (max - min) * random();
}
