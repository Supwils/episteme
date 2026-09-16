// Reading-path catalog, split out of reading-paths.ts so the accessors there
// stay readable. Data only — no behaviour.
import type { ReadingPath } from "./reading-paths";

export const READING_PATHS: ReadingPath[] = [
  {
    slug: "western-philosophy",
    title: "西方哲学之旅",
    subtitle: "从米利都的水到维特根斯坦的沉默",
    description:
      "两千六百年里，西方思想家轮番追问同一组问题：世界由什么构成？我们能知道什么？应当如何生活？这条路线按时间顺序串起十四位关键人物，让你像读一部思想传记那样，看见问题如何被一代代人接手、改写、再交给下一个人。",
    domain: "philosophy",
    domainLabel: "哲学思想",
    accent: "#10b981",
    steps: [
      {
        title: "泰勒斯",
        href: "/philosophy/thinkers/thales",
        blurb: "西方第一位哲学家：用「水」而非神话解释万物",
      },
      {
        title: "赫拉克利特",
        href: "/philosophy/thinkers/heraclitus",
        blurb: "万物流变，人不能两次踏入同一条河",
      },
      {
        title: "巴门尼德",
        href: "/philosophy/thinkers/parmenides",
        blurb: "存在者存在：用纯逻辑否定变化",
      },
      {
        title: "苏格拉底",
        href: "/philosophy/thinkers/socrates",
        blurb: "把哲学从天上拉回人间，以诘问为方法",
      },
      {
        title: "柏拉图",
        href: "/philosophy/thinkers/plato",
        blurb: "理型论与洞穴：可感世界之外的真实",
      },
      {
        title: "亚里士多德",
        href: "/philosophy/thinkers/aristotle",
        blurb: "把目光转回经验世界，奠定逻辑与科学",
      },
      {
        title: "奥古斯丁",
        href: "/philosophy/thinkers/augustine",
        blurb: "将柏拉图主义带入基督教，追问时间与意志",
      },
      {
        title: "托马斯·阿奎那",
        href: "/philosophy/thinkers/aquinas",
        blurb: "调和亚里士多德与信仰的经院巅峰",
      },
      {
        title: "笛卡尔",
        href: "/philosophy/thinkers/descartes",
        blurb: "我思故我在：近代哲学的怀疑起点",
      },
      { title: "休谟", href: "/philosophy/thinkers/hume", blurb: "经验主义的极致：因果只是习惯" },
      { title: "康德", href: "/philosophy/thinkers/kant", blurb: "调和理性与经验，划定知识的界限" },
      {
        title: "黑格尔",
        href: "/philosophy/thinkers/hegel",
        blurb: "辩证法与精神的历史性自我展开",
      },
      {
        title: "尼采",
        href: "/philosophy/thinkers/nietzsche",
        blurb: "上帝已死：对一切价值的重估",
      },
      {
        title: "维特根斯坦",
        href: "/philosophy/thinkers/wittgenstein",
        blurb: "哲学问题的尽头是语言的界限",
      },
    ],
  },
  {
    slug: "great-questions",
    title: "哲学的大问题",
    subtitle: "那些没有标准答案、却塑造了文明的追问",
    description:
      "哲学不靠结论前进，而靠问题。这条路线绕开人物与流派，直接面对十二个最根本的疑问——什么是真实、我们能知道什么、自由意志是否存在、我们应当如何生活。每一篇都呈现历史上互相对立的回答，让你自己加入这场仍未结束的对话。",
    domain: "philosophy",
    domainLabel: "哲学思想",
    accent: "#34d399",
    steps: [
      { title: "什么是真实？", href: "/philosophy/questions/what-is-real" },
      { title: "我们能知道什么？", href: "/philosophy/questions/what-can-we-know" },
      { title: "什么是知识？", href: "/philosophy/questions/what-is-knowledge" },
      { title: "什么是真理？", href: "/philosophy/questions/what-is-truth" },
      { title: "什么是意识？", href: "/philosophy/questions/what-is-consciousness" },
      { title: "我们有自由意志吗？", href: "/philosophy/questions/do-we-have-free-will" },
      { title: "什么是正义？", href: "/philosophy/questions/what-is-justice" },
      { title: "我们应当如何生活？", href: "/philosophy/questions/how-should-we-live" },
      { title: "什么是美？", href: "/philosophy/questions/what-is-beauty" },
      { title: "什么是时间？", href: "/philosophy/questions/what-is-time" },
      { title: "生命有意义吗？", href: "/philosophy/questions/what-is-meaning" },
      { title: "上帝存在吗？", href: "/philosophy/questions/does-god-exist" },
    ],
  },
  {
    slug: "thought-experiments",
    title: "十二个思想实验",
    subtitle: "用想象做的哲学实验",
    description:
      "没有实验室，哲学家就在头脑里做实验。一个虚构的情境，往往比千言万语更能逼出我们直觉里的矛盾。从柏拉图的洞穴到普特南的孪生地球，这条路线带你走过十二个最著名的思想实验，每一个都会让你对「理所当然」的东西重新犹豫一次。",
    domain: "philosophy",
    domainLabel: "哲学思想",
    accent: "#059669",
    steps: [
      {
        title: "洞穴寓言",
        href: "/philosophy/experiments/platos-cave",
        blurb: "我们看到的是真实，还是墙上的影子？",
      },
      {
        title: "忒修斯之船",
        href: "/philosophy/experiments/ship-of-theseus",
        blurb: "零件全部换过，它还是同一艘船吗？",
      },
      {
        title: "电车难题",
        href: "/philosophy/experiments/trolley-problem",
        blurb: "牺牲一人救五人，你拉不拉杆？",
      },
      {
        title: "小提琴家",
        href: "/philosophy/experiments/violinist",
        blurb: "身体自主权与堕胎伦理的经典类比",
      },
      {
        title: "体验机器",
        href: "/philosophy/experiments/experience-machine",
        blurb: "如果快乐可以被模拟，你愿意接入吗？",
      },
      {
        title: "无知之幕",
        href: "/philosophy/experiments/veil-of-ignorance",
        blurb: "不知自己身份时，你会如何设计社会？",
      },
      {
        title: "中文房间",
        href: "/philosophy/experiments/chinese-room",
        blurb: "会处理符号，等于真的理解吗？",
      },
      {
        title: "哲学僵尸",
        href: "/philosophy/experiments/philosophical-zombies",
        blurb: "行为完全相同却没有意识，可能吗？",
      },
      {
        title: "玛丽的房间",
        href: "/philosophy/experiments/marys-room",
        blurb: "知道一切物理事实，仍缺了「感受」吗？",
      },
      {
        title: "缸中之脑",
        href: "/philosophy/experiments/brain-in-vat",
        blurb: "你如何确定自己不是缸中的大脑？",
      },
      {
        title: "孪生地球",
        href: "/philosophy/experiments/twin-earth",
        blurb: "意义在头脑里，还是在世界里？",
      },
      {
        title: "葛梯尔问题",
        href: "/philosophy/experiments/gettier-problem",
        blurb: "「被证成的真信念」就是知识吗？",
      },
    ],
  },
  {
    slug: "cosmos-story",
    title: "宇宙的故事",
    subtitle: "从大爆炸到时间的尽头",
    description:
      "一百三十八亿年，压缩成一条可以读完的故事线。从最初的暴胀与第一缕光，到第一代恒星点燃、星系编织成网，再到暗能量主宰下宇宙的最终命运——这条路线按时间顺序讲述整部宇宙史诗，每一章都建立在上一章之上。",
    domain: "cosmology",
    domainLabel: "宇宙学",
    accent: "#3b82f6",
    steps: [
      {
        title: "大爆炸理论",
        href: "/cosmology/knowledge-base/大爆炸理论",
        blurb: "一切的开端：时间与空间的起点",
      },
      {
        title: "宇宙暴胀",
        href: "/cosmology/knowledge-base/cosmic-inflation",
        blurb: "诞生瞬间的指数级膨胀，抹平了宇宙",
      },
      {
        title: "宇宙微波背景",
        href: "/cosmology/knowledge-base/宇宙微波背景",
        blurb: "38 万年时留下的「婴儿照」",
      },
      {
        title: "恒星核合成",
        href: "/cosmology/knowledge-base/恒星核合成",
        blurb: "构成你的元素，都在恒星内部锻造",
      },
      {
        title: "第一代恒星与宇宙黎明",
        href: "/cosmology/knowledge-base/第一代恒星与宇宙黎明",
        blurb: "黑暗时代结束，第一缕星光亮起",
      },
      {
        title: "星系形成与演化",
        href: "/cosmology/knowledge-base/星系形成与演化",
        blurb: "气体如何坍缩成星系",
      },
      {
        title: "宇宙大尺度结构",
        href: "/cosmology/knowledge-base/宇宙大尺度结构",
        blurb: "星系沿暗物质纤维织成宇宙之网",
      },
      {
        title: "暗物质与暗能量",
        href: "/cosmology/knowledge-base/暗物质与暗能量",
        blurb: "占宇宙 95% 的未知主角",
      },
      {
        title: "宇宙的最终命运",
        href: "/cosmology/knowledge-base/宇宙的最终命运",
        blurb: "热寂、大撕裂还是大坍缩？",
      },
    ],
  },
  {
    slug: "physics-grand-tour",
    title: "物理学大厦",
    subtitle: "从牛顿的苹果到黑洞的视界",
    description:
      "物理学是一座层层叠起的大厦：每一层新理论既推翻又包含旧的。这条路线从牛顿的运动定律出发，经过电磁与热力学，越过相对论对时空的重写，最终抵达量子世界与黑洞。读完，你会看到这些看似割裂的领域如何拼成一幅统一的图景。",
    domain: "universe-physics",
    domainLabel: "物理学",
    accent: "#6366f1",
    steps: [
      {
        title: "牛顿三大定律",
        href: "/universe-physics/knowledge-base/经典物理--牛顿三大定律",
        blurb: "经典力学的三条基石",
      },
      {
        title: "万有引力",
        href: "/universe-physics/knowledge-base/经典物理--万有引力",
        blurb: "让苹果落地与行星运行的同一种力",
      },
      {
        title: "能量守恒",
        href: "/universe-physics/knowledge-base/经典物理--能量守恒",
        blurb: "物理学最深刻的不变量",
      },
      {
        title: "麦克斯韦方程组",
        href: "/universe-physics/knowledge-base/电磁学--麦克斯韦方程组",
        blurb: "四条方程统一了电、磁与光",
      },
      {
        title: "熵与时间之箭",
        href: "/universe-physics/knowledge-base/热力学--熵与时间之箭",
        blurb: "为什么时间只朝一个方向流动",
      },
      {
        title: "狭义相对论",
        href: "/universe-physics/knowledge-base/相对论--狭义相对论",
        blurb: "时间与空间不再绝对",
      },
      {
        title: "广义相对论",
        href: "/universe-physics/knowledge-base/相对论--广义相对论",
        blurb: "引力即时空的弯曲",
      },
      {
        title: "波粒二象性",
        href: "/universe-physics/knowledge-base/量子物理--波粒二象性",
        blurb: "光与物质既是波也是粒子",
      },
      {
        title: "不确定性原理",
        href: "/universe-physics/knowledge-base/量子物理--不确定性原理",
        blurb: "测量本身有不可逾越的极限",
      },
      {
        title: "黑洞",
        href: "/universe-physics/knowledge-base/相对论--黑洞",
        blurb: "时空被压垮处：广义相对论的极端预言",
      },
    ],
  },
  {
    slug: "great-theorems",
    title: "改变世界的数学定理",
    subtitle: "十个最优美、最深刻的证明",
    description:
      "数学的进步往往凝结在一个个定理里。这条路线挑出十个最具分量的成果——从两千年前的勾股定理，到二十世纪揭示数学自身边界的哥德尔不完备定理。它们不只是公式，更是人类思维抵达过的最远处。",
    domain: "mathematics",
    domainLabel: "数学与逻辑",
    accent: "#8b5cf6",
    steps: [
      {
        title: "勾股定理",
        href: "/mathematics/theorems/pythagorean-theorem",
        blurb: "最古老也最著名的几何定理",
      },
      {
        title: "欧拉恒等式",
        href: "/mathematics/theorems/euler-identity",
        blurb: "被誉为「最美公式」的五常数相遇",
      },
      {
        title: "微积分基本定理",
        href: "/mathematics/theorems/fundamental-theorem-of-calculus",
        blurb: "把微分与积分连成一体",
      },
      {
        title: "代数基本定理",
        href: "/mathematics/theorems/fundamental-theorem-of-algebra",
        blurb: "复数让每个多项式都有根",
      },
      {
        title: "素数定理",
        href: "/mathematics/theorems/prime-number-theorem",
        blurb: "素数分布的隐藏规律",
      },
      {
        title: "费马大定理",
        href: "/mathematics/theorems/fermat-last-theorem",
        blurb: "三百年悬案，怀尔斯终结",
      },
      {
        title: "哥德尔不完备定理",
        href: "/mathematics/theorems/godel-incompleteness",
        blurb: "任何系统都有它无法证明的真命题",
      },
      {
        title: "P 与 NP 问题",
        href: "/mathematics/theorems/p-vs-np",
        blurb: "计算机科学最重要的未解之谜",
      },
      {
        title: "黎曼猜想",
        href: "/mathematics/theorems/riemann-hypothesis",
        blurb: "素数与零点：百万美元难题",
      },
      {
        title: "庞加莱猜想",
        href: "/mathematics/theorems/poincare-conjecture",
        blurb: "佩雷尔曼证明并拒领菲尔兹奖",
      },
    ],
  },
  {
    slug: "economics-giants",
    title: "经济学的巨人",
    subtitle: "从看不见的手到行为经济学",
    description:
      "经济学如何从道德哲学的一个分支，成长为今天影响每个人生活的学科？这条路线按思想脉络串起十二位塑造了它的人——从亚当·斯密的市场，到凯恩斯与哈耶克的世纪之争，再到卡尼曼把心理学带进经济决策。",
    domain: "economics",
    domainLabel: "经济学",
    accent: "#e8b84a",
    steps: [
      {
        title: "亚当·斯密",
        href: "/economics/economists/adam-smith",
        blurb: "「看不见的手」与现代经济学的奠基",
      },
      {
        title: "大卫·李嘉图",
        href: "/economics/economists/david-ricardo",
        blurb: "比较优势：自由贸易的理论基石",
      },
      {
        title: "卡尔·马克思",
        href: "/economics/economists/karl-marx",
        blurb: "对资本主义最深刻的批判",
      },
      {
        title: "阿尔弗雷德·马歇尔",
        href: "/economics/economists/alfred-marshall",
        blurb: "供给与需求：新古典经济学集大成",
      },
      {
        title: "约翰·梅纳德·凯恩斯",
        href: "/economics/economists/john-maynard-keynes",
        blurb: "政府干预如何拯救萧条中的经济",
      },
      {
        title: "弗里德里希·哈耶克",
        href: "/economics/economists/friedrich-hayek",
        blurb: "为自由市场与价格机制辩护",
      },
      {
        title: "米尔顿·弗里德曼",
        href: "/economics/economists/milton-friedman",
        blurb: "货币主义与自由放任的旗手",
      },
      { title: "约翰·纳什", href: "/economics/economists/john-nash", blurb: "博弈论与纳什均衡" },
      {
        title: "罗纳德·科斯",
        href: "/economics/economists/ronald-coase",
        blurb: "交易成本与产权的革命性洞见",
      },
      {
        title: "丹尼尔·卡尼曼",
        href: "/economics/economists/daniel-kahneman",
        blurb: "把心理学带入经济学，开创行为经济学",
      },
      {
        title: "阿马蒂亚·森",
        href: "/economics/economists/amartya-sen",
        blurb: "重新定义发展与福利：能力进路",
      },
      {
        title: "埃莉诺·奥斯特罗姆",
        href: "/economics/economists/elinor-ostrom",
        blurb: "公共资源未必走向悲剧",
      },
    ],
  },
  {
    slug: "mind-experiments",
    title: "心智的经典实验",
    subtitle: "心理学如何用实验照亮人心",
    description:
      "我们为何服从、为何从众、为何自欺？心理学用一个个精巧的实验，把这些难以言说的人性变成可观察、可测量的现象。这条路线带你重走十二个改变了学科的经典实验——以及它们引发的伦理争议与重复性危机。",
    domain: "psychology",
    domainLabel: "心理学",
    accent: "#d4789c",
    steps: [
      {
        title: "巴甫洛夫的狗",
        href: "/psychology/experiments/pavlov-classical-conditioning",
        blurb: "经典条件反射：行为主义的起点",
      },
      {
        title: "米尔格拉姆服从实验",
        href: "/psychology/experiments/milgram-obedience",
        blurb: "普通人会服从命令伤害他人吗？",
      },
      {
        title: "阿希从众实验",
        href: "/psychology/experiments/asch-conformity",
        blurb: "群体压力如何扭曲我们的判断",
      },
      {
        title: "斯坦福监狱实验",
        href: "/psychology/experiments/stanford-prison",
        blurb: "情境的力量与它的争议",
      },
      {
        title: "认知失调实验",
        href: "/psychology/experiments/festinger-carlsmith-1959",
        blurb: "我们如何为自己的行为编造理由",
      },
      {
        title: "波波玩偶实验",
        href: "/psychology/experiments/bobo-doll",
        blurb: "攻击行为是观察学来的",
      },
      {
        title: "棉花糖实验",
        href: "/psychology/experiments/marshmallow-test",
        blurb: "延迟满足与它被高估的预测力",
      },
      {
        title: "前景理论",
        href: "/psychology/experiments/kahneman-tversky-1979",
        blurb: "人对损失的恐惧远超对收益的渴望",
      },
      {
        title: "虚假记忆实验",
        href: "/psychology/experiments/loftus-car-crash-1974",
        blurb: "提问的措辞如何重塑记忆",
      },
      {
        title: "习得性无助",
        href: "/psychology/experiments/learned-helplessness",
        blurb: "无法控制的痛苦如何导致放弃",
      },
      {
        title: "利贝特自由意志实验",
        href: "/psychology/experiments/libet-free-will",
        blurb: "大脑在你「决定」之前就行动了？",
      },
      {
        title: "旁观者效应",
        href: "/psychology/experiments/darley-latane-1968",
        blurb: "人越多，伸出援手的人反而越少",
      },
    ],
  },
  {
    slug: "computing-pioneers",
    title: "计算的奠基者",
    subtitle: "从差分机到深度学习",
    description:
      "今天的数字世界，建立在一连串天才的洞见之上。这条路线沿时间顺序认识十二位先驱——从想象机械计算的巴贝奇与第一位程序员阿达，到定义「可计算」的图灵，再到点燃深度学习革命的辛顿。每一位都为这门年轻学科添上一块基石。",
    domain: "computer-science",
    domainLabel: "计算机科学",
    accent: "#4f9cf0",
    steps: [
      {
        title: "查尔斯·巴贝奇",
        href: "/computer-science/pioneers/charles-babbage",
        blurb: "构想了第一台通用计算机器",
      },
      {
        title: "阿达·洛芙莱斯",
        href: "/computer-science/pioneers/ada-lovelace",
        blurb: "写下第一段算法的「第一位程序员」",
      },
      {
        title: "乔治·布尔",
        href: "/computer-science/pioneers/george-boole",
        blurb: "布尔代数：数字逻辑的语言",
      },
      {
        title: "艾伦·图灵",
        href: "/computer-science/pioneers/alan-turing",
        blurb: "图灵机定义了「可计算」的边界",
      },
      {
        title: "冯·诺依曼",
        href: "/computer-science/pioneers/john-von-neumann",
        blurb: "存储程序架构：现代计算机蓝图",
      },
      {
        title: "克劳德·香农",
        href: "/computer-science/pioneers/claude-shannon",
        blurb: "信息论：把信息变成可度量的比特",
      },
      {
        title: "格蕾丝·霍珀",
        href: "/computer-science/pioneers/grace-hopper",
        blurb: "编译器与高级语言的先驱",
      },
      {
        title: "约翰·麦卡锡",
        href: "/computer-science/pioneers/john-mccarthy",
        blurb: "提出「人工智能」并发明 Lisp",
      },
      {
        title: "艾兹格·迪杰斯特拉",
        href: "/computer-science/pioneers/edsger-dijkstra",
        blurb: "结构化编程与最短路径算法",
      },
      {
        title: "高德纳",
        href: "/computer-science/pioneers/donald-knuth",
        blurb: "《计算机程序设计艺术》与算法分析",
      },
      {
        title: "蒂姆·伯纳斯-李",
        href: "/computer-science/pioneers/tim-berners-lee",
        blurb: "发明万维网",
      },
      {
        title: "杰弗里·辛顿",
        href: "/computer-science/pioneers/geoffrey-hinton",
        blurb: "深度学习革命的奠基者",
      },
    ],
  },
  {
    slug: "human-civilization",
    title: "人类文明简史",
    subtitle: "从远古到当代，再眺望未来",
    description:
      "一万两千年的人类故事，分成七个时代。从农业革命与最早的城市，经古典文明的轴心时代、中世纪的信仰与帝国，到近代的科学革命与工业化，再到塑造今日世界的现代与当代——这条路线按时间顺序走过每一个时代，最后停在对未来的眺望。",
    domain: "human-history",
    domainLabel: "人类历史",
    accent: "#f59e0b",
    steps: [
      {
        title: "远古时期",
        href: "/human-history/eras/prehistoric",
        blurb: "从直立行走到农业革命与最早的城市",
      },
      {
        title: "古典时期",
        href: "/human-history/eras/classical",
        blurb: "轴心时代：希腊、罗马、波斯、印度与中国",
      },
      {
        title: "中世纪",
        href: "/human-history/eras/medieval",
        blurb: "信仰、帝国与跨欧亚的交流网络",
      },
      { title: "近代", href: "/human-history/eras/earlyModern", blurb: "大航海、科学革命与启蒙" },
      {
        title: "现代",
        href: "/human-history/eras/modern",
        blurb: "工业化、民族国家与两次世界大战",
      },
      {
        title: "当代",
        href: "/human-history/eras/contemporary",
        blurb: "冷战后的全球化与数字时代",
      },
      { title: "未来展望", href: "/human-history/eras/future", blurb: "人类文明可能走向何方" },
    ],
  },
  {
    slug: "life-on-earth",
    title: "四十亿年生命史",
    subtitle: "从第一个细胞到智人",
    description:
      "如果把地球的生命史压成一天，人类只在最后几秒登场。这条路线挑出十四个关键节点，串起这部四十亿年的演化史诗——从最初的细胞与大氧化事件，到寒武纪的生命大爆发、植物登陆、恐龙的兴亡，直到哺乳动物与我们自己的出现。",
    domain: "life-science",
    domainLabel: "生命科学",
    accent: "#4a9e6f",
    steps: [
      {
        title: "地球的形成",
        href: "/life-science/timeline/earth-formation",
        blurb: "约 46 亿年前，行星诞生",
      },
      {
        title: "最早的生命",
        href: "/life-science/timeline/earliest-life",
        blurb: "原始海洋中出现第一批生命",
      },
      {
        title: "最后共同祖先 LUCA",
        href: "/life-science/timeline/luca",
        blurb: "今天所有生物的共同源头",
      },
      {
        title: "大氧化事件",
        href: "/life-science/timeline/great-oxidation",
        blurb: "蓝藻把氧气灌满大气，重塑地球",
      },
      {
        title: "真核细胞的出现",
        href: "/life-science/timeline/eukaryotes",
        blurb: "内共生：复杂细胞的起点",
      },
      {
        title: "多细胞生命",
        href: "/life-science/timeline/first-multicellular",
        blurb: "细胞开始协作，走向复杂",
      },
      {
        title: "寒武纪大爆发",
        href: "/life-science/timeline/cambrian-explosion",
        blurb: "几乎所有动物门类在此涌现",
      },
      {
        title: "植物登陆",
        href: "/life-science/timeline/plant-landing",
        blurb: "生命走出海洋，绿化大地",
      },
      {
        title: "鱼类时代",
        href: "/life-science/timeline/age-of-fish",
        blurb: "脊椎动物的繁盛与登陆前夜",
      },
      {
        title: "恐龙崛起",
        href: "/life-science/timeline/dinosaur-rise",
        blurb: "爬行动物主宰陆地一亿六千万年",
      },
      {
        title: "哺乳动物登场",
        href: "/life-science/timeline/mammals-appear",
        blurb: "在恐龙阴影下蛰伏的祖先",
      },
      {
        title: "白垩纪大灭绝",
        href: "/life-science/timeline/kpg-extinction",
        blurb: "小行星终结恐龙时代",
      },
      {
        title: "灵长类的出现",
        href: "/life-science/timeline/first-primates",
        blurb: "大灭绝后哺乳动物的辐射演化",
      },
      {
        title: "智人登场",
        href: "/life-science/timeline/homo-sapiens",
        blurb: "约 30 万年前，我们这一物种出现",
      },
    ],
  },
  {
    slug: "great-extinctions",
    title: "五次生物大灭绝",
    subtitle: "地球生命的五次浩劫与重生",
    description:
      "演化不只是缓慢的积累，也包括瞬间的毁灭。地质史上有五次「大灭绝」，每一次都抹去了地球上大部分物种——却也每一次都为幸存者腾出舞台，催生新的生命格局。这条路线按时间顺序走过这五次浩劫，看灭绝如何反过来塑造了今天的生命世界。",
    domain: "life-science",
    domainLabel: "生命科学",
    accent: "#c0603a",
    steps: [
      {
        title: "奥陶纪-志留纪大灭绝",
        href: "/life-science/extinctions/ordovician",
        blurb: "约 4.45 亿年前：冰期与海平面骤降",
      },
      {
        title: "晚泥盆纪大灭绝",
        href: "/life-science/extinctions/devonian",
        blurb: "海洋生态系统的长期崩溃",
      },
      {
        title: "二叠纪-三叠纪大灭绝",
        href: "/life-science/extinctions/permian",
        blurb: "「大死亡」：约 96% 海洋物种消失",
      },
      {
        title: "三叠纪-侏罗纪大灭绝",
        href: "/life-science/extinctions/triassic-jurassic",
        blurb: "为恐龙的统治扫清道路",
      },
      {
        title: "白垩纪-古近纪大灭绝",
        href: "/life-science/extinctions/cretaceous",
        blurb: "小行星撞击，恐龙时代终结",
      },
    ],
  },
  {
    slug: "how-medicine-learned-to-know",
    title: "医学如何学会知道",
    subtitle: "从病菌到证据，从试验到知情同意",
    description:
      "现代医学不是一份药方清单，而是一套逐步学会「怎样才算知道」的方法。这条路线从细菌致病论出发，经过疫苗与抗生素，停在临床试验、知情同意和公共卫生——看证据如何进入诊所，以及它曾经怎样被滥用。",
    domain: "medicine",
    domainLabel: "医学与公共卫生",
    accent: "#d9544d",
    steps: [
      {
        title: "细菌致病论",
        href: "/medicine/concepts/germ-theory",
        blurb: "疾病来自微生物，不是瘴气",
      },
      {
        title: "疫苗接种",
        href: "/medicine/concepts/vaccination",
        blurb: "把免疫变成可重复的公共技术",
      },
      {
        title: "抗生素耐药",
        href: "/medicine/concepts/antibiotic-resistance",
        blurb: "奇迹药物的进化代价",
      },
      {
        title: "临床试验",
        href: "/medicine/concepts/clinical-trials",
        blurb: "随机化如何把经验变成证据",
      },
      {
        title: "循证医学",
        href: "/medicine/concepts/evidence-based-medicine",
        blurb: "让证据而不是权威说话",
      },
      {
        title: "知情同意",
        href: "/medicine/concepts/informed-consent",
        blurb: "塔斯基吉之后，试验对象不再是手段",
      },
      {
        title: "公共卫生",
        href: "/medicine/concepts/public-health",
        blurb: "把个体诊疗放大成人口健康",
      },
    ],
  },
  {
    slug: "chemistry-from-table-to-bond",
    title: "化学：从周期表到化学键",
    subtitle: "先看见格子，再看见电子怎样把原子粘在一起",
    description:
      "化学的入口不是反应式，而是一张表和一种力。这条路线从门捷列夫的周期表出发，经过原子结构与化学键，停在平衡、热力学和电化学——看物质为什么会变，以及变化受什么约束。",
    domain: "chemistry",
    domainLabel: "化学",
    accent: "#e08a3c",
    steps: [
      {
        title: "元素周期表",
        href: "/chemistry/concepts/periodic-table",
        blurb: "格子不是分类游戏，是预言未知元素的地图",
      },
      {
        title: "门捷列夫周期律",
        href: "/chemistry/milestones/mendeleev-periodic-law",
        blurb: "空格和预言怎样变成镓与锗",
      },
      {
        title: "原子结构",
        href: "/chemistry/concepts/atomic-structure",
        blurb: "电子、能级与周期表为什么长成那样",
      },
      {
        title: "化学键",
        href: "/chemistry/concepts/chemical-bond",
        blurb: "原子怎样粘在一起，又怎样松开",
      },
      {
        title: "化学平衡",
        href: "/chemistry/concepts/chemical-equilibrium",
        blurb: "反应不是单向冲到底，而是可逆的争夺",
      },
      {
        title: "化学热力学",
        href: "/chemistry/concepts/chemical-thermodynamics",
        blurb: "什么会自发发生，什么只是看起来会",
      },
      {
        title: "电化学",
        href: "/chemistry/concepts/electrochemistry",
        blurb: "电子搬家：电池、腐蚀与氧化还原",
      },
    ],
  },
  {
    slug: "earth-from-rock-to-plate",
    title: "地球：从岩石到板块",
    subtitle: "先看石头怎么变，再看地面为什么会动",
    description:
      "地球科学的入口不是灾难新闻，而是一块石头为什么在这里。这条路线从矿物和三大岩类出发，经过岩石循环，停在板块构造、地震和火山——看地面如何被缓慢地拆开、拼上，又如何在人的时间尺度上突然发力。",
    domain: "earth-science",
    domainLabel: "地球科学",
    accent: "#4f9d76",
    steps: [
      {
        title: "矿物",
        href: "/earth-science/concepts/minerals",
        blurb: "晶体格子决定石头能变成什么",
      },
      {
        title: "三大岩类",
        href: "/earth-science/concepts/igneous-sedimentary-metamorphic-rocks",
        blurb: "火成、沉积、变质：同一物质的三种履历",
      },
      {
        title: "岩石循环",
        href: "/earth-science/concepts/rock-cycle",
        blurb: "没有起点的循环：熔融、风化、重结晶",
      },
      {
        title: "板块构造",
        href: "/earth-science/processes/plate-tectonics",
        blurb: "魏格纳被拒的大陆漂移，如何变成可检验的理论",
      },
      {
        title: "板块边界",
        href: "/earth-science/concepts/plate-boundaries",
        blurb: "张开、俯冲、错动：三种边界三种地质",
      },
      {
        title: "地震",
        href: "/earth-science/processes/earthquakes",
        blurb: "弹性回跳：板块运动在人的时间尺度上的释放",
      },
      {
        title: "火山作用",
        href: "/earth-science/processes/volcanism",
        blurb: "熔体如何到达地表，以及它如何改写气候",
      },
    ],
  },
  {
    slug: "how-courts-learned-to-decide",
    title: "法庭如何学会裁判",
    subtitle: "从法源到判例，看规则怎样变成判决",
    description:
      "法律不是口号，是一套决定谁赢谁输的程序。这条路线从「法律为什么存在」出发，经过法源与法治，停在马伯里、布朗和多诺霍三则判例——看法庭如何取得审查权、如何拆掉隔离、如何把注意义务交给普通人。",
    domain: "law",
    domainLabel: "法学",
    accent: "#a8843c",
    steps: [
      {
        title: "法律为什么存在",
        href: "/law/foundations/why-law-exists",
        blurb: "规则要解决的，是冲突而不是完美",
      },
      {
        title: "法的渊源",
        href: "/law/foundations/sources-of-law",
        blurb: "宪法、制定法、判例、习惯：谁压过谁",
      },
      {
        title: "法治",
        href: "/law/foundations/rule-of-law",
        blurb: "约束权力，而不只是用法律去治理",
      },
      {
        title: "法庭如何裁判",
        href: "/law/foundations/how-courts-decide",
        blurb: "事实、规范与先例怎样被写成一份判决",
      },
      {
        title: "马伯里诉麦迪逊",
        href: "/law/judgment-analyses/marbury-v-madison-judicial-review",
        blurb: "违宪审查权是怎样从一场人事纠纷里长出来的",
      },
      {
        title: "布朗诉教育委员会",
        href: "/law/judgment-analyses/brown-v-board-equal-protection",
        blurb: "隔离即不平等：平等保护怎样拆掉学校的墙",
      },
      {
        title: "多诺霍诉史蒂文森",
        href: "/law/judgment-analyses/donoghue-v-stevenson-duty-of-care",
        blurb: "一只蜗牛：注意义务如何从契约走向陌生人",
      },
    ],
  },
  {
    slug: "how-language-is-put-together",
    title: "语言是怎样拼起来的",
    subtitle: "从气流到句子，从句子到用意",
    description:
      "语言学的入口不是词表，而是一层层把声音变成意义的结构。这条路线从发音和音位出发，经过形态与句法，停在语义、语用和语言与思维——看一句话是怎样被拼出来的，又怎样被听进去。",
    domain: "linguistics",
    domainLabel: "语言学",
    accent: "#3f8f8a",
    steps: [
      {
        title: "言语如何发出",
        href: "/linguistics/sounds-and-signs/how-speech-is-made",
        blurb: "气流、声带与共鸣：声音先是物理事件",
      },
      {
        title: "音位与语音系统",
        href: "/linguistics/sounds-and-signs/phonemes-and-sound-systems",
        blurb: "哪些差别算「另一个音」，哪些只是变体",
      },
      {
        title: "形态学",
        href: "/linguistics/words-sentences-meaning/morphology",
        blurb: "词不是最小零件，语素才是",
      },
      {
        title: "句法",
        href: "/linguistics/words-sentences-meaning/syntax",
        blurb: "词序和层次怎样把词编成句子",
      },
      {
        title: "语义",
        href: "/linguistics/words-sentences-meaning/semantics",
        blurb: "句子怎么获得可以争论真假的内容",
      },
      {
        title: "语用",
        href: "/linguistics/words-sentences-meaning/pragmatics",
        blurb: "字面之外：语境怎样补上没说出来的意思",
      },
      {
        title: "语言与思维",
        href: "/linguistics/acquisition-and-mind/language-thought-debate",
        blurb: "语言是否塑造思想，还是思想先于语言",
      },
    ],
  },
  {
    slug: "how-society-holds-together",
    title: "社会如何把人绑在一起",
    subtitle: "从结构到关系，从涂尔干到韦伯",
    description:
      "社会学不问「人本来是什么样」，而问关系、位置和规则怎样把个体编进一张网。这条路线从社会结构与社会化出发，经过分层、资本和网络，停在涂尔干与韦伯——看团结从哪里来，支配又怎样被正当化。",
    domain: "sociology",
    domainLabel: "社会学",
    accent: "#7a8f5a",
    steps: [
      {
        title: "社会结构",
        href: "/sociology/concepts/social-structure",
        blurb: "位置先于个人：角色、制度与可重复的关系",
      },
      {
        title: "社会化",
        href: "/sociology/concepts/socialization",
        blurb: "人怎样学会成为某种社会里的人",
      },
      {
        title: "社会分层",
        href: "/sociology/concepts/social-stratification",
        blurb: "资源、声望与权力为什么不是均匀铺开的",
      },
      {
        title: "社会资本",
        href: "/sociology/concepts/social-capital",
        blurb: "关系本身可以是一种可兑换的资源",
      },
      {
        title: "社会网络",
        href: "/sociology/concepts/social-network-analysis",
        blurb: "弱连接、结构洞：谁连着谁决定信息怎么走",
      },
      {
        title: "涂尔干",
        href: "/sociology/thinkers/emile-durkheim",
        blurb: "社会事实与机械/有机团结：集体怎样大于个人",
      },
      {
        title: "韦伯",
        href: "/sociology/thinkers/max-weber-sociology",
        blurb: "支配、科层与祛魅：秩序怎样获得服从",
      },
    ],
  },
  {
    slug: "how-states-keep-order",
    title: "国家怎样维持秩序",
    subtitle: "从权力竞争到宪法约束",
    description:
      "政治学同时看两件事：国家之间为什么彼此恐惧，以及国家内部怎样把权力关进规则。这条路线从现实主义、自由主义与建构主义出发，经过安全困境，停在分权、法治和联邦制——看秩序是被实力撑住的，还是被程序正当化的。",
    domain: "political-science",
    domainLabel: "政治学",
    accent: "#c25b5b",
    steps: [
      {
        title: "现实主义",
        href: "/political-science/international-relations/realism-ir",
        blurb: "无政府状态下，生存先于善意",
      },
      {
        title: "自由主义",
        href: "/political-science/international-relations/liberalism-ir",
        blurb: "贸易、制度和民主能否把恐惧换成可预期",
      },
      {
        title: "建构主义",
        href: "/political-science/international-relations/constructivism-ir",
        blurb: "利益不是给定的，身份和规范会改写它",
      },
      {
        title: "安全困境",
        href: "/political-science/international-relations/security-dilemma-war-peace",
        blurb: "自卫为什么会被读成威胁，战争如何从防御里长出来",
      },
      {
        title: "分权与宪政",
        href: "/political-science/institutions/constitutionalism-separation-of-powers",
        blurb: "把权力拆开，让它难以及时作恶",
      },
      {
        title: "法治",
        href: "/political-science/institutions/rule-of-law",
        blurb: "规则约束统治者，而不只是被统治者",
      },
      {
        title: "联邦制",
        href: "/political-science/institutions/federalism",
        blurb: "多层主权：怎样在一个政治体里同时存在多个政府",
      },
    ],
  },
  {
    slug: "how-pictures-are-built",
    title: "画面是怎样搭起来的",
    subtitle: "从看见到构图，从色彩到形式分析",
    description:
      "看画不是天赋，是一套可学的观察。这条路线从知觉和线条出发，经过色彩、构图、透视与比例，停在形式分析——看一张画怎样被搭起来，以及我们凭什么说它「站住了」。",
    domain: "arts",
    domainLabel: "艺术、建筑与美学",
    accent: "#b0785a",
    steps: [
      {
        title: "观看与知觉",
        href: "/arts/foundations/seeing-and-perception",
        blurb: "眼睛先看见什么，意识后补上什么",
      },
      {
        title: "线、形、体",
        href: "/arts/foundations/line-shape-form",
        blurb: "画面最底层的零件，不是故事",
      },
      {
        title: "色彩与光",
        href: "/arts/foundations/color-and-light",
        blurb: "颜色不是颜料表，是光怎样被安排",
      },
      {
        title: "构图与平衡",
        href: "/arts/foundations/composition-balance",
        blurb: "重量、轴线与留白怎样让画面站住",
      },
      {
        title: "透视与空间",
        href: "/arts/foundations/perspective-and-space",
        blurb: "平面上怎样假装有深度",
      },
      {
        title: "比例与和谐",
        href: "/arts/foundations/proportion-and-harmony",
        blurb: "尺度关系，不是「美的公式」",
      },
      {
        title: "形式分析",
        href: "/arts/methods/formal-analysis",
        blurb: "把「好看」拆成可以争论的观察",
      },
    ],
  },
  {
    slug: "how-machines-are-made-to-work",
    title: "机器怎样被做成能用的",
    subtitle: "从杠杆到反馈，从材料到失效",
    description:
      "工程不是发明清单，是让东西在最坏情况下仍能运转。这条路线从简单机械和热机出发，经过电机、材料与反馈，停在失效分析与安全工程——看可靠是怎样被设计进去的。",
    domain: "engineering",
    domainLabel: "工程与技术",
    accent: "#8a919e",
    steps: [
      {
        title: "简单机械",
        href: "/engineering/foundations/simple-machines",
        blurb: "杠杆、斜面、轮轴：力怎样被改道",
      },
      {
        title: "蒸汽与热机",
        href: "/engineering/foundations/steam-and-engines",
        blurb: "热变成功，效率受什么限制",
      },
      {
        title: "电与电机",
        href: "/engineering/foundations/electricity-and-motors",
        blurb: "电流怎样变成可控制的转动",
      },
      {
        title: "材料强度",
        href: "/engineering/foundations/materials-strength",
        blurb: "一块材料在断裂前能扛多少",
      },
      {
        title: "控制与反馈",
        href: "/engineering/foundations/control-and-feedback",
        blurb: "系统怎样自己把自己拉回轨道",
      },
      {
        title: "失效分析",
        href: "/engineering/frontiers/failure-analysis",
        blurb: "东西坏了，才看得出设计假设在哪",
      },
      {
        title: "安全工程",
        href: "/engineering/frontiers/safety-engineering",
        blurb: "把最坏情况写进规格，而不是事后补救",
      },
    ],
  },
  {
    slug: "from-story-to-canon",
    title: "从一则故事到正典之争",
    subtitle: "叙述怎样被做成可核对的形式，又怎样进入书单",
    description:
      "百科适合查阅单篇作品，却不容易看见叙述本身怎样被做成对象。这条路线从「发生了一件事」出发，经过诗行、史诗与细读，停在正典之争——看课程、奖项和书单怎样决定谁被当成必读。",
    domain: "literature",
    domainLabel: "文学与叙事",
    accent: "#8b5e4a",
    steps: [
      {
        title: "故事是什么",
        href: "/literature/narrative-basics/what-is-a-story",
        blurb: "先把可观察的叙述与「发生了」分开",
      },
      {
        title: "韵律与诗行",
        href: "/literature/poetics-and-form/meter-and-the-line",
        blurb: "诗行把经验变成可计数的形式单位",
      },
      {
        title: "史诗作为公共记忆",
        href: "/literature/world-traditions/epic-as-public-memory",
        blurb: "口头与抄本怎样保存一群人记得的事",
      },
      {
        title: "细读",
        href: "/literature/theory-and-method/close-reading",
        blurb: "局部用词与句法是可以争论的证据",
      },
      {
        title: "正典之争",
        href: "/literature/contemporary-edges/canon-wars",
        blurb: "书单是制度，不是已经完成的文明名单",
      },
    ],
  },
  {
    slug: "from-religion-to-secularization",
    title: "从分类到世俗化之争",
    subtitle: "把实践叫做宗教之后，正典与测量怎样改写对象",
    description:
      "宗教在这里是可争辩的分类，不是必须为真的教义。这条路线从分类出发，经过仪式、轴心时代与正典，停在世俗化之争——参与、认同与制度特权不是同一条曲线。",
    domain: "religion",
    domainLabel: "宗教学",
    accent: "#6b5c8a",
    steps: [
      {
        title: "什么是宗教",
        href: "/religion/religion-foundations/what-is-religion",
        blurb: "先把对象写成可争的分类",
      },
      {
        title: "仪式与实践",
        href: "/religion/religion-foundations/ritual-and-practice",
        blurb: "仪式把分类落实成可观察的位置转换",
      },
      {
        title: "轴心时代",
        href: "/religion/religious-history/axial-age-religions",
        blurb: "若干文明在可纪年的文本里同时提出伦理问题",
      },
      {
        title: "经典与正典",
        href: "/religion/texts-and-canons/scripture-and-canon",
        blurb: "正典是被反复抄写与考试的名单",
      },
      {
        title: "世俗化之争",
        href: "/religion/secularization/secularization-debate",
        blurb: "现代测量把参与、认同与特权拆开",
      },
    ],
  },
  {
    slug: "from-culture-to-repatriation",
    title: "从文化分类到遗产主张",
    subtitle: "把别人的做法叫做文化之后，亲属、地层与归还怎样改写对象",
    description:
      "文化不是群体的本质。这条路线从分类出发，经过亲属称谓与地层情境，停在田野笔记与归还法律——谁有权讲述过去，要能被程序核对。",
    domain: "anthropology",
    domainLabel: "人类学与考古",
    accent: "#8b5a3c",
    steps: [
      {
        title: "什么是文化",
        href: "/anthropology/culture-and-method/what-is-culture",
        blurb: "先把文化写成可争的分类，而不是气质",
      },
      {
        title: "亲属称谓",
        href: "/anthropology/kinship-and-exchange/kinship-terminology",
        blurb: "同一套亲属词切出不同的格子",
      },
      {
        title: "地层与出土情境",
        href: "/anthropology/prehistory-and-archaeology/stratigraphy-and-context",
        blurb: "出土位置决定器物能证明什么",
      },
      {
        title: "田野笔记与再现",
        href: "/anthropology/comparison-and-ethics/fieldnotes-and-representation",
        blurb: "笔记是被保存的再现，不是透明窗口",
      },
      {
        title: "NAGPRA 与归还",
        href: "/anthropology/urban-and-heritage/nagpra-and-repatriation",
        blurb: "归还把讲述权写成可核对的程序",
      },
    ],
  },
  {
    slug: "from-learning-to-comparison",
    title: "从学会到国际比较",
    subtitle: "把“学会了”写成可观察的改变之后，记忆、课堂、测验与排名怎样改写对象",
    description:
      "学习不是把知识倒进容器。这条路线从可观察的学会出发，经过教学、间隔与课堂时间，停在课程选择、分数推断与 PISA——国际测评是测量选择，不是文明排名。",
    domain: "education",
    domainLabel: "教育学与学习科学",
    accent: "#3d6b8a",
    steps: [
      {
        title: "什么是学习",
        href: "/education/learning-foundations/what-is-learning",
        blurb: "学会了必须能被作业、谈话或延迟表现对质",
      },
      {
        title: "教学不是灌输",
        href: "/education/learning-foundations/teaching-is-not-pouring",
        blurb: "教是组织条件，不是倒进脑袋",
      },
      {
        title: "记忆、间隔与迁移",
        href: "/education/cognition-and-memory/memory-spacing-and-transfer",
        blurb: "当时更熟，不等于隔周还在",
      },
      {
        title: "课堂是被组织的时间",
        href: "/education/curriculum-and-teaching/classroom-as-time",
        blurb: "话轮与等待是设计，不是气氛",
      },
      {
        title: "课程即选择",
        href: "/education/curriculum-and-teaching/curriculum-as-selection",
        blurb: "课表删掉的东西，同样是课程",
      },
      {
        title: "评估即推断",
        href: "/education/assessment-and-equity/assessment-as-inference",
        blurb: "分数是对构念的推断，不是照片",
      },
      {
        title: "PISA 不是文明",
        href: "/education/comparison-and-policy/pisa-is-not-civilization",
        blurb: "国际排名是测量选择，不是文化本质",
      },
    ],
  },
];
