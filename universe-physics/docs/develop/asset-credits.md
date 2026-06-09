# 资产 Credits

> 第三方素材、字体、科研数据来源的集中清单。每加一项资产，更新这一页。
> 详细的行星纹理映射表见 [`public/textures/planets/CREDITS.md`](../../public/textures/planets/CREDITS.md)。

---

## 1. 行星 / 月球纹理

| 集合         | 来源                   | License       | 备注                                                                                                                                                                        |
| ------------ | ---------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 12 张 2K JPG | **Solar System Scope** | **CC BY 4.0** | mercury / venus / earth(day/night/clouds) / mars / jupiter / saturn(+ring α) / uranus / neptune / moon。原始数据来自 NASA / JPL / USGS。归属链：Solar System Scope → NASA。 |

License 全文：https://creativecommons.org/licenses/by/4.0/
逐文件映射：[`public/textures/planets/CREDITS.md`](../../public/textures/planets/CREDITS.md)

未来若把这 12 张转 KTX2，**保留原文件名**与该 CREDITS 表，并在 `scripts/encode-textures.mjs` 里记录转换 git SHA。

---

## 2. 字体

| 家族           | 用途              | 来源 / License                                     |
| -------------- | ----------------- | -------------------------------------------------- |
| Fraunces       | 拉丁学名 / 主标题 | Google Fonts · SIL Open Font License 1.1           |
| Inter Variable | 正文 / UI         | Google Fonts · SIL Open Font License 1.1           |
| JetBrains Mono | 数据 / 单位胶囊   | JetBrains · SIL Open Font License 1.1              |
| 中文系统栈     | 中文展示          | PingFang SC / Source Han Sans / Songti SC 系统回退 |

加载方式：`src/app/fonts.ts` 用 `next/font/google` 自托管，已设 `display: swap`。中文不预加载 Web Font（包体爆炸），用系统栈兜底。

---

## 3. 科研数据来源 (Universe)

只列**直接被内容引用、用作 dataCards 数值或 sources 链接**的工作。完整 sources 散落在各 `src/content/cosmos/T*.ts`，本表是元层 index。

### 宇宙学与大尺度结构

- **Planck Collaboration 2018** — 宇宙学参数 (`arxiv:1807.06209`)
- **SH0ES / Riess 2022** — 造父-SN Ia H₀ 阶梯 (`arxiv:2112.04510`)
- **BICEP/Keck 2021** — 原初引力波 r < 0.036 上限 (`arxiv:2110.00483`)
- **Bosman 2022** — 再电离 z ≈ 5.3 (`arxiv:2108.03699`)
- **Eisenstein 2005** — SDSS BAO (`arxiv:astro-ph/0501171`)
- **Macquart 2020** — FRB 称重 WHIM (`nature: s41586-020-2300-2`)
- **Bond, Kofman & Pogosyan 1996** — Cosmic web 命名 (`nature: 380603a0`)
- **Springel 2005** — Millennium N-body (`nature: 03597`)
- **Pillepich 2018** — IllustrisTNG (`arxiv:1707.03406`)
- **Schaye 2023** — FLAMINGO (`arxiv:2306.04024`)

### 本宇宙近邻

- **Tully 2014** — Laniakea 流场定义 (`arxiv:1409.0880`)
- **Tully 2023** — CosmicFlows-4 (`arxiv:2209.11238`)
- **Hoffman 2017** — V-web 速度场可视化 (`arxiv:1703.02510`)
- **Karachentsev 2009 / 2013** — 本星系群质量与近邻星系目录
- **Sohn 2020** — M31 HST proper motion + 合并预报 (`arxiv:2004.13780`)
- **Helmi 2018** — Gaia-Sausage-Enceladus 化石 (`arxiv:1806.06038`)
- **Tully 2008** — Local Sheet & Local Void 推动 (`arxiv:0705.4139`)

### 银河系

- **GRAVITY 2019** — Sgr A\* 几何距离 R⊙ = 8.178 kpc (`arxiv:1904.05721`)
- **EHT Collaboration 2022** — Sgr A\* 阴影成像 (`iopscience: 2041-8205/930/2`)
- **Gaia DR3 2023** — 18 亿恒星位置/运动 (`arxiv:2208.00211`)
- **Bovy 2016** — 薄/厚盘 chemo-orbital 分解 (`arxiv:1610.07610`)
- **HI4PI 2016** — 21cm 全天巡天 (`arxiv:1610.06175`)
- **Licquia & Newman 2015** — 银河系 SFR (`arxiv:1407.1078`)

### 恒星近邻 / 系外行星

- **RECONS** — 50 ly 内恒星普查 (`recons.org`)
- **Anglada-Escudé 2016** — Proxima b 发现 (`nature: nature19106`)
- **Gillon 2017** — TRAPPIST-1 七行星 (`nature: nature21360`)
- **Kopparapu 2013** — 主序星宜居带定义 (`arxiv:1301.6674`)
- **NASA Exoplanet Archive** — 系外行星持续维护数据库

### 太阳系与地球

- **NASA Planetary Fact Sheets** — 八行星 + 矮行星基础参数
- **Hartmann & Davis 1975** — 月球 Giant Impact 起源
- **Vine & Matthews 1963** — 海底磁异常 → 板块构造证据 (`nature: 199947a0`)
- **Bekker 2004** — 大氧化事件 Δ³³S 定年 (`nature: nature02260`)
- **IPCC AR6 2023** — 气候综合报告
- **WGS 84** — 地球几何参数标准

---

## 4. 科研数据来源 (Physics)

physics 板块的 sources 与 dataCards 对应到经典工作 + 现代里程碑。逐档列表在 `src/content/physics/P*.ts`，下面只列高密度引用：

- **Feynman 1948** — 路径积分形式 (`rmp: RevModPhys.20.367`)
- **Bell 1964** — EPR 不等式 (`cds.cern.ch:111654`)
- **Wilson 1975 RMP** — RG 与临界现象
- **Veselago 1968** — 负折射率
- **Aharonov-Bohm 1959** — 规范势可观测
- **Pendry 2000s** — Metamaterial
- **Lamb-Retherford 1947** — Lamb shift 测量
- **Hanneke g−2** — 电子 g 因子精密测量
- **Daya Bay** — θ₁₃ 中微子混合 (`PRL`)
- **Kuzmin-Rubakov-Shaposhnikov 1985** — 电弱 Sphaleron
- **Will 2014** — GR 实验综述 (Living Reviews)
- **NIST CODATA** — 物理基础常数
- **BIPM SI** — 2019 SI 重定义

---

## 5. 算法 / 参考实现

- **AME2020** (`Atomic Mass Evaluation 2020`) — `p6-nuclear-particle-hw/Scene.tsx` 的结合能曲线数据点
- **Gamow / Geiger-Nuttall** — `p4-quantum-mechanics-hw` 隧穿曲线
- **3-phase IMR 近似** — `p3-relativity-hw` chirp 波形
- 1-loop RGE β 函数 — `p6` α_s(Q) 流跑曲线

实现细节与 inline comment 在各 Scene 文件里。

---

## 6. 工程依赖（license 摘要）

完整列表见 `pnpm licenses ls`。下面只列商用许可层面值得标注的：

| 包                                         | License                  | 用途                                             |
| ------------------------------------------ | ------------------------ | ------------------------------------------------ |
| next                                       | MIT                      | 框架                                             |
| react / react-dom                          | MIT                      | 框架                                             |
| three                                      | MIT                      | 3D 渲染                                          |
| @react-three/fiber / drei / postprocessing | MIT                      | R3F 生态                                         |
| postprocessing                             | zlib                     | 后处理 effects                                   |
| gsap                                       | GreenSock LMC (使用条款) | 相机/过场动画 — 当前用法在免费层内，商用前需复核 |
| framer-motion                              | MIT                      | UI 动画                                          |
| zustand                                    | MIT                      | 状态                                             |
| zod                                        | MIT                      | 校验                                             |
| tailwindcss v4 / @tailwindcss/postcss      | MIT                      | 样式                                             |

**GSAP 注意**：免费许可允许 SaaS 内嵌使用；纯商品化（如把 GSAP 动画做成模板出售）需要 Club GreenSock 许可。我们当前作为知识站使用，符合免费层。

---

## 7. 更新流程

1. 加新资产先放对应目录 (`public/textures/...` / `public/fonts/...`)。
2. 在该目录补一份 `CREDITS.md` 记录文件级映射（如纹理表）。
3. 回到这份文件追加一行到第 1-5 节合适小节。
4. 内容里引用资产时，在对应 `T*.ts` / `P*.ts` 的 `sources` 数组里也写一行。

**不要**在内容数据里使用未经此清单记录的外部资产。
