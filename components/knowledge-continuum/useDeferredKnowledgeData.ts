"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type DeferredKnowledgeStatus = "idle" | "loading" | "ready" | "error";

export function useDeferredActivation(preload: () => void) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const activate = useCallback(() => {
    preload();
    setActive(true);
  }, [preload]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || active) return;
    if (!("IntersectionObserver" in window)) {
      activate();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        activate();
        observer.disconnect();
      },
      { rootMargin: "0px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [activate, active]);

  return { active, activate, containerRef };
}

export function useDeferredKnowledgeData<T>(url: string, preload: () => void) {
  const { active, activate, containerRef } = useDeferredActivation(preload);
  const [status, setStatus] = useState<DeferredKnowledgeStatus>("idle");
  const [data, setData] = useState<T | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!active) return;
    const controller = new AbortController();
    setStatus("loading");

    void fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Deferred knowledge request failed: ${response.status}`);
        return response.json() as Promise<T>;
      })
      .then((payload) => {
        if (controller.signal.aborted) return;
        setData(payload);
        setStatus("ready");
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus("error");
      });

    return () => controller.abort();
  }, [active, attempt, url]);

  const retry = useCallback(() => {
    preload();
    setAttempt((current) => current + 1);
  }, [preload]);

  return { activate, containerRef, data, retry, status };
}
