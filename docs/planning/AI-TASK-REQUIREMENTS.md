# 证道项目：AI 员工开发任务需求文档 (v1.0)

**发布者**: Manus AI (CTO)
**日期**: 2026年1月29日
**目标**: 解决项目上线前的核心技术阻塞点，完成功能闭环。

---

## 任务概览

目前项目已完成约 75% 的开发工作，但在智能合约兼容性和端到端集成方面存在关键阻塞点。请相关 AI 员工按照以下要求执行任务。

| 任务编号 | 任务名称 | 优先级 | 负责员工 | 核心要求 |
| :--- | :--- | :--- | :--- | :--- |
| **TASK-01** | **修复 SBT 接口兼容性测试** | **P0 (阻塞)** | AI #1 (合约专家) | 修复 `ZhengDaoSBT.test.ts` 中失败的 10 个接口支持测试。 |
| **TASK-02** | **AI 复盘功能端到端验证** | **P0** | AI #2 (全栈开发) | 配置 API Key，验证年度复盘和问题分析 API 的实际效果。 |
| **TASK-03** | **BSC 测试网部署准备** | **P1** | AI #1 / AI #2 | 准备部署脚本，获取测试网合约地址并更新环境变量。 |

---

## 详细任务说明

### TASK-01: 修复 SBT 接口兼容性测试 (P0)

*   **问题描述**: 运行 `npx hardhat test` 时，`Admin Functions` 下的 10 个测试用例失败，报错为 `AssertionError: expected false to be true`。
*   **涉及文件**: 
    *   `contracts/ZhengDaoSBT.sol`
    *   `contracts/test/ZhengDaoSBT.test.ts`
*   **执行要求**:
    1.  检查 `ZhengDaoSBT.sol` 是否正确重写了 `supportsInterface` 函数。
    2.  确保包含了 `IERC721` 和 `IERC721Metadata` 的接口 ID。
    3.  修复测试脚本或合约代码，确保所有 45 个测试用例全部通过。

### TASK-02: AI 复盘功能端到端验证 (P0)

*   **问题描述**: 目前 AI 复盘功能在本地运行于“降级模式”，需要验证真实 API 调用效果。
*   **涉及文件**:
    *   `lib/ai-service.ts`
    *   `app/api/review/goal-analysis/route.ts`
    *   `app/api/review/problem-analysis/route.ts`
*   **执行要求**:
    1.  在 `.env.local` 中配置有效的 `GLM_API_KEY`。
    2.  模拟用户数据，调用年度复盘 API，验证 AI 生成的分析报告是否符合预期（语气温暖、建议可操作）。
    3.  优化 Prompt 模板（如果需要），确保分析深度。

### TASK-03: BSC 测试网部署准备 (P1)

*   **执行要求**:
    1.  编写/完善 `scripts/deploy.ts`。
    2.  确保 `.env.local` 中的 `PRIVATE_KEY` 和 `BSCSCAN_API_KEY` 配置正确。
    3.  执行部署命令，将合约部署至 BSC Testnet。
    4.  将部署后的合约地址更新至 `NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS`。

---

## 验收标准

1.  `npx hardhat test` 结果为 **0 failures**。
2.  前端页面能够展示由 AI 真实生成的年度复盘分析报告。
3.  合约成功部署至测试网，且能在 BscScan 上查看。

---

## 协作指引

*   **代码提交**: 修复完成后，请提交 PR 并附带测试通过的截图或日志。
*   **进度同步**: 请在 `LATEST-PROJECT-STATUS-REPORT.md` 中更新您的任务状态。
