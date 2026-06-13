import type { DeepReadingProps } from "../components/DeepReading";

const DEEP_READING_DATA: Record<string, DeepReadingProps> = {
  trilobite: {
    introduction:
      "三叶虫是古生代海洋中最具代表性的节肢动物之一，从寒武纪早期出现到二叠纪末期灭绝，生存了近3亿年。它们的化石在全球各地被发现，是古生物学研究中最重要的模式生物之一。",
    sections: [
      {
        title: "形态与适应",
        content: [
          "三叶虫的身体分为头甲、胸甲和尾甲三部分，这也是其名称的由来。它们拥有复杂的复眼结构，由方解石晶体组成，是已知最早的视觉系统之一。不同种类的三叶虫眼睛结构差异巨大，反映了它们对不同光照环境的适应。",
          "三叶虫的外骨骼由几丁质和碳酸钙组成，能够在生长过程中蜕皮。这种外骨骼不仅提供了保护，还为肌肉提供了附着点，使它们能够在海底灵活移动。",
        ],
      },
      {
        title: "生态角色与多样性",
        content: [
          "三叶虫占据了多种生态位，从滤食者到掠食者，从浅海到深海都有分布。寒武纪时期，三叶虫是海洋中数量最丰富的大型生物之一，与奥陶纪的鹦鹉螺、志留纪的板足鲎共同构成了古生代海洋生态系统的基石。",
          "全球已发现超过20,000种三叶虫化石，它们的多样性变化与古生代的海平面升降、氧气含量变化和大灭绝事件密切相关。",
        ],
      },
    ],
    citations: [
      {
        id: "fortey-1990",
        authors: "Fortey, R.A.",
        year: 1990,
        title: "Trilobites",
        journal: "Natural History",
      },
      {
        id: "clarkson-1998",
        authors: "Clarkson, E.N.K.",
        year: 1998,
        title: "Invertebrate Palaeontology and Evolution",
        journal: "Chapman & Hall",
      },
      {
        id: "paterson-2011",
        authors: "Paterson, J.R. et al.",
        year: 2011,
        title: "Acute vision in the giant Cambrian predator Anomalocaris",
        journal: "Nature",
        doi: "10.1038/nature10216",
      },
    ],
  },
  "homo-sapiens": {
    introduction:
      "智人是现存唯一的人属物种，约30万年前在非洲演化出现。凭借抽象思维、语言能力和复杂的社会组织，智人迅速扩散到全球每个角落，深刻改变了地球的生态系统。",
    sections: [
      {
        title: "认知革命与行为现代性",
        content: [
          "约7万年前，智人经历了一场认知革命，开始使用符号思维和抽象语言。这一转变使智人能够建立超过150人的社会网络，进行大规模合作，发展出复杂的文化、宗教和技术。",
          "行为现代性的出现标志着智人从单纯的生物物种转变为能够主动改造环境的文明建造者。洞穴艺术、骨针、复合工具等证据表明，智人已经具备了计划、创新和传承知识的能力。",
        ],
      },
      {
        title: "全球扩散与生态影响",
        content: [
          "智人于约6.5万年前离开非洲，沿着海岸线和内陆通道迅速扩散到亚洲、欧洲、澳大利亚和美洲。每到一处，智人都对当地生态系统产生了深远影响，与大型动物群的灭绝在时间上高度吻合。",
          "农业革命（约1.2万年前）进一步放大了智人的生态影响。定居生活、人口增长和土地改造使智人成为地球上最具影响力的物种，其活动已经足以在地质记录中留下痕迹。",
        ],
      },
      {
        title: "遗传混合与人类多样性",
        content: [
          "基因组研究揭示，智人在扩散过程中与尼安德特人和丹尼索瓦人发生了多次杂交。现代非洲以外人群的基因组中约含1-4%的尼安德特人DNA，而大洋洲人群则携带更多的丹尼索瓦人基因。",
          "这些古老的基因流入可能帮助智人适应了新的环境，例如高海拔地区的基因适应和免疫系统的增强。人类的遗传多样性是数万年演化和迁徙的见证。",
        ],
      },
    ],
    citations: [
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
      {
        id: "hublin-2017",
        authors: "Hublin, J.J. et al.",
        year: 2017,
        title: "New fossils from Jebel Irhoud and the pan-African origin of Homo sapiens",
        journal: "Nature",
        doi: "10.1038/nature22336",
      },
    ],
  },
  megalodon: {
    introduction:
      "巨齿鲨是地球历史上最大的掠食性鲨鱼，生活在约2300万到360万年前。它的体型可达18米，咬合力估计超过10吨，是海洋生态系统中的顶级掠食者。",
    sections: [
      {
        title: "形态与捕食策略",
        content: [
          "巨齿鲨的身体构造极为强大，拥有厚实的锥形牙齿和巨大的颚部。其牙齿化石长度可达18厘米，边缘呈锯齿状，适合撕裂大型猎物的肉和骨骼。",
          "古生物学家通过牙齿形态和体型比例推断，巨齿鲨的咬合力是已知动物中最强的，能够轻易咬碎鲸鱼的肋骨。这种强大的捕食能力使它成为新生代海洋食物链的顶端。",
        ],
      },
      {
        title: "灭绝原因",
        content: [
          "巨齿鲨的灭绝与全球海水温度下降、鲸鱼迁徙模式改变以及大白鲨等新兴掠食者的竞争有关。约360万年前，巨齿鲨从化石记录中消失。",
          "最近的研究表明，巨齿鲨的灭绝可能与海洋生态系统的大规模重组有关。气候变化导致猎物分布改变，而巨齿鲨的巨大体型在能量获取效率上变得不再有利。",
        ],
      },
    ],
    citations: [
      {
        id: "pimiento-2016",
        authors: "Pimiento, C. & Clements, C.F.",
        year: 2016,
        title: "The Geographical Distribution of the Giant Shark Otodus megalodon",
        journal: "PLOS ONE",
        doi: "10.1371/journal.pone.0151012",
      },
      {
        id: "gottfried-1996",
        authors: "Gottfried, M.D. et al.",
        year: 1996,
        title: "Size, Skeletal Anatomy, and Growth of the Giant Shark Carcharocles megalodon",
        journal: "Great White Sharks: The Biology of Carcharodon carcharias",
      },
    ],
  },
  archaeopteryx: {
    introduction:
      "始祖鸟是恐龙向鸟类演化的关键过渡化石，生活在约1.5亿年前的晚侏罗世。它同时拥有爬行动物的特征（牙齿、长尾骨）和鸟类的特征（羽毛、翅膀），是演化论最有力的证据之一。",
    sections: [
      {
        title: "过渡特征",
        content: [
          "始祖鸟的化石展示了爬行动物和鸟类特征的完美结合。它的羽毛结构与现代鸟类几乎相同，但骨骼结构仍保留了大量恐龙特征，如带有牙齿的颚部、长而骨化的尾椎，以及前肢上的爪。",
          "这些特征使始祖鸟成为研究鸟类起源的关键证据。它证明了鸟类是从兽脚类恐龙演化而来，而非独立起源的脊椎动物类群。",
        ],
      },
      {
        title: "飞行能力",
        content: [
          "始祖鸟是否具备主动飞行能力仍有争议。它的胸骨缺乏现代鸟类的龙骨突，表明飞行肌肉可能不够发达。但其羽毛的不对称结构暗示它至少具备滑翔能力。",
          "最新的CT扫描研究表明，始祖鸟的内耳结构与飞行鸟类相似，暗示它可能具备一定的飞行或滑翔能力。这为理解飞行能力的演化提供了重要线索。",
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
  anomalocaris: {
    introduction:
      "奇虾是寒武纪海洋中的顶级掠食者，生活在约5.2亿年前。它属于已灭绝的放射齿目（Radiodonta），是地球上最早的大型掠食动物之一，代表着寒武纪大爆发中复杂捕食生态的建立。",
    sections: [
      {
        title: "身体构造与捕食器官",
        content: [
          "奇虾最显著的特征是头部前端一对分节的抓握附肢（frontal appendages），布满向内的尖刺，用于捕捉猎物；口部呈环形（oral cone），由多块板片围成。早期发现时，这对附肢、环形口与躯干曾被分别误认为虾、水母与海参三种不同生物，「奇虾」（意为「奇异的虾」）之名正源于此。",
          "奇虾身体两侧排列着叶状的桨片（lobes），通过波动游泳，是当时少数能主动追击猎物的动物。不同种类体长从约30厘米到数十厘米不等，在以毫米至厘米级生物为主的寒武纪海洋中堪称巨兽。",
        ],
      },
      {
        title: "复眼与生态地位",
        content: [
          "2011年，研究者在澳大利亚发现了保存精美的奇虾复眼化石，每只眼睛由超过16,000个小眼（ommatidia）组成——这是已知最早的高分辨率视觉系统之一，表明奇虾是依赖视觉的活跃掠食者（Paterson et al., 2011）。",
          "传统观点认为奇虾以三叶虫等带壳动物为食，但近年对其附肢力学的研究显示，它可能更适合捕食柔软或薄壳的猎物，而非压碎坚硬的三叶虫外骨骼。无论如何，奇虾的出现标志着捕食者与被捕食者「军备竞赛」的开启，深刻塑造了寒武纪动物的演化方向。",
        ],
      },
    ],
    citations: [
      {
        id: "whittington-briggs-1985",
        authors: "Whittington, H.B. & Briggs, D.E.G.",
        year: 1985,
        title: "The largest Cambrian animal, Anomalocaris, Burgess Shale, British Columbia",
        journal: "Philosophical Transactions of the Royal Society B",
        doi: "10.1098/rstb.1985.0586",
      },
      {
        id: "paterson-2011",
        authors: "Paterson, J.R. et al.",
        year: 2011,
        title:
          "Acute vision in the giant Cambrian predator Anomalocaris and the origin of compound eyes",
        journal: "Nature",
        doi: "10.1038/nature10689",
      },
    ],
  },
  dunkleosteus: {
    introduction:
      "邓氏鱼是泥盆纪晚期（约3.6亿年前）海洋中的顶级掠食者，属于已灭绝的盾皮鱼类（Placodermi）。它的头部和胸部覆盖着厚重的骨质甲胄，是有颌脊椎动物早期演化中令人印象深刻的代表。",
    sections: [
      {
        title: "颌部与捕食方式",
        content: [
          "邓氏鱼没有真正的牙齿，取而代之的是颌骨边缘自我磨锐的骨质刃板（self-sharpening bony blades）。两片刃板像剪刀般咬合，足以剪断甲胄猎物。它还拥有四连杆机构（four-bar linkage）式的颌部，能在极短时间内张口，产生强大的吸力捕食。",
          "对其颌部力学的生物力学建模显示，邓氏鱼的咬合力在前端尖端可达数千牛顿，位列已知鱼类中最强之列（Anderson & Westneat, 2007），使其能够捕食包括其他盾皮鱼在内的带甲猎物。",
        ],
      },
      {
        title: "体型之争与灭绝",
        content: [
          "长期以来，邓氏鱼（Dunkleosteus terrelli）的体长估计高达6–10米，但这些数字基于头甲与全长的简单外推。2023年的一项研究改用现生鱼类的眼眶–体长关系重新估算，认为其体长更可能在约3.4米左右——仍是当时的庞然大物，但远小于早期想象（Engelman, 2023）。",
          "盾皮鱼类在泥盆纪末大灭绝（Hangenberg 事件）中全军覆没。它们曾是泥盆纪「鱼类时代」的霸主，却未能跨入石炭纪，生态位最终由软骨鱼类和硬骨鱼类接替。",
        ],
      },
    ],
    citations: [
      {
        id: "anderson-westneat-2007",
        authors: "Anderson, P.S.L. & Westneat, M.W.",
        year: 2007,
        title: "Feeding mechanics and bite force modelling of the skull of Dunkleosteus terrelli",
        journal: "Biology Letters",
        doi: "10.1098/rsbl.2006.0569",
      },
      {
        id: "engelman-2023",
        authors: "Engelman, R.K.",
        year: 2023,
        title:
          "A Devonian Fish Tale: A New Method of Body Length Estimation Suggests Much Smaller Sizes for Dunkleosteus terrelli",
        journal: "Diversity",
        doi: "10.3390/d15030318",
      },
    ],
  },
  tyrannosaurus: {
    introduction:
      "霸王龙（Tyrannosaurus rex）生活在白垩纪末期（约6800万–6600万年前）的北美洲，是有史以来最强大的陆生掠食者之一。它在恐龙时代的最后篇章中称霸，直到希克苏鲁伯撞击引发的大灭绝。",
    sections: [
      {
        title: "咬合力与捕食",
        content: [
          "霸王龙拥有粗壮的颅骨和锥形巨齿，咬合力估计高达约35,000–57,000牛顿，是已知陆生动物中最强的之一（Bates & Falkingham, 2012）。它能咬穿骨骼——粪化石中发现的碎骨证实了这一点。其双眼朝前，具备良好的立体视觉与深度感知。",
          "关于霸王龙是纯粹的掠食者还是食腐者曾有长期争论。当前共识认为它是机会主义的顶级掠食者：既主动捕猎，也不放过腐肉。愈合的咬痕化石表明它确实攻击活体猎物。",
        ],
      },
      {
        title: "生长、皮肤与羽毛之争",
        content: [
          "骨组织学研究显示，霸王龙在青少年期经历爆发式生长，每年可增重数百公斤，约20岁达到成体。它的成长曲线呈现典型的「青春期猛长」模式。",
          "尽管许多较小的暴龙类亲属披有原始羽毛，但2017年对霸王龙皮肤印痕的研究发现其体表大部分覆盖鳞片而非羽毛（Bell et al., 2017）——巨大的体型可能使散热比保温更重要，从而抑制了羽毛覆盖。",
        ],
      },
    ],
    citations: [
      {
        id: "bates-falkingham-2012",
        authors: "Bates, K.T. & Falkingham, P.L.",
        year: 2012,
        title: "Estimating maximum bite performance in Tyrannosaurus rex using multi-body dynamics",
        journal: "Biology Letters",
        doi: "10.1098/rsbl.2012.0056",
      },
      {
        id: "bell-2017",
        authors: "Bell, P.R. et al.",
        year: 2017,
        title:
          "Tyrannosauroid integument reveals conflicting patterns of gigantism and feather evolution",
        journal: "Biology Letters",
        doi: "10.1098/rsbl.2017.0092",
      },
    ],
  },
  smilodon: {
    introduction:
      "剑齿虎（Smilodon）是更新世（约250万–1万年前）美洲的标志性掠食者。它并非现代虎的近亲，而是猫科中已灭绝的剑齿虎亚科代表，以一对长达约18厘米的上犬齿闻名。",
    sections: [
      {
        title: "剑齿的用法与咬杀机制",
        content: [
          "剑齿虎的长犬齿侧向脆弱，无法承受挣扎猎物的扭力，因此它不能像现代大猫那样直接锁喉绞杀。生物力学研究表明，它先用异常粗壮的前肢将猎物按倒固定，再以精准的「剪切式咬杀」（canine shear-bite）切开猎物喉部的软组织，造成快速失血（McHenry et al., 2007）。",
          "与体型相近的狮子相比，剑齿虎的咬合力其实较弱——它的杀伤力来自犬齿的切割与前肢的制服力，而非颌部力量。这是一套高度特化、却也限制了猎物范围的捕食策略。",
        ],
      },
      {
        title: "社会行为与灭绝",
        content: [
          "美国洛杉矶拉布雷亚沥青坑（La Brea Tar Pits）出土了大量剑齿虎化石，许多个体带有愈合的重伤——这被一些学者解读为群体成员相互照料、剑齿虎可能营群居生活的证据（Carbone et al., 2009），但这一解释仍有争议。",
          "约1万年前，剑齿虎随更新世末大型动物群（megafauna）一同灭绝。气候剧变与大型猎物消失，叠加人类扩张的影响，被认为是其灭绝的主要原因——高度特化的捕食方式让它难以适应猎物结构的骤变。",
        ],
      },
    ],
    citations: [
      {
        id: "mchenry-2007",
        authors: "McHenry, C.R. et al.",
        year: 2007,
        title:
          "Supermodeled sabercat, predatory behavior in Smilodon fatalis revealed by high-resolution 3D computer simulation",
        journal: "PNAS",
        doi: "10.1073/pnas.0706086104",
      },
      {
        id: "carbone-2009",
        authors: "Carbone, C. et al.",
        year: 2009,
        title:
          "Parallels between playbacks and Pleistocene tar seeps suggest sociality in an extinct sabretooth cat, Smilodon",
        journal: "Biology Letters",
        doi: "10.1098/rsbl.2008.0526",
      },
    ],
  },
};

export function getDeepReading(speciesId: string): DeepReadingProps | undefined {
  return DEEP_READING_DATA[speciesId];
}
