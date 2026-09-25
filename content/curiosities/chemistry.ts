import type { Curiosity } from "@/lib/curiosities";

export const CHEMISTRY_CURIOSITIES: Curiosity[] = [
  {
    id: "kekule-benzene-not-a-snake-dream",
    title: "凯库勒的苯环，不是炉边一条蛇咬住了自己的尾巴",
    detail:
      "1865 年印在《巴黎化学会公报》上的，是一张可核对的六元连通式：六个碳首尾相连，一取代只有一种、二取代有三种。蛇衔尾的故事是他 1890 年在柏林苯节上的公开修辞，比论文晚了二十五年——梦可以当故事听，结构式是靠取代计数站住的。",
    source:
      "Kekulé, “Sur la constitution des substances aromatiques”, Bulletin de la Société Chimique de Paris (1865)",
    tags: ["凯库勒", "苯", "结构"],
    url: "/chemistry/milestones/kekule-1865-benzene",
  },
  {
    id: "mendeleev-corrected-gallium-density",
    title: "门捷列夫写信纠正别人刚发现的新元素：你的密度测错了",
    detail:
      "他在周期表铝的下方空了一格，按梵语前缀把它叫做「类铝」（eka-aluminium），连密度都写成约 5.9。1875 年布瓦博德朗（Lecoq de Boisbaudran）分离出镓，初测只有约 4.7；门捷列夫看完论文就写信说请重测。复测后果然靠近预言。空格不是装饰，是一条敢跟实验室对赌的定律。",
    source:
      "Mendeleev, Journal of the Russian Chemical Society (1869); Lecoq de Boisbaudran, Comptes Rendus (1875)",
    tags: ["门捷列夫", "镓", "周期律"],
    url: "/chemistry/milestones/mendeleev-periodic-law",
  },
  {
    id: "noble-gases-not-absolutely-inert",
    title: "「惰性气体」这个名字，被氙气当场打脸",
    detail:
      "氦氖氩氪氙氡一度被当成化学隐士：满壳层、懒得成键。1962 年 Bartlett 做出六氟合铂酸氙，教条裂开——较重的氙、氪在特定条件下完全能成键。它们极不活泼，不是绝对不反应；连「稀有」也不准，氩占干燥空气约 0.93%，比二氧化碳还多。",
    source: "Bartlett, “Xenon hexafluoroplatinate(V)”, Proceedings of the Chemical Society (1962)",
    tags: ["稀有气体", "氙", "化学键"],
    url: "/chemistry/substances/noble-gases",
  },
  {
    id: "cfc-ozone-industrial-accident-not-cabal",
    title: "没有人密谋毁掉天空——冰箱里的气体自己爬上了平流层",
    detail:
      "氟利昂在对流层几乎不反应，曾被当成安全制冷剂。Molina 与 Rowland 1974 年指出：这份「惰性」只是把氯推迟到更高的地方，紫外线会打出氯原子，再催化销毁臭氧。这是工业分子遇上光化学的意外，不是一场毁掉天空的阴谋；蒙特利尔议定书后来把这条机制写成了全球制度。",
    source: "Molina & Rowland, Nature 249: 810–812 (1974)",
    tags: ["臭氧层", "氟利昂", "催化"],
    url: "/chemistry/milestones/rowland-molina-ozone-cfcs",
  },
  {
    id: "pasteur-tweezers-1848-tartaric",
    title: "二十六岁的巴斯德，用一把镊子把左右手从同一盘盐里挑了出来",
    detail:
      "外消旋酒石酸钠铵盐结出两套互为镜像的半面晶体。巴斯德（Pasteur）把它们分成两堆，溶进水里：一堆让偏振光向右偏，另一堆向左偏。旋光仪早就能量液体转不转；真正新的是——不旋光的那一份，原来是两只手混在一只盘子里。",
    source: "Pasteur, Comptes Rendus de l’Académie des Sciences (1848)",
    tags: ["巴斯德", "手性", "酒石酸"],
    url: "/chemistry/milestones/pasteur-1848-tartaric",
  },
  {
    id: "chirality-thalidomide-not-a-simple-left-right",
    title: "沙利度胺的教训，不是「左手分子有毒、右手无害」这么干净",
    detail:
      "手性（chirality）说的是：互为镜像的分子在普通烧瓶里几乎分不清，进了本身也是手性的身体，命运却可能分叉。反应停（thalidomide）常被用来讲这个故事，但真正的告诫更复杂——体内还会消旋，致畸测试、孕期证据和监管同样缺席。左右手要逐一测量，不能靠口号选边。",
    source: "Lenz, “A short history of thalidomide embryopathy”, Teratology (1988)",
    tags: ["手性", "沙利度胺", "药物"],
    url: "/chemistry/concepts/chirality",
  },
  {
    id: "diels-alder-molecules-keep-a-date",
    title: "两个分子像约好了似的，一步同时长出两根键、收成六元环",
    detail:
      "1928 年狄尔斯（Diels）与阿尔德（Alder）把共轭双烯按 1,4 加到活化双键上，一次操作里长出两根碳–碳键。看起来像排练过的合唱，当时桌上却没有轨道对称这张乐谱——那要等到 1965 年 Woodward–Hoffmann。先站住的是通法，后到的是「为什么允许」。",
    source:
      "Diels & Alder, “Synthesen in der hydroaromatischen Reihe”, Justus Liebigs Annalen der Chemie 460 (1928)",
    tags: ["狄尔斯–阿尔德", "六元环", "合成"],
    url: "/chemistry/milestones/diels-alder-1928",
  },
  {
    id: "water-densest-at-four-celsius",
    title: "水在 4°C 最重——湖才不会从湖底冻成一块死冰",
    detail:
      "几乎所有液体越冷越密、往下沉；水在约 4°C 密度最大，再冷反而膨胀。冰于是浮在表面当被子，底下仍有液态水给生命过冬。Hope 1805 年用对照柱把这件「反常」写成可重复的实验；氢键才是后来给出的分子理由。",
    source:
      "Hope, “Experiments and Observations upon the Contraction of Water by Heat at Low Temperatures”, Transactions of the Royal Society of Edinburgh (1805)",
    tags: ["水", "氢键", "密度"],
    url: "/chemistry/substances/water",
  },
  {
    id: "haber-ammonia-half-the-nitrogen",
    title: "你身体里大约一半的氮，可能走过一座合成氨工厂",
    detail:
      "空气里约 78% 是氮气，却几乎不能当肥料——三键把两个氮锁死。哈伯证明高压下能合成氨，博施把它放大成工厂；Erisman 等人 2008 年估计，到那时大约一半人类的食物依赖哈伯—博施氮。养活人口的不是「空气里有氮」，是把惰性的 N₂ 改写成植物能吃的活性氮。",
    source:
      "Erisman et al., “How a century of ammonia synthesis changed the world”, Nature Geoscience 1 (2008)",
    tags: ["合成氨", "哈伯", "固氮"],
    url: "/chemistry/substances/ammonia",
  },
  {
    id: "xray-not-a-snapshot-of-atoms",
    title: "X 射线晶体学看见的不是原子照片，是必须补相位的强度表",
    detail:
      "可见光有透镜，X 射线几乎没有。探测器记下的是结构因子振幅的平方，相位在平方里丢掉了——这就是相位问题。布拉格父子 1913 年把晶体衍射写成 nλ = 2d sinθ；原子坐标是后来用对称、化学约束和精修重建出来的，不是按下快门得到的。",
    source:
      "Bragg & Bragg, “The reflection of X-rays by crystals”, Proceedings of the Royal Society A 88 (1913)",
    tags: ["晶体学", "衍射", "相位"],
    url: "/chemistry/methods/x-ray-crystallography",
  },
  {
    id: "diamond-metastable-graphite-is-stable",
    title: "钻石并不是碳最安稳的样子——常压下更稳的是铅笔芯",
    detail:
      "金刚石与石墨都是纯碳，广告却把「永恒」写成最稳定。常温常压下石墨才是热力学稳定相，金刚石处于亚稳态，转化慢到地质年代才看得出来。硬与软不是碳原子的脾气，是 sp³ 三维网与 sp² 层状连接的差别。",
    source:
      "Berman & Simon, “On the graphite-diamond equilibrium”, Zeitschrift für Elektrochemie 59 (1955)",
    tags: ["金刚石", "石墨", "同素异形体"],
    url: "/chemistry/substances/carbon-allotropes",
  },
  {
    id: "polymer-not-one-molecular-weight",
    title: "聚合物没有「一个分子量」——同一化学式里住着一锅长短不一的链",
    detail:
      "聚乙烯可以写成 -(CH₂-CH₂)n-，真实样品却是不同链长的混合物。数均、重均和分散度描述的是分布，不是一颗分子的身份证。链太短伤韧性，太长则黏到无法成型——目标是适配用途的那一锅，不是把一个数字无限做大。",
    source: "Flory, Principles of Polymer Chemistry (1953)",
    tags: ["聚合物", "分子量", "塑料"],
    url: "/chemistry/substances/polymers",
  },
  {
    id: "wohler-urea-kidney-not-required",
    title: "维勒写信说：尿素不必经过肾脏，蒸发皿里也能长出来",
    detail:
      "他本想制备氰酸铵，蒸干后得到的晶体脾气对不上盐，却对得上尿里取出的尿素。1828 年那篇不足四页的短文证明的是鉴定，不是活力论隔夜崩塌——肾脏从尿素的必要来源里被拿掉了，有机分类账并没有在当年被整本替换。",
    source:
      "Wöhler, “Ueber künstliche Bildung des Harnstoffs”, Annalen der Physik und Chemie 88 (1828)",
    tags: ["维勒", "尿素", "异构"],
    url: "/chemistry/milestones/wohler-urea-synthesis",
  },
  {
    id: "perkin-failed-quinine-sold-purple",
    title: "十八岁的珀金没做成抗疟药，黑渣却把丝绸染成了洗不掉的紫",
    detail:
      "1856 年复活节，他按组成算术用煤焦油胺去凑奎宁，得到的是黑渣。酒精洗出的溶液把丝绸染成日晒也拿不掉的紫；同年八月英国专利 1984 号登记的是着色物质，不是药。第一种被按匹卖掉的煤焦油合成染料，来自一次真正失败的药合成。",
    source: "Perkin, British Patent 1984 (26 August 1856)",
    tags: ["珀金", "苯胺紫", "染料"],
    url: "/chemistry/milestones/perkin-1856-mauveine",
  },
  {
    id: "curie-seven-tonnes-tenth-gram",
    title: "七吨矿渣、近四年搅拌，换来大约 0.1 克氯化镭",
    detail:
      "沥青铀矿比纯铀还「吵」，说明里面藏着更活的未知元素。镭与钡几乎形影不离，没有任何一步沉淀能把它们拆开，只能靠盐酸里那一点溶解度差，分级结晶上千次。产出与投入之比约为一亿分之一——不是灵感，是把微小差异乘以巨大重复。",
    source:
      "Curie, Recherches sur les substances radioactives (1903); Nobel Lecture in Chemistry (1911)",
    tags: ["居里", "镭", "分离"],
    url: "/chemistry/figures/marie-curie",
  },
  {
    id: "urey-deuterium-one-millimetre",
    title: "感恩节底片上挪开的那一毫米，让氢被允许有第二种核",
    detail:
      "1931 年尤里、布里克韦德与墨菲在巴尔末线旁寻找事先算好的弱线：质量二的核会让波长向紫端移大约一毫米。普通氢里它们极弱，像光栅鬼线；液氢蒸发残渣把新线相对变亮，位置又对上约化质量，氢二才从猜想变成底片上的核素。",
    source: "Urey, Brickwedde & Murphy, “A Hydrogen Isotope of Mass 2”, Physical Review 39 (1932)",
    tags: ["氘", "尤里", "同位素"],
    url: "/chemistry/milestones/urey-1931-deuterium",
  },
];
