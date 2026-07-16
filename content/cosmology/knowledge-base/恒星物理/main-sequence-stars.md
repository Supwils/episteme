---
title: 主序星
titleEn: Main Sequence Stars
category: 恒星物理
tags: [主序星, 氢燃烧, 恒星寿命, 质光关系, 赫罗图]
updated: 2026-06-13
---

# 主序星：宇宙中最平凡也最重要的恒星

## 概述

在[[hertzsprung-russell-diagram|赫罗图]]（Hertzsprung-Russell diagram）上，约 $90\%$ 的恒星聚集在一条从左上角（高温高光度）延伸到右下角（低温低光度）的对角带上，这条带被称为**主序**（main sequence）。处于主序阶段的恒星称为主序星，它们正在核心通过氢聚变为氦来产生能量，处于流体静力平衡的稳定状态。我们的太阳就是一颗典型的主序星，目前年龄约 $46$ 亿年，预计还有约 $50$ 亿年的主序寿命（Sackmann et al. 1993，_The Astrophysical Journal_，418，457）。

## 主序的物理本质

主序并非人为分类的结果，而是恒星物理的自然结果：**在流体静力平衡条件下氢燃烧所需的温度-光度组合，恰好形成赫罗图上这条特定的带**。质量不同的恒星落在主序的不同位置：

- 质量越大的恒星，核心温度越高（需要更大的压力对抗更强的引力），核聚变速率越快，光度越高，表面温度越高（颜色越蓝）
- 质量越小的恒星，与之相反，光度越低，表面越冷（颜色越红）

主序在赫罗图上的宽度（而非一条细线）反映了恒星在主序上的演化：随着氢的消耗，氦核逐渐积累，恒星缓慢地向[[red-giants-agb|红巨星]]方向移动，光度略有增大。

## 质光关系与质量-寿命关系

### 质光关系

对于主序星，光度 $L$ 与质量 $M$ 之间存在近似的幂律关系：

$$L \propto M^{3.5 \text{ to } 4}$$

（指数在不同质量范围内略有变化；对于 $0.5$–$10\,M_\odot$ 的恒星，约为 $L \propto M^{4}$）。

这一关系有深刻的物理根源：更大质量导致更高核心温度，而核聚变速率对温度极为敏感（CNO 循环 $\propto T^{17}$），导致光度以质量的高次幂增长。

### 主序寿命

主序寿命 $\tau_{MS}$ 可以从核燃料量与消耗速率的比值估算：

$$\tau_{MS} \approx \frac{0.1 \times M c^2 \times 0.007}{L} \approx 10^{10}\,\text{yr} \times \left(\frac{M}{M_\odot}\right)^{-2.5}$$

（其中 $0.1$ 是核心氢的质量分数，$0.007$ 是氢聚变的质量-能量转化效率）

| 质量                 | 光谱型 | 表面温度          | 主序寿命      |
| -------------------- | ------ | ----------------- | ------------- |
| $60\,M_\odot$        | O3     | $\sim 45{,}000$ K | $\sim 3$ Myr  |
| $10\,M_\odot$        | B2     | $\sim 22{,}000$ K | $\sim 30$ Myr |
| $2\,M_\odot$         | A5     | $\sim 8{,}500$ K  | $\sim 1$ Gyr  |
| $1\,M_\odot$（太阳） | G2     | $\sim 5{,}778$ K  | $\sim 10$ Gyr |
| $0.5\,M_\odot$       | K7     | $\sim 4{,}000$ K  | $\sim 56$ Gyr |
| $0.1\,M_\odot$       | M8     | $\sim 2{,}600$ K  | $> 1$ Tyr     |

注意：$0.1\,M_\odot$ 的红矮星的主序寿命远超宇宙现在的年龄（约 $13.8$ Gyr），这意味着迄今宇宙中形成的所有红矮星仍然在主序上。

## 内部结构：对流核与辐射包层

主序星的内部结构因质量不同而有本质差异：

### 太阳型恒星（$\lesssim 1.5\,M_\odot$）：辐射核 + 对流包层

- **辐射区**（内部约 $70\%$ 半径）：能量以光子辐射传输
- **对流区**（外部约 $30\%$ 半径）：能量以热对流传输，产生表面米粒组织
- 核心通过**质子-质子链**（PP chain）产能

### 大质量恒星（$\gtrsim 1.5\,M_\odot$）：对流核 + 辐射包层

- **对流核**：CNO 循环对温度极敏感，导致核心产能高度集中，触发对流，使核心物质充分混合
- **辐射包层**：能量向外辐射传输
- 对流核的存在使大质量恒星能更充分地利用核燃料

这一差异有重要的演化影响：对流核充分混合意味着大质量恒星的核心氢可以被高效消耗，而太阳型恒星的辐射核中心首先耗尽氢，然后形成惰性氦核。

## 光谱分类（OBAFGKM 系统）

主序星按表面温度（光谱型）分类，哈佛光谱分类系统从高温到低温排列为 O、B、A、F、G、K、M（常被记为"Oh Be A Fine Girl/Guy, Kiss Me"）。每个光谱型还细分为 $0$–$9$ 的子类。

| 光谱型 | 颜色 | 表面温度 (K)          | 典型特征              |
| ------ | ---- | --------------------- | --------------------- |
| O      | 蓝紫 | $> 30{,}000$          | 电离氦线，极为罕见    |
| B      | 蓝白 | $10{,}000$–$30{,}000$ | 中性氦线，氢线        |
| A      | 白   | $7{,}500$–$10{,}000$  | 强氢线（巴尔末系）    |
| F      | 黄白 | $6{,}000$–$7{,}500$   | 钙线出现              |
| G      | 黄   | $5{,}200$–$6{,}000$   | 强钙线，太阳型        |
| K      | 橙   | $3{,}700$–$5{,}200$   | 金属线丰富            |
| M      | 红   | $2{,}400$–$3{,}700$   | 分子带（TiO），最常见 |

银河系中，M 型红矮星约占所有恒星数量的 $70$–$75\%$，而 O 型恒星不足 $0.01\%$（Ledrew 2001，_Journal of the Royal Astronomical Society of Canada_，95，32）。

## 主序的零龄主序（ZAMS）与端点

**零龄主序**（Zero Age Main Sequence, ZAMS）是恒星刚开始稳定核燃烧时在赫罗图上的位置。随着时间推移，恒星在主序上缓慢移动：光度略微增大（因为核心氦比例增加，平均分子量上升，核心需要升温来维持平衡）。

**主序端点**：当核心氢耗尽时，恒星离开主序，称为**主序折返点**（turnoff point）。通过观测星团的赫罗图找到折返点，可以精确测定星团年龄——这是宇宙年龄测量和星系演化研究的重要工具。

## 质量下限与上限

### 质量下限：氢燃烧极限

恒星需要足够高的核心温度才能点燃氢聚变（约 $10^7$ K）。这要求最小质量约为 $0.08\,M_\odot$（约 $80$ 倍木星质量）。低于这一质量的天体是**[[褐矮星|棕矮星]]**，无法维持稳定的氢燃烧，只能短暂燃烧氘，然后缓慢冷却。

### 质量上限：爱丁顿极限

理论上，当恒星质量过大时，辐射压力超过引力，恒星变得不稳定。**爱丁顿极限**（Eddington luminosity）给出了稳定恒星的最大光度：

$$L_{Edd} = \frac{4\pi G M c}{\kappa_{es}} \approx 1.3 \times 10^{31}\left(\frac{M}{M_\odot}\right)\,\text{W}$$

对应的质量上限约为 $150$–$300\,M_\odot$，但观测和理论都存在不确定性。迄今观测到的最大质量恒星约为 $150$–$200\,M_\odot$（如大麦哲伦云中的 R136a1，质量估计约 $200$–$300\,M_\odot$，尽管早期质量估计存在争议，见 Crowther et al. 2010，_MNRAS_，408，731）。

## 为什么这很重要

主序星是宇宙中元素合成的主要工厂，是行星系统的宿主，也是生命得以诞生的能量来源。理解主序星的物理，让我们能够：

- 测量宇宙中遥远恒星的距离（通过光谱型推断光度，比较视亮度）
- 确定星团和星系的年龄
- 理解恒星死亡后留下何种遗迹（[[white-dwarfs|白矮星]]、中子星、黑洞）
- 评估系外行星宿主星的稳定性和宜居带位置

恒星物理不是抽象的学术问题——太阳在主序上的稳定燃烧，是地球上生命在数十亿年间得以繁衍的物理基础。

## 跨领域连接

- **赫罗图**（`hertzsprung-russell-diagram.md`）：主序是赫罗图最重要的组成部分，理解主序是读懂赫罗图的前提
- **恒星结构与流体静力平衡**（`stellar-structure-hydrostatic-equilibrium.md`）：主序的质光关系来自流体静力平衡与核能产生的联立方程
- **红巨星与渐近巨星支**（`red-giants-agb.md`）：核心氢耗尽后主序星演化为红巨星
- **恒星形成**（`star-formation.md`）：原恒星从主序前演化到 ZAMS 的物理过程

## 参考文献

- Sackmann, I.-J., Boothroyd, A.I., & Kraemer, K.E. (1993). Our Sun. III. Present and Future. _The Astrophysical Journal_, 418, 457–468.
- Ledrew, G. (2001). The Real Starry Sky. _Journal of the Royal Astronomical Society of Canada_, 95, 32–33.
- Crowther, P.A. et al. (2010). The R136 star cluster hosts several stars whose individual masses greatly exceed the accepted 150 M*sun stellar mass limit. \_Monthly Notices of the Royal Astronomical Society*, 408, 731–751.
- Bressan, A. et al. (2012). PARSEC: stellar tracks and isochrones with the PAdova and TRieste Stellar Evolution code. _Monthly Notices of the Royal Astronomical Society_, 427, 127–145.
- Baraffe, I., Homeier, D., Allard, F., & Chabrier, G. (2015). New evolutionary models for pre-main sequence and main sequence stars down to the hydrogen-burning limit. _Astronomy & Astrophysics_, 577, A42.

## 延伸阅读

- Carroll, B.W. & Ostlie, D.A. (2017). _An Introduction to Modern Astrophysics_ (2nd ed.). Cambridge University Press. — 标准本科教材，主序章节清晰易懂
- Prialnik, D. (2009). _An Introduction to the Theory of Stellar Structure and Evolution_ (2nd ed.). Cambridge University Press.
- Salaris, M. & Cassisi, S. (2005). _Evolution of Stars and Stellar Populations_. Wiley. — 关于等龄线和星族年龄的权威参考
