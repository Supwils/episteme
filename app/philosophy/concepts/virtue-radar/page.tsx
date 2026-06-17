import type { Metadata } from "next";
import VirtueRadar from "@/subjects/philosophy/components/visualizations/VirtueRadar";

export const metadata: Metadata = {
  title: "美德雷达图 — Episteme · 格致",
  description: "亚里士多德美德伦理交互式雷达图——探索中庸之道与十对美德",
};

export default function VirtueRadarPage() {
  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <header className="mb-8">
        <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.42em] uppercase">
          philosophy / concepts / virtue-radar
        </p>
        <h1 className="font-display text-fg-primary text-[2rem] font-semibold tracking-tight md:text-[2.4rem]">
          美德<em className="text-accent-gold italic"> 雷达图</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-2xl text-sm leading-relaxed">
          亚里士多德认为每种美德都是两个极端之间的&ldquo;中庸&rdquo;——勇敢是鲁莽与怯懦之间的中道，慷慨是挥霍与吝啬之间的中道。
          拖动滑块调整你在每对美德上的位置，与黄金中道对比。
        </p>
      </header>

      <VirtueRadar />

      <section className="border-border-faint mt-12 border-t pt-8">
        <h2 className="font-display text-fg-primary mb-4 text-lg font-semibold">关于美德伦理</h2>
        <div className="text-fg-secondary max-w-2xl space-y-3 text-sm leading-relaxed">
          <p>
            亚里士多德在《尼各马可伦理学》中提出，道德的核心不是规则或后果，而是品格。
            一个有美德的人在正确的时间、以正确的方式、对正确的对象做出正确的行为。
          </p>
          <p>
            中庸（Golden Mean）不是数学上的平均值，而是相对于具体情境的恰当。
            例如，一个士兵在战场上的勇敢表现，与一个学生在课堂上发言的勇敢表现，形式不同但本质相同。
          </p>
        </div>
      </section>
    </div>
  );
}
