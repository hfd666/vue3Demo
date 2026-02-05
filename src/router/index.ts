/**
 * 路由配置
 * 使用 Vue Router 4.x 配置应用路由
 */

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { markRaw } from 'vue'
import { House, DataBoard, User, Setting, Document } from '@element-plus/icons-vue'

/**
 * 路由配置列表
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页',
      icon: markRaw(House),
      requiresAuth: false,
      order: 1
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      title: '仪表盘',
      icon: markRaw(DataBoard),
      requiresAuth: true,
      order: 2
    },
    children: [
      {
        path: 'analytics',
        name: 'DashboardAnalytics',
        component: () => import('@/views/dashboard/Analytics.vue'),
        meta: {
          title: '数据分析',
          requiresAuth: true,
          order: 1
        }
      },
      {
        path: 'monitor',
        name: 'DashboardMonitor',
        component: () => import('@/views/dashboard/Monitor.vue'),
        meta: {
          title: '系统监控',
          requiresAuth: true,
          order: 2
        }
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    redirect: '/user/list',
    meta: {
      title: '用户管理',
      icon: markRaw(User),
      requiresAuth: true,
      permission: 'user:view',
      order: 3
    },
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/views/user/List.vue'),
        meta: {
          title: '用户列表',
          requiresAuth: true,
          permission: 'user:list',
          order: 1
        }
      },
      {
        path: 'roles',
        name: 'UserRoles',
        component: () => import('@/views/user/Roles.vue'),
        meta: {
          title: '角色管理',
          requiresAuth: true,
          permission: 'user:roles',
          order: 2
        }
      },
      {
        path: 'permissions',
        name: 'UserPermissions',
        component: () => import('@/views/user/Permissions.vue'),
        meta: {
          title: '权限管理',
          requiresAuth: true,
          permission: 'user:permissions',
          order: 3
        }
      }
    ]
  },
  {
    path: '/system',
    name: 'System',
    redirect: '/system/settings',
    meta: {
      title: '系统管理',
      icon: markRaw(Setting),
      requiresAuth: true,
      permission: 'system:view',
      order: 4
    },
    children: [
      {
        path: 'settings',
        name: 'SystemSettings',
        component: () => import('@/views/system/Settings.vue'),
        meta: {
          title: '系统设置',
          requiresAuth: true,
          permission: 'system:settings',
          order: 1
        }
      },
      {
        path: 'logs',
        name: 'SystemLogs',
        component: () => import('@/views/system/Logs.vue'),
        meta: {
          title: '系统日志',
          requiresAuth: true,
          permission: 'system:logs',
          order: 2
        }
      },
      {
        path: 'backup',
        name: 'SystemBackup',
        component: () => import('@/views/system/Backup.vue'),
        meta: {
          title: '数据备份',
          requiresAuth: true,
          permission: 'system:backup',
          order: 3
        }
      }
    ]
  },
  {
    path: '/docs',
    name: 'Docs',
    redirect: '/docs/api',
    meta: {
      title: '开发文档',
      icon: markRaw(Document),
      requiresAuth: true,
      order: 5
    },
    children: [
      {
        path: 'api',
        name: 'DocsApi',
        component: () => import('@/views/docs/Api.vue'),
        meta: {
          title: 'API 文档',
          requiresAuth: true,
          order: 1
        }
      },
      {
        path: 'components',
        name: 'DocsComponents',
        component: () => import('@/views/docs/Components.vue'),
        meta: {
          title: '组件文档',
          requiresAuth: true,
          order: 2
        }
      },
      {
        path: 'guide',
        name: 'DocsGuide',
        component: () => import('@/views/docs/Guide.vue'),
        meta: {
          title: '开发指南',
          requiresAuth: true,
          order: 3
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: '页面未找到',
      requiresAuth: false,
      hidden: true // 在菜单中隐藏
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
 */
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - ${import.meta.env.VITE_APP_TITLE}`
  } else {
    document.title = import.meta.env.VITE_APP_TITLE
  }

  // 权限验证（这里是演示，实际项目中需要根据具体需求实现）
  if (to.meta.requiresAuth) {
    // 检查用户是否已登录
    const isLoggedIn = localStorage.getItem('auth-token') || true // 演示用，实际应该检查真实的登录状态

    if (!isLoggedIn) {
      // 未登录，重定向到登录页
      ElMessage.warning('请先登录')
      next('/login')
      return
    }
  }

  // 路由变化时的加载提示（可选）
  if (to.path !== from.path) {
    // 可以在这里添加页面加载提示
    // ElLoading.service({ text: '页面加载中...' })
  }

  next()
})

/**
 * 全局后置守卫
 * 在路由跳转完成后执行
 */
router.afterEach((to, from) => {
  // 关闭加载提示
  // ElLoading.service().close()

  // 页面访问统计（可选）
  if (import.meta.env.DEV) {
    console.log(`路由跳转: ${from.path} -> ${to.path}`)
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
