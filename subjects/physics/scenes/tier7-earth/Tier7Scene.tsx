"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type ComponentProps } from "react";
import {
  AdditiveBlending,
  BackSide,
  Color,
  type Group,
  type Mesh,
  ShaderMaterial,
  Vector3,
} from "three";
import { getTierContent } from "@/subjects/physics/lib/tier-content";
import { getPlanetTexture, preloadPlanetTextures } from "@/subjects/physics/lib/planetTextures";
import { Planet } from "@/subjects/physics/components/three/Planet";
import {
  atmosphereFrag,
  atmosphereVert,
  cloudsFrag,
  cloudsVert,
  earthFrag,
  earthVert,
} from "@/subjects/physics/shaders/earth.glsl";
import { SceneMarkers } from "../SceneMarkers";
import { useUiStore } from "@/subjects/physics/store/useUiStore";

type Props = ComponentProps<"group"> & {
  opacity?: number;
};

/**
 * Tier 7 — Earth.
 *
 * Scene unit = 1 R⊕. Earth body uses a custom ShaderMaterial that
 * blends Blue Marble (day) with Black Marble (night) along the
 * sun-direction terminator and adds a Rayleigh-style limb glow. A
 * separately rotating cloud shell sits at r=1.012. Two BackSide
 * atmosphere shells (r=1.04, r=1.12) sell the air halo with a
 * sunward-weighted intensity. The Moon is placed at 5 R⊕ (compressed
 * from 60 R⊕ for visibility) with the LRO map applied. A faint
 * geostationary ring at 6.6 R⊕ marks the comms belt.
 */

// Sun comes from +X for legibility. Same direction is fed into all four
// Earth-system shaders so day/night/clouds/atmosphere stay coherent.
const SUN_DIR = new Vector3(1, 0.18, 0.3).normalize();

export function Tier7Scene({ opacity = 1, ...groupProps }: Props) {
  const group = useRef<Group>(null);
  const earthRef = useRef<Mesh>(null);
  const cloudRef = useRef<Mesh>(null);
  const atmInner = useRef<Mesh>(null);
  const atmOuter = useRef<Mesh>(null);
  const geoRingRef = useRef<Mesh>(null);
  const auroraNorth = useRef<Mesh>(null);
  const auroraSouth = useRef<Mesh>(null);
  const reducedMotion = useUiStore((s) => s.reducedMotion);

  const markers = useMemo(() => getTierContent("T7")?.markers ?? [], []);

  useEffect(() => {
    preloadPlanetTextures(["earthDay", "earthNight", "earthClouds", "moon"]);
  }, []);

  useEffect(() => {
    return () => {
      earthMat.dispose();
      cloudsMat.dispose();
      atmInnerMat.dispose();
      atmOuterMat.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const earthMat = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: earthVert,
      fragmentShader: earthFrag,
      uniforms: {
        uDayMap: { value: getPlanetTexture("earthDay") },
        uNightMap: { value: getPlanetTexture("earthNight") },
        uSunDir: { value: SUN_DIR.clone() },
        uOpacity: { value: 1 },
        uAtmColor: { value: new Color("#7cbcff") },
        uAtmIntensity: { value: 0.55 },
      },
      transparent: true,
    });
  }, []);

  const cloudsMat = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: cloudsVert,
      fragmentShader: cloudsFrag,
      uniforms: {
        uCloudsMap: { value: getPlanetTexture("earthClouds") },
        uSunDir: { value: SUN_DIR.clone() },
        uOpacity: { value: 1 },
        uUvOffset: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
    });
  }, []);

  const atmInnerMat = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: atmosphereVert,
        fragmentShader: atmosphereFrag,
        uniforms: {
          uColor: { value: new Color("#7cbcff") },
          uSunDir: { value: SUN_DIR.clone() },
          uOpacity: { value: 0.55 },
        },
        transparent: true,
        depthWrite: false,
        side: BackSide,
        blending: AdditiveBlending,
      }),
    []
  );

  const atmOuterMat = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: atmosphereVert,
        fragmentShader: atmosphereFrag,
        uniforms: {
          uColor: { value: new Color("#5b8de8") },
          uSunDir: { value: SUN_DIR.clone() },
          uOpacity: { value: 0.32 },
        },
        transparent: true,
        depthWrite: false,
        side: BackSide,
        blending: AdditiveBlending,
      }),
    []
  );

  const lastOpacity = useRef(opacity);
  const texturesLoaded = useRef(false);

  useFrame((state, dt) => {
    if (!reducedMotion && group.current) group.current.rotation.y += dt * 0.04;
    if (!reducedMotion && cloudRef.current) cloudRef.current.rotation.y += dt * 0.012;

    // Aurora easter egg: slow drift around magnetic pole + breathing
    // intensity. Substorm bursts every ~30 s push the brightness 2-3×
    // for a couple of seconds, mimicking real auroral activity.
    const t = state.clock.elapsedTime;
    const substorm = (() => {
      const phase = (t % 28) / 28;
      if (phase < 0.12) return Math.exp(-Math.pow((phase - 0.06) * 24, 2)) * 1.6;
      return 0;
    })();
    const breathing = 0.45 + 0.18 * Math.sin(t * 0.42);
    const auroraOpacity = reducedMotion ? 0.5 : Math.min(1.6, breathing + substorm);
    if (auroraNorth.current) {
      const mat = auroraNorth.current.material as { opacity?: number };
      if (typeof mat.opacity === "number") mat.opacity = 0.38 * auroraOpacity * opacity;
    }
    if (auroraSouth.current) {
      const mat = auroraSouth.current.material as { opacity?: number };
      if (typeof mat.opacity === "number") mat.opacity = 0.34 * auroraOpacity * opacity;
    }
    if (!reducedMotion) {
      if (auroraNorth.current) auroraNorth.current.rotation.z += dt * 0.05;
      if (auroraSouth.current) auroraSouth.current.rotation.z -= dt * 0.04;
    }

    // Texture swap: check until all real textures are loaded, then stop.
    if (!texturesLoaded.current) {
      const dayTex = getPlanetTexture("earthDay");
      const nightTex = getPlanetTexture("earthNight");
      const cloudTex = getPlanetTexture("earthClouds");
      let allLoaded = true;
      if (earthMat.uniforms.uDayMap && earthMat.uniforms.uDayMap.value !== dayTex) {
        earthMat.uniforms.uDayMap.value = dayTex;
        earthMat.uniformsNeedUpdate = true;
        allLoaded = false;
      }
      if (earthMat.uniforms.uNightMap && earthMat.uniforms.uNightMap.value !== nightTex) {
        earthMat.uniforms.uNightMap.value = nightTex;
        earthMat.uniformsNeedUpdate = true;
        allLoaded = false;
      }
      if (cloudsMat.uniforms.uCloudsMap && cloudsMat.uniforms.uCloudsMap.value !== cloudTex) {
        cloudsMat.uniforms.uCloudsMap.value = cloudTex;
        cloudsMat.uniformsNeedUpdate = true;
        allLoaded = false;
      }
      if (allLoaded) texturesLoaded.current = true;
    }

    // Only update opacity uniforms when opacity changes
    if (lastOpacity.current !== opacity) {
      earthMat.uniforms.uOpacity!.value = opacity;
      cloudsMat.uniforms.uOpacity!.value = opacity * 0.85;
      atmInnerMat.uniforms.uOpacity!.value = 0.55 * opacity;
      atmOuterMat.uniforms.uOpacity!.value = 0.32 * opacity;
      if (geoRingRef.current) {
        const mat = geoRingRef.current.material as { opacity?: number };
        if (typeof mat.opacity === "number") mat.opacity = 0.18 * opacity;
      }
      lastOpacity.current = opacity;
    }
  });

  return (
    <group ref={group} {...groupProps}>
      {/* Earth — custom shader, day/night blend */}
      <mesh ref={earthRef} material={earthMat}>
        <sphereGeometry args={[1, 96, 96]} />
      </mesh>

      {/* Cloud shell — slightly larger, slowly rotating */}
      <mesh ref={cloudRef} material={cloudsMat}>
        <sphereGeometry args={[1.012, 72, 72]} />
      </mesh>

      {/* atmosphere — Rayleigh-style limb glow, two BackSide shells */}
      <mesh ref={atmInner} material={atmInnerMat}>
        <sphereGeometry args={[1.04, 48, 48]} />
      </mesh>
      <mesh ref={atmOuter} material={atmOuterMat}>
        <sphereGeometry args={[1.12, 48, 48]} />
      </mesh>

      {/* geostationary belt (6.6 R⊕) */}
      <mesh ref={geoRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[6.59, 6.61, 96]} />
        <meshBasicMaterial color="#6ad0ff" transparent depthWrite={false} side={BackSide} />
      </mesh>

      {/*
        Auroral ovals at ±67° magnetic latitude.
        Torus tube hovers just above the cloud shell. Major radius
        sin(23°) ≈ 0.39 R⊕; height above center cos(23°) ≈ 0.92 R⊕.
        Green primary + magenta inner tinge mimic OI / N₂⁺ emission.
      */}
      <mesh ref={auroraNorth} position={[0, 0.92, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.39, 0.018, 12, 96]} />
        <meshBasicMaterial
          color="#7affb4"
          transparent
          opacity={0.38}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
      <mesh ref={auroraSouth} position={[0, -0.92, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.39, 0.016, 12, 96]} />
        <meshBasicMaterial
          color="#86b4ff"
          transparent
          opacity={0.34}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>

      {/* Sun light + tiny ambient so Moon and ring read correctly */}
      <directionalLight position={SUN_DIR.toArray()} intensity={1.4} color="#fff3d6" />
      <ambientLight intensity={0.12} color="#9ab3ff" />

      {/* Moon — 0.273 R⊕, placed at 5 R⊕ (real 60, cheated for framing) */}
      <Planet
        textureKey="moon"
        radius={0.273}
        position={[5, 0.15, 0]}
        axialTilt={6.7}
        spin={0.02}
        opacity={opacity}
        segments={36}
      />

      {/* interactive markers (Earth / atmosphere / Moon / geosync belt) */}
      {markers.length > 0 ? <SceneMarkers markers={markers} opacity={opacity} tierId="T7" /> : null}
    </group>
  );
}
