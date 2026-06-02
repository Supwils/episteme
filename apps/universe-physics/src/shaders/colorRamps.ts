/**
 * Spectral-type color palette and helpers for star-point shaders.
 *
 * The Harvard sequence O/B/A/F/G/K/M maps to a temperature index 0..1.
 * These linear-space constants are intended for emissive shader use
 * (not sRGB hex — three.js handles the conversion in the linear pipeline).
 */

/** O/B — hot blue stars. */
export const SPECTRAL_COOL: [number, number, number] = [0.65, 0.78, 1.0];
/** G — solar-type neutral white. */
export const SPECTRAL_MID: [number, number, number] = [1.0, 0.96, 0.85];
/** M — cool red/orange dwarfs. */
export const SPECTRAL_WARM: [number, number, number] = [1.0, 0.54, 0.35];

/**
 * Map a spectral type character to a temperature index [0, 1].
 * O=0 (hottest) → M=1 (coolest). White dwarfs (D) sit near 0.3.
 */
export function spectralToTemp(spec: string): number {
  const map: Record<string, number> = {
    O: 0.0,
    B: 0.1,
    A: 0.2,
    D: 0.3,
    F: 0.4,
    G: 0.5,
    K: 0.7,
    M: 1.0,
    GIANT: 0.75,
  };
  return map[spec] ?? 0.5;
}
