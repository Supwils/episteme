export function buildGroundState(x0: number, x1: number, baseline: number): string {
  return Array.from({ length: 81 }, (_, i) => {
    const t = i / 80;
    const x = x0 + (x1 - x0) * t;
    const y = baseline - 24 * Math.sin(Math.PI * t);
    return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(" ");
}

export function buildGaussian(sigma: number): string {
  return Array.from({ length: 121 }, (_, i) => {
    const x = -120 + 2 * i;
    const y = 35 - 50 * Math.exp(-(x * x) / (2 * sigma * sigma));
    return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(" ");
}
