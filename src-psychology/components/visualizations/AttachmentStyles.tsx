"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface AttachmentStyle {
  id: string;
  label: string;
  labelEn: string;
  color: string;
  colorDark: string;
  anxiety: "low" | "high";
  avoidance: "low" | "high";
  brief: string;
  description: string;
  characteristics: string[];
  patterns: string[];
  tips: string[];
}

const STYLES: AttachmentStyle[] = [
  {
    id: "secure",
    label: "安全型",
    labelEn: "Secure",
    color: "#10b981",
    colorDark: "#059669",
    anxiety: "low",
    avoidance: "low",
    brief: "舒适亲密，信任他人",
    description:
      "安全型依恋是最健康的依恋类型。个体在亲密关系中感到舒适，能够信任他人，善于处理冲突与分离。早期照料者敏感一致的回应形成了\u201C安全基地\u201D，使个体有信心探索世界并建立深层连接。",
    characteristics: [
      "对亲密感到舒适",
      "信任伴侣与朋友",
      "健康的情感表达",
      "能有效处理冲突",
      "适度依赖与独立",
    ],
    patterns: [
      "关系稳定且持久",
      "沟通开放坦诚",
      "能给予和接受支持",
      "分手后恢复力强",
    ],
    tips: [
      "继续保持开放的沟通方式",
      "在关系中保持自我成长",
      "成为他人的安全基地",
    ],
  },
  {
    id: "anxious",
    label: "焦虑型",
    labelEn: "Anxious",
    color: "#f59e0b",
    colorDark: "#d97706",
    anxiety: "high",
    avoidance: "low",
    brief: "渴望亲密但担心被抛弃",
    description:
      "焦虑型依恋的个体对亲密关系有强烈的渴求，同时伴随着对被抛弃的深层恐惧。他们倾向于过度激活依恋系统——放大威胁信号，不断增加对伴侣的依赖与监控。早期照料者不一致的回应使他们无法形成可靠的预期。",
    characteristics: [
      "强烈需要确认与保证",
      "对关系信号高度敏感",
      "害怕被抛弃或忽视",
      "情绪波动较大",
      "过度关注伴侣行为",
    ],
    patterns: [
      '"追逐-退缩"恶性循环',
      "频繁寻求关系确认",
      "可能过度牺牲自我",
      "分手后难以释怀",
    ],
    tips: [
      "练习自我安抚与情绪调节",
      "识别并挑战灾难化思维",
      "培养独立的兴趣与社交圈",
    ],
  },
  {
    id: "avoidant",
    label: "回避型",
    labelEn: "Avoidant",
    color: "#3b82f6",
    colorDark: "#2563eb",
    anxiety: "low",
    avoidance: "high",
    brief: "重视独立，不习惯亲密",
    description:
      "回避型依恋的个体强调独立与自我依赖，对深层亲密感到不适。他们采用\u201C去激活\u201D策略——压抑依恋需求，回避深层情感交流。早期照料者对身体接触的拒绝或不敏感，使他们学会了压抑情感需求。生理测量显示他们表面的\u201C冷静\u201D下实际有很高的应激水平。",
    characteristics: [
      "高度重视独立自主",
      "情感表达受限",
      "对亲密感到不适",
      "倾向理性化处理情感",
      "需要大量个人空间",
    ],
    patterns: [
      "关系中保持情感距离",
      "在亲密加深时退缩",
      "淡化早期依恋经历",
      "可能理想化独立状态",
    ],
    tips: [
      "逐步练习情感脆弱性",
      "觉察回避行为的触发点",
      "理解亲密不等于失去自我",
    ],
  },
  {
    id: "disorganized",
    label: "混乱型",
    labelEn: "Disorganized",
    color: "#ef4444",
    colorDark: "#dc2626",
    anxiety: "high",
    avoidance: "high",
    brief: "既渴望又恐惧亲密",
    description:
      "混乱型依恋是最复杂的依恋类型，个体同时持有对亲密的渴望和恐惧。他们面临一个无法解决的悖论：依恋系统驱使他们接近照料者以获得安慰，但照料者恰恰是恐惧的来源。这导致了矛盾、无方向或冻结的关系行为。",
    characteristics: [
      "关系模式不稳定",
      "同时渴望与恐惧亲密",
      "情绪调节困难",
      "可能出现解离反应",
      "对他人意图高度警觉",
    ],
    patterns: [
      "关系中反复出现矛盾行为",
      "接近与逃离交替出现",
      "难以建立稳定的信任",
      "可能重现创伤性关系模式",
    ],
    tips: [
      "寻求专业心理治疗支持",
      "学习识别身体的冻结反应",
      "在安全环境中练习信任",
    ],
  },
];

const ATTRIBUTION = "Bartholomew & Horowitz, 1991 — A Four-Category Model";

const GRID_SIZE = 500;
const PADDING = 60;
const INNER = GRID_SIZE - PADDING * 2;
const HALF = INNER / 2;

const getQuadrantRect = (style: AttachmentStyle) => {
  const x = style.avoidance === "low" ? PADDING : PADDING + HALF;
  const y = style.anxiety === "high" ? PADDING : PADDING + HALF;
  return { x, y, width: HALF, height: HALF };
};

const getQuadrantCenter = (style: AttachmentStyle) => {
  const rect = getQuadrantRect(style);
  return {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2,
  };
};

export default function AttachmentStyles() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [userPos, setUserPos] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const svgPoint = useCallback(
    (clientX: number, clientY: number) => {
      const svg = svgRef.current;
      if (!svg) return null;
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const ctm = svg.getScreenCTM();
      if (!ctm) return null;
      return pt.matrixTransform(ctm.inverse());
    },
    [],
  );

  const clampToGrid = useCallback((px: number, py: number) => ({
    x: Math.max(PADDING, Math.min(PADDING + INNER, px)),
    y: Math.max(PADDING, Math.min(PADDING + INNER, py)),
  }), []);

  const getNearestStyle = useCallback((px: number, py: number): AttachmentStyle => {
    const midX = PADDING + HALF;
    const midY = PADDING + HALF;
    const avoidance = px >= midX ? "high" : "low";
    const anxiety = py <= midY ? "high" : "low";
    return STYLES.find(
      (s) => s.avoidance === avoidance && s.anxiety === anxiety,
    )!;
  }, []);

  const handleSvgPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!showAssessment) return;
      const pt = svgPoint(e.clientX, e.clientY);
      if (!pt) return;
      const clamped = clampToGrid(pt.x, pt.y);
      setUserPos(clamped);
      setIsDragging(true);
      (e.target as Element).setPointerCapture(e.pointerId);
    },
    [showAssessment, svgPoint, clampToGrid],
  );

  const handleSvgPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const pt = svgPoint(e.clientX, e.clientY);
      if (!pt) return;
      setUserPos(clampToGrid(pt.x, pt.y));
    },
    [isDragging, svgPoint, clampToGrid],
  );

  const handleSvgPointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const toggleQuadrant = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const activeStyle = STYLES.find((s) => s.id === activeId);
  const userStyle = userPos ? getNearestStyle(userPos.x, userPos.y) : null;

  return (
    <div ref={containerRef} className="w-full">
      <div className="border-border-faint bg-bg-panel relative overflow-hidden border backdrop-blur-md">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-8 blur-[80px]"
          style={{ background: "#d4789c" }}
        />

        <div className="relative p-6 sm:p-8">
          <div className="mb-2 flex items-center gap-3">
            <span
              className="border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.32em]"
              style={{ borderColor: "rgba(212,120,156,0.3)", color: "#d4789c" }}
            >
              依恋理论
            </span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">1991</span>
          </div>
          <h3 className="font-display text-fg-primary mb-1 text-xl font-semibold tracking-tight">
            依恋类型二维模型
          </h3>
          <p className="text-fg-muted mb-6 text-sm">
            点击各象限查看详细描述，或开启自我评估在图中标注你的位置
          </p>

          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-12">
            <div className="flex-shrink-0">
              <svg
                ref={svgRef}
                viewBox={`0 0 ${GRID_SIZE} ${GRID_SIZE}`}
                width={GRID_SIZE}
                height={GRID_SIZE}
                className="mx-auto max-w-full select-none"
                role="group"
                aria-label="依恋类型二维矩阵"
                onPointerDown={handleSvgPointerDown}
                onPointerMove={handleSvgPointerMove}
                onPointerUp={handleSvgPointerUp}
                style={{ touchAction: "none" }}
              >
                <defs>
                  {STYLES.map((style) => (
                    <linearGradient
                      key={`grad-${style.id}`}
                      id={`attach-grad-${style.id}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor={style.color} stopOpacity={0.15} />
                      <stop offset="100%" stopColor={style.colorDark} stopOpacity={0.25} />
                    </linearGradient>
                  ))}
                  <filter id="attach-glow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="dot-shadow">
                    <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.4" />
                  </filter>
                </defs>

                {/* Grid background */}
                <rect
                  x={PADDING}
                  y={PADDING}
                  width={INNER}
                  height={INNER}
                  fill="none"
                  stroke="var(--color-border-faint)"
                  strokeWidth="1"
                />

                {/* Quadrant backgrounds */}
                {STYLES.map((style) => {
                  const rect = getQuadrantRect(style);
                  const isActive = activeId === style.id;
                  return (
                    <motion.rect
                      key={style.id}
                      x={rect.x}
                      y={rect.y}
                      width={rect.width}
                      height={rect.height}
                      fill={`url(#attach-grad-${style.id})`}
                      stroke={style.color}
                      strokeWidth={isActive ? 2 : 1}
                      strokeOpacity={isActive ? 0.6 : 0.15}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                      animate={{
                        opacity: hasAnimated ? 1 : 0,
                        scale: isActive ? 1.01 : 1,
                      }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }
                      }
                      className="cursor-pointer"
                      onClick={() => toggleQuadrant(style.id)}
                      role="button"
                      aria-label={`${style.label} (${style.labelEn})`}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleQuadrant(style.id);
                        }
                      }}
                    />
                  );
                })}

                {/* Center cross lines */}
                <line
                  x1={PADDING + HALF}
                  y1={PADDING}
                  x2={PADDING + HALF}
                  y2={PADDING + INNER}
                  stroke="var(--color-border-faint)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <line
                  x1={PADDING}
                  y1={PADDING + HALF}
                  x2={PADDING + INNER}
                  y2={PADDING + HALF}
                  stroke="var(--color-border-faint)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />

                {/* Style labels */}
                {STYLES.map((style) => {
                  const center = getQuadrantCenter(style);
                  const isActive = activeId === style.id;
                  return (
                    <motion.g
                      key={`label-${style.id}`}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                      animate={{ opacity: hasAnimated ? 1 : 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 0.5, delay: 0.2 }
                      }
                    >
                      <text
                        x={center.x}
                        y={center.y - 18}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={style.color}
                        fontSize={isActive ? 18 : 16}
                        fontWeight={700}
                        fontFamily="var(--font-sans)"
                        className="pointer-events-none"
                      >
                        {style.label}
                      </text>
                      <text
                        x={center.x}
                        y={center.y + 2}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={style.color}
                        fontSize={10}
                        fontFamily="var(--font-mono)"
                        letterSpacing="0.06em"
                        opacity={0.7}
                        className="pointer-events-none"
                      >
                        {style.labelEn}
                      </text>
                      <text
                        x={center.x}
                        y={center.y + 22}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="var(--color-fg-muted)"
                        fontSize={11}
                        fontFamily="var(--font-sans)"
                        className="pointer-events-none"
                      >
                        {style.brief}
                      </text>
                    </motion.g>
                  );
                })}

                {/* Axis labels */}
                <text
                  x={PADDING + INNER / 2}
                  y={GRID_SIZE - 14}
                  textAnchor="middle"
                  fill="var(--color-fg-muted)"
                  fontSize={11}
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.08em"
                >
                  回避程度 →
                </text>
                <text
                  x={16}
                  y={PADDING + INNER / 2}
                  textAnchor="middle"
                  fill="var(--color-fg-muted)"
                  fontSize={11}
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.08em"
                  transform={`rotate(-90, 16, ${PADDING + INNER / 2})`}
                >
                  焦虑程度 ↑
                </text>

                {/* Axis tick labels */}
                <text x={PADDING} y={GRID_SIZE - 30} textAnchor="middle" fill="var(--color-fg-disabled)" fontSize={9} fontFamily="var(--font-mono)">
                  低
                </text>
                <text x={PADDING + INNER} y={GRID_SIZE - 30} textAnchor="middle" fill="var(--color-fg-disabled)" fontSize={9} fontFamily="var(--font-mono)">
                  高
                </text>
                <text x={30} y={PADDING + INNER} textAnchor="middle" fill="var(--color-fg-disabled)" fontSize={9} fontFamily="var(--font-mono)" transform={`rotate(-90, 30, ${PADDING + INNER})`}>
                  低
                </text>
                <text x={30} y={PADDING} textAnchor="middle" fill="var(--color-fg-disabled)" fontSize={9} fontFamily="var(--font-mono)" transform={`rotate(-90, 30, ${PADDING})`}>
                  高
                </text>

                {/* User position dot */}
                {userPos && (
                  <motion.g
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <circle
                      cx={userPos.x}
                      cy={userPos.y}
                      r={10}
                      fill={userStyle?.color ?? "#d4789c"}
                      filter="url(#dot-shadow)"
                      className={isDragging ? "cursor-grabbing" : "cursor-grab"}
                    />
                    <circle
                      cx={userPos.x}
                      cy={userPos.y}
                      r={16}
                      fill="none"
                      stroke={userStyle?.color ?? "#d4789c"}
                      strokeWidth="1.5"
                      strokeOpacity="0.4"
                    />
                    <text
                      x={userPos.x}
                      y={userPos.y - 26}
                      textAnchor="middle"
                      fill={userStyle?.color ?? "#d4789c"}
                      fontSize={10}
                      fontWeight={600}
                      fontFamily="var(--font-sans)"
                      className="pointer-events-none"
                    >
                      你
                    </text>
                  </motion.g>
                )}
              </svg>

              {/* Assessment toggle */}
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => {
                    setShowAssessment((prev) => {
                      if (!prev) {
                        setUserPos({ x: PADDING + HALF / 2, y: PADDING + HALF + HALF / 2 });
                      } else {
                        setUserPos(null);
                      }
                      return !prev;
                    });
                  }}
                  className={`border px-4 py-2 font-mono text-[11px] tracking-[0.18em] transition-all ${
                    showAssessment
                      ? "border-accent-pink/50 text-accent-pink bg-accent-pink/10"
                      : "border-border-faint text-fg-muted hover:border-fg-disabled/40 hover:text-fg-secondary"
                  }`}
                >
                  {showAssessment ? "关闭评估" : "你在哪里？"}
                </button>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <AnimatePresence mode="wait">
                {activeId && activeStyle ? (
                  <motion.div
                    key={activeStyle.id}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }
                    }
                    className="border-border-faint bg-bg-elevated border"
                  >
                    <div
                      className="border-b px-5 py-4"
                      style={{ borderColor: `${activeStyle.color}20` }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: activeStyle.color }}
                        />
                        <h4 className="font-display text-fg-primary text-base font-semibold">
                          {activeStyle.label}
                        </h4>
                        <span className="text-fg-disabled font-mono text-[10px] tracking-wider">
                          {activeStyle.labelEn}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4 p-5">
                      <div>
                        <h5 className="text-fg-muted mb-2 font-mono text-[10px] uppercase tracking-[0.22em]">
                          描述
                        </h5>
                        <p className="text-fg-secondary text-sm leading-relaxed">
                          {activeStyle.description}
                        </p>
                      </div>

                      <div>
                        <h5 className="text-fg-muted mb-2 font-mono text-[10px] uppercase tracking-[0.22em]">
                          核心特征
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {activeStyle.characteristics.map((c) => (
                            <span
                              key={c}
                              className="border px-2.5 py-1 font-mono text-[10px] tracking-[0.18em]"
                              style={{
                                borderColor: `${activeStyle.color}30`,
                                color: activeStyle.color,
                              }}
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="text-fg-muted mb-2 font-mono text-[10px] uppercase tracking-[0.22em]">
                          关系模式
                        </h5>
                        <ul className="space-y-1.5">
                          {activeStyle.patterns.map((p) => (
                            <li
                              key={p}
                              className="text-fg-secondary flex items-start gap-2 text-sm"
                            >
                              <span
                                className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full"
                                style={{ backgroundColor: activeStyle.color }}
                              />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-fg-muted mb-2 font-mono text-[10px] uppercase tracking-[0.22em]">
                          成长建议
                        </h5>
                        <div
                          className="border-l-2 py-2 pl-3 text-sm leading-relaxed"
                          style={{
                            borderLeftColor: `${activeStyle.color}40`,
                            color: "var(--color-fg-secondary)",
                          }}
                        >
                          <ul className="space-y-1">
                            {activeStyle.tips.map((t) => (
                              <li key={t}>{t}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : userPos && userStyle ? (
                  <motion.div
                    key="user-result"
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }
                    }
                    className="border-border-faint bg-bg-elevated border"
                  >
                    <div
                      className="border-b px-5 py-4"
                      style={{ borderColor: `${userStyle.color}20` }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: userStyle.color }}
                        />
                        <h4 className="font-display text-fg-primary text-base font-semibold">
                          你的位置：{userStyle.label}
                        </h4>
                      </div>
                    </div>
                    <div className="space-y-4 p-5">
                      <p className="text-fg-secondary text-sm leading-relaxed">
                        {userStyle.description}
                      </p>
                      <div>
                        <h5 className="text-fg-muted mb-2 font-mono text-[10px] uppercase tracking-[0.22em]">
                          成长建议
                        </h5>
                        <div
                          className="border-l-2 py-2 pl-3 text-sm leading-relaxed"
                          style={{
                            borderLeftColor: `${userStyle.color}40`,
                            color: "var(--color-fg-secondary)",
                          }}
                        >
                          <ul className="space-y-1">
                            {userStyle.tips.map((t) => (
                              <li key={t}>{t}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <p className="text-fg-disabled text-[11px] leading-relaxed">
                        提示：依恋类型不是固定不变的。通过自我觉察和有意识的实践，你可以逐步向安全型移动。拖动圆点探索不同位置。
                      </p>
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
                      点击矩阵上的任一象限，查看该依恋类型的详细描述、关系模式与成长建议
                    </p>
                    <div className="mt-4 grid grid-cols-4 gap-1.5">
                      {STYLES.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => toggleQuadrant(style.id)}
                          className="group flex flex-col items-center gap-1.5 rounded-md p-2 transition-colors hover:bg-white/5"
                        >
                          <div
                            className="h-2 w-full rounded-full opacity-60 transition-opacity group-hover:opacity-100"
                            style={{ backgroundColor: style.color }}
                          />
                          <span className="text-fg-disabled text-center font-mono text-[8px] leading-tight tracking-wider transition-colors group-hover:text-fg-secondary">
                            {style.label}
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
