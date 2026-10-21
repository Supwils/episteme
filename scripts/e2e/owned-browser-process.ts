import type { ChildProcess } from "node:child_process";

export function observeOwnedProcess(child: ChildProcess) {
  const state = {
    pid: child.pid,
    exited: false,
    closed: false,
    exitCode: child.exitCode,
    signal: child.signalCode,
  };
  child.once("exit", (exitCode, signal) => {
    Object.assign(state, { exited: true, exitCode, signal });
  });
  child.once("close", () => {
    state.closed = true;
  });
  return state;
}

/** Only accepts handles launched by this diagnostic, never a discovered PID. */
export function forceStopOwnedProcess(child: ChildProcess) {
  if (!child.pid) return;
  const exited = child.exitCode !== null || child.signalCode !== null;
  if (
    exited &&
    child.stdio.every((stream) => !stream || ("destroyed" in stream && stream.destroyed))
  )
    return;
  try {
    process.kill(-child.pid, "SIGKILL");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ESRCH") throw error;
  }
  // A background descendant may retain a pipe even after the browser exited.
  for (const stream of child.stdio) {
    if (stream && "destroy" in stream) stream.destroy();
  }
}
