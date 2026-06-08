'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Parameters {
  hunger: number;
  distanceDiff: number;
  qualityDiff: number;
}

export default function BuridansAss() {
  const [params, setParams] = useState<Parameters>({
    hunger: 50,
    distanceDiff: 0,
    qualityDiff: 0,
  });
  const [chosen, setChosen] = useState<'left' | 'right' | 'starved' | null>(null);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  const decision = useMemo(() => {
    const totalDiff = Math.abs(params.distanceDiff) + Math.abs(params.qualityDiff);
    if (totalDiff < 5) return 'starved' as const;
    const leftScore = (100 - params.distanceDiff) + (100 - params.qualityDiff);
    const rightScore = (100 + params.distanceDiff) + (100 + params.qualityDiff);
    return leftScore > rightScore ? 'left' as const : 'right' as const;
  }, [params]);

  const handleDecide = () => {
    setAnimating(true);
    timerRef.current = setTimeout(() => {
      setChosen(decision);
      setAnimating(false);
    }, 1200);
  };

  const handleReset = () => {
    setChosen(null);
    setAnimating(false);
  };

  const donkeyX = 250;
  const donkeyY = 120;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative overflow-hidden rounded-lg border border-[var(--color-border-faint)] bg-[var(--color-bg-panel)] p-6">
        <div className="relative h-56 w-full sm:h-64">
          <svg viewBox="0 0 500 240" className="h-full w-full">
            <motion.g
              animate={
                chosen === 'left'
                  ? { x: -80, y: -10 }
                  : chosen === 'right'
                    ? { x: 80, y: -10 }
                    : chosen === 'starved'
                      ? { y: 15, opacity: 0.3 }
                      : {}
              }
              transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <ellipse cx={donkeyX} cy={donkeyY + 30} rx="20" ry="12" fill="var(--color-fg-muted)" opacity="0.3" />
              <ellipse cx={donkeyX} cy={donkeyY} rx="18" ry="14" fill="var(--color-fg-muted)" />
              <circle cx={donkeyX} cy={donkeyY - 18} r="10" fill="var(--color-fg-muted)" />
              <ellipse cx={donkeyX} cy={donkeyY - 24} rx="12" ry="6" fill="var(--color-fg-muted)" />
              <circle cx={donkeyX - 4} cy={donkeyY - 20} r="1.5" fill="var(--color-bg-deep)" />
              <circle cx={donkeyX + 4} cy={donkeyY - 20} r="1.5" fill="var(--color-bg-deep)" />
              <line x1={donkeyX - 8} y1={donkeyY + 14} x2={donkeyX - 10} y2={donkeyY + 35} stroke="var(--color-fg-disabled)" strokeWidth="2" />
              <line x1={donkeyX + 8} y1={donkeyY + 14} x2={donkeyX + 10} y2={donkeyY + 35} stroke="var(--color-fg-disabled)" strokeWidth="2" />
              <line x1={donkeyX - 14} y1={donkeyY + 14} x2={donkeyX - 16} y2={donkeyY + 35} stroke="var(--color-fg-disabled)" strokeWidth="2" />
              <line x1={donkeyX + 14} y1={donkeyY + 14} x2={donkeyX + 16} y2={donkeyY + 35} stroke="var(--color-fg-disabled)" strokeWidth="2" />

              {chosen === 'starved' && (
                <motion.text
                  x={donkeyX}
                  y={donkeyY - 40}
                  textAnchor="middle"
                  fill="var(--color-danger)"
                  fontSize="14"
                  fontFamily="var(--font-mono)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  ?
                </motion.text>
              )}
            </motion.g>

            <motion.g animate={{ opacity: chosen === 'starved' ? 0.3 : 1 }}>
              <rect x="60" y="80" width="40" height="30" rx="4" fill="var(--color-accent-gold)" opacity="0.6" />
              <text x="80" y="100" textAnchor="middle" fill="var(--color-bg-deep)" fontSize="9" fontFamily="var(--font-mono)">干草</text>
              <text x="80" y="125" textAnchor="middle" fill="var(--color-fg-muted)" fontSize="8" fontFamily="var(--font-mono)">
                {50 + params.distanceDiff}%距离
              </text>
            </motion.g>

            <motion.g animate={{ opacity: chosen === 'starved' ? 0.3 : 1 }}>
              <rect x="400" y="80" width="40" height="30" rx="4" fill="var(--color-accent-gold)" opacity="0.6" />
              <text x="420" y="100" textAnchor="middle" fill="var(--color-bg-deep)" fontSize="9" fontFamily="var(--font-mono)">干草</text>
              <text x="420" y="125" textAnchor="middle" fill="var(--color-fg-muted)" fontSize="8" fontFamily="var(--font-mono)">
                {50 - params.distanceDiff}%距离
              </text>
            </motion.g>

            <text x="250" y="215" textAnchor="middle" fill="var(--color-fg-disabled)" fontSize="10" fontFamily="var(--font-display)" fontStyle="italic">
              布里丹之驴 · Buridan&apos;s Ass
            </text>
          </svg>
        </div>

        <div className="mt-4 space-y-3">
          {([
            { key: 'hunger' as const, label: '饥饿程度', color: 'var(--color-warning)' },
            { key: 'distanceDiff' as const, label: '距离差异（负=左近，正=右近）', color: 'var(--color-accent-sage)' },
            { key: 'qualityDiff' as const, label: '质量差异（负=左好，正=右好）', color: 'var(--color-accent-gold)' },
          ]).map(({ key, label, color }) => (
            <label key={key} className="block">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[var(--color-fg-muted)]">{label}</span>
                <span className="font-mono text-xs" style={{ color }}>{params[key]}</span>
              </div>
              <input
                type="range"
                min={key === 'hunger' ? 0 : -50}
                max={key === 'hunger' ? 100 : 50}
                value={params[key]}
                onChange={(e) => setParams({ ...params, [key]: Number(e.target.value) })}
                className="touch-target mt-1 h-2 w-full cursor-pointer appearance-none rounded-full bg-[var(--color-bg-deep)] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--color-accent-gold)]"
              />
            </label>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {chosen === null ? (
            <motion.div key="action" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <button
                onClick={handleDecide}
                disabled={animating}
                className="touch-target mt-4 w-full cursor-pointer border border-[var(--color-accent-gold)] bg-[var(--color-accent-gold)]/10 px-5 py-3 font-mono text-sm tracking-wide text-[var(--color-accent-gold)] transition-colors hover:bg-[var(--color-accent-gold)]/20 disabled:opacity-50"
              >
                {animating ? '思考中...' : '让驴做决定'}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 space-y-3"
            >
              <div className="border-l-2 border-[var(--color-accent-gold)] pl-4">
                <p className="font-display text-lg text-[var(--color-fg-primary)]">
                  {chosen === 'starved'
                    ? '驴无法做出决定，最终饿死了。'
                    : `驴走向了${chosen === 'left' ? '左边' : '右边'}的干草。`}
                </p>
                <p className="mt-1 text-sm text-[var(--color-fg-secondary)]">
                  {chosen === 'starved'
                    ? '两个选项完全相同时，纯粹理性的agent无法做出选择。这说明了决定论的局限。'
                    : '即使微小的差异也足以打破对称，让理性做出决定。'}
                </p>
              </div>

              <button
                onClick={handleReset}
                className="touch-target cursor-pointer border border-[var(--color-border-faint)] bg-[var(--color-bg-panel)] px-4 py-2 font-mono text-xs tracking-wider text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-fg-disabled)] hover:text-[var(--color-fg-secondary)]"
              >
                重试
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-4 text-xs text-[var(--color-fg-muted)]">
          让·布里丹（Jean Buridan）提出：一头理性的驴在两堆完全相同的干草之间会因无法选择而饿死。
          这挑战了纯粹理性决策的可行性。
        </p>
      </div>
    </div>
  );
}
