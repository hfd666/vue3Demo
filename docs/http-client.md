# HTTP 客户端使用文档

## 概述

本项目提供了一个基于 Axios 封装的 HTTP 客户端，用于统一处理 API 请求和响应。

## 特性

- ✅ 基于 Axios 实现
- ✅ 自动添加认证 Token
- ✅ 请求时间戳
- ✅ 统一的响应数据处理
- ✅ 完善的错误处理和提示
- ✅ TypeScript 泛型支持
- ✅ 支持所有 HTTP 方法（GET、POST、PUT、DELETE、PATCH）

## 文件结构

```
src/
├── types/
│   └── api.ts              # API 类型定义
├── utils/
│   └── request.ts          # HTTP 客户端实现
└── api/
    └── index.ts            # API 请求函数
```

## 类型定义

### ApiResponse<T>

通用 API 响应结构：

```typescript
interface ApiResponse<T = any> {
  code: number // 响应状态码
  data: T // 响应数据
  message: string // 响应消息
}
```

### PageResponse<T>

分页响应结构：

```typescript
interface PageResponse<T> {
  list: T[] // 数据列表
  total: number // 总记录数
  page: number // 当前页码
  pageSize: number // 每页记录数
}
```

### ErrorResponse

错误响应结构：

```typescript
interface ErrorResponse {
  code: number // 错误状态码
  message: string // 错误消息
  details?: any // 错误详情（可选）
}
```

### RequestConfig

请求配置扩展：

```typescript
interface RequestConfig {
  skipErrorHandler?: boolean // 是否跳过错误处理器
  showLoading?: boolean // 是否显示加载提示
  errorMessage?: string // 自定义错误消息
}
```

## 基本使用

### 导入 HTTP 客户端

```typescript
import { httpClient } from '@/utils/request'
```

### GET 请求

```typescript
// 基本用法
const data = await httpClient.get('/api/users')

// 带类型推断
interface User {
  id: number
  name: string
  email: string
}

const users = await httpClient.get<User[]>('/api/users')

// 带查询参数
const users = await httpClient.get<User[]>('/api/users', {
  params: {
    page: 1,
    pageSize: 10
  }
})
```

### POST 请求

```typescript
// 创建用户
const newUser = await httpClient.post<User>('/api/users', {
  name: 'John Doe',
  email: 'john@example.com'
})

// 登录
const loginResult = await httpClient.post<{ token: string; user: User }>('/api/auth/login', {
  username: 'admin',
  password: '123456'
})
```

### PUT 请求

```typescript
// 更新用户
const updatedUser = await httpClient.put<User>(`/api/users/${userId}`, {
  name: 'Jane Doe',
  email: 'jane@example.com'
})
```

### DELETE 请求

```typescript
// 删除用户
await httpClient.delete(`/api/users/${userId}`)
```

### PATCH 请求

```typescript
// 部分更新用户
const updatedUser = await httpClient.patch<User>(`/api/users/${userId}`, {
  name: 'New Name'
})
```

## 高级用法

### 自定义请求配置

```typescript
// 跳过错误处理
const data = await httpClient.get('/api/data', {
  skipErrorHandler: true
})

// 自定义超时时间
const data = await httpClient.get('/api/data', {
  timeout: 30000 // 30 秒
})

// 自定义请求头
const data = await httpClient.post('/api/data', payload, {
  headers: {
    'Custom-Header': 'value'
  }
})
```

### 封装 API 函数

推荐在 `src/api` 目录下创建模块化的 API 函数：

```typescript
// src/api/user.ts
import { httpClient } from '@/utils/request'
import type { PageResponse } from '@/types/api'

export interface User {
  id: number
  name: string
  email: string
}

export const getUserList = (page: number = 1, pageSize: number = 10) => {
  return httpClient.get<PageResponse<User>>('/users', {
    params: { page, pageSize }
  })
}

export const getUserById = (id: number) => {
  return httpClient.get<User>(`/users/${id}`)
}

export const createUser = (user: Omit<User, 'id'>) => {
  return httpClient.post<User>('/users', user)
}

export const updateUser = (id: number, user: Partial<User>) => {
  return httpClient.put<User>(`/users/${id}`, user)
}

export const deleteUser = (id: number) => {
  return httpClient.delete<void>(`/users/${id}`)
}
```

### 在组件中使用

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { getUserList, createUser } from '@/api/user'

const users = ref([])
const loading = ref(false)

const fetchUsers = async () => {
  loading.value = true
  try {
    const response = await getUserList(1, 10)
    users.value = response.list
  } catch (error) {
    console.error('获取用户列表失败:', error)
  } finally {
    loading.value = false
  }
}

const handleCreateUser = async () => {
  try {
    const newUser = await createUser({
      name: 'John Doe',
      email: 'john@example.com'
    })
    console.log('用户创建成功:', newUser)
    await fetchUsers() // 刷新列表
  } catch (error) {
    console.error('创建用户失败:', error)
  }
}
</script>
```

## 拦截器

### 请求拦截器

请求拦截器会在每个请求发送前执行以下操作：

1. **添加认证 Token**：从 localStorage 读取 `auth_token` 并添加到请求头
2. **添加请求时间戳**：在 `X-Request-Time` 头中添加时间戳
3. **添加语言设置**：在 `X-Language` 头中添加语言标识

```typescript
// 请求拦截器示例
config.headers.Authorization = `Bearer ${token}`
config.headers['X-Request-Time'] = Date.now().toString()
config.headers['X-Language'] = 'zh-CN'
```

### 响应拦截器

响应拦截器会统一处理响应数据：

1. **成功响应**：当 `code` 为 200 或 0 时，直接返回 `data` 字段
2. **业务错误**：当 `code` 不为成功状态时，显示错误消息并抛出异常
3. **HTTP 错误**：根据状态码显示相应的错误提示

## 错误处理

### HTTP 状态码错误

| 状态码 | 错误消息           |
| ------ | ------------------ |
| 400    | 请求参数错误       |
| 401    | 未授权，请重新登录 |
| 403    | 拒绝访问           |
| 404    | 请求的资源不存在   |
| 408    | 请求超时           |
| 500    | 服务器内部错误     |
| 502    | 网关错误           |
| 503    | 服务不可用         |
| 504    | 网关超时           |

### 错误处理示例

```typescript
try {
  const data = await httpClient.get('/api/data')
  // 处理成功响应
} catch (error) {
  // 错误已经被拦截器处理并显示提示
  // 这里可以进行额外的错误处理
  console.error('请求失败:', error)
}
```

### 自定义错误处理

如果需要自定义错误处理，可以使用 `skipErrorHandler` 选项：

```typescript
try {
  const data = await httpClient.get('/api/data', {
    skipErrorHandler: true
  })
} catch (error) {
  // 自定义错误处理逻辑
  if (error.response?.status === 404) {
    console.log('资源不存在')
  }
}
```

## 认证 Token 管理

### 设置 Token

```typescript
// 登录成功后保存 Token
const { token } = await httpClient.post('/api/auth/login', {
  username: 'admin',
  password: '123456'
})

localStorage.setItem('auth_token', token)
```

### 清除 Token

```typescript
// 登出时清除 Token
await httpClient.post('/api/auth/logout')
localStorage.removeItem('auth_token')
```

### Token 自动添加

HTTP 客户端会自动从 localStorage 读取 `auth_token` 并添加到请求头：

```typescript
Authorization: Bearer<token>
```

## 环境配置

HTTP 客户端的基础 URL 从环境变量读取：

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000/api

# .env.staging
VITE_API_BASE_URL=https://staging-api.example.com/api

# .env.production
VITE_API_BASE_URL=https://api.example.com/api
```

## 最佳实践

### 1. 使用 TypeScript 类型

始终为 API 响应定义类型：

```typescript
interface User {
  id: number
  name: string
  email: string
}

const user = await httpClient.get<User>('/api/users/1')
// user 的类型为 User，享受完整的类型提示
```

### 2. 封装 API 函数

将 API 请求封装成函数，便于复用和维护：

```typescript
// ✅ 推荐
export const getUserById = (id: number) => {
  return httpClient.get<User>(`/users/${id}`)
}

// ❌ 不推荐
// 在组件中直接调用 httpClient
```

### 3. 统一错误处理

利用拦截器的统一错误处理，避免在每个请求中重复处理：

```typescript
// ✅ 推荐
try {
  const data = await getUserList()
  // 处理数据
} catch (error) {
  // 错误已被拦截器处理，这里只需要记录日志
  console.error(error)
}

// ❌ 不推荐
// 在每个请求中都写相同的错误处理逻辑
```

### 4. 使用 async/await

使用 async/await 语法使代码更清晰：

```typescript
// ✅ 推荐
const fetchData = async () => {
  const data = await httpClient.get('/api/data')
  return data
}

// ❌ 不推荐
const fetchData = () => {
  return httpClient.get('/api/data').then(data => {
    return data
  })
}
```

### 5. 合理使用 loading 状态

在发起请求时显示加载状态：

```typescript
const loading = ref(false)

const fetchData = async () => {
  loading.value = true
  try {
    const data = await httpClient.get('/api/data')
    // 处理数据
  } finally {
    loading.value = false
  }
}
```

## 常见问题

### Q: 如何修改 Token 的存储方式？

A: 修改 `src/utils/request.ts` 中的 `getAuthToken` 方法：

```typescript
private getAuthToken(): string | null {
  // 从 Pinia store 获取
  // const authStore = useAuthStore()
  // return authStore.token

  // 或从 sessionStorage 获取
  // return sessionStorage.getItem('auth_token')

  return localStorage.getItem('auth_token')
}
```

### Q: 如何添加全局 loading 效果？

A: 在请求拦截器中添加 loading 逻辑：

```typescript
import { ElLoading } from 'element-plus'

let loadingInstance: any = null

// 请求拦截器
this.instance.interceptors.request.use(config => {
  if (config.showLoading !== false) {
    loadingInstance = ElLoading.service({
      fullscreen: true,
      text: '加载中...'
    })
  }
  return config
})

// 响应拦截器
this.instance.interceptors.response.use(
  response => {
    loadingInstance?.close()
    return response
  },
  error => {
    loadingInstance?.close()
    return Promise.reject(error)
  }
)
```

### Q: 如何处理文件上传？

A: 使用 FormData 并设置正确的 Content-Type：

```typescript
const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  return httpClient.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
```

### Q: 如何取消请求？

A: 使用 Axios 的 CancelToken：

```typescript
import axios from 'axios'

const source = axios.CancelToken.source()

httpClient.get('/api/data', {
  cancelToken: source.token
})

// 取消请求
source.cancel('请求被取消')
```

## 总结

本 HTTP 客户端提供了完整的请求处理能力，包括：

- ✅ 统一的请求和响应处理
- ✅ 自动的认证 Token 管理
- ✅ 完善的错误处理机制
- ✅ TypeScript 类型支持
- ✅ 灵活的配置选项

通过合理使用这些功能，可以大大简化 API 调用的代码，提高开发效率。
