import { expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({ failures: 1, reads: 0 }));
vi.mock("node:fs/promises", async (importOriginal) => {
  const fs = await importOriginal<typeof import("node:fs/promises")>();
  return {
    readFile: (...args: Parameters<typeof fs.readFile>) => {
      state.reads++;
      if (String(args[0]).endsWith("NotoSansSC-700.ttf") && state.failures-- > 0)
        return Promise.reject(new Error("injected file read failure"));
      return fs.readFile(...args);
    },
  };
});

import { loadOgFonts } from "../fonts";

it("retries local font reads after a failure and shares only the successful load", async () => {
  await expect(loadOgFonts()).rejects.toThrow("injected file read failure");
  const retry = loadOgFonts();
  expect(loadOgFonts()).toBe(retry);
  const fonts = await retry;
  expect(fonts).toHaveLength(3);
  expect(fonts.every((font) => font.data.byteLength > 0)).toBe(true);
  const reads = state.reads;
  expect(await loadOgFonts()).toBe(fonts);
  expect(state.reads).toBe(reads);
});
