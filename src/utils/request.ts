/**
 * HTTP 客户端封装
 * 基于 axios 实现统一的 HTTP 请求处理
 *
 * 这个文件使用简单的函数式写法，新手更容易理解
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
import type { ApiResponse, RequestConfig } from '@/types/api'
import { redirectToLogin } from './auth'

// 从环境变量读取 API 基础地址
// 开发环境使用相对路径 /api，通过 Vite 代理转发
// 生产环境使用完整的后端地址
const baseURL = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_BASE_URL || '/api'

// 创建 axios 实例
// 这就像创建一个专门用来发请求的工具
const axiosInstance: AxiosInstance = axios.create({
  baseURL, // API 的基础地址，比如 https://api.example.com
  timeout: 15000, // 请求超时时间 15 秒，超过这个时间就认为请求失败
  headers: {
    'Content-Type': 'application/json' // 告诉服务器我们发送的是 JSON 数据
  }
})

/**
 * 获取用户的登录令牌
 * 这个令牌用来证明用户已经登录了
 */
function getAuthToken(): string | null {
  // 从浏览器的本地存储中获取令牌
  // 就像从钱包里拿出身份证一样
  return localStorage.getItem('auth_token')
}

/**
 * 处理未授权错误（401）
 * 清除登录状态并跳转到登录页
 */
function handleUnauthorized() {
  // 使用统一的跳转登录函数
  redirectToLogin('登录已过期，请重新登录')
}

/**
 * 处理各种错误情况
 * 当请求出错时，给用户显示友好的错误提示
 */
function handleRequestError(error: AxiosError): Promise<never> {
  let errorMessage = '请求失败'
  let shouldShowMessage = true

  if (error.response) {
    // 服务器有响应，但是返回了错误状态码
    const status = error.response.status

    // 根据不同的错误状态码，显示不同的错误信息
    switch (status) {
      case 400:
        errorMessage = '请求参数错误'
        break
      case 401:
        // 未授权，跳转登录页
        handleUnauthorized()
        shouldShowMessage = false // 已经在 handleUnauthorized 中显示了
        break
      case 403:
        errorMessage = '拒绝访问，您没有权限'
        break
      case 404:
        errorMessage = '请求的资源不存在'
        break
      case 408:
        errorMessage = '请求超时'
        break
      case 500:
        errorMessage = '服务器内部错误'
        break
      case 502:
        errorMessage = '网关错误'
        break
      case 503:
        errorMessage = '服务不可用'
        break
      case 504:
        errorMessage = '网关超时'
        break
      default:
        errorMessage = `请求失败 (${status})`
    }

    // 如果服务器返回了具体的错误消息，就用服务器的消息
    const serverMessage = (error.response.data as any)?.message
    if (serverMessage && status !== 401) {
      errorMessage = serverMessage
    }
  } else if (error.request) {
    // 请求发出去了，但是没有收到服务器的回应
    // 可能是网络问题
    errorMessage = '网络连接失败，请检查网络'
  } else {
    // 请求配置有问题
    errorMessage = error.message || '请求配置错误'
  }

  // 显示错误提示给用户
  if (shouldShowMessage) {
    ElMessage.error(errorMessage)
  }

  // 返回一个失败的 Promise
  return Promise.reject(error)
}

// 设置请求拦截器
// 在每个请求发送之前，都会先执行这里的代码
axiosInstance.interceptors.request.use(
  config => {
    // 添加用户的登录令牌（如果有的话）
    const token = getAuthToken()
    if (token) {
      // 在请求头中添加令牌，就像在信封上贴邮票一样
      config.headers.Authorization = token
    }

    // 添加项目相关请求头（必需，用于权限验证）
    config.headers['Project-Id'] = '56'
    config.headers['Project-Status'] = 'review'

    // 添加请求时间戳，记录请求发送的时间
    config.headers['X-Request-Time'] = Date.now().toString()

    // 添加语言设置
    config.headers['X-Language'] = 'zh-CN'

    return config
  },
  error => {
    // 如果请求配置有错误，就在这里处理
    console.error('请求配置错误:', error)
    return Promise.reject(error)
  }
)

// 设置响应拦截器
// 在收到服务器响应之后，都会先执行这里的代码
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // 从服务器响应中提取数据
    const { code, data, message } = response.data

    // 检查业务状态码
    // code 是服务器返回的业务状态码，不是 HTTP 状态码
    if (code === 200 || code === 0) {
      // 请求成功，返回实际的数据
      return data
    } else {
      // 业务逻辑错误，显示错误信息
      ElMessage.error(message || '请求失败')
      return Promise.reject(new Error(message || '请求失败'))
    }
  },
  (error: AxiosError) => {
    // HTTP 错误处理
    return handleRequestError(error)
  }
)

// 封装 GET 请求
// 用来获取数据，比如获取用户信息、文章列表等
export function get<T = any>(url: string, config?: AxiosRequestConfig & RequestConfig): Promise<T> {
  return axiosInstance.get(url, config)
}

// 封装 POST 请求
// 用来提交数据，比如用户登录、发表文章等
export function post<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig & RequestConfig
): Promise<T> {
  return axiosInstance.post(url, data, config)
}

// 封装 PUT 请求
// 用来更新数据，比如修改用户信息、更新文章等
export function put<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig & RequestConfig
): Promise<T> {
  return axiosInstance.put(url, data, config)
}

// 封装 DELETE 请求
// 用来删除数据，比如删除文章、删除用户等
export function deleteRequest<T = any>(
  url: string,
  config?: AxiosRequestConfig & RequestConfig
): Promise<T> {
  return axiosInstance.delete(url, config)
}

// 封装 PATCH 请求
// 用来部分更新数据，比如只修改用户的头像
export function patch<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig & RequestConfig
): Promise<T> {
  return axiosInstance.patch(url, data, config)
}

// 创建一个包含所有请求方法的对象
// 这样使用起来更方便，就像一个工具箱
export const httpClient = {
  get,
  post,
  put,
  delete: deleteRequest, // delete 是 JavaScript 的关键字，所以用 deleteRequest
  patch
}

// 也可以直接导出 axios 实例，给高级用户使用
export { axiosInstance }

// 默认导出 httpClient，这样可以用 import request from '@/utils/request' 的方式导入
export default httpClient
