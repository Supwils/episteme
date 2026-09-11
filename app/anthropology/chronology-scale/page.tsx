import type { Metadata } from "next";
import { ChronologyScale } from "@/components/anthropology/ChronologyScale";
import { AnthropologyDisclaimer, AnthropologyLinks } from "@/components/anthropology/lab-ui";

export const metadata: Metadata = {
  title: "史前年代标尺 — 人类学与考古 — Episteme · 格致",
  description: "切换相对地层与绝对测年，看两种钟在同一条带子上如何错位。",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          教学实验室
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">史前年代标尺</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          相对年代靠叠压：先沉积的在下。绝对年代靠样品与校正曲线。两种钟可以对质，却不能互相替代。实验室不提供发掘步骤。
        </p>
      </header>
      <ChronologyScale />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          切换模式时问自己：这句话还能不能被一份发掘报告或一份测年实验室记录对质？能，就是事实层；不能，就要写成解释。
        </p>
        <AnthropologyDisclaimer />
        <AnthropologyLinks
          items={[
            {
              href: "/anthropology/prehistory-and-archaeology/stratigraphy-and-context",
              label: "地层与出土情境",
            },
            {
              href: "/anthropology/prehistory-and-archaeology/archaeological-dating",
              label: "考古测年",
            },
            { href: "/earth-science/concepts/geologic-time-scale", label: "地质年代表" },
          ]}
        />
      </section>
    </main>
  );
}
