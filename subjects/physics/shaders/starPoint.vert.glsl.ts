/**
 * Star-point vertex shader.
 *
 * Per-vertex attributes:
 *   aSize       — point size in absolute pixels (before distance attenuation)
 *   aTemp       — spectral temperature 0 (cool/blue) → 1 (warm/red)
 *   aBrightness — brightness multiplier 0..1
 *
 * Uniforms:
 *   uPixelRatio     — capped device pixel ratio
 *   uSizeMultiplier — global size scale
 */
export const starPointVert = /* glsl */ `
uniform float uPixelRatio;
uniform float uSizeMultiplier;

attribute float aSize;
attribute float aTemp;
attribute float aBrightness;

varying float vTemp;
varying float vBrightness;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = aSize * uSizeMultiplier * uPixelRatio * (300.0 / -mvPosition.z);
  gl_PointSize = max(gl_PointSize, 1.0);

  vTemp = aTemp;
  vBrightness = aBrightness;
}
`;
