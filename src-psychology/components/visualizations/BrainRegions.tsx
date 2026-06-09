"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PRODUCT_EASE } from "@/src-psychology/lib/constants";

interface BrainRegion {
  id: string;
  name: string;
  nameEn: string;
  color: string;
  functions: string[];
  description: string;
  relatedConcepts: string[];
  path: string;
  labelX: number;
  labelY: number;
  connections: string[];
}

const BRAIN_REGIONS: BrainRegion[] = [
  {
    id: "prefrontal",
    name: "前额叶皮层",
    nameEn: "Prefrontal Cortex",
    color: "#3b82f6",
    functions: ["决策", "计划", "人格", "社会行为"],
    description:
      `前额叶皮层是大脑的"执行中心"，负责高级认知功能。它帮助我们制定计划、做出决策、控制冲动，并在社交情境中调节行为。前额叶是人类大脑最后成熟的区域，直到25岁左右才完全发育。`,
    relatedConcepts: ["执行功能", "延迟满足", "工作记忆", "认知控制"],
    path: "M 180 120 C 180 90, 220 65, 260 60 C 290 57, 310 62, 320 70 L 320 130 C 318 150, 300 160, 280 160 C 250 160, 220 150, 200 140 C 188 133, 180 128, 180 120 Z",
    labelX: 155,
    labelY: 95,
    connections: ["amygdala", "anterior-cingulate", "striatum"],
  },
  {
    id: "amygdala",
    name: "杏仁核",
    nameEn: "Amygdala",
    color: "#ef4444",
    functions: ["恐惧", "情绪处理", "威胁检测"],
    description:
      `杏仁核是大脑的"警报系统"，对恐惧和威胁高度敏感。它能在意识察觉之前就启动恐惧反应，触发"战或逃"反应。杏仁核也参与情绪记忆的编码，这就是为什么恐惧经历往往记忆深刻。`,
    relatedConcepts: ["恐惧条件反射", "情绪记忆", "战或逃反应", "焦虑障碍"],
    path: "M 265 200 C 260 188, 270 178, 285 178 C 300 178, 310 188, 308 200 C 306 212, 296 220, 282 220 C 268 220, 262 212, 265 200 Z",
    labelX: 225,
    labelY: 210,
    connections: ["prefrontal", "hippocampus", "insula"],
  },
  {
    id: "hippocampus",
    name: "海马体",
    nameEn: "Hippocampus",
    color: "#10b981",
    functions: ["记忆形成", "空间导航"],
    description:
      `海马体是大脑的"记忆转换器"，负责将短期记忆转化为长期记忆。它也参与空间导航和情境记忆。海马体是少数能在成年后继续产生新神经元的脑区之一，这与神经可塑性密切相关。`,
    relatedConcepts: ["长期记忆", "记忆巩固", "空间认知", "神经可塑性"],
    path: "M 290 230 C 285 222, 292 214, 305 214 C 318 214, 326 222, 324 232 C 322 242, 314 248, 302 248 C 290 248, 286 240, 290 230 Z",
    labelX: 330,
    labelY: 235,
    connections: ["amygdala", "prefrontal", "striatum"],
  },
  {
    id: "anterior-cingulate",
    name: "前扣带回",
    nameEn: "Anterior Cingulate",
    color: "#8b5cf6",
    functions: ["注意", "冲突监控", "错误检测"],
    description:
      `前扣带回是大脑的"冲突检测器"，负责监控行为与预期之间的差异。当你犯错或遇到冲突时，前扣带回会激活，帮助你调整策略。它在注意力调节和情绪调节中也扮演关键角色。`,
    relatedConcepts: ["Stroop效应", "错误相关负电位", "认知灵活性", "注意控制"],
    path: "M 230 130 C 228 118, 238 108, 255 108 C 272 108, 282 118, 280 130 C 278 142, 268 150, 253 150 C 238 150, 230 142, 230 130 Z",
    labelX: 195,
    labelY: 140,
    connections: ["prefrontal", "insula", "striatum"],
  },
  {
    id: "insula",
    name: "岛叶",
    nameEn: "Insula",
    color: "#f59e0b",
    functions: ["共情", "内感受", "味觉"],
    description:
      `岛叶是大脑的"内感受中心"，负责感知身体内部状态（如心跳、呼吸、疼痛）。它也与共情能力密切相关——当我们看到他人痛苦时，岛叶会激活，让我们"感同身受"。`,
    relatedConcepts: ["镜像神经元", "共情", "躯体标记假说", "内感受意识"],
    path: "M 240 165 C 238 155, 246 147, 260 147 C 274 147, 282 155, 280 165 C 278 175, 270 182, 258 182 C 246 182, 240 175, 240 165 Z",
    labelX: 195,
    labelY: 170,
    connections: ["amygdala", "anterior-cingulate", "temporal"],
  },
  {
    id: "striatum",
    name: "纹状体",
    nameEn: "Striatum",
    color: "#eab308",
    functions: ["奖赏", "习惯", "动机"],
    description:
      `纹状体是大脑"奖赏系统"的核心，负责处理快感、动机和习惯形成。当你完成目标或获得奖赏时，纹状体会释放多巴胺，产生愉悦感。它也是成瘾行为的关键脑区。`,
    relatedConcepts: ["多巴胺", "奖赏预测误差", "习惯回路", "成瘾"],
    path: "M 275 175 C 273 167, 280 160, 292 160 C 304 160, 312 167, 310 175 C 308 183, 300 190, 290 190 C 280 190, 275 183, 275 175 Z",
    labelX: 315,
    labelY: 175,
    connections: ["prefrontal", "hippocampus", "anterior-cingulate"],
  },
  {
    id: "temporal",
    name: "颞叶",
    nameEn: "Temporal Lobe",
    color: "#06b6d4",
    functions: ["语言理解", "听觉处理"],
    description:
      `颞叶是大脑的"语言与听觉中心"，包含韦尼克区（Wernicke's area），负责理解语言。颞叶也参与面孔识别、情绪处理和长期记忆的存储。颞叶损伤可能导致失语症或面孔失认症。`,
    relatedConcepts: ["韦尼克区", "面孔识别", "语义记忆", "听觉皮层"],
    path: "M 310 120 C 308 100, 320 85, 340 80 C 360 77, 375 88, 378 105 C 380 120, 375 140, 365 155 C 355 168, 340 175, 325 175 C 312 175, 310 160, 310 145 Z",
    labelX: 380,
    labelY: 110,
    connections: ["insula", "hippocampus"],
  },
];

const CONNECTION_PAIRS: [string, string][] = [
  ["prefrontal", "amygdala"],
  ["prefrontal", "anterior-cingulate"],
  ["prefrontal", "striatum"],
  ["amygdala", "hippocampus"],
  ["amygdala", "insula"],
  ["anterior-cingulate", "insula"],
  ["anterior-cingulate", "striatum"],
  ["hippocampus", "striatum"],
  ["insula", "temporal"],
  ["hippocampus", "temporal"],
];

function getRegionCenter(region: BrainRegion): { cx: number; cy: number } {
  const nums = region.path.match(/\d+\.?\d*/g)?.map(Number) ?? [];
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (let i = 0; i < nums.length; i += 2) {
    const x = nums[i];
    const y = nums[i + 1];
    if (x !== undefined && y !== undefined) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  return { cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 };
}

function ConnectionLines({
  activeId,
  hoveredId,
}: {
  activeId: string | null;
  hoveredId: string | null;
}) {
  const regionMap = useMemo(
    () => new Map(BRAIN_REGIONS.map((r) => [r.id, r])),
    [],
  );

  return (
    <g>
      {CONNECTION_PAIRS.map(([fromId, toId]) => {
        const from = regionMap.get(fromId);
        const to = regionMap.get(toId);
        if (!from || !to) return null;

        const a = getRegionCenter(from);
        const b = getRegionCenter(to);
        const isHighlighted =
          activeId === fromId ||
          activeId === toId ||
          hoveredId === fromId ||
          hoveredId === toId;
        const isActiveConnection =
          (activeId === fromId && to.connections.includes(toId)) ||
          (activeId === toId && from.connections.includes(fromId));

        return (
          <line
            key={`${fromId}-${toId}`}
            x1={a.cx}
            y1={a.cy}
            x2={b.cx}
            y2={b.cy}
            stroke={
              isActiveConnection
                ? from.color
                : isHighlighted
                  ? "rgba(155, 125, 196, 0.4)"
                  : "rgba(155, 125, 196, 0.1)"
            }
            strokeWidth={isActiveConnection ? 2.5 : isHighlighted ? 1.5 : 0.8}
            strokeDasharray={isActiveConnection ? "none" : "4 4"}
            style={{
              transition: "all 0.3s ease",
              filter: isActiveConnection
                ? `drop-shadow(0 0 4px ${from.color}40)`
                : "none",
            }}
          />
        );
      })}
    </g>
  );
}

function PulseEffect({ region }: { region: BrainRegion }) {
  const center = getRegionCenter(region);
  return (
    <motion.circle
      cx={center.cx}
      cy={center.cy}
      r={25}
      fill="none"
      stroke={region.color}
      strokeWidth={2}
      initial={{ r: 15, opacity: 0.6 }}
      animate={{ r: 35, opacity: 0 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

function BrainRegionPath({
  region,
  isActive,
  isHovered,
  onHover,
  onLeave,
  onClick,
  reduce,
}: {
  region: BrainRegion;
  isActive: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  reduce: boolean;
}) {
  const fillOpacity = isActive ? 0.55 : isHovered ? 0.4 : 0.2;
  const strokeOpacity = isActive ? 1 : isHovered ? 0.8 : 0.4;

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${region.name} — ${region.nameEn}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      style={{ cursor: "pointer", outline: "none" }}
    >
      <motion.path
        d={region.path}
        fill={region.color}
        fillOpacity={fillOpacity}
        stroke={region.color}
        strokeWidth={isActive ? 2.5 : isHovered ? 2 : 1.2}
        strokeOpacity={strokeOpacity}
        animate={{
          fillOpacity,
          strokeOpacity,
          scale: isActive ? 1.02 : 1,
        }}
        transition={{ duration: reduce ? 0 : 0.25, ease: PRODUCT_EASE }}
        style={{
          filter: isActive
            ? `drop-shadow(0 0 8px ${region.color}60)`
            : isHovered
              ? `drop-shadow(0 0 4px ${region.color}30)`
              : "none",
          transformOrigin: `${getRegionCenter(region).cx}px ${getRegionCenter(region).cy}px`,
        }}
      />
      {isActive && !reduce && <PulseEffect region={region} />}
      <motion.text
        x={region.labelX}
        y={region.labelY}
        fill={isActive || isHovered ? region.color : "rgba(155, 125, 196, 0.5)"}
        fontSize={isActive || isHovered ? 11 : 9}
        fontFamily="var(--font-mono)"
        fontWeight={isActive ? 600 : 400}
        textAnchor="middle"
        animate={{ opacity: isActive || isHovered ? 1 : 0.5 }}
        transition={{ duration: reduce ? 0 : 0.2 }}
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        {region.name}
      </motion.text>
    </g>
  );
}

function DetailPanel({
  region,
  reduce,
}: {
  region: BrainRegion | null;
  reduce: boolean;
}) {
  return (
    <AnimatePresence mode="wait">
      {region && (
        <motion.div
          key={region.id}
          initial={{ opacity: 0, y: 16, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -8, height: 0 }}
          transition={{ duration: reduce ? 0 : 0.35, ease: PRODUCT_EASE }}
          className="overflow-hidden"
        >
          <div className="border-border-faint bg-bg-panel mt-6 border p-6 backdrop-blur-md">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <div className="mb-1 flex items-center gap-3">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: region.color }}
                  />
                  <span
                    className="font-mono text-[10px] tracking-[0.32em] uppercase"
                    style={{ color: region.color }}
                  >
                    {region.nameEn}
                  </span>
                </div>
                <h3 className="font-display text-fg-primary text-xl font-semibold">
                  {region.name}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {region.functions.map((fn) => (
                  <span
                    key={fn}
                    className="border px-2 py-0.5 font-mono text-[9px] tracking-[0.22em]"
                    style={{
                      borderColor: `${region.color}40`,
                      color: region.color,
                    }}
                  >
                    {fn}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-fg-secondary mb-5 text-sm leading-relaxed">
              {region.description}
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="border-border-faint border p-4">
                <h4 className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.22em] uppercase">
                  相关概念
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {region.relatedConcepts.map((concept) => (
                    <span
                      key={concept}
                      className="border-fg-disabled/30 text-fg-secondary border px-2 py-0.5 font-mono text-[10px] tracking-[0.18em]"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-border-faint border p-4">
                <h4 className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.22em] uppercase">
                  连接区域
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {region.connections.map((connId) => {
                    const conn = BRAIN_REGIONS.find((r) => r.id === connId);
                    if (!conn) return null;
                    return (
                      <span
                        key={connId}
                        className="border px-2 py-0.5 font-mono text-[10px] tracking-[0.18em]"
                        style={{
                          borderColor: `${conn.color}40`,
                          color: conn.color,
                        }}
                      >
                        {conn.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function BrainRegions() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const activeRegion = useMemo(
    () => BRAIN_REGIONS.find((r) => r.id === activeId) ?? null,
    [activeId],
  );

  const handleClick = useCallback(
    (id: string) => {
      setActiveId((prev) => (prev === id ? null : id));
    },
    [],
  );

  const handleHover = useCallback((id: string) => {
    setHoveredId(id);
  }, []);

  const handleLeave = useCallback(() => {
    setHoveredId(null);
  }, []);

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-fg-muted font-mono text-[10px] tracking-[0.42em] uppercase">
            interactive brain map
          </p>
          <h2 className="font-display text-fg-primary mt-1 text-lg font-semibold">
            大脑区域与心理功能
          </h2>
        </div>
        {activeRegion && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border-fg-disabled/30 text-fg-muted hover:text-fg-primary hover:border-fg-disabled/50 border px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase transition-colors"
            onClick={() => setActiveId(null)}
          >
            清除选择
          </motion.button>
        )}
      </div>

      <div className="border-border-faint bg-bg-near relative overflow-hidden border">
        <svg
          viewBox="120 40 340 240"
          className="h-auto w-full"
          role="img"
          aria-label="人类大脑侧面示意图，显示7个关键脑区"
        >
          <defs>
            <filter id="brain-glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="brain-fill" cx="50%" cy="45%" r="50%">
              <stop offset="0%" stopColor="rgba(155, 125, 196, 0.06)" />
              <stop offset="100%" stopColor="rgba(155, 125, 196, 0.02)" />
            </radialGradient>
          </defs>

          <path
            d="M 170 140
               C 165 100, 180 65, 220 50
               C 250 40, 290 38, 330 45
               C 365 52, 395 70, 410 100
               C 425 130, 428 160, 420 190
               C 412 220, 390 245, 360 258
               C 330 270, 290 275, 255 270
               C 220 265, 195 250, 180 228
               C 165 205, 162 175, 170 140 Z"
            fill="url(#brain-fill)"
            stroke="rgba(155, 125, 196, 0.2)"
            strokeWidth="1.5"
          />

          <path
            d="M 210 60 C 230 80, 225 120, 220 145 C 218 160, 215 175, 220 195"
            fill="none"
            stroke="rgba(155, 125, 196, 0.08)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <path
            d="M 280 42 C 275 70, 270 110, 268 140 C 266 170, 270 200, 275 230"
            fill="none"
            stroke="rgba(155, 125, 196, 0.06)"
            strokeWidth="0.8"
            strokeDasharray="4 4"
          />
          <path
            d="M 340 50 C 345 80, 350 120, 348 160 C 346 190, 340 220, 330 245"
            fill="none"
            stroke="rgba(155, 125, 196, 0.06)"
            strokeWidth="0.8"
            strokeDasharray="4 4"
          />

          <ConnectionLines activeId={activeId} hoveredId={hoveredId} />

          {BRAIN_REGIONS.map((region) => (
            <BrainRegionPath
              key={region.id}
              region={region}
              isActive={activeId === region.id}
              isHovered={hoveredId === region.id}
              onHover={() => handleHover(region.id)}
              onLeave={handleLeave}
              onClick={() => handleClick(region.id)}
              reduce={!!reduce}
            />
          ))}

          <text
            x={295}
            y={285}
            fill="rgba(155, 125, 196, 0.3)"
            fontSize={8}
            fontFamily="var(--font-mono)"
            textAnchor="middle"
            letterSpacing="0.15em"
          >
            SAGITTAL VIEW · 矢状面
          </text>
        </svg>

        <div className="border-border-faint border-t px-4 py-3">
          <div className="flex flex-wrap gap-3">
            {BRAIN_REGIONS.map((region) => (
              <button
                key={region.id}
                className="flex items-center gap-1.5 transition-opacity hover:opacity-100"
                style={{
                  opacity:
                    activeId === region.id || hoveredId === region.id ? 1 : 0.6,
                }}
                onClick={() => handleClick(region.id)}
                onMouseEnter={() => handleHover(region.id)}
                onMouseLeave={handleLeave}
              >
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: region.color }}
                />
                <span className="font-mono text-[9px] tracking-[0.18em] text-fg-secondary">
                  {region.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <DetailPanel region={activeRegion} reduce={!!reduce} />
    </div>
  );
}
