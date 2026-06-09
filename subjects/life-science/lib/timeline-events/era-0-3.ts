import type { TimelineEvent } from "./types";

export const ERA_0_3_EVENTS: TimelineEvent[] = [
  {
    id: "earth-formation",
    era: "45 亿年前",
    event: "地球形成",
    detail: "太阳星云中的尘埃与气体凝聚，原始地球在碰撞与吸积中诞生。",
    accent: "#d85a5a",
    category: "earth",
    significance: "地球的形成为生命的诞生提供了物质基础和环境条件，是整个生命演化史的前提。",
    keyFigures: [],
    context: {
      before: "太阳系还是一片由气体和尘埃组成的原行星盘，温度极高，物质处于熔融状态。",
      after: "地球经历了晚期重轰炸期，表面逐渐冷却，原始海洋开始形成，为生命的诞生做好了准备。",
    },
    connections: ["最早的生命", "大氧化事件"],
    openQuestions: [
      "地球上的水究竟来自何处——是彗星携带还是原始星云中就含有？",
      "月球形成的大碰撞假说是否准确？碰撞的具体参数是什么？",
    ],
    deepReading: {
      introduction:
        "地球的形成是太阳系演化过程中的关键事件，也是生命诞生的必要前提。约45亿年前，在太阳系形成后不久，地球通过微行星的吸积过程逐渐成形。",
      sections: [
        {
          title: "吸积过程与地球分化",
          content: [
            "地球的形成始于太阳星云中尘埃颗粒的碰撞与粘附。这些微小的颗粒逐渐聚合成千米级的微行星，再通过引力相互作用形成更大的星子。当星子增长到月球大小时，其引力足以吸引周围的物质，进入失控增长阶段。",
            "地球形成后不久，发生了与一颗火星大小的天体（忒伊亚）的碰撞，这次碰撞产生了足够的碎片形成了月球。这次碰撞还导致地球表面完全熔化，形成了全球性的岩浆海洋。在随后的数百万年中，重的铁镍元素沉入核心，形成了地球的金属核，而较轻的硅酸盐物质则形成了地幔和地壳。",
          ],
        },
        {
          title: "原始大气与海洋",
          content: [
            "早期地球的大气主要由水蒸气、二氧化碳、氮气和少量的甲烷、氨组成，与今天的大气截然不同。随着地球表面温度的下降，水蒸气凝结形成了原始海洋。这些海洋为生命的化学起源提供了反应介质。",
            "晚期重轰炸期（约41-38亿年前）的小行星和彗星撞击可能为地球带来了额外的水和有机分子，这些物质对生命的起源至关重要。",
          ],
        },
      ],
      citations: [
        {
          id: "canup-2004",
          authors: "Canup, R.M.",
          year: 2004,
          title: "Simulations of a late lunar-forming impact",
          journal: "Icarus",
          doi: "10.1016/j.icarus.2003.10.010",
        },
        {
          id: "marchi-2014",
          authors: "Marchi, S. et al.",
          year: 2014,
          title: "Widespread mixing and burial of Earth's Hadean crust by asteroid impacts",
          journal: "Nature",
          doi: "10.1038/nature13539",
        },
      ],
    },
  },
  {
    id: "earliest-life",
    era: "38 亿年前",
    event: "最早的生命",
    detail: "深海热泉或原始汤中，第一批能够自我复制的有机分子出现。",
    accent: "#d85a5a",
    category: "microorganisms",
    significance: "生命的出现标志着物质从无序向有序的飞跃，是地球历史上最根本的转变。",
    keyFigures: ["Alexander Oparin", "Stanley Miller"],
    context: {
      before: "地球表面温度下降，原始海洋形成，大气中富含甲烷、氨和水蒸气，为有机分子的合成提供了条件。",
      after: "最早的原核生物开始在海洋中繁衍，蓝藻随后出现，开启了光合作用的时代。",
    },
    connections: ["地球形成", "蓝藻出现", "大氧化事件"],
    openQuestions: [
      "生命究竟起源于深海热泉还是浅水池塘？RNA世界假说是否成立？",
      "从化学分子到第一个能自我复制的系统，具体经历了哪些步骤？",
    ],
    deepReading: {
      introduction:
        "生命的起源是科学界最深刻的问题之一。约38亿年前，地球上出现了最早的能够自我复制的有机分子，这一事件改变了地球的整个演化轨迹。",
      sections: [
        {
          title: "原始汤假说与深海热泉假说",
          content: [
            "关于生命起源的地点，科学界主要有两种假说。原始汤假说认为，早期地球的海洋中含有丰富的有机分子，这些分子在闪电、紫外线等能量来源的驱动下，逐渐聚合形成更复杂的生物大分子。1953年，米勒-尤里实验证明了在模拟早期地球大气的条件下，氨基酸可以自然合成。",
            "深海热泉假说则认为，生命起源于海底的碱性热液喷口。这些喷口提供了丰富的化学能、矿物质催化表面和温度梯度，是理想的化学反应场所。热泉中的氢气和二氧化碳可以通过化学渗透作用合成有机分子，这一过程与现代生物的代谢途径惊人地相似。",
          ],
        },
        {
          title: "RNA世界与生命的关键创新",
          content: [
            "RNA世界假说提出，在DNA和蛋白质出现之前，RNA同时承担了遗传信息存储和催化化学反应的双重功能。核酶的发现证实了RNA确实可以催化化学反应，支持了这一假说。RNA可能通过自我复制和自然选择，逐渐演化出更复杂的生命系统。",
            "从RNA世界到现代细胞生命的关键创新包括：遗传密码的建立、蛋白质合成机制的出现、细胞膜的形成以及DNA作为遗传物质的采用。这些创新使生命能够更高效地存储信息、催化反应和维持内部环境的稳定。",
          ],
        },
      ],
      citations: [
        {
          id: "miller-1953",
          authors: "Miller, S.L.",
          year: 1953,
          title: "A Production of Amino Acids under Possible Primitive Earth Conditions",
          journal: "Science",
          doi: "10.1126/science.117.3046.528",
        },
        {
          id: "martin-2008",
          authors: "Martin, W. & Russell, M.J.",
          year: 2008,
          title: "On the origins of cells: a hypothesis for the evolutionary transitions from abiotic geochemistry to chemoautotrophic prokaryotes",
          journal: "Philosophical Transactions of the Royal Society B",
          doi: "10.1098/rstb.2006.1881",
        },
        {
          id: "gilbert-1986",
          authors: "Gilbert, W.",
          year: 1986,
          title: "Origin of life: The RNA world",
          journal: "Nature",
          doi: "10.1038/319618a0",
        },
      ],
    },
  },
  {
    id: "luca",
    era: "38 亿年前",
    event: "最后共同祖先 LUCA",
    detail: "所有现存生命的共同祖先出现，拥有统一的遗传密码和基本代谢机制。",
    accent: "#d85a5a",
    category: "microorganisms",
    significance: "所有地球生命共享同一套遗传密码，证明了共同起源。",
    keyFigures: [],
    context: {
      before: "地球上已存在原始的自我复制分子，RNA世界向DNA世界过渡。",
      after: "LUCA的后代分化为细菌和古菌两大域，开启了生命多样化的进程。",
    },
    connections: ["最早的生命", "蓝藻出现", "真核生物出现"],
    openQuestions: [
      "LUCA是单个物种还是一个原始生物群落？",
      "LUCA生活在深海热泉还是浅水环境中？",
    ],
    deepReading: {
      introduction:
        "最后共同祖先（Last Universal Common Ancestor, LUCA）是所有现存生命在演化树上的最近共同祖先。通过比较基因组学，科学家推断LUCA已拥有DNA、RNA、蛋白质合成机制和数百个基因。",
      sections: [
        {
          title: "LUCA的基因组特征",
          content: [
            "通过系统发育分析，科学家重建了LUCA可能拥有的基因组。LUCA已具备完整的DNA复制、转录和翻译机制，使用与现代生物相同的遗传密码。它拥有超过350个基因，包括编码核糖体蛋白、代谢酶和膜蛋白的基因。",
            "2016年的一项重要研究分析了610万个基因，推断LUCA是一个厌氧生物，利用氢气和二氧化碳进行自养代谢，生活在高温的深海热泉环境中。这一发现支持了生命起源于深海热泉的假说。",
          ],
        },
        {
          title: "从LUCA到生命之树",
          content: [
            "LUCA分化为细菌和古菌两大域，这一分化事件可能发生在约35-40亿年前。细菌和古菌在细胞膜脂质、基因组组织和代谢途径上存在根本差异，但共享同一套遗传密码和核心分子机制。",
            "真核生物的起源涉及古菌和细菌的融合事件。近年来发现的阿斯加德古菌拥有多数此前认为是真核生物特有的基因，暗示真核生物可能起源于阿斯加德古菌的一个分支与细菌的内共生。",
          ],
        },
      ],
      citations: [
        {
          id: "weiss-2016",
          authors: "Weiss, M.C. et al.",
          year: 2016,
          title: "The physiology and habitat of the last universal common ancestor",
          journal: "Nature Microbiology",
          doi: "10.1038/nmicrobiol.2016.116",
        },
      ],
    },
  },
  {
    id: "cyanobacteria",
    era: "35 亿年前",
    event: "蓝藻出现",
    detail: "最早的光合生物——蓝藻（蓝细菌）出现，开始了漫长的产氧过程。",
    accent: "#e8a840",
    category: "microorganisms",
    significance: "蓝藻的光合作用彻底改变了地球的大气成分，为真核生物和多细胞生命的演化奠定了基础。",
    keyFigures: [],
    context: {
      before: "地球上的生命主要是厌氧的原核生物，大气中几乎没有游离氧气。",
      after: "经过数亿年的缓慢积累，氧气终于在24亿年前引发了大氧化事件，彻底改变了地球的生态系统。",
    },
    connections: ["最早的生命", "大氧化事件", "真核生物出现"],
    openQuestions: [
      "光合作用的演化经历了哪些中间步骤？",
      "蓝藻是如何从其他光合细菌中分化出来的？",
    ],
    deepReading: {
      introduction:
        "蓝藻的出现是地球生命史上最重要的创新之一。作为第一个能够进行产氧光合作用的生物类群，蓝藻为地球大气带来了氧气，从根本上改变了地球的化学环境。",
      sections: [
        {
          title: "光合作用的演化",
          content: [
            "光合作用并非一步到位的创新。最早的光合细菌（如紫细菌和绿硫细菌）使用硫化氢而非水作为电子供体，不产生氧气。蓝藻演化出了使用水作为电子供体的能力，这一创新产生了氧气作为副产品，是地球大气氧含量上升的根本原因。",
            "蓝藻的光合系统包含两个光反应中心（光系统I和光系统II），通过Z型电子传递链将水分解为氧气、质子和电子。这一复杂的分子机器的演化可能经历了数亿年的时间，涉及多个基因的水平转移和融合事件。",
          ],
        },
        {
          title: "叠层石与早期生态系",
          content: [
            "蓝藻是叠层石的主要建造者。叠层石是由蓝藻席捕获和粘附沉积物颗粒形成的层状结构，是地球上最古老的生命痕迹之一。澳大利亚西部发现的35亿年前的叠层石，是蓝藻早期存在的直接证据。",
            "在大氧化事件之前，蓝藻产生的氧气大部分被海洋中的溶解铁和还原性物质消耗。这一时期的氧气主要以氧化铁（条带状铁建造）的形式沉积在海底，形成了今天重要的铁矿资源。",
          ],
        },
      ],
      citations: [
        {
          id: "schirrmeister-2013",
          authors: "Schirrmeister, B.E. et al.",
          year: 2013,
          title: "Cyanobacteria and the Great Oxidation Event: evidence from genes and fossils",
          journal: "Palaeontology",
          doi: "10.1111/pala.12047",
        },
        {
          id: "blankenship-2010",
          authors: "Blankenship, R.E.",
          year: 2010,
          title: "Early evolution of photosynthesis",
          journal: "Plant Physiology",
          doi: "10.1104/pp.110.160671",
        },
      ],
    },
  },
  {
    id: "great-oxidation",
    era: "24 亿年前",
    event: "大氧化事件",
    detail: "蓝藻产生的氧气积累到致命水平，厌氧生物大量灭绝，铁矿石大量沉积。",
    accent: "#e8a840",
    category: "earth",
    significance: "大氧化事件是地球历史上最大的环境灾难之一，同时也是真核生物演化的必要前提。",
    keyFigures: [],
    context: {
      before: "蓝藻已经产氧超过10亿年，但氧气被海洋中的还原性物质消耗，大气中氧含量极低。",
      after: "大气中氧气含量稳定上升，真核生物出现，地球进入了全新的演化阶段。",
    },
    connections: ["蓝藻出现", "真核生物出现", "二叠纪大灭绝"],
    openQuestions: [
      "大氧化事件是一次突然的转变还是渐进的过程？",
      "氧气浓度的上升与雪球地球事件之间有什么关系？",
    ],
    deepReading: {
      introduction:
        "大氧化事件（Great Oxidation Event, GOE）发生在约24亿年前，是地球大气从还原性向氧化性转变的关键转折点。这一事件对地球上的生命产生了深远的影响，既是一场大规模灭绝事件，也是新生命形式演化的催化剂。",
      sections: [
        {
          title: "氧气积累的机制",
          content: [
            "蓝藻在约35亿年前就已出现，但氧气在大气中的积累却延迟了超过10亿年。这是因为早期地球表面存在大量的还原性物质（如溶解铁、硫化氢和甲烷），它们能够迅速消耗蓝藻产生的氧气。只有当这些氧气汇被逐渐饱和后，多余的氧气才开始在大气中积累。",
            "另一个重要因素是碳的埋藏。当有机碳被沉积物掩埋时，与之配对的氧气就不会被呼吸作用消耗，从而在大气中积累。板块构造活动和沉积环境的变化可能促进了碳埋藏速率的增加。",
          ],
        },
        {
          title: "生物与环境的协同演化",
          content: [
            "大氧化事件导致了厌氧生物的大规模灭绝，这被称为「氧气灾难」。在今天的极端环境中（如深海热泉、湿地淤泥），仍然可以找到这些古老厌氧生物的后代。但对于能够利用氧气的生物来说，氧气的出现是一个巨大的机遇——有氧呼吸产生的能量远高于无氧代谢。",
            "大氧化事件还引发了全球性的冰川作用（休伦冰期，约24-21亿年前），因为甲烷是一种强效温室气体，氧气的增加减少了大气中的甲烷含量，导致地球温度骤降。这一冰期可能是地球历史上最严重的一次冰封事件。",
          ],
        },
      ],
      citations: [
        {
          id: "holland-2006",
          authors: "Holland, H.D.",
          year: 2006,
          title: "The oxygenation of the atmosphere and oceans",
          journal: "Philosophical Transactions of the Royal Society B",
          doi: "10.1098/rstb.2006.1838",
        },
        {
          id: "lyons-2014",
          authors: "Lyons, T.W. et al.",
          year: 2014,
          title: "The rise of oxygen in Earth's early ocean and atmosphere",
          journal: "Nature",
          doi: "10.1038/nature13068",
        },
      ],
    },
  },
  {
    id: "eukaryotes",
    era: "20 亿年前",
    event: "真核生物出现",
    detail: "内共生事件：一个古菌吞噬了一个细菌，后者演变为线粒体。细胞有了细胞核。",
    accent: "#5cb87a",
    category: "microorganisms",
    significance: "真核细胞的出现是生命复杂化的关键一步，所有多细胞生物（植物、动物、真菌）都是真核生物。",
    keyFigures: ["Lynn Margulis"],
    context: {
      before: "地球上的生命全部是原核生物（细菌和古菌），结构简单，缺乏细胞核和膜结合细胞器。",
      after: "真核生物逐渐多样化，最终演化出多细胞生命形式，开启了寒武纪大爆发的基础。",
    },
    connections: ["大氧化事件", "埃迪卡拉生物群", "寒武纪大爆发"],
    openQuestions: [
      "线粒体和叶绿体的内共生事件分别发生在何时？",
      "真核细胞的细胞核是如何演化出来的？",
    ],
    deepReading: {
      introduction:
        "真核生物的出现标志着生命复杂性的一次重大飞跃。通过内共生事件，原始的古菌细胞获得了线粒体，随后某些谱系又通过类似的过程获得了叶绿体，这些事件为真核生物的多样化奠定了基础。",
      sections: [
        {
          title: "内共生理论",
          content: [
            "林恩·马古利斯在1967年提出的内共生理论认为，线粒体起源于被古菌吞噬的好氧细菌，而叶绿体则起源于被吞噬的蓝藻。这一理论最初遭到主流科学界的反对，但随着分子生物学证据的积累，现已被广泛接受。",
            "支持内共生理论的关键证据包括：线粒体和叶绿体拥有自己的DNA（环状，类似细菌）、自己的核糖体（70S型，类似细菌而非真核的80S型）、双层膜结构（内层来自共生体，外层来自宿主）以及它们通过二分裂方式独立增殖。",
          ],
        },
        {
          title: "从原核到真核的飞跃",
          content: [
            "真核细胞相比原核细胞的关键创新包括：细胞核（将DNA与细胞质分离）、内膜系统（内质网、高尔基体）、细胞骨架（微管、微丝）以及有丝分裂和减数分裂。这些创新使真核细胞能够进行更复杂的基因调控、细胞内运输和遗传重组。",
            "最近的基因组学研究揭示，真核生物的起源可能涉及古菌（阿斯加德古菌）和细菌的基因融合。阿斯加德古菌的发现为理解真核生物的起源提供了重要线索，它们拥有许多此前被认为是真核生物特有的基因。",
          ],
        },
      ],
      citations: [
        {
          id: "margulis-1967",
          authors: "Margulis, L.",
          year: 1967,
          title: "On the origin of mitosing cells",
          journal: "Journal of Theoretical Biology",
          doi: "10.1016/0022-5193(67)90072-9",
        },
        {
          id: "spang-2015",
          authors: "Spang, A. et al.",
          year: 2015,
          title: "Complex archaea that bridge the gap between prokaryotes and eukaryotes",
          journal: "Nature",
          doi: "10.1038/nature14447",
        },
      ],
    },
  },
  {
    id: "first-multicellular",
    era: "15 亿年前",
    event: "多细胞生命出现",
    detail: "多个细胞协作形成统一的生物体，细胞开始分工与合作。",
    accent: "#5cb87a",
    category: "microorganisms",
    significance: "多细胞化是生命复杂性跃升的关键一步，所有大型生物都是多细胞生物。",
    keyFigures: [],
    context: {
      before: "地球上的生命全部是单细胞生物，虽然可能已形成简单的细胞群落。",
      after: "多细胞生物逐渐演化出组织分化和器官系统，为埃迪卡拉生物群和寒武纪大爆发奠定了基础。",
    },
    connections: ["真核生物出现", "埃迪卡拉生物群", "寒武纪大爆发"],
    openQuestions: [
      "多细胞生命是单次起源还是多次独立起源？",
      "从细胞群落到真正的多细胞生物体，关键的遗传创新是什么？",
    ],
    deepReading: {
      introduction:
        "多细胞生命的出现是生命演化史上最关键的过渡事件之一。约15亿年前，某些真核生物开始以多细胞形式存在，细胞之间形成了稳定的分工合作关系。",
      sections: [
        {
          title: "多细胞性的起源",
          content: [
            "多细胞生命的起源可能经历了多个阶段：首先是细胞的暂时聚集（如黏菌的聚合体），然后是细胞间的稳定附着（如团藻的细胞群落），最后是细胞的不可逆分化（如动物胚胎中的细胞命运决定）。",
            "分子生物学研究表明，多细胞性在植物、动物、真菌和藻类中独立演化了至少25次。但所有多细胞生物都共享某些关键的分子工具——细胞粘附蛋白、细胞间信号通路和程序性细胞死亡机制——暗示这些工具可能在多细胞化之前就已经存在。",
          ],
        },
        {
          title: "细胞分工与复杂性",
          content: [
            "多细胞生物的核心优势在于细胞分工。不同细胞可以专门执行特定功能（如光合作用、营养吸收、运动或感知），从而实现单细胞生物无法达到的体型和复杂性。最早的多细胞生物可能只有两种细胞类型，但随着时间推移，细胞类型的数量和复杂性不断增加。",
            "多细胞化的关键遗传创新包括：转录因子家族的扩展（允许不同基因在不同细胞中表达）、细胞粘附分子的多样化（使不同类型的细胞能够以不同方式连接）以及凋亡机制的精细化（使生物体能够精确控制细胞数量和组织形态）。",
          ],
        },
      ],
      citations: [
        {
          id: "knoll-2011",
          authors: "Knoll, A.H.",
          year: 2011,
          title: "The multiple origins of complex multicellularity",
          journal: "Annual Review of Earth and Planetary Sciences",
          doi: "10.1146/annurev.earth.031208.100209",
        },
      ],
    },
  },
  {
    id: "snowball-earth",
    era: "7 亿年前",
    event: "雪球地球",
    detail: "地球表面几乎完全被冰层覆盖，从赤道到两极都是一片冰封。",
    accent: "#5a9ad8",
    category: "earth",
    significance: "雪球地球事件筛选出了能够在极端环境中存活的生命，可能加速了真核生物的多样化。",
    keyFigures: ["Joseph Kirschvink", "Paul Hoffman"],
    context: {
      before: "罗迪尼亚超大陆裂解，火山活动减少，大气中二氧化碳浓度下降。",
      after: "冰期结束后，温室效应迅速恢复，海洋中氧气含量上升，为埃迪卡拉生物群的出现创造了条件。",
    },
    connections: ["真核生物出现", "埃迪卡拉生物群"],
    openQuestions: [
      "雪球地球期间冰层到底有多厚？是完全冰封（硬雪球）还是存在开放水域（泥球）？",
      "多细胞生物是在雪球地球期间还是之后才开始多样化的？",
    ],
    deepReading: {
      introduction:
        "雪球地球假说认为，在新元古代（约7.2-6.35亿年前），地球经历了至少两次全球性冰期——斯图特冰期和马林诺冰期。在这些冰期中，冰川可能扩展到了赤道附近，地球表面几乎完全被冰层覆盖。",
      sections: [
        {
          title: "冰封的地球",
          content: [
            "雪球地球的触发可能与罗迪尼亚超大陆的裂解有关。大陆裂解导致更多硅酸盐岩石暴露在风化作用下，消耗大气中的二氧化碳，引发全球降温。正反馈循环——冰面反射阳光（反照率效应）——使温度进一步下降，最终导致全球冰封。",
            "在冰封期间，海洋冰层可能厚达数百米，陆地冰川则更厚。地球表面温度可能降至零下40度以下。然而，火山活动仍在继续，向大气中释放二氧化碳。由于冰封阻止了岩石风化消耗二氧化碳，这些气体逐渐积累，最终在数百万年后引发剧烈的温室效应，使冰层迅速融化。",
          ],
        },
        {
          title: "生命如何存活",
          content: [
            "雪球地球对生命构成了严峻考验。冰层下的海洋可能通过火山热泉维持液态水和化学能，为微生物提供避难所。冰层表面的融水池和冰下湖泊也可能是生命的庇护地。蓝藻和真核藻类的休眠孢子可以在极端条件下存活。",
            "雪球地球结束后，地球经历了快速的气候变暖和海洋环境变化。冰川融化带来的营养物质促进了海洋初级生产力的爆发，氧气含量上升。这些环境变化可能为埃迪卡拉生物群的出现创造了条件，也可能是多细胞生物快速多样化的重要驱动力。",
          ],
        },
      ],
      citations: [
        {
          id: "hoffman-1998",
          authors: "Hoffman, P.F. et al.",
          year: 1998,
          title: "A Neoproterozoic snowball Earth",
          journal: "Science",
          doi: "10.1126/science.281.5381.1342",
        },
        {
          id: "kirschvink-1992",
          authors: "Kirschvink, J.L.",
          year: 1992,
          title: "Late Proterozoic low-latitude global glaciation: the Snowball Earth",
          journal: "The Proterozoic Biosphere",
        },
      ],
    },
  },
  {
    id: "ediacaran",
    era: "6 亿年前",
    event: "埃迪卡拉生物群",
    detail: "地球上最早的大型多细胞生物——奇特的软体生物在海底繁盛。",
    accent: "#5cb87a",
    category: "animals",
    significance: "埃迪卡拉生物群是多细胞生命的第一次伟大尝试，为寒武纪大爆发奠定了生态基础。",
    keyFigures: [],
    context: {
      before: "雪球地球事件结束后，地球气候回暖，海洋中的氧气含量逐渐增加。",
      after: "埃迪卡拉生物群神秘消失，取而代之的是寒武纪大爆发中出现的现代动物门类。",
    },
    connections: ["真核生物出现", "寒武纪大爆发"],
    openQuestions: [
      "埃迪卡拉生物群与现代动物门类之间是否存在演化关系？",
      "它们为什么会突然消失——是被寒武纪动物淘汰还是环境变化所致？",
    ],
    deepReading: {
      introduction:
        "埃迪卡拉生物群生活在约6.35-5.41亿年前，是地球上最早的大型复杂多细胞生物群落。它们的体型、形态和生活方式与现代生物截然不同，是古生物学中最神秘的发现之一。",
      sections: [
        {
          title: "形态与生活方式",
          content: [
            "埃迪卡拉生物的形态极其多样，包括盘状、叶状、管状和分枝状等多种体型。狄更逊水母（Dickinsonia）呈椭圆形盘状，表面有分节结构；查恩虫（Charnia）呈羽状分枝，固着在海底。这些生物没有明显的口、消化道或肢体，其营养方式可能包括渗透营养、化学自养或与微生物共生。",
            "埃迪卡拉生物的身体结构缺乏现代动物的组织分化和器官系统。它们可能采用了「充气式」体型设计——通过增大体表面积来提高与环境的物质交换效率。这种设计在氧气含量较低的环境中具有优势，但也限制了它们的体型和复杂性。",
          ],
        },
        {
          title: "消失之谜",
          content: [
            "埃迪卡拉生物群在寒武纪开始时迅速消失，这一事件被称为「埃迪卡拉消亡」。关于其消失的原因，存在多种假说：环境变化（海平面下降、氧气含量波动）、生态竞争（寒武纪动物的出现改变了生态系统）或两者的共同作用。",
            "值得注意的是，在纳米比亚和澳大利亚的一些寒武纪早期地层中，发现了埃迪卡拉型生物与寒武纪动物共存的证据，暗示两者可能曾经短暂共存。但最终，具有运动能力和捕食能力的寒武纪动物取代了这些静止的软体生物。",
          ],
        },
      ],
      citations: [
        {
          id: "narbonne-2005",
          authors: "Narbonne, G.M.",
          year: 2005,
          title: "The Ediacara Biota: Neoproterozoic Origin of Animals and Their Ecosystems",
          journal: "Annual Review of Earth and Planetary Sciences",
          doi: "10.1146/annurev.earth.33.092203.122519",
        },
        {
          id: "droser-2018",
          authors: "Droser, M.L. & Gehling, J.G.",
          year: 2018,
          title: "The Advent of Animals: The View from the Ediacaran",
          journal: "Proceedings of the National Academy of Sciences",
          doi: "10.1073/pnas.1800526115",
        },
      ],
    },
  },
  {
    id: "first-bilateral",
    era: "5.55 亿年前",
    event: "两侧对称动物出现",
    detail: "拥有前后、左右、背腹之分的动物出现，奠定了动物体型的基本蓝图。",
    accent: "#5a9ad8",
    category: "animals",
    significance: "两侧对称体型使定向运动和头部化成为可能，是几乎所有现代动物的基础体型方案。",
    keyFigures: [],
    context: {
      before: "埃迪卡拉生物群以辐射对称和不对称体型为主，缺乏明确的前后方向。",
      after: "两侧对称动物迅速多样化，成为寒武纪大爆发中出现的绝大多数动物门类的基础。",
    },
    connections: ["埃迪卡拉生物群", "寒武纪大爆发"],
    openQuestions: [
      "两侧对称体型是在埃迪卡拉纪末期还是寒武纪早期出现的？",
      "最早的两侧对称动物是什么——蠕虫状还是水母状？",
    ],
    deepReading: {
      introduction:
        "两侧对称动物（Bilateria）是动物界中最大、最多样化的类群，包括从蠕虫到人类的所有动物。它们的共同特征是拥有两侧对称的体型——身体可以分为左右镜像的两半，以及明确的前后方向和背腹区别。",
      sections: [
        {
          title: "体型方案的革命",
          content: [
            "两侧对称体型的出现是一次根本性的创新。相比辐射对称的动物（如水母），两侧对称动物具有明确的前端（通常集中感觉器官和神经节，形成头部）和后端（通常负责排泄）。这种体型方案使定向运动成为可能——动物可以朝着食物或远离危险做有目的的移动。",
            "两侧对称体型还带来了另一个关键创新——身体内部的管状消化道（有口有肛门），使食物的摄入和残渣的排出可以同时进行，大大提高了营养吸收效率。这种消化道设计至今仍是绝大多数动物的标准配置。",
          ],
        },
        {
          title: "从蠕虫到寒武纪大爆发",
          content: [
            "最早的两侧对称动物可能是简单的蠕虫状生物，生活在海底沉积物中。分子钟研究表明，两侧对称动物的主要谱系（原口动物和后口动物）可能在埃迪卡拉纪就已经分化，但化石记录中最早的明确两侧对称动物痕迹出现在约5.55亿年前。",
            "两侧对称体型为寒武纪大爆发提供了基本的结构框架。在寒武纪，各种动物门类在这个基本体型方案上演化出了令人惊叹的多样性——从三叶虫的分节外骨骼到奇虾的环状口器，但它们都共享两侧对称的基本设计。",
          ],
        },
      ],
      citations: [
        {
          id: "adoutte-2000",
          authors: "Adoutte, A. et al.",
          year: 2000,
          title: "The origin of eukaryotes and their relationship with the Archaea",
          journal: "Proceedings of the National Academy of Sciences",
          doi: "10.1073/pnas.97.9.4456",
        },
      ],
    },
  },
  {
    id: "cambrian-explosion",
    era: "5.4 亿年前",
    event: "寒武纪大爆发",
    detail: "在短短 2000 万年内，几乎所有现代动物门类突然出现。三叶虫、奇虾统治海洋。",
    accent: "#5a9ad8",
    category: "animals",
    significance: "寒武纪大爆发是动物演化史上最快速的多样化事件，奠定了现代海洋生态系统的基本框架。",
    keyFigures: [],
    context: {
      before: "埃迪卡拉生物群消失，海洋中缺乏大型掠食者，生态位大量空缺。",
      after: "古生代海洋生态系统建立，三叶虫、鹦鹉螺等类群统治海洋长达数亿年。",
    },
    connections: ["埃迪卡拉生物群", "植物登陆", "奥陶纪大灭绝"],
    openQuestions: [
      "是什么触发了如此快速的动物多样化？氧气水平、生态竞争还是发育基因的创新？",
      "寒武纪大爆发的「速度」是否被化石记录的偏差所夸大？",
    ],
    deepReading: {
      introduction:
        "寒武纪大爆发发生在约5.41-5.3亿年前，是地球历史上最引人注目的演化事件之一。在相对短暂的地质时间内，几乎所有现代动物门类的代表都首次出现在化石记录中。",
      sections: [
        {
          title: "触发因素",
          content: [
            "寒武纪大爆发的触发因素至今仍有争议。环境因素方面，大气和海洋氧气含量的上升被认为是必要条件——有氧呼吸为大型动物的活动提供了充足的能量。生态因素方面，捕食者与猎物之间的「军备竞赛」可能加速了形态多样性的演化。",
            "分子层面的创新同样关键。Hox基因等发育调控基因的多样化使动物能够「实验」不同的体型设计方案。眼睛的演化（最早的复眼化石来自寒武纪）则开启了「视觉军备竞赛」，改变了动物之间的相互作用方式。",
          ],
        },
        {
          title: "化石证据与动物门类",
          content: [
            "伯吉斯页岩（加拿大不列颠哥伦比亚省）和澄江生物群（中国云南省）是寒武纪大爆发最重要的化石宝库。这些特异埋藏化石库保存了软体组织的细节，让我们得以窥见寒武纪海洋生物的真实面貌。",
            "奇虾（Anomalocaris）是寒武纪最大的掠食者，体长可达1米，拥有环状口器和抓握附肢。三叶虫是寒武纪最常见的大型生物，拥有复杂的复眼和分节的身体。这些生物的出现标志着现代生态系统中捕食关系的正式建立。",
          ],
        },
      ],
      citations: [
        {
          id: "erwin-2011",
          authors: "Erwin, D.H. et al.",
          year: 2011,
          title: "The Cambrian conundrum: early divergence and later ecological success in the early history of animals",
          journal: "Science",
          doi: "10.1126/science.1206375",
        },
        {
          id: "hou-2004",
          authors: "Hou, X.G. et al.",
          year: 2004,
          title: "The Cambrian Fossils of Chengjiang, China",
          journal: "Blackwell Publishing",
        },
      ],
    },
  },
  {
    id: "plant-landing",
    era: "4.7 亿年前",
    event: "植物登陆",
    detail: "最早的陆生植物从绿藻演化而来，开始将荒芜的陆地变为绿色世界。",
    accent: "#98c379",
    category: "plants",
    significance: "植物登陆彻底改变了陆地环境，为动物登陆创造了条件，是地球生态系统的一次根本性扩张。",
    keyFigures: [],
    context: {
      before: "陆地表面荒芜，缺乏土壤和有机质，只有微生物和地衣在岩石表面生存。",
      after: "陆地植被的出现改变了风化速率、土壤形成和水循环，为昆虫和两栖动物的登陆奠定了基础。",
    },
    connections: ["寒武纪大爆发", "鱼类时代", "石炭纪森林"],
    openQuestions: [
      "陆生植物是单次登陆还是多次独立登陆？",
      "植物与真菌的共生关系在登陆过程中扮演了什么角色？",
    ],
    deepReading: {
      introduction:
        "植物从水生到陆生的转变是生命演化史上最重大的环境跨越之一。约4.7亿年前，最早的陆生植物从绿藻演化而来，开始了征服陆地的漫长历程。",
      sections: [
        {
          title: "适应陆地环境的关键创新",
          content: [
            "从水生到陆生，植物面临着完全不同的环境挑战：重力、干燥、紫外线辐射和温度波动。陆生植物演化出了一系列关键创新来应对这些挑战：角质层（防止水分蒸发）、气孔（调节气体交换和水分平衡）、维管组织（长距离运输水分和营养）以及孢子/种子（在干燥环境中保护生殖细胞）。",
            "苔藓植物是最早登陆的陆生植物类群之一，它们缺乏真正的维管组织，因此体型较小，仍需要水环境来完成受精过程。维管植物（如蕨类）的出现使植物能够长到更高的高度，竞争阳光，并在更干燥的环境中生存。",
          ],
        },
        {
          title: "菌根共生与土壤形成",
          content: [
            "植物登陆可能依赖于与真菌的共生关系。菌根真菌帮助早期陆生植物从岩石中获取矿物质，而植物则为真菌提供光合作用产生的有机碳。这种互利共生关系可能是植物能够在贫瘠的陆地表面生存的关键。",
            "植物的出现加速了岩石的风化和土壤的形成。植物根系分泌的有机酸能够分解岩石中的矿物，而死亡的植物组织则为土壤提供了有机质。这一过程改变了地球的化学循环，增加了大气中二氧化碳的消耗速率，可能对全球气候产生了影响。",
          ],
        },
      ],
      citations: [
        {
          id: "kenrick-1997",
          authors: "Kenrick, P. & Crane, P.R.",
          year: 1997,
          title: "The Origin and Early Diversification of Land Plants",
          journal: "Smithsonian Institution Press",
        },
        {
          id: "wellman-2003",
          authors: "Wellman, C.H. et al.",
          year: 2003,
          title: "Fragments of the earliest land plants",
          journal: "Nature",
          doi: "10.1038/nature01566",
        },
      ],
    },
  },
  {
    id: "first-insects",
    era: "4 亿年前",
    event: "昆虫出现",
    detail: "最早的昆虫在陆地上出现，成为最成功的动物类群之一。",
    accent: "#98c379",
    category: "animals",
    significance: "昆虫是地球上物种最丰富的动物类群，它们与植物的协同演化塑造了陆地生态系统。",
    keyFigures: [],
    context: {
      before: "陆地植物已经建立，但陆地上的动物种类有限，主要是一些原始的节肢动物。",
      after: "昆虫在石炭纪多样化，与石炭纪巨型森林共同演化，部分昆虫演化出了飞行能力。",
    },
    connections: ["植物登陆", "石炭纪森林", "被子植物绽放"],
    openQuestions: [
      "昆虫的飞行能力是单次起源还是多次独立起源？",
      "为什么昆虫能够演化出如此惊人的物种多样性？",
    ],
    deepReading: {
      introduction:
        "昆虫是地球上最成功的动物类群，已知物种超过100万种，占所有已知动物物种的80%以上。最早的昆虫化石可以追溯到约4亿年前的泥盆纪，它们的出现彻底改变了陆地生态系统的面貌。",
      sections: [
        {
          title: "昆虫的关键创新",
          content: [
            "昆虫的演化成功归功于一系列关键创新：外骨骼（提供保护和防止水分蒸发）、分节的身体（允许灵活的运动）、气管呼吸系统（高效地在陆地上获取氧气）以及变态发育（幼虫和成虫利用不同的生态位，减少种内竞争）。",
            "昆虫的飞行能力是动物演化史上最重大的创新之一。最早的飞行昆虫出现在石炭纪（约3.5亿年前），比脊椎动物的飞行早了超过1.5亿年。飞行使昆虫能够逃避地面的捕食者、寻找远处的食物和配偶、以及扩散到新的栖息地。",
          ],
        },
        {
          title: "昆虫与植物的协同演化",
          content: [
            "昆虫与植物之间的关系是地球上最重要的种间相互作用之一。传粉昆虫（如蜜蜂、蝴蝶）与开花植物之间的协同演化，创造了地球上最多样化的生物群落。据估计，约87.5%的开花植物依赖动物传粉，而其中绝大多数由昆虫完成。",
            "植食性昆虫与植物之间的「军备竞赛」也是物种多样性的重要驱动力。植物演化出各种化学防御物质（如生物碱、萜类），而昆虫则演化出解毒机制。这种协同演化过程不断产生新的物种，是物种多样性爆炸式增长的引擎之一。",
          ],
        },
      ],
      citations: [
        {
          id: "engel-2004",
          authors: "Engel, M.S. & Grimaldi, D.A.",
          year: 2004,
          title: "New light shed on the oldest insect",
          journal: "Nature",
          doi: "10.1038/nature02803",
        },
      ],
    },
  },
  {
    id: "age-of-fish",
    era: "3.7 亿年前",
    event: "鱼类时代",
    detail: "泥盆纪被称为「鱼的时代」，盾皮鱼、鲨鱼和最早的两栖动物出现。",
    accent: "#5a9ad8",
    category: "animals",
    significance: "泥盆纪鱼类的多样化奠定了脊椎动物演化的基本框架，鱼类向两栖动物的转变开启了脊椎动物登陆的序幕。",
    keyFigures: [],
    context: {
      before: "奥陶纪和志留纪的海洋中已有原始鱼类，但种类和数量有限。",
      after: "泥盆纪末期大灭绝重创了鱼类种群，但两栖动物成功登陆，开辟了新的演化方向。",
    },
    connections: ["植物登陆", "石炭纪森林", "泥盆纪大灭绝"],
    openQuestions: [
      "提塔利克鱼等过渡化石是否代表了鱼类到两栖动物的直接演化序列？",
      "泥盆纪鱼类的巨大体型是如何在当时的氧气水平下维持的？",
    ],
    deepReading: {
      introduction:
        "泥盆纪（约4.19-3.59亿年前）是脊椎动物演化史上的关键时期。这一时期，鱼类经历了前所未有的多样化，演化出了多种多样的体型和生活方式，为后来脊椎动物征服陆地奠定了基础。",
      sections: [
        {
          title: "鱼类多样性的黄金时代",
          content: [
            "泥盆纪的海洋和淡水环境中生活着多种鱼类类群。盾皮鱼（如邓氏鱼）是当时最大的掠食者，体长可达10米，拥有强大的颚部。软骨鱼类（鲨鱼的祖先）和硬骨鱼类也在这一时期开始多样化。硬骨鱼类后来分化为辐鳍鱼类（现代大多数鱼类）和肉鳍鱼类（四足动物的祖先）。",
            "肉鳍鱼类拥有强壮的肉质鳍，鳍内有骨骼支撑，这使它们能够在水底「行走」。这种看似笨拙的运动方式，却为脊椎动物最终登上陆地提供了关键的解剖学基础。",
          ],
        },
        {
          title: "从水到陆的过渡",
          content: [
            "提塔利克鱼（Tiktaalik）是鱼类到两栖动物过渡的关键化石，生活在约3.75亿年前。它拥有鱼类的鳞片和鳃，但也拥有类似四足动物的扁平头部、可转动的颈部和带有腕关节的鳍。提塔利克鱼可能生活在浅水环境中，能够在水底支撑身体并进行短距离的「行走」。",
            "最早的四足动物（如鱼石螈）出现在约3.65亿年前，它们仍主要生活在水中，但已经具备了在陆地上短距离移动的能力。四肢的演化是脊椎动物登陆的关键创新，使它们能够逃离干旱的水塘、寻找新的食物来源和躲避水中的掠食者。",
          ],
        },
      ],
      citations: [
        {
          id: "daeschler-2006",
          authors: "Daeschler, E.B. et al.",
          year: 2006,
          title: "A Devonian tetrapod-like fish and the evolution of the tetrapod body plan",
          journal: "Nature",
          doi: "10.1038/nature04639",
        },
        {
          id: "friedman-2010",
          authors: "Friedman, M. & Sallan, L.C.",
          year: 2010,
          title: "Five hundred million years of extinction and recovery: a phanerozoic survey of large-scale diversity patterns in fishes",
          journal: "Palaeontology",
          doi: "10.1111/j.1475-4983.2010.00967.x",
        },
      ],
    },
  },
  {
    id: "first-amphibians",
    era: "3.7 亿年前",
    event: "两栖类出现",
    detail: "鱼类的后代首次登上陆地，成为既能水中又能陆地生活的脊椎动物。",
    accent: "#5a9ad8",
    category: "animals",
    significance: "两栖类是脊椎动物登陆的关键过渡类群，开启了四足动物征服陆地的序幕。",
    keyFigures: [],
    context: {
      before: "肉鳍鱼类已经具备了在水底行走的能力，提塔利克鱼展示了鱼类到两栖动物的过渡形态。",
      after: "两栖类在石炭纪的沼泽森林中繁盛，最终演化出了爬行动物，实现了完全的陆地生活。",
    },
    connections: ["鱼类时代", "石炭纪森林"],
    openQuestions: [
      "四足动物的四肢是在浅水环境中还是陆地上首先发挥作用的？",
      "最早的两栖动物是蝌蚪式发育还是直接发育？",
    ],
    deepReading: {
      introduction:
        "两栖类的出现标志着脊椎动物从水生到陆生的关键转变。约3.7亿年前，某些肉鳍鱼类演化出了能够在陆地上支撑身体和呼吸空气的能力，成为最早的四足动物——两栖类。",
      sections: [
        {
          title: "从鱼到两栖动物",
          content: [
            "从鱼到两栖动物的转变涉及一系列深刻的解剖学变化：鳍演化为四肢（需要肩带、腰带和趾骨的支撑）、鳃呼吸转变为肺呼吸（需要新的气体交换机制）、侧线系统退化并被听觉系统取代（需要中耳结构的改造）。",
            "鱼石螈（Ichthyostega，约3.65亿年前）是最早被详细描述的四足动物之一。它拥有四肢和趾骨，但可能主要仍在水中生活，四肢更像是用来划水而非行走。棘螈（Acanthostega）拥有八趾的四肢和功能性的鳃，进一步说明了从水到陆的渐进过渡。",
          ],
        },
        {
          title: "两栖类的繁盛与限制",
          content: [
            "石炭纪（约3.6-3亿年前）是两栖类的黄金时代。大型两栖动物（如离片椎类）统治了沼泽和河流生态系统，体长可达数米。然而，两栖类始终面临一个根本限制——它们的繁殖仍然依赖水环境，卵没有保护性的壳，必须在水中发育。",
            "这一限制最终被爬行动物突破。羊膜卵的演化使爬行动物能够在远离水源的地方繁殖，真正实现了脊椎动物对陆地的完全征服。尽管如此，两栖类并未灭绝——今天的青蛙、蝾螈和蚓螈仍然延续着这一古老的脊椎动物谱系。",
          ],
        },
      ],
      citations: [
        {
          id: "clack-2002",
          authors: "Clack, J.A.",
          year: 2002,
          title: "Gaining Ground: The Origin and Evolution of Tetrapods",
          journal: "Indiana University Press",
        },
      ],
    },
  },
  {
    id: "first-reptiles",
    era: "3.2 亿年前",
    event: "爬行类出现",
    detail: "羊膜卵的演化使脊椎动物首次实现了完全的陆地生活，不再依赖水环境繁殖。",
    accent: "#98c379",
    category: "animals",
    significance: "羊膜卵是脊椎动物征服陆地的决定性创新，使爬行动物能够在各种陆地环境中繁衍。",
    keyFigures: [],
    context: {
      before: "两栖类虽然能够登陆，但繁殖仍需回到水中，限制了它们对干旱环境的利用。",
      after: "爬行动物迅速多样化，在二叠纪取代两栖动物成为陆地优势脊椎动物，最终演化出了恐龙和哺乳动物。",
    },
    connections: ["两栖类出现", "石炭纪森林", "恐龙崛起"],
    openQuestions: [
      "羊膜卵是一次性出现的还是渐进演化的？",
      "最早的爬行动物是食虫性还是食草性？",
    ],
    deepReading: {
      introduction:
        "爬行类的出现是脊椎动物演化史上的一个里程碑事件。约3.2亿年前，某些两栖动物演化出了羊膜卵——一种能够在干燥环境中保护胚胎的卵结构——使脊椎动物首次实现了完全的陆地生活。",
      sections: [
        {
          title: "羊膜卵——征服陆地的关键",
          content: [
            "羊膜卵是脊椎动物演化中最精妙的创新之一。它包含四个关键结构：羊膜（包裹胚胎的液体保护层）、绒毛膜（与卵壳相邻的呼吸膜）、卵黄囊（提供胚胎发育所需的营养）和尿囊（储存代谢废物并参与气体交换）。这四个膜结构使胚胎能够在完全干燥的环境中发育。",
            "羊膜卵的壳可以是硬壳（如鸟类和大多数爬行动物）或软壳（如某些蜥蜴和蛇）。硬壳提供了更强的保护，但也限制了气体交换的效率；软壳则允许更多的水分和气体交换，但保护性较弱。这种壳的多样性反映了爬行动物对不同环境的适应。",
          ],
        },
        {
          title: "爬行动物的辐射",
          content: [
            "获得羊膜卵后，爬行动物迅速多样化。石炭纪晚期和二叠纪早期，爬行动物分化为多个主要类群：无孔类（龟鳖类的祖先）、双孔类（蜥蜴、蛇、鳄鱼和鸟类的祖先）和合弓纲（哺乳动物的祖先，有时被称为「似哺乳爬行动物」）。",
            "爬行动物对陆地的完全征服改变了整个陆地生态系统。它们能够在远离水源的干旱环境中繁殖，迅速扩展到两栖动物无法到达的生态位。二叠纪时期，爬行动物已经取代两栖动物成为陆地优势脊椎动物，这一格局一直持续到今天。",
          ],
        },
      ],
      citations: [
        {
          id: "benton-2015",
          authors: "Benton, M.J.",
          year: 2015,
          title: "Vertebrate Palaeontology",
          journal: "Wiley-Blackwell",
        },
      ],
    },
  },
  {
    id: "carboniferous-forests",
    era: "3 亿年前",
    event: "石炭纪森林",
    detail: "巨型蕨类森林覆盖大地，氧气浓度极高，蜻蜓翼展达 70 厘米。这些森林后来变成了煤炭。",
    accent: "#98c379",
    category: "plants",
    significance: "石炭纪森林是地球历史上最大规模的碳埋藏事件之一，直接导致了全球气候的剧烈变化。",
    keyFigures: [],
    context: {
      before: "植物登陆后经过数亿年的演化，大型蕨类和种子蕨逐渐成为陆地生态系统的优势类群。",
      after: "石炭纪末期，气候变干，巨型森林退缩，爬行动物开始取代两栖动物成为陆地优势脊椎动物。",
    },
    connections: ["植物登陆", "二叠纪大灭绝"],
    openQuestions: [
      "石炭纪末期的气候干旱化是由什么因素驱动的？",
      "巨型节肢动物（如巨脉蜻蜓）的巨大体型与高氧环境之间的关系是否如假说所言？",
    ],
    deepReading: {
      introduction:
        "石炭纪（约3.59-2.99亿年前）是陆地生态系统发生巨大变革的时期。大规模的森林覆盖了低地和沼泽，形成了地球历史上最茂密的植被。这些森林的遗迹最终形成了今天我们开采的煤炭。",
      sections: [
        {
          title: "石炭纪森林的组成",
          content: [
            "石炭纪森林的主要树种是鳞木（Lepidodendron）和封印木（Sigillaria），它们属于石松类，可长到40米高，树干直径超过1米。这些巨大的「树蕨」与现代的蕨类植物亲缘关系较近，但体型远超今天的任何蕨类。真蕨类和种子蕨也是森林的重要组成部分。",
            "石炭纪的沼泽森林环境为化石保存提供了理想条件。倒下的树干迅速被沉积物掩埋，在厌氧环境中保存了精细的内部结构。这些化石让我们得以详细了解3亿年前的森林生态系统。",
          ],
        },
        {
          title: "高氧环境与巨型节肢动物",
          content: [
            "石炭纪的大气氧含量高达35%（现代为21%），这可能与大规模森林的光合作用有关。高氧环境被认为是石炭纪巨型节肢动物出现的关键因素。巨脉蜻蜓（Meganeura）翼展达70厘米，远古蜈蚣（Arthropleura）体长超过2米。这些动物的巨大体型可能得益于高氧环境下气管呼吸系统的效率提升。",
            "石炭纪森林的大规模碳埋藏形成了地球上最重要的煤炭资源。这些煤炭主要分布在欧洲、北美和中国的石炭纪地层中，是工业革命以来人类主要的能源来源。从某种意义上说，我们今天燃烧的煤炭，是3亿年前石炭纪森林储存的太阳能。",
          ],
        },
      ],
      citations: [
        {
          id: "berner-2003",
          authors: "Berner, R.A.",
          year: 2003,
          title: "The long-term carbon cycle, fossil fuels and atmospheric composition",
          journal: "Nature",
          doi: "10.1038/nature01820",
        },
        {
          id: "dudley-1998",
          authors: "Dudley, R.",
          year: 1998,
          title: "Atmospheric oxygen, giant Paleozoic insects and the evolution of aerial locomotor performance",
          journal: "Journal of Experimental Biology",
          doi: "10.1242/jeb.201.8.1043",
        },
      ],
    },
  },
];
