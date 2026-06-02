/**
 * Volumetric glow vertex shader.
 *
 * A view-aligned billboard quad that passes world position
 * to the fragment shader for raymarching.
 */
export const volumeVert = /* glsl */ `
varying vec3 vWorldPos;

void main() {
  vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

/**
 * Volumetric glow fragment shader (simplified raymarch).
 *
 * Renders a soft volumetric glow by accumulating density along
 * a few raymarch steps through 3D FBM noise. Used for:
 *   — T0 CMB anisotropy glow
 *   — T4 Sgr A* accretion glow
 *   — T6 Solar corona
 *
 * Uniforms:
 *   uCoreColor  — bright center color (linear space)
 *   uHaloColor  — dim outer color (linear space)
 *   uDensity    — density multiplier
 *   uTime       — animation time for subtle turbulence
 *   uSteps      — raymarch step count (4-6 for performance)
 */
export const volumeFrag = /* glsl */ `
uniform vec3 uCoreColor;
uniform vec3 uHaloColor;
uniform float uDensity;
uniform float uTime;
uniform int uSteps;

varying vec3 vWorldPos;

float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x),
        mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x),
        mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
    f.z
  );
}

float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.05;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec3 rayOrigin = cameraPosition;
  vec3 rayDir = normalize(vWorldPos - rayOrigin);

  float density = 0.0;
  vec3 p = vWorldPos;

  int steps = uSteps;
  for (int i = 0; i < 8; i++) {
    if (i >= steps) break;
    float n = fbm(p * 2.0 + uTime * 0.05);
    density += n * uDensity * 0.1;
    p += rayDir * 0.08;
  }

  vec3 c = mix(uHaloColor, uCoreColor, smoothstep(0.0, 0.6, density));
  float alpha = clamp(density, 0.0, 0.9);
  gl_FragColor = vec4(c, alpha);
}
`;
