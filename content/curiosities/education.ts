import type { Curiosity } from "@/lib/curiosities";

export const EDUCATION_CURIOSITIES: Curiosity[] = [
  {
    id: "star-small-class-not-aide",
    title: "田纳西把班额做成随机试验：小班有效，加一名助教却几乎不是一回事",
    detail:
      "1985 年起的 STAR 在校内同时开出 13–17 人小班、普通班、普通班加助教。小班在阅读和数学上大约高出 0.15–0.32 个标准差；加助教的优势弱得多。它比较的是三种班额装置，不是「全州缩班」，也不是「多一个大人就等于小班」。",
    source:
      "Mosteller, The Future of Children (1995); Krueger, Quarterly Journal of Economics (1999)",
    tags: ["班额", "随机试验"],
    url: "/education/cognition-and-memory/project-star-class-size",
  },
  {
    id: "perry-iq-faded-adult-table",
    title: "123 个孩子的学前随机试验，智商回落后，成年表上仍留下痕迹",
    detail:
      "佩里学前项目组约两年、每天两个半小时，外加家访。智商优势在小学淡出，但到 40 岁仍能在教育、就业与犯罪等结局上看到差异。Heckman 等人把社会回报率重估到大约 7–10%——比宣传口号低，却不是零。样本很小，协议有过妥协，方向与精度是两句话。",
    source:
      "Schweinhart et al., Lifetime Effects (2005); Heckman et al., Journal of Public Economics (2010)",
    tags: ["学前教育", "纵向研究"],
    url: "/education/learning-foundations/perry-preschool-study",
  },
  {
    id: "desirable-difficulty-hurts-now",
    title: "当时觉得更难、分数更差，有时恰恰说明你正在学会",
    detail:
      "Bjork 把间隔、变化条件、提取练习称为必要难度：练习时的线索不完全等于测验时的线索，当时表现会变差，延迟成绩却可能更好。关键是「必要」——过载、含混、语言不通都只是失败，不是美德。表现不是学习。",
    source: "Bjork, in Metcalfe & Shimamura, Metacognition (1994)",
    tags: ["必要难度", "记忆"],
    url: "/education/cognition-and-memory/desirable-difficulty-is-a-condition",
  },
  {
    id: "pisa-is-not-civilization",
    title: "PISA 排行榜测的是抽样与量表，不是哪国更文明",
    detail:
      "2000 年起 OECD 抽测约十五岁在校生的阅读、数学与科学应用素养。数字是测量产物；「某国文明更高等」不是。排除率、语言版本、学制和补习市场都会移动均值。排名可以当镜子，也可以当国内改革已经写好的棍子。",
    source: "OECD, PISA 2000 Technical Report (2002)",
    tags: ["PISA", "比较教育"],
    url: "/education/comparison-and-policy/pisa-is-not-civilization",
  },
  {
    id: "spacing-beats-cramming",
    title: "艾宾浩斯用自己当被试画出遗忘曲线；后来的教训是：分开复习，通常优于一次塞满",
    detail:
      "1885 年他用无意义音节记录「节省法」。表面想不起来的材料，仍可能让再学习变快。Cepeda、Pashler 等人的综述确认间隔效应：同等时间拆开，通常比集中练习更耐久。当时更熟，只是即时表现。",
    source: "Ebbinghaus, Über das Gedächtnis (1885); Cepeda et al., Psychological Bulletin (2006)",
    tags: ["间隔效应", "记忆"],
    url: "/education/cognition-and-memory/memory-spacing-and-transfer",
  },
  {
    id: "homework-allocates-evening",
    title: "家庭作业分配的不是练习量，是谁家里还有可被占用的晚上",
    detail:
      "Cooper 的综述显示作业与成绩的相关随年级变化，且几乎总把「作业」当成同一种东西。十分钟提取、家长代劳的手抄、为明天考试预演，被平均成一个效应量。题目可以相同，安静房间、带宽和能读题的成人并不相同。",
    source: "Cooper, Robinson & Patall, Review of Educational Research (2006)",
    tags: ["作业", "家庭时间"],
    url: "/education/learning-foundations/homework-allocates-family-time",
  },
  {
    id: "worked-examples-before-struggle",
    title: "对新手，看懂已解样例往往比过早自己硬做更有效",
    detail:
      "Sweller 与 Cooper 报告样例效应：窗口有限时，同时搜索解法会把工作记忆挤爆。样例把合法步骤外化。Chi 等人补了一刀：成功的学习者会在缺口处说出「为什么这一步合法」——复述步骤不是解释。等你成了熟手，完整样例反而可能变成干扰。",
    source:
      "Sweller & Cooper, Cognition and Instruction (1985); Chi et al., Cognitive Science (1989)",
    tags: ["样例", "认知负荷"],
    url: "/education/cognition-and-memory/worked-examples-and-self-explanation",
  },
  {
    id: "learning-styles-lack-evidence",
    title: "「视觉型 / 听觉型」学习风格，至今几乎拿不出合格的匹配证据",
    detail:
      "若某种风格处方成立，就必须证明按风格匹配材料优于不匹配。Pashler、McDaniel、Rohrer 与 Bjork 评估文献：当时合格证据几乎没有。偏好可以被尊重，不能当成脑区说明书。失败更常是条件没安排好，不是类型没贴对。",
    source:
      "Pashler, McDaniel, Rohrer & Bjork, Psychological Science in the Public Interest (2008)",
    tags: ["学习风格", "教学"],
    url: "/education/learning-foundations/teaching-is-not-pouring",
  },
  {
    id: "generative-models-break-homework-evidence",
    title: "生成式模型最先崩掉的，不是「会不会作弊」，是作业还能不能当证据",
    detail:
      "许多家庭作业的前提是：学生在无人协助下生产文本。流畅段落的边际成本一旦下降，「我会了」的判断会被抬升，却不一定留下可提取的痕迹。教科文组织 2023 年指南把人类主体、包容和教师准备写在采购工具前面——禁令若只落在没有设备的学生身上，公平会倒转。",
    source: "UNESCO, Guidance for Generative AI in Education and Research (2023)",
    tags: ["生成式模型", "作业", "证据"],
    url: "/education/education-technology/generative-models-change-conditions",
  },
  {
    id: "shadow-education-follows-the-blueprint",
    title: "补习不是文明的勤奋本质，是高利害证书外面长出来的市场",
    detail:
      "Bray 把学校之外、模仿主流课表的付费教学叫做影子教育：公立考什么，影子卖什么。Stevenson 与 Baker 1992 年把日本课外补习写成分配机制——帮家庭把学校表现兑换成升学位置。禁招牌而不改名额与题型，购买会转入更不透明的渠道。",
    source:
      "Stevenson & Baker, American Journal of Sociology (1992); Bray, The Shadow Education System (UNESCO IIEP, 1999)",
    tags: ["影子教育", "补习"],
    url: "/education/comparison-and-policy/shadow-education-is-a-market",
  },
  {
    id: "lau-english-only-is-not-equal",
    title: "只提供英语课、不给语言支持，美国最高法院说这不等于平等教育",
    detail:
      "1974 年 Lau v. Nichols 判定：教学语言可以成为拒绝可懂课程的装置。判决没有规定唯一正确的双语模型；卡明斯后来提醒，操场上能聊天不等于已经能用该语言读科学论证。尽快改用强势语言，短期分数可能上升——因为测验语言与教学语言重合——长期切断的是第一语言和家庭参与。",
    source:
      "Lau v. Nichols, 414 U.S. 563 (1974); Cummins, Bilingualism and Special Education (1984)",
    tags: ["双语教育", "教学语言"],
    url: "/education/curriculum-and-teaching/bilingual-education-is-a-design",
  },
  {
    id: "miller-seven-was-never-a-brain-spec",
    title: "「七加减二」测的是实验室任务，不是给儿童贴的大脑规格",
    detail:
      "Miller 1956 年写的是成人能同时把握的组块上限，组块本身已经是组织。Baddeley 与 Hitch 1974 年用工作记忆替换短时记忆抽屉：人不但暂存，还在暂存的同时加工。Sweller 把困难拆成材料本身的元素交互，和拙劣呈现带来的额外保持——字号变大消不掉内在负荷，图文拆到两页却会制造外在负荷。",
    source:
      "Miller, Psychological Review (1956); Baddeley & Hitch (1974); Sweller, Cognitive Science (1988)",
    tags: ["工作记忆", "认知负荷"],
    url: "/education/cognition-and-memory/working-memory-and-load",
  },
  {
    id: "campbell-law-washes-the-curriculum",
    title: "定量指标一旦用来做社会决策，就越容易腐蚀它声称要监控的过程",
    detail:
      "Campbell 的定律在学校的版本是高利害考试：录取、分班、经费一绑上分数，课程就被收成试卷表面。Koretz 观察到问责测验上的分数上升，常常快于对同一批学生学习的其他测量。升分本身不能证明学会了——近迁移变熟，构念可能已经被洗刷。",
    source: "Campbell, Evaluation and Program Planning (1979); Koretz, Measuring Up (2008)",
    tags: ["高利害", "洗刷效应"],
    url: "/education/assessment-and-equity/high-stakes-exams-are-institutions",
  },
  {
    id: "oakes-tracking-moves-curriculum",
    title: "名字叫能力分组，奥克斯走进现场后发现运走的是课程质量",
    detail:
      "1985 年 Oakes 的《保持轨道》记录美国中学分流：谁读完整的科学，谁反复做低认知工作单。Gamoran 后来把效应拆成选择（先前成绩不同的人被送进不同轨）和处理（进去之后教学速度和教师预期继续分开）。若低轨更少合格教师、更少实验，分组就在生产它声称只是在发现的差异。",
    source: "Oakes, Keeping Track (1985); Gamoran, American Sociological Review (1992)",
    tags: ["分流", "机会"],
    url: "/education/curriculum-and-teaching/tracking-and-grouping",
  },
  {
    id: "progresa-cash-buys-attendance",
    title: "墨西哥给穷人发有条件的现金，买到的是到场；学会仍取决于教室里有没有课",
    detail:
      "1997 年 Progresa（后改名 Oportunidades）把入学与卫生检查写成领钱条件，并用处理组与对照组来评价。Schultz 等人报告就学率上升。现金放松家庭预算约束；若学校距离远、教学语言不通、班额过大，需求侧工具会显得「无效」——测到的可能是供给。",
    source:
      "Schultz, Economic Development and Cultural Change (2004); Levy, Progress against Poverty (2006)",
    tags: ["条件现金", "就学"],
    url: "/education/comparison-and-policy/conditional-cash-and-enrollment",
  },
  {
    id: "validity-is-not-reliability",
    title: "一把稳定的尺可以稳定地量错东西——信度高不等于测得准",
    detail:
      "Cronbach 与 Meehl 1955 年把构念效度写成：分数若要代表看不见的属性，必须说明它与哪些观察相连、与哪些无关。Messick 1989 年把社会后果算进效度；Kane 要求你声称分数能支持哪些决定，证据链是否撑得住。课堂里说「这次考了阅读能力」，试卷可能测的是速度、词汇或顺从。",
    source:
      "Cronbach & Meehl, Psychological Bulletin (1955); Messick, in Linn, Educational Measurement (1989)",
    tags: ["效度", "构念"],
    url: "/education/assessment-and-equity/validity-is-an-argument",
  },
];
