export const RUTHERFORD = {
  energyMeV: 5,
  nuclearCharge: 79,
  alphaCharge: 2,
  coulombMeVFm: 1.43996455,
  widthFm: 6000,
} as const;

export const coulombLengthFm =
  (RUTHERFORD.coulombMeVFm * RUTHERFORD.nuclearCharge * RUTHERFORD.alphaCharge) /
  (2 * RUTHERFORD.energyMeV);

export function scatteringAngle(impactFm: number): number {
  return 2 * Math.atan2(coulombLengthFm, Math.abs(impactFm));
}

export function scatteringClass(impactFm: number): "passed" | "scattered" | "reflected" {
  const angle = scatteringAngle(impactFm);
  if (angle > Math.PI / 2) return "reflected";
  return angle >= (5 * Math.PI) / 180 ? "scattered" : "passed";
}

/** Repulsive Coulomb hyperbola; velocities are in units of the incident speed. */
export function coulombState(impactFm: number, anomaly: number) {
  const a = coulombLengthFm;
  const b = Math.abs(impactFm);
  const sign = impactFm < 0 ? -1 : 1;
  const eccentricity = Math.hypot(1, b / a);
  const periapsis = Math.PI / 2 + scatteringAngle(b) / 2;
  const c = Math.cos(periapsis);
  const s = Math.sin(periapsis);
  const along = a * (eccentricity + Math.cosh(anomaly));
  const across = b * Math.sinh(anomaly);
  const clock = a * (eccentricity * Math.cosh(anomaly) + 1);
  return {
    x: along * c - across * s,
    y: sign * (along * s + across * c),
    vx: -(a * Math.sinh(anomaly) * c - b * Math.cosh(anomaly) * s) / clock,
    vy: (-sign * (a * Math.sinh(anomaly) * s + b * Math.cosh(anomaly) * c)) / clock,
    time: a * (eccentricity * Math.sinh(anomaly) + anomaly),
  };
}

export type ScatteringPoint = { x: number; y: number; time: number };
export type ScatteringPath = { points: ScatteringPoint[]; duration: number };

export function rutherfordPath(impactFm: number, aspect: number): ScatteringPath {
  const limit = Math.asinh((2 * RUTHERFORD.widthFm) / Math.hypot(coulombLengthFm, impactFm));
  const points: ScatteringPoint[] = [];
  let initialClock = 0;
  for (let i = 0; i <= 480; i++) {
    const state = coulombState(impactFm, limit * (1 - (2 * i) / 480));
    const x = 0.59 + state.x / RUTHERFORD.widthFm;
    const y = 0.5 + (state.y / RUTHERFORD.widthFm) * aspect;
    const inside = x >= 0.06 && x <= 1.02 && y >= -0.02 && y <= 1.02;
    if (!inside) {
      if (points.length) break;
      continue;
    }
    if (!points.length) initialClock = state.time;
    // The display clock is deliberately rescaled, not a flight-time measurement.
    points.push({ x, y, time: (initialClock - state.time) / (RUTHERFORD.widthFm * 0.4) });
  }
  return { points, duration: points.at(-1)?.time ?? 0 };
}

export const TORSION = {
  gravitationalConstant: 6.6743e-11,
  smallMassKg: 0.02,
  largeMassKg: 1.5,
  armM: 0.1,
  separationM: 0.05,
  stiffness: 1.1e-6,
  visualGain: 1000,
  timeGain: 20,
  approachSeconds: 3,
  endSeconds: 18,
} as const;

export function torsionResponse(displaySeconds: number) {
  const inertia = 2 * TORSION.smallMassKg * TORSION.armM ** 2;
  const torque =
    (2 * TORSION.armM * TORSION.gravitationalConstant * TORSION.smallMassKg * TORSION.largeMassKg) /
    TORSION.separationM ** 2;
  const equilibrium = torque / TORSION.stiffness;
  const omega = Math.sqrt(TORSION.stiffness / inertia);
  const physicalTime = Math.max(0, displaySeconds - TORSION.approachSeconds) * TORSION.timeGain;
  const scaledTime = omega * physicalTime;
  const angle = equilibrium * (1 - (1 + scaledTime) * Math.exp(-scaledTime));
  return { angle, equilibrium, torque, inertia, omega, physicalTime };
}
