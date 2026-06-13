import type { Curiosity } from "@/lib/curiosities";

export const PSYCHOLOGY_CURIOSITIES: Curiosity[] = [
  {
    id: "cocktail-party-effect",
    title: "在嘈杂的派对里，你能瞬间「听见」有人提到你的名字",
    detail:
      "「鸡尾酒会效应」：大脑在过滤背景噪声时，仍对高度相关的信号（尤其是自己的名字）保持监控。这说明你的注意力并没有真正「关掉」那些被忽略的声音。",
    source: "Cherry (1953)",
    tags: ["注意力", "听觉"],
    url: "/psychology/phenomena",
  },
  {
    id: "blind-spot",
    title: "你的每只眼睛都有一个看不见的「洞」，但大脑替你补上了",
    detail:
      "视神经穿过视网膜的地方没有感光细胞，形成生理盲点。你平时察觉不到，是因为大脑用周围信息「脑补」了缺失的部分——你看到的世界，有一部分是被编造出来的。",
    tags: ["知觉", "盲点"],
    url: "/psychology/phenomena/perception",
  },
  {
    id: "tip-of-tongue",
    title: "「话到嘴边却想不起来」是一种可被实验稳定诱发的现象",
    detail:
      "「舌尖现象」(tip-of-the-tongue) 中，你能记得词的首字母、音节数甚至意思，就是调不出那个词。它揭示了记忆「提取」和「储存」是两套可以分离的过程。",
    source: "Brown & McNeill (1966)",
    tags: ["记忆", "提取"],
    url: "/psychology/phenomena/memory-systems",
  },
  {
    id: "anchoring-effect",
    title: "你看到的第一个数字，会悄悄拉偏你所有后续的判断",
    detail:
      "Tversky 与 Kahneman 经典实验：转盘随机停在 10 或 65，随后让人估算「联合国里非洲国家的比例」——结果停在 10 的人平均猜 25%，停在 65 的人平均猜 45%。这个随机数字毫无信息价值，却锚定了判断。锚定效应已在 200 余个实验室中重复验证，即使明确告知数字是随机的也无法消除。",
    source: "Tversky & Kahneman, Science (1974)",
    tags: ["认知偏误", "判断", "启发式"],
    url: "/psychology",
  },
  {
    id: "inattentional-blindness",
    title: "专注计数的人，有一半看不见从眼前走过的大猩猩",
    detail:
      "1999 年西蒙斯与夏布里斯让参与者专注计数视频中的传球次数，一个身穿猩猩服装的人慢慢穿越球场——约 50% 的参与者完全没有注意到。「非注意性盲视」证明注意力不是摄像机，而是一盏聚光灯：灯光之外，再显眼的事物也可能彻底消失。",
    source: "Simons & Chabris, Perception (1999)",
    tags: ["注意力", "视觉感知", "非注意性盲视"],
    url: "/psychology",
  },
  {
    id: "mere-exposure-effect",
    title: "只要见过，就会更喜欢：单纯接触就能改变好感度",
    detail:
      "Zajonc 1968 年的研究发现，将陌生汉字、无意义单词或照片重复展示给参与者，他们对这些刺激的好感度会随接触次数增加——即便完全不记得曾经看过。这一「单纯曝光效应」已被超过 200 项研究重复，效果量稳定（r ≈ 0.26），是心理学中最可靠的发现之一。",
    source: "Zajonc (1968); Bornstein meta-analysis (1989)",
    tags: ["态度", "偏好", "接触"],
    url: "/psychology",
  },
  {
    id: "false-memory-implant",
    title: "研究者可以让 25–35% 的人「记起」从未发生过的童年经历",
    detail:
      "Elizabeth Loftus 的「商场迷路」实验通过虚假家庭叙述成功在参与者记忆中植入了一段从未发生的儿时经历，约 25% 的人不仅接受了这段记忆，还补充了细节。近期重复实验将比例提高到 35%。记忆不是录像而是重构，每次提取都可能被修改。",
    source: "Loftus & Pickrell (1995); Murphy et al. replication (2023)",
    tags: ["错误记忆", "记忆可塑性", "目击证词"],
    url: "/psychology",
  },
  {
    id: "serial-position-effect",
    title: "一份清单里，你最容易记住的是开头和结尾，中间几乎全都忘了",
    detail:
      "「序列位置效应」包含两个经典规律：列表开头的词因有充分时间进入长时记忆而被记住（首因效应），结尾的词因还在短时记忆中而被记住（近因效应），中间部分两头不靠因此记忆最差。这一效应在不同语言、年龄和材料中均稳定重现，是记忆研究中最可靠的实验现象之一。",
    source: "Murdock (1962); Glanzer & Cunitz (1966)",
    tags: ["记忆", "序列位置", "长短时记忆"],
    url: "/psychology",
  },
  {
    id: "sunk-cost-fallacy",
    title: "已经花出去的钱，理性上不该影响你的下一步决策——但它总是影响",
    detail:
      "Arkes 与 Blumer 1985 年的系列实验确认了「沉没成本谬误」：人们倾向于继续一项亏损的投资，仅仅因为已经投入了资源。这一偏误与「损失厌恶」（损失带来的心理冲击约是同等收益的两倍）密切相关，在跨文化、跨物种（包括鸽子和大鼠）实验中均有发现。",
    source: "Arkes & Blumer, Organizational Behavior & Human Decision Processes (1985)",
    tags: ["决策", "损失厌恶", "沉没成本"],
    url: "/psychology",
  },
  {
    id: "dunning-kruger-caveat",
    title: "「越无知越自信」：这个直觉并非无中生有，但也远比流行说法复杂",
    detail:
      "Dunning 和 Kruger 1999 年发现技能最差的人往往高估自己的能力。然而近年来多位研究者指出，该效应在统计上至少部分源于「向均值回归」的数学必然性，而非纯粹的心理现象。真正稳健的发现是：人们普遍难以准确自我评估，高手倾向于低估自己，新手倾向于高估，但具体机制仍有争论。",
    source: "Kruger & Dunning (1999); Gignac & Zajenkowski (2020); Nuhfer et al. (2016)",
    tags: ["元认知", "自我评估", "达克效应"],
    url: "/psychology",
  },
  {
    id: "change-blindness",
    title: "即使物体就在眼前改变，你也可能完全察觉不到",
    detail:
      "「变化盲视」实验中，实验者与参与者交谈时假装弯腰取东西，趁机换成另一个人继续对话——约 50% 的参与者没有发现对面的人换了。视觉系统并不会连续存储完整的场景，而是按需提取，这意味着巨大的视觉变化只要发生在注意力转移的间隙，就会被彻底错过。",
    source: "Simons & Levin, Psychonomic Bulletin & Review (1998)",
    tags: ["知觉", "视觉", "注意力"],
    url: "/psychology",
  },
  {
    id: "verbal-overshadowing",
    title: "用语言描述一张脸之后，你识别这张脸的准确率反而下降",
    detail:
      "Schooler 和 Engstler-Schooler 1990 年发现，目击者在描述犯罪嫌疑人面孔后，辨认成功率显著低于没有描述过的对照组——语言描述似乎覆盖了大脑中精细的视觉记忆。这一「言语遮蔽效应」对司法实践有直接影响，并在多次独立研究中得到重复。",
    source: "Schooler & Engstler-Schooler, Cognitive Psychology (1990)",
    tags: ["目击证词", "记忆", "言语"],
    url: "/psychology",
  },
  {
    id: "bystander-effect",
    title: "旁观者越多，每个人出手相救的可能性反而越低",
    detail:
      "Darley 与 Latané 1968 年的实验让参与者听到隔壁有人「癫痫发作」：当参与者相信自己是唯一听到的人时，85% 会立刻求助；当他们认为还有四个人也听到时，只有 31% 作出反应。「旁观者效应」的机制包括责任分散（「别人会管的」）和社会比较（「别人都没动，也许没事」）。",
    source: "Darley & Latané, Journal of Personality and Social Psychology (1968)",
    tags: ["社会影响", "旁观者效应", "责任分散"],
    url: "/psychology",
  },
  {
    id: "peak-end-rule",
    title: "你对一段经历的记忆，几乎完全由最痛苦的瞬间和最后的感受决定",
    detail:
      "Kahneman 等人发现，人们对一段体验（如结肠镜检查或冷水实验）的整体评价，主要由「峰值」（最强烈的感受）和「末值」（结束时的感受）决定，持续时间几乎不影响评价——这被称为「峰末定律」。在结肠镜实验中，增加几分钟不适但程度稍低的尾段，反而让患者总体感觉更好。",
    source: "Kahneman et al., Psychological Science (1993)",
    tags: ["体验效用", "记忆", "峰末定律"],
    url: "/psychology",
  },
  {
    id: "facial-feedback-nuance",
    title: "咬着笔微笑真的能让漫画更好笑——但这个效应比想象的更脆弱",
    detail:
      "Strack 等人 1988 年的经典实验发现，用牙齿（非嘴唇）咬笔会调动微笑肌肉，从而让参与者觉得卡通更有趣。2016 年 17 个实验室联合重复实验失败，引发轩然大波；但汇总 138 项研究的元分析仍发现统计显著的小效应，研究者后来发现「被摄像机监视」会消除该效应。目前的共识：面部反馈真实存在，但效果微弱、对情境敏感，远非铁律。",
    source:
      "Strack et al. (1988); Wagenmakers et al. replication (2016); Coles et al. meta-analysis (2022)",
    tags: ["情绪", "具身认知", "面部反馈"],
    url: "/psychology",
  },
  {
    id: "availability-heuristic",
    title: "你认为「更容易想起」的事情，就会判断为更常见——哪怕实际上并非如此",
    detail:
      "Tversky 和 Kahneman 发现，人们用「脑中能否轻松搜索到例子」来判断某类事件的频率。这导致空难死亡（媒体报道多、画面冲击强）感觉比汽车事故更危险，尽管后者致死率高得多。「可得性启发」在跨文化、跨年龄段的研究中均有稳定体现。",
    source: "Tversky & Kahneman, Cognitive Psychology (1973)",
    tags: ["启发式", "风险感知", "认知偏误"],
    url: "/psychology",
  },
  {
    id: "embodied-number-line",
    title: "人类天生把小数字联想到左边、大数字联想到右边",
    detail:
      "「SNARC 效应」（数字空间联想反应编码效应）：在双手反应任务中，小数字（如 1、2）按左键更快，大数字（如 8、9）按右键更快，即使任务与大小完全无关。这一效应在欧洲语言使用者中稳定重现，但在从右往左书写语言的使用者（如阿拉伯语）中方向常常反转，说明数字空间是文化可塑的。",
    source: "Dehaene, Bossini & Giraux, Journal of Experimental Psychology (1993)",
    tags: ["具身认知", "数字", "空间"],
    url: "/psychology",
  },
  {
    id: "illusion-of-explanatory-depth",
    title: "你以为自己懂拉链，直到有人让你解释它是如何工作的",
    detail:
      "Rozenblit 和 Keil 2002 年的实验请参与者先评估对日常物品（抽水马桶、直升机、拉链）的理解深度，再要求逐步写出工作机制，最后重新评分——几乎所有人都大幅调低了自己的评分。「解释深度错觉」表明，我们常常把「见过某物能运作」误认为「理解其原理」。",
    source: "Rozenblit & Keil, Behavioral and Brain Sciences (2002)",
    tags: ["元认知", "知识错觉", "理解"],
    url: "/psychology",
  },
];
