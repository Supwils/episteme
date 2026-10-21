// The ratio each canvas was sized with. Reading window.devicePixelRatio at
// draw time would drift from the context scale after a browser zoom.
const backingRatios = new WeakMap<HTMLCanvasElement, number>();

/**
 * Sizes the backing store to device pixels and pre-scales the context, so all
 * drawing code works in CSS pixels (see `cssCanvasSize`).
 */
export function fitCanvasToDisplay(canvas: HTMLCanvasElement): void {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  backingRatios.set(canvas, dpr);
  canvas.getContext("2d")?.scale(dpr, dpr);
}

/** The drawable area in CSS pixels, matching the dpr-scaled context. */
export function cssCanvasSize(canvas: HTMLCanvasElement): { w: number; h: number } {
  const dpr = backingRatios.get(canvas) ?? 1;
  return { w: canvas.width / dpr, h: canvas.height / dpr };
}
