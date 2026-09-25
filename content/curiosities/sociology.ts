import type { Curiosity } from "@/lib/curiosities";

export const SOCIOLOGY_CURIOSITIES: Curiosity[] = [
  {
    id: "pager-criminal-record-callback",
    title: "两份几乎相同的简历，只多一个「有前科」勾选框，回调率直接腰斩",
    detail:
      "2001 年，Devah Pager 让四名大学生在密尔沃基轮流递出配对简历。白人无案底回调约 34%，有案底约 17%；黑人无案底约 14%，有案底约 5%。更刺耳的一句：有案底的白人，回调仍高于无案底的黑人。测的是雇佣漏斗第一道筛，不是「能不能得到这份工作」的全部。",
    source: "Pager, “The Mark of a Criminal Record,” American Journal of Sociology (2003)",
    tags: ["就业", "歧视", "审计研究"],
    url: "/sociology/methods/pager-criminal-record-audit",
  },
  {
    id: "coleman-report-school-surprise",
    title: "1966 年美国最大的教育调查，最让人意外的不是「学校很重要」",
    detail:
      "Coleman Report 覆盖约 57 万名学生。控制家庭背景之后，许多易测的学校资源与成绩关联相对有限；同伴构成的联系却更稳。媒体把它压成「学校不重要」——原报告其实是民权法委托的机会审计；几乎人人都在上学时，校际差本来就不好测。",
    source: "Coleman et al., Equality of Educational Opportunity (1966)",
    tags: ["教育", "机会平等"],
    url: "/sociology/methods/coleman-report-educational-opportunity-analysis",
  },
  {
    id: "movements-not-just-anger",
    title: "不满几乎到处都有，社会运动却很稀少——愤怒解释不了上街",
    detail:
      "1960 年代的美国黑人不比 1930 年代更受压迫，民权运动却发生在 1960 年代。McAdam 把兴起写成政治机会、内生组织与「这不公且可改变」的认知解放叠在一起。少一截，怒气可以很大，名单仍然很短。",
    source: "McAdam, Political Process and the Development of Black Insurgency, 1930–1970 (1982)",
    tags: ["社会运动", "政治过程"],
    url: "/sociology/concepts/social-movements",
  },
  {
    id: "intersectionality-not-scorecard",
    title: "「交叉性」不是身份积分表，它是被三桩败诉逼出来的法律漏洞",
    detail:
      "Crenshaw 指出：反歧视法一次只认一个维度，黑人女性会从保护里整块掉出去——公司雇了白人女性、也雇了黑人男性，拆开看两条诉因都不成立。交叉位置上的伤害不等于劣势相加，单维框架会让它变得不可见。",
    source:
      "Crenshaw, “Demarginalizing the Intersection of Race and Sex,” University of Chicago Legal Forum (1989)",
    tags: ["交叉性", "不平等"],
    url: "/sociology/concepts/intersectionality",
  },
  {
    id: "weak-ties-get-jobs",
    title: "帮你找到下一份工作的，常常不是好友，而是不怎么联系的熟人",
    detail:
      "Granovetter 访谈波士顿郊区求职者：经私人关系入职的人里，经常见面的只占约 17%，偶尔或很少来往的占大多数。亲密圈子信息高度重叠；弱关系才是通往另一个圈子的桥。这篇后来被引到爆的论文，当年还曾被《美国社会学评论》退稿。",
    source: "Granovetter, “The Strength of Weak Ties,” American Journal of Sociology (1973)",
    tags: ["弱关系", "求职", "社会网络"],
    url: "/sociology/thinkers/mark-granovetter",
  },
  {
    id: "freedom-summer-who-could-go",
    title: "1964 年南下密西西比的大学生，并不是「最愤怒的那批人」",
    detail:
      "McAdam 核对自由之夏的申请表与追踪：去成的人，是被组织接住、且那个夏天生活结构允许离开的人。传记可用性比情绪强度更能预测谁出现在名单上。机会不是天气，是可被核对的制度松动。",
    source: "McAdam, Freedom Summer (1988)",
    tags: ["民权运动", "政治过程"],
    url: "/sociology/methods/freedom-summer-political-process-analysis",
  },
  {
    id: "emotional-labor-purchased-smile",
    title: "航空公司买下的不是微笑，是你真的感到热情",
    detail:
      "Hochschild 在达美航空培训中心看到：空乘被要求把乘客想成客厅客人——不是装出来，是调用记忆让感受真正升起。她把这称为情感劳动：感受规则被付酬、被考核。对照组是催收员，岗位要求正好相反：把同情压下去。",
    source: "Hochschild, The Managed Heart (1983)",
    tags: ["情感劳动", "工作"],
    url: "/sociology/concepts/emotions-and-emotional-labor",
  },
  {
    id: "bystander-not-callous",
    title: "「旁观者效应」不是人心冷漠，更像是责任被稀释、现场被看错",
    detail:
      "Darley 与 Latané 的实验表明：在场的人越多，任何一个人出手越慢——机制是责任分散，以及大家都在看别人脸色、误以为「没事」（多元无知）。后来的元分析还发现：真正危险、需要动手的紧急情况里，这个效应反而更弱。冷漠叙事太省事，现场判断才是问题。",
    source:
      "Darley & Latané, Journal of Personality and Social Psychology (1968); Fischer et al., Psychological Bulletin (2011)",
    tags: ["旁观者", "集体行为"],
  },
  {
    id: "merton-trained-incapacity",
    title: "窗口卡住你的材料，不一定是刁难——可能是「训练有素的无能」",
    detail:
      "Merton 1940 年指出：组织反复奖励守规，人就会把守规本身当成美德，手段置换成目的。韦伯的理想型本是可预测、可追溯；铁笼效应是规则越成功，人越不判断规则是否仍服务目的。好官僚制不是取消表格，是让规则可解释、可复核、可纠错。",
    source: "Merton, “Bureaucratic Structure and Personality,” Social Forces (1940)",
    tags: ["官僚制", "目标置换"],
    url: "/sociology/institutions/bureaucracy",
  },
  {
    id: "collins-credential-inflation",
    title: "文凭通胀像货币：发得越多，单张能换到的职位越少",
    detail:
      "Collins 1979 年引用的美国雇主调查：1930 年代约 12% 的雇主要求经理持有大学学位，1960 年代末升到约 40%。技术需求并不是推高门槛的主因——多数职业技能在岗位上习得。Spence 证明：即使教育完全不提高技能，只要获取文凭对高能力者更便宜，雇主仍会按学历付薪。",
    source: "Collins, The Credential Society (1979); Spence, Quarterly Journal of Economics (1973)",
    tags: ["文凭主义", "地位竞争"],
    url: "/sociology/institutions/education-and-credentialism",
  },
  {
    id: "geertz-wink-not-twitch",
    title: "两个男孩同时眨右眼，照片分不出抽搐和暗号",
    detail:
      "Ryle 的例子被 Geertz 1973 年写进《文化的解释》：一个是抽搐，一个是故意对着某人、传递特定消息、还不想被旁人察觉的暗号。民族志的对象不是眼皮运动，而是这套可分层的公共代码。马林诺夫斯基要求住进村子、学当地语言——田野标准从「去过」变成「长期在场」。",
    source:
      "Geertz, The Interpretation of Cultures (1973); Malinowski, Argonauts of the Western Pacific (1922)",
    tags: ["厚描", "民族志"],
    url: "/sociology/methods/ethnography",
  },
  {
    id: "dimaggio-powell-isomorphism",
    title: "组织越来越像，常常不是竞争淘汰了弱者，是大家都在抄合法作业",
    detail:
      "DiMaggio 与 Powell 1983 年问：为什么大学、医院和公司突然都有了相似的战略部门？强制（法律与拨款）、模仿（不确定时复制同侪）、规范（专业证书带着同一套模板上岗）三条机制，让场域里的结构扩散可以快过效果证据。看起来像效率，执行的是谁有权定义合格。",
    source: "DiMaggio & Powell, “The Iron Cage Revisited,” American Sociological Review (1983)",
    tags: ["制度同构", "组织"],
    url: "/sociology/concepts/organizational-sociology",
  },
  {
    id: "goffman-front-stage-kitchen",
    title: "服务员在餐厅微笑、在厨房吐槽——戈夫曼说这不是虚伪，是互动秩序",
    detail:
      "《日常生活中的自我呈现》把前台写成布景、外表和举止必须对齐的表演区，后台才是可以放松、准备和抱怨的地方。1956 年先在爱丁堡胶印刊行，1959 年才普及。多数互动需要印象管理：若所有后台信息都暴露，情境反而会崩。自我不是完全内在的实体，是在当面被组织和承认的表现。",
    source: "Goffman, The Presentation of Self in Everyday Life (1959)",
    tags: ["拟剧论", "互动秩序"],
    url: "/sociology/thinkers/erving-goffman",
  },
  {
    id: "dubois-philadelphia-not-character",
    title: "杜波依斯把「黑人问题」从品德鉴定改写成一张街区地图",
    detail:
      "1896 年他搬进费城第七区做逐户调查：家庭、职业、住房、犯罪，不是从道德偏见出发解释贫困。1899 年的《费城黑人》用地图和职业表说明，机会结构与制度歧视才是关键。四年后《黑人的灵魂》把双重意识写成：被迫同时用自己的眼睛和支配者的眼睛看自己。",
    source: "Du Bois, The Philadelphia Negro (1899); The Souls of Black Folk (1903)",
    tags: ["杜波依斯", "双重意识"],
    url: "/sociology/thinkers/w-e-b-du-bois",
  },
  {
    id: "bourdieu-habitus-in-the-body",
    title: "品味看起来像天分，布迪厄说那是历史进了身体",
    detail:
      "惯习是持久而可迁移的性情：怎样说话、怎样觉得某间博物馆「自然属于我」、怎样还没进门就已经羞耻。学校奖励的不只是知识，还有家庭早已传好的语言、姿态和对制度的熟悉感。努力仍然存在；他追问的是，为什么同样的努力在不同人身上回报不同。",
    source:
      "Bourdieu, Distinction (1979); Bourdieu & Passeron, Reproduction in Education, Society and Culture (1970)",
    tags: ["惯习", "文化资本"],
    url: "/sociology/thinkers/pierre-bourdieu",
  },
  {
    id: "durkheim-suicide-is-a-rate",
    title: "涂尔干把自杀从私人绝望里拖出来，写成可比较的社会率",
    detail:
      "1897 年的《自杀论》比较教派、婚姻和战时：新教徒率通常高于天主教徒，战时率下降——个人痛苦解释不了稳定的群体差。他把社会整合与规范调节写成两个轴，过松或过紧都会抬高率。自杀仍是一个人的行动；比率是社会事实。",
    source: "Durkheim, Le Suicide (1897)",
    tags: ["自杀", "社会事实"],
    url: "/sociology/thinkers/emile-durkheim",
  },
];
