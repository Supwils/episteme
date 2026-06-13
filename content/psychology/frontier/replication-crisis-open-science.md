---
title: 复制危机之后：开放科学如何重塑心理学
title_en: "After the Replication Crisis: How Open Science Is Reshaping Psychology"
status: published
updated: 2026-06-12
category: 科学方法与元科学
horizon: 2020s
order: 1
tags:
  - 复制危机
  - 开放科学
  - 预注册
  - 注册报告
  - 元科学
researchers:
  - Brian Nosek（弗吉尼亚大学 / Center for Open Science）
  - Simine Vazire（墨尔本大学）
  - Uri Simonsohn（埃塞克斯大学）
institutions:
  - Center for Open Science（COS）
  - 开放科学框架（OSF）
  - "心理科学可重复性项目（Reproducibility Project: Psychology）"
related:
  - predictive-processing-psychiatry
---

# 复制危机之后：开放科学如何重塑心理学

2011 年，心理学史上最奇特的一篇论文被接受发表在顶级期刊《人格与社会心理学杂志》。作者 Daryl Bem 声称用严格的实验程序证明了"预知未来"（precognition）的存在——被试能以高于概率的准确率猜到随机生成的刺激位置，哪怕那个刺激在猜测之后才出现。

这篇论文通过了同行评审。它的方法学看起来和其他"正常"的心理学实验毫无二致。

这不是巧合——这恰恰是问题所在。

## 破除误解：这不是"几个坏苹果"的问题

复制危机最常见的误读是把它归结为少数不诚实研究者的造假丑闻。实际上，心理学复制危机的根源要深得多——它暴露的是整个科研激励结构、发表标准和研究实践中长期存在的系统性缺陷。

更令人不安的是：Bem 的实验几乎没有违反任何当时通行的研究规范。他使用了双盲设计，进行了统计显著性检验（所有九个实验的 p 均小于 0.05），样本量在那个年代属于正常甚至偏大。

问题在于他——以及绝大多数同代心理学家——在无意识中做了一件事：当数据"快接近显著"时，多收几个被试；当某个条件不显著时，不报告那个条件；当最初的假设被数据否定时，换一个假设继续分析。这些操作在 2011 年之前的心理学界普遍存在，甚至被视为"灵活运用数据"的正常技能。Uri Simonsohn 将其命名为 **p-hacking**（p 值操控），并用模拟研究证明：仅凭这些"灵活"操作，即便面对完全随机的数据，研究者也能以超过 60% 的概率"发现"显著效应[^simonsohn2011]。

## 现场：2011—2015 年，"心理学的危机时刻"

2011 年是一个转折年。Bem 的预知论文发表的同年，三件事同时发生：

**第一件**：社会心理学家 Diederik Stapel 的数据造假案被揭发，涉及数十篇论文，其中包括那篇声称街道肮脏程度影响种族歧视态度的研究。这个案子直接推动荷兰学界启动大规模的科研诚信调查。

**第二件**：Simonsohn、Nelson 和 Simmons 发表论文《False-Positive Psychology》，用数学推导和模拟研究表明：如果研究者拥有足够的"自由度"（灵活的样本量、多个测量、多个条件），他们几乎必然会偶然获得统计显著结果，即便真实效应为零[^fpp]。

**第三件**：Nosek 团队宣布启动大规模复制计划——**心理科学可重复性项目**（Reproducibility Project: Psychology，RPP）。

2015 年，RPP 结果发布在《科学》杂志：在 100 项经典心理学研究的复制尝试中，只有约 36% 能够在直接复制中获得统计显著的相同方向效应，平均效应量约为原始研究的一半[^rpp]。

这个数字震撼了整个领域。也有研究者立即提出批评——部分复制失败可能源于复制条件与原始研究的情境差异，而非原始效应不存在。这个争论至今未完全平息，但已推动了更精细的复制方法学发展。

## 哪些经典效应幸存，哪些倒下

复制危机最具体的贡献，是迫使领域正视每一个"经典发现"的实际证据基础。以下是证据较为清晰的几类情况：

### 倒下或严重受损的效应

**自我损耗（ego depletion）**：Roy Baumeister 的理论认为，意志力是一种有限的资源，可以被耗尽，从而导致后续任务表现变差。这个理论催生了数百项研究。然而，2016 年 Hagger 等人组织的 23 个实验室预先注册的大规模复制尝试显示，自我损耗效应接近于零（d = 0.04）[^hagger2016]。目前学界对自我损耗的"资源模型"解释存在重大争议，主流倾向是认为原始效应被严重高估。

**权力姿势效应（power posing）**：Amy Cuddy 的研究声称，摆出"高权力"肢体姿势（双腿分开、双手叉腰）可以提升睾酮、降低皮质醇，进而改善绩效表现和冒险行为。2015 年 Ranehill 等人在更大样本（N=200）的预注册复制研究中发现：姿势效应确实影响主观感受（感觉更有力量），但对激素水平和风险行为没有可重复的效应[^ranehill]。共同作者 Dana Carney 本人后来公开声明她不再相信权力姿势的激素效应[^carney]。行为效应的研究结论仍然混乱。

**社会启动效应（social priming）**：这一类效应声称无意识地接触某个概念会改变行为——例如阅读与"老年"相关的词汇后走路变慢（John Bargh 的经典研究），或持有温热咖啡杯后评价他人更"温暖"。多项直接复制尝试均以失败告终，包括专门针对 Bargh 老年启动效应的大样本复制（Doyen et al., 2012）。Bargh 本人对这些复制提出了方法学批评，争论目前仍在持续，但大多数元分析显示这类效应如果存在也非常微弱且对实验条件极为敏感[^bargh]。

**颠覆性的"笔叼嘴"面部反馈效应**：Fritz Strack 1988 年的研究声称，用嘴叼笔（迫使面部肌肉模拟微笑）可以让人觉得漫画更有趣。这个研究被引用超过 1400 次，成为心理学教科书的标配案例。2016 年，一个跨 17 个国家、N=1894 的大规模复制失败（d = 0.03，接近零）[^strack2016]。不过，该复制研究在使用摄像头的条件（可能产生观察焦虑）与不使用的条件之间存在差异，之后的研究显示效应可能仅在没有摄像头时出现——这让结论更加复杂，而非更清晰。

### 存活或基本稳健的效应

**认知失调（cognitive dissonance）**：Festinger 的核心效应——当行为与态度不一致时，人会改变态度以减少不适——在多项直接复制中表现稳健，尽管对机制的解释存在理论争议。

**内隐联结测试（IAT）测量的内隐偏见**：测量结果本身的信度尚可（重测信度约为 0.4–0.6），但 IAT 分数能否预测歧视性行为的问题存在激烈争议，元分析估计预测效度相当有限（r ≈ 0.15）。

**旁观者效应（bystander effect）**：在实验室条件下的效应相当稳健（2011 年和 2019 年的元分析均确认），但在真实紧急情境中效应大幅减弱（Philpot et al., 2020 的监控录像研究发现 90% 的情况下旁观者提供了帮助）。效应存在，但现实中的边界条件远比早期理论描述的复杂。

**条件恐惧学习（fear conditioning）** 及其消退：基本的巴甫洛夫条件反射机制在人类和动物中都极为稳健，是基础神经科学的重要基础。

## 开放科学的应对：工具箱在 2020 年代已经成熟

复制危机不只是破坏，它也推动了研究实践的实质性变革。以下几项工具在 2020 年代已经从"倡议"变成了制度。

### 预注册（Pre-registration）

研究者在开始数据收集之前，将研究假设、方法和分析计划公开登记在 OSF（开放科学框架）或 AsPredicted 等平台。这从根本上区分了"验证性研究"（confirmatory）和"探索性研究"（exploratory），消除了事后改变假设和选择性报告的空间。

2015 年之前，社会心理学领域的预注册研究几乎为零。到 2024 年，许多顶级期刊要求提交预注册稿件，OSF 平台注册数量已超过 10 万条[^osf]。

### 注册报告（Registered Reports）

这是一种根本性的期刊发表格式变革：期刊在数据收集**之前**，基于研究问题的重要性和方法的严谨性决定是否接受论文——而不是在看到结果之后。这直接切断了"只有显著结果才能发表"的激励。

目前，已有超过 300 家期刊支持注册报告格式，包括《自然·人类行为》《心理科学》等旗舰期刊。注册报告的首要效果是：发表的零结果研究比例从传统模式的不足 5% 提升到约 50%[^chamber]。

### 开放数据与开放材料（Open Data & Open Materials）

越来越多的期刊要求作者在论文发表时公开原始数据和实验材料。这让其他研究者能够独立核实分析、检验不同分析策略的结果，并在已有数据上提出新问题。

2023 年，美国国家卫生研究院（NIH）发布新规，要求所有 NIH 资助项目在论文发表时公开数据[^nih2023]。欧洲科研委员会（ERC）有类似要求。

### 大规模多实验室复制（Many Labs 项目）

由 Nosek 等人组织的 Many Labs 项目在全球几十个实验室同时复制同一批经典研究，可以区分"某个效应只在某文化/某实验室出现"与"某个效应跨情境稳健"。Many Labs 2（2018）在 36 个国家的实验室检验了 28 个效应，结果高度分化——有的效应在所有地点都出现，有的根本不出现，有的表现出明显的文化差异[^ml2]。

## 代价与争议：开放科学运动的张力

变革从来不是无代价的。

**过度矫正的担忧**：部分研究者担心，"p < 0.05 即显著"被全面质疑之后，领域陷入了另一个极端——把所有未被大规模预注册复制的研究都视为无效。这忽视了复制研究本身的局限：情境、文化、时代背景都可能合理地导致效应大小不同，而非"原始研究是假的"。

**WEIRD 样本问题**：复制危机的讨论促使领域正视另一个盲点——绝大多数心理学研究的被试来自 Western（西方）、Educated（受过高等教育）、Industrialized（工业化）、Rich（富裕）、Democratic（民主）国家（WEIRD），这些样本代表的人口不足全球的 15%，却被当作"人类心理的普遍结论"。这一批评由 Henrich、Heine 和 Norenzayan 在 2010 年系统提出[^weird]，在 2020 年代已成为期刊投稿的标准审查项。

**开放科学的不平等**：大样本、预注册研究需要更多资金和人力，这在客观上对资源匮乏的研究机构（包括发展中国家的学者）构成障碍。开放科学在推动严谨性的同时，可能加剧研究资源的不平等集中。

**"复制危机"的范围之争**：危机的程度本身就是一个有争议的实证问题。部分研究者指出，RPP 研究的方法学存在局限——复制实验是否足够"直接"？文化和时间变迁是否解释了部分不一致？一个更保守的估计认为，心理学发表研究的"真实阳性率"可能在 50–70% 之间，而非复制失败率暗示的 36%。真相大概率在中间。

## 未知的边界

- **效应量缩水（inflation）是普遍规律**：即便效应真实存在，初始研究（通常样本量小、选取典型情境）系统性地高估效应量，后续大规模研究总会得出更小的数字。这种"赢者诅咒"到底有多严重，是否能被预注册完全纠正，尚无定论。
- **机制研究的复制性**：复制危机主要针对的是行为/现象层面的效应。但心理学中另一类研究——关于认知机制、神经基础的研究——有着不同的复制性格局，尚未被同等规模地评估。
- **预注册能否被"游戏化"**：批评者已记录了一些案例，研究者在预注册之后仍然通过"不在预注册计划内的探索性分析"发表显著结果，而不明确说明哪些是探索性的。预注册的实际改进效果需要继续跟踪。
- **元科学本身的方法学**：评估复制率的元分析本身也有方法学挑战——如何选择纳入研究？如何定义"复制成功"？这些问题还在讨论中。

## 跨域连接

- **哲学（科学哲学）**：复制危机重新激活了波普尔的可证伪性讨论——心理学的研究对象（人类行为）本来就受历史和文化约束，"可证伪"对心理学意味着什么？库恩的"范式"概念在元科学时代获得了新的经验证据基础。

- **统计学**：围绕 p 值的争论推动了对贝叶斯因子、效应量报告和置信区间的更广泛使用。2016 年，72 位统计学家联合在《自然·人类行为》发表文章，建议将"统计显著性"门槛从 p = 0.05 降至 p = 0.005——这一提议本身也引发了激烈的统计哲学争论[^benjamin]。

- **经济学**：行为经济学领域有许多与社会心理学重叠的研究（锚定效应、框架效应等），也受到了复制危机的冲击。部分被视为政策依据的行为经济学效应在大样本研究中表现出比原始研究小得多的效应量。

- **医学**：心理学的复制危机与医学领域 John Ioannidis 2005 年发表的《为什么大多数发表的研究发现是假的》遥相呼应，两个领域在元科学层面深度交织[^ioannidis]。

---

## 延伸阅读

- Open Science Collaboration. _Estimating the reproducibility of psychological science._ Science 349, aac4716 (2015). DOI: 10.1126/science.aac4716. [RPP 原始报告]
- Simmons, J.P., Nelson, L.D., & Simonsohn, U. _False-positive psychology: Undisclosed flexibility in data collection and analysis allows presenting anything as significant._ Psychological Science 22, 1359–1366 (2011).
- Nosek, B.A. et al. _Promoting an open research culture._ Science 348, 1422–1425 (2015).
- Chambers, C. _The Seven Deadly Sins of Psychology: A Manifesto for Reforming the Culture of Scientific Practice._ Princeton University Press, 2017.
- Henrich, J., Heine, S.J., & Norenzayan, A. _The weirdest people in the world?_ Behavioral and Brain Sciences 33, 61–83 (2010).
- Hagger, M.S. et al. _A multilab preregistered replication of the ego-depletion effect._ Perspectives on Psychological Science 11, 546–573 (2016).
- Klein, R.A. et al. (Many Labs 2). _Investigating variation in replicability: A "many labs" replication project._ Advances in Methods and Practices in Psychological Science 1, 443–490 (2018).

[^simonsohn2011]: Simmons, Nelson & Simonsohn, _Psychological Science_ 22 (2011)，展示了 p-hacking 在真零效应数据上产生显著结果的概率模拟。

[^fpp]: 同上。

[^rpp]: Open Science Collaboration, _Science_ 349 (2015)，100 项研究中约 36% 在直接复制中获得显著相同方向效应。

[^hagger2016]: Hagger et al., _Perspectives on Psychological Science_ 11 (2016)，23 个实验室预注册复制 ego-depletion，d = 0.04。

[^ranehill]: Ranehill et al., _Psychological Science_ 26 (2015)，N=200 预注册复制，姿势对激素水平无可重复效应。

[^carney]: Dana Carney 的公开声明于 2016 年发布，可在她的个人学术主页查阅。

[^bargh]: Doyen et al. (2012)，以及后续多项元分析，对社会启动效应的基础证据提出了严重质疑。

[^osf]: Center for Open Science 年度报告，OSF 预注册数量统计（截至 2024 年）。

[^chamber]: Chambers, C. 等人关于注册报告改善发表偏倚的分析，发表于 _PLOS ONE_ 和 _Perspectives on Psychological Science_。

[^nih2023]: NIH 数据管理与共享政策（DMS Policy），2023 年 1 月生效。

[^ml2]: Klein et al., _Advances in Methods and Practices in Psychological Science_ 1 (2018)，28 个效应在 36 个地点的大规模检验。

[^weird]: Henrich, Heine & Norenzayan, _Behavioral and Brain Sciences_ 33 (2010)。

[^benjamin]: Benjamin et al., _Nature Human Behaviour_ 2 (2018)，72 位统计学家联合建议将显著性门槛改为 0.005。

[^ioannidis]: Ioannidis, J.P.A. _Why most published research findings are false._ PLOS Medicine 2 (2005)。
