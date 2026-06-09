'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { STAGGER_CONTAINER, STAGGER_ITEM } from '@/lib/animations';
import type { OnThisDayEvent } from '../lib/daily-knowledge';

type OnThisDayProps = {
  events: OnThisDayEvent[];
};

const DOMAIN_LABELS: Record<string, string> = {
  '宇宙物理': '物理',
  '人类历史': '历史',
  '哲学思想': '哲学',
  '生命科学': '生命',
};

function getDomainLabel(domain: string): string {
  return DOMAIN_LABELS[domain] ?? domain;
}

function formatYear(year: number): string {
  return year < 0 ? `公元前${Math.abs(year)}年` : `${year}年`;
}

export function OnThisDay({ events }: OnThisDayProps) {
  const reduce = useReducedMotion();

  const [today] = useState(() => new Date());
  const month = today.getMonth() + 1;
  const day = today.getDate();

  return (
    <section className="w-full max-w-3xl mx-auto">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2
          className="text-xl font-bold mb-1"
          style={{
            background: 'linear-gradient(135deg, #e8e8f0, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          历史上的今天
        </h2>
        <p className="text-[0.78rem] text-[#8b919a]">
          {month}月{day}日
        </p>
      </motion.div>

      <motion.div
        className="relative"
        variants={reduce ? undefined : STAGGER_CONTAINER}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
      >
        <div
          aria-hidden="true"
          className="absolute left-[15px] top-2 bottom-2 w-[2px]"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.03))',
          }}
        />

        {events.map((event) => {
          const label = getDomainLabel(event.domain);
          return (
            <motion.div
              key={`${event.year}-${event.title}`}
              className="relative flex gap-4 pb-6 last:pb-0 group"
              variants={STAGGER_ITEM}
            >
              <div className="relative z-10 shrink-0 mt-1.5">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{
                    background: 'var(--background)',
                    boxShadow: `0 0 0 2px ${event.domainColor}44`,
                  }}
                >
                  <div
                    className="w-[10px] h-[10px] rounded-full"
                    style={{ background: event.domainColor }}
                  />
                </div>
              </div>

              <div
                className="flex-1 p-4 rounded-xl transition-all duration-300 group-hover:bg-white/[0.04]"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="text-[0.72rem] font-mono font-semibold"
                    style={{ color: event.domainColor }}
                  >
                    {formatYear(event.year)}
                  </span>
                  <span
                    className="text-[0.65rem] font-semibold px-1.5 py-0.5 rounded"
                    style={{
                      color: event.domainColor,
                      background: `${event.domainColor}14`,
                    }}
                  >
                    {label}
                  </span>
                </div>
                <h3 className="text-[0.9rem] font-semibold text-[#e8e8f0] leading-snug m-0">
                  {event.title}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
