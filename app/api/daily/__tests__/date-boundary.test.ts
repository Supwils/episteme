import { afterEach, describe, expect, it, vi } from "vitest";
import { GET as daily } from "../route";
import { GET as home } from "../home/route";
import { GET as shuffle } from "../shuffle/route";

afterEach(() => vi.useRealTimers());
describe("daily API calendar boundaries", () => {
  for (const [name, get] of [
    ["daily", () => daily()],
    ["home", () => home()],
    ["shuffle", () => shuffle(new Request("https://example.test/api/daily/shuffle?offset=1"))],
  ] as const) {
    it.each([
      ["2026-12-31T15:59:59.999Z", "2026-12-31", "1"],
      ["2026-12-31T16:00:00.000Z", "2027-01-01", "86400000"],
      ["2028-02-28T16:00:00.000Z", "2028-02-29", "86400000"],
    ])(
      `${name} derives its data and expiry from the same instant: %s`,
      async (now, date, duration) => {
        vi.useFakeTimers({ toFake: ["Date"] });
        vi.setSystemTime(new Date(now));
        const result = await get();
        expect((await result.json()).date).toBe(date);
        expect(result.headers.get("Cache-Control")).toBe("no-store");
        expect(result.headers.get("X-Daily-Refresh-After")).toBe(duration);
      }
    );
  }
});
