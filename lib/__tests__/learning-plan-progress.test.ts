// @vitest-environment happy-dom
import { cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  vi.resetModules();
});

beforeEach(() => {
  window.localStorage.clear();
  vi.resetModules();
});

describe("useLearningPlanProgress", () => {
  it("treats JSON null and arrays in storage as an empty map", async () => {
    window.localStorage.setItem("uk-learning-plan-progress", "null");
    const { useLearningPlanProgress } = await import("../learning-plan-progress");
    const { result } = renderHook(() => useLearningPlanProgress("plan-1"));
    expect(result.current).toEqual([]);
  });

  it("ignores a stored list that is not a progress object", async () => {
    window.localStorage.setItem("uk-learning-plan-progress", JSON.stringify(["plan-1"]));
    const { useLearningPlanProgress } = await import("../learning-plan-progress");
    const { result } = renderHook(() => useLearningPlanProgress("plan-1"));
    expect(result.current).toEqual([]);
  });
});
