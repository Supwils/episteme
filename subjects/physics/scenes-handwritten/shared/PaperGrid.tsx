import { HW_VIEWBOX } from "@/subjects/physics/lib/handwritten-coords";

type PaperGridProps = {
  /** Cell size in SVG units. Default 40 — roughly 8 cells per quadrant. */
  cell?: number;
  /** Don't draw grid inside this radius from origin (keeps centre clear). */
  excludeInnerRadius?: number;
  /** Draw small crosshair ticks at intersections instead of full lines. */
  variant?: "lines" | "ticks";
};

/**
 * Engineering-paper grid for the Physics section. Replaces the StarSpeck
 * background — physics is about lab notebooks and chalkboards, not star
 * fields. Lines are very faint so they recede behind the ink work.
 */
export function PaperGrid({
  cell = 40,
  excludeInnerRadius = 320,
  variant = "ticks",
}: PaperGridProps) {
  const { x: x0, y: y0, w, h } = HW_VIEWBOX;
  const x1 = x0 + w;
  const y1 = y0 + h;

  if (variant === "lines") {
    const verticals: number[] = [];
    for (let x = Math.ceil(x0 / cell) * cell; x <= x1; x += cell) verticals.push(x);
    const horizontals: number[] = [];
    for (let y = Math.ceil(y0 / cell) * cell; y <= y1; y += cell) horizontals.push(y);
    return (
      <g aria-hidden opacity={0.35}>
        {verticals.map((x) => (
          <line
            key={`v${x}`}
            x1={x}
            y1={y0}
            x2={x}
            y2={y1}
            stroke="var(--hw-ink-faint-solid)"
            strokeWidth={x === 0 ? 0.5 : 0.3}
            opacity={x === 0 ? 0.55 : 0.35}
          />
        ))}
        {horizontals.map((y) => (
          <line
            key={`h${y}`}
            x1={x0}
            y1={y}
            x2={x1}
            y2={y}
            stroke="var(--hw-ink-faint-solid)"
            strokeWidth={y === 0 ? 0.5 : 0.3}
            opacity={y === 0 ? 0.55 : 0.35}
          />
        ))}
      </g>
    );
  }

  // ticks: small + at each lattice intersection, skipping the centre disc
  const ticks: Array<{ x: number; y: number }> = [];
  for (let x = Math.ceil(x0 / cell) * cell; x <= x1; x += cell) {
    for (let y = Math.ceil(y0 / cell) * cell; y <= y1; y += cell) {
      if (Math.hypot(x, y) < excludeInnerRadius) continue;
      ticks.push({ x, y });
    }
  }
  return (
    <g aria-hidden opacity={0.5}>
      {ticks.map(({ x, y }) => (
        <g key={`${x}_${y}`}>
          <line
            x1={x - 2}
            y1={y}
            x2={x + 2}
            y2={y}
            stroke="var(--hw-ink-faint-solid)"
            strokeWidth={0.4}
          />
          <line
            x1={x}
            y1={y - 2}
            x2={x}
            y2={y + 2}
            stroke="var(--hw-ink-faint-solid)"
            strokeWidth={0.4}
          />
        </g>
      ))}
    </g>
  );
}
