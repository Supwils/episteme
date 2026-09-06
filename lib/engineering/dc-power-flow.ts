import { solveLinear } from "./linear-solve";

export type BusKind = "slack" | "generator" | "load";

export type TeachingBus = {
  id: number;
  name: string;
  kind: BusKind;
  x: number;
  y: number;
};

export type TeachingLine = {
  id: string;
  from: number;
  to: number;
  /** Per-unit reactance. Larger x = weaker corridor. */
  reactance: number;
  /** Teaching thermal limit in MW. */
  limitMw: number;
};

/** Five-bus toy network. Slack (bus 0) always balances generation and load. */
export const TEACHING_BUSES: readonly TeachingBus[] = [
  { id: 0, name: "平衡节点", kind: "slack", x: 48, y: 118 },
  { id: 1, name: "火电", kind: "generator", x: 48, y: 28 },
  { id: 2, name: "城市负荷", kind: "load", x: 220, y: 28 },
  { id: 3, name: "工业负荷", kind: "load", x: 220, y: 118 },
  { id: 4, name: "风电", kind: "generator", x: 134, y: 168 },
];

export const TEACHING_LINES: readonly TeachingLine[] = [
  { id: "0-1", from: 0, to: 1, reactance: 0.1, limitMw: 90 },
  { id: "0-4", from: 0, to: 4, reactance: 0.12, limitMw: 55 },
  { id: "1-2", from: 1, to: 2, reactance: 0.08, limitMw: 80 },
  { id: "2-3", from: 2, to: 3, reactance: 0.1, limitMw: 50 },
  { id: "4-3", from: 4, to: 3, reactance: 0.14, limitMw: 45 },
  { id: "1-4", from: 1, to: 4, reactance: 0.2, limitMw: 40 },
];

export type PowerFlowInjection = {
  thermalMw: number;
  windMw: number;
  cityMw: number;
  industryMw: number;
};

export type LineFlow = {
  id: string;
  from: number;
  to: number;
  mw: number;
  limitMw: number;
  loading: number;
  overloaded: boolean;
};

export type PowerFlowResult = {
  anglesRad: number[];
  slackMw: number;
  lineFlows: LineFlow[];
  overloadCount: number;
};

function injections(input: PowerFlowInjection): number[] {
  return [0, input.thermalMw, -Math.abs(input.cityMw), -Math.abs(input.industryMw), input.windMw];
}

function susceptanceMatrix(busCount: number): number[][] {
  const matrix = Array.from({ length: busCount }, () => Array.from({ length: busCount }, () => 0));
  for (const line of TEACHING_LINES) {
    const b = 1 / line.reactance;
    matrix[line.from]![line.from]! += b;
    matrix[line.to]![line.to]! += b;
    matrix[line.from]![line.to]! -= b;
    matrix[line.to]![line.from]! -= b;
  }
  return matrix;
}

export function solveDcPowerFlow(input: PowerFlowInjection): PowerFlowResult {
  const busCount = TEACHING_BUSES.length;
  const p = injections(input);
  const slackMw = -p.slice(1).reduce((sum, value) => sum + value, 0);
  p[0] = slackMw;

  const fullB = susceptanceMatrix(busCount);
  const reduced = fullB.slice(1).map((row) => row.slice(1));
  const anglesInterior = solveLinear(reduced, p.slice(1));
  const anglesRad = [0, ...anglesInterior];

  const lineFlows: LineFlow[] = TEACHING_LINES.map((line) => {
    const mw = (anglesRad[line.from]! - anglesRad[line.to]!) / line.reactance;
    const loading = Math.abs(mw) / line.limitMw;
    return {
      id: line.id,
      from: line.from,
      to: line.to,
      mw,
      limitMw: line.limitMw,
      loading,
      overloaded: loading > 1 + 1e-6,
    };
  });

  return {
    anglesRad,
    slackMw,
    lineFlows,
    overloadCount: lineFlows.filter((line) => line.overloaded).length,
  };
}

export function lineStroke(loading: number): string {
  if (loading >= 1) return "#c25b5b";
  if (loading >= 0.75) return "#e08a3c";
  return "#5b9da0";
}
