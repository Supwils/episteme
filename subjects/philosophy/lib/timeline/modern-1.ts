import type { TimelineEvent } from "../timeline-data";

export const MEDIEVAL_AND_EARLY_MODERN_EVENTS: TimelineEvent[] = [
  // ── 500–1500：中世纪 ──
  {
    year: 524,
    title: "波爱修斯著《哲学的慰藉》",
    description:
      "波爱修斯在狱中写下《哲学的慰藉》，以柏拉图主义面对命运，成为中世纪早期最重要的哲学文本之一。",
    era: "近代",
    category: "著作",
    figures: ["波爱修斯 Boethius"],
    significance: 2,
  },
  {
    year: 810,
    title: "阿尔-肯迪开创阿拉伯亚里士多德主义",
    description:
      "被称为「阿拉伯哲学家之首」的阿尔-肯迪将亚里士多德哲学引入伊斯兰思想传统，开启了阿拉伯哲学的黄金时代。",
    era: "近代",
    category: "学派",
    figures: ["阿尔-肯迪 Al-Kindi"],
    significance: 2,
  },
  {
    year: 980,
    title: "阿维森纳著《治疗论》",
    description:
      "阿维森纳（伊本·西纳）的《治疗论》是中世纪最庞大的哲学百科全书，其存在与本质区分影响了阿奎那。",
    era: "近代",
    category: "著作",
    figures: ["阿维森纳 Avicenna"],
    significance: 1,
  },
  {
    year: 1033,
    title: "安瑟尔谟提出本体论证明",
    description:
      "安瑟尔谟提出上帝存在的本体论证明：我们能设想一个「无法设想更伟大者」，该概念必然包含存在。",
    era: "近代",
    category: "思想",
    figures: ["安瑟尔谟 Anselm of Canterbury"],
    significance: 2,
  },
  {
    year: 1126,
    title: "阿维罗伊诞生",
    description:
      "阿维罗伊（伊本·鲁世德）对亚里士多德的注释统治了欧洲大学三个世纪，提出「双重真理」论调和哲学与宗教。",
    era: "近代",
    category: "事件",
    figures: ["阿维罗伊 Averroes"],
    significance: 2,
  },
  {
    year: 1200,
    title: "朱熹理学体系成熟",
    description:
      "朱熹集北宋理学之大成，以「理气」二元论与格物致知方法论建构了新儒学的庞大体系，影响东亚七百年。",
    era: "近代",
    category: "思想",
    figures: ["朱熹 Zhu Xi"],
    significance: 1,
  },
  {
    year: 1225,
    title: "阿奎那诞生",
    description:
      "托马斯·阿奎那将亚里士多德哲学与基督教神学系统融合，著《神学大全》，确立了经院哲学的最高成就。",
    era: "近代",
    category: "事件",
    figures: ["阿奎那 Thomas Aquinas"],
    significance: 1,
  },
  {
    year: 1260,
    title: "阿奎那著《神学大全》",
    description:
      "《神学大全》以五路论证证明上帝存在，用亚里士多德的四因说解释存在者，是中世纪综合理性的巅峰之作。",
    era: "近代",
    category: "著作",
    figures: ["阿奎那 Thomas Aquinas"],
    significance: 1,
  },
  {
    year: 1274,
    title: "罗杰·培根推动经验方法",
    description:
      "方济各会学者罗杰·培根倡导实验科学方法，被视为近代经验主义的先驱。",
    era: "近代",
    category: "思想",
    figures: ["罗杰·培根 Roger Bacon"],
    significance: 2,
  },
  {
    year: 1347,
    title: "奥卡姆剃刀",
    description:
      "奥卡姆的威廉提出简约原则——「如无必要，勿增实体」，削弱了经院哲学的形而上学大厦，预示了唯名论的兴起。",
    era: "近代",
    category: "思想",
    figures: ["奥卡姆的威廉 William of Ockham"],
    significance: 2,
  },
  {
    year: 1472,
    title: "王阳明诞生",
    description:
      "王阳明提出「致良知」与「知行合一」，将朱熹向外格物的理学翻转为向内求心的心学，是儒学的第二次大转折。",
    era: "近代",
    category: "事件",
    figures: ["王阳明 Wang Yangming"],
    significance: 1,
  },
  {
    year: 1500,
    title: "王阳明龙场悟道",
    description:
      "王阳明在贵州龙场驿贬谪期间顿悟「心即理」，从此开启心学体系，影响日本、韩国思想至今。",
    era: "近代",
    category: "事件",
    figures: ["王阳明 Wang Yangming"],
    significance: 1,
  },

  // ── 1500–1800：近代哲学 ──
  {
    year: 1517,
    title: "马基雅维利著《君主论》",
    description:
      "马基雅维利将政治从道德中剥离，以现实主义态度分析权力运作，开创了现代政治科学。",
    era: "近代",
    category: "著作",
    figures: ["马基雅维利 Machiavelli"],
    significance: 2,
  },
  {
    year: 1543,
    title: "哥白尼革命",
    description:
      "哥白尼《天体运行论》推翻地心说，日心说不仅改变了宇宙观，更从根本上动摇了人类的自我理解。",
    era: "近代",
    category: "事件",
    figures: ["哥白尼 Copernicus"],
    significance: 2,
  },
  {
    year: 1596,
    title: "笛卡尔诞生",
    description:
      "笛卡尔以「我思故我在」确立主体性，将哲学从经院传统中解放出来，被称为「近代哲学之父」。",
    era: "近代",
    category: "事件",
    figures: ["笛卡尔 Descartes"],
    significance: 1,
  },
  {
    year: 1637,
    title: "笛卡尔发表《方法论》",
    description:
      "《谈谈方法》提出系统怀疑法与「我思故我在」（Cogito），确立了理性主义哲学的出发点。",
    era: "近代",
    category: "著作",
    figures: ["笛卡尔 Descartes"],
    significance: 1,
  },
  {
    year: 1632,
    title: "斯宾诺莎诞生",
    description:
      "斯宾诺莎以泛神论重构实体概念，主张神即自然（Deus sive Natura），在理性主义与自由思想之间架起桥梁。",
    era: "近代",
    category: "事件",
    figures: ["斯宾诺莎 Spinoza"],
    significance: 1,
  },
  {
    year: 1632,
    title: "洛克诞生",
    description:
      "约翰·洛克提出经验主义认识论与天赋人权论，其政治哲学直接影响了美国独立宣言与法国大革命。",
    era: "近代",
    category: "事件",
    figures: ["洛克 John Locke"],
    significance: 1,
  },
  {
    year: 1670,
    title: "斯宾诺莎著《神学政治论》",
    description:
      "《神学政治论》以历史批评方法解读《圣经》，主张思想自由与政教分离，斯宾诺莎因此被逐出犹太社区。",
    era: "近代",
    category: "著作",
    figures: ["斯宾诺莎 Spinoza"],
    significance: 2,
  },
  {
    year: 1689,
    title: "洛克发表《人类理解论》",
    description:
      "洛克提出人心如「白板」（tabula rasa），一切知识来源于经验，奠定了英国经验主义传统。",
    era: "近代",
    category: "著作",
    figures: ["洛克 John Locke"],
    significance: 1,
  },
  {
    year: 1710,
    title: "贝克莱提出主观唯心论",
    description:
      "乔治·贝克莱提出「存在即被感知」（esse est percipi），将洛克的经验主义推向唯心主义的极端。",
    era: "近代",
    category: "思想",
    figures: ["贝克莱 George Berkeley"],
    significance: 2,
  },
  {
    year: 1711,
    title: "休谟诞生",
    description:
      "大卫·休谟将经验主义推至极致，质疑因果必然性与归纳法，从独断论的迷梦中惊醒了康德。",
    era: "近代",
    category: "事件",
    figures: ["休谟 David Hume"],
    significance: 1,
  },
  {
    year: 1739,
    title: "休谟发表《人性论》",
    description:
      "《人性论》系统质疑因果关系、自我同一性与归纳推理，是经验主义最彻底的哲学表达。",
    era: "近代",
    category: "著作",
    figures: ["休谟 David Hume"],
    significance: 1,
  },
  {
    year: 1724,
    title: "康德诞生",
    description:
      "伊曼努尔·康德以三大批判重建形而上学，以先验哲学调和理性主义与经验主义，重塑了整个近代哲学的议程。",
    era: "近代",
    category: "事件",
    figures: ["康德 Immanuel Kant"],
    significance: 1,
  },
  {
    year: 1762,
    title: "卢梭著《社会契约论》",
    description:
      "卢梭提出「公意」（volonté générale）概念与人民主权论，直接点燃了法国大革命的思想火炬。",
    era: "近代",
    category: "著作",
    figures: ["卢梭 Rousseau"],
    significance: 2,
  },
  {
    year: 1781,
    title: "康德发表《纯粹理性批判》",
    description:
      "《纯粹理性批判》划定知识的界限，提出先天综合判断，区分现象与物自体，被称为哲学中的「哥白尼革命」。",
    era: "近代",
    category: "著作",
    figures: ["康德 Immanuel Kant"],
    significance: 1,
  },
  {
    year: 1785,
    title: "康德发表《道德形而上学奠基》",
    description:
      "康德提出定言命令——「仅依据你能同时意愿它成为普遍法则的准则行动」——义务论伦理学的基石。",
    era: "近代",
    category: "著作",
    figures: ["康德 Immanuel Kant"],
    significance: 1,
  },
  {
    year: 1770,
    title: "黑格尔诞生",
    description:
      "黑格尔以辩证法重构逻辑、历史与精神，提出「绝对精神」概念，德国古典哲学的集大成者。",
    era: "近代",
    category: "事件",
    figures: ["黑格尔 Hegel"],
    significance: 1,
  },
  {
    year: 1807,
    title: "黑格尔发表《精神现象学》",
    description:
      "《精神现象学》追踪意识从感到绝对知识的辩证历程，「主奴辩证法」成为后世哲学的不竭源泉。",
    era: "近代",
    category: "著作",
    figures: ["黑格尔 Hegel"],
    significance: 1,
  },
];
