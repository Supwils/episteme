// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { downloadJson, MAX_LOCAL_JSON_BYTES, readBoundedJson } from "../local-json-file";

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("downloadJson", () => {
  it("keeps the object URL alive until the browser can start the download", () => {
    vi.useFakeTimers();
    const revoke = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:episteme");
    downloadJson("profile.json", { ok: true });
    expect(revoke).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1000);
    expect(revoke).toHaveBeenCalledWith("blob:episteme");
  });
});

describe("readBoundedJson", () => {
  it("refuses a file larger than the import limit before parsing", async () => {
    const file = new Blob([JSON.stringify({ entries: [] })]);
    Object.defineProperty(file, "size", { value: MAX_LOCAL_JSON_BYTES + 1 });
    const text = vi.spyOn(file, "text");
    await expect(readBoundedJson(file)).rejects.toThrow(/import limit/);
    expect(text).not.toHaveBeenCalled();
  });

  it("parses a file within the limit", async () => {
    const file = new Blob([JSON.stringify({ entries: ["a"] })], { type: "application/json" });
    await expect(readBoundedJson(file)).resolves.toEqual({ entries: ["a"] });
  });
});
