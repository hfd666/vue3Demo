/**
 * 首页相关类型定义
 * Home Page Related Type Definitions
 */

/**
 * 首页标签页类型
 * Home Page Tab Types
 */
export type HomeTabName = 'component' | 'element' | 'http' | 'scss' | 'api'

/**
 * 首页标签页配置接口
 * Home Page Tab Configuration Interface
 */
export interface HomeTabConfig {
  /** 标签页名称 */
  name: HomeTabName
  /** 显示标题 */
  label: string
  /** 图标名称 */
  icon?: string
  /** 组件名称 */
  component?: string
  /** 是否禁用 */
  disabled?: boolean
}

/**
 * 首页统计卡片接口
 * Home Page Statistics Card Interface
 */
export interface HomeStatsCard {
  /** 标题 */
  title: string
  /** 数值 */
  value: string | number
  /** 图标 */
  icon: string
  /** 颜色 */
  color: string
  /** 描述 */
  description?: string
  /** 趋势 */
  trend?: 'up' | 'down' | 'stable'
}

/**
 * 首页快速操作接口
 * Home Page Quick Action Interface
 */
export interface HomeQuickAction {
  /** 操作名称 */
  name: string
  /** 操作标题 */
  title: string
  /** 操作描述 */
  description: string
  /** 图标 */
  icon: string
  /** 颜色 */
  color: string
  /** 点击处理函数 */
  handler: () => void | Promise<void>
  /** 是否禁用 */
  disabled?: boolean
}

/**
 * 快速开始步骤接口
 * Quick Start Step Interface
 */
export interface QuickStartStep {
  /** 步骤标题 */
  title: string
  /** 步骤描述 */
  description: string
  /** 执行命令 */
  command: string
  /** 步骤状态 */
  status: 'wait' | 'process' | 'finish' | 'error'
}

/**
 * 项目特性接口
 * Project Feature Interface
 */
export interface Feature {
  /** 特性名称 */
  name: string
  /** 特性描述 */
  description: string
  /** 图标名称 */
  icon: string
  /** 主题颜色 */
  color: string
  /** 是否已实现 */
  implemented: boolean
  /** 文档链接（可选） */
  docUrl?: string
}
