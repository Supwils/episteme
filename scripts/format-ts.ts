import prettier from "prettier";
import { writeFileAtomic } from "../lib/atomic-write.js";

/**
 * Write a generated .ts file formatted with the repo's prettier config, so the
 * generator's output already matches what lint-staged would produce. Without
 * this, raw single-line output drifts against the prettier-formatted committed
 * file and `pnpm gen-*` produces a large spurious diff every run.
 *
 * Uses atomic write (temp file + rename) to prevent readers from seeing
 * partially-written files during generation.
 */
export async function writeFormattedTs(filePath: string, source: string): Promise<void> {
  const config = await prettier.resolveConfig(filePath);
  writeFileAtomic(filePath, await prettier.format(source, { ...config, parser: "typescript" }));
}
