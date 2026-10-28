/** Schematic seat and veto counts. Not a poll and not a chamber forecast. */

export const SEAT_RANGE = { min: 50, max: 300, step: 10 } as const;
export const VETO_RANGE = { min: 1, max: 5, step: 1 } as const;

export type SeatThreshold = {
  seats: number;
  yes: number;
  simpleLine: number;
  twoThirdsLine: number;
  simplePasses: boolean;
  twoThirdsPasses: boolean;
};

export type VetoGate = {
  players: number;
  agreed: number;
  passes: boolean;
};

function clampInt(value: number, min: number, max: number, fallback: number): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, Math.round(value)));
}

function clampSeats(value: number): number {
  const bounded = clampInt(value, SEAT_RANGE.min, SEAT_RANGE.max, 100);
  const stepped = Math.round(bounded / SEAT_RANGE.step) * SEAT_RANGE.step;
  return Math.min(SEAT_RANGE.max, Math.max(SEAT_RANGE.min, stepped));
}

/** Simple line is floor(N/2)+1. Two-thirds line is ceil(2N/3), an integer form of the article's bar. */
export function seatThreshold(seats: number, yes: number): SeatThreshold {
  const n = clampSeats(seats);
  const y = clampInt(yes, 0, n, 0);
  const simpleLine = Math.floor(n / 2) + 1;
  const twoThirdsLine = Math.ceil((2 * n) / 3);
  return {
    seats: n,
    yes: y,
    simpleLine,
    twoThirdsLine,
    simplePasses: y >= simpleLine,
    twoThirdsPasses: y >= twoThirdsLine,
  };
}

/** A bill passes only when every veto player agrees. Agreement is a count, not a probability. */
export function vetoGate(players: number, agreed: number): VetoGate {
  const k = clampInt(players, VETO_RANGE.min, VETO_RANGE.max, VETO_RANGE.min);
  const a = clampInt(agreed, 0, k, 0);
  return { players: k, agreed: a, passes: a === k };
}
