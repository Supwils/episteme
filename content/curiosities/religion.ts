import type { Curiosity } from "@/lib/curiosities";

export const RELIGION_CURIOSITIES: Curiosity[] = [
  {
    id: "calendars-dont-line-up",
    title: "节日对不齐，常常不是谁把日子算错了，而是各在跟不同的天对表",
    detail:
      "太阴年大约短十一天，斋月会在季节里慢慢走动；阴阳合历要靠闰月把节日拉回农时；格里高利历 1582 年一次跳掉十天，是为了把春分扳回旧位。巴比伦占星档案、汉代太初历改制、修道院日课，都把「天怎样运行」写成祭祀时间表。对不齐，是制度选择，不是竞赛失误。",
    source: "《汉书·律历志》太初历（前 104）；格里高利十三世诏书 Inter gravissimas (1582)",
    tags: ["历法", "宇宙论", "节日"],
    url: "/religion/religion-foundations/myth-and-cosmos",
  },
  {
    id: "ritual-is-practice-not-secret",
    title: "仪式首先是一套可观察的动作清单，不是藏在幕后的密谋",
    detail:
      "范热内普 1909 年把身份转换写成分离、阈限、聚合三段：谁被隔离、谁被重新命名，档案里常有服饰规定和禁食时限。婚礼、毕业典礼、开庭起立，都是高度形式化的公共序列。研究这些步骤，是在读已经公开的规范，不是在揭开某个群体的「秘密核心」。",
    source: "van Gennep, Les rites de passage (1909)",
    tags: ["仪式", "范热内普", "实践"],
    url: "/religion/religion-foundations/ritual-and-practice",
  },
  {
    id: "james-varieties-experience",
    title: "詹姆斯把「宗教经验」做成学科入口时，材料几乎全是能写成告白的人",
    detail:
      "1901–1902 年他在爱丁堡作吉福德讲座，次年出版《宗教经验之种种》，有意把教会和教义放在边上，去收集皈依、出神、忧郁和康复叙述。分类工具依赖英语自传，对不写自传的传统会系统性看不见。经验是可描述的报告，不是实验室已经「找到了神」。",
    source: "James, The Varieties of Religious Experience (1902)",
    tags: ["詹姆斯", "宗教经验", "吉福德讲座"],
    url: "/religion/religion-foundations/religious-experience",
  },
  {
    id: "comparison-not-one-true",
    title: "比较宗教能并排历法和祭礼，却不能替任何人证明「只有一个是真的」",
    detail:
      "乔纳森·史密斯说：没有「宗教」这种现成数据，它是学者为了分析发明的二阶概念。可比较的是饮食禁忌、朝圣地、正典目录；「谁更接近终极实在」是认信裁决，不是描述句。1893 年芝加哥世界宗教议会把传统像博览会展品一样陈列——并排本身已经是一张地图，不是世界原貌。",
    source: "Smith, Imagining Religion (1982); 1893 World’s Parliament of Religions",
    tags: ["比较宗教", "方法", "史密斯"],
    url: "/religion/comparative-religion/comparing-religions",
  },
  {
    id: "nag-hammadi-not-a-coverup",
    title: "纳格·哈马迪出土的是被埋葬的书籍，不是一部「被隐瞒的真经」",
    detail:
      "1945 年埃及出土十三部科普特语抄本，里面有《多马福音》一类此前多靠引文为人所知的作品。它们是四世纪前后被装订、被放下、被遗忘的书。多元是文献事实；把落选文本写成「正统后来压住了更真实的耶稣」，则是一种现代情节，要和主教书单、礼拜支持分开写。",
    source: "Nag Hammadi 写本；Athanasius, 39th Festal Letter (367)",
    tags: ["伪经", "正典", "抄本"],
    url: "/religion/texts-and-canons/apocrypha-and-canon-contests",
  },
  {
    id: "bible-code-is-multiple-testing",
    title: "「圣经密码」找得到任何结局，因为你把检验做了太多次",
    detail:
      "等距字母序列只要把名字、日期和步长组合得足够多，一部足够长的文本里总会冒出「预言」。麦凯等人 1999 年用同一套手续，也能在《白鲸》里「读出」拉宾遇刺一类标题。这是统计上的多重检验，不是经卷在对当代新闻眨眼——换一本书、换一套名单，奇迹可以重新上演。",
    source:
      "McKay, Bar-Natan, Bar-Hillel & Kalai, “Solving the Bible Code Puzzle”, Statistical Science 14(2) (1999)",
    tags: ["圣经密码", "统计学", "抄本趣味"],
  },
  {
    id: "adhesion-not-betrayal",
    title: "许多地方的「改宗」，其实是把新崇拜加进旧菜单，不必宣布旧的作废",
    detail:
      "诺克 1933 年区分两种运动：conversion 是排他性转向，adhesion（归附）是并列加入。对许多希腊—罗马、东亚和非洲的实践来说，第二种才是常态。离散社区带着日历和葬礼规则上路，到达新地方后有人守旧名，有人换名、换节日。并置不是阴谋，是可携带的制度。",
    source: "Nock, Conversion (1933)",
    tags: ["改宗", "归附", "离散"],
    url: "/religion/religion-and-society/diaspora-and-conversion",
  },
  {
    id: "sacred-time-is-a-switch",
    title: "神圣与凡俗有时只是时间表上的一只开关：这几天不可交易",
    detail:
      "安息日、斋月、斋戒日与国丧，把某些时段从生产和买卖里抽离；圣所则把某些坐标从通行里抽离。谁有权宣布进入这种时间，谁就在行使一种看得见的权威。比较历法与比较圣所平面图，是同一种分界技术的两个切面——不是比较谁更「迷信」。",
    source: "Durkheim, Les formes élémentaires de la vie religieuse (1912)",
    tags: ["神圣", "凡俗", "时间"],
    url: "/religion/religion-foundations/sacred-and-profane",
  },
  {
    id: "septuagint-is-not-one-night",
    title: "《七十士译本》不是七十二人关在岛上一晚译完的奇迹",
    detail:
      "《阿里斯提亚斯书信》把摩西五经写成亚历山大城一次性的集体翻译；可核对的轮廓更冷：托勒密治下的犹太社群大约从公元前三世纪起把五经译成希腊文，其余书卷陆续补入。译本后来被教会当作旧约来读，希伯来圣经与希腊圣经从此不再是同一张书单。书信是起源传说，不是工时记录。",
    source: "《阿里斯提亚斯书信》；七十士译本形成史（公元前三世纪起的希腊文五经）",
    tags: ["七十士译本", "翻译", "圣经"],
    url: "/religion/texts-and-canons/translation-of-sacred-texts",
  },
  {
    id: "axial-age-is-a-1949-map",
    title: "「轴心时代」是 1949 年画出来的比较地图，不是古人自己的年表标题",
    detail:
      "雅斯贝斯把大约前 800 到前 200 年并置成孔子、佛陀、先知与希腊哲学家的窗口。并置不等于同时发生，更不等于互相知道：佛陀有长年表与短年表，琐罗亚斯德的年代可以从前二千纪争到前六世纪。窗口能用来比较批评性话语为何变密；把它写成一次全球同步觉醒，是制图技术造成的错觉。",
    source: "Jaspers, Vom Ursprung und Ziel der Geschichte (1949)",
    tags: ["轴心时代", "雅斯贝斯", "比较"],
    url: "/religion/religious-history/axial-age-religions",
  },
  {
    id: "hajj-quota-is-governance",
    title: "哈吉首先是签证、配额和公共卫生，不是一份心灵成长课程表",
    detail:
      "沙特统计总局公布 2019 年朝觐约 248.9 万人；名额长期按各国穆斯林人口分配，使这项移动同时成为外交与国内治理。义务、许愿和观光可以叠在同一次出行里，不能预先收成一种动机。特纳夫妇的「交融」能照亮某些互助场面，解释不了为何同一条路上仍有等级、收费和国籍配额。",
    source:
      "General Authority for Statistics, Kingdom of Saudi Arabia, Hajj statistics (2019); Turner & Turner, Image and Pilgrimage in Christian Culture (1978)",
    tags: ["朝圣", "哈吉", "圣地"],
    url: "/religion/religion-and-society/pilgrimage-and-sacred-space",
  },
  {
    id: "eckhart-went-into-a-bull",
    title: "埃克哈特的「合一」进过教宗诏书，不是私人日记里的灵感",
    detail:
      "约翰二十二世 1329 年的《在主的田地里》追责他的部分命题；阿维拉的德兰 1577 年写《内心城堡》，同时受告解司铎与异端裁判所语境约束。詹姆斯的四个标记——不可说、知悟、短暂、被动——是描述清单，用来并置文本，不能证明各传统只是给同一经验换了衣服。没有审判文书和教团规章，就只剩形容词。",
    source: "John XXII, In agro dominico (1329); McGinn, The Foundations of Mysticism (1991)",
    tags: ["神秘主义", "埃克哈特", "制度"],
    url: "/religion/comparative-religion/mysticism-across-traditions",
  },
  {
    id: "athanasius-list-is-pastoral-mail",
    title: "新约二十七卷最早完整名单，是一封排复活节的教务信",
    detail:
      "阿塔那修 367 年第三十九封《节日书信》列出与今日新约重合的二十七卷，并说不可增删。它不是「圣经被发明」的瞬间，而是为了排定复活节、同时打击另一些抄本的牧养信件。正典首先是一份被权威使用的书单，然后才是后来读者以为的永恒目录。",
    source: "Athanasius, 39th Festal Letter (367); Metzger, The Canon of the New Testament (1987)",
    tags: ["正典", "阿塔那修", "新约"],
    url: "/religion/texts-and-canons/scripture-and-canon",
  },
  {
    id: "vedic-recitation-reorders-the-line",
    title: "同一段颂文要正背、倒背、交错背——写本有时反而像让舌头偷懒的辅助",
    detail:
      "南印度部分吠陀学派把文本拆成词，再按固定规则重排吟诵，漏字和改字会当场暴露；旁人就是校对者。帕里—洛德记录的南斯拉夫史诗是套语即兴，吠陀追求的是音节级固定。把两种「口传」混成一种，会把保守的记诵传统写成民间文学。可靠性不属于纸张或喉咙，属于有没有纠正者在场。",
    source: "Graham, Beyond the Written Word (Cambridge University Press, 1987)",
    tags: ["吠陀", "口传", "记诵"],
    url: "/religion/texts-and-canons/oral-and-written-transmission",
  },
  {
    id: "nida-dynamic-equivalence-is-policy",
    title: "「动态对等」是圣经公会的方法论述，不是超历史的忠诚尺",
    detail:
      "奈达 1964 年区分形式对等与动态对等，服务的是战后差会与联合圣经公会的大规模译经：让译本读起来像当地人会说的话。把「信息」从文化形式里抽出再植入，本身是一次神学选择，不是中立的语言学发现。直译／意译从来不是纯度等级，而是看策略服务谁的制度目标。",
    source: "Nida, Toward a Science of Translating (E. J. Brill, 1964)",
    tags: ["奈达", "翻译", "圣经公会"],
    url: "/religion/texts-and-canons/translation-of-sacred-texts",
  },
  {
    id: "jamnia-was-not-nicaea",
    title: "所谓雅夫内一次拍板犹太正典，证据薄弱得撑不起「尼西亚」这个比喻",
    detail:
      "杰克·刘易斯 1964 年追问「雅夫内」到底指什么：希伯来书目的边界是在抄本、礼仪和论争里慢慢收紧的，不是某一个会期的投票结果。库姆兰同时收藏后来进入马索拉传统的书卷、次经和大量教团规则，证明的是文本世界曾经更宽，不是一份被谁藏起来的「真圣经」。",
    source: "Lewis, “What Do We Mean by Jabneh?”, Journal of Bible and Religion 32(2) (1964)",
    tags: ["正典", "雅夫内", "书目"],
    url: "/religion/texts-and-canons/scripture-and-canon",
  },
];
