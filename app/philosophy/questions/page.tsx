import type { Metadata } from "next";
import Link from "next/link";
import { getAllQuestions } from "@/lib/mdx";
import { FIELD_ACCENTS } from "@/lib/constants";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";

const DEPTH_LABELS: Record<number, { label: string; dots: number }> = {
  1: { label: "入门", dots: 1 },
  2: { label: "进阶", dots: 2 },
  3: { label: "深邃", dots: 3 },
};

function inferDepth(q: { content: string; tags: string[] }): number {
  const len = q.content.length;
  if (len > 3000) return 3;
  if (len > 1200) return 2;
  return 1;
}

export const metadata: Metadata = {
  title: "哲学大问题 — Universe Knowledge",
  description: "贯穿哲学史的根本问题，从古希腊到当代前沿",
};

export default function QuestionsPage() {
  const questions = getAllQuestions();

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-4 font-mono text-[10px] uppercase tracking-[0.42em]">
          philosophy / big questions
        </p>
        <h1 className="font-display text-fg-primary mb-3 text-[2.4rem] leading-[1.05] tracking-tight md:text-[3.2rem]">
          哲学<em className="text-accent-gold italic"> 大问题</em>
        </h1>
        <p className="text-fg-secondary max-w-xl text-sm leading-relaxed md:text-base">
          {questions.length}{" "}
          个贯穿哲学史的根本问题，从古希腊到当代前沿。每一个都曾让最伟大的头脑穷尽一生。
        </p>
      </header>

      <StaggerGrid className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {questions.map((q) => {
          const fieldColor = FIELD_ACCENTS[q.field] || "#c8a45a";
          const depth = inferDepth(q) as 1 | 2 | 3;
          const depthInfo = DEPTH_LABELS[depth] ?? { label: "入门", dots: 1 };

          return (
            <StaggerItem key={q.slug}>
              <Link
                href={`/philosophy/questions/${q.slug}`}
                className="border-border-faint bg-bg-panel hover:border-fg-disabled/30 group relative flex flex-col gap-4 overflow-hidden border p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(200,164,90,0.06)]"
              >
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
                  style={{ backgroundColor: fieldColor }}
                />

                <div className="relative flex items-start justify-between gap-3">
                  <span
                    className="shrink-0 border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.32em]"
                    style={{ borderColor: `${fieldColor}50`, color: fieldColor }}
                  >
                    {q.field}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-fg-disabled font-mono text-[9px] tracking-[0.16em]">
                      {depthInfo.label}
                    </span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map((d) => (
                        <span
                          key={d}
                          className="h-1.5 w-1.5 rounded-full transition-colors"
                          style={{
                            backgroundColor: d <= depth ? fieldColor : "var(--color-fg-disabled)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <h2 className="font-display text-fg-primary group-hover:text-accent-gold relative text-xl font-semibold leading-snug transition-colors duration-300">
                  {q.title}
                </h2>

                <div className="relative flex flex-wrap gap-1.5">
                  {q.key_figures.slice(0, 4).map((fig) => (
                    <span
                      key={fig}
                      className="text-fg-secondary font-mono text-[9px] tracking-[0.16em]"
                    >
                      {fig}
                      {q.key_figures.indexOf(fig) < Math.min(q.key_figures.length, 4) - 1 && (
                        <span className="text-fg-disabled ml-1.5">·</span>
                      )}
                    </span>
                  ))}
                  {q.key_figures.length > 4 && (
                    <span className="text-fg-disabled font-mono text-[9px]">
                      +{q.key_figures.length - 4}
                    </span>
                  )}
                </div>

                <div className="relative mt-auto flex flex-wrap gap-1.5 pt-2">
                  {q.tags.slice(0, 3).map((tag) => (
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
                  style={{ backgroundColor: fieldColor }}
                  aria-hidden
                />
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerGrid>
    </div>
  );
}
