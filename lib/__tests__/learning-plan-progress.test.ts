// @vitest-environment happy-dom
import { act, cleanup, renderHook } from "@testing-library/react";
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

  it("drops a plan whose stored steps are not a list of strings", async () => {
    window.localStorage.setItem(
      "uk-learning-plan-progress",
      JSON.stringify({ "plan-1": 1, "plan-2": ["node-a", "node-b"] })
    );
    const { useLearningPlanProgress, toggleLearningPlanStep } =
      await import("../learning-plan-progress");
    const broken = renderHook(() => useLearningPlanProgress("plan-1"));
    expect(broken.result.current).toEqual([]);
    expect(() => act(() => toggleLearningPlanStep("plan-1", "node-a"))).not.toThrow();
    const kept = renderHook(() => useLearningPlanProgress("plan-2"));
    expect(kept.result.current).toEqual(["node-a", "node-b"]);
  });
});
