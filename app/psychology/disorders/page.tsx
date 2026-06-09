import type { Metadata } from "next";
import Link from "next/link";
import { getAllDisorders } from "@/subjects/psychology/lib/mdx";
import { DISORDER_CATEGORY_COLORS } from "@/subjects/psychology/lib/constants";

export const metadata: Metadata = {
  title: "心理障碍 — Universe Knowledge",
  description: "DSM分类体系中的主要心理障碍与诊断",
};

export default function DisordersPage() {
  const disorders = getAllDisorders();
  const categories = [...new Set(disorders.map((d) => d.category))];

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-4 font-mono text-[10px] uppercase tracking-[0.42em]">
          psychology / disorders
        </p>
        <h1 className="font-display text-fg-primary mb-3 text-[2.4rem] leading-[1.05] tracking-tight md:text-[3.2rem]">
          心理<em className="text-accent-pink italic"> 障碍</em>
        </h1>
        <p className="text-fg-secondary max-w-xl text-sm leading-relaxed md:text-base">
          {disorders.length} 种主要心理障碍的分类、症状与治疗方法。
        </p>
      </header>

      {categories.map((cat) => {
        const catDisorders = disorders.filter((d) => d.category === cat);
        const catColor = DISORDER_CATEGORY_COLORS[cat] || "#d4789c";

        return (
          <section key={cat} className="mb-14">
            <div className="mb-5 flex items-center gap-3">
              <span
                className="font-mono text-[10px] tracking-[0.32em] uppercase"
                style={{ color: catColor }}
              >
                {cat}
              </span>
              <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
                {catDisorders.length} 种
              </span>
              <span className="bg-border-faint h-px flex-1" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {catDisorders.map((d) => (
                <Link
                  key={d.slug}
                  href={`/psychology/disorders/${d.slug}`}
                  className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 card-hover relative flex h-full flex-col gap-3 overflow-hidden border p-6 backdrop-blur-md"
                >
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
                    style={{ backgroundColor: catColor }}
                  />
                  <div className="relative flex items-center justify-between">
                    <span
                      className="border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.22em]"
                      style={{ borderColor: `${catColor}50`, color: catColor }}
                    >
                      {d.dsm_code}
                    </span>
                  </div>
                  <h2 className="font-display text-fg-primary group-hover:text-accent-purple text-lg font-semibold leading-tight transition-colors duration-300">
                    {d.title}
                  </h2>
                  <p className="text-fg-muted font-mono text-[11px] italic tracking-wider">
                    {d.title_en}
                  </p>
                  <div className="relative mt-auto flex flex-wrap gap-1.5">
                    {d.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="border-fg-disabled/30 text-fg-muted rounded-none border px-2 py-0.5 font-mono text-[9px] tracking-[0.22em]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                    style={{ backgroundColor: catColor }}
                    aria-hidden
                  />
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {disorders.length === 0 && (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            暂无心理障碍内容
          </p>
          <p className="text-fg-secondary mt-2 text-sm">内容正在撰写中，敬请期待。</p>
        </div>
      )}
    </div>
  );
}
