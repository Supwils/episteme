'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TradeOff {
  label: string;
  reality: number;
  simulation: number;
  description: string;
}

const TRADE_OFFS: TradeOff[] = [
  { label: '真实关系', reality: 90, simulation: 20, description: '机器中的人际关系都是程序模拟的。' },
  { label: '个人成就', reality: 85, simulation: 15, description: '你的所有成就都是预设的幻觉。' },
  { label: '快乐感受', reality: 40, simulation: 95, description: '机器能提供完美的愉悦体验。' },
  { label: '自由意志', reality: 80, simulation: 10, description: '在机器中，你的选择是被设计的。' },
  { label: '自我认知', reality: 70, simulation: 30, description: '你能真正了解自己吗？' },
];

export default function ExperienceMachine() {
  const [machinePercent, setMachinePercent] = useState(0);

  const getHappinessScore = () => Math.round(30 + (machinePercent / 100) * 65);
  const getAuthenticityScore = () => Math.round(80 - (machinePercent / 100) * 60);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative overflow-hidden rounded-lg border border-[var(--color-border-faint)] bg-[var(--color-bg-panel)] p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-[var(--color-border-faint)] bg-[var(--color-bg-elevated)] p-4 text-center">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-fg-muted)] uppercase">现实</p>
            <motion.div
              className="mt-2 text-3xl font-display"
              animate={{ opacity: machinePercent < 50 ? 1 : 0.4 }}
              style={{ color: 'var(--color-accent-sage)' }}
            >
              {100 - machinePercent}%
            </motion.div>
            <p className="mt-1 text-xs text-[var(--color-fg-muted)]">真实但不完美</p>
          </div>
          <div className="rounded-lg border border-[var(--color-border-faint)] bg-[var(--color-bg-elevated)] p-4 text-center">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-fg-muted)] uppercase">机器</p>
            <motion.div
              className="mt-2 text-3xl font-display"
              animate={{ opacity: machinePercent > 50 ? 1 : 0.4 }}
              style={{ color: 'var(--color-accent-gold)' }}
            >
              {machinePercent}%
            </motion.div>
            <p className="mt-1 text-xs text-[var(--color-fg-muted)]">完美但不真实</p>
          </div>
        </div>

        <div className="mt-6">
          <label className="block">
            <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-fg-muted)] uppercase">
              在体验机器中的时间
            </span>
            <div className="relative mt-3">
              <input
                type="range"
                min={0}
                max={100}
                value={machinePercent}
                onChange={(e) => setMachinePercent(Number(e.target.value))}
                className="touch-target h-2 w-full cursor-pointer appearance-none rounded-full bg-[var(--color-bg-deep)] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--color-accent-gold)]"
              />
            </div>
          </label>
          <div className="mt-2 flex justify-between font-mono text-[10px] text-[var(--color-fg-disabled)]">
            <span>完全真实</span>
            <span>完全虚拟</span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {TRADE_OFFS.map((item) => {
            const realityVal = Math.round(item.reality * ((100 - machinePercent) / 100) + item.reality * (machinePercent / 100) * 0.3);
            const simVal = Math.round(item.simulation * (machinePercent / 100) + item.simulation * ((100 - machinePercent) / 100) * 0.3);
            return (
              <div key={item.label}>
                <div className="flex items-center gap-3">
                  <span className="w-20 text-right font-mono text-xs text-[var(--color-fg-muted)]">{item.label}</span>
                  <div className="flex flex-1 gap-1">
                    <div className="flex-1 h-4 overflow-hidden rounded-sm bg-[var(--color-bg-deep)]">
                      <motion.div
                        className="h-full"
                        animate={{ width: `${realityVal}%` }}
                        transition={{ duration: 0.3 }}
                        style={{ backgroundColor: 'var(--color-accent-sage)' }}
                      />
                    </div>
                    <div className="flex-1 h-4 overflow-hidden rounded-sm bg-[var(--color-bg-deep)]">
                      <motion.div
                        className="h-full"
                        animate={{ width: `${simVal}%` }}
                        transition={{ duration: 0.3 }}
                        style={{ backgroundColor: 'var(--color-accent-gold)' }}
                      />
                    </div>
                  </div>
                </div>
                <p className="ml-24 mt-1 text-[11px] text-[var(--color-fg-disabled)]">{item.description}</p>
              </div>
            );
          })}
        </div>

        <AnimatePresence>
          {machinePercent > 0 && machinePercent < 100 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 border-l-2 border-[var(--color-accent-gold)] pl-4 text-sm leading-relaxed text-[var(--color-fg-secondary)]">
                <p>
                  {machinePercent < 30
                    ? '你大部分时间活在真实世界中。虽然不够完美，但你的经历是真实的。'
                    : machinePercent < 70
                      ? '你在两个世界之间摇摆。哪个才是真正的你？'
                      : '你几乎完全沉浸在虚拟体验中。你确定此刻的感受是真实的吗？'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-[var(--color-border-faint)] bg-[var(--color-bg-elevated)] p-3 text-center">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-accent-sage)] uppercase">幸福指数</p>
            <p className="mt-1 font-display text-2xl text-[var(--color-fg-primary)]">{getHappinessScore()}</p>
          </div>
          <div className="rounded-lg border border-[var(--color-border-faint)] bg-[var(--color-bg-elevated)] p-3 text-center">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-accent-gold)] uppercase">真实指数</p>
            <p className="mt-1 font-display text-2xl text-[var(--color-fg-primary)]">{getAuthenticityScore()}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-4 font-mono text-[10px] text-[var(--color-fg-muted)]">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-3 rounded-sm" style={{ backgroundColor: 'var(--color-accent-sage)' }} />
            现实
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-3 rounded-sm" style={{ backgroundColor: 'var(--color-accent-gold)' }} />
            虚拟
          </span>
        </div>

        <p className="mt-4 text-xs text-[var(--color-fg-muted)]">
          罗伯特·诺齐克（Robert Nozick, 1974）提出：如果有一台机器能给你任何想要的体验，你会选择永远接入吗？
          大多数人不愿意——说明我们不仅在乎感受，更在乎<strong className="text-[var(--color-fg-secondary)]">感受是否真实</strong>。
        </p>
      </div>
    </div>
  );
}
