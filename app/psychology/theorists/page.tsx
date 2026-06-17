import type { Metadata } from "next";
import { getAllTheorists } from "@/subjects/psychology/lib/mdx";
import TheoristsGrid from "./TheoristsGrid";

export const metadata: Metadata = {
  title: "心理学家 — Episteme · 格致",
  description: "从弗洛伊德到卡尼曼，心理学巨匠的生平、理论与贡献",
};

export default function TheoristsPage() {
  const theorists = getAllTheorists();

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-4 font-mono text-[10px] tracking-[0.42em] uppercase">
          psychology / theorists
        </p>
        <h1 className="font-display text-fg-primary mb-3 text-[2.4rem] leading-[1.05] tracking-tight md:text-[3.2rem]">
          心理学<em className="text-accent-purple italic"> 家</em>
        </h1>
        <p className="text-fg-secondary max-w-xl text-sm leading-relaxed md:text-base">
          {theorists.length} 位心理学巨匠的生平、理论与贡献，从精神分析之父到行为经济学先驱。
        </p>
      </header>

      {theorists.length > 0 ? (
        <TheoristsGrid theorists={theorists} />
      ) : (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            暂无理论家内容
          </p>
          <p className="text-fg-secondary mt-2 text-sm">内容正在撰写中，敬请期待。</p>
        </div>
      )}
    </div>
  );
}
