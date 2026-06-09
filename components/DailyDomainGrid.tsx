'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import type { DailySelected } from '../lib/daily-selector';

type DailyDomainGridProps = {
  daily: DailySelected;
};

const DOMAIN_CONFIGS = [
  { key: 'physics' as const, icon: '🔬', label: '宇宙物理', color: '#60a5fa', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.18)', url: '/universe-physics' },
  { key: 'history' as const, icon: '📜', label: '人类历史', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.18)', url: '/human-history' },
  { key: 'philosophy' as const, icon: '💭', label: '哲学思想', color: '#eab308', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.18)', url: '/philosophy' },
  { key: 'economics' as const, icon: '📊', label: '经济学', color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.18)', url: '/economics' },
  { key: 'psychology' as const, icon: '🧠', label: '心理学', color: '#f472b6', bg: 'rgba(244,114,182,0.08)', border: 'rgba(244,114,182,0.18)', url: '/psychology' },
  { key: 'mathematics' as const, icon: '📐', label: '数学', color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.18)', url: '/mathematics' },
  { key: 'lifeScience' as const, icon: '🧬', label: '生命科学', color: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.18)', url: '/life-science' },
  { key: 'cosmology' as const, icon: '🌌', label: '宇宙学', color: '#818cf8', bg: 'rgba(129,140,248,0.08)', border: 'rgba(129,140,248,0.18)', url: '/cosmology' },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] as const },
  },
};

export function DailyDomainGrid({ daily }: DailyDomainGridProps) {
  const reduce = useReducedMotion();

  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
        variants={reduce ? undefined : containerVariants}
        initial="hidden"
        animate="show"
      >
        {DOMAIN_CONFIGS.map((config) => {
          const item = daily[config.key];
          return (
            <motion.div key={config.key} variants={itemVariants}>
              <Link
                href={item.url || config.url}
                className="group block p-4 rounded-xl no-underline transition-all duration-300 hover:bg-white/[0.04] h-full"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{config.icon}</span>
                  <span
                    className="text-[0.7rem] font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      color: config.color,
                      background: config.bg,
                      border: `1px solid ${config.border}`,
                    }}
                  >
                    {config.label}
                  </span>
                </div>
                <h4 className="text-[0.85rem] font-semibold text-[#e8e8f0] mb-1 group-hover:text-[#818cf8] transition-colors leading-snug line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-[0.72rem] text-[#8b8fa3] leading-relaxed m-0 line-clamp-2">
                  {item.description}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
