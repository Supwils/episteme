export interface EraDeepReading {
  title: string;
  author: string;
  titleEn: string;
  year: number;
  note: string;
}

export interface EraDetail {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  desc: string;
  longDesc: string;
  color: string;
  icon: string;
  highlights: string[];
  quote: { text: string; author: string };
  keyFigures: string[];
  keyEvents: string[];
  achievements: string[];
  legacy: string;
  deepReading: EraDeepReading[];
}

export const ERAS: EraDetail[] = [
  {
    id: 'prehistoric',
    name: '远古时期',
    startYear: -300000,
    endYear: -3000,
    desc: '从智人在非洲诞生，到农业革命改写命运。这三十万年间，人类学会了用火、制造工具、走出非洲、创作岩画——每一步都为文明的诞生铺平了道路。',
    longDesc:
      '远古时期跨越了人类历史99%的时间。约30万年前，智人在非洲出现；约7万年前发生了"认知革命"，人类获得了抽象思维和复杂语言；约5万年前开始走出非洲，扩散到全球；约4万年前在欧洲与尼安德特人共存并创作了第一批洞窟壁画；约1万年前农业革命开启，人类从游猎走向定居。\n\n这段时间没有文字、没有国家、没有城市——但它塑造了我们的身体和大脑。我们的身体是为狩猎采集设计的：每天行走10-15公里，食物多样且季节性变化，社会组织以150人左右的小群体为单位（邓巴数）。农业革命改变了一切：人类开始依赖少数几种谷物，定居在固定地点，人口密度急剧增加，社会分工和等级制度出现。这是人类历史上最深刻的变革——也是许多现代疾病（龋齿、传染病、营养不良）的起源。',
    color: '#8B4513',
    icon: 'mdi:tent',
    highlights: ['智人诞生', '认知革命', '走出非洲', '洞窟壁画', '用火', '农业革命'],
    quote: { text: '我们拥有的是石器时代的身体与情感，却生活在信息时代。', author: '课程讲稿' },
    keyFigures: ['智人先祖'],
    keyEvents: ['智人诞生', '认知革命', '走出非洲', '农业革命', '苏美尔城邦'],
    achievements: ['控制用火', '语言和抽象思维', '洞窟壁画', '农业和畜牧业', '陶器和纺织', '最早的定居村落'],
    legacy: '远古时期塑造了人类的生物学基础和社会本能。我们的大脑、身体、语言能力和社交模式都源于这三十万年的演化。农业革命是人类命运的分水岭——从此人类不再是自然的一部分，而是开始改造自然。',
    deepReading: [
      {
        title: '《人类简史》',
        author: '尤瓦尔·赫拉利',
        titleEn: 'Sapiens: A Brief History of Humankind',
        year: 2011,
        note: '从认知革命到农业革命，宏观叙述人类早期演化。',
      },
      {
        title: '《枪炮、病菌与钢铁》',
        author: '贾雷德·戴蒙德',
        titleEn: 'Guns, Germs, and Steel',
        year: 1997,
        note: '解释为何农业革命在某些地区率先发生及其深远影响。',
      },
      {
        title: '《作茧自缚》',
        author: '詹姆斯·C·斯科特',
        titleEn: 'Against the Grain',
        year: 2017,
        note: '重新审视农业革命与早期国家形成的深层历史。',
      },
      {
        title: '《露西：人类的起源》',
        author: '唐纳德·约翰森 / 梅特兰·伊迪',
        titleEn: 'Lucy: The Beginnings of Humankind',
        year: 1981,
        note: '人类起源考古发现的经典叙述。',
      },
    ],
  },
  {
    id: 'classical',
    name: '古典时期',
    startYear: -3000,
    endYear: 500,
    desc: '帝国兴起，哲学诞生，丝绸之路连接东西方。文字的成熟使知识得以积累和传播，"轴心时代"的思想巨人们奠定了人类精神文明的基石。',
    longDesc:
      '古典时期是人类文明的第一个高峰期。苏美尔的楔形文字（约前3200年）、埃及的象形文字（约前3200年）、中国的甲骨文（约前1200年）相继成熟——文字的发明使知识可以跨越时间和空间传播，不再依赖口耳相传。第一批大帝国——阿卡德、波斯、亚历山大、秦汉、罗马——将广袤领土纳入统一治理，建立了法律、税收、道路和官僚系统。\n\n公元前800年至前200年间，中国、印度、希腊和波斯几乎同时出现了一批伟大的思想家——孔子、老子、苏格拉底、柏拉图、亚里士多德、释迦牟尼。德国哲学家雅斯贝尔斯将这一时期称为"轴心时代"。丝绸之路将东西方连接起来（前138年张骞出使西域），技术和思想沿商路流通。佛教从印度传入中国，希腊艺术影响了中亚的犍陀罗文化，罗马的奢侈品沿着丝路到达中国汉朝。',
    color: '#C8A951',
    icon: 'mdi:temple-hindu',
    highlights: ['帝国崛起', '轴心时代', '文字成熟', '宗教诞生', '丝绸之路', '法治萌芽'],
    quote: { text: '吾爱吾师，吾更爱真理。', author: '亚里士多德' },
    keyFigures: ['孔子', '苏格拉底', '释迦牟尼', '秦始皇', '凯撒', '亚历山大大帝'],
    keyEvents: ['埃及统一', '秦统一六国', '罗马帝国', '丝绸之路开通', '轴心时代'],
    achievements: ['文字系统', '成文法典', '帝国治理', '哲学和科学', '丝绸之路贸易', '宗教和伦理体系'],
    legacy: '古典时期奠定了人类文明的基本框架：文字、法律、帝国、哲学、宗教。轴心时代的思想至今仍是人类精神文明的基石。秦始皇建立的中央集权制度延续了两千年，罗马法至今仍是西方法律传统的基础。',
    deepReading: [
      {
        title: '《历史的起源与目标》',
        author: '卡尔·雅斯贝尔斯',
        titleEn: 'The Origin and Goal of History',
        year: 1949,
        note: '提出"轴心时代"概念的经典著作。',
      },
      {
        title: '《罗马帝国衰亡史》',
        author: '爱德华·吉本',
        titleEn: 'The History of the Decline and Fall of the Roman Empire',
        year: 1776,
        note: '罗马帝国从鼎盛到衰落的史诗级叙事。',
      },
      {
        title: '《丝绸之路新史》',
        author: '瓦莱丽·汉森',
        titleEn: 'The Silk Road: A New History',
        year: 2012,
        note: '基于考古证据重新审视丝绸之路的贸易与文化交流。',
      },
      {
        title: '《SPQR：古罗马史》',
        author: '玛丽·比尔德',
        titleEn: 'SPQR: A History of Ancient Rome',
        year: 2015,
        note: '从共和到帝制，重新讲述古罗马千年历史。',
      },
      {
        title: '《古代中国的思想世界》',
        author: '本杰明·史华兹',
        titleEn: 'The World of Thought in Ancient China',
        year: 1985,
        note: '先秦诸子思想的深度比较研究。',
      },
    ],
  },
  {
    id: 'medieval',
    name: '中世纪',
    startYear: 500,
    endYear: 1500,
    desc: '唐宋辉煌，伊斯兰黄金时代，蒙古帝国重塑欧亚。东西方走上不同道路，但通过丝绸之路和蒙古征服保持着深层联系。',
    longDesc:
      '中世纪绝非欧洲中心论者所谓的"黑暗时代"。唐朝的长安是世界上最大、最开放的城市之一，汇聚了波斯商人、日本遣唐使、阿拉伯旅行者。宋朝经济高度繁荣，发明了活字印刷，发展了火药武器和指南针航海，并出现了世界上最早的纸币"交子"。\n\n伊斯兰世界（750-1258年）在数学、天文学、医学和哲学上遥遥领先。巴格达的"智慧之家"翻译并保存了大量希腊、波斯、印度的学术著作。非洲的马里帝国富甲天下，曼萨·穆萨的麦加朝觐震动了整个地中海世界。蒙古帝国打通了欧亚大陆的交流通道——马可·波罗沿丝路来到中国，火药、印刷术、指南针等技术西传。到中世纪后期，文艺复兴的种子在意大利萌芽。',
    color: '#2D6A4F',
    icon: 'mdi:castle',
    highlights: ['宗教力量', '丝路繁荣', '蒙古征服', '文艺复兴前奏', '伊斯兰黄金时代', '四大发明传播'],
    quote: { text: '知识虽远在中国，亦当求之。', author: '阿拉伯谚语' },
    keyFigures: ['唐太宗', '成吉思汗', '穆罕默德', '伊本·西那', '曼萨·穆萨', '郑和'],
    keyEvents: ['唐朝建立', '阿拔斯王朝', '宋朝建立', '十字军东征', '蒙古帝国', '黑死病'],
    achievements: ['四大发明成熟', '伊斯兰科学黄金时代', '蒙古和平与欧亚交流', '唐诗宋词', '哥特式建筑', '大学制度起源'],
    legacy: '中世纪证明了文明不是单线发展的——唐宋、伊斯兰、西非、印度洋世界都有各自的辉煌。蒙古帝国在巨大破坏的同时打通了欧亚交流通道；中国的造纸、印刷、火药、指南针等技术经由这一网络西传，对文艺复兴和大航海时代起到了推动作用。',
    deepReading: [
      {
        title: '《中国科学技术史》',
        author: '李约瑟',
        titleEn: 'Science and Civilisation in China',
        year: 1954,
        note: '系统梳理中国古代科技成就及其对世界的影响。',
      },
      {
        title: '《伊斯兰：千年信仰与权力》',
        author: '乔纳森·布鲁姆 / 希拉·布莱尔',
        titleEn: 'Islam: A Thousand Years of Faith and Power',
        year: 2002,
        note: '伊斯兰文明黄金时代的全面介绍。',
      },
      {
        title: '《阿拉伯人眼中的十字军东征》',
        author: '阿敏·马卢夫',
        titleEn: 'The Crusades Through Arab Eyes',
        year: 1983,
        note: '从阿拉伯视角重新审视十字军东征。',
      },
      {
        title: '《成吉思汗与现代世界的形成》',
        author: '杰克·韦泽弗德',
        titleEn: 'Genghis Khan and the Making of the Modern World',
        year: 2004,
        note: '蒙古帝国对世界历史格局的深远影响。',
      },
      {
        title: '《剑桥中国隋唐史》',
        author: '崔瑞德',
        titleEn: 'The Cambridge History of China, Vol. 3',
        year: 1979,
        note: '唐宋政治、经济、文化的权威学术著作。',
      },
    ],
  },
  {
    id: 'earlyModern',
    name: '近代',
    startYear: 1500,
    endYear: 1800,
    desc: '大航海连接世界，科学革命颠覆认知，启蒙运动照亮前路。欧洲从文明边缘一跃成为世界主导力量，但也带来了殖民和奴役。',
    longDesc:
      '近代是世界历史的转折点。1492年哥伦布到达美洲、1498年达·伽马到达印度、1519-1522年麦哲伦环球航行——将各个大陆第一次连接在一起。"哥伦布大交换"重塑了全球生态：美洲的玉米、马铃薯养活了更多人口，旧大陆的天花、麻疹导致原住民人口减少了90%以上。\n\n科学革命彻底颠覆了人类对自然的认知：哥白尼的日心说、伽利略的望远镜观测、牛顿的万有引力定律——人类第一次用数学语言理解了自然界的运行规律。洛克、伏尔泰、卢梭的启蒙思想催生了美国独立和法国大革命。但光明的另一面是黑暗：殖民扩张摧毁了美洲原住民社会，大西洋奴隶贸易使约1250万非洲人被强行运往美洲。',
    color: '#1E3A5F',
    icon: 'mdi:sail-boat',
    highlights: ['大航海时代', '科学革命', '启蒙运动', '殖民扩张', '宗教改革', '文艺复兴'],
    quote: { text: '我思故我在。', author: '笛卡尔' },
    keyFigures: ['达芬奇', '牛顿', '哥伦布', '伽利略', '洛克', '伏尔泰', '卢梭'],
    keyEvents: ['古腾堡印刷术', '哥伦布发现新大陆', '宗教改革', '日心说', '牛顿力学', '美国独立', '法国大革命'],
    achievements: ['大航海连接全球', '科学革命方法论', '启蒙思想', '现代民主制度', '印刷术普及知识', '工业革命前奏'],
    legacy: '近代塑造了现代世界的框架：全球贸易体系、科学方法论、民主政治理念、资本主义经济。但也埋下了殖民主义、种族主义和环境破坏的种子。',
    deepReading: [
      {
        title: '《作为变革动因的印刷术》',
        author: '伊丽莎白·爱森斯坦',
        titleEn: 'The Printing Press as an Agent of Change',
        year: 1979,
        note: '印刷术如何推动宗教改革和科学革命。',
      },
      {
        title: '《哥伦布大交换》',
        author: '阿尔弗雷德·克罗斯比',
        titleEn: 'The Columbian Exchange',
        year: 1972,
        note: '新旧大陆之间的物种、疾病和文化交换。',
      },
      {
        title: '《政府论》',
        author: '约翰·洛克',
        titleEn: 'Two Treatises of Government',
        year: 1689,
        note: '启蒙思想的基石，影响了美国独立宣言。',
      },
      {
        title: '《1491：哥伦布之前的美洲》',
        author: '查尔斯·C·曼',
        titleEn: '1491: New Revelations of the Americas Before Columbus',
        year: 2005,
        note: '颠覆对哥伦布之前美洲文明的认知。',
      },
      {
        title: '《大西洋奴隶贸易》',
        author: '赫伯特·S·克莱因',
        titleEn: 'The Atlantic Slave Trade',
        year: 1999,
        note: '大西洋奴隶贸易的规模、结构和影响。',
      },
    ],
  },
  {
    id: 'modern',
    name: '现代',
    startYear: 1800,
    endYear: 1945,
    desc: '工业革命改变世界，两次大战重塑格局。蒸汽机、电力、内燃机彻底改变了生产方式和社会结构，民族主义和帝国主义将世界推向战争深渊。',
    longDesc:
      '现代时期是人类变革最剧烈的时代。从英国开始的工业革命将人类从农业社会推入工业社会——蒸汽机、铁路、电报、电力、内燃机彻底改变了生产方式、交通方式和通信方式。城市化率从不到20%飙升到超过50%。\n\n帝国主义列强在19世纪末瓜分了整个非洲和大部分亚洲。两次世界大战是人类历史上最惨烈的冲突：一战造成约1500万-2000万人死亡，四大帝国解体；二战造成约7000万-8500万人死亡，纳粹大屠杀系统屠杀了约600万犹太人。核武器的问世使人类第一次拥有了自我毁灭的能力。中国经历了从鸦片战争到抗日战争的百年屈辱，也在探索中寻找复兴之路。',
    color: '#8B1A1A',
    icon: 'mdi:factory',
    highlights: ['工业革命', '帝国主义', '两次大战', '民族觉醒', '共产主义', '核武器'],
    quote: { text: '哲学家们只是用不同的方式解释世界，而问题在于改变世界。', author: '卡尔·马克思' },
    keyFigures: ['拿破仑', '爱因斯坦', '马克思', '达尔文', '居里夫人', '毛泽东', '图灵'],
    keyEvents: ['海地独立', '鸦片战争', '明治维新', '一战爆发', '十月革命', '二战爆发'],
    achievements: ['工业革命', '现代科学体系', '现代医学', '通信和交通革命', '民族独立运动', '联合国成立'],
    legacy: '现代时期创造了我们今天生活的世界：工业化、城市化、全球化、民族国家体系、国际组织。但也留下了核武器、环境破坏、贫富差距和殖民遗产。',
    deepReading: [
      {
        title: '《大国的兴衰》',
        author: '保罗·肯尼迪',
        titleEn: 'The Rise and Fall of the Great Powers',
        year: 1987,
        note: '五百年来大国兴衰的经济与军事逻辑。',
      },
      {
        title: '《资本论》',
        author: '卡尔·马克思',
        titleEn: 'Das Kapital',
        year: 1867,
        note: '对资本主义生产方式的经典批判。',
      },
      {
        title: '《21世纪资本论》',
        author: '托马斯·皮凯蒂',
        titleEn: 'Capital in the Twenty-First Century',
        year: 2013,
        note: '用数据揭示两百年来财富不平等的演变。',
      },
      {
        title: '《梦游者：1914年欧洲如何走向战争》',
        author: '克里斯托弗·克拉克',
        titleEn: 'The Sleepwalkers',
        year: 2012,
        note: '重新审视一战爆发的复杂因果链。',
      },
      {
        title: '《棉花帝国》',
        author: '斯文·贝克特',
        titleEn: 'Empire of Cotton',
        year: 2014,
        note: '以棉花为线索讲述资本主义全球扩张史。',
      },
    ],
  },
  {
    id: 'contemporary',
    name: '当代',
    startYear: 1945,
    endYear: 2025,
    desc: '冷战与和平，信息爆炸，全球化与人工智能。人类登上了月球，也制造了核恐惧；互联网连接了世界，也带来了新的分裂。',
    longDesc:
      '当代是变化速度最快的时代。美苏冷战主导了半个世纪的地缘政治——核威慑下的"恐怖和平"维持至今。殖民体系瓦解，100多个新独立国家诞生。\n\n技术革命以指数级速度推进：1957年苏联发射第一颗人造卫星，1969年美国登月，1989年万维网发明，2007年iPhone发布，2023年ChatGPT引爆AI革命。中国从一穷二白崛起为世界第二大经济体——这是人类历史上最大规模的经济奇迹。但当代也面临前所未有的挑战：气候变化、核武器扩散、贫富差距、人工智能的伦理和安全问题。',
    color: '#4A148C',
    icon: 'mdi:earth',
    highlights: ['冷战对峙', '信息时代', '全球化', 'AI革命', '中国崛起', '气候变化'],
    quote: { text: '我们是能够终结贫困的第一代人，也是能够遏止气候变化的最后一代人。', author: '潘基文' },
    keyFigures: ['毛泽东', '邓小平', '曼德拉', '马丁·路德·金', '乔布斯', '屠呦呦'],
    keyEvents: ['二战结束', '新中国成立', '人类登月', '改革开放', '柏林墙倒塌', '苏联解体', 'AI大爆发'],
    achievements: ['登月', '互联网和万维网', '全球化贸易', '人类基因组测序', 'AI革命', '可再生能源'],
    legacy: '当代的历史仍在书写中。我们正站在一个十字路口：技术可以让人类成为星际物种、消除贫困和疾病，也可能带来AI失控、气候灾难和核战争。',
    deepReading: [
      {
        title: '《历史的终结？》',
        author: '弗朗西斯·福山',
        titleEn: 'The End of History?',
        year: 1989,
        note: '冷战结束后对自由民主制度前景的思考。',
      },
      {
        title: '《文明的冲突》',
        author: '塞缪尔·亨廷顿',
        titleEn: 'The Clash of Civilizations',
        year: 1996,
        note: '后冷战时代文明冲突的理论框架。',
      },
      {
        title: '《冷战：一部世界史》',
        author: '文安立',
        titleEn: 'The Cold War: A World History',
        year: 2017,
        note: '从全球视角审视冷战的起因、进程和影响。',
      },
      {
        title: '《邓小平时代》',
        author: '傅高义',
        titleEn: 'Deng Xiaoping and the Transformation of China',
        year: 2011,
        note: '改革开放如何重塑中国与世界。',
      },
      {
        title: '《全球化悖论》',
        author: '丹尼·罗德里克',
        titleEn: 'The Globalization Paradox',
        year: 2011,
        note: '全球化、民主和国家主权之间的深层矛盾。',
      },
    ],
  },
  {
    id: 'future',
    name: '未来展望',
    startYear: 2025,
    endYear: 2100,
    desc: '人工智能、太空探索、气候行动将定义人类的下一个篇章。我们站在历史的十字路口——技术可以让人类成为星际物种，也可能带来存亡危机。',
    longDesc:
      '未来不是注定的，而是由今天的选择塑造。通用人工智能（AGI）可能在2030-2050年间实现，彻底改变经济、教育、科研的方式。气候变化要求人类在2050年前实现碳中和——这需要彻底改变能源系统、交通方式和工业生产。\n\n基因编辑（CRISPR）、量子计算、核聚变、脑机接口等技术可能带来突破。太空探索从月球基地延伸到火星殖民。但风险同样巨大：AI失控、气候灾难、地缘冲突、生物威胁、基因编辑的伦理问题。人类能否驾驭自己创造的力量，是这个世纪最大的考验。',
    color: '#00897B',
    icon: 'mdi:rocket-launch',
    highlights: ['AGI时代', '碳中和', '火星殖民', '基因编辑', '量子计算', '星际文明'],
    quote: { text: '预测未来的最好方式是创造它。', author: '艾伦·凯' },
    keyFigures: ['马斯克'],
    keyEvents: ['AGI预期', '碳中和关键节点', '基因编辑时代', '量子计算突破', '火星殖民'],
    achievements: ['（预期）AGI实现', '（预期）碳中和', '（预期）火星殖民', '（预期）核聚变商业化'],
    legacy: '未来的历史正在由今天的选择书写。21世纪可能是人类文明最伟大的世纪——也可能是最后一个世纪。',
    deepReading: [
      {
        title: '《AI·未来》',
        author: '李开复',
        titleEn: 'AI Superpowers: China, Silicon Valley, and the New World Order',
        year: 2018,
        note: '人工智能对全球格局和就业的深远影响。',
      },
      {
        title: '《改变一切：资本主义与气候》',
        author: '娜奥米·克莱因',
        titleEn: 'This Changes Everything: Capitalism vs. the Climate',
        year: 2014,
        note: '气候变化与经济体系的深层矛盾。',
      },
      {
        title: '《灾变手记》',
        author: '伊丽莎白·科尔伯特',
        titleEn: 'Field Notes from a Catastrophe',
        year: 2006,
        note: '气候变化现场报道与科学证据。',
      },
      {
        title: '《不平等社会》',
        author: '沃尔特·沙伊德尔',
        titleEn: 'The Great Leveler',
        year: 2017,
        note: '从石器时代到未来，暴力与灾难如何塑造不平等。',
      },
    ],
  },
];

export const ERA_SLUGS = ERAS.map((era) => era.id);

export function getEraBySlug(slug: string): EraDetail | undefined {
  return ERAS.find((era) => era.id === slug);
}

export function getAdjacentEras(slug: string): {
  prev: EraDetail | null;
  next: EraDetail | null;
} {
  const idx = ERAS.findIndex((era) => era.id === slug);
  return {
    prev: idx > 0 ? ERAS[idx - 1]! : null,
    next: idx < ERAS.length - 1 ? ERAS[idx + 1]! : null,
  };
}
