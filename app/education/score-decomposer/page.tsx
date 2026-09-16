import type { Metadata } from "next";
import { ScoreDecomposer } from "@/components/education/ScoreDecomposer";
import { EducationDisclaimer, EducationLinks } from "@/components/education/lab-ui";

export const metadata: Metadata = {
  title: "测验分数分解器 — 教育学与学习科学 — Episteme · 格致",
  description: "把示意分数拆成机会、语言介质、猜测与目标构念。不是真实测量学工具。",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          教学实验室
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">测验分数分解器</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          分数是推断。这里用两份虚构的示意总分，把条块拆成机会、语言介质、猜测与目标构念。数字不能解释任何真实学生，也不能当成心理测量软件。
        </p>
      </header>
      <ScoreDecomposer />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          先问：这一块声称在测什么？再问：语言和机会会不会被证书当成能力？不要把色块比例抄进任何成绩单。
        </p>
        <EducationDisclaimer />
        <EducationLinks
          items={[
            {
              href: "/education/assessment-and-equity/assessment-as-inference",
              label: "评估即推断",
            },
            {
              href: "/education/assessment-and-equity/validity-is-an-argument",
              label: "效度是一种论证",
            },
            { href: "/education/adaptive-path-lab", label: "自适应路径示意" },
          ]}
        />
      </section>
    </main>
  );
}
