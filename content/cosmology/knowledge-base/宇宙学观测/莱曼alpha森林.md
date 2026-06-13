---
title: 莱曼α森林
titleEn: Lyman-Alpha Forest
category: 宇宙学观测
tags: [莱曼alpha森林, 中性氢, 星系际介质, 类星体光谱, 重子物质, 宇宙网, 功率谱]
updated: 2026-06-13
status: published
---

# 莱曼 $\alpha$ 森林

## 概述

**莱曼 $\alpha$ 森林**（Lyman-alpha forest，Ly$\alpha$ forest）是类星体（QSO）光谱中莱曼 $\alpha$ 发射线蓝端（短波方向）密密麻麻的**吸收线系统**，由视线方向上不同距离处的中性氢（HI）云吸收类星体背景光形成。每一条吸收线对应一团位于红移 $z_{abs}$ 处的弥散中性氢气体：

$$\lambda_\mathrm{obs} = (1 + z_\mathrm{abs}) \times 1215.67\ \text{\AA}$$

莱曼 $\alpha$ 森林不是简单的气体"云"的集合——它是弥漫于宇宙中**星系际介质**（Intergalactic Medium，IGM）密度起伏的直接印记，是宇宙网中纤维状结构的高红移"扫描线"。通过分析类星体光谱中吸收系统的统计性质，天文学家可以测量宇宙在 $z \sim 2$–5 时期的重子物质功率谱、膨胀历史、和重子声学振荡（BAO）特征。

---

## 物理机制

### 共振散射

莱曼 $\alpha$ 跃迁是氢原子从 $n = 2$ 到 $n = 1$ 能级的跃迁，对应光子能量 10.2 eV，波长 1215.67 Å（紫外）。中性氢对此波长的光子具有极高的吸收截面：

$$\sigma_0 = \frac{\pi e^2}{m_e c} f_{12} \frac{\lambda_\alpha}{b\sqrt{\pi}} \approx 4 \times 10^{-14}\ \text{cm}^2$$

其中 $f_{12} = 0.4164$ 是振子强度，$b$ 是多普勒参数（反映气体热运动和湍流）。即使极少量的中性氢（柱密度 $N_\mathrm{HI} \sim 10^{12}$–$10^{14}$ cm$^{-2}$）也能在类星体光谱中产生明显的吸收特征。

在视线方向上，类星体光谱被连续地投影采样：不同红移 $z$ 处的中性氢以红移后的 Ly$\alpha$ 波长吸收光子，在光谱上留下不同位置的吸收谱。类星体是背景光源，IGM 是吸收介质，Ly$\alpha$ 森林是这一"采样"的结果。

---

## 观测特征

### 光谱形态

在高分辨率（$R = \lambda/\Delta\lambda > 10^4$）的类星体光谱中（如 Keck HIRES 或 VLT UVES），Ly$\alpha$ 森林在波长短于类星体自身 Ly$\alpha$ 发射线的区域形成密集的吸收线系列：

- **低柱密度系统**（$N_\mathrm{HI} \sim 10^{12}$–$10^{14}$ cm$^{-2}$）：窄、浅的吸收线，对应IGM中弥散的重子物质，占 Ly$\alpha$ 森林的绝大多数
- **莱曼极限系统**（Lyman Limit System，LLS，$N_\mathrm{HI} > 10^{17.2}$ cm$^{-2}$）：在莱曼极限（912 Å）处产生光学厚的吸收，对应星系外围的弥漫气体晕
- **阻尼莱曼 $\alpha$ 系统**（Damped Lyman Alpha，DLA，$N_\mathrm{HI} > 10^{20.3}$ cm$^{-2}$）：具有明显翼展（Lorentzian阻尼翼）的强吸收，对应星系盘或浓密气体，是高红移原子气体储量的主要载体

### 有效光学深度

Ly$\alpha$ 森林的整体遮蔽程度用**有效光学深度** $\tau_\mathrm{eff}$ 描述：

$$\tau_\mathrm{eff}(z) = -\ln \langle F(z) \rangle$$

其中 $\langle F(z) \rangle$ 是在给定红移处的平均透射通量。在 $z \sim 2$–4，$\tau_\mathrm{eff}$ 从约 0.3 增至约 3，反映了宇宙在更高红移时IGM中中性氢比例更高（Becker et al. 2013，_MNRAS_ 430，2067）。

在 $z > 6$ 附近，Ly$\alpha$ 森林几乎完全不透明（Gunn-Peterson 槽，$\tau_\mathrm{eff} \gg 1$），标志着再电离完成（Gunn & Peterson 1965，_ApJ_ 142，1633）。

---

## 从吸收线到宇宙大尺度结构

### Fluctuating Gunn-Peterson 近似

在低密度（$\Delta = \rho/\bar\rho \lesssim 10$）、高电离态（宇宙光电离背景维持 HI 占比极低）的IGM中，局部中性氢柱密度与重子密度成正比：

$$N_\mathrm{HI} \propto \Delta^{2-0.7(\gamma-1)}$$

其中 $\gamma$ 是IGM的温度-密度关系（$T \propto \Delta^{\gamma-1}$，$\gamma \approx 1.5$）。因此，Ly$\alpha$ 森林的透射通量涨落直接追踪IGM的密度场——即宇宙大尺度结构的"指纹"。

### 功率谱与宇宙学约束

通过统计类星体光谱中透射通量的**1维功率谱**（the 1D flux power spectrum，$P_{1D}(k)$），可以约束：

- 重子物质的密度起伏振幅和谱指数（连接 CMB 功率谱与小尺度结构）
- 热暗物质（WDM）或温暗物质的自由流长度——轻质量的温暗物质在小尺度（$\lambda \lesssim$ 几 Mpc）上抹平密度起伏，在 $P_{1D}(k)$ 上留下截断特征，可对惰性中微子或 WDM 质量设置下限（Viel et al. 2013，_Phys. Rev. D_ 88，043502）

### Ly$\alpha$ 森林 BAO

BOSS（SDSS-III，Dawson et al. 2013）利用约 $1.5 \times 10^5$ 个 $z > 2.1$ 类星体的Ly$\alpha$ 森林功率谱，在 $z \sim 2.3$（宇宙年龄约 3 Gyr）首次探测到 BAO 特征（Busca et al. 2013，_A&A_ 552，A96），给出了高红移时宇宙膨胀率的独立测量，是 DESI 等后续项目的重要先驱。

---

## 再电离时代的 Gunn-Peterson 槽

Gunn & Peterson（1965）预言：在再电离之前，即使极少量的中性氢也能使宇宙对 Ly$\alpha$ 光子完全不透明。1965年他们测量了当时已知的最高红移类星体（$z = 2.01$），发现蓝端没有强吸收，说明宇宙在 $z \sim 2$ 时已高度电离。

2001年，Fan et al.（2002，_AJ_ 123，1247）发现 $z \approx 6.3$ 的类星体光谱在 Ly$\alpha$ 以蓝端出现完全的 Gunn-Peterson 槽，提供了宇宙再电离发生在 $z \sim 6$ 附近的首个直接观测证据。此后，一系列高红移类星体（$z \sim 6$–7.5）的光谱分析揭示了再电离末期复杂的中性氢分布（不均匀再电离）。

---

## 用 Ly$\alpha$ 森林测温

IGM 中的每条吸收线有一个**多普勒参数** $b$（单位 km/s），反映气体的热运动和微小尺度湍流：

$$b^2 = \frac{2kT}{m_\mathrm{H}} + b_\mathrm{turb}^2$$

统计大量吸收线的 $b$ 参数分布，可以测量 IGM 的**温度-密度关系**，进而约束光电离加热历史（尤其是 HeII 再电离在 $z \sim 3$ 对IGM的额外加热，Becker et al. 2011，_MNRAS_ 410，1096；Hiss et al. 2018，_ApJ_ 865，42）。

---

## 跨学科连接

- **星系际介质**（`星系际介质.md`）：Ly$\alpha$ 森林是IGM的直接采样
- **大型巡天 SDSS 与 DESI**（`大型巡天SDSS与DESI.md`）：BOSS 利用 Ly$\alpha$ 森林测量 BAO
- **宇宙大尺度结构形成**（`大尺度结构形成.md`）：Ly$\alpha$ 功率谱约束小尺度结构
- **重子声学振荡**（`../重子声学振荡.md`）：高红移 BAO 通过 Ly$\alpha$ 森林探测

---

## Ly$\alpha$ 森林的科学价值：为什么它如此重要

莱曼 $\alpha$ 森林是宇宙学中少数几个同时提供以下信息的工具之一：

- **中性氢密度场**（追踪重子物质分布）
- **温度-密度关系**（约束光电离加热历史）
- **速度场**（通过线宽约束本动速度弥散）
- **金属污染史**（通过伴生的 C IV、O VI 系统）
- **小尺度功率谱**（对温暗物质质量约束能力优于 CMB）
- **高红移 BAO**（宇宙膨胀历史在 $z \sim 2$–3 的独立探针）

没有任何其他单一的观测量能在 $z \sim 2$–5 的宇宙中提供如此丰富的多维宇宙学信息。

DESI 正在用其类星体巡天（约 80 万个高红移 QSO）建立迄今最大的 Ly$\alpha$ 森林样本，预期在 $z \sim 2$–3.5 以约 0.3% 的精度测量 BAO（DESI Collaboration 2022，_AJ_ 164，207），并将温暗物质（WDM）质量下限推进到约 5–10 keV——超越当前粒子物理直接探测能力。

---

## 关键参数速查

- Ly$\alpha$ 跃迁波长：$\lambda_\alpha = 1215.67$ Å（静止系紫外）
- 典型吸收线多普勒参数：$b \sim 20$–40 km/s（低密度 IGM）
- Gunn-Peterson 光学深度 $\tau_\mathrm{eff}$ 在 $z = 3$：约 0.3–0.5
- Gunn-Peterson 槽完全出现红移：$z \sim 5.5$–6（再电离完成）
- BOSS 类星体样本（用于 Ly$\alpha$ 森林 BAO）：约 15 万个，$2.1 < z < 3.5$
- DESI 类星体目标（5年全调查）：约 80 万个，提升 Ly$\alpha$ BAO 精度约 3 倍

---

## 延伸阅读

- Gunn, J. E. & Peterson, B. A. (1965). On the density of neutral hydrogen in intergalactic space. _Astrophysical Journal_, 142, 1633–1641.
- Croft, R. A. C. et al. (1999). Relationship of the Lyman alpha forest to large-scale structure. _Astrophysical Journal_, 520, 1–23.
- Viel, M. et al. (2013). Constraining warm dark matter candidates including sterile neutrinos and light gravitinos with WMAP and the Lyman-alpha forest. _Physical Review D_, 88, 043502.
- Busca, N. G. et al. (2013). Baryon acoustic oscillations in the Ly-alpha forest of BOSS quasars. _Astronomy & Astrophysics_, 552, A96.
- Becker, G. D. et al. (2013). The thermal state of the intergalactic medium at redshift z = 1.6–3.4. _Monthly Notices of the Royal Astronomical Society_, 430, 2067–2081.
- McQuinn, M. (2016). The evolution of the intergalactic medium. _Annual Review of Astronomy and Astrophysics_, 54, 313–362.
