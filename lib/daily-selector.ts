import { HISTORY_TODAY } from "./daily-history";
import { PHYSICS_TODAY } from "./daily-physics";
import { PHILOSOPHY_TODAY } from "./philosophy-today";
import { ECONOMICS_TODAY } from "./daily-economics";
import { PSYCHOLOGY_TODAY } from "./daily-psychology";
import { ON_THIS_DAY } from "./on-this-day";
import { getAllCuriosities } from "./curiosities";

export interface DailySelected {
  date: string;
  seed: number;
  physics: DailySelectedEvent;
  history: DailySelectedEvent;
  philosophy: DailySelectedEvent;
  economics: DailySelectedEvent;
  psychology: DailySelectedEvent;
  mathematics: DailySelectedFact;
  lifeScience: DailySelectedFact;
  cosmology: DailySelectedFact;
  computerScience: DailySelectedFact;
  politicalScience: DailySelectedFact;
  earthScience: DailySelectedFact;
  medicine: DailySelectedFact;
  chemistry: DailySelectedFact;
  curiosity: { title: string; detail: string; url?: string };
  question: string;
  fact: string;
  onThisDay: OnThisDayMatch[];
}

export interface DailySelectedEvent {
  title: string;
  description: string;
  year?: number;
  url: string;
}

export interface DailySelectedFact {
  title: string;
  description: string;
  url: string;
}

export interface OnThisDayMatch {
  month: number;
  day: number;
  year: number;
  title: string;
  description: string;
  domain: string;
  domainColor: string;
  url: string;
}

function dateSeed(date: Date): number {
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
}

function seededSelect<T>(items: readonly T[], seed: number): T {
  const index = Math.abs(seed) % items.length;
  return items[index]!;
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

const DAILY_QUESTIONS: readonly string[] = [
  "如果时间可以倒流，你最想见证哪个历史时刻？",
  "宇宙的边界之外是什么？",
  "人类文明的下一个重大突破会是什么？",
  "如果达尔文和爱因斯坦对话，他们会聊什么？",
  "数学是被发现的，还是被发明的？",
  "意识是大脑的产物，还是超越物质的存在？",
  "如果地球再大十倍，生命会如何进化？",
  "我们如何知道自己的认知是可靠的？",
  "宇宙中的暗物质如果能被看见，会是什么样子？",
  "如果人类能活500岁，社会会如何改变？",
  "语言塑造了思维，还是思维塑造了语言？",
  "人工智能能真正理解美吗？",
  "如果发现外星生命，人类的哲学体系会如何改变？",
  "什么是自由意志？它真的存在吗？",
  "如果地球停止自转，生命会如何适应？",
  "为什么数学能如此精确地描述自然规律？",
  "死亡赋予了生命意义吗？",
  "平行宇宙中另一个你，会做出不同的选择吗？",
  "如果能穿越到100年后，你最想了解什么？",
  "知识的终极边界在哪里？",
  "如果所有人类消失，地球需要多久恢复自然状态？",
  "幸福是一种状态，还是一种能力？",
  "宇宙最终会怎样终结？",
  "如果能与一位已故科学家对话，你会选谁？",
  "时间旅行在物理上可能吗？",
  "动物有意识吗？我们如何判断？",
  "如果能完全理解大脑的运作，人类社会会怎样？",
  "美是客观存在还是主观感受？",
  "如果量子纠缠可以传递信息，世界会怎样？",
  "人类探索太空的意义是什么？",
];

const MONTHLY_FACTS: Record<string, readonly string[]> = {
  "01": [
    "1月是罗马神话中双面神雅努斯的月份，象征回顾过去与展望未来",
    "地球上1月份地球距太阳最近（近日点），约1.47亿公里",
    "1月有31天，是公历中第一个拥有31天的月份",
  ],
  "02": [
    "2月是全年最短的月份，平年28天，闰年29天",
    "2月14日情人节的圣瓦伦丁是古罗马的一位基督教殉道者",
    "闰年规则：能被4整除但不能被100整除，或能被400整除",
  ],
  "03": [
    "3月的英文March来自罗马战神马尔斯",
    "春分通常在3月20日或21日，全球昼夜几乎等长",
    "3月是北半球气象学春季的开始",
  ],
  "04": [
    '4月的英文April来自拉丁语aperire，意为"开放"',
    "清明节通常在4月4日或5日，是中国传统节日",
    "4月的诞生石是钻石，象征纯洁与力量",
  ],
  "05": [
    "5月的英文May来自希腊春天女神玛雅",
    "5月5日是日本的儿童节，也叫端午节",
    "5月的诞生石是祖母绿，象征希望与重生",
  ],
  "06": [
    "6月的英文June来自罗马婚姻女神朱诺",
    "夏至通常在6月21日，北半球白昼最长",
    "6月是北半球气象学夏季的开始",
  ],
  "07": [
    "7月以凯撒大帝尤利乌斯（Julius）命名",
    "7月和8月是北半球最热的月份",
    "7月的诞生石是红宝石，象征热情与勇气",
  ],
  "08": [
    "8月以罗马首位皇帝奥古斯都（Augustus）命名",
    "英仙座流星雨通常在8月中旬达到极大",
    "8月的诞生石是橄榄石，象征和平与幸福",
  ],
  "09": [
    "9月的英文September来自拉丁语septem（七），因古罗马历法从3月开始",
    "秋分通常在9月22日或23日",
    "9月是北半球气象学秋季的开始",
  ],
  "10": [
    "10月的英文October来自拉丁语octo（八）",
    "10月的夜空中可以看到猎户座流星雨",
    "10月的诞生石是欧泊石，象征希望与纯洁",
  ],
  "11": [
    "11月的英文November来自拉丁语novem（九）",
    "11月11日是光棍节，也是中国最大的购物节",
    "11月的诞生石是黄水晶，象征真诚与友爱",
  ],
  "12": [
    "12月的英文December来自拉丁语decem（十）",
    "冬至通常在12月21日或22日，北半球黑夜最长",
    "12月的诞生石是绿松石，象征成功与幸运",
  ],
};

const MATH_FACTS: readonly DailySelectedFact[] = [
  {
    title: "欧拉恒等式",
    description: "e^(iπ) + 1 = 0 被誉为最优美的数学公式，将五个最重要的数学常数联系在一起。",
    url: "/mathematics",
  },
  {
    title: "素数的无穷性",
    description: "欧几里得在公元前300年就证明了素数有无穷多个，这是数论的基石。",
    url: "/mathematics",
  },
  {
    title: "哥德尔不完备定理",
    description: "任何包含算术的一致形式系统都存在不可判定的命题，这改变了数学的根基。",
    url: "/mathematics",
  },
  {
    title: "费马大定理",
    description: "x^n + y^n = z^n 在 n>2 时无正整数解，这个猜想花了358年才被安德鲁·怀尔斯证明。",
    url: "/mathematics",
  },
  {
    title: "黄金比例",
    description: "φ = (1+√5)/2 ≈ 1.618，出现在自然界、艺术和建筑中，被认为是美的数学表达。",
    url: "/mathematics",
  },
  {
    title: "黎曼猜想",
    description: "关于素数分布的核心猜想，至今未被证明，是千禧年七大数学难题之一。",
    url: "/mathematics",
  },
  {
    title: "圆周率的奥秘",
    description: "π是无理数也是超越数，小数位无穷无尽且不循环，目前已计算到数百万亿位。",
    url: "/mathematics",
  },
  {
    title: "莫比乌斯带",
    description: "只有一条边和一个面的曲面，是拓扑学最经典的研究对象之一。",
    url: "/mathematics",
  },
  {
    title: "分形几何",
    description: "曼德博集合展示了简单迭代规则如何产生无限复杂的图案，揭示了混沌中的秩序。",
    url: "/mathematics",
  },
  {
    title: "四色定理",
    description: "任何地图只需四种颜色就能确保相邻区域不同色，1976年首次用计算机辅助证明。",
    url: "/mathematics",
  },
  {
    title: "无穷大的等级",
    description: "康托尔证明了无穷大有不同的大小：自然数的无穷小于实数的无穷。",
    url: "/mathematics",
  },
  {
    title: "博弈论",
    description: "纳什均衡揭示了在非合作博弈中，每个参与者都选择最优策略时的状态。",
    url: "/mathematics",
  },
  {
    title: "欧拉公式",
    description: "V - E + F = 2 揭示了多面体的顶点、边和面之间的基本关系。",
    url: "/mathematics",
  },
  {
    title: "概率论的起源",
    description: "帕斯卡和费马在1654年的通信中奠定了概率论的基础，起源于赌博问题。",
    url: "/mathematics",
  },
  {
    title: "集合论悖论",
    description: "罗素悖论动摇了朴素集合论的基础，推动了公理化集合论的发展。",
    url: "/mathematics",
  },
];

const LIFE_SCIENCE_FACTS: readonly DailySelectedFact[] = [
  {
    title: "DNA的双螺旋",
    description: "1953年沃森和克里克发现了DNA的双螺旋结构，开启了分子生物学时代。",
    url: "/life-science",
  },
  {
    title: "寒武纪生命大爆发",
    description: "约5.4亿年前，地球上几乎所有动物门类在短短2000万年内同时出现。",
    url: "/life-science",
  },
  {
    title: "线粒体夏娃",
    description: "所有现代人类的线粒体DNA都可以追溯到约15万年前非洲的一位女性祖先。",
    url: "/life-science",
  },
  {
    title: "CRISPR基因编辑",
    description: "CRISPR-Cas9技术让精确编辑基因组成为可能，正在改变医学和农业。",
    url: "/life-science",
  },
  {
    title: "五次大灭绝",
    description: "地球历史上经历了五次大规模物种灭绝，每次都重塑了生命的演化方向。",
    url: "/life-science",
  },
  {
    title: "光合作用的奇迹",
    description: "植物、藻类和蓝藻通过光合作用将太阳能转化为化学能，维持了地球几乎所有的生命。",
    url: "/life-science",
  },
  {
    title: "人类基因组",
    description:
      "人类基因组包含约20000-25000个基因，但98%的DNA曾被认为是'垃圾'，现在发现有重要功能。",
    url: "/life-science",
  },
  {
    title: "共生与进化",
    description: "线粒体曾经是独立的细菌，通过内共生与真核细胞结合，成为细胞的'能量工厂'。",
    url: "/life-science",
  },
  {
    title: "表观遗传学",
    description: "环境可以通过表观遗传修饰影响基因表达，且某些修饰可以遗传给后代。",
    url: "/life-science",
  },
  {
    title: "微生物组",
    description: "人体内寄居着约38万亿微生物，它们影响免疫、消化甚至情绪和行为。",
    url: "/life-science",
  },
  {
    title: "趋同进化",
    description: "章鱼的眼睛和人类的眼睛结构惊人相似，但独立进化了至少5亿年。",
    url: "/life-science",
  },
  {
    title: "朊病毒",
    description: "朊病毒是不含核酸的感染性蛋白质，挑战了'所有病原体都需要遗传物质'的传统观念。",
    url: "/life-science",
  },
  {
    title: "干细胞的潜力",
    description: "干细胞可以分化为人体200多种细胞类型中的任何一种，是再生医学的希望。",
    url: "/life-science",
  },
  {
    title: "生命的化学起源",
    description: "米勒-尤里实验证明，原始地球条件下无机物可以自发形成氨基酸等有机分子。",
    url: "/life-science",
  },
  {
    title: "生物钟",
    description: "几乎所有生物都有内在的昼夜节律，由基因调控的分子时钟驱动。",
    url: "/life-science",
  },
];

const COSMOLOGY_FACTS: readonly DailySelectedFact[] = [
  {
    title: "宇宙微波背景辐射",
    description: "大爆炸留下的余辉，温度约2.7K，是宇宙最古老的光。",
    url: "/cosmology",
  },
  {
    title: "暗能量",
    description: "约占宇宙总能量的68%，是推动宇宙加速膨胀的神秘力量。",
    url: "/cosmology",
  },
  {
    title: "哈勃定律",
    description: "星系远离我们的速度与距离成正比，揭示了宇宙正在膨胀。",
    url: "/cosmology",
  },
  {
    title: "宇宙的年龄",
    description: "通过宇宙微波背景辐射精确测量，宇宙的年龄约为138亿年。",
    url: "/cosmology",
  },
  {
    title: "宇宙大尺度结构",
    description: "星系构成纤维状结构和巨大空洞，形成宇宙网。",
    url: "/cosmology",
  },
  {
    title: "暴胀理论",
    description: "宇宙在诞生后极短时间内经历了指数级膨胀，解释了宇宙的平坦性。",
    url: "/cosmology",
  },
  {
    title: "暗物质",
    description: "约占宇宙总质量的27%，不发光也不与光相互作用，但通过引力影响星系运动。",
    url: "/cosmology",
  },
  {
    title: "宇宙的命运",
    description: "宇宙可能面临大冻结、大撕裂或大坍缩三种终极命运。",
    url: "/cosmology",
  },
  {
    title: "多宇宙假说",
    description: "某些物理理论暗示我们的宇宙可能只是无数宇宙中的一个。",
    url: "/cosmology",
  },
  {
    title: "宇宙的平坦性",
    description: "观测表明宇宙的空间曲率非常接近于零，这意味着宇宙在大尺度上是平坦的。",
    url: "/cosmology",
  },
  {
    title: "星系的形成",
    description: "暗物质晕是星系形成的骨架，普通物质在引力作用下聚集形成恒星和星系。",
    url: "/cosmology",
  },
  {
    title: "宇宙的元素起源",
    description: "氢和氦在大爆炸中形成，其他元素在恒星内部和超新星爆发中合成。",
    url: "/cosmology",
  },
];

const ECONOMICS_FACTS: readonly DailySelectedFact[] = [
  {
    title: "看不见的手",
    description: "亚当·斯密提出，个人追求自身利益会通过市场机制促进社会整体福利。",
    url: "/economics",
  },
  {
    title: "边际效用递减",
    description: "消费越多同一商品，每增加一单位带来的满足感越少。",
    url: "/economics/concepts/opportunity-cost",
  },
  {
    title: "比较优势",
    description: "大卫·李嘉图证明，即使一方在所有方面都更有效率，贸易仍对双方有利。",
    url: "/economics/theories/comparative-advantage",
  },
  {
    title: "凯恩斯乘数效应",
    description: "政府支出的增加可以产生数倍于原始支出的经济效应。",
    url: "/economics/theories/keynesian-economics",
  },
  {
    title: "纳什均衡",
    description: "在非合作博弈中，每个参与者都选择了对其他参与者策略的最优反应。",
    url: "/economics/concepts/nash-equilibrium",
  },
  {
    title: "信息不对称",
    description: "交易双方拥有的信息不同，可能导致逆向选择和道德风险。",
    url: "/economics/theories/information-asymmetry",
  },
  {
    title: "外部性",
    description: "经济活动对第三方产生的未通过市场价格反映的影响。",
    url: "/economics/concepts/externalities",
  },
  {
    title: "公地悲剧",
    description: "共享资源因个体过度使用而枯竭，需要产权或制度来解决。",
    url: "/economics/concepts/tragedy-of-commons",
  },
  {
    title: "创造性破坏",
    description: "熊彼特提出，创新不断摧毁旧产业并创造新产业，是资本主义的本质。",
    url: "/economics/concepts/creative-destruction",
  },
  {
    title: "行为经济学",
    description: "卡尼曼和特沃斯基证明，人类决策并非完全理性，受到各种认知偏差影响。",
    url: "/economics/theories/behavioral-economics-theory",
  },
  {
    title: "GDP的局限",
    description: "GDP衡量经济产出但不反映收入分配、环境成本或幸福感。",
    url: "/economics/concepts/gdp",
  },
  {
    title: "基尼系数",
    description: "衡量收入不平等的指标，0表示完全平等，1表示完全不平等。",
    url: "/economics/concepts/gini-coefficient",
  },
];

const PSYCHOLOGY_FACTS: readonly DailySelectedFact[] = [
  {
    title: "经典条件反射",
    description: "巴甫洛夫发现，通过反复配对中性刺激与自然反应，可以建立新的条件反射。",
    url: "/psychology/experiments/pavlov-classical-conditioning",
  },
  {
    title: "从众效应",
    description: "阿希实验证明，即使答案明显错误，约75%的人至少会从众一次。",
    url: "/psychology/experiments/asch-conformity-1951",
  },
  {
    title: "认知失调",
    description: "当行为与信念矛盾时，人们倾向于改变信念而非行为。",
    url: "/psychology/phenomena/cognitive-dissonance",
  },
  {
    title: "确认偏差",
    description: "人们倾向于寻找、解释和记住支持自己已有信念的信息。",
    url: "/psychology/phenomena/confirmation-bias",
  },
  {
    title: "锚定效应",
    description: "决策时过度依赖最先获得的信息（锚点），即使该信息与决策无关。",
    url: "/psychology/phenomena/anchoring-bias",
  },
  {
    title: "旁观者效应",
    description: "在场的人越多，每个人提供帮助的可能性越小。",
    url: "/psychology/phenomena/bystander-effect",
  },
  {
    title: "邓宁-克鲁格效应",
    description: "能力不足的人倾向于高估自己的能力，而专家倾向于低估自己。",
    url: "/psychology/phenomena/dunning-kruger",
  },
  {
    title: "心流状态",
    description: "当挑战与技能完美匹配时，人会进入完全沉浸的最佳体验状态。",
    url: "/psychology/phenomena/flow-state",
  },
  {
    title: "前景理论",
    description: "卡尼曼和特沃斯基发现，人们对损失的敏感度是收益的约两倍。",
    url: "/psychology/experiments/kahneman-tversky-1979",
  },
  {
    title: "习得性无助",
    description: "塞利格曼发现，反复经历无法控制的负面事件后，个体会放弃尝试。",
    url: "/psychology/experiments/learned-helplessness",
  },
  {
    title: "虚假记忆",
    description: "洛夫特斯的研究表明，记忆可以被误导信息篡改，产生从未发生的事件记忆。",
    url: "/psychology/phenomena/false-memory",
  },
  {
    title: "峰终定律",
    description: "人们对体验的记忆主要取决于峰值时刻和结束时刻的感受。",
    url: "/psychology/phenomena/peak-end-rule",
  },
];

const COMPUTER_SCIENCE_FACTS: readonly DailySelectedFact[] = [
  {
    title: "图灵机",
    description:
      "图灵在 1936 年用一台纸上的假想机器定义了「什么是计算」，奠定了所有计算机的能力边界。",
    url: "/computer-science/pioneers/alan-turing",
  },
  {
    title: "停机问题",
    description:
      "没有任何程序能对所有「程序+输入」判断它会停机还是永远运行——计算机科学第一个不可能性定理。",
    url: "/computer-science/theory/computability",
  },
  {
    title: "P vs NP",
    description:
      "「验证一个答案是否容易，找到它就一定容易吗？」这是千禧年七大难题中最受关注的一个。",
    url: "/computer-science/theory/computational-complexity",
  },
  {
    title: "香农信息论",
    description: "香农 1948 年用「比特」量化了信息，证明了任何信道都有不可逾越的容量上限。",
    url: "/computer-science/pioneers/claude-shannon",
  },
  {
    title: "公钥密码 RSA",
    description: "RSA 让素未谋面的双方在公开信道上安全通信，其安全性建立在大数分解的数论难题之上。",
    url: "/computer-science/algorithms/public-key-rsa",
  },
  {
    title: "反向传播",
    description: "深度学习的引擎：用链式法则把误差从输出层逐层传回，是当代 AI 革命的数学心脏。",
    url: "/computer-science/algorithms/gradient-descent-backprop",
  },
  {
    title: "冯·诺伊曼架构",
    description: "把程序和数据一同存在内存里——这个「存储程序」思想是今天几乎所有计算机的蓝图。",
    url: "/computer-science/pioneers/john-von-neumann",
  },
  {
    title: "大语言模型",
    description:
      "Transformer 架构 + 规模化，让机器在海量文本上「涌现」出推理与对话能力，也引发它是否真正理解的争论。",
    url: "/computer-science/frontier/large-language-models",
  },
  {
    title: "万维网",
    description: "Berners-Lee 1989 年用 HTTP/HTML/URL 三件套，把互联网变成了人人可读写的信息空间。",
    url: "/computer-science/pioneers/tim-berners-lee",
  },
  {
    title: "递归",
    description: "一个函数调用自身——用有限的代码描述无限的结构，是计算思维最优雅的核心之一。",
    url: "/computer-science/concepts/recursion",
  },
  {
    title: "哈希与碰撞",
    description: "哈希把任意数据压成定长指纹；王小云 2004 年攻破 MD5，改写了密码学哈希的安全格局。",
    url: "/computer-science/algorithms/hashing",
  },
];

const POLITICAL_SCIENCE_FACTS: readonly DailySelectedFact[] = [
  {
    title: "利维坦与社会契约",
    description: "霍布斯问：一群平等自利、互不信任的个体，凭什么会把权力交给一个共同的权威？",
    url: "/political-science/thinkers/thomas-hobbes",
  },
  {
    title: "三权分立",
    description: "孟德斯鸠主张把立法、行政、司法分开制衡——「以权力制约权力」，成为现代宪政的基石。",
    url: "/political-science/institutions/constitutionalism-separation-of-powers",
  },
  {
    title: "主权",
    description: "谁拥有最终的、不可分割的决断权？从博丹到当代，主权概念一直是政治秩序的根问题。",
    url: "/political-science/concepts/sovereignty",
  },
  {
    title: "自由主义",
    description:
      "以个人权利、有限政府与法治为核心的政治传统，内部又分化出古典与社会自由主义两大支流。",
    url: "/political-science/isms/liberalism",
  },
  {
    title: "国际关系现实主义",
    description: "在没有世界政府的无政府状态下，国家只能自助求存——这是理解大国博弈的经典视角之一。",
    url: "/political-science/international-relations/realism-ir",
  },
  {
    title: "无知之幕",
    description: "罗尔斯设想：如果你不知道自己将生在社会哪个位置，你会选择怎样的正义原则？",
    url: "/political-science/concepts/justice",
  },
  {
    title: "平庸之恶",
    description: "阿伦特对艾希曼的观察：最大的恶未必出自恶魔，也可能来自不思考的平庸服从。",
    url: "/political-science/thinkers/hannah-arendt",
  },
  {
    title: "公意",
    description:
      "卢梭区分「众意」（个人意志之和）与「公意」（共同体的整体意志），至今仍是民主理论的难题。",
    url: "/political-science/thinkers/jean-jacques-rousseau",
  },
  {
    title: "民粹主义",
    description: "把社会简化为「纯洁的人民」对「腐败的精英」——一种可左可右的「薄意识形态」。",
    url: "/political-science/isms/populism",
  },
  {
    title: "民主衰退",
    description:
      "V-Dem 等指标显示，21 世纪以来生活在专制化进程中的人口显著上升，民主并非单向前进。",
    url: "/political-science/frontier/democratic-backsliding",
  },
  {
    title: "全球治理",
    description:
      "在没有世界政府的情况下，联合国、WTO、IMF 等机制如何协调一个相互依存却主权林立的世界？",
    url: "/political-science/international-relations/global-governance",
  },
];

const EARTH_SCIENCE_FACTS: readonly DailySelectedFact[] = [
  {
    title: "大陆漂移",
    description:
      "魏格纳 1912 年提出大陆曾连成一体，因拿不出移动机制被嘲笑半个世纪，直到板块构造为他平反。",
    url: "/earth-science/pioneers/alfred-wegener",
  },
  {
    title: "板块边界",
    description: "地球表层裂成约十几块板块，它们的汇聚、离散与错动，塑造了地震带、火山链与高山。",
    url: "/earth-science/concepts/plate-boundaries",
  },
  {
    title: "科里奥利效应",
    description: "地球自转让运动物体偏转——它决定了气旋的旋向与信风的走向，却管不了你家的马桶。",
    url: "/earth-science/concepts/coriolis-effect",
  },
  {
    title: "碳循环",
    description:
      "碳在大气、海洋、岩石与生命之间流动；硅酸盐风化这台「慢恒温器」让地球气候在亿年尺度上保持宜居。",
    url: "/earth-science/concepts/carbon-cycle",
  },
  {
    title: "坦博拉火山 1815",
    description:
      "史上最大喷发之一，平流层硫气溶胶让 1816 成为北半球「无夏之年」，饥荒与迁徙改写了历史。",
    url: "/earth-science/events/tambora-1815",
  },
  {
    title: "大氧化事件",
    description: "约 24 亿年前，蓝藻的产氧光合作用第一次大规模改造了行星大气——生命重塑了地球。",
    url: "/earth-science/events/great-oxidation-event",
  },
  {
    title: "气候临界点",
    description:
      "AMOC、冰盖、雨林等系统可能存在不可逆的「临界点」——高后果但充满不确定，是当下最受关注的前沿。",
    url: "/earth-science/frontier/climate-tipping-points",
  },
  {
    title: "地球内部",
    description: "我们钻不到地心，却靠地震波的「影区」听出了地壳、地幔、液态外核与固态内核的分层。",
    url: "/earth-science/concepts/earth-interior",
  },
];

const MEDICINE_FACTS: readonly DailySelectedFact[] = [
  {
    title: "细菌致病论",
    description:
      "在巴斯德与科赫之前，人们以为疾病源自「瘴气」。证明微生物才是元凶，是医学史上最救命的范式转换之一。",
    url: "/medicine/concepts/germ-theory",
  },
  {
    title: "牛痘接种 1796",
    description:
      "詹纳发现挤奶女工不得天花，用牛痘为一个男孩接种——人类第一支疫苗，最终让天花成为唯一被根除的传染病。",
    url: "/medicine/events/jenner-smallpox-vaccination",
  },
  {
    title: "斯诺与宽街水泵",
    description:
      "1854 年伦敦霍乱，斯诺用一张点子地图把疫情锁定到一口水井，移走泵柄——流行病学就此诞生。",
    url: "/medicine/events/snow-cholera-broad-street",
  },
  {
    title: "抗生素耐药性",
    description:
      "弗莱明在领诺奖时就警告：滥用青霉素会逼出耐药菌。这是达尔文的自然选择在医院里实时上演。",
    url: "/medicine/concepts/antibiotic-resistance",
  },
  {
    title: "青蒿素",
    description:
      "屠呦呦从东晋葛洪《肘后备急方》获得灵感，用低温乙醚提取出青蒿素——古人的观察 + 现代的验证，挽救数百万生命。",
    url: "/medicine/figures/tu-youyou",
  },
  {
    title: "循证医学",
    description:
      "凭名医经验还是凭随机对照试验？循证医学主张让证据而非权威说话——这场静悄悄的革命重塑了现代临床。",
    url: "/medicine/concepts/evidence-based-medicine",
  },
  {
    title: "mRNA 疫苗",
    description:
      "卡里科与魏斯曼坐了几十年冷板凳的 mRNA 技术，在 COVID 中数月内变成疫苗，并赢得 2023 年诺贝尔奖。",
    url: "/medicine/technologies/mrna-vaccine",
  },
  {
    title: "塔斯基吉梅毒研究",
    description:
      "美国一项持续 40 年、刻意不予治疗的研究，是医学伦理最黑暗的一页，直接催生了「知情同意」制度。",
    url: "/medicine/events/tuskegee-syphilis-study",
  },
];

const CHEMISTRY_FACTS: readonly DailySelectedFact[] = [
  {
    title: "门捷列夫的周期表",
    description:
      "1869 年门捷列夫排出周期表时，故意留下空格并预言了未知元素的性质——后来镓、锗的发现一一应验，堪称化学最漂亮的预言。",
    url: "/chemistry/milestones/mendeleev-periodic-law",
  },
  {
    title: "拉瓦锡的氧化学革命",
    description:
      "在他之前，人们以为燃烧是物质释放「燃素」。拉瓦锡用天平证明燃烧其实是与氧结合——化学从此进入定量时代。",
    url: "/chemistry/milestones/lavoisier-oxygen-revolution",
  },
  {
    title: "哈伯-博施合成氨",
    description:
      "把空气里惰性的氮变成肥料，养活了今天近一半的人口；同样的技术也造出了炸药——一项发明的两副面孔。",
    url: "/chemistry/milestones/haber-bosch-process",
  },
  {
    title: "为什么水这么反常",
    description:
      "冰会浮在水上、水的沸点高得离谱——这些「反常」都源于水分子的极性与氢键，也正是它们让地球宜居。",
    url: "/chemistry/substances/water",
  },
  {
    title: "碳的多副面孔",
    description:
      "同样是碳原子：排成一种结构是坚硬的金刚石，换一种就是柔软的石墨，再换是只有一个原子厚的石墨烯。",
    url: "/chemistry/substances/carbon-allotropes",
  },
  {
    title: "催化剂：化学的「媒人」",
    description:
      "它降低反应的「门槛」（活化能）、加速反应，自己却毫发无损。从汽车尾气净化到体内的酶，催化无处不在。",
    url: "/chemistry/substances/catalysts",
  },
  {
    title: "氧化还原：电子的搬运",
    description:
      "呼吸、生锈、电池、燃烧，本质上都是电子从一处搬到另一处。氧化还原把这些看似无关的现象统一了起来。",
    url: "/chemistry/concepts/redox-reactions",
  },
  {
    title: "摩尔：化学家怎么数原子",
    description:
      "原子太小没法一个个数，于是化学家用「摩尔」打包：1 摩尔就是约 6.022×10²³ 个粒子——阿伏伽德罗常数。",
    url: "/chemistry/concepts/the-mole",
  },
];

/**
 * Pick one "on this day" event: prefer events matching today's date, else fall
 * back to the full list, then project to the display shape. Seeded so a given
 * (date, seedOffset) always yields the same pick.
 */
function pickDailyEvent<T extends DailySelectedEvent>(
  todayMatches: readonly T[],
  fullList: readonly T[],
  seed: number
): DailySelectedEvent {
  const pool = todayMatches.length > 0 ? todayMatches : fullList;
  const { title, description, year, url } = seededSelect(pool, seed);
  return { title, description, year, url };
}

export function getDailySelected(date?: Date, seedOffset = 0): DailySelected {
  const now = date ?? new Date();
  const seed = dateSeed(now) + seedOffset * 7919;
  const dateStr = formatDate(now);
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const historyEvents = HISTORY_TODAY.filter((e) => e.month === month && e.day === day);
  const physicsEvents = PHYSICS_TODAY.filter((e) => e.month === month && e.day === day);
  const philosophyEvents = PHILOSOPHY_TODAY.filter((e) => e.month === month && e.day === day);
  const economicsEvents = ECONOMICS_TODAY.filter((e) => e.month === month && e.day === day);
  const psychologyEvents = PSYCHOLOGY_TODAY.filter((e) => e.month === month && e.day === day);
  const onThisDayEvents = ON_THIS_DAY.filter((e) => e.month === month && e.day === day);

  const physics = pickDailyEvent(physicsEvents, PHYSICS_TODAY, seed);
  const history = pickDailyEvent(historyEvents, HISTORY_TODAY, seed + 1);
  const philosophy = pickDailyEvent(philosophyEvents, PHILOSOPHY_TODAY, seed + 2);
  const economics = pickDailyEvent(economicsEvents, ECONOMICS_TODAY, seed + 8);
  const psychology = pickDailyEvent(psychologyEvents, PSYCHOLOGY_TODAY, seed + 9);

  const mathematics = seededSelect(MATH_FACTS, seed + 3);
  const lifeScience = seededSelect(LIFE_SCIENCE_FACTS, seed + 4);
  const cosmology = seededSelect(COSMOLOGY_FACTS, seed + 5);
  const computerScience = seededSelect(COMPUTER_SCIENCE_FACTS, seed + 12);
  const politicalScience = seededSelect(POLITICAL_SCIENCE_FACTS, seed + 13);
  const earthScience = seededSelect(EARTH_SCIENCE_FACTS, seed + 14);
  const medicine = seededSelect(MEDICINE_FACTS, seed + 15);
  const chemistry = seededSelect(CHEMISTRY_FACTS, seed + 16);

  const curiosityItem = seededSelect(getAllCuriosities(), seed + 14);
  const curiosity = {
    title: curiosityItem.title,
    detail: curiosityItem.detail,
    url: curiosityItem.url,
  };
  const economicsFact = seededSelect(ECONOMICS_FACTS, seed + 10);
  const psychologyFact = seededSelect(PSYCHOLOGY_FACTS, seed + 11);

  const question = seededSelect(DAILY_QUESTIONS, seed + 6);

  const monthKey = String(month).padStart(2, "0");
  const facts = MONTHLY_FACTS[monthKey] ?? ["每一天都值得探索"];
  const fact = seededSelect(facts, seed + 7);

  const onThisDay: OnThisDayMatch[] = onThisDayEvents.map((e) => ({
    month: e.month,
    day: e.day,
    year: e.year,
    title: e.title,
    description: e.description,
    domain: e.domain,
    domainColor: e.domainColor,
    url: e.url,
  }));

  return {
    date: dateStr,
    seed,
    physics,
    history,
    philosophy,
    economics,
    psychology,
    mathematics,
    lifeScience,
    cosmology,
    computerScience,
    politicalScience,
    earthScience,
    medicine,
    chemistry,
    curiosity,
    question,
    fact,
    onThisDay,
  };
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatDisplayDate(dateStr: string): string {
  const parts = dateStr.split("-");
  const y = parts[0] ?? "";
  const m = parts[1] ?? "";
  const d = parts[2] ?? "";
  return `${y}年${parseInt(m, 10)}月${parseInt(d, 10)}日`;
}

export function getWeekday(dateStr: string): string {
  const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"] as const;
  const d = new Date(dateStr + "T00:00:00");
  return `星期${WEEKDAYS[d.getDay()]}`;
}

export function buildShareText(daily: DailySelected): string {
  const displayDate = formatDisplayDate(daily.date);
  const weekday = getWeekday(daily.date);

  const lines = [
    `📚 每日知识 · ${displayDate} ${weekday}`,
    "",
    `🔬 物理：${daily.physics.title}`,
    `📜 历史：${daily.history.title}`,
    `💭 哲学：${daily.philosophy.title}`,
    `📊 经济：${daily.economics.title}`,
    `🧠 心理：${daily.psychology.title}`,
    `📐 数学：${daily.mathematics.title}`,
    `🧬 生命：${daily.lifeScience.title}`,
    `🌌 宇宙：${daily.cosmology.title}`,
    `💻 计算机：${daily.computerScience.title}`,
    `⚖️ 政治：${daily.politicalScience.title}`,
    `🌍 地球科学：${daily.earthScience.title}`,
    `⚕️ 医学：${daily.medicine.title}`,
    `⚗️ 化学：${daily.chemistry.title}`,
    "",
    `❓ 今日一问：${daily.question}`,
    "",
    `💡 ${daily.fact}`,
    "",
    `— Episteme · 格致`,
  ];

  return lines.join("\n");
}

export { simpleHash };
