/**
 * 用户状态管理
 * 管理用户信息、登录状态等
 */

import { defineStore } from 'pinia'
import type { UserInfo } from '@/types'

/**
 * 用户状态接口
 */
interface UserState {
  /** 用户信息 */
  userInfo: UserInfo
  /** 是否已登录 */
  isLoggedIn: boolean
  /** 用户权限 */
  permissions: string[]
  /** 用户角色 */
  roles: string[]
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: {
      id: 1,
      name: '管理员',
      email: 'admin@example.com',
      avatar: ''
    },
    isLoggedIn: true, // 演示用，实际应该是 false
    permissions: ['read', 'write', 'delete'],
    roles: ['admin']
  }),

  getters: {
    /**
     * 获取用户显示名称
     */
    displayName: (state): string => {
      return state.userInfo.name || state.userInfo.email || '未知用户'
    },

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
     * 设置用户信息
     */
    setUserInfo(userInfo: Partial<UserInfo>) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },

    /**
     * 登录
     */
    async login(credentials: { email: string; password: string }) {
      try {
        // 这里应该调用登录 API
        // const response = await loginApi(credentials)

        // 模拟登录成功
        this.isLoggedIn = true
        this.userInfo = {
          id: 1,
          name: '管理员',
          email: credentials.email,
          avatar: ''
        }
        this.permissions = ['read', 'write', 'delete']
        this.roles = ['admin']

        // 保存到本地存储
        this.saveUserInfo()

        return { success: true }
      } catch (error) {
        console.error('Login failed:', error)
        return { success: false, error: '登录失败' }
      }
    },

    /**
     * 退出登录
     */
    logout() {
      this.isLoggedIn = false
      this.userInfo = {
        id: 0,
        name: '',
        email: '',
        avatar: ''
      }
      this.permissions = []
      this.roles = []

      // 清除本地存储
      localStorage.removeItem('user-info')
      localStorage.removeItem('auth-token')
    },

    /**
     * 初始化用户信息
     * 从本地存储恢复用户信息
     */
    initUserInfo() {
      const savedUserInfo = localStorage.getItem('user-info')
      if (savedUserInfo) {
        try {
          const userInfo = JSON.parse(savedUserInfo)
          Object.assign(this.$state, userInfo)
        } catch (error) {
          console.warn('Failed to parse user info from localStorage:', error)
        }
      }
    },

    /**
     * 保存用户信息到本地存储
     */
    saveUserInfo() {
      localStorage.setItem('user-info', JSON.stringify(this.$state))
    }
  }
})
