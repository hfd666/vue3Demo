/**
 * 用户状态管理
 * 管理用户信息、登录状态、权限和可访问路由
 */

import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import type { UserInfo } from '@/types'
import { AUTH_STATE_KEY, AUTH_TOKEN_KEY } from '@/constants'

/**
 * 用户状态接口
 */
interface UserState {
  /** 访问令牌 */
  token: string
  /** 刷新令牌（预留） */
  refreshToken: string
  /** 用户信息 */
  userInfo: UserInfo
  /** 是否已登录 */
  isLoggedIn: boolean
  /** 认证状态是否已初始化 */
  initialized: boolean
  /** 是否已生成可访问路由表 */
  routesGenerated: boolean
  /** 用户权限 */
  permissions: string[]
  /** 用户角色 */
  roles: string[]
  /** 可访问路由表 */
  accessRoutes: RouteRecordRaw[]
}

interface StoredAuthState {
  token: string
  refreshToken: string
  userInfo: UserInfo
  permissions: string[]
  roles: string[]
}

const getDefaultUserInfo = (): UserInfo => ({
  id: 0,
  name: '',
  email: '',
  avatar: ''
})

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    refreshToken: '',
    userInfo: getDefaultUserInfo(),
    isLoggedIn: false,
    initialized: false,
    routesGenerated: false,
    permissions: [],
    roles: [],
    accessRoutes: []
  }),

  getters: {
    /**
     * 获取用户显示名称
     */
    displayName: (state): string => {
      return state.userInfo.name || state.userInfo.email || '未知用户'
    },

    /**
     * 是否拥有有效 token
     */
    hasToken: (state): boolean => Boolean(state.token),

    /**
     * 检查是否有指定权限
     */
    hasPermission:
      state =>
      (permission: string): boolean => {
        return state.permissions.includes(permission)
      },

    /**
     * 检查是否有指定角色
     */
    hasRole:
      state =>
      (role: string): boolean => {
        return state.roles.includes(role)
      }
  },

  actions: {
    /**
     * 持久化认证状态
     */
    persistAuthState() {
      const authState: StoredAuthState = {
        token: this.token,
        refreshToken: this.refreshToken,
        userInfo: this.userInfo,
        permissions: this.permissions,
        roles: this.roles
      }

      localStorage.setItem(AUTH_TOKEN_KEY, this.token)
      localStorage.setItem(AUTH_STATE_KEY, JSON.stringify(authState))
    },

    /**
     * 清除持久化认证状态
     */
    clearPersistedAuthState() {
      localStorage.removeItem(AUTH_TOKEN_KEY)
      localStorage.removeItem(AUTH_STATE_KEY)
    },

    /**
     * 重置登录态
     */
    resetAuthState() {
      this.token = ''
      this.refreshToken = ''
      this.userInfo = getDefaultUserInfo()
      this.isLoggedIn = false
      this.permissions = []
      this.roles = []
      this.accessRoutes = []
      this.routesGenerated = false
    },

    /**
     * 设置用户信息
     */
    setUserInfo(userInfo: Partial<UserInfo>) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },

    /**
     * 登录
     * @param credentials - 登录凭证
     * @param credentials.userName - 用户名
     * @param credentials.password - 密码
     * @param credentials.authKey - 验证码key
     * @param credentials.authCode - 验证码
     */
    async login(credentials: {
      userName: string
      password: string
      authKey: string
      authCode: string
    }) {
      try {
        // 动态导入 API 模块以避免循环依赖
        const { login: loginApi } = await import('@/api')

        const result = await loginApi(credentials)

        this.token = result.token
        this.refreshToken = ''
        this.isLoggedIn = true
        this.userInfo = {
          id: result.user.id,
          name: result.user.nickName || result.user.username,
          email: result.user.username,
          avatar: result.user.avatar || ''
        }
        // 根据实际后端返回的权限和角色设置，这里先用默认值
        this.permissions = []
        this.roles = [result.user.systemRole]
        this.routesGenerated = false
        this.accessRoutes = []

        this.persistAuthState()

        return { success: true }
      } catch (error) {
        console.error('Login failed:', error)
        return {
          success: false,
          error: error instanceof Error ? error.message : '登录失败'
        }
      }
    },

    /**
     * 退出登录
     */
    logout() {
      this.resetAuthState()
      this.clearPersistedAuthState()
      // 同时清除旧的 token key（兼容性）
      localStorage.removeItem('auth_token')
    },

    /**
     * 从本地存储恢复登录态
     */
    initAuthState() {
      if (this.initialized) return

      const token = localStorage.getItem(AUTH_TOKEN_KEY)
      const storedAuthState = localStorage.getItem(AUTH_STATE_KEY)

      if (token && storedAuthState) {
        try {
          const parsedState = JSON.parse(storedAuthState) as StoredAuthState
          this.token = parsedState.token || token
          this.refreshToken = parsedState.refreshToken || ''
          this.userInfo = parsedState.userInfo || getDefaultUserInfo()
          this.permissions = parsedState.permissions || []
          this.roles = parsedState.roles || []
          this.isLoggedIn = Boolean(this.token)
        } catch (error) {
          console.warn('Failed to parse auth state from localStorage:', error)
          this.resetAuthState()
          this.clearPersistedAuthState()
        }
      } else {
        this.resetAuthState()
      }

      this.initialized = true
    },

    /**
     * 根据角色和权限生成可访问路由表
     */
    generateAccessRoutes(routes: RouteRecordRaw[]) {
      const filterRoutes = (sourceRoutes: RouteRecordRaw[]): RouteRecordRaw[] => {
        return sourceRoutes
          .map(route => {
            const currentRoute: RouteRecordRaw = { ...route }
            const meta = (currentRoute.meta || {}) as {
              roles?: string[]
              permissions?: string[]
            }

            const routeRoles = meta.roles || []
            const routePermissions = meta.permissions || []

            const hasRoleAccess =
              routeRoles.length === 0 || routeRoles.some(role => this.roles.includes(role))
            const hasPermissionAccess =
              routePermissions.length === 0 ||
              routePermissions.some(permission => this.permissions.includes(permission))

            if (!hasRoleAccess || !hasPermissionAccess) {
              return null
            }

            if (currentRoute.children && currentRoute.children.length > 0) {
              currentRoute.children = filterRoutes(currentRoute.children)
            }

            return currentRoute
          })
          .filter((route): route is RouteRecordRaw => route !== null)
      }

      this.accessRoutes = filterRoutes(routes)
      this.routesGenerated = true
    }
  }
})
