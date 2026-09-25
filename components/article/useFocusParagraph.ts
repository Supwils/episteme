"use client";

import { useEffect } from "react";
import { subscribeToScrollFrame } from "@/lib/scroll-frame";

const READING_LINE = 0.4;

/**
 * 专注模式（T-DESIGN-06）：把视口 40% 高度处的那段标为正在读，其余段落由
 * CSS 换成次一级的墨色。只在专注模式下订阅滚动，离开模式即清除标记。
 */
export function useFocusParagraph(active: boolean) {
  useEffect(() => {
    const prose = document.querySelector<HTMLElement>(".md-prose");
    if (!active || !prose) return;
    prose.dataset.focusActive = "";
    let current: HTMLElement | null = null;
    const unsubscribe = subscribeToScrollFrame(() => {
      const line = window.innerHeight * READING_LINE;
      const blocks = prose.querySelectorAll<HTMLElement>(".md-p, .md-list > li, .md-quote");
      // The last block that has reached the reading line; a heading or card
      // under the line keeps the paragraph above lit instead of dimming all.
      let next: HTMLElement | null = blocks[0] ?? null;
      for (const block of blocks) {
        if (block.getBoundingClientRect().top > line) break;
        next = block;
      }
      if (next === current) return;
      current?.removeAttribute("data-reading");
      next?.setAttribute("data-reading", "");
      current = next;
    });
    return () => {
      unsubscribe();
      current?.removeAttribute("data-reading");
      delete prose.dataset.focusActive;
    };
  }, [active]);
}
