export function buildSineD(
  x0: number,
  x1: number,
  period: number,
  amp: number,
  axis: "vertical" | "horizontal",
): string {
  const samples = 80;
  const pts: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const x = x0 + (x1 - x0) * t;
    const phase = ((x / period) * Math.PI) % (Math.PI * 2);
    const v = Math.sin(phase) * amp;
    const y = axis === "vertical" ? -v : v * 0.4;
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}
