---
title: 衰老的可塑性——重编程、衰老细胞清除与长寿生物学
title_en: The Plasticity of Aging — Reprogramming, Senolytics, and Longevity Biology
status: published
updated: 2026-06-12
category: 衰老生物学
horizon: 2020s
order: 1
tags:
  - 衰老
  - 部分重编程
  - Yamanaka因子
  - 衰老细胞清除
  - 表观遗传时钟
researchers:
  - David Sinclair（哈佛大学医学院）
  - Juan Carlos Izpisúa Belmonte（Salk 研究所 → Arc Institute）
  - James Kirkland（梅奥诊所）
  - Morgan Levine（耶鲁大学 → Altos Labs）
institutions:
  - Altos Labs（Amazon 创始人贝索斯参与投资）
  - Calico（谷歌旗下长寿研究公司）
  - 梅奥诊所（senolytic 临床试验）
  - 哈佛 Sinclair Lab
related:
  - crispr-clinical-revolution
  - protein-design-revolution
---

# 衰老的可塑性——重编程、衰老细胞清除与长寿生物学

2006 年，山中伸弥发现向成体细胞引入四个转录因子（Oct4、Sox2、Klf4、c-Myc，即"山中因子"），可以将其重编程为诱导多能干细胞（iPSC）——在某种意义上"抹去"了细胞的衰老记忆。这项发现为他赢得了 2012 年诺贝尔生理学或医学奖。

但真正让衰老生物学在 2020 年代进入狂热期的问题，是另一个：如果不把细胞完全重编程成干细胞（那会导致癌症或丧失组织功能），能否**只**抹去衰老的表观遗传标记，保留细胞的身份与功能？

这就是**部分重编程（partial reprogramming）**的核心设想。

## 破除误解：衰老不等于 DNA 损伤的累积

过去几十年里，衰老生物学的主流叙事是：细胞随着时间积累 DNA 损伤、端粒缩短、代谢废物堆积，最终走向功能衰竭。在这个框架下，衰老是不可逆的磨损过程。

2013 年，David Sinclair 团队的一项小鼠实验动摇了这个框架。他们通过 epigenetic（表观遗传）噪音积累来模拟衰老——在不改变 DNA 序列的情况下让小鼠"变老"，然后通过重置表观遗传状态让它们"变年轻"。与此同时，Steve Horvath 在同年提出了**表观遗传时钟（epigenetic clock）**：基于全基因组 DNA 甲基化模式，可以精确估计细胞的"生物年龄"，其精度超过了任何基于 DNA 序列的方法[^horvath]。

这两项工作共同指向一个颠覆性的可能：**衰老在某种程度上是信息丢失问题，而不只是物质损伤问题**。如果衰老的核心是表观遗传程序的紊乱，那么它在原则上是可逆的——就像重置一张磁带，而不是修复一块碎裂的硬盘。

这不是定论，而是正在被激烈检验的假说。

## 部分重编程：不完全"清零"，只重置表观基因组

完全的山中因子重编程（full reprogramming）让细胞变回 iPSC，会丧失细胞原有的特化功能，甚至可能诱发肿瘤。**部分重编程**的思路是：短暂、间歇性地表达山中因子（通常是 OSK 三个因子，去掉致癌风险较高的 c-Myc），让细胞的表观遗传年龄"回拨"，但不触发完全去分化。

**动物实验数据**：

- 2020 年，Sinclair 团队在《自然》发表研究：在眼部视神经损伤的老年小鼠中，用 AAV 载体表达 OSK 三因子，不仅修复了受损的轴突再生能力，还将视网膜神经节细胞的表观遗传时钟回拨，恢复了老年小鼠的视力[^sinclair2020]。
- 2023 年，一项发表在《细胞重编程》杂志的研究显示，系统性（全身）给予 OSK 基因治疗的 124 周龄（相当于极老年）小鼠，中位剩余寿命延长约 109%，多项健康指标（虚弱评分）也显著改善[^lifespan]。
- 2024 年，一项《自然通讯》研究专门在老年小鼠大脑皮层神经元中实现部分重编程，显示认知功能改善——这是衰老研究者尤为关注的器官[^neuro]。

**批评与争议**：

这些结果激动人心，但需要大量保留态度。小鼠与人类衰老机制有重要差异；全身系统性重编程的安全性窗口（多少因子、多长时间不引发肿瘤）至今尚未明确；许多实验的样本量较小；再现性在部分结果上仍有疑问。

Altos Labs（一家 2021 年成立、获得超过 30 亿美元投资的衰老生物技术公司）目前是部分重编程领域最大的私人玩家，集合了包括 Gurdon、Belmonte、Bhanu、Levine 等顶级科学家，但其具体研究结果大多尚未发表。

## 衰老细胞清除（Senolytics）：另一条战线

与部分重编程试图"重置"衰老并行，另一个方向是直接清除已经衰老（senescent）的细胞。

**细胞衰老（cellular senescence）**是指细胞停止分裂、但不死亡，同时持续分泌促炎性细胞因子（SASP：衰老相关分泌表型）的状态。衰老细胞本身可以是正常的应激反应（如防止癌变），但在组织中长期积累后，其炎症信号会损害周围健康细胞，成为多种年龄相关疾病的推手。

**Senolytics**（衰老细胞清除药物）是能选择性诱导衰老细胞凋亡的小分子。最早被广泛研究的组合是 dasatinib（癌症治疗药物）+ quercetin（植物黄酮）。

**临床进展**：

梅奥诊所 James Kirkland 团队是 senolytic 临床研究的领头者。2024 年，一项 II 期随机对照试验评估了 dasatinib + quercetin 对 60 名绝经后健康女性骨质疏松的影响，这是首个在健康衰老人群中开展的 senolytic 随机对照试验[^osteoporosis]。其他正在进行的临床试验包括轻度认知障碍（MCI）、糖尿病肾病、特发性肺纤维化等适应症。

需要强调的是：这些大多数仍是早期临床试验，证明安全性和初步药理活性，尚未有大型 III 期试验的长期疗效数据。dasatinib 作为靶向化疗药有已知副作用，短期间歇给药在健康人中的长期安全性仍需要更多数据。

另一个有前景的 senolytic 化合物是 navitoclax（ABT-263），以及靶向 BCL-2 家族抗凋亡蛋白的 venetoclax——这些化合物最初作为癌症治疗药物开发。部分衰老细胞依赖这些蛋白抵抗凋亡，senolytic 的作用正是切断这一"自我保护"机制。

## 谁在做、做到了哪一步

| 方向               | 代表团队/机构                        | 当前阶段       | 关键进展                                           |
| ------------------ | ------------------------------------ | -------------- | -------------------------------------------------- |
| 部分重编程（动物） | Sinclair Lab / Altos Labs / Belmonte | 小鼠实验       | 多器官逆转衰老表型；寿命延长（2023）               |
| 部分重编程（人类） | Altos Labs 等                        | 早期研究       | 尚无发表的人类临床数据                             |
| Senolytics（临床） | 梅奥诊所 Kirkland                    | II 期临床      | Dasatinib+Quercetin 骨质疏松 II 期完成（2024）     |
| 表观遗传时钟       | Horvath / Levine / TruDiagnostic     | 商业化         | 生物年龄测量工具已商业化，用于研究和个人检测       |
| 长寿基因组学       | UK Biobank / 多机构 GWAS             | 大规模数据分析 | APOE、FOXO3 等基因变体与长寿关联；多基因评分开发中 |

## 代价与争议

**科学争议**：部分重编程领域充斥着引人注意但再现性存疑的结果。David Sinclair 的研究团队发表了一系列颠覆性发现，但其中部分（包括关于 NAD+ 前体 NMN 的早期主张）在后续大规模临床试验中效果平淡或结论复杂。衰老研究中的"大数字"（寿命延长 100%）往往来自特定小鼠品系、特定实验条件，对人类的外推需格外谨慎。

**商业化与夸大宣传**：衰老生物技术领域吸引了大量投资，也催生了大量过度宣传。Altos Labs 的 30 亿美元融资、多家初创公司出售"长寿"补充剂……在高质量临床数据到来之前，许多商业化尝试都游走在科学可信度的边界。

**伦理问题**：如果寿命可以显著延长，谁能负担得起？这是否会加剧已经严峻的代际资源竞争？"最大化个体寿命"与"最大化群体福祉"之间，存在未被充分讨论的张力。

**表观遗传时钟的局限**：不同的表观遗传时钟（Horvath 时钟、GrimAge、DunedinPACE 等）对"生物年龄"的测量结果有时差异显著，且它们究竟测量的是衰老的"驱动因子"还是"结果"，在机制上仍有争论。

## 未知的边界

- 表观遗传重置能否在不改变 DNA 序列的情况下，真正使**功能**意义上的组织年龄逆转？还是只是改变了可测量标记，而不改变真实的生理状态？
- 部分重编程的"安全窗口"——既能逆转衰老标记又不引发肿瘤或去分化——是否足够宽，使其成为可行的人类干预手段？
- Senolytics 在人类中的效果是否足够强，且副作用足够小，以支持健康人群的长期预防性使用？这需要数年至数十年的大规模随机对照试验，目前的证据体量远不足够。
- 不同物种的最长寿命差异巨大（弓头鲸可超过 200 年，裸鼹鼠几乎不表现衰老）。这些物种的衰老抑制机制是否能移植到人类？这是比较衰老生物学的核心前沿。

## 跨域连接

- **信息论**：Sinclair 的"信息理论衰老假说"将衰老类比为信息存储介质的噪音积累——表观遗传程序如同磁带上的信息，随时间退化。这把衰老引入了信息科学的语境：衰老是否有"纠错"机制？
- **进化生物学**：从进化角度，衰老并非自然选择的"目标"，而是选择压力在繁殖后世代减弱的副产品（Medawar 的"突变累积"理论）。这意味着大多数衰老机制对生殖后个体而言是"中性"的——即人工干预的空间理论上很大。
- **哲学（个人同一性）**：如果表观遗传重置让一个 80 岁的细胞"回到"30 岁的状态，那个人还是同一个人吗？年龄、记忆与身份之间的关系，在衰老干预的背景下获得了新的哲学维度。
- **社会学**：人类社会的代际结构（教育、退休、传承）建立在一个大致稳定的寿命预期上。如果寿命显著延长，这些结构将如何适应？历史上没有先例可循。

---

## 延伸阅读

- Lu, Y. et al. (Sinclair Lab). "Reprogramming to recover youthful epigenetic information and restore vision." _Nature_ 588, 124–129 (2020). DOI: 10.1038/s41586-020-2975-4.
- Horvath, S. "DNA methylation age of human tissues and cell types." _Genome Biology_ 14, R115 (2013). DOI: 10.1186/gb-2013-14-10-r115.（表观遗传时钟奠基论文）
- Lapasset, L. et al. "Rejuvenating senescent and centenarian human cells by reprogramming through the pluripotent state." _Genes & Development_ 25, 2248–2253 (2011).（早期重编程与衰老逆转研究）
- Baker, D.J. et al. "Clearance of p16Ink4a-positive senescent cells delays ageing-associated disorders." _Nature_ 479, 232–236 (2011). DOI: 10.1038/nature10600.（senolytic 概念奠基）
- Kirkland, J.L. & Tchkonia, T. "Senolytic drugs: from discovery to translation." _Journal of Internal Medicine_ 288, 518–536 (2020). DOI: 10.1111/joim.13141.（senolytics 综述）
- Sinclair, D.A. & LaPlante, M.D. _Lifespan: Why We Age—and Why We Don't Have To._ Atria Books, 2019.（Sinclair 的科普书，综述衰老信息论假说）

[^horvath]: Horvath, _Genome Biology_ 14 (2013)：首版"Horvath 时钟"使用 353 个 CpG 位点预测组织年龄，相关系数约 0.96，误差约 3.6 年。

[^sinclair2020]: Lu et al., _Nature_ 588 (2020)：AAV 载 OSK 在青光眼损伤和正常老年小鼠中均恢复视网膜神经节细胞功能，表观遗传时钟显示年龄回拨。

[^lifespan]: Gill et al., _Cellular Reprogramming_ 25 (2023)（bioRxiv 2023）：124 周龄小鼠全身 OSK 治疗，中位剩余寿命延长约 109%；该研究发表于相对较小的期刊，需独立重复验证。

[^neuro]: 关于 2024 年神经元部分重编程研究：Abe et al., _Communications Biology_ 7 (2024)：神经元特异性 Yamanaka 因子周期性表达改善老年小鼠认知功能。

[^osteoporosis]: 关于达沙替尼+槲皮素骨质疏松 II 期试验：结果报告见 2024 年，60 名绝经后女性，间歇性 senolytic 治疗方案；具体结果细节须参阅原始发表（Fight Aging! 2024-07 引用报道该 Phase 2 结果）。
