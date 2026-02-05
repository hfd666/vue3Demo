# HTTP 客户端使用指南（简化版）

本文档介绍如何使用项目中的 HTTP 客户端来发送网络请求。我们使用了简单易懂的函数式写法，新手也能快速上手。

## 🎯 什么是 HTTP 客户端？

HTTP 客户端就像一个邮递员，帮你把数据发送到服务器，然后把服务器的回复带回来。

## 📦 导入方式

```typescript
// 方式 1：导入整个工具箱
import { httpClient } from '@/utils/request'

// 方式 2：只导入需要的方法
import { get, post, put, deleteRequest } from '@/utils/request'

// 方式 3：默认导入
import request from '@/utils/request'
```

## 🚀 基本使用

### GET 请求 - 获取数据

GET 请求就像问服务器要东西，比如获取用户信息、文章列表等。

```typescript
// 使用 httpClient 对象
const users = await httpClient.get('/users')

// 或者直接使用函数
const users = await get('/users')

// 带参数的请求
const users = await httpClient.get('/users', {
  params: {
    page: 1,
    pageSize: 10
  }
})
```

### POST 请求 - 提交数据

POST 请求就像给服务器送东西，比如用户登录、发表文章等。

```typescript
// 用户登录
const loginResult = await httpClient.post('/auth/login', {
  username: 'admin',
  password: '123456'
})

// 或者直接使用函数
const loginResult = await post('/auth/login', {
  username: 'admin',
  password: '123456'
})
```

### PUT 请求 - 更新数据

PUT 请求用来更新整个资源，比如修改用户的完整信息。

```typescript
// 更新用户信息
const updatedUser = await httpClient.put('/users/1', {
  name: '张三',
  email: 'zhangsan@example.com',
  age: 25
})
```

### DELETE 请求 - 删除数据

DELETE 请求用来删除数据，比如删除文章、删除用户等。

```typescript
// 删除用户
await httpClient.delete('/users/1')

// 注意：因为 delete 是 JavaScript 的关键字，
// 所以直接导入时要用 deleteRequest
await deleteRequest('/users/1')
```

### PATCH 请求 - 部分更新

PATCH 请求用来部分更新数据，比如只修改用户的头像。

```typescript
// 只更新用户的头像
const updatedUser = await httpClient.patch('/users/1', {
  avatar: 'new-avatar.jpg'
})
```

## 🔧 高级用法

### 添加请求头

```typescript
const data = await httpClient.get('/users', {
  headers: {
    'Custom-Header': 'custom-value'
  }
})
```

### 设置超时时间

```typescript
const data = await httpClient.get('/users', {
  timeout: 5000 // 5 秒超时
})
```

### 上传文件

```typescript
const formData = new FormData()
formData.append('file', file)
formData.append('name', 'avatar')

const result = await httpClient.post('/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
```

## 🎨 在 Vue 组件中使用

### 基本示例

```vue
<template>
  <div>
    <button @click="loadUsers">加载用户</button>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { httpClient } from '@/utils/request'

// 定义响应式数据
const users = ref([])

// 加载用户列表
const loadUsers = async () => {
  try {
    const data = await httpClient.get('/users')
    users.value = data
  } catch (error) {
    console.error('加载用户失败:', error)
    // 错误会自动显示在页面上，不需要手动处理
  }
}
</script>
```

### 带加载状态的示例

```vue
<template>
  <div>
    <button @click="loadUsers" :disabled="loading">
      {{ loading ? '加载中...' : '加载用户' }}
    </button>
    <ul v-if="!loading">
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { httpClient } from '@/utils/request'

const users = ref([])
const loading = ref(false)

const loadUsers = async () => {
  loading.value = true
  try {
    const data = await httpClient.get('/users')
    users.value = data
  } catch (error) {
    console.error('加载用户失败:', error)
  } finally {
    loading.value = false
  }
}
</script>
```

## 🛡️ 错误处理

HTTP 客户端已经内置了错误处理，会自动显示错误提示。但你也可以自己处理错误：

```typescript
try {
  const data = await httpClient.get('/users')
  // 请求成功的处理
} catch (error) {
  // 请求失败的处理
  console.error('请求失败:', error)

  // 你可以根据错误类型做不同的处理
  if (error.response?.status === 401) {
    // 未登录，跳转到登录页
    router.push('/login')
  }
}
```

## 🔐 认证处理

HTTP 客户端会自动处理用户认证：

1. **自动添加 Token**：如果用户已登录，会自动在请求头中添加认证令牌
2. **Token 存储**：登录成功后，需要把 Token 存储到 localStorage

```typescript
// 登录成功后存储 Token
const loginResult = await httpClient.post('/auth/login', {
  username: 'admin',
  password: '123456'
})

// 存储 Token，后续请求会自动使用
localStorage.setItem('auth_token', loginResult.token)

// 登出时清除 Token
localStorage.removeItem('auth_token')
```

## 📝 实际项目示例

### 用户管理

```typescript
// src/api/user.ts
import { httpClient } from '@/utils/request'

export interface User {
  id: number
  name: string
  email: string
}

// 获取用户列表
export const getUserList = () => {
  return httpClient.get<User[]>('/users')
}

// 创建用户
export const createUser = (user: Omit<User, 'id'>) => {
  return httpClient.post<User>('/users', user)
}

// 更新用户
export const updateUser = (id: number, user: Partial<User>) => {
  return httpClient.put<User>(`/users/${id}`, user)
}

// 删除用户
export const deleteUser = (id: number) => {
  return httpClient.delete(`/users/${id}`)
}
```

### 在组件中使用

```vue
<template>
  <div>
    <!-- 用户列表 -->
    <div v-for="user in users" :key="user.id">
      <span>{{ user.name }}</span>
      <button @click="editUser(user)">编辑</button>
      <button @click="removeUser(user.id)">删除</button>
    </div>

    <!-- 添加用户表单 -->
    <form @submit.prevent="addUser">
      <input v-model="newUser.name" placeholder="姓名" required />
      <input v-model="newUser.email" placeholder="邮箱" required />
      <button type="submit">添加用户</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUserList, createUser, updateUser, deleteUser } from '@/api/user'
import type { User } from '@/api/user'

const users = ref<User[]>([])
const newUser = ref({ name: '', email: '' })

// 加载用户列表
const loadUsers = async () => {
  try {
    users.value = await getUserList()
  } catch (error) {
    console.error('加载用户失败:', error)
  }
}

// 添加用户
const addUser = async () => {
  try {
    await createUser(newUser.value)
    newUser.value = { name: '', email: '' } // 清空表单
    await loadUsers() // 重新加载列表
  } catch (error) {
    console.error('添加用户失败:', error)
  }
}

// 删除用户
const removeUser = async (id: number) => {
  if (confirm('确定要删除这个用户吗？')) {
    try {
      await deleteUser(id)
      await loadUsers() // 重新加载列表
    } catch (error) {
      console.error('删除用户失败:', error)
    }
  }
}

// 页面加载时获取用户列表
onMounted(() => {
  loadUsers()
})
</script>
```

## 🔍 调试技巧

### 查看请求详情

打开浏览器的开发者工具（F12），在 Network 标签页可以看到所有的网络请求：

1. **请求 URL**：发送到哪个地址
2. **请求方法**：GET、POST、PUT、DELETE
3. **请求头**：包含认证信息、内容类型等
4. **请求体**：POST/PUT 请求发送的数据
5. **响应状态**：200 成功，404 未找到，500 服务器错误等
6. **响应数据**：服务器返回的数据

### 常见问题

1. **CORS 错误**：跨域问题，需要后端配置或使用代理
2. **401 未授权**：Token 过期或无效，需要重新登录
3. **404 未找到**：API 地址错误或服务器没有这个接口
4. **500 服务器错误**：后端程序出错

## 🎉 总结

使用 HTTP 客户端发送请求就像寄信一样简单：

1. **准备数据**：要发送什么信息
2. **选择方法**：GET（要东西）、POST（送东西）、PUT（换东西）、DELETE（扔东西）
3. **发送请求**：调用对应的函数
4. **处理结果**：成功了做什么，失败了做什么

记住这几个要点，你就能轻松使用 HTTP 客户端了！
