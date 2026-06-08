import type { TimelineEvent } from "../timeline-data";
import { MEDIEVAL_AND_EARLY_MODERN_EVENTS } from "./modern-1";
import { MODERN_AND_CONTEMPORARY_EVENTS } from "./modern-2";

export { MEDIEVAL_AND_EARLY_MODERN_EVENTS } from "./modern-1";
export { MODERN_AND_CONTEMPORARY_EVENTS } from "./modern-2";

export const MODERN_EVENTS: TimelineEvent[] = [
  ...MEDIEVAL_AND_EARLY_MODERN_EVENTS,
  ...MODERN_AND_CONTEMPORARY_EVENTS,
];
