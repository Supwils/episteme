"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";
const serverSnapshot = () => false;
const snapshot = () => window.matchMedia(QUERY).matches;
const subscribe = (notify: () => void) => {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};

/** Hydration-safe preference that also responds to changes while an experiment is open. */
export function useExperimentReducedMotion() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
