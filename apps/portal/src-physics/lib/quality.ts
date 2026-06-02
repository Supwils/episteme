export type QualityTier = "high" | "medium" | "low";

/**
 * Detect the initial rendering quality tier based on device capabilities.
 * Returns "medium" on the server where navigator is unavailable.
 */
export function detectInitialQuality(): QualityTier {
  if (typeof navigator === "undefined") return "medium";

  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const mobile = /Android|iPhone|iPad/.test(navigator.userAgent);

  if (mobile || mem < 4 || cores < 4) return "low";
  if (mem < 8 || dpr > 2.5) return "medium";
  return "high";
}
