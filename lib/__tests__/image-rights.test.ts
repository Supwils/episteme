import fs from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { loadImageManifest, loadImageRights } from "@/lib/image-rights";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("image rights loaders", () => {
  it("returns null for an unknown image id", () => {
    expect(loadImageRights("does-not-exist-image-id")).toBeNull();
  });

  it("returns null instead of throwing when a rights file is not JSON", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue("not-json");
    expect(loadImageRights("broken")).toBeNull();
  });

  it("returns an empty manifest instead of throwing when the file is corrupt", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue("{");
    expect(loadImageManifest()).toEqual({});
  });
});
