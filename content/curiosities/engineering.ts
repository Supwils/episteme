import type { Curiosity } from "@/lib/curiosities";

export const ENGINEERING_CURIOSITIES: Curiosity[] = [
  {
    id: "citicorp-secret-night-weld",
    title: "59 层大楼几乎被斜风掀翻，工程师连夜偷偷焊了两百多个接头",
    detail:
      "花旗中心的柱子立在每面中点，好把教堂留在西北角。1978 年夏天 LeMessurier 重算斜向风，发现施工已把焊接接头改成螺栓，承载力不够。夜里工人在人字撑外包上胶合板小屋加焊钢板，楼顶阻尼器继续转；当时新闻稿写成「谨慎加强」。不是阴谋集团，是一次走内部渠道、对公众保密近十七年的近失——Morgenstern 1995 年才把故事写进《纽约客》。",
    source: "Morgenstern, “The Fifty-Nine-Story Crisis”, The New Yorker (29 May 1995)",
    tags: ["花旗中心", "近失", "工程伦理"],
    url: "/engineering/frontiers/citicorp-center-lemessurier",
  },
  {
    id: "hyatt-walkway-one-change-doubled-load",
    title: "施工把一根长杆改成两根短杆，走廊载荷几乎翻倍",
    detail:
      "1981 年堪萨斯城凯悦中庭，二层与四层悬挂走廊塌到地面，美国国家标准局记录 113 人死亡。原图是连续吊杆穿过两层，四层只扛自己；改成两套杆之后，二层的重量先进入四层连接。改的是构型，翻的是传力路径。不是一个焊工的手抖，是图纸、审批与连接细节没有把「改了一笔」当成新设计。",
    source:
      "Marshall et al., Investigation of the Kansas City Hyatt Regency Walkways Collapse, NBSIR 82-2465 (1982)",
    tags: ["凯悦走廊", "连接", "失效"],
    url: "/engineering/frontiers/hyatt-regency-walkway-collapse",
  },
  {
    id: "tacoma-narrows-not-resonance",
    title: "塔科马大桥那段最有名的教学片，物理教科书讲错了半个世纪",
    detail:
      "1940 年 11 月 7 日，塔科马海峡桥在约 19 米每秒的风里扭断坠海，影像被当成「共振」的标准例子：涡旋频率碰巧等于桥的固有频率。Billah 与 Scanlan 1991 年指出，真正的机制是气动弹性颤振——桥的运动自己在改风力，驱动源并不独立于结构。酒杯可以被声波震碎；这座桥是在跟风一起跳舞，直到跳崩。",
    source:
      "Billah & Scanlan, “Resonance, Tacoma Narrows bridge failure, and undergraduate physics textbooks”, American Journal of Physics 59 (1991)",
    tags: ["塔科马", "颤振", "教科书"],
    url: "/engineering/frontiers/tacoma-narrows-and-the-textbook-error",
  },
  {
    id: "quebec-bridge-bent-chord-ignored",
    title: "魁北克桥的弦杆已经弯了，却没人把它当成数据",
    detail:
      "1907 年 8 月 29 日，建设中的南悬臂在约十五秒内坠入圣劳伦斯河。皇家委员会后来写得很硬：钢的质量是好的，缺陷在设计；现场已经看见下弦压杆失稳，却被读成出厂原状或吊装碰伤。顾问工程师身在纽约、未再到现场。弯曲写在杆上，检查链把它当成噪声——直到整半幅跟着走。",
    source: "Royal Commission, Quebec Bridge Inquiry Report (1908)",
    tags: ["魁北克桥", "压杆", "远程校核"],
    url: "/engineering/frontiers/quebec-bridge-1907-chord",
  },
  {
    id: "schenectady-broke-at-the-dock",
    title: "油轮停在平静码头上，自己从中间折成了折刀",
    detail:
      "1943 年 1 月 16 日，T2 油轮斯克内克塔迪号（SS Schenectady）刚试航完，港水约 4°C，风轻浪静。一声炸响后，裂纹从甲板写到船底，船体折刀状弯曲，只剩底板还连着。它不是自由轮，也不是风暴拉断的——全焊船体把板连成连续路径，缺口敏感的钢在服役温度下脆断。名义应力远低于抗拉强度；平静本身就是证据。",
    source:
      "Board of Investigation, The Design and Methods of Construction of Welded Steel Merchant Vessels (1947)",
    tags: ["脆性断裂", "焊接船", "低温"],
    url: "/engineering/frontiers/liberty-ship-schenectady-brittle-fracture",
  },
  {
    id: "tmi-lamp-told-the-command-not-the-valve",
    title: "三里岛那盏灯没坏——它只是在报告「命令」，不是阀芯位置",
    detail:
      "1979 年 3 月 28 日，卸压阀按设计打开后没有回座，冷却剂持续流出。控制室的灯回答的是关闭线圈已经断电，不是阀芯现在在哪。操作员看见「阀已关、水位偏高」，据此削减安注。凯梅尼委员会拒绝把主因写成几个笨操作员：灯在做它被接线去做的事。命令被执行，不等于装置到达了命令所指的状态。",
    source:
      "Kemeny Commission, Report of the President’s Commission on the Accident at Three Mile Island (1979)",
    tags: ["三里岛", "人因", "指示"],
    url: "/engineering/frontiers/three-mile-island-porv-indicator",
  },
  {
    id: "fail-safe-vs-fail-deadly",
    title: "「故障安全」先问一句：坏掉之后，它倒向哪一边？",
    detail:
      "电梯的安全钳在钢丝绳失效时咬住导轨，核反应堆的控制棒在失电时靠重力落下——故障被设计成进入更安全的状态。另一类系统故障时反而进入更危险的状态，安全工程把它叫做 fail-deadly。冗余和联锁看起来像多了一层保护；佩罗提醒：在耦合紧密的系统里，保护装置本身也会制造新的交互。先画失效方向，再堆零件。",
    source: "Perrow, Normal Accidents: Living with High-Risk Technologies (1984)",
    tags: ["故障安全", "安全工程", "冗余"],
    url: "/engineering/frontiers/safety-engineering",
  },
  {
    id: "hartford-roof-waited-until-the-crowd-left",
    title: "哈特福德的屋顶等到观众散尽，才在凌晨四点塌下来",
    detail:
      "1978 年 1 月 18 日约 4:19，市政中心体育馆约两英亩半的钢网架坠入空场。几小时前场内还坐满看篮球的人。积雪是荷载，压杆屈曲是机制——不是有人算准了散场时刻。幸运不是设计目标；同一场雪，只是把一场满座灾难错开了几个小时。",
    source:
      "Martin & Delatte, “Another Look at the Hartford Civic Center Coliseum Collapse”, Journal of Performance of Constructed Facilities (2001)",
    tags: ["哈特福德", "网架", "积雪"],
    url: "/engineering/frontiers/hartford-civic-center-1978",
  },
  {
    id: "zhaozhou-open-spandrel-not-semicircle",
    title: "赵州桥的关键不是把石头垒成半圆，是更坦的弧和开敞的拱肩",
    detail:
      "隋代李春在洨河上做成单孔敞肩坦弧石拱，主跨约三十七米，矢跨比约一比五。两端小拱让洪水从肩部泄走，同时减轻自重与拱脚推力。石材只能受压，拱恰好是处处受压的形状——跨度被脚手架和推力限制，坦弧与敞肩是在这道限制里省出来的几何。",
    source:
      "Needham, Science and Civilisation in China, Vol. 4, Part 3 (Cambridge University Press, 1971)",
    tags: ["赵州桥", "石拱", "推力"],
    url: "/engineering/civil/bridges",
  },
  {
    id: "fermi-pile-half-watt-squash-court",
    title: "人类第一次自持链式反应，功率只有半瓦，地点是一座壁球馆",
    detail:
      "1942 年 12 月 2 日，芝加哥大学壁球馆里，石墨与天然铀码成的 Chicago Pile-1 让中子计数走平：链式反应可以被精确地开、关、调。它点不亮一只灯泡，却证明商用堆要担心的不是「慢动作原子弹」，而是停堆之后仍在释放的衰变热。",
    source:
      "Fermi, “Experimental Production of a Divergent Chain Reaction”, American Journal of Physics 20 (1952)",
    tags: ["费米", "临界", "核电"],
    url: "/engineering/energy/nuclear-power",
  },
  {
    id: "pantheon-unreinforced-dome-still-stands",
    title: "万神殿那顶无筋混凝土穹顶，净跨四十三米，至今还在",
    detail:
      "罗马人用石灰加火山灰浇出能在水中硬化的混凝土；穹顶底部用重骨料，越往上越轻，顶端改用浮石。帝国衰落后配方沉睡逾千年——现代真正标准化的是波特兰水泥，以及让石头也能「受拉」的钢筋混凝土，不是混凝土这件事本身。",
    source:
      "Mark & Hutchinson, “On the Structure of the Roman Pantheon”, The Art Bulletin 68 (1986)",
    tags: ["万神殿", "混凝土", "穹顶"],
    url: "/engineering/materials/concrete-engineering",
  },
  {
    id: "otis-cut-the-rope-crystal-palace",
    title: "奥的斯当众砍断吊绳，平台只顿了一下——电梯才敢载人",
    detail:
      "1854 年纽约水晶宫博览会上，他站在安全提升机上砍断绳索，制动爪咬住导轨。没有这套「绳断即刹」，乘用电梯进不了市场，高层办公也没有日常可达性。限制楼高的往往不是钢材够不够硬，是垂直交通能不能被信任。",
    source: "Otis, U.S. Patent 31,128, “Improvement in Hoisting Apparatus” (1861)",
    tags: ["电梯", "奥的斯", "摩天楼"],
    url: "/engineering/civil/skyscrapers",
  },
  {
    id: "storage-pays-a-round-trip-tax",
    title: "电装不进桶里——储能每一次转换都要交一笔叫往返效率的税",
    detail:
      "所有储能都是把电能换成势能、化学能或热能，需要时再换回来。锂离子系统级往返效率大约八成五，抽蓄约七到八成，「电—氢—电」常常只剩三到四成。2017 年南澳大利亚 Hornsdale 那座电池真正赚到的，是毫秒级调频，不是「终于有地方存电了」。",
    source:
      "Dunn, Kamath & Tarascon, “Electrical Energy Storage for the Grid: A Battery of Choices”, Science 334 (2011)",
    tags: ["储能", "往返效率", "电网"],
    url: "/engineering/energy/energy-storage",
  },
  {
    id: "teton-piping-not-overtopping",
    title: "提顿坝没有漫顶——水从右岸破碎的流纹岩里把心墙土带走了",
    detail:
      "1976 年 6 月 5 日库水位仍在溢洪道槛以下。清水泉先在下游岩石节理里冒出来，次日清晨浑水从坝腋接触带涌出，大约五小时后坝顶塌进水里。独立调查组写的是键槽深处的管涌，不是土石坝这种型式被证伪，也不是库容算错。",
    source:
      "Independent Panel to Review Cause of Teton Dam Failure, Report to U.S. Department of the Interior and the State of Idaho (1976)",
    tags: ["提顿坝", "管涌", "坝肩"],
    url: "/engineering/frontiers/teton-dam-1976",
  },
  {
    id: "malpasset-left-abutment-walked-away",
    title: "马尔帕塞垮的不是拱圈太薄，是左岸片麻岩没有把推力接住",
    detail:
      "1959 年 12 月 2 日库水位升到溢洪道槛以下数厘米，双曲薄拱跟着左岸走了。灾后左岸空出一个二面角：下游是断层，上游顺着叶理撕开，剪切发生在混凝土以下的岩体里。同代法国薄拱里它并不是最薄的一座——拱失去一侧支座，没有第二条路。",
    source: "Londe, “The Malpasset Dam Failure”, Engineering Geology 24 (1987)",
    tags: ["马尔帕塞", "拱坝", "坝肩"],
    url: "/engineering/frontiers/malpasset-1959",
  },
  {
    id: "vaiont-arch-stood-the-slope-did-not",
    title: "瓦伊昂的拱坝站住了——翻过坝顶、抹掉下游镇子的，是整面滑进库里的山",
    detail:
      "1963 年 10 月 9 日，蒙特托克约 2.7 亿立方米岩体在不足四十五秒内滑入库中，涌浪冲进隆加罗内。蠕动已被测了三年，蓄水仍被当成可以加减的试验。坝体只受了较轻的损伤；站住的混凝土没有给库岸发合格证。",
    source:
      "Müller, “The rock slide in the Vajont valley”, Felsmechanik und Ingenieurgeologie 2 (1964)",
    tags: ["瓦伊昂", "库岸", "滑坡"],
    url: "/engineering/frontiers/vaiont-1963",
  },
];
