import assert from "node:assert/strict";
import type { ChildProcess } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { release } from "node:os";
import { dirname, resolve } from "node:path";
import { parseArgs } from "node:util";
import { chromium, webkit, type Browser } from "@playwright/test";
import playwrightPackage from "@playwright/test/package.json";
import { validateNavigationCell, type Cell, observeWindow } from "./navigation-evidence";
import { resolveBrowserChannel } from "./browser-channel";
import { forceStopOwnedProcess, observeOwnedProcess } from "./owned-browser-process";
import { startNavigationFixture } from "./fixtures/navigation-cancellation";
import { measureCell } from "./navigation-scenarios";

function options() {
  const { values } = parseArgs({
    options: {
      cycles: { type: "string", default: "3" },
      "observation-ms": { type: "string", default: "500" },
      "timeout-ms": { type: "string", default: "30000" },
      output: { type: "string" },
    },
  });
  const cycles = Number(values.cycles),
    observationMs = Number(values["observation-ms"]),
    timeoutMs = Number(values["timeout-ms"]);
  assert(Number.isInteger(cycles) && cycles >= 1 && cycles <= 10, "cycles must be 1–10");
  assert(
    Number.isInteger(observationMs) && observationMs >= 100 && observationMs <= 3000,
    "observation-ms must be 100–3000"
  );
  assert(
    Number.isInteger(timeoutMs) && timeoutMs >= 5000 && timeoutMs <= 120000,
    "timeout-ms must be 5000–120000"
  );
  return {
    cycles,
    observationMs,
    timeoutMs,
    channel: resolveBrowserChannel(),
    output: resolve(values.output ?? `.cache/navigation-cancellation/${Date.now()}.json`),
  };
}

const settings = options();
const engines = ["webkit", "chromium"] as const;
const phases = ["control", "cors", "replacement", "inflight"] as const;
const started = performance.now();
if (process.platform === "win32") throw new Error("Owned-process cleanup requires macOS or Linux");
const owned = new Set<ChildProcess>();
let fixture: Awaited<ReturnType<typeof startNavigationFixture>> | undefined;
const report = {
  status: "running",
  phase: "starting",
  error: "",
  ...settings,
  environment: {
    node: process.version,
    playwright: playwrightPackage.version,
    platform: process.platform,
    arch: process.arch,
    osRelease: release(),
  },
  browsers: {} as Record<string, string>,
  sentinelErrors: {} as Record<string, string[]>,
  sentinelSignals: {} as Record<string, string[]>,
  processes: [] as ReturnType<typeof observeOwnedProcess>[],
  cells: [] as Cell[],
};
mkdirSync(dirname(settings.output), { recursive: true });
const save = () => writeFileSync(settings.output, JSON.stringify(report, null, 2) + "\n");

function fail(error: unknown, code = 1): never {
  report.status = "failed";
  report.error = error instanceof Error ? (error.stack ?? error.message) : String(error);
  for (const child of owned) {
    try {
      forceStopOwnedProcess(child);
    } catch (cleanup) {
      report.error += `; cleanup: ${String(cleanup)}`;
    }
  }
  if (fixture)
    for (const cell of report.cells)
      cell.requests = fixture.ledger.filter((request) => request.cell === cell.id);
  fixture?.stop();
  save();
  console.error(`${report.error}; report: ${settings.output}`);
  process.exit(code);
}

const deadline = setTimeout(
  () => fail(`Diagnostic exceeded ${settings.timeoutMs} ms`),
  settings.timeoutMs
);
deadline.unref();
process.once("SIGINT", () => fail("Diagnostic interrupted", 130));
process.once("SIGTERM", () => fail("Diagnostic terminated", 143));
process.once("beforeExit", () => {
  clearTimeout(deadline);
  if (report.status !== "complete") fail("Diagnostic ended before completing its controls");
});

async function cell(browser: Browser, engine: string, cycle: number, phase: Cell["phase"]) {
  assert(fixture);
  const id = `${engine}-${cycle}-${phase}`;
  report.phase = id;
  save();
  const context = await browser.newContext({ serviceWorkers: "block" });
  const result: Cell = {
    engine,
    phase,
    id,
    origin: fixture.origin,
    targetOrigin: phase === "cors" ? fixture.foreignOrigin : fixture.origin,
    outcome: { state: "pending" },
    pageErrors: [],
    signals: null,
    requests: [],
    finalTitle: "",
    finding: "unvalidated",
    requestFailures: [],
  };
  report.cells.push(result);
  const held =
    phase === "replacement" || phase === "inflight" ? fixture.holdReplacement(id) : undefined;
  try {
    const page = await context.newPage();
    page.on("pageerror", (error) => result.pageErrors.push(`${error.name}: ${error.message}`));
    page.on("requestfailed", (request) => {
      const url = new URL(request.url());
      result.requestFailures.push({
        path: url.pathname,
        transport: url.searchParams.get("transport") ?? "",
        message: request.failure()?.errorText ?? "unknown",
      });
    });
    await measureCell(page, result, { fixture, observationMs: settings.observationMs }, held);
  } finally {
    held?.release();
    await context.close();
  }
  result.requests = fixture.ledger.filter((request) => request.cell === id);
  result.finding = validateNavigationCell(result);
  save();
  console.log(`${id}: ${result.finding}`);
}

async function sentinel(browser: Browser, engine: string) {
  assert(fixture);
  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`${fixture.origin}/source?cell=${engine}-sentinel`);
    const handle = await observeWindow(page);
    for (const kind of ["error", "rejection"] as const) {
      const caught = page.waitForEvent("pageerror", { timeout: 3000 });
      await page.evaluate((kind) => {
        if (kind === "rejection") void Promise.reject(new Error("navigation-diagnostic-rejection"));
        else
          setTimeout(() => {
            throw new Error("navigation-diagnostic-error");
          }, 0);
      }, kind);
      const message = (await caught).message;
      const marker = `navigation-diagnostic-${kind}`;
      assert(message === marker || message === `Error: ${marker}`, message);
    }
    assert.equal(errors.length, 2);
    const signals = await handle.evaluate((state) => state.signals);
    assert.equal(signals.length, 2);
    assert(signals[0]?.startsWith("error:") && signals[0].endsWith("navigation-diagnostic-error"));
    assert(
      signals[1]?.startsWith("unhandledrejection:") &&
        signals[1].endsWith("navigation-diagnostic-rejection")
    );
    report.sentinelErrors[engine] = errors;
    report.sentinelSignals[engine] = signals;
  } finally {
    await context.close();
  }
}

async function runEngine(engine: "webkit" | "chromium") {
  const remaining = settings.timeoutMs - (performance.now() - started);
  assert(remaining > 3500, "Insufficient remaining time to launch another owned browser");
  const launcher = engine === "webkit" ? webkit : chromium;
  const server = await launcher.launchServer({
    ...(engine === "chromium" ? { channel: settings.channel } : {}),
    timeout: Math.min(10000, Math.floor(remaining - 3000)),
  });
  const child = server.process();
  owned.add(child);
  report.processes.push(observeOwnedProcess(child));
  const browser = await launcher.connect(server.wsEndpoint());
  report.browsers[engine] = browser.version();
  try {
    await sentinel(browser, engine);
    for (let cycle = 1; cycle <= settings.cycles; cycle++) {
      for (const phase of phases) await cell(browser, engine, cycle, phase);
    }
  } finally {
    await browser.close();
    await server.close();
    owned.delete(child);
  }
}

async function main() {
  fixture = await startNavigationFixture();
  try {
    for (const engine of engines) await runEngine(engine);
  } finally {
    await fixture.close();
  }
  assert.equal(report.cells.length, settings.cycles * engines.length * phases.length);
  assert(report.processes.every((child) => child.exited && child.closed));
  report.status = "complete";
  report.phase = "complete";
  save();
  console.log(`COMPLETE: controls passed; read per-cell findings in ${settings.output}`);
}

main().catch((error) => fail(error));
