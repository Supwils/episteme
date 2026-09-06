import type { Metadata } from "next";
import { DetailComparator } from "@/components/arts/DetailComparator";
import { ArtsDisclaimer, ArtsLinks } from "@/components/arts/lab-ui";

export const metadata: Metadata = {
  title: "作品细节比较器 — 艺术、建筑与美学 — Episteme · 格致",
  description: "对照轮廓优先与色块优先的同一母题，移动放大窗看局部如何改变判断。",
};

export default function DetailComparatorPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          形式分析
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">作品细节比较器</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          同一静物可以先被看成线，也可以先被看成色块。把放大窗移到边缘，轮廓那一侧仍是边界；色块那一侧变成两块颜色的相遇。细读从这里开始：先问你看见的是关系，不是“画得像不像”。
        </p>
      </header>
      <DetailComparator />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <ArtsDisclaimer />
        <ArtsLinks
          items={[
            { href: "/arts/methods/formal-analysis", label: "形式分析" },
            { href: "/arts/foundations/line-shape-form", label: "线条、形状与形体" },
          ]}
        />
      </section>
    </main>
  );
}
