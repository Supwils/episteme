"use client";

import { motion, useReducedMotion } from "framer-motion";

type DailyFactProps = {
  fact: string;
  domain: string;
  source?: string;
};

const DOMAIN_STYLES: Record<string, { accent: string; bg: string; border: string; label: string }> =
  {
    physics: {
      accent: "#60a5fa",
      bg: "rgba(59, 130, 246, 0.08)",
      border: "rgba(59, 130, 246, 0.2)",
      label: "宇宙物理",
    },
    history: {
      accent: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.08)",
      border: "rgba(245, 158, 11, 0.2)",
      label: "人类历史",
    },
    philosophy: {
      accent: "#eab308",
      bg: "rgba(234, 179, 8, 0.08)",
      border: "rgba(234, 179, 8, 0.2)",
      label: "哲学思想",
    },
    "life-science": {
      accent: "#22c55e",
      bg: "rgba(34, 197, 94, 0.08)",
      border: "rgba(34, 197, 94, 0.2)",
      label: "生命科学",
    },
  };

const DEFAULT_STYLE = {
  accent: "#d9a441",
  bg: "rgba(217, 164, 65, 0.08)",
  border: "rgba(217, 164, 65, 0.2)",
  label: "知识",
};

export function DailyFact({ fact, domain, source }: DailyFactProps) {
  const reduce = useReducedMotion();
  const style = DOMAIN_STYLES[domain] ?? DEFAULT_STYLE;

  return (
    <motion.div
      className="w-full rounded-xl p-5 backdrop-blur-lg"
      style={{
        background: style.bg,
        border: `1px solid ${style.border}`,
      }}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] as const }}
    >
      <div className="mb-2.5 flex items-center gap-2">
        <span className="text-sm">💡</span>
        <span className="text-[0.7rem] font-semibold tracking-wide" style={{ color: style.accent }}>
          {style.label}
        </span>
        <span className="text-[0.7rem] text-[#9ca3af]">· 趣味知识</span>
      </div>
      <p className="text-fg-primary m-0 text-[0.9rem] leading-relaxed">{fact}</p>
      {source && <p className="m-0 mt-2.5 text-[0.72rem] text-[#9ca3af]">来源：{source}</p>}
    </motion.div>
  );
}
