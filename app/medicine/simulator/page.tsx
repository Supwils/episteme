import type { Metadata } from "next";
import Link from "next/link";
import { SIRSimulator } from "@/components/medicine/SIRSimulator";

export const metadata: Metadata = {
  title: "流行病模拟器（SIR 模型）— 医学与公共卫生 — Episteme · 格致",
  description:
    "亲手调节 R₀、传染期与疫苗接种率，实时看疫情曲线如何变化——用经典的 SIR 模型理解「压平曲线」「群体免疫」背后的数学。",
};

export default function SimulatorPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="mb-3 font-mono text-[11px] tracking-[0.3em] text-white/40 uppercase">
          Epidemic Simulator · SIR Model
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">流行病模拟器</h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-white/60">
          2020 年，全世界第一次集体学会了「R₀」「压平曲线」「群体免疫」这些词。它们背后是一套
          一百年前就写下的数学——
          <span className="text-white/80">SIR 模型</span>
          。下面这个模拟器把人群分成三类：易感（S）、感染（I）、康复或免疫（R），让你亲手调参数，
          实时看一场疫情如何起落。
        </p>
      </header>

      <SIRSimulator />

      <section className="mt-10 space-y-4 text-[14.5px] leading-relaxed text-white/65">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读这张图</h2>
        <p>
          绿线（S）是还没被感染、可能中招的人，它一路下滑；红线（I）是当前正在感染、有传染性的人，
          它先冲高再回落——那个红色的峰，就是医疗系统最吃紧的时刻；蓝线（R）是已经康复获得免疫、
          或一开始就接种了疫苗的人，它只升不降。
        </p>
        <h2 className="text-fg-primary text-lg font-semibold">三个关键直觉</h2>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong className="text-white/85">「压平曲线」不是玄学。</strong>
            降低 R₀（戴口罩、保持距离）会把红色的峰压低、推后——峰值越低，医院越不容易被挤垮。
          </li>
          <li>
            <strong className="text-white/85">群体免疫有一道明确的阈值。</strong>
            当免疫人口超过 <code className="text-white/70">1 − 1/R₀</code>，有效传染数 Rₑ 就跌破
            1，疫情自行消退。 R₀ 越大（如麻疹
            ~15），需要的接种率就越高（~95%）——这正是麻疹疫苗不能松懈的原因。
          </li>
          <li>
            <strong className="text-white/85">提高接种率，亲眼看峰塌下去。</strong>
            把疫苗接种率滑块往右拉，会看到感染峰急剧变矮，累计感染人数大幅下降——这就是疫苗保护整个社区的方式。
          </li>
        </ul>
        <p className="text-[13px] text-white/40">
          说明：这是一个用于建立直觉的教学模型，刻意做了简化（人群均匀混合、不考虑潜伏期、年龄结构、
          变异株等）。真实的流行病预测要复杂得多——但「Rₑ 是否小于 1」这个核心判据是真实而普适的。
        </p>
        <div className="flex flex-wrap gap-4 pt-2 text-[13.5px]">
          <Link href="/medicine/concepts/epidemiology" className="text-[#d9544d] hover:underline">
            延伸阅读：流行病学 →
          </Link>
          <Link href="/medicine/concepts/vaccination" className="text-[#d9544d] hover:underline">
            疫苗原理 →
          </Link>
          <Link
            href="/mathematics/concepts/differential-equation"
            className="text-[#8b6fd0] hover:underline"
          >
            背后的数学：微分方程 →
          </Link>
        </div>
      </section>
    </main>
  );
}
