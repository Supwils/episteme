"use client";

import { useState, useMemo } from "react";

export function NashEquilibriumFinder() {
  const [matrix, setMatrix] = useState([
    [[3, 3], [0, 5]],
    [[5, 0], [1, 1]],
  ]);

  const nashCells = useMemo(() => {
    const cells: [number, number][] = [];
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 2; c++) {
        const row = matrix[r]!;
        const cell = row[c]!;
        const p1Payoff = cell[0]!;
        const p2Payoff = cell[1]!;

        const p1BestInCol =
          p1Payoff >= (matrix[1 - r]![c]![0] ?? 0);
        const p2BestInRow =
          p2Payoff >= (row[1 - c]![1] ?? 0);

        if (p1BestInCol && p2BestInRow) {
          cells.push([r, c]);
        }
      }
    }
    return cells;
  }, [matrix]);

  const updateCell = (r: number, c: number, player: number, value: number) => {
    const newMatrix = matrix.map((row) => row.map((cell) => [...cell])) as [
      [number, number],
      [number, number],
    ][];
    const cell = newMatrix[r]![c]!;
    cell[player] = value;
    setMatrix(newMatrix);
  };

  const isNash = (r: number, c: number) =>
    nashCells.some(([nr, nc]) => nr === r && nc === c);

  return (
    <div className="chart-container">
      <h3 className="font-display text-fg-primary mb-4 text-lg font-semibold">
        纳什均衡求解器
      </h3>
      <p className="text-fg-secondary mb-4 text-sm">
        2×2 博弈矩阵，编辑数值后自动寻找纳什均衡（绿色高亮）
      </p>

      <div className="mb-4 overflow-hidden rounded-lg border border-border-faint">
        <table className="w-full text-sm" aria-label="2×2博弈矩阵">
          <thead>
            <tr className="border-b border-border-faint">
              <th className="p-2 text-fg-muted font-mono text-[10px] tracking-wider uppercase" scope="col" />
              <th className="p-2 text-accent-gold font-mono text-[10px] tracking-wider uppercase" scope="col">
                玩家2: 左
              </th>
              <th className="p-2 text-accent-gold font-mono text-[10px] tracking-wider uppercase" scope="col">
                玩家2: 右
              </th>
            </tr>
          </thead>
          <tbody>
            {["上", "下"].map((rowLabel, r) => (
              <tr key={r} className={r === 0 ? "border-b border-border-faint" : ""}>
                <th className="p-2 text-accent-gold font-mono text-[10px] tracking-wider uppercase" scope="row">
                  玩家1: {rowLabel}
                </th>
                {[0, 1].map((c) => (
                  <td
                    key={c}
                    className={`p-3 text-center transition-colors ${isNash(r, c) ? "bg-accent-green/10 ring-1 ring-accent-green/30" : ""}`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <input
                        type="number"
                        aria-label={`玩家1在${r === 0 ? "上" : "下"}${c === 0 ? "左" : "右"}的收益`}
                        value={matrix[r]![c]![0]}
                        onChange={(e) => updateCell(r, c, 0, Number(e.target.value))}
                        className="w-8 bg-transparent text-center text-accent-copper outline-none"
                      />
                      <span className="text-fg-disabled">,</span>
                      <input
                        type="number"
                        aria-label={`玩家2在${r === 0 ? "上" : "下"}${c === 0 ? "左" : "右"}的收益`}
                        value={matrix[r]![c]![1]}
                        onChange={(e) => updateCell(r, c, 1, Number(e.target.value))}
                        className="w-8 bg-transparent text-center text-accent-green outline-none"
                      />
                    </div>
                    {isNash(r, c) && (
                      <span className="text-accent-green font-mono text-[8px] tracking-wider uppercase">
                        Nash
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-4 text-[10px] font-mono">
        <span className="text-accent-copper">● 玩家1收益（橙色数字）</span>
        <span className="text-accent-green">● 玩家2收益（绿色数字）</span>
      </div>
    </div>
  );
}
