---
name: test-doc-maintainer
description: 测试文档设计与维护：主路径拆解、多路径串联、三阶段产物、飞书发布。用户提及测试文档、主路径、串联稿、完整测试流程时使用。
disable-model-invocation: true
---

# 测试文档设计与维护

与用户一起设计、维护 `docs/Testing/` 下的测试文档——回答**测什么、怎么拆、怎么串**，不是跑测操作手册。

执行跑测（automator、Browser MCP、逐步截图）见 sibling skill [`web-miniprogram-manual-testing`](../web-miniprogram-manual-testing/SKILL.md) 或 [`computer-use-testing`](../../../.agents/skills/computer-use-testing/SKILL.md)。

---

## 两套核心逻辑

| 逻辑 | 文档 | 回答 |
|------|------|------|
| **一 · 主路径设计** | [path-design.md](path-design.md) | 从入口到交付，步骤下挂 case（操作、预期、证据） |
| **二 · 多路径串联** | [path-linking.md](path-linking.md) | 打散多条主路径、按依赖重组，同一操作只做一遍 |

三阶段交付与维护脚本见 [doc-lifecycle.md](doc-lifecycle.md)。飞书发布见 [feishu-publish.md](feishu-publish.md)。

---

## 交付路径

```text
docs/Testing/
├── 测试规划.md                         # Layer 0：范围、环境、证据、放行
├── 目录.md                             # 阶段 1 索引
├── {N}-*-主路径与用例.md               # 阶段 1：主路径 + case 全文
├── 完整测试流程.md                     # 阶段 2：串联规划（FLOW_SEGMENTS、账号台账）
├── 完整测试流程-串联稿.md              # 阶段 3：脚本生成，跑测唯一规格源
└── 证据/<批次>/TC_<ID>/               # 佐证目录（结构见 doc-lifecycle.md）
```

**不可跳步**：阶段 1 主路径 → 阶段 2 串联规划 → 阶段 3 串联稿。

---

## 模板

| 模板 | 用途 |
|------|------|
| [templates/main-path.md](templates/main-path.md) | 阶段 1 主路径文件 |
| [templates/case.md](templates/case.md) | 单 case 八段式 |
| [templates/flow-plan.md](templates/flow-plan.md) | 阶段 2 完整测试流程 |

---

## 结束动作

1. 写出或更新 `docs/Testing/` 对应阶段文件
2. 阶段 3 变更后运行 `python3 scripts/audit/build-complete-flow-with-evidence.py`
3. 向用户汇报：已覆盖路径、TC 数、串联段、待确认项
4. 若需飞书同步，见 [feishu-publish.md](feishu-publish.md)

---

## 禁止事项

- 在本 skill 内写 automator、Browser MCP、preflight、逐步截图等执行内容
- 先按模块 FUN/BND/INT 堆 case 再补跨模块文件
- 在阶段 1 主路径文件内混写串联顺序（串联只在阶段 2/3）
- 跳过阶段直接维护串联稿正文（应改主路径或 `完整测试流程.md` 后重生）

---

## 附加资源

- 主路径设计：[path-design.md](path-design.md)
- 路径串联：[path-linking.md](path-linking.md)
- 三阶段维护：[doc-lifecycle.md](doc-lifecycle.md)
- 飞书发布：[feishu-publish.md](feishu-publish.md)
- 产品逻辑设计（测什么的前置）：[`module-design-maintainer`](../module-design-maintainer/SKILL.md)
