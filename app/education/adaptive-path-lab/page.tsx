import type { Metadata } from "next";
import { AdaptivePathLab } from "@/components/education/AdaptivePathLab";
import { EducationDisclaimer, EducationLinks } from "@/components/education/lab-ui";

export const metadata: Metadata = {
  title: "自适应路径示意 — 教育学与学习科学 — Episteme · 格致",
  description: "对照“像家教”与系统记录。绿灯是模型推断，不是学会了的照片。",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          教学实验室
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">自适应路径示意</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          自适应系统常被写成一位不知疲倦的家教。这里只让两种读法切换：人口中的家教，和日志里实际记下的东西。绿灯是阈值，不是已经学会。
        </p>
      </header>
      <AdaptivePathLab />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          先问：这一站是题目、分支还是绿灯？再问：记录了什么、谁有权看？不要把路径当成可以拿去部署的推荐算法。
        </p>
        <EducationDisclaimer />
        <EducationLinks
          items={[
            {
              href: "/education/education-technology/adaptive-systems-are-not-tutors",
              label: "自适应系统不是家教",
            },
            {
              href: "/education/education-technology/what-edtech-records",
              label: "教育技术记录了什么",
            },
            { href: "/education/spacing-lab", label: "遗忘与间隔练习示意" },
          ]}
        />
      </section>
    </main>
  );
}
