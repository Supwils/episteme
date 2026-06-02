const BINDING_CURVE_RAW: Array<[number, number]> = [
  [1, 0.0],
  [2, 1.112],
  [3, 2.827],
  [4, 7.074],
  [6, 5.332],
  [8, 7.062],
  [9, 6.462],
  [10, 6.475],
  [11, 6.928],
  [12, 7.68],
  [14, 7.476],
  [16, 7.976],
  [20, 8.032],
  [24, 8.261],
  [28, 8.448],
  [32, 8.493],
  [40, 8.551],
  [48, 8.667],
  [56, 8.79],
  [62, 8.795],
  [70, 8.764],
  [80, 8.73],
  [90, 8.71],
  [100, 8.68],
  [120, 8.59],
  [150, 8.49],
  [180, 8.32],
  [200, 8.07],
  [208, 7.867],
  [232, 7.615],
  [238, 7.57],
];

export function buildBindingCurve(): string {
  const data = BINDING_CURVE_RAW as [number, number][];
  const xLeft = -140;
  const xRight = 140;
  const yBase = 80;
  const aMin = 1;
  const aMax = 238;
  const beMax = 9;
  const samples = 80;
  const pts: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const A = aMin + t * (aMax - aMin);
    let be = 0;
    if (A <= data[0]![0]) {
      be = data[0]![1];
    } else if (A >= data[data.length - 1]![0]) {
      be = data[data.length - 1]![1];
    } else {
      let lo = 0;
      for (let j = 0; j < data.length - 1; j++) {
        if (data[j]![0] <= A && data[j + 1]![0] >= A) {
          lo = j;
          break;
        }
      }
      const [a0, be0] = data[lo]!;
      const [a1, be1] = data[lo + 1]!;
      const s = (A - a0) / (a1 - a0);
      const s2 = s * s;
      const s3 = s2 * s;
      const h00 = 2 * s3 - 3 * s2 + 1;
      const h10 = s3 - 2 * s2 + s;
      const h01 = -2 * s3 + 3 * s2;
      const h11 = s3 - s2;
      const tangentScale = 0.5;
      let m0: number, m1: number;
      if (lo === 0) {
        m0 = (be1 - be0) / (a1 - a0);
      } else {
        m0 = (tangentScale * (be1 - data[lo - 1]![1])) / (a1 - data[lo - 1]![0]);
      }
      if (lo === data.length - 2) {
        m1 = (be1 - be0) / (a1 - a0);
      } else {
        m1 = (tangentScale * (data[lo + 2]![1] - be0)) / (data[lo + 2]![0] - a0);
      }
      be = h00 * be0 + h10 * m0 * (a1 - a0) + h01 * be1 + h11 * m1 * (a1 - a0);
    }
    const x = xLeft + (xRight - xLeft) * t;
    const y = yBase - (be / beMax) * 130;
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

const M_Z = 91.1876;
const ALPHA_S_M_Z = 0.1179;

const ALPHA_S_THRESHOLDS = [
  { qMax: 1.5, nf: 3 },
  { qMax: 4.5, nf: 4 },
  { qMax: 160, nf: 5 },
  { qMax: Infinity, nf: 6 },
];

function beta0(nf: number): number {
  return 11 - (2 * nf) / 3;
}

function alphaS(Q: number): number {
  if (Q <= 0) return 1;
  if (Math.abs(Q - M_Z) < 1e-6) return ALPHA_S_M_Z;
  const nf = ALPHA_S_THRESHOLDS.find((t) => Q <= t.qMax)!.nf;
  const b0 = beta0(nf);
  const denom = 1 + ((ALPHA_S_M_Z * b0) / (2 * Math.PI)) * Math.log(Q / M_Z);
  if (denom <= 0) return 1;
  return ALPHA_S_M_Z / denom;
}

export function buildAlphaSCurve(): string {
  const QMin = 0.5;
  const QMax = 200;
  const samples = 80;
  const xLeft = -130;
  const xRight = 130;
  const yBase = 80;
  const pts: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const Q = QMin * Math.exp(t * Math.log(QMax / QMin));
    const alpha = alphaS(Q);
    const x = xLeft + (xRight - xLeft) * t;
    const y = yBase - alpha * 110;
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}
