"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const loadSearch = () => import("./GlobalSearch").then((m) => m.GlobalSearch);
const GlobalSearch = dynamic(loadSearch, { ssr: false });

/** Warm the dialog before the click lands (the header trigger calls this on hover/focus). */
export function preloadSearch() {
  void loadSearch();
}

/**
 * Keeps ⌘K and the `open-global-search` event wired on every page while the
 * dialog itself — its code, its styles, the seals it shows — loads only on the
 * first request. After that the loaded dialog owns both listeners.
 */
export function SearchLauncher() {
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    if (requested) return;
    const request = () => setRequested(true);
    const onKey = (event: KeyboardEvent) => {
      if (event.isComposing || event.keyCode === 229) return;
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        request();
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("open-global-search", request);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("open-global-search", request);
    };
  }, [requested]);

  return requested ? <GlobalSearch openOnMount /> : null;
}
