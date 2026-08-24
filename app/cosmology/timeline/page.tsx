import type { Metadata } from "next";
import Link from "next/link";
import { COSMOLOGY_ERAS } from "@/subjects/cosmology/lib/eras";
import { CosmicTimeline } from "@/subjects/cosmology/components/visualizations/CosmicTimeline";

export const metadata: Metadata = {
  title: "宇宙时间线 — 宇宙学 — Episteme · 格致",
  description: "从大爆炸到今天，138 亿年宇宙演化史的时间线",
  openGraph: {
    title: "宇宙时间线 — 宇宙学",
    description: "从大爆炸到今天，138 亿年宇宙演化史的时间线",
    type: "website",
  },
};

export default function CosmologyTimelinePage() {
  return (
    <div className="min-h-screen px-6 py-12 sm:px-10 lg:px-16">
      <nav className="mb-8">
        <Link href="/cosmology" className="text-accent-blue text-sm hover:underline">
          ← 返回宇宙学
        </Link>
      </nav>

      <header className="mb-12">
        <p className="text-accent-blue mb-4 text-xs tracking-[0.32em] uppercase">时间线</p>
        <h1
          className="text-fg-primary mb-4 text-4xl font-bold md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          宇宙时间线
        </h1>
        <p className="text-fg-secondary max-w-2xl text-lg">
          从大爆炸到今天，138 亿年宇宙演化史的关键节点。
        </p>
      </header>

      <section className="mb-16">
        <CosmicTimeline />
      </section>

      <div className="relative">
        <div className="bg-border-faint absolute top-0 bottom-0 left-4 w-px" />
        <div className="space-y-8">
          {COSMOLOGY_ERAS.map((era) => (
            <div key={era.id} className="relative pl-12">
              <div className="border-bg-deep bg-accent-blue absolute top-2 left-2.5 h-3 w-3 rounded-full border-2" />
              <div className="border-border-faint bg-bg-near rounded-xl border p-6">
                <p className="text-accent-blue mb-1 text-xs">{era.timeRange}</p>
                <h2 className="text-fg-primary mb-2 text-xl font-bold">
                  {era.name.primary}
                  <span className="text-fg-muted ml-2 text-sm">{era.name.english}</span>
                </h2>
                <p className="text-fg-secondary mb-4 text-sm leading-relaxed">{era.description}</p>
                <div className="flex flex-wrap gap-2">
                  {era.keyEvents.map((event, i) => (
                    <span
                      key={i}
                      className="bg-fg-disabled/15 text-fg-muted rounded-full px-2 py-1 text-xs"
                    >
                      {event}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
