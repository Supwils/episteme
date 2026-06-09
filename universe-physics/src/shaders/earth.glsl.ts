/**
 * Earth surface shader — blends Blue Marble day map with Black Marble
 * night-lights based on the sun direction, adds a Rayleigh-style limb
 * glow, and modulates a cloud layer (sampled in a separate pass).
 */

export const earthVert = /* glsl */ `
varying vec2 vUv;
varying vec3 vNormalW;
varying vec3 vPosW;

void main() {
  vUv = uv;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vPosW = worldPos.xyz;
  vNormalW = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

export const earthFrag = /* glsl */ `
precision highp float;

uniform sampler2D uDayMap;
uniform sampler2D uNightMap;
uniform vec3 uSunDir;       // world-space, normalized
uniform float uOpacity;
uniform vec3 uAtmColor;
uniform float uAtmIntensity;

varying vec2 vUv;
varying vec3 vNormalW;
varying vec3 vPosW;

void main() {
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(cameraPosition - vPosW);
  vec3 L = normalize(uSunDir);

  float NdotL = dot(N, L);
  // Smooth terminator: day fully visible above 0.05, night below -0.05.
  float dayMix = smoothstep(-0.08, 0.18, NdotL);

  vec3 day = texture2D(uDayMap, vUv).rgb;
  // Tint and dim night lights so they don't over-saturate.
  vec3 night = texture2D(uNightMap, vUv).rgb;
  night = pow(night, vec3(1.4)) * vec3(1.0, 0.85, 0.55) * 1.25;

  // Add a bluish specular kick over oceans on the day side (cheap proxy:
  // night map is dark over oceans, day map is blue → modulate spec
  // strength by inverse of land).
  float water = clamp(1.0 - dot(day, vec3(0.33)), 0.0, 1.0);
  vec3 H = normalize(L + V);
  float spec = pow(max(dot(N, H), 0.0), 32.0) * water * dayMix * 0.35;

  vec3 col = mix(night, day, dayMix) + vec3(spec);

  // Rayleigh-style limb glow: rim factor based on view-normal angle.
  float rim = pow(1.0 - max(dot(N, V), 0.0), 2.2);
  col += uAtmColor * rim * uAtmIntensity * dayMix;

  gl_FragColor = vec4(col, uOpacity);
}
`;

export const cloudsVert = earthVert;

export const cloudsFrag = /* glsl */ `
precision highp float;

uniform sampler2D uCloudsMap;
uniform vec3 uSunDir;
uniform float uOpacity;
uniform float uUvOffset;

varying vec2 vUv;
varying vec3 vNormalW;
varying vec3 vPosW;

void main() {
  vec2 uv = vec2(vUv.x + uUvOffset, vUv.y);
  float alpha = texture2D(uCloudsMap, uv).r;
  vec3 N = normalize(vNormalW);
  vec3 L = normalize(uSunDir);
  float NdotL = dot(N, L);
  float dayMix = smoothstep(-0.05, 0.25, NdotL);
  // Slightly tint clouds on terminator with peach.
  vec3 tint = mix(vec3(0.95, 0.85, 0.72), vec3(1.0), dayMix);
  gl_FragColor = vec4(tint, alpha * dayMix * uOpacity);
}
`;

export const atmosphereVert = /* glsl */ `
varying vec3 vNormalW;
varying vec3 vPosW;
void main() {
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vPosW = worldPos.xyz;
  vNormalW = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

export const atmosphereFrag = /* glsl */ `
precision highp float;

uniform vec3 uColor;
uniform vec3 uSunDir;
uniform float uOpacity;

varying vec3 vNormalW;
varying vec3 vPosW;

void main() {
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(cameraPosition - vPosW);
  vec3 L = normalize(uSunDir);
  // BackSide rendering means N points inward; flip so rim math works.
  vec3 outwardN = -N;
  float rim = pow(1.0 - max(dot(outwardN, V), 0.0), 3.2);
  float dayFactor = max(dot(outwardN, L), 0.0);
  // Always show a soft halo, brighter on the lit hemisphere.
  float intensity = rim * (0.18 + 0.82 * dayFactor);
  gl_FragColor = vec4(uColor * intensity, intensity * uOpacity);
}
`;
