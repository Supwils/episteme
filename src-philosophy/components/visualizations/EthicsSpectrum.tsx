'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type EthicalTheory = {
  id: string;
  name: string;
  nameEn: string;
  x: number;
  y: number;
  color: string;
  brief: string;
  thinkers: string[];
  strengths: string[];
  weaknesses: string[];
  trolleyVerdict: string;
};

const THEORIES: EthicalTheory[] = [
  {
    id: 'utilitarianism',
    name: '功利主义',
    nameEn: 'Utilitarianism',
    x: 430,
    y: 360,
    color: '#e06c75',
    brief: '最大化幸福总量——正确的行为是产生最大善的行为。',
    thinkers: ['边沁 Bentham', '密尔 Mill', '辛格 Singer'],
    strengths: ['直觉上合理', '可量化比较', '关注实际结果'],
    weaknesses: ['忽视个体权利', '幸福难以度量', '可能为多数牺牲少数'],
    trolleyVerdict: '拉动杠杆。牺牲1人拯救5人，净幸福增加。',
  },
  {
    id: 'deontology',
    name: '义务论',
    nameEn: 'Deontology',
    x: 170,
    y: 140,
    color: '#61afef',
    brief: '道德义务优先于后果——某些行为本身就是错的。',
    thinkers: ['康德 Kant', '罗斯 Ross', '诺齐克 Nozick'],
    strengths: ['尊重个体尊严', '道德规则明确', '不为结果妥协原则'],
    weaknesses: ['规则冲突难解', '忽视后果', '过于僵化'],
    trolleyVerdict: '不拉杠杆。主动杀人违反道德律令，即使结果更差。',
  },
  {
    id: 'virtue-ethics',
    name: '美德伦理',
    nameEn: 'Virtue Ethics',
    x: 170,
    y: 360,
    color: '#98c379',
    brief: '培养美德品格——好人的行为自然是对的。',
    thinkers: ['亚里士多德 Aristotle', '麦金太尔 MacIntyre', '赫斯特豪斯 Hursthouse'],
    strengths: ['关注人格成长', '灵活应变', '整合道德教育'],
    weaknesses: ['缺乏明确指引', '文化相对性', '不解决具体困境'],
    trolleyVerdict: '没有标准答案。取决于有美德的人在此情境下会如何行动。',
  },
  {
    id: 'care-ethics',
    name: '关怀伦理',
    nameEn: 'Care Ethics',
    x: 430,
    y: 140,
    color: '#c678dd',
    brief: '关系与责任——道德源于对他人的关怀和回应。',
    thinkers: ['吉利根 Gilligan', '诺丁斯 Noddings', '特朗托 Tronto'],
    strengths: ['重视情感与关系', '关注弱势群体', '现实接地气'],
    weaknesses: ['可能偏袒亲近之人', '缺乏普遍原则', '难以扩展到陌生人'],
    trolleyVerdict: '取决于轨道上的人与你的关系。关怀伦理拒绝抽离情境的计算。',
  },
  {
    id: 'social-contract',
    name: '社会契约论',
    nameEn: 'Social Contract',
    x: 400,
    y: 250,
    color: '#56b6c2',
    brief: '道德规则是理性人为共同利益达成的协议。',
    thinkers: ['霍布斯 Hobbes', '洛克 Locke', '罗尔斯 Rawls'],
    strengths: ['解释政治合法性', '兼顾公平与自由', '可操作性强'],
    weaknesses: ['契约是假设性的', '忽视无法签约者', '历史局限性'],
    trolleyVerdict: '拉动杠杆。理性人在"无知之幕"后会选择损失最小的方案。',
  },
  {
    id: 'existential-ethics',
    name: '存在主义伦理',
    nameEn: 'Existential Ethics',
    x: 200,
    y: 250,
    color: '#e5c07b',
    brief: '自由选择与责任——人被判定为自由，必须为自己的选择负责。',
    thinkers: ['萨特 Sartre', '加缪 Camus', '波伏娃 de Beauvoir'],
    strengths: ['强调个人责任', '拒绝借口', '直面自由'],
    weaknesses: ['可能导向虚无', '缺乏共同标准', '过度个人主义'],
    trolleyVerdict: '你自己选择，并承担全部责任。没有"正确答案"可以躲在后面。',
  },
];

const SVG_W = 600;
const SVG_H = 500;
const CX = 300;
const CY = 250;

function AxisLabels() {
  return (
    <g className="pointer-events-none select-none">
      <text x={CX} y={30} textAnchor="middle" fill="var(--color-fg-muted)" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em">
        个人 Individual
      </text>
      <text x={CX} y={SVG_H - 15} textAnchor="middle" fill="var(--color-fg-muted)" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em">
        集体 Collective
      </text>
      <text x={20} y={CY} textAnchor="start" fill="var(--color-fg-muted)" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em" dominantBaseline="middle">
        义务论
      </text>
      <text x={20} y={CY + 16} textAnchor="start" fill="var(--color-fg-disabled)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.08em">
        Deontology
      </text>
      <text x={SVG_W - 20} y={CY} textAnchor="end" fill="var(--color-fg-muted)" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em" dominantBaseline="middle">
        后果主义
      </text>
      <text x={SVG_W - 20} y={CY + 16} textAnchor="end" fill="var(--color-fg-disabled)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.08em">
        Consequentialism
      </text>
    </g>
  );
}

function AxisLines() {
  return (
    <g>
      <line x1={60} y1={CY} x2={SVG_W - 60} y2={CY} stroke="var(--color-fg-disabled)" strokeWidth="1" opacity="0.3" />
      <line x1={CX} y1={50} x2={CX} y2={SVG_H - 35} stroke="var(--color-fg-disabled)" strokeWidth="1" opacity="0.3" />
      {[-1, 0, 1].map((i) => (
        <g key={`tick-${i}`}>
          <line x1={CX + i * 120} y1={CY - 4} x2={CX + i * 120} y2={CY + 4} stroke="var(--color-fg-disabled)" strokeWidth="1" opacity="0.2" />
          <line x1={CX - 4} y1={CY + i * 80} x2={CX + 4} y2={CY + i * 80} stroke="var(--color-fg-disabled)" strokeWidth="1" opacity="0.2" />
        </g>
      ))}
    </g>
  );
}

type TheoryDotProps = {
  theory: EthicalTheory;
  isHovered: boolean;
  isSelected: boolean;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
};

function TheoryDot({ theory, isHovered, isSelected, onHover, onClick }: TheoryDotProps) {
  const r = isSelected ? 10 : isHovered ? 9 : 7;
  const showLabel = isHovered || isSelected;

  return (
    <g
      data-node
      style={{ cursor: 'pointer' }}
      onPointerEnter={() => onHover(theory.id)}
      onPointerLeave={() => onHover(null)}
      onClick={(e) => {
        e.stopPropagation();
        onClick(theory.id);
      }}
    >
      <motion.circle
        cx={theory.x}
        cy={theory.y}
        r={r + 12}
        fill={theory.color}
        initial={{ opacity: 0 }}
        animate={{ opacity: isSelected ? 0.12 : isHovered ? 0.06 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.circle
        cx={theory.x}
        cy={theory.y}
        fill={`${theory.color}30`}
        stroke={theory.color}
        strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1.2}
        initial={{ r: 0 }}
        animate={{ r }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      <motion.circle
        cx={theory.x}
        cy={theory.y}
        r={3}
        fill={theory.color}
        initial={{ opacity: 0 }}
        animate={{ opacity: isSelected || isHovered ? 1 : 0.6 }}
        transition={{ duration: 0.15 }}
      />

      <AnimatePresence>
        {showLabel && (
          <motion.g
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
          >
            <rect
              x={theory.x - 46}
              y={theory.y - 36}
              width={92}
              height={24}
              rx={4}
              fill="var(--color-bg-elevated)"
              stroke={theory.color}
              strokeWidth={1}
              strokeOpacity={0.4}
            />
            <text
              x={theory.x}
              y={theory.y - 20}
              textAnchor="middle"
              fill={theory.color}
              fontSize="11"
              fontWeight="600"
              fontFamily="var(--font-sans)"
            >
              {theory.name}
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <text
        x={theory.x}
        y={theory.y + r + 14}
        textAnchor="middle"
        fill="var(--color-fg-disabled)"
        fontSize="8"
        fontFamily="var(--font-mono)"
        className="pointer-events-none select-none"
        opacity={isHovered || isSelected ? 0 : 0.5}
      >
        {theory.nameEn}
      </text>
    </g>
  );
}

type DetailPanelProps = {
  theory: EthicalTheory;
  showTrolley: boolean;
  onClose: () => void;
  onToggleTrolley: () => void;
};

function DetailPanel({ theory, showTrolley, onClose, onToggleTrolley }: DetailPanelProps) {
  return (
    <motion.div
      key={theory.id}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
      className="border-border-faint bg-bg-panel absolute bottom-4 left-4 z-10 max-w-sm rounded-lg border p-5 backdrop-blur-md"
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-0.5 rounded-full" style={{ backgroundColor: theory.color }} />
          <span className="font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: theory.color }}>
            {theory.nameEn}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-fg-disabled hover:text-fg-secondary touch-target flex h-6 w-6 cursor-pointer items-center justify-center transition-colors"
          aria-label="关闭"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
            <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <h3 className="font-display text-fg-primary text-lg font-semibold">{theory.name}</h3>
      <p className="text-fg-secondary mt-1 text-sm leading-relaxed">{theory.brief}</p>

      <div className="mt-3">
        <p className="text-fg-disabled font-mono text-[9px] uppercase tracking-[0.18em]">关键思想家</p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {theory.thinkers.map((t) => (
            <span key={t} className="border-fg-disabled/30 text-fg-muted border px-2 py-0.5 font-mono text-[9px] tracking-[0.08em]">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div>
          <p className="text-accent-sage font-mono text-[9px] uppercase tracking-[0.18em]">优势</p>
          <ul className="mt-1 space-y-0.5">
            {theory.strengths.map((s) => (
              <li key={s} className="text-fg-secondary text-[11px] leading-snug">+ {s}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-fg-disabled font-mono text-[9px] uppercase tracking-[0.18em]">局限</p>
          <ul className="mt-1 space-y-0.5">
            {theory.weaknesses.map((w) => (
              <li key={w} className="text-fg-secondary text-[11px] leading-snug">- {w}</li>
            ))}
          </ul>
        </div>
      </div>

      <AnimatePresence>
        {showTrolley && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-border-faint mt-3 border-t pt-3">
              <p className="text-accent-gold font-mono text-[9px] uppercase tracking-[0.18em]">电车难题立场</p>
              <p className="text-fg-primary mt-1 text-sm leading-relaxed">{theory.trolleyVerdict}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={onToggleTrolley}
          className="border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 touch-target cursor-pointer border px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase transition-colors"
        >
          {showTrolley ? '隐藏' : '道德困境'}
        </button>
      </div>
    </motion.div>
  );
}

type TrolleyOverlayProps = {
  onClose: () => void;
};

function TrolleyOverlay({ onClose }: TrolleyOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-bg-overlay absolute inset-0 z-20 flex items-center justify-center rounded-lg backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="border-border-faint bg-bg-elevated mx-4 max-h-[80%] w-full max-w-lg overflow-y-auto rounded-lg border p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-fg-primary text-lg font-semibold">电车难题</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-fg-disabled hover:text-fg-secondary touch-target cursor-pointer transition-colors"
            aria-label="关闭"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
              <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <p className="text-fg-secondary mb-4 text-sm leading-relaxed">
          一辆失控的电车正驶向5个人。你可以拉动杠杆，将电车转向另一条轨道，但那条轨道上有1个人。你会怎么做？
        </p>
        <div className="space-y-3">
          {THEORIES.map((theory) => (
            <div
              key={theory.id}
              className="border-border-faint bg-bg-panel rounded-lg border p-3"
            >
              <div className="mb-1 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: theory.color }} />
                <span className="font-mono text-[10px] font-semibold tracking-wide" style={{ color: theory.color }}>
                  {theory.name}
                </span>
              </div>
              <p className="text-fg-secondary text-[12px] leading-relaxed">{theory.trolleyVerdict}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function EthicsSpectrum() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showTrolleyDetail, setShowTrolleyDetail] = useState(false);
  const [showTrolleyOverlay, setShowTrolleyOverlay] = useState(false);

  const selectedTheory = selectedId ? THEORIES.find((t) => t.id === selectedId) ?? null : null;

  const handleDotClick = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
    setShowTrolleyDetail(false);
  }, []);

  const handleBackgroundClick = useCallback(() => {
    setSelectedId(null);
    setShowTrolleyDetail(false);
  }, []);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="border-border-faint bg-bg-panel relative overflow-hidden rounded-lg border p-4">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="h-auto w-full"
          style={{ maxHeight: 420 }}
          onClick={handleBackgroundClick}
        >
          <defs>
            <radialGradient id="ethics-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-accent-gold)" stopOpacity="0.04" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect x="0" y="0" width={SVG_W} height={SVG_H} fill="url(#ethics-glow)" />

          <AxisLines />
          <AxisLabels />

          {THEORIES.map((theory) => (
            <TheoryDot
              key={theory.id}
              theory={theory}
              isHovered={hoveredId === theory.id}
              isSelected={selectedId === theory.id}
              onHover={setHoveredId}
              onClick={handleDotClick}
            />
          ))}
        </svg>

        <AnimatePresence mode="wait">
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
                const t = THEORIES.find((th) => th.id === hoveredId);
                if (!t) return null;
                return (
                  <>
                    <p className="font-mono text-[10px] font-semibold tracking-wide" style={{ color: t.color }}>
                      {t.name}
                    </p>
                    <p className="text-fg-secondary mt-0.5 text-[11px] leading-snug">{t.brief}</p>
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedTheory && (
            <DetailPanel
              theory={selectedTheory}
              showTrolley={showTrolleyDetail}
              onClose={() => {
                setSelectedId(null);
                setShowTrolleyDetail(false);
              }}
              onToggleTrolley={() => setShowTrolleyDetail((v) => !v)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showTrolleyOverlay && (
            <TrolleyOverlay onClose={() => setShowTrolleyOverlay(false)} />
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {THEORIES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => handleDotClick(t.id)}
              className="cursor-pointer border px-2.5 py-1 font-mono text-[10px] tracking-wider transition-all"
              style={{
                borderColor: selectedId === t.id ? t.color : 'var(--color-border-faint)',
                backgroundColor: selectedId === t.id ? `${t.color}15` : 'transparent',
                color: selectedId === t.id ? t.color : 'var(--color-fg-muted)',
              }}
            >
              {t.name}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setShowTrolleyOverlay(true)}
          className="border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 touch-target shrink-0 cursor-pointer border px-4 py-2 font-mono text-[10px] tracking-wider uppercase transition-colors"
        >
          道德困境
        </button>
      </div>
    </div>
  );
}
