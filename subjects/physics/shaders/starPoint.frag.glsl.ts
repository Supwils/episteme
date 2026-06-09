/**
 * Star-point fragment shader (temperature-based color).
 *
 * Renders a soft circular point with a bright core and diffuse halo.
 * Color is derived from spectral temperature via a 3-stop ramp
 * (cool blue → neutral white → warm amber).
 */
export const starPointFrag = /* glsl */ `
varying float vTemp;
varying float vBrightness;

vec3 spectrumColor(float t) {
  vec3 cool = vec3(0.65, 0.78, 1.00);
  vec3 mid  = vec3(1.00, 0.96, 0.85);
  vec3 warm = vec3(1.00, 0.54, 0.35);
  vec3 a = mix(cool, mid, smoothstep(0.0, 0.5, t));
  vec3 b = mix(mid, warm, smoothstep(0.5, 1.0, t));
  return mix(a, b, step(0.5, t));
}

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float r = length(uv);
  if (r > 0.5) discard;

  float core = smoothstep(0.35, 0.0, r);
  float halo = smoothstep(0.5, 0.18, r);
  float alpha = core + halo * 0.35;

  vec3 c = spectrumColor(vTemp) * (0.5 + vBrightness * 1.2);
  gl_FragColor = vec4(c, alpha * vBrightness);
}
`;

/**
 * Star-point fragment shader (vertex-color mode).
 *
 * Same soft-circle rendering, but uses the `color` attribute (via
 * Three.js's built-in `vColor` varying) instead of the spectral ramp.
 * Used for layers that already carry per-vertex RGB color data (CMB
 * mottle, cosmic web temperature gradient, etc.).
 */
export const starPointFragColor = /* glsl */ `
varying float vTemp;
varying float vBrightness;
varying vec3 vColor;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float r = length(uv);
  if (r > 0.5) discard;

  float core = smoothstep(0.35, 0.0, r);
  float halo = smoothstep(0.5, 0.18, r);
  float alpha = core + halo * 0.35;

  vec3 c = vColor * (0.5 + vBrightness * 1.2);
  gl_FragColor = vec4(c, alpha * vBrightness);
}
`;

/**
 * Vertex shader variant that passes through per-vertex color.
 */
export const starPointVertColor = /* glsl */ `
uniform float uPixelRatio;
uniform float uSizeMultiplier;

attribute float aSize;
attribute float aTemp;
attribute float aBrightness;

varying float vTemp;
varying float vBrightness;
varying vec3 vColor;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = aSize * uSizeMultiplier * uPixelRatio * (300.0 / -mvPosition.z);
  gl_PointSize = max(gl_PointSize, 1.0);

  vTemp = aTemp;
  vBrightness = aBrightness;
  vColor = color;
}
`;
