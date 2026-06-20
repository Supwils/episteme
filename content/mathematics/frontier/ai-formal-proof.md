---
title: 定理形式化与 AI 证明助手
title_en: Formal Theorem Proving and AI Proof Assistants
status: published
updated: 2026-06-12
category: 数学与计算
horizon: 2020s
order: 1
tags:
  - 形式化数学
  - Lean
  - AlphaProof
  - 自动定理证明
  - 人工智能
researchers:
  - Terence Tao（加州大学洛杉矶分校）
  - Timothy Gowers（剑桥大学）
  - DeepMind AlphaProof 团队
  - Kevin Buzzard（帝国理工学院）
institutions:
  - 加州大学洛杉矶分校
  - 剑桥大学
  - Google DeepMind
  - Lean 社区（Mathlib）
related:
  - ml-guided-mathematics
---

# 定理形式化与 AI 证明助手

2023 年 11 月 9 日深夜，Timothy Gowers、Ben Green、Freddie Manners、Terence Tao 四人在 arXiv 上挂出了一篇 33 页的论文，题为"On a conjecture of Marton"，证明了组合数论里悬而未决几十年的"多项式 Freiman–Ruzsa 猜想"。

论文发出后不到一周，Tao 就在博客上宣布：他们正在用 Lean 4 对整个证明进行形式化验证。三周之内，包括 Tao 本人在内的 25 位数学家和程序员协同完成了这件事。这不仅是一次数学突破，也是整个数学界第一次亲眼看到：**一项刚诞生的重要证明几乎在同步被计算机全面核实。**

## 破除误解：形式化不等于"让 AI 猜答案"

很多人把"AI 辅助数学"想象成一台机器输入问题然后输出证明。现实更加微妙，涉及两条完全不同的技术路线，常被混淆：

**路线 A——形式化证明助手（Proof Assistants）**：人类数学家先构思证明的整体逻辑，然后把它翻译成 Lean、Coq、Isabelle 等形式化语言；计算机在每一步进行严格的类型论核验，保证无懈可击。这是一个"人提思路、机器审计"的过程，机器不会"猜"任何东西——它只是一个极端严格的校对员。

**路线 B——AI 自动定理证明（Automated Theorem Proving, ATP）**：机器（通常是大语言模型或强化学习系统）在 Lean 等形式化框架内自主搜索证明路径，尝试从公理出发一步步推出目标命题。这是"让 AI 猜答案"——但必须在形式化系统内猜，猜错了系统会拒绝，猜对了就是严格的证明。

2020 年代的真正革命是：这两条路线开始**融合**，并产生了远超各自独立能力的结果。

## 现场：为什么数学家越来越在乎"计算机核验"

传统数学依赖同行评审：你写一篇论文，几位专家花数月或数年审阅，发现错误就打回来。这套体系运转了几个世纪，但问题在不断积累。

2023 年，法国数学家 Peter Scholze 发起了"Liquid Tensor Experiment"，邀请 Lean 社区形式化他与 Dustin Clausen 关于液态张量积的一个关键引理——那是他自己在若干月内也无法对正确性完全确信的结果。2022 年 7 月，形式化项目宣布完成：引理是对的。Scholze 后来说，这是他迄今感受最深的一次数学体验。

这种"机器审计"并非全新——早在 2005 年，Georges Gonthier 与 Benjamin Werner 就在 **Coq** 证明助手中完整形式化了"四色定理"（原计算机辅助证明来自 1976 年，一直有人怀疑其上千种情形的机器枚举可能有漏洞），把信任压缩到只需相信 Coq 内核。素数定理也先后在 Isabelle/HOL、HOL Light 等系统中被形式化，并在 2024 年前后由 Tao、Kontorovich 等人推进了 Lean 4 中的版本。随着 Mathlib 库中的已形式化定理数量在 2024 年前后突破 20 万条，Lean 4 事实上成为了数学知识的另一种编码格式。

这背后有一个深层驱动力：**现代数学的证明越来越长**。2004 年"有限单群分类定理"的完整证明约 10,000 页；2013 年"Kepler 猜想"（球填充）的计算机辅助证明花了 Thomas Hales 近 20 年才被完全核实。人类审稿人有时根本没有能力检查现代证明的每一个细节——形式化验证是应对这一危机的根本手段。

## 谁在做、做到了哪一步

### Lean 4 与 Mathlib：基础设施的革命

Lean 4 是由微软研究院的 Leonardo de Moura 等人在 2021 年正式发布的定理证明器，它的前身 Lean 3 已积累了庞大的 Mathlib 库。Mathlib 是一个由社区维护的数学库，涵盖从基础代数到分析学、代数几何、表示论的大量定理。

| 里程碑                         | 时间              | 主导方                        |
| ------------------------------ | ----------------- | ----------------------------- |
| Lean 4 正式发布                | 2021              | Microsoft Research / de Moura |
| Liquid Tensor Experiment 完成  | 2022 年 7 月      | Scholze + Lean 社区           |
| PFR 猜想证明形式化完成         | 2023 年 11 月下旬 | Tao + 25 位贡献者             |
| Mathlib 形式化定理数超 20 万   | 2024 年前后       | Lean 社区                     |
| Viazovska 球填充证明形式化完成 | 2024              | EPFL 团队                     |

值得注意的是 PFR 形式化项目的工作流：Tao 使用了 Patrick Massot 开发的 Blueprint 工具，把数学证明写成一个人类可读、又与 Lean 代码实时链接的"蓝图"文档。任何人打开网页就能看到哪些步骤已经形式化（绿色）、哪些尚待完成（红色）。这把一个原本需要数年的个人努力，变成了一场可见的全球协作冲刺。

### AlphaProof：路线 B 的最强展示

2024 年 7 月，Google DeepMind 公布了 AlphaProof 和 AlphaGeometry 2 两个系统，并声称它们在 2024 年国际数学奥林匹克（IMO）上解决了 6 道题中的 4 道，得分 28 分（满分 42 分），达到银牌线，仅 1 分之差未能摘金。

这是历史上首次有 AI 系统在 IMO 级别的竞赛中达到奖牌标准。特别引人注目的是，AlphaProof 独立解出了当届最难的第 6 题（全场 600 余名顶尖学生中只有 5 人得满分）。

AlphaProof 的技术路径是：先由语言模型把自然语言的 IMO 题目翻译成 Lean 4 的形式化问题，再用强化学习在 Lean 环境中搜索证明——每当 Lean 拒绝某步骤，模型就得到一个负反馈，每当找到合法的下一步就前进。这个框架的根本优势是**无法作弊**：Lean 是严格的类型论检查器，你产生的任何"证明"都在被实时核验。

AlphaGeometry 2 则专门针对几何题，用符号推导与语言模型配合的方式独立解出了届 IMO 的几何题。

### 六位 Fields 奖得主与形式化数学

一个引人注目的社会学现象是：到 2024 年，至少有六位 Fields 奖得主——Tao、Scholze、Viazovska、Gowers、Hairer、Freedman——不同程度地参与或支持了形式化数学项目。这在十年前几乎不可想象：形式化数学曾被不少顶级数学家视为"计算机系的玩具"。

转折点是 Scholze 在 2020 年公开提出 Liquid Tensor 挑战，并亲自加入证明验证项目。Tao 更进一步，把形式化作为常规研究流程的一部分。他在接受访谈时说，形式化过程会强迫你面对证明中真正模糊的地方——"有时 Lean 无法编译，是因为你自己的推理出了漏洞。"

## 代价与争议

形式化数学并非没有摩擦。

**翻译成本极高。** 即使是 Tao 这样的大师，把一篇 33 页的论文形式化也需要动员 25 人花三周。一篇普通数学论文的形式化可能需要数百甚至数千人时。目前全球 Lean 社区高度依赖少数几个核心维护者——Mathlib 的抗脆弱性是一个实际隐忧。

**AI 自动证明的局限性仍然显著。** AlphaProof 解决的 IMO 题目，是已经翻译成 Lean 形式的竞赛题——自然语言到形式化语言的"自动翻译"本身仍是瓶颈，两道组合题因形式化困难而未被尝试。对于需要真正"创造性洞察"的研究级猜想，现有 AI 系统依然无能为力。

**验证 ≠ 发现。** 形式化系统出色地核实已有证明，但目前极少有案例是形式化系统**主动发现**新定理的。Lean 是严格的审计员，不是创造性的思考者——这个区别在 2020 年代尚未被根本性地改变。

**炒作风险。** AlphaProof 的 IMO 结果引发了大量媒体报道，部分标题声称"AI 即将取代数学家"。这严重高估了现有系统的能力：AI 在闭合、有限的形式化环境中搜索证明，与发现全新的数学结构、提出有价值的猜想，是完全不同量级的任务。

## 未知的边界

- **自动形式化（Autoformalization）能否真正突破？** 如果大语言模型能以高可靠性把自然语言数学翻译成 Lean，那么人类工作量将大幅下降。这是当前最活跃的研究方向之一，但在 2025 年底，端到端自动形式化对研究级论文仍不可靠。
- **AI 能否提出有价值的猜想？** DeepMind 在纽结理论和表示论中展示了 AI 辅助发现猜想的能力（见本系列另一篇），但把这种能力推广到更广泛的数学领域，路径尚不清晰。
- **形式化数学的"Cambrian Explosion"何时到来？** 目前 Lean 社区的活跃贡献者约数百人。如果 AI 辅助形式化工具成熟，这个数字可能在几年内爆炸式增长——届时数学知识库的结构可能发生根本性改变。
- **数学教育会如何响应？** 如果"能在 Lean 中核验"成为证明可信度的标准之一，数学训练体系将面临重大调整。目前没有任何主流数学系把形式化证明设为课程要求。

## 一条正在生长的时间线

形式化数学与 AI 证明的交汇是一个快速演变的领域，几乎每隔数月就有新里程碑：

- **2020**：Scholze 提出 Liquid Tensor Experiment，打破了顶级数学家与形式化社区的隔阂。
- **2022**：Liquid Tensor Experiment 宣告完成；Viazovska 的 E8 球填充证明被 EPFL 团队形式化。
- **2023 年 11 月**：Gowers-Green-Manners-Tao 证明 Marton 猜想，三周内完成 Lean 形式化。
- **2024 年 1 月**：Tao 与 Kontorovich 发起"强素数定理"的 Lean 形式化挑战，由 AI 辅助团队三周完成。
- **2024 年 7 月**：AlphaProof+AlphaGeometry 2 在 IMO 2024 达到银牌水平（28/42 分）。
- **2025 年**：AlphaProof 相关成果发表于《自然》；Lean Mathlib 库持续扩张，形式化数学进入加速期。

这条时间线的节奏——一年内多次突破——在过去的数学史上是罕见的。

## 跨域连接

- **计算机科学**：依赖类型论（Dependent Type Theory）是 Lean 的数学基础，也是现代编程语言（Agda、Idris）和软件验证工具的核心。证明与程序在柯里-霍华德同构下是同一件事——证明一个定理与写出一段正确程序在某种意义上等价。
- **哲学——数学的本质**：形式化验证给"数学证明是什么"这个古老问题带来了新的张力。如果一个定理被 Lean 验证了，我们是否"理解"了它？希尔伯特的形式主义梦想终于有了实现工具，但布尔巴基式的"没有直觉的证明"批评也随之而来。
- **认知科学**：Tao 等人形式化项目的实际体验表明，人类证明中往往存在隐含的"跳步"，这些跳步是真正的认知负担。形式化过程将这些隐含步骤显式化，为研究数学直觉与严格推理之间的关系提供了新材料。

---

## 延伸阅读

- Gowers, T., Green, B., Manners, F., Tao, T. "On a conjecture of Marton." arXiv:2311.05762 (2023).
- Tao, T. "Formalizing the proof of PFR in Lean4 using Blueprint: a short tour." _What's New_ (blog), 2023-11-18.
- AlphaProof & AlphaGeometry 2. "AI achieves silver-medal standard solving International Mathematical Olympiad problems." Google DeepMind Blog, 2024-07-19.
- Scholze, P. "Liquid Tensor Experiment." _Xena Project Blog_, 2020.
- de Moura, L. et al. "The Lean 4 Theorem Prover and Programming Language." _CADE 2021_.
- Buzzard, K. "What is the Xena Project?" _Xena Project Blog_, ongoing. （Kevin Buzzard 关于 Lean 在数学中应用的系统性介绍）

[^pfr]: Gowers, Green, Manners, Tao 的论文 arXiv:2311.05762 于 2023 年 11 月 9 日上传，三周后形式化版本宣告完成。

[^alphaproof]: Google DeepMind 于 2024 年 7 月 19 日发布博客公告，详细数据亦见 Nature 论文（2025 年发表）。
