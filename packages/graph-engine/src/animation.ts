export type Transform = {
  scale: number;
  offsetX: number;
  offsetY: number;
};

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function easeOutElastic(t: number): number {
  if (t === 0 || t === 1) return t;
  const c4 = (2 * Math.PI) / 3;
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function animateFocus(
  currentTransform: Transform,
  targetNode: { x: number; y: number },
  zoom: number,
  duration: number,
  containerSize: { width: number; height: number },
  onUpdate: (t: Transform) => void,
  onComplete?: () => void,
): () => void {
  const targetOffsetX = containerSize.width / 2 - targetNode.x * zoom;
  const targetOffsetY = containerSize.height / 2 - targetNode.y * zoom;
  const target: Transform = { scale: zoom, offsetX: targetOffsetX, offsetY: targetOffsetY };

  if (prefersReducedMotion()) {
    onUpdate(target);
    onComplete?.();
    return () => {};
  }

  const start: Transform = { ...currentTransform };
  let rafId: number | null = null;
  let startTime: number | null = null;
  let cancelled = false;

  const tick = (now: number) => {
    if (cancelled) return;
    if (startTime === null) startTime = now;

    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    onUpdate({
      scale: start.scale + (target.scale - start.scale) * eased,
      offsetX: start.offsetX + (target.offsetX - start.offsetX) * eased,
      offsetY: start.offsetY + (target.offsetY - start.offsetY) * eased,
    });

    if (progress < 1) {
      rafId = requestAnimationFrame(tick);
    } else {
      onComplete?.();
    }
  };

  rafId = requestAnimationFrame(tick);

  return () => {
    cancelled = true;
    if (rafId !== null) cancelAnimationFrame(rafId);
  };
}

export function animateNodePositions(
  currentPositions: Map<string, { x: number; y: number }>,
  targetPositions: Map<string, { x: number; y: number }>,
  duration: number,
  onUpdate: (positions: Map<string, { x: number; y: number }>) => void,
  onComplete?: () => void,
): () => void {
  if (prefersReducedMotion()) {
    onUpdate(new Map(targetPositions));
    onComplete?.();
    return () => {};
  }

  const startPositions = new Map<string, { x: number; y: number }>();
  for (const [id, pos] of currentPositions) {
    startPositions.set(id, { x: pos.x, y: pos.y });
  }

  let rafId: number | null = null;
  let startTime: number | null = null;
  let cancelled = false;
  const interpolated = new Map<string, { x: number; y: number }>();

  const tick = (now: number) => {
    if (cancelled) return;
    if (startTime === null) startTime = now;

    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);

    interpolated.clear();
    for (const [id, target] of targetPositions) {
      const start = startPositions.get(id) ?? target;
      interpolated.set(id, {
        x: start.x + (target.x - start.x) * eased,
        y: start.y + (target.y - start.y) * eased,
      });
    }

    onUpdate(interpolated);

    if (progress < 1) {
      rafId = requestAnimationFrame(tick);
    } else {
      onComplete?.();
    }
  };

  rafId = requestAnimationFrame(tick);

  return () => {
    cancelled = true;
    if (rafId !== null) cancelAnimationFrame(rafId);
  };
}

export function animateAlpha(
  nodeIds: string[],
  fromAlpha: number,
  toAlpha: number,
  duration: number,
  stagger: number,
  onUpdate: (alphas: Map<string, number>) => void,
  onComplete?: () => void,
): () => void {
  if (prefersReducedMotion()) {
    const final = new Map<string, number>();
    for (const id of nodeIds) final.set(id, toAlpha);
    onUpdate(final);
    onComplete?.();
    return () => {};
  }

  let rafId: number | null = null;
  let startTime: number | null = null;
  let cancelled = false;
  const totalDuration = duration + stagger * nodeIds.length;
  const alphas = new Map<string, number>();

  const tick = (now: number) => {
    if (cancelled) return;
    if (startTime === null) startTime = now;

    const elapsed = now - startTime;
    alphas.clear();

    for (let i = 0; i < nodeIds.length; i++) {
      const id = nodeIds[i]!;
      const nodeStart = stagger * i;
      const nodeElapsed = elapsed - nodeStart;
      const progress = Math.min(Math.max(nodeElapsed / duration, 0), 1);
      const eased = easeInOutCubic(progress);
      alphas.set(id, fromAlpha + (toAlpha - fromAlpha) * eased);
    }

    onUpdate(alphas);

    if (elapsed < totalDuration) {
      rafId = requestAnimationFrame(tick);
    } else {
      onComplete?.();
    }
  };

  rafId = requestAnimationFrame(tick);

  return () => {
    cancelled = true;
    if (rafId !== null) cancelAnimationFrame(rafId);
  };
}

export function animateEntrance(
  nodeIdsByDomain: Map<string, string[]>,
  targetPositions: Map<string, { x: number; y: number }>,
  duration: number,
  domainStagger: number,
  onUpdate: (positions: Map<string, { x: number; y: number }>, alphas: Map<string, number>) => void,
  onComplete?: () => void,
): () => void {
  if (prefersReducedMotion()) {
    const alphas = new Map<string, number>();
    for (const ids of nodeIdsByDomain.values()) {
      for (const id of ids) alphas.set(id, 1);
    }
    onUpdate(new Map(targetPositions), alphas);
    onComplete?.();
    return () => {};
  }

  let rafId: number | null = null;
  let startTime: number | null = null;
  let cancelled = false;

  const domainOrder = Array.from(nodeIdsByDomain.keys());
  let allNodeCount = 0;
  for (const ids of nodeIdsByDomain.values()) allNodeCount += ids.length;

  const totalDuration = domainOrder.length * domainStagger + duration;
  const positions = new Map<string, { x: number; y: number }>();
  const alphas = new Map<string, number>();

  const tick = (now: number) => {
    if (cancelled) return;
    if (startTime === null) startTime = now;

    const elapsed = now - startTime;
    positions.clear();
    alphas.clear();

    for (let d = 0; d < domainOrder.length; d++) {
      const domain = domainOrder[d]!;
      const ids = nodeIdsByDomain.get(domain) ?? [];
      const domainStart = d * domainStagger;

      for (let i = 0; i < ids.length; i++) {
        const id = ids[i]!;
        const target = targetPositions.get(id) ?? { x: 0, y: 0 };
        const nodeElapsed = elapsed - domainStart;
        const progress = Math.min(Math.max(nodeElapsed / duration, 0), 1);
        const eased = easeOutElastic(progress);

        positions.set(id, {
          x: target.x * eased,
          y: target.y * eased,
        });
        alphas.set(id, eased);
      }
    }

    onUpdate(positions, alphas);

    if (elapsed < totalDuration) {
      rafId = requestAnimationFrame(tick);
    } else {
      onComplete?.();
    }
  };

  rafId = requestAnimationFrame(tick);

  return () => {
    cancelled = true;
    if (rafId !== null) cancelAnimationFrame(rafId);
  };
}
