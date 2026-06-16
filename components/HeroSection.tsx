"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AnimatedCounter } from "./AnimatedCounter";
import { CornerMark } from "./CornerMark";
import { STATS } from "../lib/data";

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden pt-24 pb-16 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 18%, color-mix(in oklab, var(--color-accent-gold) 9%, transparent) 0%, transparent 62%)",
          animation: reduce ? "none" : "heroGradientDrift 18s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 28% 82%, color-mix(in oklab, var(--color-accent-indigo) 6%, transparent) 0%, transparent 52%)",
          animation: reduce ? "none" : "heroGradientDrift2 22s ease-in-out infinite",
        }}
      />

      <div className="relative z-1 px-6">
        <motion.div
          className="relative inline-block px-4 py-9 sm:px-12"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <CornerMark position="tl" />
          <CornerMark position="tr" />
          <CornerMark position="bl" />
          <CornerMark position="br" />

          <motion.div
            className="mb-7 flex items-center justify-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span aria-hidden="true" className="bg-accent-gold/45 h-px w-8" />
            <p className="text-accent-gold font-mono text-[0.7rem] font-medium tracking-[0.38em] uppercase">
              Universe Knowledge Platform
            </p>
            <span aria-hidden="true" className="bg-accent-gold/45 h-px w-8" />
          </motion.div>

          <motion.h1
            className="font-display text-fg-primary mb-5 text-[clamp(2.9rem,7.5vw,5.2rem)] leading-[1.04] font-semibold tracking-tight"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
          >
            探索人类
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(118deg, var(--color-accent-gold) 0%, color-mix(in oklab, var(--color-accent-gold) 70%, var(--color-accent-indigo)) 100%)",
              }}
            >
              知识
            </span>
            的边界
          </motion.h1>

          <motion.p
            className="text-fg-secondary mx-auto mb-4 max-w-[560px] text-[1.15rem] leading-relaxed font-medium"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            从宇宙的尺度到人类的思想，一站式探索
          </motion.p>

          <motion.p
            className="text-fg-muted mx-auto mb-10 max-w-[520px] text-[1.02rem] leading-relaxed"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            汇聚宇宙物理、宇宙学、人类历史、哲学思想、生命科学与数学逻辑，构建系统化的知识图谱。让任何人随时以美好的方式接触到人类最重要的知识。
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="flex flex-wrap items-start justify-center gap-x-10 gap-y-6 px-4 sm:gap-x-16"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
      >
        {STATS.map((stat, i) => (
          <div key={stat.label} className="flex items-center gap-x-10 sm:gap-x-16">
            {i > 0 ? (
              <span aria-hidden="true" className="bg-border-faint hidden h-9 w-px sm:block" />
            ) : null}
            <div className="text-center">
              <div className="font-display text-fg-primary text-[2.1rem] leading-tight font-semibold tracking-tight">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-fg-muted mt-1.5 font-mono text-[0.68rem] tracking-[0.18em] uppercase">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
