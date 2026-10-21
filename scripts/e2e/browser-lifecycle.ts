import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { release } from "node:os";
import { parseArgs } from "node:util";
import type { ChildProcess } from "node:child_process";
import { chromium } from "@playwright/test";
import playwrightPackage from "@playwright/test/package.json";
import { resolveBrowserChannel } from "./browser-channel";
import { forceStopOwnedProcess, observeOwnedProcess } from "./owned-browser-process";

function options() {
  const { values } = parseArgs({
    options: {
      cycles: { type: "string", default: "3" },
      "timeout-ms": { type: "string", default: "30000" },
      output: { type: "string" },
    },
  });
  const cycles = Number(values.cycles);
  const timeoutMs = Number(values["timeout-ms"]);
  if (!Number.isInteger(cycles) || cycles < 1 || cycles > 20)
    throw new Error("cycles must be an integer from 1 to 20");
  if (!Number.isInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 120_000)
    throw new Error("timeout-ms must be an integer from 1 to 120000");
  const channel = resolveBrowserChannel();
  const output = resolve(values.output ?? `.cache/browser-lifecycle/${channel}-${Date.now()}.json`);
  return { cycles, timeoutMs, channel, output };
}

const settings = options();
if (process.platform === "win32")
  throw new Error("This process-group diagnostic requires macOS or Linux");
const owned = new Set<ChildProcess>();
const started = performance.now();
const state = {
  status: "running",
  phase: "starting",
  completedCycles: 0,
  error: "",
  environment: {
    node: process.version,
    playwright: playwrightPackage.version,
    platform: process.platform,
    arch: process.arch,
    osRelease: release(),
  },
  ...settings,
  browserVersion: "",
  processes: [] as ReturnType<typeof observeOwnedProcess>[],
  events: [] as { phase: string; elapsedMs: number }[],
};
mkdirSync(dirname(settings.output), { recursive: true });
const save = () => writeFileSync(settings.output, JSON.stringify(state, null, 2) + "\n");

function checkpoint(phase: string) {
  state.phase = phase;
  state.events.push({ phase, elapsedMs: Math.round(performance.now() - started) });
  save();
  console.log(`[${settings.channel}] ${phase}`);
}

function fail(reason: string, exitCode = 1): never {
  state.status = "failed";
  state.error = reason;
  for (const child of owned) {
    try {
      forceStopOwnedProcess(child);
    } catch (error) {
      state.error += `; cleanup: ${String(error)}`;
    }
  }
  save();
  console.error(`${reason}; last phase: ${state.phase}; report: ${settings.output}`);
  process.exit(exitCode);
}

async function cycle(index: number) {
  checkpoint(`${index}:launch`);
  const server = await chromium.launchServer({ channel: settings.channel, timeout: 10_000 });
  const child = server.process();
  owned.add(child);
  state.processes.push(observeOwnedProcess(child));
  checkpoint(`${index}:connect`);
  const browser = await chromium.connect(server.wsEndpoint(), { timeout: 10_000 });
  state.browserVersion = browser.version();
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setContent("<button onclick=\"this.textContent='clicked'\">ready</button>");
  await page.getByRole("button", { name: "ready" }).click({ timeout: 5000 });
  assert.equal(await page.getByRole("button").textContent(), "clicked");
  assert.deepEqual(errors, []);
  checkpoint(`${index}:context.close`);
  await context.close();
  checkpoint(`${index}:client.disconnect`);
  await browser.close();
  checkpoint(`${index}:server.close`);
  await server.close();
  checkpoint(`${index}:closed`);
  state.completedCycles = index;
  owned.delete(child);
}

// Keep the deadline outside all awaited close calls. It must also catch a
// completed run whose remaining handles prevent the process from exiting.
const deadline = setTimeout(
  () => fail(`Lifecycle exceeded ${settings.timeoutMs} ms`),
  settings.timeoutMs
);
deadline.unref();
process.once("SIGINT", () => fail("Lifecycle interrupted", 130));
process.once("SIGTERM", () => fail("Lifecycle terminated", 143));
process.once("beforeExit", () => {
  clearTimeout(deadline);
  if (state.completedCycles !== settings.cycles || process.exitCode)
    fail("Lifecycle ended prematurely");
  state.status = "passed";
  checkpoint("natural-exit");
  console.log(`PASS: ${settings.cycles} complete lifecycles; report: ${settings.output}`);
});

async function main() {
  console.log(
    `Browser lifecycle: ${JSON.stringify(state.environment)}; report: ${settings.output}`
  );
  for (let index = 1; index <= settings.cycles; index++) await cycle(index);
}
main().catch((error) =>
  fail(error instanceof Error ? (error.stack ?? error.message) : String(error))
);
