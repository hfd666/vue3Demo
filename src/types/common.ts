/**
 * 通用类型定义
 * Common Type Definitions
 *
 * 这里放置跨多个业务领域使用的基础类型
 */

/**
 * 基础响应结果接口
 * Base Response Interface
 */
export interface BaseResponse<T = any> {
  /** 状态码 */
  code: number
  /** 响应消息 */
  message: string
  /** 响应数据 */
  data: T
  /** 是否成功 */
  success: boolean
}

/**
 * 分页参数接口
 * Pagination Parameters Interface
 */
export interface PaginationParams {
  /** 当前页码 */
  page: number
  /** 每页条数 */
  pageSize: number
  /** 总条数 */
  total?: number
}

/**
 * 分页响应接口
 * Paginated Response Interface
 */
export interface PaginatedResponse<T = any> {
  /** 数据列表 */
  list: T[]
  /** 分页信息 */
  pagination: PaginationParams
}

/**
 * 选项接口（用于下拉框、单选框等）
 * Option Interface (for select, radio, etc.)
 */
export interface Option<T = any> {
  /** 显示标签 */
  label: string
  /** 选项值 */
  value: T
  /** 是否禁用 */
  disabled?: boolean
  /** 额外数据 */
  extra?: Record<string, any>
}

/**
 * 标签页接口（多个组件使用）
 * Tab Item Interface (used by multiple components)
 */
export interface TabItem {
  /** 标签页名称（用作 key） */
  name: string
  /** 显示标题 */
  label: string
  /** 图标名称（可选） */
  icon?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否可关闭 */
  closable?: boolean
}

/**
 * 操作按钮接口（多个组件使用）
 * Action Button Interface (used by multiple components)
 */
export interface ActionButton {
  /** 按钮文本 */
  text: string
  /** 按钮类型 */
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
  /** 图标名称 */
  icon?: string
  /** 点击事件处理函数 */
  handler: () => void | Promise<void>
  /** 是否禁用 */
  disabled?: boolean
  /** 是否显示加载状态 */
  loading?: boolean
  /** 权限标识 */
  permission?: string
}

/**
 * 面包屑项接口（布局和页面组件使用）
 * Breadcrumb Item Interface (used by layout and page components)
 */
export interface BreadcrumbItem {
  /** 路径 */
  path: string
  /** 标题 */
  title: string
  /** 图标组件 */
  icon?: any
}

/**
 * 旧版菜单项接口（已弃用，请使用 ui.ts 中的 MenuItem）
 * Legacy Menu Item Interface (Deprecated, use MenuItem from ui.ts instead)
 */
export interface LegacyMenuItem {
  /** 菜单ID */
  id: string
  /** 菜单标题 */
  title: string
  /** 路由路径 */
  path: string
  /** 图标名称 */
  icon?: string
  /** 是否激活 */
  active?: boolean
  /** 子菜单 */
  children?: LegacyMenuItem[]
}
