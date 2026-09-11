export const SVG_LAB_BUTTON_CLASS = "group cursor-pointer outline-none";

export function SvgFocusCircle({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill="none"
      stroke="var(--color-fg-secondary)"
      strokeWidth={1}
      className="pointer-events-none opacity-0 group-focus-visible:opacity-100"
    />
  );
}

export function SvgFocusRect({
  x,
  y,
  width,
  height,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={3}
      fill="none"
      stroke="var(--color-fg-secondary)"
      strokeWidth={1}
      className="pointer-events-none opacity-0 group-focus-visible:opacity-100"
    />
  );
}
