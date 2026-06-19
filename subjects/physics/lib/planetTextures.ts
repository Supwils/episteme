"use client";

import {
  ClampToEdgeWrapping,
  DataTexture,
  RGBAFormat,
  RepeatWrapping,
  SRGBColorSpace,
  type Texture,
  TextureLoader,
} from "three";

/** Public-relative paths to the 12 planet/moon textures. */
export const PLANET_TEXTURE_PATHS = {
  mercury: "/textures/planets/mercury.webp",
  venus: "/textures/planets/venus.webp",
  earthDay: "/textures/planets/earth-day.webp",
  earthNight: "/textures/planets/earth-night.webp",
  earthClouds: "/textures/planets/earth-clouds.webp",
  mars: "/textures/planets/mars.webp",
  jupiter: "/textures/planets/jupiter.webp",
  saturn: "/textures/planets/saturn.webp",
  saturnRing: "/textures/planets/saturn-ring.png",
  uranus: "/textures/planets/uranus.webp",
  neptune: "/textures/planets/neptune.webp",
  moon: "/textures/planets/moon.webp",
} as const;

export type PlanetTextureKey = keyof typeof PLANET_TEXTURE_PATHS;

const cache = new Map<PlanetTextureKey, Texture>();
let sharedLoader: TextureLoader | null = null;

/**
 * Synchronous texture getter with a module-level cache.
 *
 * Called from React render: returns the cached texture immediately if
 * present, otherwise kicks off async loading and returns a placeholder
 * 1×1 texture. When the real texture resolves we replace the entry,
 * so the next frame picks it up. This avoids Suspense and keeps each
 * scene's mount cheap.
 */
export function getPlanetTexture(key: PlanetTextureKey): Texture {
  const hit = cache.get(key);
  if (hit) return hit;

  if (!sharedLoader) sharedLoader = new TextureLoader();
  const placeholder = makePlaceholder();
  cache.set(key, placeholder);

  sharedLoader.load(PLANET_TEXTURE_PATHS[key], (tex) => {
    tex.colorSpace = SRGBColorSpace;
    tex.anisotropy = 4;
    tex.wrapS = RepeatWrapping;
    tex.wrapT = ClampToEdgeWrapping;
    tex.needsUpdate = true;
    cache.set(key, tex);
    placeholder.dispose();
  });

  return cache.get(key) ?? placeholder;
}

/** Eagerly warm the cache for the planet textures used by a tier. */
export function preloadPlanetTextures(keys: readonly PlanetTextureKey[]) {
  for (const k of keys) getPlanetTexture(k);
}

function makePlaceholder(): Texture {
  const data = new Uint8Array([60, 60, 70, 255]);
  const tex = new DataTexture(data, 1, 1, RGBAFormat);
  tex.colorSpace = SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}
