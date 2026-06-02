export function buildChirp(x0: number, x1: number, yMid: number): string {
  const samples = 120;
  const pts: string[] = [];
  const tc = 0.85;
  const fQNM = 3.2;
  const dampingQNM = 0.08;
  const mergerAmp = 1.0;
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const x = x0 + (x1 - x0) * t;
    let y: number;
    if (t < tc) {
      const tau = tc - t;
      const tauSafe = Math.max(tau, 0.001);
      const freq = 0.05 + 0.6 * Math.pow(tauSafe, -0.375);
      const amp = (3 + 25 * Math.pow(tauSafe, -0.25)) * 0.5;
      y = yMid + Math.sin(x * freq * Math.PI) * amp;
    } else if (t < tc + 0.04) {
      const s = (t - tc) / 0.04;
      const freq = 1.6 + s * (fQNM - 1.6) * s;
      const amp = (3 + 25) * 0.5 * (1 - s * 0.3) * mergerAmp;
      y = yMid + Math.sin(x * freq * Math.PI) * amp;
    } else {
      const tau = t - tc - 0.04;
      const freq = fQNM;
      const amp = (3 + 25) * 0.5 * mergerAmp * 0.7 * Math.exp(-tau * dampingQNM * 60);
      y = yMid + Math.sin(x * freq * Math.PI) * amp;
    }
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}
