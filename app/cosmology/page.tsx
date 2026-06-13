import type { Metadata } from "next";
import Link from "next/link";
import { COSMOLOGY_TIER_ORDER, COSMOLOGY_TIER_ROUTES } from "@/subjects/cosmology/lib/tiers";
import { COSMOLOGY_TIERS } from "@/subjects/cosmology/lib/tiers";
import { COSMOLOGY_ERAS } from "@/subjects/cosmology/lib/eras";
import { TierCard } from "@/subjects/cosmology/components/TierCard";
import { CosmologyNav } from "@/subjects/cosmology/components/CosmologyNav";
import { ScaleOfUniverse } from "@/subjects/cosmology/components/visualizations";
import { CosmologyVisualizations } from "./CosmologyVisualizations";

export const metadata: Metadata = {
  title: "宇宙学 — Universe Knowledge",
  description: "从可见宇宙的整体结构出发，沿尺度由大到小展开：超星系团、星系群、太阳系、行星与天体",
  openGraph: {
    title: "宇宙学 — Universe Knowledge",
    description: "从可见宇宙的整体结构出发，沿尺度由大到小展开",
    type: "website",
  },
};

export default function CosmologyPage() {
  return (
    <div className="min-h-screen bg-[#07070c] text-[#e8e8f0]">
      <CosmologyNav />
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
          </div>
        </section>
      </div>
    </div>
  );
}
