"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import {
  panelNodeFromCards,
  parseSummitCards,
  type SummitCardFile,
  type SummitPanelNode,
} from "@/lib/summit-cards";
import { parseSummitLayout, SUMMIT_NODE_STRIDE, type SummitLayoutFile } from "@/lib/summit-layout";
import { SummitPanel } from "./SummitPanel";
import { revealSummitNode, summitNodeElement } from "./summit-dom";
import type { SummitLens, SummitScene } from "./summit-scene";

const NARROW = "(max-width: 767px)";

export function SummitStage({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"plan" | "solid" | "failed">("plan");
  const [lens, setLens] = useState<SummitLens>("domain");
  const [selected, setSelected] = useState<number | null>(null);
  const [notice, setNotice] = useState("");
  const [panel, setPanel] = useState<SummitPanelNode | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLParagraphElement>(null);
  const sceneRef = useRef<SummitScene | null>(null);
  const startingRef = useRef(false);
  const layoutRef = useRef<SummitLayoutFile | null>(null);
  const cardsRef = useRef<SummitCardFile | null>(null);
  const lensRef = useRef(lens);
  const chosen = useRef(false);
  lensRef.current = lens;

  const closePanel = useCallback(() => {
    setSelected(null);
    setPanel(null);
  }, []);

  const stopScene = useCallback(() => {
    sceneRef.current?.dispose();
    sceneRef.current = null;
    startingRef.current = false;
    setMode("plan");
  }, []);

  const startScene = useCallback(async () => {
    const canvas = canvasRef.current;
    const labels = labelRef.current;
    if (!canvas || !labels || sceneRef.current || startingRef.current) return;
    startingRef.current = true;
    setMode("solid");
    await new Promise((resolve) => requestAnimationFrame(resolve));
    try {
      const [layoutResponse, cardResponse] = await Promise.all([
        fetch("/summit-layout.json"),
        fetch("/summit-cards.json"),
      ]);
      if (!layoutResponse.ok) throw new Error("layout");
      const parsed = parseSummitLayout(await layoutResponse.json());
      if (!parsed) throw new Error("layout");
      layoutRef.current = parsed;
      cardsRef.current = cardResponse.ok ? parseSummitCards(await cardResponse.json()) : null;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const { mountSummitScene } = await import("./summit-scene");
      const mounted = mountSummitScene(
        canvas,
        labels,
        parsed,
        (index) => cardsRef.current?.l[index] ?? "",
        reduced,
        (text, x, y) => placeHover(hoverRef.current, rootRef.current, text, x, y),
        (index) => {
          revealSummitNode(index);
          setSelected(index);
        }
      );
      if (!mounted) {
        startingRef.current = false;
        setMode("failed");
        setNotice("这部浏览器画不出立体图。平面图和目录仍然可用。");
        return;
      }
      mounted.setLens(lensRef.current);
      sceneRef.current = mounted;
    } catch {
      startingRef.current = false;
      setMode("failed");
      setNotice("立体图没有载入。平面图和目录仍然可用。");
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(NARROW);
    if (!media.matches) void startScene();
    const onChange = () => {
      if (!media.matches && !chosen.current) void startScene();
    };
    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [startScene]);

  useEffect(() => {
    sceneRef.current?.setLens(lens);
  }, [lens]);

  useEffect(() => {
    sceneRef.current?.setSelected(selected, neighborIndexes(cardsRef.current, selected));
    if (selected === null || !cardsRef.current || !layoutRef.current) {
      setPanel(null);
      if (selected !== null) setNotice("这篇的说明没有载入。平面图和目录仍然可用。");
      return;
    }
    setPanel(panelNodeFromCards(cardsRef.current, layoutRef.current, selected));
  }, [selected, mode]);

  useEffect(() => {
    const apply = () => openSummitHash(setSelected);
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLCanvasElement>) => {
    if (event.key === "Escape") {
      setSelected(null);
      return;
    }
    const delta =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : 0;
    if (delta === 0) return;
    event.preventDefault();
    setSelected((current) => stepWithinDomain(layoutRef.current, current, delta));
  };

  return (
    <div ref={rootRef} className="summit-stage" data-mode={mode}>
      <div className="summit-plan">{children}</div>
      <canvas
        ref={canvasRef}
        className="summit-canvas"
        role="img"
        aria-label="格致山立体图。左右方向键在同一学科里移动，Escape 关闭说明。"
        tabIndex={mode === "solid" ? 0 : -1}
        onKeyDown={onKeyDown}
      />
      <div ref={labelRef} className="summit-labels" />
      <p ref={hoverRef} className="summit-hover" hidden />
      <div className="summit-toolbar">
        <button
          type="button"
          className="summit-button"
          aria-pressed={mode === "solid"}
          onClick={() => {
            chosen.current = true;
            if (mode === "solid") stopScene();
            else void startScene();
          }}
        >
          {mode === "solid" ? "看平面" : "看立体"}
        </button>
        <div className="summit-lenses" role="radiogroup" aria-label="上色">
          <button
            type="button"
            role="radio"
            aria-checked={lens === "domain"}
            onClick={() => setLens("domain")}
          >
            按学科
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={lens === "level"}
            onClick={() => setLens("level")}
          >
            按阶段
          </button>
        </div>
      </div>
      {notice ? <p className="summit-notice">{notice}</p> : null}
      {panel ? (
        <SummitPanel node={panel} onOpen={(link) => setSelected(link.index)} onClose={closePanel} />
      ) : null}
    </div>
  );
}

function placeHover(
  hover: HTMLParagraphElement | null,
  root: HTMLDivElement | null,
  text: string,
  x: number,
  y: number
) {
  if (!hover || !root) return;
  if (!text) {
    hover.hidden = true;
    return;
  }
  const rect = root.getBoundingClientRect();
  hover.hidden = false;
  hover.style.left = `${x - rect.left + 12}px`;
  hover.style.top = `${y - rect.top + 12}px`;
  hover.textContent = text;
}

function openSummitHash(select: (index: number) => void) {
  const match = /^#summit-node-(\d+)$/.exec(window.location.hash);
  if (match) {
    const index = Number(match[1]);
    if (!summitNodeElement(index)) return;
    revealSummitNode(index);
    select(index);
    return;
  }
  if (!window.location.hash.startsWith("#summit-domain-")) return;
  const element = document.getElementById(window.location.hash.slice(1));
  if (element instanceof HTMLDetailsElement) element.open = true;
}

function neighborIndexes(cards: SummitCardFile | null, index: number | null): number[] {
  if (!cards || index === null) return [];
  const value = cards.n[index];
  if (!value) return [];
  return value.split(" ").flatMap((part) => {
    const next = Number(part);
    return Number.isInteger(next) && next >= 0 ? [next] : [];
  });
}

function stepWithinDomain(
  layout: SummitLayoutFile | null,
  current: number | null,
  delta: number
): number {
  if (!layout) return current ?? 0;
  const count = layout.nodes.length / SUMMIT_NODE_STRIDE;
  const start = current ?? 0;
  const domain = layout.nodes[start * SUMMIT_NODE_STRIDE + 4];
  let index = start;
  for (let step = 0; step < count; step++) {
    index = (index + delta + count) % count;
    if (layout.nodes[index * SUMMIT_NODE_STRIDE + 4] === domain) return index;
  }
  return start;
}
