import type { Metadata } from "next";
import { PhilosophyTree } from "@/src-philosophy/components/visualizations";

export const metadata: Metadata = {
  title: "哲学传承树 — 哲学思想 — Universe Knowledge",
  description:
    "交互式哲学家影响传承时间线——从苏格拉底到维特根斯坦的思想脉络可视化",
  openGraph: {
    title: "哲学传承树 — 哲学思想",
    description:
      "交互式哲学家影响传承时间线——从苏格拉底到维特根斯坦的思想脉络可视化",
    type: "website",
  },
};

export default function PhilosophyTreePage() {
  return (
    <div className="w-full px-4 py-12 sm:px-10 sm:py-16 lg:px-16">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[10px] uppercase tracking-[0.42em]">
          philosophy / tree
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          思想<em className="text-accent-gold italic"> 传承树</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
          从古希腊广场到维也纳咖啡馆，从孔子杏坛到京都学派——
          探索哲学家之间跨越文明与时代的影响传承脉络。
        </p>
      </header>

      <div className="border-border-faint bg-bg-near overflow-hidden rounded-sm border">
        <PhilosophyTree />
      </div>

      <div className="border-border-faint mt-8 border-l-2 pl-6">
        <p className="text-fg-muted font-mono text-[10px] uppercase tracking-[0.22em]">
          操作提示
        </p>
        <ul className="text-fg-secondary mt-2 space-y-1 text-xs leading-relaxed">
          <li>• 滚轮缩放，拖拽平移</li>
          <li>• 点击节点查看哲学家简介</li>
          <li>• 使用顶部按钮按传统或时代筛选</li>
          <li>• 双击节点可跳转哲学家详情页（如有）</li>
        </ul>
      </div>
    </div>
  );
}
