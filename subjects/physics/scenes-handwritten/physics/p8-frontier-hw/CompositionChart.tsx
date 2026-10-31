import { frontierComposition } from "@/content/universe-physics/physics/frontier-data";
import { HandwrittenLabel } from "@/subjects/physics/scenes-handwritten/shared/HandwrittenLabel";

const sectors = frontierComposition.map((part, index) => {
  const start = frontierComposition.slice(0, index).reduce((sum, p) => sum + p.fraction, 0);
  return {
    ...part,
    start: -Math.PI / 2 + 2 * Math.PI * start,
    end: -Math.PI / 2 + 2 * Math.PI * (start + part.fraction),
  };
});

export function CompositionChart() {
  return (
    <g transform="translate(-200 -15)">
      <HandwrittenLabel x={15} y={-175} text="今日宇宙的能量构成" variant="subtitle" italic />
      <HandwrittenLabel
        x={15}
        y={-148}
        text="Planck2018 · 平直ΛCDM示例"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      {sectors.map((part) => (
        <path
          key={part.id}
          d={sectorPath(part.start, part.end)}
          fill={part.color}
          fillOpacity={0.55}
          stroke="var(--hw-ink)"
          strokeWidth={0.5}
        />
      ))}
      {sectors.map((part, index) => (
        <g key={part.id} transform={`translate(0 ${120 + 22 * index})`}>
          <rect x={-116} y={-9} width={9} height={9} fill={part.color} />
          <HandwrittenLabel
            x={8}
            y={0}
            text={`${part.value} ${part.label}`}
            variant="label-minor"
            color={part.color}
          />
        </g>
      ))}
    </g>
  );
}

function sectorPath(start: number, end: number) {
  const radius = 100;
  const first = { x: radius * Math.cos(start), y: radius * Math.sin(start) };
  const last = { x: radius * Math.cos(end), y: radius * Math.sin(end) };
  return `M 0 0 L ${first.x.toFixed(3)} ${first.y.toFixed(3)} A ${radius} ${radius} 0 ${end - start > Math.PI ? 1 : 0} 1 ${last.x.toFixed(3)} ${last.y.toFixed(3)} Z`;
}
