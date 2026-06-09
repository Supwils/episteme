# 人类历史知识图谱 — AI Agent 工作规范

> **⚠️ 迁移通知**：本目录的源码正在迁移至 `apps/portal/src-history/`，通过 `apps/portal/app/human-history/` 路由访问。本文件保留供历史参考。新任务请优先在 `apps/portal/` 中进行。

## 项目概述

交互式人类历史知识图谱网站，从公元前10000年到公元2025年，覆盖全球六大洲。

## 技术栈

- **构建**: Vite 8+
- **语言**: JavaScript (ES Modules, ES2022)
- **动画**: GSAP 3.12+
- **样式**: 原生CSS + CSS Custom Properties
- **路由**: 自研Browser History Router
- **包管理**: npm

**禁止引入**: React, Vue, Angular, TypeScript, Tailwind, D3.js

## 语言规则

| 场景 | 语言 |
|------|------|
| `.md` 文件 | 中文 |
| 对话 | 中文 |
| 代码/配置/文件名 | 英文 |
| 变量/函数名 | 英文 |

## 目录结构

```
src/
├── main.js          # 入口：路由注册 + 主题
├── styles/main.css  # 全局样式 + 设计令牌
├── data/index.js    # 基础历史数据（ERAS, EVENTS, FIGURES, REGIONS）
├── data/atlas-content.js # Atlas分层内容
├── lib/
│   ├── router.js    # History路由
│   └── dom.js       # DOM工具（$, el, clearApp, animateIn, prefersReducedMotion）
└── pages/
    ├── home.js      # 首页
    ├── timeline.js  # 时间线
    ├── atlas.js     # Atlas知识图谱（Canvas分层探索）
    ├── graph.js     # 关系图（Canvas）
    ├── map.js       # 大洲地图
    └── figures.js   # 人物
```

## 代码规范

### 文件大小
- JS: ≤300行(软) / ≤600行(硬)
- CSS: ≤400行(软)
- 函数: ≤50行(硬)

### 命名
- 文件: `kebab-case`
- 变量/函数: `camelCase`
- 常量: `UPPER_SNAKE_CASE`
- CSS类: `kebab-case`
- 禁止: `*Manager`, `*Helper`, `*Util`

### 关键规则

1. **每次渲染前调用 `clearApp()`** 清空旧内容
2. **路由切换先清理旧页面，再渲染新页面**
3. **所有动画检查 `prefersReducedMotion()`**
4. **Canvas动画必须有 `cancelAnimationFrame` 清理**
5. **颜色使用CSS变量**（`var(--gold)`, `var(--parchment)` 等）
6. **基础数据变更集中在 `src/data/index.js`，Atlas内容集中在 `src/data/atlas-content.js`**
7. **新页面**: 创建 `pages/xxx.js` → 导出 `renderXxx()` → 在 `main.js` 注册路由

## 设计令牌

```css
--bg            # 背景色
--bg-card       # 卡片背景
--parchment     # 主文字色
--parchment-dim # 次要文字色
--gold          # 强调色（金色）
--gold-light    # 亮金色
--crimson       # 深红色
--jade          # 翡翠绿
--sky           # 天蓝色
--border        # 边框色
--serif         # 衬线字体
--sans          # 无衬线字体
--brush         # 毛笔字体
```

## 构建命令

```bash
npm run dev    # 开发服务器
npm run build  # 生产构建 → dist/
npm run preview # 预览构建结果
```

## 构建预算

- JS gzip: 目标 ≤ 200KB（当前约 186KB）
- CSS gzip: 目标 ≤ 8KB（当前约 6KB）

## 文档知识库

`docs/` 目录包含中文Markdown历史知识文件，按时期和主题组织。新增历史内容时：

1. 在 `docs/` 对应目录创建 `.md` 文件（含YAML frontmatter）
2. 在 `src/data/index.js` 对应数组中添加数据条目
3. 确保 `era`, `region`, `cat` 字段与现有枚举值一致
