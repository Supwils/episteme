import type { Metadata } from "next";
import { SpaceExplorer } from "@/components/arts/SpaceExplorer";
import { ArtsDisclaimer, ArtsLinks } from "@/components/arts/lab-ui";

export const metadata: Metadata = {
  title: "建筑空间探索器 — 艺术、建筑与美学 — Episteme · 格致",
  description: "在平面、剖面与轴测之间切换，比较游行路线与承重。",
};

export default function SpaceExplorerPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">图示</p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">建筑空间探索器</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          同一座三开间厅堂，平面告诉你怎么走，剖面告诉你多高、光从哪来，轴测把承重和空间叠在一张图上。三种图不是三种建筑，是三种提问。
        </p>
      </header>
      <SpaceExplorer />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <ArtsDisclaimer />
        <ArtsLinks
          items={[
            { href: "/arts/architecture/building-as-structure", label: "建筑作为结构" },
            { href: "/arts/architecture/orders-and-arches", label: "柱式与拱" },
          ]}
        />
      </section>
    </main>
  );
}
