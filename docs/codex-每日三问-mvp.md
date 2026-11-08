# Goal：zhengdao 首轮 MVP 核验再修

仓库：/Users/jasoncong/Documents/New project/zhengdao（远端 https://github.com/Levelup-JC/zhengdao ）
当前分支：fix/daily-three-questions-mvp（从 main e30e17a 拉出）
硬规则：只用本机改代码；不要用 CloudAgent；不要合并 main；不要部署生产；不要同时补双链/SBT、不要扩 CTO 任务管理。发现缺口才改。

## 范围（只做这些）
跑通并验收：
1) 每日三问（check-in / DailyQuestion 流程）
2) 保存
3) 刷新页面后恢复已填内容
4) AI 失败时有明确、用户可读的反馈（不要静默失败）

工作区已有未提交改动（保留，勿丢弃，可在其上完善）：
- lib/ai-service.ts / lib/gemini-service.ts / app/api/test-ai/route.ts
  内容是更明确的多 provider 错误信息与 provider 字段——与第 4 条相关。

## 做法
1. 先读 README、app/check-in、components/check-in、相关 api/reflect、HOW-TO-TEST / LOCAL-TEST-REPORT，理清现有保存与恢复机制（localStorage / DB / API）。
2. 本地能跑则跑（npm/pnpm/yarn 以仓库为准）；缺依赖先装。优先写/跑最小验证（脚本、单测或手工 curl + 说明）。
3. 只修缺口：三问流程断点、保存失败、刷新丢失、AI 错误未透出。
4. 每完成一块往 docs/每日三问-mvp-进度.md 追加中文进度。
5. 自检通过后：commit（清晰中文或英文 Conventional）、push 到 origin fix/daily-three-questions-mvp、用 gh 开 PR 到 main（标题/正文说明验收项与未做项）。
6. 在 docs/每日三问-mvp-验收.md 写：PR 链接、验证命令与实际输出摘要、剩余风险。

## 验收标准
- [ ] 能完成一次每日三问并保存
- [ ] 刷新后能恢复
- [ ] 故意让 AI 失败（如无 key / 错误 key）时 UI 或 API 有明确错误文案
- [ ] PR 已开、未合并、未部署
- [ ] 未改动双链/SBT/CTO 扩 scope（除非为修上述缺口必须的最小触碰，并在 PR 说明）

完成后把 PR URL、验证命令+输出、剩余风险写进验收文档；会话可结束。
