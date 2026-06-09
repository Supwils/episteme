'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import type { DailyItem } from '../lib/daily-knowledge';

type DailyKnowledgeCardProps = {
  items: DailyItem[];
  fact: string;
  date: string;
};

const DOMAIN_STYLES: Record<string, { bg: string; border: string; text: string; label: string }> = {
  physics: {
    bg: 'rgba(59, 130, 246, 0.12)',
    border: 'rgba(59, 130, 246, 0.25)',
    text: '#60a5fa',
    label: '宇宙物理',
  },
  history: {
    bg: 'rgba(245, 158, 11, 0.12)',
    border: 'rgba(245, 158, 11, 0.25)',
    text: '#f59e0b',
    label: '人类历史',
  },
  philosophy: {
    bg: 'rgba(234, 179, 8, 0.12)',
    border: 'rgba(234, 179, 8, 0.25)',
    text: '#eab308',
    label: '哲学思想',
  },
  'life-science': {
    bg: 'rgba(34, 197, 94, 0.12)',
    border: 'rgba(34, 197, 94, 0.25)',
    text: '#22c55e',
    label: '生命科学',
  },
  mathematics: {
    bg: 'rgba(167, 139, 250, 0.12)',
    border: 'rgba(167, 139, 250, 0.25)',
    text: '#a78bfa',
    label: '数学',
  },
  cosmology: {
    bg: 'rgba(129, 140, 248, 0.12)',
    border: 'rgba(129, 140, 248, 0.25)',
    text: '#818cf8',
    label: '宇宙学',
  },
};

const DEFAULT_STYLE = {
  bg: 'rgba(99, 102, 241, 0.12)',
  border: 'rgba(99, 102, 241, 0.25)',
  text: '#818cf8',
  label: '知识',
};

function getDomainStyle(domain: string) {
  return DOMAIN_STYLES[domain] ?? DEFAULT_STYLE;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 0.61, 0.36, 1] as const },
  },
};

export function DailyKnowledgeCard({ items, fact, date }: DailyKnowledgeCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden backdrop-blur-xl"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow:
          '0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
      }}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        aria-hidden="true"
        className="h-[3px]"
        style={{
          background: 'linear-gradient(90deg, #3b82f6, #f59e0b, #eab308, #22c55e)',
        }}
      />

      <div className="p-6 sm:p-8">
        <div className="mb-6">
          <h2
            className="text-xl font-bold mb-1"
            style={{
              background: 'linear-gradient(135deg, #e8e8f0, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            今天的知识
          </h2>
          <p className="text-[0.78rem] text-[#8b919a]">{date}</p>
        </div>

        <motion.div
          className="flex flex-col gap-3"
          variants={reduce ? undefined : containerVariants}
          initial="hidden"
          animate="show"
        >
          {items.map((item) => {
            const style = getDomainStyle(item.domain);
            return (
              <motion.div key={item.id} variants={itemVariants}>
                <Link
                  href={item.url}
                  className="group block p-4 rounded-xl no-underline transition-all duration-300 hover:bg-white/[0.04]"
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span
                          className="text-[0.68rem] font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            color: style.text,
                            background: style.bg,
                            border: `1px solid ${style.border}`,
                          }}
                        >
                          {style.label}
                        </span>
                        {item.year !== undefined && (
                          <span className="text-[0.68rem] text-[#9ca3af]">
                            {item.year < 0 ? `公元前${Math.abs(item.year)}年` : `${item.year}年`}
                          </span>
                        )}
                      </div>
                      <h3 className="text-[0.95rem] font-semibold text-[#e8e8f0] mb-1 group-hover:text-[#818cf8] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[0.82rem] text-[#8b8fa3] leading-relaxed m-0 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="text-[#9ca3af] group-hover:text-[#818cf8] group-hover:translate-x-0.5 transition-all duration-200 shrink-0 mt-1"
                    >
                      →
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div
          className="mt-5 pt-4 flex items-start gap-2"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
        >
          <span className="text-sm shrink-0">💡</span>
          <p className="text-[0.78rem] text-[#9ca3af] leading-relaxed m-0">
            <span className="font-semibold text-[#eab308]">趣味知识：</span>
            {fact}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
