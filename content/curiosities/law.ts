import type { Curiosity } from "@/lib/curiosities";

export const LAW_CURIOSITIES: Curiosity[] = [
  {
    id: "carbolic-smoke-ball-ad",
    title: "一则报纸广告，被法院读成了对全世界的合同",
    detail:
      "1892 年石炭酸烟丸公司在报上悬赏：按说明用三个月仍流感，赔一百英镑，并声称已在银行存入一千英镑。Carlill 照做后生病，公司说那是吹嘘。上诉法院判她胜诉：带可核验存款的确定允诺，是对世要约；按说明使用就是承诺。不是「广告都是合同」，是那一千英镑把吹嘘钉成了意图。",
    source: "Carlill v Carbolic Smoke Ball Co [1893] 1 QB 256",
    tags: ["合同法", "要约"],
    url: "/law/judgment-analyses/carlill-v-carbolic-smoke-ball",
  },
  {
    id: "donoghue-snail-unproven",
    title: "姜汁啤酒里那只著名的蜗牛，法庭其实从未证明它存在过",
    detail:
      "1928 年苏格兰佩斯利的咖啡馆，友人给 May Donoghue 点的不透明瓶姜汁啤酒里，据说倒出一只腐烂蜗牛。她与制造商没有合同。上议院仍写出「邻人原则」，重画过失义务边界。判决假定诉状为真以回答法律问题——那只蜗牛是法律史上最成功的未质证生物之一。",
    source: "Donoghue v Stevenson [1932] AC 562",
    tags: ["侵权法", "注意义务"],
    url: "/law/judgment-analyses/donoghue-v-stevenson-duty-of-care",
  },
  {
    id: "marbury-lost-the-commission",
    title: "马伯里把委任状输了，最高法院却顺手拿走了违宪审查",
    detail:
      "马歇尔写了三问：权利有没有、救济有没有、本院能不能发执行令。前两问说有，第三问说 1789 年司法法第 13 条给本院加了宪法没有的原始管辖，因而无效。结果：驳回，Marbury 终身没拿到那张治安法官委任状；司法审查却在一次政治僵局里被确立。",
    source: "Marbury v. Madison, 5 U.S. (1 Cranch) 137 (1803)",
    tags: ["司法审查", "美国宪法"],
    url: "/law/judgment-analyses/marbury-v-madison-judicial-review",
  },
  {
    id: "mabo-not-terra-nullius",
    title: "澳大利亚普通法花了两个世纪，才承认这块大陆从来不是「无主地」",
    detail:
      "1992 年高等法院在 Mabo (No 2) 中承认梅尔人依习俗对墨累群岛的原生所有权，推翻 terra nullius。它没有自动把 1788 年以来的授予一笔勾销：承认的是可被消灭的原生所有权。原告 Eddie Mabo 在判决前五个月去世，没有看到终局。",
    source: "Mabo v Queensland (No 2) (1992) 175 CLR 1",
    tags: ["原生所有权", "普通法"],
    url: "/law/judgment-analyses/mabo-v-queensland-native-title",
  },
  {
    id: "handyside-lost-the-quote",
    title: "欧洲最常被引用的表达自由金句，出自一个输了的案子",
    detail:
      "英国没收了面向青少年的《小红书》，Handyside 告到欧洲人权法院。法院写下表达自由也保护「冒犯、震惊或打扰」的言论，同时又用「裁量余地」维持了英国的定罪——书仍被毁，申请人仍败诉。名言与结局朝相反方向走，这本身就是教材。",
    source: "Handyside v. United Kingdom, App. No. 5493/72 (ECHR, 1976)",
    tags: ["表达自由", "裁量余地"],
    url: "/law/judgment-analyses/handyside-v-uk-expression-margin",
  },
  {
    id: "brown-chose-topeka",
    title: "布朗案选中托皮卡，正因为那里的黑人学校硬件并不差",
    detail:
      "NAACP 要打的是「分离本身」，不是破旧校舍。1954 年最高法院把四州隔离案合并，承认第十四修正案史料「至多含糊」，于是把论证挪到教育在当代生活中的地位：隔离公立教育本身不平等。判决是二十年诉讼策略的收束，不是一夜良心发现。",
    source: "Brown v. Board of Education, 347 U.S. 483 (1954)",
    tags: ["平等保护", "教育"],
    url: "/law/judgment-analyses/brown-v-board-equal-protection",
  },
  {
    id: "van-gend-five-percent-tariff",
    title: "五个百分点的关税，让欧洲条约变成了个人可以在本国法院主张的权利",
    detail:
      "1960 年一家荷兰运输公司进口脲醛树脂，税率从 3% 被改到 8%。欧洲法院在 Van Gend en Loos 中说：共同体法构成新的法律秩序，个人可以直接援引足够清晰的条约条款。多数与会政府反对这个方向。直接效力被这一票树脂改写了。",
    source: "Van Gend en Loos, Case 26/62, ECLI:EU:C:1963:1",
    tags: ["欧盟法", "直接效力"],
    url: "/law/judgment-analyses/van-gend-en-loos-direct-effect",
  },
  {
    id: "contract-is-not-a-signature",
    title: "扫码骑走一辆共享单车，法律上已经是一份完整合同",
    detail:
      "合同的核心是合意，不是那张签了字的纸。口头买卖、投币售货、点击同意，都可以成立。Atiyah 提醒：契约自由大体是 1770–1870 年这一百年的产物，此后一直在给格式条款打补丁。纸面是证据，常常不是生命本身。",
    source: "Atiyah, The Rise and Fall of Freedom of Contract (1979)",
    tags: ["合同法", "合意"],
    url: "/law/private-law/contract-lifecycle",
  },
  {
    id: "feist-phone-book-no-copyright",
    title: "按字母排列的电话白页，美国最高法院说它没有版权",
    detail:
      "1991 年 Feist 诉乡村电话服务公司：版权要求最低限度的创造性，不是编纂者在采集事实上的「额头出汗」。汇编可以有版权，保护只及于选择与编排，不及于事实本身。杰斐逊 1813 年早就写过：从我这里取走一个想法，他得到了教益，我并未失去。",
    source: "Feist Publications v. Rural Telephone Service, 499 U.S. 340 (1991)",
    tags: ["著作权", "额头出汗"],
    url: "/law/private-law/intellectual-property",
  },
  {
    id: "loper-bright-buried-chevron",
    title: "鲱鱼观察员每天七百美元，把美国行政法最常被引用的先例掀翻了",
    detail:
      "2024 年 Loper Bright 推翻 1984 年的 Chevron：法院不能只因法规含混就把解释权让给行政机关。Chevron 当年其实是尊重一个正在放松监管的环保署，四十年间被联邦判决援引逾一万八千次。原告要赢的不是那 710 美元，是往后所有类似争议的裁判方法。",
    source:
      "Loper Bright Enterprises v. Raimondo, 603 U.S. 369 (2024); Chevron U.S.A. Inc. v. NRDC, 467 U.S. 837 (1984)",
    tags: ["行政法", "Chevron"],
    url: "/law/judgment-analyses/loper-bright-chevron-deference-overruled",
  },
  {
    id: "civil-code-outlasted-napoleon",
    title: "拿破仑觉得民法典比打赢的仗更持久——法官却被禁止「用一般规定立法」",
    detail:
      "1804 年《法国民法典》把平等、所有权和契约自由铸成可携带的私法秩序。起草者波塔利斯定调：立法者只写原则；法官不得以法律沉默为由拒绝裁判，也不得用一般性规定创制规则。差别不在「有没有法典」：普通法同样堆满制定法，大陆法同样有判例——默认找法之路不同。",
    source: "Portalis, Discours préliminaire (1801); Code civil des Français (1804)",
    tags: ["大陆法", "法典化"],
    url: "/law/legal-traditions/civil-vs-common-law",
  },
  {
    id: "palsgraf-fireworks-too-remote",
    title: "站台那头被秤砸中的帕尔斯格拉夫夫人，法院说伤害「太远了」",
    detail:
      "1928 年，铁路员工扶一名赶车乘客上车，碰落包裹，烟花爆炸，震倒另一端的秤。卡多佐多数意见判铁路无责：对她的伤害超出了过失所创造的那类风险。责任不是对世界上一切后果买单，而是对你有义务去防的那一类风险买单。",
    source: "Palsgraf v. Long Island Railroad Co., 248 N.Y. 339 (1928)",
    tags: ["因果关系", "过失"],
    url: "/law/private-law/tort-and-liability",
  },
  {
    id: "collins-math-witchcraft",
    title: "检方用一千二百万分之一的连乘给陪审团算概率，加州最高法院叫它「数学的巫术」",
    detail:
      "1968 年 People v. Collins：检方请数学教授把目击特征的「独立概率」连乘，论证一对情侣纯属巧合的概率极低。上诉法院推翻：连乘既无独立性依据，也把法庭变成了算术秀。证明标准不是百分比换算，是一条关于「这类案子错得起多少」的规范指令。",
    source: "People v. Collins, 68 Cal. 2d 319 (1968)",
    tags: ["证据", "检察官谬误"],
    url: "/law/criminal-and-procedure/evidence-and-proof",
  },
  {
    id: "lochner-invented-contract-freedom",
    title: "面包师每周六十小时上限被判违宪——那项「契约自由」宪法里根本没有",
    detail:
      "1905 年 Lochner 从第十四修正案的正当程序里读出订立劳动契约的权利，此后三十多年最低工资、童工限制、工时上限一批批被推翻。1937 年法院转向，「洛克纳式」今天几乎是所有立场用来骂对手的词。各方都同意它错了，对它错在哪里却给出相反答案。",
    source: "Lochner v. New York, 198 U.S. 45 (1905)",
    tags: ["契约自由", "正当程序"],
    url: "/law/public-law/lochner-era-freedom-of-contract",
  },
  {
    id: "plessy-was-a-test-case",
    title: "普莱西几乎是白人外表的鞋匠，那场「违法」是委员会事先排好的测试诉讼",
    detail:
      "1892 年公民委员会选中八分之七白人血统的 Homer Plessy，持头等票坐进白人车厢后按安排被捕，要把隔离车厢法送进最高法院。1896 年七比一维持「分离但平等」；唯一异议者哈伦十三年前也是民权法案被推翻时的唯一异议。布朗案还要再等五十八年。",
    source: "Plessy v. Ferguson, 163 U.S. 537 (1896)",
    tags: ["隔离", "平等保护"],
    url: "/law/public-law/separate-but-equal",
  },
  {
    id: "dodge-ford-was-closed-company",
    title: "「公司必须为股东利润而存在」那句口头禅，来自一起封闭公司的分红官司",
    detail:
      "1919 年密歇根州 Dodge v. Ford：亨利·福特压低股息、宣称要让公众买到更便宜的车，道奇兄弟作为少数股东要求分红。法院保护的是这笔具体盈余分配，不是给所有公众公司写下不可修改的目的条款。把压迫案件写成上市集团的世界观，标本用错了地方。",
    source: "Dodge v. Ford Motor Co., 170 N.W. 668 (Mich. 1919)",
    tags: ["公司法", "信义义务"],
    url: "/law/private-law/fiduciary-duty-and-corporate-control",
  },
];
