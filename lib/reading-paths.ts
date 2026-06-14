/**
 * Reading paths turn the browsable encyclopedia into something you can read
 * front-to-back like a book: each path is a curated, ordered sequence of
 * EXISTING articles. The <ReadingPathBar> uses `?path=<slug>&step=<n>` to thread
 * prev/next across any article page, so no per-article wiring is needed.
 *
 * Every `href` here must resolve to a real article route. This module is plain
 * data (no fs), so it is safe to import in client components.
 */

export interface ReadingStep {
  /** Display title for the chapter (the article's own title). */
  title: string;
  /** Canonical article URL, no query string. */
  href: string;
  /** One line on why this step matters / what it adds to the journey. */
  blurb?: string;
}

export interface ReadingPath {
  slug: string;
  title: string;
  /** Short tagline shown under the title. */
  subtitle: string;
  /** Jacket-copy intro paragraph for the path page. */
  description: string;
  /** Domain id used for color/labeling (matches lib/data DOMAINS ids). */
  domain: string;
  domainLabel: string;
  accent: string;
  steps: ReadingStep[];
}

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
];

export function getReadingPath(slug: string): ReadingPath | undefined {
  return READING_PATHS.find((p) => p.slug === slug);
}

/** Total chapters across all paths — used for the index header. */
export function totalReadingSteps(): number {
  return READING_PATHS.reduce((n, p) => n + p.steps.length, 0);
}
