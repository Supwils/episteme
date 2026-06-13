---
title: 标准烛光与Ia型超新星测距
titleEn: Standard Candles and Type Ia Supernova Distance Measurement
category: 宇宙学观测
tags: [Ia型超新星, 标准烛光, 暗能量, 宇宙加速膨胀, 光变曲线, 菲利普斯关系, 哈勃常数]
updated: 2026-06-13
status: published
---

# 标准烛光与 Ia 型超新星测距

## 概述

1998年，两个独立的观测团队——超新星宇宙学项目（Supernova Cosmology Project，Perlmutter 等）和高红移超新星搜索组（High-z Supernova Search Team，Schmidt 和 Riess 等）——几乎同时宣布，通过测量高红移（$z \sim 0.5$）的 Ia 型超新星距离，发现宇宙膨胀正在**加速**。这一发现颠覆了此前认为宇宙膨胀在减速的预期，暗示宇宙中存在一种未知的"**暗能量**"（dark energy）。

三位主导者 Saul Perlmutter、Brian Schmidt 和 Adam Riess 因此获得2011年诺贝尔物理学奖。这一发现的核心工具——经过校准的 Ia 型超新星——是迄今最精确的宇宙学距离指示器之一。

---

## 什么是 Ia 型超新星？

Ia 型超新星是**热核超新星**（thermonuclear supernova），其爆炸源于白矮星（carbon-oxygen white dwarf，CO WD）吸积伴星物质（或双白矮星并合），当白矮星质量接近**钱德拉塞卡极限**（Chandrasekhar limit，约 $1.44 M_\odot$）时，中心碳核聚变被引发，在毫秒级时间内摧毁整个白矮星：

$$^{12}\mathrm{C} + ^{12}\mathrm{C} \to ^{24}\mathrm{Mg} + \gamma, \quad ^{24}\mathrm{Mg} \to \mathrm{Si, S, Ar, Ca, Fe, Ni}$$

爆炸核合成产生约 $0.4$–$0.8 M_\odot$ 的 $^{56}$Ni，其衰变链（$^{56}$Ni $\to ^{56}$Co $\to ^{56}$Fe，半衰期分别为 6.1 天和 77.3 天）为光变曲线提供能量。

Ia 型超新星的光谱特征是没有氢（H）发射线，但有硅（Si II 6150 Å）等中等质量元素的吸收线——这与核坍缩超新星（II、Ib、Ic 型）区分开来。

---

## 为什么能作为标准烛光？

### 菲利普斯关系（Phillips Relation）

在充当距离指示器之前，Ia 型超新星并不是严格的"标准烛光"——不同事件的峰值绝对星等（$M_B$）在约 1 等的范围内弥散。

1993年，Mark Phillips 发现 Ia 型超新星的**光变曲线衰减速度**与峰值光度之间存在紧密相关：更暗的超新星衰减更快（Phillips 1993，_ApJ_ 413，L105）。定义 $\Delta m_{15}(B)$ 为光变曲线在 $B$ 波段峰值后15天内的下降幅度（单位：星等），则：

$$M_B^\mathrm{max} \approx \mathrm{const} + \alpha \cdot \Delta m_{15}(B)$$

这一"光变曲线形状-光度"相关使得 Ia 型超新星可以被"标准化"：通过测量光变曲线形状，推断其真实峰值光度，再与观测峰值亮度对比，得到距离模数：

$$\mu = m_B - M_B = 5 \log_{10}(d_L / 10\ \mathrm{pc})$$

经标准化后，Ia 型超新星的距离精度约为 5%–7%（Perlmutter et al. 1999；Riess et al. 1998）。

现代参数化（SALT2 模型，Guy et al. 2007，_A&A_ 466，11）使用两个参数：

- $x_1$：光变曲线形状参数（正值对应慢、宽的光变曲线，高光度）
- $c$：颜色参数（正值对应偏红/有尘埃消光）

标准化公式：$\mu = m_B - M_B + \alpha x_1 - \beta c$，其中 $\alpha \approx 0.15$，$\beta \approx 3.1$（Betoule et al. 2014，_A&A_ 568，A22）。

---

## 暗能量的发现

### 哈勃图与宇宙膨胀

比较不同红移（距离）的 Ia 型超新星的观测亮度与期望亮度，可以绘制**哈勃图**（Hubble diagram），在宇宙学意义上，横轴为红移 $z$，纵轴为距离模数 $\mu$。

在不同宇宙学参数下，哈勃图的形状不同：

- 纯物质主导（$\Omega_m = 1$，$\Omega_\Lambda = 0$）：$\mu$ 增长较快（宇宙减速）
- $\Lambda$CDM（$\Omega_m \approx 0.3$，$\Omega_\Lambda \approx 0.7$）：$\mu$ 增长较慢（宇宙加速）

Perlmutter et al.（1999，_ApJ_ 517，565，42 个高红移超新星）和 Riess et al.（1998，_AJ_ 116，1009，16 个高红移超新星）的观测均表明，高红移超新星**比纯物质宇宙预期的更暗**（约 0.2 等），意味着它们比预期更远，即宇宙膨胀正在加速——宇宙中必须存在排斥效应（暗能量）。

---

## Ia 型超新星的前身星问题

尽管 Ia 型超新星作为标准烛光极为精确，其**前身星机制**至今未完全确定，是天体物理学的活跃前沿：

### 单简并前身星（SD，Single Degenerate）

一个 CO 白矮星从伴星（主序星、红巨星或 He 星）吸积物质，达到钱德拉塞卡质量后爆炸。预言：爆炸后应有伴星残骸存活，但迄今在超新星遗迹中只有极少数候选体（最近的 Ia 超新星遗迹 Tycho's SNR 的伴星搜索得到否定结果，Schaefer & Pagnotta 2012，_Nature_ 481，164）。

### 双简并前身星（DD，Double Degenerate）

两个 CO 白矮星因引力波辐射减少轨道角动量，最终并合。并合后的质量超过钱德拉塞卡极限，触发核爆炸。2010年代以来 DD 图景得到更多观测支持（如 D6 型超新星后星场——爆炸后甩出的高速伴白矮星，Shen et al. 2018，_ApJ_ 865，L15）。

**次钱德拉塞卡质量爆炸**：有理论认为，双简并系统中轻微较小的白矮星在并合前被撕裂，通过"引燃壳"机制（double-detonation）使主白矮星在低于钱德拉塞卡质量时爆炸，这也可解释一部分低光度 Ia 超新星。

前身星的多样性不一定破坏距离测量精度，只要这种多样性在高低红移样本间均匀——但如果前身星的宇宙演化（前身星平均金属丰度、年龄等随 $z$ 变化）导致峰值光度的系统性偏移，就会引入难以校正的系统误差。

---

## 当前宇宙学约束精度

**Pantheon+ 样本**（Scolnic et al. 2022，_ApJ_ 938，113）汇集了1701个已定标的 Ia 超新星（来自18个不同巡天），覆盖 $0.001 < z < 2.26$，给出 $\Omega_m = 0.334 \pm 0.018$，$H_0 = 73.5 \pm 1.1$ km/s/Mpc（结合 Cepheids）。

**DES 5 年超新星样本**（DES Collaboration，2024，_ApJL_ 973，L14）提供了 1829 个光度距离测量，与 CMB 相结合对暗能量态方程参数 $w$ 约束在约 6%。

---

## 未来：LSST 与罗曼望远镜

- **Vera Rubin 天文台（LSST）**：计划在10年内发现约 100 万个 Ia 超新星（主要为测光超新星），将宇宙学样本扩大约 1000 倍，把 $w$ 约束精度提升至约 1%
- **罗曼空间望远镜**（Nancy Grace Roman ST，前 WFIRST）：在近红外对 $z > 1.5$ 的 Ia 超新星进行高信噪比光谱分类和光变曲线测量，探索 $z > 1$ 的暗能量演化

---

## 宇宙学常数还是动力学暗能量？

Ia 超新星数据的一个核心科学问题是：暗能量的态方程 $w = P/(\rho c^2)$ 是否真的是常数 $w = -1$（宇宙学常数，Einstein 的 $\Lambda$）？

目前最精确的限制来自 Pantheon+ 超新星样本结合 Planck CMB 和 BAO：$w = -1.03 \pm 0.03$（在 $w = \mathrm{const}$ 假设下），与 $\Lambda$CDM 完全一致（Brout et al. 2022，_ApJ_ 938，110）。然而，DESI 2024 DR1 的 BAO 结果（结合 CMB 与不同超新星样本）在允许 $w(z)$ 随时间变化的 $w_0 w_a$ 模型下，与 $\Lambda$CDM 存在约 $2.5$–$3.9\sigma$ 偏差（DESI Collaboration 2024，arXiv:2404.03002），暗示暗能量可能随时间演化（$w_a < 0$，暗能量越来越弱）。具体数值因所用超新星样本而异，详见 DESI 主论文。这一结果尚属初步，若被 DESI DR2/DR3 等后续数据证实，将是现代宇宙学最重大的发现之一。

---

## 关键数值速查

- Ia 型超新星峰值绝对星等（B波段，标准化后）：$M_B \approx -19.3$（$H_0 = 73$ km/s/Mpc）
- 菲利普斯关系斜率（$\Delta m_{15}$）：约 $-1.0$ 至 $-1.5$ mag/mag
- 光变峰宽校正参数 SALT2 $x_1$ 系数：$\alpha \approx 0.155$；颜色系数 $\beta \approx 3.1$
- 单个标准化超新星距离精度：约 5%–7%（统计主导误差）
- Pantheon+ 样本（2022）：1701 个超新星，$0.001 < z < 2.26$
- 1998年发现文章：Riess et al.，_AJ_ 116，1009（2558次引用截至2024）和 Perlmutter et al.，_ApJ_ 517，565

---

## 跨学科连接

- **宇宙距离阶梯**（`宇宙距离阶梯.md`）：Ia 超新星是距离阶梯的第三级
- **暗物质与暗能量**（`../暗物质与暗能量.md`）：Ia 超新星是暗能量发现的直接证据
- **恒星核合成**（`../恒星核合成.md`）：Ia 超新星是宇宙铁族元素的主要来源
- **大型巡天**（`大型巡天SDSS与DESI.md`）：巡天为超新星提供宿主星系光谱和红移

---

## 延伸阅读

- Phillips, M. M. (1993). The absolute magnitudes of Type Ia supernovae. _Astrophysical Journal Letters_, 413, L105–L108.
- Riess, A. G. et al. (1998). Observational evidence from supernovae for an accelerating universe and a cosmological constant. _Astronomical Journal_, 116, 1009–1038.
- Perlmutter, S. et al. (1999). Measurements of Omega and Lambda from 42 high-redshift supernovae. _Astrophysical Journal_, 517, 565–586.
- Guy, J. et al. (2007). SALT2: using distant supernovae to improve the use of Type Ia supernovae as distance indicators. _Astronomy & Astrophysics_, 466, 11–21.
- Betoule, M. et al. (2014). Improved cosmological constraints from a joint analysis of SDSS-II and SNLS supernova samples. _Astronomy & Astrophysics_, 568, A22.
- Scolnic, D. et al. (2022). The Pantheon+ analysis: the full dataset and light-curve release. _Astrophysical Journal_, 938, 113.
