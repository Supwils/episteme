---
title: 修改引力理论MOND
titleEn: Modified Newtonian Dynamics (MOND) and Modified Gravity
category: 宇宙学前沿
tags: [MOND, 修改引力, 暗物质替代, 星系旋转曲线, ΛCDM, TeVeS, 相对论性MOND]
updated: 2026-06-13
---

# 修改引力理论 MOND：不需要暗物质的宇宙？

## 概述

1983 年，以色列物理学家莫迪凯·米尔格若姆（Mordehai Milgrom）提出了一个大胆的假设：也许我们不需要看不见的暗物质来解释星系旋转曲线——也许，在极低加速度的情况下，牛顿引力定律本身就需要修正。这就是**修正牛顿动力学**（Modified Newtonian Dynamics, MOND）的核心思想。

MOND 是迄今为止最成功的暗物质"替代理论"之一，在星系尺度上做出了一系列精确、可验证的预言，其中许多已经被后来的观测所证实。然而，它在宇宙学尺度（星系团、CMB 功率谱）面临严重困难，并且缺乏令人满意的相对论推广。

MOND 的历史是一个关于科学中"竞争范式"如何共存的生动案例：它既不是被证伪的失败理论，也不是能完整替代 $\Lambda$CDM 的成熟理论——它是一个在某些方面出奇准确、在另一些方面明显不足的局部理论。

## MOND 的核心假设

### 加速度阈值

MOND 修改牛顿定律在**极低加速度**下的表现。在加速度 $a \gg a_0$ 时，牛顿定律成立；在 $a \ll a_0$ 时，真实加速度与牛顿引力加速度的关系变为：

$$a = \sqrt{a_N \cdot a_0}$$

其中**米尔格若姆加速度** $a_0 \approx 1.2 \times 10^{-10}$ m/s$^2$（$\approx 3.9 \times 10^{-3}$ m/s$^2$/yr，约为太阳系典型加速度的 $10^{-7}$）是 MOND 的关键参数。

一般的插值函数 $\mu(x) = x/(1+x)$（$x = a/a_0$）将两种极限连接起来：

$$\mu(a/a_0) \cdot a = a_N$$

### 解释旋转曲线

MOND 对星系旋转曲线的解释直截了当：在星系外围，恒星受到的引力加速度 $a_N \ll a_0$，实际加速度 $a \approx \sqrt{a_N a_0}$。对于圆形轨道，$v^2/r = a$，结合点质量引力场 $a_N = GM/r^2$：

$$v = (G M a_0)^{1/4}$$

旋转速度与半径无关——完美预言了观测到的"平坦旋转曲线"！而且，这一关系预言了质量-速度的精确关系，即**Tully-Fisher 关系**：$v^4 \propto M$（观测形式为 $L \propto v^4$，Tully & Fisher 1977）。

## MOND 的成功预言

MOND 最令人印象深刻之处在于，米尔格若姆在 1983 年做出了若干精确预言，这些预言在后续观测中得到了证实：

### 重子 Tully-Fisher 关系（BTFR）

MOND 预言旋转速度的四次方与**总重子质量**（恒星+气体）成正比：

$$M_b = \frac{v_f^4}{G a_0}$$

麦克加夫（McGaugh）等人（2000；2012）利用 HI Nearby Galaxy Survey 数据证实，BTFR 的散射极低，$v_f^4 \propto M_b$ 在 $4$ 个数量级的质量范围内成立。这是 MOND 最强的预言成功（McGaugh et al. 2000，_Physical Review Letters_，85，3218）。

### 径向加速度关系（RAR）

MOND 还预言了一个与暗物质分布无关的普遍关系：每个星系中每一点的观测到的质心加速度（$g_{obs}$）与由重子分布计算出的牛顿加速度（$g_{bar}$）之间存在精确的一一对应关系：

$$g_{obs} = g_{bar} / \mu(g_{bar}/a_0)$$

Lelli 等人（2017，_Science_，357，1024）基于 153 个星系的 2693 个数据点，证实了这一**径向加速度关系（RAR）**，散射极低（$\sim 0.13$ dex），是 MOND 最有力的现代证据之一。

然而，$\Lambda$CDM 的拥护者也证明，在考虑暗物质晕和重子物理（反馈、冷却）的数值模拟中，RAR 也可以作为统计涌现关系出现（Navarro et al. 2017），争议仍未终结。

### 外场效应（EFE）

MOND 中有一个牛顿力学没有的效应：**外场效应**（External Field Effect, EFE）。在 MOND 中，一个系统的内部动力学受到外部引力场强度的影响——即使外场是均匀的（在广义相对论和牛顿力学中，均匀外场在自由落体参考系中完全消失）。

EFE 的预言：在强外场（$g_{ext} > a_0$）的宇宙学背景下，星系内部的 MOND 效应被抑制。这预言了在不同宇宙环境中的星系（孤立与群居）应有不同的旋转曲线特征。Chae 等人（2020，_ApJ_，904，51）基于 SPARC 数据库声称检测到了 EFE 信号，但统计显著性仍有争议。

## MOND 的困难

### 子弹星系团（Bullet Cluster）

**子弹星系团**（1E 0657-558）是 MOND 最难解释的天文现象之一。这是两个星系团高速碰撞后的系统：X 射线气体（大部分重子物质）在碰撞中停留在中间，而引力透镜显示质量主体位于两侧——与 X 射线气体分离（Clowe et al. 2006，_ApJL_，648，L109）。

这种"质量与重子物质分离"完全符合暗物质图景（暗物质不参与电磁相互作用，穿越碰撞）。MOND 的支持者提出，可以用**宇宙学中微子**（具有少量质量）来提供额外引力；但这需要额外引入"看不见的热暗物质"，在某种意义上削弱了 MOND 回避暗物质的优势。

### 宇宙学尺度的失败

MOND 在宇宙学尺度上几乎无法工作：

- **CMB 功率谱**：$\Lambda$CDM 以极少的参数精确拟合 CMB 功率谱的所有峰值和谷值，而 MOND 没有等效的宇宙学框架
- **大尺度结构**：MOND 无法解释重子声学振荡（BAO）和星系功率谱而不引入额外组分
- **星系团质量**：即使在 MOND 框架下，星系团中的可见重子物质仍然不足以解释其引力效应（需要约 $2$× 的额外质量）

### 相对论推广的困难

米尔格若姆的原始 MOND 是牛顿力学的修改，不满足相对论协变性。为此发展了若干相对论性 MOND：

- **TeVeS**（Tensor-Vector-Scalar 引力，Bekenstein 2004）：唯一完整的相对论 MOND 框架，但 GW170817 事件（引力波与电磁波几乎同时到达，差值 $< 10^{-15}$）对矢量场的约束已经排除了原始 TeVeS 的大部分参数空间（Boran et al. 2018）
- **AQUAL、QUMOND、Bimetric MOND** 等：各有优缺点，均未达到 $\Lambda$CDM 的宇宙学预言能力

## 当前学界立场

目前，大多数宇宙学家支持 $\Lambda$CDM（暗物质+暗能量）而非 MOND，主要原因是：

1. $\Lambda$CDM 在宇宙学尺度（CMB、BAO、大尺度结构）上的精确成功
2. GW170817 对大多数相对论性 MOND 的严重约束
3. 子弹星系团等质量-重子分离现象的强力论证

然而，MOND 并非被"证伪"——它在星系尺度上的成功（BTFR、RAR）要求任何完整理论（包括 $\Lambda$CDM）给出解释。$\Lambda$CDM 在星系尺度的一些挑战（"小尺度问题"：缺失卫星、过于致密核心、过于明亮卫星等）也尚未完全解决。

一些研究者正在探索"最好的两个世界"的框架，如**超流暗物质**（Superfluids DM，Berezhiani & Khoury 2015），在宇宙尺度表现为粒子暗物质，在星系尺度形成超流态，重现 MOND 现象。

## 跨领域连接

- **暗物质直接探测**（`dark-matter-direct-detection.md`）：MOND 是暗物质粒子搜索的竞争性替代框架
- **暗物质与暗能量**（`../暗物质与暗能量.md`）：宇宙学证据的综述
- **引力透镜**（`../引力透镜.md`）：子弹星系团和其他透镜系统对 MOND 的约束
- **引力波天文学**（`../引力波天文学.md`）：GW170817 对相对论性 MOND 的约束

## 参考文献

- Milgrom, M. (1983). A modification of the Newtonian dynamics as a possible alternative to the hidden mass hypothesis. _The Astrophysical Journal_, 270, 365–370.
- McGaugh, S.S. et al. (2000). The Baryonic Tully-Fisher Relation. _Physical Review Letters_, 85, 3218.
- Lelli, F., McGaugh, S.S. & Schombert, J.M. (2017). One Law to Rule Them All: The Radial Acceleration Relation of Galaxies. _Science_, 357, 1024.
- Clowe, D. et al. (2006). A Direct Empirical Proof of the Existence of Dark Matter. _The Astrophysical Journal Letters_, 648, L109.
- Bekenstein, J.D. (2004). Relativistic gravitation theory for the modified Newtonian dynamics paradigm. _Physical Review D_, 70, 083509.

## 延伸阅读

- Famaey, B. & McGaugh, S.S. (2012). Modified Newtonian Dynamics (MOND): Observational Phenomenology and Relativistic Extensions. _Living Reviews in Relativity_, 15, 10. — MOND 最全面的综述
- Milgrom, M. (2020). MOND vs. dark matter in light of historical parallels. _Studies in History and Philosophy of Science_, 88, 220. — 米尔格若姆本人对 MOND 历史的回顾
- Berezhiani, L. & Khoury, J. (2015). Theory of Dark Matter Superfluidity. _Physical Review D_, 92, 103510. — 超流暗物质，试图统一 MOND 和暗物质
