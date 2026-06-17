"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";

import Link from "next/link";
import { useRef, useEffect, useState, useCallback, lazy, Suspense } from "react";
import { PRODUCT_EASE } from "@/subjects/life-science/lib/constants";
import {
  ERAS,
  FEATURED_SPECIES,
  QUICK_LINKS,
  STATS,
  FLOATING_SYMBOLS,
} from "@/subjects/life-science/lib/home-data";
import { SITE_URL } from "@/lib/constants";

const DNAHelix = lazy(() => import("@/subjects/life-science/components/visualizations/DNAHelix"));
const ProteinFolding = lazy(() =>
  import("@/subjects/life-science/components/visualizations/ProteinFolding").then((m) => ({
    default: m.ProteinFolding,
  }))
);
const EcosystemEnergyFlow = lazy(() =>
  import("@/subjects/life-science/components/visualizations/EcosystemEnergyFlow").then((m) => ({
    default: m.EcosystemEnergyFlow,
  }))
);
const GeneExpression = lazy(() =>
  import("@/subjects/life-science/components/visualizations/GeneExpression").then((m) => ({
    default: m.GeneExpression,
  }))
);

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Life Science",
  url: `${SITE_URL}/life-science`,
  description:
    "4 billion years of life on Earth — from self-replicating molecules to the Cambrian explosion, from dinosaurs to the rise of humankind",
  isPartOf: {
    "@type": "WebSite",
    name: "Universe Knowledge",
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
          className="text-fg-disabled/20 absolute font-mono select-none"
          style={{
            left: `${8 + i * 12.5}%`,
            top: `${10 + ((i * 37) % 80)}%`,
            fontSize: `${18 + (i % 3) * 10}px`,
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
          <pattern id="dot-grid-ls" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid-ls)" />
      </svg>
    </div>
  );
}

function StatCounter({ value, label, suffix }: { value: number; label: string; suffix: string }) {
  const { ref, count } = useAnimatedCounter(value);
  return (
    <div className="flex flex-col items-center gap-1" ref={ref}>
      <span className="font-display text-accent-green text-3xl font-semibold tabular-nums md:text-4xl">
        {count}
        <span className="text-fg-muted ml-0.5 text-lg">{suffix}</span>
      </span>
      <span className="text-fg-muted font-mono text-[10px] tracking-[0.28em] uppercase">
        {label}
      </span>
    </div>
  );
}

function EraCard({
  era,
  index,
  reduce,
}: {
  era: (typeof ERAS)[number];
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
        href={era.href}
        className="group border-border-faint bg-bg-near hover:bg-bg-elevated relative flex h-full flex-col gap-5 border p-6 transition-all duration-500 hover:shadow-[0_0_40px_-12px_rgba(74,158,111,0.12)]"
        aria-label={`${era.title} — ${era.eraLabel}`}
      >
        <div className="flex items-center justify-between">
          <span
            className="font-mono text-[10px] tracking-[0.32em] uppercase"
            style={{ color: era.accent }}
          >
            {era.eraLabel}
          </span>
          <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em]">{era.era}</span>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-display text-fg-primary group-hover:text-accent-green text-2xl leading-tight font-semibold transition-colors duration-300">
            {era.title}
          </h2>
          <p className="text-fg-muted font-mono text-[11px] tracking-wider italic">
            {era.subtitle}
          </p>
        </div>
        <p className="text-fg-secondary flex-1 text-sm leading-relaxed">{era.description}</p>
        <div className="flex flex-wrap gap-2">
          {era.markers.map((name) => (
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
          className="text-fg-disabled group-hover:text-accent-green absolute right-5 bottom-5 font-mono text-xs transition-all duration-300 group-hover:translate-x-1"
        >
          →
        </span>
        <span
          className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
          style={{ backgroundColor: era.accent }}
          aria-hidden
        />
      </Link>
    </motion.div>
  );
}

function SpeciesCard({
  species,
  index,
  reduce,
}: {
  species: (typeof FEATURED_SPECIES)[number];
  index: number;
  reduce: boolean;
}) {
  return (
    <motion.div
      className="min-w-[220px] shrink-0 snap-start"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: reduce ? 0 : 1.6 + index * 0.1, ease: PRODUCT_EASE }}
    >
      <div className="group border-border-faint bg-bg-near hover:bg-bg-elevated relative flex h-full flex-col gap-4 border p-5 transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(74,158,111,0.1)]">
        <div className="flex items-start justify-between">
          <div
            className="border-border-subtle flex h-10 w-10 items-center justify-center border text-xl"
            style={{ color: species.accent }}
          >
            {species.icon}
          </div>
          <span className="text-fg-disabled font-mono text-[9px] tracking-[0.2em]">
            {species.period}
          </span>
        </div>
        <div>
          <h3 className="font-display text-fg-primary group-hover:text-accent-green text-lg leading-snug font-semibold transition-colors duration-300">
            {species.name}
          </h3>
          <p className="text-fg-muted font-mono text-[10px] tracking-wider italic">
            {species.latin}
          </p>
        </div>
        <p className="text-fg-secondary font-mono text-sm">{species.era}</p>
        <span
          className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
          style={{ backgroundColor: species.accent }}
          aria-hidden
        />
      </div>
    </motion.div>
  );
}

export default function LifeScienceHomeClient() {
  const reduce = useReducedMotion();
  const d = useCallback((sec: number) => (reduce ? 0 : sec), [reduce]);

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
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
          universe · knowledge / life science
        </motion.p>

        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: d(0.4), ease: PRODUCT_EASE }}
        >
          <h1 className="font-display text-[3.2rem] leading-[1.02] tracking-tight md:text-[5rem]">
            <span className="text-fg-primary">生命的</span>
            <br />
            <span style={{ color: "#5ec488" }}>演化</span>
          </h1>
          <p className="text-fg-secondary max-w-xl text-sm leading-relaxed md:text-base">
            40 亿年的故事，从分子到意识——从第一个自我复制的有机分子，到寒武纪的生命大爆发，
            从恐龙的统治到人类的崛起，一部波澜壮阔的生命史诗。
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
          地质时代 · geological eras
        </motion.p>
        <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
          {ERAS.map((era, i) => (
            <EraCard key={era.id} era={era} index={i} reduce={!!reduce} />
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
          代表性物种 · featured species
        </motion.p>
        <div
          className="flex snap-x snap-mandatory scrollbar-none gap-4 overflow-x-auto pb-4"
          role="list"
        >
          {FEATURED_SPECIES.map((species, i) => (
            <SpeciesCard key={species.latin} species={species} index={i} reduce={!!reduce} />
          ))}
        </div>
      </section>

      <section className="relative z-[2] w-full px-6 pb-20 sm:px-10 lg:px-16">
        <motion.p
          className="text-fg-muted mb-8 font-mono text-[10px] tracking-[0.38em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: d(1.7) }}
        >
          DNA 双螺旋 · interactive helix
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: d(1.8), ease: PRODUCT_EASE }}
        >
          <Suspense
            fallback={<div className="border-border-faint bg-bg-near h-48 animate-pulse border" />}
          >
            <DNAHelix />
          </Suspense>
        </motion.div>
      </section>

      <section className="relative z-[2] w-full px-6 pb-20 sm:px-10 lg:px-16">
        <motion.p
          className="text-fg-muted mb-8 font-mono text-[10px] tracking-[0.38em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: d(1.9) }}
        >
          蛋白质折叠 · protein folding
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: d(2.0), ease: PRODUCT_EASE }}
        >
          <Suspense
            fallback={<div className="border-border-faint bg-bg-near h-48 animate-pulse border" />}
          >
            <ProteinFolding />
          </Suspense>
        </motion.div>
      </section>

      <section className="relative z-[2] w-full px-6 pb-20 sm:px-10 lg:px-16">
        <motion.p
          className="text-fg-muted mb-8 font-mono text-[10px] tracking-[0.38em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: d(2.1) }}
        >
          基因表达 · gene expression
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: d(2.2), ease: PRODUCT_EASE }}
        >
          <Suspense
            fallback={<div className="border-border-faint bg-bg-near h-48 animate-pulse border" />}
          >
            <GeneExpression />
          </Suspense>
        </motion.div>
      </section>

      <section className="relative z-[2] w-full px-6 pb-20 sm:px-10 lg:px-16">
        <motion.p
          className="text-fg-muted mb-8 font-mono text-[10px] tracking-[0.38em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: d(2.3) }}
        >
          生态系统能量流动 · ecosystem energy flow
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: d(2.4), ease: PRODUCT_EASE }}
        >
          <Suspense
            fallback={<div className="border-border-faint bg-bg-near h-48 animate-pulse border" />}
          >
            <EcosystemEnergyFlow />
          </Suspense>
        </motion.div>
      </section>

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
                className="group border-border-faint bg-bg-near hover:bg-bg-elevated flex flex-col gap-3 border p-5 transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(74,158,111,0.1)]"
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
                  className="text-fg-disabled group-hover:text-accent-green mt-auto font-mono text-xs transition-all duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-[2] w-full px-6 pb-24 sm:px-10 lg:px-16">
        <motion.div
          className="border-accent-green/20 border-l-2 pl-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: PRODUCT_EASE }}
        >
          <blockquote className="font-display text-fg-primary text-xl leading-relaxed italic md:text-2xl">
            &ldquo;在这个星球上，我们不过是进化之树上的一根小小枝条。&rdquo;
          </blockquote>
          <cite className="text-fg-muted mt-4 block font-mono text-[11px] tracking-[0.22em] uppercase not-italic">
            — 查尔斯·达尔文 Charles Darwin · 《物种起源》
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
