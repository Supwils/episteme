import type { Metadata } from "next";
import { CanonComparator } from "@/components/religion/CanonComparator";
import { ReligionDisclaimer, ReligionLinks } from "@/components/religion/lab-ui";

export const metadata: Metadata = {
  title: "经典开篇比较器 — 宗教学 — Episteme · 格致",
  description: "并置公有领域开篇，看宇宙论怎样被写成句子。",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          教学实验室
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">经典开篇比较器</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          并置公有领域开篇，看宇宙论怎样被写成句子。
        </p>
      </header>
      <CanonComparator />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <ReligionDisclaimer />
        <ReligionLinks
          items={[
            { href: "/religion", label: "宗教学首页" },
            { href: "/religion/religion-foundations/what-is-religion", label: "什么是宗教" },
          ]}
        />
      </section>
    </main>
  );
}
