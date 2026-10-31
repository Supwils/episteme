/** Illustrative phases only: integrate frequency so the joins preserve phase. */
export function buildChirp(x0: number, x1: number, yMid: number): string {
  const samples = 160;
  const inspiralEnd = 0.78;
  const mergerDuration = 0.08;
  const ringdownStart = inspiralEnd + mergerDuration;
  const inspiralCycles = 5.25 * inspiralEnd;
  const mergerCycles = inspiralCycles + 14 * mergerDuration;
  const points: string[] = [];

  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    let cycles: number;
    let amplitude: number;
    if (t < inspiralEnd) {
      const progress = t / inspiralEnd;
      cycles = 3 * t + (9 * t ** 4) / (4 * inspiralEnd ** 3);
      amplitude = 4 + 24 * progress ** 2;
    } else if (t < ringdownStart) {
      const elapsed = t - inspiralEnd;
      cycles = inspiralCycles + 12 * elapsed + (2 * elapsed ** 2) / mergerDuration;
      amplitude = 28 + (4 * elapsed) / mergerDuration;
    } else {
      const elapsed = t - ringdownStart;
      cycles = mergerCycles + 16 * elapsed;
      amplitude = 32 * Math.exp(-elapsed / 0.06);
    }
    const x = x0 + (x1 - x0) * t;
    const y = yMid + Math.sin(2 * Math.PI * cycles) * amplitude;
    points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return points.join(" ");
}
