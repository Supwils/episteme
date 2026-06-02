/**
 * Distance unit conversions. Source values from IAU 2015 / NIST.
 *
 * Each tier should render in its own local unit (see docs/design/05). These
 * helpers are for crossing tiers, computing data card values, and tests.
 */

export type DistanceUnit = "m" | "km" | "AU" | "ly" | "pc" | "kpc" | "Mpc" | "Gpc";

export const METERS_PER_KM = 1e3;
export const METERS_PER_AU = 1.495978707e11;
export const METERS_PER_LY = 9.4607304725808e15;
export const METERS_PER_PC = 3.0856775814913673e16;
export const METERS_PER_KPC = 1e3 * METERS_PER_PC;
export const METERS_PER_MPC = 1e6 * METERS_PER_PC;
export const METERS_PER_GPC = 1e9 * METERS_PER_PC;

const TO_METERS: Record<DistanceUnit, number> = {
  m: 1,
  km: METERS_PER_KM,
  AU: METERS_PER_AU,
  ly: METERS_PER_LY,
  pc: METERS_PER_PC,
  kpc: METERS_PER_KPC,
  Mpc: METERS_PER_MPC,
  Gpc: METERS_PER_GPC,
};

export function toMeters(value: number, unit: DistanceUnit): number {
  return value * TO_METERS[unit];
}

export function fromMeters(meters: number, unit: DistanceUnit): number {
  return meters / TO_METERS[unit];
}

export function convertDistance(value: number, from: DistanceUnit, to: DistanceUnit): number {
  return (value * TO_METERS[from]) / TO_METERS[to];
}
