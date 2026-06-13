---
title: 潮汐瓦解事件
titleEn: Tidal Disruption Events
category: 致密天体物理学
tags: [潮汐瓦解, 黑洞, 恒星撕裂, TDE, 多波段爆发, 时域天文学]
updated: 2026-06-13
---

# 潮汐瓦解事件：恒星被黑洞撕碎的瞬间

## 概述

**潮汐瓦解事件**（Tidal Disruption Event，TDE）是当一颗恒星飞近超大质量黑洞时，被黑洞极端的潮汐力撕碎的过程。这不是神话故事里的"吞噬"——恒星并非整体落入黑洞，而是在距离黑洞约数十至数百天文单位处，被潮汐力拉伸成一条长长的"恒星面条"，约一半物质逃逸，另一半回落形成临时吸积盘，在数月到数年内以从紫外到 X 射线的多波段辐射形式爆发，峰值光度可达 $10^{43}$–$10^{45}$ erg/s。TDE 是当代时域天文学（time-domain astronomy）最活跃的前沿之一，也是研究"平静"星系核中超大质量黑洞性质的难得窗口。

## 潮汐半径与直接瓦解条件

### 潮汐力与自引力的竞争

**潮汐半径**（tidal radius，$R_T$）是黑洞对恒星的潮汐力等于恒星自引力的临界距离：

$$R_T \approx R_* \left(\frac{M_{BH}}{M_*}\right)^{1/3}$$

当恒星近心点距离 $r_p \lesssim R_T$ 时，潮汐力超过恒星的自引力，恒星被撕碎。

对于典型情形（太阳型恒星，$M_* = M_\odot$，$R_* = R_\odot$；超大质量黑洞 $M_{BH} = 10^7\,M_\odot$）：

$$R_T \approx R_\odot \times \left(\frac{10^7}{1}\right)^{1/3} \approx 215\,R_\odot \approx 1\,\text{AU}$$

这一距离大于史瓦西半径 $r_s = 2GM_{BH}/c^2 \approx 0.03$ AU，因此恒星在到达视界之前就被潮汐力撕碎。

### 潮汐瓦解与直接吞噬的分界

对于质量过大的黑洞，潮汐半径落在史瓦西半径以内：

$$R_T < r_s \quad \Leftrightarrow \quad M_{BH} > M_{BH,max} \approx \frac{c^6}{(G M_*)^2} \left(\frac{R_*^3}{G M_*}\right)$$

对于太阳型恒星，这一临界黑洞质量约为 $M_{BH,max} \approx 10^8\,M_\odot$。质量超过此值的黑洞会直接"吞噬"恒星而不产生 TDE；质量更低的黑洞（如 $10^6$–$10^7\,M_\odot$）才能产生可观测的 TDE 光变曲线。

**但有一个重要例外**：自旋极快的超大质量黑洞，由于克尔时空的帧拖曳效应，可以使临界质量提高约一个数量级（约 $7 \times 10^8\,M_\odot$），允许质量更大的黑洞产生 TDE（Kesden 2012，_Physical Review D_，85，024037）。

## TDE 的物理过程

### 恒星面条化与轨道散布

恒星被潮汐力沿径向拉伸，形成恒星"面条"（spaghettification，又称恒星面条化）。碎块的具体轨道取决于其在恒星中原来的位置：

恒星物质的轨道能量围绕黑洞的抛物线轨道（近似 $E \approx 0$）有弥散：

$$\Delta E \approx \frac{G M_{BH} R_*}{R_T^2}$$

这一能量弥散导致碎块的轨道能量分布，从束缚（$E < 0$）到非束缚（$E > 0$）：

- **非束缚物质**（约 $50\%$）：逃逸黑洞，以亚相对论速度射向星际空间
- **束缚物质**（约 $50\%$）：以抛物线轨道回落，回落时间 $t_{fall} \propto E^{-3/2}$

束缚物质回落速率服从幂律：

$$\dot{M}_{fall} \propto (t - t_{disrupt})^{-5/3}$$

（Rees 1988，_Nature_，333，523）——这是 TDE 的标志性时间演化规律，虽然实际观测常有偏差。

### 吸积盘形成与辐射

回落物质在黑洞周围积累，通过轨道交叉（orbital intersection）和粘滞耗散角动量，形成临时吸积盘。吸积率在约数周到数月时间内接近甚至超过爱丁顿速率，随后以 $t^{-5/3}$ 衰减。

峰值吸积率时期，系统产生强烈的**紫外和软 X 射线辐射**（对于 $10^6$–$10^7\,M_\odot$ 的黑洞），有时还有光学辐射（来自回落物质的碰撞激波或被再辐射的紫外光在外层气体中的散射）。

### 相对论喷流 TDE

少数 TDE（约 $10\%$–$20\%$）同时产生相对论喷流，称为**喷流型 TDE**（jetted TDE）。最著名的是 Swift J164449.3+573451（"Swift J1644"，2011 年），其硬 X 射线辐射持续数月，峰值光度约 $10^{48}$ erg/s，来自对准地球方向的相对论喷流（Bloom et al. 2011，_Science_，333，203；Zauderer et al. 2011，_Nature_，476，425）。

喷流型 TDE 的产生可能需要特定的黑洞自旋和磁场条件，与非喷流型 TDE 的区别仍在研究中。

## TDE 的多波段特征

现代时域巡天（ZTF、Pan-STARRS、Rubin-LSST、eROSITA）正在大量发现 TDE，建立起系统的多波段特征认识：

### 光学/紫外 TDE

大多数光学发现的 TDE（如 ZTF 发现的 AT2019qiz，Nicholl et al. 2020，_MNRAS_，499，482）表现为：

- 亮度上升时标约 $10$–$40$ 天
- 峰值绝对星等约 $-18$ 到 $-22$（约 $10^{43}$–$10^{44}$ erg/s 光学光度）
- 光谱显示宽氢线和/或氦线（半宽约 $10{,}000$–$30{,}000$ km/s），来自高速流出物质
- 温度约 $2$–$5 \times 10^4$ K，峰值在紫外

AT2019qiz 是迄今观测最早（发现于瓦解后约 20 天）的 TDE，是检验 TDE 理论的关键靶标。

### 软 X 射线 TDE

2020 年，eROSITA 卫星在全天 X 射线巡天中发现了数百颗 TDE 候选体（Saxton et al. 2021），显示出软 X 射线辐射来自吸积盘热辐射，峰值温度约 $10^6$–$10^7$ K。

### 射电 TDE

少数 TDE 在晚期（数月到数年后）产生射电辐射，来自非相对论性外流与星际介质的相互作用，类似超新星遗迹的形成过程，但时标更短。

## TDE 作为黑洞探针

TDE 的最重要科学价值之一是探测"休眠"超大质量黑洞：大多数星系中心的超大质量黑洞目前处于低活跃或静默状态（如银河系中心 Sgr A\*），无法通过 AGN 方法研究。TDE 在星系核中的偶发性爆发提供了直接探测这些黑洞的机会：

- **黑洞质量**：通过 TDE 峰值光度、光变曲线时标、可见光谱线宽推断
- **黑洞自旋**：通过 X 射线谱的"准周期振荡"（QPO）或喷流性质约束
- **宿主星系核动力学**：TDE 率依赖于星系核恒星密度和速度弥散（"损失锥"充填率）

理论预期每个星系中心的 TDE 率约为 $10^{-4}$–$10^{-5}$ 次/年（Wang & Merritt 2004，_The Astrophysical Journal_，600，149），总体与观测吻合。

## 重复 TDE：部分瓦解事件

少数 TDE 表现出周期性重复爆发（约数百天到数年），可能是因为**恒星只被部分瓦解**（partial TDE）——每次近心点经过只剥去外层，核心保持完整，下次轨道回来时再次发生部分瓦解（Payne et al. 2021，_The Astrophysical Journal_，910，125）。

部分 TDE 提供了独特的信息：重复周期直接对应恒星轨道周期，给出黑洞质量的精确估算；重复结构随时间的演化揭示了恒星每次被剥离的物质量。

## 为什么这很重要

TDE 是天体物理学和引力物理的交叉点：

- **实时观测黑洞吸积**：从"零吸积"到"超爱丁顿吸积"再到"回落衰减"，在数月内展示吸积盘从建立到消退的完整过程
- **测量休眠黑洞**：为不活跃星系中超大质量黑洞的质量普查提供新工具
- **探测黑洞自旋**：通过精确光变曲线和 QPO 测量挑战高精度引力理论
- **宇宙时域天文学**：Rubin-LSST 预期每年发现约 $10^4$ 颗 TDE，将从稀有样本转变为统计大样本

## 跨领域连接

- **超大质量黑洞**（`supermassive-black-holes.md`）：TDE 是探测不活跃超大质量黑洞最直接的手段
- **黑洞吸积盘与相对论喷流**（`accretion-disks-relativistic-jets.md`）：TDE 产生临时吸积盘，部分产生相对论喷流，是研究吸积物理的天然实验室
- **引力透镜**（`../引力透镜.md`）：强引力场中的光子轨道弯曲影响 TDE 的可观测外观
- **黑洞热力学与霍金辐射**（`../黑洞热力学与霍金辐射.md`）：TDE 使黑洞质量增加，是真实黑洞"成长"过程的直接观测

## 参考文献

- Rees, M.J. (1988). Tidal disruption of stars by black holes of $10^6$–$10^8$ solar masses in nearby galaxies. _Nature_, 333, 523–528.
- Bloom, J.S. et al. (2011). A Possible Relativistic Jetted Outburst from a Massive Black Hole Fed by a Tidally Disrupted Star. _Science_, 333, 203–206.
- Nicholl, M. et al. (2020). An outflow powers the optical rise of the nearby, slowly evolving tidal disruption event AT2019qiz. _Monthly Notices of the Royal Astronomical Society_, 499, 482–504.
- Kesden, M. (2012). Black-hole spin dependence of the tidal-disruption rate from stellar nuclei. _Physical Review D_, 85, 024037.
- Wang, J. & Merritt, D. (2004). Revised Rates of Stellar Disruption in Galactic Nuclei. _The Astrophysical Journal_, 600, 149–161.

## 延伸阅读

- Gezari, S. (2021). Tidal Disruption Events. _Annual Review of Astronomy and Astrophysics_, 59, 21–58. — 最新全面综述
- Stone, N.C. et al. (2020). Rates of Tidal Disruption Events. _Space Science Reviews_, 216, 35. — TDE 率的理论与观测比较
- Saxton, R. et al. (2021). X-ray properties of TDEs. _Space Science Reviews_, 217, 18.
