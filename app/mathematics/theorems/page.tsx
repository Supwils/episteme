import type { Metadata } from "next";
import { getAllTheorems } from "@/subjects/mathematics/lib/theorems";
import { TheoremsListBrowser } from "@/components/mathematics/TheoremsListBrowser";

export const metadata: Metadata = {
  title: "定理 — Episteme · 格致",
  description: "从勾股定理到费马大定理，探索数学中最优美、最深刻的定理",
  openGraph: {
    title: "定理 — Episteme · 格致",
    description: "从勾股定理到费马大定理，探索数学中最优美、最深刻的定理",
    type: "website",
  },
};

export default function TheoremsPage() {
  const theorems = getAllTheorems().map((t) => ({
    slug: t.slug,
    title: t.title,
    title_en: t.title_en,
    field: t.field || "其他",
    mathematician: t.mathematician,
    year: t.year,
    difficulty: t.difficulty,
    tags: t.tags,
  }));

  return (
    <div className="w-full px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          mathematics / theorems
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          数学<em className="text-accent-indigo italic"> 定理</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
          {theorems.length > 0
            ? `${theorems.length} 个里程碑式的数学定理，从初等到前沿`
            : "探索数学中最优美、最深刻的定理——内容正在编写中"}
        </p>
      </header>

      {theorems.length > 0 ? (
        <TheoremsListBrowser theorems={theorems} />
      ) : (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            暂无定理内容
          </p>
          <p className="text-fg-secondary mt-2 text-sm">定理文章正在撰写中，敬请期待。</p>
        </div>
      )}
    </div>
  );
}
