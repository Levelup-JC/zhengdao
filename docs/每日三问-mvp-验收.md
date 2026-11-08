# 每日三问 MVP 验收

PR：https://github.com/Levelup-JC/zhengdao/pull/1

状态：已打开，未合并，未部署。分支 `fix/daily-three-questions-mvp`，目标 `main`。`gh pr view` 返回 `state: OPEN`，`mergedAt: null`。

## 验收项

- [x] 能完成一次每日三问并保存
- [x] 刷新后能恢复
- [x] 无 key / 错误 key 时 API 和页面有明确错误文案
- [x] PR 已开、未合并、未部署
- [x] 未改双链 / SBT / CTO 任务管理

## 验证命令与输出摘要

### 1. 草稿和错误文案单测

```bash
./node_modules/.bin/jest __tests__/daily-three-questions.test.ts --coverage=false --watchman=false
```

输出摘要：`5 passed, 5 total`。覆盖无密钥文案、401 原始原因、按地址和日期恢复草稿、过期草稿丢弃、处理中步骤回到输入、代码块 JSON。

### 2. 无密钥 API

```bash
DEEPSEEK_API_KEY= ./node_modules/.bin/next dev --port 3456
curl -sS -D - -X POST http://127.0.0.1:3456/api/reflect/process \
  -H 'content-type: application/json' \
  -d '{"content":"今天把每日三问的失败提示补上了，至少十个字。"}'
```

输出摘要：HTTP 500，`{"success":false,"error":"未配置 DEEPSEEK_API_KEY，AI 无法整理这次复盘。请在环境变量中配置后重试。"}`。过短正文返回 HTTP 400，`反思内容太短，至少10个字`。

### 3. 错误 key API

```bash
DEEPSEEK_API_KEY=sk-invalid-test-key ./node_modules/.bin/next dev --port 3457
curl -sS -D - -X POST http://127.0.0.1:3457/api/reflect/process \
  -H 'content-type: application/json' \
  -d '{"content":"今天用一个错误的密钥测试每日三问的失败提示。"}'
```

输出摘要：HTTP 500，`success: false`。错误文案以「DeepSeek 认证失败：API Key 无效、已过期或无权限」开头，并附带服务端原文 `Authentication Fails ... is invalid`。服务端把 key 打码成 `****-key`。

### 4. 浏览器：保存、刷新、失败提示

本机 Chrome 无头打开 `http://127.0.0.1:3456`，走体验模式：

1. 选择「是」，填入「今天把证道的每日三问写完了，刷新之后这句话还应该在。」
2. 刷新 `/check-in`，textarea 仍是这段原文。
3. 点「继续下一步」，红色说明为：`AI 整理失败 / 未配置 DEEPSEEK_API_KEY，AI 无法整理这次复盘。请在环境变量中配置后重试。`
4. 点「跳过 AI，保存原文」，进入 `/check-in/success`，页面能看到原文。
5. 刷新成功页，原文还在。
6. 再打开 `/check-in`，已保存原文还在。

脚本输出：`REFRESH_DRAFT_OK`、`SAVE_OK`、`REFRESH_SAVED_OK`、`CHECKIN_RESTORE_OK`。

## 剩余风险

- 月度洞察（`generateMonthlyInsights`）失败时仍回退演示数据。它不在每日三问提交链路里，这次没改。
- 浏览器验收走的是体验模式。普通钱包模式用的是同一套 IndexedDB 保存，但没有接真钱包重跑；当天重复打卡仍会被「每天只能打卡一次」拦住。
- 错误 key 只在 API 层实请求验证。页面展示的是接口返回的 `error`，无密钥场景已经在页面上看到同一条渲染路径。
- 草稿在 localStorage，不跨设备。体验模式标记在 sessionStorage，新标签要重新点一次「体验模式」，同一天的草稿仍可按演示地址恢复。
- 照片分享仍是 Coming Soon，照片没有入库。这是原有缺口，不属于这次验收。
- 正式保存只在本机 IndexedDB，清站点数据会丢。没有服务端备份。
