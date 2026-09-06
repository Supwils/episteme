import type { Metadata } from "next";
import { ChipProcessFlow } from "@/components/engineering/ChipProcessFlow";
import { EngineeringDisclaimer, LabLinks } from "@/components/engineering/lab-ui";

export const metadata: Metadata = {
  title: "芯片制造流程图 — 工程与技术 — Episteme · 格致",
  description: "从氧化、光刻到封装，按公开教科书顺序走一遍平面工艺，不涉及可操作配方。",
};

export default function ChipProcessPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          平面工艺
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">芯片制造流程图</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          集成电路不是把零件焊到硅上，而是在同一块晶圆上反复“生长—画图—挖掉—再长一层”。下面八步是大学微电子课里的公开顺序。每一步只讲它在系统里做什么，不给可以拿到车间去复现的参数。
        </p>
      </header>
      <ChipProcessFlow />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          真正的流水线会把光刻与刻蚀循环几十次。这里压成一条教学链，是为了看见：分辨率卡在光刻，平坦度卡在抛光，延迟越来越卡在金属连线，最后还要封装才能成为一颗能焊到板上的器件。
        </p>
        <EngineeringDisclaimer />
        <LabLinks
          items={[
            { href: "/engineering/materials/semiconductor-manufacturing", label: "半导体制造" },
            { href: "/engineering/machines/computing-hardware", label: "计算硬件" },
          ]}
        />
      </section>
    </main>
  );
}
