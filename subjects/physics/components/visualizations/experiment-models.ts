/** Idealised models used by the three interactive diagrams. Units are SI unless noted. */
export const GAS_CONSTANT = 8.314462618;
export const HEAT_CAPACITY_RATIO = 1.4;

export interface CarnotParams {
  T_h: number;
  T_c: number;
  V_a: number;
  V_b: number;
  n: number;
}

export function carnotCyclePoints(params: CarnotParams) {
  const { T_h, T_c, V_a, V_b, n } = params;
  // TV^(gamma-1) is constant on each reversible adiabat.
  const expansion = (T_h / T_c) ** (1 / (HEAT_CAPACITY_RATIO - 1));
  const states = [
    { x: V_a, temperature: T_h, label: "A", stage: "等温膨胀起点" },
    { x: V_b, temperature: T_h, label: "B", stage: "等温膨胀终点" },
    { x: V_b * expansion, temperature: T_c, label: "C", stage: "绝热膨胀终点" },
    { x: V_a * expansion, temperature: T_c, label: "D", stage: "等温压缩终点" },
  ];
  return states.map((state) => ({ ...state, y: (n * GAS_CONSTANT * state.temperature) / state.x }));
}

export function isothermalPath(V1: number, V2: number, P1: number, steps: number) {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const v = V1 * (V2 / V1) ** (i / steps);
    return { v, p: (P1 * V1) / v };
  });
}

export function adiabaticPath(V1: number, V2: number, P1: number, steps: number) {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const v = V1 * (V2 / V1) ** (i / steps);
    return { v, p: P1 * (V1 / v) ** HEAT_CAPACITY_RATIO };
  });
}

export function carnotEnergy(params: CarnotParams) {
  const entropyTransfer = params.n * GAS_CONSTANT * Math.log(params.V_b / params.V_a);
  const heatIn = params.T_h * entropyTransfer;
  const heatOut = params.T_c * entropyTransfer;
  return { heatIn, heatOut, work: heatIn - heatOut, efficiency: 1 - params.T_c / params.T_h };
}

export type LensType = "convex" | "concave";

/** Real object at left; positive image distance is to the right. Distances in mm. */
export function computeLensImage(objectDist: number, focalMagnitude: number, type: LensType) {
  const focalLength = type === "convex" ? focalMagnitude : -focalMagnitude;
  if (objectDist === focalLength) {
    return { focalLength, imageDist: null, magnification: null, isVirtual: false };
  }
  const imageDist = (objectDist * focalLength) / (objectDist - focalLength);
  return {
    focalLength,
    imageDist,
    magnification: -imageDist / objectDist,
    isVirtual: imageDist < 0,
  };
}

/** Slopes in screen coordinates (y downwards); the centre ray remains a straight line. */
export function lensRaySlopes(objectDist: number, objectHeight: number, focalLength: number) {
  return { parallel: objectHeight / focalLength, centre: objectHeight / objectDist };
}

export interface CircuitComponent {
  id: string;
  type: "battery" | "resistor";
  value: number;
  label: string;
}

/** All ideal voltage sources aid one another; no wire resistance or initial stored energy. */
export function computeSeriesCircuit(components: readonly CircuitComponent[]) {
  const totalVoltage = components
    .filter((c) => c.type === "battery")
    .reduce((sum, c) => sum + c.value, 0);
  const resistors = components.filter((c) => c.type === "resistor");
  const totalResistance = resistors.reduce((sum, c) => sum + c.value, 0);
  const shortCircuit = totalVoltage > 0 && totalResistance === 0;
  // An ideal nonzero voltage source across a zero-ohm loop has no finite DC solution.
  const current = shortCircuit ? null : totalResistance > 0 ? totalVoltage / totalResistance : 0;
  const totalPower = current === null ? null : totalVoltage * current;
  const voltageDrops = resistors.map((resistor) => ({
    id: resistor.id,
    label: resistor.label,
    voltage: (current ?? 0) * resistor.value,
    percent: totalVoltage > 0 ? (resistor.value / totalResistance) * 100 : 0,
  }));
  return { totalVoltage, totalResistance, current, totalPower, shortCircuit, voltageDrops };
}
