import { useMemo } from "react";
import { SVG_WIDTH, SVG_HEIGHT, PADDING, COLORS, formatNumber } from "./plotter-utils";

interface PlotterGridProps {
  viewXMin: number;
  viewXMax: number;
  viewYMin: number;
  viewYMax: number;
  step: number;
  mapX: (x: number) => number;
  mapY: (y: number) => number;
}

export function PlotterGrid({ viewXMin, viewXMax, viewYMin, viewYMax, step, mapX, mapY }: PlotterGridProps) {
  const gridLines = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number; major: boolean }[] = [];
    const xStart = Math.floor(viewXMin / step) * step;
    const yStart = Math.floor(viewYMin / step) * step;

    for (let x = xStart; x <= viewXMax; x += step) {
      const sx = mapX(x);
      lines.push({ x1: sx, y1: PADDING, x2: sx, y2: SVG_HEIGHT - PADDING, major: Math.abs(x) < step * 0.01 });
    }
    for (let y = yStart; y <= viewYMax; y += step) {
      const sy = mapY(y);
      lines.push({ x1: PADDING, y1: sy, x2: SVG_WIDTH - PADDING, y2: sy, major: Math.abs(y) < step * 0.01 });
    }
    return lines;
  }, [viewXMin, viewXMax, viewYMin, viewYMax, step, mapX, mapY]);

  const axisLabels = useMemo(() => {
    const labels: { x: number; y: number; text: string }[] = [];
    const xStart = Math.ceil(viewXMin / step) * step;
    const yStart = Math.ceil(viewYMin / step) * step;

    for (let x = xStart; x <= viewXMax; x += step) {
      if (Math.abs(x) < step * 0.01) continue;
      labels.push({ x: mapX(x), y: mapY(0) + 16, text: formatNumber(x) });
    }
    for (let y = yStart; y <= viewYMax; y += step) {
      if (Math.abs(y) < step * 0.01) continue;
      labels.push({ x: mapX(0) - 8, y: mapY(y) + 4, text: formatNumber(y) });
    }
    return labels;
  }, [viewXMin, viewXMax, viewYMin, viewYMax, step, mapX, mapY]);

  return (
    <g>
      {gridLines.map((line, i) => (
        <line
          key={i}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke={line.major ? COLORS.gridMajor : COLORS.grid}
          strokeWidth={line.major ? 1 : 0.5}
        />
      ))}
      {axisLabels.map((label, i) => (
        <text
          key={`l-${i}`}
          x={label.x}
          y={label.y}
          fill="rgba(148, 144, 168, 0.6)"
          fontSize={10}
          fontFamily="var(--font-mono, monospace)"
          textAnchor="middle"
        >
          {label.text}
        </text>
      ))}
    </g>
  );
}
