import type { Curiosity } from "@/lib/curiosities";

export const ECONOMICS_CURIOSITIES: Curiosity[] = [
  {
    id: "invisible-hand-once",
    title: "亚当·斯密在《国富论》里只用过一次「看不见的手」",
    detail:
      "这个被后人奉为市场经济象征的短语，在斯密的鸿篇巨著里仅出现一次，且语境相当具体。斯密本人更看重的，其实是道德情操与制度对市场的约束。",
    source: "《国富论》(1776) 第四篇",
    tags: ["亚当·斯密", "市场"],
    url: "/economics/economists/adam-smith",
  },
  {
    id: "giffen-good",
    title: "有一类商品，价格越涨人们买得越多",
    detail:
      "「吉芬商品」违反需求定律：当某种廉价主食涨价、挤占了穷人的全部预算时，他们反而被迫减少更贵的食物、买更多这种主食。它极其罕见，19 世纪爱尔兰土豆是经典疑例。",
    source: "Marshall 提出，Jensen & Miller 2008 给出现代证据",
    tags: ["需求", "反常"],
    url: "/economics/concepts",
  },
  {
    id: "decoy-effect",
    title: "加一个「没人会选」的选项，能让你改买更贵的那个",
    detail:
      "《经济学人》曾把订阅设成：电子版 59 美元、纸质版 125 美元、电子+纸质也 125 美元。那个看似多余的「纸质版」其实是诱饵，让多数人觉得「电子+纸质」超值——这就是诱饵效应。",
    source: "Ariely, 《怪诞行为学》(2008)",
    tags: ["行为经济学", "诱饵效应"],
    url: "/economics",
  },
  {
    id: "diamond-water-paradox",
    title: "水比钻石有用，为什么钻石更贵？亚当·斯密提出这个悖论却答错了答案",
    detail:
      "亚当·斯密在《国富论》里提出了「钻石-水悖论」：水维持生命，钻石几乎无用，但价格却完全相反。斯密用劳动价值论解释，却遗漏了关键：稀缺性与边际效用。这个悖论直到一百年后才被奥地利经济学派真正解决。",
    source: "Smith, 《国富论》(1776)；Menger, Principles of Economics (1871)",
    tags: ["亚当·斯密", "价值理论"],
    url: "/economics",
  },
  {
    id: "veblen-goods",
    title: "有些奢侈品价格越涨反而卖得越好，因为贵本身就是它的功能",
    detail:
      "经济学家托斯丹·范伯伦在 1899 年的《有闲阶级论》里发现：某些商品的吸引力恰恰来自其高价，降价反而会让人不想买。这类商品后来被称为「韦伯伦商品」，今天的顶级奢侈品牌对此运用得炉火纯青。",
    source: "Veblen, The Theory of the Leisure Class (1899)",
    tags: ["消费行为", "炫耀性消费"],
    url: "/economics",
  },
  {
    id: "keynes-stock-market-fortune",
    title: "凯恩斯每天早上躺在床上花半小时炒股，最终身价相当于今天 3000 万美元",
    detail:
      "约翰·梅纳德·凯恩斯不只是宏观经济学奠基人，他还是一位极其成功的投资者。他替剑桥大学国王学院管理捐赠基金，年均回报率 16%，远超同期市场的 10.4%。他每天清晨在床上用半小时读财报做决策，这套方式一直延续到去世。",
    source: "Walsh, Keynes and the Market (2008); Cambridge Judge Business School records",
    tags: ["凯恩斯", "投资"],
    url: "/economics",
  },
  {
    id: "nobel-economics-not-real-nobel",
    title: "「诺贝尔经济学奖」不是诺贝尔设立的，诺贝尔家族曾公开抱怨",
    detail:
      "阿尔弗雷德·诺贝尔 1895 年的遗嘱里设立了物理、化学、医学、文学、和平五个奖项，根本没有经济学。「经济学诺贝尔奖」是 1968 年瑞典中央银行为庆祝建行 300 周年而自行出资设立的，正式名称是「瑞典国家银行纪念阿尔弗雷德·诺贝尔经济学奖」。2001 年，四位诺贝尔家族成员公开写信，抗议这个奖项「贬低」了其他真正的诺贝尔奖。",
    source:
      "FiveThirtyEight, 'The Economics Nobel Isn't Really a Nobel' (2016); Nobel Foundation records",
    tags: ["经济学史", "诺贝尔奖"],
    url: "/economics",
  },
  {
    id: "sunk-cost-concorde",
    title: "英法政府明知协和式飞机永远亏损，却还是飞了 27 年——经济学家因此命名了一个偏误",
    detail:
      "协和式超音速客机项目从一开始就在商业上无法盈利，但英法两国政府因为已经投入了巨额资金，不愿承认错误而坚持运营到 2003 年。这种「因为已经花了钱就继续投入」的心理，被行为经济学家称为「沉没成本谬误」，又名「协和谬误」。",
    source:
      "Thaler, 'Mental Accounting Matters' (1980); Arkes & Blumer, Organizational Behavior and Human Decision Processes (1985)",
    tags: ["行为经济学", "沉没成本"],
    url: "/economics",
  },
  {
    id: "ultimatum-game-fairness",
    title: "实验证明：人宁愿自己什么都得不到，也不愿对方得到「不公平」的份额",
    detail:
      "在「最后通牒博弈」实验中，一方可以分配一笔钱，另一方可以选择接受或拒绝（拒绝则双方都得零）。按照传统经济学逻辑，任何大于零的分配都该被接受。但实验结果显示，当分配比例低于 20-30% 时，大多数人宁愿拒绝，让双方都空手而归——为了「惩罚」不公平。",
    source: "Güth, Schmittberger & Schwarze, Journal of Economic Behavior (1982)",
    tags: ["行为经济学", "公平"],
    url: "/economics",
  },
  {
    id: "anchoring-effect-roulette",
    title: "一个随机转出的数字，会影响你对完全无关事物的估价",
    detail:
      "卡尼曼和特沃斯基做过一个经典实验：先让参与者看一个由作弊轮盘随机转出的数字（10 或 65），再估计联合国里非洲国家的占比。转到 10 的人平均猜 25%，转到 65 的人平均猜 45%。那个完全随机、明显无关的数字，仍然锚定了人们的判断。",
    source:
      "Tversky & Kahneman, 'Judgment under Uncertainty: Heuristics and Biases', Science (1974)",
    tags: ["行为经济学", "锚定效应"],
    url: "/economics",
  },
  {
    id: "loss-aversion-twice",
    title: "失去 100 元的痛苦，大约是得到 100 元快乐的两倍——这颠覆了传统经济学",
    detail:
      "卡尼曼和特沃斯基在 1979 年的前景理论中发现，人类对损失的敏感程度约是同等获益的两倍。这意味着「理性经济人」是个幻觉——人们系统性地高估损失、低估获益，导致各种非理性决策。卡尼曼因此在 2002 年获得诺贝尔经济学奖。",
    source: "Kahneman & Tversky, 'Prospect Theory', Econometrica (1979)",
    tags: ["行为经济学", "损失厌恶"],
    url: "/economics",
  },
  {
    id: "malthus-wrong-prediction",
    title: "马尔萨斯 1798 年预言人类必将陷入饥荒——他的逻辑无懈可击，但结论大错特错",
    detail:
      "托马斯·马尔萨斯在《人口论》里论证：人口以几何级数增长，粮食只能以算术级数增长，因此饥荒不可避免。他的数学没有问题，但他完全没有预见到工业革命和农业技术革命——人类用技术打破了他设想的铁律。",
    source: "Malthus, An Essay on the Principle of Population (1798)",
    tags: ["马尔萨斯", "人口经济学"],
    url: "/economics",
  },
  {
    id: "coase-theorem-transaction-costs",
    title: "科斯定理的核心是一个「不存在的世界」：没有交易成本时，产权怎么分都无所谓",
    detail:
      "罗纳德·科斯在 1960 年的论文里论证：如果交易成本为零，无论初始产权如何分配，当事各方总会通过谈判达到最有效率的结果。这个定理的真正意义在于它的反面——现实中交易成本无处不在，所以产权分配至关重要。科斯凭此获得了 1991 年诺贝尔经济学奖。",
    source: "Coase, 'The Problem of Social Cost', Journal of Law and Economics (1960)",
    tags: ["科斯", "产权经济学"],
    url: "/economics",
  },
  {
    id: "broken-windows-atlantic-monthly",
    title: "「破窗理论」不是学术论文，而是发表在一本杂志上的文章，却改变了纽约的命运",
    detail:
      "1982 年，威尔逊和凯林在《大西洋月刊》（非学术期刊）发表文章，提出环境中的失序迹象（一扇破窗）会引发更多犯罪。1990 年代纽约警察局据此推行「零容忍」政策，犯罪率大幅下降。但该理论至今在学界仍有争议，批评者认为它忽视了犯罪的根本社会原因。",
    source: "Wilson & Kelling, 'Broken Windows', The Atlantic Monthly (1982)",
    tags: ["犯罪经济学", "城市政策"],
    url: "/economics",
  },
  {
    id: "nudge-opt-out-organ-donation",
    title: "把「默认选项」从「不捐献」改为「捐献」，器官捐献率可以从不足 20% 跳到 90% 以上",
    detail:
      "行为经济学家塞勒和桑斯坦发现，人们有强烈的「维持现状偏误」，倾向于接受默认选项。在「器官捐献」这件事上，需要主动选择捐献的国家（如美国）捐献率极低；而把默认改为「自动捐献、可选择退出」的国家（如奥地利），捐献率高达 90% 以上。一个默认值的改变，胜过无数道德劝说。",
    source: "Thaler & Sunstein, Nudge (2008); Johnson & Goldstein, Science (2003)",
    tags: ["行为经济学", "助推理论"],
    url: "/economics",
  },
  {
    id: "keynes-hayek-rival",
    title: "20 世纪最重要的经济学论战：两位天才用笔而非嘴巴战了十五年",
    detail:
      "1931 年，哈耶克公开批评凯恩斯的货币理论，两人随即展开长达十五年的书面论战，直到凯恩斯 1946 年去世为止。前者主张自由市场、反对政府干预；后者主张政府支出可以拯救经济。这场论战的回响至今仍支配着全球的财政政策辩论。",
    source: "Wapshott, Keynes Hayek: The Clash That Defined Modern Economics (2011)",
    tags: ["凯恩斯", "哈耶克"],
    url: "/economics",
  },
  {
    id: "marx-kapital-unfinished",
    title: "马克思只完成了《资本论》的第一卷，另外两卷是恩格斯替他整理出版的",
    detail:
      "卡尔·马克思 1867 年出版了《资本论》第一卷，但他生前始终未能完成整部著作。1883 年马克思去世后，好友恩格斯从他留下的大量草稿中整理出第二卷（1885）和第三卷（1894）。我们今天读到的「完整的《资本论》」，有相当部分是恩格斯的编辑工作。",
    source: "Wikipedia, Das Kapital; Britannica, Das Kapital",
    tags: ["马克思", "政治经济学"],
    url: "/economics",
  },
  {
    id: "adam-smith-moral-sentiments",
    title: "亚当·斯密认为自己最重要的作品不是《国富论》，而是一本关于同情心的书",
    detail:
      "《国富论》问世前 17 年，亚当·斯密已出版了《道德情操论》，论述人类行为的基础是「同理心」而非自利。斯密生前多次修订《道德情操论》，最后一版修订于去世前数年完成，被认为是他对自己思想最精心的总结——他从未以同等热情修订《国富论》。",
    source: "University of Glasgow, 'Adam Smith 300: The Theory of Moral Sentiments'",
    tags: ["亚当·斯密", "道德经济学"],
    url: "/economics",
  },
];
