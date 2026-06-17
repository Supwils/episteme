"use client";

import { motion, useReducedMotion } from "framer-motion";

type DailyQuestionCardProps = {
  question: string;
};

export function DailyQuestionCard({ question }: DailyQuestionCardProps) {
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
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <div
        aria-hidden="true"
        className="h-[3px]"
        style={{
          background: "linear-gradient(90deg, #eab308, #f59e0b)",
        }}
      />

      <div className="p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 shrink-0 text-2xl">❓</span>
          <div>
            <h3 className="font-display text-fg-primary mb-3 text-lg font-semibold">今日一问</h3>
            <p className="text-fg-secondary m-0 text-[0.95rem] leading-relaxed">{question}</p>
            <p className="m-0 mt-3 text-[0.75rem] text-[#6b7280]">
              思考这个问题，和朋友分享你的答案
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
