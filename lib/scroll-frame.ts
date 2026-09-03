export interface ScrollFrameSnapshot {
  progress: number;
  scrollY: number;
}

type ScrollFrameSubscriber = (snapshot: ScrollFrameSnapshot) => void;

const subscribers = new Set<ScrollFrameSubscriber>();
let frameId: number | null = null;

function readSnapshot(): ScrollFrameSnapshot {
  const scrollY = window.scrollY;
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

  return {
    progress: maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0,
    scrollY,
  };
}

function flushScrollFrame() {
  frameId = null;
  const snapshot = readSnapshot();
  subscribers.forEach((subscriber) => subscriber(snapshot));
}

function scheduleScrollFrame() {
  if (frameId !== null) return;
  frameId = window.requestAnimationFrame(flushScrollFrame);
}

/** Shares one passive, frame-throttled scroll listener across global UI feedback. */
export function subscribeToScrollFrame(subscriber: ScrollFrameSubscriber): () => void {
  subscribers.add(subscriber);
  subscriber(readSnapshot());

  if (subscribers.size === 1) {
    window.addEventListener("scroll", scheduleScrollFrame, { passive: true });
  }

  return () => {
    subscribers.delete(subscriber);
    if (subscribers.size > 0) return;

    window.removeEventListener("scroll", scheduleScrollFrame);
    if (frameId !== null) window.cancelAnimationFrame(frameId);
    frameId = null;
  };
}
