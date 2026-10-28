import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { EarthScienceLabDisclaimer, EarthScienceLabLinks } from "@/components/earth-science/lab-ui";

const WaterBalanceLab = dynamic(
  () => import("@/components/earth-science/WaterBalanceLab").then((mod) => mod.WaterBalanceLab),
  { loading: () => <p className="text-fg-muted text-sm">示意正在载入</p> }
);

export const metadata: Metadata = {
  title: "水量平衡示意 — 地球科学 — Episteme · 格致",
  description:
    "改降水、蒸散发和径流，看这一时段的储蓄项 ΔS。示意毫米，不是气候预测，也不是洪水预警。",
};

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          教学实验室
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">水量平衡示意</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          降水、蒸散发和径流都是 0 到 200
          的示意毫米。储蓄项跟着立刻变。这不是某条河的测站，也不是一张预报。
        </p>
      </header>
      <WaterBalanceLab />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          《水循环》把流域水量平衡写成降水 P 等于蒸散发 ET、径流 R 与储水量变化 ΔS 之和。因此 ΔS = P
          − ET − R。ΔS 是加项，不能写成除数。大于 0 是这一时段蓄水，等于 0 是持平，小于 0 是失水。
        </p>
        <p>
          全球长期蒸发约等于降水。这里只记一个时段、一个流域的账，不外推成气候预报，也不拿来做洪水预警或临界点预测。
        </p>
        <EarthScienceLabDisclaimer />
        <EarthScienceLabLinks
          items={[{ href: "/earth-science/concepts/water-cycle", label: "水循环" }]}
        />
      </section>
    </div>
  );
}
