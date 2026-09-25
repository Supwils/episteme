import type { Curiosity } from "@/lib/curiosities";

export const LINGUISTICS_CURIOSITIES: Curiosity[] = [
  {
    id: "wug-test-invented-grammar",
    title: "孩子们会对一只从没见过的「wug」自动加复数",
    detail:
      "1958 年，Jean Berko 给学前儿童看一只虚构小兽，说 “This is a wug”，再出示两只问现在有什么。孩子们说 wugs——这个词他们不可能背过，说明语法不是一张单词表，而是可以推广的规则。更妙的是：大人会被不规则词族带跑（把 gling 说成 glang），小孩反而更守规则。",
    source: "Berko, “The Child’s Learning of English Morphology,” Word (1958)",
    tags: ["儿童语言", "形态学"],
    url: "/linguistics/acquisition-and-mind/wug-test-morphology-analysis",
  },
  {
    id: "infant-vot-adults-miss",
    title: "一两个月大的婴儿，能听见成人已经听不见的语音差别",
    detail:
      "1971 年 Eimas 等人发现，婴儿对跨越英语 /ba/–/pa/ 边界的嗓音起始时间变化会恢复吮吸，对边界内同样大小的变化却不怎么理睬。后来 Werker 与 Tees 证明：对非母语对立的敏感性会在第一年里收窄——不是耳朵坏了，是经验把侦测资源集中到母语用得上的切割点。",
    source:
      "Eimas, Siqueland, Jusczyk & Vigorito, Science (1971); Werker & Tees, Infant Behavior and Development (1984)",
    tags: ["婴儿", "范畴知觉", "语音"],
    url: "/linguistics/acquisition-and-mind/infant-categorical-perception",
  },
  {
    id: "linear-b-was-accounting",
    title: "线性文字 B 看起来像密码，释读出来却是一份宫殿仓库清单",
    detail:
      "克诺索斯泥板上那套「神秘符号」被当成失落文明的密文传了半个世纪。1952 年 Ventris 把它读成希腊语音节文字，内容几乎全是橄榄油、牲畜和人名——不是咒语，是账房。Alice Kober 事先用词尾三连变化证明它有屈折：没有罗塞塔石碑，内部结构也能做科学。",
    source: "Ventris & Chadwick, Journal of Hellenic Studies (1953)",
    tags: ["文字释读", "线性文字B"],
    url: "/linguistics/writing-systems/script-decipherment",
  },
  {
    id: "whorf-overclaimed-time",
    title: "「霍皮人没有时间概念」——沃尔夫说得过了，语料后来打脸",
    detail:
      "防火工程师出身的业余语言学家沃尔夫主张，霍皮语缺少直接指称时间的语法，因此其使用者活在另一种时间里。Malotki 1983 年基于大量霍皮语料指出：这门语言有丰富的时间语法与词汇。语言会影响注意，但不给世界观签发「无法思想」的禁令。",
    source: "Malotki, Hopi Time (1983); Whorf, Language, Thought, and Reality (1956)",
    tags: ["语言相对论", "沃尔夫"],
    url: "/linguistics/acquisition-and-mind/language-thought-debate",
  },
  {
    id: "grice-what-you-didnt-say",
    title: "「一些学生通过了」——你听见的重点，往往是他没说的那半句",
    detail:
      "逻辑上「一些」兼容「全部」，可你几乎总会听成「一些但不是全部」。格赖斯把这层「没说出口的意思」写成会话含义：合作的说话人本该说更强的词，他没说，你就反推更强的不成立。实验后来发现，儿童反而比成人更「逻辑」——他们更愿意接受那句字面上为真、信息量却不够的话。",
    source: "Grice, “Logic and Conversation” (1975); Noveck, Cognition (2001)",
    tags: ["语用学", "会话含义"],
    url: "/linguistics/methods-and-frontiers/experimental-pragmatics",
  },
  {
    id: "writing-younger-than-speech",
    title: "人类说话至少比写字老十倍，文字一开始也不是为了写诗",
    detail:
      "已知最早成体系文字出现在约五千二百年前的乌鲁克账房：谷物入库、牲畜清点。口语即使按最保守估计也要再往前一个数量级。文学是副产品；文字首先是一项行政技术。",
    source: "Schmandt-Besserat, Before Writing (1992)",
    tags: ["文字起源", "口语"],
    url: "/linguistics/writing-systems/origin-of-writing",
  },
  {
    id: "vot-english-b-not-voiced",
    title: "英语的「浊音 /b/」，声学上常常根本不浊",
    detail:
      "Lisker 与 Abramson 1964 年比较十一种语言的词首塞音，发现清浊不是世界共用的开关：有的语言切负值与短正值，有的切短正值与长送气，泰语三者都用。英语词首的 /b d g/ 经常落在短正值——教科书漫画里「声带一开始就振」的 /b/，在英语里经常是个误会。",
    source: "Lisker & Abramson, “A Cross-Language Study of Voicing in Initial Stops,” Word (1964)",
    tags: ["嗓音起始时间", "语音学"],
    url: "/linguistics/sounds-and-signs/voice-onset-time",
  },
  {
    id: "eskimo-snow-words-hoax",
    title: "「爱斯基摩人有一百个雪词」是一场被引用链吹大的学术都市传说",
    detail:
      "博厄斯 1911 年随手举了四个词根，沃尔夫转述时数字开始发胀，到 1980 年代媒体已经报到一百、两百甚至四百——没有一次增长带来新语料。Martin 追回整条引用链，Pullum 把它命名为「伟大的爱斯基摩词汇骗局」。在多式综合语里，「数词」这件事本身就问错了。",
    source:
      "Martin, American Anthropologist (1986); Pullum, The Great Eskimo Vocabulary Hoax (1991)",
    tags: ["语言相对论", "学术传言"],
    url: "/linguistics/history-typology-society/eskimo-snow-words-hoax",
  },
  {
    id: "volapuk-proved-conlangs-can-live",
    title: "第一次「世界语热潮」不是世界语，是词根几乎认不出来的沃拉匹克",
    detail:
      "1879 至 1880 年，巴登神父施莱尔发布沃拉匹克。到八十年代末有两百多个社团、三届国际大会，1889 年巴黎大会全程用这门人造语开会——随后因语法过难、作者拒绝改革而崩盘。它证明人造语言可以聚集真实的跨国共同体；腾出的位置，很快被柴门霍夫 1887 年的《第一书》接走。",
    source: "Large, The Artificial Language Movement (1985); Zamenhof, Unua Libro (1887)",
    tags: ["人工语言", "世界语", "语言规划"],
    url: "/linguistics/history-typology-society/constructed-languages",
  },
  {
    id: "contact-happens-inside-bilinguals",
    title: "语言不会在空中对撞——接触发生在双语者的脑子里",
    detail:
      "Weinreich 1953 年把「干扰」写成两套系统在同一个人头脑里互相施压，而不是谱系树的枝条相撞。Haugen 1950 年证明借词会被本地音系和词法重新分析，不是原样搬运。Haspelmath 与 Tadmor 后来用约 41 种语言、1460 个义项画出借用层级：文化词好借，代词和低位数词难借。",
    source:
      "Haugen, Language (1950); Weinreich, Languages in Contact (1953); Haspelmath & Tadmor, Loanwords in the World's Languages (2009)",
    tags: ["语言接触", "借词"],
    url: "/linguistics/history-typology-society/language-contact",
  },
  {
    id: "austin-saying-is-doing",
    title: "「我愿意」不是在报告内心，是在当场把婚姻做出来",
    detail:
      "奥斯汀 1955 年在哈佛讲「如何以言行事」：有的句子不是描述世界，而是改变权利与义务——命名、承诺、裁决、道歉。塞尔后来把成功条件写成可检查的清单：权限、程序、可识别意图。形式在问「你能把盐递来吗」，听者通常当指令收——字面能力测验当场失效。",
    source: "Austin, How to Do Things with Words (1962); Searle, Speech Acts (1969)",
    tags: ["言语行为", "语用学"],
    url: "/linguistics/words-sentences-meaning/pragmatics",
  },
  {
    id: "peterson-barney-vowels-overlap",
    title: "元音的「身份证」其实对不上号：不同人的 /i/ 会落进别人的 /e/",
    detail:
      "1952 年 Peterson 与 Barney 让 76 名男女和儿童念十个 /hVd/ 音节，把第一、第二共振峰画成后来到处转载的元音空间图。同一张图已经显示：不同说话人的同一元音，可以落在别人另一个元音的区域内——听者几乎总能听出对方打算发哪个。F1、F2 是有用的描述，不是充分的身份证件。",
    source: "Peterson & Barney, Journal of the Acoustical Society of America (1952)",
    tags: ["共振峰", "元音", "声学"],
    url: "/linguistics/sounds-and-signs/acoustic-phonetics",
  },
  {
    id: "hawaiian-school-ban-ninety-years",
    title: "夏威夷语在学校被禁了九十年；解禁靠的不是语言学家，是学前班游说",
    detail:
      "1896 年法律规定英语为所有公私立学校的教学媒介，说夏威夷语的儿童会受罚，禁令延续约九十年。语言巢组织 1983 年成立、1984 年办第一所学校时禁令仍在，游说三年才促成 1986 年解禁。复振的起点是社群自己的政治组织，不是外部专家的建议。",
    source: "Wilson & Kamanā, in Hinton & Hale, The Green Book of Language Revitalization (2001)",
    tags: ["濒危语言", "复振", "夏威夷语"],
    url: "/linguistics/history-typology-society/endangered-language-revitalization",
  },
  {
    id: "labov-fourth-floor",
    title: "纽约三家百货公司的「四楼」，把 /r/ 的社会分层测成了便宜实验",
    detail:
      "Labov 走进高档 Saks、中档 Macy's、低价 S. Klein，假装问路套出 fourth floor——一句话里两次词尾 /r/，再假装没听清要对方重复。264 名店员里，至少发一次 /r/ 的比例：Saks 62%，Macy's 51%，S. Klein 20%；每一家内部，仔细重复时 /r/ 都比第一次多。口音不是随便，是可按档次和语体预测的结构。",
    source: "Labov, The Social Stratification of English in New York City (1966)",
    tags: ["拉波夫", "社会分层", "变异"],
    url: "/linguistics/history-typology-society/sociolinguistic-variation",
  },
  {
    id: "stokoe-asl-is-a-language",
    title: "美国手语被当成「英语搬到手上」，直到有人把它拆成位置、手形和运动",
    detail:
      "1960 年 William Stokoe 发表《手语结构》，证明美国手语词项有离散对立，可以按语言学标准分析——不是传情的手势编码。美国手语与英国手语语法不同，反而与法国手语有重要历史联系：国界和口语谱系，对不上手语谱系。",
    source: "Stokoe, Sign Language Structure (1960)",
    tags: ["手语", "斯托科"],
    url: "/linguistics/sounds-and-signs/sign-language-structure",
  },
  {
    id: "no-primitive-languages",
    title: "「原始民族语言简单」是十九世纪最好的科学之一——也是彻底错的",
    detail:
      "施莱赫尔 1863 年把孤立—黏着—屈折读成进化阶梯；传教士词表短，就被当成抽象能力缺失。博厄斯 1911 年要求每门语言用自己的范畴来描述；萨丕尔 1921 年一句收束：就语言形式而言，柏拉图与马其顿的猪倌同行。儿童习得母语的时间表在各类型里找不到系统差异——若真有更「简单」的语言，那里的孩子理应学得更快。",
    source: "Boas, Handbook of American Indian Languages (1911); Sapir, Language (1921)",
    tags: ["语言复杂度", "博厄斯"],
    url: "/linguistics/history-typology-society/primitive-languages-myth",
  },
];
