import type { Metadata } from "next";
import { MaterialsProfile } from "@/components/engineering/MaterialsProfile";
import { EngineeringDisclaimer, LabLinks } from "@/components/engineering/lab-ui";

export const metadata: Metadata = {
  title: "材料性能剖面 — 工程与技术 — Episteme · 格致",
  description: "比较结构钢、混凝土、铝合金与结构木材的强度、密度与刚度教学口径。",
};

export default function MaterialsProfilePage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          材料选择
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">材料性能剖面</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          工程师很少问“哪种材料最好”，而问“在多重约束下哪一项指标先撞墙”。钢又刚又强但重；铝轻但更软；混凝土抗压便宜、抗拉几乎要靠钢筋；木材比强度高，却怕水和火。数字是公开等级的圆整值，日期口径见各条说明。
        </p>
      </header>
      <MaterialsProfile />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          比强度把强度除以密度，用来比较“为同样承载要搬多重”。铝合金在这一栏常超过普通碳钢，所以飞机结构会付钱减重；弹性模量那一栏铝又只有钢的约三分之一，同样跨度会更易挠。
        </p>
        <EngineeringDisclaimer />
        <LabLinks
          items={[
            { href: "/engineering/materials/steel-and-alloys", label: "钢铁与合金" },
            { href: "/engineering/materials/concrete-engineering", label: "混凝土工程" },
            { href: "/engineering/foundations/materials-strength", label: "材料强度" },
          ]}
        />
      </section>
    </main>
  );
}
