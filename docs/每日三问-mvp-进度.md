# 每日三问 MVP 进度

## 2026-11-08 核验

对照 `docs/codex-每日三问-mvp.md` 看了 README、`app/check-in`、`components/check-in`、`app/api/reflect/process`、`lib/deepseek.ts`、`lib/check-in-service.ts`、`docs/HOW-TO-TEST.md`、`LOCAL-TEST-REPORT.md`。

现有机制：

- 正式保存走 IndexedDB（Dexie `reflections`），不是服务端数据库。
- 未提交的选择和正文只放在 React state，刷新会丢。
- 保存成功后的「今日已打卡」页不展示已填正文。
- 体验模式只存在内存里，刷新后会回到「请先连接钱包」。
- `/api/reflect/process` 在没有 `DEEPSEEK_API_KEY`、密钥错误或请求失败时，`lib/deepseek.ts` 会静默返回演示数据；页面再 toast「使用演示数据完成整理」。用户看不到失败原因。

工作区里已有的 `lib/ai-service.ts`、`lib/gemini-service.ts`、`app/api/test-ai/route.ts` 改动保留。每日三问实际调用的是 DeepSeek 这条链路，所以错误透出补在这条链路上。

未改双链、SBT、CTO 任务管理。

## 2026-11-08 修复

只补核验到的缺口：

- 未提交内容按钱包地址和 UTC+8 日期写入 localStorage，刷新后恢复；处理中的步骤恢复到输入步，避免停在转圈。
- 非体验模式当天已保存时，刷新 `/check-in` 会显示原文和 AI 整理。体验模式不阻断下一次记录，但会把今天已保存的内容显示出来。
- 成功页刷新后重新读取今天最新一条记录。
- 体验模式写入 sessionStorage，同一次浏览里刷新不会丢掉入口。
- AI 无密钥、认证失败、超时或其他请求失败时，API 返回 `success: false` 和可读 `error`，页面用 toast 和红色说明展示，不再换成演示数据。
- AI 失败后仍可「跳过 AI，保存原文」，保存路径继续可用。

验证还没跑完，结果补在验收文档。

## 2026-11-08 验证

- `./node_modules/.bin/jest __tests__/daily-three-questions.test.ts --coverage=false --watchman=false`：5 项通过。覆盖无密钥文案、401 原文、草稿按地址和日期恢复、过期草稿丢弃、处理中步骤回到输入、代码块 JSON。
- 无密钥启动 `next dev --port 3456`，`POST /api/reflect/process` 返回 HTTP 500：`未配置 DEEPSEEK_API_KEY，AI 无法整理这次复盘。请在环境变量中配置后重试。` 过短正文返回 HTTP 400。
- 错误 Key `sk-invalid-test-key` 启动 `next dev --port 3457`，同一接口返回 HTTP 500，文案以「DeepSeek 认证失败」开头，并带上服务端原始原因。Key 已被服务端打码。
- 本机 Chrome 走体验模式：选择「是」、填写正文、刷新后 textarea 仍是原文；提交后页面出现红色「AI 整理失败」和缺少 `DEEPSEEK_API_KEY` 的说明；跳过 AI 保存后成功页能看到原文；再刷新成功页和 `/check-in` 都能看到同一段原文。

未部署，未合并。PR 链接写在验收文档。
