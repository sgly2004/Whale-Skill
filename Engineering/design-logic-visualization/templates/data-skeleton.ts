/**
 * 最小可运行数据骨架 · 按文档入口/表替换 TODO
 * 对齐 design-logic-visualization 规范
 */

import type { GitPath, TableDef } from './data-types';

export const tables: TableDef[] = [
  {
    id: 'example_entity',
    name: 'example_entity',
    cnName: '示例实体表',
    summary: 'TODO：从逻辑设计文档 §数据表 原样摘录摘要。',
    fields: [
      { name: 'id', desc: '主键' },
      { name: 'status', desc: '状态枚举' },
      // 横表渲染：上行 name，下行 desc
    ],
    lifecycles: [
      {
        title: '路线 1 — 主路径',
        states: [
          'draft（创建时默认）',
          'published（上架后）',
          // 有序编号由 UI 渲染；保留括号因果
        ],
      },
    ],
  },
];

/** 共享中段：多路径汇入时只维护一份 */
const sharedMidChain = {
  id: 'shared_step',
  title: 'TODO：共享中段步骤',
  bullets: ['TODO：从文档摘录，保留英文名（中文注释）'],
  tableRefs: [{ tableId: 'example_entity', op: 'readwrite' as const }],
};

export const paths: GitPath[] = [
  {
    id: 'path_main',
    badge: '数据流 1',
    title: 'TODO：主路径标题',
    trigger: 'TODO：用户在 C 端的操作描述',
    entry: {
      id: 'entry_main',
      title: 'TODO：用户触发动作标题',
      isTrigger: true,
      pathStart: true,
      bullets: [
        '入口健全：…',
        '校验：…',
        // 相关健全合并；展开建议 3～7 条
      ],
      tableRefs: [{ tableId: 'example_entity', op: 'read' }],
      next: {
        id: 'd_fork',
        kind: 'decision',
        title: 'TODO：条件？',
        branches: [
          {
            label: '是',
            node: {
              id: 'branch_yes',
              title: 'TODO：是分支动作',
              next: sharedMidChain,
            },
          },
          {
            label: '否',
            node: {
              id: 'branch_no',
              title: 'TODO：否分支动作',
              // 汇入已有时序，勿复制整棵子树
              jumps: [{ label: '→ 时序：TODO目标标题', targetId: 'shared_step' }],
            },
          },
        ],
      },
    },
  },
  {
    id: 'path_admin',
    badge: 'Admin',
    title: 'TODO：后台维护',
    trigger: 'TODO：管理员后台操作',
    entry: {
      id: 'entry_admin',
      title: 'TODO：管理员触发动作',
      isTrigger: true,
      pathStart: true,
      bullets: ['…'],
      tableRefs: [{ tableId: 'example_entity', op: 'readwrite' }],
    },
  },
];
