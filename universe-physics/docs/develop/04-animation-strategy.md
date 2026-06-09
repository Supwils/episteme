# 04 — 动画与渲染策略

> 这份是工程上最难也最关键的文档。设计目标见 `docs/design/04-universe-experience.md`。

## 1. 职责划分

| 范畴                                                  | 引擎                                                  | 触达对象                   |
| ----------------------------------------------------- | ----------------------------------------------------- | -------------------------- |
| Three 相机 (position / quaternion / fov)              | **GSAP**                                              | `<Canvas>` 内的 camera ref |
| Three 场景物体 (材质 opacity、shader uniforms、scale) | **GSAP**                                              | mesh / material ref        |
| DOM HUD / 面板 / 文字浮现                             | **Framer Motion**                                     | React DOM                  |
| 数字滚动 / 单位过渡                                   | **Framer Motion** (`useMotionValue` + `useTransform`) | DOM                        |
| 一次性 CSS 装饰                                       | 原生 CSS transition / keyframes                       | DOM                        |

**禁止**用 Framer Motion 操作 Three 对象，反之亦然。

## 2. 跨 Tier 过场实现

三种过场 (zoom / dissolve / tunnel) 都封装成一个 React Hook：

```ts
useTierTransition({
  from: TierId,
  to: TierId,
  kind: "zoom" | "dissolve" | "tunnel",
  duration?: number,        // 默认按 §3 的表
  onProgress?: (p: number) => void,
  onComplete?: () => void,
}): void;
```

内部用 GSAP timeline 串联：

```
phase 1: prepare (load next tier assets, mark transition.active = true)
phase 2: animate camera + cross-fade scenes
phase 3: settle (dispose old scene, mark transition.active = false)
```

期间 `useUniverseStore.transition` 持续更新，让 HUD 也能反应进度 (例如尺度刻度滚动)。

## 3. 时长表 (默认值)

| Kind     | 时长   | 缓动                                 |
| -------- | ------ | ------------------------------------ |
| zoom     | 1200ms | `power2.inOut`                       |
| dissolve | 1500ms | `power3.out` 出场, `power2.in` 入场  |
| tunnel   | 1800ms | `power4.in` 加速 / `power3.out` 落定 |

`prefers-reduced-motion`：全部 → 200ms，缓动 `linear`，且跳过中间过场动画 (直接换场景)。

## 4. 持久 Canvas 与场景切换

`<Canvas>` 在 `/universe` layout 上挂载，整个板块生命周期内不卸载。

```tsx
<Canvas>
  <Suspense fallback={<LoadingFallback />}>
    <ActiveScene tier={currentTier} />
  </Suspense>
  <CameraRig />
  <PostFx />
</Canvas>
```

`ActiveScene` 是路由器，根据 `currentTier` 渲染对应 Tier 的场景。**切换时 dissolve / tunnel 过场期间，旧场景仍存在**，等过场到 ~ 60% 时旧场景才开始 fade-out + dispose。

## 5. 相机系统

`CameraRig` 持有相机引用并暴露:

```ts
type CameraRigApi = {
  flyTo(target: Vector3, distance: number, fov?: number, duration?: number): gsap.core.Timeline;
  orbit(center: Vector3, radius: number, options?: OrbitOpts): void;
  enableUserControl(enabled: boolean): void;
};
```

- `flyTo` 是基础：返回一个 GSAP timeline，可以被外部串联进过场 timeline。
- 用户控制 (OrbitControls) 与过场互斥：过场时强制 disable。
- 每个 Tier 的舒适距离配置在 `lib/tier.ts`。

## 6. 大尺度结构的渲染

### 6.1 点云 (星系、恒星)

- 用 `THREE.Points` + ShaderMaterial。
- 颜色按光谱型 / 红移 (T2+) 编码到 attribute。
- size 在 vertex shader 里随距离调整 (尺寸守恒)。
- 数量级：T1/T2 < 50k 点，T4 银河系 < 200k 点 (移动端 < 50k)。

### 6.2 实例化几何 (星系团内的星系作为可点击对象)

- 用 `InstancedMesh` (drei 的 `<Instances>`)。
- 命中检测用 BVH (`@react-three/drei` 的 `useBVH` 或 `three-mesh-bvh`)。

### 6.3 Cosmic Web 纤维

- 用程序化生成的曲线 + GPU instanced segments，**不**做真实 N-body 数据复现 (Phase 2 评估)。
- 用一张低频噪声纹理调密度。

### 6.4 太阳系 (T6)

- 行星按真实距离，但提供"压缩刻度"开关 (默认开启)，避免视觉上"找不到外行星"。
- 切到 T7 时，从行星轨道点位向行星表面 `flyTo`。

### 6.5 行星 (T7)

- 单 mesh + diffuse + normal + (可选) cloud layer。
- glTF / glb 资源 ≤ 1 MB / 行星 (texture 压缩 + Draco)。

## 7. LOD (Level of Detail)

每个 Tier 内部还有 LOD：

- 相机距离近 → 高分辨率 (例如 T4 接近星系中心时换 spiral arm mesh)。
- 相机距离远 → 退化为点云 / sprite。

LOD 切换用 dissolve (200ms)，避免 popping。

## 8. Post-processing 预算

| 效果        | Desktop                          | Mobile |
| ----------- | -------------------------------- | ------ |
| Bloom       | ✓ (threshold 1.0, intensity 0.6) | ✗      |
| Vignette    | ✓ (subtle)                       | ✓      |
| DoF (Bokeh) | 仅 T6/T7                         | ✗      |
| FXAA        | ✓                                | ✓      |
| SMAA / TAA  | 待评估                           | ✗      |

Mobile 自动降级条件：DPR < 2 或检测到低端 GPU (粗略 `navigator.hardwareConcurrency < 4`)。

## 9. 进入新 Tier 的资源加载

```
T_prev 用户触发下钻
↓
mark transition.active = true
↓
[并行] 拉起下一 Tier 的代码 chunk + 主纹理
↓
启动过场动画 (zoom / dissolve / tunnel)
↓
过场到 50% 时挂载新 Scene (此时资源已就绪或接近就绪)
↓
60% 开始旧 Scene fade
↓
100% 销毁旧 Scene，user control 启用
```

如果资源 1.5s 内还没好，过场停在 "70% + tunnel 中段循环 1 拍" 状态，文案"加载中"。再不行 fallback 占位 + toast。

## 10. 帧率与降级

- 目标：60 fps (Desktop) / 30 fps (Mobile)。
- 监测：`THREE.WebGLRenderer.info` + 简易 RAF stats，开发期常驻角落。
- 自动降级触发：连续 60 帧 fps < 45 → 关闭 Bloom，粒子数 -50%，DPR cap 1。
- 用户可手动切"性能 / 画质"。

## 11. 入站动画 (Splash)

`/` 上的入站序列由 GSAP 编排：

```
0.0s 黑屏 + 单点淡入
0.8s 镜头开始拉远, 点变小, 旁边出现兄弟点
2.0s 暗示纤维形成 (低密度点云)
3.5s 全可见宇宙球初见, HUD 准备淡入
5.0s 球壳缓慢自转, HUD 淡入
6.5s 跳过按钮可点击, 自动 7.5s 后路由 /universe/observable
```

可在 1.0s 后任何时刻点 "Skip"，立刻路由。
