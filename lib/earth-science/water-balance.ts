/** Schematic millimetres. Not a gauging station and not a forecast. */
export const WATER_BALANCE_UNIT = "示意毫米，不是某条河的测站";

export const FLUX_MIN = 0;
export const FLUX_MAX = 200;
export const FLUX_STEP = 1;

export const DEFAULT_PRECIPITATION = 100;
export const DEFAULT_EVAPOTRANSPIRATION = 60;
export const DEFAULT_RUNOFF = 30;

export type StorageRegime = "蓄水" | "持平" | "失水";

export type WaterBalance = {
  precipitation: number;
  evapotranspiration: number;
  runoff: number;
  storageChange: number;
  regime: StorageRegime;
};

/** Non-finite input is not a flux, so the ledger uses 0 instead of NaN. */
export function clampFlux(value: number): number {
  if (!Number.isFinite(value)) return FLUX_MIN;
  const stepped = Math.round(value / FLUX_STEP) * FLUX_STEP;
  return Math.min(FLUX_MAX, Math.max(FLUX_MIN, stepped));
}

export function storageRegime(change: number): StorageRegime {
  if (change > 0) return "蓄水";
  if (change < 0) return "失水";
  return "持平";
}

/**
 * ΔS = P − ET − R after each flux is clamped.
 * ΔS is an additive term in P = ET + R + ΔS. It is never a divisor.
 */
export function storageChange(
  precipitation: number,
  evapotranspiration: number,
  runoff: number
): number {
  return clampFlux(precipitation) - clampFlux(evapotranspiration) - clampFlux(runoff);
}

export function waterBalance(
  precipitation: number,
  evapotranspiration: number,
  runoff: number
): WaterBalance {
  const precipitationClamped = clampFlux(precipitation);
  const evapotranspirationClamped = clampFlux(evapotranspiration);
  const runoffClamped = clampFlux(runoff);
  const change = precipitationClamped - evapotranspirationClamped - runoffClamped;
  return {
    precipitation: precipitationClamped,
    evapotranspiration: evapotranspirationClamped,
    runoff: runoffClamped,
    storageChange: change,
    regime: storageRegime(change),
  };
}

export function accountSentence(regime: StorageRegime): string {
  return `这一时段示意账：${regime}`;
}

export function formatStorageChange(change: number): string {
  if (change < 0) return `−${Math.abs(change)}`;
  return String(change);
}

export function fluxValueText(value: number): string {
  return `${clampFlux(value)}。示意毫米，不是预报`;
}
