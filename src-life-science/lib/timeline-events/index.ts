import type { TimelineEvent } from "./types";
import { ERA_0_3_EVENTS } from "./era-0-3";
import { ERA_4_7_EVENTS } from "./era-4-7";

export type { TimelineEvent } from "./types";

export const TIMELINE_EVENTS: TimelineEvent[] = [
  ...ERA_0_3_EVENTS,
  ...ERA_4_7_EVENTS,
];

export function getTimelineEventById(id: string): TimelineEvent | undefined {
  return TIMELINE_EVENTS.find((e) => e.id === id);
}

export function getAllTimelineEvents(): TimelineEvent[] {
  return TIMELINE_EVENTS;
}
