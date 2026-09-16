---
title: 扩散模型：从噪声里长出分布
title_en: Diffusion Models — Growing a Distribution out of Noise
status: published
updated: 2026-09-13
category: 人工智能
horizon: 2020s
order: 14
tags:
  - 扩散模型
  - DDPM
  - 分数匹配
  - 潜扩散
  - 生成模型
researchers:
  - Jonathan Ho、Ajay Jain、Pieter Abbeel（DDPM）
  - Yang Song、Stefano Ermon、Jascha Sohl-Dickstein（分数 / SDE）
  - Robin Rombach 等（潜扩散 / Latent Diffusion）
  - Nicholas Carlini 等（训练数据抽取）
institutions:
  - UC Berkeley
  - Stanford
  - LMU Munich / CompVis
  - Stability AI
  - Google / DeepMind
related:
  - large-language-models
  - computer-vision
  - deep-learning-architectures
  - ai-interpretability
---

# 扩散模型：从噪声里长出分布

2020 年，Ho、Jain 与 Abbeel 的 DDPM 把一条看起来像物理的程序——把图像一步步加噪直到变成高斯，再学着把它一步步去噪——做成了能在 CIFAR-10 上打出 FID 3.17 的生成模型。它不是突然从零出现的：Sohl-Dickstein 等人 2015 年已经用非平衡热力学写下前向与反向过程；Song 与 Ermon 2019 年起用分数匹配（score matching）估计数据分布的对数梯度。2020 年代真正爆炸的，是这条线第一次在像素级样本质量上压过了当时的 GAN 叙事，并在 2022 年经由潜空间扩散走进消费级文生图。

开放问题也随之换了房间。训练目标大体清楚了；不清楚的是：FID 这类指标到底在奖励什么、模型是否在背训练集、版权与安全能不能在研究层面被操作化，而不是停在口号。

## 破除误解：扩散不是“把噪声滤掉那么简单”

把扩散模型理解成高级降噪器，会漏掉它真正在学的对象。前向过程把数据分布逐步变成已知的噪声分布；反向过程要的不是一张更干净的图，而是**逐步把噪声分布搬回数据分布**。每一步网络预测的，是当前噪声水平下的分数——对数密度的梯度——或与之等价的噪声。学会分数，等于学会在每层噪声上指出“密度增大的方向”。

另一句流行说法是“扩散已经取代 GAN”。样本质量上，2020–2022 年的无条件图像基准确实大幅转向扩散；但似然、采样步数、可控性与对抗训练的失败模式并不因此消失。GAN 的训练不稳定被换成了扩散的采样昂贵；一边的模式崩塌，换成另一边的记忆与评测失效。取代的是排行榜上的默认基线，不是生成建模的全部问题清单。

## 现场：DDPM、分数、随机微分方程

DDPM 把离散时间的马尔可夫链写成可训练的变分目标，再发现一个加权的简化损失——预测所加的噪声——在样本质量上意外地好。这个简化不是把理论扔掉：它揭示去噪分数匹配与扩散之间的等价。Song 等人（NeurIPS 2021）把离散链嵌进连续时间的随机微分方程，前向 SDE 把数据漂到噪声，反向 SDE 只要分数就能积回来。概率流常微分方程给出另一条确定性的采样路径。于是“多少步”不再只是超参数，而变成求解器精度与分布误差之间的权衡。

潜扩散（Rombach 等，CVPR 2022）做了一个工程上几乎改写生态的选择：先用自编码器把图像压到低维潜空间，再在潜空间里做扩散。像素级扩散的计算落在每一个 RGB 上；潜空间把大部分比特交给重建模型，扩散只在语义更密的坐标里跑。Stable Diffusion 把这条路线做成可下载的权重。研究问题随之移动：生成质量有一部分是自编码器的重建上限，有一部分是扩散先验，评测若只看 FID，会把两者糊成一个数字。

文生图还依赖条件机制。分类器引导需要一个与噪声水平对齐的分类器；无分类器引导（classifier-free guidance）在训练时随机丢掉条件，推理时用有条件与无条件分数的差去放大对齐。它提高了“像提示”的观感，也系统性地改变了多样性与似然。2020 年代的开放评测问题，有一半从这里长出来：你到底在测分布匹配，还是在测一种被引导扭曲过的条件生成器。

## 谁在做，做到了哪一步

| 路线            | 代表工作               | 2020–2024 的位置         |
| --------------- | ---------------------- | ------------------------ |
| 离散去噪        | DDPM / Improved DDPM   | 像素级质量的转折         |
| 分数 + SDE      | NCSN / Score SDE       | 连续时间与似然的统一语言 |
| 潜扩散          | LDM / Stable Diffusion | 高分辨率与开源权重       |
| 自回归 / 一致性 | 流、一致性模型等       | 用更少步数逼近同一条轨迹 |

工业系统（DALL·E 2、Imagen、级联扩散、后续视频扩散）把同一套分数估计接到文本编码器与级联分辨率上。研究论文能核实的是架构与损失，不是各家未公开的数据配方。因此“谁最强”不是一个可复现的科学问题；可复现的是：在给定数据与计算下，离散链、SDE 与潜空间各自把误差预算放在哪。

U-Net 并不是扩散的定义。Peebles 与 Xie（ICCV 2023）把潜空间里的去噪网络换成 Transformer（DiT），用前向 Gflops 作为规模轴：更深、更宽、更多 patch token，FID 随之下降。他们最大的 DiT-XL/2 在 ImageNet 256×256 上把当时的 FID-50K 做到 2.27。这件事的研究含义是：扩散的可扩展性可以继承 Transformer 的那条曲线，而不必绑定卷积骨架。OpenAI 在 2024 年 2 月的 Sora 报告里把同一思路写到视频——在时空 patch 上做扩散 Transformer，联合训练可变时长与分辨率的视频和图像，并声称能生成最长约一分钟的高清视频。这是公司技术报告，不是对照实验。可核实的结构陈述是：视频扩散把时间当成又一个需要去噪的坐标，评测却几乎还没有赶上图像上那套已经不充分的 FID。

另一条平行改写发生在训练目标上。流匹配与 rectified flow 把数据与噪声用一条更直的轨迹连起来，学习目标从“预测所加噪声”改成速度场。Stable Diffusion 3 的论文（Esser 等，2024）把 MMDiT——文本与图像两套权重、在注意力里拼接——和重加权的 rectified flow 放在一起，声称在少步采样、排版与提示对齐上同时改进。它没有结束“多少步”的争论，只是把争论从 DDPM 的离散链搬到了流的直线上。

扩散也不再只属于像素。RFdiffusion（Watson 等，_Nature_ 2023）把 RoseTTAFold 微调成蛋白质骨架的去噪模型，并在实验里表征了大量设计的对称组装、金属结合蛋白与结合蛋白；一篇流感血凝素结合物的冷冻电镜结构与设计模型几乎重合。这里的“样本质量”不再是 FID，而是实验折叠与结合。它提醒一条容易被文生图淹没的事实：扩散是对某种几何对象的分数估计，像素只是最先被工业放大的一种。

## 代价与争议：评测、版权、安全

**FID 不是分布的充分统计。** 它比较的是 Inception 特征上的高斯近似，对空间位置、个别物体身份与长尾概念都不敏感。2020 年代的生成论文几乎都报 FID，同时几乎都承认它与“有没有记住训练集”“会不会按提示造出受保护的角色”不是同一个量。Precision/Recall、似然、人工偏好，每一项都切开不同的失败。开放评测问题是：没有单一标量能同时管样本观感、覆盖、记忆与安全；排行榜却继续假装有。

**记忆把版权从法律口号变成可测的抽取。** Carlini 等人（USENIX Security 2023）用生成-再过滤的流程，从 Stable Diffusion、Imagen 一类模型里抽出上千张训练样本，从个人照片到商标。他们的结论写得很硬：扩散模型在隐私上比先前许多 GAN 更差，缓解可能需要新的隐私训练，而不是只靠去重口号。这不是“模型偶尔撞车”，而是训练目标对高频重复样本的偏置。法律诉讼在 2023–2025 年并行展开，研究能提供的不是判决，而是可操作的测量：成员推断、抽取成功率、去重之后记忆是否还在。

**安全在研究层面同样不是过滤器清单。** 文生图的有害内容、模仿艺术家风格、生物与暴力相关提示，每一项都依赖评测集的构造。这些评测集本身会过时、会泄漏到训练集、会被无分类器引导放大。把安全写成“加一个拒绝词表”，等于把一个分布问题缩成字符串匹配。2020–2024 年真正的开放问题是：概念擦除与机器遗忘会在无关概念上付出多大的 FID 与语义损伤，以及这种损伤能否被新的提示绕过——后者是评测设计问题，不是部署手册。

## 未知的边界

- 分数估计在高维图像流形上是否统计上适定，还是我们只是在用巨大网络拟合一条好用的向量场？
- 潜空间里的扩散先验，有多少能力其实属于自编码器？两者的误差如何拆开评测？
- 一致性模型与蒸馏能否在不崩掉覆盖的前提下把采样压到个位数步，还是在用观感换分布？
- 记忆与版权：去重、差分隐私、机器遗忘，哪一条能在不把长尾概念一起删掉的情况下降低可抽取性？
- 视频与三维把时间与几何加进同一条反向过程，评测指标几乎还没有赶上图像上那套不充分的 FID。

## 跨域连接

- **[[probability|概率论]]**：反向过程是在每层噪声上估计条件分布，分数是对数密度的梯度。采样是积分，不是“滤镜”。**无分类器引导故意走出这一条件分布**，用外推去换提示对齐，于是 FID 变好或变差都不能单独说明模型更接近数据。
- **[[measure-theory|测度论]]**：生成模型声称自己在学一个高维测度，而像素空间的数据测度几乎集中在极低维的支撑上。前向扩散把这个奇异测度平滑成对勒贝格测度绝对连续的对象，反向再试图走回去。**评测失败常常是因为我们用另一个测度（Inception 特征上的高斯）去代理原测度**，两者的弱收敛并不自动给出样本意义上的“像”。
- **[[information-geometry|信息几何]]**：分数匹配学的是密度在流形上的梯度场，而不是一张查找表。不同噪声水平对应不同的度量。**把所有时间步用同一个网络分担，等于假设这条轨迹在信息几何上足够光滑**——一旦条件（文本）把分布拧到窄模上，这条假设就会在引导强度里破裂。
- **[[statistical-mechanics-boltzmann|玻尔兹曼统计力学]]**：DDPM 的直系引文就是非平衡过程：用一条破坏结构的前向动力学，换一条可学习的反向动力学。**温度与噪声水平在这里是同一类控制参数**，但物理系统有哈密顿量，图像模型没有；把“热力学”原封不动搬过来会假装有守恒律。能保留的是：平衡分布好写，非平衡路径上的分数必须学。
- **[[information-philosophy|信息哲学]]**：一张生成图像是新样本还是训练集的回放，取决于你把“信息”定义成分布还是个别记录。抽取实验表明两种阅读会打架。**版权争论在研究上可操作的部分，正是如何测量个别记录是否从分布里可分离地漏出来**，而不是先争论模型有没有“理解艺术”。

---

## 参考文献

- Ho, J., Jain, A. & Abbeel, P. _Denoising Diffusion Probabilistic Models._ NeurIPS 2020. arXiv:2006.11239.
- Song, Y. et al. _Score-Based Generative Modeling through Stochastic Differential Equations._ ICLR 2021. arXiv:2011.13456.
- Rombach, R. et al. _High-Resolution Image Synthesis with Latent Diffusion Models._ CVPR 2022. DOI: 10.1109/CVPR52688.2022.01042.
- Carlini, N. et al. _Extracting Training Data from Diffusion Models._ USENIX Security 2023.
- Sohl-Dickstein, J. et al. _Deep Unsupervised Learning using Nonequilibrium Thermodynamics._ ICML 2015.
- Heusel, M. et al. _GANs Trained by a Two Time-Scale Update Rule Converge to a Local Nash Equilibrium._ NeurIPS 2017.（FID）
- Peebles, W. & Xie, S. _Scalable Diffusion Models with Transformers._ ICCV 2023. arXiv:2212.09748.
- Watson, J. L. et al. _De novo design of protein structure and function with RFdiffusion._ Nature 620, 2023. DOI: 10.1038/s41586-023-06415-8.
- Esser, P. et al. _Scaling Rectified Flow Transformers for High-Resolution Image Synthesis._ arXiv:2403.03206 (2024).

## 延伸阅读

- Song, Y. & Ermon, S. _Generative Modeling by Estimating Gradients of the Data Distribution._ NeurIPS 2019.
- Ho, J. & Salimans, T. _Classifier-Free Diffusion Guidance._ NeurIPS 2022 Workshop. arXiv:2207.12598.
- OpenAI. _Video generation models as world simulators._ 2024 年 2 月（Sora 技术报告，公司声明）。
- Lipman, Y. et al. _Flow Matching for Generative Modeling._ ICLR 2023.
