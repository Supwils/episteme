import type { Curiosity } from "@/lib/curiosities";

export const ARTS_CURIOSITIES: Curiosity[] = [
  {
    id: "prussian-blue-great-wave",
    title: "北斋那道「最日本」的蓝，其实是柏林实验室里碰巧炼出来的",
    detail:
      "普鲁士蓝约 1706 年在柏林合成，一个多世纪后才经中国中转、从长崎进入江户。北斋《富岳三十六景》赶上它变便宜、又不容易褪成灰紫，大面积海水第一次又能深又站得住。浪头那一层刺眼的蓝，是全球化学品流通的巧合，不是「日本精神」自带的颜料。",
    source:
      "大都会博物馆《神奈川冲浪里》藏本与颜料分析；Bartoll, “The Early History of Prussian Blue” (2008)",
    tags: ["北斋", "普鲁士蓝", "浮世绘"],
    url: "/arts/methods/great-wave-kanagawa-close-reading",
  },
  {
    id: "las-meninas-looking-back",
    title: "《宫娥》一直在看你看它——镜子还不肯告诉你谁站在你的位置",
    detail:
      "委拉斯开兹 1656 年把自己画进房间左侧，目光朝画外；后墙小镜里又出现国王与王后。你好像站上了君主的位子，接受众人注视——也可能镜子只是在反射左侧那块看不见的画布。两种读法都解释得通，画面故意让它们叠在一起。",
    source: "普拉多博物馆《宫娥》作品说明；Foucault, Les mots et les choses (1966)",
    tags: ["委拉斯开兹", "宫娥", "观看"],
    url: "/arts/methods/las-meninas-close-reading",
  },
  {
    id: "vanishing-point-just-geometry",
    title: "灭点看起来像线条合谋把你吸进画里，其实只是一套定点几何",
    detail:
      "阿尔贝蒂 1435 年把画面写成一扇假想的窗户：独眼、定点、所有向深处去的平行线汇到视平线上同一点。铁轨在远方「相交」，不是宇宙跟你眨眼，是投影规则。中国山水另有散点办法，那不是「还不会透视」，是另一套看空间的合同。",
    source: "Alberti, De pictura (1435)",
    tags: ["透视", "灭点", "阿尔贝蒂"],
    url: "/arts/foundations/perspective-and-space",
  },
  {
    id: "whyte-movable-chairs",
    title: "公共空间灵不灵，有时就差一把能挪的椅子",
    detail:
      "威廉·H·怀特用摄像机在纽约广场计数：人们不去抽象的「开放」，而去有座位、有食物、有可看的人的地方。可移动的椅子比固定长椅更能被占用；高差本身就是一道请人离开的门槛。空旷的大广场，在生活里可以等于过道。",
    source: "Whyte, The Social Life of Small Urban Spaces (1980)",
    tags: ["公共空间", "城市", "怀特"],
    url: "/arts/architecture/urban-public-space",
  },
  {
    id: "photography-two-fathers-1839",
    title: "1839 年摄影有两位父亲，还为「谁先公开」当场较劲",
    detail:
      "1 月 7 日法国科学院宣布达盖尔银版法，消息几天内传到伦敦。塔尔博特自 1834 年就在做「光绘」，却迟迟未发表，于是仓促在 1 月 31 日向皇家学会递交论文。达盖尔法产出孤本正像，塔尔博特的负片—正片才是后来一百多年的主干——发明桂冠却长期戴在达盖尔头上。",
    source:
      "Arago 向法国科学院的宣布（1839 年 1 月 7 日）；Talbot, “Some Account of the Art of Photogenic Drawing” (1839)",
    tags: ["摄影史", "达盖尔", "塔尔博特"],
    url: "/arts/media/photography-history",
  },
  {
    id: "bauhaus-only-fourteen-years",
    title: "包豪斯只办了十四年，课表却比校舍活得更久",
    detail:
      "格罗皮乌斯 1919 年在魏玛把两所旧学校并成包豪斯，1933 年密斯在纳粹压力下关闭学校。十四年里换了三任校长、迁过两次址；德绍那座玻璃幕墙工坊翼，本身就是课程。风格后来被全世界的白盒子借走，学校却早就不在了。",
    source: "Gropius, The New Architecture and the Bauhaus (1935)",
    tags: ["包豪斯", "现代主义", "格罗皮乌斯"],
    url: "/arts/architecture/modernism-and-international-style",
  },
  {
    id: "hokusai-manga-four-thousand",
    title: "「漫画」这个词，有一本将近四千页的江户速写百科垫底",
    detail:
      "北斋《北斋漫画》自 1814 年第一编起陆续刊行，十五编里收了近四千幅人物、鬼神、器物速写。它首先是画工的素材库与町人的闲书，后来才被借去当现代漫画的名字。浪头出圈之前，这位七十岁画工已经在纸上练过一整座江户。",
    source: "葛饰北斋《北斋漫画》初编（名古屋永乐屋，1814）",
    tags: ["北斋", "漫画", "浮世绘"],
    url: "/arts/traditions/japanese-ukiyoe",
  },
  {
    id: "ukiyoe-one-color-one-block",
    title: "北斋那片蓝不是一笔扫出来的，是一色一块版对齐套出来的",
    detail:
      "锦绘把色彩拆成工程：一色一块版，十几块版依次压印，靠版角的「见当」对准。浪头的普鲁士蓝再稳定，也得先被雕成凸起的色面，再被摺师叠上去。名画在江户首先是可加印的城市商品，木板磨钝了，爪尖就会变钝。",
    source: "浮世绘套印工艺；大都会博物馆北斋印本研究",
    tags: ["版画", "套印", "北斋"],
    url: "/arts/media/printmaking",
  },
  {
    id: "yingzao-fashi-modularity",
    title: "造一座宫殿，第一步不是画平面，而是定一块木头的断面",
    detail:
      "李诫《营造法式》把栱的断面叫做「材」，高十五分、厚十分；材等一定，柱高、开间、出檐和斗拱出跳都按「分」的倍数推出来。榫卯为主也不等于不用钉——同一部书里钉的品类和用量写得明明白白。「以材为祖」是国家级模数，不是一句木工谚语。",
    source: "李诫《营造法式》（崇宁二年 / 1103 刊行）",
    tags: ["营造法式", "斗拱", "模数"],
    url: "/arts/architecture/east-asian-timber-frame",
  },
  {
    id: "fuchun-scroll-almost-burned",
    title: "《富春山居图》差点被当成陪葬烧掉，这才裂成今天的两截",
    detail:
      "黄公望 1347 年起笔、1350 年完成这卷六米多的手卷；1650 年主人吴洪裕临终要它殉葬，抢救下来已裂为《剩山图》与《无用师卷》。2011 年 6 月两段在台北合璧。留白和题跋都还在生长，火却几乎把时间轴切断。",
    source: "黄公望《富春山居图》流传记录；台北故宫博物院 2011 年合璧展",
    tags: ["黄公望", "手卷", "书画"],
    url: "/arts/traditions/chinese-painting",
  },
  {
    id: "newton-seven-colors-are-notes",
    title: "牛顿把光谱切成七段，是为了让彩虹凑上音阶",
    detail:
      "1704 年《光学》里的色环，红橙黄绿蓝靛紫的弧长按音程比例分配，圆心标成白。判决性实验已经证明棱镜只是分拣白光，并不「制造」颜色；七这个数字却不是从波长里数出来的，是刻意去对七个音。物理颜色从此可以算，段数仍是一套类比。",
    source: "Newton, Opticks (1704)",
    tags: ["牛顿", "光谱", "色彩"],
    url: "/arts/foundations/color-and-light",
  },
  {
    id: "last-supper-is-a-stack-of-repairs",
    title: "食堂墙上那顿晚餐，今天看见的大半是五百年修修补补的总和",
    detail:
      "达·芬奇约 1495–1498 年把蛋彩和油彩画在干墙上，完成后几十年就开始剥落；1652 年僧侣开门洞，基督的脚被切掉。1978–1999 年布兰比拉主持显微清洗，马拉尼估计原笔不超过一半，贝克等人压到约百分之十八。观众面对的是干预史，不是 1498 年的墙面。",
    source:
      "Brambilla Barcilon & Marani, Leonardo: The Last Supper (University of Chicago Press, 2001)",
    tags: ["达·芬奇", "修复", "保护科学"],
    url: "/arts/methods/conservation-science",
  },
  {
    id: "greek-temple-is-not-a-hall",
    title: "希腊神庙不是会堂：人绕着外面走，神住在进不去的那一间",
    detail:
      "帕特农（前 447–前 432）的内殿供黄金象牙雅典娜，泛雅典娜节的祭品在殿外东侧露天祭坛焚烧。神庙是游行的终点和背景，不是把会众装进去做礼拜的容器。把神庙、教堂、清真寺都写成「古代会堂」，第一步就把谁被允许进入看丢了。",
    source:
      "帕特农建造记录（伊克提诺斯、卡利克拉提斯；菲迪亚斯主持雕刻）；Vitruvius, De architectura",
    tags: ["神庙", "帕特农", "神圣空间"],
    url: "/arts/architecture/sacred-spaces",
  },
  {
    id: "van-meegeren-fooled-the-connoisseur",
    title: "最权威的维米尔眼睛，把伪作夸成了「代尔夫特的杰作」",
    detail:
      "范·米格伦用老画布和酚醛树脂烘出裂纹，1937 年的伪作《以马忤斯的晚餐》被布勒迪乌斯盛赞并入藏博伊曼斯。他后把伪作卖给戈林，1945 年为脱通敌罪当庭供认，并在看守下当场作画自证。鉴定的社会机制先于颜料：专家渴望「发现」维米尔遗失的宗教时期，愿望替证据签了名。",
    source: "Bredius 对《以马忤斯的晚餐》的鉴定（1937）；范·米格伦 1947 年阿姆斯特丹受审记录",
    tags: ["赝品", "维米尔", "鉴定"],
    url: "/arts/methods/provenance-and-attribution",
  },
  {
    id: "golden-ratio-named-in-1835",
    title: "「黄金分割」这个词，比帕特农年轻了两千年",
    detail:
      "欧几里得只说「中外比」；goldener Schnitt 迟到 1835 年才出现在马丁·欧姆的教科书里，审美魔力则主要来自泽伊辛 1854 年的人体比例论。帕特农实测更常贴近 4:9 这类可通约整数比。只要允许自由挑选檐口和台阶的起止点，总能在 1.6 附近凑出一对长度。",
    source:
      "Ohm, Die reine Elementar-Mathematik (1835); Zeising, Neue Lehre von den Proportionen des menschlichen Körpers (1854); Livio, The Golden Ratio (2002)",
    tags: ["黄金分割", "比例", "帕特农"],
    url: "/arts/foundations/proportion-and-harmony",
  },
  {
    id: "chevreul-black-threads-looked-dirty",
    title: "织工投诉黑线发脏，化学家发现染料没问题——是邻居在改色",
    detail:
      "舍夫勒尔主持巴黎戈布兰染色部门，1839 年写成《论色彩的同时对比规律》：每种颜色都会把邻近颜色朝自己的补色方向推。同一块中灰，红底上泛青绿，绿底上泛红。印象派后来把纯色并排放上画布，让混色在视网膜上完成，正是拿这条「不老实」的知觉当生产力。",
    source: "Chevreul, De la loi du contraste simultané des couleurs (1839)",
    tags: ["同时对比", "舍夫勒尔", "印象派"],
    url: "/arts/foundations/color-and-light",
  },
];
