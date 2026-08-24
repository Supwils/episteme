---
title: 量子传感：跨过标准量子极限
title_en: Quantum Sensing — Crossing the Standard Quantum Limit
status: published
updated: 2026-08-23
category: 量子精密测量
horizon: 2020s
order: 8
tags:
  - 量子传感
  - 光晶格钟
  - 压缩光
  - NV 色心
  - 标准量子极限
researchers:
  - Jun Ye（JILA / NIST，光晶格钟）
  - LIGO Scientific Collaboration（压缩真空）
  - Mikhail Lukin（哈佛大学，NV 色心磁力计）
  - Ronald Walsworth（哈佛大学）
  - Hidetoshi Katori（东京大学，光晶格钟）
institutions:
  - JILA / NIST（Boulder）
  - LIGO Hanford 与 Livingston
  - 哈佛大学
  - 东京大学
related:
  - quantum-error-correction
  - attosecond-physics
---

# 量子传感：跨过标准量子极限

2022 年 2 月，《自然》把封面给了一毫米高的原子云。科罗拉多 JILA 实验室的叶军（Jun Ye）组把大约十万个锶-87 原子关进一维光晶格，晶格沿重力方向铺开。云的顶端和底端只隔一毫米，他们却测到了广义相对论预言的引力红移：高处的钟走得稍快。要看见这个梯度，频率测量的相对不确定度必须压到 $7.6\times 10^{-21}$。[^redshift]

支撑这项实验的，是已经把系统误差压到 $2\times 10^{-18}$ 量级的锶光晶格钟。同一时期，NIST 的镱光晶格钟把系统不确定度报到 $1.4\times 10^{-18}$。[^clocks] $10^{-18}$ 不是抽象指标：在地球表面，高度差一厘米引起的引力红移大约就是这个量级；若一台这样的钟从宇宙大爆炸走到今天，累积误差大约半秒。时间在这里不再只是"计时"，它成了一种可以测海拔、测引力势的仪器。

另一条平行的前线在华盛顿州汉福德和路易斯安那州利文斯顿。2019 年，Advanced LIGO 在第三次观测运行（O3）中把压缩真空注入干涉仪的暗端口，在 50 Hz 以上把灵敏度提高最多约 3 dB，预期探测率因此上升 40%–50%。[^ligo2019] 2023 年起，A+ 升级的频域相关压缩进入观测，目标是在不牺牲低频的前提下继续压低高频散粒噪声。这两件事常被写成量子计算的"副产品"。这是错的。它们走的是另一条路。

## 破除误解：量子传感不是量子计算

量子计算要让许多量子比特互相纠缠、执行一段算法、最后读出一个答案。噪声是敌人，所以必须先过纠错门槛——那是 [[quantum-error-correction|量子纠错]] 正在啃的硬骨头。量子传感则是用一个量子系统去估计某个**经典参数**：磁场、频率、位移、加速度、引力势。你不需要一台通用计算机，只需要一个对目标参数极度敏感、对其余东西尽量不敏感的探针。原子钟已经工作了几十年；压缩光已经装进正在听引力波的干涉仪。它们不必等容错量子计算机造出来。

第二个误解是：一旦用上压缩或纠缠，精度就可以任意提高，仿佛量子力学给了一张空白支票。事实正好相反。对 $N$ 个彼此独立的探针，相位（或频率）估计的不确定度随 $1/\sqrt{N}$ 下降，这就是**标准量子极限**（standard quantum limit, SQL），来自投影噪声或光子散粒噪声。纠缠可以把标度改善到 $1/N$，称为海森堡极限。压缩更常见、也更谦逊：它不改变两个共轭量的不确定度乘积，只是把噪声从你关心的正交分量挤到你不关心的那一个上去。

卡尔顿·凯夫斯（Carlton Caves）1981 年就指出：在激光干涉仪里注入压缩真空可以压低散粒噪声，但共轭的辐射压噪声会上升。[^caves] 海森堡极限也不是"打破量子力学"——它仍然是量子力学给出的界。压缩几分贝是实验室里反复做到的事；真正按 $1/N$ 标度、并且在绝对精度上超过最好的未纠缠传感器，则要难得多。2025 年叶军组用自旋压缩在 $10^{-18}$ 水平跨过 SQL，计量增益约为 2.0 dB——有意义，但远不是数量级的飞跃。[^ye2025]

## 三条已经成形的路线

2020 年代真正站住的，不是一份产品目录，而是三条物理上很不相同、却共享同一套噪声语言的路线。

| 平台         | 主要测量量           | 2020s 水位                            | 部署程度                           |
| ------------ | -------------------- | ------------------------------------- | ---------------------------------- |
| 光晶格钟     | 频率、时间、引力势   | 系统不确定度 $\sim 10^{-18}$          | 实验室与可搬运样机；未改定义 SI 秒 |
| 压缩光干涉仪 | 位移、引力波应变     | O3 高频最多约 3 dB；A+ 做频域相关压缩 | LIGO / Virgo 观测运行中            |
| NV 色心      | 局域磁场、温度、电场 | 单 NV 纳米分辨；系综约 pT/√Hz         | 有商业扫描探针；纪录灵敏度在实验室 |

### 光晶格钟：把秒变成尺子

光晶格钟的核心是香取秀真（Hidetoshi Katori）在 2000 年代初提出的"魔波长"方案：用一束特定波长的驻波光把中性原子（锶、镱）钉在晶格点上，使钟跃迁几乎感觉不到光移位，同时获得成千上万个原子的统计优势。2020 年代的纪录已经稳定在 $10^{-18}$。限制项不再是"原子不够多"，而是黑体辐射频移、晶格光移位、碰撞频移，以及本地振荡器的相位噪声。

差分比较可以绕过本地振荡器。Bothwell 等人 2022 年的多路复用光晶格钟，在同步 Ramsey 询问下把相对统计不确定度做到 $8.9\times 10^{-20}$（3.3 小时平均）。这些钟还没有取代铯-133 超精细跃迁作为国际秒的定义。它们已经通过光纤和卫星链路向国际原子时供数，可搬运光钟也在欧洲和日本做过实地比对。从"实验室世界纪录"到"全国时间基准"，差的是长期运行和校准的可重复性，不是再压一个数量级的统计噪声。

戴维·温兰德（David Wineland）与塞尔日·阿罗什（Serge Haroche）2012 年分享诺贝尔物理学奖，表彰的正是"测量并操控单个量子系统"的实验方法。温兰德组的囚禁离子光钟是这条谱系的另一支：原子数少、系统评估极干净，与光晶格钟的多原子统计形成互补。

### 压缩光干涉仪：LIGO 已经在用

2011 年末，LIGO 汉福德的 H1 第一次把压缩真空注入正在运行的引力波干涉仪，高频散粒噪声下降 2.15 dB，且没有在任何频段变差。这是 2013 年《自然·光子学》记录的事。[^ligo2013] 真正进入观测运行是 2019 年的 O3：压缩成为日常操作，而不是一次实验展示。

代价立刻出现——凯夫斯四十年前写过的那笔账。压低高频散粒噪声，会抬高低频的量子辐射压噪声。O3 因此只敢把压缩用到大约 3 dB，并在低频做折中。A+ 升级的答案是**频域相关压缩**：让压缩光先经过一个长滤波腔，在低频转到辐射压正交、在高频转到相位正交。2023 年的宽带实验表明，这条路可以在观测频段上同时照顾两端。[^a-plus] 这是目前少数已经部署、并且每天都在产生科学数据的量子增强测量。

### NV 色心：把磁力计做到纳米

金刚石里的氮—空位（NV）色心是一个室温可工作的电子自旋。绿光可以初始化它，红光荧光可以读出它，微波可以驱动它。磁场通过塞曼效应把能级拉开，于是荧光变成一张磁场的地图。

泰勒（J. M. Taylor）、卢金（Mikhail Lukin）、沃尔斯沃思（Ronald Walsworth）等人 2008 年给出了这条路线的图景：单 NV 追求纳米空间分辨，系综 NV 追求接近原子气室的磁场灵敏度。[^nv2008] 十几年后实验大致停在这个分叉上。单 NV 扫描探针可以画电流、畴壁和斯格明子，空间分辨到十几纳米，灵敏度通常在 nT/√Hz。系综器件的宽带灵敏度大约在 pT/√Hz，距离 2008 年那个飞特斯拉预言仍差几个数量级——高密度掺杂会引入替位氮，把相干时间砍掉两到三个数量级。[^nv-rmp] 室温、大气、甚至活细胞里都能工作，这是原子钟和 LIGO 给不了的。商业扫描探针已经卖给材料实验室；创纪录的灵敏度仍留在少数精心屏蔽的光学平台上。

## 代价：退相干、校准、以及"已经在用"的边界

退相干是所有量子传感器的共同税。NV 在室温的 $T_2$ 往往只有微秒到毫秒；光钟的相干时间被本地激光的线宽卡住；压缩光每经过一个有损耗的镜面，压缩度就往真空涨落回退一点。增益不是免费的：为压低一个正交分量付出的反压缩，会在损耗中变成真正的噪声。

校准是另一道墙，而且更不像"量子问题"。光钟要把真空腔的温度测准，才能扣除黑体辐射频移；LIGO 要把压缩正交角锁在正确的频率曲线上；NV 要把应变、温度和离轴磁场从塞曼信号里拆开。许多"量子优势"演示只在差分测量里成立：两个几乎相同的传感器对着减，系统误差抵消，统计噪声才看得见。把差分优势翻译成对一个未知绝对量的测量，校准预算往往重新变成主角。

部署地图也必须画清楚。全球导航用的是微波铯钟和铷钟，不是光晶格钟。光钟的 $10^{-18}$ 是实验室和少数可搬运装置的数字。压缩真空已经在 LIGO 和 Virgo 的观测运行里昼夜工作，这是目前最硬的"已部署"案例。NV 磁力计有商品化的扫描探头，但纪录灵敏度和生物成像仍主要在实验室。一个只在特定差分协议下领先 2 dB、却需要一整座光学平台的装置，对应用来说可能仍输给更稳、更好校准的经典方案。Degen、Reinhard 与 Cappellaro 2017 年的综述把这一点写得很干脆：量子传感是用量子系统去测一个物理量，不是一张保证超越经典的执照。[^degen]

## 未知的边界

- 光钟能否在保持 $10^{-18}$ 系统不确定度的同时，把自旋压缩的增益从"演示的几分贝"变成可日常运行的稳定优势？2025 年的 2 dB 是信号，不是终点。
- 频域相关压缩在 LIGO A+ 以及未来的 Einstein Telescope、Cosmic Explorer 上，最终能把量子噪声压到什么程度？镜面损耗和滤波腔稳定性会先碰到哪一个？
- NV 系综怎样在提高密度的同时保住相干时间？这几乎就是固体量子传感的核心材料问题。
- 海森堡标度在多参数、有噪声、且必须实时给出结果的测量里，是否还有操作意义？理论界对此并无共识。

## 跨域连接

- **[[quantum-measurement|量子测量]]**：传感把测量从"读出一个本征值"改写成"估计一个经典参数"。**投影本身就是噪声来源**——SQL 的 $1/\sqrt{N}$ 正是有限次投影的统计后果。压缩和量子非破坏测量并不取消测量，**它们只重新分配你愿意承担的那一份不确定度**。
- **[[spectroscopy|光谱学]]**：光晶格钟和 NV 色心本质上都是光谱仪，只不过把谱线中心当成尺子来用。**线宽、系统频移和本地振荡器稳定性决定你能把中心定到多准**，这与化学里指认分子指纹是同一套约束。阿秒光谱把时间轴拉到电子运动的尺度，**光钟则把频率轴拉到引力红移能被看见的尺度**。
- **[[statistics|统计学]]**：跨过 SQL 之后，误差预算的主角往往从量子投影噪声换成系统误差。**一个 2 dB 的计量增益，如果校准不确定度比它更大，对最终结果几乎没有贡献。**这不是量子特有的教训：**任何精密测量的最后一位有效数字，都是统计模型与系统模型在抢权**。
- **[[fourier-analysis|傅里叶分析]]**：LIGO 的频域相关压缩是把"该压哪一个正交分量"写成频率的函数。**时域里的共轭代价，在频域里变成一条可以设计的滤波器。**海森堡的不确定度关系在这里不是哲学，**它就是干涉仪噪声谱必须服从的傅里叶变换约束**。
- **[[quantum-decoherence|量子退相干]]**：纠缠和压缩能用的时间，被相干时间硬切开。**NV 的室温优势和它较短的 $T_2$ 是同一枚硬币的两面**；光钟把原子藏进魔波长晶格，也是在买时间。没有一条量子传感路线能绕过这道税，**差别只在于谁把税交在材料上、谁交在激光上、谁交在光学损耗上**。

---

## 参考文献

- Degen, C. L., Reinhard, F. & Cappellaro, P. _Quantum sensing._ Reviews of Modern Physics 89, 035002 (2017). doi:10.1103/RevModPhys.89.035002.
- Caves, C. M. _Quantum-mechanical noise in an interferometer._ Physical Review D 23, 1693 (1981). doi:10.1103/PhysRevD.23.1693.
- Aasi, J. et al. (LIGO Scientific Collaboration). _Enhanced sensitivity of the LIGO gravitational wave detector by using squeezed states of light._ Nature Photonics 7, 613–619 (2013). doi:10.1038/nphoton.2013.177.
- Tse, M. et al. _Quantum-Enhanced Advanced LIGO Detectors in the Era of Gravitational-Wave Astronomy._ Physical Review Letters 123, 231107 (2019). doi:10.1103/PhysRevLett.123.231107.
- Ganapathy, D. et al. _Broadband Quantum Enhancement of the LIGO Detectors with Frequency-Dependent Squeezing._ Physical Review X 13, 041021 (2023). doi:10.1103/PhysRevX.13.041021.
- McGrew, W. F. et al. _Atomic clock performance enabling geodesy below the centimetre level._ Nature 564, 87–90 (2018). doi:10.1038/s41586-018-0738-2.
- Bothwell, T. et al. _Resolving the gravitational redshift across a millimetre-scale atomic sample._ Nature 602, 420–424 (2022). doi:10.1038/s41586-021-04349-7.
- Bothwell, T., Kennedy, C. J., Aeppli, A. et al. _Differential clock comparisons with a multiplexed optical lattice clock._ Nature 602, 425–430 (2022). doi:10.1038/s41586-021-04344-y.
- Taylor, J. M. et al. _High-sensitivity diamond magnetometer with nanoscale resolution._ Nature Physics 4, 810–816 (2008). doi:10.1038/nphys1075.
- Barry, J. F. et al. _Sensitivity optimization for NV-diamond magnetometry._ Reviews of Modern Physics 92, 015004 (2020). doi:10.1103/RevModPhys.92.015004.
- Yang, Y. A. et al. _Clock Precision beyond the Standard Quantum Limit at $10^{-18}$ Level._ Physical Review Letters 135, 193202 (2025). doi:10.1103/6v93-whwq.
- Wineland, D. J. _Nobel Lecture: Superposition, entanglement, and raising Schrödinger’s cat._ Reviews of Modern Physics 85, 1103 (2013). doi:10.1103/RevModPhys.85.1103.

[^redshift]: Bothwell et al., Nature 602, 420 (2022). 毫米尺度锶样品内的引力红移；频率不确定度 $7.6\times 10^{-21}$。

[^clocks]: Bothwell et al., Metrologia 56, 065004 (2019)：JILA SrI 系统不确定度 $2.0\times 10^{-18}$。McGrew et al., Nature 564, 87 (2018)：NIST 镱钟 $1.4\times 10^{-18}$。

[^ligo2019]: Tse et al., Phys. Rev. Lett. 123, 231107 (2019)。O3 中压缩态将 50 Hz 以上灵敏度提高最多约 3 dB。

[^caves]: Caves, Phys. Rev. D 23, 1693 (1981)。干涉仪量子辐射压与压缩真空方案。

[^ye2025]: Yang et al., Phys. Rev. Lett. 135, 193202 (2025)。自旋压缩钟分数频率精度 $1.1\times 10^{-18}$，相对 SQL 增益 2.0(2) dB。

[^ligo2013]: Aasi et al., Nature Photonics 7, 613 (2013)。H1 注入压缩真空，高频散粒噪声下降 2.15 dB。

[^a-plus]: Ganapathy et al., Phys. Rev. X 13, 041021 (2023)。Advanced LIGO 频域相关压缩。

[^nv2008]: Taylor et al., Nature Physics 4, 810 (2008)。室温金刚石 NV 磁力计方案。

[^nv-rmp]: Barry et al., Rev. Mod. Phys. 92, 015004 (2020)。系综 NV 灵敏度受替位氮限制，当时约 $1\,\mathrm{pT}/\sqrt{\mathrm{Hz}}$。

[^degen]: Degen, Reinhard & Cappellaro, Rev. Mod. Phys. 89, 035002 (2017)。量子传感的操作定义与 SQL / 海森堡极限。
