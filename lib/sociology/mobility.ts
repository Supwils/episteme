/** Schematic cohort. 300 keeps openness 0 and 100 on whole people, not a survey. */
export const MOBILITY_COHORT = 300;

export const MOBILITY_MOTION_MS = 420;

export const MOBILITY_STRATA = [
  { id: 0, label: "下层" },
  { id: 1, label: "中层" },
  { id: 2, label: "上层" },
] as const;

export type StratumId = (typeof MOBILITY_STRATA)[number]["id"];

export type FrameRequest = (callback: (time: number) => void) => number;

export function clampOpenness(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, Math.round(value)));
}

export function stratumLabel(origin: StratumId): string {
  return MOBILITY_STRATA[origin].label;
}

/** Stay = 300 − 2t, each other destination = t. Sum is 300. */
export function destinationCounts(
  origin: StratumId,
  openness: number
): readonly [number, number, number] {
  const t = clampOpenness(openness);
  const stay = MOBILITY_COHORT - 2 * t;
  const other = t;
  if (origin === 0) return [stay, other, other];
  if (origin === 1) return [other, stay, other];
  return [other, other, stay];
}

export function sharePercent(count: number): number {
  return Math.round((count / MOBILITY_COHORT) * 1000) / 10;
}

export function formatSharePercent(count: number): string {
  const percent = sharePercent(count);
  return Number.isInteger(percent) ? `${percent}%` : `${percent.toFixed(1)}%`;
}

export function mobilityReadout(origin: StratumId, openness: number): string {
  const t = clampOpenness(openness);
  const [low, mid, high] = destinationCounts(origin, t);
  const name = stratumLabel(origin);
  return `出身${name}，开放度 ${t}。下层 ${low} 人，中层 ${mid} 人，上层 ${high} 人。示意队列，不是调查。`;
}

export function stepOrigin(origin: StratumId, key: string): StratumId | null {
  if (key === "Home") return 0;
  if (key === "End") return 2;
  if (key === "ArrowRight" || key === "ArrowDown") return ((origin + 1) % 3) as StratumId;
  if (key === "ArrowLeft" || key === "ArrowUp") return ((origin + 2) % 3) as StratumId;
  return null;
}

export function sharesEqual(left: readonly number[], right: readonly number[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

export function mixShares(
  from: readonly number[],
  to: readonly number[],
  progress: number
): number[] {
  const t = Math.min(1, Math.max(0, progress));
  if (t >= 1) return to.slice();
  return from.map((value, index) => Math.round(value + ((to[index] ?? value) - value) * t));
}

export function startShareMotion(
  reducedMotion: boolean,
  from: readonly number[],
  to: readonly number[],
  apply: (shares: readonly number[]) => void,
  requestFrame: FrameRequest,
  cancelFrame: (id: number) => void,
  now: () => number
): () => void {
  if (reducedMotion) {
    apply(to.slice());
    return () => undefined;
  }
  if (sharesEqual(from, to)) {
    apply(to.slice());
    return () => undefined;
  }
  return animateShares(from, to, apply, requestFrame, cancelFrame, now);
}

function animateShares(
  from: readonly number[],
  to: readonly number[],
  apply: (shares: readonly number[]) => void,
  requestFrame: FrameRequest,
  cancelFrame: (id: number) => void,
  now: () => number
): () => void {
  const started = now();
  let frameId = 0;
  let cancelled = false;
  const tick = (time: number) => {
    if (cancelled) return;
    if (time - started >= MOBILITY_MOTION_MS) {
      apply(to.slice());
      return;
    }
    apply(mixShares(from, to, (time - started) / MOBILITY_MOTION_MS));
    frameId = requestFrame(tick);
  };
  frameId = requestFrame(tick);
  return () => {
    cancelled = true;
    cancelFrame(frameId);
  };
}
