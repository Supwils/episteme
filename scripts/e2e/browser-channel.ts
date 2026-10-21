export function resolveBrowserChannel(
  value = process.env.E2E_BROWSER_CHANNEL
): "chrome" | "chromium" {
  if (value === undefined) return "chrome";
  if (value === "chrome" || value === "chromium") return value;
  throw new Error("E2E_BROWSER_CHANNEL must be chrome or chromium");
}
