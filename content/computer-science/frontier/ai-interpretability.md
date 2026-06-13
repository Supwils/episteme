---
title: 机制可解释性：理解神经网络内部
title_en: Mechanistic Interpretability — Understanding What Happens Inside Neural Networks
status: published
updated: 2026-06-13
category: 人工智能
horizon: 2020s
order: 2
tags:
  - 可解释性
  - 机制可解释性
  - 稀疏自编码器
  - AI安全
  - 特征
researchers:
  - Chris Olah（Anthropic）
  - Neel Nanda（Google DeepMind）
  - Anthropic 可解释性团队
  - EleutherAI 研究人员
institutions:
  - Anthropic
  - Google DeepMind
  - MIT CSAIL
related:
  - large-language-models
---

# 机制可解释性：理解神经网络内部

2023 年，Anthropic 的研究人员把一个小型神经网络的某个神经元激活最大化，看它学到了什么。这个神经元对"John Cena"（美国摔跤手兼演员）这个概念有强烈反应——同时，它也对"不可见"（invisible）这个概念有强烈反应。两个看似毫无关联的概念，编码在同一个神经元里，而 John Cena 恰好以一句"You can't see me"（你看不见我）的口号著称于互联网。

这是一个小例子，但它揭示了一个大问题：神经网络学到的表示，对人类来说是不透明的——不是因为无法观察，而是因为难以理解。**机制可解释性（Mechanistic Interpretability）**这个领域，正在尝试系统地改变这一点。

## 破除误解：这不是简单的"解释 AI 决策"

"可解释 AI"（Explainable AI, XAI）是一个宽泛的领域，包括了许多技术——有的只是事后近似（如 LIME、SHAP，用简单模型局部拟合复杂模型的行为），有的研究注意力权重，有的生成"反事实解释"（改变哪个输入特征，结论会翻转）。

机制可解释性（Mechanistic Interpretability，简称"mech-interp"）有更高的目标：**彻底理解神经网络的内部计算机制**，不是近似，不是事后解释，而是像理解一段代码一样理解神经网络的每一个权重在做什么。

这个目标更难，也被认为对 AI 安全更重要——如果我们不能从根本上理解模型在做什么，就很难保证它做的是我们真正想要的。

## 现场：多义性与叠加

机制可解释性面临的核心障碍，是 Chris Olah 及其团队（在 OpenAI 和后来的 Anthropic）发现和命名的两个现象。

**多义性（Polysemanticity）**：单个神经元对应多个看似无关的概念。一个神经元可能同时对"学术 API"和"法语文本"有反应；另一个同时响应"鼠标光标"、"老鼠（动物）"和"迪士尼角色"。这让按神经元逐一分析变得困难——每个神经元都是多重概念的混合体。

**叠加（Superposition）**：神经网络需要表示的特征数量，远多于它拥有的神经元数量。Anthropic 2022 年的论文《Toy Models of Superposition》（Elhage 等）通过可控的小型实验证明：模型以一种"叠加"的方式把多个稀疏激活的特征压缩进少量神经元——利用了高维空间中随机向量"近乎正交"的几何性质（Johnson-Lindenstrauss 引理的启发）。

叠加解释了多义性：一个神经元同时响应多个概念，是因为这些概念的"特征向量"被叠加存储在同一批神经元里。

## 稀疏自编码器：分解叠加

叠加问题的解决思路：如果模型的激活向量是多个稀疏特征的线性叠加，那么可以用**字典学习（Dictionary Learning）**将其分解——找一组比神经元数量更多的"特征方向"，使得激活向量能被其中少数几个稀疏表示。

工具：**稀疏自编码器（Sparse Autoencoder, SAE）**——一个有中间瓶颈的两层网络，被训练成以稀疏方式重建激活：

```
激活向量 → [编码器] → 稀疏特征激活 → [解码器] → 重建激活
                          L1 稀疏化惩罚
```

2023 年 10 月，Anthropic 发表《Towards Monosemanticity》（Bricken 等），在一个小型 Transformer 上用 SAE 提取出数万个看起来单义性更好的特征。许多特征有可解读的语义：与"DNA / 遗传"相关的特征、与"法律文本"相关的特征，等等。

关键进展在 2024 年 5 月：Anthropic 的《Scaling Monosemanticity》（Templeton 等）把这一技术规模化应用到实际产品模型 Claude 3 Sonnet 上，提取出超过 1600 万个特征。研究者能够识别"金门大桥特征"（激活后模型在文字生成中更频繁提及旧金山）、"欺骗特征"（在角色扮演上下文中激活），以及一些对 AI 安全有意义的特征（如"助手"特征、与身份认同相关的概念）。

发表在官方网站 transformer-circuits.pub 的这些研究，是当前机制可解释性领域的核心文献。

## 电路：因果机制的追踪

特征只是第一步。更雄心勃勃的目标是追踪**电路（Circuit）**：理解模型如何通过一系列特征激活和信息传递，完成一个特定任务。

Anthropic 的早期工作（Elhage 等, 2021，《A Mathematical Framework for Transformer Circuits》）开发了分析 Transformer 注意力头的框架，识别出了执行简单任务的电路，如"归纳头"（induction head）——一种能识别并复制序列中重复模式的注意力机制，被认为是上下文学习（in-context learning）的基础。

2025 年，Anthropic 发表了"属性图"（Attribution Graphs）方法，对 Claude 3.5 Haiku 的具体推理步骤进行了电路级别的追踪。这是机制可解释性首次系统地应用于生产级模型的推理分析（根据 Anthropic 2025 年的研究页面）。

## 谁在做，做到了哪一步

| 机构/团队                          | 路线                                                       | 近期工作                                      |
| ---------------------------------- | ---------------------------------------------------------- | --------------------------------------------- |
| Anthropic 可解释性团队             | SAE + 电路分析，专注 Claude 系列                           | Scaling Monosemanticity (2024)；属性图 (2025) |
| Google DeepMind（Neel Nanda 团队） | TransformerLens 工具库；"Grokking"研究（模型如何学会泛化） | 系统化推进 SAE 基础设施；跨模型特征比较       |
| EleutherAI                         | 开放模型上的可解释性研究                                   | 开发可重复的 SAE 基准                         |
| MIT CSAIL                          | 知识编辑（ROME、MEMIT）：修改模型中存储的事实              | 模型内事实定位和编辑                          |

工具生态：Neel Nanda 开发的 TransformerLens 库成为许多研究者的标准工具；EleutherAI 维护的 SAE 相关基础设施（如 SAEBench）正在形成可重复比较的基础。

## 代价与争议

**规模鸿沟**：大多数机制可解释性的深度理解，是在小型模型（1-7B 参数级别）上完成的。前沿模型（数千亿参数级别）的内部机制是否同构，是否适用同样的分析框架，尚不明确。

**"稀疏自编码器提取的特征是否真的是模型的计算单位？"**：批评者指出，SAE 提取的特征是优化SAE目标得到的产物，不一定对应模型内部实际的计算基元。判断特征的"真实性"（faithfulness）仍是方法论上的开放问题。

**可扩展性**：即使方法论被接受，把机制可解释性方法扩展到整个前沿模型，所需的计算量和人力是巨大的。全面理解一个 1000 亿参数模型的内部机制，即便方法完全正确，也可能需要数年乃至数十年的研究。

**能否真正"理解"？**：识别出"金门大桥特征"和真正理解模型如何推理，是不同层次的事情。从特征识别到完整的机制理解，中间还有巨大的鸿沟。

## 未知的边界

- 机制可解释性技术能否在根本上 scale 到前沿规模（万亿参数级别）？
- 是否存在对所有模型都适用的通用"内部语言"，还是每个模型都发展了不同的内部表示方式？
- 从理解内部机制到改善 AI 安全的路径有多直接？目前 Anthropic 等机构认为这条路径存在，但实证证据仍然稀少。
- 监督微调（SFT）和 RLHF 如何从机制层面改变了预训练模型的内部表示？
- 特征的"因果角色"和"关联"之间如何区分？SAE 提取的特征是模型内部的真实计算基元，还是只是相关的激活模式？这是方法论核心问题，目前没有共识。
- 如果多义性和叠加是模型压缩信息的最优方式，那试图"解叠加"是否会损害模型能力？如何在可解释性和性能之间权衡？

## 跨域连接

- **神经科学**：机制可解释性与神经科学中的"解码"（decoding）和"电路分析"有方法论相似性，但尺度和可控性不同——人工神经网络所有权重可读，生物神经元则不然。
- **[[large-language-models]]**：机制可解释性的研究对象主要是 Transformer LLM；理解 LLM 的前提是理解其内部机制。
- **数学/线性代数**：叠加和特征提取涉及高维空间的几何性质（流形假设、近似正交性）、稀疏优化（L1 正则化）。
- **哲学**：什么叫做"理解"一个计算系统？这不只是技术问题，还涉及哲学意义上的认识论问题。
- **AI 安全**：机制可解释性被 Anthropic、DeepMind 等机构视为 AI 安全研究的核心路线之一。若我们能在系统部署前检查其内部表示是否存在危险的目标或欺骗性特征，这将为对齐提供一种比纯行为测试更深入的保证。能否在足够大的模型上实现这个目标，是当前的根本问题。
- **认知科学**：人类解释自身决策的方式，与机制可解释性研究揭示的神经网络"解释"颇为不同。认知科学对"理解"和"理由"的哲学分析，为评估 AI 可解释性研究的意义提供了参照。

---

## 延伸阅读

- Elhage, N. et al. _Toy Models of Superposition._ Anthropic, 2022. transformer-circuits.pub/2022/toy_model.
- Bricken, T. et al. _Towards Monosemanticity: Decomposing Language Models With Dictionary Learning._ Anthropic, 2023. transformer-circuits.pub/2023/monosemantic-features.
- Templeton, A. et al. _Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet._ Anthropic, 2024. transformer-circuits.pub/2024/scaling-monosemanticity.
- Elhage, N. et al. _A Mathematical Framework for Transformer Circuits._ Anthropic, 2021. transformer-circuits.pub/2021/framework.
- Nanda, N. et al. _Progress Measures for Grokking via Mechanistic Interpretability._ arXiv:2301.05217 (2023).
