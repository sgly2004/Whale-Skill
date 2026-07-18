# 三阶段文档生命周期

> `docs/Testing/` 文档如何分工、如何维护、如何与跑测衔接。  
> 设计方法见 [path-design.md](path-design.md)、[path-linking.md](path-linking.md)。

---

## 1. 三阶段流程（必须按顺序）

| 阶段 | 产物 | 路径 | 职责 |
|------|------|------|------|
| **0 · 全局规划** | 测试规划 | `docs/Testing/测试规划.md` | 范围、环境、证据约定、放行标准 |
| **1 · 单独主路径** | 用例全文 | `docs/Testing/{N}-*-主路径与用例.md` | 步骤组、TC、意图/步骤/预期/证据；可含入口/交付等**编辑用**元数据 |
| **1 · 索引** | 目录 | `docs/Testing/目录.md` | 每条路径步进表、覆盖 TC、改版对照 — **永久保留** |
| **2 · 串联规划** | 流程编排 | `docs/Testing/完整测试流程.md` | 执行顺序、账号台账、阶段 A–R、一句话主链、**同一操作只做一遍** |
| **3 · 串联测试稿** | 可跑测全文 | `docs/Testing/完整测试流程-串联稿.md` | 脚本生成：总览表 + 用例 + 已测证据 + 红/橙底色 — **跑测以本文为准** |

```text
主路径文件 ──┐
             ├──> build-complete-flow-with-evidence.py ──> 完整测试流程-串联稿.md
完整测试流程.md ┘
```

---

## 2. 文档职责速查

| 文件 | 读者 | 内容 |
|------|------|------|
| `目录.md` | 规划/审查 | 路径纵览；**第一个目录** |
| `测试规划.md` | 全员 | 目的、环境、证据目录 |
| `完整测试流程.md` | 跑测前 | **怎么串**、用什么账号、何时切路径 |
| `完整测试流程-串联稿.md` | 跑测中 | **测什么**（全文 + 证据） |
| `{N}-*-主路径与用例.md` | 编辑/diff | 阶段 1 维护单元 |

主路径文件篇数可后续合并；TC_ID 与 `FLOW_SEGMENTS` 逻辑不变，仍走三阶段。

---

## 3. 串联稿格式（阶段 3 定稿）

**保留：** 文首 `## 完整流程总览（一张表）` + 一句话主链

**不进串联稿：** 三条原则/账号台账（留 `完整测试流程.md`）、`阶段 A` 标题、`> 来源：`、入口/角色/操作/交付/文件级需求字段对照

**层级与配色（Lark 与本地一致）：**

| 层级 | 样式 |
|------|------|
| `## N · 路径名` | 无背景色；同路径 H2 **只出现一次** |
| `### 步骤 …` | `<text background-color="red">` 红底 |
| `#### X.Y · …（TC_xxx）` | `<text background-color="orange">` 橙底 |

---

## 4. 用例书写规范（阶段 1 → 3）

- **标题**：`{步骤.序号} · normal/boundary · 一句话（TC_ID）` — ID 在末尾
- **输入并入步骤**；组内**第一条**写完整步骤（boundary 可插入某步），后续只写增量
- **预期**：`- [ ]` 可勾选清单；**同组不重复**已断言项
- **页面字段**（来自需求文档）：组内**首条用例**在预期末写 `**页面字段**` checklist；同组后续用例一行引用首条 TC（见 `inject-field-expectations.py`）
- **证据**：连续多图无中间文字 = 一组，**组末一条说明**

需求来源（JiaZhuang）：

- [`docs/un-commit/需求文档/假装上班客户端交互显示确认.md`](../../../docs/un-commit/需求文档/假装上班客户端交互显示确认.md)
- [`docs/un-commit/需求文档/假装上班管理员后台改动需求.md`](../../../docs/un-commit/需求文档/假装上班管理员后台改动需求.md)

---

## 5. 证据目录结构

目录：`docs/Testing/证据/<批次>/TC_<ID>/`

| 文件 | 说明 |
|------|------|
| `groups.json` | 图片分组 + 组末说明 |
| `*.png` | 截图 |
| `trajectory.md` | 可选手工说明（跑测 skill 负责怎么写） |

历史批次示例：`CU-DOCX-20260709`；手工批次：`CU-P01-20260708`。

新测写入证据目录后运行 `build-complete-flow-with-evidence.py` 刷新串联稿。

---

## 6. 维护脚本

| 脚本 | 阶段 | 作用 |
|------|------|------|
| `scripts/audit/inject-field-expectations.py` | 1 | 需求字段写入组内首条用例预期 |
| `scripts/audit/check-off-evidenced-expectations.py` | 3 | 按 **已测证据** 说明勾选无 TODO 用例的预期 |
| `scripts/audit/build-complete-flow-with-evidence.py` | 3 | 生成 `完整测试流程-串联稿.md` |
| `scripts/audit/merge-testing-for-lark.py` | — | 本地合并校验（可选） |
| `scripts/audit/publish-flow-to-lark.py` | 3 | 飞书发布，见 [feishu-publish.md](feishu-publish.md) |

**已废弃**（勿在新结构上运行）：`reorder-test-cases.py`、`inject-requirement-expectations.py`、`process-testing-docs.py`。

---

## 7. 与跑测 Skill 的关系

| 职责 | Skill / 文件 |
|------|-------------|
| 设计/维护 | 本 skill + `docs/Testing/` |
| 执行规格 | `完整测试流程-串联稿.md` + `目录.md` |
| 逐步操作与留证 | [`web-miniprogram-manual-testing`](../web-miniprogram-manual-testing/SKILL.md) 或 [`computer-use-testing`](../../../.agents/skills/computer-use-testing/SKILL.md) |
| 飞书同步 | [feishu-publish.md](feishu-publish.md) |

---

## 8. 更新流程

| 场景 | 动作 |
|------|------|
| 新增/修改 case | 改阶段 1 主路径文件 → 更新阶段 2（若影响串联）→ 重生阶段 3 |
| 仅调整串联顺序 | 改 `完整测试流程.md` + 脚本 `FLOW_SEGMENTS` → 重生阶段 3 |
| 新测证据 | 写入 `证据/<批次>/` → 重生阶段 3 → 可选飞书发布 |
| 需求字段变更 | 跑 `inject-field-expectations.py` → 重生阶段 3 |
