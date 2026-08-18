---
title: 宇宙学正在逼近中微子质量：一把卡住下限的"宇宙天平"
title_en: Cosmology Closes in on the Neutrino Mass — A Cosmic Scale Pressing Against the Lower Bound
status: published
updated: 2026-08-16
category: 粒子宇宙学
horizon: 2020s
order: 8
tags:
  - 中微子质量
  - DESI
  - 大尺度结构
  - CMB
  - 质量顺序
researchers:
  - DESI Collaboration
  - Daniel Green（加州大学圣地亚哥分校）
  - Joel Meyers（南方卫理公会大学）
  - Willem Elbers（杜伦大学）
  - KATRIN Collaboration
institutions:
  - 暗能量光谱仪（DESI，基特峰）
  - Planck / ACT（阿塔卡马宇宙学望远镜）
  - KATRIN（卡尔斯鲁厄理工学院）
  - JUNO（江门中微子实验）
related:
  - desi-dark-energy
  - cmb-inflation-tests
  - k2-18b-atmosphere
---

# 宇宙学正在逼近中微子质量：一把卡住下限的"宇宙天平"

粒子物理早已知道中微子有质量——振荡实验测量了两个质量平方差，却始终测不出质量的绝对值。这留下一个奇特的窗口：三种中微子的质量总和 $\sum m_\nu$ 有一个下限（正常顺序约 0.059 eV，倒置顺序约 0.10 eV），却没有已知上限。2020 年代发生了一件出乎预料的事：**称量这个数字最灵敏的"天平"，不是任何粒子探测器，而是宇宙本身。**

2024 年 4 月，DESI 第一批 BAO 数据结合 Planck 卫星的 CMB 观测，给出 $\sum m_\nu < 0.072$ eV（95% 置信）；2025 年 3 月，DESI 第二批数据（DR2，三年巡天）的全形状分析把上限压到 $< 0.064$ eV。[^desi_dr2nu]这个数字已经贴上了振荡实验给出的正常顺序下限 0.059 eV——**上限几乎要碰到下限**。两条完全不同的测量路径正在对撞，中间只隔着头发丝宽的一道缝——这正是它成为前沿的原因。

## 问题与为什么是现在

先破除一个误解：宇宙学至今**没有测到**中微子质量，它给出的全是上限。这点与媒体常见的"宇宙称出了中微子有多重"有本质区别。上限的意思是：如果质量超过某个值，宇宙中星系的成团方式就会与观测矛盾。从"质量不超过多少"到"质量等于多少"，隔着一次真正的探测——而 2020 年代的悬念恰在于，上限收紧的速度让"探测"第一次显得触手可及。

为什么宇宙能称中微子？因为中微子是"热暗物质"：大爆炸遗留下来的宇宙中微子背景每立方厘米约 336 个，数量巨大。只要它们有质量，就会在宇宙结构形成中留下指纹——中微子以近光速自由流动，会"抹平"小于其自由流尺度的密度涨落。这个尺度大约是

$$\lambda_{\rm fs} \approx 40\ {\rm Mpc}\times\left(\frac{m_\nu}{1\ {\rm eV}}\right)^{-1}$$

对 eV 量级的质量，相当于数亿光年：在此之下的星系成团被系统性抑制。CMB 的引力透镜、星系分布的功率谱、BAO 尺度都对这种抑制敏感。总质量越大，结构被抹得越平，于是结构有多"平"就反过来读出了质量的上限。

麻烦在于效应极小：0.06 eV 的总质量只造成百分之几的功率谱变化，且与物质密度 $\Omega_m$、结构增长幅度 $\sigma_8$ 等参数高度简并——把这百分之几从参数简并里干净地分离出来，要求对星系偏倚、非线性成团、观测选择效应都有亚百分级控制。2020 年代之前，宇宙学上限停在 0.1–0.3 eV 量级（Planck 2018：$<0.12$ eV），离下限还远。DESI 的上千万条光谱红移和 ACT 的高精度 CMB 透镜数据，第一次把上限推进到下限的射程之内。

## 2020s 证据与团队

- **Planck 时代（2018）**：CMB 加 BAO 给出 $\sum m_\nu < 0.12$ eV（95%），首次反超实验室直接测量的灵敏度——宇宙学从那时起取代加速器与反应堆，成为这条战线上约束最强的工具。
- **DESI DR1（2024 年 4 月）**：约 600 万个星系与类星体的 BAO 测量结合 Planck，$\sum m_\nu < 0.072$ eV（95%）。[^desi_dr1]这已低于倒置顺序的下限 0.10 eV——在 $\Lambda$CDM 框架内，倒置顺序被排除在 95% 置信之外。
- **DESI DR2（2025 年 3 月）**：Elbers 等人的全形状+BAO 分析结合 Planck 与 ACT 透镜，给出迄今最紧的 $\Lambda$CDM 上限 $< 0.064$ eV。[^desi_dr2nu]但耐人寻味的是：后验分布**峰值顶在先验边界 $\sum m_\nu = 0$ 上**——数据"想要"的中微子质量比物理允许的下限还小。
- **实验室一侧（2025）**：KATRIN 用 259 天氚 β 衰变数据把运动学上限收紧到 $m_\nu < 0.45$ eV（90%），方向正确但离宇宙学的灵敏度还差一个数量级。[^katrin]JUNO 于 2025 年 8 月开始取数、11 月发布首批振荡测量，其本职目标——判定质量顺序——正好卡在宇宙学争议的焦点上。[^juno]

## 开放争议

**这是张力还是假象？** 字面读，宇宙学上限 0.064 eV 与下限 0.059 eV 之间只剩一道缝。Craig、Green、Meyers 与 Rajendran（2024，JHEP）指出，这个"紧"很大程度是贝叶斯先验的产物：质量不能为负，后验被压在边界上，95% 上限的数值对先验选择非常敏感；换用频率派方法，约束明显放松。[^craig]

**"负质量"之议。** Green 与 Meyers（2025）更激进地指出，若允许 $\sum m_\nu$ 取负值作为有效参数，某些数据组合在约 2σ 水平上偏好负值——物理上 nonsense，统计上却是重要诊断：数据在结构增长的形状上要求的抑制比"零质量中微子"还多。Elbers 等人（2025）随即证明这面"镜子"照出的可能是暗能量：一旦允许暗能量状态方程随时间演化（DESI 数据恰好也偏好这一点），负质量偏好消失，上限放松到 $<0.196$ eV，与两种质量顺序都相容。[^mirage]中微子质量与暗能量在同一批数据里纠缠——这是当前最深的方法论争议。

**与地面的交叉检验。** 振荡下限是粒子物理的硬结果；若未来的联合分析以高置信度把上限压到 0.059 eV 之下，则必有某个环节出错：$\Lambda$CDM 假设、BAO 系统误差、CMB 透镜标定，或（最有趣的可能）中微子物理本身——例如快于预期的衰变或新的相互作用。目前没有任何一方愿意先眨眼。值得强调的是这道"缝"的脆弱性：上限一侧的 0.064 eV 依赖 $\Lambda$CDM 成立，放开暗能量立即变成 0.196 eV；下限一侧的 0.059 eV 则假设只有三代中微子、质量顺序正常。两边各藏着一个模型假设，张力到底有多硬，取决于你愿意相信哪一个。

## 可检验的下一步

1. **DESI 五年完整巡天**（预计 2026 年前后收官）加上 Euclid 的弱透镜数据，预期把 $\sigma(\sum m_\nu)$ 压到约 0.01–0.02 eV——届时 0.059 eV 的最小质量理论上将以数 σ 被"看见"，上限将变成测量。这将是粒子物理七十年来第一次由宇宙学给出中微子的绝对质量。
2. **JUNO 与 DUNE/T2HK** 将在数年内独立判定质量顺序；若地面判定为倒置顺序而宇宙学维持现状，张力将无可回避。
3. **方法学收敛**：频率派与贝叶斯派、固定 $\Lambda$CDM 与放开暗能量，各组合的结果需要一张公开的"敏感性地图"，让每一个上限都标注它依赖的假设，这是多个团队正在做的事。
4. **下一代 CMB 的变数**：Simons Observatory 正在运行，将改进透镜测量；而原计划作为旗舰的 CMB-S4 已于 2025 年被美国 DOE/NSF 取消，给这条路径的远期灵敏度蒙上阴影。

## 跨域连接

- **[[neutrino-physics|中微子物理]]**：宇宙学测的是三个质量本征态之和，振荡实验测的是质量平方差——两条路径测量的是同一个质量矩阵的不同投影。**推论是：当宇宙学上限逼近振荡下限，任何一边的移动都会迫使另一边重新解释**；JUNO 的质量顺序判定因此成了宇宙学争议的"外部裁判"。
- **[[bayesian-inference|贝叶斯推断]]**：后验峰值顶在 $\sum m_\nu=0$ 的先验边界上，是"边界参数估计"的经典难题——95% 上限的数值强烈依赖先验如何处理那段物理上不可能的区域。**推论是：引用一个上限之前，必须先问它是在什么先验、什么模型空间里算出来的**；Craig 等人正是用这一点说明"最紧上限"里有先验的指纹。
- **[[statistics|统计学]]**：这里的全部科学都是"抑制百分之几"的形状检验，与 $\Omega_m$、$\sigma_8$ 简并。**推论是：没有单一的"中微子质量测量"，只有一组随数据组合漂移的联合约束**——报告区间和敏感性分析比报告最紧的那个数字更诚实。
- **[[evidence-based-medicine|循证医学]]**：合并 CMB、BAO、透镜、超新星这些"异质研究"时，系统误差不会平均掉，而是以难以追踪的方式进入联合拟合。**循证的惯例——当结论随纳入标准敏感变化时报告区间——同样适用于此**：0.064 与 0.196 eV 这两个上限来自同一批 DESI 数据，差别只在模型空间。
- 参见站内 [[cosmic-neutrino-background|宇宙中微子背景]]：那里讲这片中微子海洋本身的存在证据与直接探测的设想，本文讲的是它对宇宙结构形成留下的可称量的印记。

## 参考文献

- DESI Collaboration. _DESI 2024 VI: Cosmological Constraints from the Measurements of BAO._ JCAP 02 (2025) 021. DOI: 10.1088/1475-7516/2025/02/021.（$\sum m_\nu < 0.072$ eV）
- Elbers, W. et al. (DESI Collaboration). _Constraints on Neutrino Physics from DESI DR2 BAO and DR1 Full Shape._ arXiv:2503.14744 (2025).（$\sum m_\nu < 0.064$ eV；$w_0w_a$CDM 下放松至 $<0.196$ eV）
- Craig, N., Green, D., Meyers, J. & Rajendran, S. _No νs is Good News._ JHEP 09, 097 (2024). DOI: 10.1007/JHEP09(2024)097.
- Green, D. & Meyers, J. _Cosmological preference for a negative neutrino mass._ Phys. Rev. D 111, 083507 (2025). DOI: 10.1103/PhysRevD.111.083507.
- Elbers, W. et al. _Negative neutrino masses as a mirage of dark energy._ arXiv:2407.10965 (2025).
- Aker, M. et al. (KATRIN Collaboration). _Direct neutrino-mass measurement based on 259 days of KATRIN data._ Science 388, eadq9592 (2025). DOI: 10.1126/science.adq9592.
- JUNO Collaboration. _First measurement of reactor neutrino oscillations at JUNO._ arXiv:2511.14593 (2025).

[^desi_dr1]: DESI 2024 VI（JCAP 02 (2025) 021）：DESI DR1 BAO + Planck CMB，$\Lambda$CDM 下 $\sum m_\nu < 0.072$ eV（95% C.L.）。

[^desi_dr2nu]: Elbers et al. 2025（arXiv:2503.14744）：DESI DR2 BAO + DR1 全形状 + Planck/ACT 透镜，$\Lambda$CDM 下 $\sum m_\nu < 0.064$ eV（95% C.L.）；后验峰值位于先验边界 0。

[^katrin]: KATRIN Collaboration, Science 388, eadq9592 (2025)：$m_\nu < 0.45$ eV（90% C.L.），实验室运动学直接测量。

[^juno]: JUNO 于 2025 年 8 月开始取数，首批反应堆中微子振荡测量见 arXiv:2511.14593（2025 年 11 月）。

[^craig]: Craig, Green, Meyers & Rajendran 2024（JHEP 09, 097）：指出紧上限对 $\sum m_\nu \geq 0$ 先验敏感，频率派分析给出更宽容的约束。

[^mirage]: Elbers et al. 2025（arXiv:2407.10965）：负质量偏好在允许动力学暗能量后消失，"负质量"是暗能量误设的镜像。
