# 07 — 3D 视觉升级实施清单

> **读者**：拿到 P0 任务、要在 `src/scenes/*` 与 `src/app/universe/_shell/*` 落地视觉升级的工程师。
> **读完能做什么**：精确知道改哪些文件、新增哪些 shader、性能预算如何更新、每个 PR 的 DoD。视觉方向定义见 [`design/07-3d-visual-upgrade.md`](../design/07-3d-visual-upgrade.md)。

## 1. 总览

升级分三档（P0/P1/P2），本文档逐项给出文件改动点、shader 草图、性能影响、验证手段。

**关键原则**：

- 不动 `useTierTransition` 与三种过场（zoom/dissolve/tunnel），视觉升级不调节奏
- 不动 `content/cosmos/T*.ts` 内容数据
- 不动 `lib/tier.ts` 的 Tier 元信息表
- 所有新增 shader 走 `src/shaders/*.glsl.ts`（用模板字符串导出），由对应 Scene 编译
- 每档场景独立验证，不允许"P0 全部做完一起测"

## 2. P0 · 后处理管线（P0-A）

### 2.1 改动文件

| 文件                                        | 改动                                                                                     |
| ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `src/app/universe/_shell/UniverseShell.tsx` | `<Canvas>` 加 `gl` props（ACES tone mapping + linear pipeline）；mount `<PostFX />`      |
| `src/components/post/PostFX.tsx`（新增）    | EffectComposer 套件：SMAA + Bloom + Vignette + Film grain + Chromatic Aberration（可选） |
| `src/lib/quality.ts`（新增）                | 检测 deviceMemory/hardwareConcurrency/DPR，决定 Bloom/Grain/CA 是否开                    |
| `src/store/useUiStore.ts`                   | 加 `qualityTier: "high" \| "medium" \| "low"`                                            |
| `docs/develop/05-performance-budget.md`     | § 7 自动降级触发后增加"关 Bloom"细则                                                     |

### 2.2 PostFX 组件草图

```tsx
// src/components/post/PostFX.tsx
"use client";

import {
  EffectComposer,
  Bloom,
  Vignette,
  SMAA,
  Noise,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import { useUiStore } from "@/store/useUiStore";

export function PostFX() {
  const quality = useUiStore((s) => s.qualityTier);

  if (quality === "low") {
    return (
      <EffectComposer multisampling={0}>
        <SMAA />
        <Vignette offset={0.5} darkness={0.4} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer multisampling={0}>
      <SMAA />
      <Bloom
        intensity={0.6}
        luminanceThreshold={1.0}
        luminanceSmoothing={0.2}
        kernelSize={KernelSize.LARGE}
        mipmapBlur
      />
      <Vignette offset={0.5} darkness={0.45} blendFunction={BlendFunction.NORMAL} />
      {quality === "high" && (
        <>
          <ChromaticAberration
            offset={[0.0005, 0.0005]}
            radialModulation={false}
            modulationOffset={0}
          />
          <Noise opacity={0.025} blendFunction={BlendFunction.OVERLAY} />
        </>
      )}
    </EffectComposer>
  );
}
```

### 2.3 quality 检测策略

```ts
// src/lib/quality.ts
export function detectInitialQuality(): "high" | "medium" | "low" {
  if (typeof navigator === "undefined") return "medium";
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const mobile = /Android|iPhone|iPad/.test(navigator.userAgent);

  if (mobile || mem < 4 || cores < 4) return "low";
  if (mem < 8 || dpr > 2.5) return "medium";
  return "high";
}
```

### 2.4 性能影响

| 项                  | 影响                                                             |
| ------------------- | ---------------------------------------------------------------- |
| Bloom（mipmapBlur） | +1.5ms / 帧（desktop）；+4ms / 帧（mobile，故 low quality 关掉） |
| SMAA                | +0.5ms / 帧                                                      |
| Vignette            | < 0.1ms                                                          |
| Film grain / CA     | +0.3ms / 帧                                                      |
| 总预算占用          | 每帧 < 3ms（desktop），符合 < 8ms budget                         |

### 2.5 DoD

- [ ] `pnpm typecheck && pnpm lint && pnpm test && pnpm build` 全绿
- [ ] 全 8 档 Tier 在 Chrome desktop 稳态 ≥ 55fps（中端机）
- [ ] iPhone 13 Safari 实测 ≥ 30fps
- [ ] 自动降级触发后立即关 Bloom（手动模拟 `qualityTier = "low"` 验证）
- [ ] 截图对比：T0 与 T6 启用前后，bloom + tone mapping 的视觉差异明显但不过曝

## 3. P0 · 自定义粒子 Shader（P0-B）

### 3.1 设计目标

替换以下文件中所有 `<pointsMaterial>` 与 `<Points>` 的占位实现：

- `src/scenes/tier0-observable/Tier0Scene.tsx`
- `src/scenes/tier1-cosmic-web/Tier1Scene.tsx`
- `src/scenes/tier3-local-group/Tier3Scene.tsx`
- `src/scenes/tier4-milky-way/Tier4Scene.tsx`
- `src/scenes/tier5-stellar-neighborhood/Tier5Scene.tsx`
- `src/scenes/tier6-solar-system/Tier6Scene.tsx`（仅小行星带 + Kuiper 带）

### 3.2 新增文件

```
src/shaders/
├── starPoint.vert.glsl.ts   # 顶点 shader 模板字符串
├── starPoint.frag.glsl.ts   # 片段 shader
└── colorRamps.ts            # O/B/A/F/G/K/M 调色板 + temperature 插值 GLSL fragment
```

### 3.3 Vertex shader 草图

```glsl
// starPoint.vert.glsl
uniform float uPixelRatio;
uniform float uTime;
uniform float uSizeMultiplier;

attribute float aSize;       // 点大小（绝对像素）
attribute float aTemp;       // 0=冷 1=暖
attribute float aBrightness; // 0..1

varying float vTemp;
varying float vBrightness;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = aSize * uSizeMultiplier * uPixelRatio * (1.0 / -mvPosition.z);

  vTemp = aTemp;
  vBrightness = aBrightness;
}
```

### 3.4 Fragment shader 草图

```glsl
// starPoint.frag.glsl
varying float vTemp;
varying float vBrightness;

// 色温 → RGB（O/B/A/F/G/K/M 七档插值）
vec3 spectrumColor(float t) {
  vec3 cool = vec3(0.65, 0.78, 1.00);   // O/B #a6c8ff
  vec3 mid  = vec3(1.00, 0.96, 0.85);   // G #fff4d8
  vec3 warm = vec3(1.00, 0.54, 0.35);   // M #ff8a5a
  vec3 a = mix(cool, mid, smoothstep(0.0, 0.5, t));
  vec3 b = mix(mid, warm, smoothstep(0.5, 1.0, t));
  return mix(a, b, step(0.5, t));
}

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float r = length(uv);
  if (r > 0.5) discard;

  float core = smoothstep(0.35, 0.0, r);   // 内核
  float halo = smoothstep(0.5, 0.18, r);   // 外圈柔光
  float alpha = core + halo * 0.35;

  vec3 c = spectrumColor(vTemp) * (0.5 + vBrightness * 1.2);
  gl_FragColor = vec4(c, alpha * vBrightness);
}
```

### 3.5 R3F 集成模式（每个场景一致）

```tsx
// src/scenes/tier0-observable/Tier0Scene.tsx 片段
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { starPointVert, starPointFrag } from "@/shaders/starPoint";

function StarField({ count = 4400 /* ... */ }) {
  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const sizes = useMemo(() => new Float32Array(count), [count]);
  const temps = useMemo(() => new Float32Array(count), [count]);
  const brights = useMemo(() => new Float32Array(count), [count]);

  // ... fill arrays with FBM/hash01 (existing logic) ...

  const uniforms = useMemo(
    () => ({
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uTime: { value: 0 },
      uSizeMultiplier: { value: 4.0 },
    }),
    [],
  );

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aTemp" args={[temps, 1]} />
        <bufferAttribute attach="attributes-aBrightness" args={[brights, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={starPointVert}
        fragmentShader={starPointFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
```

### 3.6 性能影响

| 项                                                      | 影响                                                |
| ------------------------------------------------------- | --------------------------------------------------- |
| 自定义 shader（VS+FS）                                  | 每点 +~10 GPU 指令；总占用 < 1ms / 帧（T0 6800 点） |
| 多了 3 个 buffer attribute（aSize, aTemp, aBrightness） | 每点 +12 bytes；T0 总 +82 KB GPU buffer             |
| Bundle JS 增加                                          | ~2 KB（shader 字符串 + colorRamps）                 |

### 3.7 DoD

- [ ] 项目内不再有 `<pointsMaterial>` 或 `PointsMaterial(` 字符串（grep 验证）
- [ ] 每档场景 hero shot 截图：粒子有软边、有色温层次、有大小层次
- [ ] desktop 中端 fps 稳态不下降（实测 T0、T4、T6）
- [ ] mobile 高端实测可接受（允许 ±10% 帧率波动）

## 4. P0 · SceneMarkers 视觉重写（P0-C）

### 4.1 改动文件

| 文件                                             | 改动                                              |
| ------------------------------------------------ | ------------------------------------------------- |
| `src/scenes/SceneMarkers.tsx`                    | 拆出 4 种视觉变体，根据 `tierKind` prop 选其一    |
| `src/scenes/markers/MarkerHaloDisk.tsx`（新增）  | T0/T1/T2：软光球 + 虚线圆环                       |
| `src/scenes/markers/MarkerDiamond.tsx`（新增）   | T3/T4：钻石符号 + 引线                            |
| `src/scenes/markers/MarkerStarPoint.tsx`（新增） | T5：恒星就是 marker 本身                          |
| `src/scenes/markers/MarkerPinNeedle.tsx`（新增） | T6/T7：极小针点 + 常驻 label                      |
| `src/lib/tier.ts`                                | 加 `TIER_MARKER_KIND: Record<TierId, MarkerKind>` |

### 4.2 hover 行为统一

四种 marker 都遵守：

- hover 时 scale 1.0 → 1.25（200ms `power2.out`）
- 同时 `useUiStore.setHoveredMarker(marker)` + DOM 层 HoverTooltip 出现
- click → `useUiStore.openPanel(marker.id)`

不允许 marker 自己显示 tooltip——一律走现有 `HoverTooltip` DOM 组件。

### 4.3 DoD

- [ ] 8 档场景的 marker 视觉明显有差异
- [ ] 现有 marker hover/click 测试不挂
- [ ] T6/T7 的针点不喧宾夺主（≤ 2px @ DPR 1）

## 5. P1 · 体积光晕（P1-A）

### 5.1 改动文件

| 文件                                                    | 改动                                                 |
| ------------------------------------------------------- | ---------------------------------------------------- |
| `src/components/volumetric/VolumeBillboard.tsx`（新增） | view-aligned billboard 几何（PlaneGeometry）+ shader |
| `src/shaders/volumeRaymarch.frag.glsl.ts`（新增）       | 4–6 步 raymarch + 3D FBM 噪声                        |
| `src/scenes/tier0-observable/Tier0Scene.tsx`            | 中心 CMB 光晕换为 VolumeBillboard                    |
| `src/scenes/tier4-milky-way/Tier4Scene.tsx`             | 银心 Sgr A\* 换为 VolumeBillboard                    |
| `src/scenes/tier6-solar-system/Tier6Scene.tsx`          | 太阳换为 VolumeBillboard                             |

### 5.2 Raymarch fragment shader 思路

```glsl
// volumeRaymarch.frag.glsl（精简版）
uniform vec3 uCoreColor;
uniform vec3 uHaloColor;
uniform float uDensity;
uniform float uTime;
uniform int uSteps;

varying vec3 vWorldPos;

float fbm3(vec3 p) { /* 4-octave FBM */ }

void main() {
  vec3 rayOrigin = cameraPosition;
  vec3 rayDir = normalize(vWorldPos - rayOrigin);
  float density = 0.0;
  vec3 p = vWorldPos;
  for (int i = 0; i < uSteps; i++) {
    float n = fbm3(p * 2.0 + uTime * 0.05);
    density += n * uDensity * 0.1;
    p += rayDir * 0.08;
  }
  vec3 c = mix(uHaloColor, uCoreColor, smoothstep(0.0, 0.6, density));
  gl_FragColor = vec4(c, clamp(density, 0.0, 0.9));
}
```

### 5.3 性能影响

每个体积 billboard：~2ms / 帧（uSteps=6）。预算每 Tier 最多 1 个体积对象。

### 5.4 DoD

- [ ] T0 中心、T4 银心、T6 太阳的光晕边界变软、有内部纹理
- [ ] 移动端可选关闭（写到 useUiStore.qualityTier 联动）

## 6. P1 · 真实贴图（P1-B）

### 6.1 资产准备

需要从公共来源拉、压缩到 KTX2 后入仓：

| 资产                               | 来源                      | 目标大小            |
| ---------------------------------- | ------------------------- | ------------------- |
| 8 行星 Diffuse                     | Solar System Scope / NASA | 1024² KTX2 / 颗     |
| 8 行星 Normal（选 4 颗陆地行星）   | USGS Astrogeology         | 512² KTX2           |
| 地球 Blue Marble Diffuse           | NASA Visible Earth        | 2048² KTX2          |
| 地球 Black Marble Emissive (Night) | NASA Earth Observatory    | 2048² KTX2          |
| 地球 Clouds                        | NASA Visible Earth        | 2048² KTX2（alpha） |
| 月球 LRO                           | NASA LROC                 | 1024² KTX2          |
| 土星环                             | NASA Cassini              | 512×64 PNG（alpha） |

**预算上限**：T6 路由 chunk +12 MB，T7 路由 chunk +8 MB。**异步加载**（Suspense + drei `useTexture`），不在初始 bundle。

### 6.2 改动文件

| 文件                                           | 改动                                |
| ---------------------------------------------- | ----------------------------------- |
| `public/textures/planets/*.ktx2`               | 新增资产                            |
| `src/scenes/tier6-solar-system/Tier6Scene.tsx` | 行星几何用 `useTexture` 加贴图      |
| `src/scenes/tier7-earth/Tier7Scene.tsx`        | 地球用 day/night/cloud 三层 + 大气  |
| `scripts/prep-textures.mjs`（新增）            | 把原始 JPG/PNG 压成 KTX2 的工具脚本 |
| `docs/develop/05-performance-budget.md`        | § 2 加 T6/T7 资产单独预算           |

### 6.3 day/night 混合 shader 草图

```glsl
// earthSurface.frag.glsl
uniform sampler2D uDay;
uniform sampler2D uNight;
uniform vec3 uSunDir;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
  float ndl = dot(normalize(vNormal), normalize(uSunDir));
  float dayMix = smoothstep(-0.1, 0.15, ndl);
  vec3 day = texture2D(uDay, vUv).rgb;
  vec3 night = texture2D(uNight, vUv).rgb * 1.5;
  gl_FragColor = vec4(mix(night, day, dayMix), 1.0);
}
```

### 6.4 DoD

- [ ] T6 行星视觉对得上 Solar System Scope 参考
- [ ] T7 地球能看到大陆轮廓 + 终结线 + 夜晚光斑
- [ ] T6 初始 chunk JS gzip < 250 KB（贴图异步）
- [ ] T7 初始 chunk JS gzip < 250 KB

## 7. P2 · Rayleigh 大气散射（P2-A）

> 仅在 T6 的金/地/火/海 与 T7 地球启用。

```glsl
// atmosphere.frag.glsl（简化 Nishita 1993）
// uniform: planet radius, atmosphere radius, sun dir, beta_R, beta_M
// 单次散射近似，4 步沿视线积分
```

工程量：~150 行 GLSL + ~80 行 R3F 接线。视觉收益：大气从"硬壳"变成"边缘亮，向中心淡出"。

## 8. P2 · GPU instancing（P2-B）

把每个 Tier 的多个 `<Points>` 合并为单一 `<InstancedMesh>`：

- 每个 instance 一个 4×4 matrix + per-instance color attribute
- Draw call 从 ~30 降到 ~10
- 实测 mobile 帧率提升 ~15%

## 9. P2 · LOD（P2-C）

```ts
// scenes/_helpers/useLOD.ts
export function useLOD(cameraDistance: number, thresholds: number[]): number {
  // returns level index based on camera distance vs thresholds
}
```

每个 Scene 内根据 `useLOD` 切换粒子 count（用 `useMemo` + dep on level，避免每帧重建 geometry）。

## 10. 性能预算更新

P0 完成后，新预算：

| Tier | 旧 Draw Call | 新（P0 后） | 旧顶点 | 新（P0 后） | GPU 内存增量           |
| ---- | ------------ | ----------- | ------ | ----------- | ---------------------- |
| T0   | < 30         | < 35        | < 200k | < 220k      | +5 MB（shader buffer） |
| T6   | < 100        | < 110       | < 800k | < 820k      | +5 MB                  |

P1 完成后（T6/T7 真贴图）：

| Tier | GPU 内存增量                     |
| ---- | -------------------------------- |
| T6   | +40 MB（行星贴图） → 总 < 290 MB |
| T7   | +30 MB → 总 < 230 MB             |

预算更新写入 `docs/develop/05-performance-budget.md` § 3。

## 11. PR 拆分建议

| PR  | 范围                                       | 工程量      |
| --- | ------------------------------------------ | ----------- |
| 1   | P0-A 后处理管线 + quality 检测             | 0.5 天      |
| 2   | P0-B 粒子 shader（T0/T1）                  | 1 天        |
| 3   | P0-B 粒子 shader（T3/T4/T5/T6）            | 1 天        |
| 4   | P0-C SceneMarkers 四变体                   | 0.5 天      |
| 5   | P1-A 体积光晕（T0/T4/T6）                  | 1.5 天      |
| 6   | P1-B T6 行星真贴图                         | 1 天        |
| 7   | P1-B T7 地球真贴图 + 大气                  | 1 天        |
| 8   | P2-A Rayleigh / P2-B instancing / P2-C LOD | 各 0.5–1 天 |

## 12. 风险

| 风险                           | 应对                                                                        |
| ------------------------------ | --------------------------------------------------------------------------- |
| Bloom 让 HUD 文字发糊          | HUD 用 DOM 层不进 Three 渲染 — 已有架构保证；Bloom 仅作用于 Canvas          |
| 真贴图破坏「零静态资产」目标   | 标记为 Phase 1.5 资产；明确 README 写明许可来源；KTX2 压到极限              |
| 移动端 raymarch 太重           | 自动降级时关闭 VolumeBillboard，回退到现有多层 sphere；写 fallback          |
| shader 在 iOS Safari 不工作    | 用 `precision mediump float`、避免 `discard` 之外的分支                     |
| Bundle 增长超过 +20KB 预算红线 | shader 字符串与 PostFX 都很小；真正大的是贴图（异步） — 不算 initial bundle |

## 13. 不在本次范围

- 不修改 `useTierTransition` 与三种过场动画时长/缓动
- 不修改 `content/cosmos/T*.ts` 任何内容数据
- 不修改 `lib/tier.ts` 的 Tier 元信息
- 不引入新的 3D 库（continue with three.js 0.170 + R3F 9）
- 不动 `/universe/handwritten` 板块（见 [`08-handwritten-implementation.md`](./08-handwritten-implementation.md)）
