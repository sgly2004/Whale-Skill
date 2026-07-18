/**
 * Git 图数据模型模板 · design-logic-visualization
 * 复制到 artifact 的 src/data/ 后按模块填内容。
 */

export type TableOp = 'read' | 'write' | 'readwrite';
export type TableRef = { tableId: string; op: TableOp; note?: string };
export type Jump = { label: string; targetId: string };

export type GitNode = {
  id: string;
  title: string;
  kind?: 'step' | 'decision';
  statusTag?: string;
  /** 仅用户端 / Admin 后台操作；系统回调禁止标入口 */
  isTrigger?: boolean;
  /** 该路径流程起点（深红加重） */
  pathStart?: boolean;
  /** 展开后显示；建议 3～7 条 */
  bullets?: string[];
  tableRefs?: TableRef[];
  /** 汇入已有时序；label 形如「→ 时序：目标标题」 */
  jumps?: Jump[];
  next?: GitNode;
  branches?: { label: string; node: GitNode }[];
};

export type GitPath = {
  id: string;
  badge: string;
  title: string;
  /** 文档中的触发说明（路径标题旁） */
  trigger: string;
  entry: GitNode;
};

export type TableField = { name: string; desc: string };
export type LifecycleRoute = { title: string; states: string[] };

export type TableDef = {
  id: string;
  name: string;
  cnName: string;
  summary: string;
  module?: string;
  fields?: TableField[];
  lifecycles?: LifecycleRoute[];
};
