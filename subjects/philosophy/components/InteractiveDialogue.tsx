'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type DialogueStep = {
  speaker: string;
  text: string;
  argument: string;
};

type InteractiveDialogueProps = {
  participants: { name: string; color: string }[];
  steps: DialogueStep[];
  question: string;
};

function SpeakerAvatar({ name, color }: { name: string; color: string }) {
  const initial = name.charAt(0);
  return (
    <div
      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border font-mono text-sm font-semibold"
      style={{ borderColor: `${color}60`, color, backgroundColor: `${color}12` }}
      aria-hidden
    >
      {initial}
    </div>
  );
}

function ArgumentBadge({ label }: { label: string }) {
  return (
    <span className="mt-1 inline-block border border-border-faint bg-bg-elevated px-2 py-0.5 font-mono text-[9px] tracking-[0.22em] text-fg-muted uppercase">
      {label}
    </span>
  );
}

export default function InteractiveDialogue({
  participants,
  steps,
  question,
}: InteractiveDialogueProps) {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const stepVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: prefersReduced ? 0 : 16 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: prefersReduced ? 0 : -8 },
    }),
    [prefersReduced],
  );

  const transition = useMemo(
    () =>
      prefersReduced
        ? { duration: 0 }
        : { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] as const },
    [prefersReduced],
  );

  const [revealed, setRevealed] = useState(0);
  const isComplete = revealed >= steps.length;

  const participantColorMap = new Map(
    participants.map((p) => [p.name, p.color]),
  );

  const handleNext = useCallback(() => {
    setRevealed((prev) => Math.min(prev + 1, steps.length));
  }, [steps.length]);

  const handleReset = useCallback(() => {
    setRevealed(0);
  }, []);

  const handleRevealAll = useCallback(() => {
    setRevealed(steps.length);
  }, [steps.length]);

  const visibleSteps = steps.slice(0, revealed);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="border border-border-faint bg-bg-panel p-6 sm:p-8">
        <div className="mb-8 border-l-2 border-accent-gold pl-5">
          <p className="font-mono text-[10px] tracking-[0.22em] text-accent-gold uppercase">
            核心问题
          </p>
          <p className="font-display text-fg-primary mt-2 text-xl leading-relaxed font-medium">
            {question}
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          {participants.map((p) => (
            <div key={p.name} className="flex items-center gap-2">
              <SpeakerAvatar name={p.name} color={p.color} />
              <span className="text-fg-secondary font-mono text-xs tracking-wide">
                {p.name}
              </span>
            </div>
          ))}
        </div>

        <div className="relative min-h-[200px]">
          <div className="absolute top-0 left-[18px] h-full w-px bg-border-faint" aria-hidden />

          <AnimatePresence initial={false}>
            {visibleSteps.map((step, i) => {
              const color = participantColorMap.get(step.speaker) ?? '#c8a45a';
              return (
                <motion.div
                  key={i}
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={transition}
                  className="relative mb-6 pl-12"
                >
                  <div className="absolute left-0 top-0.5">
                    <SpeakerAvatar name={step.speaker} color={color} />
                  </div>

                  <div className="border border-border-faint bg-bg-elevated p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className="font-mono text-xs font-semibold tracking-wide"
                        style={{ color }}
                      >
                        {step.speaker}
                      </span>
                      <ArgumentBadge label={`论证 ${i + 1}/${steps.length}`} />
                    </div>

                    <p className="text-fg-secondary text-sm leading-[1.85]">
                      {step.text}
                    </p>

                    <div
                      className="mt-3 border-t border-border-faint pt-3"
                    >
                      <p className="font-mono text-[9px] tracking-[0.18em] text-fg-disabled uppercase">
                        逻辑结构
                      </p>
                      <p
                        className="text-fg-primary mt-1 border-l-2 pl-3 text-sm leading-relaxed italic"
                        style={{ borderColor: color }}
                      >
                        {step.argument}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key="controls"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              className="mt-4 flex items-center gap-3"
            >
              <button
                onClick={handleNext}
                className="touch-target cursor-pointer border border-accent-gold bg-accent-gold/10 px-6 py-3 font-mono text-sm tracking-wide text-accent-gold transition-colors hover:bg-accent-gold/20"
              >
                下一步
              </button>
              {revealed > 0 && (
                <button
                  onClick={handleRevealAll}
                  className="touch-target cursor-pointer border border-border-faint bg-bg-elevated px-4 py-3 font-mono text-xs tracking-wider text-fg-muted transition-colors hover:border-fg-disabled hover:text-fg-secondary"
                >
                  全部展开
                </button>
              )}
              <span className="ml-auto font-mono text-[10px] tracking-[0.22em] text-fg-disabled">
                {revealed}/{steps.length}
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
              className="mt-8 border border-border-faint bg-bg-elevated p-6"
            >
              <h3 className="font-mono text-[10px] tracking-[0.3em] text-accent-gold uppercase">
                论证概要
              </h3>
              <div className="mt-4 space-y-4">
                {participants.map((p) => {
                  const speakerSteps = steps.filter(
                    (s) => s.speaker === p.name,
                  );
                  if (speakerSteps.length === 0) return null;
                  return (
                    <div key={p.name} className="flex gap-3">
                      <div
                        className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: p.color }}
                      />
                      <div>
                        <span
                          className="font-mono text-xs font-semibold"
                          style={{ color: p.color }}
                        >
                          {p.name}
                        </span>
                        <p className="text-fg-muted mt-0.5 text-sm leading-relaxed">
                          {speakerSteps[speakerSteps.length - 1]?.argument}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-border-faint" />
                <span className="font-mono text-[9px] tracking-[0.22em] text-fg-disabled uppercase">
                  对话结束
                </span>
                <div className="h-px flex-1 bg-border-faint" />
              </div>

              <button
                onClick={handleReset}
                className="touch-target mt-4 cursor-pointer border border-border-faint bg-bg-panel px-4 py-2 font-mono text-xs tracking-wider text-fg-muted transition-colors hover:border-fg-disabled hover:text-fg-secondary"
              >
                重新阅读
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
