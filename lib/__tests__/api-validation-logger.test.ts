import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { logValidationFailure, createSafeMetadata } from "../api-validation-logger";

describe("createSafeMetadata", () => {
  it("preserves strings under 100 chars", () => {
    const result = createSafeMetadata({ query: "short string" });
    expect(result).toEqual({ query: "short string" });
  });

  it("truncates long strings to 100 chars", () => {
    const longString = "a".repeat(150);
    const result = createSafeMetadata({ query: longString });
    expect(result.query).toBe("a".repeat(97) + "...");
  });

  it("preserves numbers and booleans", () => {
    const result = createSafeMetadata({
      count: 42,
      enabled: true,
      percentage: 3.14,
    });
    expect(result).toEqual({
      count: 42,
      enabled: true,
      percentage: 3.14,
    });
  });

  it("converts arrays to length metadata", () => {
    const result = createSafeMetadata({
      items: ["a", "b", "c"],
    });
    expect(result).toEqual({ itemsLength: 3 });
  });

  it("converts objects to key count metadata", () => {
    const result = createSafeMetadata({
      config: { a: 1, b: 2, c: 3 },
    });
    expect(result).toEqual({ configKeys: 3 });
  });

  it("handles mixed types", () => {
    const result = createSafeMetadata({
      query: "test",
      count: 5,
      items: [1, 2, 3],
      config: { x: true },
    });
    expect(result).toEqual({
      query: "test",
      count: 5,
      itemsLength: 3,
      configKeys: 1,
    });
  });

  it("skips null and undefined values", () => {
    const result = createSafeMetadata({
      query: "test",
      missing: undefined,
      empty: null,
    });
    expect(result).toEqual({ query: "test" });
  });
});

describe("logValidationFailure", () => {
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-04T14:00:00.000Z"));
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
    vi.useRealTimers();
  });

  it("logs with correct structure", () => {
    logValidationFailure({
      route: "/api/search",
      reason: "invalid_query",
    });

    expect(consoleWarnSpy).toHaveBeenCalledOnce();
    const [prefix, json] = consoleWarnSpy.mock.calls[0] as [string, string];
    expect(prefix).toBe("[API Validation]");

    const logEntry = JSON.parse(json);
    expect(logEntry).toMatchObject({
      timestamp: "2026-09-04T14:00:00.000Z",
      level: "warn",
      type: "validation_failure",
      route: "/api/search",
      reason: "invalid_query",
    });
  });

  it("masks IPv4 addresses", () => {
    logValidationFailure({
      route: "/api/search",
      reason: "rate_limit",
      ip: "203.0.113.42",
    });

    const json = consoleWarnSpy.mock.calls[0]?.[1] as string;
    const logEntry = JSON.parse(json);
    expect(logEntry.ip).toBe("203.0.113.*");
  });

  it("masks IPv6 addresses", () => {
    logValidationFailure({
      route: "/api/search",
      reason: "rate_limit",
      ip: "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
    });

    const json = consoleWarnSpy.mock.calls[0]?.[1] as string;
    const logEntry = JSON.parse(json);
    expect(logEntry.ip).toBe("2001:0db8:85a3:****");
  });

  it("preserves 'anonymous' IP", () => {
    logValidationFailure({
      route: "/api/search",
      reason: "rate_limit",
      ip: "anonymous",
    });

    const json = consoleWarnSpy.mock.calls[0]?.[1] as string;
    const logEntry = JSON.parse(json);
    expect(logEntry.ip).toBe("anonymous");
  });

  it("includes optional metadata", () => {
    logValidationFailure({
      route: "/api/search",
      reason: "query_too_long",
      metadata: {
        originalLength: 250,
        maxAllowed: 120,
      },
    });

    const json = consoleWarnSpy.mock.calls[0]?.[1] as string;
    const logEntry = JSON.parse(json);
    expect(logEntry.metadata).toEqual({
      originalLength: 250,
      maxAllowed: 120,
    });
  });

  it("handles missing optional fields", () => {
    logValidationFailure({
      route: "/api/test",
      reason: "test_failure",
    });

    const json = consoleWarnSpy.mock.calls[0]?.[1] as string;
    const logEntry = JSON.parse(json);
    expect(logEntry.ip).toBeUndefined();
    expect(logEntry.metadata).toBeUndefined();
  });

  it("logs multiple failures independently", () => {
    logValidationFailure({
      route: "/api/search",
      reason: "first",
    });
    logValidationFailure({
      route: "/api/frontier",
      reason: "second",
    });

    expect(consoleWarnSpy).toHaveBeenCalledTimes(2);
    const first = JSON.parse(consoleWarnSpy.mock.calls[0]?.[1] as string);
    const second = JSON.parse(consoleWarnSpy.mock.calls[1]?.[1] as string);

    expect(first.route).toBe("/api/search");
    expect(second.route).toBe("/api/frontier");
  });
});
