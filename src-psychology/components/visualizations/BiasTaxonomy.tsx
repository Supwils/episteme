"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { PRODUCT_EASE } from "@/src-psychology/lib/constants";

interface BiasNode {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  slug?: string;
}

interface BiasCategory {
  id: string;
  name: string;
  nameEn: string;
  color: string;
  biases: BiasNode[];
}

export const BIAS_TAXONOMY: BiasCategory[] = [
  {
    id: "decision",
    name: "决策偏误",
    nameEn: "Decision Biases",
    color: "#3b82f6",
    biases: [
      {
        id: "anchoring",
        name: "锚定效应",
        nameEn: "Anchoring Effect",
        description:
          "人们在做决策时过度依赖最先获得的信息（锚点），即使该信息与决策无关。",
        slug: "anchoring-bias",
      },
      {
        id: "framing",
        name: "框架效应",
        nameEn: "Framing Effect",
        description:
          "同一信息因表述方式不同而导致截然不同的决策结果，例如'90%存活率'比'10%死亡率'更受欢迎。",
        slug: "framing-effect",
      },
      {
        id: "sunk-cost",
        name: "沉没成本",
        nameEn: "Sunk Cost Fallacy",
        description:
          "因为已经投入了时间、金钱或精力而继续一项明知不值得的行动，而非基于未来收益做理性判断。",
        slug: "sunk-cost-fallacy",
      },
      {
        id: "endowment",
        name: "禀赋效应",
        nameEn: "Endowment Effect",
        description:
          "人们对自己拥有的物品赋予更高的价值，仅仅因为自己拥有它，而不愿意以市场价格出售。",
      },
      {
        id: "status-quo",
        name: "现状偏误",
        nameEn: "Status Quo Bias",
        description:
          "人们倾向于维持当前状态，即使改变可能带来更好的结果。这与损失厌恶密切相关。",
      },
    ],
  },
  {
    id: "social",
    name: "社会偏误",
    nameEn: "Social Biases",
    color: "#10b981",
    biases: [
      {
        id: "conformity",
        name: "从众效应",
        nameEn: "Conformity",
        description:
          "个人为了融入群体而改变自己的行为或信念，即使群体的判断明显错误。阿希实验证明了这一点。",
      },
      {
        id: "group-polarization",
        name: "群体极化",
        nameEn: "Group Polarization",
        description:
          "群体讨论后，成员的观点会趋向更极端的方向，使温和立场变得激进。",
      },
      {
        id: "halo-effect",
        name: "光环效应",
        nameEn: "Halo Effect",
        description:
          "对一个人某一方面的正面印象会扩散到对其其他方面的评价，例如外貌好的人被认为更聪明。",
      },
      {
        id: "fundamental-attribution",
        name: "基本归因错误",
        nameEn: "Fundamental Attribution Error",
        description:
          "在解释他人行为时过度归因于性格因素，而低估情境因素的影响。",
        slug: "fundamental-attribution-error",
      },
      {
        id: "outgroup-homogeneity",
        name: "外群体同质性",
        nameEn: "Outgroup Homogeneity",
        description:
          "人们倾向于认为外群体成员之间'都一样'，而认为自己所在的群体更加多样化。",
      },
    ],
  },
  {
    id: "memory",
    name: "记忆偏误",
    nameEn: "Memory Biases",
    color: "#8b5cf6",
    biases: [
      {
        id: "false-memory",
        name: "虚假记忆",
        nameEn: "False Memory",
        description:
          "人们回忆起从未发生过的事件，或对真实事件的记忆与实际情况严重不符。洛夫特斯的实验证明了记忆的可塑性。",
        slug: "false-memory",
      },
      {
        id: "hindsight",
        name: "后见之明偏误",
        nameEn: "Hindsight Bias",
        description:
          "在得知事件结果后，认为自己'早就知道了'，高估自己预测事件的能力。",
      },
      {
        id: "peak-end",
        name: "峰终定律",
        nameEn: "Peak-End Rule",
        description:
          "人们对一段经历的评价主要取决于高峰时刻和结束时刻的感受，而非整体体验的平均值。",
        slug: "peak-end-rule",
      },
      {
        id: "serial-position",
        name: "序列位置效应",
        nameEn: "Serial Position Effect",
        description:
          "在记忆一系列项目时，开头（首因效应）和结尾（近因效应）的项目比中间的更容易被记住。",
        slug: "serial-position-effect",
      },
      {
        id: "source-confusion",
        name: "来源混淆",
        nameEn: "Source Confusion",
        description:
          "记住了信息本身但忘记了信息的来源，导致将道听途说当作亲身经历，或将梦境当作真实记忆。",
      },
    ],
  },
  {
    id: "attention",
    name: "注意偏误",
    nameEn: "Attention Biases",
    color: "#f59e0b",
    biases: [
      {
        id: "confirmation",
        name: "确认偏误",
        nameEn: "Confirmation Bias",
        description:
          "人们倾向于搜索、解读和记忆那些支持自己已有信念的信息，而忽视或贬低相反的证据。",
        slug: "confirmation-bias",
      },
      {
        id: "availability",
        name: "可得性启发",
        nameEn: "Availability Heuristic",
        description:
          "根据信息在脑海中浮现的容易程度来判断事件发生的概率，导致高估生动或近期事件的可能性。",
        slug: "availability-heuristic",
      },
      {
        id: "attentional-bias",
        name: "注意力偏见",
        nameEn: "Attentional Bias",
        description:
          "人们会优先注意与当前关注点或情绪状态相关的信息，例如焦虑者更容易注意到威胁性刺激。",
      },
      {
        id: "ostrich-effect",
        name: "鸵鸟效应",
        nameEn: "Ostrich Effect",
        description:
          "人们倾向于回避可能令人不愉快的信息，就像鸵鸟把头埋进沙子里一样，假装问题不存在。",
      },
      {
        id: "bias-blind-spot",
        name: "盲点偏误",
        nameEn: "Bias Blind Spot",
        description:
          "人们能够识别他人的认知偏误，却认为自己不受同样的偏误影响，即'偏见盲区'。",
      },
    ],
  },
];

const NODE_W = 140;
const NODE_H = 44;
const CATEGORY_NODE_W = 160;
const CATEGORY_NODE_H = 52;
const V_GAP = 70;
const H_GAP = 24;
const ROOT_H = 56;

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function useTreeLayout() {
  return useMemo(() => {
    const totalLeaves = BIAS_TAXONOMY.reduce((s, c) => s + c.biases.length, 0);
    const svgWidth = Math.max(900, totalLeaves * (NODE_W + H_GAP) + 80);
    const svgHeight = ROOT_H + V_GAP + CATEGORY_NODE_H + V_GAP + NODE_H + 80;

    const rootX = svgWidth / 2;
    const rootY = 30;

    const categoryPositions: { x: number; y: number }[] = [];
    const totalBiasCount = BIAS_TAXONOMY.reduce((s, c) => s + c.biases.length, 0);
    let currentX = 40;

    for (const cat of BIAS_TAXONOMY) {
      const sectionWidth = (cat.biases.length / totalBiasCount) * (svgWidth - 80);
      const cx = currentX + sectionWidth / 2;
      categoryPositions.push({ x: cx, y: rootY + ROOT_H + V_GAP });
      currentX += sectionWidth;
    }

    const biasPositions: Map<string, { x: number; y: number; catColor: string }> = new Map();
    currentX = 40;

    for (let ci = 0; ci < BIAS_TAXONOMY.length; ci++) {
      const cat = BIAS_TAXONOMY[ci]!;
      const sectionWidth = (cat.biases.length / totalBiasCount) * (svgWidth - 80);
      const nodeSpacing = sectionWidth / (cat.biases.length + 1);

      for (let bi = 0; bi < cat.biases.length; bi++) {
        const bias = cat.biases[bi]!;
        const x = currentX + nodeSpacing * (bi + 1);
        const y = categoryPositions[ci]!.y + CATEGORY_NODE_H + V_GAP;
        biasPositions.set(bias.id, { x, y, catColor: cat.color });
      }
      currentX += sectionWidth;
    }

    return { svgWidth, svgHeight, rootX, rootY, categoryPositions, biasPositions };
  }, []);
}

function TreeNode({
  x,
  y,
  width,
  height,
  label,
  sublabel,
  color,
  isHovered,
  isActive,
  onClick,
  onHover,
  onLeave,
  reduce,
  isCategory,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  sublabel?: string;
  color: string;
  isHovered: boolean;
  isActive: boolean;
  onClick: () => void;
  onHover: () => void;
  onLeave: () => void;
  reduce: boolean;
  isCategory: boolean;
}) {
  const fillColor = isActive
    ? hexToRgba(color, 0.25)
    : isHovered
      ? hexToRgba(color, 0.18)
      : hexToRgba(color, 0.08);
  const strokeColor = isActive
    ? color
    : isHovered
      ? hexToRgba(color, 0.7)
      : hexToRgba(color, 0.35);
  const scale = isHovered && !reduce ? 1.04 : 1;

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={label}
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
      <motion.rect
        x={x - width / 2}
        y={y}
        width={width}
        height={height}
        rx={isCategory ? 10 : 8}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={isActive ? 2 : 1.2}
        animate={{ scale }}
        transition={{ duration: reduce ? 0 : 0.2, ease: PRODUCT_EASE }}
        style={{
          transformOrigin: `${x}px ${y + height / 2}px`,
          filter: isActive
            ? `drop-shadow(0 0 8px ${hexToRgba(color, 0.35)})`
            : isHovered
              ? `drop-shadow(0 0 4px ${hexToRgba(color, 0.2)})`
              : "none",
        }}
      />
      <motion.text
        x={x}
        y={sublabel ? y + height / 2 - 5 : y + height / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fill={isActive || isHovered ? color : "rgba(255,255,255,0.8)"}
        fontSize={isCategory ? 13 : 12}
        fontWeight={isCategory ? 600 : 500}
        className="pointer-events-none select-none"
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.15 }}
      >
        {label}
      </motion.text>
      {sublabel && (
        <text
          x={x}
          y={y + height / 2 + 9}
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgba(255,255,255,0.35)"
          fontSize={8}
          fontFamily="var(--font-mono)"
          className="pointer-events-none select-none"
          letterSpacing="0.08em"
        >
          {sublabel}
        </text>
      )}
    </g>
  );
}

function TreeEdge({
  x1,
  y1,
  x2,
  y2,
  color,
  isHighlighted,
  reduce,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  isHighlighted: boolean;
  reduce: boolean;
}) {
  const midY = (y1 + y2) / 2;
  const d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={isHighlighted ? hexToRgba(color, 0.6) : hexToRgba(color, 0.18)}
      strokeWidth={isHighlighted ? 2 : 1.2}
      strokeLinecap="round"
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.3 }}
      style={{
        filter: isHighlighted ? `drop-shadow(0 0 3px ${hexToRgba(color, 0.3)})` : "none",
      }}
    />
  );
}

function BiasTooltip({
  bias,
  x,
  y,
  color,
  reduce,
}: {
  bias: BiasNode;
  x: number;
  y: number;
  color: string;
  reduce: boolean;
}) {
  const tooltipW = 240;
  const tooltipH = 64;
  const tx = Math.max(8, x - tooltipW / 2);
  const ty = y - tooltipH - 12;

  return (
    <motion.g
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: reduce ? 0 : 0.2 }}
    >
      <rect
        x={tx}
        y={ty}
        width={tooltipW}
        height={tooltipH}
        rx={8}
        fill="rgba(0,0,0,0.9)"
        stroke={hexToRgba(color, 0.4)}
        strokeWidth={1}
      />
      <text
        x={tx + tooltipW / 2}
        y={ty + 18}
        textAnchor="middle"
        fill="#fff"
        fontSize={12}
        fontWeight={600}
      >
        {bias.name}
      </text>
      <foreignObject x={tx + 8} y={ty + 28} width={tooltipW - 16} height={30}>
        <div
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "10px",
            lineHeight: "1.4",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {bias.description}
        </div>
      </foreignObject>
    </motion.g>
  );
}

function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <svg
        className="text-fg-muted absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
          clipRule="evenodd"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="搜索认知偏误..."
        className="border-border-faint bg-bg-panel text-fg-primary placeholder:text-fg-disabled focus:border-accent-purple/50 w-full border py-2 pl-9 pr-4 font-mono text-xs tracking-wider outline-none transition-colors sm:w-64"
      />
    </div>
  );
}

export default function BiasTaxonomy() {
  const reduce = useReducedMotion();
  const [hoveredBias, setHoveredBias] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [expandedCats, setExpandedCats] = useState<Set<string>>(
    () => new Set(BIAS_TAXONOMY.map((c) => c.id)),
  );
  const [selectedBias, setSelectedBias] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const router = useRouter();
  const layout = useTreeLayout();

  const filteredTaxonomy = useMemo(() => {
    if (!search.trim()) return BIAS_TAXONOMY;
    const q = search.toLowerCase();
    return BIAS_TAXONOMY.map((cat) => ({
      ...cat,
      biases: cat.biases.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.nameEn.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q),
      ),
    })).filter((cat) => cat.biases.length > 0);
  }, [search]);

  const toggleCategory = useCallback((catId: string) => {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      if (next.has(catId)) {
        next.delete(catId);
      } else {
        next.add(catId);
      }
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    setExpandedCats(new Set(BIAS_TAXONOMY.map((c) => c.id)));
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedCats(new Set());
  }, []);

  const selectedBiasData = useMemo(() => {
    if (!selectedBias) return null;
    for (const cat of BIAS_TAXONOMY) {
      const bias = cat.biases.find((b) => b.id === selectedBias);
      if (bias) return { bias, category: cat };
    }
    return null;
  }, [selectedBias]);

  const allMatchedBiasIds = useMemo(() => {
    const ids = new Set<string>();
    for (const cat of filteredTaxonomy) {
      for (const b of cat.biases) {
        ids.add(b.id);
      }
    }
    return ids;
  }, [filteredTaxonomy]);

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-fg-muted font-mono text-[10px] tracking-[0.42em] uppercase">
            interactive taxonomy tree
          </p>
          <h2 className="font-display text-fg-primary mt-1 text-lg font-semibold">
            认知偏误分类树
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <SearchInput value={search} onChange={setSearch} />
          <button
            onClick={expandAll}
            className="border-border-faint text-fg-muted hover:text-fg-primary hover:border-fg-disabled/50 border px-3 py-2 font-mono text-[10px] tracking-[0.18em] uppercase transition-colors"
          >
            展开全部
          </button>
          <button
            onClick={collapseAll}
            className="border-border-faint text-fg-muted hover:text-fg-primary hover:border-fg-disabled/50 border px-3 py-2 font-mono text-[10px] tracking-[0.18em] uppercase transition-colors"
          >
            收起全部
          </button>
        </div>
      </div>

      <div className="border-border-faint bg-bg-near relative overflow-x-auto border">
        <svg
          viewBox={`0 0 ${layout.svgWidth} ${layout.svgHeight}`}
          className="h-auto w-full min-w-[700px]"
          role="img"
          aria-label="认知偏误分类树"
        >
          <defs>
            {BIAS_TAXONOMY.map((cat) => (
              <linearGradient
                key={`grad-${cat.id}`}
                id={`edge-grad-${cat.id}`}
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor={hexToRgba(cat.color, 0.5)} />
                <stop offset="100%" stopColor={hexToRgba(cat.color, 0.15)} />
              </linearGradient>
            ))}
          </defs>

          <TreeNode
            x={layout.rootX}
            y={layout.rootY}
            width={CATEGORY_NODE_W + 40}
            height={ROOT_H}
            label="认知偏误"
            sublabel="Cognitive Biases"
            color="#d4789c"
            isHovered={false}
            isActive={false}
            onClick={() => {}}
            onHover={() => {}}
            onLeave={() => {}}
            reduce={!!reduce}
            isCategory
          />

          {BIAS_TAXONOMY.map((cat, ci) => {
            const catPos = layout.categoryPositions[ci]!;
            const isExpanded = expandedCats.has(cat.id);
            const isCatHovered = hoveredCategory === cat.id;
            const isInFiltered = filteredTaxonomy.some((fc) => fc.id === cat.id);

            if (search && !isInFiltered) return null;

            return (
              <g key={cat.id}>
                <TreeEdge
                  x1={layout.rootX}
                  y1={layout.rootY + ROOT_H}
                  x2={catPos.x}
                  y2={catPos.y}
                  color={cat.color}
                  isHighlighted={isCatHovered || isExpanded}
                  reduce={!!reduce}
                />

                <TreeNode
                  x={catPos.x}
                  y={catPos.y}
                  width={CATEGORY_NODE_W}
                  height={CATEGORY_NODE_H}
                  label={cat.name}
                  sublabel={cat.nameEn}
                  color={cat.color}
                  isHovered={isCatHovered}
                  isActive={isExpanded}
                  onClick={() => toggleCategory(cat.id)}
                  onHover={() => setHoveredCategory(cat.id)}
                  onLeave={() => setHoveredCategory(null)}
                  reduce={!!reduce}
                  isCategory
                />

                <AnimatePresence>
                  {isExpanded &&
                    cat.biases.map((bias) => {
                      const pos = layout.biasPositions.get(bias.id);
                      if (!pos) return null;

                      const isMatched =
                        !search || allMatchedBiasIds.has(bias.id);
                      if (!isMatched) return null;

                      const isBiasHovered = hoveredBias === bias.id;
                      const isBiasSelected = selectedBias === bias.id;

                      return (
                        <motion.g
                          key={bias.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{
                            duration: reduce ? 0 : 0.3,
                            ease: PRODUCT_EASE,
                          }}
                        >
                          <TreeEdge
                            x1={catPos.x}
                            y1={catPos.y + CATEGORY_NODE_H}
                            x2={pos.x}
                            y2={pos.y}
                            color={cat.color}
                            isHighlighted={
                              isBiasHovered || isBiasSelected
                            }
                            reduce={!!reduce}
                          />

                          <g style={{ cursor: "pointer" }}>
                            <TreeNode
                              x={pos.x}
                              y={pos.y}
                              width={NODE_W}
                              height={NODE_H}
                              label={bias.name}
                              color={cat.color}
                              isHovered={isBiasHovered}
                              isActive={isBiasSelected}
                              onClick={() =>
                                setSelectedBias((prev) =>
                                  prev === bias.id ? null : bias.id,
                                )
                              }
                              onHover={() => setHoveredBias(bias.id)}
                              onLeave={() => setHoveredBias(null)}
                              reduce={!!reduce}
                              isCategory={false}
                            />
                          </g>
                        </motion.g>
                      );
                    })}
                </AnimatePresence>
              </g>
            );
          })}

          <AnimatePresence>
            {hoveredBias &&
              (() => {
                const pos = layout.biasPositions.get(hoveredBias);
                if (!pos) return null;
                let biasData: BiasNode | undefined;
                for (const cat of BIAS_TAXONOMY) {
                  biasData = cat.biases.find((b) => b.id === hoveredBias);
                  if (biasData) break;
                }
                if (!biasData) return null;
                return (
                  <BiasTooltip
                    key={`tip-${hoveredBias}`}
                    bias={biasData}
                    x={pos.x}
                    y={pos.y}
                    color={pos.catColor}
                    reduce={!!reduce}
                  />
                );
              })()}
          </AnimatePresence>
        </svg>

        <div className="border-border-faint border-t px-4 py-3">
          <div className="flex flex-wrap gap-4">
            {BIAS_TAXONOMY.map((cat) => (
              <div key={cat.id} className="flex items-center gap-2">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="font-mono text-[10px] tracking-[0.18em] text-fg-secondary">
                  {cat.name}
                </span>
                <span className="text-fg-disabled font-mono text-[9px]">
                  {cat.biases.length}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedBiasData && (
          <motion.div
            key={selectedBiasData.bias.id}
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
                      style={{
                        backgroundColor: selectedBiasData.category.color,
                      }}
                    />
                    <span
                      className="font-mono text-[10px] tracking-[0.32em] uppercase"
                      style={{ color: selectedBiasData.category.color }}
                    >
                      {selectedBiasData.category.nameEn}
                    </span>
                  </div>
                  <h3 className="font-display text-fg-primary text-xl font-semibold">
                    {selectedBiasData.bias.name}
                    <span className="text-fg-muted ml-2 font-mono text-xs tracking-wider">
                      {selectedBiasData.bias.nameEn}
                    </span>
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedBias(null)}
                  className="text-fg-muted hover:text-fg-primary transition-colors"
                  aria-label="关闭"
                >
                  ✕
                </button>
              </div>

              <p className="text-fg-secondary mb-5 text-sm leading-relaxed">
                {selectedBiasData.bias.description}
              </p>

              {selectedBiasData.bias.slug && (
                <button
                  onClick={() =>
                    router.push(
                      `/psychology/phenomena/${selectedBiasData.bias.slug}`,
                    )
                  }
                  className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] transition-colors"
                  style={{ color: selectedBiasData.category.color }}
                >
                  查看详情
                  <span aria-hidden>→</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
