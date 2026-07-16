import type { Metadata } from "next";
import Link from "next/link";
import { HealthPrioritySimulator } from "@/components/medicine/HealthPrioritySimulator";

export const metadata: Metadata = {
  title: "卫生预算优先排序实验室 — 医学与公共卫生 — Episteme · 格致",
  description:
    "用虚构教学情景理解成本效果、预算影响、公平权重与实施约束如何共同塑造卫生服务优先级。",
};

export default function HealthPrioritySettingPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:px-10">
      <header className="mb-9 max-w-3xl">
        <p className="mb-3 font-mono text-[10px] tracking-[0.32em] text-[#4f9d76] uppercase">
          medicine / priority setting
        </p>
        <h1 className="font-display text-fg-primary text-3xl leading-tight font-semibold sm:text-4xl">
          卫生预算优先排序实验室
        </h1>
        <p className="text-fg-secondary mt-4 text-[15px] leading-relaxed">
          当资源有限时，决策不是把项目按一个比值从高到低排队。疾病负担、成本效果、预算影响、公平、严重度和实施能力必须被同时说明。这个教学案例把这些变量放进一张可调整的决策桌。
        </p>
      </header>

      <HealthPrioritySimulator />

      <section className="border-border-faint text-fg-secondary mt-10 grid gap-6 border-t pt-8 text-sm leading-relaxed md:grid-cols-3">
        <div>
          <h2 className="text-fg-primary text-base font-semibold">先估计增量，而非只看总量</h2>
          <p className="mt-2">
            成本效果比较新增资源换来的新增健康收益；已投入的服务、替代方案和机会成本必须进入同一比较框架。
          </p>
        </div>
        <div>
          <h2 className="text-fg-primary text-base font-semibold">再问预算与交付</h2>
          <p className="mt-2">
            即使一个项目单位收益很高，它也可能受人力、采购、冷链、转诊或持续筹资约束，不能被纸面模型直接放大。
          </p>
        </div>
        <div>
          <h2 className="text-fg-primary text-base font-semibold">把价值判断公开出来</h2>
          <p className="mt-2">
            公平权重与严重度保障不是隐藏在公式后的技术结论；它们需要受影响群体参与、理由记录和可复核程序。
          </p>
        </div>
      </section>

      <nav className="mt-8 flex flex-wrap gap-4 text-sm">
        <Link
          className="text-[#4f9d76] hover:underline"
          href="/medicine/public-health/burden-of-disease-daly-qaly"
        >
          疾病负担、DALY 与 QALY →
        </Link>
        <Link
          className="text-[#4f9d76] hover:underline"
          href="/medicine/public-health/health-economic-evaluation-priority-setting"
        >
          卫生经济学与优先排序 →
        </Link>
        <Link
          className="text-[#4f9d76] hover:underline"
          href="/medicine/public-health/health-systems-universal-health-coverage"
        >
          卫生系统与全民健康覆盖 →
        </Link>
      </nav>
    </main>
  );
}
