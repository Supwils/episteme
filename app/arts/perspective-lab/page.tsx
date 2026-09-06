import type { Metadata } from "next";
import { PerspectiveLab } from "@/components/arts/PerspectiveLab";
import { ArtsDisclaimer, ArtsLinks } from "@/components/arts/lab-ui";

export const metadata: Metadata = {
  title: "透视与构图实验室 — 艺术、建筑与美学 — Episteme · 格致",
  description: "移动灭点，观察一点透视箱体的正交线如何会合。",
};

export default function PerspectiveLabPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          一点透视
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">透视与构图实验室</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          一点透视把平行于视线深度的棱会聚到灭点。灭点左右移动，空间的“朝向”跟着变；上下移动，等于抬高或压低视平线。这是构图工具，不是世界本身只有一个灭点。
        </p>
      </header>
      <PerspectiveLab />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <ArtsDisclaimer />
        <ArtsLinks
          items={[
            { href: "/arts/foundations/perspective-and-space", label: "透视与空间" },
            { href: "/arts/foundations/composition-balance", label: "构图与平衡" },
          ]}
        />
      </section>
    </main>
  );
}
