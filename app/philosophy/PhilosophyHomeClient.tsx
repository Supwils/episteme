"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { serializeJsonLd } from "@/lib/jsonld";

import Link from "next/link";
import { useRef, useEffect, useState, useCallback } from "react";
import { PRODUCT_EASE } from "@/subjects/philosophy/lib/constants";
import {
  SCHOOLS,
  THINKERS,
  QUICK_LINKS,
  STATS,
  FLOATING_SYMBOLS,
} from "@/subjects/philosophy/lib/home-data";
import { ThinkerCarousel } from "@/subjects/philosophy/components/ThinkerCarousel";
import QuotesTimeline from "@/subjects/philosophy/components/visualizations/QuotesTimeline";
import { SITE_URL } from "@/lib/constants";

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Philosophy",
  url: `${SITE_URL}/philosophy`,
  description:
    "Philosophers and history of thought — a knowledge graph spanning ancient Greek philosophy to contemporary analytic philosophy",
  isPartOf: {
    "@type": "WebSite",
    name: "Episteme · 格致",
    url: SITE_URL,
  },
};

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

function FloatingSymbols({ reduce }: { reduce: boolean }) {
  if (reduce) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {FLOATING_SYMBOLS.map((sym, i) => (
        <motion.span
          key={i}
          className="font-display text-fg-disabled/20 absolute select-none"
          style={{
            left: `${8 + i * 12.5}%`,
            top: `${10 + ((i * 37) % 80)}%`,
            fontSize: `${20 + (i % 3) * 12}px`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 1.2, delay: 1 + i * 0.15 },
            y: { duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          {sym}
        </motion.span>
      ))}
    </div>
  );
}

function DotGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dot-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>
    </div>
  );
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

function SchoolCard({
  school,
  index,
  reduce,
}: {
  school: (typeof SCHOOLS)[number];
  index: number;
  reduce: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: reduce ? 0 : 0.9 + index * 0.12, ease: PRODUCT_EASE }}
    >
      <Link
        href={school.href}
        className="group border-border-faint bg-bg-near hover:bg-bg-elevated relative flex h-full flex-col gap-5 border p-6 transition-all duration-500 hover:shadow-[0_0_40px_-12px_rgba(200,164,90,0.12)]"
        aria-label={`${school.title} — ${school.eraLabel}`}
      >
        <div className="flex items-center justify-between">
          <span
            className="font-mono text-[10px] tracking-[0.32em] uppercase"
            style={{ color: school.accent }}
          >
            {school.eraLabel}
          </span>
          <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em]">
            {school.era}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-display text-fg-primary group-hover:text-accent-gold text-2xl leading-tight font-semibold transition-colors duration-300">
            {school.title}
          </h2>
          <p className="text-fg-muted font-mono text-[11px] tracking-wider italic">
            {school.subtitle}
          </p>
        </div>
        <p className="text-fg-secondary flex-1 text-sm leading-relaxed">{school.description}</p>
        <div className="flex flex-wrap gap-2">
          {school.figures.map((name) => (
            <span
              key={name}
              className="border-fg-disabled/30 text-fg-muted group-hover:border-border-subtle rounded-none border px-2 py-0.5 font-mono text-[9px] tracking-[0.22em] uppercase transition-colors duration-300"
            >
              {name}
            </span>
          ))}
        </div>
        <span
          aria-hidden
          className="text-fg-disabled group-hover:text-accent-gold absolute right-5 bottom-5 font-mono text-xs transition-all duration-300 group-hover:translate-x-1"
        >
          →
        </span>
        <span
          className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
          style={{ backgroundColor: school.accent }}
          aria-hidden
        />
      </Link>
    </motion.div>
  );
}

export default function PhilosophyHomeClient() {
  const reduce = useReducedMotion();
  const d = useCallback((sec: number) => (reduce ? 0 : sec), [reduce]);

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionJsonLd) }}
      />
      <DotGrid />
      <FloatingSymbols reduce={!!reduce} />

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

      <section className="relative flex w-full flex-col items-start gap-8 px-6 pt-28 pb-24 sm:px-10 md:pt-36 md:pb-32 lg:px-16">
        <motion.p
          className="text-fg-muted font-mono text-[10px] tracking-[0.42em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: d(0.2) }}
        >
          universe · knowledge / philosophy
        </motion.p>

        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: d(0.4), ease: PRODUCT_EASE }}
        >
          <h1 className="font-display text-[3.2rem] leading-[1.02] tracking-tight md:text-[5rem]">
            <span className="text-fg-primary">思想的</span>
            <br />
            <span className="text-accent-gold">地图</span>
          </h1>
          <p className="text-fg-secondary max-w-xl text-sm leading-relaxed md:text-base">
            从古希腊广场的问答到当代语言哲学的边界，从孔子的仁礼到尼采的权力意志——
            一座穿越文明与时代的哲学知识图谱。
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

      <section className="relative z-[2] w-full px-6 pb-20 sm:px-10 lg:px-16">
        <motion.p
          className="text-fg-muted mb-8 font-mono text-[10px] tracking-[0.38em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: d(0.8) }}
        >
          主要流派 · schools
        </motion.p>
        <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {SCHOOLS.map((school, i) => (
            <SchoolCard key={school.id} school={school} index={i} reduce={!!reduce} />
          ))}
        </div>
      </section>

      <section className="relative z-[2] w-full px-6 pb-20 sm:px-10 lg:px-16">
        <motion.p
          className="text-fg-muted mb-8 font-mono text-[10px] tracking-[0.38em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: d(1.4) }}
        >
          重要思想家 · featured thinkers
        </motion.p>
        <ThinkerCarousel thinkers={THINKERS} />
      </section>

      <QuotesTimeline />

      <section className="relative z-[2] w-full px-6 pb-24 sm:px-10 lg:px-16">
        <motion.p
          className="text-fg-muted mb-8 font-mono text-[10px] tracking-[0.38em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: d(2.0) }}
        >
          探索 · explore
        </motion.p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {QUICK_LINKS.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: d(2.1 + i * 0.08), ease: PRODUCT_EASE }}
            >
              <Link
                href={link.href}
                className="group border-border-faint bg-bg-near hover:bg-bg-elevated flex flex-col gap-3 border p-5 transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(200,164,90,0.1)]"
              >
                <span
                  className="font-display text-2xl leading-none transition-transform duration-300 group-hover:scale-110"
                  style={{ color: link.accent }}
                  aria-hidden
                >
                  {link.icon}
                </span>
                <span
                  className="font-mono text-[10px] tracking-[0.28em] uppercase"
                  style={{ color: link.accent }}
                >
                  {link.label}
                </span>
                <p className="text-fg-secondary text-sm leading-relaxed">{link.description}</p>
                <span
                  aria-hidden
                  className="text-fg-disabled group-hover:text-accent-gold mt-auto font-mono text-xs transition-all duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-[2] mx-auto max-w-3xl px-6 pb-24">
        <motion.div
          className="border-accent-gold/20 border-l-2 pl-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: PRODUCT_EASE }}
        >
          <blockquote className="font-display text-fg-primary text-xl leading-relaxed italic md:text-2xl">
            &ldquo;未经审视的人生不值得过。&rdquo;
          </blockquote>
          <cite className="text-fg-muted mt-4 block font-mono text-[11px] tracking-[0.22em] uppercase not-italic">
            — 苏格拉底 Socrates · 公元前 399 年
          </cite>
        </motion.div>
      </section>

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
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
