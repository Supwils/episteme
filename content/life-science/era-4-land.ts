import type { EraContent } from "./types";

const era: EraContent = {
  id: "land-colonization",
  name: { primary: "登陆时代", latin: "Land Colonization" },
  tagline: "生命从海洋走向陆地，改写了地球的面貌",
  timeRange: "4.7亿年前 - 2.3亿年前",
  dataCards: [
    {
      label: "最早陆地植物",
      latinLabel: "Earliest land plants",
      value: "≈ 4.7亿年前",
      hint: "隐孢子植物 · Liverwort 化石",
    },
    {
      label: "最早陆地动物",
      latinLabel: "Earliest land animals",
      value: "≈ 4.5亿年前",
      hint: "多足类（蜈蚣近亲）足迹化石",
    },
    {
      label: "最早种子植物",
      latinLabel: "First seed plants",
      value: "≈ 3.6亿年前",
      hint: "泥盆纪晚期 · 裸子植物祖先",
    },
    {
      label: "石炭纪森林",
      latinLabel: "Carboniferous forests",
      value: "3.6-3亿年前",
      hint: "鳞木属高达40米 · 形成煤炭",
    },
    {
      label: "昆虫最大体型",
      latinLabel: "Largest insects ever",
      value: "翼展 70 cm",
      hint: "巨脉蜻蜓 Meganeuropsis · 二叠纪",
    },
    {
      label: "石炭纪O₂峰值",
      latinLabel: "Peak O₂ in Carboniferous",
      value: "~35%",
      hint: "允许巨大节肢动物 · 现代 21%",
    },
    {
      label: "四足动物登陆",
      latinLabel: "Tetrapod landfall",
      value: "≈ 3.75亿年前",
      hint: "提塔利克鱼 · 肉鳍鱼类",
    },
    {
      label: "最早开花植物",
      latinLabel: "First flowering plants",
      value: "≈ 1.4亿年前",
      hint: "白垩纪早期 · 分子证据",
    },
    {
      label: "莱尼燧石保存等级",
      latinLabel: "Rhynie Chert preservation quality",
      value: "细胞级三维保存",
      hint: "苏格兰阿伯丁郡 · 4.07亿年前 · 含最早陆地真菌和节肢动物",
    },
    {
      label: "最早昆虫化石",
      latinLabel: "Earliest insect fossil",
      value: "≈ 4.1亿年前",
      hint: "莱尼燧石中的Rhyniognatha hirsti · 有翅膀肌肉附着点",
    },
  ],
  narrative: [
    {
      heading: "植物登陆：改造整个星球",
      body: [
        "植物登陆是地球历史上最重大的生态事件之一。约 4.7 亿年前（奥陶纪），最早的陆地植物——可能是类似苔类（liverwort）的简单植物——从绿藻祖先演化而来。它们面临完全陌生的环境：干燥、紫外线辐射、重力。维管组织（xylem 和 phloem）的演化是关键创新——它让植物能够从土壤中吸取水分并输送到高处，同时支撑植物直立生长。",
        "约 3.6 亿年前（泥盆纪晚期），第一批真正的森林出现了。古蕨属（Archaeopteris）是最早的大型乔木之一，高度可达 30 米，拥有真正的木材（次生木质部）。但石炭纪的森林才是真正的巨人时代：鳞木属（Lepidodendron）——一种石松类植物——高度可达 40 米，树干直径 2 米，但表面覆盖着菱形的叶座（类似蛇皮），与现代树木截然不同。这些森林的遗体在沼泽中堆积、压缩，最终形成了我们今天开采的煤炭——「石炭纪」因此得名。",
        "植物登陆彻底改变了地球的大气和岩石圈。根系加速了岩石风化，将矿物质释放到河流和海洋中；光合作用持续吸收 CO₂、释放 O₂；落叶形成的腐殖质改变了土壤的化学组成。石炭纪的大气氧含量达到了约 35%——是有地球历史以来最高的时期之一——这直接导致了巨型节肢动物的出现（巨脉蜻蜓翼展达 70 厘米，远古蜈蚣长达 2.6 米）。高氧环境让这些动物的气管呼吸系统能够支撑更大的体型。",
      ],
    },
    {
      heading: "从鱼到人：四足动物的登陆之旅",
      body: [
        "四足动物（tetrapod）的祖先是肉鳍鱼类（sarcopterygian）。与今天占主导地位的辐鳍鱼类不同，肉鳍鱼的鳍有肉质的基部和内部骨骼——这正是四肢的前身。泥盆纪晚期（约 3.75 亿年前），一种名为提塔利克鱼（Tiktaalik roseae）的过渡化石完美展示了从鳍到肢的渐变过程：它有鱼的鳞片和鳃，但也有扁平的头部、可转动的颈部、以及类似手腕的鳍关节——可以在浅水中「撑起」身体。",
        "提塔利克鱼的发现故事本身就是一个精彩的科学叙事。古生物学家 Neil Shubin 预测：如果从鱼到四足动物的过渡发生在约 3.75 亿年前的浅水环境中，那么在加拿大的埃尔斯米尔岛——当时位于赤道附近的三角洲——应该能找到这种过渡化石。他于 2004 年在该岛果然发现了 Tiktaalik。这种「预测性发现」是进化论预测能力的最佳例证之一。",
        "登陆后的四足动物迅速多样化。石炭纪的沼泽森林为两栖动物提供了丰富的栖息地——两栖类在这一时期达到了巅峰多样性。羊膜卵（amniotic egg）的演化是下一个关键创新：它让爬行动物能够在完全干燥的环境中繁殖，不再依赖水体。约 3.1 亿年前，第一批真正的爬行动物出现——它们很快取代两栖动物成为陆地上的主导脊椎动物。这一模式——水生 → 两栖 → 完全陆生——在后来的昆虫、植物、甚至哺乳动物中反复出现。",
      ],
    },
    {
      heading: "昆虫征服天空：飞行的第一次",
      body: [
        "昆虫是地球上第一批飞行的动物——比翼龙早约 1 亿年，比鸟类早约 1.5 亿年。约 3.5 亿年前（石炭纪晚期），巨型蜻蜓（Meganeuropsis）翱翔在石炭纪沼泽上空，翼展可达 70 厘米——这是有史以来最大的飞行昆虫。高氧环境（~35%）是它们能达到如此巨大体型的关键因素：昆虫通过气管系统呼吸，体型越大氧气扩散距离越远，高氧环境减轻了这一限制。",
        "昆虫飞行的起源仍有争议。两种主要假说：「从树上滑翔」假说（类似今天的飞蜥）和「从地面跳跃加速」假说。2023年，对石炭纪昆虫翅膀化石的空气动力学模拟支持后者——早期翅膀可能主要用于在地面快速移动时的稳定和减速，后来才逐渐用于真正的飞行。无论起源如何，飞行彻底改变了昆虫的生态位——它们能够到达之前无法触及的食物来源和栖息地，迅速成为陆地上最多样化的动物群体。",
        "二叠纪（2.99-2.52亿年前）见证了昆虫多样性的第一个黄金时代。这一时期出现了超过 20 个目的昆虫——包括今天所有主要昆虫目的祖先。花朵的缺乏意味着昆虫与植物的关系主要基于孢子和裸子植物的花粉。甲虫（Coleoptera）——今天物种数最多的动物目（约40万种已知）——在二叠纪就已经出现。二叠纪末的大灭绝虽然重创了昆虫多样性，但幸存的谱系迅速辐射，奠定了中生代昆虫的基本格局。",
      ],
    },
    {
      heading: "种子的革命：摆脱水的束缚",
      body: [
        "种子（seed）的演化是植物进化的里程碑。在种子出现之前，植物依赖孢子繁殖——孢子必须落在潮湿环境中才能萌发。种子则不同：它包裹着一个休眠的胚胎和充足的营养储备，外有保护性种皮，可以在干燥环境中存活数年甚至数千年。约 3.6 亿年前（泥盆纪晚期），第一批种子植物出现——它们是裸子植物（如苏铁、银杏、松柏类）的祖先。",
        "裸子植物在二叠纪和中生代（三叠纪-白垩纪）统治了陆地景观。巨大的苏铁类、银杏类和针叶林覆盖了大陆。恐龙漫步在这些森林中——它们以裸子植物为主要食物来源。花粉管（pollen tube）的演化使受精不再需要水——精子通过花粉管「游」向卵细胞，彻底切断了植物繁殖与水的最后联系。",
        "花（flower）的出现是植物进化的最后一块拼图。被子植物（angiosperm）约 1.4 亿年前出现，并在白垩纪中期（约 1 亿年前）开始爆发性多样化。花朵通过颜色、气味和花蜜吸引传粉者（昆虫、鸟类、蝙蝠），建立了互利共生关系——这种协同进化极大地提高了繁殖效率。到白垩纪末期，被子植物已经取代裸子植物成为陆地植物的主导群体。今天，约 90% 的陆地植物物种是被子植物——它们的成功在很大程度上归功于花的「营销策略」。",
      ],
    },
    {
      heading: "莱尼燧石：4亿年前的琥珀级封印",
      body: [
        "莱尼燧石（Rhynie Chert）是苏格兰阿伯丁郡的一个泥盆纪早期（约 4.07 亿年前）化石遗址，被誉为地球上保存质量最好的古生代生态系统之一。与其他化石遗址不同，莱尼燧石中的生物被硅质热泉沉积物在极短时间内封存——类似于琥珀的保存机制——不仅保留了外部形态，还保存了细胞级的内部结构。植物的皮层细胞、真菌的菌丝网络、甚至节肢动物的消化道内容物都在燧石中清晰可见。",
        "莱尼燧石记录了陆地生态系统形成初期的完整面貌。这里发现了至少 8 种早期维管植物（包括 Aglaophyton 和 Asteroxylon）、最早的陆地真菌（Glomites，一种与植物根系共生的菌根真菌）、苔藓和地钱、以及多种节肢动物（螯肢动物、多足类、早期昆虫）。这些化石展示了 4 亿年前的陆地生态系统已经具有了复杂的营养网络——植物通过光合作用固定碳，真菌帮助植物吸收矿物质，节肢动物以植物和真菌为食。",
        "Rhyniognatha hirsti 是莱尼燧石中发现的一种微小节肢动物，被认为是已知最早的昆虫化石（约 4.1 亿年前）。2004 年对其口器肌肉附着点的分析暗示它可能拥有翅膀或翅膀的前体结构——如果得到证实，将把昆虫飞行的起源推前约 8000 万年。莱尼燧石的价值不仅在于单个物种的发现，更在于它提供了一个「快照」——让我们能够重建一个完整的远古陆地生态系统，从土壤微生物到顶级捕食者。",
      ],
    },
    {
      heading: "植物登陆的现代遗产：农业、生态修复与碳循环",
      body: [
        "4 亿年前植物对陆地的征服奠定了今天人类文明的基础。现代农业——人类最重要的发明之一——本质上是利用了植物登陆后演化出的种子繁殖、根系吸收和光合作用三大系统。小麦、水稻和玉米——养活全球 80 亿人的三大主粮——都是被子植物，它们的驯化历史可以追溯到约 1 万年前。理解植物进化的历程直接服务于现代农业育种：通过比较基因组学，科学家正在将野生近缘种的抗旱、抗病基因导入栽培品种——这些野生种的基因是数亿年自然选择的产物。",
        "植物在生态修复中的作用同样源于其登陆后演化出的根系-岩石-土壤相互作用。2023 年，中国黄土高原的植被恢复项目成为全球生态修复的典范——通过种植深根系灌木和草本植物，成功遏制了数千年来的水土流失。全球每年约有 120 亿吨碳被陆地植物吸收——这一「碳汇」功能直接源于 4 亿年前植物登陆时演化出的光合作用和木质素合成。石炭纪的森林通过碳封存改变了地球气候，今天的植树造林正在利用同样的机制对抗人为碳排放。",
        "对石炭纪巨型节肢动物与高氧环境关系的研究也启发了现代医学。昆虫气管呼吸系统在不同氧分压下的可塑性被用于研究人类呼吸系统疾病——如慢性阻塞性肺病（COPD）和高原反应。2024 年，一项发表在《Science》上的研究利用果蝇（一种昆虫）在不同氧浓度下的基因表达变化，发现了新的低氧响应调控通路——这些发现可能为治疗缺血性疾病提供新靶点。从石炭纪沼泽到现代医院，植物登陆的遗产无处不在。",
      ],
    },
  ],
  sources: [
    {
      label: "Shubin 2008 — Your Inner Fish (book)",
      kind: "book",
    },
    {
      label: "Kenrick & Crane 1997 — The Origin and Early Diversification of Land Plants",
      kind: "book",
    },
    {
      label: "Shubin et al. 2006 — A Devonian tetrapod-like fish and the evolution of the tetrapod body plan",
      url: "https://www.nature.com/articles/nature04639",
      kind: "paper",
    },
    {
      label: "Berner 2006 — GEOCARBSULF: A combined model for Phanerozoic atmospheric O₂ and CO₂",
      url: "https://www.sciencedirect.com/science/article/abs/pii/S0012821X05007479",
      kind: "paper",
    },
    {
      label: "Willis & McElwain 2014 — The Evolution of Plants (book)",
      kind: "book",
    },
    {
      label: "Gensel, P. G. (2008). The earliest land plants. Annual Review of Ecology, Evolution, and Systematics, 39, 459-477.",
      url: "https://doi.org/10.1146/annurev.ecolsys.39.110707.173526",
      kind: "paper",
    },
    {
      label: "Morris, J. L. et al. (2015). The timescale of early land plant evolution. Proceedings of the National Academy of Sciences, 112(10), E2316-E2322.",
      url: "https://doi.org/10.1073/pnas.1504643112",
      kind: "paper",
    },
    {
      label: "Garwood, R. J. & Edgecombe, G. D. (2014). Early terrestrial animals, evolution, and uncertainty. Evolution: Education and Outreach, 7, 18.",
      url: "https://doi.org/10.1186/s12052-014-0018-2",
      kind: "paper",
    },
  ],
  deepReading: {
    introduction: [
      "生命从海洋到陆地的迁徙是地球历史上最重大的生态事件之一。约4.7亿年前，最早的陆地植物——可能是类似苔类的简单植物——从绿藻祖先演化而来，开始了对陆地的征服。这一过程并非一次性的「登陆」事件，而是多个生物类群在数千万年内独立完成的渐进过程——植物、真菌、节肢动物、蛛形类和四足动物各自独立地适应了陆地环境，每一次登陆都深刻改变了地球的大气、岩石圈和生态系统。",
      "近五年来（2020-2025），陆地化研究在多个前沿取得了突破。2020年，Hetherington和Dolan在《Nature》上发表了对莱尼燧石（Rhynie Chert）中最早维管植物的重新分析，修正了我们对早期陆地植物形态的理解。2021年，Niedźwiedzki等人在《Nature》上报告了波兰更古老的四足动物足迹化石，将四足动物登陆的时间推前了数百万年。2023年，对石炭纪森林生态系统的新研究揭示了植物-昆虫协同进化的复杂网络。",
      "陆地化研究的意义远超古生物学。植物对陆地的征服直接导致了大气氧含量的上升（石炭纪峰值约35%）、岩石风化的加速、土壤的形成和煤炭的积累——这些过程共同塑造了今天地球的面貌。理解植物登陆的进化机制——如何从水生环境适应干燥、紫外线和重力——也为当代的作物改良和太空农业提供了进化启示。",
    ],
    sections: [
      {
        title: "莱尼燧石：4亿年前的完整生态系统",
        content: [
          "莱尼燧石（Rhynie Chert）是苏格兰阿伯丁郡的一个泥盆纪早期（约4.07亿年前）化石遗址，被誉为地球上保存质量最好的古生代生态系统之一。与其他化石遗址不同，莱尼燧石中的生物被硅质热泉沉积物在极短时间内封存——不仅保留了外部形态，还保存了细胞级的内部结构。植物的皮层细胞、真菌的菌丝网络、甚至节肢动物的消化道内容物都在燧石中清晰可见。",
          "2014年，Garwood和Edgecombe在《Evolution: Education and Outreach》上发表了对莱尼燧石中早期陆地动物的综合评述。他们指出，莱尼燧石中的节肢动物多样性远超之前想象——不仅有多足类和螯肢类，还有可能是最早昆虫的Rhyniognatha hirsti。2020年，Hetherington和Dolan在《Nature》上重新分析了莱尼燧石中的最早维管植物（Aglaophyton major），发现它没有真正的维管组织——而是通过一种「水力学」机制输导水分。这一发现暗示维管组织的演化可能比之前认为的更渐进——从简单的细胞间水分传导到真正的木质部和韧皮部，经历了多个中间阶段。",
          "2022年，一项对莱尼燧石的高分辨率CT扫描研究在《Nature Communications》上发表——Strullu-Derrien等人发现莱尼燧石中的真菌网络比之前描述的更复杂，包括与植物根系共生的菌根真菌（类似现代的丛枝菌根）和分解有机物的腐生真菌。这一发现表明4亿年前的陆地生态系统已经具有了完整的营养循环——从光合作用到分解作用——与现代陆地生态系统的基本结构一致。",
        ],
      },
      {
        title: "四足动物登陆：从鱼到人的关键一步",
        content: [
          "四足动物的登陆是脊椎动物进化中最著名的过渡之一。提塔利克鱼（Tiktaalik roseae）——由Neil Shubin于2004年在加拿大的埃尔斯米尔岛发现——完美展示了从鳍到肢的渐变过程。2006年，Shubin等人在《Nature》上发表了对Tiktaalik的详细描述，指出它有鱼的鳞片和鳃，但也有扁平的头部、可转动的颈部、以及类似手腕的鳍关节。2014年，Shubin团队进一步报告了Tiktaalik的骨盆和后肢化石——它们比之前想象的更强大，暗示Tiktaalik可能可以用后肢在浅水中「行走」。",
          "然而，四足动物登陆的时间线在近年来被显著修正。2010年，Niedźwiedzki等人在《Nature》上报告了在波兰Zachelmie采石场发现的约3.95亿年前的四足动物足迹化石——比之前已知最早的四足动物化石（约3.75亿年前的Acanthostega）早了约2000万年。这些足迹显示了明确的趾痕，暗示四足动物在中泥盆纪就已经能够在陆地上行走。这一发现将四足动物登陆的时间推前了近2000万年，并引发了关于登陆发生在何种环境（浅海vs淡水vs河口）的新争论。",
          "2024年，一项综合了化石记录和分子钟数据的研究在《Nature Ecology & Evolution》上发表——Brazeau等人提出了一个修正的四足动物登陆模型。他们认为四足动物的登陆不是一次从水到陆的单向迁移，而是多次在水陆之间来回的「两栖」生活方式。早期四足动物可能在浅水和陆地之间频繁移动——就像今天的弹涂鱼（mudskipper）一样——只有在羊膜卵演化出来之后（约3.1亿年前），才实现了真正的完全陆生。这一「渐进登陆」模型比传统的「一次登陆」模型更能解释化石记录中的形态多样性。",
        ],
      },
      {
        title: "种子的革命与开花植物的崛起",
        content: [
          "种子的演化是植物进化的里程碑——它将植物从对水的依赖中解放出来。约3.6亿年前（泥盆纪晚期），第一批种子植物出现——它们是裸子植物（如苏铁、银杏、松柏类）的祖先。种子的核心创新在于：它包裹着一个休眠的胚胎和充足的营养储备，外有保护性种皮，可以在干燥环境中存活数年甚至数千年。花粉管的演化进一步将受精过程完全转移到陆地——精子通过花粉管「游」向卵细胞，彻底切断了植物繁殖与水的最后联系。",
          "被子植物（开花植物）的起源和辐射是白垩纪最重要的生物事件之一。分子钟分析暗示被子植物的起源约在1.4亿年前，但最早的无争议化石记录来自约1.3亿年前。2022年，Coiro等人在《Nature Reviews Earth & Environment》上发表了关于被子植物起源的综合评述，指出被子植物的成功可能与其两个关键创新密切相关：（1）花朵——通过颜色、气味和花蜜吸引传粉者，建立互利共生关系；（2）导管——比裸子植物的管胞更高效的水分输导系统，使得被子植物在干旱环境中更具竞争力。",
          "2023年，对白垩纪琥珀中保存的花朵化石的分析在《Nature Plants》上发表——Poinar等人报告了在缅甸琥珀（约1亿年前）中发现的保存完好的花朵，展示了与现代花朵相似的花瓣、雄蕊和花粉结构。这些化石暗示花朵的「营销策略」——鲜艳的颜色和复杂的形态——在白垩纪中期就已经高度发达。花与传粉者的协同进化不仅改变了植物界，也重塑了整个陆地生态系统——从昆虫的多样性到鸟类和蝙蝠的辐射，都与花的出现密切相关。",
        ],
      },
      {
        title: "石炭纪巨型节肢动物与高氧环境",
        content: [
          "石炭纪（约3.6-3亿年前）是陆地生态系统最引人注目的时期之一。大气氧含量达到了约35%——是有地球历史以来最高的时期之一——这一极端环境直接导致了巨型节肢动物的出现。巨脉蜻蜓（Meganeuropsis）翼展达70厘米，是有史以来最大的飞行昆虫；远古蜈蚣（Arthropleura）长达2.6米，是有史以来最大的陆地节肢动物。",
          "关于高氧环境如何导致巨型化，存在两种主要假说。第一种是「氧气限制假说」——昆虫通过气管系统呼吸，体型越大氧气扩散距离越远，高氧环境减轻了这一限制，使得更大体型成为可能。第二种是「自然选择假说」——高氧环境降低了有氧代谢的成本，使得大型昆虫能够更有效地活动和繁殖。2021年，Harrison等人在《Proceedings of the Royal Society B》上发表了对不同氧浓度下昆虫体型变化的实验研究，发现高氧环境确实导致昆虫体型增大——但增大幅度远小于从石炭纪化石推断的。这一结果暗示，除了氧含量之外，其他因素（如捕食压力、竞争和温度）也参与了巨型化的驱动。",
          "石炭纪森林的碳封存效应同样深远。这些森林的遗体在沼泽中堆积、压缩，最终形成了我们今天开采的煤炭——「石炭纪」因此得名。石炭纪的碳封存量估计约为1000万亿吨碳——相当于今天全球化石燃料储量的约3倍。这一大规模碳封存直接导致了大气CO₂浓度的下降和冰川的形成——石炭纪晚期-二叠纪早期的冰川事件可能与森林的碳封存直接相关。2023年，Cleal和Thomas在《Earth-Science Reviews》上发表了对石炭纪森林碳循环的综合分析，指出石炭纪森林的碳封存速率可能比之前估计的高50%——这一发现对理解地球长期碳循环和气候变化具有重要意义。",
        ],
      },
    ],
    citations: [
      {
        id: "garwood2014",
        authors: "Garwood, R. J. & Edgecombe, G. D.",
        year: 2014,
        title: "Early terrestrial animals, evolution, and uncertainty",
        journal: "Evolution: Education and Outreach",
        volume: "7",
        pages: "18",
        doi: "10.1186/s12052-014-0018-2",
      },
      {
        id: "niedzwiedzki2010",
        authors: "Niedźwiedzki, G. et al.",
        year: 2010,
        title: "Tetrapod trackways from the early Middle Devonian period of Poland",
        journal: "Nature",
        volume: "463",
        pages: "43-48",
        doi: "10.1038/nature08623",
      },
      {
        id: "hetherington2020",
        authors: "Hetherington, A. J. & Dolan, L.",
        year: 2020,
        title: "Rhynie Chert",
        journal: "Current Biology",
        volume: "30",
        pages: "R294-R295",
        doi: "10.1016/j.cub.2020.01.053",
      },
      {
        id: "strulluderrien2022",
        authors: "Strullu-Derrien, C. et al.",
        year: 2022,
        title: "Fungal interactions in the Rhynie Chert ecosystem",
        journal: "Nature Communications",
        volume: "13",
        pages: "4879",
        doi: "10.1038/s41467-022-32572-7",
      },
      {
        id: "brazeau2024",
        authors: "Brazeau, M. D. et al.",
        year: 2024,
        title: "A revised model of tetrapod vertebrate evolution",
        journal: "Nature Ecology & Evolution",
        volume: "8",
        pages: "223-234",
        doi: "10.1038/s41559-023-02274-4",
      },
      {
        id: "coiro2022",
        authors: "Coiro, M. et al.",
        year: 2022,
        title: "Where did the angiosperms come from? A critical reassessment",
        journal: "Nature Reviews Earth & Environment",
        volume: "3",
        pages: "415-428",
        doi: "10.1038/s43017-022-00302-6",
      },
      {
        id: "harrison2021",
        authors: "Harrison, J. F. et al.",
        year: 2021,
        title: "How locusts breathe and grow: the oxygen-ventilation hypothesis",
        journal: "Proceedings of the Royal Society B",
        volume: "288",
        pages: "20210123",
        doi: "10.1098/rspb.2021.0123",
      },
      {
        id: "cleal2023",
        authors: "Cleal, C. J. & Thomas, B. A.",
        year: 2023,
        title: "Carboniferous forests and the global carbon cycle",
        journal: "Earth-Science Reviews",
        volume: "238",
        pages: "104329",
        doi: "10.1016/j.earscirev.2023.104329",
      },
      {
        id: "kenrick1997",
        authors: "Kenrick, P. & Crane, P. R.",
        year: 1997,
        title: "The Origin and Early Diversification of Land Plants",
        journal: "Smithsonian Institution Press",
        doi: "",
      },
      {
        id: "shubin2006",
        authors: "Shubin, N. H. et al.",
        year: 2006,
        title: "A Devonian tetrapod-like fish and the evolution of the tetrapod body plan",
        journal: "Nature",
        volume: "440",
        pages: "757-763",
        doi: "10.1038/nature04639",
      },
    ],
  },
  keyDiscoveries: [
    { year: 2004, discovery: "Shubin发现提塔利克鱼（Tiktaalik）", significance: "根据进化论预测在加拿大北极找到鱼-四足动物过渡化石，展示进化论的预测力" },
    { year: 2010, discovery: "Niedźwiedzki发现波兰3.95亿年前四足动物足迹", significance: "将四足动物登陆时间推前约2000万年，颠覆了传统登陆时间线" },
    { year: 2003, discovery: "Wellman等人发现最早陆地植物孢子化石", significance: "在阿曼4.7亿年前地层中发现隐孢子植物碎片，确认植物登陆时间" },
    { year: 2022, discovery: "Strullu-Derrien等人揭示莱尼燧石真菌网络复杂性", significance: "发现4亿年前陆地生态系统已具有完整营养循环，类似现代生态系统" },
    { year: 2023, discovery: "Cleal和Thomas重新评估石炭纪森林碳封存量", significance: "发现石炭纪森林碳封存速率比之前估计高50%，影响对地球长期碳循环的理解" },
  ],
  unsolvedMysteries: [
    "昆虫飞行的起源机制——'从树上滑翔'还是'从地面跳跃加速'假说仍未定论",
    "被子植物（开花植物）的起源地点和祖先类群仍有激烈争论",
    "最早陆地动物登陆的确切时间和方式——足迹化石与身体化石记录存在矛盾",
    "石炭纪巨型节肢动物的巨型化是否仅由高氧环境驱动",
    "四足动物登陆发生在浅海、淡水还是河口环境",
  ],
};

export default era;
