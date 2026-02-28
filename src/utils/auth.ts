/**
 * 认证工具函数
 * 提供统一的认证状态检查和 token 管理
 */

import { useUserStore } from '@/stores/user'
import { AUTH_TOKEN_KEY } from '@/constants'
import router from '@/router'
import { ElMessage } from 'element-plus'

/**
 * 跳转到登录页
 * @param message 提示消息
 * @param redirect 登录后要跳转的路径
 */
export function redirectToLogin(message?: string, redirect?: string) {
  const userStore = useUserStore()

  // 清除登录状态
  userStore.logout()

  // 显示提示消息
  if (message) {
    ElMessage.warning(message)
  }

  // 获取重定向路径
  const redirectPath = redirect || router.currentRoute.value.fullPath

  // 跳转到登录页
  router.push({
    path: '/login',
    query: redirectPath !== '/login' ? { redirect: redirectPath } : {}
  })
}

/**
 * 检查用户是否已登录
 */
export function isAuthenticated(): boolean {
  const userStore = useUserStore()

  // 确保状态已初始化
  if (!userStore.initialized) {
    userStore.initAuthState()
  }

  return userStore.isLoggedIn && Boolean(userStore.token)
}

/**
 * 获取当前 token
 */
export function getToken(): string | null {
  const userStore = useUserStore()

  if (!userStore.initialized) {
    userStore.initAuthState()
  }

  return userStore.token || localStorage.getItem(AUTH_TOKEN_KEY)
}

/**
 * 检查是否有指定权限
 */
export function hasPermission(permission: string): boolean {
  const userStore = useUserStore()

  if (!userStore.initialized) {
    userStore.initAuthState()
  }

  return userStore.hasPermission(permission)
}

/**
 * 检查是否有指定角色
 */
export function hasRole(role: string): boolean {
  const userStore = useUserStore()

  if (!userStore.initialized) {
    userStore.initAuthState()
  }

  return userStore.hasRole(role)
}

/**
 * 检查是否有任一权限
 */
export function hasAnyPermission(permissions: string[]): boolean {
  return permissions.some(permission => hasPermission(permission))
}

/**
 * 检查是否有任一角色
 */
export function hasAnyRole(roles: string[]): boolean {
  return roles.some(role => hasRole(role))
}

/**
 * 检查是否有所有权限
 */
export function hasAllPermissions(permissions: string[]): boolean {
  return permissions.every(permission => hasPermission(permission))
}

/**
 * 检查是否有所有角色
 */
export function hasAllRoles(roles: string[]): boolean {
  return roles.every(role => hasRole(role))
}
