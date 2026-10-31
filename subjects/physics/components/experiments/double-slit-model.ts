export type SlitMode = "wave" | "observe";

/** Relative Fraunhofer intensity for identical, equally illuminated slits.
 * u is a dimensionless screen coordinate; each mode is normalized when sampled.
 */
export function screenDensity(u: number, mode: SlitMode): number {
  const beta = 0.9 * Math.PI * u;
  const envelope = beta === 0 ? 1 : (Math.sin(beta) / beta) ** 2;
  return mode === "wave" ? envelope * Math.cos(4 * Math.PI * u) ** 2 : envelope;
}

/** Sample the displayed window, conditional on detection there. */
export function sampleScreenPosition(mode: SlitMode, random = Math.random): number {
  for (;;) {
    const u = 2 * random() - 1;
    if (random() < screenDensity(u, mode)) return u;
  }
}
