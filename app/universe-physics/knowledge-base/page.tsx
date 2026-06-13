import type { Metadata } from "next";
import Link from "next/link";
import { universePhysicsKB } from "@/lib/universe-physics-kb";

const DESCRIPTION =
  "经典力学、电磁学、热力学、相对论、量子物理与前沿物理——从牛顿到标准模型的深度专题文章";

export const metadata: Metadata = {
  title: "物理学知识库 — Universe Knowledge",
  description: DESCRIPTION,
  openGraph: {
    title: "物理学知识库 — Universe Knowledge",
    description: DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "物理学知识库 — Universe Knowledge",
    description: DESCRIPTION,
  },
};

export default function PhysicsKnowledgeBasePage() {
  const groups = universePhysicsKB.getArticlesByCategory();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-10 lg:px-16">
      <Link
        href="/universe-physics"
        className="text-fg-muted hover:text-fg-primary mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
      >
        ← 返回物理学
      </Link>

      <header className="mb-12">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          physics / knowledge base
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-semibold sm:text-4xl">物理学知识库</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">{DESCRIPTION}</p>
        <Link
          href="/universe-physics/frontier"
          className="text-accent-cool/90 hover:text-accent-cool mt-4 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
        >
          研究前沿 · 正在发生的物理 →
        </Link>
      </header>

      <div className="space-y-12">
        {groups.map((group) => (
          <section key={group.category}>
            <h2 className="text-accent-cool mb-5 font-mono text-xs tracking-[0.28em] uppercase">
              {group.category}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {group.articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/universe-physics/knowledge-base/${article.slug}`}
                  className="border-border-faint bg-bg-panel hover:border-border-subtle group rounded-lg border p-5 backdrop-blur-sm transition-all hover:-translate-y-0.5"
                >
                  <h3 className="text-fg-primary group-hover:text-accent-cool mb-2 text-base font-semibold transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-fg-secondary line-clamp-3 text-[13px] leading-relaxed">
                    {article.excerpt}
                  </p>
                  {article.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {article.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-fg-muted border-border-faint rounded border px-1.5 py-0.5 font-mono text-[10px]"
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
        ))}
      </div>
    </div>
  );
}
