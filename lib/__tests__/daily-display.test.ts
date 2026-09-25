import { describe, expect, it } from "vitest";
import { dailyLabelFor, dedupeDailyEvents } from "@/lib/daily-display";
import { getDailyKnowledge } from "@/lib/daily-knowledge";
import { getDailySelected } from "@/lib/daily-selector";

// 23 September: Neptune's discovery (1846) is filed in both the history and the
// physics pools, and neither pool's label matched the article it linked to.
const NEPTUNE_DAY = new Date(2026, 8, 23);

describe("daily display", () => {
  it("shows an event filed in two pools once", () => {
    const { items } = getDailyKnowledge(NEPTUNE_DAY);
    const neptune = dedupeDailyEvents(items).filter((item) => item.title === "海王星被发现");
    expect(items.filter((item) => item.title === "海王星被发现").length).toBeGreaterThan(1);
    expect(neptune).toHaveLength(1);
  });

  it("labels an event by the domain it links to, not the pool it came from", () => {
    expect(dailyLabelFor("/universe-physics/knowledge-base/经典物理--万有引力", "人类历史")).toBe(
      "宇宙物理"
    );
    expect(dailyLabelFor("/cosmology/knowledge-base/太阳系--gas-giants", "宇宙物理")).toBe(
      "宇宙学"
    );
    expect(dailyLabelFor("/human-history/timeline", "历史")).toBe("人类历史");
    expect(dailyLabelFor(undefined, "知识")).toBe("知识");
  });

  it("never lets two pools pick the same event on the same day", () => {
    for (let offset = 0; offset < 5; offset++) {
      const daily = getDailySelected(NEPTUNE_DAY, offset);
      const picks = [
        daily.physics,
        daily.history,
        daily.philosophy,
        daily.economics,
        daily.psychology,
      ];
      expect(dedupeDailyEvents(picks)).toHaveLength(picks.length);
    }
  });

  it("drops events the page has already shown above", () => {
    const events = [
      { title: "海王星被发现", year: 1846 },
      { title: "另一件事", year: 1900 },
    ];
    expect(dedupeDailyEvents(events, [{ title: "海王星被发现", year: 1846 }])).toEqual([
      { title: "另一件事", year: 1900 },
    ]);
  });
});
