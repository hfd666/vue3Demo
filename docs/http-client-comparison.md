# HTTP 客户端实现对比

本文档对比了 Class 写法和函数式写法的 HTTP 客户端实现，帮助开发者理解两种方式的优缺点。

## 📊 两种实现方式对比

### Class 写法（面向对象）

```typescript
class HttpClient {
  private instance: AxiosInstance

  constructor(baseURL: string) {
    this.instance = axios.create({ baseURL })
    this.setupInterceptors()
  }

  private setupInterceptors() {
    // 设置拦截器
  }

  public get<T>(url: string): Promise<T> {
    return this.instance.get(url)
  }
}

const httpClient = new HttpClient(baseURL)
```

### 函数式写法（函数式编程）

```typescript
const axiosInstance = axios.create({ baseURL })

// 设置拦截器
axiosInstance.interceptors.request.use(/* ... */)

export function get<T>(url: string): Promise<T> {
  return axiosInstance.get(url)
}

export const httpClient = { get, post, put, delete }
```

## 🎯 适用场景分析

### Class 写法适合：

#### ✅ 优点

- **封装性好**：私有方法和属性，内部实现不暴露
- **面向对象**：符合 OOP 设计模式
- **扩展性强**：可以继承和多态
- **状态管理**：可以维护内部状态

#### ❌ 缺点

- **学习成本高**：需要理解 class、private、public 等概念
- **代码复杂**：对新手来说不够直观
- **this 绑定**：需要理解 this 的指向问题

#### 🎯 适用场景

- **大型项目**：需要复杂的 HTTP 客户端功能
- **团队开发**：有经验的开发团队
- **企业级应用**：需要严格的代码规范和架构

### 函数式写法适合：

#### ✅ 优点

- **简单直观**：新手容易理解
- **函数式编程**：符合现代 JavaScript 趋势
- **灵活性高**：可以按需导入函数
- **调试友好**：每个函数独立，容易调试

#### ❌ 缺点

- **封装性差**：内部实现暴露给外部
- **全局状态**：axios 实例是全局的
- **扩展性有限**：不如 class 灵活

#### 🎯 适用场景

- **小型项目**：功能相对简单
- **新手团队**：团队成员经验不足
- **快速开发**：需要快速上手和开发

## 📚 代码对比示例

### 1. 基本使用

#### Class 写法

```typescript
// 创建实例
const client = new HttpClient('https://api.example.com')

// 使用
const data = await client.get('/users')
const result = await client.post('/users', userData)
```

#### 函数式写法

```typescript
// 直接使用
const data = await get('/users')
const result = await post('/users', userData)

// 或者使用对象
const data = await httpClient.get('/users')
const result = await httpClient.post('/users', userData)
```

### 2. 错误处理

#### Class 写法

```typescript
class HttpClient {
  private handleError(error: AxiosError): Promise<never> {
    // 私有方法，外部无法访问
    // 错误处理逻辑
    return Promise.reject(error)
  }
}
```

#### 函数式写法

```typescript
function handleRequestError(error: AxiosError): Promise<never> {
  // 公共函数，可以被外部调用
  // 错误处理逻辑
  return Promise.reject(error)
}

// 在拦截器中使用
axiosInstance.interceptors.response.use(null, handleRequestError)
```

### 3. 配置管理

#### Class 写法

```typescript
class HttpClient {
  private config: AxiosRequestConfig

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.config = { baseURL, ...config }
    this.instance = axios.create(this.config)
  }

  public updateConfig(newConfig: AxiosRequestConfig) {
    this.config = { ...this.config, ...newConfig }
    // 更新实例配置
  }
}
```

#### 函数式写法

```typescript
let currentConfig = { baseURL: 'https://api.example.com' }

export function updateConfig(newConfig: AxiosRequestConfig) {
  currentConfig = { ...currentConfig, ...newConfig }
  // 需要重新创建实例或更新现有实例
}
```

## 🚀 性能对比

### 内存使用

#### Class 写法

```typescript
// 每个实例都有自己的方法副本
const client1 = new HttpClient('https://api1.com')
const client2 = new HttpClient('https://api2.com')
// 两个实例，两套方法
```

#### 函数式写法

```typescript
// 函数只有一份，多个实例共享
const instance1 = axios.create({ baseURL: 'https://api1.com' })
const instance2 = axios.create({ baseURL: 'https://api2.com' })
// 两个实例，共享函数
```

### 执行效率

两种方式的执行效率基本相同，差异可以忽略不计。

## 🎨 在 Vue 项目中的使用

### Class 写法在 Vue 中的使用

```vue
<script setup lang="ts">
import { HttpClient } from '@/utils/request'

// 需要理解 class 的概念
const apiClient = new HttpClient('https://api.example.com')

const loadData = async () => {
  try {
    const data = await apiClient.get('/users')
    // 处理数据
  } catch (error) {
    // 处理错误
  }
}
</script>
```

### 函数式写法在 Vue 中的使用

```vue
<script setup lang="ts">
import { httpClient } from '@/utils/request'
// 或者
import { get, post } from '@/utils/request'

// 直接使用，无需理解复杂概念
const loadData = async () => {
  try {
    const data = await httpClient.get('/users')
    // 或者
    const data = await get('/users')
    // 处理数据
  } catch (error) {
    // 处理错误
  }
}
</script>
```

## 📖 学习路径建议

### 对于新手开发者

1. **从函数式开始**：先学会使用函数式写法
2. **理解基本概念**：HTTP 请求、Promise、async/await
3. **掌握错误处理**：try/catch、错误提示
4. **学习进阶用法**：拦截器、请求配置
5. **考虑 Class 写法**：当项目复杂度增加时

### 对于有经验的开发者

1. **根据项目需求选择**：小项目用函数式，大项目用 Class
2. **考虑团队水平**：团队新手多就用函数式
3. **保持一致性**：项目中统一使用一种风格
4. **文档完善**：无论选择哪种，都要有清晰的文档

## 🔄 迁移指南

### 从 Class 迁移到函数式

```typescript
// 原来的 Class 写法
const client = new HttpClient(baseURL)
const data = await client.get('/users')

// 迁移到函数式写法
import { httpClient } from '@/utils/request'
const data = await httpClient.get('/users')
```

### 从函数式迁移到 Class

```typescript
// 原来的函数式写法
import { get } from '@/utils/request'
const data = await get('/users')

// 迁移到 Class 写法
import { HttpClient } from '@/utils/request'
const client = new HttpClient(baseURL)
const data = await client.get('/users')
```

## 🎯 推荐方案

### 项目模板推荐：函数式写法

考虑到项目模板的目标用户（包括新手开发者），我们推荐使用**函数式写法**：

#### 理由：

1. **降低学习门槛**：新手更容易理解和使用
2. **代码简洁**：减少样板代码，专注业务逻辑
3. **调试友好**：问题更容易定位和解决
4. **文档友好**：更容易编写清晰的使用文档

#### 实现方式：

```typescript
// 简单直观的导出方式
export const httpClient = {
  get,
  post,
  put,
  delete: deleteRequest,
  patch
}

// 也支持单独导入
export { get, post, put, deleteRequest as delete, patch }
```

### 企业项目推荐：Class 写法

对于大型企业项目，推荐使用**Class 写法**：

#### 理由：

1. **更好的封装性**：内部实现不暴露
2. **更强的扩展性**：支持继承和多态
3. **更严格的类型检查**：TypeScript 支持更好
4. **更规范的架构**：符合企业级开发规范

## 📝 总结

两种写法各有优缺点，选择哪种主要取决于：

1. **团队水平**：新手团队选函数式，经验团队选 Class
2. **项目规模**：小项目选函数式，大项目选 Class
3. **维护需求**：短期项目选函数式，长期项目选 Class
4. **学习成本**：快速上手选函数式，深入学习选 Class

**最重要的是保持一致性**：无论选择哪种方式，在整个项目中都要保持统一的风格。
