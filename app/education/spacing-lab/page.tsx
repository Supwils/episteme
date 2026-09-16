import type { Metadata } from "next";
import { SpacingLab } from "@/components/education/SpacingLab";
import { EducationDisclaimer, EducationLinks } from "@/components/education/lab-ui";

export const metadata: Metadata = {
  title: "遗忘与间隔练习示意 — 教育学与学习科学 — Episteme · 格致",
  description: "对照集中练习与间隔练习的即时表现和延迟保持。示意不是背词器。",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          教学实验室
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">遗忘与间隔练习示意</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          集中练习当时更熟，间隔练习把复习分开。两条示意条对照的是即时表现与延迟保持，不是一份可拿去刷的单词表。
        </p>
      </header>
      <SpacingLab />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          先问：这条更长的是当时的熟，还是隔一段时间还在？再问：材料、间隔和结局时间写在哪一份实验里？不要把示意条当成自己的记忆分数。
        </p>
        <EducationDisclaimer />
        <EducationLinks
          items={[
            {
              href: "/education/cognition-and-memory/memory-spacing-and-transfer",
              label: "记忆、间隔与迁移",
            },
            {
              href: "/education/cognition-and-memory/desirable-difficulty-is-a-condition",
              label: "必要难度是一种条件",
            },
            { href: "/education/classroom-talk-lab", label: "课堂互动结构图" },
          ]}
        />
      </section>
    </main>
  );
}
