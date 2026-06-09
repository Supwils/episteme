"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { lazy, Suspense, useCallback } from "react";
import { PRODUCT_EASE } from "@/subjects/psychology/lib/constants";

const EmotionWheel = lazy(
  () => import("@/subjects/psychology/components/visualizations/EmotionWheel"),
);

const SECTIONS = [
  { id: "theorists", icon: "🧠", title: "理论家", titleEn: "Theorists", count: "—", description: "从弗洛伊德到卡尼曼，心理学巨匠的生平与理论", href: "/psychology/theorists", accent: "#9b7dc4" },
  { id: "experiments", icon: "🔬", title: "经典实验", titleEn: "Experiments", count: "—", description: "改变心理学进程的里程碑实验与发现", href: "/psychology/experiments", accent: "#6b8fd6" },
  { id: "phenomena", icon: "✨", title: "心理现象", titleEn: "Phenomena", count: "—", description: "认知偏差、社会效应与令人惊奇的心理规律", href: "/psychology/phenomena", accent: "#d4789c" },
  { id: "schools", icon: "🏛️", title: "流派学说", titleEn: "Schools", count: "—", description: "从精神分析到认知革命，心理学的主要流派", href: "/psychology/schools", accent: "#9b7dc4" },
  { id: "disorders", icon: "💊", title: "心理障碍", titleEn: "Disorders", count: "—", description: "DSM分类体系中的主要心理障碍与诊断", href: "/psychology/disorders", accent: "#e07a5f" },
  { id: "debates", icon: "⚖️", title: "经典论辩", titleEn: "Debates", count: "—", description: "先天vs后天、自由意志vs决定论等核心争论", href: "/psychology/debates", accent: "#6b8fd6" },
  { id: "dialogues", icon: "💬", title: "思想对话", titleEn: "Dialogues", count: "—", description: "跨越时代的思想交锋与虚拟对话", href: "/psychology/dialogues", accent: "#d4789c" },
] as const;

const STATS = [
  { label: "理论家", value: 0, suffix: "位" },
  { label: "实验", value: 0, suffix: "项" },
  { label: "现象", value: 0, suffix: "个" },
  { label: "流派", value: 0, suffix: "个" },
];

const FLOATING_SYMBOLS = ["ψ", "∞", "△", "◎", "∑", "λ", "⊕", "⟐"];

function FloatingSymbols({ reduce }: { reduce: boolean }) {
  if (reduce) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {FLOATING_SYMBOLS.map((sym, i) => (
        <motion.span
          key={i}
          className="absolute font-display text-fg-disabled/20 select-none"
          style={{ left: `${8 + i * 12.5}%`, top: `${10 + (i * 37) % 80}%`, fontSize: `${20 + (i % 3) * 12}px` }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{ opacity: { duration: 1.2, delay: 1 + i * 0.15 }, y: { duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" } }}
        >{sym}</motion.span>
      ))}
    </div>
  );
}

function SectionCard({ section, index, reduce }: { section: (typeof SECTIONS)[number]; index: number; reduce: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: reduce ? 0 : 0.9 + index * 0.12, ease: PRODUCT_EASE }}
    >
      <Link
        href={section.href}
        className="group border-border-faint bg-bg-near hover:bg-bg-elevated relative flex h-full flex-col gap-5 border p-6 transition-all duration-500 hover:shadow-[0_0_40px_-12px_rgba(155,125,196,0.12)]"
        aria-label={`${section.title} — ${section.titleEn}`}
      >
        <div className="flex items-center justify-between">
          <span
            className="font-mono text-[10px] tracking-[0.32em] uppercase"
            style={{ color: section.accent }}
          >
            {section.titleEn}
          </span>
          <span className="text-2xl leading-none select-none" aria-hidden>
            {section.icon}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-display text-fg-primary text-2xl font-semibold leading-tight transition-colors duration-300 group-hover:text-accent-purple">
            {section.title}
          </h2>
        </div>
        <p className="text-fg-secondary flex-1 text-sm leading-relaxed">{section.description}</p>
        <span
          aria-hidden
          className="text-fg-disabled group-hover:text-accent-purple absolute right-5 bottom-5 font-mono text-xs transition-all duration-300 group-hover:translate-x-1"
        >
          →
        </span>
        <span
          className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
          style={{ backgroundColor: section.accent }}
          aria-hidden
        />
      </Link>
    </motion.div>
  );
}

export default function PsychologyHomeClient() {
  const reduce = useReducedMotion();
  const d = useCallback((sec: number) => (reduce ? 0 : sec), [reduce]);

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <FloatingSymbols reduce={!!reduce} />

      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        aria-hidden />

      <div className="border-fg-disabled/30 pointer-events-none absolute top-16 left-6 h-3 w-3 border-t border-l" />
      <div className="border-fg-disabled/30 pointer-events-none absolute top-16 right-6 h-3 w-3 border-t border-r" />
      <div className="border-fg-disabled/30 pointer-events-none absolute bottom-6 left-6 h-3 w-3 border-b border-l" />
      <div className="border-fg-disabled/30 pointer-events-none absolute right-6 bottom-6 h-3 w-3 border-r border-b" />

      <section className="relative flex w-full flex-col items-start gap-8 px-6 sm:px-10 lg:px-16 pt-28 pb-24 md:pt-36 md:pb-32">
        <motion.p
          className="text-fg-muted font-mono text-[10px] tracking-[0.42em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: d(0.2) }}
        >
          universe · knowledge / psychology
        </motion.p>

        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: d(0.4), ease: PRODUCT_EASE }}
        >
          <h1 className="font-display text-[3.2rem] leading-[1.02] tracking-tight md:text-[5rem]">
            <span className="text-fg-primary">心灵的</span><br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #9b7dc4 0%, #b99de4 40%, #6b8fd6 60%, #d4789c 100%)",
                backgroundSize: "200% 200%",
                animation: reduce ? "none" : "gradient-shift 6s ease infinite",
              }}
            >
              地图
            </span>
          </h1>
          <p className="text-fg-secondary max-w-xl text-sm leading-relaxed md:text-base">
            从弗洛伊德的潜意识到卡尼曼的双系统，从米尔格拉姆的服从实验到斯坦福监狱——
            一座跨越百年的心理学与认知科学知识图谱。
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-start gap-10 pt-4 md:gap-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: d(0.8), ease: PRODUCT_EASE }}
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="font-display text-accent-purple text-3xl font-semibold tabular-nums md:text-4xl">
                {stat.value}<span className="text-fg-muted ml-0.5 text-lg">{stat.suffix}</span>
              </span>
              <span className="text-fg-muted font-mono text-[10px] tracking-[0.28em] uppercase">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="relative z-[2] w-full px-6 sm:px-10 lg:px-16 pb-16">
        <motion.p
          className="text-fg-muted mb-8 font-mono text-[10px] tracking-[0.38em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: d(0.8) }}
        >
          探索领域 · explore
        </motion.p>
        <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {SECTIONS.map((section, i) => (
            <SectionCard key={section.id} section={section} index={i} reduce={!!reduce} />
          ))}
        </div>
      </section>

      <section className="relative z-[2] mx-auto w-full max-w-2xl px-6 pb-20">
        <motion.p
          className="text-fg-muted mb-6 font-mono text-[10px] tracking-[0.38em] uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          情绪轮 · emotion wheel
        </motion.p>
        <motion.div
          className="border-border-faint bg-bg-near border p-6 sm:p-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: PRODUCT_EASE }}
        >
          <Suspense
            fallback={
              <div className="flex h-[500px] items-center justify-center">
                <span className="text-fg-muted font-mono text-xs">加载中…</span>
              </div>
            }
          >
            <EmotionWheel />
          </Suspense>
        </motion.div>
      </section>

      <section className="relative z-[2] mx-auto max-w-3xl px-6 pb-24">
        <motion.div
          className="border-accent-purple/20 border-l-2 pl-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: PRODUCT_EASE }}
        >
          <blockquote className="font-display text-fg-primary text-xl leading-relaxed italic md:text-2xl">
            &ldquo;知道自己知道什么，也知道自己不知道什么，这才是真正的知识。&rdquo;
          </blockquote>
          <cite className="text-fg-muted mt-4 block font-mono text-[11px] tracking-[0.22em] uppercase not-italic">
            — 丹尼尔·卡尼曼 Daniel Kahneman
          </cite>
        </motion.div>
      </section>

      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
