/**
 * 技术栈常量定义
 * Technology Stack Constants
 */

import type { TechStackItem } from '@/types/tech-stack'

/**
 * 项目技术栈列表
 * Project Technology Stack List
 */
export const TECH_STACK_LIST: TechStackItem[] = [
  {
    name: 'Vue 3',
    icon: 'View',
    color: '#42b883',
    description: '渐进式 JavaScript 框架',
    url: 'https://vuejs.org/'
  },
  {
    name: 'TypeScript',
    icon: 'Document',
    color: '#3178c6',
    description: '类型安全的 JavaScript 超集',
    url: 'https://www.typescriptlang.org/'
  },
  {
    name: 'Vite',
    icon: 'Lightning',
    color: '#646cff',
    description: '极速的开发服务器和构建工具',
    url: 'https://vitejs.dev/'
  },
  {
    name: 'Element Plus',
    icon: 'Grid',
    color: '#409eff',
    description: '基于 Vue 3 的组件库',
    url: 'https://element-plus.org/'
  },
  {
    name: 'Tailwind CSS',
    icon: 'Brush',
    color: '#06b6d4',
    description: '实用优先的 CSS 框架',
    url: 'https://tailwindcss.com/'
  },
  {
    name: 'Sass/SCSS',
    icon: 'Brush',
    color: '#cf649a',
    description: '强大的 CSS 预处理器',
    url: 'https://sass-lang.com/'
  },
  {
    name: 'Vue Router',
    icon: 'Position',
    color: '#42b883',
    description: '官方路由管理器',
    url: 'https://router.vuejs.org/'
  },
  {
    name: 'Axios',
    icon: 'Connection',
    color: '#5a29e4',
    description: '基于 Promise 的 HTTP 客户端',
    url: 'https://axios-http.com/'
  }
]

/**
 * 核心技术栈（用于首页展示）
 * Core Technology Stack (for homepage display)
 */
export const CORE_TECH_STACK: TechStackItem[] = TECH_STACK_LIST.slice(0, 6)

/**
 * 开发工具技术栈
 * Development Tools Technology Stack
 */
export const DEV_TOOLS_TECH_STACK: TechStackItem[] = [
  {
    name: 'ESLint',
    icon: 'Warning',
    color: '#4b32c3',
    description: '代码质量检查工具',
    url: 'https://eslint.org/'
  },
  {
    name: 'Prettier',
    icon: 'MagicStick',
    color: '#f7b93e',
    description: '代码格式化工具',
    url: 'https://prettier.io/'
  },
  {
    name: 'Husky',
    icon: 'Service',
    color: '#42b883',
    description: 'Git hooks 工具',
    url: 'https://typicode.github.io/husky/'
  }
]

/**
 * 根据名称获取技术栈项
 * Get technology stack item by name
 */
export const getTechStackByName = (name: string): TechStackItem | undefined => {
  return TECH_STACK_LIST.find(item => item.name === name)
}

/**
 * 根据类型获取技术栈列表
 * Get technology stack list by type
 */
export const getTechStackByType = (type: 'core' | 'dev-tools' | 'all' = 'all'): TechStackItem[] => {
  switch (type) {
    case 'core':
      return CORE_TECH_STACK
    case 'dev-tools':
      return DEV_TOOLS_TECH_STACK
    case 'all':
    default:
      return TECH_STACK_LIST
  }
}
