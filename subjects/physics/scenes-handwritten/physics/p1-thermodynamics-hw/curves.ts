export function buildMBCurve(mostProbableSpeed: number): string {
  const points: string[] = [];
  const maximumSpeed = 220;
  for (let i = 0; i <= 80; i++) {
    const speed = (i / 80) * maximumSpeed;
    const density =
      (4 * speed ** 2 * Math.exp(-((speed / mostProbableSpeed) ** 2))) /
      (Math.sqrt(Math.PI) * mostProbableSpeed ** 3);
    const x = -130 + (260 * speed) / maximumSpeed;
    const y = 80 - 6500 * density;
    points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return points.join(" ");
}

function pressurePath(from: number, to: number, pressure: (volume: number) => number) {
  const points: string[] = [];
  for (let i = 0; i <= 32; i++) {
    const volume = from + ((to - from) * i) / 32;
    const x = -130 + ((volume - 0.6) / 2.4) * 260;
    const y = 90 - 130 * pressure(volume);
    points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return points.join(" ");
}

export function buildCarnotPaths() {
  const gamma = 1.4;
  const v1 = 0.8;
  const v2 = 1.5;
  const v3 = 2.7;
  const v4 = (v1 * v3) / v2;
  const hotTemperature = 1;
  const coldTemperature = hotTemperature * (v2 / v3) ** (gamma - 1);
  return {
    hot: pressurePath(v1, v2, (v) => hotTemperature / v),
    expansion: pressurePath(v2, v3, (v) => (hotTemperature * v2 ** (gamma - 1)) / v ** gamma),
    cold: pressurePath(v3, v4, (v) => coldTemperature / v),
    compression: pressurePath(v4, v1, (v) => (hotTemperature * v1 ** (gamma - 1)) / v ** gamma),
  };
}
