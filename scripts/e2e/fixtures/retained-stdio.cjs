// Controlled reproduction: the browser exits, but its helper retains all pipes.
const childProcess = require("node:child_process");
const { appendFileSync } = require("node:fs");

if (process.argv[2] === "--wrapped-browser") {
  const [, , , command, ...args] = process.argv;
  const helper = childProcess.spawn(process.execPath, ["-e", "setTimeout(() => {}, 30000)"], {
    stdio: ["ignore", 1, 2, 3, 4],
  });
  appendFileSync(process.env.EPISTEME_LIFECYCLE_HELPERS, `${helper.pid}\n`);
  if (process.env.EPISTEME_LIFECYCLE_EXIT_CODE) {
    process.stderr.write("Injected browser startup failure\n");
    process.exit(Number(process.env.EPISTEME_LIFECYCLE_EXIT_CODE));
  }
  const browser = childProcess.spawn(command, args, { stdio: ["ignore", 1, 2, 3, 4] });
  browser.once("exit", (code) => process.exit(code ?? 1));
} else {
  const original = childProcess.spawn;
  childProcess.spawn = function (command, args, options) {
    if (/\/(Google Chrome(?: for Testing)?|Chromium|chrome)$/.test(String(command)))
      return original.call(this, process.execPath, [__filename, "--wrapped-browser", command, ...args], options);
    return original.call(this, command, args, options);
  };
  require("node:module").syncBuiltinESMExports();
}
