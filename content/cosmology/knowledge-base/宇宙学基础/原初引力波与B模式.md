---
title: 原初引力波与 B 模式偏振
titleEn: Primordial Gravitational Waves and B-mode Polarization
category: 宇宙学基础
tags: [原初引力波, B模式偏振, 暴胀, 张量标量比, CMB偏振, BICEP, LiteBIRD]
updated: 2026-06-13
status: published
---

# 原初引力波与 B 模式偏振

## 概述

原初引力波（Primordial Gravitational Waves）是宇宙暴胀时期量子涨落产生的时空度规张量扰动。与密度涨落（标量扰动）不同，原初引力波是纯张量性质的，其唯一可观测特征是在宇宙微波背景（CMB）偏振中留下的**B 模式**（旋度模式）偏振图案。探测原初引力波的 B 模式是现代宇宙学最重要的实验目标之一——它将直接证实暴胀的发生，确定暴胀的能量尺度，并开创宇宙学引力波天文学。

## 物理基础

### 从暴胀到引力波

在暴胀时期，时空度规的张量扰动 $h_{ij}$ 满足：

$$\ddot{h}_{ij} + 3H\dot{h}_{ij} - \frac{\nabla^2}{a^2} h_{ij} = 0$$

与标量场的量子涨落类似，张量涨落在暴胀时期从量子真空中被放大，冻结于超视界尺度，并在之后的宇宙历史中成为经典引力波背景。张量功率谱：

$$\mathcal{P}_T(k) = \frac{2H^2}{\pi^2 M_{Pl}^2} \bigg|_{k=aH}$$

### 张量-标量比 $r$

张量功率谱与标量功率谱之比为张量-标量比 $r$：

$$r = \frac{\mathcal{P}_T}{\mathcal{P}_s} \approx 16\varepsilon$$

其中 $\varepsilon = -\dot{H}/H^2$ 是慢滚参数。$r$ 直接关联暴胀时期的能量尺度：

$$V^{1/4} \approx 6.3 \times 10^{16} \left(\frac{r}{0.01}\right)^{1/4} \text{ GeV}$$

例如，Starobinsky 模型预言 $r \approx 0.003$，对应暴胀能标约 $V^{1/4} \approx 2 \times 10^{16}$ GeV，接近大统一理论（GUT）能标。

### CMB 偏振的 E 模式和 B 模式

CMB 的线偏振场可以分解为两种无旋量：

- **E 模式**（梯度模式）：由标量密度涨落产生，类似电场线（收敛/发散型）
- **B 模式**（旋度模式）：无法由标量涨落在线性阶产生，只能来自张量扰动（原初引力波）或引力透镜效应（E 模式被扭曲）

这一性质使 B 模式成为原初引力波的"干净"探测器——在去除透镜贡献后，残余 B 模式几乎完全来自原初张量扰动（加上前景）。E 模式和 B 模式的功率谱通常表示为 $C_\ell^{EE}$ 和 $C_\ell^{BB}$。

## 实验历程

### BICEP2 事件（2014 年）

2014 年 3 月，哈佛-史密森天体物理中心（CfA）发布了 BICEP2 实验的结果，声称在南极洲中频 150 GHz 观测到 B 模式信号，对应 $r = 0.20^{+0.07}_{-0.05}$——远高于理论预期，暗示暴胀能标约 $10^{16.5}$ GeV。

这一结果引发了全球轰动，被多家媒体誉为"近年来最重要的科学发现"。然而，随后的分析表明：

- 银河系尘埃也产生 B 模式偏振，且在 BICEP2 覆盖的频率和区域中被严重低估
- 2015 年，Planck+BICEP2 联合分析将信号重新解释为与尘埃污染完全一致的结果，排除了大 $r$ 值
- 科学发布前的"实时直播"和过于激进的媒体宣传引发了关于科学传播方式的反思

BICEP2 事件是近代科学史中一次重要的"预发布"教训。

### 当前最佳约束（BICEP/Keck 2018）

BICEP/Keck 合作组使用多频段（95、150、220 GHz）数据去除尘埃前景后，给出：

$$r_{0.05} < 0.036 \text{（95\% 置信度，BK18，Keck Array + BICEP3，2021）}$$

结合 Planck 和 WMAP 数据，约束进一步收紧至同量级。这已排除了预言 $r > 0.04$ 的大部分暴胀模型（包括简单的 $\phi^2$ 暴胀）。

## 探测挑战

### 前景污染

原初 B 模式的主要"噪声"来源：

1. **银河系尘埃偏振辐射**：尘埃颗粒沿磁场方向排列，产生偏振热辐射。在高频（$> 100$ GHz）占主导。
2. **银河系同步辐射**：相对论性电子在银河磁场中的辐射，在低频（$< 100$ GHz）占主导。
3. **引力透镜 B 模式**：宇宙大尺度结构将 E 模式"旋转"成 B 模式，在小尺度（$\ell > 100$）占主导。

去除前景需要多频段观测，通过前景的频率依赖特征（尘埃的修正黑体谱、同步辐射的幂律谱）将其与 CMB 分离。引力透镜 B 模式可通过"去透镜"（delensing）技术部分去除（CMB-S4 目标去除效率 $> 90\%$）。

### 灵敏度需求

Starobinsky 模型的 $r \approx 0.003$ 对应极微弱的 B 模式信号。相比之下，前景和透镜 B 模式在许多角尺度上比原初 B 模式强 10-100 倍。达到 $\sigma(r) \sim 0.001$ 需要：

- 数百万像素级别的探测器（百万级 bolometer 阵列）
- 厘米精度的系统误差控制
- 深度多频段天空覆盖（去前景）
- 精确的去透镜处理

## 下一代实验

| 实验               | 类型          | 目标灵敏度                       | 时间      |
| ------------------ | ------------- | -------------------------------- | --------- |
| BICEP Array        | 地面（南极）  | $\sigma(r) \sim 0.003$           | 2025-2030 |
| CMB-S4             | 地面（多点）  | $\sigma(r) \sim 0.001$，去透镜后 | 约 2029+  |
| LiteBIRD（日本）   | 太空（L2 点） | $\sigma(r) \sim 0.001$，全天     | 约 2032   |
| Ali CMB-PL（中国） | 地面（西藏）  | 中间灵敏度                       | 约 2027   |

CMB-S4 和 LiteBIRD 的联合目标是达到 $\sigma(r) \sim 0.001$，足以探测或排除 Starobinsky/Higgs 暴胀模型（$r \approx 0.003$）。

## 原初引力波背景与 LISA、PTA

原初引力波不仅体现在 CMB B 模式，还形成随机引力波背景（SGWB），但频率比 CMB B 模式探测的更宽泛：

- **CMB B 模式**：探测频率约 $10^{-18}$ Hz（对应大尺度 CMB 模）
- **脉冲星计时阵（PTA）**：约 $10^{-9}$ Hz（IPTA、NANOGrav、CPTA）
- **LISA（欧空局激光干涉仪太空天线）**：约 $10^{-3}$-$10^{-1}$ Hz
- **LIGO/Einstein Telescope**：约 10-1000 Hz

来自暴胀的标准随机引力波背景在高频处信号极弱（谱指数约 $n_T \approx -r/8 \approx -0.0004$），远低于 LIGO 等的当前探测能力。NANOGrav 2023 发现的随机引力波背景信号（Hellings-Downs 相关，$\sim 3 \times 10^{-9}$ Hz）目前最可能来自超大质量黑洞双星并合，而非原初引力波，但一些论文探讨了部分原初贡献的可能性。

## 跨域连接

- **[[弱引力透镜与宇宙剪切|弱引力透镜与宇宙剪切]]**：这种偏振并非只有原初来源。**大尺度结构的透镜会把梯度型偏振"扭"成旋度型，这个次级信号已被测到，且在小角尺度上占主导**，必须先重建透镜势再减掉。去透镜效率因此成了灵敏度的硬上限之一。
- **[[polarization|偏振]]**：最致命的前景是银河系尘埃：颗粒沿磁场排列，热辐射带偏振，同样产生旋度型分量。**分离靠频率依赖——尘埃近似修正黑体、同步辐射是幂律、背景是黑体**，所以波段数不足时原则上无法唯一分解。二〇一四年的教训正出在这里。
- **[[remote-sensing-and-gis|遥感与GIS]]**：多波段成像做大气与地表校正用的是同一套思路：不同成分谱形不同，波段够多才能解开混合。**通则是待分离的成分数不能超过独立波段数**，否则解不唯一——这条约束比探测器噪声更根本。
- **[[principal-component-analysis|主成分分析]]**：盲源分离常用来在不假设前景模型的情况下扣除它，代价是成分数必须人为选定。**选多了会把信号吃掉，选少了会留下残差**，而两种错误在功率谱上的表现都像一个小的张量-标量比，使系统误差与信号在形式上难以区分。
- **[[replication-crisis|可重复性危机]]**：有团队曾在独立复核之前就按"发现"发布，随后被证明与尘埃污染一致。**教训不是算错了，而是发布流程把一个未经独立频段验证的结果推到了发现的位置上**——此后该领域的规范明显收紧。

## 为什么这很重要

如果 CMB B 模式被探测到，将是物理学史上最重要的发现之一：

1. **直接证实暴胀的发生**——宇宙早期存在指数级加速膨胀阶段
2. **确定暴胀的能量尺度**——将暴胀与某类大统一理论联系起来
3. **首次探测原初量子引力效应**——时空本身的量子性留下的宏观痕迹

如果最终未能探测到（即使到 $r < 0.001$），则大量简单暴胀模型被排除，宇宙学家需要考虑更复杂的暴胀机制、弹跳宇宙、或其他无原初引力波的替代理论。无论结果如何，B 模式探测都是对宇宙起源理论的决定性检验。

## 参考文献

- Kamionkowski, M. & Kovetz, E.D. (2016). The Quest for B Modes from Inflationary Gravitational Waves. _Annual Review of Astronomy and Astrophysics_, 54, 227.
- BICEP/Keck Collaboration (2021). Improved Constraints on Primordial Gravitational Waves using Planck, WMAP, and BICEP/Keck Observations. _Physical Review Letters_, 127, 151301.
- CMB-S4 Collaboration (2016). CMB-S4 Science Book, First Edition. arXiv:1610.02743.
- Hazumi, M. et al. (LiteBIRD Collaboration, 2020). LiteBIRD: JAXA's new strategic L-class mission for all-sky surveys of cosmic microwave background polarization. _SPIE_, 11443, 114432F.
- Seljak, U. & Zaldarriaga, M. (1997). Signature of Gravity Waves in the Polarization of the Microwave Background. _Physical Review Letters_, 78, 2054.
