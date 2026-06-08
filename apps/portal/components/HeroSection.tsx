"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AnimatedCounter } from "./AnimatedCounter";
import { CornerMark } from "./CornerMark";
import { STATS } from "../lib/data";

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden pb-14 pt-24 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(99,102,241,0.10) 0%, transparent 60%)",
          animation: reduce ? "none" : "heroGradientDrift 18s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 80%, rgba(139,92,246,0.06) 0%, transparent 50%)",
          animation: reduce ? "none" : "heroGradientDrift2 22s ease-in-out infinite",
        }}
      />

      <div className="z-1 relative px-6">
        <motion.div
          className="relative inline-block px-4 py-8 sm:px-10"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <CornerMark position="tl" />
          <CornerMark position="tr" />
          <CornerMark position="bl" />
          <CornerMark position="br" />

          <motion.p
            className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#6366f1]"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Universe Knowledge Platform
          </motion.p>

          <motion.h1
            className="mb-4 text-[clamp(2.8rem,7.5vw,5rem)] font-extrabold leading-[1.05] tracking-tight"
            style={{
              background:
                "linear-gradient(135deg, #e8e8f0 0%, #8b5cf6 40%, #6366f1 60%, #a78bfa 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            initial={reduce ? false : { opacity: 0, y: 20, backgroundPosition: "0% 50%" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, backgroundPosition: "100% 50%" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
          >
            探索人类知识的边界
          </motion.h1>

          <motion.p
            className="mx-auto mb-4 max-w-[560px] text-[1.15rem] font-medium leading-relaxed text-[#6366f1]/80"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            从宇宙的尺度到人类的思想，一站式探索
          </motion.p>

          <motion.p
            className="mx-auto mb-10 max-w-[520px] text-[1.05rem] leading-relaxed text-[#8b8fa3]"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            汇聚宇宙物理、宇宙学、人类历史、哲学思想、生命科学与数学逻辑，构建系统化的知识图谱。让任何人随时以美好的方式接触到人类最重要的知识。
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="flex flex-wrap justify-center gap-6 px-4 sm:gap-12"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <div
              className="text-3xl font-extrabold leading-tight"
              style={{
                background: "linear-gradient(135deg, #e8e8f0 0%, #6366f1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="mt-1 text-[0.72rem] tracking-wide text-[#9ca3af]">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
