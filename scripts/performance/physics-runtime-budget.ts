export type PhysicsRuntimeBudget = {
  maxLoadedJsBytes: number;
  maxJsHeapBytes: number;
  maxPixelRatio: number;
  maxGeometries: number;
  maxTextures: number;
  maxFirstSceneMs: number;
  minMeasuredFps: number;
  minNonBlackRatio: number;
  minFrameDifference: number;
};

export const PHYSICS_RUNTIME_BUDGETS: Record<"desktop" | "mobile", PhysicsRuntimeBudget> = {
  desktop: {
    maxLoadedJsBytes: 920_000,
    maxJsHeapBytes: 64 * 1024 * 1024,
    maxPixelRatio: 2,
    maxGeometries: 40,
    maxTextures: 36,
    maxFirstSceneMs: 5_000,
    minMeasuredFps: 30,
    minNonBlackRatio: 0.1,
    minFrameDifference: 0.25,
  },
  mobile: {
    maxLoadedJsBytes: 920_000,
    maxJsHeapBytes: 56 * 1024 * 1024,
    maxPixelRatio: 1,
    maxGeometries: 32,
    maxTextures: 20,
    maxFirstSceneMs: 6_000,
    minMeasuredFps: 30,
    minNonBlackRatio: 0.1,
    minFrameDifference: 0.25,
  },
};
