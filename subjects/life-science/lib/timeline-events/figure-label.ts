import { chineseNameBesideLatin } from "@/lib/reader-person-label";
import type { TimelineEvent } from "./types";

function eventText(event: TimelineEvent): string {
  const { deepReading } = event;
  return [
    event.detail,
    event.significance,
    event.context.before,
    event.context.after,
    deepReading.introduction,
    ...deepReading.sections.flatMap((section) => [section.title, ...section.content]),
    ...deepReading.citations.map(
      (citation) => `${citation.authors} ${citation.title} ${citation.journal}`
    ),
  ].join("\n");
}

/** Chinese form only when this event already writes it beside the Latin name. */
export function timelineFigureLabel(event: TimelineEvent, figure: string): string {
  return chineseNameBesideLatin(eventText(event), figure) ?? figure;
}
