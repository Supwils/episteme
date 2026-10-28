import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ChemistryLabDisclaimer, ChemistryLabLinks } from "@/components/chemistry/lab-ui";

const EquilibriumLab = dynamic(
  () => import("@/components/chemistry/EquilibriumLab").then((mod) => mod.EquilibriumLab),
  { loading: () => <p className="text-fg-muted text-sm">示意正在载入</p> }
);

export const metadata: Metadata = {
  title: "平衡方向示意 — 化学 — Episteme · 格致",
  description: "改反应商和平衡常数，看净变化朝哪一侧。不是测定实验，也不给出合成或反应操作步骤。",
};

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          教学实验室
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">平衡方向示意</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          模型只有 A ⇌ B。两个滑杆是示意的反应商 Q 和平衡常数
          K，用来看净变化朝产物、朝反应物，还是已经在平衡。
        </p>
      </header>
      <EquilibriumLab />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          《化学平衡》写：反应商 Q 用当前组成，平衡常数 K 用平衡时的组成。Q 小于 K，净反应朝产物；Q
          大于 K，朝反应物；二者相等，净变化为零。本页不把这条比较写成某一条真实反应的配方。
        </p>
        <p>
          《化学热力学》把同一件事写成 ΔG = ΔG° + RT ln Q，并且 ΔG° = −RT ln K。因此 ln(K/Q)
          为正时朝产物，为负时朝反应物。这里只保留这个符号，不算产率，也不把滑杆当成温度、压力或加料。
        </p>
        <ChemistryLabDisclaimer />
        <ChemistryLabLinks
          items={[
            { href: "/chemistry/concepts/chemical-equilibrium", label: "化学平衡" },
            { href: "/chemistry/concepts/chemical-thermodynamics", label: "化学热力学" },
          ]}
        />
      </section>
    </div>
  );
}
