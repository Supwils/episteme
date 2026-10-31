---
summary: "统计力学在给定模型和系综中建立精确关系，再用适当近似解释真实物质。配分函数、系综等价、量子占据数和非平衡功关系各有前提，不能把模型恒等式写成无条件推导一切热力学。"
id: 统计力学与玻尔兹曼分布
title: 统计力学与玻尔兹曼分布
period: 1870年代 — 至今
era: modern
tags: [统计力学, 玻尔兹曼分布, 配分函数, 系综, 自由能, 涨落, 量子统计, 费米-狄拉克, 玻色-爱因斯坦]
updated: 2026-10-30
---

# 统计力学与玻尔兹曼分布

## 哪些关系精确，哪些需要物理假设？

一盒气体中有大量微粒，但人们关心的是温度、压强、热容等少量可重复测量的性质。统计力学用微观态、概率与动力学连接这两个层次。在选定的模型和系综中，可以建立精确的数学关系；应用到真实物质时，又要检查相互作用模型、平衡条件和计算近似。两层工作不能混在一起。[1,2]

例如，给定不显含温度的哈密顿量，在正则平衡中，微观态$i$的能量为$E_i$，有

$$
P_i=\frac{e^{-\beta E_i}}{Z},\qquad
Z=\sum_i e^{-\beta E_i},\qquad
\beta=\frac{1}{k_BT}.
$$

这里求和遍历规定粒子数和外部参数下的微观量子态；经典表述则用合适的相空间积分替代，并明确计数测度。若某个能量有多个态，能量区间的概率还要计入简并度或态密度，不能只剩一个指数。

从$Z$求自由能等关系，在有限系统中也可以成立，并不都要等到粒子数无穷大才生效。但宏观相变的严格非解析性、系综之间的等价与涨落是否可忽略，又涉及极限和额外条件。**“给定概率分布后推导精确”不等于“微观方程不加统计与初态假设，就已经推出全部宏观定律”。** 系统是否弛豫、何时可忽略相关性，仍需研究动力学。

## 系综分别固定什么？

**微正则系综**适合描述能量、体积、粒子数给定的孤立平衡系统，常在一个很窄的能量壳层中赋予可及微观态等概率。等概率是统计表述的一部分，不是任意孤立系统的每一条轨迹都已经被证明在有限时间遍历所有态。

**正则系综**允许系统与大热浴交换能量，固定$N$、$V$与热浴温度$T$。在通常弱耦合等条件下，子系统的平衡权重是上面的玻尔兹曼形式。它并不要求系统每一瞬间都恰有同一能量，能量涨落正是这个系综的一部分。

**巨正则系综**还允许交换粒子，以$\mu$、$V$、$T$控制平衡，巨配分函数为

$$
\Xi=\sum_N e^{\beta\mu N}Z(N,V,T).
$$

固定什么、允许什么涨落，必须由系统与环境的联系决定，不能只挑计算最方便的系综就忽略实验边界。[1,2]

许多短程、可加系统在适当热力学极限下具有相应的系综等价性，但这不是任意相互作用体系的保证。熵的凹性、相共存和所比较的观测量都重要；长程非可加相互作用可以使某些系综即使在热力学极限中仍不等价。不同系综本来也不需要给出相同的能量涨落。临界关联变长与相互作用本身具有长程性质，也是不同概念，不能混为一个判断。[3]

## 玻尔兹曼与吉布斯留下的两条路线

玻尔兹曼从气体动理论发展碰撞方程与1872年的$H$定理，后来又发展微观计数与熵的概率解释。今天常写的$S_B=k_B\ln\Omega$表达某个宏观条件下的可及微观态数；不能把它与所有情形下的吉布斯概率熵直接混称同一定义，也不能把现代记号和整套框架全部塞进1872年的一篇论文。[1]

吉布斯的系综方法则研究在同类宏观条件下，一群可能系统怎样分布于相空间。1902年《统计力学基本原理》的原版书名页列的是**纽约Charles Scribner’s Sons与伦敦Edward Arnold**，不是耶鲁大学出版社。书中系统发展了平衡系综与相应热力学联系；吉布斯在序言中也讨论了精确的相概率守恒与近似关系之间的区别，不能把他的奠基工作转述成消除了所有假设与近似。[2]

两条路线各有侧重。碰撞方程适合研究分布怎样改变、输运为何出现；系综和配分函数组织平衡性质。遍历性、混合与典型性能够在特定条件下连接时间平均和系综平均，却不是每种真实多体系统都自动满足的同一个定理。

玻尔兹曼1906年去世，未能看到佩兰后来的沉降与布朗运动实验。佩兰1909年工作的1910年英译本保留了多组分子数估计，包括所采用的约$7.05\times10^{23}$。这些实验有力支持了分子图像，但历史测量值不能被改成今天的精确定义值。也不应把玻尔兹曼的一生简化成工作从未得到任何接受，或把学术争论说成其死亡的单一原因。[1,4]

## 配分函数怎样生成热力学量

对上述正则系综，定义亥姆霍兹自由能$F=-k_BT\ln Z$，有

$$
S=-\left(\frac{\partial F}{\partial T}\right)_{V,N},\qquad
p=-\left(\frac{\partial F}{\partial V}\right)_{T,N}.
$$

化学势在通常光滑的热力学描述中写成$\mu=(\partial F/\partial N)_{T,V}$；对严格离散的有限粒子数问题，应检查相应增减粒子的自由能差，不能不加说明地把$N$当成任意实数。

若能级本身不随温度改变，还可得

$$
\langle E\rangle=-\frac{\partial\ln Z}{\partial\beta},\qquad
\langle(\Delta E)^2\rangle=\frac{\partial^2\ln Z}{\partial\beta^2}
=k_BT^2C_V.
$$

这是平衡涨落与静态响应之间的联系。若使用显含温度的有效哈密顿量，能量和导数的解释要重查，不能机械套用。不强相关、远离特殊临界条件的广延系统中，相对能量涨落常按$1/\sqrt N$缩小；这也不是所有熵、温度或观测量的普遍涨落公式。[1]

动态的涨落—耗散关系则把平衡相关函数或噪声谱与微小外扰下的线性响应联系起来。量子情形需要保留相应的算符与频率因子，非平衡强驱动也不能直接套入平衡结论。久保的线性响应理论给出了系统框架；从噪声反推响应时，实验仍有带宽与统计误差。[5]

实际求$Z$很少能穷举所有微观态。无相互作用的经典气体可从单粒子配分函数组合，并处理全同粒子的重复计数；谐振子有等间隔能级，可求几何级数；刚性转子的能级按$j\,(j+1)$变化，带有简并度，不能说一般转子也只是同一种几何级数。相互作用系统还会用转移矩阵、展开、数值采样等方法。

一般有限、常规模型的配分函数在正温下是光滑的，严格相变奇异性通常在适当热力学极限中出现。朗道自由能图像是有效描述，不应与有限系统中精确的$-k_BT\ln Z$不加区分地合并。哪些近似能抓住临界行为，见[[phase-transitions-and-critical-phenomena|相变与临界现象]]。

## 量子统计：占据数公式有自己的适用模型

全同量子粒子不能靠永久标签计数。通常三维情形下，玻色多体波函数在交换时对称，费米多体波函数反对称；可观测概率保持相应不变，不等于两类波函数都“交换后原样不变”。经典麦克斯韦—玻尔兹曼统计是低占据等条件下的近似，也要正确处理全同粒子的重复计数。[6]

对理想费米粒子与理想玻色粒子，或适用相应描述的准粒子，在巨正则平衡中，单粒子态$i$的平均占据数分别为

$$
\langle n_i\rangle_{\rm F}=\frac{1}{e^{(\epsilon_i-\mu)/(k_BT)}+1},\qquad
\langle n_i\rangle_{\rm B}=\frac{1}{e^{(\epsilon_i-\mu)/(k_BT)}-1}.
$$

单粒子态须包括自旋等量子数。泡利原理限制同一个完整费米态最多一个粒子，不禁止同一空间轨道放入自旋不同的电子。这些简单占据数也不能不加近似地代替任意强相互作用系统的全部性质。

在$e^{(\epsilon_i-\mu)/(k_BT)}\gg1$的低占据极限，两式都近似为指数形式。与物质达到黑体平衡的光子通常有$\mu=0$，但高频、低占据的维恩尾部仍可用相应指数近似；“化学势为零，所以永远不存在经典稀疏极限”是不对的。[6]

费米统计有助于理解金属电子低温热容与白矮星的电子简并压。中子星则还涉及强相互作用、物质组成和广义相对论，不能说只由自由中子的简并压完整决定其支撑。

玻色—爱因斯坦凝聚指适当条件下单一量子态出现宏观占据，不是任何维数和相互作用下都必然发生，也不意味着所有粒子在某一刻全跳进基态。1995年，Cornell、Wieman团队在铷87气体中实现凝聚；Ketterle团队同年的实验使用**钠原子**。把三人写成合作完成同一个铷实验，会混掉两组装置与论文。三人因稀薄碱金属原子气体凝聚及早期性质研究共同获2001年诺贝尔物理学奖。[7,8,9]

## 从重整化群到学习模型：迁移的是哪些方法

重整化群在场论中已有历史，威尔逊等人在20世纪70年代对临界现象作出的发展，并不是某一年从无到有发明全部RG。它通过尺度变换、有效耦合与固定点解释普适行为；适用的普适类还要检查维数、对称性、相互作用范围和相关扰动。威尔逊因临界现象理论获得1982年诺贝尔物理学奖，但这不等于一切相变问题都从此解决。[10]

Ackley、Hinton与Sejnowski1985年的玻尔兹曼机学习论文，使用能量函数与概率分布来组织神经网络状态。模型中的“能量”可以是数学上的评分，并不必然是硬件真正储存的物理能量。最大似然与分布之间的相对熵提供学习目标，这与真实热平衡机器之间仍需区分。[11]

Jaynes1957年从最大熵推断讨论统计力学：在已知约束下选择最少额外假设的概率分布，可得到相应的玻尔兹曼形式。这说明一种推断原则怎样重建计算规则，并不单凭推断就证明实际物质已达到热平衡，或证明任意系统的能量守恒与弛豫方向。[12]

能量模型、随机过程和多尺度思想也影响生成建模，但不能说所有扩散模型都直接重复玻尔兹曼权重或同一种对比散度训练。共同的概率工具需要与各自的目标分布、动力学和采样过程分别说明。社会科学中的类比同样要检查：人会学习、预期并改变规则，不能只因系统个体很多就当成同一种分子系综。

## 非平衡功关系：等式精确，不代表有限样本无误差

平衡统计力学不要求所有系统等到“无穷久后”必然进入平衡；它首先描述特定平衡分布。非平衡统计力学还研究驱动、输运、弛豫与路径概率，需要说明初态和动力学。

在常见的Jarzynski关系适用条件下，系统从温度$T$的正则平衡初态出发，外界按给定协议改变哈密顿量参数，以$W$表示**对系统所做的功**。在相应微观动力学、热浴耦合和功定义下，有

$$
\left\langle e^{-\beta W}\right\rangle=e^{-\beta\Delta F}.
$$

$\Delta F$是初末参数所对应的**平衡**自由能差，即使真实末态还没有达到平衡。角括号是协议重复实现的统计系综平均，不能把它改读成任意有限次实验平均都已精确恢复自由能。[13]

Crooks关系进一步比较正向协议与相应反向协议，各自从相应端点的平衡态开始，在微观可逆等条件下满足

$$
\frac{P_{\rm F}(W)}{P_{\rm R}(-W)}=e^{\beta(W-\Delta F)}.
$$

反向初态、时间反向协议与功符号都属于等式，不能随意拿两组不同实验的直方图代入。[14]

Collin等人2005年用光镊反复展开与复折RNA结构，检验Crooks关系并恢复折叠自由能。论文还明确讨论了指数平均对罕见低功事件的敏感性：采样不足会造成大误差，强非平衡时尤其困难。它说明非平衡实验可以提供平衡信息，不能被转述成只拉伸有限次就无误差得到答案。[15]

## 事实卡

- **卡1**：正则系综的配分函数恒等式可以在有限系统中成立；系综等价与宏观极限另有条件。
- **卡2**：吉布斯1902年原版出版者为Charles Scribner’s Sons与Edward Arnold，不能与任职的耶鲁大学混淆。
- **卡3**：1995年铷凝聚与钠凝聚属于不同实验组；费米与玻色的简单占据数也有理想模型前提。
- **卡4**：Jarzynski与Crooks关系须说明平衡初态、协议与功定义；精确等式不取消有限样本和罕见事件的统计困难。

## 跨域连接

- **[[information-theory|信息论]]**：吉布斯概率熵与香农熵共享概率求和的数学结构，但物理熵还要说明微观态、单位和约束。兰道尔界涉及特定逻辑复位任务；对未知、等概率、无可利用旁信息的比特，在温度T热浴中进行相应循环复位，才得到常见的平均排热下限。不能把数学上的不确定性直接当成每个运算门固定消耗的能量。[16]
- **[[quantum-decoherence|量子退相干]]**：系统与环境建立相关性后，局部描述可以失去可见相干，而完整封闭系统仍按幺正方式演化。约化态的熵、粗粒化热力学熵与总体系的熵需要区分；有限环境还可能出现复现。相同的微观可逆框架提供联系，却不能把一次简单的状态计数说成已经解决全部测量与时间箭头问题。
- **[[bioenergetics-and-metabolism|生物能量学与代谢]]**：生物体通过物质与能量交换维持工作状态，仍有不可逆过程和熵产。判断是否满足第二定律，要看细胞、营养物、废物与环境的共同边界，不能只给一个“生命更有序”的图像。统计力学还能研究分子马达与折叠的涨落，但所选平衡或非平衡模型要与实验驱动方式一致。
- **经济学与社会科学**：随机过程、相互作用网络和有效能量函数可以组织大量个体的行为，但模型中的概率不是只由粒子数自动决定。人的预期、学习与制度变化会改变规则，是否有稳定分布和适用的尺度关系，需要单独检验。共享数学工具不等于金融市场已满足热浴、能量守恒或详细平衡。
- **[[time|时间]]**：微观可逆方程本身不指定哪一类宏观初态在宇宙中实际出现。低熵初始条件、可访问变量与粗粒化共同进入时间箭头的讨论，系综计数提供重要线索，却不能单独解释初始条件为何特殊。把平衡概率、弛豫路径和宇宙学初态分开，才能看清统计力学已经回答的问题与仍待解释的部分。

## 关键词

正则系综; 微正则系综; 巨正则系综; 配分函数; 玻尔兹曼因子; 自由能; 熵; 涨落响应; 费米—狄拉克分布; 玻色—爱因斯坦分布; 临界现象; 重整化群; 非平衡功关系

## 参考文献

1. Tong, D. _Statistical Physics_, Chapter 1. [作者讲义](https://www.damtp.cam.ac.uk/user/tong/statphys/statmechhtml/S1.html)。系综、配分函数、涨落与历史。
2. Gibbs, J. W. _Elementary Principles in Statistical Mechanics: Developed with Especial Reference to the Rational Foundation of Thermodynamics_. New York: Charles Scribner’s Sons; London: Edward Arnold, 1902. [原著转录及书名页](https://en.wikisource.org/wiki/Elementary_Principles_in_Statistical_Mechanics)。
3. Touchette, H. “Equivalence and Nonequivalence of Ensembles: Thermodynamic, Macrostate, and Measure Levels.” _Journal of Statistical Physics_ 159 (2015): 987–1016. [DOI](https://doi.org/10.1007/s10955-015-1212-2)；[作者全文](https://arxiv.org/abs/1403.6608)。
4. Perrin, J. _Brownian Movement and Molecular Reality_. Translated by F. Soddy. Taylor and Francis, 1910. [原著英译本](https://archive.org/details/brownianmovement00perr)。§§24–25的历史数值。
5. Kubo, R. “Statistical-Mechanical Theory of Irreversible Processes. I. General Theory and Simple Applications to Magnetic and Conduction Problems.” _Journal of the Physical Society of Japan_ 12 (1957): 570–586. [DOI](https://doi.org/10.1143/JPSJ.12.570)。
6. Tong, D. _Statistical Physics_, Chapter 3. [作者讲义](https://www.damtp.cam.ac.uk/user/tong/statphys/statmechhtml/S3.html)。量子气体、光子与占据数。
7. Anderson, M. H., et al. “Observation of Bose-Einstein Condensation in a Dilute Atomic Vapor.” _Science_ 269 (1995): 198–201. [DOI](https://doi.org/10.1126/science.269.5221.198)。铷87气体。
8. Davis, K. B., et al. “Bose-Einstein Condensation in a Gas of Sodium Atoms.” _Physical Review Letters_ 75 (1995): 3969–3973. [DOI](https://doi.org/10.1103/PhysRevLett.75.3969)。
9. Nobel Foundation. The Nobel Prize in Physics 2001. [授奖说明](https://www.nobelprize.org/prizes/physics/2001/summary/)。
10. Wilson, K. G. “The Renormalization Group and Critical Phenomena.” _Reviews of Modern Physics_ 55 (1983): 583–600. [DOI](https://doi.org/10.1103/RevModPhys.55.583)。
11. Ackley, D. H., G. E. Hinton, and T. J. Sejnowski. “A Learning Algorithm for Boltzmann Machines.” _Cognitive Science_ 9 (1985): 147–169. [原论文](https://www.cs.cmu.edu/~bhiksha/courses/deeplearning/Fall.2016/pdfs/Ackley_Hinton_Sejnowski.pdf)。
12. Jaynes, E. T. “Information Theory and Statistical Mechanics.” _Physical Review_ 106 (1957): 620–630. [DOI](https://doi.org/10.1103/PhysRev.106.620)；[原论文](https://wwwusers.ts.infn.it/~milotti/Didattica/Bayes/pdfs/Jaynes_1957a.pdf)。
13. Jarzynski, C. “Nonequilibrium Equality for Free Energy Differences.” _Physical Review Letters_ 78 (1997): 2690–2693. [DOI](https://doi.org/10.1103/PhysRevLett.78.2690)。
14. Crooks, G. E. “Entropy Production Fluctuation Theorem and the Nonequilibrium Work Relation for Free Energy Differences.” _Physical Review E_ 60 (1999): 2721–2726. [DOI](https://doi.org/10.1103/PhysRevE.60.2721)。
15. Collin, D., et al. “Verification of the Crooks Fluctuation Theorem and Recovery of RNA Folding Free Energies.” _Nature_ 437 (2005): 231–234. [DOI](https://doi.org/10.1038/nature04061)；[开放全文](https://pmc.ncbi.nlm.nih.gov/articles/PMC1752236/)。
16. Bennett, C. H. “The Thermodynamics of Computation—a Review.” _International Journal of Theoretical Physics_ 21 (1982): 905–940. [DOI](https://doi.org/10.1007/BF02084158)；[原论文](https://fab.cba.mit.edu/classes/862.22/notes/computation/Bennett-1982.pdf)。
