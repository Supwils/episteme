"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

const EventTimeline = dynamic(
  () => import("@/subjects/history/components/visualizations/EventTimeline"),
  {
    ssr: false,
    loading: () => (
      <p role="status" className="text-fg-muted py-16 text-center text-sm">
        正在准备交互时间线…
      </p>
    ),
  }
);

/** 交互时间线较重，只在读者点了「展开」之后才下载（e2e 覆盖此约定）。 */
export function HistoryTimelineModule() {
  const [open, setOpen] = useState(false);
  return (
    <section className="landing-block" aria-labelledby="landing-history-timeline">
      <h2 id="landing-history-timeline" className="landing-block__title">
        关键事件时间线
      </h2>
      <p className="landing-block__note">从金字塔到登月——改变人类命运的关键时刻。</p>
      {open ? null : (
        <div className="landing-actions">
          <button
            type="button"
            aria-expanded="false"
            aria-controls="history-interactive-timeline"
            className="landing-action"
            onClick={() => setOpen(true)}
          >
            展开交互时间线
          </button>
          <Link href="/human-history/timeline" className="landing-action" data-quiet>
            进入完整时间线
          </Link>
        </div>
      )}
      <div id="history-interactive-timeline">{open ? <EventTimeline /> : null}</div>
    </section>
  );
}
