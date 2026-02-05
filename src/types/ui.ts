/**
 * UI 组件相关类型定义
 * UI Components Related Type Definitions
 */

/**
 * 菜单项接口
 * Menu Item Interface
 */
export interface MenuItem {
  /** 路径 */
  path: string
  /** 标题 */
  title: string
  /** 图标组件 */
  icon?: any
  /** 子菜单 */
  children?: MenuItem[]
  /** 权限要求 */
  permission?: string
  /** 是否隐藏 */
  hidden?: boolean
  /** 排序权重 */
  order?: number
  /** 元数据 */
  meta?: Record<string, any>
}

/**
 * 用户信息接口
 */
export interface UserInfo {
  /** 用户ID */
  id: number
  /** 用户名 */
  name: string
  /** 邮箱 */
  email: string
  /** 头像 */
  avatar?: string
  /** 电话 */
  phone?: string
  /** 部门 */
  department?: string
  /** 职位 */
  position?: string
}

/**
 * 卡片信息接口
 * Card Info Interface
 */
export interface CardInfo {
  /** 卡片标题 */
  title: string
  /** 卡片内容 */
  content: string
  /** 图标名称 */
  icon?: string
  /** 卡片类型 */
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  /** 额外数据 */
  extra?: Record<string, any>
}

/**
 * 统计数据接口
 * Statistics Data Interface
 */
export interface StatisticsItem {
  /** 统计标题 */
  title: string
  /** 统计数值 */
  value: number | string
  /** 单位 */
  unit?: string
  /** 图标 */
  icon?: string
  /** 颜色 */
  color?: string
  /** 变化趋势 */
  trend?: 'up' | 'down' | 'stable'
  /** 变化百分比 */
  changePercent?: number
}

/**
 * 表格列配置接口
 * Table Column Configuration Interface
 */
export interface TableColumn {
  /** 列标识 */
  key: string
  /** 列标题 */
  title: string
  /** 列宽度 */
  width?: number | string
  /** 是否可排序 */
  sortable?: boolean
  /** 是否固定 */
  fixed?: 'left' | 'right'
  /** 自定义渲染函数 */
  render?: (value: any, record: any, index: number) => any
}

/**
 * 表单项配置接口
 * Form Item Configuration Interface
 */
export interface FormItemConfig {
  /** 字段名 */
  name: string
  /** 字段标签 */
  label: string
  /** 字段类型 */
  type: 'input' | 'select' | 'textarea' | 'date' | 'number' | 'switch' | 'radio' | 'checkbox'
  /** 是否必填 */
  required?: boolean
  /** 验证规则 */
  rules?: any[]
  /** 选项（用于 select、radio、checkbox） */
  options?: Array<{ label: string; value: any }>
  /** 占位符 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
}

/**
 * 分页配置
 */
export interface PaginationConfig {
  /** 当前页 */
  currentPage: number
  /** 每页条数 */
  pageSize: number
  /** 总条数 */
  total: number
  /** 每页条数选项 */
  pageSizes?: number[]
}

/**
 * 表单规则
 */
export interface FormRule {
  /** 是否必填 */
  required?: boolean
  /** 错误消息 */
  message?: string
  /** 触发方式 */
  trigger?: 'blur' | 'change'
  /** 最小长度 */
  min?: number
  /** 最大长度 */
  max?: number
  /** 正则表达式 */
  pattern?: RegExp
  /** 自定义验证函数 */
  validator?: (rule: any, value: any, callback: any) => void
}
