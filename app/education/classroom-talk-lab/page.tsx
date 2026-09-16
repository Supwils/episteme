import type { Metadata } from "next";
import { ClassroomTalkLab } from "@/components/education/ClassroomTalkLab";
import { EducationDisclaimer, EducationLinks } from "@/components/education/lab-ui";

export const metadata: Metadata = {
  title: "课堂互动结构图 — 教育学与学习科学 — Episteme · 格致",
  description: "对照 IRE 与长等待的话轮。示意图不是课堂管理话术。",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          教学实验室
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">课堂互动结构图</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          课堂是被组织的时间。IRE
          很快收回发言权；长等待把空白留给学生展开。点一个话轮看它在做什么。不是给教师的话术清单。
        </p>
      </header>
      <ClassroomTalkLab />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          先问：这一拍是启动、空白还是评价？再问：谁被允许把理由说完？不要把圆点当成某间教室的实录。
        </p>
        <EducationDisclaimer />
        <EducationLinks
          items={[
            {
              href: "/education/curriculum-and-teaching/classroom-as-time",
              label: "课堂是被组织的时间",
            },
            {
              href: "/education/curriculum-and-teaching/lesson-study-is-professional-knowledge",
              label: "课例研究是专业知识",
            },
            { href: "/education/score-decomposer", label: "测验分数分解器" },
          ]}
        />
      </section>
    </main>
  );
}
