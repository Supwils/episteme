"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Strategy = "cooperate" | "defect";
type GameType = "prisoner" | "chicken" | "stag-hunt";

interface GameConfig {
  id: GameType;
  label: string;
  labelEn: string;
  description: string;
  payoffs: [number, number][][];
  nashEquilibria: [number, number][];
  dominantStrategy: { A: Strategy | null; B: Strategy | null };
  insight: string;
}

const GAMES: Record<GameType, GameConfig> = {
  prisoner: {
    id: "prisoner",
    label: "囚徒困境",
    labelEn: "Prisoner's Dilemma",
    description: "两个囚犯面临合作或背叛的选择。尽管双方合作能获得更好的集体结果，但个体理性导致双方都选择背叛。",
    payoffs: [
      [[3, 3], [0, 5]],
      [[5, 0], [1, 1]],
    ],
    nashEquilibria: [[1, 1]],
    dominantStrategy: { A: "defect", B: "defect" },
    insight: "个体理性 ≠ 集体理性。纳什均衡（背叛, 背叛）是帕累托次优的，这揭示了市场失灵的根源之一。",
  },
  chicken: {
    id: "chicken",
    label: "胆小鬼博弈",
    labelEn: "Game of Chicken",
    description: "两辆车相向而行，谁先转向谁是\u201C胆小鬼\u201D。如果都不转向则两败俱伤。这描述了核威慑、价格战等对峙场景。",
    payoffs: [
      [[0, 0], [-1, 1]],
      [[1, -1], [-5, -5]],
    ],
    nashEquilibria: [[0, 1], [1, 0]],
    dominantStrategy: { A: null, B: null },
    insight: "两个纯策略纳什均衡都存在——关键是谁先行动或做出承诺。这解释了为什么\u201C疯狂\u201D有时是理性策略。",
  },
  "stag-hunt": {
    id: "stag-hunt",
    label: "猎鹿博弈",
    labelEn: "Stag Hunt",
    description: "两个猎人可以合作猎鹿（高收益但需要双方合作）或单独猎兔（低收益但有保障）。这描述了信任与协作的困境。",
    payoffs: [
      [[5, 5], [0, 3]],
      [[3, 0], [3, 3]],
    ],
    nashEquilibria: [[0, 0], [1, 1]],
    dominantStrategy: { A: null, B: null },
    insight: "存在两个纳什均衡——合作是帕累托最优，但需要信任。这说明了社会契约和制度信任的重要性。",
  },
};

const STRATEGY_LABELS: Record<Strategy, { cn: string; en: string; color: string }> = {
  cooperate: { cn: "合作", en: "COOPERATE", color: "#6bae8a" },
  defect: { cn: "背叛", en: "DEFECT", color: "#d47850" },
};

export function GameTheoryMatrix() {
  const [gameType, setGameType] = useState<GameType>("prisoner");
  const [playerA, setPlayerA] = useState<Strategy | null>(null);
  const [playerB, setPlayerB] = useState<Strategy | null>(null);
  const [revealed, setRevealed] = useState(false);
  const reduce = useReducedMotion();

  const game = GAMES[gameType];

  const handleGameChange = useCallback((type: GameType) => {
    setGameType(type);
    setPlayerA(null);
    setPlayerB(null);
    setRevealed(false);
  }, []);

  const handleCellClick = useCallback((row: number, col: number) => {
    const stratA: Strategy = row === 0 ? "cooperate" : "defect";
    const stratB: Strategy = col === 0 ? "cooperate" : "defect";
    setPlayerA(stratA);
    setPlayerB(stratB);
    setRevealed(false);
    setTimeout(() => setRevealed(true), 100);
  }, []);

  const reset = useCallback(() => {
    setPlayerA(null);
    setPlayerB(null);
    setRevealed(false);
  }, []);

  const selectedPayoff = useMemo(() => {
    if (playerA === null || playerB === null) return null;
    const row = playerA === "cooperate" ? 0 : 1;
    const col = playerB === "cooperate" ? 0 : 1;
    return game.payoffs[row]![col]!;
  }, [playerA, playerB, game]);

  const isNashEquilibrium = useCallback(
    (row: number, col: number) => {
      return game.nashEquilibria.some(([r, c]) => r === row && c === col);
    },
    [game],
  );

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-wrap gap-2">
        {(Object.keys(GAMES) as GameType[]).map((type) => (
          <button
            key={type}
            onClick={() => handleGameChange(type)}
            className={`sim-button ${gameType === type ? "!bg-accent-gold/20 !border-accent-gold/50" : ""}`}
          >
            {GAMES[type].label}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <h4 className="font-display text-fg-primary text-base font-semibold">
          {game.label}
          <span className="text-fg-muted ml-2 font-mono text-xs italic">{game.labelEn}</span>
        </h4>
        <p className="text-fg-secondary mt-1 text-sm leading-relaxed">{game.description}</p>
      </div>

      <div className="mb-6 flex justify-center">
        <div className="relative">
          <div className="mb-2 text-center">
            <span className="text-fg-muted font-mono text-[10px] tracking-[0.2em] uppercase">玩家 B（列）</span>
          </div>

          <div className="flex items-start gap-0">
            <div className="mr-2 flex h-full items-center pt-[52px]">
              <span
                className="text-fg-muted font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
              >
                玩家 A（行）
              </span>
            </div>

            <div>
              <div className="mb-[2px] ml-[102px] flex gap-[2px]">
                {(["cooperate", "defect"] as const).map((s) => (
                  <div
                    key={`col-header-${s}`}
                    className="flex h-10 w-[100px] items-center justify-center rounded-t-md font-mono text-[11px] font-semibold tracking-wider uppercase"
                    style={{
                      backgroundColor: `${STRATEGY_LABELS[s].color}15`,
                      color: STRATEGY_LABELS[s].color,
                      border: `1px solid ${STRATEGY_LABELS[s].color}30`,
                      borderBottom: "none",
                    }}
                  >
                    {STRATEGY_LABELS[s].cn}
                  </div>
                ))}
              </div>

              {(["cooperate", "defect"] as const).map((stratA, row) => (
                <div key={`row-${row}`} className="flex gap-[2px]">
                  <div
                    className="flex h-[72px] w-[100px] items-center justify-center rounded-l-md font-mono text-[11px] font-semibold tracking-wider uppercase"
                    style={{
                      backgroundColor: `${STRATEGY_LABELS[stratA].color}15`,
                      color: STRATEGY_LABELS[stratA].color,
                      border: `1px solid ${STRATEGY_LABELS[stratA].color}30`,
                      borderRight: "none",
                    }}
                  >
                    {STRATEGY_LABELS[stratA].cn}
                  </div>
                  {(["cooperate", "defect"] as const).map((stratB, col) => {
                    const payoff = game.payoffs[row]![col]!;
                    const isNE = isNashEquilibrium(row, col);
                    const isSelected = playerA === stratA && playerB === stratB;
                    return (
                      <button
                        key={`cell-${row}-${col}`}
                        onClick={() => handleCellClick(row, col)}
                        className={`game-cell relative flex h-[72px] w-[100px] flex-col items-center justify-center rounded-md border transition-all duration-200 ${
                          isNE ? "nash-equilibrium" : ""
                        } ${isSelected ? "ring-1" : ""}`}
                        style={{
                          borderColor: isSelected
                            ? "#c8a45a"
                            : isNE
                              ? "rgba(107,174,138,0.3)"
                              : "rgba(200,164,90,0.08)",
                          backgroundColor: isSelected
                            ? "rgba(200,164,90,0.12)"
                            : isNE
                              ? "rgba(107,174,138,0.08)"
                              : "var(--color-bg-elevated)",
                          ...(isSelected ? { boxShadow: "0 0 0 1px rgba(200,164,90,0.4)" } : {}),
                        }}
                        aria-label={`${stratA === "cooperate" ? "合作" : "背叛"} vs ${stratB === "cooperate" ? "合作" : "背叛"}: 收益 ${payoff[0]}, ${payoff[1]}${isNE ? " (纳什均衡)" : ""}`}
                      >
                        {isNE && (
                          <span className="absolute -top-1 -right-1 font-mono text-[7px] tracking-wider text-accent-green uppercase bg-bg-elevated px-1 rounded">
                            NE
                          </span>
                        )}
                        <span className="font-mono text-sm font-semibold tabular-nums" style={{ color: STRATEGY_LABELS[stratA].color }}>
                          {payoff[0]}
                        </span>
                        <span className="text-fg-disabled font-mono text-[9px]">,</span>
                        <span className="font-mono text-sm font-semibold tabular-nums" style={{ color: STRATEGY_LABELS[stratB].color }}>
                          {payoff[1]}
                        </span>
                        <span className="text-fg-disabled mt-0.5 font-mono text-[8px]">
                          A={payoff[0]} B={payoff[1]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedPayoff && revealed && (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="data-panel mb-4"
          role="status"
          aria-live="polite"
        >
          <div className="mb-3 flex items-center justify-between">
            <div>
              <span className="data-label">玩家 A 收益</span>
              <span
                className={`data-value ml-2 ${selectedPayoff[0] >= 3 ? "stat-positive" : "stat-negative"}`}
              >
                {selectedPayoff[0]}
              </span>
            </div>
            <div className="text-center">
              <span className="text-fg-muted font-mono text-xs">vs</span>
            </div>
            <div className="text-right">
              <span className="data-label">玩家 B 收益</span>
              <span
                className={`data-value ml-2 ${selectedPayoff[1] >= 3 ? "stat-positive" : "stat-negative"}`}
              >
                {selectedPayoff[1]}
              </span>
            </div>
          </div>
          <p className="text-fg-muted text-xs">
            玩家 A: <span style={{ color: STRATEGY_LABELS[playerA!].color }}>{STRATEGY_LABELS[playerA!].cn}</span> ·
            玩家 B: <span style={{ color: STRATEGY_LABELS[playerB!].color }}>{STRATEGY_LABELS[playerB!].cn}</span>
          </p>
        </motion.div>
      )}

      <div className="mb-4 flex gap-2">
        <button onClick={reset} className="sim-button opacity-70">
          重置
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div
          className="border-border-faint bg-bg-elevated rounded-lg border p-4"
          style={{ borderLeftWidth: 3, borderLeftColor: "#c8a45a" }}
        >
          <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "#c8a45a" }}>
            博弈分析
          </p>
          <div className="space-y-2">
            <div>
              <span className="text-fg-muted font-mono text-[10px]">纳什均衡：</span>
              <span className="text-fg-primary font-mono text-[11px]">
                {game.nashEquilibria
                  .map(
                    ([r, c]) =>
                      `(${r === 0 ? "合作" : "背叛"}, ${c === 0 ? "合作" : "背叛"})`,
                  )
                  .join(" 和 ")}
              </span>
            </div>
            <div>
              <span className="text-fg-muted font-mono text-[10px]">优势策略：</span>
              <span className="text-fg-primary font-mono text-[11px]">
                A: {game.dominantStrategy.A === null ? "无" : game.dominantStrategy.A === "cooperate" ? "合作" : "背叛"} ·
                B: {game.dominantStrategy.B === null ? "无" : game.dominantStrategy.B === "cooperate" ? "合作" : "背叛"}
              </span>
            </div>
          </div>
        </div>
        <div
          className="border-border-faint bg-bg-elevated rounded-lg border p-4"
          style={{ borderLeftWidth: 3, borderLeftColor: "#5a9ad8" }}
        >
          <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "#5a9ad8" }}>
            经济学启示
          </p>
          <p className="text-fg-secondary text-sm leading-relaxed">{game.insight}</p>
        </div>
      </div>
    </div>
  );
}
