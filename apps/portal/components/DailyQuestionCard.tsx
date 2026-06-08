'use client';

import { motion, useReducedMotion } from 'framer-motion';

type DailyQuestionCardProps = {
  question: string;
};

export function DailyQuestionCard({ question }: DailyQuestionCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden backdrop-blur-xl"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
      }}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <div
        aria-hidden="true"
        className="h-[3px]"
        style={{
          background: 'linear-gradient(90deg, #eab308, #f59e0b)',
        }}
      />

      <div className="p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <span className="text-2xl shrink-0 mt-0.5">❓</span>
          <div>
            <h3
              className="text-lg font-bold mb-3"
              style={{
                background: 'linear-gradient(135deg, #e8e8f0, #eab308)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              今日一问
            </h3>
            <p className="text-[0.95rem] text-[#c8cad3] leading-relaxed m-0">
              {question}
            </p>
            <p className="text-[0.75rem] text-[#6b7280] mt-3 m-0">
              思考这个问题，和朋友分享你的答案
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
