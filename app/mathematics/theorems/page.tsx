import type { Metadata } from "next";
import Link from "next/link";
import { getAllTheorems, getTheoremsByField } from "@/subjects/mathematics/lib/theorems";
import { MATH_FIELD_COLORS, MATH_DIFFICULTY_COLORS } from "@/subjects/mathematics/lib/constants";

export const metadata: Metadata = {
  title: "定理 — Universe Knowledge",
  description: "从勾股定理到费马大定理，探索数学中最优美、最深刻的定理",
  openGraph: {
    title: "定理 — Universe Knowledge",
    description: "从勾股定理到费马大定理，探索数学中最优美、最深刻的定理",
    type: "website",
  },
};

export default function TheoremsPage() {
  const theorems = getAllTheorems();
  const grouped = getTheoremsByField();
  const fields = Object.keys(grouped);

  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
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
        fields.map((field) => {
          const fieldTheorems = grouped[field] ?? [];
          const fieldColor = MATH_FIELD_COLORS[field] || "#6366f1";

          return (
            <div key={field} className="mb-14">
              <div className="mb-5 flex items-center gap-3">
                <span
                  className="font-mono text-[10px] tracking-[0.32em] uppercase"
                  style={{ color: fieldColor }}
                >
                  {field}
                </span>
                <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
                  {fieldTheorems.length} 个定理
                </span>
                <span className="bg-border-faint h-px flex-1" />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {fieldTheorems.map((theorem) => {
                  const difficultyColor = MATH_DIFFICULTY_COLORS[theorem.difficulty] || "#6366f1";
                  return (
                    <Link
                      key={theorem.slug}
                      href={`/mathematics/theorems/${theorem.slug}`}
                      className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 relative overflow-hidden border p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div
                        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-10"
                        style={{ backgroundColor: fieldColor }}
                      />

                      <div className="relative">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="h-6 w-0.5 rounded-full opacity-50"
                              style={{ backgroundColor: fieldColor }}
                            />
                            <span
                              className="font-mono text-[9px] tracking-[0.22em] uppercase"
                              style={{ color: fieldColor }}
                            >
                              {theorem.field}
                            </span>
                          </div>
                          <span
                            className="rounded-full border px-2 py-0.5 font-mono text-[8px] tracking-[0.16em]"
                            style={{
                              borderColor: `${difficultyColor}40`,
                              color: difficultyColor,
                            }}
                          >
                            {theorem.difficulty}
                          </span>
                        </div>

                        <h3 className="font-display text-fg-primary text-base font-semibold transition-colors group-hover:text-accent-indigo">
                          {theorem.title}
                        </h3>
                        <p className="text-fg-muted mt-0.5 font-display text-sm italic tracking-wide opacity-60">
                          {theorem.title_en}
                        </p>

                        <p className="text-fg-muted mt-2 font-mono text-[9px] tracking-wider">
                          {theorem.mathematician}
                          {theorem.year ? ` · ${theorem.year}` : ""}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })
      ) : (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            暂无定理内容
          </p>
          <p className="text-fg-secondary mt-2 text-sm">
            定理文章正在撰写中，敬请期待。
          </p>
        </div>
      )}
    </div>
  );
}
