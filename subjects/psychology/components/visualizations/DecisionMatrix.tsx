"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PRODUCT_EASE } from "@/subjects/psychology/lib/constants";

type Frame = "gain" | "loss";
type Choice = "A" | "B" | null;

interface ScenarioData {
  title: string;
  titleEn: string;
  description: string;
  gainFrame: {
    optionA: { label: string; description: string };
    optionB: { label: string; description: string };
  };
  lossFrame: {
    optionA: { label: string; description: string };
    optionB: { label: string; description: string };
  };
  reference: string;
}

const SCENARIO: ScenarioData = {
  title: "亚洲疾病问题",
  titleEn: "Asian Disease Problem",
  description:
    "想象美国正在准备应对一种罕见的亚洲疾病爆发，预计将导致 600 人死亡。现在有两套备选方案来应对这一疾病。",
  gainFrame: {
    optionA: {
      label: "方案 A",
      description: "确定救活 200 人。",
    },
    optionB: {
      label: "方案 B",
      description:
        "有 1/3 的概率救活全部 600 人，有 2/3 的概率一个人也救不活。",
    },
  },
  lossFrame: {
    optionA: {
      label: "方案 C",
      description: "确定死亡 400 人。",
    },
    optionB: {
      label: "方案 D",
      description:
        "有 1/3 的概率无人死亡，有 2/3 的概率 600 人全部死亡。",
    },
  },
  reference: "Tversky & Kahneman, 1981 — The Framing of Decisions",
};

const FRAMING_STUDY_RESULTS = {
  gain: { A: 72, B: 28 },
  loss: { A: 22, B: 78 },
};

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function OptionCard({
  option,
  frame,
  isSelected,
  onSelect,
  delay,
}: {
  option: { label: string; description: string };
  frame: Frame;
  isSelected: boolean;
  onSelect: () => void;
  delay: number;
}) {
  const reduce = useReducedMotion();
  const accentColor = frame === "gain" ? "#22c55e" : "#ef4444";

  return (
    <motion.button
      onClick={onSelect}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.35, delay, ease: PRODUCT_EASE }}
      className={`group relative w-full border p-5 text-left transition-all duration-300 ${
        isSelected
          ? "border-current bg-white/5"
          : "border-border-faint bg-bg-near hover:border-fg-disabled/30 hover:bg-bg-elevated"
      }`}
      style={{
        borderColor: isSelected ? accentColor : undefined,
        boxShadow: isSelected
          ? `0 0 20px ${hexToRgba(accentColor, 0.15)}`
          : undefined,
      }}
      aria-pressed={isSelected}
    >
      <div className="mb-2 flex items-center gap-2">
        <span
          className="font-mono text-[11px] font-bold tracking-[0.18em]"
          style={{ color: isSelected ? accentColor : "var(--color-fg-muted)" }}
        >
          {option.label}
        </span>
        {isSelected && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-mono text-[9px] tracking-[0.22em] uppercase"
            style={{ color: accentColor }}
          >
            已选
          </motion.span>
        )}
      </div>
      <p className="text-fg-secondary text-sm leading-relaxed">
        {option.description}
      </p>
      <span
        className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
        style={{ backgroundColor: accentColor }}
        aria-hidden
      />
    </motion.button>
  );
}

function ResultComparison({
  frame,
  userChoice,
}: {
  frame: Frame;
  userChoice: Choice;
}) {
  const reduce = useReducedMotion();
  const results = FRAMING_STUDY_RESULTS[frame];
  const accentColor = frame === "gain" ? "#22c55e" : "#ef4444";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.4, ease: PRODUCT_EASE }}
      className="border-border-faint bg-bg-near mt-4 border p-4"
    >
      <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
        Tversky & Kahneman 1981 研究数据
      </p>

      <div className="mb-3 flex items-center gap-2">
        <span className="text-fg-secondary text-xs">
          你的选择：
        </span>
        <span
          className="font-mono text-xs font-bold"
          style={{ color: accentColor }}
        >
          {frame === "gain"
            ? userChoice === "A"
              ? "方案 A（确定救 200 人）"
              : "方案 B（冒险）"
            : userChoice === "A"
              ? "方案 C（确定死 400 人）"
              : "方案 D（冒险）"}
        </span>
      </div>

      <div className="space-y-2">
        {[
          {
            label: frame === "gain" ? "方案 A" : "方案 C",
            value: results.A,
            isCertain: true,
          },
          {
            label: frame === "gain" ? "方案 B" : "方案 D",
            value: results.B,
            isCertain: false,
          },
        ].map((bar) => (
          <div key={bar.label} className="flex items-center gap-3">
            <span className="text-fg-muted w-16 font-mono text-[10px]">
              {bar.label}
            </span>
            <div className="bg-bg-elevated h-4 flex-1 overflow-hidden rounded-sm">
              <motion.div
                className="flex h-full items-center justify-end rounded-sm pr-2"
                style={{
                  backgroundColor: hexToRgba(accentColor, 0.4),
                }}
                initial={{ width: 0 }}
                animate={{ width: `${bar.value}%` }}
                transition={{ duration: reduce ? 0 : 0.8, ease: PRODUCT_EASE }}
              >
                <span className="font-mono text-[10px] font-bold text-white">
                  {bar.value}%
                </span>
              </motion.div>
            </div>
            <span className="text-fg-disabled w-12 text-right font-mono text-[9px]">
              {bar.isCertain ? "确定性" : "风险性"}
            </span>
          </div>
        ))}
      </div>

      <p className="text-fg-muted mt-3 text-xs">
        在获益框架下，{results.A}% 的人选择确定方案；在损失框架下，{results.B}%
        的人选择冒险方案。
      </p>
    </motion.div>
  );
}

export default function DecisionMatrix() {
  const reduce = useReducedMotion();
  const [currentFrame, setCurrentFrame] = useState<Frame>("gain");
  const [gainChoice, setGainChoice] = useState<Choice>(null);
  const [lossChoice, setLossChoice] = useState<Choice>(null);
  const [showBothResults, setShowBothResults] = useState(false);

  const currentChoice = currentFrame === "gain" ? gainChoice : lossChoice;
  const setCurrentChoice = useCallback(
    (choice: Choice) => {
      if (currentFrame === "gain") {
        setGainChoice(choice);
      } else {
        setLossChoice(choice);
      }
    },
    [currentFrame],
  );

  const bothFramesAnswered = gainChoice !== null && lossChoice !== null;

  const handleFrameSwitch = useCallback(
    (frame: Frame) => {
      setCurrentFrame(frame);
    },
    [],
  );

  const handleShowResults = useCallback(() => {
    setShowBothResults(true);
  }, []);

  const handleReset = useCallback(() => {
    setGainChoice(null);
    setLossChoice(null);
    setShowBothResults(false);
    setCurrentFrame("gain");
  }, []);

  const framingEffect = useMemo(() => {
    if (!bothFramesAnswered) return null;
    const sameType =
      (gainChoice === "A" && lossChoice === "A") ||
      (gainChoice === "B" && lossChoice === "B");
    return {
      consistent: sameType,
      message: sameType
        ? "你的选择在两种框架下保持一致——这在实际研究中只有少数人能做到。"
        : "你的选择因框架不同而改变——这正是框架效应的核心发现。",
    };
  }, [gainChoice, lossChoice, bothFramesAnswered]);

  return (
    <div className="w-full">
      <div className="mb-4">
        <p className="text-fg-muted font-mono text-[10px] tracking-[0.42em] uppercase">
          framing effect demonstration
        </p>
        <h2 className="font-display text-fg-primary mt-1 text-lg font-semibold">
          决策框架效应
        </h2>
      </div>

      <div className="border-border-faint bg-bg-panel border p-6 backdrop-blur-md">
        <div className="mb-6">
          <h3 className="font-display text-fg-primary mb-1 text-base font-semibold">
            {SCENARIO.title}
            <span className="text-fg-muted ml-2 font-mono text-[11px] tracking-wider">
              {SCENARIO.titleEn}
            </span>
          </h3>
          <p className="text-fg-secondary text-sm leading-relaxed">
            {SCENARIO.description}
          </p>
        </div>

        <div className="mb-4 flex gap-2">
          {(["gain", "loss"] as const).map((frame) => {
            const isActive = currentFrame === frame;
            const isAnswered =
              frame === "gain" ? gainChoice !== null : lossChoice !== null;
            const color = frame === "gain" ? "#22c55e" : "#ef4444";

            return (
              <button
                key={frame}
                onClick={() => handleFrameSwitch(frame)}
                className={`flex items-center gap-2 border px-4 py-2 font-mono text-[11px] tracking-[0.18em] uppercase transition-all ${
                  isActive
                    ? "bg-white/5"
                    : "border-border-faint hover:border-fg-disabled/30"
                }`}
                style={{
                  borderColor: isActive ? hexToRgba(color, 0.5) : undefined,
                  color: isActive ? color : "var(--color-fg-muted)",
                }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: isAnswered ? color : "rgba(255,255,255,0.1)",
                  }}
                />
                {frame === "gain" ? "获益框架" : "损失框架"}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentFrame}
            initial={{ opacity: 0, x: currentFrame === "gain" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: currentFrame === "gain" ? 20 : -20 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: PRODUCT_EASE }}
          >
            <div className="mb-3">
              <p
                className="font-mono text-[10px] tracking-[0.22em] uppercase"
                style={{ color: currentFrame === "gain" ? "#22c55e" : "#ef4444" }}
              >
                {currentFrame === "gain"
                  ? "如果采用此方案，结果将是…"
                  : "如果采用此方案，结果将是…"}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <OptionCard
                option={
                  currentFrame === "gain"
                    ? SCENARIO.gainFrame.optionA
                    : SCENARIO.lossFrame.optionA
                }
                frame={currentFrame}
                isSelected={currentChoice === "A"}
                onSelect={() => setCurrentChoice("A")}
                delay={0}
              />
              <OptionCard
                option={
                  currentFrame === "gain"
                    ? SCENARIO.gainFrame.optionB
                    : SCENARIO.lossFrame.optionB
                }
                frame={currentFrame}
                isSelected={currentChoice === "B"}
                onSelect={() => setCurrentChoice("B")}
                delay={0.1}
              />
            </div>

            {currentChoice && (
              <ResultComparison
                frame={currentFrame}
                userChoice={currentChoice}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {bothFramesAnswered && !showBothResults && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: PRODUCT_EASE }}
            className="mt-4 text-center"
          >
            <button
              onClick={handleShowResults}
              className="border-accent-purple/40 text-accent-purple hover:bg-accent-purple/10 border px-6 py-2.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors"
            >
              查看对比分析
            </button>
          </motion.div>
        )}

        <AnimatePresence>
          {showBothResults && framingEffect && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: reduce ? 0 : 0.4, ease: PRODUCT_EASE }}
              className="overflow-hidden"
            >
              <div className="border-accent-purple/20 bg-accent-purple/5 mt-6 border p-5">
                <h4 className="text-fg-primary mb-3 font-mono text-[11px] tracking-[0.22em] uppercase">
                  框架效应对比
                </h4>

                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div className="border-border-faint bg-bg-near border p-3">
                    <p className="mb-1 font-mono text-[10px] tracking-[0.18em]" style={{ color: "#22c55e" }}>
                      获益框架
                    </p>
                    <p className="text-fg-primary text-sm font-medium">
                      你选择了{" "}
                      {gainChoice === "A" ? "确定救 200 人" : "冒险赌一把"}
                    </p>
                  </div>
                  <div className="border-border-faint bg-bg-near border p-3">
                    <p className="mb-1 font-mono text-[10px] tracking-[0.18em]" style={{ color: "#ef4444" }}>
                      损失框架
                    </p>
                    <p className="text-fg-primary text-sm font-medium">
                      你选择了{" "}
                      {lossChoice === "A" ? "确定死 400 人" : "冒险赌一把"}
                    </p>
                  </div>
                </div>

                <div
                  className={`mb-4 border-l-2 py-2 pl-3 text-sm leading-relaxed ${
                    framingEffect.consistent
                      ? "border-success/50"
                      : "border-warning/50"
                  }`}
                  style={{ color: "var(--color-fg-secondary)" }}
                >
                  {framingEffect.message}
                </div>

                <div className="border-border-faint border-t pt-3">
                  <h5 className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.22em] uppercase">
                    核心发现
                  </h5>
                  <p className="text-fg-secondary text-sm leading-relaxed">
                    注意这两个问题的<strong className="text-fg-primary">期望值完全相同</strong>
                    ：确定救 200 人 = 确定死 400 人（因为总共 600 人）。
                    但当信息以&ldquo;获益&rdquo;（存活人数）方式呈现时，人们倾向于规避风险；
                    以&ldquo;损失&rdquo;（死亡人数）方式呈现时，人们倾向于冒险。
                    这说明<strong className="text-fg-primary">人类并非理性决策者——我们的选择取决于问题如何被&ldquo;框架&rdquo;</strong>。
                  </p>
                </div>
              </div>

              <div className="border-border-faint mt-4 border-t pt-4">
                <h4 className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.22em] uppercase">
                  理论背景
                </h4>
                <p className="text-fg-secondary text-sm leading-relaxed">
                  <strong className="text-fg-primary">前景理论</strong>
                  （Prospect Theory, Kahneman & Tversky, 1979）揭示了人类决策中的
                  两个关键特征：<strong className="text-fg-primary">损失厌恶</strong>
                  （损失的痛苦约是同等收益快乐的 2 倍）和
                  <strong className="text-fg-primary">参考点依赖</strong>
                  （决策基于变化而非绝对水平）。
                  框架效应在医学决策、法律判决和商业谈判中有深远影响。
                </p>
              </div>

              <div className="mt-4 text-center">
                <button
                  onClick={handleReset}
                  className="border-border-faint text-fg-muted hover:text-fg-primary hover:border-fg-disabled/50 border px-6 py-2.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors"
                >
                  重新测试
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="border-border-faint mt-6 border-t pt-4 text-center">
          <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
            {SCENARIO.reference}
          </span>
        </div>
      </div>
    </div>
  );
}
