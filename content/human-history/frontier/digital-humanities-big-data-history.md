---
title: 数字人文与大数据史学——用算法丈量历史
title_en: Digital Humanities and Big Data History — Measuring the Past with Algorithms
status: published
updated: 2026-06-12
category: 数字史学
horizon: 2020s
order: 4
tags:
  - 数字人文
  - 文本挖掘
  - Seshat数据库
  - 计量史学
  - 网络分析
  - 语料库语言学
researchers:
  - Peter Turchin（康涅狄格大学 / 复杂科学研究所）
  - Maximilian Schich（塔林大学）
  - Erez Lieberman Aiden（贝勒医学院）
  - Jean-Baptiste Michel（哈佛大学）
institutions:
  - Seshat 全球史数据库
  - Google Books Ngram Viewer（哈佛-Google 合作）
  - 复杂科学研究所（Santa Fe Institute）
related:
  - climate-and-history
  - decolonial-global-history
---

# 数字人文与大数据史学——用算法丈量历史

2010 年 12 月，哈佛大学的 Jean-Baptiste Michel 和 Erez Lieberman Aiden 在《科学》上发表了一篇论文，介绍一个新词：**文化组学**（culturomics）。他们分析了 Google Books 数字化的约 500 万册书籍，约含 5000 亿个英文词汇，追踪词语频率随时间的变化。"1950 年代"这一表述在同一年代出现的频率峰值，揭示了人类集体记忆的衰减曲线。"声名狼藉"的纳粹人名在二战后的词频曲线，呈现出审查的痕迹。

这篇文章引发了史学界的两极反应——要么是"革命性的新工具"，要么是"对历史复杂性的粗暴简化"。两种评价都不完全错误。这种张力，至今仍是数字人文领域最有活力的智识争论。

## 破除误解：数字人文不是"让计算机写历史"

一个常见的误解，是把数字人文理解为"用机器取代历史学家"。这误解了这场方法论革命的实质。

数字人文的核心贡献不是用算法得出历史结论，而是**扩展历史学家的感知范围**。在传统方法下，即使一个史学家穷尽一生，也只能精读数千本文献。数字化语料库让研究者得以在数百万份文献中搜索模式、发现异常、生成假说——然后把最有意思的发现交给人类的历史判断力去深入分析。

换句话说，算法处理的是"大量资料中发现值得注意的东西"这个任务；人类史学家处理的仍然是"为什么这件事重要，它意味着什么"。工具改变了，但史学的核心判断没有被取代。

这一区别在实践中往往被模糊，是数字人文研究最常见的方法论问题。

## Google Ngram 与"文化演化"的测量

Google Books Ngram Viewer 是迄今最广为人知的数字史学工具。通过跟踪词语在出版物中的频率变化，研究者已经用它探索了一系列有趣问题：

- **集体遗忘的速度**：Michel 等人发现，一个历史事件在后世出版物中被提及的频率，大约以每十年 5-7% 的速率衰减，呈现出某种近乎数学规律的"文化遗忘曲线"。
- **政治审查的可见痕迹**：德语语料库中，在纳粹执政时期（1933–1945），犹太艺术家和科学家的名字频率明显下降，这一模式在数据中清晰可辨。
- **情感极性的历史变化**：通过情感词典分析不同时期的文学语料，研究者尝试追踪乐观主义和悲观主义的长期文化周期——这是一个存在争议但颇具创意的研究方向。

然而，Ngram 方法存在几个公认的局限：语料库本身有选择偏差（并非所有出版物都被数字化，且精英/学术文本过度代表）；词语频率的变化可能源于语言演化本身，而非观念变迁；量化词频和"测量思想重要性"之间有相当大的鸿沟。

## Seshat 数据库：用量化方法做比较文明研究

Seshat 全球史数据库（Seshat: Global History Databank）是数字史学中野心最大的系统性尝试之一。由生态学家兼历史学家 Peter Turchin 于 2011 年发起，联合人类学家、历史学家、考古学家共同构建，其目标是：**将人类有记录的 1 万年历史中，数百个政体的社会复杂度指标量化成可统计分析的数据集**。

Seshat 的数据点涵盖政体的地理范围、人口、军事技术、税收制度、法律体系、宗教制度、识字率、货币使用等数十个变量，每个数据点都有文献来源和可信度评级。2020 年发布的"Equinox2020"数据集，包含 400 余个世界各地政体的系统数据，时间跨度从公元前 4000 年到 1900 年；2022 年，该数据集在 Zenodo 正式归档发布（Seshat Data 1.0）[^seshat_data]。

Turchin 团队用这批数据测试的一个关键假说是：**"结构-人口理论"（structural-demographic theory）**——即国家内部的社会不稳定性（内战、革命、政治暴力）周期性涌现，与精英过度生产（elite overproduction）、国家财政压力和人口压力之间存在系统性关联，与欧亚各地区的多个历史案例吻合。

2023 年，Turchin 的著作《末日》（_End Times: Elites, Counter-Elites, and the Path of Political Disintegration_，Penguin Press）将这一框架应用于当代美国，引发史学界新一轮争论。诺贝尔经济学奖得主 Angus Deaton 称其"消息灵通、令人信服、令人恐惧"；但批评者也指出，该书回避了可被证伪的具体预测，在科学意义上的"预测"力度有限[^endtimes]。

**Seshat 的伦理争议**。2022 年，围绕"道德化宗教的兴起是否推动了大社会的出现"这一假说，Seshat 团队在 _Religion, Brain & Behavior_ 发表了相互商榷的多篇论文，暴露了数据编码的主观性：不同研究团队对同一历史政体的"宗教制度"指标，有时给出截然不同的评分。量化的精确外表下，编码者的文化背景和理论预设不可避免地影响结果。

## 文本挖掘与历史语料库的新可能

在 Ngram 的宏观词频分析之外，2020 年代涌现了更精细的文本挖掘应用：

**主题模型（Topic Modeling）**：使用 LDA（Latent Dirichlet Allocation）等算法，可以从数以万计的历史文献中自动发现潜在的语义主题，追踪概念的兴衰。例如，研究者用这种方法分析了十七至十八世纪英国议会辩论（Hansard 语料库），发现"自由"（liberty）与"帝国"（empire）两个概念的语义共现结构在 1770 年代美国独立期间经历了系统性重组。

**命名实体识别与历史网络分析**：通过从大量历史文献中自动提取人名、地名、机构名，并建立它们之间的关联，研究者可以构建历史社会网络。哈佛"Republic of Letters"项目（Mapping the Republic of Letters）用这种方法分析了 17 世纪欧洲学者之间的书信往来网络，揭示了启蒙思想传播的实际地理路径——某些地区作为"中转节点"的重要性，在传统研究中被大大低估。

**机器翻译与非主流语言历史档案的开放**：大语言模型（LLMs）的突破，使得此前因语言障碍而无法被主流学界利用的大量档案成为可能。奥斯曼帝国的波斯文/阿拉伯文/奥斯曼土耳其文档案，非洲的斯瓦希里文文献，以及大量南亚本地语言记录，正在通过机器辅助翻译进入可处理状态。

## 争议：量化的诱惑与历史的复杂性

数字史学面临的批评不容回避。最根本的质疑来自：**量化是否从根本上损害了历史研究的性质？**

历史事件是有语境的单一事件（idiographic），而量化分析假设跨案例的可比性。把公元前 500 年的雅典民主与公元 1300 年的英国议会制度放入同一个"民主化程度"变量中，真的有意义吗？不同文化对"同一"制度的理解可能截然不同，编码者的判断不可避免地引入了解读偏差。

Seshat 的批评者指出，该项目的编码系统依赖专家判断，而专家的背景（主要是西方学术体系训练的历史学家和人类学家）会系统性地影响哪些特征被认为"重要"、如何理解"复杂性"。这不是数字问题，而是认识论问题——量化的精确外表下，掩盖了分类框架本身的偏见。

这与"全球史与去殖民史学"中关于欧洲中心主义的讨论直接相连。

另一个批评针对的是"大数据史学"的发表激励结构：令人眼花缭乱的数据可视化，容易在媒体和学界产生影响，即便背后的历史推论存在严重简化。"量化"的权威感容易让读者忽略数据背后无数的假设与判断。

## 2020 年代的新前沿：LLM 进入史学

大语言模型的能力为历史研究提供了两个新可能，也带来了新的方法论挑战。

第一是**从海量档案中提取结构化信息**的速度革命。此前需要数十名研究助理耗费数年的档案编目工作，AI 辅助系统可能在数周内完成初步处理，大幅降低了大型量化历史研究的门槛。

第二是**文本解读的辅助**：LLM 可以协助处理难以辨认的手稿（结合 HTR，Handwritten Text Recognition），或提供语义上下文辅助。梵蒂冈档案馆、英国国家档案馆等机构已开始探索 AI 辅助档案工作。

**HTR 的实际精度**。2024 年 11 月的一篇 arXiv 预印本（arXiv:2411.03340）系统评测了多模态 LLM（含 OpenAI、Anthropic、Google 的模型）在历史手写文档转录中的表现：字符错误率（CER）低至 1.8%，词错误率（WER）约 3.5%，比专有 HTR 程序快约 50 倍，成本约为后者的 1/50[^llm_htr]。Transkribus 等专业平台的"Titan"模型则在特定文字类型上表现更优。这些数字预示着大型档案数字化项目的可行性正在从"昂贵实验"变为"实际选项"。

但 LLM 同时带来了一个尖锐的新风险：**历史幻觉（historical hallucination）**。LLM 在历史细节上具有不可预测的错误率，且错误往往呈现出自信的语气和貌似合理的叙述形式。把 LLM 生成的历史内容不加核实地引入学术写作，可能系统性地污染历史记录。这一风险在 2020 年代已经成为历史学家群体中讨论最热烈的新议题之一。

## 主要工具与数据集的生态图

| 工具/数据库                       | 主导机构           | 核心功能                   | 适用领域           |
| --------------------------------- | ------------------ | -------------------------- | ------------------ |
| Google Books Ngram Viewer         | 哈佛-Google        | 词频时序分析               | 文化演化、集体记忆 |
| Seshat Global Databank            | Turchin Lab / HHRI | 政体社会复杂度量化         | 比较文明研究       |
| Mapping the Republic of Letters   | 斯坦福-牛津-哈佛   | 学者书信网络               | 启蒙思想传播       |
| Transkribus                       | Read-COOP          | 手写文字识别（HTR）        | 历史档案数字化     |
| Old Bailey Online                 | 伦敦大学           | 1674–1913 年审判记录       | 法律史、社会史     |
| EEBO (Early English Books Online) | ProQuest           | 1473–1700 年英文印刷品全文 | 文学史、宗教史     |

这张不完整的清单揭示了数字史学的一个结构性特征：工具生态高度分散，缺乏类似自然科学领域的统一数据标准。不同项目的元数据格式、引用规范、可信度标注方法各不相同，跨项目的整合研究面临巨大的技术摩擦。这是数字史学基础设施建设的核心挑战之一。

## 未知的边界

- **非文字文化的数字史学**：大量人类历史在文字出现之前，或在不使用书写的文化中展开。对这些群体，语料库分析完全无效。如何将口述历史、物质文化、基因组数据整合进量化框架，是尚未解决的方法论挑战。
- **网络分析的时间维度**：现有的历史网络分析大多是"静态快照"，难以捕捉关系随时间的动态演变。时序网络分析方法仍在发展中。
- **可重复性危机**：心理学和经济学的"可重复性危机"（replication crisis）是否会蔓延到数字史学？当一项研究的结论依赖大量编码决策时，不同团队重新分析同一原始数据，有时会得出不同结论。Seshat 的"道德化宗教"假说之争（2022 年）已经提供了一个具体案例。
- **数字鸿沟与语言偏见**：当前数字史学工具主要针对英文、法文、德文、拉丁文语料库。阿拉伯文、波斯文、汉文、梵文等语料库的数字化程度和 NLP 工具支持仍然滞后，这在方法层面重现了传统史学的欧洲中心偏见。

## 跨域连接

- **[[数学]]**：图论（network analysis）、随机过程（text modeling）、贝叶斯推断（不确定性估计）是数字史学最常用的数学工具。
- **[[哲学]]**：唯名论（每个历史事件都是独一无二的）与普遍主义（历史存在可识别的模式）之间的哲学争论，在数字史学中以方法论争论的形式再次呈现。
- **[[经济学]]**：计量经济学（econometrics）的"潜在结果"因果推断框架（potential outcomes framework），已被部分历史学家引入，用于处理"反事实历史"的定量分析问题。

---

## 延伸阅读

- Michel, J.-B. et al. "Quantitative Analysis of Culture Using Millions of Digitized Books." _Science_ 331, 176–182 (2011). DOI:10.1126/science.1199644
- Turchin, P. et al. "Equinox2020 Seshat Data Release." _Cliodynamics_ 11(1), 41–50 (2020).
- Turchin, Peter. _Ages of Discord: A Structural-Demographic Analysis of American History_. Beresta Books, 2016.
- Turchin, Peter. _End Times: Elites, Counter-Elites, and the Path of Political Disintegration_. Penguin Press, 2023.
- Schich, M. et al. "A network framework of cultural history." _Science_ 345, 558–562 (2014). DOI:10.1126/science.1240064
- Graham, S., Milligan, I. & Weingart, S. _Exploring Big Historical Data: The Historian's Macroscope_. Imperial College Press, 2015.（数字史学方法论入门）
- Hitchcock, T. & Turkel, W. J. "The Old Bailey Proceedings, 1674–1913: Text Mining for Evidence of Court Bias." _Literary and Linguistic Computing_ 31(1), 1–22 (2016).
- "Unlocking the Archives: Using Large Language Models to Transcribe Handwritten Historical Documents." arXiv:2411.03340 (2024).（LLM 转录历史手写文档：CER 1.8%，速度为专有 HTR 的 50 倍，成本为 1/50）
- Benam, M. et al. Seshat Data 1.0. Zenodo (2022). DOI: 10.5281/zenodo.7270260.（Seshat 数据集首次正式归档发布）

[^seshat_data]: Benam, M. et al. Seshat Data 1.0, Zenodo (2022)：包含 400 余个政体、公元前 4000 年至 1900 年的系统数据，每条数据有文献来源与可信度评级。

[^endtimes]: Turchin, P. _End Times: Elites, Counter-Elites, and the Path of Political Disintegration._ Penguin Press, 2023. Angus Deaton 评价引自出版商宣传材料；批评性评论见 _The Economist_、_New Statesman_ 等媒体（2023 年下半年）。

[^llm_htr]: arXiv:2411.03340 (2024)："Unlocking the Archives"；评测 OpenAI、Anthropic、Google 多模态 LLM 在历史手写文档上的 CER 约 1.8%，WER 约 3.5%，速度约为 Transkribus 的 50 倍，成本约为其 1/50。
