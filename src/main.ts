/**
 * 应用入口文件
 * 创建 Vue 应用实例并进行初始化配置
 */

import { createApp } from 'vue'
import { markRaw } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from './stores'

// 导入 Element Plus 的 JavaScript API
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

// 导入全局样式
import './assets/styles/main.scss'

// 导入 Element Plus 图标（按需导入）
// 只导入项目中实际使用的图标，减少打包体积
import {
  // 路由中使用的图标
  House,
  DataBoard,
  User,
  Setting,
  Document,
  // Home.vue 中使用的图标
  Plus,
  View,
  Edit,
  Delete,
  // 侧边栏中使用的图标
  Expand,
  Fold,
  // Dashboard.vue 中使用的图标
  ArrowDown,
  TrendCharts,
  // LayoutHeader.vue 中使用的图标
  Grid,
  FullScreen,
  SwitchButton
} from '@element-plus/icons-vue'

// 需要全局注册的图标列表
const iconsToRegister = {
  House,
  DataBoard,
  User,
  Setting,
  Document,
  Plus,
  View,
  Edit,
  Delete,
  Expand,
  Fold,
  ArrowDown,
  TrendCharts,
  Grid,
  FullScreen,
  SwitchButton
}

/**
 * 环境变量验证
 * 确保必需的环境变量已定义
 */
const validateEnv = (): void => {
  const requiredEnvVars = ['VITE_API_BASE_URL', 'VITE_APP_TITLE']

  const missingVars = requiredEnvVars.filter(varName => {
    const value = import.meta.env[varName]
    return !value || value === ''
  })

  if (missingVars.length > 0) {
    console.error('错误: 以下环境变量未定义或为空:')
    missingVars.forEach(varName => {
      console.error(`  - ${varName}`)
    })
    console.warn('应用将使用默认配置继续运行，但可能会出现问题。')
  } else {
    console.log('✓ 环境变量验证通过')
  }

  // 输出当前环境信息
  console.log('当前环境信息:')
  console.log(`  - 模式: ${import.meta.env.MODE}`)
  console.log(`  - API 基础地址: ${import.meta.env.VITE_API_BASE_URL}`)
  console.log(`  - 应用标题: ${import.meta.env.VITE_APP_TITLE}`)
}

/**
 * 创建并配置 Vue 应用实例
 */
const createVueApp = () => {
  // 验证环境变量
  validateEnv()

  // 创建 Vue 应用实例
  const app = createApp(App)

  // 注册 Element Plus 图标（按需注册）
  // 使用 markRaw 避免图标组件被意外地变成响应式对象
  // 只注册项目中实际使用的图标，大大减少内存占用和启动时间
  for (const [key, component] of Object.entries(iconsToRegister)) {
    app.component(key, markRaw(component))
  }

  // 挂载 Element Plus 的 JavaScript API 到全局属性
  app.config.globalProperties.$message = ElMessage
  app.config.globalProperties.$msgbox = ElMessageBox
  app.config.globalProperties.$messageBox = ElMessageBox
  app.config.globalProperties.$notify = ElNotification

  // 注册路由
  app.use(router)

  // 注册状态管理
  app.use(pinia)

  // // 全局错误处理
  // app.config.errorHandler = (err, instance, info) => {
  //   console.error('全局错误捕获:', err)
  //   console.error('错误信息:', info)
  //   if (instance) {
  //     console.error('组件实例:', instance)
  //   }
  // }

  // // 全局警告处理（仅在开发环境）
  // if (import.meta.env.DEV) {
  //   app.config.warnHandler = (msg, instance, trace) => {
  //     console.warn('Vue 警告:', msg)
  //     console.warn('组件追踪:', trace)
  //     if (instance) {
  //       console.warn('组件实例:', instance)
  //     }
  //   }
  // }

  // 挂载应用
  app.mount('#app')

  console.log('✓ Vue 应用已成功启动')

  return app
}

// 启动应用
createVueApp()
