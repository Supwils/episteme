"use client";

import { useEffect } from "react";

export function OfflineArticle({ url }: { url: string }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let retained = false;
    function schedule() {
      clearTimeout(timer);
      if (retained || document.visibilityState !== "visible" || !navigator.onLine) return;
      timer = setTimeout(() => {
        const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
          .connection;
        if (connection?.saveData || window.location.pathname !== url || window.location.search)
          return;
        const worker = navigator.serviceWorker.controller;
        if (!worker) return;
        const navigation = performance.getEntriesByType("navigation")[0] as
          | PerformanceNavigationTiming
          | undefined;
        if (navigation?.workerStart && new URL(navigation.name).pathname === url) return;
        worker.postMessage({ type: "episteme:retain-article", path: url });
        retained = true;
      }, 1500);
    }
    function retry() {
      retained = false;
      schedule();
    }
    schedule();
    navigator.serviceWorker.addEventListener("controllerchange", schedule);
    document.addEventListener("visibilitychange", schedule);
    window.addEventListener("online", retry);
    return () => {
      clearTimeout(timer);
      navigator.serviceWorker.removeEventListener("controllerchange", schedule);
      document.removeEventListener("visibilitychange", schedule);
      window.removeEventListener("online", retry);
    };
  }, [url]);
  return null;
}
