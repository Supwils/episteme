"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function PrisonersDilemma() {
  const reduce = useReducedMotion();
  const [strategy, setStrategy] = useState<"cooperate" | "defect" | null>(null);
  const [opponentStrategy, setOpponentStrategy] = useState<"cooperate" | "defect" | null>(null);
  const [result, setResult] = useState<{ player: number; opponent: number } | null>(null);
  const [history, setHistory] = useState<{ player: string; opponent: string; pPayoff: number; oPayoff: number }[]>([]);

  const payoffs: Record<string, Record<string, [number, number]>> = {
    cooperate: { cooperate: [3, 3], defect: [0, 5] },
    defect: { cooperate: [5, 0], defect: [1, 1] },
  };

  const play = () => {
    if (!strategy) return;
    const opp: "cooperate" | "defect" = Math.random() > 0.5 ? "cooperate" : "defect";
    setOpponentStrategy(opp);
    const [pPayoff, oPayoff] = payoffs[strategy]![opp]!;
    setResult({ player: pPayoff, opponent: oPayoff });
    setHistory((prev) => [
      ...prev.slice(-9),
      { player: strategy, opponent: opp, pPayoff, oPayoff },
    ]);
  };

  const reset = () => {
    setStrategy(null);
    setOpponentStrategy(null);
    setResult(null);
    setHistory([]);
  };

  return (
    <div className="chart-container">
      <h3 className="font-display text-fg-primary mb-4 text-lg font-semibold">
        囚徒困境
      </h3>

      <div className="mb-4 overflow-hidden rounded-lg border border-border-faint">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-faint">
              <th className="p-2 text-fg-muted font-mono text-[10px] tracking-wider uppercase" />
              <th className="p-2 text-accent-green font-mono text-[10px] tracking-wider uppercase">对手合作</th>
              <th className="p-2 text-accent-copper font-mono text-[10px] tracking-wider uppercase">对手背叛</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border-faint">
              <td className="p-2 text-accent-green font-mono text-[10px] tracking-wider uppercase">你合作</td>
              <td className="p-2 text-center text-fg-primary">3, 3</td>
              <td className="p-2 text-center text-fg-primary">0, 5</td>
            </tr>
            <tr>
              <td className="p-2 text-accent-copper font-mono text-[10px] tracking-wider uppercase">你背叛</td>
              <td className="p-2 text-center text-fg-primary">5, 0</td>
              <td className="p-2 text-center text-fg-primary">1, 1</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setStrategy("cooperate")}
          aria-pressed={strategy === "cooperate"}
          className={`sim-button flex-1 ${strategy === "cooperate" ? "!bg-accent-green/20 !border-accent-green/50 !text-accent-green" : ""}`}
        >
          合作
        </button>
        <button
          onClick={() => setStrategy("defect")}
          aria-pressed={strategy === "defect"}
          className={`sim-button flex-1 ${strategy === "defect" ? "!bg-accent-copper/20 !border-accent-copper/50 !text-accent-copper" : ""}`}
        >
          背叛
        </button>
        <button onClick={play} className="sim-button" aria-label="执行博弈">
          博弈
        </button>
        <button onClick={reset} className="sim-button opacity-60" aria-label="重置博弈">
          重置
        </button>
      </div>

      {result && (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="data-panel mb-4"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="data-label">你的收益</span>
              <span className={`data-value ${result.player >= 3 ? "stat-positive" : "stat-negative"}`}>
                {" "}{result.player}
              </span>
            </div>
            <div className="text-right">
              <span className="data-label">对手收益</span>
              <span className={`data-value ${result.opponent >= 3 ? "stat-positive" : "stat-negative"}`}>
                {" "}{result.opponent}
              </span>
            </div>
          </div>
          <p className="text-fg-muted mt-2 text-xs">
            你: {strategy === "cooperate" ? "合作" : "背叛"} ·
            对手: {opponentStrategy === "cooperate" ? "合作" : "背叛"}
          </p>
        </motion.div>
      )}

      {history.length > 0 && (
        <div>
          <p className="data-label mb-2" id="history-label">历史记录</p>
          <div className="flex flex-wrap gap-1" role="list" aria-labelledby="history-label">
            {history.map((h, i) => (
              <span
                key={i}
                role="listitem"
                aria-label={`第${i + 1}轮: 你${h.pPayoff}分, 对手${h.oPayoff}分`}
                className="inline-block h-3 w-3 rounded-sm"
                style={{
                  backgroundColor:
                    h.pPayoff >= 3 ? "rgba(107,174,138,0.5)" : "rgba(212,120,80,0.5)",
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
