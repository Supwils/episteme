"use client";

import dynamic from "next/dynamic";

// The wheel is ~20 KB of interaction code; load it only when the landing renders.
const EmotionWheel = dynamic(
  () => import("@/subjects/psychology/components/visualizations/EmotionWheel"),
  {
    ssr: false,
    loading: () => <p className="text-fg-muted py-24 text-center text-sm">情绪轮加载中…</p>,
  }
);

export function EmotionWheelModule() {
  return (
    <section className="landing-block" aria-labelledby="landing-emotion-wheel">
      <h2 id="landing-emotion-wheel" className="landing-block__title">
        情绪轮
      </h2>
      <p className="landing-block__note">
        普拉切克的八种基本情绪与它们的强弱、组合。点任一瓣看释义。
      </p>
      <div className="border-border-faint bg-bg-panel mx-auto max-w-2xl border p-6 sm:p-8">
        <EmotionWheel />
      </div>
    </section>
  );
}
