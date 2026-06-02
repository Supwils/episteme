/**
 * Tiny deterministic 3D pseudo-noise. Not real simplex/Perlin, just a
 * sum of trig terms — enough to give star clouds and filaments visible
 * structure without adding a dependency. Output is in [-1, 1].
 */
export function trigNoise3D(x: number, y: number, z: number): number {
  return (
    Math.sin(x * 1.7 + 0.3) * Math.cos(y * 1.9 - 1.2) * Math.sin(z * 2.1 + 0.7) +
    0.6 * Math.sin(x * 3.7 + 2.0) * Math.cos(y * 4.1 + 0.4) +
    0.45 * Math.sin(z * 5.3 - 1.7) * Math.cos(x * 4.9 + y * 0.5)
  );
}

/**
 * Fractal Brownian motion of trigNoise3D — `octaves` layers with each
 * octave doubling frequency and halving amplitude. Output normalized to
 * approximately [-1, 1]. Good for clumpy "cosmic web" / temperature
 * anisotropy fields where pure trigNoise3D reads as too repetitive.
 */
export function fbm3D(
  x: number,
  y: number,
  z: number,
  octaves = 4,
  lacunarity = 2.05,
  gain = 0.5,
): number {
  let sum = 0;
  let amp = 1;
  let freq = 1;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += amp * trigNoise3D(x * freq, y * freq, z * freq);
    norm += amp;
    amp *= gain;
    freq *= lacunarity;
  }
  return sum / Math.max(norm, 1e-6);
}

/**
 * 32-bit hash → pseudo-random number in [0, 1). Deterministic, useful
 * for stable jitter in procedural geometry seeded by integer ids.
 */
export function hash01(seed: number): number {
  let x = (seed | 0) ^ 0x9e3779b9;
  x = Math.imul(x ^ (x >>> 16), 0x85ebca6b);
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35);
  x ^= x >>> 16;
  return (x >>> 0) / 0xffffffff;
}

/** Smoothstep on [edge0, edge1]; returns 0..1 with C1 continuity. */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/** Mix two RGB triplets in [0,1] by `t`. */
export function mixRgb(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}
