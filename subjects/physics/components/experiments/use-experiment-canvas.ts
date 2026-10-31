"use client";

import { useCallback, useEffect, useRef } from "react";
import { fitCanvasToDisplay, cssCanvasSize } from "./canvas-size";

type Draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => void;

export function useExperimentCanvas(
  draw: Draw,
  step: (seconds: number) => boolean,
  playing: boolean,
  pause: () => void
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef(0);
  const runningRef = useRef(false);
  const stop = useCallback(() => {
    runningRef.current = false;
    cancelAnimationFrame(animationRef.current);
  }, []);
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { w, h } = cssCanvasSize(canvas);
    draw(ctx, w, h);
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      fitCanvasToDisplay(canvas);
      render();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener("resize", resize);
    let density = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    const densityChanged = () => {
      density.removeEventListener("change", densityChanged);
      resize();
      density = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      density.addEventListener("change", densityChanged);
    };
    density.addEventListener("change", densityChanged);
    resize();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      density.removeEventListener("change", densityChanged);
    };
  }, [render]);

  useEffect(() => {
    const hide = () => {
      if (document.hidden) {
        stop();
        pause();
      }
    };
    document.addEventListener("visibilitychange", hide);
    return () => document.removeEventListener("visibilitychange", hide);
  }, [pause, stop]);

  useEffect(() => {
    if (!playing) return;
    let previous = performance.now();
    runningRef.current = true;
    const frame = (now: number) => {
      if (!runningRef.current) return;
      const keepGoing = step(Math.min((now - previous) / 1000, 0.05));
      previous = now;
      render();
      if (keepGoing) animationRef.current = requestAnimationFrame(frame);
      else {
        stop();
        pause();
      }
    };
    animationRef.current = requestAnimationFrame(frame);
    return stop;
  }, [playing, step, render, pause, stop]);

  return { canvasRef, render, stop };
}
