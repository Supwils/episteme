import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

mkdirSync(".cache/browser-lifecycle", { recursive: true });
const output = mkdtempSync(resolve(".cache/browser-lifecycle/retained-stdio-"));

function helperPids(file: string): number[] {
  return readFileSync(file, "utf8")
    .split(/\s+/)
    .filter(Boolean)
    .map((value) => {
      const pid = Number(value);
      assert.ok(Number.isSafeInteger(pid) && pid > 1, "Invalid fixture helper PID");
      return pid;
    });
}

function cleanHelpers(file: string) {
  if (!existsSync(file)) return;
  for (const pid of helperPids(file)) {
    try {
      process.kill(pid, "SIGKILL");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ESRCH") throw error;
    }
  }
}

function runCase(name: string, browserExitCode?: string) {
  const report = resolve(output, `${name}.json`);
  const helpers = resolve(output, `${name}.pids`);
  const result = spawnSync(
    process.execPath,
    [
      "--require",
      resolve("scripts/e2e/fixtures/retained-stdio.cjs"),
      "--import",
      "tsx",
      resolve("scripts/e2e/browser-lifecycle.ts"),
      "--cycles=1",
      "--timeout-ms=5000",
      `--output=${report}`,
    ],
    {
      encoding: "utf8",
      timeout: 12_000,
      env: {
        ...process.env,
        EPISTEME_LIFECYCLE_HELPERS: helpers,
        EPISTEME_LIFECYCLE_EXIT_CODE: browserExitCode,
      },
    }
  );
  writeFileSync(resolve(output, `${name}.log`), result.stdout + result.stderr);
  try {
    assert.ifError(result.error);
    const value = JSON.parse(readFileSync(report, "utf8"));
    if (browserExitCode) {
      assert.notEqual(result.status, 0);
      assert.equal(value.status, "failed");
      assert.match(value.error, /exitCode=42/);
    } else {
      assert.equal(result.status, 0, result.stderr);
      assert.equal(value.status, "passed");
      assert.equal(value.phase, "natural-exit");
      assert.deepEqual(
        value.processes.map((p: { exited: boolean; closed: boolean }) => [p.exited, p.closed]),
        [[true, true]]
      );
    }
    // Normal close must release our streams without killing background helpers.
    // A startup failure still uses Playwright's existing process-tree cleanup.
    if (!browserExitCode) {
      const pids = helperPids(helpers);
      assert.ok(pids.length > 0);
      pids.forEach((pid) => process.kill(pid, 0));
    }
    return {
      name,
      status: result.status,
      phase: value.phase,
      helperSurvived: browserExitCode ? undefined : true,
    };
  } finally {
    cleanHelpers(helpers);
  }
}

const results = [runCase("normal-exit"), runCase("startup-failure", "42")];
writeFileSync(resolve(output, "summary.json"), JSON.stringify(results, null, 2) + "\n");
console.log(
  `PASS: inherited pipes close without hiding browser failures or killing helpers; reports: ${output}`
);
