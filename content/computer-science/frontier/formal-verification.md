---
title: 形式化验证与程序合成
title_en: Formal Verification and Program Synthesis — From CompCert to AI-Assisted Proof
status: published
updated: 2026-06-13
category: 编程语言与系统
horizon: 2020s
order: 4
tags:
  - 形式化验证
  - 程序合成
  - Lean4
  - 定理证明
  - AI辅助证明
researchers:
  - Xavier Leroy（INRIA，CompCert）
  - Leonardo de Moura（Microsoft Research → Amazon，Lean）
  - Terence Tao（UCLA，AI 辅助证明）
  - DeepMind AlphaProof 团队
institutions:
  - INRIA（法国国家信息与自动化研究所）
  - Microsoft Research
  - Amazon Web Services
  - DeepMind
related:
  - type-systems
  - large-language-models
---

# 形式化验证与程序合成

2023 年 11 月，菲尔兹奖得主陶哲轩（Terence Tao）和合作者 Timothy Gowers、Ben Green、Freddie Manners 共同宣布证明了多项式 Freiman–Ruzsa（PFR）猜想。这不只是一个数学定理的证明。

他们的证明是在 Lean 4 这个形式化证明系统中完成并验证的。在人类证明一个定理的同时，计算机验证了证明的每一步逻辑上正确、没有遗漏。这是近年来规模最大的"人机协作数学证明"之一。

2024 年，DeepMind 的 AlphaProof 系统在国际数学奥林匹克（IMO）2024 年的题目上，正确解决了六道题中的四道，并把这些解以 Lean 4 形式写出——首次有 AI 在 IMO 上达到"大致银牌"的表现，且解答经过形式化验证。

这两件事标志着形式化验证正在从"需要极大人工投入"的专业工具，向"可以由 AI 辅助的"普通工程工具转变。

## 破除误解：形式化验证不只是"测试更多"

软件测试（单元测试、集成测试、模糊测试）可以发现 bug，但无法证明没有 bug——测试只覆盖特定的输入，你永远无法测试所有可能的情况。

形式化验证的目标是**数学上的正确性证明**：对程序或系统的所有可能输入和状态，证明它满足某个规约（specification）。不是"我们测了 1000 个情况，没发现问题"，而是"我们数学上证明了，对所有情况，它都满足规约"。

这不仅适用于软件：硬件芯片、通信协议、密码算法都可以形式化验证。Intel 的浮点运算单元曾因 bug（Pentium FDIV bug，1994）损失数亿美元，此后硬件验证成为工业实践。

## 现场：CompCert 与经过证明的编译器

计算机程序由编译器把人类可读的源代码翻译成机器指令。如果编译器本身有 bug，会引入人类没有写进源码的错误——这些错误很难检测，因为人类审查源码，机器运行机器码。

Xavier Leroy（INRIA）领导开发的 **CompCert** 是第一个在 Coq 证明系统中被**完整形式化验证**的优化 C 编译器。CompCert 的机器可读证明保证：编译前后的程序在语义上等价——源码做什么，机器码就做什么，没有编译器引入的语义错误。

CompCert（2009 年首次发表完整版）已被航空、汽车、核电等安全关键领域采用。更重要的是，它证明了对一个复杂的实用系统（约 10 万行 Coq 证明），完整形式化验证是可行的。

## Lean 4 与数学证明的新生态

**Lean 4**（Leonardo de Moura，2021 年发布）是近年最受关注的交互式定理证明器（Proof Assistant）。前几代系统（Lean 3、Coq、Isabelle/HOL）已经证明了大量重要数学定理（如四色定理、Kepler 猜想）。Lean 4 改进了系统设计，同时也是一门通用编程语言，降低了"证明代码和普通代码共存"的障碍。

**Mathlib** 是建立在 Lean 4 上的大型数学库，由全球数百名贡献者维护，包含数千个数学领域的形式化定义和定理。它是人机协作数学的基础设施，也使 AI 系统可以从大量已有的形式化证明中学习。

陶哲轩等人的 PFR 猜想证明，正是在 Lean 4 + Mathlib 的基础上完成的。

## AI 辅助形式化证明：两种路线

### 路线一：用 LLM 写证明代码

大语言模型（如 GPT-4、Claude）被用来直接生成 Lean 4、Coq 或 Isabelle 的证明代码。优点：LLM 可以从大量已有证明中学习模式。缺点：LLM 会产生幻觉，生成语法上合法但逻辑错误的证明片段。

**Lean-GPT 系列工作**（2023-2025）：多个团队把 LLM 与证明搜索结合，LLM 提出候选证明步骤，系统验证后接受或拒绝，构成反馈循环。

### 路线二：专用的数学推理系统

**AlphaProof**（DeepMind，2024）：把强化学习训练的推理模型与 Lean 4 形式验证结合。模型生成候选证明步骤，Lean 4 验证；验证通过的证明为模型提供正向奖励，构成强化学习信号。这与 LLM 不同：每一步都有数学真实性保证，不依赖模型的"直觉"。

IMO 2024 测试：六道题，AlphaProof 解决了其中 4 道（两道代数题、一道数论题、一道组合题），自动生成 Lean 4 证明。剩余两道几何题对当前系统仍然困难。

2025 年，ACM SIGPLAN 编程语言软件奖颁给了 Gabriel Ebner、Soonho Kong、Leonardo de Moura 和 Sebastian Ullrich，表彰 Lean 对数学、硬件/软件验证和 AI 的"重大影响"。

## 程序合成：自动写正确的代码

**程序合成（Program Synthesis）**的目标比验证更进一步：给定规约，**自动生成**满足规约的程序。

经典路线：Sketch（Armando Solar-Lezama, 2006）让程序员写出程序的"草图"（有空洞的程序），自动搜索填充空洞的方案，使程序满足给定测试或形式规约。

现代路线：

- **FlashFill**（Gulwani, 2011）：Excel 中"从示例自动推导数据变换程序"的功能，是程序合成第一个大规模商业成功案例。
- **LLM 生成 + 形式验证**：让 LLM 生成候选代码，用形式验证（或测试）过滤，只保留正确的。2024-2025 年涌现了多个将 LLM 和 Lean/Coq 结合的程序合成框架。

## 代价与争议

**可扩展性的根本挑战**：形式化验证的成本极高。经验表明，对一个复杂的工业系统写出完整的形式化证明，所需工作量通常是原始开发工作量的 5-20 倍。这在学术研究和安全关键系统（核电、航空）可接受，在普通软件开发中极难推广。

**规约问题**：形式化验证保证程序满足规约，但规约本身可能是错的——描述了错误的需求，或遗漏了重要情况。"规约错误"不能被形式化验证发现。正确写出规约有时比写程序本身更难。

**AI 生成证明的可信度**：AlphaProof 的证明由 Lean 4 独立验证，这部分是可信的。但证明策略的选择、证明思路的来源，对人类来说仍是不透明的——这是一个"正确但难以理解"的证明，在数学文化中的意义有争议。

**工具生态碎片化**：Lean、Coq、Isabelle、HOL4 各有优点，社区分散，定理很少能跨系统迁移。统一形式化数学基础设施是长期难题。

## 未知的边界

- AI 辅助证明能否扩展到当前人类尚未解决的数学猜想（如黎曼猜想、P vs NP）？
- 形式化验证是否能在经济上可行地推广到普通软件开发，还是永远只是安全关键系统的专利？
- 如果 AI 可以自动发现并证明数学定理，"数学家"这一职业的角色会如何演变？
- LLM 辅助的程序合成，是否会改变软件正确性的标准——从"测试通过"到"形式化验证通过"？
- AlphaProof 类的系统目前只在有精确形式化表述的数学问题上有效（如 IMO 竞赛题）。对于数学研究中典型的"模糊的直觉驱动的探索"，AI 能否胜任仍完全未知。
- 如何在 Lean / Coq 等不同证明系统之间迁移已有的形式化知识，是基础设施层面的长期挑战，目前各生态相互割裂。
- 程序合成的"意图鸿沟"（intent gap）：从用户意图到精确规约，本身就需要人类介入。如何让非专家用户用自然语言描述需求，自动转化为可验证的形式规约，是连接 LLM 能力和形式化方法的关键未解问题。
- 超大规模软件系统（如 Linux 内核、浏览器）的完整形式化验证，在工程量上是否存在根本性障碍，还是只是时间和工具问题？现有的最大形式化验证项目（seL4 微内核，约 1 万行 C 代码）相比工业级系统仍小得多。
- AI 辅助程序合成能否可靠地生成安全关键代码（航空、医疗设备），还是幻觉问题始终让其无法通过安全认证标准？
- 形式化验证在硬件设计（RTL 验证）中已较为成熟（Intel、AMD、Arm 都使用等价性检查和模型检查工具），但软件侧尤其是并发软件的全面验证，仍是工业上的未解挑战。

## 跨域连接

- **[[type-systems]]**：依赖类型系统（Coq、Lean 的核心）把类型和证明统一，Curry-Howard 同构是形式化验证的理论根基。
- **[[large-language-models]]**：LLM 是 AI 辅助证明的重要工具，AlphaProof 展示了 LLM + 强化学习 + 形式验证的融合路线。
- **数学史**：形式化数学的雄心，可以追溯到希尔伯特的"形式主义"计划和罗素的《数学原理》（1910-1913），哥德尔不完备定理（1931）设定了基本限制。
- **软件工程**：形式化验证与测试驱动开发（TDD）、持续集成（CI）处于不同的"正确性保证"谱系：测试发现错误，验证排除错误类。工业界越来越关注将轻量级形式化方法（如属性测试、模型检查器 TLA+）纳入普通开发流程，而不只用于安全关键系统。
- **[[zero-knowledge-proofs]]**：ZKP 系统的验证电路（验证证明正确性的代码）是形式化验证的重要应用场景——ZK 电路的 bug 可以导致静默的安全漏洞，形式化验证提供比代码审计更强的保证。

---

## 延伸阅读

- Leroy, X. _Formal Verification of a Realistic Compiler._ CACM 52(7), 2009. （CompCert 的概述）
- de Moura, L. & Ullrich, S. _The Lean 4 Theorem Prover and Programming Language._ CADE 2021.
- AlphaProof 团队. _AI Achieves Silver-Medal Standard Solving International Mathematical Olympiad Problems._ Google DeepMind 博客, 2024. （deepmind.google）
- Gulwani, S. _Automating String Processing in Spreadsheets Using Input-Output Examples._ POPL 2011. （FlashFill 的学术论文）
- Avigad, J. _Mathematics and the Formal Turn._ 2023. arXiv:2311.00012.
