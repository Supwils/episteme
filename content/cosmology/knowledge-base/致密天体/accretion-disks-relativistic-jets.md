---
title: 黑洞吸积盘与相对论喷流
titleEn: Black Hole Accretion Disks and Relativistic Jets
category: 致密天体物理学
tags: [吸积盘, 相对论喷流, 黑洞, AGN, X射线双星, 磁流体动力学]
updated: 2026-09-09
---

# 黑洞吸积盘与相对论喷流：宇宙中最高效的能量转化机器

## 概述

**吸积**（accretion）是宇宙中最重要的能量转化机制之一：物质在引力作用下落向致密天体（黑洞、中子星、白矮星），将引力势能转化为辐射能量。黑洞吸积的效率约为 $6$–$42\%$（取决于黑洞自旋），远高于核聚变（约 $0.7\%$）和化学反应（约 $10^{-9}\%$）。如果物质不能直接径向落入，而是携带角动量形成**吸积盘**（accretion disk），系统将变得更加复杂和有趣：吸积盘成为辐射强烈的热等离子体，同时可能产生沿旋转轴方向喷出的**相对论喷流**（relativistic jets）。理解吸积过程，是理解类星体、活动星系核（AGN）、X 射线双星和伽马射线暴的关键。

常见误解是把喷流当成黑洞往外喷火，把盘当成一张被烤热的铁饼。发光的是视界外的等离子体：盘把轨道能换成辐射，喷流沿转轴把能量送到远处。两者可以同时开，也可以一个亮一个暗，取决于吸积率和磁场有没有堆到视界上。

## 吸积的基本物理

### 爱丁顿光度

任何吸积系统都受**爱丁顿光度**（Eddington luminosity）限制：当辐射压力等于引力时，吸积无法继续增大：

$$L_{Edd} = \frac{4\pi G M c}{\kappa_{es}} \approx 1.26 \times 10^{38}\,\text{erg/s} \times \left(\frac{M}{M_\odot}\right)$$

其中 $\kappa_{es}$ 是电子散射不透明度（对完全电离的氢，$\kappa_{es} \approx 0.34$ cm$^2$/g）。实际吸积系统可以短暂超过爱丁顿光度（超爱丁顿吸积），此时物质通过吸积盘内的辐射泡被推走，形成"超临界吸积"状态，在某些超亮 X 射线源（Ultra-Luminous X-ray Sources, ULX）中可能存在。

爱丁顿光度假定球对称、电子散射、氢完全电离。真实的盘是扁平的，光子可以从漏斗逃走，气体可以从赤道补进来。所以它是一条标尺，不是一道不可逾越的墙。超亮 X 射线源里看到的超爱丁顿候选，首先该问几何是不是已经破了球对称，而不是先改重力常数。

用这条线去反推黑洞质量，必须先假定源真的贴着极限在发光。若实际吸积率低得多，质量会被低估；若辐射从漏斗漏走，表面光度也可以暂时越过这条线。标尺有用，前提是把假设说清楚。

### 吸积效率

从无穷远落向黑洞的物质所释放的引力势能约为：

$$\epsilon = \frac{G M}{R_{ISCO} c^2} = \frac{1}{2 r_{ISCO}/r_g}$$

其中 $R_{ISCO}$ 是**最内稳定圆轨道**（Innermost Stable Circular Orbit, ISCO）半径，$r_g = GM/c^2$ 是引力半径。

- 非自旋（史瓦西）黑洞：$R_{ISCO} = 6\,r_g$，$\epsilon \approx 6\%$（或确切值 $1 - \sqrt{8/9} \approx 5.72\%$）
- 极度顺向自旋（极端克尔）黑洞：$R_{ISCO} \to r_g$，$\epsilon \to 42\%$
- 极度逆向自旋黑洞：$R_{ISCO} = 9\,r_g$，$\epsilon \approx 3.8\%$

这就是为什么黑洞自旋测量至关重要——自旋决定了黑洞系统辐射效率和喷流功率。

效率公式把内边缘钉在最内稳定圆轨道上，这是薄盘的翻译，不是所有吸积流都适用。辐射低效的热流可以把热量带着往里走，观测光度远低于这个效率乘吸积率。所以看见一个暗核，不能直接说黑洞转得慢。[[black-hole-spin-measurement|自旋测量]]问的是内边缘在哪；光度问的是热量有没有被辐射掉。两道题不能并成一道。

## 标准薄盘模型（Shakura-Sunyaev 模型）

1973 年，尼古拉·沙库拉（Nikolai Shakura）和拉什德·苏尼亚耶夫（Rashid Sunyaev）提出了第一个自洽的吸积盘模型（Shakura & Sunyaev 1973，_Astronomy & Astrophysics_，24，337），奠定了吸积盘理论的基础。

**标准薄盘**（Shakura-Sunyaev disk，或 $\alpha$ 盘）的基本假设：

- 盘在垂直方向厚度远小于半径（几何薄盘，$H/R \ll 1$）
- 气体以近圆轨道绕黑洞旋转（开普勒旋转）
- 粘滞（viscosity）将角动量向外输运，使物质向内螺旋落入
- 粘滞产生的热量在局部辐射出去（光学厚，黑体辐射）

薄盘能写出温度随半径的负四分之三次方，是因为局部粘滞加热被假定就地辐射掉。剪切来自开普勒转动差：内圈快、外圈慢，粘滞力矩把角动量往外送、把质量往里送。没有这一条，气体会在圆轨道上永远转，落不下去。

薄盘的温度分布（忽略辐射压，对 $r \gg R_{ISCO}$）：

$$T(r) \approx 6.3 \times 10^5\,\text{K} \left(\frac{\dot{M}}{\dot{M}_{Edd}}\right)^{1/4} \left(\frac{M}{M_\odot}\right)^{-1/4} \left(\frac{r}{r_g}\right)^{-3/4}$$

（其中 $\dot{M}$ 是吸积率，$\dot{M}_{Edd}$ 是对应爱丁顿光度的吸积率）薄盘的积分谱是多温黑体（multi-color blackbody，MCD）叠加，峰值温度：

- 恒星级黑洞（$10\,M_\odot$）：约 $10^7$ K，峰值在软 X 射线（约 $1$ keV）
- 超大质量黑洞（$10^8\,M_\odot$）：约 $10^5$ K，峰值在紫外（约 $10$ eV）

同一套 $T \propto r^{-3/4}$，质量越大峰值越冷。所以[[x-ray-binaries|X射线双星]]的热态在软 X 射线，[[活动星系核与类星体|活动星系核]]的大蓝包在紫外。把两者当成两种无关的机器，会看不出它们共用一张薄盘光谱。

**粘滞参数 $\alpha$**：薄盘无法从第一原理确定粘滞机制，Shakura & Sunyaev 引入参数化粘滞 $\nu = \alpha c_s H$（$c_s$ 是声速，$H$ 是盘高），$\alpha \approx 0.01$–$0.4$ 需要由观测拟合。这一自由参数反映了理论的不完整性——实际粘滞机制直到 1991 年才由**磁旋转不稳定性**（MRI，Balbus & Hawley 1991）给出物理解释。

α 不是从第一原理算出来的粘滞系数，它把未知的湍流应力写成压强的一个分数。Balbus 与 Hawley 指出，弱磁场在差分转动盘里会指数放大，这才给 α 一个物理来源。在那之前，所有拟合出来的 α 都是在一个待定常数上滑。

广义相对论下的对应物是 Novikov 与 Thorne 1973 年的薄盘：内边界被放到最内稳定圆轨道，并假定那里粘滞力矩为零。这个零力矩边界让模型在 ISCO 处奇异，对光谱拟合通常够用，对盘振荡之类依赖内边界的问题不够。

## 超临界吸积与辐射低效吸积

标准薄盘只是吸积的一种状态。不同的吸积率对应不同的物理模式：

### 辐射低效吸积流（RIAF/ADAF）

当吸积率极低（$\dot{M} \ll \dot{M}_{Edd}$）时，盘密度很低，光子平均自由程超过盘厚，辐射无法有效冷却气体。热量积累在等离子体中（"辐射低效"），气体形成厚盘或热晕。**吸积主导的吸积流**（ADAF，Narayan & Yi 1994，_The Astrophysical Journal_，428，L13）是此状态的典型模型，解释了银河系中心 Sgr A\* 的低光度。

Sgr A\* 那么暗，不是因为附近没有气体，而是因为密度低到光子逃出去之前来不及把热辐射掉。热量被等离子体带着往里走，一部分 advect 进视界。这和薄盘的就地冷却正好相反，所以不能用同一张多温黑体去套银河系中心。

### 超爱丁顿吸积（超临界盘）

当 $\dot{M} \gg \dot{M}_{Edd}$ 时，辐射压力强到无法忽略，盘变厚（$H/R \sim 1$），辐射通过"吹走"盘内侧物质泄压（radiative driven outflow），系统光度接近但不大幅超过 $L_{Edd}$。

吸积率远超爱丁顿对应值时，径向速度和径向压力梯度都不能再忽略，热量也会随流体一起往里走。Abramowicz 等人 1988 年的 slim disk 就是在薄盘方程上把这些项加回去。光子在致密内区被困住一段时间，表面光度不必按吸积率线性往上爬。

超临界与辐射低效并不是“吸积率刻度上的两个旋钮档位”那么简单。同一颗黑洞可以在不同时段横跨几种模式：外盘仍可近似薄盘，内区却已变成热晕或厚盘；喷流功率也不必跟着光度同步升降。观测上把硬态、软态、 quiescent 状态画成一条序列，背后往往是几何与冷却通道在换，而不是质量在变。把光度直接换成吸积率，等于默认了薄盘效率始终成立——这正是 RIAF 与超临界盘要提醒你的失效条件。

## 相对论喷流的物理机制

**相对论喷流**（relativistic jets）是吸积盘系统最引人注目的现象之一——沿旋转轴方向喷出的准直等离子体流，洛伦兹因子 $\Gamma = 10$–$50$（某些情况下更高），携带大量能量向数百万光年之外传播。

### 喷流的产生：Blandford-Znajek 机制

目前最广泛接受的喷流驱动机制是 **Blandford-Znajek（BZ）机制**（Blandford & Znajek 1977，_Monthly Notices of the Royal Astronomical Society_，179，433）：

**旋转黑洞的自旋能量**通过磁场提取，转化为喷流的动能：

1. 大尺度磁场穿过黑洞视界
2. 旋转黑洞（克尔黑洞）的"帧拖曳效应"（frame dragging）带动磁场旋转
3. 旋转的磁场产生电动势，向外驱动高度准直的相对论等离子体流

BZ 功率正比于黑洞自旋的平方和穿过视界的磁通量：

$$P_{BZ} \propto a^2 \Phi_B^2$$

其中 $a$ 是自旋参数（$0 \le a \le 1$），$\Phi_B$ 是通过黑洞视界的磁通量。这意味着喷流的强弱依赖于黑洞自旋和吸积盘中的磁场积累程度。近年来的一般相对论磁流体动力学（GRMHD）数值模拟（如 HARM 代码，Gammie et al. 2003）支持 BZ 机制，并发现"磁遏制吸积盘"（Magnetically Arrested Disk, MAD）状态下喷流效率最高（接近甚至超过吸积能量释放，因为提取了黑洞自旋能量）。

喷流不是盘面热辐射的漏光。Blandford 与 Znajek 的通道抽的是旋转黑洞的转动能，前提是有大尺度磁场穿过视界。盘仍然重要：磁场要靠落入的等离子体维持，所以有自旋不是必有强喷流。

磁通量在视界上堆到一定程度，进流会被磁压力挡住，形成所谓磁遏制盘。Tchekhovskoy、Narayan 与 McKinney 2011 年的模拟表明，这种状态下喷流功率可以高到接近甚至超过吸积释放的轨道能，多出来的部分来自黑洞自旋。这解释的是效率上限，不是给某一颗核当场报一个功率。

### 内部冲击与同步辐射

喷流内部的等离子体以不均匀速度喷出，快速流体追上慢速流体时发生**内部冲击**（internal shocks），将动能转化为辐射。被加速的相对论性电子在喷流磁场中产生**同步辐射**（synchrotron radiation），从射电到 X 射线都有贡献。

看见一条长喷流，并不等于看见了视界上的磁场几何。后者要靠偏振和视界尺度成像去约束。同步辐射只说明沿途有相对论电子和磁场，启动区仍藏在更小的尺度里。

盘风是另一条通道。Blandford 与 Payne 1982 年指出，盘面上的开口磁力线可以把物质离心抛出，不必穿过视界。观测到的喷流往往是视界抽取和盘风的叠加，不能预先指定只有一种。

## 观测：M87* 和 Sgr A*

**事件视界望远镜**（Event Horizon Telescope, EHT）在 2019 年和 2022 年分别发布了 M87* 和 Sgr A* 的黑洞"照片"——实际上是吸积盘的热辐射经引力透镜扭曲后的毫米波图像：

- **M87\***：质量约 $6.5 \times 10^9\,M_\odot$（Event Horizon Telescope Collaboration 2019，_The Astrophysical Journal Letters_，875，L1），图像显示清晰的亮环（光子轨道）和南北不对称（来自多普勒增亮），与 GRMHD 模拟吻合良好。M87 的喷流延伸超过 $5{,}000$ 光年，是研究喷流结构的最佳靶标
- **Sgr A\***：质量约 $4.15 \times 10^6\,M_\odot$（Event Horizon Telescope Collaboration 2022），吸积率极低（约 $10^{-9}\,M_\odot$/yr），处于 RIAF 状态

这两个结果是广义相对论强引力场区域的直接检验，均与 GR 预言高度吻合。

[[event-horizon-telescope|事件视界望远镜]]发布的不是相机快门拍下的底片，而是毫米波可见度经重建得到的图像。环是光子轨道附近的亮结构，中央暗的是阴影，不是把视界轮廓描了一遍。质量以合作组论文为准，这里不另报一套数字。

M87* 有一条延伸极远的喷流，Sgr A* 几乎看不见同等的大尺度喷流。同一套成像阵列看见两个阴影，喷流功率却可以差出许多，说明阴影大小主要由质量与距离之比决定，喷流还要另有磁场和自旋。把两张图读成“喷流已经从视界上拍到了”，会把阴影和喷流启动区混成一件事。

## 黑洞吸积在宇宙学中的角色

黑洞吸积不只是局部物理，而是宇宙演化的关键驱动：

- **AGN 反馈**：超大质量黑洞的喷流和辐射风将大量能量注入宿主星系的气体，抑制恒星形成（"负反馈"），解释了为什么大质量椭圆星系几乎没有年轻恒星
- **宇宙 X 射线背景**：遍布宇宙的 AGN（类星体）吸积辐射构成了宇宙 X 射线背景的大部分
- **重子物质循环**：吸积将气体"燃烧"为辐射，而喷流将能量和物质输送到数百万光年外的星系际介质（ICM）

反馈不是把星系吹走那么简单。辐射模式主要靠光子加热晕里的气体；喷流模式主要靠动能在星系际介质里吹气泡。两种通道随吸积率切换，观测上并不总是同时打开。关掉这一项，大质量星系在模拟里会继续造星、长得过蓝。

## 为什么这很重要

黑洞吸积盘和喷流将极端物理（强引力、强磁场、相对论等离子体）与宇宙学尺度的反馈连接起来。吸积是宇宙中效率最高的能量转化过程，在激活类星体、驱动宇宙射线、维持星系演化平衡方面扮演中心角色。EHT 对 M87* 和 Sgr A* 的直接成像，将长期作为理论模型的关键约束。

薄盘给出光谱，爱丁顿给出标尺，喷流给出远程输运。三件事共用一套引擎，却各自有自己的失效条件：盘可以变暗而不等于喷流熄火，光度越过爱丁顿也不等于理论破产。把三者绑成一句“黑洞在吃东西所以发光”，会把后面所有定量工作说没。

[[x-ray-binaries|X射线双星]]把同一颗恒星级黑洞在几天到几个月里在热软态和硬态之间切换。热软态的连续谱接近薄盘的多温黑体；硬态则更像有一个热冕，盘的热成分变弱。状态切换说明薄盘不是永远开着的，爱丁顿比一变，几何和辐射效率一起变。

宇宙学尺度上，同一套引擎还要回答：类星体如何在早期宇宙迅速点亮、又如何把能量送回宿主星系。吸积率历史决定了重元素与尘埃何时被加热，喷流气泡决定了星系团气体何时被再加热。局部光谱拟合与大尺度反馈模拟若各用各的效率假设，中间会出现一条说不通的断层。把盘、喷流、反馈放在同一张因果图里读，才不会把“看见一个亮核”误写成“星系演化已经算完”。

## 跨域连接

- **[[star-formation|恒星形成]]**：任何带角动量的气体都不能径向落下，必须先把角动量送出去，原行星盘与黑洞吸积盘面临的是同一道账。推论是："盘加喷流"这个组合会在完全不同的质量尺度上重复出现，判据也是同一个：有没有磁场把角动量沿转轴带走。
- **[[流体湍流与雷诺数|湍流与雷诺数]]**：分子粘滞小到无法解释观测到的吸积率，薄盘模型只能塞进一个参数把粘滞参数化，它的物理来源要到磁旋转不稳定性被提出后才补上。推论是：在那之前，所有依赖这个自由参数的定量预言都建立在一个待定常数上，凡是用到它的结论都得重新检查。
- **[[thermochemistry|热化学]]**：吸积把静止质量的百分之几到几十变成辐射，而化学反应的转化率低了约十个数量级，核聚变也低约一个数量级。推论是：同样一克物质在黑洞边上能点亮整个星系，所以类星体不需要巨量燃料就能长期发光——瓶颈在燃料供应，不在能量密度。
- **[[热传导对流与辐射|辐射与对流]]**：爱丁顿光度就是辐射压恰好抵住引力时的光度，只取决于质量与电子散射不透明度。推论是：它给出一条与天体种类无关的上限，把质量代进去就得到光度上限；因此光度明显越过这条线的源，必然不是球对称的稳定吸积。
- **[[numerical-methods|数值方法]]**：喷流的准直与磁场受阻的吸积状态都来自广义相对论磁流体的数值积分，方程组本身没有解析解。推论是：判据只能是模拟产出的偏振图案能否与观测对上；而穿过视界的磁通量是自由输入，换一组磁通量喷流功率就变，因为它正比于磁通量的平方。

## 参考文献

- Shakura, N.I. & Sunyaev, R.A. (1973). Black holes in binary systems. Observational appearance. _Astronomy & Astrophysics_, 24, 337–355.
- Blandford, R.D. & Znajek, R.L. (1977). Electromagnetic extraction of energy from Kerr black holes. _Monthly Notices of the Royal Astronomical Society_, 179, 433–456.
- Narayan, R. & Yi, I. (1994). Advection-dominated accretion: A self-similar solution. _The Astrophysical Journal_, 428, L13–L16.
- Event Horizon Telescope Collaboration (2019). First M87 Event Horizon Telescope Results. I. _The Astrophysical Journal Letters_, 875, L1.
- Balbus, S.A. & Hawley, J.F. (1991). A powerful local shear instability in weakly magnetized disks. _The Astrophysical Journal_, 376, 214–222.
- Novikov, I. D. & Thorne, K. S. (1973). Astrophysics of black holes. In C. DeWitt & B. S. DeWitt (Eds.), _Black Holes (Les Astres Occlus)_ (pp. 343–450). Gordon and Breach.
- Abramowicz, M. A., Czerny, B., Lasota, J. P., & Szuszkiewicz, E. (1988). Slim accretion disks. _The Astrophysical Journal_, 332, 646–658.
- Tchekhovskoy, A., Narayan, R., & McKinney, J. C. (2011). Efficient generation of jets from magnetically arrested accretion on a rapidly spinning black hole. _Monthly Notices of the Royal Astronomical Society_, 418, L79–L83.
- Blandford, R. D. & Payne, D. G. (1982). Hydromagnetic flows from accretion discs and the production of radio jets. _Monthly Notices of the Royal Astronomical Society_, 199, 883–903.

## 延伸阅读

- Frank, J., King, A., & Raine, D. (2002). _Accretion Power in Astrophysics_ (3rd ed.). Cambridge University Press. — 吸积物理的标准参考教材
- Blandford, R., Meier, D., & Readhead, A. (2019). Relativistic Jets from Active Galactic Nuclei. _Annual Review of Astronomy and Astrophysics_, 57, 467–509.
- Bambi, C. (2017). _Black Holes: A Laboratory for Testing Strong Gravity_. Springer.
