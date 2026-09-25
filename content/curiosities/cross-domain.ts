import type { CuriosityWithSubject } from "@/lib/curiosities";

export const CROSS_DOMAIN_CURIOSITIES: CuriosityWithSubject[] = [
  {
    id: "gchq-classified-public-key",
    title: "公钥密码在斯坦福「发明」之前四年，已经锁在英国机密柜里",
    detail:
      "看起来像有人窃听了学术界：GCHQ 的 Ellis（1969）提出「非秘密加密」，Cocks（1973）写出与 RSA 等价的方案，Williamson（1974）又独立得到与 Diffie–Hellman 等价的密钥交换——全比 1976–1978 年的公开论文更早。其实不是学术圈被渗透，是分类制度：这批笔记直到 1997 年才解密，Ellis 去世前一个月仍未获公开承认。同一套数学在保密机关与公开学界各走一遍，才是 1970 年代公钥的真实诞生图。",
    source: "Cocks, A Note on 'Non-Secret Encryption' (CESG/GCHQ, 1973; declassified 1997)",
    subject: "computer-science",
    tags: ["cross-domain", "密码学", "多重发现"],
    url: "/computer-science/concepts/encryption-basics",
  },
  {
    id: "darwin-wallace-same-mechanism",
    title: "达尔文沉默二十年，华莱士从马来群岛寄来几乎同一套自然选择",
    detail:
      "1858 年华莱士的信让达尔文恐慌——两人独立写出同一机制，像是有人泄了密。其实是默顿后来所说的「多重发现」：同一批生物地理学标本、同一套深时地质学，会把两个人推向同一扇门。林奈学会把两篇论文同年宣读；《物种起源》次年才出版。看起来像偷窃，账本上是同时抵达。",
    source: "Darwin & Wallace, Journal of the Proceedings of the Linnean Society 3 (1858): 45–62",
    subject: "life-science",
    tags: ["cross-domain", "自然选择", "科学史"],
    url: "/life-science/dialogues/darwin-wallace",
  },
  {
    id: "newton-leibniz-multiple-discovery",
    title: "牛顿与莱布尼茨的微积分优先权官司，看起来像跨国盗窃",
    detail:
      "皇家学会 1712 年的《通信汇编》把莱布尼茨写成抄袭者——牛顿当时正是会长，像一场内定审判。数学史现在的主流判断是独立发明：牛顿 1660 年代已有流数法，莱布尼茨 1670 年代独立发展出更易传播的符号。默顿 1957 年把这类撕扯写成科学奖励制度的必然产物：只认「第一名」，优先权就会被争夺，并不需要有人偷手稿。",
    source: 'Merton, "Priorities in Scientific Discovery", American Sociological Review (1957)',
    subject: "mathematics",
    tags: ["cross-domain", "微积分", "优先权"],
    url: "/mathematics/dialogues/newton-leibniz",
  },
  {
    id: "zipf-words-and-cities",
    title: "词频和城市人口，居然服从同一条幂律",
    detail:
      "齐普夫 1949 年发现：一种语言里第 n 常见的词，频率大约是最常见词的 1/n；城市人口排序也画出几乎同一条线。词典编纂和都市规划看起来毫无关系，数学却串了门。这不是有人在词库和户口本之间搞统筹，而是「省力」与优先连接一类机制，会在完全不同的房间里长出同一种尾巴。",
    source: "Zipf, Human Behavior and the Principle of Least Effort (1949); Gabaix, QJE (1999)",
    subject: "linguistics",
    tags: ["cross-domain", "幂律", "城市"],
    url: "/linguistics/methods-and-frontiers/corpus-linguistics",
  },
  {
    id: "boltzmann-shannon-entropy-cousins",
    title: "热力学的熵和信息论的熵，公式长得像偷来的",
    detail:
      "玻尔兹曼把熵写成微观状态数的对数；香农 1948 年给不确定度写下几乎同一个式子。热机和电话线看起来不该共用一个字母。它们不是互相抄袭，而是在数同一类东西：有多少种同样说得通的安排。Jaynes 后来把统计力学改写成最大熵推断——物理学家的 S 和工程师的 H，是表亲，不是赃物。",
    source:
      "Shannon, Bell System Technical Journal (1948); Boltzmann (1877); Jaynes, Physical Review (1957)",
    subject: "physics",
    tags: ["cross-domain", "熵", "信息论"],
    url: "/universe-physics/knowledge-base/热力学--熵与时间之箭",
  },
  {
    id: "octopus-vertebrate-camera-eyes",
    title: "章鱼和脊椎动物各自「发明」了相机眼，看起来像统一设计",
    detail:
      "透镜、视网膜、可调焦距——头足类和脊椎动物的眼睛外形像同一张图纸，智能设计论最爱拿它说事。发育起源却完全不同：脊椎动物视网膜来自神经外胚层的视杯，章鱼的眼睛在体表外胚层凹陷里原位组装，神经走线也不一样。分子工具箱（视蛋白、Pax6）是共享的老零件；把零件装成相机，两边各干了一次。看起来像串通，其实是趋同进化。",
    source: "Nilsson & Pelger, Proceedings of the Royal Society B (1994)",
    subject: "life-science",
    tags: ["cross-domain", "趋同进化", "眼睛"],
    url: "/life-science/knowledge-base/进化专题--眼睛的进化",
  },
  {
    id: "stiglers-law-wrong-names",
    title: "斯蒂格勒定律：科学发现几乎从不以真正的发现者命名",
    detail:
      "阿拉伯数字不是阿拉伯人发明的，科斯定理不是科斯起的名，惠更斯–菲涅尔原理里菲涅尔做了关键一步——像是有个委员会专门张冠李戴。斯蒂芬·斯蒂格勒 1980 年把这条规律写成「斯蒂格勒定律」，并声明它其实该记在默顿名下：他研究了一辈子优先权错配。这条定律自己就是自己的例证。不是阴谋，是声望、教科书和「谁的名字更好记」的筛选。",
    source:
      'Stigler, "Stigler\'s Law of Eponymy", Transactions of the New York Academy of Sciences (1980)',
    subject: "sociology",
    tags: ["cross-domain", "科学社会学", "命名"],
    url: "/sociology/thinkers/robert-merton",
  },
  {
    id: "clever-hans-unconscious-cues",
    title: "会做算术的马「读懂」了人心——其实读懂的是马鞭微动",
    detail:
      "20 世纪初，汉斯能用蹄子点出加减答案，参观者觉得它通灵，或觉得主人在作弊。心理学家普丰斯特 1907 年证明：马看见提问者头部和身体的无意识微动，问完就停蹄；提问者自己不知道答案时，马立刻「不会算」。看起来像心灵感应，其实是实验者期望漏出的线索。后来整套方法学都多了一条：双盲，就是为了防汉斯。",
    source: "Pfungst, Das Pferd des Herrn von Osten (1907)",
    subject: "psychology",
    tags: ["cross-domain", "实验者效应", "动物认知"],
  },
  {
    id: "n-rays-field-that-wasnt-there",
    title: "N 射线：整整一个学科看见了并不存在的光",
    detail:
      "1903 年起，布洛德洛和他的实验室报告了一种新射线，欧洲多国跟进「重复」。美国物理学家伍德 1904 年在《自然》写下现场拆穿：他暗中拿走了关键棱镜，演示仍「成功」。朗缪尔后来把 N 射线、促有丝分裂射线列为「病态科学」标本——效应贴着探测极限、精度却宣称极高，反对意见被临时借口挡掉。不是有人压下了重大发现，是期望把噪声认成了信号。",
    source:
      'Wood, "The n-Rays", Nature 70 (1904): 530–531; Langmuir, "Pathological Science" (1953)',
    subject: "chemistry",
    tags: ["cross-domain", "病态科学", "可重复性"],
    url: "/chemistry/milestones/polywater-and-pathological-science",
  },
  {
    id: "piltdown-fraud-not-coverup",
    title: "皮尔当人是一场真实的造假，不是被压制的「缺失环节」",
    detail:
      "1912 年英国亮出「最早的英国人」：人的颅骨配猩猩的下颌，像是进化论被本地英雄坐实。1953 年大英博物馆的氟含量与显微分析证明下颌是现代猿、牙齿被锉过、骨头被染色。这是伪造，不是博物馆联手隐瞒更惊人的真相。化石记录本就残缺；补上一个爱国缺口的诱惑，比任何「封存档案」都更常见。",
    source:
      "Weiner, Oakley & Le Gros Clark, Bulletin of the British Museum (Natural History) (1953)",
    subject: "anthropology",
    tags: ["cross-domain", "科学造假", "化石"],
    url: "/earth-science/concepts/paleontology-and-fossils",
  },
  {
    id: "oxygen-three-rooms-one-gas",
    title: "氧气被「发明」了三次，像有人把同一瓶气体在三国之间走私",
    detail:
      "舍勒先制出「火气」却迟迟未发表，普利斯特利 1774 年得到「脱燃素空气」，拉瓦锡把它命名为氧并改写燃烧账本。看起来像巴黎兵工厂偷了英国人的气体。三个人拿到的是同一份样品，交出的是三套理论：燃素、反燃素、氧化。拉瓦锡没有走私那瓶气，他走私的是天平——质量守恒把「空气少了多少」写成一种新物质的身份证，而不是一场跨国盗窃。",
    source:
      "Lavoisier, Traité élémentaire de chimie (1789); Priestley, Experiments and Observations on Different Kinds of Air (1775)",
    subject: "chemistry",
    tags: ["cross-domain", "氧气", "多重发现"],
    url: "/chemistry/milestones/lavoisier-oxygen-revolution",
  },
  {
    id: "iridium-worldwide-not-salted",
    title: "全世界同一层黏土里都有铱，像有人把地球表面撒了一圈粉末",
    detail:
      "阿尔瓦雷茨父子 1980 年报告：白垩纪—古近纪界线的黏土里铱含量异常，而且远隔大洋的剖面几乎同时出现。铱在地壳里稀、在某些陨石里富，全球一层就很像被统一投料。后来尤卡坦半岛的希克苏鲁伯坑把「谁撒的」收成一次撞击：粉尘、火灾、食物网断裂写在同一条时间线上。不是有人沿纬度撒粉，是一块外来石头把账本复印到全世界。",
    source: "Alvarez, Alvarez, Asaro & Michel, Science 208 (1980): 1095–1108",
    subject: "earth-science",
    tags: ["cross-domain", "铱异常", "大灭绝"],
    url: "/earth-science/events/chicxulub-impact",
  },
  {
    id: "agriculture-invented-in-several-rooms",
    title: "农业在互不相通的大陆上各自开工，像一份被提前散发的说明书",
    detail:
      "新月沃地、长江流域、中美洲、安第斯，驯化时间错开、作物完全不同，却都从采集走进了种植。看起来像有一份秘密农书漂洋过海。更省力的解释是全新世变暖、可驯化物种和人口压力在多个实验室同时够用。共同祖先不是一本失落的手册，是气候把几扇门一起打开——门后种的是小麦、水稻、玉米，不是同一套阴谋。",
    source: "Zeder, “The Origins of Agriculture in the Near East”, Current Anthropology 52 (2011)",
    subject: "anthropology",
    tags: ["cross-domain", "驯化", "趋同"],
    url: "/anthropology/prehistory-and-archaeology/foragers-and-farmers",
  },
  {
    id: "arrow-voting-not-a-rigged-room",
    title: "「选举被操纵了」有时只是：没有任何投票规则能同时当圣人",
    detail:
      "阿罗 1951 年证明：选项超过两个时，不存在能同时满足一组看起来很弱的公理的排序加总规则。把这读成「民主是骗局、总有人在幕后改票」，是把一条逻辑限制当成了人事档案。每个真实制度都公开放弃了某一条——多数决会循环，排序投票会被策略，独裁能自洽但没人想要。看起来像密室，其实是数学请你选代价。",
    source: "Arrow, Social Choice and Individual Values (1951)",
    subject: "political-science",
    tags: ["cross-domain", "社会选择", "投票"],
    url: "/economics/concepts/social-choice-theory",
  },
  {
    id: "birthday-paradox-not-a-plot",
    title: "「这么巧一定是有人安排」——生日悖论说：23 个人就够了",
    detail:
      "一间屋里两个人同日生，直觉要上百人才可能，数学只要 23 人就过半。迪亚科尼斯与莫斯特勒 1989 年把这类惊吓写成「巧合的统计学」：你没有预先指定哪一对、哪一天、哪件新闻会对上，可供匹配的通道就爆炸。阴谋叙事靠的是事后挑选那一条对齐的线，再假装它事先就被写好。巧合不是证据，未指定的搜索空间才是。",
    source: 'Diaconis & Mosteller, "Methods for Studying Coincidences", JASA (1989)',
    subject: "mathematics",
    tags: ["cross-domain", "概率", "巧合"],
    url: "/mathematics/concepts/probability",
  },
  {
    id: "small-world-not-elite-cabal",
    title: "「六度分隔」不像精英俱乐部，更像随便一张够乱的网",
    detail:
      "米尔格拉姆 1960 年代的信件实验、瓦茨与斯特罗加茨 1998 年的小世界模型，都显示陌生人之间平均只隔很短的一串熟人。把这读成「上层都互相认识所以必有密谋」，是把一种几乎任何带少量长程捷径的网络都会长出的几何，当成了人事档案。神经元、电网、演员合作网同样是小世界。连接是通例，不是入会仪式。",
    source: "Watts & Strogatz, Nature 393 (1998): 440–442; Milgram, Psychology Today (1967)",
    subject: "sociology",
    tags: ["cross-domain", "小世界", "网络"],
    url: "/mathematics/concepts/network-science",
  },
  {
    id: "language-trees-not-ur-language-cabal",
    title: "语言家族树看起来像一部秘密祖语，其实是可证伪的比较方法",
    detail:
      "琼斯 1786 年指出梵语、希腊语、拉丁语的相似「绝非偶然」——听起来像在追一种被藏起来的原始圣语。历史语言学要的不是密教祖语，而是跨大量词项的规则声音对应；偶然谐音、借词和拟声都过不了这道门。语言树和生物系统发育树用了同一种「共同祖先 + 分化」模型，正因为分化会留下可检验的对应，不是因为有人保存了一本万语词典。",
    source: "Jones, Third Anniversary Discourse, Asiatic Society of Bengal (1786)",
    subject: "linguistics",
    tags: ["cross-domain", "比较方法", "谱系"],
    url: "/linguistics/history-typology-society/language-families",
  },
  {
    id: "hubble-lemaitre-wrong-name",
    title: "宇宙膨胀定律长期挂着哈勃的名字，勒梅特的论文先写了却像被谁藏起来",
    detail:
      "勒梅特 1927 年已把膨胀、距离和速度写在布鲁塞尔的学报上；哈勃 1929 年的图更会传播，定律就改姓哈勃。看起来像英语世界把比利时神父的优先权锁进抽屉。更接近账本的是语言、战争和观测权威：埃丁顿推动英译时删掉了速度—距离关系那一段。国际天文学联合会 2018 年才改称哈勃–勒梅特定律。不是有人销毁原稿，是名声沿着更响的那张图走。",
    source:
      "Lemaître, Annales de la Société Scientifique de Bruxelles (1927); IAU Resolution B4 (2018)",
    subject: "cosmology",
    tags: ["cross-domain", "优先权", "膨胀"],
    url: "/cosmology/dialogues/hubble-lemaitre",
  },
  {
    id: "face-on-mars-pareidolia",
    title: "火星上那张脸，是人脑把阴影认成五官，不是谁刻在西多尼亚",
    detail:
      "维京号 1976 年一张低分辨率照片让「火星人脸」变成流行密谋：文明遗址、NASA 裁图。1998 年火星全球探勘者号更高分辨率的图像显示，那是一座被光影拉长的台地。把随机起伏看成脸，和把云看成羊是同一套回路：面孔检测对生存太重要，假阳性便宜。看起来像被掩盖的接触，其实是错觉——而且是一种人人都有的错觉。",
    source: "NASA / Malin Space Science Systems, Mars Global Surveyor Cydonia images (1998, 2001)",
    subject: "cosmology",
    tags: ["cross-domain", "帕雷多利亚", "火星"],
    url: "/earth-science/concepts/planetary-geology",
  },
  {
    id: "frequency-illusion-not-coordination",
    title: "你刚认识一个词，全世界突然都在用——世界没有串通，是注意被打开了",
    detail:
      "频率错觉（又称 Baader-Meinhof 现象）：一旦某车牌、某病名、某术语进入你的注意，它就像被安排着反复出现。齐茨基 2006 年把它拆成两步：选择性注意加上确认偏误。可得性启发会再补一刀：越容易想起，越觉得「最近特别多」。看起来像有人在协调投放，其实是你的过滤器换了设定，底噪从来都在。",
    source:
      "Zwicky, Why are we so illuded? (2006); Tversky & Kahneman, Cognitive Psychology (1973)",
    subject: "psychology",
    tags: ["cross-domain", "频率错觉", "可得性启发"],
    url: "/psychology/phenomena/availability-heuristic",
  },
  {
    id: "gps-icd-not-a-relativity-hoax",
    title: "GPS 钟每天要改三十八微秒，看起来像有人把广义相对论写进了导航骗局",
    detail:
      "有一种说法是：卫星定位靠牛顿力学就够，公开文件里的相对论修正是航天机构用来「证明」爱因斯坦的道具。实情写在公开的接口规范里：星载钟在较弱引力势中每天快约 45 微秒，运动学效应又让它慢约 7 微秒，净快约 38 微秒；不预偏、不监测，伪距会按光速把钟差摊成每天约 11 公里的漂移。这不是密室里的伪造，是把已经发表的钟率写进工程预算——接口控制文件谁都可以读。",
    source: "Ashby, Living Reviews in Relativity 6 (2003): 1; IS-GPS-200 (public ICD)",
    subject: "physics",
    tags: ["cross-domain", "GPS", "相对论"],
    url: "/universe-physics/knowledge-base/相对论--引力红移与引力时间膨胀",
  },
  {
    id: "phyllotaxis-not-golden-ratio-cult",
    title: "向日葵、鹦鹉螺和信用卡，看起来都在执行同一份黄金分割密教",
    detail:
      "流行读物把叶序、螺壳和帕特农都写成 φ≈1.618 的宇宙密码，像植物发芽前读过一份秘密比例。叶序里的黄金角是真的：新原基互相推开，最密堆积会收敛到圆的无理旋转；斐波那契计数是这套动力学的整数影子。把同一比值事后贴到神庙立面或钱包上，是十九世纪才发明的审美神话——马克夫斯基 1992 年逐条拆过：量点可调，总能凑出 1.6。植物没有入会，测量者在选点。",
    source:
      'Markowsky, "Misconceptions about the Golden Ratio", College Mathematics Journal 23 (1992); Douady & Couder, Physical Review Letters (1992)',
    subject: "arts",
    tags: ["cross-domain", "叶序", "黄金比"],
    url: "/arts/foundations/proportion-and-harmony",
  },
  {
    id: "pyramids-egypt-mesoamerica-not-one-cult",
    title: "埃及和中美洲各自堆出金字塔，看起来像一份漂洋过海的秘密图纸",
    detail:
      "胡夫金字塔的底边和特奥蒂瓦坎太阳金字塔差不多宽，于是有人写成同一帮人、同一套祭仪、甚至同一艘船。年代错开两千年以上，结构也不是同一套：尼罗河那侧是精确石砌的陵墓真锥，墨西哥高原上是更扁平的神庙台地，亡灵大道按城市网格铺开。把石头堆成可攀的山，好让仪式离开地面，是许多早期城市都会摸到的力学与象征；共同祖先不是大西洋底下的失落教团，是重力、劳动力和「往上走」这三样到处都有的约束。",
    source: "Cowgill, Ancient Teotihuacan (Cambridge, 2015); Lehner, The Complete Pyramids (1997)",
    subject: "human-history",
    tags: ["cross-domain", "金字塔", "趋同"],
    url: "/human-history/knowledge/古典时期--美洲--特奥蒂瓦坎",
  },
  {
    id: "logistic-map-not-a-hidden-rng",
    title: "一行二次方程就能长出无法预报的噪声，看起来像有人在方程后面装了骰子",
    detail:
      "逻辑斯蒂映射 x↦rx(1−x) 没有随机项，参数一过倍周期级联，轨迹却像被后台打乱。把这读成「确定性是装的、必有隐藏开关」，是把不可预报误当成有人在作弊。梅 1976 年把这张抛物线写成生态学里的警告：简单规则可以生出混沌；费根鲍姆后来发现分叉间距收敛到同一个常数。看起来像密室掷骰，其实是初值误差按指数被拉伸——重跑同一个初值，噪声会原样再现。",
    source:
      'May, "Simple mathematical models with very complicated dynamics", Nature 261 (1976); Feigenbaum, Journal of Statistical Physics (1978)',
    subject: "mathematics",
    tags: ["cross-domain", "混沌", "逻辑斯蒂映射"],
    url: "/mathematics/concepts/chaos-theory",
  },
  {
    id: "mendel-ratios-too-clean",
    title: "孟德尔的 3:1 干净得像事先填好的答案，有人说这是造假，账本还没结",
    detail:
      "费希尔 1936 年用卡方检验指出：豌豆 F₂ 的分离比与 3:1 贴得过近，随机抽样不该这么听话——读起来就像园丁删掉了不合规矩的植株。这不是已经结案的科学骗局，而是一场仍在进行的科学史争论：有人主张无意识的分类边界，有人主张助手整理，也有人认为费希尔把孟德尔的计数单位设错了。多数遗传学史家的下限是：即使存在整理，颗粒遗传的结论站得住。看起来像伪造，更像理想化计数撞上了后来的显著性门槛。",
    source: 'Fisher, "Has Mendel\'s work been rediscovered?", Annals of Science 1 (1936): 115–137',
    subject: "life-science",
    tags: ["cross-domain", "孟德尔", "数据"],
    url: "/life-science/scientists/mendel",
  },
  {
    id: "photo-51-credit-not-a-heist",
    title: "Photo 51 在富兰克林不知情时被拿给沃森看，看起来像一场实验室盗窃集团",
    detail:
      "1953 年 1 月，威尔金斯把高斯林在富兰克林指导下拍的 B 型 DNA 底片给沃森看了——没有征得她同意。这件事常被写成「一伙人偷走了双螺旋」。同年《自然》把沃森–克里克的模型、威尔金斯组和富兰克林–高斯林的衍射分析印在同一期：数据没有被藏进保险柜，被改写的是后来的功劳叙事。这是信用政治、模糊的职务分工和当时的性别结构，不是一个盗窃分子结构的秘密社团。底片是真的，密谋是后加的。",
    source:
      "Franklin & Gosling, Nature 171 (1953): 740–741; Watson & Crick, Nature 171 (1953): 737–738",
    subject: "life-science",
    tags: ["cross-domain", "Photo 51", "科学信用"],
    url: "/life-science/scientists/franklin",
  },
  {
    id: "pangaea-fit-not-a-jigsaw-plot",
    title: "南美和非洲的海岸像被刀切开，看起来像有人按拼图裁过地球",
    detail:
      "打开地图，巴西凸起正好嵌进几内亚湾，像设计过的接口。把这读成「岸线是被人画的」，漏掉了拼图真正对齐的那一层。布拉德 1965 年用计算机拟合的是大陆坡——大约一千米等深线——而不是今天的沙滩：沙滩会被浪改，陆架外缘才更接近裂谷撕开时的岩石边界。吻合来自同一条破裂带被大西洋拉开，不是有人沿着国界下刀。现在的海岸线「太巧」，是因为你把侵蚀过的外衣当成了原切面。",
    source:
      "Bullard, Everett & Smith, Philosophical Transactions of the Royal Society A 258 (1965): 41–51",
    subject: "earth-science",
    tags: ["cross-domain", "泛大陆", "拼合"],
    url: "/earth-science/events/pangaea-breakup",
  },
  {
    id: "zero-india-and-maya",
    title: "印度和玛雅各自发明了零，看起来像同一份位值密电越过了大洋",
    detail:
      "婆罗摩笈多 628 年写出零的运算规则；玛雅长纪历用贝壳形占位符写二十进制的大数——两边都有「空位也是一种数」。把这读成一份失落的数字圣经，省掉了两件事：印度是十进制商用与天文算法，玛雅是与旧大陆隔绝的历法计数；符号、进位、用途都不一样。位值制一旦要写大数，占位符几乎会被独立摸到。看起来像走私，其实是同一类记账压力在两个房间里交出了零。",
    source:
      "Brahmagupta, Brāhmasphuṭasiddhānta (628); Ifrah, The Universal History of Numbers (1998)",
    subject: "human-history",
    tags: ["cross-domain", "零", "独立发明"],
    url: "/human-history/knowledge/美洲--玛雅文明",
  },
  {
    id: "hamming-codes-and-dna-repair",
    title: "汉明码和 DNA 校对都在用冗余抓错，看起来像基因组抄了贝尔实验室的图纸",
    detail:
      "汉明 1950 年给穿孔卡片加上校验位，让机器自己改一位错；细胞里的碱基选择、聚合酶校对和错配修复，把复制错误从约万分之一压到十亿分之一。有人把这写成同一张「纠错蓝图」。时间线和材料都不对：生命用的是化学校对和切除，工程用的是有限域上的码字间距；两边都发现——噪声信道上，与其把信噪比拉到无穷，不如加一点可检验的冗余。看起来像抄袭，其实是可靠传输的同一道算术。",
    source:
      "Hamming, Bell System Technical Journal 29 (1950): 147–160; Kunkel, Journal of Biological Chemistry (2004)",
    subject: "computer-science",
    tags: ["cross-domain", "纠错码", "DNA"],
    url: "/computer-science/theory/error-correcting-codes",
  },
  {
    id: "axelrod-tit-for-tat-not-invisible-hand",
    title: "以牙还牙赢了合作锦标赛，看起来像市场背后有一只互惠的看不见的手",
    detail:
      "阿克塞尔罗德 1980 年代的重复囚徒困境赛里，拉波波特那条「先合作、再模仿对方上一步」的策略屡次胜出，像是有人给所有博弈者发了同一份密约。斯密的看不见的手讲的是价格汇总分散信息，并不要求你记住邻居上次有没有出卖你。以牙还牙能稳住合作，靠的是重复相遇、可识别的报复与宽恕，不是拍卖场上的均衡价格。把锦标赛读成「市场早已串通」，是把两套协调装置焊成了一只阴谋。",
    source: "Axelrod, The Evolution of Cooperation (1984); Smith, The Wealth of Nations (1776)",
    subject: "economics",
    tags: ["cross-domain", "以牙还牙", "合作"],
    url: "/economics/theories/game-theory-basics",
  },
  {
    id: "antikythera-not-out-of-place",
    title: "安提基特拉青铜齿轮看起来像掉进公元前的蒸汽朋克，不像希腊人能造的东西",
    detail:
      "1901 年沉船里捞出的锈块，X 光下是三十多个啮合齿轮，用来推算日月与周期——常被写成「不属于那个时代的科技」。弗里斯等人 2006 年的重建把它钉回公元前二至一世纪的希腊天文计算器：差动、周期齿轮和历法周期都在希腊化时代的几何与手工艺射程内。它不是现代机械的直系祖先，也不是被藏起来的超文明遗物；被低估的是古代齿轮，不是时间线。",
    source:
      "Freeth et al., Nature 444 (2006): 587–591; de Solla Price, Gears from the Greeks (1974)",
    subject: "engineering",
    tags: ["cross-domain", "安提基特拉", "机械"],
    url: "/engineering/foundations/simple-machines",
  },
  {
    id: "goe-oxygen-not-pumped-in",
    title: "二十四亿年前氧气突然进了大气，看起来像有人给地球接上了充气管",
    detail:
      "太古宙几乎无氧，然后游离氧开始留下全球岩石签名：条带状铁建造、硫同位素异常消失。把这读成一次被安排的「充氧」，漏掉了几亿年的延迟——蓝藻更早就在产氧，但海洋里的亚铁、火山气体这些氧汇先把氧气吃光。大氧化是源终于压过汇，不是有人拧开阀门。阶段性脉冲和随后的冰期，是地球化学账本，不是施工日志。",
    source:
      "Holland, Philosophical Transactions of the Royal Society B 361 (2006): 903–915; Lyons, Reinhard & Planavsky, Nature 506 (2014): 307–315",
    subject: "earth-science",
    tags: ["cross-domain", "大氧化", "大气"],
    url: "/earth-science/events/great-oxidation-event",
  },
  {
    id: "writing-invented-in-several-rooms",
    title: "苏美尔、中国和中美洲各自出现文字，看起来像同一套秘密字母被分发了三次",
    detail:
      "盖尔布 1952 年主张文字只在两河发明一次，其余都是听说「有字这回事」之后的刺激传播——听起来像一份被藏起来的字母专利。当代主流是多源：美索不达米亚、中国、中美洲被公认为独立发明，中美洲隔着大洋，是最硬的那根钉子。早期材料几乎都是账本、贡物标签和占卜，不是文学圣书。看起来像统一散发的字母，其实是行政规模撑破口头记忆之后，各房间自己摸到的体外记账。",
    source: "Gelb, A Study of Writing (1952); Houston (ed.), The First Writing (Cambridge, 2004)",
    subject: "linguistics",
    tags: ["cross-domain", "文字起源", "独立发明"],
    url: "/linguistics/writing-systems/origin-of-writing",
  },
  {
    id: "lactase-persistence-convergent",
    title: "欧非牧民长大还能喝奶，看起来像一次乳糖突变被某个畜牧教团带走了",
    detail:
      "成年后仍表达乳糖酶，在欧洲和东非牧业人群里都极强——像一份「喝奶许可」沿着同一条血统走。蒂什科夫 2007 年证明非洲的调控突变与欧洲常见的 LCT-13910 不是同一个位点：表型收敛，基因型分道。选择压力是奶，不是一张护照。看起来像串通，其实是同一份热量在两套基因组上各奖了一次。",
    source:
      "Tishkoff et al., Nature Genetics 39 (2007): 31–40; Enattah et al., Nature Genetics 30 (2002): 233–237",
    subject: "anthropology",
    tags: ["cross-domain", "乳糖酶", "趋同进化"],
    url: "/life-science/knowledge-base/进化专题--驯化",
  },
  {
    id: "maxwells-demon-pays-to-forget",
    title: "麦克斯韦妖能把热分子分开，看起来像有人雇了一名违反热力学的门卫",
    detail:
      "麦克斯韦 1867 年设想一个小精灵只给快速分子开门，房间就会自发变冷——像第二定律被人在微观处做掉。齐拉 1929 年把测量写进账本，兰道尔 1961 年钉死：擦除一比特至少耗散 kT ln 2 的热。妖的记忆不是免费的抽屉；清掉磁带，热回到环境。看起来像作弊，其实是信息处理被证明是物理过程，账单在「忘记」那一步，不在「看见」那一步。",
    source:
      "Szilard, Zeitschrift für Physik 53 (1929); Landauer, IBM Journal of Research and Development 5 (1961): 183–191",
    subject: "physics",
    tags: ["cross-domain", "麦克斯韦妖", "信息"],
    url: "/universe-physics/knowledge-base/热力学--麦克斯韦妖",
  },
  {
    id: "hubble-tension-not-fake-data",
    title: "宇宙膨胀速度测出两个数，看起来像有一队人在改哈勃常数",
    detail:
      "普朗克从微波背景给出约 67 km/s/Mpc，造父变星和超新星梯子给出约 73，差距超过 5σ——省力读法是「某边的数据是假的」。两边用的是不同的尺子：早期宇宙的声视界，对上本地的亮度距离；系统误差、未知的早期物理，或两套标定里尚未抓到的偏差，都还在桌面上。张力是两次合法测量对不上，不是有人在改表格。先指定哪一套造假，再假装事先就知道，那是事后挑选。",
    source:
      "Riess et al., Astrophysical Journal Letters 934 (2022); Planck Collaboration, Astronomy & Astrophysics 641 (2020): A6",
    subject: "cosmology",
    tags: ["cross-domain", "哈勃张力", "测量"],
    url: "/cosmology/knowledge-base/宇宙学基础--哈勃张力",
  },
  {
    id: "regression-to-mean-not-miracle-cures",
    title: "最重的病人第二天总会好一点，看起来像神医专治绝症",
    detail:
      "高尔顿量身高就见过：极端父亲的儿子会向均值回落。卡尼曼与特沃斯基 1974 年用飞行教官当例子——表扬完美着陆之后往往变差，训斥粗糙着陆之后往往变好，于是惩罚显得「有效」。把这写成秘方或灵媒，是把回归均值当成了因果。任何筛选「最糟的一天」再干预的仪式都会看起来灵验，因为极端值本来就会往回走。看起来像奇迹，其实是抽样的几何。",
    source:
      "Tversky & Kahneman, Science 185 (1974): 1124–1131; Galton, Journal of the Anthropological Institute (1886)",
    subject: "psychology",
    tags: ["cross-domain", "回归均值", "因果"],
    url: "/psychology/experiments/tversky-kahneman-1974",
  },
  {
    id: "homeopathy-past-avogadro",
    title: "顺势疗法稀释到分子都不剩，看起来像水被教会了记忆，又像药厂在隐瞒",
    detail:
      "哈内曼的高倍稀释按阿伏伽德罗常数算，大约 12C 之后原溶质分子的期望数掉到零以下——支持者于是改口「结构记忆」，批评者有时被写成打压替代医学的密室。更干净的说法不需要羞辱病人：若机制与已知化学冲突，先验就极低；增大样本、压低偏倚之后，元分析里的效应量趋向于安慰剂。水的氢键寿命以皮秒计，带不走一张药方。看起来像被封存的奇迹，其实是稀释越过了计数的边界。",
    source:
      "Shang et al., The Lancet 366 (2005): 726–732; NHMRC, Evidence on the effectiveness of homeopathy (2015)",
    subject: "medicine",
    tags: ["cross-domain", "顺势疗法", "阿伏伽德罗"],
    url: "/medicine/traditions/homeopathy-evidence",
  },
  {
    id: "matthew-effect-not-a-credit-committee",
    title: "名家的署名总是更亮，看起来像科学界有一个分配功劳的密室",
    detail:
      "默顿 1968 年把《马太福音》那句「凡有的，还要加给他」写成科学奖励：已成名者在合作中分到不成比例的引用与资源，不知名的合作者被遮蔽。把这读成评奖委员会的串通，漏掉了机制——声誉带来设备、学生和注意力，产出再把声誉喂肥，正反馈自己会跑。斯蒂格勒定律讲的是名字贴错；马太效应讲的是信用会滚雪球。不需要密室，分配规则本身就会集中。",
    source: 'Merton, "The Matthew Effect in Science", Science 159 (1968): 56–63',
    subject: "sociology",
    tags: ["cross-domain", "马太效应", "科学奖励"],
    url: "/sociology/concepts/science-and-technology-studies",
  },
  {
    id: "echolocation-bats-and-toothed-whales",
    title: "蝙蝠和齿鲸各自「发明」了声纳，看起来像同一张水下图纸被送进了两个门",
    detail:
      "喉头脉冲对上耳蜗计时，海豚前额的「瓜」把声束塑形——相机眼之外，又一次像统一设计。解剖起源不同：蝙蝠用喉和耳，齿鲸用鼻道和头部脂肪透镜；分子上，听力相关蛋白如 prestin 出现过收敛的氨基酸替换。夜空和浑水提出同一道题：用回声代替光。看起来像串通，其实是趋同：零件可借老的，总装各做一次。",
    source:
      "Liu et al., Current Biology 20 (2010): R53–R54; Simmons et al., Nature 451 (2008): 818–821",
    subject: "life-science",
    tags: ["cross-domain", "回声定位", "趋同进化"],
    url: "/universe-physics/knowledge-base/经典物理--声学与多普勒效应",
  },
];
