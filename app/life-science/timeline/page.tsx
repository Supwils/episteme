import type { Metadata } from "next";
import Link from "next/link";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import { getAllTimelineEvents } from "@/subjects/life-science/lib/timeline-events";
import { EvolutionTimeline } from "@/subjects/life-science/components/visualizations";

export const metadata: Metadata = {
  title: "进化时间线 — Universe Knowledge",
  description: "40亿年生命演化的时间线，从第一个有机分子到现代智人",
  openGraph: {
    title: "进化时间线 — Universe Knowledge",
    description: "40亿年生命演化的时间线，从第一个有机分子到现代智人",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "进化时间线 — Universe Knowledge",
    description: "40亿年生命演化的时间线，从第一个有机分子到现代智人",
  },
};

const TIMELINE_EVENTS = getAllTimelineEvents();

export default function TimelinePage() {
  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
      <header className="mb-16">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          life science / timeline
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          进化<em className="text-accent-green italic"> 时间线</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
          从地球诞生到人类文明，{TIMELINE_EVENTS.length} 个改变生命进程的关键节点
        </p>
      </header>

      {/* Interactive SVG Timeline */}
      <section className="mb-20">
        <h2 className="text-fg-primary mb-6 text-lg font-semibold">
          交互式演化时间线
        </h2>
        <EvolutionTimeline events={TIMELINE_EVENTS} />
      </section>

      {/* Detailed vertical timeline */}
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border-faint sm:left-1/2" />

        <StaggerGrid>
          {TIMELINE_EVENTS.map((item, i) => (
            <StaggerItem key={item.id}>
              <div
                className={`relative mb-8 flex items-start gap-6 sm:gap-0 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                  <Link
                    href={`/life-science/timeline/${item.id}`}
                    className="group block border-border-faint bg-bg-near hover:bg-bg-elevated border p-5 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(74,158,111,0.1)]"
                  >
                    <div className="mb-2 flex items-center gap-3 sm:justify-end" style={i % 2 === 0 ? { justifyContent: "flex-end" } : {}}>
                      <span className="font-mono text-[9px] tracking-[0.22em] uppercase" style={{ color: item.accent }}>
                        {item.era}
                      </span>
                    </div>
                    <h3 className="font-display text-fg-primary group-hover:text-accent-green text-lg font-semibold leading-snug mb-1 transition-colors">
                      {item.event}
                    </h3>
                    <p className="text-fg-secondary text-sm leading-relaxed">{item.detail}</p>
                    <span className="text-fg-muted group-hover:text-accent-green mt-3 inline-block font-mono text-[10px] tracking-[0.16em] uppercase transition-colors">
                      深度阅读 →
                    </span>
                  </Link>
                </div>

                <div className="absolute left-4 top-5 z-10 -translate-x-1/2 sm:left-1/2">
                  <div
                    className="h-3 w-3 rounded-full border-2"
                    style={{ borderColor: item.accent, backgroundColor: "var(--color-bg-deep)" }}
                  />
                </div>

                <div className="hidden flex-1 sm:block" />
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </div>
  );
}
