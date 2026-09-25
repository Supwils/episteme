"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * 误解卡叠（T-DESIGN-06d）。服务端渲染时所有卡片依次展开（没有 JS 也读得全）；
 * 水合后变成一叠，一次看一张。其余卡片用 `hidden="until-found"` 收起：文字仍在
 * DOM 里，页内查找命中时自动翻到那一张。
 */
export function MythStack({ cards }: { cards: ReactNode[] }) {
  const [active, setActive] = useState(0);
  const [stacked, setStacked] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);
  const count = cards.length;

  useEffect(() => setStacked(count > 1), [count]);

  useEffect(() => {
    const items = Array.from(listRef.current?.children ?? []) as HTMLElement[];
    items.forEach((item, index) => {
      if (stacked && index !== active) item.setAttribute("hidden", "until-found");
      else item.removeAttribute("hidden");
    });
  }, [active, stacked]);

  useEffect(() => {
    const items = Array.from(listRef.current?.children ?? []) as HTMLElement[];
    const handlers = items.map((item, index) => {
      const onMatch = () => setActive(index);
      item.addEventListener("beforematch", onMatch);
      return () => item.removeEventListener("beforematch", onMatch);
    });
    return () => handlers.forEach((dispose) => dispose());
  }, []);

  return (
    <div className="myth-stack" data-stacked={stacked || undefined}>
      <ol ref={listRef} className="myth-stack__cards">
        {cards.map((card, index) => (
          <li key={index} className="myth-card" aria-label={`误解 ${index + 1} / ${count}`}>
            {card}
          </li>
        ))}
      </ol>
      {stacked && (
        <div className="myth-stack__controls">
          <button
            type="button"
            onClick={() => setActive((index) => Math.max(0, index - 1))}
            disabled={active === 0}
          >
            上一张
          </button>
          <span aria-live="polite">
            {active + 1} / {count}
          </span>
          <button
            type="button"
            onClick={() => setActive((index) => Math.min(count - 1, index + 1))}
            disabled={active === count - 1}
          >
            下一张
          </button>
        </div>
      )}
    </div>
  );
}
