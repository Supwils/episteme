/**
 * Client-side WebGL capability probe. The immersive universe mounts a full
 * R3F <Canvas>; on devices or browsers where WebGL is unavailable (disabled,
 * blocklisted GPU, headless) that canvas paints nothing and the user faces a
 * black void. We probe first and fall back to the handwritten SVG tour instead.
 *
 * Returns false on the server (no document) so callers keep a neutral
 * "checking" state until the effect runs on the client.
 */
export function detectWebGLSupport(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return false;
    // A context can be handed back already lost (GPU reset, driver refusal).
    return gl.isContextLost() !== true;
  } catch {
    return false;
  }
}
