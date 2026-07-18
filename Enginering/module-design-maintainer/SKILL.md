---
name: module-design-maintainer
description: 产品逻辑设计梳理（前端按页面、后端按功能模块），产出可审阅的设计文档。用于梳理交互规格、数据流、功能入口、冗余能力。用户提及模块设计、页面交互梳理、数据流梳理、功能入口、设计文档更新时使用。
disable-model-invocation: true
---

# 产品逻辑设计 & 梳理

与用户一起梳理产品的**全部功能和逻辑**，产出可审阅的设计文档。

这是**设计期的工作文档**——用来对齐「产品应该怎样运转」，不是工程操作手册，也不是逐行代码说明。与 `doc/product/`（受保护的产品契约）分开维护；梳理稳定后可提炼进 product contract。

---

## 交付路径

```text
docs/Engineering/
├── 说明.md
├── backend/                    # 按功能模块
│   ├── _模板.md            # 见 backend-doc-template.md
│   └── {中文模块名}.md
└── frontend/                   # 按页面 / 交互单元
    ├── _模板.md            # 见 frontend-doc-template.md
    └── {miniprogram|admin}/{area}/{中文页面名}.md
```

- **后端**：`docs/Engineering/backend/{中文模块名}.md`
- **前端**：`docs/Engineering/frontend/{miniprogram|admin}/{area}/{中文页面名}.md`

`{area}` 是导航/产品分区（如 `issues/`、`agents/`、`messenger/`），`{page-slug}` 对应一个页面或独立交互单元（含 Tab 子页、抽屉、弹层）。

---

## 前后端分工

| 侧 | 划分单位 | 回答的问题 | 模板 |
|----|----------|------------|------|
| **前端** | 页面 / 交互单元 | 用户看到什么、怎么操作、门禁与跳转 | [frontend-doc-template.md](frontend-doc-template.md) |
| **后端** | 功能模块 | 触发什么、怎么处理、落什么库、谁唤醒谁 | [backend-doc-template.md](backend-doc-template.md) |

前端梳理时发现接口/状态缺口，在规格中标注 **待后端确认**，并在对应 `backend/{module}.md` 补数据流。后端梳理时发现 UI 未覆盖的入口，标注 **待前端确认**。

---

## 如何区分后端「功能模块」

模块边界按**产品逻辑**切，不按代码目录、route 文件或 service 文件切。

### 判定四问（须全部能答「是」才合并为同一模块）

1. **业务名词**：能否用一个业务名词向同事讲完这块？（「Issue 生命周期」可以；「`routes/issues.ts`」不行）
2. **状态归属**：是否共享同一套核心状态 / 生命周期？（Issue 状态 vs Run 执行状态应分开）
3. **Actor 意图**：是否同一类角色的同一类意图？（Operator 批预算 vs Agent checkout issue 应分开）
4. **数据流闭环**：一条典型数据流能否在本模块文档内写完整（触发 → 规则 → 落库）？跨模块只写「由 xx 模块触发」

### 切分 tie-breaker

- 优先对齐 `doc/product/_taxonomy.md` 的 domain ownership
- Issue **状态**归 `issues`；**谁该行动**归 `work-routing`
- Run **执行**归 `execution`；Issue 上展示的 run 证据是集成关系
- Activity log / dashboard 指标归 `control-plane`；底层状态变更归 emitting domain
- 纯支撑能力（鉴权、org scope、activity 写入）写入各模块「支撑性能力」，或归入 `platform` 模块

### 不算独立模块

- 单个 HTTP 路由、单个 service 文件
- 流程内子步骤（发短信验证码、拉列表、查详情）
- CLI client 命令（归入对应 backend 模块的调用方说明）
- 测试 / dev-only / ui-lab 页面

### Rudder 建议模块清单（backend）

| slug | 涵盖 |
|------|------|
| `platform-and-access` | 鉴权、org scope、instance settings、secrets、storage |
| `organizations-goals-projects` | org 生命周期、goal、project |
| `issues` | issue 身份、层级、状态、comment 槽位 |
| `work-routing` | assignee、reviewer、checkout、wakeup、attention |
| `execution-and-runs` | run admission、heartbeat、transcript、result、execution workspace |
| `agents-and-skills` | agent 身份、runtime、skills、instructions、inbox |
| `collaboration` | chat、messenger、calendar（可按子流拆分小节） |
| `automations` | 定义、触发、run record、output routing |
| `control-plane` | approvals、budgets、costs、activity、dashboard |
| `library-and-context` | Library、resources、project context、workspace 策略 |
| `plugins-and-integrations` | plugin 宿主、Feishu/IM 集成 |
| `runtime-kernel` | 后台调度、scheduler、各类 wakeup（无用户直接操作的业务流程入口） |

模块过大时按**独立数据流簇**拆 `{module}-{sub}.md`，不要按 `server/src/routes/` 文件名拆。

---

## 如何区分前端「页面 / 交互单元」

- **独立路由页** → 一篇文档（如 `issues/issue-detail.md`）
- **同页 Tab / 子视图** → 同一文档内分 `###` 小节，或 Tab 复杂时拆 `{page}-{tab}.md`
- **抽屉 / 弹层 / 侧栏** → 独立交互单元；`页面编码` 为 _（无）_ 时必须写清挂载位置
- **Legacy redirect 路由** → 不单独成篇，在目标页注明旧路径

### Rudder 建议前端分区（frontend/{area}/）

| area | 典型页面 |
|------|----------|
| `onboarding/` | Auth、Invite、BoardClaim、CliAuth、Onboarding |
| `dashboard/` | Dashboard、Calendar |
| `issues/` | Issues 列表、IssueDetail |
| `projects/` | Projects、ProjectDetail |
| `goals/` | Goals、GoalDetail |
| `agents/` | Agents、AgentDetail（各 Tab 可分子节） |
| `messenger/` | Messenger、Chat |
| `automations/` | Automations、AutomationDetail |
| `library/` | OrganizationResources、Workspaces、Backups |
| `organization/` | OrganizationSettings、Export、Import、Heartbeats |
| `control-plane/` | Costs、Activity |
| `instance/` | InstanceSettings 各子页 |
| `plugins/` | PluginManager、PluginPage、PluginSettings |

页面地图可参考 `ui/src/App.tsx` 路由与 `doc/product/surfaces/surface-domain-map.md`，但行为描述以设计文档为准。

---

## 后端梳理规则（必须遵守）

1. 找出模块的**全部入口**（用户操作入口、管理员操作入口、业务流程入口），确认数据流覆盖完整。**某类入口不存在则整段省略**，不写「无」占位。
2. 文件头列出**相关代码**（模块目录、关键 service/router、跨模块依赖文件）。
3. 每条数据流：从入口开始，文字描述鉴权、处理逻辑与规则、数据如何变化。**禁止**在数据流章节用函数链、箭头、SQL、逐字段 schema 代替叙述（字段明细放在 **五、数据表**）。
4. **路由不是入口**——子步骤接口、列表/详情查询、鉴权依赖不算入口。
5. 识别冗余：重复路由、dev-only、未完成 todo、测试/部署分叉。
6. **数据表归属**：本模块**拥有**的表在 **五、数据表** 写全字段与生命周期；仅引用、不由本模块定义的表只列名称并指向所属模块文档，**不得重复展开字段**。
7. **一张表只出现在一个模块文档**：归属「关联最大、写入/状态变更最核心」的模块；其他模块数据流里只写「读写 `table_x`（见 xx 模块）」。

### 后端调研方法（Rudder）

1. 读 `server/src/routes/` 与对应 `server/src/services/`
2. 读 `server/src/bootstrap/` 确认路由挂载与中间件
3. 后台流程读 `server/src/services/runtime-kernel/`、各类 `*-wakeup.ts`
4. CLI 调用链读 `cli/src/commands/client/`，归入对应 backend 模块
5. 区分三类能力：用户操作入口 / 业务流程入口 / 支撑性能力（不算入口）

---

## 前端梳理规则（必须遵守）

1. 按**用户可感知的页面或交互单元**写，不按 API 路径或组件文件名堆叠。
2. 文件头列出**相关代码**（页面目录、子组件、api 封装、工具函数）。
3. **页面功能**写入口、主流程、门禁、状态跳转、异常/空态——文字描述，禁止 `navigateTo → GET /xxx`。
4. 无独立路由的弹层/抽屉必须写**挂载位置**。
5. 表单类条目列出字段、约束、默认值来源；与后端缺口标 **待后端确认**。

### 前端调研方法（Rudder）

1. 从 `ui/src/App.tsx` 确认路由与 legacy redirect
2. 读 `ui/src/pages/{Page}.tsx` 及 `.parts.tsx` 拆分子组件
3. 对照 `doc/product/surfaces/surface-domain-map.md` 标注关联 domain（引用，不复制契约正文）

---

## 文档结构速查

**后端**（详见 [backend-doc-template.md](backend-doc-template.md)）：

| 章节 | 内容 |
|------|------|
| 一、功能入口 | 仅列出实际存在的入口类型 + 不算入口的支撑能力 |
| 二、数据流详解 | 触发、处理逻辑、落库产物（不写逐字段 schema） |
| 三、支撑性能力说明 | 鉴权、门控等 |
| 四、冗余与待清理功能 | 重复、废弃、todo |
| 五、数据表 | 本模块拥有的表：横向字段表、行生命周期（状态 + 括号说明如何到达） |

**前端**（详见 [frontend-doc-template.md](frontend-doc-template.md)）：

| 字段块 | 内容 |
|--------|------|
| 相关代码 | 页面目录、组件、api 等路径 |
| 页面编码 / 挂载位置 | 路由或父页触发方式 |
| 结构 / 组件 | 容器类型、区块、关键组件 |
| 页面功能（设计逻辑） | 入口、主流程、门禁、跳转、空态 |
| 内容 | 各区块展示字段与操作 |
| 实现核对（可选） | 代码对照时追加 |

---

## 结束动作

1. 写出或更新 `docs/Engineering/{backend|frontend}/…` 文档
2. 向用户汇报：
   - **后端**：入口清单、数据流标题列表、**本模块拥有的数据表清单**、冗余/待确认问题
   - **前端**：已覆盖页面/交互单元列表、待后端确认项
3. 明确询问用户是否确认文档
4. 若用户需要飞书可视化，确认后转 [`logic-design-whiteboard`](../logic-design-whiteboard/SKILL.md)（**不得**在未经确认时上传画板）

### 文档与画板分工（后端）

| 载体 | 适合呈现 |
|------|----------|
| **本 skill 产出的 md** | 完整叙述、关联表引用、冗余与待确认 |
| **飞书画板** | 一模块一板：分色功能入口 → 数据流四步 → 落库 → 本模块表结构 + 生命周期 |

画板规则见 [`logic-design-whiteboard`](../logic-design-whiteboard/SKILL.md)（前端画板暂不处理）。

---

## 后端数据表章节规则

仅 **backend** 文档需要 **五、数据表**。调研时以 `backend/src/.../models.py` 为准，结合 service 里的状态枚举与转换逻辑。

**可读性（必守）**：全文遵守 [文档可读性规范.md](../../../docs/Engineering/文档可读性规范.md)——**不设文首术语表**；关键词首次出现须标 **类别 + 含义**（11 类见规范 §一）；数据表列统一称 **表字段**；**参数**按上下文标注（前文已点明函数/接口时只写「参数」，单独出现时写「函数参数」「接口参数」等，见规范 §「表字段与参数」）；每张表须有 **这张表记什么**。

### 表归属

- 每张物理表**只在一个** backend 模块文档中展开字段与生命周期。
- 判定归属：哪条数据流**创建该行、驱动其核心状态变更、或持有其业务语义**——就选那个模块。
- 本模块只读/只写外键的表：在数据流或五章末尾列「关联表（他模块拥有）」表名 + 链接，不写字段表。

### 字段写法

每张表结构：

1. `### 表：\`{name}\`（{中文短名}）`
2. **这张表记什么**（1～3 句）
3. 横向字段表：第一行字段名；第二行起写**该字段在业务里表示什么**
4. **行生命周期**

字段过多时可拆成多张横向表（按语义分组）。

### 生命周期写法

以**状态为中心**：列出该路线上的全部状态，每个状态后加括号，写**如何到达该状态**（从何转换、何动作或事件触发）。不用箭头链串状态。

1. 有多条路线（正常、并发、失败、幂等）时分「路线 N」小节，每节内列状态。
2. 初始状态括号写创建/插入条件；终态写清楚是否物理删除（删除后无行，不必强行写成 status 值）。
3. 无 status 字段的表：用业务状态词描述行存续（如 enabled、deleted），括号内同样写到达方式。
4. 括号内一句以内为主；仅写「从上一状态怎么来」，不必重复整段数据流。
5. **语言统一**：**同一张表**的生命周期里，状态名要么**全英文**要么**全中文**，禁止中英混排（如 active 与「已删除」并列）。Rudder 代码枚举为英文时，优先全英文，与 `status` 等字段取值一致；解释说明放在括号内，可用中文。

### 与数据流章节的分工

| 章节 | 写什么 |
|------|--------|
| 二、数据流 | 何时写哪张表、写哪些业务含义的字段；用表名，不列全字段 |
| 五、数据表 | 全字段清单 + 行生命周期；数据流已提到的表在这里补全 |

---

## 更新流程

| 场景 | 动作 |
|------|------|
| 代码/产品变更影响逻辑 | 更新对应 md → 用户确认 |
| 仅文案微调 | 更新 md → 用户确认 |
| 前后端发现不一致 | 两边同步标注，确认后对齐 |

---

## 禁止事项

- 把路由路径、API 路径、组件名当作「用户触发」描述
- 在**数据流章节**用箭头/函数链/SQL/逐字段 schema 代替业务逻辑叙述（字段明细应放在五、数据表）
- 同一张数据表在多个 backend 模块文档中重复展开字段
- 同一张表的生命周期状态名中英文混用
- 把代码目录结构直接当作模块划分
- 与 `doc/product/` 契约混写——可引用 contract ID，不复制 guarded 正文

---

## 附加资源

- 后端模板：[backend-doc-template.md](backend-doc-template.md)
- 前端模板：[frontend-doc-template.md](frontend-doc-template.md)
- 确认后同步飞书画板：[`logic-design-whiteboard`](../logic-design-whiteboard/SKILL.md)
- 产品域 taxonomy：`doc/product/_taxonomy.md`
- 页面 ↔ domain 地图：`doc/product/surfaces/surface-domain-map.md`
