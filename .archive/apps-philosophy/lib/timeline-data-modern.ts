import type { TimelineEvent } from "./timeline-data";

export const MODERN_EVENTS: TimelineEvent[] = [
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

  // ── 1800–1950：现代哲学 ──
  {
    year: 1818,
    title: "叔本华发表《作为意志和表象的世界》",
    description:
      "叔本华以盲目的「意志」取代黑格尔的理性，主张人生本质上是痛苦，开创了悲观主义哲学传统。",
    era: "现代",
    category: "著作",
    figures: ["叔本华 Schopenhauer"],
    significance: 2,
  },
  {
    year: 1818,
    title: "马克思诞生",
    description:
      "卡尔·马克思将黑格尔辩证法翻转为历史唯物主义，以阶级斗争与剩余价值理论分析资本主义，深刻改变了世界历史。",
    era: "现代",
    category: "事件",
    figures: ["马克思 Karl Marx"],
    significance: 1,
  },
  {
    year: 1844,
    title: "马克思著《1844年经济学哲学手稿》",
    description:
      "青年马克思在《手稿》中提出异化劳动理论，揭示资本主义下人的本质力量如何被系统性地扭曲。",
    era: "现代",
    category: "著作",
    figures: ["马克思 Karl Marx"],
    significance: 1,
  },
  {
    year: 1848,
    title: "《共产党宣言》发表",
    description:
      "马克思与恩格斯合著的《共产党宣言》宣告阶级斗争是历史的推动力，影响了此后所有政治运动。",
    era: "现代",
    category: "著作",
    figures: ["马克思 Karl Marx", "恩格斯 Engels"],
    significance: 1,
  },
  {
    year: 1844,
    title: "尼采诞生",
    description:
      "弗里德里希·尼采宣告「上帝已死」，提出权力意志与超人学说，以价值重估颠覆了整个西方道德传统。",
    era: "现代",
    category: "事件",
    figures: ["尼采 Nietzsche"],
    significance: 1,
  },
  {
    year: 1859,
    title: "达尔文《物种起源》",
    description:
      "达尔文的进化论以自然选择解释物种起源，不仅重塑了生物学，也深刻挑战了目的论形而上学与宗教创世观。",
    era: "现代",
    category: "事件",
    figures: ["达尔文 Darwin"],
    significance: 2,
  },
  {
    year: 1867,
    title: "马克思发表《资本论》第一卷",
    description:
      "《资本论》系统分析资本主义生产方式，揭示商品拜物教与剩余价值的秘密，是政治经济学批判的奠基之作。",
    era: "现代",
    category: "著作",
    figures: ["马克思 Karl Marx"],
    significance: 1,
  },
  {
    year: 1883,
    title: "尼采著《查拉图斯特拉如是说》",
    description:
      "尼采以寓言形式宣告「超人」理想与「永恒轮回」思想，对存在主义与后现代思想产生深远影响。",
    era: "现代",
    category: "著作",
    figures: ["尼采 Nietzsche"],
    significance: 1,
  },
  {
    year: 1889,
    title: "尼采精神崩溃",
    description:
      "尼采在都灵目睹马匹受虐后精神崩溃，此后十年在母亲与妹妹的照料下度过余生，其思想在此后被广泛传播与误读。",
    era: "现代",
    category: "事件",
    figures: ["尼采 Nietzsche"],
    significance: 3,
  },
  {
    year: 1900,
    title: "弗洛伊德发表《梦的解析》",
    description:
      "弗洛伊德提出潜意识理论与梦的象征解读，精神分析不仅是一种治疗方法，更是一种关于人类存在的哲学。",
    era: "现代",
    category: "著作",
    figures: ["弗洛伊德 Freud"],
    significance: 2,
  },
  {
    year: 1900,
    title: "胡塞尔发表《逻辑研究》",
    description:
      "胡塞尔以「回到事物本身」开创现象学，提出意向性分析方法，影响了海德格尔、萨特与梅洛-庞蒂。",
    era: "现代",
    category: "著作",
    figures: ["胡塞尔 Husserl"],
    significance: 1,
  },
  {
    year: 1905,
    title: "爱因斯坦狭义相对论",
    description:
      "爱因斯坦的相对论彻底改变了时间与空间的哲学理解，对形而上学中的绝对时空观念构成根本挑战。",
    era: "现代",
    category: "事件",
    figures: ["爱因斯坦 Einstein"],
    significance: 2,
  },
  {
    year: 1913,
    title: "胡塞尔发表《纯粹现象学与现象学哲学的观念》",
    description:
      "胡塞尔在《观念I》中转向先验现象学，将「悬置」（epoché）方法系统化，试图为一切科学奠定绝对基础。",
    era: "现代",
    category: "著作",
    figures: ["胡塞尔 Husserl"],
    significance: 1,
  },
  {
    year: 1921,
    title: "维特根斯坦发表《逻辑哲学论》",
    description:
      "维特根斯坦以「凡能说的都能清楚地说」划定语言的界限，对不可言说者应保持沉默，终结了早期分析哲学的核心问题。",
    era: "现代",
    category: "著作",
    figures: ["维特根斯坦 Wittgenstein"],
    significance: 1,
  },
  {
    year: 1927,
    title: "海德格尔发表《存在与时间》",
    description:
      "海德格尔以此在（Dasein）重新追问存在的意义，分析向死而生、被抛与畏，是存在主义的哲学奠基。",
    era: "现代",
    category: "著作",
    figures: ["海德格尔 Heidegger"],
    significance: 1,
  },
  {
    year: 1933,
    title: "海德格尔加入纳粹党",
    description:
      "海德格尔公开支持纳粹政权并出任弗莱堡大学校长，其政治抉择成为20世纪哲学最深刻的伦理困境之一。",
    era: "现代",
    category: "事件",
    figures: ["海德格尔 Heidegger"],
    significance: 3,
  },
  {
    year: 1937,
    title: "胡塞尔著《欧洲科学的危机》",
    description:
      "晚年的胡塞尔诊断欧洲科学面临「意义丧失」的危机，提出「生活世界」概念，为技术时代的哲学反思开辟了道路。",
    era: "现代",
    category: "著作",
    figures: ["胡塞尔 Husserl"],
    significance: 1,
  },
  {
    year: 1943,
    title: "萨特发表《存在与虚无》",
    description:
      "萨特提出「存在先于本质」，人被抛入自由、被判处自由，自欺（mauvaise foi）是逃避自由的方式。",
    era: "现代",
    category: "著作",
    figures: ["萨特 Sartre"],
    significance: 1,
  },
  {
    year: 1945,
    title: "萨特发表「存在主义是一种人道主义」演讲",
    description:
      "萨特在巴黎的公开演讲将存在主义普及化，以「人是其所不是」回应马克思主义与基督教的批评。",
    era: "现代",
    category: "事件",
    figures: ["萨特 Sartre"],
    significance: 2,
  },
  {
    year: 1947,
    title: "阿多诺与霍克海默著《启蒙辩证法》",
    description:
      "法兰克福学派的奠基之作揭示启蒙理性如何异化为新的神话与统治工具，批判理论由此诞生。",
    era: "现代",
    category: "著作",
    figures: ["阿多诺 Adorno", "霍克海默 Horkheimer"],
    significance: 1,
  },
  {
    year: 1949,
    title: "波伏瓦发表《第二性》",
    description:
      "波伏瓦以「女人不是天生的，而是后天形成的」宣告女性主义存在主义，重新定义了性别与自由的哲学关系。",
    era: "现代",
    category: "著作",
    figures: ["波伏瓦 Simone de Beauvoir"],
    significance: 1,
  },
  {
    year: 1951,
    title: "维特根斯坦《哲学研究》遗稿",
    description:
      "后期维特根斯坦以「语言游戏」与「家族相似」取代图像论，语言的意义在于使用而非对应实在。",
    era: "现代",
    category: "著作",
    figures: ["维特根斯坦 Wittgenstein"],
    significance: 1,
  },
  {
    year: 1953,
    title: "维特根斯坦《哲学研究》出版",
    description:
      "《哲学研究》开创了日常语言哲学，影响了奥斯汀、赖尔与整个牛津学派，是20世纪分析哲学的转折点。",
    era: "现代",
    category: "著作",
    figures: ["维特根斯坦 Wittgenstein"],
    significance: 1,
  },

  // ── 1950–2025：当代哲学 ──
  {
    year: 1955,
    title: "列维纳斯发表《整体与无限》",
    description:
      "列维纳斯以「他者的面容」重建伦理学的第一哲学地位，回应了海德格尔存在论对伦理的遮蔽。",
    era: "当代",
    category: "著作",
    figures: ["列维纳斯 Levinas"],
    significance: 1,
  },
  {
    year: 1960,
    title: "伽达默尔发表《真理与方法》",
    description:
      "伽达默尔的哲学诠释学主张理解总是「视域融合」，反对方法论万能主义，重新定义了人文科学的认识论基础。",
    era: "当代",
    category: "著作",
    figures: ["伽达默尔 Gadamer"],
    significance: 1,
  },
  {
    year: 1962,
    title: "库恩发表《科学革命的结构》",
    description:
      "库恩以「范式转换」理论挑战科学进步的线性叙事，科学哲学从此不能忽视历史与社会维度。",
    era: "当代",
    category: "著作",
    figures: ["库恩 Thomas Kuhn"],
    significance: 1,
  },
  {
    year: 1966,
    title: "福柯发表《词与物》",
    description:
      "福柯提出「知识型」（épistémè）概念，揭示每个时代组织知识的深层规则，宣告「人之死」。",
    era: "当代",
    category: "著作",
    figures: ["福柯 Foucault"],
    significance: 1,
  },
  {
    year: 1967,
    title: "德里达发表三部奠基之作",
    description:
      "德里达在《论文字学》《书写与差异》《声音与现象》中提出解构主义，质疑西方形而上学的「逻各斯中心主义」。",
    era: "当代",
    category: "著作",
    figures: ["德里达 Derrida"],
    significance: 1,
  },
  {
    year: 1971,
    title: "罗尔斯发表《正义论》",
    description:
      "罗尔斯以「无知之幕」思想实验推导出正义两原则，复兴了规范性政治哲学，成为自由主义理论的里程碑。",
    era: "当代",
    category: "著作",
    figures: ["罗尔斯 Rawls"],
    significance: 1,
  },
  {
    year: 1975,
    title: "福柯发表《规训与惩罚》",
    description:
      "福柯以「全景监狱」隐喻分析权力如何通过规训渗透身体与灵魂，权力不只是压制，更是生产性的。",
    era: "当代",
    category: "著作",
    figures: ["福柯 Foucault"],
    significance: 1,
  },
  {
    year: 1976,
    title: "诺齐克发表《无政府、国家与乌托邦》",
    description:
      "诺齐克以「权利至上论」回应罗尔斯，主张最小国家，开启了自由主义内部的左右之争。",
    era: "当代",
    category: "著作",
    figures: ["诺齐克 Nozick"],
    significance: 2,
  },
  {
    year: 1981,
    title: "哈贝马斯发表《交往行为理论》",
    description:
      "哈贝马斯提出交往理性与「理想言说情境」，试图在工具理性泛滥的时代重建公共理性的规范基础。",
    era: "当代",
    category: "著作",
    figures: ["哈贝马斯 Habermas"],
    significance: 1,
  },
  {
    year: 1984,
    title: "德勒兹与瓜塔里发表《千高原》",
    description:
      "《千高原》以「块茎」思维挑战树状知识结构，游牧思想与生成本体论成为后结构主义的激进表达。",
    era: "当代",
    category: "著作",
    figures: ["德勒兹 Deleuze", "瓜塔里 Guattari"],
    significance: 2,
  },
  {
    year: 1985,
    title: "麦金太尔著《追寻美德》",
    description:
      "麦金太尔批判启蒙方案的失败，主张回归亚里士多德的美德伦理传统，是社群主义的重要代表。",
    era: "当代",
    category: "著作",
    figures: ["麦金太尔 MacIntyre"],
    significance: 2,
  },
  {
    year: 1989,
    title: "福山提出「历史终结论」",
    description:
      "弗朗西斯·福山宣称自由民主制是人类意识形态演进的终点，引发关于现代性与全球化的持久争论。",
    era: "当代",
    category: "思想",
    figures: ["福山 Francis Fukuyama"],
    significance: 2,
  },
  {
    year: 1992,
    title: "罗尔斯发表《政治自由主义》",
    description:
      "罗尔斯修正《正义论》，提出「重叠共识」概念，试图在多元社会中为正义原则找到最薄的共同基础。",
    era: "当代",
    category: "著作",
    figures: ["罗尔斯 Rawls"],
    significance: 1,
  },
  {
    year: 1995,
    title: "丹内特发表《意识的解释》",
    description:
      "丹内特以多重草稿模型挑战笛卡尔剧场，从自然主义立场消解意识的「困难问题」。",
    era: "当代",
    category: "著作",
    figures: ["丹内特 Dennett"],
    significance: 2,
  },
  {
    year: 1997,
    title: "帕菲特发表《理由与人格》",
    description:
      "帕菲特以人格同一性的消解挑战自我概念，其后果主义伦理学对当代道德哲学产生深远影响。",
    era: "当代",
    category: "著作",
    figures: ["帕菲特 Derek Parfit"],
    significance: 1,
  },
  {
    year: 2001,
    title: "哈贝马斯与拉辛格论辩宗教与公共理性",
    description:
      "哈贝马斯与后来的教皇本笃十六世就世俗理性与宗教在公共领域的角色展开对话，是21世纪最重要的政教关系讨论之一。",
    era: "当代",
    category: "事件",
    figures: ["哈贝马斯 Habermas", "拉辛格 Ratzinger"],
    significance: 3,
  },
  {
    year: 2001,
    title: "阿甘本发表《例外状态》",
    description:
      "阿甘本分析主权权力如何通过制造「例外状态」将人降格为「赤裸生命」，在反恐时代具有深刻警示意义。",
    era: "当代",
    category: "著作",
    figures: ["阿甘本 Agamben"],
    significance: 2,
  },
  {
    year: 2006,
    title: "努斯鲍姆发表《正义的前沿》",
    description:
      "努斯鲍姆以能力方法（Capabilities Approach）回应罗尔斯，将人的尊严与具体能力纳入正义的衡量标准。",
    era: "当代",
    category: "著作",
    figures: ["努斯鲍姆 Nussbaum"],
    significance: 2,
  },
  {
    year: 2009,
    title: "齐泽克的公共哲学影响持续扩大",
    description:
      "齐泽克将拉康精神分析与马克思主义结合，以大众文化为切入点批判意识形态，成为当代最活跃的公共哲学家之一。",
    era: "当代",
    category: "事件",
    figures: ["齐泽克 Zizek"],
    significance: 3,
  },
  {
    year: 2013,
    title: "皮凯蒂发表《21世纪资本论》",
    description:
      "皮凯蒂以历史数据证明资本回报率大于经济增长率（r > g），将分配正义问题重新推至政治哲学的前台。",
    era: "当代",
    category: "著作",
    figures: ["皮凯蒂 Piketty"],
    significance: 2,
  },
  {
    year: 2014,
    title: "人工智能伦理成为哲学议题",
    description:
      "随着深度学习突破，Bostrom 等哲学家开始系统讨论超级智能风险，AI伦理从边缘走向哲学主流。",
    era: "当代",
    category: "事件",
    figures: ["博斯特罗姆 Bostrom"],
    significance: 1,
  },
  {
    year: 2017,
    title: "哈拉维发表《与麻烦共存》",
    description:
      "唐娜·哈拉维提出「克苏鲁纪」（Chthulucene）概念，超越人类中心主义，呼吁与其他物种共生的伦理。",
    era: "当代",
    category: "著作",
    figures: ["哈拉维 Donna Haraway"],
    significance: 2,
  },
  {
    year: 2020,
    title: "阿甘本论疫情与例外状态",
    description:
      "新冠疫情期间阿甘本警告紧急状态常态化风险，引发关于公共卫生与公民自由的激烈哲学辩论。",
    era: "当代",
    category: "事件",
    figures: ["阿甘本 Agamben"],
    significance: 3,
  },
  {
    year: 2022,
    title: "ChatGPT 引发存在性风险讨论",
    description:
      "大语言模型的突破使AI对齐（alignment）、意识判定与人机关系成为哲学界最紧迫的前沿问题。",
    era: "当代",
    category: "事件",
    figures: [],
    significance: 1,
  },
  {
    year: 2023,
    title: "加速主义 vs 有效利他主义之争",
    description:
      "围绕AI发展速度与安全性的哲学争论公开化：加速创新还是谨慎对齐？硅谷与学术界的哲学交锋前所未有地激烈。",
    era: "当代",
    category: "事件",
    figures: [],
    significance: 2,
  },
  {
    year: 2024,
    title: "AI 意识问题进入分析哲学主流",
    description:
      "随着大模型展现出类人推理能力，哲学界围绕机器意识判定标准（如整合信息论、全局工作空间理论）展开密集讨论。",
    era: "当代",
    category: "思想",
    figures: [],
    significance: 1,
  },
  {
    year: 2025,
    title: "技术哲学与后人类主义的交汇",
    description:
      "脑机接口、基因编辑与强AI三条技术线并行推进，迫使哲学重新追问「何为人类」这一最古老的问题。",
    era: "当代",
    category: "思想",
    figures: [],
    significance: 1,
  },
];
