"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState, useCallback } from "react";
import { PRODUCT_EASE } from "@/lib/constants";

const SCHOOLS = [
  {
    id: "ancient-greek",
    era: "公元前 6 世纪 — 公元 3 世纪",
    eraLabel: "古典",
    title: "古希腊哲学",
    subtitle: "Ancient Greek Philosophy",
    description:
      "从米利都学派对自然本原的追问，到苏格拉底的辩证法、柏拉图的理型论、亚里士多德的形式逻辑——西方哲学的奠基时代。",
    href: "/schools",
    figures: ["Plato", "Aristotle", "Socrates", "Heraclitus"],
    accent: "#6ad0ff",
  },
  {
    id: "eastern",
    era: "公元前 6 世纪 — 至今",
    eraLabel: "东方",
    title: "东方哲学",
    subtitle: "Eastern Philosophy",
    description:
      "儒家以仁礼立人伦秩序，道家以无为问道法自然，佛家以四圣谛解脱苦难。三条思路穿越两千五百年。",
    href: "/schools",
    figures: ["孔子", "老子", "释迦牟尼", "孟子"],
    accent: "#c8a45a",
  },
  {
    id: "modern",
    era: "17 世纪 — 20 世纪初",
    eraLabel: "近现代",
    title: "近现代哲学",
    subtitle: "Modern Philosophy",
    description:
      "笛卡尔开启理性主义，休谟迫使康德惊醒，黑格尔重构历史，尼采宣告上帝已死，维特根斯坦划定哲学的边界。",
    href: "/schools",
    figures: ["Kant", "Nietzsche", "Wittgenstein", "Hegel"],
    accent: "#7aaa8a",
  },
  {
    id: "contemporary",
    era: "20 世纪中叶 — 至今",
    eraLabel: "当代",
    title: "当代哲学",
    subtitle: "Contemporary Philosophy",
    description:
      "分析哲学与大陆哲学的裂痕、语言转向、解构主义、正义理论、技术伦理——在科学时代重新追问存在性挑战。",
    href: "/schools",
    figures: ["Rawls", "Foucault", "Derrida", "Parfit"],
    accent: "#a88adf",
  },
] as const;

const THINKERS = [
  { name: "柏拉图", latin: "Plato", era: "前 428—前 348", quote: "哲学始于惊奇。", accent: "#6ad0ff" },
  { name: "亚里士多德", latin: "Aristotle", era: "前 384—前 322", quote: "吾爱吾师，吾更爱真理。", accent: "#6ad0ff" },
  { name: "孔子", latin: "Confucius", era: "前 551—前 479", quote: "己所不欲，勿施于人。", accent: "#c8a45a" },
  { name: "康德", latin: "Kant", era: "1724—1804", quote: "有两样东西，愈是思索愈惊叹。", accent: "#7aaa8a" },
  { name: "尼采", latin: "Nietzsche", era: "1844—1900", quote: "那些杀不死我的，使我更强大。", accent: "#7aaa8a" },
  { name: "维特根斯坦", latin: "Wittgenstein", era: "1889—1951", quote: "凡不可说的，必须沉默。", accent: "#a88adf" },
] as const;

const QUICK_LINKS = [
  { href: "/thinkers", label: "哲学家", icon: "Φ", description: "20 位东西方哲学家的生平、思想与遗产", accent: "#6ad0ff" },
  { href: "/schools", label: "流派", icon: "◎", description: "32 个跨越文明的哲学流派全景图", accent: "#c8a45a" },
  { href: "/isms", label: "主义", icon: "∑", description: "从唯物主义到存在主义的思想光谱", accent: "#7aaa8a" },
  { href: "/experiments", label: "思想实验", icon: "∞", description: "12 个改变哲学进程的思想实验", accent: "#a88adf" },
  { href: "/questions", label: "大问题", icon: "?", description: "哲学史上最根本的追问与回答", accent: "#6ad0ff" },
] as const;

const STATS = [
  { value: 37, label: "哲学家", suffix: "位" },
  { value: 32, label: "流派", suffix: "个" },
  { value: 108, label: "时间线事件", suffix: "件" },
  { value: 12, label: "思想实验", suffix: "个" },
] as const;

const FLOATING_SYMBOLS = ["φ", "θ", "∞", "π", "Ω", "λ", "Δ", "ψ"] as const;

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

function DotGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs><pattern id="dot-grid" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.8" fill="currentColor" /></pattern></defs>
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
        {count}<span className="text-fg-muted ml-0.5 text-lg">{suffix}</span>
      </span>
      <span className="text-fg-muted font-mono text-[10px] tracking-[0.28em] uppercase">{label}</span>
    </div>
  );
}

function SchoolCard({ school, index, reduce }: { school: (typeof SCHOOLS)[number]; index: number; reduce: boolean }) {
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
          <h2 className="font-display text-fg-primary text-2xl font-semibold leading-tight transition-colors duration-300 group-hover:text-accent-gold">{school.title}</h2>
          <p className="text-fg-muted font-mono text-[11px] italic tracking-wider">{school.subtitle}</p>
        </div>
        <p className="text-fg-secondary flex-1 text-sm leading-relaxed">{school.description}</p>
        <div className="flex flex-wrap gap-2">{school.figures.map((name) => (
            <span key={name} className="border-fg-disabled/30 text-fg-muted rounded-none border px-2 py-0.5 font-mono text-[9px] tracking-[0.22em] uppercase transition-colors duration-300 group-hover:border-border-subtle">{name}</span>
        ))}</div>
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

function ThinkerCard({ thinker, index, reduce }: { thinker: (typeof THINKERS)[number]; index: number; reduce: boolean }) {
  return (
    <motion.div
      className="min-w-[240px] shrink-0 snap-start"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: reduce ? 0 : 1.6 + index * 0.1, ease: PRODUCT_EASE }}
    >
      <div className="group border-border-faint bg-bg-near hover:bg-bg-elevated relative flex h-full flex-col gap-4 border p-5 transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(200,164,90,0.1)]">
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center border border-border-subtle font-display text-lg italic" style={{ color: thinker.accent }}>{thinker.name[0]}</div>
          <span className="text-fg-disabled font-mono text-[9px] tracking-[0.2em]">{thinker.era}</span>
        </div>
        <div>
          <h3 className="font-display text-fg-primary text-lg font-semibold leading-snug transition-colors duration-300 group-hover:text-accent-gold">{thinker.name}</h3>
          <p className="text-fg-muted font-mono text-[10px] italic tracking-wider">{thinker.latin}</p>
        </div>
        <p className="text-fg-secondary text-sm leading-relaxed italic">"{thinker.quote}"</p>
        <span
          className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
          style={{ backgroundColor: thinker.accent }}
          aria-hidden
        />
      </div>
    </motion.div>
  );
}

export default function PhilosophyHomePage() {
  const reduce = useReducedMotion();
  const d = useCallback((sec: number) => (reduce ? 0 : sec), [reduce]);

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <DotGrid />
      <FloatingSymbols reduce={!!reduce} />

      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        aria-hidden />

      {/* Corner marks */}
      <div className="border-fg-disabled/30 pointer-events-none absolute top-16 left-6 h-3 w-3 border-t border-l" />
      <div className="border-fg-disabled/30 pointer-events-none absolute top-16 right-6 h-3 w-3 border-t border-r" />
      <div className="border-fg-disabled/30 pointer-events-none absolute bottom-6 left-6 h-3 w-3 border-b border-l" />
      <div className="border-fg-disabled/30 pointer-events-none absolute right-6 bottom-6 h-3 w-3 border-r border-b" />

      {/* Hero */}
      <section className="relative mx-auto flex max-w-5xl flex-col items-start gap-8 px-6 pt-28 pb-24 md:pt-36 md:pb-32">
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
            <span className="text-fg-primary">思想的</span><br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #c8a45a 0%, #e8d5a0 40%, #c8a45a 60%, #7aaa8a 100%)", backgroundSize: "200% 200%", animation: reduce ? "none" : "gradient-shift 6s ease infinite" }}>地图</span>
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
            <StatCounter key={stat.label} value={stat.value} label={stat.label} suffix={stat.suffix} />
          ))}
        </motion.div>
      </section>

      {/* School Grid */}
      <section className="relative z-[2] mx-auto max-w-6xl px-6 pb-20">
        <motion.p
          className="text-fg-muted mb-8 font-mono text-[10px] tracking-[0.38em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: d(0.8) }}
        >
          主要流派 · schools
        </motion.p>
        <div className="grid grid-cols-1 gap-px sm:grid-cols-2">
          {SCHOOLS.map((school, i) => (
            <SchoolCard key={school.id} school={school} index={i} reduce={!!reduce} />
          ))}
        </div>
      </section>

      {/* Featured Thinkers */}
      <section className="relative z-[2] mx-auto max-w-6xl px-6 pb-20">
        <motion.p
          className="text-fg-muted mb-8 font-mono text-[10px] tracking-[0.38em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: d(1.4) }}
        >
          重要思想家 · featured thinkers
        </motion.p>
        <div className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4" role="list">
          {THINKERS.map((thinker, i) => (
            <ThinkerCard key={thinker.latin} thinker={thinker} index={i} reduce={!!reduce} />
          ))}
        </div>
      </section>

      {/* Quick Explore */}
      <section className="relative z-[2] mx-auto max-w-6xl px-6 pb-24">
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

      {/* Pull Quote */}
      <section className="relative z-[2] mx-auto max-w-3xl px-6 pb-24">
        <motion.div
          className="border-accent-gold/20 border-l-2 pl-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: PRODUCT_EASE }}
        >
          <blockquote className="font-display text-fg-primary text-xl leading-relaxed italic md:text-2xl">
            "未经审视的人生不值得过。"
          </blockquote>
          <cite className="text-fg-muted mt-4 block font-mono text-[11px] tracking-[0.22em] uppercase not-italic">
            — 苏格拉底 Socrates · 公元前 399 年
          </cite>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="border-border-faint border-t border-b">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-12 px-6 py-12 md:justify-between">
          {STATS.map((stat) => (
            <StatCounter key={stat.label} value={stat.value} label={stat.label} suffix={stat.suffix} />
          ))}
        </div>
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
