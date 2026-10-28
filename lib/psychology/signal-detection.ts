/** Equal-variance yes/no illustration. Not a participant's score. */

const NORMAL_TAIL = [
  -7.784894002430293e-3, -0.3223964580411365, -2.400758277161838, -2.549732539343734,
  4.374664141464968, 2.938163982698783,
] as const;

const NORMAL_TAIL_DENOM = [
  7.784695709041462e-3, 0.3224671290700398, 2.445134137142996, 3.754408661907416,
] as const;

const NORMAL_CENTER = [
  -39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716,
  2.506628277459239,
] as const;

const NORMAL_CENTER_DENOM = [
  -54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572,
] as const;

export type DetectionRates = {
  hit: number;
  falseAlarm: number;
  miss: number;
  correctRejection: number;
  separation: number;
  criterion: number;
};

function horner(coefficients: readonly number[], value: number): number {
  return coefficients.reduce((total, coefficient) => total * value + coefficient, 0);
}

/** Abramowitz and Stegun 7.1.26, accurate enough for the teaching bars. */
export function normalCdf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const t = 1 / (1 + (0.3275911 * Math.abs(x)) / Math.SQRT2);
  const polynomial =
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t;
  const erf = sign * (1 - polynomial * Math.exp(-(x * x) / 2));
  return 0.5 * (1 + erf);
}

/** Acklam's inverse of the standard normal cdf. */
export function inverseNormal(probability: number): number {
  const p = Math.min(1 - 1e-12, Math.max(1e-12, probability));
  const plow = 0.02425;
  if (p < plow) {
    const q = Math.sqrt(-2 * Math.log(p));
    return horner(NORMAL_TAIL, q) / (horner(NORMAL_TAIL_DENOM, q) * q + 1);
  }
  if (p > 1 - plow) {
    const q = Math.sqrt(-2 * Math.log(1 - p));
    return -horner(NORMAL_TAIL, q) / (horner(NORMAL_TAIL_DENOM, q) * q + 1);
  }
  const q = p - 0.5;
  const r = q * q;
  return (horner(NORMAL_CENTER, r) * q) / (horner(NORMAL_CENTER_DENOM, r) * r + 1);
}

export function clampSeparation(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(3, Math.max(0, Math.round(value * 10) / 10));
}

export function clampCriterion(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1.5, Math.max(-1.5, Math.round(value * 10) / 10));
}

/**
 * Noise is N(0, 1), signal is N(d', 1). Yes if evidence exceeds c + d'/2,
 * so c is the criterion relative to the midpoint. d' = z(hit) − z(false alarm).
 */
export function detectionRates(separation: number, criterion: number): DetectionRates {
  const d = clampSeparation(separation);
  const c = clampCriterion(criterion);
  const lambda = c + d / 2;
  const hit = 1 - normalCdf(lambda - d);
  const falseAlarm = 1 - normalCdf(lambda);
  return {
    hit,
    falseAlarm,
    miss: 1 - hit,
    correctRejection: 1 - falseAlarm,
    separation: d,
    criterion: c,
  };
}

export function recoveredSeparation(hit: number, falseAlarm: number): number {
  return inverseNormal(hit) - inverseNormal(falseAlarm);
}

export function recoveredCriterion(hit: number, falseAlarm: number): number {
  return -0.5 * (inverseNormal(hit) + inverseNormal(falseAlarm));
}

/** Equal base rates. Accuracy mixes ability and criterion; d' does not. */
export function balancedAccuracy(hit: number, falseAlarm: number): number {
  return 0.5 * hit + 0.5 * (1 - falseAlarm);
}

export function formatPercent(rate: number): string {
  const percent = Math.round(rate * 1000) / 10;
  return Number.isInteger(percent) ? `${percent}%` : `${percent.toFixed(1)}%`;
}

export function formatSigned(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  return Number.isInteger(rounded) ? `${rounded}` : rounded.toFixed(2);
}
