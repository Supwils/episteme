---
title: 计算社会科学的可审计测量
title_en: Auditable Measurement in Computational Social Science
status: published
updated: 2026-07-04
category: 方法前沿
horizon: 2020s
order: 3
tags:
  - 计算社会科学
  - 数字痕迹
  - 可审计测量
  - 数据治理
  - LLM
researchers:
  - David Lazer（Northeastern University）
  - Matthew Salganik（Princeton University）
  - Duncan Watts（University of Pennsylvania）
institutions:
  - Northeastern Network Science Institute
  - Princeton Center for Information Technology Policy
  - Science
related:
  - computational-social-science
  - content-analysis
  - social-network-analysis
---

# 计算社会科学的可审计测量

2009 年，Lazer 等人在 _Science_ 提出“计算社会科学”，强调数字痕迹和大规模行为数据让社会科学获得新的观察能力。

2020 年，同一研究传统在 _Science_ 发表“Obstacles and opportunities”，语气明显更谨慎。

前沿问题从“我们能测量更多社会行为”转为“我们测量了什么，谁能审计这种测量，测量本身会造成什么伤害”。

2020 年代的计算社会科学，正在从大数据兴奋期进入可审计、可复核、可治理的阶段。

## 破除误解

计算社会科学不是数据越大越好。

大数据可能只是一个平台、一个接口、一类用户和一个时期的局部切片。

它也不是机器学习替代社会理论。

模型可以分类、预测和聚类，但研究者仍要定义概念、解释机制、处理偏差、说明推论边界。

第三个误解，是认为数字痕迹自然真实。

平台记录的是被系统允许和保存的行为。

点赞、停留、转发、搜索、定位和评论，都被界面设计、推荐算法、社交压力、审核规则和商业目标塑造。

## 核心问题

计算社会科学最核心的开放问题，是概念效度。

一个变量在技术上可计算，不代表它在社会学上有效。

用点赞衡量支持，用转发衡量说服，用停留时间衡量兴趣，用好友数衡量社会资本，用情绪词衡量公共情绪，都需要证明。

第二个问题是可审计性。

当研究依赖平台数据、商业接口或大型模型时，外部研究者能否复现？

如果平台改变接口、删除账号、调整推荐模型，研究结果是否仍能验证？

第三个问题是测量伤害。

大规模分类可能把群体标记为风险、极端、低信用、低生产率或低价值。

即使研究者不公开个体身份，也可能对群体造成污名。

## 谁在做、做到哪一步

Lazer、Pentland、Watts、Salganik、Grimmer、Stewart 等研究者推动了计算社会科学从网络扩散、文本即数据、在线实验到数据治理的转向。

Salganik 的 _Bit by Bit_ 把数字时代社会研究总结为观察行为、提出问题、做实验、创造协作和伦理治理。

Grimmer 与 Stewart 的 “Text as Data” 推动政治学和社会学文本分析走向系统化。

2020 年之后，研究焦点进一步转向平台数据访问、机器学习偏差、模型审计、隐私保护和大语言模型辅助研究。

当前方法前沿包括：

| 前沿             | 解决什么                       | 风险                         |
| ---------------- | ------------------------------ | ---------------------------- |
| 大规模文本分类   | 识别框架、情绪、议题和仇恨言论 | 讽刺、方言和少数群体语言误判 |
| 网络扩散模型     | 研究信息、疾病和动员路径       | 可见边不等于真实关系         |
| 在线实验         | 测试平台设计和信息处理效应     | 知情同意与平台权力           |
| 隐私保护数据分析 | 降低再识别风险                 | 可能牺牲可解释性和复核性     |
| LLM 辅助编码     | 提高文本处理速度               | 幻觉、偏见、不可复现提示     |

## 代价与争议

最大争议是平台依赖。

许多最重要的数据由平台掌握。

研究者若没有数据，只能观察公开表面。

若获得数据，又可能受到平台合同、保密条款和选择性开放限制。

公共知识因此被商业基础设施控制。

第二个争议是模型解释。

机器学习可以预测传播，但社会学需要解释为什么传播。

如果模型只告诉我们“这个内容会爆”，却不能解释是身份、情绪、网络位置、平台推荐还是政治组织造成的，它对理论贡献有限。

第三个争议是 AI 工具进入研究流程。

LLM 可以帮助编码、摘要、翻译和生成变量，但它也可能把训练数据中的偏见带入研究。

研究者需要记录提示、抽样验证、误差模式和人工复核过程。

## 未知的边界

- 平台数据访问制度能否支持独立、长期、跨国比较研究，尚未稳定。
- LLM 作为文本编码者的可靠性，在不同语言、隐喻、讽刺和低资源语境中仍需评估。
- 隐私保护与可复核之间的平衡没有通用答案。
- 计算社会科学能否真正吸收民族志、访谈和历史方法，而不是只扩大可计算变量，仍是学科边界问题。
- 大规模测量的社会后果如何治理，仍缺少成熟伦理框架。

## 跨域连接

- **计算机科学**：图算法、NLP、机器学习和隐私计算提供工具，也制造新的偏差。
- **统计模型**：不确定性、抽样和测量误差仍是计算社会科学的核心。
- **内容分析**：人工编码和计算分类需要互相校正。
- **平台治理**：平台数据访问和算法审计决定计算社会科学能否研究真正重要的问题。

## 延伸阅读

- Lazer, David et al. “Computational Social Science.” _Science_, 2009. DOI: 10.1126/science.1167742.
- Lazer, David et al. “Computational Social Science: Obstacles and Opportunities.” _Science_, 2020. DOI: 10.1126/science.aaz8170.
- Salganik, Matthew J. _Bit by Bit: Social Research in the Digital Age_. Princeton University Press, 2018.
- Grimmer, Justin and Stewart, Brandon M. “Text as Data.” _Political Analysis_, 2013.
- Edelmann, Achim et al. “Computational Social Science and Sociology.” _Annual Review of Sociology_, 2020.
