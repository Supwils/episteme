"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { CURIOSITY_SUBJECTS, type CuriositySubject } from "@/lib/curiosities";

export type WallFilter = CuriositySubject | "all" | "cross-domain";

function readFilter(value: string | null): WallFilter {
  if (value === "cross-domain") return value;
  if (value !== null && Object.hasOwn(CURIOSITY_SUBJECTS, value)) return value as CuriositySubject;
  return "all";
}

export function writeCuriosityFilter(filter: WallFilter) {
  const url = new URL(window.location.href);
  if (filter === "all") url.searchParams.delete("filter");
  else url.searchParams.set("filter", filter);
  const next = `${url.pathname}${url.search}${url.hash}`;
  if (next !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
    window.history.replaceState(null, "", next);
  }
}

export function CuriosityFilterSync({ onChange }: { onChange(filter: WallFilter): void }) {
  const filter = useSearchParams().get("filter");
  const previousFilter = useRef<string | null>(null);
  useEffect(() => {
    // Keep the explicit initial view when no URL filter was provided. Clearing
    // an observed URL filter, however, must restore the complete wall.
    if (filter === previousFilter.current) return;
    previousFilter.current = filter;
    onChange(readFilter(filter));
  }, [filter, onChange]);
  return null;
}
