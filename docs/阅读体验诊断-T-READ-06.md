# 阅读体验诊断（T-READ-06 · 文章页之外的读者旅程）

> 方法：代码审查 + `pnpm dev` 真实页面 + Playwright 双主题/移动端截图（`tmp/ux/t-read-06/`）。只报告有实证的问题。
> 上轮（T-READ-01）覆盖文章页；本轮覆盖门户首页、`/daily`、`/search`、⌘K、`/read`、领域列表页、`/knowledge-graph`。

## 总体判断

文章页之外的旅程整体比预期好：`/read` 路线页信息完整、⌘K 键盘导航严谨、引擎域列表页有搜索+筛选+摘要。差距集中在三处：

1. **浅色主题是二等公民**——`/daily` 多个组件硬编码白色透明叠层，浅主题下卡片边界消失；
2. **「每日知识」的链接大量落空**——42 条事实卡只链到域首页，「历史上的今天」完全不可点；
3. **知识图谱对新读者零引导**——落地即 1600+ 节点的球，没有一句话说明这是什么、怎么玩。

## 诊断发现（12 条）

### A. 门户首页

1. **DomainCard 页脚在长 stats 下挤压换行破裂（中）**：`components/DomainCard.tsx:61-74` 页脚单行 flex，地球科学卡 stats 折两行、「进入探/索」竖向断裂，双主题均现。
2. **「最新更新」手工维护已停滞 3 个月（中）**：`lib/data.tsx:572` 起 `LATEST_UPDATES` 硬编码，最新一条 2026-05，且 href 只指域首页不指具体新内容。
3. **移动端首页 17000px 无快捷跳转（低）**：18 张领域卡单列堆叠，簇标题无锚点导航。

### B. 每日知识 `/daily`

4. **DailyDomainGrid 浅主题卡片边界完全消失（中）**：`components/DailyDomainGrid.tsx:176-177` 硬编码 `rgba(255,255,255,0.02/0.05)` 与 `#8b8fa3`，浅主题 14 张卡变无边框浮字。
5. **3 域的每日卡只链到域首页（中）**：`lib/daily-facts.ts` 数学 15 条、生命科学 15 条、宇宙学 12 条全部只链域首页；其余 6 个事实域已链到具体文章——数据欠账，非架构限制。
6. **「历史上的今天」条目纯展示、零出口（中）**：`components/OnThisDay.tsx` 全文件无 Link/href；同样硬编码白色透明卡片与时间轴线。事件数据里其实有现成 url。
7. **/daily 与 4 个新域彻底无关（低）**：`lib/daily-selector.ts:27-40` 只含 14 域，无 arts/law/engineering/linguistics——「新域遗忘」模式再现。

### C. 搜索到阅读

8. **/search 无结果页是死胡同（低）**：`app/search/page.tsx:99-103` 只有一句提示，无任何去向（链到 `/read`、`/daily` 等策展入口是安全的，不能加热门搜索词云）。

### D. 阅读路线 `/read`

9. **12 条路线只覆盖 9 个域（低）**：医学、地球科学、化学等成熟域无可通读路线——策展欠账。
10. **路线末章「读完 ✓」体验落差（低）**：`components/ReadingPathBar.tsx:140-148` 读完静默送回目录，没有收束页（注意：只建议静态收束区块，不碰进度持久化）。

### E. 领域列表页

11. **经济学 concepts 列表：40+ 概念无搜索无筛选，分类按 Unicode 码位排序，卡片无摘要（高）**：`app/economics/concepts/page.tsx:20` `.sort()` 按码位排中文分类；对比引擎域 `DomainSectionListBrowser`（搜索+chips+excerpt）与自家 `EconomistsListBrowser`（已接 `ListSearchFilter`），concepts 是漏网。

### F. 知识图谱 `/knowledge-graph`

12. **新读者零引导（高）**：桌面落地即 1600+ 节点彩球无一句说明；移动端更甚（3 个无标签图标 + 球）。页面 metadata 有句描述但从不渲染。另注：图谱页强制深色（`KnowledgeGraphClient.tsx:16,52`），浅主题读者切换是全黑跳变——如属「观测台」刻意设计可保留，值得确认。

**查而未证**：ReadingPathBar 与移动端 TOC 按钮理论重叠，实测碰撞不成立；图谱小地图在 headless 截图中呈空白，疑似渲染环境产物。

## 首批打磨清单（R2 候选，按性价比排序）

| #   | 改动                                                                         | 文件                                              | 预期收益                       |
| --- | ---------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------ |
| 1   | 修 DailyDomainGrid/OnThisDay 硬编码白色透明 → token                          | `components/DailyDomainGrid.tsx`、`OnThisDay.tsx` | 浅主题 /daily 恢复边界与对比度 |
| 2   | OnThisDay 事件包 Link（数据已有 url，无 url 退回 `/human-history/timeline`） | `components/OnThisDay.tsx`                        | /daily 底部从死胡同变发现入口  |
| 3   | 经济学 concepts 接入 `ListSearchFilter` + 卡片 excerpt + 分类固定教学序      | `app/economics/concepts/page.tsx`                 | 40+ 概念可检索，与引擎域对齐   |
| 4   | 知识图谱首屏一行可 dismiss 引导文案（sessionStorage，会话级）                | `subjects/knowledge-graph/components/`            | 新读者落地即知玩法             |
| 5   | DomainCard 页脚修复（stats `min-w-0 truncate`，CTA `shrink-0`）              | `components/DomainCard.tsx`                       | 长 stats 卡不再竖断            |
| 6   | 「最新更新」补 4 新域并落到具体板块页；中期从内容 mtime 派生                 | `lib/data.tsx`                                    | 回访读者看到真实新鲜度         |

## 明确不建议做

- 阅读进度持久化 / 断点续读 / 已读标记 / 完成度指示——禁做清单。
- /search 热门搜索词云、「你可能感兴趣」推荐——触碰标签浏览边界。
- 图谱多步引导 tour——太重；一行可 dismiss 文案拿 80% 收益。
- 移动端首页折叠/分页——18 张静态卡不是性能瓶颈。
- /daily 事实卡自动反查文章链接——维护映射表易错链；正解是内容轮补数据（发现 #5）。
