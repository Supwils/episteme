import { describe, expect, it } from "vitest";
import { DOMAINS } from "@/lib/data";
import { domainSpine, graphDomainId } from "@/lib/domain-spine";
import { getDomainStats } from "@/lib/site-stats";

const routeDomain = (url: string) => url.split("/")[1];

describe("domain landing data", () => {
  it.each(DOMAINS.map((domain) => domain.id))(
    "%s has a guiding question and a linked L1→L5 spine",
    (id) => {
      const spine = domainSpine(id);
      expect(
        spine,
        `no domain-spine path for ${id} (graph id ${graphDomainId(id)})`
      ).not.toBeNull();
      expect(spine!.question).toMatch(/[？?]$/);
      expect(spine!.steps.length).toBeGreaterThanOrEqual(4);
      for (const step of spine!.steps) expect(step.url.startsWith("/")).toBe(true);
    }
  );

  it.each(DOMAINS.map((domain) => domain.id))("%s has ranked bridges to other domains", (id) => {
    const bridges = getDomainStats(id).bridges;
    expect(bridges.length).toBeGreaterThanOrEqual(3);
    expect(bridges.length).toBeLessThanOrEqual(8);
    const links = bridges.map((bridge) => bridge.links);
    expect(links).toEqual([...links].sort((a, b) => b - a));
    for (const bridge of bridges) {
      expect(bridge.domain).not.toBe(id);
      expect(routeDomain(bridge.via.url)).toBe(bridge.domain);
      expect(bridge.via.title).not.toMatch(/^\//);
    }
  });
});
