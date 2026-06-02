import { useUiStore } from "@/store/useUiStore";

const LOW_FPS_THRESHOLD_DESKTOP = 45;
const LOW_FPS_THRESHOLD_MOBILE = 24;
const CONSECUTIVE_FRAMES_BEFORE_DEGRADE = 60;
const MAX_DEGRADATION_LEVEL = 5;

type PerfMonitor = {
  startMonitoring: () => void;
  stopMonitoring: () => void;
};

let rafId: number | null = null;
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
      if (lowFrameCount >= CONSECUTIVE_FRAMES_BEFORE_DEGRADE) {
        applyNextDegradation();
        lowFrameCount = 0;
      }
    } else {
      lowFrameCount = 0;
    }
  }

  lastTime = now;

  const level = useUiStore.getState().degradationLevel;
  if (level < MAX_DEGRADATION_LEVEL) {
    rafId = requestAnimationFrame(tick);
  }
}

function applyNextDegradation() {
  const store = useUiStore.getState();
  const next = store.degradationLevel + 1;
  if (next > MAX_DEGRADATION_LEVEL) return;

  store.setDegradationLevel(next);

  if (next === MAX_DEGRADATION_LEVEL) {
    showDegradationToast();
  }
}

/**
 * Runtime performance monitor that tracks fps and triggers
 * progressive quality degradation when performance drops below thresholds.
 *
 * Degradation triggers when:
 * - 60 consecutive frames below 45 fps (desktop)
 * - 60 consecutive frames below 24 fps (mobile)
 *
 * Degradation steps (cumulative, each adds to previous):
 * 1. Disable Bloom (heaviest post-processing effect)
 * 2. Reduce DPR from [1,2] to [1,1.5]
 * 3. Reduce particle count by 50% (halve StarPoints size)
 * 4. Post-processing → Vignette + SMAA only (remove CA, Noise)
 * 5. Show toast notification "性能已降低以保持流畅体验"
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

function showDegradationToast() {
  if (typeof document === "undefined") return;

  const toast = document.createElement("div");
  toast.setAttribute("role", "alert");
  toast.setAttribute("aria-live", "polite");
  toast.textContent = "性能已降低以保持流畅体验";
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "1.5rem",
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(0, 0, 0, 0.85)",
    color: "#fff",
    padding: "0.75rem 1.5rem",
    borderRadius: "0.5rem",
    fontSize: "0.875rem",
    fontFamily: "system-ui, sans-serif",
    zIndex: "9999",
    pointerEvents: "none",
    opacity: "0",
    transition: "opacity 0.3s ease",
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.addEventListener("transitionend", () => toast.remove(), { once: true });
  }, 4000);
}
