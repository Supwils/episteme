import type { Metadata } from "next";
import Link from "next/link";
import { COSMOLOGY_TIER_ORDER, COSMOLOGY_TIER_ROUTES } from "@/subjects/cosmology/lib/tiers";
import { COSMOLOGY_TIERS } from "@/subjects/cosmology/lib/tiers";
import { COSMOLOGY_ERAS } from "@/subjects/cosmology/lib/eras";
import { TierCard } from "@/subjects/cosmology/components/TierCard";
import { ScaleOfUniverse } from "@/subjects/cosmology/components/visualizations";
import { CosmologyVisualizations } from "./CosmologyVisualizations";

export const metadata: Metadata = {
  title: "宇宙学 — Episteme · 格致",
  description: "从可见宇宙的整体结构出发，沿尺度由大到小展开：超星系团、星系群、太阳系、行星与天体",
  openGraph: {
    title: "宇宙学 — Episteme · 格致",
    description: "从可见宇宙的整体结构出发，沿尺度由大到小展开",
    type: "website",
  },
};

export default function CosmologyPage() {
  return (
    <div className="bg-bg-deep text-fg-primary min-h-screen">
      <div className="px-6 py-12 sm:px-10 lg:px-16">
        <header className="mb-12">
          <p className="mb-4 text-xs tracking-[0.32em] uppercase" style={{ color: "#3b82f6" }}>
            Cosmology
          </p>
          <h1
            className="mb-4 text-4xl font-bold md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            宇宙学
          </h1>
          <p className="max-w-2xl text-lg text-[#a8adbd]">
            从可见宇宙的整体结构出发，沿尺度由大到小展开：超星系团、星系群、太阳系、行星与天体。
            跨尺度的平滑动画下钻与科学准确的位置关系。
          </p>
        </header>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">宇宙尺度层级</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {COSMOLOGY_TIER_ORDER.map((tierId) => (
              <TierCard key={tierId} tierId={tierId} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">宇宙演化史</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {COSMOLOGY_ERAS.map((era) => (
              <div
                key={era.id}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <p className="mb-1 text-xs text-[#3b82f6]">{era.timeRange}</p>
                <h3 className="mb-2 text-lg font-semibold">{era.name.primary}</h3>
                <p className="text-sm leading-relaxed text-[#a8adbd]">{era.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <ScaleOfUniverse />
        </section>

        <CosmologyVisualizations />

        <section className="mb-16 overflow-hidden rounded-2xl border border-[#3b82f6]/20 bg-[#06111f] p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="mb-3 text-xs tracking-[0.32em] text-[#7eb8da] uppercase">
                Mission Layer
              </p>
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">从宇宙结构走向可抵达的世界</h2>
              <p className="max-w-xl text-sm leading-relaxed text-[#a8adbd]">
                宇宙学不只回答「宇宙如何演化」，也把问题推到更近的尺度：人类如何离开地球，
                如何在月球与火星建立长期探索能力，又如何在系外行星和冰卫星上寻找生命迹象。
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/universe-physics/universe/observable"
                  className="rounded-full bg-[#3b82f6] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2563eb]"
                >
                  进入 3D 宇宙漫游
                </Link>
                <Link
                  href="/cosmology/knowledge-base"
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-[#dbeafe] transition-colors hover:bg-white/[0.06]"
                >
                  阅读太空探索与天体生物学
                </Link>
              </div>
            </div>
            <div className="relative min-h-64 rounded-xl border border-white/[0.08] bg-black/30 p-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(59,130,246,0.25),transparent_32%),radial-gradient(circle_at_78%_64%,rgba(52,211,153,0.16),transparent_28%)]" />
              <div className="relative h-56">
                <div className="absolute top-1/2 left-4 h-px w-[82%] -rotate-12 bg-gradient-to-r from-[#3b82f6] via-[#7dd3fc] to-[#34d399]" />
                {[
                  ["地球轨道", "left-[8%] top-[58%]", "#3b82f6"],
                  ["月球南极", "left-[34%] top-[44%]", "#7dd3fc"],
                  ["火星转移", "left-[58%] top-[34%]", "#f97316"],
                  ["宜居世界", "left-[80%] top-[22%]", "#34d399"],
                ].map(([label, position, color]) => (
                  <div key={label} className={`absolute ${position}`}>
                    <span
                      className="block h-3 w-3 rounded-full shadow-[0_0_24px_currentColor]"
                      style={{ color, backgroundColor: color }}
                    />
                    <span className="mt-2 block font-mono text-[10px] tracking-[0.16em] whitespace-nowrap text-[#cbd5e1] uppercase">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">探索方式</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Link
              href="/cosmology/universe"
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.04]"
            >
              <p className="mb-2 text-2xl">◉</p>
              <h3 className="mb-2 text-lg font-semibold">宇宙地图</h3>
              <p className="text-sm text-[#a8adbd]">从可观测宇宙到地球的跨尺度漫游</p>
            </Link>
            <Link
              href="/cosmology/timeline"
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.04]"
            >
              <p className="mb-2 text-2xl">◎</p>
              <h3 className="mb-2 text-lg font-semibold">时间线</h3>
              <p className="text-sm text-[#a8adbd]">从大爆炸到今天的 138 亿年演化史</p>
            </Link>
            <Link
              href="/cosmology/knowledge-base"
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.04]"
            >
              <p className="mb-2 text-2xl">◇</p>
              <h3 className="mb-2 text-lg font-semibold">知识库</h3>
              <p className="text-sm text-[#a8adbd]">大爆炸、暗物质、引力波等深度专题文章</p>
            </Link>
            <Link
              href="/cosmology/dialogues"
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.04]"
            >
              <p className="mb-2 text-2xl">❝</p>
              <h3 className="mb-2 text-lg font-semibold">对话</h3>
              <p className="text-sm text-[#a8adbd]">哈勃与勒梅特、彭罗斯与霍金的思想交锋</p>
            </Link>
            <Link
              href="/cosmology/stellar-evolution"
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.04]"
            >
              <p className="mb-2 text-2xl">✦</p>
              <h3 className="mb-2 text-lg font-semibold">恒星演化</h3>
              <p className="text-sm text-[#a8adbd]">赫罗图与恒星从诞生到死亡的一生</p>
            </Link>
            <Link
              href="/cosmology/frontier"
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.04]"
            >
              <p className="mb-2 text-2xl">◈</p>
              <h3 className="mb-2 text-lg font-semibold">研究前沿</h3>
              <p className="text-sm text-[#a8adbd]">DESI、JWST 等 2020s 宇宙学前沿进展</p>
            </Link>
            <Link
              href="/universe-physics/universe/observable"
              className="rounded-xl border border-[#3b82f6]/30 bg-[#3b82f6]/[0.06] p-6 transition-colors hover:bg-[#3b82f6]/[0.12]"
            >
              <p className="mb-2 text-2xl">◉</p>
              <h3 className="mb-2 text-lg font-semibold">3D 漫游</h3>
              <p className="text-sm text-[#a8adbd]">沿同一尺度层级飞越的可交互三维场景</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
