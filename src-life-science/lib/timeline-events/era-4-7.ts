import type { TimelineEvent } from "./types";

export const ERA_4_7_EVENTS: TimelineEvent[] = [
  {
    id: "permian-extinction",
    era: "2.5 亿年前",
    event: "二叠纪大灭绝",
    detail: "地球历史上最严重的灭绝事件——96% 的海洋物种消失。西伯利亚暗色岩火山活动是主因。",
    accent: "#d85a5a",
    category: "animals",
    significance: "二叠纪大灭绝重塑了地球生态系统，为恐龙的崛起创造了条件。",
    keyFigures: [],
    context: {
      before: "二叠纪晚期，盘古大陆形成，内陆干旱加剧，海洋生态系统高度特化。",
      after: "三叠纪早期，生态系统恢复缓慢，幸存物种逐渐辐射演化，恐龙开始出现。",
    },
    connections: ["石炭纪森林", "恐龙崛起", "K-Pg 大灭绝"],
    openQuestions: [
      "西伯利亚暗色岩火山活动与大灭绝之间的时间关系是否精确吻合？",
      "海洋酸化和缺氧事件在灭绝过程中各自扮演了什么角色？",
    ],
    deepReading: {
      introduction:
        "二叠纪-三叠纪大灭绝发生在约2.52亿年前，是地球历史上最严重的生物危机。这次灭绝事件消灭了约96%的海洋物种和70%的陆地脊椎动物物种，彻底重塑了地球的生态系统。",
      sections: [
        {
          title: "灭绝原因",
          content: [
            "二叠纪大灭绝的主要原因是西伯利亚暗色岩的大规模火山活动。这次火山活动持续了约200万年，喷出了约700万立方千米的熔岩，覆盖面积超过700万平方公里。火山活动释放了大量的二氧化碳、二氧化硫和卤代烃，导致了全球变暖、海洋酸化和臭氧层破坏。",
            "火山熔岩穿过煤层和蒸发岩时，释放了大量的有机碳和卤素化合物，加剧了温室效应和臭氧层破坏。海洋温度升高导致溶解氧减少，形成了大范围的缺氧水域，这是海洋生物大量灭绝的直接原因。",
          ],
        },
        {
          title: "生态恢复与演化后果",
          content: [
            "二叠纪大灭绝后的生态恢复花了约1000万年，远长于其他大灭绝事件。三叠纪早期的生态系统结构简单，物种多样性低，被称为“死区”。幸存的物种包括犬齿兽类（哺乳动物的祖先）、某些爬行动物类群和少量海洋无脊椎动物。",
            "这次大灭绝为恐龙的崛起创造了生态条件。在三叠纪中期，恐龙开始从小型掠食者逐渐演化为多样化的类群，最终在三叠纪末期成为陆地生态系统的主导者。二叠纪大灭绝提醒我们，地球生态系统在极端扰动下可以发生根本性的重组。",
          ],
        },
      ],
      citations: [
        {
          id: "erwin-2002",
          authors: "Erwin, D.H.",
          year: 2002,
          title: "The Permiar Mass Extinction",
          journal: "Annual Review of Ecology and Systematics",
          doi: "10.1146/annurev.ecolsys.33.1.1",
        },
        {
          id: "burgess-2017",
          authors: "Burgess, S.D. et al.",
          year: 2017,
          title: "Initial pulse of Siberian Traps sills as the trigger of the end-Permian mass extinction",
          journal: "Nature Communications",
          doi: "10.1038/s41467-017-00083-9",
        },
      ],
    },
  },
  {
    id: "dinosaur-rise",
    era: "2.3 亿年前",
    event: "恐龙崛起",
    detail: "三叠纪晚期，最早的恐龙在南美洲出现，体型小巧但迅速辐射演化。",
    accent: "#98c379",
    category: "animals",
    significance: "恐龙开启了长达1.65亿年的统治时代，是中生代陆地生态系统的绝对主导者。",
    keyFigures: [],
    context: {
      before: "二叠纪大灭绝后，生态系统缓慢恢复，盘古大陆开始分裂，气候温暖干燥。",
      after: "侏罗纪和白垩纪，恐龙多样化为数千种，占据了几乎所有陆地生态位。",
    },
    connections: ["二叠纪大灭绝", "哺乳动物出现", "K-Pg 大灭绝"],
    openQuestions: [
      "恐龙相比同时代的其他爬行动物有什么竞争优势？",
      "恐龙的温血特性是在何时演化出来的？",
    ],
    deepReading: {
      introduction:
        "恐龙最初出现在约2.3亿年前的三叠纪晚期，当时它们只是众多爬行动物类群中的一个小型分支。然而，凭借一系列关键的解剖学创新，恐龙迅速崛起为中生代陆地生态系统的统治者。",
      sections: [
        {
          title: "早期恐龙的特征",
          content: [
            "最早的恐龙（如始盗龙和艾雷拉龙）体型较小，体长约1-3米，双足行走。它们的关键优势包括：直立的四肢姿态（相比其他爬行动物的匍匐姿态，更有利于高效运动）、轻质的骨骼结构和高效的呼吸系统。这些特征使恐龙在竞争中占据了优势。",
            "三叠纪末期的大灭绝事件（约2.01亿年前）消灭了许多恐龙的竞争者，为恐龙的辐射演化扫清了障碍。进入侏罗纪后，恐龙迅速多样化为蜥脚类（巨型长颈植食性恐龙）、兽脚类（掠食性恐龙）和鸟臀类（植食性恐龙）等多个类群。",
          ],
        },
        {
          title: "统治中生代",
          content: [
            "恐龙在中生代（约2.52-0.66亿年前）占据了几乎所有陆地生态位。最大的恐龙（如阿根廷龙）体长超过30米，体重超过70吨，是地球历史上最大的陆地动物。最小的恐龙（如小盗龙）体长不到1米，与现代鸟类亲缘关系密切。",
            "恐龙的统治不仅体现在体型和多样性上，还体现在它们对生态系统的影响。恐龙改变了植被的组成（通过选择性取食）、营养循环（通过排泄和迁徙）以及种子传播。它们的灭绝为哺乳动物的崛起创造了前所未有的机会。",
          ],
        },
      ],
      citations: [
        {
          id: "brusatte-2010",
          authors: "Brusatte, S.L. et al.",
          year: 2010,
          title: "The origin and early radiation of dinosaurs",
          journal: "Earth-Science Reviews",
          doi: "10.1016/j.earscirev.2009.11.001",
        },
        {
          id: "langer-2010",
          authors: "Langer, M.C. et al.",
          year: 2010,
          title: "The dinosaurian radiation and the origin of major dinosaurian clades",
          journal: "Arquivos do Museu Nacional",
        },
      ],
    },
  },
  {
    id: "mammals-appear",
    era: "2 亿年前",
    event: "哺乳动物出现",
    detail: "在恐龙的阴影下，最早的哺乳动物出现——体型如鼠，夜间活动。",
    accent: "#c8a45a",
    category: "animals",
    significance: "哺乳动物在恐龙时代积累的适应性创新，为恐龙灭绝后的快速辐射演化奠定了基础。",
    keyFigures: [],
    context: {
      before: "合弓纲（“似哺乳爬行动物”）在二叠纪曾是陆地优势脊椎动物，但在二叠纪大灭绝后衰落。",
      after: "K-Pg大灭绝后，哺乳动物迅速辐射演化为数千种，占据了恐龙留下的生态位。",
    },
    connections: ["恐龙崛起", "K-Pg 大灭绝", "人类与黑猩猩分化"],
    openQuestions: [
      "哺乳动物的关键特征（温血、毛发、乳腺）是在何时以何种顺序演化出来的？",
      "恐龙时代的小型哺乳动物到底有多大的多样性？",
    ],
    deepReading: {
      introduction:
        "最早的哺乳动物出现在约2亿年前的三叠纪晚期，与恐龙几乎同时出现。但在恐龙统治的1.65亿年中，哺乳动物一直保持着小型、夜行的生活方式，直到K-Pg大灭绝为它们创造了机会。",
      sections: [
        {
          title: "恐龙阴影下的生存策略",
          content: [
            "中生代的哺乳动物体型大多如鼠或鼩鼱，体重不超过几公斤。它们采取了与恐龙不同的生存策略：夜间活动以避开恐龙的捕食压力、挖掘洞穴以获得保护、以及发展出更高效的听觉和嗅觉系统来在黑暗中导航。",
            "尽管体型受到限制，中生代的哺乳动物在生态多样性上并不逊色。化石证据表明，它们包括食虫型、食草型、食鱼型甚至滑翔型。最近在中国发现的贼兽类化石显示，某些中生代哺乳动物已经具备了类似现代飞鼠的滑翔膜。",
          ],
        },
        {
          title: "哺乳动物的关键创新",
          content: [
            "在恐龙的“阴影”下，哺乳动物演化出了一系列关键创新：温血代谢（维持恒定的体温）、毛发（保温）、乳腺（为幼崽提供营养）、三块听小骨（提高听觉灵敏度）以及高度发达的大脑皮层（增强学习和记忆能力）。",
            "这些创新在当时看起来并没有给哺乳动物带来显著的竞争优势，但在K-Pg大灭绝之后，它们成为了哺乳动物快速辐射演化的关键。温血代谢使哺乳动物能够在各种气候条件下活动，发达的大脑则支持了更复杂的社会行为和学习能力。",
          ],
        },
      ],
      citations: [
        {
          id: "luo-2007",
          authors: "Luo, Z.X.",
          year: 2007,
          title: "Transformation and diversification in early mammal evolution",
          journal: "Nature",
          doi: "10.1038/nature06277",
        },
        {
          id: "kemp-2005",
          authors: "Kemp, T.S.",
          year: 2005,
          title: "The Origin and Evolution of Mammals",
          journal: "Oxford University Press",
        },
      ],
    },
  },
  {
    id: "archaeopteryx",
    era: "1.5 亿年前",
    event: "始祖鸟",
    detail: "侏罗纪晚期，始祖鸟展示了恐龙向鸟类演化的过渡形态。",
    accent: "#98c379",
    category: "animals",
    significance: "始祖鸟是演化论最有力的化石证据之一，证明了鸟类是从兽脚类恐龙演化而来。",
    keyFigures: [],
    context: {
      before: "兽脚类恐龙已经演化出了羽毛，可能用于保温或展示，而非飞行。",
      after: "白垩纪，真正的鸟类多样化发展，与非鸟类恐龙共存直到K-Pg大灭绝。",
    },
    connections: ["恐龙崛起", "K-Pg 大灭绝"],
    openQuestions: [
      "飞行能力是单次起源还是多次独立起源？",
      "始祖鸟是否能进行主动飞行，还是只能滑翔？",
    ],
    deepReading: {
      introduction:
        "始祖鸟是已知最著名的过渡化石之一，生活在约1.5亿年前的晚侏罗世。它同时拥有爬行动物和鸟类的特征，完美展示了演化过程中“中间形态”的概念。",
      sections: [
        {
          title: "过渡特征",
          content: [
            "始祖鸟的化石展示了爬行动物和鸟类特征的完美结合。它拥有羽毛和翅膀（鸟类特征），但也拥有带牙齿的颚部、长而骨化的尾椎以及前肢上的爪（爬行动物特征）。这种“镶嵌演化”的特征使始祖鸟成为理解鸟类起源的关键。",
            "始祖鸟的羽毛结构与现代鸟类几乎相同，具有不对称的飞羽，暗示它至少具备一定的飞行或滑翔能力。但它的骨骼结构仍保留了大量恐龙特征，如缺乏现代鸟类的龙骨突（飞行肌肉的附着点）和愈合的尾综骨。",
          ],
        },
        {
          title: "鸟类起源的争论",
          content: [
            "始祖鸟的发现（1861年）正值达尔文发表《物种起源》之后不久，为演化论提供了有力的支持。关于鸟类起源的争论持续了一个多世纪：鸟类是起源于恐龙还是其他爬行动物？中国发现的大量带羽毛恐龙化石（如中华龙鸟、尾羽龙）最终证明了鸟类确实是从兽脚类恐龙演化而来。",
            "今天的鸟类是唯一存活的恐龙后代。从这个意义上说，恐龙并没有完全灭绝——每一只麻雀、每一只鸽子，都是活着的恐龙。这一认识彻底改变了我们对鸟类的理解，也深化了我们对演化连续性的认识。",
          ],
        },
      ],
      citations: [
        {
          id: "wellnhofer-2009",
          authors: "Wellnhofer, P.",
          year: 2009,
          title: "Archaeopteryx: The Icon of Evolution",
          journal: "Verlag Dr. Friedrich Pfeil",
        },
        {
          id: "xu-2014",
          authors: "Xu, X. et al.",
          year: 2014,
          title: "An Integrative Approach to Understanding Bird Origins",
          journal: "Science",
          doi: "10.1126/science.1253293",
        },
      ],
    },
  },
  {
    id: "angiosperms",
    era: "1.3 亿年前",
    event: "被子植物绽放",
    detail: "开花植物出现，迅速改变了陆地生态系统，与传粉昆虫共同演化。",
    accent: "#4a9e6f",
    category: "plants",
    significance: "被子植物的出现是陆地生态系统的一次革命，它们与传粉者的协同演化创造了地球上最多样化的生物群落。",
    keyFigures: [],
    context: {
      before: "中生代的陆地植被以裸子植物（松柏类、苏铁类）为主，风力是主要的传粉方式。",
      after: "白垩纪晚期，被子植物成为陆地植被的优势类群，与昆虫、鸟类和哺乳动物建立了复杂的相互作用网络。",
    },
    connections: ["植物登陆", "K-Pg 大灭绝"],
    openQuestions: [
      "被子植物的起源地点和时间是否如分子钟研究所示？",
      "为什么被子植物能够在竞争中击败裸子植物？",
    ],
    deepReading: {
      introduction:
        "被子植物（开花植物）的出现是陆地生态系统演化中最重大的事件之一。约1.3亿年前，最早的被子植物出现，它们迅速多样化并改变了陆地景观，成为地球上最多样化的植物类群。",
      sections: [
        {
          title: "花的演化与传粉协同",
          content: [
            "花是被子植物最显著的创新。花朵的颜色、形状、气味和花蜜都是为了吸引传粉者而演化出来的。这种植物与传粉者之间的协同演化关系，极大地提高了繁殖效率，也促进了物种多样性的快速增加。",
            "不同类型的传粉者（蜜蜂、蝴蝶、蜂鸟、蝙蝠）驱动了花朵形态的多样化。例如，兰花与特定传粉者之间的专一性关系，导致了兰花科成为被子植物中物种最丰富的科之一。这种协同演化也反过来塑造了传粉者的感觉系统和行为模式。",
          ],
        },
        {
          title: "果实与种子传播",
          content: [
            "果实是被子植物的另一关键创新。果实包裹和保护种子，并通过颜色、味道和营养吸引动物来传播种子。这种“以食物换传播”的策略极大地扩展了被子植物的地理分布范围，使它们能够快速占领新的栖息地。",
            "被子植物的成功还归功于高效的维管组织（导管分子）、宽阔的叶片（增加光合作用面积）和落叶习性（在不利季节保存资源）。这些特征使被子植物能够在多种气候条件下繁盛，从热带雨林到温带草原再到高寒草甸。",
          ],
        },
      ],
      citations: [
        {
          id: "friis-2011",
          authors: "Friis, E.M. et al.",
          year: 2011,
          title: "Early Flowers and Angiosperm Evolution",
          journal: "Columbia University Press",
        },
        {
          id: "sun-2002",
          authors: "Sun, G. et al.",
          year: 2002,
          title: "Archaefructaceae, a new basal angiosperm family",
          journal: "Science",
          doi: "10.1126/science.1069439",
        },
      ],
    },
  },
  {
    id: "kpg-extinction",
    era: "6600 万年前",
    event: "K-Pg 大灭绝",
    detail: "小行星撞击尤卡坦半岛，恐龙（非鸟类）灭绝。哺乳动物的时代开始了。",
    accent: "#d85a5a",
    category: "animals",
    significance: "K-Pg大灭绝终结了恐龙的统治，为哺乳动物和鸟类的辐射演化创造了条件，间接导致了人类的出现。",
    keyFigures: [],
    context: {
      before: "白垩纪晚期，恐龙仍然是陆地生态系统的统治者，但火山活动和海平面变化已经给生态系统带来了压力。",
      after: "新生代早期，哺乳动物迅速辐射演化为鲸鱼、蝙蝠、灵长类等多个类群，占据了恐龙留下的生态位。",
    },
    connections: ["恐龙崛起", "哺乳动物出现", "鲸鱼回到海洋", "人类与黑猩猩分化"],
    openQuestions: [
      "如果小行星没有撞击地球，恐龙是否会自行灭绝？",
      "非鸟类恐龙的灭绝是撞击的直接后果还是多种因素的叠加？",
    ],
    deepReading: {
      introduction:
        "K-Pg（白垩纪-古近纪）大灭绝发生在约6600万年前，是地球历史上最著名的灭绝事件之一。一颗直径约10公里的小行星撞击了墨西哥尤卡坦半岛，引发了全球性的环境灾难，终结了非鸟类恐龙长达1.65亿年的统治。",
      sections: [
        {
          title: "撞击事件",
          content: [
            "希克苏鲁伯小行星以约20公里/秒的速度撞击地球，释放的能量相当于100亿颗广岛原子弹。撞击产生的巨大海啸、全球性野火和尘埃云在数小时内席卷全球。尘埃和烟雾遮蔽了阳光，导致全球温度骤降，光合作用中断长达数月甚至数年。",
            "撞击还引发了大规模的火山活动和酸雨。硫化物气溶胶导致的酸雨使海洋表层酸化，对海洋生态系统造成了毁灭性打击。撞击点附近的生物几乎瞬间灭绝，而远离撞击点的生物则在随后的数月至数年内逐渐消亡。",
          ],
        },
        {
          title: "灭绝与新生",
          content: [
            "K-Pg大灭绝消灭了约75%的物种，包括所有非鸟类恐龙、翼龙、沧龙和菊石。幸存者包括哺乳动物、鸟类、鳄鱼、海龟和硬骨鱼类。这些幸存者体型较小、食性广泛、能够在地下或水中躲避灾难。",
            "灭绝后的世界为幸存者提供了前所未有的机会。在恐龙消失后的数百万年内，哺乳动物从鼠大的小型动物迅速演化为鲸鱼、大象、马等多样化的类群。灵长类也在这一时期开始出现，最终演化出了人类。从这个意义上说，没有K-Pg大灭绝，就不会有人类的出现。",
          ],
        },
      ],
      citations: [
        {
          id: "schulte-2010",
          authors: "Schulte, P. et al.",
          year: 2010,
          title: "The Chicxulub asteroid impact and mass extinction at the Cretaceous-Paleogene boundary",
          journal: "Science",
          doi: "10.1126/science.1177265",
        },
        {
          id: "longrich-2011",
          authors: "Longrich, N.R. et al.",
          year: 2011,
          title: "Mass extinction of birds at the Cretaceous-Paleogene (K-Pg) boundary",
          journal: "Proceedings of the National Academy of Sciences",
          doi: "10.1073/pnas.1110395108",
        },
      ],
    },
  },
  {
    id: "whale-return",
    era: "5500 万年前",
    event: "鲸鱼回到海洋",
    detail: "陆生的偶蹄目动物重新进入海洋，演化为今天的鲸鱼和海豚。",
    accent: "#5a9ad8",
    category: "animals",
    significance: "鲸鱼的演化是生物适应性演化的经典案例，展示了哺乳动物从陆地回到海洋的完整过程。",
    keyFigures: [],
    context: {
      before: "K-Pg大灭绝后，哺乳动物迅速辐射演化，偶蹄目动物在亚洲和非洲多样化发展。",
      after: "鲸鱼成为海洋中的顶级掠食者和滤食者，对全球营养循环产生了深远影响。",
    },
    connections: ["K-Pg 大灭绝", "人类与黑猩猩分化"],
    openQuestions: [
      "鲸鱼从陆生到完全水生的转变经历了多少个中间阶段？",
      "回声定位能力是在鲸鱼演化的哪个阶段出现的？",
    ],
    deepReading: {
      introduction:
        "鲸鱼的演化是生物演化史上最引人入胜的故事之一。约5500年前，一群陆生的偶蹄目动物开始进入海洋生活，经过数千万年的演化，它们完全适应了水生环境，成为地球上最大的动物。",
      sections: [
        {
          title: "从陆地到海洋",
          content: [
            "已知最早的鲸鱼祖先——巴基鲸（Pakicetus），生活在约5300万年前的巴基斯坦。巴基鲸外貌类似狼，四肢适合奔跑，但它的耳骨结构已经显示出适应水下听觉的特征。随后的演化阶段包括走鲸（Ambulocetus，既能行走又能游泳）和龙王鲸（Basilosaurus，已经完全水生）。",
            "鲸鱼演化过程中经历了深刻的解剖学变化：后肢退化、前肢演化为鳍状肢、尾部演化为水平尾鳍、鼻孔从吻部前端移到头顶（形成喷气孔）、身体呈流线型以减少水阻。这些变化在化石记录中有着清晰的序列，是演化论最有力的证据之一。",
          ],
        },
        {
          title: "鲸鱼对海洋生态的影响",
          content: [
            "鲸鱼在海洋生态系统中扮演着关键角色。须鲸（如蓝鲸）通过滤食浮游生物，将深海的营养物质带到表层（“鲸鱼泵”效应），促进了海洋初级生产力。抹香鲸则通过深潜捕食，将碳从表层输送到深海（“鲸鱼升降机”效应）。",
            "鲸鱼的排泄物富含铁和氮，是海洋浮游植物的重要营养来源。最近的研究表明，鲸鱼对全球海洋生产力的贡献可能远超此前的估计。保护鲸鱼种群不仅是为了生物多样性，也是为了维持海洋生态系统的健康。",
          ],
        },
      ],
      citations: [
        {
          id: "thewissen-2007",
          authors: "Thewissen, J.G.M. et al.",
          year: 2007,
          title: "Whales originated from aquatic artiodactyls in the Eocene epoch of India",
          journal: "Nature",
          doi: "10.1038/nature06343",
        },
        {
          id: "roman-2014",
          authors: "Roman, J. et al.",
          year: 2014,
          title: "Whales as marine ecosystem engineers",
          journal: "Frontiers in Ecology and the Environment",
          doi: "10.1890/130220",
        },
      ],
    },
  },
  {
    id: "human-chimp-split",
    era: "700 万年前",
    event: "人类与黑猩猩分化",
    detail: "在非洲，人类祖先与黑猩猩祖先走上不同的演化道路。",
    accent: "#a88adf",
    category: "animals",
    significance: "人猿分化开启了人类演化的独特历程，最终导致了智人和人类文明的出现。",
    keyFigures: [],
    context: {
      before: "灵长类在新生代多样化发展，大型类人猿在非洲和亚洲繁盛。",
      after: "人类祖先经历了直立行走、脑容量增大、工具使用等关键创新，最终演化为智人。",
    },
    connections: ["哺乳动物出现", "智人出现"],
    openQuestions: [
      "人猿分化的确切时间和地点是否已经确定？",
      "气候变化（非洲干旱化）在人猿分化中扮演了什么角色？",
    ],
    deepReading: {
      introduction:
        "人类与黑猩猩的共同祖先约在700-600万年前分化为两个不同的谱系。这一分化事件开启了人类独特的演化历程，最终导致了能够思考自身存在的物种的出现。",
      sections: [
        {
          title: "分化的时间与原因",
          content: [
            "分子钟研究表明，人类和黑猩猩的共同祖先生活在约700-600万年前。最早的可能属于人科的化石——撒海尔人（Sahelanthropus）和地猿（Ardipithecus）——也来自这一时期。这些早期人科动物已经开始显示出与黑猩猩不同的特征，如更垂直的面部和更小的犬齿。",
            "人猿分化的原因可能与非洲东部的气候变化有关。约700万年前，东非大裂谷的形成改变了区域气候，森林逐渐被稀树草原取代。这种环境变化可能促使人类祖先演化出直立行走的能力，以便在开阔的环境中更高效地移动和觅食。",
          ],
        },
        {
          title: "直立行走——关键的第一步",
          content: [
            "直立行走被认为是人类演化中最早的关键创新之一。露西（Australopithecus afarensis，约320万年前）的骨骼化石显示，她已经完全适应了两足行走，但脑容量仍与黑猩猩相当。这表明直立行走的出现早于脑容量的显著增大。",
            "直立行走的演化优势可能包括：更高效的长距离移动、解放双手以携带食物和使用工具、以及减少阳光直射面积以在热带草原上保持体温。这些优势共同促进了人类祖先在新环境中的生存和繁衍。",
          ],
        },
      ],
      citations: [
        {
          id: "brunet-2002",
          authors: "Brunet, M. et al.",
          year: 2002,
          title: "A new hominid from the Upper Miocene of Chad, Central Africa",
          journal: "Nature",
          doi: "10.1038/nature00879",
        },
        {
          id: "white-2009",
          authors: "White, T.D. et al.",
          year: 2009,
          title: "Ardipithecus ramidus and the paleobiology of early hominids",
          journal: "Science",
          doi: "10.1126/science.1175802",
        },
      ],
    },
  },
  {
    id: "homo-sapiens",
    era: "30 万年前",
    event: "智人出现",
    detail: "解剖学意义上的现代智人在非洲出现，最终成为地球上最具影响力的物种。",
    accent: "#4a9e6f",
    category: "animals",
    significance: "智人的出现标志着地球演化进入了一个全新的阶段——一个物种能够理解并主动改变整个星球的命运。",
    keyFigures: [],
    context: {
      before: "人属在非洲经历了多次物种分化，直立人、海德堡人等先后出现。",
      after: "智人扩散到全球，经历了认知革命和农业革命，创造了人类文明。",
    },
    connections: ["人类与黑猩猩分化", "全新世开始"],
    openQuestions: [
      "智人与其他古人类（尼安德特人、丹尼索瓦人）的杂交对现代人有什么影响？",
      "是什么赋予了智人独特的认知能力——语言、抽象思维和文化积累？",
    ],
    deepReading: {
      introduction:
        "智人（Homo sapiens）约30万年前在非洲出现，是人属中唯一幸存的物种。凭借独特的认知能力、语言和文化，智人从一个非洲物种迅速扩散到全球，深刻改变了地球的生态系统。",
      sections: [
        {
          title: "起源与扩散",
          content: [
            "解剖学意义上的现代智人最早出现在约30万年前的非洲。摩洛哥的杰贝尔·伊古德化石（约30万年前）是目前已知最早的智人化石，但这些早期智人的面部和脑颅形态与现代人仍有差异。完全现代形态的智人约在20万年前出现。",
            "智人于约7-5万年前离开非洲，沿着海岸线和内陆通道扩散到亚洲、澳大利亚和欧洲。约1.5万年前，智人通过白令陆桥到达美洲。智人的扩散伴随着与其他古人类的多次杂交事件——现代非洲以外人群的基因组中约含1-4%的尼安德特人DNA。",
          ],
        },
        {
          title: "认知革命与文化积累",
          content: [
            "约7万年前，智人经历了一场“认知革命”，开始使用符号思维、抽象语言和复杂的工具技术。这一转变使智人能够进行大规模合作（远超血缘关系的社会网络）、积累文化知识（通过语言传承经验）和创造象征性文化（洞穴艺术、装饰品）。",
            "认知革命的核心可能是语言能力的飞跃。与其他动物的沟通系统不同，人类语言具有无限的组合性——有限的词汇和语法规则可以组合出无限的句子。这种能力使智人能够讨论抽象概念、规划未来和讲述虚构的故事，从而建立起超越血缘的社会组织。",
          ],
        },
      ],
      citations: [
        {
          id: "hublin-2017",
          authors: "Hublin, J.J. et al.",
          year: 2017,
          title: "New fossils from Jebel Irhoud and the pan-African origin of Homo sapiens",
          journal: "Nature",
          doi: "10.1038/nature22336",
        },
        {
          id: "harari-2011",
          authors: "Harari, Y.N.",
          year: 2011,
          title: "Sapiens: A Brief History of Humankind",
          journal: "Harper",
        },
        {
          id: "reich-2018",
          authors: "Reich, D.",
          year: 2018,
          title: "Who We Are and How We Got Here",
          journal: "Pantheon Books",
        },
      ],
    },
  },
  {
    id: "holocene",
    era: "1.17 万年前",
    event: "全新世开始",
    detail: "末次冰期结束，农业革命即将到来，人类将永久改变地球的面貌。",
    accent: "#4a9e6f",
    category: "earth",
    significance: "全新世的气候稳定为农业革命和人类文明的诞生提供了必要条件。",
    keyFigures: [],
    context: {
      before: "末次冰期持续了约10万年，海平面比现在低约120米，人类以狩猎采集为生。",
      after: "农业革命（约1.2万年前）使人类定居成为可能，人口爆炸式增长，城市和国家相继出现。",
    },
    connections: ["智人出现"],
    openQuestions: [
      "全新世的气候稳定是偶然事件还是地球气候系统的内在特征？",
      "人类活动是否已经使地球进入了一个新的地质时代——人类世？",
    ],
    deepReading: {
      introduction:
        "全新世始于约1.17万年前，是地球最近的一个地质时代。末次冰期的结束带来了温暖稳定的气候，为人类文明的诞生创造了条件。全新世也是人类对地球影响急剧加速的时期。",
      sections: [
        {
          title: "气候稳定与农业起源",
          content: [
            "全新世的气候相比更新世更加稳定和温暖。这种稳定性使人类能够驯化动植物、发展农业和建立永久定居点。最早的农业实践出现在约1.2万年前的新月沃地（小麦、大麦、绵羊、山羊），随后在中国（水稻、粟）、中美洲（玉米）和非洲（高粱）独立发展。",
            "农业革命是人类历史上最深刻的转变之一。定居生活使人口密度大幅增加，社会分工和专业化成为可能。文字、数学、法律和宗教等文化创新相继出现，人类从游牧的狩猎采集者转变为定居的文明建造者。",
          ],
        },
        {
          title: "人类世的开始",
          content: [
            "全新世后期，人类对地球的影响已经达到了地质尺度。森林砍伐、农业扩张、城市化和工业化改变了地球表面的大部分区域。大气中二氧化碳和甲烷浓度的急剧上升（主要由化石燃料燃烧和农业活动导致）引发了全球变暖。",
            "许多科学家认为，人类活动的影响已经足以在地质记录中留下永久性的痕迹，因此提议将当前时代定义为“人类世”（Anthropocene）。人类世的开始时间存在争议——有人认为始于农业革命（约8000年前），有人认为始于工业革命（约200年前），还有人认为始于核武器试验（1945年后）。",
          ],
        },
      ],
      citations: [
        {
          id: "crutzen-2000",
          authors: "Crutzen, P.J. & Stoermer, E.F.",
          year: 2000,
          title: "The 'Anthropocene'",
          journal: "Global Change Newsletter",
        },
        {
          id: "diamond-1997",
          authors: "Diamond, J.",
          year: 1997,
          title: "Guns, Germs, and Steel: The Fates of Human Societies",
          journal: "W.W. Norton & Company",
        },
        {
          id: "richerson-2001",
          authors: "Richerson, P.J. et al.",
          year: 2001,
          title: "Was the agricultural crisis a catastrophe or a blessing?",
          journal: "Evolutionary Anthropology",
          doi: "10.1002/evan.10018",
        },
      ],
    },
  },
  {
    id: "first-primates",
    era: "5500 万年前",
    event: "灵长类出现",
    detail: "最早的灵长类动物在热带森林中出现，拥有对握的手和立体视觉。",
    accent: "#c8a45a",
    category: "animals",
    significance: "灵长类的演化最终导致了人类的出现，是地球生命史上最重大的事件之一。",
    keyFigures: [],
    context: {
      before: "K-Pg大灭绝后，哺乳动物迅速辐射演化，多种类群争夺空出的生态位。",
      after: "灵长类在新生代多样化为原猴类和类人猿，最终演化出了人类。",
    },
    connections: ["K-Pg 大灭绝", "人类与黑猩猩分化"],
    openQuestions: [
      "灵长类的关键特征（立体视觉、对握手指、大拇指）是在树冠环境中还是在地面环境中演化出来的？",
      "灵长类的起源地点是亚洲还是非洲？",
    ],
    deepReading: {
      introduction:
        "灵长类是哺乳动物中最多样化的目之一，包括狐猴、猴、猿和人类。最早的灵长类出现在约5500万年前的始新世早期，当时全球气候温暖，热带森林广泛分布。",
      sections: [
        {
          title: "灵长类的关键特征",
          content: [
            "灵长类区别于其他哺乳动物的关键特征包括：对握的手和脚（能够抓握树枝和操纵物体）、面向前方的眼睛（提供立体视觉，有利于在树冠中判断距离）、相对较大的大脑（支持更复杂的认知和社会行为）以及扁平的指甲（取代了爪子，便于精细操作）。",
            "这些特征最初可能是为了适应树栖生活而演化出来的。立体视觉帮助灵长类在树枝间跳跃时判断距离，对握的手和脚使它们能够在树冠中灵活移动，较大的大脑则支持了复杂的空间记忆和社会互动。",
          ],
        },
        {
          title: "灵长类的多样化",
          content: [
            "灵长类在新生代经历了多次辐射演化。始新世时期，灵长类广泛分布于北美、欧洲和亚洲。随着全球气候变冷和热带森林退缩，灵长类在北半球大部分地区灭绝，但在热带地区（非洲、南亚和南美）继续繁盛。",
            "约2500万年前，类人猿从旧世界猴中分化出来，在非洲和亚洲多样化。约700万年前，人类祖先从类人猿中分化，开启了独特的演化历程。今天，灵长类面临严重的生存危机——超过60%的灵长类物种被列为受威胁物种。",
          ],
        },
      ],
      citations: [
        {
          id: "bloch-2007",
          authors: "Bloch, J.I. et al.",
          year: 2007,
          title: "New Paleocene skeletons and the relationship of plesiadapiforms to crown-clade primates",
          journal: "Proceedings of the National Academy of Sciences",
          doi: "10.1073/pnas.0704611104",
        },
      ],
    },
  },
  {
    id: "first-grasses",
    era: "3500 万年前",
    event: "禾本科植物出现",
    detail: "草地开始扩展，改变了陆地生态系统，与食草动物共同演化。",
    accent: "#98c379",
    category: "plants",
    significance: "草原的兴起重塑了全球生态系统，推动了食草哺乳动物的多样化，最终为人类祖先提供了栖息地。",
    keyFigures: [],
    context: {
      before: "新生代早期的陆地植被以森林为主，气候温暖湿润。",
      after: "草原在中新世大幅扩展，马、象、牛等食草动物随之多样化，人类祖先也最终在草原上演化。",
    },
    connections: ["被子植物绽放", "人类与黑猩猩分化"],
    openQuestions: [
      "禾本科的起源地点和具体时间仍有争议——化石花粉记录与分子钟估算存在差异。",
      "草原的扩展是由气候变化驱动还是由食草动物的取食压力驱动？",
    ],
    deepReading: {
      introduction:
        "禾本科（禾草）是被子植物中最重要的科之一，包括小麦、水稻、玉米等粮食作物的野生祖先。禾本科的出现和草原的扩展深刻改变了陆地生态系统的面貌，是新生代最重大的植被变化之一。",
      sections: [
        {
          title: "禾草的适应性",
          content: [
            "禾本科植物演化出了一系列独特的适应性特征：叶片基部的分生组织使叶片可以持续生长而不被食草动物彻底破坏；硅化的细胞壁增强了叶片的耐磨性；密集的根系网络能够耐受干旱和火灾；地下茎使植物能够从火灾中迅速恢复。",
            "这些特征使禾草能够在干旱、频繁火灾和食草压力等恶劣条件下繁盛。禾草的C4光合作用途径（约3000万年前演化出来）使它们在高温和低二氧化碳条件下比大多数树木更具竞争优势，加速了草原在热带地区的扩展。",
          ],
        },
        {
          title: "草原与动物的协同演化",
          content: [
            "草原的兴起催生了一批新型食草动物。马从森林中的小型多趾动物演化为草原上的大型单蹄动物，牙齿变得更长更耐磨以咀嚼含硅的禾草。牛科动物（包括羚羊、野牛）演化出了反刍消化系统，能够更高效地从禾草中提取营养。",
            "草原也塑造了人类演化的环境。约700万年前，非洲东部的气候变化导致森林退缩、草原扩展，人类祖先被迫适应开阔的草原环境。直立行走可能是为了在草原上更高效地移动和觅食而演化出来的。从这个意义上说，没有草原就不会有人类。",
          ],
        },
      ],
      citations: [
        {
          id: "stebbins-1981",
          authors: "Stebbins, G.L.",
          year: 1981,
          title: "Coevolution of grasses and herbivores",
          journal: "Annals of the Missouri Botanical Garden",
          doi: "10.2307/2398862",
        },
      ],
    },
  },
  {
    id: "first-stone-tools",
    era: "330 万年前",
    event: "石器出现",
    detail: "最早的人族成员开始制造石器，标志着技术文化的诞生。",
    accent: "#c8a45a",
    category: "animals",
    significance: "工具制造是人类认知能力的外在表现，开启了技术积累和文化传承的进程。",
    keyFigures: [],
    context: {
      before: "人族成员已能直立行走，脑容量略有增大，但尚未使用工具。",
      after: "石器技术不断进步，从奥尔德万文化到阿舍利文化，最终演化出了复合工具和符号系统。",
    },
    connections: ["人类与黑猩猩分化", "智人出现"],
    openQuestions: [
      "最早的石器是哪个人族物种制造的——南方古猿还是早期人属？",
      "石器制造是否需要语言来传授技艺？",
    ],
    deepReading: {
      introduction:
        "石器的出现是人类演化史上的关键里程碑。2015年在肯尼亚发现的洛梅克维石器（约330万年前）是目前已知最古老的石器，比最早的人属化石还要古老，可能由南方古猿制造。",
      sections: [
        {
          title: "最早的石器技术",
          content: [
            "洛梅克维石器是一组粗糙的石片和石核，通过对打方式从母岩上剥离。虽然技术简单，但制造这些石器需要对岩石性质的理解、对打击角度的控制以及双手的精细协调。这些认知要求暗示制造者已具备相当发达的大脑功能。",
            "约260万年前的奥尔德万石器（以坦桑尼亚的奥杜瓦伊峡谷命名）代表了更成熟的石器技术。奥尔德万石器以简单但高效的方式从石核上剥下锋利的石片，用于切割肉类和刮削植物材料。这些工具使早期人属能够获取更多的动物性食物，可能促进了脑容量的增大。",
          ],
        },
        {
          title: "技术与认知的协同演化",
          content: [
            "石器制造技术的不断进步反映了认知能力的持续提升。约176万年前出现的阿舍利手斧是一种精心制作的对称工具，需要事先规划和标准化的操作流程。这种「心理模板」的存在暗示制造者已具备抽象思维和教学能力。",
            "石器技术的传承依赖于社会学习——年轻个体通过观察和模仿年长个体来习得技艺。这一过程需要注意力共享、示范能力和纠错机制，与语言的基础能力相似。从这个意义上说，石器制造可能是语言演化的前奏。",
          ],
        },
      ],
      citations: [
        {
          id: "harmand-2015",
          authors: "Harmand, S. et al.",
          year: 2015,
          title: "3.3-million-year-old stone tools from Lomekwi 3, West Turkana, Kenya",
          journal: "Nature",
          doi: "10.1038/nature14464",
        },
      ],
    },
  },
  {
    id: "first-fire",
    era: "100 万年前",
    event: "人类用火",
    detail: "人属成员开始控制和使用火，改变了饮食方式和社会结构。",
    accent: "#d85a5a",
    category: "animals",
    significance: "火的使用是人类掌握的第一种自然力量，从根本上改变了人类的生存方式和社会组织。",
    keyFigures: [],
    context: {
      before: "早期人属以生食为主，食物加工方式有限，社会互动主要发生在白天。",
      after: "烹饪使食物更易消化、更安全，篝火旁的社交时间促进了语言和文化的发展。",
    },
    connections: ["石器出现", "智人出现"],
    openQuestions: [
      "人类是先学会利用自然火还是先学会生火？",
      "烹饪对人类大脑的增大到底有多大贡献？",
    ],
    deepReading: {
      introduction:
        "火的使用是人类演化史上最具变革性的创新之一。最早的用火证据来自南非的斯瓦特克朗斯洞穴（约100万年前）和肯尼亚的切索万贾遗址（约140万年前），但对火的有意识控制可能在约40万年前才完全确立。",
      sections: [
        {
          title: "从利用到控制",
          content: [
            "人类用火可能经历了三个阶段：首先是利用自然火（如雷击引发的野火）获取烤熟的食物；然后是保存和维护自然火种，使其不灭；最后是学会人工取火（通过摩擦或击打）。前两个阶段可能发生在约100万年前，而人工取火的确立可能晚至约40万年前。",
            "火的使用带来了立竿见影的好处：烹饪使肉类和块茎更易咀嚼和消化，提高了营养吸收效率；火光驱赶了夜间掠食者，扩大了安全活动的时间和空间；火还提供了温暖，使人类能够在更寒冷的环境中生存。",
          ],
        },
        {
          title: "烹饪与人类演化",
          content: [
            "哈佛大学人类学家理查德·兰厄姆提出了「烹饪假说」，认为烹饪是推动人类演化的关键力量。烹饪使食物更易消化，释放了更多热量，支持了更大的大脑（大脑仅占体重的2%，却消耗20%的能量）。烹饪还减少了咀嚼时间，使人类能够将更多时间用于社交和文化活动。",
            "篝火旁的社交时间可能是语言和文化发展的重要催化剂。在火光的保护下，人类群体可以在夜间聚在一起，进行更长时间的交流、故事讲述和技术传授。一些研究者认为，人类叙事能力（讲故事）可能起源于篝火旁的夜间社交。",
          ],
        },
      ],
      citations: [
        {
          id: "wrangham-2009",
          authors: "Wrangham, R.",
          year: 2009,
          title: "Catching Fire: How Cooking Made Us Human",
          journal: "Basic Books",
        },
      ],
    },
  },
  {
    id: "first-art",
    era: "10 万年前",
    event: "艺术的诞生",
    detail: "最早的象征性行为出现——赭石颜料的使用、贝壳珠饰和洞穴壁画。",
    accent: "#a88adf",
    category: "animals",
    significance: "艺术的出现标志着人类认知能力的根本性飞跃——抽象思维、象征表达和审美意识的诞生。",
    keyFigures: [],
    context: {
      before: "智人已具备基本的语言和工具能力，但缺乏象征性的表达方式。",
      after: "艺术传统不断丰富，从洞壁画到雕塑，最终演化为文字和书写系统。",
    },
    connections: ["智人出现", "走出非洲"],
    openQuestions: [
      "尼安德特人是否也具备艺术创作能力？布隆博斯洞穴的赭石刻画是否由智人创作？",
      "艺术的出现是否与语言能力的突变有关？",
    ],
    deepReading: {
      introduction:
        "艺术的诞生是人类认知演化中最引人注目的里程碑之一。最早的象征性行为证据来自约10万年前的南非布隆博斯洞穴——刻有几何纹样的赭石块和穿孔贝壳珠饰，暗示智人已具备抽象思维和符号表达能力。",
      sections: [
        {
          title: "象征性思维的起源",
          content: [
            "象征性思维是指使用一个事物（符号）来代表另一个事物（意义）的能力。赭石颜料的使用、身体装饰品和刻划纹样都是象征性行为的表现。这些行为需要创作者和观看者共享一套符号系统——本质上是早期的「语言」。",
            "南非布隆博斯洞穴发现的赭石块（约10万年前）上刻有交叉网格纹样，是已知最古老的抽象艺术。肯尼亚的皮克波拉遗址（约10万年前）发现了经过加工的鸵鸟蛋壳珠饰。这些发现将象征性行为的起源推到了远早于智人走出非洲的时间。",
          ],
        },
        {
          title: "洞穴艺术与文化爆发",
          content: [
            "约4万年前，欧洲出现了壮观的洞穴艺术传统。法国肖维岩洞（约3.6万年前）保存了数百幅精美的动物壁画，包括马、犀牛、狮子和猛犸象。西班牙阿尔塔米拉洞穴（约3.5万年前）以其色彩丰富的野牛壁画闻名于世。",
            "洞穴艺术不仅仅是装饰——它可能承载着宗教仪式、狩猎魔法、图腾崇拜或知识传承的功能。一些洞穴壁画中的动物形象极为准确，展现了创作者对动物行为的深刻观察。这些艺术传统证明，3万多年前的人类已经具备了与现代人相同的认知能力。",
          ],
        },
      ],
      citations: [
        {
          id: "henshilwood-2002",
          authors: "Henshilwood, C.S. et al.",
          year: 2002,
          title: "Emergence of modern human behavior: Middle Stone Age engravings from South Africa",
          journal: "Science",
          doi: "10.1126/science.1067575",
        },
        {
          id: "chwitzgabe-2009",
          authors: "Chauvet, J.M. et al.",
          year: 1996,
          title: "Dawn of Art: The Chauvet Cave",
          journal: "Harry N. Abrams",
        },
      ],
    },
  },
  {
    id: "out-of-africa",
    era: "7 万年前",
    event: "走出非洲",
    detail: "智人开始大规模离开非洲，沿陆路和海路扩散到亚洲、欧洲和大洋洲。",
    accent: "#a88adf",
    category: "animals",
    significance: "走出非洲是人类成为全球性物种的关键事件，智人在扩散过程中与其他古人类多次杂交。",
    keyFigures: [],
    context: {
      before: "智人在非洲经历了认知革命，获得了语言、符号思维和复杂工具技术。",
      after: "智人扩散到除南极洲外的所有大陆，在约1.5万年前到达美洲，最终成为地球上分布最广的大型哺乳动物。",
    },
    connections: ["智人出现", "农业革命"],
    openQuestions: [
      "智人走出非洲是一次大规模迁徙还是多次小规模扩散？",
      "智人是否通过海岸线快速扩散（沿海路线假说）还是主要通过内陆通道？",
    ],
    deepReading: {
      introduction:
        "智人走出非洲是人类演化史上最重大的迁徙事件。约7-5万年前，智人开始离开非洲大陆，沿着多条路线扩散到欧亚大陆和大洋洲，最终到达美洲。在这一过程中，智人与其他古人类（尼安德特人、丹尼索瓦人）多次杂交。",
      sections: [
        {
          title: "扩散的路线与时间",
          content: [
            "基因组学研究表明，走出非洲的智人可能在约7万年前通过非洲之角（今索马里和埃塞俄比亚）跨越红海到达阿拉伯半岛。随后，一部分人沿海岸线向东扩散，约6.5万年前到达澳大利亚（需要跨越海洋）；另一部分人向北进入中东和欧洲，约4.5万年前到达欧洲。",
            "到达美洲的时间较晚——约1.5-2万年前，智人通过白令陆桥（当时海平面较低，白令海峡是陆地）从亚洲进入北美。在约1万年前，智人已到达南美洲南端。从走出非洲到覆盖全球，智人用了不到5万年。",
          ],
        },
        {
          title: "与古人类的杂交",
          content: [
            "基因组学研究揭示了智人与其他古人类之间多次杂交的证据。现代非洲以外人群的基因组中约含1-4%的尼安德特人DNA，美拉尼西亚人和澳大利亚原住民的基因组中还含有约3-6%的丹尼索瓦人DNA。这些杂交事件发生在智人与这些古人类相遇的不同地点和时间。",
            "古人类的基因对现代人的生理特征产生了影响。例如，尼安德特人的基因影响了现代人的免疫系统、皮肤和毛发特征；丹尼索瓦人的基因则赋予了藏族人群适应高海拔环境的能力（EPAS1基因）。从这个意义上说，人类的演化历史是一个交织着分化和融合的复杂网络。",
          ],
        },
      ],
      citations: [
        {
          id: "mellars-2006",
          authors: "Mellars, P.",
          year: 2006,
          title: "Why did modern human populations disperse from Africa ca. 60,000 years ago?",
          journal: "Proceedings of the National Academy of Sciences",
          doi: "10.1073/pnas.0510792103",
        },
        {
          id: "reich-2010",
          authors: "Reich, D. et al.",
          year: 2010,
          title: "Genetic history of an archaic hominin group from Denisova Cave in Siberia",
          journal: "Nature",
          doi: "10.1038/nature09710",
        },
      ],
    },
  },
  {
    id: "agricultural-revolution",
    era: "1.2 万年前",
    event: "农业革命",
    detail: "人类从狩猎采集转向农业定居，驯化了动植物，永久定居成为可能。",
    accent: "#4a9e6f",
    category: "animals",
    significance: "农业革命是人类历史上最深刻的转变，使人口爆炸、社会分工和文明诞生成为可能。",
    keyFigures: [],
    context: {
      before: "人类以狩猎采集为生，人口密度低，群体规模小，生活方式灵活但不稳定。",
      after: "农业定居导致人口爆炸、城市兴起、社会阶层分化，最终催生了文字、法律和国家。",
    },
    connections: ["走出非洲", "文明起源"],
    openQuestions: [
      "农业革命是一次「进步」还是一次「陷阱」——早期农民的健康和生活质量是否真的优于狩猎采集者？",
      "为什么农业在新月沃地、中国、中美洲和非洲独立起源？是环境压力还是人口压力？",
    ],
    deepReading: {
      introduction:
        "农业革命发生在约1.2万年前，是人类从依赖野生食物转向主动种植作物和驯养动物的转变。这一转变独立发生在至少六个地区，是人类文明诞生的基石。",
      sections: [
        {
          title: "农业的起源",
          content: [
            "最早的农业实践出现在约1.2万年前的新月沃地（今伊拉克、叙利亚、土耳其一带），那里的人类开始驯化小麦、大麦、豌豆和绵羊。几乎同时，中国长江流域的人类开始驯化水稻，黄河流域开始驯化粟。约7000年前，中美洲的人类开始驯化玉米。",
            "农业革命的触发因素仍有争议。气候变化（末次冰期结束后）可能改变了植被分布；人口增长可能迫使人类寻找新的食物来源；某些植物（如小麦和水稻）的自然特征（大种子、易于栽培）也可能促进了驯化。最可能的是多种因素共同作用的结果。",
          ],
        },
        {
          title: "农业的后果",
          content: [
            "农业革命带来了深刻的社会变革。定居生活使人口密度大幅增加，社会分工和专业化成为可能。食物盈余催生了不从事农业生产的阶层——工匠、祭司、战士和统治者。文字、数学、法律和宗教等文化创新相继出现。",
            "然而，农业革命也带来了负面影响。单一作物种植导致营养不均衡，定居生活促进了传染病的传播，社会分化产生了不平等和暴力。早期农民的身高和健康指标实际上低于狩猎采集者。尤瓦尔·赫拉利在《人类简史》中将农业革命称为「史上最大的骗局」。",
          ],
        },
      ],
      citations: [
        {
          id: "diamond-1997",
          authors: "Diamond, J.",
          year: 1997,
          title: "Guns, Germs, and Steel: The Fates of Human Societies",
          journal: "W.W. Norton & Company",
        },
        {
          id: "fuller-2014",
          authors: "Fuller, D.Q. et al.",
          year: 2014,
          title: "Convergent evolution and parallelism in plant domestication",
          journal: "Proceedings of the National Academy of Sciences",
          doi: "10.1073/pnas.1308937110",
        },
      ],
    },
  },
  {
    id: "first-civilization",
    era: "5000 年前",
    event: "文明起源",
    detail: "最早的城市、文字和国家出现在美索不达米亚，人类进入有历史记录的时代。",
    accent: "#c8a45a",
    category: "animals",
    significance: "文明的出现标志着人类从自然的被动适应者转变为社会组织的主动建造者。",
    keyFigures: [],
    context: {
      before: "农业革命后，人口增长催生了村庄和城镇，社会复杂性不断增加。",
      after: "文明从美索不达米亚扩展到埃及、印度、中国和美洲，文字记录使知识能够跨代传承。",
    },
    connections: ["农业革命"],
    openQuestions: [
      "为什么文明最早出现在美索不达米亚而不是其他农业起源地？",
      "文明的出现是否必然导致社会不平等和战争？",
    ],
    deepReading: {
      introduction:
        "约5000年前（约公元前3500-3000年），美索不达米亚（今伊拉克南部）的苏美尔人创造了人类历史上第一个文明——拥有城市、文字、法律、宗教和复杂社会阶层的社会。这一事件标志着人类从史前时代进入历史时代。",
      sections: [
        {
          title: "文明的要素",
          content: [
            "文明的出现需要多个要素的汇聚：农业盈余支持非农业人口、城市作为人口和贸易中心、文字作为记录和管理工具、法律作为社会秩序的保障、以及宗教作为社会凝聚力的来源。苏美尔文明最早具备了所有这些要素。",
            "楔形文字（约公元前3400年）是已知最早的文字系统，最初用于记录商业交易和税收。文字的出现使信息能够跨越时间和空间传播，极大地增强了社会的组织能力。法律（如汉谟拉比法典）则将社会规则从口头传统固化为书面法典。",
          ],
        },
        {
          title: "文明的扩散",
          content: [
            "文明概念从美索不达米亚向外扩散，但也在其他地区独立发展。尼罗河流域的古埃及文明（约公元前3100年）、印度河流域的哈拉帕文明（约公元前2600年）、中国的商朝（约公元前1600年）以及中美洲的奥尔梅克文明（约公元前1200年）都是独立或半独立发展的文明中心。",
            "文明的出现使人类社会进入了加速发展的轨道。文字记录使知识能够跨代积累，而非每一代重新发明。城市集中了人才和资源，促进了技术创新。贸易网络传播了思想和商品。这些正反馈循环使文明成为人类社会组织的主导模式，一直延续至今。",
          ],
        },
      ],
      citations: [
        {
          id: "kramer-1963",
          authors: "Kramer, S.N.",
          year: 1963,
          title: "The Sumerians: Their History, Culture, and Character",
          journal: "University of Chicago Press",
        },
      ],
    },
  },
];
