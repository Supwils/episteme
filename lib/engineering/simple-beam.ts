export type BeamPoint = { x: number; shear: number; moment: number };

export function beamReactions(
  loadKn: number,
  spanM: number,
  positionM: number
): { leftKn: number; rightKn: number } {
  const span = Math.max(spanM, 0.1);
  const position = Math.min(Math.max(positionM, 0), span);
  const rightKn = (loadKn * position) / span;
  const leftKn = loadKn - rightKn;
  return { leftKn, rightKn };
}

export function beamDiagram(
  loadKn: number,
  spanM: number,
  positionM: number,
  samples = 41
): {
  points: BeamPoint[];
  maxMomentKnm: number;
  maxMomentXm: number;
  leftKn: number;
  rightKn: number;
} {
  const { leftKn, rightKn } = beamReactions(loadKn, spanM, positionM);
  const span = Math.max(spanM, 0.1);
  const position = Math.min(Math.max(positionM, 0), span);
  const points: BeamPoint[] = [];
  let maxMomentKnm = 0;
  let maxMomentXm = 0;
  for (let i = 0; i < samples; i++) {
    const x = (span * i) / (samples - 1);
    const shear = x < position - 1e-9 ? leftKn : x > position + 1e-9 ? -rightKn : 0;
    const moment = x <= position ? leftKn * x : rightKn * (span - x);
    if (moment > maxMomentKnm) {
      maxMomentKnm = moment;
      maxMomentXm = x;
    }
    points.push({ x, shear, moment });
  }
  return { points, maxMomentKnm, maxMomentXm, leftKn, rightKn };
}

/** Teaching allowable moment for a small I-section, not a design value. */
export const TEACHING_ALLOWABLE_MOMENT_KNM = 180;
