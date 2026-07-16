import { describe, expect, it } from "vitest";
import { GET as getConfluences } from "@/app/api/knowledge-continuum/confluences/route";
import { GET as getCoverage } from "@/app/api/knowledge-continuum/coverage/route";
import { GET as getPlanner } from "@/app/api/knowledge-continuum/planner/route";
import { GET as getSpine } from "@/app/api/knowledge-continuum/spine/route";
import { KNOWLEDGE_CONTINUUM_CACHE_CONTROL } from "@/lib/knowledge-continuum-payload";

const routes = [
  { name: "spine", get: getSpine, maximumBytes: 250_000 },
  { name: "planner", get: getPlanner, maximumBytes: 175_000 },
  { name: "confluences", get: getConfluences, maximumBytes: 10_000 },
  { name: "coverage", get: getCoverage, maximumBytes: 190_000 },
] as const;

describe("deferred knowledge continuum APIs", () => {
  for (const route of routes) {
    it(`returns an isolated, cacheable ${route.name} payload`, async () => {
      const response = route.get();
      expect(response.status).toBe(200);
      expect(response.headers.get("cache-control")).toBe(KNOWLEDGE_CONTINUUM_CACHE_CONTROL);
      expect(response.headers.get("x-content-strategy")).toBe("deferred-static");

      const body = await response.text();
      expect(Buffer.byteLength(body)).toBeLessThan(route.maximumBytes);
    });
  }

  it("keeps each module independently addressable", async () => {
    const spine = (await getSpine().json()) as { atlas?: unknown };
    const planner = (await getPlanner().json()) as { catalog?: unknown; terrain?: unknown };
    const confluences = (await getConfluences().json()) as { catalog?: unknown };
    const coverage = (await getCoverage().json()) as { coverage?: unknown };

    expect(Object.keys(spine)).toEqual(["atlas"]);
    expect(Object.keys(planner).sort()).toEqual(["catalog", "terrain"]);
    expect(Object.keys(confluences)).toEqual(["catalog"]);
    expect(Object.keys(coverage)).toEqual(["coverage"]);
  });
});
