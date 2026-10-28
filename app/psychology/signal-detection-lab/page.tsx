import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { PsychologyLabDisclaimer, PsychologyLabLinks } from "@/components/psychology/lab-ui";

const SignalDetectionLab = dynamic(
  () => import("@/components/psychology/SignalDetectionLab").then((mod) => mod.SignalDetectionLab),
  { loading: () => <p className="text-fg-muted text-sm">示意正在载入</p> }
);

export const metadata: Metadata = {
  title: "信号检测示意 — 心理学 — Episteme · 格致",
  description: "移动分布距离和判断标准，看击中率与虚报率怎样分开。不是被试成绩。",
};

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          教学实验室
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">信号检测示意</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          噪声和信号加噪声是两条等宽的正态曲线。报「有」的门槛一动，击中和虚报一起动。分布拉得更开，才是敏感度变了。
        </p>
      </header>
      <SignalDetectionLab />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          专页写的是 d′ = z(击中率) − z(虚报率)。这里的判断标准 c = −½(z(击中率) +
          z(虚报率))，零点在两条分布的中点。等方差是方便的起点，再认记忆里信号分布常常更宽，那时不要把这一个
          d′ 当成没有假设的成绩。
        </p>
        <p>
          知觉页把二择一任务里 d′ ≈ 1 称为中等、d′ ≥ 1.5
          称为很强。本页是「有没有」判断，刻度只用来看标准移动时比率怎么走，不把滑杆读成那一档评语。
        </p>
        <PsychologyLabDisclaimer />
        <PsychologyLabLinks
          items={[
            {
              href: "/psychology/methods/psychophysics-and-signal-detection",
              label: "心理物理学与信号检测",
            },
            { href: "/psychology/phenomena/perception-physiology", label: "知觉与生理" },
          ]}
        />
      </section>
    </div>
  );
}
