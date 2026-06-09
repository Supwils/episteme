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
  "archaeopteryx": {
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
};

export function getDeepReading(speciesId: string): DeepReadingProps | undefined {
  return DEEP_READING_DATA[speciesId];
}
