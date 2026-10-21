import { spawn, type ChildProcess } from "node:child_process";
import { once } from "node:events";
import { afterEach, describe, expect, it } from "vitest";
import { forceStopOwnedProcess, observeOwnedProcess } from "./owned-browser-process";

const owned: ChildProcess[] = [];
function start(source: string) {
  const child = spawn(process.execPath, ["-e", source], {
    detached: true,
    stdio: ["ignore", "pipe", "pipe"],
  });
  owned.push(child);
  return child;
}
afterEach(() => owned.splice(0).forEach(forceStopOwnedProcess));

describe.skipIf(process.platform === "win32")("owned browser process cleanup", () => {
  it("distinguishes a completed process from inherited pipes that are still open", async () => {
    const unrelated = start("setInterval(() => {}, 1000)");
    const child = start(`
      require('node:child_process').spawn(process.execPath,
        ['-e', 'setInterval(() => {}, 1000)'], { stdio: 'inherit' });
      process.exit(0);
    `);
    const state = observeOwnedProcess(child);
    await once(child, "exit");
    expect(state.exited).toBe(true);
    expect(state.closed).toBe(false);
    expect(state.exitCode).toBe(0);
    const closed = once(child, "close");
    forceStopOwnedProcess(child);
    await closed;
    expect(state.closed).toBe(true);
    expect(() => process.kill(unrelated.pid!, 0)).not.toThrow();
  });

  it("records normal completion and tolerates cleanup after the group has exited", async () => {
    const child = start("process.exit(0)");
    const state = observeOwnedProcess(child);
    await once(child, "close");
    expect(state).toMatchObject({ exited: true, closed: true, exitCode: 0, signal: null });
    expect(() => forceStopOwnedProcess(child)).not.toThrow();
  });
});
