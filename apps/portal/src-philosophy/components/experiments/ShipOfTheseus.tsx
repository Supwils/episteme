'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Plank {
  id: number;
  original: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
}

function createInitialPlanks(): Plank[] {
  const planks: Plank[] = [];
  const rows = 4;
  const cols = 5;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      planks.push({
        id: r * cols + c,
        original: true,
        x: 120 + c * 52,
        y: 60 + r * 28,
        width: 48,
        height: 24,
      });
    }
  }
  return planks;
}

export default function ShipOfTheseus() {
  const [planks, setPlanks] = useState<Plank[]>(createInitialPlanks);
  const [replacedCount, setReplacedCount] = useState(0);
  const totalPlanks = planks.length;
  const originalCount = planks.filter((p) => p.original).length;

  const handlePlankClick = (id: number) => {
    setPlanks((prev) =>
      prev.map((p) => (p.id === id && p.original ? { ...p, original: false } : p)),
    );
    setReplacedCount((c) => c + 1);
  };

  const handleReset = () => {
    setPlanks(createInitialPlanks());
    setReplacedCount(0);
  };

  const replaceAllAtOnce = () => {
    setPlanks((prev) => prev.map((p) => ({ ...p, original: false })));
    setReplacedCount(totalPlanks);
  };

  const identityPercent = Math.round((originalCount / totalPlanks) * 100);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative overflow-hidden rounded-lg border border-[var(--color-border-faint)] bg-[var(--color-bg-panel)] p-6">
        <div className="relative h-56 w-full sm:h-64">
          <svg viewBox="0 0 500 240" className="h-full w-full">
            <path d="M 100 200 Q 250 230 400 200 L 380 180 Q 250 210 120 180 Z" fill="var(--color-bg-deep)" stroke="var(--color-fg-disabled)" strokeWidth="1.5" />
            <line x1="250" y1="180" x2="250" y2="30" stroke="var(--color-fg-disabled)" strokeWidth="2" />
            <path d="M 250 50 L 340 80 L 250 90 Z" fill="var(--color-bg-elevated)" stroke="var(--color-fg-muted)" strokeWidth="1" opacity="0.6" />

            {planks.map((plank, i) => (
              <motion.g
                key={plank.id}
                onClick={() => plank.original && handlePlankClick(plank.id)}
                style={{ cursor: plank.original ? 'pointer' : 'default' }}
                whileHover={plank.original ? { scale: 1.05 } : {}}
              >
                <motion.rect
                  x={plank.x}
                  y={plank.y}
                  width={plank.width}
                  height={plank.height}
                  rx={2}
                  animate={{
                    fill: plank.original ? 'var(--color-accent-sage)' : 'var(--color-accent-gold)',
                    opacity: plank.original ? 0.8 : 0.6,
                  }}
                  transition={{ duration: 0.3 }}
                  stroke={plank.original ? 'var(--color-accent-sage)' : 'var(--color-accent-gold)'}
                  strokeWidth={0.5}
                />
                {!plank.original && (
                  <motion.text
                    x={plank.x + plank.width / 2}
                    y={plank.y + plank.height / 2 + 3}
                    textAnchor="middle"
                    fill="var(--color-bg-deep)"
                    fontSize="8"
                    fontFamily="var(--font-mono)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    新
                  </motion.text>
                )}
              </motion.g>
            ))}

            <text x="250" y="235" textAnchor="middle" fill="var(--color-fg-disabled)" fontSize="10" fontFamily="var(--font-display)" fontStyle="italic">
              忒修斯之船 · Ship of Theseus
            </text>
          </svg>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-[var(--color-border-faint)] bg-[var(--color-bg-elevated)] p-3 text-center">
            <p className="font-display text-xl text-[var(--color-accent-sage)]">{originalCount}</p>
            <p className="font-mono text-[9px] text-[var(--color-fg-muted)]">原始木板</p>
          </div>
          <div className="rounded-lg border border-[var(--color-border-faint)] bg-[var(--color-bg-elevated)] p-3 text-center">
            <p className="font-display text-xl text-[var(--color-accent-gold)]">{replacedCount}</p>
            <p className="font-mono text-[9px] text-[var(--color-fg-muted)]">已替换</p>
          </div>
          <div className="rounded-lg border border-[var(--color-border-faint)] bg-[var(--color-bg-elevated)] p-3 text-center">
            <p className="font-display text-xl text-[var(--color-fg-primary)]">{identityPercent}%</p>
            <p className="font-mono text-[9px] text-[var(--color-fg-muted)]">同一性</p>
          </div>
        </div>

        <AnimatePresence>
          {replacedCount > 0 && replacedCount < totalPlanks && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4"
            >
              <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-bg-deep)]">
                <motion.div
                  className="h-full rounded-full"
                  animate={{ width: `${(replacedCount / totalPlanks) * 100}%` }}
                  style={{ backgroundColor: 'var(--color-accent-gold)' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="mt-2 text-xs text-[var(--color-fg-muted)]">
                {replacedCount === totalPlanks
                  ? '所有木板都已替换。这还是原来的船吗？'
                  : `点击绿色木板逐一替换。已替换 ${replacedCount}/${totalPlanks}。`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {replacedCount === totalPlanks && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 border-l-2 border-[var(--color-accent-gold)] pl-4 text-sm leading-relaxed text-[var(--color-fg-secondary)]"
          >
            <p>
              所有木板都已替换。如果这还是原来的船，那么<strong className="text-[var(--color-fg-primary)]">同一性</strong>由什么决定？
              如果不是，它从哪一块木板开始变成了新船？
            </p>
          </motion.div>
        )}

        <div className="mt-4 flex gap-3">
          <button
            onClick={handleReset}
            className="touch-target cursor-pointer border border-[var(--color-border-faint)] bg-[var(--color-bg-panel)] px-4 py-2 font-mono text-xs tracking-wider text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-fg-disabled)] hover:text-[var(--color-fg-secondary)]"
          >
            重置
          </button>
          <button
            onClick={replaceAllAtOnce}
            className="touch-target cursor-pointer border border-[var(--color-border-faint)] bg-[var(--color-bg-panel)] px-4 py-2 font-mono text-xs tracking-wider text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-fg-disabled)] hover:text-[var(--color-fg-secondary)]"
          >
            一次性全部替换
          </button>
        </div>
      </div>
    </div>
  );
}
