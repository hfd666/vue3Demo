/**
 * 路由配置
 * 使用 Vue Router 4.x 配置应用路由
 */

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { markRaw } from 'vue'
import { House, Grid, MessageBox, Upload } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

/**
 * 扩展路由元信息类型
 */
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: any
    requiresAuth?: boolean
    permissions?: string[]
    roles?: string[]
    hidden?: boolean
    layout?: 'default' | 'blank'
    order?: number
  }
}

/**
 * 路由配置列表
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: '登录',

      hidden: true, // 在菜单中隐藏
      layout: 'blank' // 不使用布局
    }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页',
      icon: markRaw(House),
      order: 1
    }
  },
  {
    path: '/table-demo',
    name: 'TableDemo',
    component: () => import('@/views/demos/TableDemo.vue'),
    meta: {
      title: '表格示例',
      icon: markRaw(Grid),
      order: 2
    }
  },
  {
    path: '/dialog-demo',
    name: 'DialogDemo',
    component: () => import('@/views/demos/DialogDemo.vue'),
    meta: {
      title: '弹窗示例',
      icon: markRaw(MessageBox),
      order: 3
    }
  },
  {
    path: '/upload-demo',
    name: 'UploadDemo',
    component: () => import('@/views/demos/UploadDemo.vue'),
    meta: {
      title: '上传示例',
      icon: markRaw(Upload),
      order: 4
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: '页面未找到',
      hidden: true, // 在菜单中隐藏
      layout: 'blank' // 不使用布局
    }
  }
]

/**
 * 创建路由实例
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

/**
 * 全局前置守卫
 * 在路由跳转前执行权限验证和其他逻辑
 *
 * 策略：默认所有页面都需要登录，白名单中的页面除外（管理系统标准做法）
 */
router.beforeEach((to, _from, next) => {
  // 获取用户状态（已在 main.ts 中初始化）
  const userStore = useUserStore()

  // 设置页面标题
  const pageTitle = to.meta.title
    ? `${to.meta.title} - ${import.meta.env.VITE_APP_TITLE}`
    : import.meta.env.VITE_APP_TITLE
  document.title = pageTitle

  // 白名单：不需要登录即可访问的页面
  const whiteList = ['/login', '/register', '/forgot-password']
  const isInWhiteList = whiteList.includes(to.path)

  // 特殊页面：404 页面不需要登录即可访问
  const isSpecialPage = to.name === 'NotFound'

  // 获取登录状态
  const isLoggedIn = userStore.isLoggedIn && Boolean(userStore.token)

  // 1. 如果已登录且访问登录页，重定向到目标页面或首页
  if (to.path === '/login' && isLoggedIn) {
    const redirect = (to.query.redirect as string) || '/'
    next(redirect)
    return
  }

  // 2. 如果未登录且不在白名单中（且不是特殊页面），跳转登录页
  if (!isLoggedIn && !isInWhiteList && !isSpecialPage) {
    ElMessage.warning('请先登录')
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
    return
  }

  // 3. 已登录，检查权限
  if (isLoggedIn) {
    // 检查页面权限
    const requiredPermissions = (to.meta.permissions as string[]) || []
    if (requiredPermissions.length > 0) {
      const hasPermission = requiredPermissions.some(permission =>
        userStore.hasPermission(permission)
      )
      if (!hasPermission) {
        ElMessage.error('您没有访问该页面的权限')
        next({ path: '/', replace: true })
        return
      }
    }

    // 检查角色
    const requiredRoles = (to.meta.roles as string[]) || []
    if (requiredRoles.length > 0) {
      const hasRole = requiredRoles.some(role => userStore.hasRole(role))
      if (!hasRole) {
        ElMessage.error('您没有访问该页面的权限')
        next({ path: '/', replace: true })
        return
      }
    }
  }

  // 4. 通过所有检查，允许访问
  next()
})

/**
 * 全局后置守卫
 * 在路由跳转完成后执行
 */
router.afterEach(to => {
  // 页面访问统计（可选）
  if (import.meta.env.DEV) {
    console.log(`当前路由: ${to.path}`)
  }
})

/**
 * 路由错误处理
 */
router.onError(error => {
  console.error('路由错误:', error)
  ElMessage.error('页面加载失败，请刷新重试')
})

export default router
