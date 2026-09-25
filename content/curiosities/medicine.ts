import type { Curiosity } from "@/lib/curiosities";

export const MEDICINE_CURIOSITIES: Curiosity[] = [
  {
    id: "semmelweis-chlorine-called-mad",
    title: "让医生洗手的人，当时被当成疯子",
    detail:
      "1847 年维也纳总医院第一产科，塞麦尔维斯（Semmelweis）对照两间病房的月度死亡表：接触解剖台的手，与较少接触尸体的助产士之手，产褥热死亡率相差极大。他当时说的是「尸体微粒」，不是后来的细菌名；同行嘲笑机制，数字却已经掉了下来。被忽视的不是阴谋，是一张分母清楚、却不合主流理论的表。",
    source:
      "Semmelweis, Die Aetiologie, der Begriff und die Prophylaxis des Kindbettfiebers (1861)",
    tags: ["塞麦尔维斯", "产褥热", "洗手"],
    url: "/medicine/events/semmelweis-1847-chlorine",
  },
  {
    id: "landsteiner-blood-types-not-roulette",
    title: "有人的血清会把别人的血球粘成团——输血曾经是轮盘赌",
    detail:
      "1901 年兰德施泰纳（Landsteiner）在维也纳《临床周刊》写下一件尴尬的事实：一些人的血清，会把另一些人的血球凝成肉眼可见的团，却不凝自己的。他分成后来称为 A、B、C（今 O）的三组。输血会死人，往往不是刀不快，而是两个人的血彼此不能共处。",
    source:
      "Landsteiner, “Über Agglutinationserscheinungen normalen menschlichen Blutes”, Wiener klinische Wochenschrift (1901)",
    tags: ["血型", "输血", "兰德施泰纳"],
    url: "/medicine/events/landsteiner-1901-abo",
  },
  {
    id: "jenner-cowpox-looked-like-a-plot",
    title: "把牛身上的疱划进小孩胳膊，在 1796 年看起来像一场邪术",
    detail:
      "詹纳（Jenner）用挤奶女工手上的牛痘给 James Phipps 接种，再挑战天花，男孩没有发病。当时有人画漫画，怕人会长出牛头。后来的细菌论与免疫记忆把这件事从「怪术」改写成可重复的预防：先让身体见一面、记住，再等真正的入侵。看起来像密谋的，其实是一次对照过的观察。",
    source: "Jenner, An Inquiry into the Causes and Effects of the Variolae Vaccinae (1798)",
    tags: ["疫苗", "天花", "詹纳"],
    url: "/medicine/events/jenner-smallpox-vaccination",
  },
  {
    id: "placebo-pain-is-real",
    title: "没有药的药片也能止痛——但病不是装出来的",
    detail:
      "Beecher 1955 年把「强大的安慰剂」写进医学主流：期待、仪式和医患互动可以改变疼痛评分。后来的重估认为他高估了效应，但方向仍在——体验可被调节，不等于症状是假的，也不等于善意欺骗就合理。临床试验用它当对照；床边用它代替有效治疗，会透支信任。",
    source: "Beecher, “The Powerful Placebo”, JAMA (1955)",
    tags: ["安慰剂", "疼痛", "试验"],
    url: "/medicine/ethics/placebo-deception-and-trust",
  },
  {
    id: "framingham-risk-factor-from-a-town",
    title: "一个马萨诸塞小镇，把「血压高会要命」从印象写成了数字",
    detail:
      "1948 年起，弗雷明汉（Framingham）五千多名居民先被量血压、胆固醇和吸烟，再等心脏事件上门。队列不是把人随机分成吸烟组，却第一次把危险因素收成可计算的发病风险——「risk factor」这套话，很大程度上是从这条镇级随访里走出来的。",
    source:
      "Dawber, Meadors & Moore, “Epidemiological Approaches to Heart Disease: The Framingham Study”, American Journal of Public Health (1951)",
    tags: ["弗雷明汉", "危险因素", "心脏"],
    url: "/medicine/events/framingham-heart-study",
  },
  {
    id: "fleming-penicillin-contaminated-plate",
    title: "弗莱明休假回来，培养皿上多了一圈不该出现的空白",
    detail:
      "1928 年圣玛丽医院，金黄色葡萄球菌的皿上意外长出一团霉，周围细菌不再铺满。弗莱明（Fleming）没有把它只当成污染，1929 年把观察写进病理实验期刊。皿还不是药——提纯、量产和登陆日伤员是牛津与战时发酵的后史；但那圈清亮带，把「霉能挡住细菌」钉成了可核对的起点。",
    source:
      "Fleming, “On the Antibacterial Action of Cultures of a Penicillium”, British Journal of Experimental Pathology (1929)",
    tags: ["青霉素", "弗莱明", "抗生素"],
    url: "/medicine/events/fleming-1928-penicillin-plate",
  },
  {
    id: "salk-1954-polio-field-trial",
    title: "1954 年一场现场试验，让「每年夏天的小儿麻痹」变成可核对的保护",
    detail:
      "托马斯·弗朗西斯代表独立评估中心宣布：灭活脊髓灰质炎疫苗在麻痹型病例上显示出保护。现场里观察对照与安慰剂对照并存，家长签字，病例分级——规模大到像一场运动，读法却是试验。看起来像全民动员的「计划」，底下是一张能对上分母的表。",
    source:
      "Francis et al., “An Evaluation of the 1954 Poliomyelitis Vaccine Trials”, American Journal of Public Health (1955)",
    tags: ["脊髓灰质炎", "萨尔克", "疫苗试验"],
    url: "/medicine/events/salk-1954-polio-trial",
  },
  {
    id: "snow-broad-street-pump-not-miasma",
    title: "斯诺拆掉水泵把手那天，霍乱地图比瘴气理论更早指出元凶",
    detail:
      "1854 年伦敦苏荷，约翰·斯诺（John Snow）把死亡点画在宽街（Broad Street）周围，主张祸从那口井来，而不是空气里的臭气。主流仍信瘴气；他把把手拆掉，不是一场秘密行动，是一次用地理对照说话的流行病学。细菌要再等几十年才被看见，水先被看见了。",
    source: "Snow, On the Mode of Communication of Cholera, 2nd ed. (1855)",
    tags: ["霍乱", "斯诺", "流行病学"],
    url: "/medicine/events/snow-cholera-broad-street",
  },
  {
    id: "morton-ether-dome-no-humbug",
    title: "乙醚穹顶那天，沃伦说的是「这不是骗局」——因为前一年笑气当众失败过",
    detail:
      "1846 年 10 月 16 日，莫顿让病人吸入玻璃球里的乙醚，沃伦从颈部切下一个肿瘤，病人没有尖叫。那句话对着的是 1845 年韦尔斯用笑气拔牙、观众轰他 humbug 的现场。在那一天之前，外科意味着被绑在台上的剧痛；那一天之后，无痛手术第一次被当众核对。",
    source:
      "Bigelow, “Insensibility during Surgical Operations Produced by Inhalation”, Boston Medical and Surgical Journal 35 (1846)",
    tags: ["麻醉", "乙醚", "莫顿"],
    url: "/medicine/technologies/anesthesia",
  },
  {
    id: "rontgen-wifes-hand-is-a-shadow",
    title: "伦琴妻子看见的不是手，是手骨的轮廓和戒指的影子",
    detail:
      "1895 年 12 月 22 日，贝尔塔把手放在射线与底片之间，显影后出现的是骨骼与无名指上的戒指。X 光片不是身体表面的照片，是穿透后剩下的影子：骨头挡得多所以白，肺里的空气几乎不挡所以黑。据说她惊呼看见了自己的死亡——那是人类第一次看见活人体内的骨头。",
    source:
      "Röntgen, “Ueber eine neue Art von Strahlen”, Sitzungsberichte der Physikalisch-medicinischen Gesellschaft zu Würzburg (1895)",
    tags: ["X射线", "伦琴", "影像"],
    url: "/medicine/technologies/x-ray-imaging",
  },
  {
    id: "fantus-blood-bank-like-a-bank",
    title: "血库这个词是从银行借来的——血可以先存着，再按需要取",
    detail:
      "血一离开人体就会凝固，输血曾经必须「现抽现输」。1914–1915 年枸橼酸钠让血可以存放；1937 年芝加哥库克县医院的范特斯建立美国第一座真正意义上的血库，并创造了 blood bank 一词。后勤把「两个人必须同时在场」改写成可以调度的库存。",
    source:
      "Fantus, “The Therapy of the Cook County Hospital: Blood Preservation”, JAMA 109 (1937)",
    tags: ["血库", "输血", "储存"],
    url: "/medicine/technologies/blood-transfusion",
  },
  {
    id: "kariko-pseudouridine-quiet-paper",
    title: "后来赢来诺贝尔奖的那篇 mRNA 论文，当年几乎没有人转头看",
    detail:
      "卡里科与魏斯曼发现：把尿苷换成修饰过的假尿苷，能显著降低树突细胞对 RNA 的先天警觉，同时提高翻译。2005 年这篇印在《免疫》上的关键论文当时反响平平。COVID 疫苗的速度来自这条已经冷了多年的技术链，不是 2020 年才发明的「跳过试验」。",
    source:
      "Karikó, Buckstein, Ni & Weissman, “Suppression of RNA Recognition by Toll-like Receptors: The Impact of Nucleoside Modification and the Evolutionary Origin of RNA”, Immunity 23 (2005)",
    tags: ["mRNA", "卡里科", "疫苗"],
    url: "/medicine/technologies/mrna-vaccine",
  },
  {
    id: "lister-open-fracture-eleven-cases",
    title: "李斯特等了两年、收齐十一例开放性骨折，才把石炭酸写进《柳叶刀》",
    detail:
      "皮肤被骨端穿破，化脓几乎是预期。他用石炭酸处理敷料、器械与伤口，并把失败也写进同一组病例：九例未化脓而愈合，一例截肢，一例死于继发出血。改变外科的不是某一次「喷了消毒水」，是一组按病例公布结局的接触控制。",
    source:
      "Lister, “On a New Method of Treating Compound Fracture, Abscess, etc., with Observations on the Conditions of Suppuration”, The Lancet (1867)",
    tags: ["李斯特", "石炭酸", "抗菌"],
    url: "/medicine/technologies/antisepsis",
  },
  {
    id: "tonegawa-vdj-not-one-gene-each",
    title: "身体不是为每一种抗体准备一个基因——零件是随机拼出来的",
    detail:
      "适应性免疫要在见到入侵者之前，备好应对上亿种从未见过的抗原。利根川进证明：淋巴细胞发育时把分散的 V、D、J 片段随机拼接，再在接头处增删碱基。潜在组合可以到天文数字，体内同时存在的克隆大约十亿量级——够用的子集，不是人手一份说明书。",
    source: "Tonegawa, “Somatic generation of antibody diversity”, Nature 302 (1983)",
    tags: ["抗体", "基因重排", "免疫"],
    url: "/medicine/concepts/immune-system",
  },
  {
    id: "nightingale-coxcomb-not-just-lamp",
    title: "提灯女神更硬核的那只手，握的是死亡率图，不是油灯",
    detail:
      "克里米亚战场上，杀死英军的主要不是子弹，是肮脏的医院。南丁格尔用玫瑰图把「死于疾病远多于战伤」摊到当局眼前，1858 年成为英国皇家统计学会第一位女性会员。提灯画面是真的，也只是一半；把卫生写成可计算的制度，救的人要多得多。",
    source:
      "Nightingale, Notes on Matters Affecting the Health, Efficiency, and Hospital Administration of the British Army (1858)",
    tags: ["南丁格尔", "统计", "护理"],
    url: "/medicine/figures/florence-nightingale",
  },
  {
    id: "kolff-sausage-casing-seventeenth-patient",
    title: "香肠肠衣、橙汁罐头和洗衣机零件，第一次替一颗肾把血洗净",
    detail:
      "1945 年 9 月 11 日，科尔夫把拼凑的「人工肾」接到第十七位患者身上；前十六人几乎都没能靠机器活下来。透析持续十一个半小时后，陷入尿毒症昏迷的沙夫施塔特睁开了眼睛。透析不修肾，它只是按扩散和半透膜替肾清理血液——器官替代从此有了第一台能核对的装置。",
    source: "Kolff, New Ways of Treating Uraemia (J. & A. Churchill, 1947)",
    tags: ["透析", "科尔夫", "人工肾"],
    url: "/medicine/technologies/dialysis",
  },
];
