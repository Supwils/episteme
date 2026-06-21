---
title: 暗物质晕与星系旋转曲线
titleEn: Dark Matter Halos and Galaxy Rotation Curves
category: 星系天文学
tags: [暗物质晕, 旋转曲线, NFW轮廓, Vera Rubin, WIMP, 轴子, 直接探测, 修正引力]
updated: 2026-06-13
status: published
---

# 暗物质晕与星系旋转曲线

## 概述

"宇宙中大多数质量是不可见的"——这是 20 世纪天文学最重大的发现之一。暗物质不与电磁力耦合（因此不发光、不反射光，对光学、X 射线、射电观测均"透明"），但通过引力效应无处不在地影响着宇宙的结构。今天我们知道，暗物质约占宇宙总能量密度的 27%，远超普通重子物质的 5%（Planck 2018）。**星系旋转曲线**是识别暗物质最清晰、最直接的观测工具。

## 旋转曲线：最直接的暗物质证据

### 开普勒式下降与观测事实

如果星系质量全部集中在可见的恒星和气体中，外区星系的旋转速度 $v(r)$ 应按照类似行星绕太阳运动的规律下降——即**开普勒式下降**：

$$v(r) = \sqrt{\frac{GM(r)}{r}} \xrightarrow[r \to \infty]{} \propto r^{-1/2}$$

但自 1960 年代末起，天文学家用 21 厘米氢线（中性氢 HI）追踪旋涡星系外区（远超恒星盘的区域）的旋转速度，发现旋转曲线**保持平坦**，而非下降：

$$v(r) \approx \text{const} \sim 100 \text{--} 300 \text{ km/s}$$

平坦旋转曲线在距银心 15–80 kpc 的区域均被观测验证（对于银河系，利用 HI 21 厘米线和 Cepheid 变星等示踪体；对于外部星系，利用 HI 和 $H\alpha$ 发射线成像）。

### Vera Rubin 的历史贡献

天文学家 Vera Rubin（1928–2016）和 Kent Ford 在 1970 年代系统测量了多个旋涡星系（最初以仙女座 M31 为目标，随后扩展至 60 多个星系）的光学旋转曲线，为平坦旋转曲线提供了不可辩驳的统计证据（Rubin et al. 1978, 1980）。尽管早期研究（包括 Zwicky 1930 年代关于星系团质光比的工作，和 Bosma 1978 的 HI 旋转曲线博士论文）已有相关发现，Rubin 的系统性工作是促使天文学界正视"暗物质问题"的关键节点。

平坦旋转曲线要求 $M(r) \propto r$——即星系外区仍有质量随半径线性增长，这只能由延伸至远超可见星系盘的暗物质晕来解释。

## 暗物质晕的理论描述

### NFW 轮廓

数值模拟（Navarro, Frenk & White 1996, 1997）显示，纯暗物质的 $\Lambda$CDM 宇宙学模拟所形成的暗物质晕，其密度轮廓有近乎普适的形式——**NFW 轮廓**：

$$\rho_\text{NFW}(r) = \frac{\rho_s}{(r/r_s)(1 + r/r_s)^2}$$

- 内区（$r \ll r_s$）：$\rho \propto r^{-1}$（尖峰，cusp）
- 外区（$r \gg r_s$）：$\rho \propto r^{-3}$
- 尺度半径 $r_s$ 和特征密度 $\rho_s$ 通过**浓度参数** $c = r_{200}/r_s$ 相关（其中 $r_{200}$ 是平均密度为临界密度 200 倍处的半径）

对于银河系类型的星系，$r_s \sim 20$ kpc，$c \sim 10$–$20$，暗物质晕总质量约 $10^{12} M_\odot$。

### 星系的完整质量分解

一个旋涡星系的旋转曲线是各组分引力的合力，可以分解为：

$$v_\text{obs}^2(r) = v_\text{disk}^2(r) + v_\text{bulge}^2(r) + v_\text{gas}^2(r) + v_\text{DM}^2(r)$$

通过对旋转曲线做多组分拟合，可以分别约束恒星质光比、气体分布和暗物质晕参数。这是**暗物质直接探测**（间接：通过引力）最成熟的方法之一。

## 暗物质的粒子候选

暗物质的粒子本质是现代物理学最重大的未解之谜。主要候选者：

### WIMP（弱相互作用大质量粒子）

质量在 $\sim 1$–$1000$ GeV，与标准模型粒子有弱力量级的相互作用。WIMP 在早期宇宙热平衡中产生，冻出后留下与观测一致的丰度（"WIMP 奇迹"，thermal relic mechanism）。

探测途径：

- **直接探测**：WIMP 与探测器中的原子核弹性散射；目前最强约束来自 LZ 实验（LUX-ZEPLIN）：首批结果给出自旋无关 WIMP-核子截面 $< 9.2 \times 10^{-48}$ cm²（质量 $\sim 36$ GeV 处，Aalbers et al. 2023），2024 年 4.2 吨·年曝光进一步收紧至约 $2 \times 10^{-48}$ cm²
- **间接探测**：WIMP 湮灭产生 $\gamma$ 射线、正电子、中微子，Fermi-LAT、AMS-02 等设备寻找信号
- **对撞机产生**：LHC 寻找超对称粒子（自然的 WIMP 候选）

目前 WIMP 的所有探测尝试均以上限告终，大质量 WIMP（$> 100$ GeV）参数空间已被严重压缩，但低质量 WIMP（$< 10$ GeV）仍有大量未探索空间。

### 轴子（Axion）

轴子是由 Peccei-Quinn 对称性自发破缺产生的极轻标量粒子（质量 $\sim 10^{-6}$–$10^{-3}$ eV），最初被提出用于解决强 CP 问题，但同时也是优秀的暗物质候选者。轴子冷暗物质通过相干振荡而非热产生。探测依赖轴子-光子耦合（$a \to \gamma\gamma$）：ADMX、HAYSTAC 等腔体实验已排除部分参数空间；SKA 等射电望远镜期望探测宇宙磁场中轴子转化产生的射电信号。

### 原初黑洞（PBH）

宇宙早期密度涨落可在暴胀结束后的辐射主导期坍缩形成原初黑洞。若其质量在 $10^{-16}$–$10^{-11} M_\odot$ 范围内，引力微透镜约束允许 PBH 构成大部分暗物质（Carr et al. 2021）。LIGO/Virgo/KAGRA 观测到的部分黑洞并合事件（质量 $\sim 10$–$100 M_\odot$）是否包含 PBH 成分，目前有争议。

## 修正引力理论的挑战

面对暗物质长期未被粒子直接探测，部分物理学家转而考虑修改引力定律：

**MOND（修正牛顿动力学）**：Milgrom（1983）提出，当加速度 $a < a_0 \approx 1.2 \times 10^{-10}$ m/s²（约对应宇宙学常数量级）时，引力定律偏离牛顿形式。MOND 能成功预言许多旋涡星系旋转曲线的形状（Baryonic Tully-Fisher 关系），但在星系团尺度（子弹星系团）和宇宙学尺度（CMB 各向异性、大尺度结构）均面临严重困难，需要引入额外的"中微子暗物质"方能拟合。

MOND 已发展出相对论性版本（TeVeS、RMOND 等），但均无法同时解释所有观测证据，目前不是主流理论框架。

## 旋转曲线张力：核-尖峰问题

NFW 轮廓预言的中心尖峰（$\rho \propto r^{-1}$）在矮不规则星系的旋转曲线中往往找不到——观测更支持平坦的核（core）轮廓。这一"**核-尖峰问题**"是 $\Lambda$CDM 在小尺度上最持久的挑战之一。

超新星反馈可将中心暗物质从尖峰"加热"为核：恒星形成过程中多次超新星爆发驱动气体剧烈流动，通过引力加热使暗物质从中心散开（Pontzen & Governato 2014）。这一机制在高效恒星形成的矮星系（$M_* > 10^6 M_\odot$）中效果明显，但对超暗弱矮星系（$M_* < 10^5 M_\odot$）似乎不足以解释观测。

## 暗物质晕的结构与合并

在 $\Lambda$CDM 框架下，暗物质晕通过层级并合从小尺度增长到大尺度。每个大晕含有大量**子晕**（subhalos）——较小的暗物质团块，是矮卫星星系的居所。$N$ 体数值模拟（Via Lactea II 模拟，Diemand et al. 2008；以及 Aquarius 模拟，Springel et al. 2008）显示，银河系质量晕中有约 $10^4$–$10^5$ 个可分辨的子晕，但观测到的明亮卫星矮星系只有约 50–60 个——这是"缺失卫星问题"的核心。

晕的增长时间由特征时间：

$$t_\text{dyn} = \sqrt{\frac{3\pi}{16 G \bar{\rho}}} \approx 1.4 \text{ Gyr} \left(\frac{\Delta_c}{200}\right)^{-1/2} \left(\frac{H(z)}{H_0}\right)^{-1}$$

决定，其中 $\Delta_c$ 是相对于临界密度的超密度因子。

## 跨学科连接

- **星系形成**：暗物质晕是星系的"宇宙子宫"——气体在晕中冷却坍缩形成恒星盘，晕的质量和角动量决定了星系的大小和形态
- **宇宙大尺度结构**：暗物质功率谱的形状（受暗物质粒子质量影响）决定了宇宙网络（纤维、空洞、节点）的特征尺度
- **直接探测实验**：地下暗物质探测器（LZ、PANDA-X、XENON）的灵敏度已达到自旋无关 WIMP-核子截面 $\sim 10^{-47}$ cm²，预计未来十年将探测或排除大部分经典 WIMP 参数空间

## 为什么暗物质晕如此重要

暗物质晕是星系形成的骨架。没有暗物质晕的额外引力势阱，宇宙中弥散的重子物质（气体）无法克服膨胀宇宙的稀释效应而冷却坍缩成星系——我们所知的恒星、行星乃至生命都不会存在。暗物质虽然不可见，却是宇宙演化最深处的推手。
**次晕动力学与卫星星系分布**：CDM 模拟预测银河系质量暗物质晕中应有约 $10^3$–$10^4$ 个次晕（subhalos），而迄今已发现的银河系卫星星系约 60 个（主要来自 SDSS 和 DES 巡天）。即使考虑观测限制（低面亮度系统未被发现），模拟预测的次晕数量仍显著多于观测——这是"消失卫星星系问题"（missing satellite problem）。一个可能的解决方案是次晕大多是暗的（无恒星形成），因为紫外背景辐射在宇宙再电离后阻止了小次晕中的气体冷却和恒星形成（Bullock et al. 2000）。Vera Rubin 天文台（LSST，预计 2025 年后大量科学数据）和罗曼空间望远镜（Nancy Grace Roman Space Telescope）将把已发现的矮星系/次晕数量提高到数百个，这是检验 CDM 次晕预测的决定性机会。
**暗物质直接探测实验**：除天文观测外，实验室直接探测暗物质粒子（主要针对 WIMP）是确认暗物质性质的关键途径。液氙探测器（LUX-ZEPLIN，PandaX-4T）通过寻找 WIMP 与氙原子核的弹性散射来寻找信号。LZ 实验首批结果给出自旋无关 WIMP-核子截面上限约 $9.2 \times 10^{-48}$ cm²（WIMP 质量约 36 GeV，Aalbers et al. 2023，_Physical Review Letters_，131，041002），是当时最严格的约束；2024 年其 4.2 吨·年曝光的结果进一步将上限收紧至约 $2 \times 10^{-48}$ cm²。迄今未发现确定信号，但显著压缩了 WIMP 参数空间，推动理论界更多考虑轴子、sterile 中微子等替代候选。
**暗物质在宇宙大尺度结构形成中的核心作用**：宇宙微波背景（CMB）涨落在暗物质晕的引力作用下增长，形成了今天观测到的宇宙网状结构（cosmic web）。没有暗物质，重子物质无法在宇宙辐射主导时期（复合前）聚集（辐射压力阻止重子聚集），宇宙今天将没有星系和恒星。从 CMB 到今天的宇宙大尺度结构的演化，在 $\Lambda$CDM 框架下，用 N 体数值模拟（如 Millennium Simulation，Springel et al. 2005，_Nature_；IllustrisTNG，Pillepich et al. 2018，_Monthly Notices of the Royal Astronomical Society_）能够高度准确地重现观测到的星系分布统计——这是 CDM 最强的支持之一。
**综述性展望**：该领域在未来 10 年将经历观测上的飞跃——Vera Rubin 天文台（LSST）、Euclid 卫星、罗曼空间望远镜（Nancy Grace Roman Space Telescope）和平方公里阵列射电望远镜（SKA）将分别在弱引力透镜、光谱测量、近红外成像和 HI 21cm 线巡天上提供数量级的数据量增加，推动对这一主题的统计理解进入新阶段。
**暗物质晕关键物理量速查**：

- NFW 轮廓特征半径 $r_s$：银河系约 20 kpc；M87 约 200 kpc
- 银河系暗物质晕质量：约 $0.9$–$1.5 \times 10^{12} M_\odot$（Eadie & Juric 2019）
- 银河系太阳附近暗物质局部密度：约 $0.4$ GeV/cm$^3$（Bovy & Tremaine 2012）
- WIMP 直接探测约束（LZ 首批结果，2023）：$\sigma_{SI} < 9.2 \times 10^{-48}$ cm$^2$ at 36 GeV（2024 年 4.2 吨·年结果约 $2 \times 10^{-48}$ cm$^2$）
- 轴子暗物质质量范围：约 $10^{-6}$–$10^{-3}$ eV（ADMX 等实验探测目标）

## 延伸阅读

- Rubin, V.C. et al. (1980). Rotational properties of 21 Sc galaxies. _Astrophysical Journal_, 238, 471–487.
- Navarro, J.F., Frenk, C.S. & White, S.D.M. (1996). The structure of cold dark matter halos. _Astrophysical Journal_, 462, 563–575.
- Akerib, D.S. et al. (LZ Collaboration) (2023). First dark matter search results from the LUX-ZEPLIN experiment. _Physical Review Letters_, 131, 041002.
- Pontzen, A. & Governato, F. (2014). Cold dark matter heats up. _Nature_, 506, 171–178.
- de Blok, W.J.G. (2010). The core-cusp problem. _Advances in Astronomy_, 2010, 789293.
- Milgrom, M. (1983). A modification of the Newtonian dynamics as a possible alternative to the hidden mass hypothesis. _Astrophysical Journal_, 270, 365–370.
