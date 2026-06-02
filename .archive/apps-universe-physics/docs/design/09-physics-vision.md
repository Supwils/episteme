# 09 — Physics 板块产品愿景

> **读者**：负责设计或写作 `/physics/*` 板块的产品 / 设计师 / 工程师 / 物理写作者。
> **读完能做什么**：理解为什么要做 Physics 板块、9 档主题主线如何分、每档锚点与深度阶梯、与 Universe 板块的互文关系。具体落地见 [`develop/09-physics-implementation.md`](../develop/09-physics-implementation.md)。架构层接入见 [`10-section-architecture.md`](./10-section-architecture.md)。

## 1. 为什么有 Physics 板块

项目从一开始就是双板块结构（见 `CLAUDE.md` § 1）：

- **Universe** — 宇宙的"地图"。从可见宇宙下钻到地球。
- **Physics** — 宇宙的"语法"。从经典直觉下钻到量子场论。

Universe 让人**感受尺度**，Physics 让人**理解机制**。**两个板块互为镜像**——同样的科学，两种凝视。

设计上要做到：

1. **共用一套视觉语言**（手绘 SVG、字体、HUD、色板）—— 让用户感到"同一座知识图鉴的两条章节"。
2. **不共用尺度**——Universe 是物理空间尺度，Physics 是主题层级与理论深度。强行套同一根 tier 轴会丢掉物理学最重要的"理论分层"语言。
3. **互相引用**——P0 经典力学讲 Kepler 定律时引到 T6 太阳系；P4 量子讲双缝实验时引到 T7 物质；P3 相对论讲宇宙学引力红移时引到 T0 CMB。

## 2. 与 Universe 的关系（互文映射）

| Universe Tier           | Physics Tier                    | 互文点                                             |
| ----------------------- | ------------------------------- | -------------------------------------------------- |
| T0 Observable Universe  | P3 Relativity / P8 Frontier     | CMB 的红移用广义相对论解释；暗能量是 ΛCDM 自由参数 |
| T1 Cosmic Web           | P8 Frontier                     | 大尺度结构形成由暗物质 + 量子涨落引力放大          |
| T4 Milky Way            | P0 Classical / P3 GR            | 旋臂动力学是 N-body 牛顿；Sgr A\* 是 Kerr 解       |
| T5 Stellar Neighborhood | P5 Atomic                       | 恒星光谱分类来自原子能级跃迁                       |
| T6 Solar System         | P0 Classical                    | Kepler 定律、二体问题、潮汐                        |
| T7 Earth                | P2 Electromagnetism / P5 Atomic | 大气电离层、地磁、闪电、卫星通讯                   |

这些互文不是强制硬绑定——只是写作时如果某档物理 narrative 引到天体例子，应当 link 到对应 Universe Tier 的路由。

## 3. 设计调性

**完全沿用** Universe 手绘版的视觉语言（参见 [`08-handwritten-universe.md`](./08-handwritten-universe.md)）：

- 同一套 CSS 变量 `--hw-*`（深空底 / 蓝调底双主题）
- 同一套 SVG 滤镜（3 级 wobble）、纸张纹理、三层水彩晕染
- 同一套字体栈（Fraunces italic 标题 / Inter 正文 / JetBrains Mono 数字）
- 同一套 primitive 组件（WobbleCircle / InkPath / StarSpeck / HandwrittenMarker / HandwrittenLabel / Cartouche）

**新增**：3 个 marker variant 对物理图典专用——`vector`（矢量箭头）/ `wave`（波形 path）/ `orbit`（轨道圈）。

**禁区**（与 Universe 一致）：

- 卡通插画、emoji、教科书蓝绿配色
- 渐变背景（无科学理由）
- 装饰性循环动画

**专属调性细节**：物理板块写作时更偏向"博物图鉴 + 工程绘图"，可以更多用：

- 矢量箭头表达力 / 场 / 动量
- 坐标轴 + 网格线表达相空间、能级图、相图
- 公式刻在卷轴 cartouche 上（如 `L = T − V`、`iℏ∂ψ/∂t = Ĥψ`）
- 拉丁化历史人物名（Newton / Lagrange / Hamilton / Schrödinger / Dirac / Feynman）

## 4. 9 档主题主线

> 排序按"经典到前沿"的物理史与抽象阶梯，不按尺度。每档都有明确的**主题锚点**（hero shot 概念）、**深度阶梯**（本科 → 研究生 → 前沿）、**关键人物**与**与 Universe 的互文链**。

### P0 · Classical Mechanics · 经典力学

| 维度              | 内容                                                                                                      |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| **锚点**          | 单摆 + 弹簧 + 抛体 + 椭圆轨道四联画，Lagrangian 公式刻在卷轴                                              |
| **本科**          | 牛顿三定律、动量 / 能量守恒、简谐振动、Kepler 定律、刚体动力学                                            |
| **研究生**        | Lagrangian / Hamiltonian 形式、Poisson 括号、正则变换、Hamilton-Jacobi、可积系统                          |
| **前沿**          | 经典混沌、KAM 定理、辛几何、流体湍流                                                                      |
| **关键人物**      | Galileo (1632)、Newton _Principia_ (1687)、Euler、Lagrange _Mécanique analytique_ (1788)、Hamilton (1833) |
| **互文 Universe** | T6 太阳系（行星轨道）、T4 银河（N-body 动力学）                                                           |
| **必备常数**      | g = 9.806 65 m/s²（标准重力）、G = 6.674 30(15) × 10⁻¹¹ N·m²/kg²                                          |

### P1 · Thermodynamics & Statistical Mechanics · 热力学与统计力学

| 维度              | 内容                                                                       |
| ----------------- | -------------------------------------------------------------------------- |
| **锚点**          | 卡诺循环 PV 图 + Maxwell-Boltzmann 分布钟形曲线 + 熵增箭头                 |
| **本科**          | 四大定律、卡诺循环、Maxwell-Boltzmann、配分函数、理想气体                  |
| **研究生**        | 系综（微正则 / 正则 / 巨正则）、相变与临界现象、Landau 理论、Ising 模型    |
| **前沿**          | 非平衡热力学、涨落定理（Jarzynski、Crooks）、热黑洞（Hawking）、信息热力学 |
| **关键人物**      | Carnot (1824)、Clausius、Maxwell、Boltzmann、Gibbs、Planck (1900 黑体辐射) |
| **互文 Universe** | T0 CMB 黑体辐射、T6 行星大气热平衡                                         |
| **必备常数**      | k_B = 1.381e−23 J/K、N_A = 6.022e23 /mol、R = 8.314 J/(mol·K)              |

### P2 · Electromagnetism & Optics · 电磁与光

| 维度              | 内容                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| **锚点**          | Maxwell 方程组四行 + 电磁波 sin/cos 平面图 + 衍射条纹                                                  |
| **本科**          | Coulomb / Gauss / Ampère / Faraday 四定律、Maxwell 方程组、Poynting 矢量、波动光学（衍射、干涉、偏振） |
| **研究生**        | 矢势 + 标势、规范变换、推迟势、磁单极、波导、光纤、几何光学/Hamilton 类比                              |
| **前沿**          | 等离子体、激光物理、非线性光学、量子电动力学（QED）                                                    |
| **关键人物**      | Coulomb (1785)、Ampère、Faraday (1831)、Maxwell (1865)、Hertz (1887)、Einstein (光电效应 1905)         |
| **互文 Universe** | T5 恒星光谱、T7 极光与地磁                                                                             |
| **必备常数**      | c = 299,792,458 m/s、ε₀ = 8.854e−12 F/m、μ₀ = 1.257e−6 H/m、e = 1.602e−19 C                            |

### P3 · Relativity · 相对论

| 维度              | 内容                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| **锚点**          | 闵可夫斯基光锥 + 时空弯曲网格 + 黑洞 Penrose 图                                                  |
| **本科**          | 狭义相对论：洛伦兹变换、时间膨胀、长度收缩、E = γmc²、四动量                                     |
| **研究生**        | 广义相对论：等效原理、测地线、爱因斯坦场方程 G*μν = 8πG/c⁴ T*μν、Schwarzschild / Kerr 解、引力波 |
| **前沿**          | 黑洞热力学（Bekenstein-Hawking 熵 S = A/4，自然单位制 ℏ = c = G = kB = 1；国际单位制 S = kB·A·c³ / (4·G·ℏ)）、ADM 形式、数值相对论、引力波天文学                  |
| **关键人物**      | Einstein (狭义 1905 / 广义 1915)、Minkowski、Schwarzschild (1916)、Kerr (1963)、Hawking (1974)   |
| **互文 Universe** | T0 CMB（红移）、T4 银心 Sgr A\*、引力波探测                                                      |
| **必备常数**      | c、G、Schwarzschild 半径 r_s = 2GM/c²                                                            |

### P4 · Quantum Mechanics · 量子力学

| 维度              | 内容                                                                                                                                         |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **锚点**          | 双缝干涉 + 势阱能级阶梯 + Bloch 球 + 算符 Ĥ\|ψ⟩ = E\|ψ⟩                                                                                      |
| **本科**          | de Broglie 波长、Schrödinger 方程、波函数、概率诠释、不确定性原理、谐振子、氢原子                                                            |
| **研究生**        | bra-ket 形式、算符代数、Heisenberg / Schrödinger / 相互作用 picture、自旋、密度矩阵、纠缠、Bell 不等式                                       |
| **前沿**          | 退相干、弱测量、量子信息（qubit / qudit / gate set）、量子误差纠错、量子超越性                                                               |
| **关键人物**      | Planck (1900)、Einstein (1905)、Bohr (1913)、de Broglie (1924)、Heisenberg (1925)、Schrödinger (1926)、Dirac、Born、von Neumann、Bell (1964) |
| **互文 Universe** | T5 恒星核合成、T1 原初涨落                                                                                                                   |
| **必备常数**      | ℏ = 1.055e−34 J·s、h = 6.626e−34 J·s、α ≈ 1/137                                                                                              |

### P5 · Atomic & Molecular · 原子与分子

| 维度              | 内容                                                                                                        |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| **锚点**          | 氢原子轨道 1s/2s/2p/3d + 元素周期表 + 双原子分子势能曲线                                                    |
| **本科**          | Bohr 模型、氢原子精确解、量子数 n/ℓ/m/s、Pauli 不相容、元素周期律、分子轨道、化学键                         |
| **研究生**        | 多电子原子 Hartree-Fock、Slater 行列式、自旋-轨道耦合、Zeeman / Stark 效应、振转光谱、Born-Oppenheimer 近似 |
| **前沿**          | 冷原子、玻色-爱因斯坦凝聚、光晶格、量子模拟、Rydberg 原子                                                   |
| **关键人物**      | Mendeleev (1869)、Rutherford (1911)、Bohr (1913)、Pauli (1925)、Schrödinger (1926 氢原子)、Slater、Mulliken |
| **互文 Universe** | T5 恒星光谱分类、T7 大气分子                                                                                |
| **必备常数**      | Rydberg R = 1.097e7 /m、Bohr 半径 a₀ = 5.292e−11 m                                                          |

### P6 · Nuclear & Particle · 原子核与粒子

| 维度              | 内容                                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **锚点**          | 原子核（质子 / 中子）+ 粒子动物园（lepton / quark / gauge boson）+ 衰变图                                                 |
| **本科**          | 核结构（液滴模型、壳模型）、α/β/γ 衰变、半衰期、裂变 / 聚变、宇宙线                                                       |
| **研究生**        | Yukawa 介子论、强相互作用、夸克模型、SU(3) flavor、深度非弹性散射、QCD 渐进自由                                           |
| **前沿**          | 重离子物理、夸克-胶子等离子体（QGP）、新强子谱、奇特态（XYZ 介子）                                                        |
| **关键人物**      | Rutherford (1911)、Chadwick (1932 中子)、Yukawa (1935)、Gell-Mann (夸克 1964)、Wilczek-Gross-Politzer (QCD 渐进自由 1973) |
| **互文 Universe** | T5 恒星核合成、T0 大爆炸核合成（BBN）、T6 太阳质子-质子链                                                                 |
| **必备常数**      | m_p = 1.673e−27 kg、m_n = 1.675e−27 kg、强耦合 α_s                                                                        |

### P7 · Standard Model & Quantum Field Theory · 标准模型与量子场论

| 维度                       | 内容                                                                                                                         |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **锚点**                   | 标准模型粒子表（3 代 lepton + 3 代 quark + 4 gauge boson + Higgs）+ Feynman 图 + Lagrangian 卷轴                             |
| **本科**（已要求 QM 基础） | 群论 / 对称性入门、电弱统一框架、Feynman 图阅读                                                                              |
| **研究生**                 | 路径积分、规范场论 SU(3) × SU(2) × U(1)、Higgs 机制、自发对称性破缺、CKM 矩阵、重整化群                                      |
| **前沿**                   | 超越标准模型（BSM）：超对称、大统一、味物理、中微子振荡、CP 破坏                                                             |
| **关键人物**               | Yang-Mills (1954)、Glashow-Salam-Weinberg (电弱)、't Hooft-Veltman（重整化）、Higgs (1964)、CERN ATLAS+CMS (Higgs 发现 2012) |
| **互文 Universe**          | T0 原初核合成、T1 早期宇宙暴胀                                                                                               |
| **必备常数**               | Higgs 质量 m_H ≈ 125 GeV、W/Z 质量、α_em / α_s 在 m_Z 处取值                                                                 |

### P8 · Frontier · 前沿（候选话题集合）

不是单一主题，而是当代物理研究最活跃的几个方向（用户可选其中 3–5 个深入）：

- **量子引力**：弦论、圈量子引力、ADS/CFT 全息
- **凝聚态前沿**：拓扑相、Majorana 费米子、高温超导、quantum spin liquid
- **量子信息**：误差纠错码、容错量子计算、量子优势实验
- **暗物质 / 暗能量**：WIMPs、轴子、修改引力（MOND）
- **多体物理**：mesoscopic、非平衡相变、玻璃态
- **AI for science**：神经网络求解 Schrödinger、变分蒙特卡洛、AlphaFold-like
- **量子热力学** / **黑洞信息悖论**

P8 不要求"完备覆盖"——选 3–5 个用户最关心的话题，每个做出"半页综述"级别即可。

## 5. 深度阶梯设计

每档内容应分三层呈现（不强制三层全做，但写作时心里要有这个梯度）：

| 层级       | 读者                             | 内容形式                            | 篇幅占比 |
| ---------- | -------------------------------- | ----------------------------------- | -------- |
| **直觉层** | 中学生 / 本科低年级 / 跨领域读者 | 比喻、图像、历史故事                | 30%      |
| **学院层** | 本科 / 研究生                    | 公式、推导、教科书索引              | 50%      |
| **前沿层** | 研究生 / PhD / 研究人员          | review 论文索引、未解问题、当代实验 | 20%      |

知识面板的 `narrative` 字段（3–8 段）按这个梯度组织段落，先讲故事再上公式再点未解之谜。

**叙事节奏**（每段 200–400 字）：

1. **直觉钩子**——一句反直觉/惊人的话开场
2. **历史 / 实验 / 现象**——物理是怎么被发现的
3. **形式化**——公式、推导、关键步骤
4. **当代联系**——这条理论今天还在哪里用、哪里被推翻
5. **延伸阅读**——精确指向 sources 数组里的几篇

## 6. 数据卡（dataCards）写作规范

每档至少 4–8 个 dataCard，覆盖：

- **核心常数** 2–3 个：单位明确，带 ± 不确定度（如 G = 6.674 30(15) × 10⁻¹¹ N·m²/kg²）
- **关键公式** 1–2 个：标签写"公式名"，value 写 LaTeX-style 表达式（用 unicode 字符避免引入 KaTeX 依赖）
- **守恒量 / 不变量** 1–2 个：能量、动量、电荷、重子数等
- **特征尺度** 1–2 个：能量、长度、时间的典型量级

示例（P0）：

```ts
dataCards: [
  { label: "万有引力常数", latinLabel: "G", value: "6.674 30 × 10⁻¹¹", hint: "N · m² / kg²" },
  { label: "重力加速度", latinLabel: "g", value: "9.806 65", hint: "m / s²（地表标准值）" },
  { label: "Lagrangian", latinLabel: "L", value: "T − V", hint: "动能减势能" },
  { label: "最小作用量", latinLabel: "δS = 0", value: "δ∫L dt = 0", hint: "Hamilton 原理" },
  { label: "Kepler 第三定律", value: "T² ∝ a³", hint: "周期平方正比于半长轴三次方" },
];
```

## 7. Sources 引用规范

每档至少 2–10 条权威来源。**优先顺序**：

1. **经典教科书**（Goldstein、Landau-Lifshitz、Griffiths、Sakurai 等）—— 标记 `kind: "encyclopedia"`
2. **公开课**（MIT OCW、Stanford、PHY 系列）—— 标记 `kind: "encyclopedia"`
3. **综述论文**（Physics Reports、Rev. Mod. Phys.、arXiv review）—— 标记 `kind: "paper"`
4. **实验机构**（CERN、LIGO、LHCb 等）—— 标记 `kind: "agency"`

URL 必须可点开（无 paywall 时优先选 open access）。

## 8. Marker 视觉变体（针对物理图典）

详见 [`develop/09-physics-implementation.md`](../develop/09-physics-implementation.md) § 3。本节列出语义：

| variant             | 视觉                | 物理含义                 | 例子                    |
| ------------------- | ------------------- | ------------------------ | ----------------------- |
| `vector`            | 带箭头的线段        | 力 / 速度 / 动量 / 场强  | 重力 g↓、电场 E、动量 p |
| `wave`              | 一段正弦波 path     | 波函数 / 电磁波 / 概率波 | ψ(x)、光波、声波        |
| `orbit`             | 椭圆或圆 + 中心小点 | 原子轨道 / 行星轨道      | 1s 轨道、地球绕日       |
| `halo`（已有）      | 软光球              | 通用焦点对象             | 关键概念中心点          |
| `diamond`（已有）   | 菱形                | 标记/锚点                | 历史事件、定理          |
| `starpoint`（已有） | 十字星 + 中心       | 临界点 / 关键点          | 相变、奇点              |
| `pin`（已有）       | 针 + 圆             | 地理 / 历史 / 固定位置   | 具体实验地点、年份      |

## 9. 9 档手绘构图脚本（高层概念）

详细像素级构图见 [`develop/09-physics-implementation.md`](../develop/09-physics-implementation.md) § 6。本节给出每档的视觉锚定：

| Tier            | 主构图（一句话）                                       | 关键装饰                                       |
| --------------- | ------------------------------------------------------ | ---------------------------------------------- |
| **P0 经典**     | 四象限：单摆 \| 弹簧 \| 抛体 \| 椭圆 + 中心 Lagrangian | 相空间 portrait、卷轴公式、动量箭头 vector     |
| **P1 热统**     | 卡诺循环 PV 图 + 钟形分布 + 熵箭头                     | 等温线 / 绝热线、温度计、Maxwell 速率分布 wave |
| **P2 电磁**     | Maxwell 四方程卷轴 + 平面波 + 衍射条纹                 | 电场 / 磁场 vector grid、光锥提示              |
| **P3 相对论**   | 闵可夫斯基光锥 + 时空网格弯曲 + Schwarzschild 黑洞     | 测地线 InkPath、γ 因子标尺                     |
| **P4 量子**     | 双缝干涉 + 势阱能级 + Bloch 球 + ⟨ψ\|Ĥ\|ψ⟩ 卷轴        | wave variant、orbit variant、不确定性条带      |
| **P5 原子**     | 氢原子轨道 1s/2p/3d + 周期表片段 + 能级跃迁            | orbit variant、Bohr 半径标尺、光谱线           |
| **P6 核子**     | 核（质子+中子团）+ 衰变树 + 粒子动物园四象限           | α/β/γ 衰变 vector、半衰期标尺                  |
| **P7 标准模型** | 粒子表 3 代 + Feynman 图 + Higgs 势                    | Yang-Mills Lagrangian 卷轴、对称性破缺示意     |
| **P8 前沿**     | 拼贴：弦论 / Bekenstein / 拓扑序 / 暗物质              | 主题分区，每个 ~ 1/4 画面                      |

## 10. 不允许的事（重申 + 物理专属）

- 数学公式排版用 KaTeX / MathJax —— 本期**禁止**引入，所有公式用 Unicode 字符或 SVG 文字
- 不在 narrative 里贴大段 LaTeX 源码（保留 plain text 易读性）
- 不使用未经审稿的"民科"理论作为 sources
- 物理常数必须带单位且基于 CODATA 2022 推荐值
- 历史人物名拉丁化为主（中文译名作 secondary，避免歧义：Schrödinger / 薛定谔）
- 不引入"灵性物理"、"意识折叠波函数"等非科学解读

## 11. 验收 Checklist（每档完成后核对）

- [ ] dataCards ≥ 4，全部带单位 / hint
- [ ] narrative ≥ 3 段，每段直觉 → 形式 → 联系完整闭环
- [ ] sources ≥ 2，URL 可点
- [ ] 手绘场景含 Cartouche、≥ 3 类视觉元素（轨迹 / 公式 / 标尺 / marker）
- [ ] 至少使用 1 个新 variant marker（vector / wave / orbit）
- [ ] 与 Universe 至少 1 处互文 link
- [ ] 通过 `lint:content`（Zod schema 校验）
- [ ] 无 emoji、无未审稿"民科"、无 KaTeX 依赖
