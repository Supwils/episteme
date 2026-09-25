"use client";

import { useState, type ComponentType, type KeyboardEvent } from "react";

export type Demo = { id: string; label: string; Component: ComponentType };

export function DemoLoading() {
  return <p className="text-fg-muted py-24 text-center text-sm">演示加载中…</p>;
}

/**
 * 学科首页的互动演示页签：一次只挂载正在看的那个（配合 next/dynamic，代码也只在
 * 选中时下载），而不是把几个可视化同时堆在首页上。方向键切换，遵循 WAI-ARIA tabs。
 */
export function DemoTabs({
  id,
  title,
  note,
  demos,
}: {
  id: string;
  title: string;
  note: string;
  demos: readonly Demo[];
}) {
  const [active, setActive] = useState(demos[0]!.id);
  const demo = demos.find((item) => item.id === active)!;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const index = demos.findIndex((item) => item.id === active);
    const next = demos[(index + step + demos.length) % demos.length]!;
    setActive(next.id);
    document.getElementById(`${id}-tab-${next.id}`)?.focus();
  };

  return (
    <section className="landing-block" aria-labelledby={id}>
      <h2 id={id} className="landing-block__title">
        {title}
      </h2>
      <p className="landing-block__note">{note}</p>
      <div role="tablist" aria-label={title} className="demo-tabs" onKeyDown={onKeyDown}>
        {demos.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`${id}-tab-${item.id}`}
            aria-selected={item.id === active}
            aria-controls={`${id}-panel`}
            tabIndex={item.id === active ? 0 : -1}
            className="demo-tabs__tab"
            onClick={() => setActive(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        className="demo-tabs__panel"
      >
        <demo.Component />
      </div>
    </section>
  );
}
