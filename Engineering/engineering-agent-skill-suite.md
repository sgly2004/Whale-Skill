# 工程类 Agent 必备 Skill 套件

日期：2026-07-18

## 适用范围

凡是涉及编程、工程实现、前端页面、产品设计、原型验证、代码审查或调试的 Agent，都应具备这一套能力。当前已按此标准配置：

- Collwe 产品维护 Agent：`agt_53068680`
- BUPT DATE 运营与增长助手：`agt_647ed281`

## 必备能力与当前 Skill 映射

| 能力 | Skill |
| --- | --- |
| 产品建议 | `software-product-advisor` |
| 需求澄清 / 方案追问 | `grill-me`、`grill-with-docs` |
| 前端设计 | `ui-ux-pro-max`、`ui-styling`、`design-an-interface` |
| Prototype | `prototype`、`web-artifacts-builder`、`kami` |
| UI 验证 | `browser`、`verification-before-completion` |
| Codebase Design | `codebase-design` |
| 模块 / 代码逻辑设计 | `module-design-maintainer` |
| Debug | `diagnosing-bugs` |
| Code Review | `code-review` |
| 测试文档维护 | `test-doc-maintainer` |

辅助可选：

- `nano-banana-pro-prompts-recommend-skill`：用于前端视觉探索、宣传图、产品素材或 AI 图像 prompt 生成。
- `kami`：用于把文档、说明页、产品页或方案页排成可展示成品。
- `web-artifacts-builder`：用于构建可交互前端预览和复杂 HTML artifact。

## 标准工作流

1. 先用 `grill-me` 或 `grill-with-docs` 对用户进行提问，澄清真实需求、目标用户、约束、验收标准和非目标。
2. 对产品或体验方向不清晰的请求，先用 `software-product-advisor` 做产品判断，避免直接进入实现。
3. 在实现前完成前端设计判断。涉及 UI 时，使用 `ui-ux-pro-max`、`ui-styling`、`design-an-interface` 等能力确定信息架构、交互、视觉系统和组件边界。
4. 用 `prototype`、`kami` 或 `web-artifacts-builder` 做可视化预览，让用户先看到预期效果。Prototype 应明确回答一个设计问题，验证后删除或吸收到正式实现。
5. 进入代码前使用 `codebase-design` 做仓库级设计，明确 seam、interface、adapter、测试面和代码落点。
6. Codebase Design 之后使用 `module-design-maintainer` 继续细化前端页面、后端功能模块、数据流、功能入口和代码逻辑设计，避免只停留在仓库结构层面。
7. 实现过程中遇到故障时使用 `diagnosing-bugs`，先建立可复现、可验证的反馈回路，再定位和修复。
8. 实现完成后使用 `test-doc-maintainer` 维护测试文档，说明主路径、用例、串联流程和证据口径；测试文档回答“测什么、怎么拆、怎么串”，不替代实际跑测。
9. 最后用 `code-review` 做差异审查，并用 `browser` 和 `verification-before-completion` 做 UI 与交付验证。没有新鲜验证证据，不宣称完成。

## 写入工程 Agent Instructions 的使用规范

给工程类 Agent 配置 Instructions 时，应明确告诉它这些 Skill 的使用边界和顺序。建议加入以下规则：

1. 收到模糊需求、产品方向、功能定义或用户体验请求时，先使用 `grill-me`；如果用户提供了 PRD、设计稿、截图、Issue、长文档或历史上下文，优先使用 `grill-with-docs`，基于材料追问缺口。
2. 涉及“该不该做、做成什么形态、谁会用、价值是否成立、方案取舍”的问题时，先使用 `software-product-advisor`，输出场景、用户、非目标、风险和推荐方向，再进入设计或实现。
3. 涉及页面、组件、交互、信息架构、视觉一致性或可用性时，使用 `ui-ux-pro-max`、`ui-styling`、`design-an-interface`；不要只写功能代码，要先说明用户路径、布局结构、状态、空态、错误态和移动端行为。
4. 需要让用户看效果、比较方案或验证交互时，使用 `prototype`、`web-artifacts-builder` 或 `kami` 产出可检查的预览。Prototype 必须围绕一个明确设计问题，不应变成无人维护的平行实现。
5. 进入正式代码前，使用 `codebase-design` 明确代码落点、模块边界、数据流、接口、依赖、测试策略和迁移风险。跨模块或共享逻辑变更必须先做这一步。
6. Codebase Design 完成后，使用 `module-design-maintainer` 把前端页面/交互单元、后端功能模块、功能入口和数据流逐项抠清楚，形成可审阅的模块设计文档，再进入细节实现。
7. 遇到报错、测试失败、线上异常、表现与预期不符时，使用 `diagnosing-bugs`。先复现和收集证据，再缩小范围，最后修复；不要凭猜测直接改。
8. 完成代码编写后，使用 `test-doc-maintainer` 更新测试文档，维护主路径、case、完整测试流程和串联稿。它负责测试设计与文档，不负责替代自动化或人工跑测。
9. 完成实现后，使用 `code-review` 从回归风险、边界条件、测试缺口、可维护性和产品行为上审查自己的 diff。审查发现的问题应先修复，再提交结果。
10. 涉及可见 UI 或浏览器行为时，使用 `browser` 打开页面、截图或检查 DOM；交付前必须使用 `verification-before-completion` 跑最新验证命令。没有实际验证输出，不说“已完成”“已修复”“可用”。
11. 需要图像素材、视觉探索或 AI 图像 prompt 时，使用 `nano-banana-pro-prompts-recommend-skill`。生成的 prompt 应服务于具体产品场景，避免只做装饰。
12. 需要把方案、说明、简历、PPT、产品页或白皮书做成可展示成品时，使用 `kami`；需要复杂交互式 HTML artifact 时，使用 `web-artifacts-builder`。

可直接复制到工程 Agent 的 Instruction 摘要：

```text
你是工程类 Agent。凡是遇到产品、设计、前端、代码、调试或审查任务，都必须按需使用已启用的工程 Skill：
- 模糊需求先用 grill-me；有文档或上下文时用 grill-with-docs。
- 产品判断先用 software-product-advisor。
- UI/UX 设计使用 ui-ux-pro-max、ui-styling、design-an-interface。
- 需要预览或可视化验证时用 prototype、web-artifacts-builder 或 kami。
- 正式编码前用 codebase-design 明确架构、模块边界和测试面。
- Codebase Design 后用 module-design-maintainer 细化前端页面、后端模块、数据流和功能入口。
- Bug 和失败用 diagnosing-bugs 建立复现和验证闭环。
- 完成代码后用 test-doc-maintainer 维护测试文档、主路径、case 和串联流程。
- 完成后用 code-review 审查 diff，并用 browser 与 verification-before-completion 提供新鲜验证证据。
不要跳过澄清、设计、验证和审查；不要在没有验证证据时宣称完成。
```

## 启用状态

2026-07-18 已将以下组织 Skill 导入并启用到 Collwe 产品维护 Agent 和 BUPT DATE 运营与增长助手：

- `codebase-design`
- `module-design-maintainer`
- `diagnosing-bugs`
- `code-review`
- `test-doc-maintainer`
- `prototype`
- `ui-ux-pro-max`
- `ui-styling`
- `design-an-interface`
- `verification-before-completion`

同时已启用或确认以下相关 Skill：

- `software-product-advisor`
- `grill-me`
- `grill-with-docs`
- `kami`
- `web-artifacts-builder`
- `nano-banana-pro-prompts-recommend-skill`
- `browser`：Collwe bundled skill，所有 Agent 运行时始终加载。

## 后续规则

创建或改造工程类 Agent 时，默认应安装并启用上述必备套件。若某个运行时不支持其中某项，应在 Agent 说明或交付备注中明确缺口，并给出替代 Skill 或导入计划。
