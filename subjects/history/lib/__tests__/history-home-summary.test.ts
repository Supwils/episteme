import { describe, expect, it } from "vitest";
import { EVENTS } from "@/content/human-history/data/events.js";
import { FIGURES } from "@/content/human-history/data/figures.js";
import {
  HISTORY_HOME_COUNTS,
  HOME_FEATURED_FIGURES,
  HOME_TIMELINE_EVENTS,
  formatHomeYear,
} from "@/content/human-history/data/home-summary.js";

type HistoryEvent = {
  year: number;
  title: string;
};

type HistoryFigure = {
  name: string;
};

describe("human-history home summary", () => {
  it("keeps inventory counts synchronized with the canonical datasets", () => {
    expect(HISTORY_HOME_COUNTS).toEqual({
      events: EVENTS.length,
      figures: FIGURES.length,
    });
  });

  it("uses a chronological, cross-era timeline backed by canonical events", () => {
    const canonicalEvents = EVENTS as HistoryEvent[];
    const canonicalKeys = new Set(canonicalEvents.map((event) => `${event.year}:${event.title}`));

    expect(HOME_TIMELINE_EVENTS).toHaveLength(12);
    expect(HOME_TIMELINE_EVENTS.map((event) => event.year)).toEqual(
      [...HOME_TIMELINE_EVENTS].map((event) => event.year).sort((left, right) => left - right)
    );
    for (const event of HOME_TIMELINE_EVENTS) {
      const sourceTitle =
        event.title === "哥伦布航行与大交换"
          ? "哥伦布发现新大陆"
          : event.title === "生成式AI进入大众应用"
            ? "AI大爆发"
            : event.title;
      expect(canonicalKeys.has(`${event.year}:${sourceTitle}`)).toBe(true);
    }
  });

  it("features real figures across regions and historical periods", () => {
    const canonicalNames = new Set((FIGURES as HistoryFigure[]).map((figure) => figure.name));

    expect(HOME_FEATURED_FIGURES).toHaveLength(6);
    expect(new Set(HOME_FEATURED_FIGURES.map((figure) => figure.name)).size).toBe(6);
    for (const figure of HOME_FEATURED_FIGURES) {
      expect(canonicalNames.has(figure.name)).toBe(true);
    }
  });

  it("formats deep-time and historical years consistently", () => {
    expect(formatHomeYear(-300000)).toBe("约300,000年前");
    expect(formatHomeYear(-551)).toBe("公元前551年");
    expect(formatHomeYear(1969)).toBe("公元1969年");
  });
});
