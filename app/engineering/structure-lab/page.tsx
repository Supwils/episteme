import type { Metadata } from "next";
import { StructureLoadLab } from "@/components/engineering/StructureLoadLab";
import { EngineeringDisclaimer, LabLinks } from "@/components/engineering/lab-ui";

export const metadata: Metadata = {
  title: "结构受力实验室 — 工程与技术 — Episteme · 格致",
  description: "移动简支梁上的集中力，观察支座反力与弯矩图如何跟着变。",
};

export default function StructureLabPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          简支梁
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">结构受力实验室</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          梁把竖向荷载变成两端的反力和梁内的弯矩。力越靠近跨中，最大弯矩越大；越靠近支座，那一侧反力越大。橙色虚线是一根教学
          I 梁的容许弯矩，用来看见“过载”而不是给出施工许可。
        </p>
      </header>
      <StructureLoadLab />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          弯矩图从两端的零爬到荷载正下方的峰值。把力滑到 5 m，峰值最高；滑到 1
          m，左支座几乎扛下全部荷载，峰值弯矩反而下降。桥梁主梁的腹板与翼缘，正是为这条弯矩图准备的。
        </p>
        <EngineeringDisclaimer />
        <LabLinks
          items={[
            { href: "/engineering/civil/bridges", label: "桥梁" },
            { href: "/engineering/foundations/materials-strength", label: "材料强度" },
          ]}
        />
      </section>
    </main>
  );
}
