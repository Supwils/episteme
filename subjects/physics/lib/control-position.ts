export type ControlPosition = { x: number; y: number };

/** Stored puck coordinates. NaN and Infinity are numbers, but they cannot be laid out. */
export function parseControlPosition(
  raw: string | null,
  fallback: ControlPosition
): ControlPosition {
  if (!raw) return fallback;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return fallback;
    const x = (parsed as { x?: unknown }).x;
    const y = (parsed as { y?: unknown }).y;
    if (
      typeof x === "number" &&
      typeof y === "number" &&
      Number.isFinite(x) &&
      Number.isFinite(y)
    ) {
      return { x, y };
    }
  } catch {
    // Corrupt storage falls back to the default corner.
  }
  return fallback;
}
