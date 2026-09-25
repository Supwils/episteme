"use client";

import { useEffect } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const ALREADY_VISIBLE_RATIO = 0.92;
const PENDING_SELECTOR = "[data-reveal]:not(.is-in):not([data-reveal-tracked])";

/**
 * Site-wide scroll reveal for `[data-reveal]` nodes (the homepage keeps its
 * GSAP `[data-home-reveal]` path). Server markup ships fully visible; only
 * after this effect adds `html.motion-ok` does the stylesheet hide
 * not-yet-revealed nodes, so no-JS readers and crawlers never see gates.
 *
 * Nodes already inside the viewport are marked in the same tick and never
 * transition — only content below the fold animates in. A MutationObserver
 * picks up nodes that arrive later (streamed route segments, client-side
 * filtering, soft navigations), so nothing can be left hidden.
 */
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0 }
    );

    const track = () => {
      const pending = document.querySelectorAll<HTMLElement>(PENDING_SELECTOR);
      if (pending.length === 0) return;
      document.documentElement.classList.add("motion-ok");
      const foldLine = window.innerHeight * ALREADY_VISIBLE_RATIO;
      for (const node of pending) {
        node.setAttribute("data-reveal-tracked", "");
        if (node.getBoundingClientRect().top < foldLine) node.classList.add("is-in");
        else io.observe(node);
      }
    };

    let frame = 0;
    const scheduleTrack = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          track();
        });
    };

    track();
    // Only insertions that actually carry a reveal node cost a re-scan, so
    // canvas-heavy pages (knowledge graph, 3D scenes) never pay for this.
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const added of record.addedNodes) {
          if (!(added instanceof Element)) continue;
          if (added.matches("[data-reveal]") || added.querySelector("[data-reveal]")) {
            scheduleTrack();
            return;
          }
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      io.disconnect();
    };
  }, []);

  return null;
}
