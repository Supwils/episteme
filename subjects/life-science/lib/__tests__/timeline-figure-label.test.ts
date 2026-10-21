import { describe, expect, it } from "vitest";
import { getTimelineEventById } from "../timeline-events";
import { timelineFigureLabel } from "../timeline-events/figure-label";

describe("timelineFigureLabel", () => {
  it("keeps the English name when the event has no 中文（Latin） pair", () => {
    const cases = [
      ["earliest-life", "Alexander Oparin"],
      ["earliest-life", "Stanley Miller"],
      ["eukaryotes", "Lynn Margulis"],
      ["snowball-earth", "Joseph Kirschvink"],
      ["snowball-earth", "Paul Hoffman"],
    ] as const;

    for (const [id, figure] of cases) {
      const event = getTimelineEventById(id);
      expect(event?.keyFigures).toContain(figure);
      expect(timelineFigureLabel(event!, figure)).toBe(figure);
    }
  });

  it("does not read 米勒-尤里实验 as Stanley Miller", () => {
    const event = getTimelineEventById("earliest-life");
    const mentionsMillerUrey = event?.deepReading.sections.some((section) =>
      section.content.some((paragraph) => paragraph.includes("米勒-尤里实验"))
    );
    expect(mentionsMillerUrey).toBe(true);
    expect(timelineFigureLabel(event!, "Stanley Miller")).toBe("Stanley Miller");
  });

  it("shows a Chinese name only from a pair already written on that event", () => {
    const event = getTimelineEventById("eukaryotes");
    expect(event?.keyFigures).toEqual(["Lynn Margulis"]);
    const withPair = {
      ...event!,
      detail: `${event!.detail}林恩·马古利斯（Lynn Margulis）提出了这一理论。`,
    };
    expect(timelineFigureLabel(withPair, "Lynn Margulis")).toBe("林恩·马古利斯");
    expect(event?.keyFigures).toEqual(["Lynn Margulis"]);
  });
});
