"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { DailyItem } from "../lib/daily-knowledge";

type DailyKnowledgeCardProps = {
  items: DailyItem[];
  fact: string;
  date: string;
};

const DOMAIN_STYLES: Record<string, { bg: string; border: string; text: string; label: string }> = {
  physics: {
    bg: "rgba(59, 130, 246, 0.12)",
    border: "rgba(59, 130, 246, 0.25)",
    text: "#60a5fa",
    label: "宇宙物理",
  },
  history: {
    bg: "rgba(245, 158, 11, 0.12)",
    border: "rgba(245, 158, 11, 0.25)",
    text: "#f59e0b",
    label: "人类历史",
  },
  philosophy: {
    bg: "rgba(234, 179, 8, 0.12)",
    border: "rgba(234, 179, 8, 0.25)",
    text: "#eab308",
    label: "哲学思想",
  },
  "life-science": {
    bg: "rgba(34, 197, 94, 0.12)",
    border: "rgba(34, 197, 94, 0.25)",
    text: "#22c55e",
    label: "生命科学",
  },
  mathematics: {
    bg: "rgba(167, 139, 250, 0.12)",
    border: "rgba(167, 139, 250, 0.25)",
    text: "#a78bfa",
    label: "数学",
  },
  cosmology: {
    bg: "rgba(90, 143, 192, 0.12)",
    border: "rgba(90, 143, 192, 0.25)",
    text: "#5a8fc0",
    label: "宇宙学",
  },
};

const DEFAULT_STYLE = {
  bg: "rgba(217, 164, 65, 0.12)",
  border: "rgba(217, 164, 65, 0.25)",
  text: "#d9a441",
  label: "知识",
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
      className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl backdrop-blur-xl"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03)",
      }}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        aria-hidden="true"
        className="h-[3px]"
        style={{
          background: "linear-gradient(90deg, #3b82f6, #f59e0b, #eab308, #22c55e)",
        }}
      />

      <div className="p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="font-display text-fg-primary mb-1 text-xl font-semibold">今天的知识</h2>
          <p className="text-fg-muted text-[0.78rem]">{date}</p>
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
                  className="group block rounded-xl p-4 no-underline transition-all duration-300 hover:bg-white/[0.04]"
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-xl">{item.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <span
                          className="rounded-full px-2 py-0.5 text-[0.68rem] font-semibold"
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
                      <h3 className="text-fg-primary group-hover:text-accent-gold mb-1 text-[0.95rem] leading-snug font-semibold transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-fg-secondary m-0 line-clamp-2 text-[0.82rem] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="text-fg-muted group-hover:text-accent-gold mt-1 shrink-0 transition-all duration-200 group-hover:translate-x-0.5"
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
          className="mt-5 flex items-start gap-2 pt-4"
          style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}
        >
          <span className="shrink-0 text-sm">💡</span>
          <p className="m-0 text-[0.78rem] leading-relaxed text-[#9ca3af]">
            <span className="font-semibold text-[#eab308]">趣味知识：</span>
            {fact}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
