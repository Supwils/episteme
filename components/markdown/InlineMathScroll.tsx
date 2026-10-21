"use client";

import { useEffect, useRef } from "react";

function mathContainer(region: HTMLElement, root: HTMLElement) {
  let parent = region.parentElement;
  while (
    parent &&
    parent !== root &&
    ["inline", "contents"].includes(getComputedStyle(parent).display)
  ) {
    parent = parent.parentElement;
  }
  return parent ?? root;
}

function observeMath(root: HTMLElement) {
  const regions = Array.from(root.querySelectorAll<HTMLElement>(".md-math-inline"), (region) => ({
    region,
    container: mathContainer(region, root),
  }));
  if (!regions.length) return;
  function update() {
    const measurements = regions.map(({ region, container }) => {
      const style = getComputedStyle(container);
      const width =
        container.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      const content = region.firstElementChild?.getBoundingClientRect();
      const overflowing = Boolean(width > 0 && content && content.width > width + 1);
      return { region, overflowing };
    });
    for (const { region, overflowing } of measurements) {
      region.toggleAttribute("data-overflow", overflowing);
      if (overflowing) {
        region.tabIndex = 0;
        region.setAttribute("aria-description", "可用左右方向键滚动查看完整公式");
      } else {
        region.removeAttribute("tabindex");
        region.removeAttribute("aria-description");
      }
    }
  }
  const observer = new ResizeObserver(update);
  for (const { region, container } of regions) {
    observer.observe(container);
    // KaTeX bases are inline blocks: font changes resize them even when a paragraph stays fixed.
    for (const base of region.querySelectorAll(".base")) observer.observe(base);
  }
  update();
  return () => observer.disconnect();
}

export function InlineMathScroll() {
  const marker = useRef<HTMLSpanElement>(null);
  // Server navigation can replace the prose while retaining this boundary.
  useEffect(() => {
    const root = marker.current?.parentElement;
    if (root && typeof ResizeObserver !== "undefined") return observeMath(root);
  });
  return (
    <>
      <span ref={marker} hidden aria-hidden="true" />
      <noscript>
        <style>{".md-math-inline{--inline-math-display:inline-flex}"}</style>
      </noscript>
    </>
  );
}
