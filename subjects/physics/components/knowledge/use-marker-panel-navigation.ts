"use client";

import { useEffect, useRef } from "react";
import type { AnyTierId } from "@/subjects/physics/lib/tier";

type NavigationState = {
  open: boolean;
  markerTier: AnyTierId | null;
  currentTier: AnyTierId;
  transitionActive: boolean;
  close: () => void;
};

export function useMarkerPanelNavigation({
  open,
  markerTier,
  currentTier,
  transitionActive,
  close,
}: NavigationState) {
  const restoreAtlasFocus = useRef(false);

  useEffect(() => {
    if (open && markerTier && (markerTier !== currentTier || transitionActive)) {
      restoreAtlasFocus.current = true;
      close();
    }
  }, [open, markerTier, currentTier, transitionActive, close]);

  useEffect(() => {
    if (!restoreAtlasFocus.current || transitionActive) return;
    const focusAtlas = () => {
      const button = document.querySelector<HTMLButtonElement>(
        `[data-open-atlas][data-atlas-tier="${currentTier}"]`
      );
      if (!button) return;
      button.focus();
      restoreAtlasFocus.current = false;
      observer.disconnect();
    };
    const observer = new MutationObserver(focusAtlas);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-atlas-tier"],
    });
    focusAtlas();
    return () => observer.disconnect();
  }, [currentTier, transitionActive]);
}
