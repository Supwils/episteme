import type { Metadata } from "next";
import Link from "next/link";
import { getAllKnowledgeBase } from "@/subjects/psychology/lib/mdx";

export const metadata: Metadata = {
  title: "知识库 — 心理学 — Universe Knowledge",
  description: "CBT 自助、正念科学、情绪智力、决策心理学等实用心理学指南。",
  openGraph: {
    title: "知识库 — 心理学 — Universe Knowledge",
    description: "CBT 自助、正念科学、情绪智力、决策心理学等实用心理学指南。",
    type: "website",
  },
};

const ACCENT = "#9b7dc4";

export default function PsychologyKnowledgeBasePage() {
  const articles = getAllKnowledgeBase();

  const grouped = new Map<string, typeof articles>();
  for (const a of articles) {
    const cat = a.category || "其他";
    const list = grouped.get(cat) ?? [];
    list.push(a);
    grouped.set(cat, list);
  }
  const categories = [...grouped.keys()].sort();

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          psychology / knowledge-base
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          知识<em className="text-accent-purple italic"> 库</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
          {articles.length} 篇实用心理学指南——把心理科学转化为可用于日常的方法。
        </p>
      </header>

      {categories.map((category) => {
        const items = grouped.get(category) ?? [];
        return (
          <section key={category} className="mb-12">
            <h2
              className="mb-5 font-mono text-xs tracking-[0.28em] uppercase"
              style={{ color: ACCENT }}
            >
              {category}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((a) => (
                <Link
                  key={a.slug}
                  href={`/psychology/knowledge-base/${a.slug}`}
                  className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 relative flex h-full flex-col gap-2 overflow-hidden border p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span
                    className="absolute top-0 left-0 h-full w-[2px] opacity-50"
                    style={{ backgroundColor: ACCENT }}
                    aria-hidden
                  />
                  <h3 className="font-display text-fg-primary group-hover:text-accent-purple text-lg leading-snug font-semibold transition-colors">
                    {a.title}
                  </h3>
                  {a.title_en && (
                    <p className="text-fg-muted font-mono text-[11px] tracking-wider italic">
                      {a.title_en}
                    </p>
                  )}
                  {a.tags.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                      {a.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="border-fg-disabled/30 text-fg-muted border px-2 py-0.5 font-mono text-[9px] tracking-[0.22em]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
