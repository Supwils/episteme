'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STUDY_RESULTS = {
  pull: 68,
  dontPull: 32,
};

type Choice = 'pull' | 'dontPull' | null;

export default function TrolleyProblem() {
  const [choice, setChoice] = useState<Choice>(null);
  const [leverPulled, setLeverPulled] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  const handlePull = () => {
    setLeverPulled(true);
    timerRef.current = setTimeout(() => setChoice('pull'), 600);
  };

  const handleDontPull = () => {
    setChoice('dontPull');
  };

  const handleReset = () => {
    setChoice(null);
    setLeverPulled(false);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative overflow-hidden rounded-lg border border-[var(--color-border-faint)] bg-[var(--color-bg-panel)] p-6">
        <div className="relative h-72 w-full sm:h-80">
          <svg viewBox="0 0 500 280" className="h-full w-full">
            <line x1="80" y1="220" x2="420" y2="220" stroke="var(--color-fg-disabled)" strokeWidth="3" />
            <line x1="80" y1="200" x2="80" y2="240" stroke="var(--color-fg-disabled)" strokeWidth="2" />
            <line x1="250" y1="200" x2="250" y2="240" stroke="var(--color-fg-disabled)" strokeWidth="2" />
            <line x1="420" y1="200" x2="420" y2="240" stroke="var(--color-fg-disabled)" strokeWidth="2" />

            <AnimatePresence>
              {!leverPulled && (
                <motion.g exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <line x1="250" y1="220" x2="250" y2="140" stroke="var(--color-accent-gold)" strokeWidth="3" />
                  <line x1="250" y1="140" x2="210" y2="120" stroke="var(--color-accent-gold)" strokeWidth="3" />
                  <circle cx="210" cy="120" r="6" fill="var(--color-accent-gold)" />
                </motion.g>
              )}
            </AnimatePresence>

            <motion.g
              initial={{ x: 0 }}
              animate={{ x: leverPulled ? 0 : 0 }}
            >
              <rect x="300" y="190" width="50" height="30" rx="2" fill="var(--color-fg-muted)" opacity="0.6" />
              <text x="325" y="209" textAnchor="middle" fill="var(--color-fg-primary)" fontSize="10" fontFamily="var(--font-mono)">
                TROLLEY
              </text>
            </motion.g>

            <g>
              <circle cx="90" cy="180" r="8" fill="var(--color-accent-sage)" />
              <line x1="90" y1="188" x2="90" y2="210" stroke="var(--color-accent-sage)" strokeWidth="2" />
              <line x1="90" y1="195" x2="80" y2="205" stroke="var(--color-accent-sage)" strokeWidth="2" />
              <line x1="90" y1="195" x2="100" y2="205" stroke="var(--color-accent-sage)" strokeWidth="2" />
              <text x="90" y="170" textAnchor="middle" fill="var(--color-accent-sage)" fontSize="9" fontFamily="var(--font-mono)">1人</text>
            </g>

            <g>
              {[260, 280, 300, 320, 340].map((x, i) => (
                <g key={i}>
                  <circle cx={x} cy="180" r="8" fill="var(--color-danger)" />
                  <line x1={x} y1="188" x2={x} y2="210" stroke="var(--color-danger)" strokeWidth="2" />
                  <line x1={x} y1="195" x2={x - 10} y2="205" stroke="var(--color-danger)" strokeWidth="2" />
                  <line x1={x} y1="195" x2={x + 10} y2="205" stroke="var(--color-danger)" strokeWidth="2" />
                </g>
              ))}
              <text x="300" y="170" textAnchor="middle" fill="var(--color-danger)" fontSize="9" fontFamily="var(--font-mono)">5人</text>
            </g>

            {choice === 'pull' && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <line x1="85" y1="180" x2="110" y2="180" stroke="var(--color-danger)" strokeWidth="2" strokeDasharray="4 2" />
                <text x="90" y="250" textAnchor="middle" fill="var(--color-danger)" fontSize="11" fontFamily="var(--font-mono)">✕</text>
              </motion.g>
            )}

            {choice === 'dontPull' && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {[260, 280, 300, 320, 340].map((x, i) => (
                  <text key={i} x={x} y="250" textAnchor="middle" fill="var(--color-danger)" fontSize="11" fontFamily="var(--font-mono)">✕</text>
                ))}
              </motion.g>
            )}
          </svg>
        </div>

        <AnimatePresence mode="wait">
          {choice === null ? (
            <motion.div
              key="choices"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 flex flex-col gap-3 sm:flex-row"
            >
              <button
                onClick={handlePull}
                className="touch-target flex-1 cursor-pointer border border-[var(--color-accent-gold)] bg-[var(--color-accent-gold)]/10 px-5 py-3 font-mono text-sm tracking-wide text-[var(--color-accent-gold)] transition-colors hover:bg-[var(--color-accent-gold)]/20"
              >
                拉动杠杆
              </button>
              <button
                onClick={handleDontPull}
                className="touch-target flex-1 cursor-pointer border border-[var(--color-fg-disabled)] bg-[var(--color-bg-elevated)] px-5 py-3 font-mono text-sm tracking-wide text-[var(--color-fg-secondary)] transition-colors hover:border-[var(--color-fg-muted)]"
              >
                不拉杠杆
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 space-y-4"
            >
              <div className="border-l-2 border-[var(--color-accent-gold)] pl-4">
                <p className="font-display text-lg text-[var(--color-fg-primary)]">
                  {choice === 'pull' ? '你拉动了杠杆。' : '你没有拉动杠杆。'}
                </p>
                <p className="mt-1 text-sm text-[var(--color-fg-secondary)]">
                  {choice === 'pull'
                    ? '电车转向侧轨，1人死亡，5人获救。你的行为直接导致了那1人的死亡。'
                    : '电车继续前行，5人死亡。你选择不干预，那1人安然无恙。'}
                </p>
              </div>

              <div className="rounded-lg border border-[var(--color-border-faint)] bg-[var(--color-bg-elevated)] p-4">
                <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-[var(--color-accent-gold)] uppercase">
                  调查数据 · Survey Results
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-20 text-right font-mono text-xs text-[var(--color-fg-muted)]">拉动</span>
                    <div className="flex-1 h-5 overflow-hidden rounded-sm bg-[var(--color-bg-deep)]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${STUDY_RESULTS.pull}%` }}
                        transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
                        className="h-full bg-[var(--color-accent-gold)]"
                      />
                    </div>
                    <span className="w-10 font-mono text-xs text-[var(--color-fg-primary)]">{STUDY_RESULTS.pull}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-20 text-right font-mono text-xs text-[var(--color-fg-muted)]">不拉</span>
                    <div className="flex-1 h-5 overflow-hidden rounded-sm bg-[var(--color-bg-deep)]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${STUDY_RESULTS.dontPull}%` }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
                        className="h-full bg-[var(--color-fg-muted)]"
                      />
                    </div>
                    <span className="w-10 font-mono text-xs text-[var(--color-fg-primary)]">{STUDY_RESULTS.dontPull}%</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-[var(--color-fg-muted)]">
                  基于哲学课堂调查（Foot, 1967; Hauser et al., 2007）
                </p>
              </div>

              <button
                onClick={handleReset}
                className="touch-target cursor-pointer border border-[var(--color-border-faint)] bg-[var(--color-bg-panel)] px-4 py-2 font-mono text-xs tracking-wider text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-fg-disabled)] hover:text-[var(--color-fg-secondary)]"
              >
                重新选择
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
