import type { Metadata } from "next";
import Link from "next/link";
import { MentalHealthAccessLab } from "@/components/medicine/MentalHealthAccessLab";

export const metadata: Metadata = {
  title: "心理健康服务可及性实验室 — 医学与公共卫生 — Episteme · 格致",
  description:
    "用虚构教学参数探索识别、首次接触、持续照护、有效反应与公平差距如何共同决定心理健康服务的有效覆盖。",
};

export default function MentalHealthAccessPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
      <header className="mb-9 max-w-4xl">
        <p className="mb-3 font-mono text-[10px] tracking-[0.32em] text-[#62b7a2] uppercase">
          medicine / mental health access
        </p>
        <h1 className="font-display text-fg-primary text-3xl leading-tight font-semibold sm:text-4xl">
          心理健康服务可及性实验室
        </h1>
        <p className="text-fg-secondary mt-4 text-[15px] leading-relaxed">
          服务覆盖不是“有一家诊所”或“完成一次就诊”。从需要被识别，到进入服务、保持连续照护并获得有意义改善，每一步都会流失。本实验室把这条服务链变成可调整的教学模型。
        </p>
      </header>

      <MentalHealthAccessLab />

      <section className="border-border-faint text-fg-secondary mt-10 grid gap-6 border-t pt-8 text-sm leading-relaxed md:grid-cols-3">
        <div>
          <h2 className="text-fg-primary text-base font-semibold">比例会相乘</h2>
          <p className="mt-2">
            识别率、接触率和持续率分别看似不低，连续相乘后仍可能只剩少数人获得有效帮助。
          </p>
        </div>
        <div>
          <h2 className="text-fg-primary text-base font-semibold">平均值会遮蔽差距</h2>
          <p className="mt-2">
            总体覆盖改善不保证偏远、贫困、少数语言或残障群体同步改善；同一指标需要按群体分层。
          </p>
        </div>
        <div>
          <h2 className="text-fg-primary text-base font-semibold">覆盖不等于权利</h2>
          <p className="mt-2">
            有效反应仍不能替代自主权、隐私、无歧视、共同决策与免受不必要强制等独立评价。
          </p>
        </div>
      </section>

      <nav className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <Link
          className="text-[#62b7a2] hover:underline"
          href="/medicine/public-health/community-mental-health-access-continuity"
        >
          阅读社区精神卫生与连续照护 →
        </Link>
        <Link
          className="text-[#62b7a2] hover:underline"
          href="/knowledge-graph?layout=spatial&tourId=from-distress-to-rights-based-mental-health-care&step=4&source=access-lab"
        >
          在知识图谱查看完整路线 →
        </Link>
      </nav>
    </main>
  );
}
