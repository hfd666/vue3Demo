/**
 * API 模块
 * 导出所有 API 请求函数
 */

import { httpClient } from '@/utils/request'
import type { PageResponse } from '@/types/api'

/**
 * 用户信息接口
 */
export interface User {
  id: number
  name: string
  email: string
  avatar?: string
}

/**
 * 示例 API: 获取用户列表
 * @param page - 页码
 * @param pageSize - 每页数量
 * @returns Promise<PageResponse<User>>
 */
export const getUserList = (page: number = 1, pageSize: number = 10) => {
  return httpClient.get<PageResponse<User>>('/users', {
    params: { page, pageSize }
  })
}

/**
 * 示例 API: 获取用户详情
 * @param id - 用户 ID
 * @returns Promise<User>
 */
export const getUserById = (id: number) => {
  return httpClient.get<User>(`/users/${id}`)
}

/**
 * 示例 API: 创建用户
 * @param user - 用户信息
 * @returns Promise<User>
 */
export const createUser = (user: Omit<User, 'id'>) => {
  return httpClient.post<User>('/users', user)
}

/**
 * 示例 API: 更新用户
 * @param id - 用户 ID
 * @param user - 用户信息
 * @returns Promise<User>
 */
export const updateUser = (id: number, user: Partial<User>) => {
  return httpClient.put<User>(`/users/${id}`, user)
}

/**
 * 示例 API: 删除用户
 * @param id - 用户 ID
 * @returns Promise<void>
 */
export const deleteUser = (id: number) => {
  return httpClient.delete<void>(`/users/${id}`)
}

/**
 * 示例 API: 登录
 * @param username - 用户名
 * @param password - 密码
 * @returns Promise<{ token: string; user: User }>
 */
export const login = (username: string, password: string) => {
  return httpClient.post<{ token: string; user: User }>('/auth/login', {
    username,
    password
  })
}

/**
 * 示例 API: 登出
 * @returns Promise<void>
 */
export const logout = () => {
  return httpClient.post<void>('/auth/logout')
}
