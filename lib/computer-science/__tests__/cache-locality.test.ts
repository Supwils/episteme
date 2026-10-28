import { describe, expect, it } from "vitest";
import { computerScienceLabInvite } from "../article-lab-invites";
import { lineOf, simulateCacheStride } from "../cache-locality";

describe("direct-mapped cache stride", () => {
  it("cold-misses once per line when the stride is 1", () => {
    const result = simulateCacheStride(1);

    expect(result.stride).toBe(1);
    expect(result.accesses).toBe(16);
    expect(result.misses).toBe(4);
    expect(result.hits).toBe(12);
    expect(result.steps.map((step) => step.address)).toEqual([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    ]);
    expect(result.steps.filter((step) => !step.hit).map((step) => step.address)).toEqual([
      0, 4, 8, 12,
    ]);
    expect(result.steps.every((step) => step.line === lineOf(step.address))).toBe(true);
    expect(result.hits + result.misses).toBe(result.accesses);
  });

  it("misses on every visit when the stride is 4", () => {
    const result = simulateCacheStride(4);

    expect(result.accesses).toBe(4);
    expect(result.misses).toBe(4);
    expect(result.hits).toBe(0);
    expect(result.steps.map((step) => step.address)).toEqual([0, 4, 8, 12]);
    expect(result.steps.every((step) => !step.hit)).toBe(true);
  });

  it("misses on both visits when the stride is 8", () => {
    const result = simulateCacheStride(8);

    expect(result.accesses).toBe(2);
    expect(result.misses).toBe(2);
    expect(result.hits).toBe(0);
    expect(result.steps.map((step) => [step.address, step.line, step.hit])).toEqual([
      [0, 0, false],
      [8, 2, false],
    ]);
  });

  it("clamps an illegal stride to 1", () => {
    const legal = simulateCacheStride(1);

    for (const stride of [0, 3, 5, 16, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(simulateCacheStride(stride)).toEqual(legal);
    }
  });
});

describe("computer science lab invite", () => {
  it("offers the stride lab only for the cache article", () => {
    expect(computerScienceLabInvite("concepts", "memory-hierarchy-caching")).toEqual({
      href: "/computer-science/cache-locality-lab",
      label: "缓存步长示意",
      tease: "改访问步长，看同一小块内存里命中怎么变。不是测速，也不是攻击。",
    });
    expect(computerScienceLabInvite("concepts", "data-structures")).toBeNull();
    expect(computerScienceLabInvite("systems", "redis-single-threaded")).toBeNull();
  });
});
