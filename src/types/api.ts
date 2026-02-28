/**
 * API 类型定义
 * 定义通用的 API 响应结构和相关类型
 */

/**
 * 通用 API 响应结构
 * @template T - 响应数据的类型
 */
export interface ApiResponse<T = any> {
  /** 响应状态码 (0 表示成功) */
  code: number
  /** 响应数据 */
  data: T
  /** 响应消息 */
  message: string | null
  /** 错误消息 */
  errorMessage: string | null
}

/**
 * 分页响应结构
 * @template T - 列表项的类型
 */
export interface PageResponse<T> {
  /** 数据列表 */
  content: T[]
  /** 总记录数 */
  total: number
  /** 当前页码 */
  page: number
  /** 每页记录数 */
  size: number
}

/**
 * 错误响应结构
 */
export interface ErrorResponse {
  /** 错误状态码 */
  code: number
  /** 错误消息 */
  message: string
  /** 错误详情（可选） */
  details?: any
}

/**
 * 请求配置扩展
 * 扩展 axios 的请求配置
 */
export interface RequestConfig {
  /** 是否跳过错误处理器 */
  skipErrorHandler?: boolean
  /** 是否显示加载提示 */
  showLoading?: boolean
  /** 自定义错误消息 */
  errorMessage?: string
}
