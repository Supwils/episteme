import type { Metadata } from "next";
import { PigmentProfile } from "@/components/arts/PigmentProfile";
import { ArtsDisclaimer, ArtsLinks } from "@/components/arts/lab-ui";

export const metadata: Metadata = {
  title: "材料与颜料剖面 — 艺术、建筑与美学 — Episteme · 格致",
  description: "从光油到支撑体，点选一层看它在油画结构里做什么。",
};

export default function PigmentProfilePage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">层位</p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">材料与颜料剖面</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          一幅油画是一叠材料，不是一张“颜色照片”。光油会变黄，釉染让颜色透出来，底子决定裂纹怎么走。点选一层，只讲它在结构里的位置——不是某件藏品的检测报告。
        </p>
      </header>
      <PigmentProfile />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <ArtsDisclaimer />
        <ArtsLinks
          items={[
            { href: "/arts/media/painting-media", label: "绘画媒介" },
            { href: "/arts/foundations/color-and-light", label: "色彩与光" },
          ]}
        />
      </section>
    </main>
  );
}
