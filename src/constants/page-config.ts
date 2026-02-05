/**
 * 页面配置常量
 * Page Configuration Constants
 */

import type { HomeTabConfig, QuickStartStep, Feature } from '@/types/home'

/**
 * 首页标签页配置
 * Home Page Tab Configuration
 */
export const HOME_TAB_CONFIG: HomeTabConfig[] = [
  {
    name: 'component',
    label: 'Vue 3 组件',
    icon: 'View',
    component: 'HelloWorld'
  },
  {
    name: 'element',
    label: 'Element Plus',
    icon: 'Grid',
    component: 'ElementPlusTest'
  },
  {
    name: 'http',
    label: 'HTTP 请求',
    icon: 'Connection',
    component: 'HttpClientDemo'
  },
  {
    name: 'scss',
    label: 'SCSS 演示',
    icon: 'Brush',
    component: 'ScssDemo'
  },
  {
    name: 'api',
    label: 'API 示例',
    icon: 'Document'
  }
]

/**
 * 快速开始步骤配置
 * Quick Start Steps Configuration
 */
export const QUICK_START_STEPS: QuickStartStep[] = [
  {
    title: '安装依赖',
    description: 'npm install',
    command: 'npm install',
    status: 'finish'
  },
  {
    title: '启动开发服务器',
    description: 'npm run dev',
    command: 'npm run dev',
    status: 'process'
  },
  {
    title: '构建生产版本',
    description: 'npm run build:prod',
    command: 'npm run build:prod',
    status: 'wait'
  }
]

/**
 * 项目特性列表
 * Project Features List
 */
export const PROJECT_FEATURES: Feature[] = [
  {
    name: 'Vue 3 Composition API',
    description: '使用最新的 Vue 3 组合式 API',
    icon: 'View',
    color: '#42b883',
    implemented: true,
    docUrl: 'https://vuejs.org/guide/extras/composition-api-faq.html'
  },
  {
    name: 'TypeScript 支持',
    description: '完整的 TypeScript 类型支持',
    icon: 'Document',
    color: '#3178c6',
    implemented: true,
    docUrl: 'https://www.typescriptlang.org/'
  },
  {
    name: 'Vite 构建工具',
    description: '极速的开发服务器和构建工具',
    icon: 'Lightning',
    color: '#646cff',
    implemented: true,
    docUrl: 'https://vitejs.dev/'
  },
  {
    name: 'Element Plus UI',
    description: '丰富的 UI 组件库',
    icon: 'Grid',
    color: '#409eff',
    implemented: true,
    docUrl: 'https://element-plus.org/'
  },
  {
    name: 'Tailwind CSS',
    description: '实用优先的 CSS 框架',
    icon: 'Brush',
    color: '#06b6d4',
    implemented: true,
    docUrl: 'https://tailwindcss.com/'
  },
  {
    name: 'SCSS 预处理器',
    description: '强大的 CSS 预处理器',
    icon: 'Brush',
    color: '#cf649a',
    implemented: true,
    docUrl: 'https://sass-lang.com/'
  },
  {
    name: 'HTTP 客户端',
    description: '封装的 Axios HTTP 客户端',
    icon: 'Connection',
    color: '#5a29e4',
    implemented: true
  },
  {
    name: '代码质量工具',
    description: 'ESLint + Prettier 代码规范',
    icon: 'Warning',
    color: '#4b32c3',
    implemented: true
  },
  {
    name: '多环境支持',
    description: '开发、测试、生产环境配置',
    icon: 'Setting',
    color: '#909399',
    implemented: true
  }
]
