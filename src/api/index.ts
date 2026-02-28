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
  nickName: string
  sex: string
  systemRole: string
  avatar: string | null
  phone: string | null
  enabled: boolean
  lastLoginTime: string
  username: string
}

/**
 * 登录响应数据接口
 */
export interface LoginResponse {
  weakPwd: boolean
  user: User
  token: string
  reservoirName: string
}

/**
 * 验证码响应数据接口
 */
export interface CaptchaResponse {
  image: string
  key: string
}

/**
 * 农户信息接口
 */
export interface PeasantHousehold {
  id: number
  name: string
  doorNo: string
  showDoorNo: string
  townCodeText: string
  villageText: string
  virutalVillageText: string
  reportStatus: string
  hasPropertyAccount: boolean
  hasPropertyAccountText: string
  locationTypeText: string
  reportUserName: string
  reportDate: string
  signStatus: string
  phone: string
  address: string
}

/**
 * 示例 API: 获取用户列表
 * @param params - 查询参数
 * @param params.page - 页码
 * @param params.pageSize - 每页数量
 * @returns Promise<PageResponse<User>>
 */
export const getUserList = (params: { page?: number; pageSize?: number } = {}) => {
  return httpClient.get<PageResponse<User>>('/users', {
    params: { page: 1, pageSize: 10, ...params }
  })
}

/**
 * 示例 API: 获取用户详情
 * @param params - 查询参数
 * @param params.id - 用户 ID
 * @returns Promise<User>
 */
export const getUserById = (params: { id: number }) => {
  return httpClient.get<User>(`/users/${params.id}`)
}

/**
 * 示例 API: 创建用户
 * @param data - 用户信息
 * @returns Promise<User>
 */
export const createUser = (data: Omit<User, 'id'>) => {
  return httpClient.post<User>('/users', data)
}

/**
 * 示例 API: 更新用户
 * @param params - 更新参数
 * @param params.id - 用户 ID
 * @param params.data - 用户信息
 * @returns Promise<User>
 */
export const updateUser = (params: { id: number; data: Partial<User> }) => {
  return httpClient.put<User>(`/users/${params.id}`, params.data)
}

/**
 * 示例 API: 删除用户
 * @param params - 删除参数
 * @param params.id - 用户 ID
 * @returns Promise<void>
 */
export const deleteUser = (params: { id: number }) => {
  return httpClient.delete<void>(`/users/${params.id}`)
}

/**
 * 获取验证码
 * @returns Promise<CaptchaResponse>
 */
export const getCaptcha = () => {
  return httpClient.post<CaptchaResponse>('/auth/captcha')
}

/**
 * 示例 API: 登录
 * @param data - 登录数据
 * @param data.userName - 用户名
 * @param data.password - 密码
 * @param data.authKey - 验证码key
 * @param data.authCode - 验证码
 * @returns Promise<LoginResponse>
 */
export const login = (data: {
  userName: string
  password: string
  authKey: string
  authCode: string
}) => {
  return httpClient.post<LoginResponse>('/auth/login', data)
}

/**
 * 示例 API: 登出
 * @returns Promise<void>
 */
export const logout = () => {
  return httpClient.post<void>('/auth/logout')
}

/**
 * 获取农户列表
 * @param params - 查询参数
 * @returns Promise<PageResponse<PeasantHousehold>>
 */
export const getPeasantHouseholdList = (params: {
  sort?: string
  status?: string
  projectId?: number
  size?: number
  page?: number
  type?: string
}) => {
  return httpClient.get<PageResponse<PeasantHousehold>>('/peasantHousehold', {
    params
  })
}
