import type { Metadata } from "next";
import Link from "next/link";
import { HRDiagram } from "@/subjects/cosmology/components/visualizations";

export const metadata: Metadata = {
  title: "恒星演化 — 宇宙学 — Episteme · 格致",
  description: "通过赫罗图探索恒星的生命周期：从主序星到红巨星、白矮星的演化路径",
  openGraph: {
    title: "恒星演化 — 宇宙学",
    description: "通过赫罗图探索恒星的生命周期",
    type: "website",
  },
};

export default function StellarEvolutionPage() {
  return (
    <div className="min-h-screen px-6 py-12 sm:px-10 lg:px-16">
      <nav className="mb-8">
        <Link href="/cosmology" className="text-accent-blue text-sm hover:underline">
          ← 返回宇宙学
        </Link>
      </nav>

      <header className="mb-12">
        <p className="text-accent-blue mb-4 text-xs tracking-[0.32em] uppercase">赫罗图</p>
        <h1
          className="text-fg-primary mb-4 text-4xl font-bold md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          恒星演化
        </h1>
        <p className="text-fg-secondary max-w-2xl text-lg">
          恒星的一生主要取决于初始质量，也受组成、旋转、失质量与伴星相互作用影响。赫罗图（Hertzsprung-Russell
          Diagram）展示了恒星光度与表面温度的关系，
          揭示了主序星、红巨星、白矮星等不同演化阶段的分布规律。
        </p>
      </header>

      <section className="mb-16">
        <HRDiagram />
      </section>

      <section className="mb-16 max-w-3xl">
        <h2 className="text-fg-primary mb-6 text-2xl font-bold">恒星演化阶段</h2>
        <div className="space-y-4">
          {[
            {
              title: "主序阶段",
              color: "#fbbf24",
              description:
                "恒星生命的大部分时间都在主序带上度过。在此阶段，核心的氢通过核聚变转化为氦，产生稳定的光和热。太阳诞生于约 46 亿年前，绝大部分时间在主序阶段度过；主序恒星的光度也会缓慢变化。",
            },
            {
              title: "红巨星阶段",
              color: "#ef4444",
              description:
                "以太阳这样的恒星为例，核心氢耗尽后会经历次巨星和红巨星阶段，氢壳层燃烧、核心收缩与包层膨胀相伴。太阳还将演化数十亿年，地球届时的命运受失质量与潮汐作用等影响。",
            },
            {
              title: "白矮星阶段",
              color: "#6b7280",
              description:
                "许多初始质量低于约 8 倍太阳质量的恒星最终成为白矮星，具体边界依模型而变。太阳一类恒星会失去包层，可能形成行星状星云，留下碳氧白矮星冷却；白矮星也可有氦或氧氖核心，并非全部经历同一条路径。",
            },
            {
              title: "超巨星与超新星",
              color: "#a855f7",
              description:
                "初始质量约 8 倍太阳质量以上的恒星可进入核心坍缩通道，但边界受组成和双星演化影响。较大质量者可燃烧到铁族核心，也有电子俘获触发坍缩的路径。坍缩不保证产生明亮超新星，残骸可为中子星或黑洞。",
            },
          ].map((stage) => (
            <div key={stage.title} className="border-border-faint bg-bg-near rounded-xl border p-5">
              <h3 className="text-fg-primary mb-2 text-lg font-semibold">
                <span
                  className="mr-2 inline-block h-3 w-3 rounded-full align-middle"
                  style={{ backgroundColor: stage.color }}
                />
                {stage.title}
              </h3>
              <p className="text-fg-secondary text-sm leading-relaxed">{stage.description}</p>
            </div>
          ))}
        </div>
      </section>
      <p className="text-fg-muted max-w-3xl text-sm leading-relaxed">
        来源与延伸：
        <a
          className="text-accent-blue underline"
          href="https://science.nasa.gov/universe/stars/"
          target="_blank"
          rel="noopener noreferrer"
        >
          NASA 恒星演化
        </a>
        ；
        <Link
          className="text-accent-blue underline"
          href="/cosmology/knowledge-base/恒星物理--core-collapse-supernovae"
        >
          核心坍缩超新星
        </Link>
        。 图中各恒星的参数来源列在详情中。
      </p>
    </div>
  );
}
