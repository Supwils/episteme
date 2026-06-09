import { useMemo } from "react";
import { hash01 } from "@/src-physics/lib/handwritten-coords";

type StarSpeckProps = {
  seed: number;
  count: number;
  bounds: { x: number; y: number; w: number; h: number };
  hue?: string;
  maxRadius?: number;
  /** If set, masks specks inside this radius from origin (keeps centre clear). */
  excludeInnerRadius?: number;
};

/**
 * Deterministic scatter of tiny dots. Useful for background star fields,
 * paper grain accents and void texture. Renders as a single <g> so it
 * stays cheap on the DOM-node budget.
 */
export function StarSpeck({
  seed,
  count,
  bounds,
  hue = "var(--hw-ink-soft)",
  maxRadius = 0.7,
  excludeInnerRadius,
}: StarSpeckProps) {
  const dots = useMemo(() => {
    const arr: Array<{ x: number; y: number; r: number; a: number }> = [];
    for (let i = 0; i < count; i++) {
      const x = bounds.x + hash01(seed + i * 3.1) * bounds.w;
      const y = bounds.y + hash01(seed + i * 7.3 + 1.0) * bounds.h;
      if (excludeInnerRadius) {
        const d = Math.hypot(x, y);
        if (d < excludeInnerRadius) continue;
      }
      const r = 0.2 + hash01(seed + i * 11.7 + 2.0) * (maxRadius - 0.2);
      const a = 0.25 + hash01(seed + i * 17.5 + 3.0) * 0.55;
      arr.push({ x, y, r, a });
    }
    return arr;
  }, [seed, count, bounds.x, bounds.y, bounds.w, bounds.h, maxRadius, excludeInnerRadius]);

  return (
    <g aria-hidden fill={hue}>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} opacity={d.a} />
      ))}
    </g>
  );
}
