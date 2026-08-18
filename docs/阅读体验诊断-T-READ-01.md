# 阅读体验诊断（T-READ-01 · 2026-08-16）

> 诊断方式：代码审查 + `pnpm dev` 真实 HTML 抓取 + Playwright 双主题/移动端截图三方验证。只报告有实证的问题。
> 本文件是「阅读体验轮」的工作文档：诊断 → 首批打磨清单 → 后续轮次队列。已完成项会标注。

## 总体判断

呈现层骨架（单 h1 大纲、wiki 链+预览、脚注回跳、打印、双主题 token）经 T-UX-05~16 已相当扎实。当前差距集中在三点：

1. **默认行长违背中文长文阅读基本盘**（标准模式 59–75 字/行，舒适区 30–45）；
2. **阅读三件套（模式/进度条/TOC）覆盖不均**，近半数文章路由是「二等公民」；
3. **内容层精心做的语义结构（导读/文献/跨域）在呈现层没有被翻译成视觉语言**。

## 诊断发现（按读者旅程，15 条）

### A. 进入文章

1. **页头无导读/摘要（中）**：frontier 文章的 `excerpt`（`lib/frontier.ts:111-123` 自动生成）只进 `<meta>`，页面从不渲染（`components/frontier/FrontierArticleView.tsx:72-91`）。115 篇 frontier 的现成导读被浪费。
2. **哲学 questions 页头「关键人物」渲染英文 id（中）**：`app/philosophy/questions/[slug]/page.tsx:80-82` 把 `key_figures` 的 id（`parfit,benatar…`）原样显示，正文第一句却是中文名。
3. **移动端面包屑长标题重叠破碎（高）**：`components/Breadcrumb.tsx:57-72` items 变体外层 span 缺 `min-w-0`，`truncate` 失效；390px 实测字形重叠。影响全部引擎域 + frontier 文章页。

### B. 正文阅读

4. **标准模式行长过长（高）**：`ArticleLayout.tsx:81` 默认 `max-w-[1200px]`，1440px 视口实测正文栏 944px ≈ 59 汉字/行；`DomainArticle`/`FrontierArticleView` 显式 900px ≈ 56 字/行。专注模式存在但需读者主动发现。
5. **引用块对中文强制斜体（中）**：`MarkdownRenderer.tsx:138` blockquote 内 `italic`。CJK 无真斜体，深主题发虚、浅主题 LXGW 楷体被扭斜。
6. **脚注定义块被当正文重复渲染（中）**：`MarkdownRenderer.tsx:48-63` 块循环不过滤 `[^id]:` 定义块，正文末尾出现孤立重复段落 + **重复 id `fnref-*`**（a11y 缺陷）。63 个内容文件含脚注。
7. **h2 节边界感偏弱（低）**：仅 `mt-8 mb-3 text-[1.25rem]`，长文章节间呼吸感不足。
8. **标题无锚点 permalink（低）**：h2/h3 有 id 但无悬停 `#`，无法复制节深链。

### C. 阅读辅助覆盖不均

9. **三件套只覆盖 ArticleLayout 系（高）**：数学 5 板块、哲学 thinkers/schools、生命科学 species/scientists/kb/timeline、宇宙物理 kb/dialogues 缺 `ReadingModeControls` 与 `ReadingProgressBar`；其中哲学 thinkers、数学 concepts/paradoxes/dialogues、生命科学 kb、宇宙物理 kb **连 TOC 都没有**。T-UX-05 当年「铺开至全部 60+ 文章页」的记录与现状不符——只铺到了 ArticleLayout 系。
10. **移动端 TOC 浮动按钮与 NarrationPlayer 底栏冲突（低）**：`TableOfContents.tsx:140`（`bottom-6 left-4 z-40`）被 `NarrationPlayer.tsx:105` 整宽底栏（`z-[480]`）盖住。仅影响有 narration 的 CS kb 页。
11. **wiki 预览首次交互拉取 915KB JSON（中）**：`MarkdownInteractions.tsx:11-20` 首次悬停 fetch 整个 `/link-previews.json`（915KB raw / 344KB gzip）。移动端弱网首点延迟明显。懒加载方向对，单文件粒度太粗。

### D. 文章尾部

12. **参考文献 DOI 纯文本不可点（中）**：343 篇含 `DOI: 10.xxxx` 纯文本，`renderInline` 无自动链接。「查得到」的承诺断在最后一步。
13. **参考/延伸/跨域节与叙事节呈现零区分（中）**：2524 篇参考文献节与叙事节 h2 class 逐字相同；内容层的语义分离（T-CONTENT-33）在呈现层不可见。
14. **「跨领域关联」面板先天缺失 5 个新域（中）**：`lib/cross-domain-refs/types.ts:1-14` 的 `Domain` 联合类型只 13 域（缺 arts/law/engineering/sociology/linguistics），`FrontierArticleView` 的 `CROSS_DOMAINS` 更只 10 个。
15. **超宽屏整页靠左（低）**：`ArticleLayout.tsx:87` 容器无 `mx-auto`/max-width；而哲学 schools 页用 `max-w-[1800px] mx-auto`——同款骨架两种行为。

## 首批打磨清单（R1 交付范围）

| #   | 改动                                                                                           | 文件                                                       | 状态       |
| --- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ---------- |
| 1   | 块循环跳过 `[^id]:` 脚注定义块，消除重复段落与重复 id                                          | `components/MarkdownRenderer.tsx`                          | ✅ R1 已修 |
| 2   | items 变体面包屑外层加 `min-w-0`，移动端可读                                                   | `components/Breadcrumb.tsx`                                | ✅ R1 已修 |
| 3   | `renderInline` 增加 DOI 自动链接（服务端渲染，零客户端成本）                                   | `components/MarkdownRenderer.tsx`                          | ✅ R1 已修 |
| 4   | blockquote 去 `italic`（保留边线 + 字号区分）                                                  | `components/MarkdownRenderer.tsx`                          | ✅ R1 已修 |
| 5   | ArticleLayout 加可选 `lede` 槽位；frontier 把现成 `excerpt` 传入，115 篇 frontier 获得开篇导读 | `components/ArticleLayout.tsx` + `FrontierArticleView.tsx` | ✅ R1 已修 |

## 后续轮次队列（R2+，按优先级）

1. **行长收敛（发现 #4，最高优先）**：默认收敛到 ~44rem（≈44 字/行），显式传参点同步，容器加 `mx-auto`（顺带修 #15）。视觉变化面大，需双主题 × 桌面/移动截图矩阵复核，单独一轮做。
2. **三件套覆盖补齐（发现 #9）**：数学 5 板块、哲学 thinkers/schools、生命科学/宇宙物理 kb 接入阅读模式 + 进度条 + TOC。改动面约 15 个 page.tsx，需逐域核对布局假设。
3. **参考/延伸/跨域节的装置性样式（发现 #13）**：更小字号、更密行距、muted 色，与叙事节视觉分层（纯 class，零预算）。
4. **跨域面板扩 5 新域（发现 #14）**：扩 `Domain` 类型 + 配色表，面板「能渲染」即可；refs 数据增补属内容轮。
5. **哲学 questions 页头 key_figures 中文化（发现 #2）**：id → 中文名映射（可借 thinkers 数据）。
6. **h2 节边界感 + 标题锚点 permalink（发现 #7/#8）**：低优先，可与行长轮合并。
7. **link-previews.json 按域拆分（发现 #11）**：动生成管线，中期。
8. **TOC 按钮与 NarrationPlayer 底栏避让（发现 #10）**：低优先。

## 明确不建议做

- 阅读进度持久化 / 已读标记 / 收藏 / 分享按钮 / 标签浏览——`docs/聚焦方向.md` 禁做清单逐项命中。
- 参考文献悬停预览卡（Crossref 运行时查询）——引入第三方运行时依赖；DOI 自动链接已拿到 80% 收益。
- AI 自动生成导读——与「导读应由作者写」的内容原则冲突；frontier excerpt 静态派生已够用。
