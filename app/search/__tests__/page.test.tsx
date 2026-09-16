import { beforeEach, describe, expect, it, vi } from "vitest";
import SearchPage, { metadata } from "../page";
import { searchEverything } from "@/lib/search/server";
import { DOMAINS } from "@/lib/data";

vi.mock("@/lib/search/server", () => ({ searchEverything: vi.fn() }));

beforeEach(() => {
  vi.mocked(searchEverything).mockReset().mockResolvedValue({
    titleResults: [],
    bodyResults: [],
    facets: [],
    total: 0,
  });
});

describe("server search parameter boundary", () => {
  it.each([
    { params: {}, query: "", domain: undefined },
    { params: { q: "熵", domain: "physics" }, query: "熵", domain: "physics" },
    {
      params: { q: ["苏格拉底", "柏拉图"], domain: ["philosophy", "economics"] },
      query: "苏格拉底",
      domain: "philosophy",
    },
    { params: { q: [], domain: [] }, query: "", domain: undefined },
    { params: { q: ["", "忽略"] }, query: "", domain: undefined },
    { params: { q: ["知".repeat(121), "忽略"] }, query: "知".repeat(120), domain: undefined },
  ])("normalizes $params before searching", async ({ params, query, domain }) => {
    await SearchPage({ searchParams: Promise.resolve(params) });
    expect(searchEverything).toHaveBeenCalledTimes(1);
    expect(searchEverything).toHaveBeenCalledWith(query, domain);
  });
});

describe("search metadata", () => {
  it("names the live domain count instead of a frozen launch number", () => {
    expect(metadata.description).toBe(
      `在 ${DOMAINS.length} 个学科的全部文章中检索标题、小标题与正文。`
    );
    expect(DOMAINS.length).toBeGreaterThanOrEqual(22);
  });
});
