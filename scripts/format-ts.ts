import { writeFileSync } from "node:fs";
import prettier from "prettier";

/**
 * Write a generated .ts file formatted with the repo's prettier config, so the
 * generator's output already matches what lint-staged would produce. Without
 * this, raw single-line output drifts against the prettier-formatted committed
 * file and `pnpm gen-*` produces a large spurious diff every run.
 */
export async function writeFormattedTs(filePath: string, source: string): Promise<void> {
  const config = await prettier.resolveConfig(filePath);
  writeFileSync(filePath, await prettier.format(source, { ...config, parser: "typescript" }));
}
