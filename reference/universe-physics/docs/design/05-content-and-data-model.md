# 05 — 内容与数据模型

## 1. 内容的两类来源

1. **结构化数据 (data)** — 可计算、可渲染的科学量。位置、质量、距离、半径、温度、光谱型等。
2. **叙事内容 (content)** — 一段段人写的文字，介绍对象与机制。

两类东西**分开存**，永远不要混在一个文件里。

## 2. 目录约定

```
src/content/
  cosmos/                          # 结构化数据
    tiers.json                     # Tier 元信息 (id, label, unit, scale-meters, ...)
    objects/
      observable-universe.json
      cosmic-web.json
      laniakea.json
      local-group.json
      milky-way.json
      solar-system.json
      planets/
        earth.json
        mars.json
        ...
    catalogs/
      nearby-galaxies.json         # 大型清单
      bright-stars-50ly.json
      ...
  stories/                          # 叙事 MDX
    universe/
      observable.mdx
      cosmic-web.mdx
      laniakea.mdx
      ...
```

数据文件**只有数据**，故事文件**只有文字 + 引用结构化数据的 id**。

## 3. 对象模型 (CosmicObject)

每个被渲染或被点击的实体都符合下面这个 schema (TypeScript 风格描述)：

```ts
type CosmicObject = {
  id: string;                       // kebab-case, globally unique, e.g. "laniakea"
  tier: TierId;                     // "T2", "T3", ...
  type: "supercluster" | "cluster" | "group" | "galaxy" | "star"
       | "planet" | "moon" | "asteroid-belt" | "structure" | ...;
  names: {
    primary: string;                // 中文/英文主名
    aliases?: string[];
  };

  // 空间属性 (Tier-local coordinates, see §4)
  position?: [x: number, y: number, z: number];
  scaleMeters?: number;             // 对象自身典型尺寸 (米)

  // 物理量 (可选，按对象类型选填)
  mass?: { value: number; unit: "kg" | "Msun"; uncertainty?: number };
  radius?: { value: number; unit: "m" | "km" | "Rsun" | "Rearth" };
  distanceFromEarth?: { value: number; unit: "ly" | "Mpc" | "AU" | "km" };
  temperature?: { value: number; unit: "K" };
  spectralType?: string;            // 仅恒星
  composition?: Record<string, number>;  // 仅行星 / 卫星

  // 关系
  parent?: string;                  // 上级对象 id
  children?: string[];              // 下钻目标 id 列表

  // 渲染提示
  rendering: {
    asset?: string;                 // glb / 纹理路径
    color?: string;                 // 默认色
    glowIntensity?: number;
  };

  // 引用
  sources: { label: string; url: string }[];  // 至少 1 个权威源
};
```

字段缺失允许，但 `id` / `tier` / `type` / `names.primary` 必填。

## 4. 坐标系统

**不要**用全宇宙统一坐标系。理由：从 mm 到 Gpc 跨 28 个数量级，IEEE 754 双精度都撑不住。

每个 Tier 用**自己的局部坐标系**：

| Tier | 单位                    | 原点           |
| ---- | ----------------------- | -------------- |
| T0   | 相对单位 (球壳半径 = 1) | 我们 (太阳系)  |
| T1   | Gpc                     | 我们           |
| T2   | Mpc                     | 该超星系团重心 |
| T3   | Mpc                     | 该群/团重心    |
| T4   | kpc                     | 星系中心       |
| T5   | pc                      | 太阳           |
| T6   | AU                      | 太阳           |
| T7   | km (或 R_planet)        | 行星中心       |

跨 Tier 切换时，旧场景销毁，新场景按新单位重建。

## 5. 内容写作规则

- **每篇 MDX 最长 ~ 600 字**。再长拆 section 或拆成多个对象。
- 数字必须给单位，且优先使用该 Tier 的单位 (例：T6 用 AU 不用 km)。
- 涉及"目前主流估算"的数字必须给出来源 (`sources` 里至少一条)。
- 名词第一次出现，中文 + 英文括注：例 "Laniakea 超星系团 (Laniakea Supercluster)"。
- 不要写"令人震撼""浩瀚无边"这种空话。让数字和图自己震撼。

## 6. 数据来源 (推荐顺序)

1. **NASA / JPL** — 行星、卫星、太阳系 ephemeris。
2. **ESA / Gaia DR3** — 恒星位置与运动。
3. **NED** (NASA/IPAC Extragalactic Database) — 银河系外天体。
4. **arXiv 综述论文** — 大尺度结构、Laniakea 原始定义 (Tully+ 2014)。
5. **Wikipedia** — 入门级聚合，**只作为索引**，不作为唯一来源。

每加入一个新对象，在 `sources` 字段里至少留一个 1 或 2 类来源。

## 7. 内容审查清单 (Content Linter)

提交前过这一遍：

- [ ] 所有数字带单位
- [ ] 所有"目前估算"类数字有 `sources`
- [ ] 中英文专有名词第一次出现成对
- [ ] 没有形容词式空话
- [ ] 长度 < 600 字
- [ ] 没有未定义的内部 id 引用 (拼写错的 `parent` / `children`)

后续可以加一个 `scripts/lint-content.mjs` 做自动检查。
