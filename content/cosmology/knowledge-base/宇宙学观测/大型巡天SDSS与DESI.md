---
title: 大型巡天：SDSS与DESI
titleEn: Large-Scale Surveys — SDSS and DESI
category: 宇宙学观测
tags: [SDSS, DESI, 光谱巡天, 重子声学振荡, 大尺度结构, 宇宙学参数]
updated: 2026-06-13
---

# 大型巡天：SDSS 与 DESI——绘制宇宙地图

## 概述

宇宙学大型光谱巡天通过系统性地测量数百万至数十亿个星系的红移，将三维宇宙大尺度结构（星系的空间分布）转化为精确的宇宙学约束。斯隆数字巡天（SDSS，2000年至今）是第一个真正意义上的"大数据"星系巡天，而暗能量光谱仪（DESI，2021年至今）则将这一规模扩大了约 10 倍，旨在以前所未有的精度测量暗能量的性质随宇宙时间的变化。

---

## 斯隆数字巡天（SDSS）

### 基本参数

SDSS 使用位于美国新墨西哥州阿帕奇角天文台的 2.5 m 专用望远镜，配备覆盖五个光学波段（u g r i z，420–920 nm）的 120 平方度视场 CCD 相机和一台 640 根光纤的多目标光谱仪（分辨率 $R \approx 2000$，波长 380–920 nm）。SDSS 开展了多个连续阶段的巡天：

| 阶段             | 时间      | 光谱星系数          |
| ---------------- | --------- | ------------------- |
| SDSS-I（Legacy） | 2000—2005 | ~675000             |
| SDSS-II          | 2005—2008 | ~800000（含超新星） |
| BOSS（SDSS-III） | 2008—2014 | ~1.5 million        |
| eBOSS（SDSS-IV） | 2014—2020 | ~1 million + QSO    |
| MaNGA（SDSS-IV） | 2014—2020 | ~10000 星系 IFU     |

SDSS 光谱数据覆盖约 1/3 北天球，红移延伸至 $z \approx 0.7$（BOSS 主样本）和 $z \approx 2.1$（类星体莱曼 α 森林，eBOSS）。

### 核心科学贡献

**重子声学振荡（BAO）的统计探测**：SDSS 于 2005 年（Eisenstein 等，ApJ 633，560）在 46748 个亮红星系样本的两点相关函数中首次探测到 BAO 峰（与声波水平约 100 Mpc/$h$ 的特征尺度对应），提供了测量暗能量的宇宙标准尺。

**莱曼 α 森林宇宙学**：BOSS 类星体光谱中约 2.2 万条类星体吸收线（莱曼 α 森林）的功率谱，将 BAO 方法延伸至 $z \approx 2$，约束了高红移时宇宙的膨胀历史。

**光谱图集与分类**：SDSS 图像和光谱数据库是天文学界最广泛使用的公开数据集之一，支撑了数千篇关于星系形态（GalaxyZoo 公民科学项目）、类星体物理、银河系结构和星际介质的研究。

---

## 暗能量光谱仪（DESI）

### 仪器与设计

DESI 使用位于亚利桑那州 Kitt Peak 国家天文台的 4 m Mayall 望远镜，对其焦面进行彻底改造，安装了一个配备 5000 根可定位机器人光纤的焦面系统。每台光纤对应一台微型摄谱仪（R = 2000–5500，波段 360–980 nm），每次曝光约 20 分钟可同时获取 5000 个天体的光谱，每夜可观测约 10 万个新目标（DESI Collaboration，2022，AJ 164，207）。

DESI 的 5 年主调查目标是获取约 4000 万个星系和类星体的光谱，跨越红移 $0 < z < 3.5$，覆盖约 14000 平方度的天空。

### 2024 年 BAO 宇宙学结果

DESI 于 2024 年 4 月公布了基于前 14 个月数据（约 600 万个星系和类星体）的第一批宇宙学结果（DESI Collaboration，2024，arXiv:2404.03002）。主要发现：

- 在多个红移切片中精确探测到 BAO 峰，距离测量精度约 0.5%–1%。
- 结合 CMB（Planck）和超新星（Pantheon+/DES5YR），约束暗能量态方程：若允许 $w$ 随红移变化（$w_0 w_a$ 模型），最优拟合偏向 $w_0 > -1$ 和 $w_a < 0$，与宇宙学常数（$w = -1$）存在约 2.5–3.9$\sigma$ 的偏差。这一结果引发了广泛讨论——但需强调其统计显著性尚未达到"发现"级别的 5$\sigma$，且系统误差控制仍在评估中。

---

## 未来规划

- **4MOST（4-metre Multi-Object Spectroscopic Telescope）**：ESO 主导的 2400 根光纤光谱巡天仪，约 2025 年在智利 VISTA 望远镜上投入运行。
- **Euclid**（已于 2023 年发射）：ESA 空间望远镜，将在光学和近红外对约 15 亿个星系进行测光，并用弱引力透镜和 BAO 约束暗能量。
- **薇拉·鲁宾天文台（LSST）**：将与 DESI 互补，提供测光红移和弱引力透镜联合约束。

---

## 光度巡天：成像与测光红移

与光谱巡天的精确红移相比，测光巡天通过多个宽波段滤光片的测光颜色估算星系红移（"测光红移"或"photo-z"），精度通常约 $\sigma_z/(1+z) \approx 0.02$–$0.05$，但可以覆盖更大面积和更深天区。测光巡天通过弱引力透镜（WL）统计对宇宙学具有强约束力，因为背景星系图像的微弱剪切（约 1%–3%）直接追踪前景暗物质分布。

**暗能量巡天（DES，Dark Energy Survey）** 用智利 Blanco 4 m 望远镜的 570 兆像素相机（DECam，由 62 块科学 CCD 拼成，视场直径约 $2.2°$）在 5 个光学/近红外波段对南天约 5000 平方度进行成像，2013—2019 年运行。DES 5 年完整数据约束（结合 WL、星系团、BAO、超新星）的宇宙学结果与 Planck CMB 结果在 $\Omega_m$-$\sigma_8$ 平面存在轻微（约 2$\sigma$）但尚不显著的张力（DES Collaboration，2022，PRD 105，023520）。

**Euclid**（ESA，2023 年发射）在空间分辨率优势下对约 15000 平方度南北天空进行近红外成像和宽光谱测光，目标是通过弱引力透镜和星系功率谱同时约束 $w$ 至约 2%（Laureijs 等，2011，Euclid 红皮书）。

---

## 巡天数据与人工智能

现代大型巡天产生的数据量已远超人工处理能力，机器学习正在成为数据处理和科学分析的核心工具：

- **测光红移**：使用卷积神经网络（CNN）直接从多波段图像预测星系红移，精度与传统模板拟合方法相当甚至更优（Pasquet 等，2019，A&A 621，A26）。
- **形态分类**：GalaxyZoo 项目让数十万公民志愿者对 SDSS 图像中的星系形态进行分类，积累了约 100 万个星系的人工标注；后续使用这些标注训练深度学习模型实现自动化分类（Dieleman 等，2015，MNRAS 450，1441）。
- **暂现源检测**：LSST 每夜将产生约 1000 万个差分图像源，需要实时分类（真实暂现源 vs. 宇宙射线 vs. 卫星轨迹），这完全依赖机器学习流水线。

---

## 延伸阅读

1. Eisenstein, D. J. et al. (2005). Detection of Baryon Acoustic Oscillations in the Large-Scale Correlation Function of SDSS Luminous Red Galaxies. _ApJ_, 633, 560–574.
2. DESI Collaboration (2024). DESI 2024 VI: Cosmological Constraints from the Measurements of the Baryon Acoustic Oscillations. arXiv:2404.03002.
3. York, D. G. et al. (2000). The Sloan Digital Sky Survey. _AJ_, 120, 1579–1587. doi:10.1086/301513
4. DESI Collaboration (2022). The DESI Experiment Part I: Science, Targeting, and Survey Design. _AJ_, 164, 207.
5. Weinberg, D. H. et al. (2013). Observational Probes of Cosmic Acceleration. _Physics Reports_, 530, 87–255. doi:10.1016/j.physrep.2013.05.001
