"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface MaslowLevel {
  id: string;
  label: string;
  labelEn: string;
  color: string;
  colorDark: string;
  examples: string[];
  description: string;
  critique: string;
}

const LEVELS: MaslowLevel[] = [
  {
    id: "self-actualization",
    label: "自我实现",
    labelEn: "Self-Actualization",
    color: "#8b5cf6",
    colorDark: "#6d28d9",
    examples: ["道德", "创造力", "问题解决", "接受事实", "追求意义"],
    description:
      "实现个人潜能、追求成长与意义。马斯洛认为只有约1%的人真正达到自我实现——不是因为能力不足，而是因为大多数人被较低层次的需求所困。",
    critique:
      "自我实现概念过于个人主义，忽视了关系和关怀的价值。马斯洛后期将其修正为'超越自我'（self-transcendence），认为服务比自己更大的事物才是最高需求。",
  },
  {
    id: "esteem",
    label: "尊重需求",
    labelEn: "Esteem",
    color: "#10b981",
    colorDark: "#059669",
    examples: ["自尊", "信心", "成就", "尊重他人", "社会认可"],
    description:
      "包含'自尊'（对自己能力的信心）和'他尊'（他人的认可）。尊重需求的满足产生自信感，不满足则产生自卑感。",
    critique:
      "跨文化研究表明，'自尊'的来源在集体主义文化和个人主义文化中存在显著差异。东亚文化中，'面子'和群体和谐可能比个人成就更重要。",
  },
  {
    id: "love",
    label: "社交需求",
    labelEn: "Love & Belonging",
    color: "#eab308",
    colorDark: "#ca8a04",
    examples: ["友谊", "家庭", "亲密关系", "归属感", "社区"],
    description:
      "人是社会性动物，需要友谊、亲密关系和社区归属。马斯洛认为孤独是一种'心理疾病'，归属感是心理健康的基础。",
    critique:
      "依恋理论（Bowlby）和进化心理学表明，社交需求并非'第三层'——婴儿从出生起就有强烈的依恋需求，与生理需求同时存在。",
  },
  {
    id: "safety",
    label: "安全需求",
    labelEn: "Safety",
    color: "#f59e0b",
    colorDark: "#d97706",
    examples: ["人身安全", "健康", "就业", "财产", "秩序"],
    description:
      "在危险环境中，人会放弃更高层次的需求来获得安全感。安全需求包括对稳定、保护和可预测性的追求。",
    critique:
      "战后创伤研究表明，极端环境下人们仍可能追求归属和意义。维克多·弗兰克尔在集中营中发现，有'意义感'的人生存率更高。",
  },
  {
    id: "physiological",
    label: "生理需求",
    labelEn: "Physiological",
    color: "#ef4444",
    colorDark: "#dc2626",
    examples: ["食物", "水", "睡眠", "住所", "体温调节"],
    description:
      "最基本的需求——食物、水、睡眠、住所。不满足时主导所有行为。马斯洛认为这是所有其他需求的基础。",
    critique:
      "泰和迪纳（Tay & Diener, 2011）对123个国家的调查发现，即使基本需求未完全满足，人们仍会追求社交和尊重需求——层次并非严格的。",
  },
];

const ATTRIBUTION = "Maslow, 1943 — A Theory of Human Motivation";

export function MaslowHierarchy() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [filledLevels, setFilledLevels] = useState<Set<number>>(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);

  const runFillAnimation = useCallback(() => {
    if (hasAnimated) return;
    setHasAnimated(true);

    LEVELS.forEach((_, i) => {
      const levelIndex = LEVELS.length - 1 - i;
      setTimeout(
        () => {
          setFilledLevels((prev) => new Set(prev).add(levelIndex));
        },
        prefersReducedMotion ? 0 : i * 300,
      );
    });
  }, [hasAnimated, prefersReducedMotion]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          runFillAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [runFillAnimation]);

  const toggleLevel = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const pyramidWidth = 400;
  const pyramidHeight = 360;
  const levelHeight = pyramidHeight / LEVELS.length;
  const topWidth = 60;
  const baseWidth = pyramidWidth;

  const getLevelPoints = (index: number): string => {
    const fromTop = LEVELS.length - 1 - index;
    const t1 = fromTop / LEVELS.length;
    const t2 = (fromTop + 1) / LEVELS.length;

    const w1 = topWidth + (baseWidth - topWidth) * t1;
    const w2 = topWidth + (baseWidth - topWidth) * t2;

    const y1 = t1 * pyramidHeight;
    const y2 = t2 * pyramidHeight;

    const cx = pyramidWidth / 2;
    return `${cx - w1 / 2},${y1} ${cx + w1 / 2},${y1} ${cx + w2 / 2},${y2} ${cx - w2 / 2},${y2}`;
  };

  const getLevelCenter = (index: number): { x: number; y: number } => {
    const fromTop = LEVELS.length - 1 - index;
    const t = (fromTop + 0.5) / LEVELS.length;
    const y = t * pyramidHeight;
    return { x: pyramidWidth / 2, y };
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="border-border-faint bg-bg-panel relative overflow-hidden border backdrop-blur-md">
        <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-8 blur-[80px]" style={{ background: "#8b5cf6" }} />

        <div className="relative p-6 sm:p-8">
          <div className="mb-2 flex items-center gap-3">
            <span className="border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.32em]" style={{ borderColor: "rgba(139,92,246,0.3)", color: "#8b5cf6" }}>
              需求层次理论
            </span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">1943</span>
          </div>
          <h3 className="font-display text-fg-primary mb-1 text-xl font-semibold tracking-tight">
            马斯洛需求层次金字塔
          </h3>
          <p className="text-fg-muted mb-6 text-sm">
            点击各层级查看详细内容与现代批评
          </p>

          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-12">
            <div className="flex-shrink-0">
              <svg
                viewBox={`0 0 ${pyramidWidth} ${pyramidHeight}`}
                width={pyramidWidth}
                height={pyramidHeight}
                className="mx-auto max-w-full"
                role="group"
                aria-label="马斯洛需求层次金字塔"
              >
                <defs>
                  {LEVELS.map((level, i) => (
                    <linearGradient
                      key={`grad-${i}`}
                      id={`maslow-grad-${i}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor={level.color} stopOpacity={filledLevels.has(i) ? 0.85 : 0.25} />
                      <stop offset="100%" stopColor={level.colorDark} stopOpacity={filledLevels.has(i) ? 0.95 : 0.35} />
                    </linearGradient>
                  ))}

                  <filter id="maslow-glow">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {LEVELS.map((level, i) => {
                  const isActive = activeIndex === i;
                  const isHovered = tooltipIndex === i;
                  const center = getLevelCenter(i);
                  const isTop = i === LEVELS.length - 1;

                  return (
                    <g key={level.id}>
                      <motion.polygon
                        points={getLevelPoints(i)}
                        fill={`url(#maslow-grad-${i})`}
                        stroke={level.color}
                        strokeWidth={isActive ? 2 : 1}
                        strokeOpacity={isActive ? 0.9 : 0.3}
                        filter={isTop && filledLevels.has(i) ? "url(#maslow-glow)" : undefined}
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                        animate={{
                          opacity: 1,
                          y: isActive || isHovered ? -3 : 0,
                        }}
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }
                        }
                        className="cursor-pointer"
                        onClick={() => toggleLevel(i)}
                        onMouseEnter={() => setTooltipIndex(i)}
                        onMouseLeave={() => setTooltipIndex(null)}
                        role="button"
                        aria-label={`${level.label} (${level.labelEn})`}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggleLevel(i);
                          }
                        }}
                      />
                      <motion.text
                        x={center.x}
                        y={center.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="white"
                        fontSize={isTop ? 12 : 13}
                        fontWeight={600}
                        fontFamily="var(--font-sans)"
                        className="pointer-events-none select-none"
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                        animate={{ opacity: filledLevels.has(i) ? 1 : 0.4 }}
                        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
                      >
                        {level.label}
                      </motion.text>
                    </g>
                  );
                })}

                {LEVELS.map((level, i) => {
                  const center = getLevelCenter(i);
                  const isRight = i % 2 === 0;
                  const labelX = isRight ? pyramidWidth + 10 : -10;
                  const anchor = isRight ? "start" : "end";

                  return (
                    <motion.text
                      key={`label-${i}`}
                      x={labelX}
                      y={center.y + 1}
                      textAnchor={anchor}
                      dominantBaseline="central"
                      fill={level.color}
                      fontSize={10}
                      fontFamily="var(--font-mono)"
                      letterSpacing="0.04em"
                      className="pointer-events-none select-none"
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                      animate={{ opacity: filledLevels.has(i) ? 0.7 : 0 }}
                      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.3 }}
                    >
                      {level.labelEn}
                    </motion.text>
                  );
                })}
              </svg>
            </div>

            <div className="min-w-0 flex-1">
              <AnimatePresence mode="wait">
                {activeIndex !== null ? (
                  <motion.div
                    key={LEVELS[activeIndex]!.id}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
                    className="border-border-faint bg-bg-elevated border"
                  >
                    <div className="border-b px-5 py-4" style={{ borderColor: `${LEVELS[activeIndex]!.color}20` }}>
                      <div className="flex items-center gap-3">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: LEVELS[activeIndex]!.color }}
                        />
                        <h4 className="font-display text-fg-primary text-base font-semibold">
                          {LEVELS[activeIndex]!.label}
                        </h4>
                        <span className="text-fg-disabled font-mono text-[10px] tracking-wider">
                          {LEVELS[activeIndex]!.labelEn}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4 p-5">
                      <div>
                        <h5 className="text-fg-muted mb-2 font-mono text-[10px] uppercase tracking-[0.22em]">
                          描述
                        </h5>
                        <p className="text-fg-secondary text-sm leading-relaxed">
                          {LEVELS[activeIndex]!.description}
                        </p>
                      </div>

                      <div>
                        <h5 className="text-fg-muted mb-2 font-mono text-[10px] uppercase tracking-[0.22em]">
                          核心要素
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {LEVELS[activeIndex]!.examples.map((ex) => (
                            <span
                              key={ex}
                              className="border px-2.5 py-1 font-mono text-[10px] tracking-[0.18em]"
                              style={{
                                borderColor: `${LEVELS[activeIndex]!.color}30`,
                                color: LEVELS[activeIndex]!.color,
                              }}
                            >
                              {ex}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="text-fg-muted mb-2 font-mono text-[10px] uppercase tracking-[0.22em]">
                          现代批评
                        </h5>
                        <div
                          className="border-l-2 py-2 pl-3 text-sm leading-relaxed"
                          style={{
                            borderLeftColor: `${LEVELS[activeIndex]!.color}40`,
                            color: "var(--color-fg-secondary)",
                          }}
                        >
                          {LEVELS[activeIndex]!.critique}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                    animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1 }}
                    className="border-border-faint bg-bg-elevated/50 border p-6"
                  >
                    <p className="text-fg-muted text-center text-sm">
                      点击金字塔上的任一层级，查看该需求层次的详细描述、核心要素与现代批评
                    </p>
                    <div className="mt-4 grid grid-cols-5 gap-1.5">
                      {LEVELS.map((level, i) => (
                        <button
                          key={level.id}
                          onClick={() => toggleLevel(i)}
                          className="group flex flex-col items-center gap-1.5 rounded-md p-2 transition-colors hover:bg-white/5"
                        >
                          <div
                            className="h-2 w-full rounded-full opacity-60 transition-opacity group-hover:opacity-100"
                            style={{ backgroundColor: level.color }}
                          />
                          <span
                            className="text-fg-disabled text-center font-mono text-[8px] leading-tight tracking-wider transition-colors group-hover:text-fg-secondary"
                          >
                            {level.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="border-border-faint mt-6 border-t pt-4 text-center">
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
              {ATTRIBUTION}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
