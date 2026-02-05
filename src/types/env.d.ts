/// <reference types="vite/client" />

/**
 * Vue 单文件组件类型声明
 * 让 TypeScript 识别 .vue 文件
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>
  export default component
}

/**
 * 环境变量类型定义
 * 为 Vite 环境变量提供类型安全的访问方式
 */
interface ImportMetaEnv {
  /**
   * API 基础地址
   * @example 'http://localhost:3000/api'
   */
  readonly VITE_API_BASE_URL: string

  /**
   * 应用标题
   * @example 'Vue3 App Template'
   */
  readonly VITE_APP_TITLE: string

  /**
   * 当前运行模式
   * @example 'development' | 'test' | 'production'
   */
  readonly MODE: string

  /**
   * 应用基础路径
   */
  readonly BASE_URL: string
}

/**
 * 扩展 ImportMeta 接口以包含环境变量
 */
interface ImportMeta {
  readonly env: ImportMetaEnv
}
