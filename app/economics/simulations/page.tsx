"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const PRODUCT_EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

const loadingPlaceholder = (
  <div className="flex h-64 items-center justify-center">
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-fg-muted border-t-transparent" />
  </div>
);

const SupplyDemandSimulator = dynamic(
  () => import("./SupplyDemandSimulator").then((m) => m.SupplyDemandSimulator),
  { loading: () => loadingPlaceholder, ssr: false }
);
const PrisonersDilemma = dynamic(
  () => import("./PrisonersDilemma").then((m) => m.PrisonersDilemma),
  { loading: () => loadingPlaceholder, ssr: false }
);
const NashEquilibriumFinder = dynamic(
  () => import("./NashEquilibriumFinder").then((m) => m.NashEquilibriumFinder),
  { loading: () => loadingPlaceholder, ssr: false }
);
const LorenzGiniVisualizer = dynamic(
  () => import("./LorenzGiniVisualizer").then((m) => m.LorenzGiniVisualizer),
  { loading: () => loadingPlaceholder, ssr: false }
);
const AuctionSimulator = dynamic(
  () => import("./AuctionSimulator").then((m) => m.AuctionSimulator),
  { loading: () => loadingPlaceholder, ssr: false }
);
const YieldCurve = dynamic(
  () => import("@/subjects/economics/components/visualizations/YieldCurve").then((m) => m.YieldCurve),
  { loading: () => loadingPlaceholder, ssr: false }
);
const PhillipsCurve = dynamic(
  () => import("@/subjects/economics/components/visualizations/PhillipsCurve").then((m) => m.PhillipsCurve),
  { loading: () => loadingPlaceholder, ssr: false }
);
const CircularFlowDiagram = dynamic(
  () => import("@/subjects/economics/components/visualizations/CircularFlowDiagram").then((m) => m.CircularFlowDiagram),
  { loading: () => loadingPlaceholder, ssr: false }
);
const InflationCalculator = dynamic(
  () => import("@/subjects/economics/components/visualizations/InflationCalculator").then((m) => m.InflationCalculator),
  { loading: () => loadingPlaceholder, ssr: false }
);
const GameTheoryMatrix = dynamic(
  () => import("@/subjects/economics/components/visualizations/GameTheoryMatrix").then((m) => m.GameTheoryMatrix),
  { loading: () => loadingPlaceholder, ssr: false }
);

const SIMS = [
  { id: "supply-demand", label: "供需模拟" },
  { id: "circular-flow", label: "经济循环" },
  { id: "inflation-calculator", label: "通胀计算器" },
  { id: "game-theory", label: "博弈矩阵" },
  { id: "prisoners-dilemma", label: "囚徒困境" },
  { id: "nash-equilibrium", label: "纳什均衡" },
  { id: "lorenz-gini", label: "洛伦兹曲线" },
  { id: "auction", label: "拍卖模拟" },
  { id: "yield-curve", label: "收益率曲线" },
  { id: "phillips-curve", label: "菲利普斯曲线" },
];

export default function SimulationsPage() {
  const [active, setActive] = useState("supply-demand");

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-3 font-mono text-[10px] uppercase tracking-[0.42em]">
          economics / simulations
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          互动<em className="text-accent-gold italic"> 模拟</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
          通过交互式模拟深入理解经济学与博弈论的核心概念
        </p>
      </header>

      <div className="mb-8 flex flex-wrap gap-2">
        {SIMS.map((sim) => (
          <button
            key={sim.id}
            onClick={() => setActive(sim.id)}
            className={`sim-button ${active === sim.id ? "!bg-accent-gold/20 !border-accent-gold/50" : ""}`}
          >
            {sim.label}
          </button>
        ))}
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: PRODUCT_EASE }}
      >
        {active === "supply-demand" && <SupplyDemandSimulator />}
        {active === "circular-flow" && <CircularFlowDiagram />}
        {active === "inflation-calculator" && <InflationCalculator />}
        {active === "game-theory" && <GameTheoryMatrix />}
        {active === "prisoners-dilemma" && <PrisonersDilemma />}
        {active === "nash-equilibrium" && <NashEquilibriumFinder />}
        {active === "lorenz-gini" && <LorenzGiniVisualizer />}
        {active === "auction" && <AuctionSimulator />}
        {active === "yield-curve" && <YieldCurve />}
        {active === "phillips-curve" && <PhillipsCurve />}
      </motion.div>
    </div>
  );
}
