---
title: 事件视界望远镜
titleEn: Event Horizon Telescope
category: 多信使天文学
tags: [事件视界望远镜, EHT, M87, Sgr A*, 黑洞成像, 甚长基线干涉, 广义相对论]
updated: 2026-06-13
---

# 事件视界望远镜：拍摄黑洞的"照片"

## 概述

**事件视界望远镜**（Event Horizon Telescope，**EHT**）是一个全球毫米波射电望远镜阵列，通过**甚长基线干涉测量**（Very Long Baseline Interferometry，VLBI）技术，将分布在地球各大洲的多台射电望远镜联网，形成一台等效口径约等于地球直径（约 $12000$ km）的超大望远镜，达到约 $20$ 微角秒（$\mu$as）的角分辨率——这足以在月球上阅读报纸上的字，或在距地球 $54$ 百万光年处分辨出事件视界尺度的结构。

**2019 年 4 月 10 日**，EHT 发布了人类第一张黑洞"照片"——室女座星系 **M87** 中心超大质量黑洞 **M87\*** 的毫米波图像，呈现出一个明亮的圆环和中央暗影，与广义相对论的预测高度吻合。**2022 年 5 月 12 日**，EHT 发布了银河系中心黑洞 **Sgr A\*** 的图像——比 M87\* 近得多，但变化极快，挑战了数据处理极限。

## VLBI技术：将地球变成望远镜

望远镜的角分辨率正比于 $\lambda/D$（$\lambda$ 是波长，$D$ 是口径）。射电波长比可见光长约 $10^5$ 倍，因此要达到与光学望远镜相当的分辨率，需要远大得多的口径。

**VLBI 的核心思想**：在地球上两台甚至数台射电望远镜同时观测同一目标，记录精确时间戳的射电信号（用原子钟同步），事后在超级计算机上通过"相关处理"（correlation）求两台望远镜信号的互相关函数，等效于一台口径为两台之间基线长度的大望远镜——这就是**综合孔径干涉**。

EHT 在 $1.3$ mm 波长（$230$ GHz 频率）工作，基线最长约 $10^4$ km（地球直径），合成角分辨率约 $20$ $\mu$as。

**数据量**：每台望远镜每秒记录约 $64$ Gbit 的射电数据，写入硬盘。EHT 2017 年观测活动产生了约 $5$ 拍字节（PB）的数据，装在硬盘上用飞机运输到相关处理中心（当时南极洲的 SPT 望远镜因冬季而无法用网络传输）。

## 参与望远镜

EHT 2017 年观测（产生 M87\* 图像的数据）使用了 8 个站点的望远镜：

| 站点     | 望远镜                              | 地点     |
| -------- | ----------------------------------- | -------- |
| ALMA     | 阿塔卡马大型毫米波阵列（66 面天线） | 智利     |
| APEX     | 阿塔卡马探路者实验                  | 智利     |
| IRAM 30m | 30 米望远镜                         | 西班牙   |
| JCMT     | 詹姆斯·克拉克·麦克斯韦尔望远镜      | 夏威夷   |
| LMT      | 大型毫米波望远镜                    | 墨西哥   |
| SMA      | 亚毫米阵列                          | 夏威夷   |
| SMT      | 亚毫米波望远镜                      | 亚利桑那 |
| SPT      | 南极点望远镜                        | 南极洲   |

此后，格陵兰望远镜（GLT）、诺埃玛望远镜（NOEMA，法国）等也加入 EHT。

## M87\*：第一张黑洞"照片"

**M87\***（室女座 A 星系中心黑洞）是首个成像目标的选择理由：

- **质量**：$6.5 \pm 0.7 \times 10^9\,M_\odot$，是已知最重的超大质量黑洞之一
- **视界角径**：约 $42\,\mu$as——尽管距离约 $16.5$ Mpc（约 5400 万光年），其巨大质量使视界在天球上的张角仍约 $40$ $\mu$as，恰好在 EHT 分辨率范围内
- **著名喷流**：M87 的相对论喷流延伸超过 $5000$ 光年，是研究喷流起源的最佳系统

### 2019 年发布的图像

图像呈现：

1. **亮环**（bright ring）：直径约 $42$ $\mu$as 的圆环，内侧有暗影（"黑洞阴影"）
2. **亮度不对称**：南侧（图像中底部）比北侧亮约 $1.2$ 倍，与内盘气体朝向地球运动（蓝移端，多普勒增亮）一致
3. **中央暗影**（shadow）：暗影大小约 $38$–$48$ $\mu$as，与 GR 预测的光子环大小（约 $5\,GM/c^2$）高度吻合

图像结果从多个独立成像方法（CLEAN、正则化最大似然、机器学习方法）收敛到一致结果，表明图像不依赖于具体算法选择。

（Event Horizon Telescope Collaboration 2019，_The Astrophysical Journal Letters_，875，L1–L6，共 6 篇论文）

### 2021 年的偏振图像

EHT 在 2021 年发布了 M87\* 的**偏振图像**（Event Horizon Telescope Collaboration 2021，_The Astrophysical Journal Letters_，910，L12）：在圆环的不同位置，线偏振方向有规律地排列成螺旋状，与黑洞周围大尺度有序磁场（可能是"磁遏制吸积盘"MAD 状态）的模拟一致，为 Blandford-Znajek 喷流机制提供了间接证据。

## Sgr A\*：银河系中心黑洞

**Sgr A\***（Sagittarius A\*，人马座 A\*）是银河系中心的超大质量黑洞：

- **质量**：$4.15 \times 10^6\,M_\odot$（比 M87\* 轻约 $1500$ 倍）
- **距离**：约 $8.15$ kpc（$2.66$ 万光年），是地球上可观测的"最近"超大质量黑洞
- **视界角径**：约 $52\,\mu$as，与 M87\* 相近（质量小但距离近，两者相差不大）

**挑战**：Sgr A\* 的物理时标远比 M87\* 短——绕黑洞一周的轨道时间约 $30$ 分钟（而 M87\* 约 $1$ 个月），这意味着在 EHT 几天的观测时间里，Sgr A\* 的结构不断变化，是一个"会动的目标"。为此，EHT 团队开发了新的成像方法，对时间平均时变信号进行建模。

另一个困难是银河系弥散星际介质对毫米波信号的散射：视线方向穿过银河系中心区域，自由电子使 Sgr A\* 的图像在 $\sim$1 mm 处出现额外的散射模糊（约 $20\,\mu$as），需要数据处理中加以去卷积。

**2022 年发布的图像**（Event Horizon Telescope Collaboration 2022，_The Astrophysical Journal Letters_，930，L12–L17）同样呈现清晰的亮环和中央暗影，结构与 M87\* 一致（尽管两者质量差 $1500$ 倍），再次验证了广义相对论在强场区域的普适性。

## EHT 对广义相对论的检验

EHT 图像为检验广义相对论提供了前所未有的机会：

**"无毛定理"初步检验**：广义相对论预言黑洞由质量、自旋和电荷完全描述。EHT 测量的光子环大小与 GR 预测在约 $10\%$–$20\%$ 的精度上一致，排除了某些替代引力理论（如 $f(R)$ 引力下允许的更大偏差）。

**轨道频率约束**：对 M87\* 周围亮斑"轨道运动"的检测（若实现）可约束黑洞自旋。2023 年，Wielgus et al. 在 M87\* 的 ALMA 毫米波流量中识别出约 $\sim 5$ 天的准周期振荡，被解释为内盘亮斑的轨道运动。

**Sgr A\* 的周围轨道**：GRAVITY 干涉仪（VLT）通过跟踪绕 Sgr A\* 轨道的恒星（尤其是 S2 星，2018 年近星点通过测量到引力红移和史瓦西进动，GRAVITY Collaboration 2018，_Astronomy & Astrophysics_，618，L10），给出了 Sgr A\* 质量和距离的最精确测量，同时是对强场 GR 的精确检验。

## ngEHT 与未来

**新一代 EHT**（next-generation EHT，ngEHT）计划加入更多站点（目标约 $20$–$25$ 台），实现：

- 动态电影成像（movie imaging）：跟踪 Sgr A\* 和 M87\* 的时间变化结构
- 更高频率观测（$345$ GHz，约 $0.87$ mm），提升分辨率到约 $15$ $\mu$as
- 圆偏振测量：探测黑洞磁层中的法拉第旋转和磁场结构

目标是真正"看到"内吸积盘的动力学过程和喷流启动区域。

## 为什么这很重要

EHT 是人类智慧工程的里程碑：将地球上分散的射电望远镜整合为一台地球尺度的"超级望远镜"，拍摄到人类曾认为永远无法直接观测的天体——黑洞事件视界附近的时空。它不仅是视觉上的震撼，更是对广义相对论在极强引力场中的首次真正"成像检验"，以及对黑洞磁层、吸积盘和喷流物理的直接窗口。

## 跨领域连接

- **黑洞吸积盘与相对论喷流**（`../致密天体/accretion-disks-relativistic-jets.md`）：M87\* 的偏振图像揭示吸积盘磁场结构和喷流启动区
- **黑洞自旋测量**（`../致密天体/black-hole-spin-measurement.md`）：EHT 图像亮度不对称性对自旋方向提供约束
- **引力波探测器 LIGO 与 LISA**（`gravitational-wave-detectors-ligo-lisa.md`）：未来 LISA 观测 SMBH 引力波，EHT 观测其电磁对应体
- **超大质量黑洞**（`../致密天体/supermassive-black-holes.md`）：EHT 是研究超大质量黑洞最直接的工具

## 参考文献

- Event Horizon Telescope Collaboration (2019). First M87 Event Horizon Telescope Results. I. _The Astrophysical Journal Letters_, 875, L1.
- Event Horizon Telescope Collaboration (2019). First M87 Event Horizon Telescope Results. VI. _The Astrophysical Journal Letters_, 875, L6. — 黑洞质量测量和广义相对论检验
- Event Horizon Telescope Collaboration (2021). First M87 Event Horizon Telescope Results. VII. Polarization. _The Astrophysical Journal Letters_, 910, L12.
- Event Horizon Telescope Collaboration (2022). First Sagittarius A* Event Horizon Telescope Results. I. *The Astrophysical Journal Letters\*, 930, L12.
- GRAVITY Collaboration (2018). Detection of orbital motions near the last stable circular orbit of the massive black hole SgrA*. *Astronomy & Astrophysics\*, 618, L10.

## 延伸阅读

- Falcke, H. & Markoff, S. (2013). Toward the event horizon — the supermassive black hole in the Galactic Center. _Classical and Quantum Gravity_, 30, 244003. — EHT 建设前的科学动机综述
- Johnson, M.D. et al. (2020). Universal interferometric signatures of a black hole's photon ring. _Science Advances_, 6, eaaz1310. — 光子环理论及其可观测性
- Doeleman, S. et al. (2019). Imaging an event horizon: submm-VLBI of a super massive black hole. _Astro2020 Science White Paper_. arXiv:1909.01411.
