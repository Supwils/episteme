import { create } from "zustand";
import type { SceneMarker } from "@/lib/content";
import { detectInitialQuality, type QualityTier } from "@/lib/quality";

type UiState = {
  panelOpen: boolean;
  /** What the knowledge panel is showing (an object id, or null). */
  panelContentId: string | null;
  /** Mirror of CSS `prefers-reduced-motion` for runtime branches. */
  reducedMotion: boolean;
  /** Currently hovered 3D scene marker (null when not hovering). */
  hoveredMarker: SceneMarker | null;
  /** Mouse position in viewport pixels for tooltip placement. */
  hoverMousePos: { x: number; y: number };
  /** Rendering quality tier — drives post-processing and particle density. */
  qualityTier: QualityTier;
  /**
   * Runtime degradation level (0–5) driven by perf-monitor.
   * 0 = no degradation, 5 = maximum degradation.
   * Each level is cumulative — higher levels include all lower-level effects.
   */
  degradationLevel: number;

  openPanel: (contentId: string) => void;
  closePanel: () => void;
  togglePanel: () => void;
  setReducedMotion: (value: boolean) => void;
  setHoveredMarker: (marker: SceneMarker | null) => void;
  setHoverMousePos: (pos: { x: number; y: number }) => void;
  setQualityTier: (tier: QualityTier) => void;
  setDegradationLevel: (level: number) => void;
};

export const useUiStore = create<UiState>((set) => ({
  panelOpen: false,
  panelContentId: null,
  reducedMotion: false,
  hoveredMarker: null,
  hoverMousePos: { x: 0, y: 0 },
  qualityTier: detectInitialQuality(),
  degradationLevel: 0,

  openPanel: (contentId) => set({ panelOpen: true, panelContentId: contentId }),
  closePanel: () => set({ panelOpen: false }),
  togglePanel: () => set((state) => ({ panelOpen: !state.panelOpen })),
  setReducedMotion: (value) => set({ reducedMotion: value }),
  setHoveredMarker: (marker) => set({ hoveredMarker: marker }),
  setHoverMousePos: (pos) => set({ hoverMousePos: pos }),
  setQualityTier: (tier) => set({ qualityTier: tier }),
  setDegradationLevel: (level) => set({ degradationLevel: level }),
}));
