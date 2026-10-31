---
summary: "电介质通过极化响应电场，真实材料也可能漏电。电场是否减弱取决于边界条件，电位移场不能只凭自由电荷唯一确定；微波损耗、压电与铁电分别涉及频率响应、机电耦合和可翻转的自发极化。"
id: 电介质与电极化
title: 电介质与电极化
period: 19世纪 — 至今
era: classical
tags: [电介质, 电极化, 介电常数, 铁电体, 压电效应, 偶极子, 极化率, 分子偶极]
updated: 2026-10-30
---

# 电介质与电极化

## 极化让绝缘材料也能改变电场

在带电电容器的极板间插入绝缘材料，电容可以增大。材料没有像金属那样让电荷自由流遍整个样品，却仍能改变电场：电子云与原子核的相对分布、离子位置或分子取向发生变化，产生了**电极化**。[1]

“绝缘体”强调给定工况下的导电性，“电介质”强调极化及相应电响应，两者在电磁学教材中常作为相近称呼。真实材料可能同时有极化、漏电和介电损耗，不能把二者说成完全互斥的物质类别。材料是良好绝缘体，也不表示它不与电场交换能量。

水分子有永久电偶极矩，氧分子等非极性分子也能被电场诱导出偶极矩。这里的电偶极不是小磁针；热运动又会妨碍永久偶极完全沿场排列。[1] 介质中宏观平均场、单个分子实际感受到的局部场，以及未放入材料时的外部场，需要分别定义。

法拉第1837年的介质研究采用了可比较的电容装置。留存装置的复制品包括球形电容器，原论文第十一系列则比较空气、虫胶、玻璃、硫等介质的“特定感应容量”。该系列于1837年宣读、1838年刊行。[2] 把这段历史只写成“给莱顿瓶换玻璃”，会丢掉装置几何、漏电与电荷分享测量这些关键条件。

## 束缚电荷怎样进入场方程

极化强度是单位体积的电偶极矩，记为矢量 $\mathbf P$，SI单位为C/m²。连续介质描述中，体束缚电荷与材料对真空表面的束缚面电荷满足：

$$
\begin{aligned}
\rho_b&=-\nabla\cdot\mathbf P,\\
\sigma_b&=\mathbf P\cdot\hat{\mathbf n}.
\end{aligned}
$$

外法线方向决定面电荷符号；两种已极化介质之间的界面要使用极化的跃变。均匀极化内部的散度为零，不代表表面也没有束缚电荷。[3]

电位移场的定义是：

$$
\begin{aligned}
\mathbf D&=\varepsilon_0\mathbf E+\mathbf P,\\
\nabla\cdot\mathbf D&=\rho_f.
\end{aligned}
$$

右边只写自由电荷，是一种有用的源项分账；**它并不表示自由电荷分布独自决定整个 $\mathbf D$ 场**。求解还需要材料关系、其他场方程与边界条件。在分段介质中，即使自由电荷相同，几何和材料响应不同也能改变场的空间分布。[3]

线性、局域、各向同性且无自发极化的简单模型写作 $\mathbf P=\varepsilon_0\chi_e\mathbf E$，因此 $\varepsilon_r=1+\chi_e$。晶体一般需要张量响应，极化方向未必与电场平行。[4] 非线性、迟滞或频率响应强烈的材料，也不能由一个恒定标量介电常数包办。

静电条件下，界面两侧电场的切向分量连续；电位移的法向跃变等于自由面电荷密度。没有自由面电荷时才有法向连续。光学边界还涉及磁场及可能的表面电流，不能仅凭这两条静电关系就算完全部反射和透射。

## 插入介质后，电场一定变小吗？

在理想平行板电容器中，固定几何、完全填充均匀线性介质并忽略边缘场，可得 $C=\varepsilon A/d$。若断开电源、保持极板自由电荷不变，极化产生的退极化场使板间总场和电压降低。[1]

若电容器始终接在理想恒压源上，则板间平均电场仍为 $V/d$，电源补充自由电荷，电容和储存的电荷一起增加。因而“放入介质，内部场必定比原来小”缺少电路边界条件。任意形状材料中的局部场更不能用这句口诀判断。

克劳修斯–莫索提关系给出一个微观与宏观之间的近似桥梁：

$$
\frac{\varepsilon_r-1}{\varepsilon_r+2}
=\frac{N\alpha}{3\varepsilon_0}.
$$

这里 $N$ 为数密度，$\alpha$ 按SI约定由单粒子的偶极矩与局部场联系。推导使用球形局部场等假设，适合某些以诱导偶极为主的介质；强关联永久偶极液体、各向异性晶体或铁电临界区，需要额外处理。[5] 即使模型适用，一次介电测量通常约束的是数密度与极化率的组合，也不能同时独立测出两者。

## 介电谱与微波损耗

不同响应具有不同时间尺度。电子极化、离子位移、永久偶极的取向弛豫，以及界面电荷积累，都可能参与介电谱。具体频段依赖材料和温度；低频下较快的机制仍可响应，不能把频率轴切成四个互不重叠、每段只剩一种机制的区间。

以 $e^{\mathrm i\omega t}$ 为时间约定，将相对复介电常数写成 $\varepsilon_r^*=\varepsilon'-\mathrm i\varepsilon''$。在简单德拜模型里：

$$
\varepsilon_r^*(\omega)
=\varepsilon_\infty+
\frac{\varepsilon_s-\varepsilon_\infty}{1+\mathrm i\omega\tau}.
$$

实部描述同相响应，损耗部分反映能量耗散。单一弛豫模型的损耗峰在 $\omega\tau=1$；有多个过程、共振、导电或界面效应时，谱形会更复杂。报告损耗角正切 $\tan\delta=\varepsilon''/\varepsilon'$，也应交代频率、温度和所用符号约定。

液态水在室温附近的重要微波响应是取向弛豫。Ellison的纯水数据模型在25°C给出主弛豫频率18.56 GHz，并包含其他弛豫和远红外共振。[6] 常见家用微波炉使用的约2.45 GHz并不是这个主弛豫峰，更不是一根孤立水分子特有的机械共振。水分子与周围网络的耗散响应吸收电磁能；食品中的离子导电、成分、温度和场分布也影响加热。

油脂或其他非极性物质并非绝对不吸收微波，容器和食物的升温也不能只凭“有没有永久偶极”排序。关于加热是否均匀，穿透、驻波和随后热传导同样重要；FDA的说明也明确指出微波烹饪并非从食物中心向外加热。[7]

## 压电、铁电与信息器件

压电是线性的机电耦合：应力引起极化变化，电场引起应变。晶体缺少反演中心是必要的对称性条件，却还不充分；21个非中心对称晶类中，432类不允许线性压电，其余20类允许。居里兄弟1880年的发现和1881年的逆效应研究，涉及石英、电气石等晶体。[8]

石英谐振器、PZT超声换能器和某些MEMS器件利用这种耦合，但手机传感器也常使用电容式读出。谐振频率、温漂、损耗和机械结构共同决定性能，不能把一种石英手表的精度当成所有压电器件的固定指标。

铁电材料具有可由外电场切换的自发极化。宏观样品可能分成不同电畴，平均极化为零仍可含有铁电有序；仅看到一个电滞回线也应排查漏电与其他迟滞机制。Valasek1921年报告罗谢尔盐的电滞及永久极化，是这一领域的重要早期工作。[9]

2011年，Böscke、Müller等人报告了特定制程下**掺硅氧化铪薄膜**的铁电行为。论文比较薄膜结构、包覆结晶条件、压电响应与极化回线；它没有宣称所有普通块体HfO₂天然都是铁电体。[10] 与硅工艺的相容潜力，也仍需落实到相稳定、界面、耐久和保持性能。

高介电常数栅介质与铁电存储是相关而不同的用途。前者可在满足电容需求时增加介质的物理厚度，以缓解隧穿漏电；英特尔2007年的45 nm处理器采用了铪基高介电常数金属栅技术。[11] 传统1T1C型DRAM则用电容中的电荷保存数据，不能把逻辑芯片的工艺节点名称直接当成DRAM电容介质厚度。

液晶显示的另一关键量是介电各向异性。电场改变指向矢排列，材料的光学双折射再与偏振片配合调制光。在扭曲向列型等具体结构中，光学响应由取向、厚度和波长共同决定。[12] 液晶分子不必全部具有强永久偶极，显示器也不是每个像素都以完全相同方式旋转偏振。面板功耗和市场占比需要具体产品与年份，不能从介电机制直接推出。

连接节点：[[coulomb-law-electrostatics|库仑定律与静电场]] → **电介质与电极化**（总电荷、束缚电荷与边界）；**电介质与电极化** → [[capacitance-and-inductance|电容与电感]]（材料响应与元件模型）

---

## 事实卡

- **卡1**：介质极化与导电性是不同响应，真实材料可同时极化、漏电和耗散。
- **卡2**：电位移高斯定律只把自由电荷写作源项，完整解仍需材料关系和边界条件。[3]
- **卡3**：理想平行板中，固定电荷与固定电压对应不同的介质插入结果。[1]
- **卡4**：25°C纯水主微波弛豫频率约18.56 GHz，2.45 GHz不是该峰。[6]
- **卡5**：非中心对称晶类432不允许线性压电；铁电还要求自发极化可被外场切换。[8][9]
- **卡6**：2011年的氧化铪研究针对特定掺杂与制程的薄膜，不可推广成任意HfO₂均铁电。[10]

## 跨域连接

- **[[capacitance-and-inductance|电容与电感]]**：同一平行板结构插入介质，在断开电源与保持恒压两种条件下，自由电荷、电场和电源做功的变化不同。推论：**比较材料性能必须固定电路与几何条件**；介电常数增加不等于任何装置的局部电场必然降低，储能和耗散也需要分别计算。
- **[[water|水]]**：水的永久偶极、氢键环境与分子运动共同参与介电弛豫，频率和温度影响吸收。推论：**由分子结构推断加热还需要动力学与环境信息**；盐含量、混合成分及电场分布都会改变结果，单个气相偶极矩不能完整代表食品中的吸收与温升。
- **[[intermolecular-forces|分子间作用力]]**：宏观场与分子局部场之间相差邻近粒子的反馈，永久偶极之间还存在取向关联。推论：**从介电常数反演微观参数依赖模型**；克劳修斯–莫索提关系不是所有液体的通式，一次测量也通常不足以同时独立确定数密度和极化率。
- **[[ultrasound|超声成像]]**：压电材料提供电信号与机械振动的双向转换，探头结构、匹配层和电子读出共同影响带宽与灵敏度。推论：**材料改进只是完整成像链的一环**；更大的介电常数或压电系数不直接保证更高空间分辨率，损耗、噪声和声学条件同样需要评估。
- **[[semiconductor-physics|半导体物理]]**：高介电常数栅层和铁电薄膜分别服务于电容耦合与可切换极化，但都受界面、漏电和可靠性限制。推论：**工艺相容潜力需要器件级验证**；一篇薄膜铁电论文不能直接证明大规模存储器已成熟，也不能用逻辑制程节点替代真实介质厚度。

## 关键词

电介质; 电极化; 束缚电荷; 电位移; 介电谱; 局部场; 克劳修斯–莫索提; 德拜弛豫; 压电; 铁电; 高介电常数; 液晶

## 参考文献

1. OpenStax. [University Physics, Vol. 2, §8.5: Molecular Model of a Dielectric](https://openstax.org/books/university-physics-volume-2/pages/8-5-molecular-model-of-a-dielectric). 2016. — 诱导/取向极化、平行板模型及其条件。
2. Faraday, M. _Experimental Researches in Electricity_, eleventh series, especially §§1187–1190 and 1252–1277. Read 21 December 1837; published 1838. [原文汇编](https://www.gutenberg.org/ebooks/14986). See also [Science Museum Group装置记录](https://collection.sciencemuseumgroup.org.uk/objects/co6668/faradays-specific-inductive-capacity-apparatus-1837-replica). — 球形装置、介质比较与特定感应容量。
3. Feynman, R. P., R. B. Leighton, and M. Sands. [The Feynman Lectures on Physics, Vol. II, ch. 10: Dielectrics](https://www.feynmanlectures.caltech.edu/II_10.html). 1964. — 极化、束缚电荷和电位移。
4. Hartmann, E. [An Introduction to Crystal Physics](https://www.iucr.org/what-we-do/education/pamphlets/introduction-crystal-physics), §§1–2. IUCr Teaching Pamphlet No. 18. — 晶体介电张量与各向异性。
5. Feynman, R. P., et al. [Vol. II, ch. 11: Inside Dielectrics](https://www.feynmanlectures.caltech.edu/II_11.html), §§11–4 and 11–5. 1964. — 局部场、克劳修斯–莫索提关系及极性液体限制；书中极化率约定与本文SI定义不同。
6. Ellison, W. J. [“Permittivity of Pure Water, at Standard Atmospheric Pressure, over the Frequency Range 0–25 THz and the Temperature Range 0–100°C”](https://doi.org/10.1063/1.2360986). _Journal of Physical and Chemical Reference Data_ **36** (2007): 1–18. — 纯水介电谱的插值模型、温度与弛豫频率。
7. U.S. FDA. [Microwave Ovens](https://www.fda.gov/radiation-emitting-products/resources-you-radiation-emitting-products/microwave-ovens). — 微波吸收与烹饪中的热传导。
8. IUCr. [Piezoelectricity](https://dictionary.iucr.org/Piezoelectricity). — 对称性、432例外、正逆压电及1880/1881史料书目。
9. Valasek, J. [“Piezo-Electric and Allied Phenomena in Rochelle Salt”](https://doi.org/10.1103/PhysRev.17.475). _Physical Review_ **17** (1921): 475–481. — 电滞及永久极化的原始报告。
10. Böscke, T. S., J. Müller, D. Bräuhaus, U. Schröder, and U. Böttger. [“Ferroelectricity in Hafnium Oxide Thin Films”](https://doi.org/10.1063/1.3634052). _Applied Physics Letters_ **99** (2011): 102903. — 掺硅薄膜、机械包覆与铁电响应。
11. Intel. [First 45nm Chips: Hafnium-Based High-k Metal Gate Processors](https://www.intel.com/pressroom/kits/45nm/index.htm). 2007. — 高介电常数栅技术的具体产品年代。
12. Schadt, M., and W. Helfrich. [“Voltage-Dependent Optical Activity of a Twisted Nematic Liquid Crystal”](https://doi.org/10.1063/1.1653593). _Applied Physics Letters_ **18** (1971): 127–128. — 特定扭曲向列液晶的电控光学响应。
