"use client";

import { useCallback, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PRODUCT_EASE } from "@/src-psychology/lib/constants";

interface EmotionSegment {
  id: string;
  label: string;
  labelEn: string;
  color: string;
  intensities: [string, string, string];
  angle: number;
  combinations: { with: string; result: string }[];
  relatedConcepts: string[];
  description: string;
}

const EMOTIONS: EmotionSegment[] = [
  {
    id: "joy",
    label: "快乐",
    labelEn: "Joy",
    color: "#eab308",
    intensities: ["宁静", "快乐", "欣喜"],
    angle: 0,
    combinations: [
      { with: "信任", result: "爱" },
      { with: "期待", result: "乐观" },
    ],
    relatedConcepts: ["正向心理学", "心流", "多巴胺"],
    description: "快乐是最基本的正向情绪之一，与奖赏系统和多巴胺分泌密切相关。心理学家契克森米哈赖提出的心流理论认为，当技能与挑战匹配时，人会体验到深层快乐。",
  },
  {
    id: "trust",
    label: "信任",
    labelEn: "Trust",
    color: "#10b981",
    intensities: ["接纳", "信任", "钦佩"],
    angle: 45,
    combinations: [
      { with: "恐惧", result: "服从" },
      { with: "快乐", result: "爱" },
    ],
    relatedConcepts: ["依恋理论", "社会认同", "催产素"],
    description: "信任是社会纽带的基础。鲍尔比的依恋理论表明，早期与照料者的关系决定了个体的信任模式，影响终生的人际关系质量。",
  },
  {
    id: "fear",
    label: "恐惧",
    labelEn: "Fear",
    color: "#06b6d4",
    intensities: ["忧虑", "恐惧", "恐慌"],
    angle: 90,
    combinations: [
      { with: "惊讶", result: "敬畏" },
      { with: "信任", result: "服从" },
    ],
    relatedConcepts: ["杏仁核", "战斗或逃跑", "暴露疗法"],
    description: "恐惧是生存的核心情绪，由杏仁核快速处理。沃尔普的暴露疗法证明，通过系统脱敏可以有效治疗恐惧症。",
  },
  {
    id: "surprise",
    label: "惊讶",
    labelEn: "Surprise",
    color: "#3b82f6",
    intensities: ["分神", "惊讶", "惊愕"],
    angle: 135,
    combinations: [
      { with: "悲伤", result: "失望" },
      { with: "恐惧", result: "敬畏" },
    ],
    relatedConcepts: ["注意力捕获", "预测误差", "习惯化"],
    description: "惊讶是唯一没有正负极性的情绪，它标志着预期与现实的偏差。认知神经科学中的预测编码理论认为，惊讶驱动了大脑的学习机制。",
  },
  {
    id: "sadness",
    label: "悲伤",
    labelEn: "Sadness",
    color: "#6366f1",
    intensities: ["忧郁", "悲伤", "悲痛"],
    angle: 180,
    combinations: [
      { with: "厌恶", result: "悔恨" },
      { with: "惊讶", result: "失望" },
    ],
    relatedConcepts: ["丧失与哀悼", "抑郁症", "共情"],
    description: "悲伤帮助个体处理丧失和分离。弗洛伊德在《哀悼与忧郁》中区分了正常的哀悼与病理性抑郁。现代研究表明，适度的悲伤能增强共情能力。",
  },
  {
    id: "disgust",
    label: "厌恶",
    labelEn: "Disgust",
    color: "#8b5cf6",
    intensities: ["无聊", "厌恶", "蔑视"],
    angle: 225,
    combinations: [
      { with: "愤怒", result: "轻蔑" },
      { with: "悲伤", result: "悔恨" },
    ],
    relatedConcepts: ["道德厌恶", "面孔识别", "味觉回避"],
    description: "厌恶最初是保护机体免受有害物质侵害的生理反应，后演化出道德厌恶——对不道德行为的排斥。海特的道德基础理论将其列为核心道德直觉之一。",
  },
  {
    id: "anger",
    label: "愤怒",
    labelEn: "Anger",
    color: "#ef4444",
    intensities: ["烦躁", "愤怒", "暴怒"],
    angle: 270,
    combinations: [
      { with: "期待", result: "攻击性" },
      { with: "厌恶", result: "轻蔑" },
    ],
    relatedConcepts: ["挫折-攻击假说", "认知重评", "愤怒管理"],
    description: "愤怒源于目标受阻或权利被侵犯。多拉德的挫折-攻击假说认为挫折总是导致某种形式的攻击。现代情绪调节理论强调认知重评对管理愤怒的重要性。",
  },
  {
    id: "anticipation",
    label: "期待",
    labelEn: "Anticipation",
    color: "#f59e0b",
    intensities: ["兴趣", "期待", "警觉"],
    angle: 315,
    combinations: [
      { with: "快乐", result: "乐观" },
      { with: "愤怒", result: "攻击性" },
    ],
    relatedConcepts: ["预期情绪", "延迟满足", "目标设定"],
    description: "期待是面向未来的情绪，驱动目标导向行为。棉花糖实验揭示了延迟满足能力与长期成功之间的关联，而期待正是这一能力的情绪基础。",
  },
];

const INTENSITY_LABELS = ["轻微", "中等", "强烈"];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number,
) {
  const gap = 1.5;
  const s = startAngle + gap;
  const e = endAngle - gap;
  const innerStart = polarToCartesian(cx, cy, innerR, e);
  const innerEnd = polarToCartesian(cx, cy, innerR, s);
  const outerStart = polarToCartesian(cx, cy, outerR, s);
  const outerEnd = polarToCartesian(cx, cy, outerR, e);
  const largeArc = e - s > 180 ? 1 : 0;
  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerStart.x} ${innerStart.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerEnd.x} ${innerEnd.y}`,
    "Z",
  ].join(" ");
}

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function lightenHex(hex: string, amount: number) {
  const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + amount);
  const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + amount);
  const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + amount);
  return `rgb(${r},${g},${b})`;
}

const CX = 250;
const CY = 250;
const RINGS: readonly { inner: number; outer: number }[] = [
  { inner: 50, outer: 110 },
  { inner: 114, outer: 170 },
  { inner: 174, outer: 230 },
];
const SEGMENT_ANGLE = 45;

interface SegmentPathProps {
  emotion: EmotionSegment;
  ringIndex: number;
  isHovered: boolean;
  isSelected: boolean;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
  reduce: boolean;
}

function SegmentPath({
  emotion,
  ringIndex,
  isHovered,
  isSelected,
  onHover,
  onClick,
  reduce,
}: SegmentPathProps) {
  const ring = RINGS[ringIndex]!;
  const startAngle = emotion.angle;
  const endAngle = emotion.angle + SEGMENT_ANGLE;
  const d = describeArc(CX, CY, ring.inner, ring.outer, startAngle, endAngle);
  const midAngle = emotion.angle + SEGMENT_ANGLE / 2;
  const labelR = (ring.inner + ring.outer) / 2;
  const labelPos = polarToCartesian(CX, CY, labelR, midAngle);

  const baseAlpha = 0.35 + ringIndex * 0.22;
  const fillColor = isHovered || isSelected
    ? hexToRgba(emotion.color, baseAlpha + 0.25)
    : hexToRgba(emotion.color, baseAlpha);

  const fontSize = ringIndex === 0 ? 10 : ringIndex === 1 ? 11 : 12;
  const scale = isHovered && !reduce ? 1.03 : 1;
  const transform = `rotate(0, ${CX}, ${CY})`;

  return (
    <g
      onMouseEnter={() => onHover(emotion.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(emotion.id)}
      style={{ cursor: "pointer" }}
    >
      <motion.path
        d={d}
        fill={fillColor}
        stroke={isSelected ? emotion.color : hexToRgba(emotion.color, 0.4)}
        strokeWidth={isSelected ? 2 : 0.5}
        style={{ transform, transformOrigin: `${CX}px ${CY}px` }}
        animate={{
          scale,
          opacity: 1,
        }}
        transition={{ duration: reduce ? 0 : 0.2, ease: PRODUCT_EASE }}
      />
      <motion.text
        x={labelPos.x}
        y={labelPos.y}
        textAnchor="middle"
        dominantBaseline="central"
        fill="currentColor"
        fontSize={fontSize}
        fontWeight={ringIndex === 2 ? 600 : 400}
        className="pointer-events-none select-none"
        style={{ color: isHovered || isSelected ? "#fff" : "rgba(255,255,255,0.8)" }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.15 }}
      >
        {emotion.intensities[ringIndex]}
      </motion.text>
      {isHovered && !reduce && (
        <motion.circle
          cx={CX}
          cy={CY}
          r={ring.outer + 2}
          fill="none"
          stroke={hexToRgba(emotion.color, 0.3)}
          strokeWidth={1}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />
      )}
    </g>
  );
}

function EmotionTooltip({
  emotion,
  reduce,
}: {
  emotion: EmotionSegment;
  reduce: boolean;
}) {
  const outerR = RINGS[2]!.outer + 8;
  const midAngle = emotion.angle + SEGMENT_ANGLE / 2;
  const pos = polarToCartesian(CX, CY, outerR + 30, midAngle);

  return (
    <motion.g
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: reduce ? 0 : 0.2 }}
    >
      <rect
        x={pos.x - 44}
        y={pos.y - 14}
        width={88}
        height={28}
        rx={6}
        fill="rgba(0,0,0,0.85)"
        stroke={hexToRgba(emotion.color, 0.5)}
        strokeWidth={1}
      />
      <text
        x={pos.x}
        y={pos.y + 1}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#fff"
        fontSize={11}
        fontWeight={600}
      >
        {emotion.label} {emotion.labelEn}
      </text>
    </motion.g>
  );
}

interface DetailPanelProps {
  emotion: EmotionSegment;
  allEmotions: EmotionSegment[];
  onClose: () => void;
  reduce: boolean;
}

function DetailPanel({ emotion, allEmotions, onClose, reduce }: DetailPanelProps) {
  return (
    <motion.div
      className="border-border-faint bg-bg-near mt-6 w-full max-w-lg border p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: reduce ? 0 : 0.35, ease: PRODUCT_EASE }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="inline-block h-4 w-4 rounded-sm"
            style={{ backgroundColor: emotion.color }}
          />
          <h3 className="font-display text-fg-primary text-xl font-semibold">
            {emotion.label}
            <span className="text-fg-muted ml-2 font-mono text-xs tracking-wider">
              {emotion.labelEn}
            </span>
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-fg-muted hover:text-fg-primary transition-colors"
          aria-label="关闭"
        >
          ✕
        </button>
      </div>

      <p className="text-fg-secondary mb-4 text-sm leading-relaxed">
        {emotion.description}
      </p>

      <div className="mb-4">
        <h4 className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.28em] uppercase">
          强度层级
        </h4>
        <div className="flex gap-2">
          {emotion.intensities.map((label, i) => (
            <span
              key={i}
              className="rounded-sm px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: hexToRgba(emotion.color, 0.12 + i * 0.1),
                color: emotion.color,
              }}
            >
              {INTENSITY_LABELS[i]}：{label}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.28em] uppercase">
          情绪组合
        </h4>
        <div className="flex flex-col gap-2">
          {emotion.combinations.map((combo, i) => {
            const other = allEmotions.find((e) => e.label === combo.with);
            return (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span
                  className="rounded-sm px-2 py-0.5 text-xs"
                  style={{
                    backgroundColor: hexToRgba(emotion.color, 0.12),
                    color: emotion.color,
                  }}
                >
                  {emotion.label}
                </span>
                <span className="text-fg-muted">+</span>
                <span
                  className="rounded-sm px-2 py-0.5 text-xs"
                  style={{
                    backgroundColor: other ? hexToRgba(other.color, 0.12) : "rgba(255,255,255,0.05)",
                    color: other?.color ?? "#999",
                  }}
                >
                  {combo.with}
                </span>
                <span className="text-fg-muted">=</span>
                <span className="text-fg-primary font-medium">{combo.result}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.28em] uppercase">
          相关概念
        </h4>
        <div className="flex flex-wrap gap-2">
          {emotion.relatedConcepts.map((concept) => (
            <span
              key={concept}
              className="border-border-faint text-fg-secondary rounded-sm border px-2 py-0.5 text-xs"
            >
              {concept}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function EmotionWheel() {
  const reduce = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedEmotion = useMemo(
    () => EMOTIONS.find((e) => e.id === selectedId) ?? null,
    [selectedId],
  );

  const handleHover = useCallback((id: string | null) => setHoveredId(id), []);
  const handleClick = useCallback(
    (id: string) => setSelectedId((prev) => (prev === id ? null : id)),
    [],
  );
  const handleClose = useCallback(() => setSelectedId(null), []);

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 500 500"
        className="h-auto w-full max-w-[500px]"
        role="img"
        aria-label="普拉切克情绪轮"
      >
        <defs>
          {EMOTIONS.map((emotion) => (
            <linearGradient
              key={`grad-${emotion.id}`}
              id={`grad-${emotion.id}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={lightenHex(emotion.color, 60)} />
              <stop offset="100%" stopColor={emotion.color} />
            </linearGradient>
          ))}
        </defs>

        {RINGS.map((ring, ri) => (
          <circle
            key={`ring-${ri}`}
            cx={CX}
            cy={CY}
            r={ring.outer}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth={0.5}
          />
        ))}

        {EMOTIONS.map((emotion) =>
          RINGS.map((_, ri) => (
            <SegmentPath
              key={`${emotion.id}-${ri}`}
              emotion={emotion}
              ringIndex={ri}
              isHovered={hoveredId === emotion.id}
              isSelected={selectedId === emotion.id}
              onHover={handleHover}
              onClick={handleClick}
              reduce={!!reduce}
            />
          )),
        )}

        <circle cx={CX} cy={CY} r={46} fill="rgba(0,0,0,0.6)" />
        <circle
          cx={CX}
          cy={CY}
          r={46}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={1}
        />
        <text
          x={CX}
          y={CY - 4}
          textAnchor="middle"
          dominantBaseline="central"
          className="font-display"
          fill="rgba(255,255,255,0.9)"
          fontSize={16}
          fontWeight={600}
        >
          情绪
        </text>
        <text
          x={CX}
          y={CY + 14}
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgba(255,255,255,0.4)"
          fontSize={9}
          className="font-mono"
        >
          Emotion
        </text>

        {hoveredId &&
          !selectedId &&
          EMOTIONS.filter((e) => e.id === hoveredId).map((emotion) => (
            <EmotionTooltip
              key={`tip-${emotion.id}`}
              emotion={emotion}
              reduce={!!reduce}
            />
          ))}
      </svg>

      <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2">
        {EMOTIONS.map((emotion) => (
          <button
            key={emotion.id}
            onClick={() => handleClick(emotion.id)}
            onMouseEnter={() => handleHover(emotion.id)}
            onMouseLeave={() => handleHover(null)}
            className={`flex items-center gap-1.5 rounded-sm px-2 py-1 text-xs transition-all duration-200 ${
              selectedId === emotion.id
                ? "bg-bg-elevated"
                : "hover:bg-bg-near"
            }`}
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: emotion.color }}
            />
            <span
              className={`font-medium ${
                selectedId === emotion.id
                  ? "text-fg-primary"
                  : "text-fg-secondary"
              }`}
            >
              {emotion.label}
            </span>
            <span className="text-fg-disabled font-mono text-[9px]">
              {emotion.labelEn}
            </span>
          </button>
        ))}
      </div>

      {selectedEmotion && (
        <DetailPanel
          emotion={selectedEmotion}
          allEmotions={EMOTIONS}
          onClose={handleClose}
          reduce={!!reduce}
        />
      )}
    </div>
  );
}
