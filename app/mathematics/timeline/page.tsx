import type { Metadata } from "next";
import { getAllMathEras } from "@/subjects/mathematics/lib/eras";

export const metadata: Metadata = {
  title: "数学时间线 — Universe Knowledge",
  description: "从古代计数到当代范畴论，浏览数学发展的完整时间线",
  openGraph: {
    title: "数学时间线 — Universe Knowledge",
    description: "从古代计数到当代范畴论，浏览数学发展的完整时间线",
    type: "website",
  },
};

export default function MathTimelinePage() {
  const eras = getAllMathEras();

  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          mathematics / timeline
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          数学<em className="text-accent-indigo italic"> 时间线</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
          从古代计数到当代范畴论，浏览数学发展的完整时间线。
        </p>
      </header>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border-faint md:left-1/2" />

        {eras.map((era, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div
              key={era.id}
              className={`relative mb-12 flex items-start gap-6 md:gap-0 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div
                className="absolute left-4 top-6 z-10 h-3 w-3 rounded-full border-2 md:left-1/2 md:-translate-x-1/2"
                style={{
                  borderColor: era.gradient.match(/#[a-f0-9]+/i)?.[0] || "#6366f1",
                  backgroundColor: "var(--color-bg-deep)",
                }}
              />

              {/* Content */}
              <div
                className={`ml-12 md:ml-0 md:w-1/2 ${
                  isLeft ? "md:pr-12 md:text-right" : "md:pl-12"
                }`}
              >
                <div className="border-border-faint bg-bg-panel group relative overflow-hidden border p-6 backdrop-blur-md transition-all duration-300 hover:border-fg-disabled/30">
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
                    style={{ backgroundColor: era.glowColor }}
                  />

                  <div className="relative">
                    <div className="mb-2 flex items-center gap-2" style={{ justifyContent: isLeft ? undefined : undefined }}>
                      <span className="text-xl">{era.icon}</span>
                      <span className="text-fg-disabled font-mono text-[10px] tracking-[0.18em]">
                        {era.period}
                      </span>
                    </div>

                    <h3 className="font-display text-fg-primary text-lg font-semibold transition-colors group-hover:text-accent-indigo">
                      {era.name}
                    </h3>
                    <p className="text-fg-muted mt-0.5 font-mono text-[10px] tracking-wider">
                      {era.nameEn}
                    </p>
                    <p className="text-fg-secondary mt-3 text-sm leading-relaxed">
                      {era.keyFact}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
