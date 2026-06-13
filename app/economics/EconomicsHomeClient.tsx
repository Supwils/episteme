"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState, useCallback } from "react";

const PRODUCT_EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

const SECTIONS = [
  {
    id: "economists",
    icon: "👤",
    title: "经济学家",
    count: "50+",
    description: "从亚当·斯密到现代诺贝尔奖得主，经济学巨匠的生平与思想",
    href: "/economics/economists",
    accent: "#c8a45a",
  },
  {
    id: "theories",
    icon: "📖",
    title: "经济理论",
    count: "40+",
    description: "微观、宏观、国际、发展、行为经济学等核心理论体系",
    href: "/economics/theories",
    accent: "#61afef",
  },
  {
    id: "concepts",
    icon: "💡",
    title: "经济学概念",
    count: "60+",
    description: "GDP、通货膨胀、边际效用、机会成本等基础与进阶概念",
    href: "/economics/concepts",
    accent: "#e5c07b",
  },
  {
    id: "case-studies",
    icon: "📊",
    title: "经济案例",
    count: "30+",
    description: "大萧条、金融危机、日本泡沫——真实经济事件深度分析",
    href: "/economics/case-studies",
    accent: "#d47850",
  },
  {
    id: "schools",
    icon: "🏛",
    title: "经济学派",
    count: "12+",
    description: "古典、新古典、凯恩斯、奥地利、行为经济学等思想流派",
    href: "/economics/schools",
    accent: "#a88adf",
  },
  {
    id: "simulations",
    icon: "🎮",
    title: "互动模拟",
    count: "10",
    description: "供需模拟、经济循环、通胀计算器、博弈矩阵、囚徒困境、纳什均衡",
    href: "/economics/simulations",
    accent: "#56b6c2",
  },
  {
    id: "debates",
    icon: "⚖",
    title: "经济学辩论",
    count: "20+",
    description: "政府干预 vs 自由市场、供给 vs 需求侧等经典论战",
    href: "/economics/debates",
    accent: "#e06c75",
  },
  {
    id: "dialogues",
    icon: "💬",
    title: "经济学对话",
    count: "15+",
    description: "跨越时代的经济学思想交锋与对话",
    href: "/economics/dialogues",
    accent: "#98c379",
  },
  {
    id: "knowledge-base",
    icon: "📚",
    title: "知识库",
    count: "13+",
    description: "外汇、股票、债券、房产、退休规划等实用经济学指南",
    href: "/economics/knowledge-base",
    accent: "#56b6c2",
  },
  {
    id: "frontier",
    icon: "🛰",
    title: "研究前沿",
    count: "2020s",
    description: "可信性革命、市场设计、气候经济学、全球财富税——正在发生的经济学",
    href: "/economics/frontier",
    accent: "#e06c75",
  },
];

const STATS = [
  { value: 200, label: "知识条目", suffix: "+" },
  { value: 50, label: "经济学家", suffix: "+" },
  { value: 12, label: "经济学派", suffix: "" },
  { value: 10, label: "互动模拟", suffix: "" },
];

function useAnimatedCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return { ref, count };
}

function StatCounter({ value, label, suffix }: { value: number; label: string; suffix: string }) {
  const { ref, count } = useAnimatedCounter(value);
  return (
    <div className="flex flex-col items-center gap-1" ref={ref}>
      <span className="font-display text-accent-gold text-3xl font-semibold tabular-nums md:text-4xl">
        {count}
        <span className="text-fg-muted ml-0.5 text-lg">{suffix}</span>
      </span>
      <span className="text-fg-muted font-mono text-[10px] tracking-[0.28em] uppercase">
        {label}
      </span>
    </div>
  );
}

function DotGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="econ-dot-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#econ-dot-grid)" />
      </svg>
    </div>
  );
}

export default function EconomicsHomeClient() {
  const reduce = useReducedMotion();
  const d = useCallback((sec: number) => (reduce ? 0 : sec), [reduce]);

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <DotGrid />

      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      <div className="border-fg-disabled/30 pointer-events-none absolute top-16 left-6 h-3 w-3 border-t border-l" />
      <div className="border-fg-disabled/30 pointer-events-none absolute top-16 right-6 h-3 w-3 border-t border-r" />
      <div className="border-fg-disabled/30 pointer-events-none absolute bottom-6 left-6 h-3 w-3 border-b border-l" />
      <div className="border-fg-disabled/30 pointer-events-none absolute right-6 bottom-6 h-3 w-3 border-r border-b" />

      {/* Hero Section */}
      <section className="relative flex w-full flex-col items-start gap-8 px-6 pt-28 pb-24 sm:px-10 md:pt-36 md:pb-32 lg:px-16">
        <motion.p
          className="text-fg-muted font-mono text-[10px] tracking-[0.42em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: d(0.2) }}
        >
          universe · knowledge / economics
        </motion.p>

        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: d(0.4), ease: PRODUCT_EASE }}
        >
          <h1 className="font-display text-[3.2rem] leading-[1.02] tracking-tight md:text-[5rem]">
            <span className="text-fg-primary">经济学、</span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #c8a45a 0%, #e8d5a0 40%, #d47850 70%, #c8a45a 100%)",
                backgroundSize: "200% 200%",
                animation: reduce ? "none" : "gradient-shift 6s ease infinite",
              }}
            >
              金融与博弈论
            </span>
          </h1>
          <p className="text-fg-secondary max-w-xl text-sm leading-relaxed md:text-base">
            从亚当·斯密的看不见的手到纳什均衡的博弈智慧，从凯恩斯的宏观调控到行为经济学的心理洞察——
            一座探索市场机制与经济思想的知识殿堂。
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-start gap-10 pt-4 md:gap-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: d(0.8), ease: PRODUCT_EASE }}
        >
          {STATS.map((stat) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </motion.div>
      </section>

      {/* Section Cards */}
      <section className="relative z-[2] w-full px-6 pb-20 sm:px-10 lg:px-16">
        <motion.p
          className="text-fg-muted mb-8 font-mono text-[10px] tracking-[0.38em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: d(0.8) }}
        >
          探索 · explore
        </motion.p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SECTIONS.map((section, i) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: reduce ? 0 : 0.9 + i * 0.1,
                ease: PRODUCT_EASE,
              }}
            >
              <Link
                href={section.href}
                className="group border-border-faint bg-bg-near hover:bg-bg-elevated relative flex h-full flex-col gap-4 overflow-hidden border p-6 transition-all duration-500 hover:shadow-[0_0_40px_-12px_rgba(200,164,90,0.12)]"
                aria-label={`${section.title} — ${section.description}`}
              >
                <div
                  className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
                  style={{ backgroundColor: section.accent }}
                />

                <div className="relative flex items-center justify-between">
                  <span
                    className="text-2xl leading-none transition-transform duration-300 group-hover:scale-110"
                    aria-hidden
                  >
                    {section.icon}
                  </span>
                  <span
                    className="font-mono text-[10px] tracking-[0.28em] uppercase"
                    style={{ color: section.accent }}
                  >
                    {section.count}
                  </span>
                </div>

                <div className="relative flex flex-col gap-1">
                  <h2 className="font-display text-fg-primary group-hover:text-accent-gold text-xl leading-tight font-semibold transition-colors duration-300">
                    {section.title}
                  </h2>
                </div>

                <p className="text-fg-secondary flex-1 text-sm leading-relaxed">
                  {section.description}
                </p>

                <span
                  aria-hidden
                  className="text-fg-disabled group-hover:text-accent-gold mt-auto font-mono text-xs transition-all duration-300 group-hover:translate-x-1"
                >
                  →
                </span>

                <span
                  className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: section.accent }}
                  aria-hidden
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="relative z-[2] mx-auto max-w-3xl px-6 pb-24">
        <motion.div
          className="border-accent-gold/20 border-l-2 pl-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: PRODUCT_EASE }}
        >
          <blockquote className="font-display text-fg-primary text-xl leading-relaxed italic md:text-2xl">
            &ldquo;看不见的手指引着市场的每一个参与者，在追求自身利益的同时，促进了社会的整体福祉。&rdquo;
          </blockquote>
          <cite className="text-fg-muted mt-4 block font-mono text-[11px] tracking-[0.22em] uppercase not-italic">
            — 亚当·斯密 Adam Smith · 《国富论》1776
          </cite>
        </motion.div>
      </section>

      {/* Stats Footer */}
      <section className="border-border-faint border-t border-b">
        <div className="flex w-full flex-wrap items-center justify-center gap-12 px-6 py-12 sm:px-10 md:justify-between lg:px-16">
          {STATS.map((stat) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </section>

      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}
