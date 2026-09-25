"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { SpriteSeal } from "@/components/design/SpriteSeal";
import type { AstrolabeReadout } from "@/lib/astrolabe";
import { pigmentVar } from "@/lib/design/palette";
import { isSealDomain } from "@/lib/design/seals";
import { DOMAIN_WEDGES, domainCluster, domainWedge } from "@/lib/knowledge-geometry";

type DomainName = { id: string; title: string };

const READOUTS_URL = "/api/astrolabe";
const MOBILE_QUERY = "(max-width: 767px)";
/** Pixels of horizontal travel that turn the mobile disc by one wedge. */
const SWIPE_STEP = 36;
const DRAG_THRESHOLD = 6;

/** Turn the shorter way round, so 350° → 10° is +20°, not −340°. */
function nearestTurn(current: number, targetDeg: number): number {
  const delta = ((((targetDeg - current) % 360) + 540) % 360) - 180;
  return current + delta;
}

function wedgeAtAngle(angleDeg: number): string {
  const angle = ((angleDeg % 360) + 360) % 360;
  let best = DOMAIN_WEDGES[0]!;
  let bestGap = Infinity;
  for (const wedge of DOMAIN_WEDGES) {
    const gap = Math.abs(((((wedge.centerDeg - angle) % 360) + 540) % 360) - 180);
    if (gap < bestGap) {
      best = wedge;
      bestGap = gap;
    }
  }
  return best.domain;
}

/**
 * 格致仪的选择状态：照准规转向所选学科、读数面板换成它的主线五步。
 * 星盘本身是服务端 SVG（`dial`），这里只切换类名与一个 CSS 变量。
 * 其余学科的读数在水合后空闲时取一次静态 JSON，不进首页的 HTML 与 RSC。
 */
export function AstrolabeController({
  initial,
  initialAim,
  domains,
  intro,
  actions,
  dial,
}: {
  initial: AstrolabeReadout;
  initialAim: number;
  domains: DomainName[];
  intro: ReactNode;
  actions: ReactNode;
  dial: ReactNode;
}) {
  const router = useRouter();
  const dialRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(initial.domain);
  const [aim, setAim] = useState(initialAim);
  const [readouts, setReadouts] = useState<Map<string, AstrolabeReadout>>(
    () => new Map([[initial.domain, initial]])
  );
  const selectedRef = useRef(selected);
  const fetched = useRef(false);

  const loadReadouts = useCallback(() => {
    if (fetched.current) return;
    fetched.current = true;
    fetch(READOUTS_URL)
      .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
      .then((list: AstrolabeReadout[]) => setReadouts(new Map(list.map((r) => [r.domain, r]))))
      .catch(() => {
        fetched.current = false;
      });
  }, []);

  const select = useCallback(
    (domain: string) => {
      if (domain === selectedRef.current) return;
      selectedRef.current = domain;
      setSelected(domain);
      setAim((current) => nearestTurn(current, domainWedge(domain).centerDeg));
      loadReadouts();
    },
    [loadReadouts]
  );

  // Warm the readouts once the page is idle, so the first hover is instant.
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = idle(loadReadouts);
    return () => cancel(handle);
  }, [loadReadouts]);

  // Mirror the selection onto the server-rendered SVG: highlight + roving tabindex.
  useEffect(() => {
    const root = dialRef.current;
    if (!root) return;
    for (const node of root.querySelectorAll<SVGElement>("[data-wedge], [data-spine]")) {
      const domain = node.dataset.wedge ?? node.dataset.spine;
      node.classList.toggle("is-selected", domain === selected);
      if (node.dataset.wedge) node.setAttribute("tabindex", domain === selected ? "0" : "-1");
    }
  }, [selected]);

  useEffect(() => {
    const root = dialRef.current;
    if (!root) return;
    const wedgeOf = (target: EventTarget | null) =>
      (target as Element | null)?.closest<SVGAElement>("[data-wedge]") ?? null;
    const wedges = () => Array.from(root.querySelectorAll<SVGAElement>("[data-wedge]"));

    const onPointerOver = (event: PointerEvent) => {
      const wedge = wedgeOf(event.target);
      if (wedge && event.pointerType === "mouse") select(wedge.dataset.wedge!);
    };
    const onFocusIn = (event: FocusEvent) => {
      const wedge = wedgeOf(event.target);
      if (wedge) select(wedge.dataset.wedge!);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const wedge = wedgeOf(event.target);
      if (!wedge) return;
      const list = wedges();
      const index = list.indexOf(wedge);
      const step =
        event.key === "ArrowRight" || event.key === "ArrowDown"
          ? 1
          : event.key === "ArrowLeft" || event.key === "ArrowUp"
            ? -1
            : 0;
      let next: SVGAElement | undefined;
      if (step !== 0) next = list[(index + step + list.length) % list.length];
      else if (event.key === "Home") next = list[0];
      else if (event.key === "End") next = list.at(-1);
      if (!next) return;
      event.preventDefault();
      next.focus();
    };

    // One gesture model for all pointers: a press that travels is a drag (turn
    // the rule, or on phones swipe the disc); a press that stays is a click.
    let press: { x: number; y: number; stepped: number; dragging: boolean } | null = null;
    let suppressClick = false;
    const angleFromCenter = (event: PointerEvent) => {
      const svg = root.querySelector("svg")!.getBoundingClientRect();
      const dx = event.clientX - (svg.left + svg.width / 2);
      const dy = event.clientY - (svg.top + svg.height / 2);
      return (Math.atan2(dx, -dy) * 180) / Math.PI;
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      press = { x: event.clientX, y: event.clientY, stepped: 0, dragging: false };
      suppressClick = false;
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!press) return;
      const dx = event.clientX - press.x;
      const dy = event.clientY - press.y;
      if (!press.dragging && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
      if (!press.dragging) {
        press.dragging = true;
        suppressClick = true;
        root.setPointerCapture(event.pointerId);
      }
      if (window.matchMedia(MOBILE_QUERY).matches) {
        const steps = Math.trunc(-dx / SWIPE_STEP);
        if (steps !== press.stepped) {
          const list = domains.map((d) => d.id);
          const at = list.indexOf(selectedRef.current);
          select(list[(at + steps - press.stepped + list.length * 4) % list.length]!);
          press.stepped = steps;
        }
      } else {
        select(wedgeAtAngle(angleFromCenter(event)));
      }
    };
    const onPointerUp = () => {
      press = null;
    };
    const onClick = (event: MouseEvent) => {
      if (suppressClick) {
        event.preventDefault();
        suppressClick = false;
        return;
      }
      const wedge = wedgeOf(event.target);
      if (!wedge || event.metaKey || event.ctrlKey || event.shiftKey) return;
      event.preventDefault();
      // A tap on a wedge that is not yet aimed at aims first; the second tap enters.
      if (wedge.dataset.wedge !== selectedRef.current) select(wedge.dataset.wedge!);
      else router.push(wedge.getAttribute("href")!);
    };

    root.addEventListener("pointerover", onPointerOver);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("keydown", onKeyDown);
    root.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerup", onPointerUp);
    root.addEventListener("pointercancel", onPointerUp);
    root.addEventListener("click", onClick);
    // A dragged SVG link would otherwise start a native link drag mid-gesture.
    const onDragStart = (event: DragEvent) => event.preventDefault();
    root.addEventListener("dragstart", onDragStart);
    return () => {
      root.removeEventListener("dragstart", onDragStart);
      root.removeEventListener("pointerover", onPointerOver);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("keydown", onKeyDown);
      root.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerup", onPointerUp);
      root.removeEventListener("pointercancel", onPointerUp);
      root.removeEventListener("click", onClick);
    };
  }, [domains, router, select]);

  const readout = readouts.get(selected);
  const title = readout?.title ?? domains.find((d) => d.id === selected)?.title ?? selected;
  const cluster = domainCluster(selected);

  return (
    <div className="astrolabe__body" style={{ ["--aim" as string]: `${aim}deg` }}>
      <div className="astrolabe__copy">
        {intro}
        <div className="astrolabe-readout" aria-live="polite">
          <p className="astrolabe-readout__head">
            {isSealDomain(selected) && cluster ? (
              <SpriteSeal domain={selected} size={30} color={pigmentVar(cluster)} />
            ) : null}
            <span className="astrolabe-readout__title">{title}</span>
            <span className="astrolabe-readout__caption">学习主线</span>
          </p>
          {readout ? (
            <>
              <p className="astrolabe-readout__question">{readout.question}</p>
              <ol className="astrolabe-readout__steps">
                {readout.steps.map((step) => (
                  <li key={step.url}>
                    <span className="astrolabe-readout__level">L{step.level}</span>
                    <Link href={step.url}>{step.label}</Link>
                  </li>
                ))}
              </ol>
              <Link href={readout.href} className="astrolabe-readout__enter">
                进入{readout.title} →
              </Link>
            </>
          ) : (
            <p className="astrolabe-readout__question">正在读取这门学科的主线……</p>
          )}
        </div>
        {actions}
      </div>
      <div className="astrolabe__dial" ref={dialRef}>
        {dial}
        <p className="astrolabe__hint">
          <span className="astrolabe__hint-desktop">
            悬停或拖动照准规选学科，方向键逐个扫过，回车进入
          </span>
          <span className="astrolabe__hint-mobile">左右滑动转盘，点两下进入学科</span>
        </p>
      </div>
    </div>
  );
}
