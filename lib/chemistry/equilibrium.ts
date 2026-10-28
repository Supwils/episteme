/** Schematic A ⇌ B. The dial is not a measured constant and not a yield. */

export const QUOTIENT_MIN = 0.1;
export const QUOTIENT_MAX = 10;
export const QUOTIENT_STEP = 0.1;
export const QUOTIENT_DEFAULT = 1;

/** |ln(Q/K)| inside this band is equilibrium, not a direction. */
export const LN_EQUILIBRIUM = 1e-9;

export type EquilibriumDirection = "reactants" | "equilibrium" | "products";

/**
 * NaN has no magnitude, so it sits at the low end.
 * Infinities project onto the dial so the logarithm stays finite.
 */
function boundedQuotient(value: number): number {
  if (!Number.isFinite(value)) return value > 0 ? QUOTIENT_MAX : QUOTIENT_MIN;
  return Math.min(QUOTIENT_MAX, Math.max(QUOTIENT_MIN, value));
}

/** Slider snap. Direction itself keeps the bounded value so the log band is real. */
export function clampQuotient(value: number): number {
  const tenths = Math.round(boundedQuotient(value) * 10);
  return Math.min(QUOTIENT_MAX * 10, Math.max(QUOTIENT_MIN * 10, tenths)) / 10;
}

/** ln(K/Q). Positive means the net change points toward products. */
export function drivingForce(q: number, k: number): number {
  return Math.log(boundedQuotient(k) / boundedQuotient(q));
}

export function direction(q: number, k: number): EquilibriumDirection {
  const force = drivingForce(q, k);
  if (Math.abs(force) < LN_EQUILIBRIUM) return "equilibrium";
  return force > 0 ? "products" : "reactants";
}

export function directionLabel(way: EquilibriumDirection): string {
  if (way === "products") return "净变化朝产物";
  if (way === "reactants") return "净变化朝反应物";
  return "已在平衡";
}
