"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PRODUCT_EASE } from "@/subjects/psychology/lib/constants";

interface ColorWord {
  label: string;
  hex: string;
}

const COLORS: ColorWord[] = [
  { label: "红", hex: "#ef4444" },
  { label: "蓝", hex: "#3b82f6" },
  { label: "绿", hex: "#22c55e" },
  { label: "黄", hex: "#eab308" },
];

type Phase = "intro" | "congruent" | "incongruent" | "results";

interface TrialResult {
  correct: boolean;
  reactionTime: number;
  congruent: boolean;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function generateTrial(congruent: boolean) {
  const wordIndex = Math.floor(Math.random() * COLORS.length);
  const word = COLORS[wordIndex]!;
  if (congruent) {
    return { word: word.label, inkColor: word.hex, correctLabel: word.label };
  }
  let inkIndex: number;
  do {
    inkIndex = Math.floor(Math.random() * COLORS.length);
  } while (inkIndex === wordIndex);
  const ink = COLORS[inkIndex]!;
  return { word: word.label, inkColor: ink.hex, correctLabel: ink.label };
}

const TRIALS_PER_BLOCK = 8;

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function InstructionPanel({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: PRODUCT_EASE }}
      className="flex flex-col items-center gap-6 py-8"
    >
      <div className="text-center">
        <h3 className="font-display text-fg-primary mb-2 text-xl font-semibold">
          Stroop 效应测试
        </h3>
        <p className="text-fg-secondary mx-auto max-w-md text-sm leading-relaxed">
          屏幕上会出现一个表示颜色的汉字（如&ldquo;红&rdquo;），但显示的墨水颜色可能不同。
          你需要<strong className="text-fg-primary">忽略文字含义，点击正确的墨水颜色</strong>。
        </p>
      </div>

      <div className="border-border-faint bg-bg-near flex flex-col gap-3 border p-4">
        <p className="text-fg-muted font-mono text-[10px] tracking-[0.22em] uppercase">
          示例
        </p>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <span className="text-3xl font-bold" style={{ color: "#ef4444" }}>
              红
            </span>
            <p className="text-fg-muted mt-1 text-xs">一致：点击&ldquo;红&rdquo;</p>
          </div>
          <span className="text-fg-disabled">→</span>
          <div className="text-center">
            <span className="text-3xl font-bold" style={{ color: "#3b82f6" }}>
              红
            </span>
            <p className="text-fg-muted mt-1 text-xs">不一致：点击&ldquo;蓝&rdquo;</p>
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="border-accent-purple/40 text-accent-purple hover:bg-accent-purple/10 mt-2 border px-6 py-2.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors"
      >
        开始测试
      </button>
    </motion.div>
  );
}

function TrialDisplay({
  trial,
  onAnswer,
  trialNum,
  totalTrials,
  phaseLabel,
}: {
  trial: { word: string; inkColor: string; correctLabel: string };
  onAnswer: (label: string, time: number) => void;
  trialNum: number;
  totalTrials: number;
  phaseLabel: string;
}) {
  const startTimeRef = useRef(Date.now());
  const [flash, setFlash] = useState<"correct" | "wrong" | null>(null);

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, [trial]);

  const handleAnswer = useCallback(
    (label: string) => {
      if (flash) return;
      const elapsed = Date.now() - startTimeRef.current;
      const isCorrect = label === trial.correctLabel;
      setFlash(isCorrect ? "correct" : "wrong");
      setTimeout(() => {
        setFlash(null);
        onAnswer(label, elapsed);
      }, 300);
    },
    [flash, onAnswer, trial.correctLabel],
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, ease: PRODUCT_EASE }}
      className="flex flex-col items-center gap-6"
    >
      <div className="flex w-full items-center justify-between">
        <span className="text-fg-muted font-mono text-[10px] tracking-[0.22em] uppercase">
          {phaseLabel}
        </span>
        <span className="text-fg-disabled font-mono text-[10px]">
          {trialNum}/{totalTrials}
        </span>
      </div>

      <motion.div
        key={`${trial.word}-${trial.inkColor}-${trialNum}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.15 }}
        className={`flex h-32 w-full items-center justify-center rounded-sm border transition-colors duration-150 ${
          flash === "correct"
            ? "border-success/50 bg-success-dim"
            : flash === "wrong"
              ? "border-danger/50 bg-danger-dim"
              : "border-border-faint bg-bg-near"
        }`}
      >
        <span
          className="text-5xl font-bold select-none"
          style={{ color: trial.inkColor }}
        >
          {trial.word}
        </span>
      </motion.div>

      <div className="grid grid-cols-4 gap-3">
        {COLORS.map((c) => (
          <button
            key={c.label}
            onClick={() => handleAnswer(c.label)}
            disabled={!!flash}
            className="group flex flex-col items-center gap-2 rounded-sm border border-transparent px-4 py-3 transition-all hover:border-white/10 hover:bg-white/5 disabled:pointer-events-none"
            aria-label={`选择颜色 ${c.label}`}
          >
            <div
              className="h-8 w-8 rounded-full transition-transform group-hover:scale-110"
              style={{ backgroundColor: c.hex }}
            />
            <span className="text-fg-muted font-mono text-[10px] group-hover:text-fg-primary">
              {c.label}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function ResultsPanel({
  results,
  onRestart,
}: {
  results: TrialResult[];
  onRestart: () => void;
}) {
  const stats = useMemo(() => {
    const congruent = results.filter((r) => r.congruent);
    const incongruent = results.filter((r) => !r.congruent);

    const avgCongruent =
      congruent.length > 0
        ? congruent.reduce((s, r) => s + r.reactionTime, 0) / congruent.length
        : 0;
    const avgIncongruent =
      incongruent.length > 0
        ? incongruent.reduce((s, r) => s + r.reactionTime, 0) /
          incongruent.length
        : 0;
    const accuracyCongruent =
      congruent.length > 0
        ? congruent.filter((r) => r.correct).length / congruent.length
        : 0;
    const accuracyIncongruent =
      incongruent.length > 0
        ? incongruent.filter((r) => r.correct).length / incongruent.length
        : 0;

    return {
      avgCongruent: Math.round(avgCongruent),
      avgIncongruent: Math.round(avgIncongruent),
      accuracyCongruent: Math.round(accuracyCongruent * 100),
      accuracyIncongruent: Math.round(accuracyIncongruent * 100),
      difference: Math.round(avgIncongruent - avgCongruent),
    };
  }, [results]);

  const maxRT = Math.max(stats.avgCongruent, stats.avgIncongruent, 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: PRODUCT_EASE }}
      className="flex flex-col gap-6"
    >
      <div className="text-center">
        <h3 className="font-display text-fg-primary mb-1 text-xl font-semibold">
          测试结果
        </h3>
        <p className="text-fg-secondary text-sm">
          你的 Stroop 效应表现
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          {
            label: "一致条件",
            labelEn: "Congruent",
            rt: stats.avgCongruent,
            acc: stats.accuracyCongruent,
            color: "#22c55e",
          },
          {
            label: "不一致条件",
            labelEn: "Incongruent",
            rt: stats.avgIncongruent,
            acc: stats.accuracyIncongruent,
            color: "#ef4444",
          },
        ].map((block) => (
          <div
            key={block.labelEn}
            className="border-border-faint bg-bg-near border p-4"
          >
            <div className="mb-3 flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: block.color }}
              />
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: block.color }}>
                {block.labelEn}
              </span>
            </div>
            <p className="text-fg-primary font-mono text-2xl font-bold tabular-nums">
              {block.rt}
              <span className="text-fg-muted ml-1 text-xs">ms</span>
            </p>
            <p className="text-fg-muted text-xs">准确率 {block.acc}%</p>
            <div className="bg-bg-elevated mt-2 h-2 w-full overflow-hidden rounded-full">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: block.color }}
                initial={{ width: 0 }}
                animate={{ width: `${(block.rt / maxRT) * 100}%` }}
                transition={{ duration: 0.8, ease: PRODUCT_EASE }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="border-accent-purple/20 bg-accent-purple/5 border p-4 text-center">
        <p className="text-fg-secondary text-sm">
          不一致条件下反应时间慢了{" "}
          <span className="text-accent-purple font-mono font-semibold">
            +{stats.difference}ms
          </span>
        </p>
        <p className="text-fg-muted mt-2 text-xs leading-relaxed">
          这就是 <strong className="text-fg-primary">Stroop 效应</strong>
          ：当文字含义与墨水颜色冲突时，大脑需要额外时间来抑制自动阅读反应。
          前扣带皮层（ACC）和背外侧前额叶皮层（DLPFC）参与了这一冲突解决过程。
        </p>
      </div>

      <div className="border-border-faint bg-bg-elevated border p-4">
        <h4 className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.22em] uppercase">
          心理学解释
        </h4>
        <p className="text-fg-secondary text-sm leading-relaxed">
          Stroop 效应（1935）揭示了<strong className="text-fg-primary">自动化加工</strong>
          与<strong className="text-fg-primary">控制加工</strong>之间的冲突。阅读是一个高度自动化的技能，
          当我们试图命名墨水颜色时，自动阅读过程会产生干扰。
          这一效应被广泛用于测量注意力、认知灵活性和执行功能。
        </p>
      </div>

      <button
        onClick={onRestart}
        className="border-border-faint text-fg-muted hover:text-fg-primary hover:border-fg-disabled/50 self-center border px-6 py-2.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors"
      >
        重新测试
      </button>
    </motion.div>
  );
}

export default function StroopEffect() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("intro");
  const [results, setResults] = useState<TrialResult[]>([]);
  const [trialIndex, setTrialIndex] = useState(0);
  const [currentTrial, setCurrentTrial] = useState<{
    word: string;
    inkColor: string;
    correctLabel: string;
  } | null>(null);

  const startTest = useCallback(() => {
    setResults([]);
    setTrialIndex(0);
    setPhase("congruent");
    setCurrentTrial(generateTrial(true));
  }, []);

  const handleAnswer = useCallback(
    (_label: string, elapsed: number) => {
      const isCorrect = _label === currentTrial?.correctLabel;
      const isCongruent = phase === "congruent";

      setResults((prev) => [
        ...prev,
        { correct: isCorrect, reactionTime: elapsed, congruent: isCongruent },
      ]);

      const nextIndex = trialIndex + 1;
      if (nextIndex < TRIALS_PER_BLOCK) {
        setTrialIndex(nextIndex);
        setCurrentTrial(generateTrial(isCongruent));
      } else if (phase === "congruent") {
        setPhase("incongruent");
        setTrialIndex(0);
        setCurrentTrial(generateTrial(false));
      } else {
        setPhase("results");
      }
    },
    [currentTrial, phase, trialIndex],
  );

  return (
    <div className="w-full">
      <div className="mb-4">
        <p className="text-fg-muted font-mono text-[10px] tracking-[0.42em] uppercase">
          interactive stroop test
        </p>
        <h2 className="font-display text-fg-primary mt-1 text-lg font-semibold">
          Stroop 效应实验
        </h2>
      </div>

      <div className="border-border-faint bg-bg-panel border p-6 backdrop-blur-md">
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <InstructionPanel key="intro" onStart={startTest} />
          )}
          {(phase === "congruent" || phase === "incongruent") &&
            currentTrial && (
              <TrialDisplay
                key={`trial-${phase}-${trialIndex}`}
                trial={currentTrial}
                onAnswer={handleAnswer}
                trialNum={trialIndex + 1}
                totalTrials={TRIALS_PER_BLOCK}
                phaseLabel={
                  phase === "congruent"
                    ? "第一轮：一致条件"
                    : "第二轮：不一致条件"
                }
              />
            )}
          {phase === "results" && (
            <ResultsPanel key="results" results={results} onRestart={startTest} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
