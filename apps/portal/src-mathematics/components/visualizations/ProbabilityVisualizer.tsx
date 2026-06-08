'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type SimType = 'coin' | 'dice' | 'card';

const SIM_CONFIGS: Record<SimType, { label: string; labelEn: string; outcomes: string[]; theoretical: number[]; colors: string[] }> = {
  coin: {
    label: '抛硬币',
    labelEn: 'Coin Flip',
    outcomes: ['正面', '反面'],
    theoretical: [0.5, 0.5],
    colors: ['#61afef', '#e06c75'],
  },
  dice: {
    label: '掷骰子',
    labelEn: 'Dice Roll',
    outcomes: ['1', '2', '3', '4', '5', '6'],
    theoretical: [1 / 6, 1 / 6, 1 / 6, 1 / 6, 1 / 6, 1 / 6],
    colors: ['#61afef', '#e06c75', '#98c379', '#e5c07b', '#c678dd', '#56b6c2'],
  },
  card: {
    label: '抽牌',
    labelEn: 'Card Draw',
    outcomes: ['红心', '黑桃', '方块', '梅花'],
    theoretical: [0.25, 0.25, 0.25, 0.25],
    colors: ['#e06c75', '#61afef', '#e5c07b', '#98c379'],
  },
};

const SVG_W = 500;
const SVG_H = 300;
const BAR_W = 400;
const BAR_H = 200;
const BAR_X = 50;
const BAR_Y = 30;

function simulate(type: SimType): number {
  if (type === 'coin') return Math.random() < 0.5 ? 0 : 1;
  if (type === 'dice') return Math.floor(Math.random() * 6);
  return Math.floor(Math.random() * 4);
}

export default function ProbabilityVisualizer() {
  const [simType, setSimType] = useState<SimType>('coin');
  const [counts, setCounts] = useState<number[]>([]);
  const [totalTrials, setTotalTrials] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const config = SIM_CONFIGS[simType];

  useEffect(() => {
    setCounts(new Array(config.outcomes.length).fill(0));
    setTotalTrials(0);
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [simType, config.outcomes.length]);

  const runTrials = useCallback(
    (n: number) => {
      setCounts((prev) => {
        const next = [...prev];
        for (let i = 0; i < n; i++) {
          const result = simulate(simType);
          next[result] = (next[result] ?? 0) + 1;
        }
        return next;
      });
      setTotalTrials((p) => p + n);
    },
    [simType],
  );

  const handleSingleTrial = useCallback(() => {
    runTrials(1);
  }, [runTrials]);

  const handleBatch = useCallback(
    (n: number) => {
      runTrials(n);
    },
    [runTrials],
  );

  const handleAutoRun = useCallback(() => {
    if (isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsRunning(false);
      return;
    }
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      runTrials(10);
    }, 50);
  }, [isRunning, runTrials]);

  const handleReset = useCallback(() => {
    setCounts(new Array(config.outcomes.length).fill(0));
    setTotalTrials(0);
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [config.outcomes.length]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const experimental = counts.map((c) => (totalTrials > 0 ? c / totalTrials : 0));
  const maxProb = Math.max(...config.theoretical, ...experimental, 0.01);

  const barGroupW = BAR_W / config.outcomes.length;
  const barMaxH = BAR_H - 20;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="border-border-faint bg-bg-panel rounded-lg border p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {(Object.keys(SIM_CONFIGS) as SimType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSimType(type)}
              className={`cursor-pointer border px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] transition-all ${
                simType === type
                  ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-400'
                  : 'border-border-faint text-fg-secondary hover:border-fg-disabled/30'
              }`}
            >
              {SIM_CONFIGS[type].label}
            </button>
          ))}
        </div>

        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="h-auto w-full" style={{ maxHeight: 280 }}>
          <line x1={BAR_X} y1={BAR_Y + barMaxH} x2={BAR_X + BAR_W} y2={BAR_Y + barMaxH} stroke="var(--color-border-faint)" strokeWidth="1" />

          {config.outcomes.map((outcome, i) => {
            const x = BAR_X + i * barGroupW + barGroupW * 0.15;
            const w = barGroupW * 0.3;
            const theoH = (config.theoretical[i]! / maxProb) * barMaxH;
            const expH = (experimental[i]! / maxProb) * barMaxH;

            return (
              <g key={i}>
                <rect
                  x={x}
                  y={BAR_Y + barMaxH - theoH}
                  width={w}
                  height={theoH}
                  fill={config.colors[i]}
                  fillOpacity="0.2"
                  stroke={config.colors[i]}
                  strokeWidth="1"
                  strokeOpacity="0.4"
                  rx="2"
                />
                <motion.rect
                  x={x + w + 4}
                  width={w}
                  rx="2"
                  fill={config.colors[i]}
                  fillOpacity="0.6"
                  animate={{
                    y: BAR_Y + barMaxH - expH,
                    height: Math.max(expH, 0),
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                />
                <text
                  x={x + w + 2}
                  y={BAR_Y + barMaxH + 14}
                  textAnchor="middle"
                  fill="var(--color-fg-muted)"
                  fontSize="10"
                  fontFamily="var(--font-sans)"
                  className="pointer-events-none select-none"
                >
                  {outcome}
                </text>
                {totalTrials > 0 && (
                  <text
                    x={x + w + 2}
                    y={BAR_Y + barMaxH + 26}
                    textAnchor="middle"
                    fill="var(--color-fg-disabled)"
                    fontSize="8"
                    fontFamily="var(--font-mono)"
                    className="pointer-events-none select-none"
                  >
                    {(experimental[i]! * 100).toFixed(1)}%
                  </text>
                )}
              </g>
            );
          })}

          {Array.from({ length: 5 }, (_, i) => {
            const prob = (maxProb / 4) * i;
            const y = BAR_Y + barMaxH - (prob / maxProb) * barMaxH;
            return (
              <g key={`grid-${i}`}>
                <line x1={BAR_X} y1={y} x2={BAR_X + BAR_W} y2={y} stroke="var(--color-border-faint)" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.3" />
                <text x={BAR_X - 4} y={y + 3} textAnchor="end" fill="var(--color-fg-disabled)" fontSize="8" fontFamily="var(--font-mono)">
                  {(prob * 100).toFixed(0)}%
                </text>
              </g>
            );
          })}

          <g transform={`translate(${BAR_X + BAR_W - 120}, ${BAR_Y})`}>
            <rect x="0" y="0" width="8" height="8" fill="var(--color-fg-disabled)" fillOpacity="0.2" stroke="var(--color-fg-disabled)" strokeWidth="0.5" rx="1" />
            <text x="12" y="7" fill="var(--color-fg-disabled)" fontSize="8" fontFamily="var(--font-mono)">理论</text>
            <rect x="50" y="0" width="8" height="8" fill="var(--color-fg-disabled)" fillOpacity="0.5" rx="1" />
            <text x="62" y="7" fill="var(--color-fg-disabled)" fontSize="8" fontFamily="var(--font-mono)">实验</text>
          </g>
        </svg>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleSingleTrial}
            className="cursor-pointer border border-border-faint px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-fg-secondary transition-all hover:border-fg-disabled/30"
          >
            1 次
          </button>
          {[10, 100, 1000].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => handleBatch(n)}
              className="cursor-pointer border border-border-faint px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-fg-secondary transition-all hover:border-fg-disabled/30"
            >
              {n} 次
            </button>
          ))}
          <button
            type="button"
            onClick={handleAutoRun}
            className={`cursor-pointer border px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] transition-all ${
              isRunning
                ? 'border-red-500/50 bg-red-500/10 text-red-400'
                : 'border-indigo-500/50 bg-indigo-500/10 text-indigo-400'
            }`}
          >
            {isRunning ? '停止' : '自动运行'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="cursor-pointer border border-border-faint px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-fg-secondary transition-all hover:border-fg-disabled/30"
          >
            重置
          </button>
        </div>

        <div className="border-border-faint bg-bg-elevated mt-4 grid grid-cols-2 gap-4 rounded border p-4 sm:grid-cols-4">
          <div>
            <p className="text-fg-disabled font-mono text-[9px] tracking-[0.12em] uppercase">总试验</p>
            <p className="text-fg-primary font-mono text-lg font-semibold">{totalTrials.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-fg-disabled font-mono text-[9px] tracking-[0.12em] uppercase">最大偏差</p>
            <p className="font-mono text-lg font-semibold text-amber-400">
              {totalTrials > 0
                ? `${(Math.max(...config.theoretical.map((t, i) => Math.abs((experimental[i] ?? 0) - t))) * 100).toFixed(2)}%`
                : '—'}
            </p>
          </div>
          <div>
            <p className="text-fg-disabled font-mono text-[9px] tracking-[0.12em] uppercase">理论概率</p>
            <p className="text-fg-secondary font-mono text-sm">
              {config.theoretical.map((t) => `${(t * 100).toFixed(1)}%`).join(' / ')}
            </p>
          </div>
          <div>
            <p className="text-fg-disabled font-mono text-[9px] tracking-[0.12em] uppercase">大数定律</p>
            <p className="text-fg-secondary text-sm leading-snug">
              {totalTrials < 50 ? '样本太少' : totalTrials < 500 ? '开始收敛' : totalTrials < 5000 ? '较好收敛' : '高度收敛'}
            </p>
          </div>
        </div>

        <div className="border-accent-indigo/20 bg-accent-indigo/5 mt-4 rounded border p-3">
          <p className="text-accent-indigo font-mono text-[9px] tracking-[0.18em] uppercase">大数定律 Law of Large Numbers</p>
          <p className="text-fg-secondary mt-1 text-[12px] leading-relaxed">
            随着试验次数增加，实验概率趋向理论概率。试试点击&ldquo;自动运行&rdquo;观察收敛过程。
          </p>
        </div>
      </div>
    </div>
  );
}
