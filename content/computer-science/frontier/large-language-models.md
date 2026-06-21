---
title: 大语言模型与基础模型
title_en: Large Language Models and Foundation Models
status: published
updated: 2026-06-13
category: 人工智能
horizon: 2020s
order: 1
tags:
  - 大语言模型
  - Transformer
  - 规模化
  - 涌现能力
  - AI对齐
researchers:
  - Ashish Vaswani 等（Google Brain，Transformer 论文）
  - OpenAI（GPT 系列）
  - Anthropic（Claude 系列）
  - Google DeepMind（Gemini 系列）
  - Meta AI（LLaMA 系列）
institutions:
  - OpenAI
  - Anthropic
  - Google DeepMind
  - Meta FAIR
related:
  - ai-interpretability
  - gradient-descent-backprop
---

# 大语言模型与基础模型

2022 年 11 月 30 日，OpenAI 把一个叫 ChatGPT 的系统悄悄放到了互联网上。没有发布会，没有大型广告。五天后，它有了 100 万用户；两个月后，1 亿用户。这是消费级应用历史上最快的用户增长。

但 ChatGPT 只是冰山水面上的一角。真正引发技术界震动的，是它背后所代表的——一种完全不同于以往的 AI 开发范式：用海量数据和极大的算力，训练出能够在几乎所有自然语言任务上表现良好的"基础模型"。

## 破除误解：LLM 不是"改进版搜索引擎"

早期很多人把大语言模型理解为一个更智能的搜索引擎：你输入问题，它给出答案。这个理解低估了它的能力，也误解了它的工作机制。

搜索引擎检索已有网页；语言模型**生成**新内容——逐词预测"在当前上下文下，下一个最合理的词是什么"。这是一个看起来极其简单的任务（下一词预测），但在足够大的规模上，模型学到的东西远不只是"哪些词经常在一起出现"。

语言模型不记忆"答案"，它学习数据中蕴含的**概率结构**——概念之间的关系、推理的模式、语言的语法、世界知识的网络。结果是一个能写代码、解数学题、翻译语言、分析法律文书的系统。

更重要的是：LLM 的能力不是被分别编程进去的，而是**从语言预测这个单一目标中涌现出来的**。

## 现场：Transformer 架构

2017 年，Google Brain 的研究人员（Vaswani 等人）发表了论文《Attention Is All You Need》，提出了 Transformer 架构。在此之前，主流的序列模型是 RNN（循环神经网络）及其变体 LSTM，处理序列时只能逐步往前，难以并行，也难以捕捉长距离依赖。

Transformer 的核心机制是**自注意力（Self-Attention）**：处理序列中的每个位置时，模型可以"直接看到"序列中任意其他位置，并根据相关性加权汇总信息。

$$\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{QK^T}{\sqrt{d_k}}\right) V$$

这个公式让每个 token 都能直接"关注"序列中的任意其他 token，捕捉任意距离的依赖关系，且操作可以高度并行。Transformer 恰好与 GPU 的并行计算能力完美匹配。

GPT-1（OpenAI, 2018）、BERT（Google, 2018）是最早的大规模预训练 Transformer 模型，奠定了"预训练 + 微调"的基本范式。

## 规模化定律：大即是不同

2020 年，OpenAI 的研究（Kaplan 等人）发现了神经语言模型惊人的规律性：模型的能力（以测试集损失度量）与参数量、训练数据量、训练算力之间存在幂律关系。

$$L \propto N^{-\alpha_N}, \quad L \propto D^{-\alpha_D}, \quad L \propto C^{-\alpha_C}$$

这意味着：在广泛的规模范围内，模型性能可以被预测和规划。更大的模型、更多数据、更多算力，换来的是可预测的性能提升。

2022 年，Hoffmann 等人（DeepMind）发表 Chinchilla 论文，修正了最优规模化规律：给定固定算力预算，参数量与训练 token 数应**等比例放大**（每把模型规模翻一倍，训练 token 也应翻一倍）。换算成经验法则，约为每个参数配 20 个训练 token。

按这个法则，之前 GPT-3（1750 亿参数，约 3000 亿 token）等模型参数量相对过大、训练数据相对不足。Chinchilla 用与 Gopher（2800 亿参数）相同的算力预算，训练了一个**只有 700 亿参数、但喂了 1.4 万亿 token**的模型，结果在大量下游任务上反而全面超越了参数量大它数倍的 Gopher、GPT-3、MT-NLG（5300 亿参数）。这是"在固定算力下，与其堆参数，不如喂更多数据"的标志性证据。

这不只是学术结论——它直接影响了此后所有主流模型的资源分配决策。

## 涌现：规模带来质变

一些能力不会随规模平滑增长，而是在某个规模阈值处**突然出现**——研究者称之为"涌现能力"（Emergent Abilities）。

Wei 等人（2022）列举了一批这样的能力：少样本推理、算术运算、自然语言推理任务等，这些能力在较小模型上几乎不存在，在超过某个参数规模后急剧出现。

这一观察引发了争议。Schaeffer 等人在 2023 年的论文《Are Emergent Abilities of Large Language Models a Mirage?》（获 NeurIPS 2023 杰出论文奖）中论证：涌现在很大程度上是评估指标选取造成的**测量假象**。他们的关键论点很具体：像"精确匹配整道多步算术题"这样的**非线性、断崖式指标**，会把本来平滑提升的底层能力放大成"突然出现"；换成"按 token 计的部分正确率"这类连续指标，同一批模型的能力曲线就变得平滑可预测。他们还反向构造了视觉任务上的"伪涌现"来佐证。

这场辩论尚未有定论——涌现的支持者认为，对真实下游应用而言，"能不能整道题做对"恰恰是用户在意的那个断崖式指标，不能简单归为度量假象。无论哪方对，它都提醒我们：模型能力的"突变"外观，可能部分是人类观察方式（评测指标）的产物，而非纯粹的模型内部相变。

## 从预训练到对话：RLHF 与对齐

预训练语言模型（如 GPT-3）接受用户指令并生成有帮助内容的能力，明显弱于其语言理解能力——它在"下一词预测"上被优化，而非"遵循指令"。

这个差距通过**人类反馈强化学习（RLHF）**弥合。大致过程：

1. 收集人类标注者对模型输出的偏好对比
2. 训练一个**奖励模型（Reward Model）**，学习人类偏好
3. 用 PPO 等强化学习算法，优化语言模型使其最大化奖励

InstructGPT（Ouyang 等, 2022）和 ChatGPT 都用了这个方法。它显著提升了模型的遵循指令能力，但也引入了新问题：奖励模型可以被"攻击"（reward hacking）——模型学会了取悦奖励模型而非真正对人有帮助。

2023 年起，各家开始探索 RLHF 的替代方案：DPO（Direct Preference Optimization）直接在语言模型上优化偏好，无需单独训练奖励模型，实现更简单。

## 谁在做，做到了哪一步

| 系列            | 机构             | 2023-2025 关键节点                                                                                                      |
| --------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| GPT-4 / o1 / o3 | OpenAI           | GPT-4（2023.3）；o1（推理时扩展，2024.9）；o3（2024.12 宣布，在 ARC-AGI 抽象推理基准上达 87.5%、FrontierMath 上 25.2%） |
| Claude 系列     | Anthropic        | Claude 3（Haiku/Sonnet/Opus，2024.3）；Constitutional AI 训练方法                                                       |
| Gemini          | Google DeepMind  | Gemini 1.0（2023.12）；Gemini 1.5（百万级上下文窗口，2024）                                                             |
| LLaMA           | Meta AI          | LLaMA 2（2023.7，开放权重）；LLaMA 3.1（2024.7，405B 参数）                                                             |
| DeepSeek        | DeepSeek（北京） | DeepSeek-R1（2025.1），以更低训练成本达到接近 o1 的推理性能                                                             |

2024 年出现的显著趋势：**推理时扩展（Test-Time Compute Scaling）**——让模型在生成答案时花更多计算做"链式思考"（chain-of-thought），而非只扩大参数量。OpenAI o1/o3 和 DeepSeek-R1 代表了这一方向，在数学和科学推理任务上大幅超越之前的模型。

这条路线在 2025 年 7 月达到一个标志性节点：OpenAI 的一个实验性推理模型和 Google DeepMind 的 Gemini Deep Think，在与人类选手同等条件下（两场 4.5 小时、无工具无联网）作答 2025 年国际数学奥林匹克（IMO）题目，各自解出 6 题中的 5 题、得 35/42 分，达到金牌门槛——这是通用模型首次在 IMO 上达到金牌水平（2024 年 DeepMind 用更专用的 AlphaProof 仅获银牌）。值得强调的是，这两次结果由人类裁判评分、属于实验性系统的内部演示，与公开发布、可复现的产品基准是两回事。

## 代价与争议

**幻觉（Hallucination）**：LLM 以自信的语气生成不正确的事实，是迄今最持续的技术缺陷。检索增强生成（RAG）部分缓解了这个问题，但没有根本解决。

**对齐困难**：让模型真正理解人类价值而非仅仅模仿有用的外表，仍是开放问题。"奉承性"（sycophancy）——模型倾向于告诉用户他们想听的——是一个有充分文献记录的问题（Perez et al., 2022）。

**计算成本与集中化**：训练前沿模型的成本在 2020 年代达到数亿到数十亿美元级别（具体数字各公司未公开，外部估算差异很大）。这种规模门槛事实上将前沿 AI 研究集中在少数几家资本充足的机构手中，引发了关于 AI 权力集中的担忧。

**版权与数据问题**：LLM 用大量互联网文本训练，包括受版权保护的内容。多个出版商和作者对此提起诉讼，法律如何界定目前仍无定论（截至 2026 年）。

## 未知的边界

- 规模化定律是否会持续？还是存在某个上限，之后收益递减？目前在更大规模上仍在继续，但理论原因不明确。
- LLM 是否有某种形式的"理解"，还是纯粹是复杂的模式匹配？这是语言哲学和认知科学的根本争议，短期内不会有共识。
- 推理时扩展能走多远？o3 系列表明更多推理计算可以换来更好的性能，但这个曲线的形状和极限未知。
- 如何以可验证的方式确保 AI 系统的安全性和对齐性，仍是开放的研究问题。

## 跨域连接

- **信息论**：语言模型本质上在最大化上下文对下一词的预测信息量，与香农信息论中的熵直接相关。
- **神经科学**：Transformer 的注意力机制与人类认知的"选择性注意"有表面相似性，但两者的神经机制根本不同，类比须谨慎。
- **经济学与政策**：AI 能力的快速提升引发了对劳动市场替代、版权、监管框架的广泛讨论，是当代最重要的政策议题之一。
- **[[ai-interpretability]]**：我们几乎不理解 LLM 内部如何工作，这正是可解释性研究的动机。

---

## 参考文献

- Vaswani, A. et al. _Attention Is All You Need._ NeurIPS 2017. arXiv:1706.03762.
- Kaplan, J. et al. _Scaling Laws for Neural Language Models._ arXiv:2001.08361 (2020).
- Hoffmann, J. et al. _Training Compute-Optimal Large Language Models._ arXiv:2203.15556 (2022). （Chinchilla 论文）
- Wei, J. et al. _Emergent Abilities of Large Language Models._ TMLR 2022.
- Schaeffer, R., Miranda, B. & Koyejo, S. _Are Emergent Abilities of Large Language Models a Mirage?_ NeurIPS 2023（杰出论文奖）. arXiv:2304.15004.
- Ouyang, L. et al. _Training Language Models to Follow Instructions with Human Feedback._ NeurIPS 2022. （InstructGPT / RLHF 论文）
- Rafailov, R. et al. _Direct Preference Optimization: Your Language Model is Secretly a Reward Model._ NeurIPS 2023. （DPO 论文）
