import { describe, expect, it } from "vitest";
import { getNodeById } from "../graph-data";

describe("global graph history article links", () => {
  it("links history nodes to exact readable detail pages", () => {
    expect(getNodeById("history:event-工业革命")?.url).toBe(
      `/human-history/events/${encodeURIComponent("工业革命")}`,
    );
    expect(getNodeById("history:figure-孔子")?.url).toBe(
      `/human-history/figures/${encodeURIComponent("孔子")}`,
    );
    expect(getNodeById("history:era-classical")?.url).toBe(
      "/human-history/eras/classical",
    );
  });
});
