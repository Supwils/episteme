import type { Metadata } from "next";
import Link from "next/link";
import { getAllMathematicians } from "@/src-mathematics/lib/mathematicians";
import { getAllTheorems } from "@/src-mathematics/lib/theorems";
import { getAllMathConcepts } from "@/src-mathematics/lib/concepts";
import { getAllMathDialogues } from "@/src-mathematics/lib/dialogues";
import { getAllMathParadoxes } from "@/src-mathematics/lib/paradoxes";
import { getAllMathEras } from "@/src-mathematics/lib/eras";
import { MATH_ERA_ACCENT, MATH_FIELD_COLORS } from "@/src-mathematics/lib/constants";

export const metadata: Metadata = {
  title: "数学与逻辑 — Universe Knowledge",
  description: "从计数到范畴论，探索人类思维的最纯粹形式——数学家、定理、概念与对话",
  openGraph: {
    title: "数学与逻辑 — Universe Knowledge",
    description: "从计数到范畴论，探索人类思维的最纯粹形式",
    type: "website",
  },
};

export default function MathematicsHomePage() {
  const mathematicians = getAllMathematicians();
  const theorems = getAllTheorems();
  const concepts = getAllMathConcepts();
  const dialogues = getAllMathDialogues();
  const paradoxes = getAllMathParadoxes();
  const eras = getAllMathEras();

  const stats = [
    { value: mathematicians.length, label: "数学家", suffix: "" },
    { value: theorems.length, label: "定理", suffix: "" },
    { value: concepts.length, label: "概念", suffix: "" },
    { value: paradoxes.length, label: "悖论", suffix: "" },
    { value: dialogues.length, label: "对话", suffix: "" },
  ];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-radial-indigo)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--color-accent-violet)" }}
        />

        <div className="relative z-1 max-w-3xl">
          <p className="text-fg-muted mb-4 font-mono text-[10px] tracking-[0.42em] uppercase">
            mathematics & logic
          </p>
          <h1 className="font-display text-fg-primary text-[2.8rem] leading-[1.05] tracking-tight md:text-[4rem]">
            数学<em className="text-accent-indigo italic"> 与逻辑</em>
          </h1>
          <p className="text-fg-secondary mt-5 max-w-xl text-base leading-relaxed md:text-lg">
            从计数到范畴论，从欧几里得到陶哲轩——探索人类思维最纯粹、最有力的形式。
          </p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-display text-accent-indigo text-2xl font-semibold">
                  {stat.value || "—"}{stat.suffix}
                </span>
                <span className="text-fg-muted mt-1 font-mono text-[10px] tracking-[0.22em] uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eras */}
      <section className="px-6 sm:px-10 lg:px-16 py-16">
        <header className="mb-10">
          <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.32em] uppercase">
            mathematical eras
          </p>
          <h2 className="font-display text-fg-primary text-[1.8rem] tracking-tight md:text-[2.2rem]">
            数学的时代
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {eras.map((era) => (
            <div
              key={era.id}
              className="group border-border-faint bg-bg-panel relative overflow-hidden border p-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-fg-disabled/30"
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
                style={{ backgroundColor: era.glowColor.replace("rgba(", "").split(",")[0] ? era.gradient.match(/#[a-f0-9]+/i)?.[0] : "#6366f1" }}
              />
              <div className="relative">
                <span className="text-2xl">{era.icon}</span>
                <h3 className="font-display text-fg-primary mt-2 text-base font-semibold transition-colors group-hover:text-accent-indigo">
                  {era.name}
                </h3>
                <p className="text-fg-muted mt-0.5 font-mono text-[10px] tracking-wider">
                  {era.nameEn}
                </p>
                <p className="text-fg-disabled mt-1 font-mono text-[9px] tracking-[0.18em]">
                  {era.period}
                </p>
                <p className="text-fg-secondary mt-3 text-sm leading-relaxed">
                  {era.keyFact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Mathematicians */}
      {mathematicians.length > 0 && (
        <section className="px-6 sm:px-10 lg:px-16 py-16">
          <header className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.32em] uppercase">
                featured mathematicians
              </p>
              <h2 className="font-display text-fg-primary text-[1.8rem] tracking-tight md:text-[2.2rem]">
                杰出数学家
              </h2>
            </div>
            <Link
              href="/mathematics/mathematicians"
              className="text-fg-muted hover:text-accent-indigo font-mono text-[11px] tracking-[0.16em] uppercase transition-colors"
            >
              查看全部 →
            </Link>
          </header>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mathematicians.slice(0, 4).map((m) => {
              const eraColor = MATH_ERA_ACCENT[m.era] || "#6366f1";
              return (
                <Link
                  key={m.slug}
                  href={`/mathematics/mathematicians/${m.slug}`}
                  className="group border-border-faint bg-bg-panel relative overflow-hidden border p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-fg-disabled/30"
                >
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-15"
                    style={{ backgroundColor: eraColor }}
                  />
                  <div className="relative">
                    <span
                      className="border px-2 py-0.5 font-mono text-[9px] tracking-[0.22em] uppercase"
                      style={{ borderColor: `${eraColor}40`, color: eraColor }}
                    >
                      {m.era}
                    </span>
                    <h3 className="font-display text-fg-primary mt-3 text-base font-semibold transition-colors group-hover:text-accent-indigo">
                      {m.title}
                    </h3>
                    <p className="text-fg-muted mt-1 font-mono text-[11px] italic tracking-wider">
                      {m.name}
                    </p>
                    <p className="text-fg-disabled mt-1 font-mono text-[10px] tracking-wider">
                      {m.nationality} · {m.birthYear}–{m.deathYear ?? "至今"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Featured Theorems */}
      {theorems.length > 0 && (
        <section className="px-6 sm:px-10 lg:px-16 py-16">
          <header className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.32em] uppercase">
                landmark theorems
              </p>
              <h2 className="font-display text-fg-primary text-[1.8rem] tracking-tight md:text-[2.2rem]">
                里程碑定理
              </h2>
            </div>
            <Link
              href="/mathematics/theorems"
              className="text-fg-muted hover:text-accent-indigo font-mono text-[11px] tracking-[0.16em] uppercase transition-colors"
            >
              查看全部 →
            </Link>
          </header>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {theorems.slice(0, 4).map((t) => {
              const fieldColor = MATH_FIELD_COLORS[t.field] || "#6366f1";
              return (
                <Link
                  key={t.slug}
                  href={`/mathematics/theorems/${t.slug}`}
                  className="group border-border-faint bg-bg-panel relative overflow-hidden border p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-fg-disabled/30"
                >
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-15"
                    style={{ backgroundColor: fieldColor }}
                  />
                  <div className="relative">
                    <span
                      className="border px-2 py-0.5 font-mono text-[9px] tracking-[0.22em] uppercase"
                      style={{ borderColor: `${fieldColor}40`, color: fieldColor }}
                    >
                      {t.field}
                    </span>
                    <h3 className="font-display text-fg-primary mt-3 text-base font-semibold transition-colors group-hover:text-accent-indigo">
                      {t.title}
                    </h3>
                    <p className="text-fg-muted mt-0.5 font-mono text-[10px] italic tracking-wider opacity-60">
                      {t.title_en}
                    </p>
                    <p className="text-fg-disabled mt-2 font-mono text-[10px] tracking-wider">
                      {t.mathematician}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Featured Paradoxes */}
      {paradoxes.length > 0 && (
        <section className="px-6 sm:px-10 lg:px-16 py-16">
          <header className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.32em] uppercase">
                mathematical paradoxes
              </p>
              <h2 className="font-display text-fg-primary text-[1.8rem] tracking-tight md:text-[2.2rem]">
                深刻悖论
              </h2>
            </div>
            <Link
              href="/mathematics/paradoxes"
              className="text-fg-muted hover:text-accent-indigo font-mono text-[11px] tracking-[0.16em] uppercase transition-colors"
            >
              查看全部 →
            </Link>
          </header>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {paradoxes.slice(0, 4).map((p) => {
              const fieldColor = MATH_FIELD_COLORS[p.field] || "#6366f1";
              return (
                <Link
                  key={p.slug}
                  href={`/mathematics/paradoxes/${p.slug}`}
                  className="group border-border-faint bg-bg-panel relative overflow-hidden border p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-fg-disabled/30"
                >
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-15"
                    style={{ backgroundColor: fieldColor }}
                  />
                  <div className="relative">
                    <span
                      className="border px-2 py-0.5 font-mono text-[9px] tracking-[0.22em] uppercase"
                      style={{ borderColor: `${fieldColor}40`, color: fieldColor }}
                    >
                      {p.field}
                    </span>
                    <h3 className="font-display text-fg-primary mt-3 text-base font-semibold transition-colors group-hover:text-accent-indigo">
                      {p.title}
                    </h3>
                    <p className="text-fg-muted mt-0.5 font-mono text-[10px] italic tracking-wider opacity-60">
                      {p.title_en}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Empty state */}
      {mathematicians.length === 0 && theorems.length === 0 && paradoxes.length === 0 && (
        <section className="px-6 sm:px-10 lg:px-16 py-16">
          <div className="border-border-faint bg-bg-panel border p-12 text-center">
            <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
              内容正在建设中
            </p>
            <p className="text-fg-secondary mt-2 text-sm">
              数学与逻辑板块正在编写中，敬请期待数学家、定理、概念与对话等内容。
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
