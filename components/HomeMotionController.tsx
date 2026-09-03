"use client";

import { useEffect } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MOTION_QUERY = "(prefers-reduced-motion: no-preference)";
const DESKTOP_MOTION_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

type IdleWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

/**
 * Adds progressive scroll motion to the statically rendered homepage.
 *
 * The controller renders no content and imports GSAP only after hydration.
 * Search engines, no-JS readers and the initial LCP therefore receive the
 * complete, visible Server Component markup without animation gates.
 */
export function HomeMotionController() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-home-motion-root]");
    if (!root || window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

    const idleWindow = window as IdleWindow;
    let disposed = false;
    let disposeMotion = () => {};

    const start = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);

      const media = gsap.matchMedia(root);
      media.add(MOTION_QUERY, () => {
        const context = gsap.context(() => {
          const revealNodes = Array.from(
            root.querySelectorAll<HTMLElement>("[data-home-reveal]")
          ).filter((node) => node.getBoundingClientRect().top > window.innerHeight * 0.82);

          if (revealNodes.length > 0) {
            gsap.set(revealNodes, {
              opacity: 0,
              y: 22,
              willChange: "transform,opacity",
            });

            ScrollTrigger.batch(revealNodes, {
              start: "top 88%",
              once: true,
              onEnter: (batch) => {
                gsap.to(batch, {
                  opacity: 1,
                  y: 0,
                  duration: 0.62,
                  stagger: 0.065,
                  ease: "power3.out",
                  overwrite: true,
                  onComplete: () => {
                    gsap.set(batch, {
                      clearProps: "opacity,transform,visibility,willChange",
                    });
                  },
                });
              },
            });
          }
        }, root);

        return () => context.revert();
      });

      media.add(DESKTOP_MOTION_QUERY, () => {
        const backdrop = root.querySelector<HTMLElement>("[data-home-hero-backdrop]");
        const copy = root.querySelector<HTMLElement>("[data-home-hero-copy]");

        if (backdrop) {
          gsap.to(backdrop, {
            yPercent: 9,
            opacity: 0.42,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "+=720",
              scrub: 0.35,
              invalidateOnRefresh: true,
            },
          });
        }

        if (copy) {
          gsap.to(copy, {
            y: 28,
            opacity: 0.74,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "+=620",
              scrub: 0.35,
              invalidateOnRefresh: true,
            },
          });
        }
      });

      disposeMotion = () => media.revert();
    };

    const startSafely = () => {
      // Motion is progressive enhancement. A chunk-load failure must leave the
      // already-visible Server Component markup untouched and usable.
      void start().catch(() => {});
    };
    const usesIdleCallback = typeof idleWindow.requestIdleCallback === "function";
    const idleHandle = usesIdleCallback
      ? idleWindow.requestIdleCallback!(startSafely, { timeout: 650 })
      : window.setTimeout(startSafely, 1);

    return () => {
      disposed = true;
      if (usesIdleCallback && idleWindow.cancelIdleCallback)
        idleWindow.cancelIdleCallback(idleHandle);
      else window.clearTimeout(idleHandle);
      disposeMotion();
    };
  }, []);

  return null;
}
