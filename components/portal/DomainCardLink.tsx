"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { CSSProperties, MouseEvent, ReactNode } from "react";

const TRANSITION_NAME = "domain-plate";
/** Longest we hold the old page frozen waiting for the landing to render. */
const LANDING_WAIT_MS = 1000;

function waitForLandingPlate(domain: string): Promise<Element | null> {
  const selector = `[data-landing-plate="${domain}"] .landing-hero__plate`;
  return new Promise((resolve) => {
    const started = performance.now();
    const check = () => {
      const plate = document.querySelector(selector);
      if (plate || performance.now() - started > LANDING_WAIT_MS) resolve(plate);
      // Rendering is paused during the update callback, so poll on a timer
      // rather than animation frames.
      else window.setTimeout(check, 16);
    };
    check();
  });
}

/**
 * 首页学科卡的链接：支持视图过渡的浏览器里，卡片上的标本图版会变形成学科首页
 * 的主图版。名字只在过渡期间挂上，否则主题切换的圆形揭示会把这些图版单独抽出来。
 * 不支持、减少动效或带修饰键点击时就是普通导航。
 */
export function DomainCardLink({
  href,
  domain,
  className,
  style,
  children,
}: {
  href: string;
  domain: string;
  className: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const router = useRouter();

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      typeof document.startViewTransition !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const cardPlate = event.currentTarget.querySelector<SVGElement>(".domain-card__plate");
    if (!cardPlate) return;
    event.preventDefault();

    cardPlate.style.viewTransitionName = TRANSITION_NAME;
    let landingPlate: HTMLElement | SVGElement | null = null;
    const transition = document.startViewTransition(async () => {
      cardPlate.style.viewTransitionName = "";
      router.push(href);
      const plate = await waitForLandingPlate(domain);
      if (plate instanceof SVGElement || plate instanceof HTMLElement) {
        landingPlate = plate;
        plate.style.viewTransitionName = TRANSITION_NAME;
      }
    });
    void transition.finished.finally(() => {
      if (landingPlate) landingPlate.style.viewTransitionName = "";
    });
  };

  return (
    <Link href={href} data-domain={domain} className={className} style={style} onClick={onClick}>
      {children}
    </Link>
  );
}
