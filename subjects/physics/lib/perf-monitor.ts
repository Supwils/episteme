import { useUiStore } from "@/subjects/physics/store/useUiStore";
import type { QualityTier } from "@/subjects/physics/lib/quality";

const LOW_FPS_THRESHOLD_DESKTOP = 45;
const LOW_FPS_THRESHOLD_MOBILE = 24;
const CONSECUTIVE_FRAMES_BEFORE_DEGRADE = 60;

type PerfMonitor = {
  startMonitoring: () => void;
  stopMonitoring: () => void;
};

let rafId: number | null = null;
let degraded = false;
let lowFrameCount = 0;
let lastTime = 0;

function isMobile(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad/.test(navigator.userAgent);
}

function tick(now: number) {
  if (lastTime > 0) {
    const delta = now - lastTime;
    const fps = 1000 / delta;
    const threshold = isMobile() ? LOW_FPS_THRESHOLD_MOBILE : LOW_FPS_THRESHOLD_DESKTOP;

    if (fps < threshold) {
      lowFrameCount++;
      if (lowFrameCount >= CONSECUTIVE_FRAMES_BEFORE_DEGRADE && !degraded) {
        degraded = true;
        degradeQuality();
      }
    } else {
      lowFrameCount = 0;
    }
  }

  lastTime = now;

  if (!degraded) {
    rafId = requestAnimationFrame(tick);
  }
}

function degradeQuality() {
  const store = useUiStore.getState();
  if (store.qualityTier === "low") return;
  store.setQualityTier("low" satisfies QualityTier);
}

/**
 * Runtime performance monitor that tracks fps and triggers
 * quality degradation when performance drops below thresholds.
 *
 * Degradation triggers when:
 * - 60 consecutive frames below 45 fps (desktop)
 * - 60 consecutive frames below 24 fps (mobile)
 *
 * Degradation steps (in order, handled by PostFX + store):
 * 1. Disable Bloom in PostFX
 * 2. Cap DPR to 1
 * 3. Reduce particle count by 50% (via store)
 * 4. Post-processing → Vignette only
 * 5. Show toast notification
 */
export function usePerfMonitor(): PerfMonitor {
  return {
    startMonitoring,
    stopMonitoring,
  };
}

export function startMonitoring() {
  if (typeof requestAnimationFrame === "undefined") return;
  if (rafId !== null) return;

  lowFrameCount = 0;
  lastTime = 0;
  degraded = false;
  rafId = requestAnimationFrame(tick);
}

export function stopMonitoring() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  lowFrameCount = 0;
  lastTime = 0;
}
