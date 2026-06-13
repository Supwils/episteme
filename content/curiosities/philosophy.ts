import type { Curiosity } from "@/lib/curiosities";

export const PHILOSOPHY_CURIOSITIES: Curiosity[] = [
  {
    id: "ship-of-theseus",
    title: "如果一艘船的木板被逐块换光，它还是原来那艘船吗？",
    detail:
      "忒修斯之船是一个两千多年仍未「解决」的悖论。更狠的版本：如果有人用换下的旧木板重新拼出一艘船，哪一艘才是「原来的」？它逼问的其实是「同一性」的本质。",
    tags: ["同一性", "悖论"],
    url: "/philosophy/concepts",
  },
  {
    id: "trolley-problem-origin",
    title: "「电车难题」是一位女哲学家在讨论堕胎时顺手提出的",
    detail:
      "菲利帕·富特（Philippa Foot）1967 年在一篇关于堕胎与双重效应原则的论文里举了这个例子。她大概没料到，半个世纪后它会成为自动驾驶伦理的标准考题。",
    source: "Foot, “The Problem of Abortion and the Doctrine of the Double Effect” (1967)",
    tags: ["电车难题", "伦理学"],
    url: "/philosophy/experiments",
  },
  {
    id: "wittgenstein-one-book",
    title: "20 世纪最有影响力的哲学家之一，生前只出版了一本哲学书",
    detail:
      "维特根斯坦生前只出版了薄薄的《逻辑哲学论》，还在书末宣布哲学问题已被解决、转身去当了小学教师。多年后他回到剑桥，又几乎推翻了自己早年的全部结论。",
    tags: ["维特根斯坦", "语言"],
    url: "/philosophy/thinkers/wittgenstein",
  },
  {
    id: "plato-real-name-wrestler",
    title: "「柏拉图」是一个摔跤绰号，这位哲学家曾是冠军级运动员",
    detail:
      "柏拉图的本名叫「阿里斯托克勒斯」，「柏拉图」是他教练给的外号，意思大约是「宽肩膀的人」。他确实赢得过两次地峡运动会的摔跤冠军——这位开创了形而上学的大哲学家，身体也完全不差。",
    source: "Diogenes Laertius, Lives of the Eminent Philosophers",
    tags: ["柏拉图", "古希腊"],
    url: "/philosophy",
  },
  {
    id: "descartes-cogito-french-first",
    title: "「我思故我在」最初不是用拉丁文写的，而是法文",
    detail:
      "笛卡尔在 1637 年的《谈谈方法》里用法文写下「je pense, donc je suis」，刻意选择法文是为了让更广泛的读者读到。我们今天熟知的拉丁文版本「cogito, ergo sum」直到 1644 年才出现在《哲学原理》里。",
    source: "Descartes, Discours de la méthode (1637)",
    tags: ["笛卡尔", "认识论"],
    url: "/philosophy",
  },
  {
    id: "socrates-never-wrote",
    title: "苏格拉底从未写下任何东西，我们「知道」的他全靠别人转述",
    detail:
      "西方哲学最重要的人物之一，本人一个字都没留下。我们今天读到的所有「苏格拉底思想」，都来自他学生柏拉图、色诺芬等人的记录——而这些记录彼此之间常常矛盾。",
    tags: ["苏格拉底", "古希腊"],
    url: "/philosophy",
  },
  {
    id: "kant-never-left-hometown",
    title: "康德几乎一生未离开家乡半径 100 公里，却彻底改变了整个哲学世界",
    detail:
      "伊曼努尔·康德一生都在普鲁士的哥尼斯堡（今俄罗斯加里宁格勒）度过，最远只去过约 100 公里外的村庄做家庭教师。他的规律散步是当地居民对表的依据，而他的《纯粹理性批判》颠覆了整个西方形而上学传统。",
    source: "Kuehn, Kant: A Biography (2001)",
    tags: ["康德", "德国哲学"],
    url: "/philosophy",
  },
  {
    id: "nietzsche-god-is-dead-misread",
    title: "尼采说「上帝死了」，根本不是在谈论无神论",
    detail:
      "「上帝死了」首次出现在尼采 1882 年的《快乐的科学》里。尼采的意思是：欧洲文明赖以存在的价值体系已经崩塌，而人们还没有意识到这场危机。这是一个文化诊断，不是一句宗教宣言。",
    source: "Nietzsche, Die fröhliche Wissenschaft (1882)",
    tags: ["尼采", "道德哲学"],
    url: "/philosophy",
  },
  {
    id: "pythagoras-bean-cult",
    title: "毕达哥拉斯领导着一个严禁吃蚕豆的哲学秘密教团",
    detail:
      "毕达哥拉斯不只是数学家——他主持一个有严格戒律的学派，其中包括禁止吃蚕豆（据说因为蚕豆藏着灵魂）、禁止穿羊毛、禁止碰白公鸡，新入门者还要沉默五年。一些古代资料甚至记载他是为了不穿越一片豆田逃命而被捕杀的。",
    source: "Diogenes Laertius, Lives of the Eminent Philosophers",
    tags: ["毕达哥拉斯", "古希腊"],
    url: "/philosophy",
  },
  {
    id: "jeremy-bentham-auto-icon",
    title: "功利主义哲学创始人死后 190 年仍「出席」大学会议",
    detail:
      "杰里米·边沁生前在遗嘱里要求将自己的骨骼保存并展示。他的「自体图标」——真实骨骼撑着原装衣物、头部换用蜡像——至今仍在伦敦大学学院展柜中展出，偶尔还被推进会议室「出席」理事会。",
    source: "UCL Museums & Collections, Auto-icon documentation",
    tags: ["边沁", "功利主义"],
    url: "/philosophy",
  },
  {
    id: "spinoza-excommunication",
    title: "斯宾诺莎被所在社区以史上最严厉的措辞开除，原因至今成谜",
    detail:
      "1656 年，年仅 23 岁的巴鲁赫·斯宾诺莎被阿姆斯特丹葡萄牙犹太社区以「令人憎恶的异端邪说与可怕行为」为由逐出——措辞之严厉在该社区的历史上绝无仅有。奇怪的是，现存的驱逐令根本没写明具体罪名，那时他甚至还没写下任何哲学著作。",
    source: 'NEH, "Why Spinoza Was Excommunicated" (2012)',
    tags: ["斯宾诺莎", "17世纪"],
    url: "/philosophy",
  },
  {
    id: "john-stuart-mill-prodigy",
    title: "约翰·斯图尔特·密尔 3 岁学希腊文，8 岁学拉丁文，却说自己「从未有过童年」",
    detail:
      "密尔的父亲詹姆斯·密尔是功利主义者边沁的信徒，为了培养一个哲学天才，让儿子在 3 岁开始学希腊文、8 岁开始学拉丁文、14 岁之前读完大部分经典。密尔晚年回忆，他从没有同龄玩伴，也不被允许浪费时间。",
    source: "J.S. Mill, Autobiography (1873)",
    tags: ["密尔", "功利主义"],
    url: "/philosophy",
  },
  {
    id: "simone-de-beauvoir-becomes-woman",
    title: "「女人不是天生的，而是被塑造的」——这句话在 1949 年出版时引发轩然大波",
    detail:
      "西蒙娜·德·波伏娃在《第二性》里提出，「女人」是一种社会建构而非自然事实，这个观点来自萨特的存在主义——存在先于本质，人没有固定本性。该书在法国出版后立刻被列为禁书，梵蒂冈将其放入禁书目录。",
    source: "de Beauvoir, Le Deuxième Sexe (1949)",
    tags: ["波伏娃", "女性主义"],
    url: "/philosophy",
  },
  {
    id: "diogenes-barrel-alexander",
    title: "亚历山大大帝亲自拜访住在桶里的哲学家，对方的回答让他哑口无言",
    detail:
      "犬儒哲学家第欧根尼住在一个大瓮里，拒绝一切物质财产。据记载，征服了大半个世界的亚历山大大帝前来拜访，问他有什么愿望，他回答：「请你走开，别挡住我的阳光。」亚历山大事后说，如果他不是亚历山大，他希望自己是第欧根尼。",
    source: "Diogenes Laertius, Lives of the Eminent Philosophers",
    tags: ["第欧根尼", "犬儒主义"],
    url: "/philosophy",
  },
  {
    id: "hegel-one-student-misunderstood",
    title: "据说黑格尔临终前说：「只有一个人真正理解了我，而他也误解了我」",
    detail:
      "这句话最早见于克尔凯郭尔的著作，是否真为黑格尔所说尚有争议。但它精准描述了一个历史事实：黑格尔是西方哲学史上最难读懂的人之一，连他自己的学生也分裂成「左派」和「右派」两个对立阵营，对他的思想得出截然相反的结论。",
    source: "Kierkegaard, Concluding Unscientific Postscript (1846)",
    tags: ["黑格尔", "德国唯心主义"],
    url: "/philosophy",
  },
  {
    id: "zhuangzi-butterfly-dream",
    title: "2300 年前，一位中国哲学家用一个梦把「真实」与「虚幻」的界限彻底抹去",
    detail:
      "庄子在《齐物论》里写道：他梦见自己变成一只蝴蝶，醒来后不知道自己究竟是「梦到自己是蝴蝶的庄周」，还是「正在梦到自己是庄周的蝴蝶」。这个思想实验比笛卡尔的「我思故我在」早了将近两千年，却指向同一个问题。",
    source: "《庄子·齐物论》，约公元前 4 世纪",
    tags: ["庄子", "道家"],
    url: "/philosophy",
  },
  {
    id: "hannah-arendt-banality-of-evil",
    title: "「平庸之恶」——大屠杀不是因为怪物，而是因为一个不动脑子的普通官僚",
    detail:
      "1961 年，汉娜·阿伦特作为《纽约客》记者旁听了纳粹战犯艾希曼的审判。她震惊地发现，这个负责将数百万人送进毒气室的人，既不疯狂也不残忍，只是一个拒绝独立思考、只会执行命令的平庸小官员。她把这种现象称为「恶的平庸性」。",
    source: "Arendt, Eichmann in Jerusalem: A Report on the Banality of Evil (1963)",
    tags: ["阿伦特", "政治哲学"],
    url: "/philosophy",
  },
  {
    id: "aristotle-womens-teeth",
    title: "亚里士多德认为女性比男性少几颗牙齿——他结了两次婚，却从未数过",
    detail:
      "亚里士多德在著作中断言女性的牙齿数少于男性，尽管他两次成婚，却显然从未想过张开妻子的嘴数一数。哲学家伯特兰·罗素后来以此为例，讽刺脱离实验的纯粹推理有多么不可靠。",
    source:
      "Bertrand Russell, The Impact of Science on Society (1952); Aristotle, History of Animals",
    tags: ["亚里士多德", "哲学史"],
    url: "/philosophy",
  },
  {
    id: "pascal-wager",
    title: "帕斯卡用一道赌局证明：即使你只有万分之一的概率相信上帝，也应该去信",
    detail:
      "布莱兹·帕斯卡是一位数学天才，他把「信仰上帝」设计成一道期望值计算题：如果上帝存在且你相信，你赢得无限的永生；如果上帝不存在，你只损失了有限的尘世快乐。无论上帝存在的概率多小，数学上的「最优策略」都是选择相信。",
    source: "Pascal, Pensées (约 1670 年遗稿出版)",
    tags: ["帕斯卡", "宗教哲学"],
    url: "/philosophy",
  },
  {
    id: "foucault-ship-of-fools",
    title: "中世纪欧洲曾把精神病人装上船送走——福柯发现这才是现代「理性」的起点",
    detail:
      "米歇尔·福柯在《疯癫与文明》里揭示，中世纪欧洲城市会将精神病人装上「愚人船」送到别处，疯癫在当时反而被认为具有某种神圣性。17 世纪理性主义兴起后，人们开始大规模关押精神病人，「正常」与「疯癫」的现代边界才由此产生。",
    source: "Foucault, Folie et Déraison (1961)",
    tags: ["福柯", "权力与知识"],
    url: "/philosophy",
  },
];
