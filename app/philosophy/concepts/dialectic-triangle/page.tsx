import type { Metadata } from "next";
import DialecticTriangle from "@/subjects/philosophy/components/visualizations/DialecticTriangle";

export const metadata: Metadata = {
  title: "辩证三角 — Episteme · 格致",
  description: "黑格尔辩证法交互式可视化——正题、反题、合题的动态三角关系",
};

export default function DialecticTrianglePage() {
  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <header className="mb-8">
        <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.42em] uppercase">
          philosophy / concepts / dialectic-triangle
        </p>
        <h1 className="font-display text-fg-primary text-[2rem] font-semibold tracking-tight md:text-[2.4rem]">
          辩证<em className="text-accent-gold italic"> 三角</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-2xl text-sm leading-relaxed">
          黑格尔辩证法的核心结构：正题（Thesis）被反题（Antithesis）否定，最终在合题（Synthesis）中达到更高层次的统一。
          点击每个顶点查看辩证实例。
        </p>
      </header>

      <DialecticTriangle />

      <section className="border-border-faint mt-12 border-t pt-8">
        <h2 className="font-display text-fg-primary mb-4 text-lg font-semibold">关于辩证法</h2>
        <div className="text-fg-secondary max-w-2xl space-y-3 text-sm leading-relaxed">
          <p>
            黑格尔的辩证法是西方哲学最重要的思维工具之一。它认为真理不是静态的，而是通过矛盾的运动不断发展的。
            每一个概念（正题）都内在地包含着自己的否定（反题），两者的矛盾在更高层次上得到解决（合题）。
          </p>
          <p>
            这个过程不是线性的，而是螺旋上升的——合题本身又成为新的正题，开始新一轮辩证运动。
            马克思将这一方法应用于社会历史分析，形成了历史唯物主义。
          </p>
        </div>
      </section>
    </div>
  );
}
