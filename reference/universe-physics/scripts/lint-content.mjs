#!/usr/bin/env node
/**
 * Stand-alone content linter.
 *
 * Why this exists: `pnpm test` already validates every TierContent via
 * `content-schema.test.ts`, but a dedicated `pnpm lint:content` is
 * cheaper to wire into editor save-hooks / pre-commit later, and gives
 * us a separate signal in CI ("content broken" vs. "test broken").
 *
 * Implementation: re-uses the same Zod schema by running just the
 * schema test through vitest. Avoids pulling in a TS loader for a
 * one-shot script. If we ever need a script that mutates content (e.g.
 * `pnpm lint:content --fix`), swap to `tsx`.
 */
import { spawnSync } from "node:child_process";

const result = spawnSync(
  "pnpm",
  ["exec", "vitest", "run", "--reporter=verbose", "src/lib/content-schema.test.ts"],
  { stdio: "inherit" },
);

process.exit(result.status ?? 1);
