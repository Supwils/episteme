import { fromMeters, type DistanceUnit } from "./coords";

const SUPERSCRIPT_DIGITS: Record<string, string> = {
  "-": "⁻",
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
};

export function toSuperscript(n: number): string {
  return String(Math.trunc(n))
    .split("")
    .map((c) => SUPERSCRIPT_DIGITS[c] ?? c)
    .join("");
}

/**
 * Format a number for UI: localized thousands, fixed precision in the
 * normal range, scientific (Unicode-superscript) for very large or very
 * small values. Returned strings are safe to drop into mono-numeric UI.
 */
export function formatNumber(value: number, precision = 2): string {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  if (abs !== 0 && (abs < 1e-2 || abs >= 1e5)) {
    const exp = Math.floor(Math.log10(abs));
    const mantissa = value / Math.pow(10, exp);
    return `${mantissa.toFixed(precision)} × 10${toSuperscript(exp)}`;
  }
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: precision,
  });
}

export function formatDistance(
  meters: number,
  unit: DistanceUnit,
  opts: { precision?: number } = {},
): string {
  const { precision = 2 } = opts;
  return `${formatNumber(fromMeters(meters, unit), precision)} ${unit}`;
}

/**
 * Compact, mantissa-and-exponent string for tier-scale meter values.
 * Example: 8.8e26 → "8.8 × 10²⁶ m".
 */
export function formatScaleMeters(meters: number): string {
  if (!Number.isFinite(meters) || meters <= 0) return "—";
  const exp = Math.floor(Math.log10(meters));
  const mantissa = meters / Math.pow(10, exp);
  return `${mantissa.toFixed(1)} × 10${toSuperscript(exp)} m`;
}
