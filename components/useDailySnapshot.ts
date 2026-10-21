"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { calendarDateString, millisecondsUntilNextCalendarDay } from "@/lib/calendar-day";
import { DAILY_REFRESH_HEADER } from "@/lib/daily-refresh";

const RETRY_MS = 30_000;
const REQUEST_TIMEOUT_MS = 15_000;

/** One snapshot owns the date and all its content; clocks are read after hydration. */
export function useDailySnapshot<T extends { date: string }>(initial: T, endpoint: string) {
  const [baseline, setBaseline] = useState(initial);
  const [snapshot, setSnapshot] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [isDefault, setIsDefault] = useState(true);
  const [ready, setReady] = useState(false);
  const request = useRef<(url: string) => Promise<T | null>>(async () => null);
  if (baseline.date !== initial.date) setBaseline(initial);

  // Keeping the timer and request generation in one lifetime makes an old roll,
  // refresh or unmounted page unable to overwrite a newer date's whole snapshot.
  useEffect(() => {
    let disposed = false;
    let generation = 0;
    let controller: AbortController | undefined;
    let timer: number | undefined;
    let requestTimeout: number | undefined;
    let current = baseline;
    let deadline = performance.now();
    setSnapshot(baseline);
    setIsDefault(true);
    setLoading(false);

    function schedule(delay: number) {
      window.clearTimeout(timer);
      deadline = performance.now() + delay;
      timer = window.setTimeout(() => {
        if (!document.hidden) void load(endpoint);
      }, delay);
    }

    async function load(url: string): Promise<T | null> {
      const version = ++generation;
      controller?.abort();
      controller = new AbortController();
      const activeController = controller;
      window.clearTimeout(requestTimeout);
      const timeout = (requestTimeout = window.setTimeout(
        () => activeController.abort(),
        REQUEST_TIMEOUT_MS
      ));
      setLoading(true);
      try {
        const response = await fetch(url, { cache: "no-store", signal: activeController.signal });
        if (!response.ok) throw new Error("Daily snapshot request failed");
        const next: T = await response.json();
        const delay = Number(response.headers.get(DAILY_REFRESH_HEADER));
        if (!next?.date || !Number.isFinite(delay) || delay <= 0 || delay > 86_400_000)
          throw new Error("Invalid daily snapshot response");
        if (disposed || version !== generation) return null;
        current = next;
        setSnapshot(next);
        setIsDefault(url === endpoint);
        schedule(delay);
        return next;
      } catch {
        if (!disposed && version === generation) {
          const remaining = deadline - performance.now();
          schedule(remaining > 0 ? remaining : RETRY_MS);
        }
        return null;
      } finally {
        window.clearTimeout(timeout);
        if (!disposed && version === generation) setLoading(false);
      }
    }

    function resume() {
      if (document.hidden) return;
      if (performance.now() >= deadline || calendarDateString() !== current.date)
        void load(endpoint);
    }

    request.current = load;
    setReady(true);
    const now = new Date();
    if (calendarDateString(now) !== baseline.date) void load(endpoint);
    else schedule(millisecondsUntilNextCalendarDay(now));
    document.addEventListener("visibilitychange", resume);
    return () => {
      disposed = true;
      generation += 1;
      controller?.abort();
      window.clearTimeout(timer);
      window.clearTimeout(requestTimeout);
      document.removeEventListener("visibilitychange", resume);
      request.current = async () => null;
    };
  }, [baseline, endpoint]);

  const load = useCallback((url = endpoint) => request.current(url), [endpoint]);
  return { snapshot, loading, isDefault, ready, load };
}
