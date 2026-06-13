import type { Curiosity } from "@/lib/curiosities";

export const COMPUTER_SCIENCE_CURIOSITIES: Curiosity[] = [
  {
    id: "first-programmer-1840s",
    title: "世界上第一位程序员，生活在还没有计算机的 19 世纪",
    detail:
      "阿达·洛夫莱斯在 1843 年为巴贝奇的「分析机」写下了被公认为最早的算法，还预见到机器有朝一日能创作音乐——这台机器当时根本没造出来。她去世一个多世纪后，第一台电子计算机才诞生。",
    source: "Lovelace 对分析机的注释 (1843)",
    tags: ["阿达·洛夫莱斯", "算法"],
    url: "/computer-science/pioneers/ada-lovelace",
  },
  {
    id: "at-sign-email-1971",
    title: "电子邮件里的「@」是 1971 年一个人随手选的",
    detail:
      "Ray Tomlinson 发明跨主机邮件时，需要一个分隔「用户」与「主机」的符号。他扫了一眼键盘，挑了几乎没人用的「@」——因为它本来就有「at（在）」的意思。如今它遍布全球。",
    tags: ["电子邮件", "符号"],
    url: "/computer-science",
  },
  {
    id: "halting-problem-undecidable",
    title: "没有任何程序能判断「任意程序是否会停机」",
    detail:
      "这不是工程难题，而是图灵 1936 年证明的逻辑铁律：停机问题是「不可判定的」。它意味着软件正确性存在原则性的边界——这是计算机科学的第一个、也是最深刻的「不可能」。",
    source: "Turing (1936)",
    tags: ["停机问题", "可计算性"],
    url: "/computer-science/theory/computability",
  },
  {
    id: "null-reference-billion-dollar-mistake",
    title: "「空指针」的发明者亲口称它是自己「价值十亿美元的错误」",
    detail:
      "托尼·霍尔 1965 年设计 ALGOL W 时引入了 null 引用，因为「实现起来太容易了」。2009 年他在演讲中公开道歉，估算由此引发的系统崩溃、安全漏洞和维护成本已超过十亿美元。如今 Rust、Kotlin 等语言将「消灭 null」作为核心设计目标。",
    source: "Tony Hoare, QCon London 2009",
    tags: ["编程语言", "Bug", "软件工程"],
    url: "/computer-science",
  },
  {
    id: "morris-worm-first-internet-worm",
    title: "1988 年一个研究生「只是想测试一下」，结果让早期互联网瘫痪了三天",
    detail:
      "罗伯特·莫里斯释放的蠕虫在 24 小时内感染了约 6000 台联网计算机（当时全球互联网约有 6 万台主机）。这是第一个获得主流媒体广泛关注的网络蠕虫，也导致了美国《计算机欺诈与滥用法》下的第一次重罪定罪。",
    source: "FBI; Morris Worm, November 2, 1988",
    tags: ["网络安全", "历史", "蠕虫"],
    url: "/computer-science",
  },
  {
    id: "git-created-in-ten-days",
    title: "全世界最流行的版本控制系统，是 Linus Torvalds 用约 10 天写出来的",
    detail:
      "2005 年 4 月，Linux 内核团队失去了 BitKeeper 的免费授权。Torvalds 决定自己动手，从零开始写 Git。第一次提交时间为 2005 年 4 月 7 日，仅 10 天后代码已可以自我托管。如今 Git 每天被数千万开发者使用。",
    source: "git.kernel.org; first commit April 7, 2005",
    tags: ["Git", "开源", "Linux"],
    url: "/computer-science",
  },
  {
    id: "sha1-collision-shattered",
    title: "谷歌用九百京次哈希运算，终于「撞」出了两份内容不同但签名相同的 PDF",
    detail:
      "2017 年，谷歌与 CWI 宣布完成 SHA-1 的第一次实际碰撞攻击（SHAttered），耗费约 6500 CPU 年和 110 GPU 年的算力。这直接宣告了 SHA-1 的死亡——浏览器、证书机构和 Git 随即停止接受 SHA-1 签名。",
    source: "shattered.io; Google Security Blog, February 23, 2017",
    tags: ["密码学", "哈希", "安全"],
    url: "/computer-science",
  },
  {
    id: "ariane-5-integer-overflow",
    title: "一行把 64 位浮点数强转成 16 位整数的代码，炸毁了价值 3.7 亿美元的火箭",
    detail:
      "1996 年 6 月 4 日，阿丽亚娜 5 号火箭升空 37 秒后自毁。调查发现根本原因是一段从 Ariane 4 复用的代码在 Ariane 5 更高速度下产生整数溢出，触发惯性导航系统关闭并输出错误数据。整个开发中没有人重新检查这段遗留代码的适用范围。",
    source: "Ariane 5 Flight 501 Inquiry Board Report (1996)",
    tags: ["软件工程", "Bug", "航天"],
    url: "/computer-science",
  },
  {
    id: "therac-25-race-condition",
    title: "一个竞态条件，让放射治疗仪给病人照射了正常剂量 250 倍的辐射",
    detail:
      "1985—1987 年，Therac-25 医疗加速器因软件竞态条件造成至少 3 人死亡。操作员若输入命令过快，安全检查会被跳过，机器切换到高功率模式却不配合相应的物理遮挡。此前版本依赖硬件联锁；新版本将安全全部交给未经严格测试的软件。",
    source: "Leveson & Turner, IEEE Computer, 1993",
    tags: ["软件工程", "Bug", "医疗"],
    url: "/computer-science",
  },
  {
    id: "dijkstra-algorithm-twenty-minutes",
    title: "Dijkstra 最短路径算法，是他和未婚妻在阿姆斯特丹咖啡馆里用 20 分钟想出来的",
    detail:
      "1956 年某天上午，Dijkstra 带着未婚妻在阿姆斯特丹逛街，两人坐下喝咖啡时，他突然想到了最短路径算法的核心思路。他甚至没有带纸和笔——正是这种约束让他避免了多余的复杂性。论文在 1959 年才发表于《数值数学》期刊。",
    source: "Dijkstra's own account; Numerische Mathematik (1959)",
    tags: ["算法", "图论", "Dijkstra"],
    url: "/computer-science",
  },
  {
    id: "diffie-hellman-public-key",
    title: "「两个人在公开信道上协商出一把只有他们知道的密钥」——这在 1976 年之前被认为是不可能的",
    detail:
      "Diffie 与 Hellman 1976 年在《密码学新方向》中首次公开提出公钥密码学概念。在此之前，安全通信必须提前秘密交换密钥，这在大规模网络中几乎无法实现。他们的思想奠定了今天所有 HTTPS、TLS 安全连接的数学基础。",
    source: "Diffie & Hellman, 'New Directions in Cryptography' (1976)",
    tags: ["密码学", "公钥", "互联网安全"],
    url: "/computer-science",
  },
  {
    id: "cobol-atm-transactions",
    title: "你每次在 ATM 取款时，大概率正在运行一段 60 多年前写的 COBOL 代码",
    detail:
      "全球约 95% 的 ATM 交易、每日超过 3 万亿美元的银行清算，仍然运行在 COBOL 代码上。这门语言诞生于 1959 年，其原始设计者之一是格蕾丝·霍珀——也就是发现第一只「计算机 bug」的那位。",
    source: "Reuters; CAST Software industry reports",
    tags: ["编程语言", "历史", "银行"],
    url: "/computer-science",
  },
  {
    id: "first-computer-bug-moth",
    title: "「计算机 bug」这个词，来自一只真实的飞蛾",
    detail:
      "1947 年 9 月 9 日，格蕾丝·霍珀的团队在哈佛 Mark II 计算机的继电器里发现了一只死飞蛾，将其粘贴在工作日志上，注明「发现第一个真正的 bug」。虽然「bug」用于描述技术故障早于此，但这个事件让这个词在计算机领域流传至今。",
    source: "Smithsonian National Museum of American History; logbook entry Sept. 9, 1947",
    tags: ["历史", "Bug", "格蕾丝·霍珀"],
    url: "/computer-science",
  },
  {
    id: "nan-not-equal-itself",
    title: "在所有编程语言里，有一个值与任何值都不相等——包括它自己",
    detail:
      "IEEE 754 浮点标准规定，NaN（非数字）与任何值的比较均返回 false，包括 NaN == NaN。这是标准中经过深思熟虑的设计：NaN 可能来自不同的无效运算，不应假定它们「相同」。因此，检测 NaN 的唯一可靠方法是用专用函数（如 isNaN()），而不是等号比较。",
    source: "IEEE 754-2008 standard",
    tags: ["浮点数", "IEEE 754", "编程"],
    url: "/computer-science",
  },
  {
    id: "lempel-ziv-compression-universal",
    title: "几乎所有你用的压缩格式（ZIP、GIF、PNG……）都藏着同一对以色列人的算法",
    detail:
      "Lempel 与 Ziv 1977 年（LZ77）和 1978 年（LZ78）发表的两篇论文，奠定了无损压缩的理论基础。此后的 DEFLATE（ZIP/PNG）、GIF、zlib 等算法均以 LZ 变体为核心。这两篇论文在发表时几乎无人在意，却成为数字时代最被广泛使用的算法之一。",
    source: "Lempel & Ziv, IEEE Trans. Inf. Theory (1977, 1978)",
    tags: ["算法", "压缩", "信息论"],
    url: "/computer-science",
  },
  {
    id: "heartbleed-missing-bounds-check",
    title: "一行缺失的边界检查，让全球三分之二的 HTTPS 网站同时泄露内存数据长达两年",
    detail:
      "Heartbleed（CVE-2014-0160）是 OpenSSL 心跳扩展中一个缺少长度校验的漏洞：攻击者可以请求服务器「回显」最多 64KB 的内存内容，其中可能包含私钥、密码、会话令牌。漏洞在代码里悄悄存在了约两年，影响全球超过 66% 的 HTTPS 服务器。",
    source: "CISA CVE-2014-0160; heartbleed.com (2014)",
    tags: ["安全", "漏洞", "OpenSSL"],
    url: "/computer-science",
  },
  {
    id: "tcp-ip-cerf-kahn-1974",
    title: "今天整个互联网运行的协议，由两个人在 1974 年的一篇 19 页论文里描述完毕",
    detail:
      "Vint Cerf 与 Bob Kahn 1974 年发表《数据包网络互联协议》，提出了 TCP 的完整框架。这篇论文解决了「不同网络如何互联互通」的核心难题，使今天的互联网成为可能。两人因此获得 2004 年图灵奖。",
    source: "Cerf & Kahn, IEEE Trans. Commun. (1974); ACM Turing Award 2004",
    tags: ["互联网", "TCP/IP", "协议"],
    url: "/computer-science",
  },
  {
    id: "spacewar-first-influential-video-game",
    title: "史上第一款有广泛影响力的电子游戏，诞生于 1962 年的 MIT，从未有人从它身上赚到一分钱",
    detail:
      "史蒂夫·拉塞尔等人 1962 年在 PDP-1 上开发的《Spacewar!》被誉为第一款真正意义上的电子游戏。它在早期研究计算机之间广泛流传，启发了后来的《小行星》《乒乓》等商业游戏，却从未被商业化——作者们认为它应该免费分享。",
    source: "Computer History Museum; Smithsonian Magazine",
    tags: ["游戏历史", "MIT", "PDP-1"],
    url: "/computer-science",
  },
];
