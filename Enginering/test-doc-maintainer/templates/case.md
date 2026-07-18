# Case 模板

## 标题格式

```markdown
#### {步骤.序号} · normal/boundary · {一句话}（TC_ID）
```

---

## 完整结构（八段式）

```markdown
#### 2.1 · normal · 论坛列表正常加载（TC_FORUM_FUN_001）

**元数据**

| 字段 | 值 |
|---|---|
| case_id | TC_FORUM_FUN_001 |
| path | P07 · 论坛浏览与发帖 |
| step | 1 |
| variant | normal |
| requires | ["opc_logged_in"] |
| provides | ["forum_list_visible", "opc_token"] |
| mutates | [] |
| mode | flow-first |
| isolation | shared-user |
| idempotent | true |
| priority | P0 |

**设计自检**：功能 ✓ · 衔接 — · 边界 — · …

**意图**：验证论坛列表页正常加载，公告帖置顶，至少有一条内容（或空状态提示）

**输入**
- 操作端：小程序 opc
- 当前状态：dev-opc-1 已登录小程序，处于首页任意 Tab

**步骤**

1. [mp-opc] 点击底部 Tab 栏「论坛」，等待列表页路由稳定（标题区出现「论坛」，加载动画消失）。
2. [mp-opc] 观察列表：若有数据，向下滚动确认至少一条帖子卡片（标题、昵称、时间）。
3. [mp-opc] 若有公告帖（「官方」/「公告」徽标），断言其排在第一位。
4. [mp-opc] 若列表为空，断言空状态文案（如「暂无帖子」）。

**预期**

- [ ] Step 1：列表页渲染完成，无 JS 报错弹窗，无网络错误提示。
- [ ] Step 2：至少一条帖子卡片可见，或显示空状态。
- [ ] Step 3：公告帖在首位且徽标正确。
- [ ] Step 4：空态文案可见，无白屏或 undefined。

**证据要求**

- 截图：Step 1 首屏；Step 3 若有公告则列表顶部
- 日志：若网络报错，记录 URL 与状态码
```

---

## 边界变体示例

```markdown
#### 4.2 · boundary · 标题为空不可提交（TC_FORUM_BND_003）

**元数据**

| 字段 | 值 |
|---|---|
| case_id | TC_FORUM_BND_003 |
| path | P07 · 步骤 4 · 发帖标题 |
| step | 4 |
| variant | boundary-empty-title |
| requires | ["opc_logged_in", "forum_compose_open"] |
| … | … |

**意图**：标题为空时不可提交或提示校验错误

**步骤**

1. [mp-opc] 在发帖页不填标题，填正文，点击发布。
2. [mp-opc] 断言仍停留在发帖页，出现标题必填提示。

**预期**

- [ ] Step 2：未产生新帖子；toast 或字段级错误可见。

**证据要求**

- 截图：校验提示可见
```

---

## 组内书写规则

- 组内**第一条**写完整步骤；后续 case 只写增量
- **预期**同组不重复已断言项
- **页面字段**：组内首条在预期末写 `**页面字段**` checklist；后续一行引用首条 TC
