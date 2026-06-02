"use client";

type Cell = { label: string; color: string };

const grid: Cell[][] = [
  [
    { label: "u", color: "var(--hw-gold)" },
    { label: "c", color: "var(--hw-gold)" },
    { label: "t", color: "var(--hw-gold)" },
    { label: "g", color: "var(--hw-red)" },
  ],
  [
    { label: "d", color: "var(--hw-gold)" },
    { label: "s", color: "var(--hw-gold)" },
    { label: "b", color: "var(--hw-gold)" },
    { label: "γ", color: "var(--hw-blue)" },
  ],
  [
    { label: "e", color: "var(--hw-blue)" },
    { label: "μ", color: "var(--hw-blue)" },
    { label: "τ", color: "var(--hw-blue)" },
    { label: "W±", color: "var(--hw-red)" },
  ],
  [
    { label: "νₑ", color: "var(--hw-blue)" },
    { label: "νμ", color: "var(--hw-blue)" },
    { label: "ντ", color: "var(--hw-blue)" },
    { label: "Z⁰", color: "var(--hw-red)" },
  ],
];

const cellW = 100;
const cellH = 70;
const cols = grid[0]!.length;
const rows = grid.length;
const totalW = cellW * cols;
const totalH = cellH * rows;
const x0 = -totalW / 2;
const y0 = -totalH / 2;

export function PartTable() {
  return (
    <g>
      {["I", "II", "III", "Bosons"].map((h, i) => (
        <text
          key={h}
          x={x0 + (i + 0.5) * cellW}
          y={y0 - 16}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          {h}
        </text>
      ))}
      {["u-quark", "d-quark", "lepton", "neutrino"].map((h, i) => (
        <text
          key={h}
          x={x0 - 18}
          y={y0 + (i + 0.5) * cellH + 4}
          textAnchor="end"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          {h}
        </text>
      ))}
      {grid.flatMap((row, r) =>
        row.map((cell, c) => {
          const cx = x0 + c * cellW;
          const cy = y0 + r * cellH;
          return (
            <g key={`${r}-${c}`}>
              <rect
                x={cx + 4}
                y={cy + 4}
                width={cellW - 8}
                height={cellH - 8}
                fill="var(--hw-bg-edge)"
                opacity={0.55}
                stroke={cell.color}
                strokeWidth={1.2}
                filter="url(#hw-wobble-tiny)"
              />
              <text
                x={cx + cellW / 2}
                y={cy + cellH / 2 + 12}
                textAnchor="middle"
                className="hw-label-title"
                fill={cell.color}
                style={{ fontStyle: "italic" }}
              >
                {cell.label}
              </text>
            </g>
          );
        }),
      )}
      <g transform={`translate(${x0 + cols * cellW + 30}, ${y0 + totalH / 2 - cellH / 2})`}>
        <rect
          x={0}
          y={0}
          width={cellW - 8}
          height={cellH - 8}
          fill="var(--hw-wash-warm)"
          opacity={0.6}
          stroke="var(--hw-gold)"
          strokeWidth={1.6}
          filter="url(#hw-wobble-tiny)"
        />
        <text
          x={(cellW - 8) / 2}
          y={(cellH - 8) / 2 + 12}
          textAnchor="middle"
          className="hw-label-title"
          fill="var(--hw-gold)"
          style={{ fontStyle: "italic" }}
        >
          H
        </text>
        <text
          x={(cellW - 8) / 2}
          y={cellH + 6}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-gold)"
        >
          125 GeV
        </text>
      </g>
    </g>
  );
}
