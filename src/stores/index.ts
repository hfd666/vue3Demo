/**
 * Pinia 状态管理配置
 * 统一导出所有 store
 */

import { createPinia } from 'pinia'

// 创建 pinia 实例
export const pinia = createPinia()

// 导出所有 store
export { useLayoutStore } from './layout'
export { useUserStore } from './user'

// 默认导出 pinia 实例
export default pinia
