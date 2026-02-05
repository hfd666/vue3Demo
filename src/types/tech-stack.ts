/**
 * 技术栈相关类型定义
 * Technology Stack Related Type Definitions
 */

/**
 * 技术栈项目接口
 * Technology Stack Item Interface
 */
export interface TechStackItem {
  /** 技术名称 */
  name: string
  /** 图标名称（Element Plus 图标） */
  icon: string
  /** 主题色 */
  color: string
  /** 描述信息（可选） */
  description?: string
  /** 官网链接（可选） */
  url?: string
  /** 版本号（可选） */
  version?: string
  /** 分类 */
  category?: 'framework' | 'language' | 'tool' | 'ui' | 'style' | 'build' | 'test'
}

/**
 * 技术栈分类接口
 * Technology Stack Category Interface
 */
export interface TechStackCategory {
  /** 分类名称 */
  name: string
  /** 分类标题 */
  title: string
  /** 分类描述 */
  description: string
  /** 分类图标 */
  icon: string
  /** 该分类下的技术栈 */
  items: TechStackItem[]
}

/**
 * 技术栈统计接口
 * Technology Stack Statistics Interface
 */
export interface TechStackStats {
  /** 总数 */
  total: number
  /** 按分类统计 */
  byCategory: Record<string, number>
  /** 最新添加的技术 */
  latest: TechStackItem[]
}
