import type { Metadata } from "next";
import Link from "next/link";
import DistributionExplorer from "@/subjects/mathematics/components/visualizations/DistributionExplorer";

export const metadata: Metadata = {
  title: "概率分布探索器 — 数学可视化",
  description: "交互式探索正态分布、均匀分布、指数分布与二项分布，理解 68-95-99.7 法则与概率计算",
  openGraph: {
    title: "概率分布探索器 — Episteme · 格致",
    description: "交互式概率分布可视化工具",
    type: "website",
  },
};

export default function DistributionsPage() {
  return (
    <div className="w-full px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
      <Link
        href="/mathematics/concepts"
        className="text-fg-muted hover:text-accent-indigo mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
      >
        ← 返回概念
      </Link>

      <header className="mb-10">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          mathematics / distributions
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          概率分布
          <em className="text-accent-indigo italic"> 探索器</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-2xl text-sm leading-relaxed">
          通过交互式可视化理解四种核心概率分布：正态分布的钟形曲线、均匀分布的等概率、指数分布的衰减、二项分布的离散跳跃。拖动参数滑块，观察分布形态如何变化。
        </p>
      </header>

      <DistributionExplorer />

      {/* Related concept links */}
      <div className="border-border-faint mt-12 border-t pt-8">
        <p className="text-fg-disabled mb-4 font-mono text-[9px] tracking-[0.22em] uppercase">
          相关概念
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { href: "/mathematics/concepts/probability", label: "概率论" },
            { href: "/mathematics/concepts/statistics", label: "统计学" },
            { href: "/mathematics/concepts/bayesian-inference", label: "贝叶斯推断" },
            { href: "/mathematics/concepts/measure-theory", label: "测度论" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border-border-faint bg-bg-panel hover:border-fg-disabled/30 text-fg-secondary hover:text-accent-indigo border px-4 py-2 font-mono text-[11px] tracking-wider transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
