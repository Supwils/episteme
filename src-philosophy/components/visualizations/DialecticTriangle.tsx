'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Stage = {
  id: string;
  label: string;
  labelEn: string;
  x: number;
  y: number;
  color: string;
  description: string;
  examples: { domain: string; content: string }[];
};

const STAGES: Stage[] = [
  {
    id: 'thesis',
    label: '正题',
    labelEn: 'Thesis',
    x: 300,
    y: 80,
    color: '#61afef',
    description: '初始状态或既有观念——一个看似完整但内在包含矛盾的立场。',
    examples: [
      { domain: '政治', content: '封建制度：稳定的等级秩序，但压制个人自由' },
      { domain: '认识', content: '常识经验：直观可靠，但缺乏反思与批判' },
      { domain: '伦理', content: '传统道德：提供明确规范，但可能僵化保守' },
    ],
  },
  {
    id: 'antithesis',
    label: '反题',
    labelEn: 'Antithesis',
    x: 120,
    y: 380,
    color: '#e06c75',
    description: '对正题的否定——揭示内在矛盾，打破既有框架的力量。',
    examples: [
      { domain: '政治', content: '资本主义：解放个人生产力，但制造新的不平等' },
      { domain: '认识', content: '怀疑论：揭示经验的局限，但可能走向不可知' },
      { domain: '伦理', content: '道德相对主义：尊重多元，但失去判断标准' },
    ],
  },
  {
    id: 'synthesis',
    label: '合题',
    labelEn: 'Synthesis',
    x: 480,
    y: 380,
    color: '#98c379',
    description: '更高层次的统一——保留正反题的合理要素，克服矛盾，开启新的辩证过程。',
    examples: [
      { domain: '政治', content: '社会民主制度：兼顾效率与公平的新综合' },
      { domain: '认识', content: '批判理性主义：既重视经验又强调理性反思' },
      { domain: '伦理', content: '程序正义论：在多元中寻找共识的基础' },
    ],
  },
];

const ARROWS = [
  { from: 0, to: 1, label: '否定' },
  { from: 1, to: 2, label: '扬弃' },
  { from: 2, to: 0, label: '上升' },
];

const SVG_W = 600;
const SVG_H = 460;

export default function DialecticTriangle() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeExampleIdx, setActiveExampleIdx] = useState(0);

  const selectedStage = STAGES.find((s) => s.id === selectedId) ?? null;

  const handleVertexClick = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
    setActiveExampleIdx(0);
  }, []);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="border-border-faint bg-bg-panel relative overflow-hidden rounded-lg border p-4">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="h-auto w-full" style={{ maxHeight: 440 }}>
          <defs>
            <radialGradient id="dialectic-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-accent-gold)" stopOpacity="0.03" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#61afef" fillOpacity="0.6" />
            </marker>
            <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#e06c75" fillOpacity="0.6" />
            </marker>
            <marker id="arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#98c379" fillOpacity="0.6" />
            </marker>
          </defs>

          <rect width={SVG_W} height={SVG_H} fill="url(#dialectic-glow)" />

          <polygon
            points={`${STAGES[0]!.x},${STAGES[0]!.y} ${STAGES[1]!.x},${STAGES[1]!.y} ${STAGES[2]!.x},${STAGES[2]!.y}`}
            fill="none"
            stroke="var(--color-border-faint)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {ARROWS.map((arrow, i) => {
            const from = STAGES[arrow.from]!;
            const to = STAGES[arrow.to]!;
            const mx = (from.x + to.x) / 2;
            const my = (from.y + to.y) / 2;
            const colors = ['#61afef', '#e06c75', '#98c379'];
            const markers = ['arrow-blue', 'arrow-red', 'arrow-green'];
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const len = Math.sqrt(dx * dx + dy * dy);
            const offsetFrom = 30;
            const offsetTo = 30;
            const x1 = from.x + (dx / len) * offsetFrom;
            const y1 = from.y + (dy / len) * offsetFrom;
            const x2 = to.x - (dx / len) * offsetTo;
            const y2 = to.y - (dy / len) * offsetTo;

            const perpX = -dy / len * 20;
            const perpY = dx / len * 20;

            return (
              <g key={i}>
                <motion.path
                  d={`M ${x1} ${y1} Q ${mx + perpX} ${my + perpY} ${x2} ${y2}`}
                  fill="none"
                  stroke={colors[i]}
                  strokeWidth={1.5}
                  strokeOpacity={0.5}
                  markerEnd={`url(#${markers[i]})`}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.3, ease: 'easeInOut' }}
                />
                <text
                  x={mx + perpX * 1.3}
                  y={my + perpY * 1.3}
                  textAnchor="middle"
                  fill={colors[i]}
                  fontSize="10"
                  fontFamily="var(--font-mono)"
                  opacity="0.7"
                  className="pointer-events-none select-none"
                >
                  {arrow.label}
                </text>
              </g>
            );
          })}

          {STAGES.map((stage) => {
            const isSelected = selectedId === stage.id;
            const isHovered = hoveredId === stage.id;
            const r = isSelected ? 22 : isHovered ? 20 : 16;

            return (
              <g
                key={stage.id}
                style={{ cursor: 'pointer' }}
                onPointerEnter={() => setHoveredId(stage.id)}
                onPointerLeave={() => setHoveredId(null)}
                onClick={() => handleVertexClick(stage.id)}
              >
                <motion.circle
                  cx={stage.x}
                  cy={stage.y}
                  r={r + 16}
                  fill={stage.color}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isSelected ? 0.1 : isHovered ? 0.06 : 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.circle
                  cx={stage.x}
                  cy={stage.y}
                  fill={`${stage.color}20`}
                  stroke={stage.color}
                  strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1.2}
                  initial={{ r: 0 }}
                  animate={{ r }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
                <text
                  x={stage.x}
                  y={stage.y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={stage.color}
                  fontSize="12"
                  fontWeight="600"
                  fontFamily="var(--font-sans)"
                  className="pointer-events-none select-none"
                >
                  {stage.label}
                </text>
                <text
                  x={stage.x}
                  y={stage.y + r + 14}
                  textAnchor="middle"
                  fill="var(--color-fg-disabled)"
                  fontSize="9"
                  fontFamily="var(--font-mono)"
                  className="pointer-events-none select-none"
                >
                  {stage.labelEn}
                </text>
              </g>
            );
          })}

          <text
            x={SVG_W / 2}
            y={SVG_H - 10}
            textAnchor="middle"
            fill="var(--color-fg-disabled)"
            fontSize="10"
            fontFamily="var(--font-mono)"
            letterSpacing="0.12em"
            className="pointer-events-none select-none"
          >
            Hegel&apos;s Dialectic · 黑格尔辩证法
          </text>
        </svg>

        <AnimatePresence>
          {selectedStage && (
            <motion.div
              key={selectedStage.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
              className="border-border-faint bg-bg-panel absolute bottom-4 left-4 z-10 max-w-sm rounded-lg border p-5 backdrop-blur-md"
            >
              <div className="mb-2 flex items-center gap-2">
                <div className="h-3 w-0.5 rounded-full" style={{ backgroundColor: selectedStage.color }} />
                <span className="font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: selectedStage.color }}>
                  {selectedStage.labelEn}
                </span>
              </div>

              <h3 className="font-display text-fg-primary text-lg font-semibold">{selectedStage.label}</h3>
              <p className="text-fg-secondary mt-1 text-sm leading-relaxed">{selectedStage.description}</p>

              <div className="mt-3">
                <p className="text-fg-disabled font-mono text-[9px] uppercase tracking-[0.18em]">辩证实例</p>
                <div className="mt-2 space-y-2">
                  {selectedStage.examples.map((ex, i) => (
                    <button
                      key={ex.domain}
                      type="button"
                      onClick={() => setActiveExampleIdx(i)}
                      className={`block w-full cursor-pointer rounded border p-2 text-left transition-all ${
                        activeExampleIdx === i
                          ? 'border-current bg-current/10'
                          : 'border-border-faint hover:border-fg-disabled/30'
                      }`}
                      style={activeExampleIdx === i ? { borderColor: `${selectedStage.color}40`, color: selectedStage.color } : undefined}
                    >
                      <span className="font-mono text-[9px] tracking-[0.12em] uppercase" style={{ color: selectedStage.color }}>
                        {ex.domain}
                      </span>
                      <p className="text-fg-secondary mt-0.5 text-[11px] leading-snug">{ex.content}</p>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="text-fg-disabled hover:text-fg-secondary touch-target absolute top-3 right-3 flex h-6 w-6 cursor-pointer items-center justify-center transition-colors"
                aria-label="关闭"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                  <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {hoveredId && !selectedId && (
            <motion.div
              key={`hover-${hoveredId}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.12 }}
              className="border-border-faint bg-bg-elevated pointer-events-none absolute bottom-4 right-4 max-w-xs rounded-lg border p-3"
            >
              {(() => {
                const s = STAGES.find((st) => st.id === hoveredId);
                if (!s) return null;
                return (
                  <>
                    <p className="font-mono text-[10px] font-semibold tracking-wide" style={{ color: s.color }}>
                      {s.label} · {s.labelEn}
                    </p>
                    <p className="text-fg-secondary mt-0.5 text-[11px] leading-snug">{s.description}</p>
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {STAGES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => handleVertexClick(s.id)}
            className="cursor-pointer border px-3 py-1.5 font-mono text-[10px] tracking-wider transition-all"
            style={{
              borderColor: selectedId === s.id ? s.color : 'var(--color-border-faint)',
              backgroundColor: selectedId === s.id ? `${s.color}15` : 'transparent',
              color: selectedId === s.id ? s.color : 'var(--color-fg-muted)',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
