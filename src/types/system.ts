/**
 * 系统相关类型定义
 * System Related Type Definitions
 */

import type { BreadcrumbItem } from './common'

/**
 * 环境信息接口
 * Environment Information Interface
 */
export interface EnvironmentInfo {
  /** API 基础地址 */
  apiBaseUrl: string
  /** 应用标题 */
  appTitle: string
  /** 运行模式 */
  mode: string
  /** 版本号 */
  version?: string
  /** 构建时间 */
  buildTime?: string
}

/**
 * 应用配置接口
 * Application Configuration Interface
 */
export interface AppConfig {
  /** 应用名称 */
  name: string
  /** 应用版本 */
  version: string
  /** 应用描述 */
  description: string
  /** 作者信息 */
  author: string
  /** 许可证 */
  license: string
  /** 仓库地址 */
  repository?: string
  /** 主页地址 */
  homepage?: string
}

/**
 * 路由元信息接口
 * Route Meta Information Interface
 */
export interface RouteMeta {
  /** 页面标题 */
  title?: string
  /** 图标 */
  icon?: string
  /** 是否需要认证 */
  requiresAuth?: boolean
  /** 权限列表 */
  permissions?: string[]
  /** 是否在菜单中隐藏 */
  hidden?: boolean
  /** 面包屑 */
  breadcrumb?: BreadcrumbItem[]
  /** 缓存标识 */
  keepAlive?: boolean
}

/**
 * 错误信息接口
 * Error Information Interface
 */
export interface ErrorInfo {
  /** 错误代码 */
  code: string | number
  /** 错误消息 */
  message: string
  /** 错误详情 */
  details?: any
  /** 错误堆栈 */
  stack?: string
  /** 发生时间 */
  timestamp?: string
}
