"use client";

import { useCallback, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PRODUCT_EASE } from "../../lib/constants";

type TrophicLevel = "producer" | "primary" | "secondary" | "top" | "decomposer";

interface Organism {
  id: string;
  name: string;
  nameEn: string;
  trophic: TrophicLevel;
  icon: string;
  description: string;
}

interface FoodLink {
  from: string;
  to: string;
}

interface Ecosystem {
  id: string;
  name: string;
  organisms: Organism[];
  links: FoodLink[];
}

const TROPHIC_COLORS: Record<TrophicLevel, string> = {
  producer: "#4a9e6f",
  primary: "#4a8fe0",
  secondary: "#e08a3a",
  top: "#e04a4a",
  decomposer: "#9b6db7",
};

const TROPHIC_LABELS: Record<TrophicLevel, string> = {
  producer: "生产者",
  primary: "初级消费者",
  secondary: "次级消费者",
  top: "顶级捕食者",
  decomposer: "分解者",
};

const ECOSYSTEMS: Ecosystem[] = [
  {
    id: "forest",
    name: "森林",
    organisms: [
      { id: "oak", name: "橡树", nameEn: "Oak", trophic: "producer", icon: "🌳", description: "多年生乔木，通过光合作用固定太阳能" },
      { id: "grass", name: "青草", nameEn: "Grass", trophic: "producer", icon: "🌿", description: "草本植物，生态系统的初级生产者" },
      { id: "berry", name: "浆果灌木", nameEn: "Berry Bush", trophic: "producer", icon: "🫐", description: "灌木植物，为动物提供食物" },
      { id: "rabbit", name: "兔子", nameEn: "Rabbit", trophic: "primary", icon: "🐇", description: "植食性哺乳动物，食物链关键环节" },
      { id: "deer", name: "鹿", nameEn: "Deer", trophic: "primary", icon: "🦌", description: "大型植食动物，影响植被结构" },
      { id: "mouse", name: "老鼠", nameEn: "Mouse", trophic: "primary", icon: "🐭", description: "小型啮齿动物，数量丰富" },
      { id: "caterpillar", name: "毛毛虫", nameEn: "Caterpillar", trophic: "primary", icon: "🐛", description: "昆虫幼虫，重要的植食者" },
      { id: "fox", name: "狐狸", nameEn: "Fox", trophic: "secondary", icon: "🦊", description: "中型捕食者，控制小型哺乳动物数量" },
      { id: "hawk", name: "鹰", nameEn: "Hawk", trophic: "secondary", icon: "🦅", description: "猛禽，空中顶级猎手" },
      { id: "snake", name: "蛇", nameEn: "Snake", trophic: "secondary", icon: "🐍", description: "爬行类捕食者，控制啮齿动物" },
      { id: "wolf", name: "狼", nameEn: "Wolf", trophic: "top", icon: "🐺", description: "顶级捕食者，维持生态平衡" },
      { id: "mushroom", name: "蘑菇", nameEn: "Mushroom", trophic: "decomposer", icon: "🍄", description: "真菌分解者，循环有机物质" },
    ],
    links: [
      { from: "rabbit", to: "grass" },
      { from: "rabbit", to: "berry" },
      { from: "deer", to: "oak" },
      { from: "deer", to: "grass" },
      { from: "deer", to: "berry" },
      { from: "mouse", to: "grass" },
      { from: "mouse", to: "berry" },
      { from: "caterpillar", to: "oak" },
      { from: "caterpillar", to: "grass" },
      { from: "fox", to: "rabbit" },
      { from: "fox", to: "mouse" },
      { from: "hawk", to: "mouse" },
      { from: "hawk", to: "rabbit" },
      { from: "hawk", to: "snake" },
      { from: "snake", to: "mouse" },
      { from: "snake", to: "caterpillar" },
      { from: "wolf", to: "deer" },
      { from: "wolf", to: "fox" },
      { from: "wolf", to: "rabbit" },
      { from: "mushroom", to: "oak" },
      { from: "mushroom", to: "grass" },
      { from: "mushroom", to: "rabbit" },
      { from: "mushroom", to: "deer" },
    ],
  },
  {
    id: "ocean",
    name: "海洋",
    organisms: [
      { id: "phyto", name: "浮游植物", nameEn: "Phytoplankton", trophic: "producer", icon: "🦠", description: "海洋初级生产者，贡献50%地球氧气" },
      { id: "kelp", name: "海带", nameEn: "Kelp", trophic: "producer", icon: "🌊", description: "大型海藻，构成海底森林" },
      { id: "shrimp", name: "磷虾", nameEn: "Krill", trophic: "primary", icon: "🦐", description: "关键物种，支撑海洋食物网" },
      { id: "sardine", name: "沙丁鱼", nameEn: "Sardine", trophic: "primary", icon: "🐟", description: "小型鱼类，群居生活" },
      { id: "turtle", name: "海龟", nameEn: "Sea Turtle", trophic: "primary", icon: "🐢", description: "古老海洋爬行动物" },
      { id: "tuna", name: "金枪鱼", nameEn: "Tuna", trophic: "secondary", icon: "🐠", description: "大型远洋鱼类" },
      { id: "seal", name: "海豹", nameEn: "Seal", trophic: "secondary", icon: "🦭", description: "海洋哺乳动物" },
      { id: "shark", name: "鲨鱼", nameEn: "Shark", trophic: "top", icon: "🦈", description: "海洋顶级捕食者" },
      { id: "whale", name: "鲸鱼", nameEn: "Whale", trophic: "top", icon: "🐋", description: "最大海洋哺乳动物" },
      { id: "bacteria", name: "海洋细菌", nameEn: "Marine Bacteria", trophic: "decomposer", icon: "🧫", description: "分解有机物，循环营养" },
    ],
    links: [
      { from: "shrimp", to: "phyto" },
      { from: "sardine", to: "phyto" },
      { from: "sardine", to: "shrimp" },
      { from: "turtle", to: "kelp" },
      { from: "turtle", to: "shrimp" },
      { from: "tuna", to: "sardine" },
      { from: "tuna", to: "shrimp" },
      { from: "seal", to: "sardine" },
      { from: "seal", to: "tuna" },
      { from: "shark", to: "tuna" },
      { from: "shark", to: "seal" },
      { from: "shark", to: "turtle" },
      { from: "whale", to: "shrimp" },
      { from: "whale", to: "sardine" },
      { from: "bacteria", to: "kelp" },
      { from: "bacteria", to: "shrimp" },
      { from: "bacteria", to: "sardine" },
    ],
  },
  {
    id: "grassland",
    name: "草原",
    organisms: [
      { id: "steppe-grass", name: "禾草", nameEn: "Steppe Grass", trophic: "producer", icon: "🌾", description: "草原主要生产者" },
      { id: "flower", name: "野花", nameEn: "Wildflower", trophic: "producer", icon: "🌻", description: "草原开花植物" },
      { id: "bison", name: "野牛", nameEn: "Bison", trophic: "primary", icon: "🦬", description: "大型植食动物" },
      { id: "prairie-dog", name: "草原犬鼠", nameEn: "Prairie Dog", trophic: "primary", icon: "🐿️", description: "群居啮齿动物" },
      { id: "grasshopper", name: "蚱蜢", nameEn: "Grasshopper", trophic: "primary", icon: "🦗", description: "昆虫植食者" },
      { id: "eagle", name: "金雕", nameEn: "Golden Eagle", trophic: "secondary", icon: "🦅", description: "草原猛禽" },
      { id: "coyote", name: "郊狼", nameEn: "Coyote", trophic: "secondary", icon: "🐕", description: "中型捕食者" },
      { id: "lion", name: "狮", nameEn: "Lion", trophic: "top", icon: "🦁", description: "草原之王" },
      { id: "vulture", name: "秃鹫", nameEn: "Vulture", trophic: "decomposer", icon: "🦃", description: "食腐鸟类，清理动物遗体" },
    ],
    links: [
      { from: "bison", to: "steppe-grass" },
      { from: "bison", to: "flower" },
      { from: "prairie-dog", to: "steppe-grass" },
      { from: "prairie-dog", to: "flower" },
      { from: "grasshopper", to: "steppe-grass" },
      { from: "grasshopper", to: "flower" },
      { from: "eagle", to: "prairie-dog" },
      { from: "eagle", to: "grasshopper" },
      { from: "coyote", to: "prairie-dog" },
      { from: "coyote", to: "bison" },
      { from: "lion", to: "bison" },
      { from: "lion", to: "coyote" },
      { from: "vulture", to: "bison" },
      { from: "vulture", to: "prairie-dog" },
    ],
  },
];

const SVG_WIDTH = 800;
const SVG_HEIGHT = 520;
const TROPHIC_Y: Record<TrophicLevel, number> = {
  top: 60,
  secondary: 170,
  primary: 290,
  producer: 410,
  decomposer: 480,
};

function getLayout(organisms: Organism[]): Map<string, { x: number; y: number }> {
  const byLevel = new Map<TrophicLevel, Organism[]>();
  for (const org of organisms) {
    const arr = byLevel.get(org.trophic) ?? [];
    arr.push(org);
    byLevel.set(org.trophic, arr);
  }
  const layout = new Map<string, { x: number; y: number }>();
  for (const [level, orgs] of byLevel) {
    const y = TROPHIC_Y[level];
    const count = orgs.length;
    const spacing = SVG_WIDTH / (count + 1);
    orgs.forEach((org, i) => {
      layout.set(org.id, { x: spacing * (i + 1), y });
    });
  }
  return layout;
}

export function FoodWeb() {
  const reduce = useReducedMotion();
  const [ecoId, setEcoId] = useState("forest");
  const [selected, setSelected] = useState<string | null>(null);
  const [removed, setRemoved] = useState<Set<string>>(new Set());

  const eco = ECOSYSTEMS.find((e) => e.id === ecoId) ?? ECOSYSTEMS[0]!;

  const activeOrganisms = useMemo(
    () => eco.organisms.filter((o) => !removed.has(o.id)),
    [eco.organisms, removed]
  );

  const activeLinks = useMemo(
    () =>
      eco.links.filter(
        (l) => !removed.has(l.from) && !removed.has(l.to)
      ),
    [eco.links, removed]
  );

  const connectedIds = useMemo(() => {
    if (!selected) return new Set<string>();
    const ids = new Set<string>([selected]);
    for (const link of activeLinks) {
      if (link.from === selected) ids.add(link.to);
      if (link.to === selected) ids.add(link.from);
    }
    return ids;
  }, [selected, activeLinks]);

  const cascadeRemoved = useMemo(() => {
    if (removed.size === 0) return new Set<string>();
    const result = new Set<string>();
    const allOrgs = eco.organisms;
    const allLinks = eco.links;
    const directRemoved = removed;

    function getPrey(orgId: string): string[] {
      return allLinks.filter((l) => l.from === orgId).map((l) => l.to);
    }

    function getPredators(orgId: string): string[] {
      return allLinks.filter((l) => l.to === orgId).map((l) => l.from);
    }

    const queue = [...directRemoved];
    const visited = new Set(directRemoved);

    while (queue.length > 0) {
      const current = queue.shift()!;
      const prey = getPrey(current);
      for (const preyId of prey) {
        if (visited.has(preyId)) continue;
        const predators = getPredators(preyId);
        const hasOtherFood = allLinks.some(
          (l) => l.to === preyId && !visited.has(l.from) && !directRemoved.has(l.from)
        );
        if (!hasOtherFood && allOrgs.find((o) => o.id === preyId)?.trophic !== "producer") {
          result.add(preyId);
          visited.add(preyId);
          queue.push(preyId);
        }
      }
    }
    return result;
  }, [removed, eco.organisms, eco.links]);

  const layout = useMemo(() => getLayout(eco.organisms), [eco.organisms]);

  const handleClick = useCallback(
    (id: string) => {
      setSelected((prev) => (prev === id ? null : id));
    },
    []
  );

  const handleRemove = useCallback((id: string) => {
    setRemoved((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setSelected(null);
  }, []);

  const handleReset = useCallback(() => {
    setRemoved(new Set());
    setSelected(null);
  }, []);

  const handleEcoChange = useCallback((id: string) => {
    setEcoId(id);
    setRemoved(new Set());
    setSelected(null);
  }, []);

  const selectedOrg = selected ? eco.organisms.find((o) => o.id === selected) : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3 px-4">
        {ECOSYSTEMS.map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => handleEcoChange(e.id)}
            className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider transition-all duration-300"
            style={{
              borderColor: ecoId === e.id ? "#4a9e6f" : "rgba(255,255,255,0.1)",
              backgroundColor: ecoId === e.id ? "rgba(74,158,111,0.15)" : "transparent",
              color: ecoId === e.id ? "#4a9e6f" : "#888",
            }}
          >
            {e.name}
          </button>
        ))}
        {removed.size > 0 && (
          <button
            type="button"
            onClick={handleReset}
            className="ml-auto rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider transition-all duration-300"
            style={{
              borderColor: "#e04a4a",
              backgroundColor: "rgba(224,74,74,0.1)",
              color: "#e04a4a",
            }}
          >
            重置生态系统
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 px-4">
        {(Object.entries(TROPHIC_LABELS) as [TrophicLevel, string][]).map(
          ([level, label]) => (
            <div key={level} className="flex items-center gap-1.5">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: TROPHIC_COLORS[level] }}
              />
              <span className="font-mono text-[9px] tracking-wider text-[#9ca3af]">
                {label}
              </span>
            </div>
          )
        )}
      </div>

      <div className="overflow-x-auto px-4">
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="h-auto w-full max-w-3xl"
          role="img"
          aria-label={`${eco.name}食物网可视化`}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="rgba(255,255,255,0.25)" />
            </marker>
            <marker
              id="arrowhead-active"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="rgba(255,255,255,0.6)" />
            </marker>
            <marker
              id="arrowhead-removed"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="rgba(224,74,74,0.5)" />
            </marker>
          </defs>

          {(Object.entries(TROPHIC_Y) as [TrophicLevel, number][]).map(
            ([level, y]) => (
              <g key={level}>
                <line
                  x1={20}
                  y1={y}
                  x2={SVG_WIDTH - 20}
                  y2={y}
                  stroke="rgba(255,255,255,0.04)"
                  strokeDasharray="4 4"
                />
                <text
                  x={12}
                  y={y + 4}
                  fill="rgba(255,255,255,0.15)"
                  fontSize="8"
                  fontFamily="monospace"
                  textAnchor="start"
                >
                  {TROPHIC_LABELS[level]}
                </text>
              </g>
            )
          )}

          {activeLinks.map((link) => {
            const from = layout.get(link.from);
            const to = layout.get(link.to);
            if (!from || !to) return null;

            const isHighlighted = selected !== null && (
              link.from === selected || link.to === selected
            );
            const isDimmed = selected !== null && !isHighlighted;

            return (
              <motion.line
                key={`${link.from}-${link.to}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isHighlighted ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.1)"}
                strokeWidth={isHighlighted ? 2 : 1}
                markerEnd={isHighlighted ? "url(#arrowhead-active)" : "url(#arrowhead)"}
                initial={reduce ? {} : { opacity: 0 }}
                animate={{ opacity: isDimmed ? 0.15 : 1 }}
                transition={{ duration: reduce ? 0 : 0.4, ease: PRODUCT_EASE }}
              />
            );
          })}

          {activeOrganisms.map((org) => {
            const pos = layout.get(org.id);
            if (!pos) return null;

            const isSelected = selected === org.id;
            const isConnected = connectedIds.has(org.id);
            const isDimmed = selected !== null && !isConnected;
            const color = TROPHIC_COLORS[org.trophic];
            const r = isSelected ? 28 : 24;

            return (
              <motion.g
                key={org.id}
                initial={reduce ? {} : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: isDimmed ? 0.25 : 1 }}
                transition={{ duration: reduce ? 0 : 0.5, ease: PRODUCT_EASE }}
                onClick={() => handleClick(org.id)}
                style={{ cursor: "pointer" }}
                role="button"
                aria-label={`${org.name} - ${TROPHIC_LABELS[org.trophic]}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleClick(org.id);
                  }
                }}
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={r}
                  fill={`${color}18`}
                  stroke={isSelected ? "#fff" : color}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  style={{
                    filter: isSelected ? `drop-shadow(0 0 8px ${color}60)` : "none",
                    transition: "all 0.3s",
                  }}
                />
                <text
                  x={pos.x}
                  y={pos.y - 2}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="16"
                  style={{ pointerEvents: "none" }}
                >
                  {org.icon}
                </text>
                <text
                  x={pos.x}
                  y={pos.y + r + 14}
                  textAnchor="middle"
                  fill="#e8e8f0"
                  fontSize="10"
                  fontWeight="600"
                  style={{ pointerEvents: "none" }}
                >
                  {org.name}
                </text>
                <text
                  x={pos.x}
                  y={pos.y + r + 26}
                  textAnchor="middle"
                  fill={color}
                  fontSize="7"
                  fontFamily="monospace"
                  opacity={0.7}
                  style={{ pointerEvents: "none" }}
                >
                  {org.nameEn}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>

      {selectedOrg && (
        <motion.div
          className="mx-4 flex flex-col gap-3 rounded-sm border p-4"
          style={{
            borderColor: `${TROPHIC_COLORS[selectedOrg.trophic]}30`,
            backgroundColor: `${TROPHIC_COLORS[selectedOrg.trophic]}08`,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: PRODUCT_EASE }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedOrg.icon}</span>
              <div>
                <p className="text-fg-primary font-display text-lg font-semibold">
                  {selectedOrg.name}
                </p>
                <p
                  className="font-mono text-[10px] tracking-wider"
                  style={{ color: TROPHIC_COLORS[selectedOrg.trophic] }}
                >
                  {TROPHIC_LABELS[selectedOrg.trophic]} · {selectedOrg.nameEn}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleRemove(selectedOrg.id)}
              className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider transition-all duration-300"
              style={{
                borderColor: "#e04a4a",
                backgroundColor: "rgba(224,74,74,0.1)",
                color: "#e04a4a",
              }}
            >
              移除物种
            </button>
          </div>
          <p className="text-fg-secondary text-sm leading-relaxed">
            {selectedOrg.description}
          </p>
          <div className="flex flex-wrap gap-4 font-mono text-[10px]">
            <span className="text-[#9ca3af]">
              被捕食者:{" "}
              {activeLinks
                .filter((l) => l.from === selectedOrg.id)
                .map((l) => eco.organisms.find((o) => o.id === l.to)?.name)
                .filter(Boolean)
                .join(", ") || "无"}
            </span>
            <span className="text-[#9ca3af]">
              捕食者:{" "}
              {activeLinks
                .filter((l) => l.to === selectedOrg.id)
                .map((l) => eco.organisms.find((o) => o.id === l.from)?.name)
                .filter(Boolean)
                .join(", ") || "无"}
            </span>
          </div>
        </motion.div>
      )}

      {removed.size > 0 && (
        <motion.div
          className="mx-4 flex flex-col gap-2 rounded-sm border p-4"
          style={{
            borderColor: "rgba(224,74,74,0.2)",
            backgroundColor: "rgba(224,74,74,0.05)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <p className="font-mono text-[11px] font-semibold tracking-wider text-[#e04a4a]">
            灭绝级联效应 · Extinction Cascade
          </p>
          <p className="text-fg-secondary text-sm leading-relaxed">
            移除:{" "}
            {[...removed].map((id) => eco.organisms.find((o) => o.id === id)?.name).filter(Boolean).join("、")}
            {cascadeRemoved.size > 0 && (
              <>
                {" → 连锁灭绝: "}
                {[...cascadeRemoved].map((id) => eco.organisms.find((o) => o.id === id)?.name).filter(Boolean).join("、")}
              </>
            )}
          </p>
          <p className="text-fg-muted text-[11px] leading-relaxed">
            移除关键物种会导致食物链断裂，依赖它的物种因缺乏食物而数量骤减，
            这就是生态学家所说的&ldquo;营养级联&rdquo;效应。
          </p>
        </motion.div>
      )}
    </div>
  );
}
