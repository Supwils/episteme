'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SocietyDesign {
  minIncome: number;
  healthcare: number;
  education: number;
  equality: number;
}

interface Person {
  id: number;
  wealth: number;
  health: number;
  education: number;
  happiness: number;
}

const INITIAL_DESIGN: SocietyDesign = {
  minIncome: 50,
  healthcare: 50,
  education: 50,
  equality: 50,
};

function simulateSociety(design: SocietyDesign): Person[] {
  const baseWealth = design.equality;
  return Array.from({ length: 9 }, (_, i) => {
    const variance = (100 - design.equality) * (Math.random() * 0.6 - 0.3);
    const wealth = Math.max(0, Math.min(100, baseWealth + variance + (i - 4) * (100 - design.equality) * 0.08));
    const health = Math.max(0, Math.min(100, design.healthcare * 0.6 + wealth * 0.2 + Math.random() * 20));
    const edu = Math.max(0, Math.min(100, design.education * 0.5 + wealth * 0.3 + Math.random() * 15));
    const happiness = Math.round((wealth * 0.3 + health * 0.3 + edu * 0.2 + design.equality * 0.2) / 1);
    return { id: i, wealth: Math.round(wealth), health: Math.round(health), education: Math.round(edu), happiness: Math.round(happiness) };
  });
}

function getPersonColor(person: Person, yourIndex: number, revealed: boolean): string {
  if (!revealed) return 'var(--color-fg-muted)';
  if (person.id === yourIndex) return 'var(--color-accent-gold)';
  return 'var(--color-fg-disabled)';
}

export default function VeilOfIgnorance() {
  const [design, setDesign] = useState<SocietyDesign>(INITIAL_DESIGN);
  const [phase, setPhase] = useState<'design' | 'reveal'>('design');
  const [yourIndex, setYourIndex] = useState<number | null>(null);
  const [people, setPeople] = useState<Person[]>([]);
  const [round, setRound] = useState(1);

  const handleLiftVeil = () => {
    const newPeople = simulateSociety(design);
    setPeople(newPeople);
    const idx = Math.floor(Math.random() * 9);
    setYourIndex(idx);
    setPhase('reveal');
  };

  const handleNewRound = () => {
    setPhase('design');
    setYourIndex(null);
    setPeople([]);
    setRound((r) => r + 1);
  };

  const yourPerson = yourIndex !== null ? people[yourIndex] : null;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative overflow-hidden rounded-lg border border-[var(--color-border-faint)] bg-[var(--color-bg-panel)] p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-fg-muted)] uppercase">
            第 {round} 轮
          </p>
          <span className={`badge ${phase === 'design' ? '' : 'badge-sage'}`}>
            {phase === 'design' ? '设计社会' : '揭晓位置'}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {phase === 'design' ? (
            <motion.div
              key="design"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <p className="text-sm text-[var(--color-fg-secondary)]">
                你站在「无知之幕」背后，不知道自己将出生在社会的哪个位置。设计你认为公正的社会制度。
              </p>

              {([
                { key: 'minIncome', label: '最低收入保障', color: 'var(--color-accent-gold)' },
                { key: 'healthcare', label: '医疗保障', color: 'var(--color-accent-sage)' },
                { key: 'education', label: '教育资源', color: 'var(--color-info)' },
                { key: 'equality', label: '财富平等度', color: 'var(--color-accent-gold-bright)' },
              ] as const).map(({ key, label, color }) => (
                <label key={key} className="block">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[var(--color-fg-muted)]">{label}</span>
                    <span className="font-mono text-xs" style={{ color }}>{design[key]}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={design[key]}
                    onChange={(e) => setDesign({ ...design, [key]: Number(e.target.value) })}
                    className="touch-target mt-1 h-2 w-full cursor-pointer appearance-none rounded-full bg-[var(--color-bg-deep)] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--color-accent-gold)]"
                  />
                </label>
              ))}

              <button
                onClick={handleLiftVeil}
                className="touch-target mt-2 w-full cursor-pointer border border-[var(--color-accent-gold)] bg-[var(--color-accent-gold)]/10 px-5 py-3 font-mono text-sm tracking-wide text-[var(--color-accent-gold)] transition-colors hover:bg-[var(--color-accent-gold)]/20"
              >
                揭开无知之幕
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="flex items-end justify-center gap-1.5">
                {people.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: p.id * 0.08, duration: 0.4 }}
                    className="flex flex-col items-center gap-1"
                    style={{ originY: 1 }}
                  >
                    <span className="font-mono text-[9px]" style={{ color: getPersonColor(p, yourIndex ?? -1, true) }}>
                      {p.happiness}
                    </span>
                    <div
                      className="w-6 rounded-t-sm transition-colors"
                      style={{
                        height: `${Math.max(20, p.happiness * 1.5)}px`,
                        backgroundColor: getPersonColor(p, yourIndex ?? -1, true),
                        border: p.id === yourIndex ? '1px solid var(--color-accent-gold)' : 'none',
                      }}
                    />
                    {p.id === yourIndex && (
                      <span className="font-mono text-[8px] text-[var(--color-accent-gold)]">你</span>
                    )}
                  </motion.div>
                ))}
              </div>

              {yourPerson && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="rounded-lg border border-[var(--color-border-faint)] bg-[var(--color-bg-elevated)] p-4"
                >
                  <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-accent-gold)] uppercase">
                    你的位置
                  </p>
                  <div className="mt-2 grid grid-cols-4 gap-2 text-center">
                    {[
                      { label: '财富', value: yourPerson.wealth },
                      { label: '健康', value: yourPerson.health },
                      { label: '教育', value: yourPerson.education },
                      { label: '幸福', value: yourPerson.happiness },
                    ].map((item) => (
                      <div key={item.label}>
                        <p className="text-lg font-display text-[var(--color-fg-primary)]">{item.value}</p>
                        <p className="font-mono text-[9px] text-[var(--color-fg-muted)]">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleNewRound}
                  className="touch-target flex-1 cursor-pointer border border-[var(--color-accent-gold)] bg-[var(--color-accent-gold)]/10 px-5 py-3 font-mono text-sm tracking-wide text-[var(--color-accent-gold)] transition-colors hover:bg-[var(--color-accent-gold)]/20"
                >
                  再来一轮
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
