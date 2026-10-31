"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useExperimentReducedMotion } from "@/subjects/physics/components/experiments/use-experiment-reduced-motion";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/subjects/physics/lib/cn";
import { LoadingSpinner } from "@/components/ui";

const experimentLoading = (
  <div className="flex h-96 items-center justify-center">
    <LoadingSpinner size="md" color="cool" />
  </div>
);

const MillersUrey = dynamic(
  () => import("@/subjects/physics/components/experiments/MillersUrey").then((m) => m.MillersUrey),
  { ssr: false, loading: () => experimentLoading }
);
const DoubleSlit = dynamic(
  () => import("@/subjects/physics/components/experiments/DoubleSlit").then((m) => m.DoubleSlit),
  { ssr: false, loading: () => experimentLoading }
);
const GalileosRamp = dynamic(
  () =>
    import("@/subjects/physics/components/experiments/GalileosRamp").then((m) => m.GalileosRamp),
  { ssr: false, loading: () => experimentLoading }
);
const RutherfordScattering = dynamic(
  () =>
    import("@/subjects/physics/components/experiments/RutherfordScattering").then(
      (m) => m.RutherfordScattering
    ),
  { ssr: false, loading: () => experimentLoading }
);
const CavendishExperiment = dynamic(
  () =>
    import("@/subjects/physics/components/experiments/CavendishExperiment").then(
      (m) => m.CavendishExperiment
    ),
  { ssr: false, loading: () => experimentLoading }
);
const PendulumWave = dynamic(
  () =>
    import("@/subjects/physics/components/experiments/PendulumWave").then((m) => m.PendulumWave),
  { ssr: false, loading: () => experimentLoading }
);
const BlackHoleAccretion = dynamic(
  () =>
    import("@/subjects/physics/components/experiments/BlackHoleAccretion").then(
      (m) => m.BlackHoleAccretion
    ),
  { ssr: false, loading: () => experimentLoading }
);
const WaveInterference = dynamic(
  () =>
    import("@/subjects/physics/components/experiments/WaveInterference").then(
      (m) => m.WaveInterference
    ),
  { ssr: false, loading: () => experimentLoading }
);
const ThermodynamicCycles = dynamic(
  () =>
    import("@/subjects/physics/components/visualizations/ThermodynamicCycles").then(
      (m) => m.ThermodynamicCycles
    ),
  { ssr: false, loading: () => experimentLoading }
);
const LensOptics = dynamic(
  () => import("@/subjects/physics/components/visualizations/LensOptics").then((m) => m.LensOptics),
  { ssr: false, loading: () => experimentLoading }
);
const CircuitBuilder = dynamic(
  () =>
    import("@/subjects/physics/components/visualizations/CircuitBuilder").then(
      (m) => m.CircuitBuilder
    ),
  { ssr: false, loading: () => experimentLoading }
);

type Experiment = {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  field: string;
  description: string;
  component: React.ComponentType;
};

const EXPERIMENTS: Experiment[] = [
  {
    id: "miller-urey",
    title: "米勒-尤里实验",
    subtitle: "生命起源的化学基础",
    year: "1953",
    field: "化学 / 生物学",
    description:
      "1953年论文报告：甲烷、氨、氢气和水蒸气的还原性气体模型，在加热与电放电供能下可非生物合成氨基酸；实验没有制造生命。",
    component: MillersUrey,
  },
  {
    id: "double-slit",
    title: "双缝实验",
    subtitle: "从经典干涉到单粒子统计",
    year: "1801",
    field: "量子力学",
    description:
      "19世纪初杨研究经典光干涉；20世纪单粒子实验显示，相干路径可形成干涉，完全可区分的路径标记会消除两路交叉项，不依赖有人阅读记录。",
    component: DoubleSlit,
  },
  {
    id: "galileos-ramp",
    title: "伽利略斜面实验",
    subtitle: "运动学的开端",
    year: "1638（著作叙述）",
    field: "经典力学",
    description:
      "从静止出发的理想匀加速运动满足s ∝ t²。伽利略1638年著作叙述斜面与水钟实验；本页用实心球纯滚动模型比较距离和时间。",
    component: GalileosRamp,
  },
  {
    id: "rutherford",
    title: "卢瑟福散射实验",
    subtitle: "发现原子核",
    year: "1911",
    field: "原子物理",
    description:
      "盖革与马斯登1909年报告α粒子的大角度散射；卢瑟福1911年以集中的核电荷解释散射，建立原子核模型。",
    component: RutherfordScattering,
  },
  {
    id: "cavendish",
    title: "卡文迪什扭秤实验",
    subtitle: "称量地球",
    year: "1798",
    field: "引力物理",
    description:
      "利用扭秤比较实验室质量产生的引力与地球引力，报告地球平均密度；这些测量也可换算为万有引力常数 G。",
    component: CavendishExperiment,
  },
  {
    id: "pendulum-wave",
    title: "摆波实验",
    subtitle: "周期与同步之美",
    year: "现代演示",
    field: "波动力学",
    description:
      "多根不同长度的摆因周期差异逐渐错相，形成摆波图案；重现初始队形是预设周期之比的结果，不代表摆之间发生耦合同步。",
    component: PendulumWave,
  },
  {
    id: "black-hole-accretion",
    title: "黑洞吸积盘",
    subtitle: "吸积流与喷流示意",
    year: "理论示意",
    field: "天体物理",
    description:
      "旋转气体可形成吸积盘，角动量向外传递使气体持续内流。部分系统在视界外形成喷流；此处演示形态与流动方向。",
    component: BlackHoleAccretion,
  },
  {
    id: "wave-interference",
    title: "波的干涉实验",
    subtitle: "相长与相消干涉",
    year: "1801",
    field: "波动光学",
    description:
      "两个相干波源的振幅在空间叠加，同相加强、反相减弱；等振幅且相差π时可完全抵消。图中的颜色表示所选物理量。",
    component: WaveInterference,
  },
  {
    id: "thermodynamic-cycles",
    title: "热力学循环",
    subtitle: "卡诺循环 PV 图",
    year: "1824",
    field: "热力学",
    description:
      "在 PV 图上展示卡诺循环的四个阶段：等温膨胀、绝热膨胀、等温压缩、绝热压缩。调节温度和体积比，观察热效率变化。",
    component: ThermodynamicCycles,
  },
  {
    id: "lens-optics",
    title: "透镜光学",
    subtitle: "凸透镜与凹透镜成像",
    year: "理想薄透镜模型",
    field: "光学",
    description:
      "交互式光线图，展示凸透镜和凹透镜的成像原理。移动物体、调节焦距，观察实像与虚像的形成过程。",
    component: LensOptics,
  },
  {
    id: "circuit-builder",
    title: "电路搭建",
    subtitle: "欧姆定律实验",
    year: "1827",
    field: "电学",
    description:
      "搭建简单串联电路，添加电池和电阻，用欧姆定律计算电流和电压降。可视化各元件的电压分配。",
    component: CircuitBuilder,
  },
];

export default function ExperimentsClient() {
  const [activeExperiment, setActiveExperiment] = useState<string | null>(null);
  const reduce = useExperimentReducedMotion();

  const ActiveComponent = activeExperiment
    ? EXPERIMENTS.find((e) => e.id === activeExperiment)?.component
    : null;

  return (
    <div className="bg-bg-deep min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Sub-nav */}
        <nav className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/universe-physics/universe/observable"
            className="text-fg-muted hover:text-fg-secondary flex items-center gap-2 text-xs transition-colors"
          >
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            宇宙地图
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/universe-physics/universe/observable"
              className="text-fg-muted hover:text-fg-secondary font-mono text-[10px] tracking-[0.2em] uppercase transition-colors"
            >
              UNIVERSE
            </Link>
            <span className="text-fg-disabled">·</span>
            <Link
              href="/universe-physics/physics/classical-mechanics"
              className="text-fg-muted hover:text-fg-secondary font-mono text-[10px] tracking-[0.2em] uppercase transition-colors"
            >
              PHYSICS
            </Link>
            <span className="text-fg-disabled">·</span>
            <span className="text-accent-cool font-mono text-[10px] tracking-[0.2em] uppercase">
              EXPERIMENTS
            </span>
          </div>
        </nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.6 }}
          className="mb-10 text-center"
        >
          <h1 className="font-display text-fg-primary text-3xl font-semibold sm:text-4xl">
            交互实验与物理模型
          </h1>
          <p className="text-fg-secondary mt-3 text-sm sm:text-base">
            通过交互演示，探索科学实验与理想模型的联系
          </p>
        </motion.div>

        {/* Experiment selector */}
        {!activeExperiment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : 0.2 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {EXPERIMENTS.map((exp, i) => (
              <motion.button
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 0.1 * i }}
                onClick={() => setActiveExperiment(exp.id)}
                className={cn(
                  "group border-fg-disabled/30 bg-bg-panel/50 rounded-xl border p-5 text-left transition-all duration-300",
                  "hover:border-accent-cool/40 hover:bg-bg-panel/80",
                  "focus-visible:ring-accent-cool focus-visible:ring-offset-bg-deep focus-visible:ring-2 focus-visible:ring-offset-2"
                )}
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="bg-accent-cool/10 text-accent-cool rounded-full px-2.5 py-0.5 text-xs">
                    {exp.field}
                  </span>
                  <span className="text-fg-muted font-mono text-xs">{exp.year}</span>
                </div>
                <h3 className="text-fg-primary group-hover:text-accent-cool text-lg font-medium transition-colors">
                  {exp.title}
                </h3>
                <p className="text-fg-muted mt-1 text-xs">{exp.subtitle}</p>
                <p className="text-fg-secondary mt-3 text-sm leading-relaxed">{exp.description}</p>
                <div className="text-accent-cool mt-4 flex items-center gap-1 text-xs opacity-0 transition-opacity group-hover:opacity-100">
                  点击体验
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Active experiment view */}
        <AnimatePresence mode="wait">
          {activeExperiment && ActiveComponent && (
            <motion.div
              key={activeExperiment}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: reduce ? 0 : 0.3 }}
            >
              {/* Back button */}
              <button
                onClick={() => setActiveExperiment(null)}
                className="text-fg-secondary hover:text-fg-primary mb-6 flex items-center gap-2 text-sm transition-colors"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                返回实验列表
              </button>

              {/* Experiment title */}
              <div className="mb-6">
                <h2 className="font-display text-fg-primary text-2xl font-semibold">
                  {EXPERIMENTS.find((e) => e.id === activeExperiment)?.title}
                </h2>
                <p className="text-fg-secondary mt-1 text-sm">
                  {EXPERIMENTS.find((e) => e.id === activeExperiment)?.description}
                </p>
              </div>

              {/* Experiment component */}
              <div className="border-fg-disabled/30 bg-bg-panel/30 rounded-2xl border p-4 sm:p-6">
                <ActiveComponent />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
