import {
  MENTAL_HEALTH_COMPARISON_ROUTES,
  type MentalHealthComparisonCheckpoint,
} from "@/lib/mental-health-tour-comparison";

export function MentalHealthTourComparisonDiagram({
  checkpoints,
  selectedId,
  checkedIds,
  onSelect,
}: {
  checkpoints: readonly MentalHealthComparisonCheckpoint[];
  selectedId: string;
  checkedIds: ReadonlySet<string>;
  onSelect: (id: string) => void;
}) {
  const [leftRoute, rightRoute] = MENTAL_HEALTH_COMPARISON_ROUTES;
  const positions = checkpoints.map((_, index) => {
    const y = 72 + index * (400 / Math.max(1, checkpoints.length - 1));
    const depth = index % 2 === 0 ? 0 : 18;
    return { y, leftX: 140 + depth, rightX: 480 - depth };
  });

  return (
    <svg
      viewBox="0 0 620 540"
      className="h-auto w-full"
      role="img"
      aria-label="个体照护与青少年环境支持双路线比较图"
      data-testid="mental-health-route-comparison-diagram"
    >
      <title>两条心理健康路线在共同锚点汇合，并在分析起点、因果标准和干预层级处分叉</title>
      {[120, 270, 420].map((y, index) => (
        <ellipse
          key={y}
          cx="310"
          cy={y}
          rx={250 - index * 18}
          ry="52"
          fill="none"
          stroke="var(--color-border-faint)"
          strokeWidth="1"
          opacity="0.65"
        />
      ))}
      <polyline
        points={positions.map((point) => `${point.leftX},${point.y}`).join(" ")}
        fill="none"
        stroke={leftRoute.color}
        strokeWidth="3"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <polyline
        points={positions.map((point) => `${point.rightX},${point.y}`).join(" ")}
        fill="none"
        stroke={rightRoute.color}
        strokeWidth="3"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <text x="34" y="28" fill={leftRoute.color} fontSize="17">
        {leftRoute.shortLabel}
      </text>
      <text x="586" y="28" textAnchor="end" fill={rightRoute.color} fontSize="17">
        {rightRoute.shortLabel}
      </text>
      {checkpoints.map((checkpoint, index) => {
        const point = positions[index]!;
        const selected = checkpoint.id === selectedId;
        const checked = checkedIds.has(checkpoint.id);
        const shared = checkpoint.kind === "shared";
        return (
          <g
            key={checkpoint.id}
            role="button"
            tabIndex={0}
            aria-label={`选择比较检查点：${checkpoint.label}`}
            aria-pressed={selected}
            onClick={() => onSelect(checkpoint.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(checkpoint.id);
              }
            }}
            className="cursor-pointer outline-none"
          >
            {shared ? (
              <>
                <line
                  x1={point.leftX}
                  y1={point.y}
                  x2="310"
                  y2={point.y}
                  stroke={leftRoute.color}
                  strokeWidth={selected ? 3 : 1.5}
                />
                <line
                  x1="310"
                  y1={point.y}
                  x2={point.rightX}
                  y2={point.y}
                  stroke={rightRoute.color}
                  strokeWidth={selected ? 3 : 1.5}
                />
                <circle
                  cx="310"
                  cy={point.y}
                  r={selected ? 12 : 9}
                  fill={checked ? "var(--color-fg-primary)" : "var(--color-bg-base)"}
                  stroke="var(--color-fg-primary)"
                  strokeWidth="2"
                />
              </>
            ) : (
              <>
                <line
                  x1={point.leftX}
                  y1={point.y}
                  x2={point.rightX}
                  y2={point.y}
                  stroke="var(--color-border-faint)"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
                <circle
                  cx={point.leftX}
                  cy={point.y}
                  r={selected ? 10 : 7}
                  fill={leftRoute.color}
                />
                <circle
                  cx={point.rightX}
                  cy={point.y}
                  r={selected ? 10 : 7}
                  fill={rightRoute.color}
                />
              </>
            )}
            <rect
              x="225"
              y={point.y - 19}
              width="170"
              height="38"
              fill="var(--color-bg-near)"
              stroke={selected ? "var(--color-fg-primary)" : "var(--color-border-faint)"}
            />
            <text
              x="310"
              y={point.y + 5}
              textAnchor="middle"
              fill="var(--color-fg-secondary)"
              fontSize="17"
            >
              {checkpoint.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
