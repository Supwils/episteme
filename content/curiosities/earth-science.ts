import type { Curiosity } from "@/lib/curiosities";

export const EARTH_SCIENCE_CURIOSITIES: Curiosity[] = [
  {
    id: "wegener-drift-ridiculed-fifty-years",
    title: "气象学家说大陆会游泳，地质学家认真笑了五十年",
    detail:
      "1912 年魏格纳（Wegener）在法兰克福提出：今天隔着大洋的大陆曾经拼在一起。海岸像拼图只是引子，化石与岩层的跨洋对应才是他的证据网。机制当时说不通，主流拒绝——不是有人封口，是「大陆怎么在坚硬地壳上漂」没有物理。海底扩张来了以后，嘲笑变成迟到的胜利。",
    source: "Wegener, Die Entstehung der Kontinente und Ozeane (1915)",
    tags: ["魏格纳", "大陆漂移", "板块构造"],
    url: "/earth-science/pioneers/alfred-wegener",
  },
  {
    id: "vine-matthews-seafloor-tape-recorder",
    title: "洋底斑马纹不是涂鸦，是地磁倒转的录音带",
    detail:
      "瓦因（Vine）与马修斯（Matthews）1963 年把两件已知的事扣在一起：地磁场会倒转，新洋壳在洋脊生成并向两侧移开。于是海面磁异常变成磁带：正反磁化条带平行于脊轴，距离除以倒转年表就是扩张速率。条带拉夫与梅森已经画过；他们给出的是读法，不是第一笔花纹。",
    source: "Vine & Matthews, “Magnetic Anomalies over Oceanic Ridges”, Nature 199 (1963)",
    tags: ["海底扩张", "磁异常", "地磁倒转"],
    url: "/earth-science/event-analyses/vine-matthews-magnetic-stripes",
  },
  {
    id: "hutton-siccar-point-older-than-ussher",
    title: "厄谢尔把创世算到公元前 4004 年——西卡角的岩石请你再往下看",
    detail:
      "17 世纪厄谢尔主教（Ussher）按《圣经》世系推出地球大约六千年。1788 年赫顿（Hutton）在西卡角让同行看见：近乎直立的板岩上，平整盖着水平砂岩。普莱费尔写道，心智因凝视时间的深渊而眩晕。不是有人藏起年表，是侵蚀—沉积—抬升这台机器，逻辑上就需要深得可怕的时间。",
    source:
      "Hutton, “Theory of the Earth”, Transactions of the Royal Society of Edinburgh (1788); Playfair, Illustrations of the Huttonian Theory of the Earth (1802)",
    tags: ["深时间", "赫顿", "均变论"],
    url: "/earth-science/pioneers/james-hutton",
  },
  {
    id: "cascadia-1700-orphan-tsunami-in-japan",
    title: "日本文书记下一次没有地震的海啸，震源其实在太平洋对岸",
    detail:
      "1700 年元禄十二年，日本沿岸涌来没有本地摇动的异常海面——「孤儿海啸」。佐竹等人 1996 年排除南美、阿拉斯加与堪察加的已知巨震，把源收到卡斯卡迪亚；华盛顿外岸被潮水淹死的红柏，最后一轮年轮停在 1699 年生长季。父事件不在日本近海，走时把摇和浪拆开了。",
    source:
      "Satake, Shimazaki, Tsuji & Ueda, “Time and size of a giant earthquake in Cascadia inferred from Japanese tsunami records of January 1700”, Nature 379 (1996)",
    tags: ["卡斯卡迪亚", "海啸", "年轮"],
    url: "/earth-science/event-analyses/cascadia-1700-orphan-tsunami",
  },
  {
    id: "lehmann-solid-inner-core-from-p-prime",
    title: "地球中心有一颗从没人见过的固态铁球",
    detail:
      "人类最深的钻连地壳都没打穿。1936 年莱曼（Lehmann）在一篇题目只有「P′」的短文里指出：古登堡的液态核影区里，仍反复出现不该在的到时。空带子里有东西——内核边界大约在 5100 公里。不是钻孔取出的标本，是走时分支把固态核嵌进了液态外核。",
    source:
      "Lehmann, “P′”, Publications du Bureau Central Séismologique International, Série A, No. 14 (1936)",
    tags: ["内核", "莱曼", "地震波"],
    url: "/earth-science/event-analyses/lehmann-1936-inner-core",
  },
  {
    id: "hess-kept-the-echo-sounder-on",
    title: "二战舰长故意不关测深仪，把航迹画成了海底扩张的底图",
    detail:
      "哈里·赫斯（Harry Hess）在太平洋运输舰上让回声测深仪日夜打向海底——对作战几乎无用，对地质却是一条条深度剖面。1962 年他把洋盆写成不断更新的传送带：脊上生、沟里收。当时像一首「地质诗」；磁条带与深海钻探随后把它读成可核对的机制。",
    source:
      "Hess, “History of Ocean Basins”, in Petrologic Studies: A Volume in Honor of A. F. Buddington (1962)",
    tags: ["赫斯", "海底扩张", "洋盆"],
    url: "/earth-science/pioneers/harry-hess",
  },
  {
    id: "moho-from-a-modest-croatian-quake",
    title: "一次不怎么出名的克罗地亚地震，画出了地壳的底",
    detail:
      "1909 年库帕河谷地震破坏有限，萨格勒布的莫霍洛维奇（Mohorovičić）却向欧洲各台要到时。P 与 S 似乎各有两套到达：直达波，以及一支更快、像是在更深更快介质里跑过的波。他放弃匀速直线，把界面放在约 54 公里——后来称为莫霍面。地壳不是钻机量出来的蛋糕层，是走时拐点逼出来的速度界面。",
    source:
      "Mohorovičić, “Das Beben vom 8. Oktober 1909”, Jahrbuch des meteorologischen Observatoriums in Zagreb (1910)",
    tags: ["莫霍面", "地壳", "走时"],
    url: "/earth-science/event-analyses/mohorovicic-1909-discontinuity",
  },
  {
    id: "gutenberg-core-at-2900-km",
    title: "古登堡把地核钉在地下约 2900 公里——全凭影区里缺了一截波",
    detail:
      "奥尔德姆已经看见：某些震中距上 P 波迟到或消失，深处像有一个低速核。1914 年古登堡（Gutenberg）用哥廷根远震记录，把影区几何收成半径。没有人把地球剖开，界面却有了可修订的深度。液态外核是后来用 S 波进不去等证据补上的脾气；先站住的是那条核–幔边界。",
    source:
      "Gutenberg, “Über Erdbebenwellen. VII A”, Nachrichten von der Königlichen Gesellschaft der Wissenschaften zu Göttingen (1914)",
    tags: ["地核", "古登堡", "影区"],
    url: "/earth-science/event-analyses/gutenberg-1914-core-mantle-boundary",
  },
  {
    id: "seafloor-recycled-continents-keep-time",
    title: "洋底几乎没有两亿年的石头，大陆上却躺着近四十亿年的片麻岩",
    detail:
      "新洋壳从中脊生长，老洋壳在海沟被回收，海底像一条不断更新的传送带。大陆密度低、浮得高，不易被拖进俯冲带，于是把深时间记在陆壳里。漂的是整块岩石圈，大陆只是嵌在板上、因密度低而不易下沉的乘客。",
    source:
      "Isacks, Oliver & Sykes, “Seismology and the New Global Tectonics”, Journal of Geophysical Research 73 (1968)",
    tags: ["板块", "俯冲", "洋壳"],
    url: "/earth-science/processes/plate-tectonics",
  },
  {
    id: "bjerknes-enso-one-coin",
    title: "秘鲁外海变暖、澳大利亚大旱，曾经被当成两门不相干的学问",
    detail:
      "渔民把圣诞节前后的暖流叫做圣婴；沃克爵士在气压相关里标出南方涛动。海洋学家研究海温，气象学家研究气压，互不相通。1969 年比耶克尼斯指出：它们是一枚硬币的两面——信风与赤道海温互相驱动、彼此放大，才把局地暖水写成全球遥相关。",
    source:
      "Bjerknes, “Atmospheric Teleconnections from the Equatorial Pacific”, Monthly Weather Review 97 (1969)",
    tags: ["厄尔尼诺", "沃克环流", "海气"],
    url: "/earth-science/processes/el-nino-enso",
  },
  {
    id: "ice-age-triggered-by-cool-summers",
    title: "冰盖不是被寒冬催生的，是被化不完雪的凉夏养大的",
    detail:
      "冬天再冷也总会下雪；决定冰盖存亡的，是北半球高纬的夏天能不能把雪全部化掉。米兰科维奇算出轨道如何改写那份夏季日照；1976 年海斯、英布里与沙克尔顿在深海氧同位素里读出 10 万、4.1 万、2.3 万年的峰，与天文节拍对上。我们现在仍住在大冰期里的一段间冰期暖日子。",
    source:
      "Hays, Imbrie & Shackleton, “Variations in the Earth’s Orbit: Pacemaker of the Ice Ages”, Science 194 (1976)",
    tags: ["冰期", "米兰科维奇", "轨道"],
    url: "/earth-science/processes/glaciation-ice-ages",
  },
  {
    id: "st-helens-vei-ruler-after-the-blast",
    title: "圣海伦斯削掉四百米山顶之后，火山才有了一把能互相比的尺子",
    detail:
      "1980 年 5 月 18 日，华盛顿州圣海伦斯北侧先滑、再侧向爆发。破坏力让人看见：没有统一标尺，就无法比较一次喷发有多猛。Newhall 与 Self 两年后提出火山爆发指数（VEI）——先有一次必须被量的喷发，后有那把尺子。",
    source:
      "Newhall & Self, “The Volcanic Explosivity Index (VEI): An Estimate of Explosive Magnitude for Historical Volcanism”, Journal of Geophysical Research 87 (1982)",
    tags: ["圣海伦斯", "VEI", "火山"],
    url: "/earth-science/processes/volcanism",
  },
  {
    id: "richardson-pencil-forecast-took-months",
    title: "理查森用纸笔算了几个月天气，结果还错了——方法却是对的",
    detail:
      "1922 年他把大气方程当成初值问题手工求解，梦想有朝一日六万四千个计算员赶在天气发生前算完。一次预报花了几个月。错的是算力与初值，不是思路：今天的数值天气预报，正是这支铅笔的后裔。测不准远期，是因为大气对初值敏感，不是因为天气没有定律。",
    source:
      "Richardson, Weather Prediction by Numerical Process (Cambridge University Press, 1922)",
    tags: ["数值预报", "理查森", "混沌"],
    url: "/earth-science/processes/weather-systems",
  },
  {
    id: "tharp-rift-called-girl-talk",
    title: "撒普画出大西洋中央裂谷，合作者第一句是「女孩子的胡思乱想」",
    detail:
      "1950 年代女性不准上船，她只好在岸上把测深数字画成剖面。几条剖面的中央都有一道深槽；叠上震中图，地震几乎严丝合缝地排进那条裂谷。被打发掉的「胡思乱想」，后来变成必须解释的地形事实：新地壳从这里涌出，海底向两侧推开。",
    source:
      "Heezen, Tharp & Ewing, The Floors of the Oceans. I. The North Atlantic, Geological Society of America Special Paper 65 (1959)",
    tags: ["撒普", "大洋中脊", "制图"],
    url: "/earth-science/pioneers/marie-tharp",
  },
  {
    id: "foote-1856-carbonic-acid-heat",
    title: "富特的玻璃筒，先把二氧化碳和地球冷暖挂上了钩",
    detail:
      "1856 年她用两支同形圆筒对照：装「碳酸气」的那支晒到约华氏 120 度，普通空气约 100 度，移到阴影里也凉得更慢。她写下：由那种气体构成的大气，将给地球很高的温度。她测的是阳光下的升温，不是后来丁达尔拆开的长波红外回辐射——超前是真的，「被抹去的发现者」把两件事焊成了一句。",
    source:
      "Foote, “Circumstances Affecting the Heat of the Sun’s Rays”, American Journal of Science 22 (1856)",
    tags: ["富特", "二氧化碳", "温室"],
    url: "/earth-science/pioneers/eunice-foote",
  },
  {
    id: "keeling-curve-hears-the-planet-breathe",
    title: "基林曲线上那些小锯齿，是整颗行星在一呼一吸",
    detail:
      "1958 年莫纳罗亚第一个读数约 313 ppm，真正的价值是此后几十年从未中断。每年春夏北半球植物抽走二氧化碳，秋冬再释放——锯齿是生物圈的季节呼吸；每年均值却比前一年更高，那条主线才是化石燃料留在大气里的指纹。他证明的不是温室机制，是浓度确实在涨、涨了多少。",
    source:
      "Keeling, “The Concentration and Isotopic Abundances of Carbon Dioxide in the Atmosphere”, Tellus 12 (1960)",
    tags: ["基林曲线", "二氧化碳", "莫纳罗亚"],
    url: "/earth-science/pioneers/charles-keeling",
  },
];
