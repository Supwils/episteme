# AGENTS.md — Episteme · 格致

> **本文件不是规范正文。本仓库的代理规范只有一份真相源：[`CLAUDE.md`](CLAUDE.md)（根目录）。**
> 无论你是 Claude Code、Codex、Cursor、Kilocode 还是其他代理，**第一件事是完整读完 `CLAUDE.md`**，再按它的第零节接手协议往下走。
>
> 这里曾经放过一份 `CLAUDE.md` 的完整拷贝，结果两份各自漂移了半个月（端口、领域数、CI 流程全部对不上）。所以现在只留指针 + 三条最容易被违反的铁律。

## 读 CLAUDE.md 之前，先记住这三条

1. **默认不 commit、不 merge、不 push、不开 PR。** 三个动作都由用户口令触发；push `main` 会直接触发生产部署。
2. **改了 `content/` 就要 `pnpm gen-all`**，并把重生的索引产物一并纳入改动——CI 在干净 checkout 上验证生成幂等，工作区有差异即失败。
3. **交付前跑 `pnpm prepush`**（typecheck · lint · check-content · 四项知识审计 · 图像审计 · test）；内容或前端轮次还要再跑一次真实 `pnpm build` + `pnpm bundle-check -- --skip-build`。

## 常用入口

| 我要…            | 看这里                                                  |
| ---------------- | ------------------------------------------------------- |
| 接手仓库         | `CLAUDE.md` 第零节                                      |
| 找下一件事做     | `docs/任务清单.md`                                      |
| 了解上一个代理   | `docs/工作日志.md`（末尾 2–3 条）                       |
| 写知识内容       | `docs/叙事与引用规范.md` + `docs/知识精神.md`           |
| 新建一个知识领域 | `docs/学科版图与导航架构.md` + `docs/新领域创作指南.md` |
| 动构建/部署/渲染 | `CLAUDE.md` 第二节 + `docs/CI-CD与渲染策略.md`          |
| 全部文档地图     | `docs/README.md`                                        |
