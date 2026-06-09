"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/subjects/physics/lib/cn";
import { usePrefersReducedMotion } from "@/subjects/physics/scenes-handwritten/shared/usePrefersReducedMotion";

type ParticleType = "quark" | "lepton" | "boson";

interface Particle {
  id: string;
  name: string;
  symbol: string;
  type: ParticleType;
  generation?: number;
  mass: string;
  charge: string;
  spin: string;
  description: string;
  antiparticle?: string;
}

const QUARKS: Particle[] = [
  {
    id: "up",
    name: "上夸克",
    symbol: "u",
    type: "quark",
    generation: 1,
    mass: "2.2 MeV/c²",
    charge: "+2/3",
    spin: "1/2",
    description: "第一代夸克，构成质子和中子的基本成分。质子包含两个上夸克和一个下夸克。",
    antiparticle: "反上夸克 (ū)",
  },
  {
    id: "down",
    name: "下夸克",
    symbol: "d",
    type: "quark",
    generation: 1,
    mass: "4.7 MeV/c²",
    charge: "-1/3",
    spin: "1/2",
    description: "第一代夸克，与上夸克共同构成原子核。中子包含两个下夸克和一个上夸克。",
    antiparticle: "反下夸克 (d̄)",
  },
  {
    id: "charm",
    name: "粲夸克",
    symbol: "c",
    type: "quark",
    generation: 2,
    mass: "1.27 GeV/c²",
    charge: "+2/3",
    spin: "1/2",
    description: "第二代夸克，1974年通过J/ψ介子的发现而被证实。在高能碰撞中产生。",
    antiparticle: "反粲夸克 (c̄)",
  },
  {
    id: "strange",
    name: "奇异夸克",
    symbol: "s",
    type: "quark",
    generation: 2,
    mass: "96 MeV/c²",
    charge: "-1/3",
    spin: "1/2",
    description: "第二代夸克，含奇异夸克的粒子在宇宙射线中被首次发现。K介子和Λ粒子含有奇异夸克。",
    antiparticle: "反奇异夸克 (s̄)",
  },
  {
    id: "top",
    name: "顶夸克",
    symbol: "t",
    type: "quark",
    generation: 3,
    mass: "173 GeV/c²",
    charge: "+2/3",
    spin: "1/2",
    description: "最重的基本粒子，1995年在费米实验室被发现。寿命极短，约5×10⁻²⁵秒。",
    antiparticle: "反顶夸克 (t̄)",
  },
  {
    id: "bottom",
    name: "底夸克",
    symbol: "b",
    type: "quark",
    generation: 3,
    mass: "4.18 GeV/c²",
    charge: "-1/3",
    spin: "1/2",
    description: "第三代夸克，B介子含有底夸克。B介子工厂用于研究CP对称性破缺。",
    antiparticle: "反底夸克 (b̄)",
  },
];

const LEPTONS: Particle[] = [
  {
    id: "electron",
    name: "电子",
    symbol: "e",
    type: "lepton",
    generation: 1,
    mass: "0.511 MeV/c²",
    charge: "-1",
    spin: "1/2",
    description: "最轻的带电粒子，围绕原子核运动构成原子的电子云。化学键的本质就是电子的共享与转移。",
    antiparticle: "正电子 (e⁺)",
  },
  {
    id: "electron-neutrino",
    name: "电子中微子",
    symbol: "νₑ",
    type: "lepton",
    generation: 1,
    mass: "< 1.1 eV/c²",
    charge: "0",
    spin: "1/2",
    description: "质量极小，几乎不与物质发生相互作用。太阳核聚变产生大量电子中微子。",
    antiparticle: "反电子中微子 (ν̄ₑ)",
  },
  {
    id: "muon",
    name: "μ子",
    symbol: "μ",
    type: "lepton",
    generation: 2,
    mass: "105.7 MeV/c²",
    charge: "-1",
    spin: "1/2",
    description: "第二代带电轻子，在宇宙射线中大量产生。寿命约2.2微秒，衰变为电子和中微子。",
    antiparticle: "反μ子 (μ⁺)",
  },
  {
    id: "muon-neutrino",
    name: "μ中微子",
    symbol: "ν_μ",
    type: "lepton",
    generation: 2,
    mass: "< 0.17 MeV/c²",
    charge: "0",
    spin: "1/2",
    description: "在π介子衰变中产生。中微子振荡实验表明它具有非零质量。",
    antiparticle: "反μ中微子 (ν̄_μ)",
  },
  {
    id: "tau",
    name: "τ子",
    symbol: "τ",
    type: "lepton",
    generation: 3,
    mass: "1.777 GeV/c²",
    charge: "-1",
    spin: "1/2",
    description: "最重的带电轻子，寿命极短（约2.9×10⁻¹³秒）。1975年在SLAC被发现。",
    antiparticle: "反τ子 (τ⁺)",
  },
  {
    id: "tau-neutrino",
    name: "τ中微子",
    symbol: "ν_τ",
    type: "lepton",
    generation: 3,
    mass: "< 18.2 MeV/c²",
    charge: "0",
    spin: "1/2",
    description: "最后被直接探测到的中微子类型（2000年，DONUT实验）。在τ子衰变中产生。",
    antiparticle: "反τ中微子 (ν̄_τ)",
  },
];

const BOSONS: Particle[] = [
  {
    id: "photon",
    name: "光子",
    symbol: "γ",
    type: "boson",
    mass: "0",
    charge: "0",
    spin: "1",
    description: "电磁力的传播子，传递电磁相互作用。以光速运动，无静止质量。玻色-爱因斯坦统计。",
  },
  {
    id: "gluon",
    name: "胶子",
    symbol: "g",
    type: "boson",
    mass: "0",
    charge: "0",
    spin: "1",
    description: "强相互作用的传播子，带有色荷。共有8种胶子，负责将夸克束缚在强子内部。",
  },
  {
    id: "w-boson",
    name: "W玻色子",
    symbol: "W±",
    type: "boson",
    mass: "80.4 GeV/c²",
    charge: "±1",
    spin: "1",
    description: "弱相互作用的带电流传播子。1983年在CERN被发现。可改变夸克和轻子的味。",
    antiparticle: "W⁺ / W⁻ 互为反粒子",
  },
  {
    id: "z-boson",
    name: "Z玻色子",
    symbol: "Z⁰",
    type: "boson",
    mass: "91.2 GeV/c²",
    charge: "0",
    spin: "1",
    description: "弱相互作用的中性流传播子。1983年在CERN被发现。与W玻色子共同传递弱力。",
  },
  {
    id: "higgs",
    name: "希格斯玻色子",
    symbol: "H",
    type: "boson",
    mass: "125.3 GeV/c²",
    charge: "0",
    spin: "0",
    description: "希格斯场的量子激发，赋予其他基本粒子质量。2012年在CERN的LHC被发现，是标准模型最后一块拼图。",
  },
  {
    id: "gluon-8",
    name: "胶子（色态）",
    symbol: "g*",
    type: "boson",
    mass: "0",
    charge: "0",
    spin: "1",
    description: "胶子共有8种独立的色-反色组合态。胶子自身也携带色荷，因此胶子之间可以相互作用。",
  },
];

const ALL_PARTICLES = [...QUARKS, ...LEPTONS, ...BOSONS];

const TYPE_CONFIG: Record<ParticleType, { label: string; color: string; bg: string; border: string; glow: string }> = {
  quark: {
    label: "夸克",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    glow: "shadow-red-500/20",
  },
  lepton: {
    label: "轻子",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    glow: "shadow-emerald-500/20",
  },
  boson: {
    label: "玻色子",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/30",
    glow: "shadow-sky-500/20",
  },
};

function ParticleCard({
  particle,
  isExpanded,
  onToggle,
  reducedMotion,
}: {
  particle: Particle;
  isExpanded: boolean;
  onToggle: () => void;
  reducedMotion: boolean;
}) {
  const config = TYPE_CONFIG[particle.type];

  return (
    <motion.article
      layout={!reducedMotion}
      className={cn(
        "relative flex flex-col border p-3 cursor-pointer transition-colors duration-200",
        config.border,
        isExpanded ? cn(config.bg, "shadow-lg", config.glow) : "hover:bg-white/5",
      )}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      initial={false}
      animate={{
        scale: reducedMotion ? 1 : isExpanded ? 1.02 : 1,
      }}
      transition={{ duration: reducedMotion ? 0 : 0.2 }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={cn(
              "font-mono text-xl font-bold leading-none",
              config.color,
            )}
          >
            {particle.symbol}
          </span>
          <div className="min-w-0">
            <p className="text-fg-primary text-sm font-medium truncate">
              {particle.name}
            </p>
            <p className="text-fg-muted font-mono text-[10px] tracking-wider uppercase">
              {particle.id.replace(/-/g, " ")}
            </p>
          </div>
        </div>
        {particle.generation !== undefined && (
          <span className="text-fg-disabled font-mono text-[10px]">
            G{particle.generation}
          </span>
        )}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: reducedMotion ? 0 : 0.25, ease: [0.22, 0.61, 0.36, 1] },
              opacity: { duration: reducedMotion ? 0 : 0.2 },
            }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-2 border-t border-white/10 pt-3">
              <div className="grid grid-cols-3 gap-2">
                <PropertyBadge label="质量" value={particle.mass} />
                <PropertyBadge label="电荷" value={particle.charge} />
                <PropertyBadge label="自旋" value={particle.spin} />
              </div>
              <p className="text-fg-secondary text-xs leading-relaxed">
                {particle.description}
              </p>
              {particle.antiparticle && (
                <p className="text-fg-muted text-[11px]">
                  <span className="text-fg-disabled">反粒子：</span>
                  {particle.antiparticle}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function PropertyBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-fg-disabled font-mono text-[9px] tracking-wider uppercase">
        {label}
      </span>
      <span className="text-fg-primary font-mono text-[11px] leading-tight">
        {value}
      </span>
    </div>
  );
}

function SectionHeader({ label, color, count }: { label: string; color: string; count: number }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className={cn("font-mono text-xs tracking-widest uppercase", color)}>
        {label}
      </span>
      <span className="text-fg-disabled font-mono text-[10px]">
        ({count})
      </span>
      <span className="flex-1 h-px bg-white/10" />
    </div>
  );
}

export function StandardModel() {
  const reducedMotion = usePrefersReducedMotion();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAntimatter, setShowAntimatter] = useState(false);

  const toggleParticle = useCallback(
    (id: string) => {
      setExpandedId((prev) => (prev === id ? null : id));
    },
    [],
  );

  const filterParticles = useCallback(
    (particles: Particle[]) => {
      if (showAntimatter) {
        return particles.filter((p) => p.antiparticle);
      }
      return particles;
    },
    [showAntimatter],
  );

  const containerVariants = {
    hidden: {},
    visible: {
      transition: reducedMotion ? {} : { staggerChildren: 0.03, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0 : 0.3 },
    },
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-fg-primary text-xl font-medium">标准模型</h2>
          <p className="text-fg-muted text-sm mt-1">
            基本粒子与基本相互作用的标准理论框架
          </p>
        </div>
        <button
          onClick={() => setShowAntimatter((prev) => !prev)}
          className={cn(
            "px-3 py-1.5 font-mono text-xs tracking-wider border rounded transition-colors",
            showAntimatter
              ? "border-violet-500/50 bg-violet-500/15 text-violet-300"
              : "border-white/20 text-fg-muted hover:bg-white/5",
          )}
        >
          {showAntimatter ? "显示反粒子" : "显示全部粒子"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          <SectionHeader label="夸克" color="text-red-400" count={6} />
          <div className="grid grid-cols-1 gap-2">
            {filterParticles(QUARKS).map((p) => (
              <motion.div key={p.id} variants={itemVariants}>
                <ParticleCard
                  particle={p}
                  isExpanded={expandedId === p.id}
                  onToggle={() => toggleParticle(p.id)}
                  reducedMotion={reducedMotion}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          <SectionHeader label="轻子" color="text-emerald-400" count={6} />
          <div className="grid grid-cols-1 gap-2">
            {filterParticles(LEPTONS).map((p) => (
              <motion.div key={p.id} variants={itemVariants}>
                <ParticleCard
                  particle={p}
                  isExpanded={expandedId === p.id}
                  onToggle={() => toggleParticle(p.id)}
                  reducedMotion={reducedMotion}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          <SectionHeader label="玻色子" color="text-sky-400" count={6} />
          <div className="grid grid-cols-1 gap-2">
            {filterParticles(BOSONS).map((p) => (
              <motion.div key={p.id} variants={itemVariants}>
                <ParticleCard
                  particle={p}
                  isExpanded={expandedId === p.id}
                  onToggle={() => toggleParticle(p.id)}
                  reducedMotion={reducedMotion}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      <div className="flex items-center gap-4 pt-2 border-t border-white/10">
        <span className="text-fg-disabled font-mono text-[10px] tracking-wider uppercase">
          图例
        </span>
        {Object.entries(TYPE_CONFIG).map(([type, cfg]) => (
          <div key={type} className="flex items-center gap-1.5">
            <span className={cn("w-2 h-2 rounded-full", cfg.bg, cfg.border, "border")} />
            <span className={cn("font-mono text-[11px]", cfg.color)}>{cfg.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
