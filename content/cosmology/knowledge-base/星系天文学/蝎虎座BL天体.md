---
title: 蝎虎座BL天体
titleEn: BL Lacertae Objects
category: 星系天文学
tags: [BL Lac, 耀变体, 喷流, 同步辐射, 高能天体物理, AGN, 射电强AGN]
updated: 2026-06-13
status: published
---

# 蝎虎座 BL 天体

## 概述

**蝎虎座 BL 天体**（BL Lacertae objects，简称 BL Lac 天体）是活动星系核（AGN）中最极端的成员之一，属于**耀变体**（blazar）大类。它们的能量主要由一条相对论性喷流（jet）主导，且该喷流方向几乎正对观测者——这种"正面朝向"使喷流的相对论性增亮（relativistic beaming）效应被最大化，产生了在整个电磁波谱从射电到 TeV $\gamma$ 射线的极端辐射。

BL Lac 天体因其原型天体——蝎虎座的 BL Lacertae 星——而得名。BL Lac 天体的光学谱几乎没有发射线（等效宽度 EW $< 5$ Å），这是区分它与其他 AGN 和普通可变星的关键特征（Urry & Padovani 1995，_PASP_ 107，803）。

---

## 历史发现

BL Lacertae 最初于1929年被发现，因为其快速光变而被归为变星并分配了变星命名（BL Lac）。1968年，天文学家发现它是一个射电源，1974年光谱观测证实它没有典型恒星谱线、具有连续谱和少量发射线，最终被认定为河外天体（Miller 等，1978）。后续研究在附近发现其宿主椭圆星系，确认其红移。

---

## 耀变体家族：BL Lac 与平谱射电类星体

耀变体分为两个主要子类：

| 类型                   | 光学发射线             | 辐射主导机制           | 典型红移                    |
| ---------------------- | ---------------------- | ---------------------- | --------------------------- |
| BL Lac 天体            | 极弱或无（EW $< 5$ Å） | 低峰频同步辐射         | $0 < z < 0.8$（统计上较近） |
| 平谱射电类星体（FSRQ） | 强宽线                 | 外康普顿散射（EC）主导 | 典型 $z \sim 1$–3           |

BL Lac 天体与 FSRQ 的区别不仅是形态，更反映了黑洞吸积率的不同：BL Lac 的吸积率更低（ADAF/辐射低效吸积流），产生的辐射场不足以在 BLR 中激发强发射线；FSRQ 的吸积率接近爱丁顿极限，有强大的辐射场和 BLR（Ghisellini et al. 2011，_MNRAS_ 414，2674）。

---

## 相对论性喷流与多普勒增亮

BL Lac 天体的核心物理是相对论性喷流与观测视线之间的夹角极小（$\theta \lesssim 5^\circ$–$10^\circ$）。喷流中的等离子体以接近光速的速度运动，洛伦兹因子 $\Gamma \sim 5$–30。

多普勒放大因子（Doppler boosting factor）：

$$\delta = \frac{1}{\Gamma (1 - \beta \cos\theta)}$$

其中 $\beta = v/c$，$\theta$ 是喷流方向与视线的夹角。对于典型参数（$\Gamma = 10$，$\theta = 2^\circ$），$\delta \approx 15$–20。喷流的辐射通量被增亮了 $\delta^{3+\alpha}$ 倍（$\alpha$ 为谱指数），对于 $\delta \sim 15$，增亮因子可达约 $10^4$–$10^5$！这就是为什么正面朝向的喷流能在整个电磁波谱中主导宿主星系的辐射。

---

## 宽带辐射谱：从射电到 TeV

BL Lac 天体的宽带辐射谱（SED，spectral energy distribution）显示出两个鼓包结构：

**第一鼓包（低能）**：峰值在射电–X 射线范围，由喷流中相对论性电子在磁场中的**同步辐射**（synchrotron radiation）产生。峰频 $\nu_\mathrm{peak}$ 可从 $10^{13}$ Hz（低峰 BL Lac，LBL）到 $10^{17}$ Hz（高峰 BL Lac，HBL）。

**第二鼓包（高能）**：峰值在 $\gamma$ 射线范围，由以下机制产生：

- **同步自康普顿散射（SSC）**：同步辐射光子被同一区域的电子逆康普顿散射到高能 $\gamma$ 射线
- **外康普顿散射（EC）**：来自 BLR、尘埃环或吸积盘的外部光子被散射（在 BL Lac 中一般不重要，因为没有强外部光场）

按峰频分类：

- LBL（低峰 BL Lac）：$\nu_\mathrm{peak}^S < 10^{14}$ Hz，喷流辐射峰在红外
- IBL（中间峰 BL Lac）：$10^{14} < \nu_\mathrm{peak}^S < 10^{15}$ Hz
- HBL（高峰 BL Lac）：$\nu_\mathrm{peak}^S > 10^{15}$ Hz，峰值在 X 射线

Mrk 421 和 Mrk 501 是典型的 HBL，也是第一批被地面 Čerenkov 望远镜（Whipple 天文台）探测到 TeV $\gamma$ 射线的 AGN（Punch et al. 1992，_Nature_ 358，477；Quinn et al. 1996）。

---

## 快速光变：最极端的时间变化

BL Lac 天体的辐射在所有波段都高度变化，特征时标从数年到数分钟：

- **射电**：数月–数年，对应超新星事件或喷流组分
- **光学/X 射线**：数小时–数天，对应喷流内部冲击（internal shocks）
- **TeV $\gamma$ 射线**：最短可达数分钟，约束辐射区尺寸 $r < c \delta \Delta t$

Mrk 421 在2008年的一次 TeV 耀发中，变化时标约 $\Delta t \sim 5$ 分钟，意味着辐射区紧凑度 $r < \delta c \Delta t \sim 10^{12}$ cm——比银河系的黑洞史瓦西半径（$\sim 1.2 \times 10^{12}$ cm）还要小（Mrk 421 的黑洞质量约 $10^9 M_\odot$，$r_s \sim 3 \times 10^{14}$ cm，所以辐射区确实非常紧凑），是 AGN 喷流物理中观测到的最极端快变事件之一（Albert et al. 2007，_ApJ_ 669，862）。

---

## 统一图景中的角色

在 AGN 统一模型框架下，BL Lac 天体被认为是**无线喷流的射电星系**（FR I 型射电星系，Fanaroff & Riley Class I）的正视版本：

- FR I 射电星系（侧视）→ BL Lac 天体（正视）
- FR II 射电星系（侧视）→ 高光度耀变体 FSRQ（正视）

这一对应关系由 Urry & Padovani（1995）系统阐述，并得到宿主星系研究的支持：BL Lac 天体的宿主星系几乎都是大质量椭圆星系，与 FR I 射电星系的宿主一致（Falomo et al. 2014，_ARA&A_ 52，265）。

---

## 宇宙背景光探针

高能 $\gamma$ 射线在从 BL Lac 天体传播到地球的过程中，与**宇宙红外/光学背景光**（EBL，Extragalactic Background Light）发生 $\gamma\gamma \to e^+e^-$ 对产生吸收，导致 BL Lac 天体的 TeV 谱在高能端被"截断"。

通过测量不同红移 BL Lac 天体的 TeV 谱衰减，可以反推 EBL 的谱分布——EBL 是宇宙所有历史星系发出光的总和，直接测量极困难（前景银河系发光污染严重）。Fermi LAT 和地面 Čerenkov 阵列（MAGIC、HESS、VERITAS）利用 BL Lac 天体作为"宇宙灯塔"，已测量了 EBL 能谱（Ackermann et al. 2012，_Science_ 338，1190；Biteau & Williams 2015，_ApJ_ 812，60）。

---

## 多信使天文学的先驱

BL Lac 天体是高能天文学与**多信使天文学**的重要交汇点。Fermi 卫星发射以来（2008年），Fermi-LAT 在全天 $\gamma$ 射线巡天（$0.1$ GeV–300 GeV）中识别了数千个 AGN，其中耀变体（主要为 BL Lac 天体和 FSRQ）占 Fermi 探测到的河外 $\gamma$ 射线源的绝大多数（Ajello et al. 2020，_ApJ_ 892，105，第四版 Fermi LAT AGN 目录，4LAC-DR3 含约 3800 个耀变体）。

TeV BL Lac 天体还被认为是高能宇宙射线的候选来源之一——其强烈的相对论性喷流可以加速质子和重原子核至 $> 10^{18}$ eV，但宇宙射线源的直接证认仍未完成。BL Lac 天体与 IceCube 中微子事件的空间关联已有初步报告（Giommi et al. 2020），但统计显著性尚有争议。

---

## 跨学科连接

- **赛弗特星系**（`赛弗特星系.md`）：低光度、射电宁静的 AGN 另一端
- **AGN 与类星体**（`agn-and-quasars.md`）：AGN 大家族的整体框架
- **引力波天文学**（`../引力波天文学.md`）：SMBH 并合（与 BL Lac 宿主的大质量 SMBH 相关）

---

## 代表性 BL Lac 天体速查

| 天体         | 类型 | 红移        | 特点                                     |
| ------------ | ---- | ----------- | ---------------------------------------- |
| BL Lacertae  | LBL  | $z = 0.069$ | 原型天体，光学极变星                     |
| Mrk 421      | HBL  | $z = 0.031$ | 最近的 TeV BL Lac，第一个探测 TeV 的 AGN |
| Mrk 501      | HBL  | $z = 0.034$ | 1997年 TeV 大耀发，谱峰移至 100 keV      |
| 1ES 1959+650 | HBL  | $z = 0.047$ | "孤儿耀发"（有 TeV 爆发但无X射线对应）   |
| PKS 2155-304 | HBL  | $z = 0.117$ | HESS 最亮的南天 TeV 源                   |
| PKS 0716+714 | IBL  | $z = 0.31$  | 全频段极端快变，$\Delta t \sim$ 分钟     |

Fermi-LAT 4FGL-DR4 目录（Abdollahi et al. 2022）收录约 7000 个点源，其中约 5000 个与 AGN（主要是耀变体）关联，是目前最完整的高能 AGN 样本。

---

## 延伸阅读

- Urry, C. M. & Padovani, P. (1995). Unified schemes for radio-loud active galactic nuclei. _Publications of the Astronomical Society of the Pacific_, 107, 803–845.
- Punch, M. et al. (1992). Detection of TeV photons from the active galaxy Markarian 421. _Nature_, 358, 477–478.
- Ghisellini, G. et al. (2011). General physical properties of bright Fermi blazars. _Monthly Notices of the Royal Astronomical Society_, 414, 2674–2689.
- Falomo, R., Pian, E. & Treves, A. (2014). An optical view of BL Lacertae objects. _Annual Review of Astronomy and Astrophysics_, 52, 265–311.
- Ackermann, M. et al. (2012). Imprints of the extragalactic background light in the gamma-ray spectra of blazars. _Science_, 338, 1190–1192.
