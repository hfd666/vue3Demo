# 前端架构指南

本文档描述了项目的前端架构设计原则和最佳实践。

## 📁 项目结构

### 类型定义组织原则

我们采用**按业务领域分类**的方式组织 TypeScript 类型定义，而不是按通用性分类。

```
src/types/
├── index.ts           # 统一导出
├── common.ts          # 真正通用的基础类型
├── api.ts             # API 相关类型
├── ui.ts              # UI 组件相关类型
├── system.ts          # 系统相关类型
├── tech-stack.ts      # 技术栈相关类型
├── home.ts            # 首页相关类型
├── user.ts            # 用户相关类型（示例）
├── product.ts         # 产品相关类型（示例）
└── order.ts           # 订单相关类型（示例）
```

### 分类原则

#### ✅ 推荐的分类方式

1. **按业务领域分类**
   - `user.ts` - 用户相关的所有类型
   - `product.ts` - 产品相关的所有类型
   - `order.ts` - 订单相关的所有类型

2. **按功能模块分类**
   - `auth.ts` - 认证相关类型
   - `dashboard.ts` - 仪表板相关类型
   - `settings.ts` - 设置相关类型

3. **按技术层次分类**
   - `api.ts` - API 接口类型
   - `ui.ts` - UI 组件类型
   - `system.ts` - 系统配置类型

#### ❌ 不推荐的分类方式

1. **按通用性分类**

   ```typescript
   // ❌ 不推荐：所有"通用"类型都放在一起
   common.ts // 包含用户、产品、订单等各种类型
   ```

2. **按文件大小分类**
   ```typescript
   // ❌ 不推荐：按类型数量分类
   small - types.ts
   large - types.ts
   ```

### 类型命名规范

#### 接口命名

```typescript
// ✅ 推荐：使用 Interface 后缀或描述性名称
export interface UserProfile {}
export interface ProductInfo {}
export interface OrderItem {}

// ✅ 推荐：配置类型使用 Config 后缀
export interface ApiConfig {}
export interface ThemeConfig {}

// ✅ 推荐：选项类型使用 Options 后缀
export interface RequestOptions {}
export interface SearchOptions {}
```

#### 类型别名命名

```typescript
// ✅ 推荐：状态类型使用联合类型
export type UserStatus = 'active' | 'inactive' | 'pending'
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled'

// ✅ 推荐：ID 类型使用描述性名称
export type UserId = string
export type ProductId = number
```

## 📦 常量组织

### 常量文件结构

```
src/constants/
├── index.ts           # 统一导出
├── api-endpoints.ts   # API 端点常量
├── app-config.ts      # 应用配置常量
├── tech-stack.ts      # 技术栈常量
├── page-config.ts     # 页面配置常量
├── user-roles.ts      # 用户角色常量
└── business-rules.ts  # 业务规则常量
```

### 常量命名规范

```typescript
// ✅ 推荐：使用 SCREAMING_SNAKE_CASE
export const API_BASE_URL = 'https://api.example.com'
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

// ✅ 推荐：数组常量使用 _LIST 后缀
export const TECH_STACK_LIST: TechStackItem[] = [...]
export const USER_ROLES_LIST: UserRole[] = [...]

// ✅ 推荐：映射常量使用 _MAP 后缀
export const STATUS_COLOR_MAP: Record<string, string> = {
  active: '#52c41a',
  inactive: '#d9d9d9'
}
```

## 🔧 工具函数组织

### 工具函数文件结构

```
src/utils/
├── index.ts           # 统一导出
├── request.ts         # HTTP 请求工具
├── env.ts             # 环境变量工具
├── format.ts          # 格式化工具
├── validation.ts      # 验证工具
├── storage.ts         # 存储工具
├── date.ts            # 日期工具
└── dom.ts             # DOM 操作工具
```

### 工具函数命名规范

```typescript
// ✅ 推荐：使用动词开头的驼峰命名
export const formatCurrency = (amount: number): string => {}
export const validateEmail = (email: string): boolean => {}
export const getStorageItem = (key: string): any => {}

// ✅ 推荐：检查函数使用 is/has 开头
export const isValidEmail = (email: string): boolean => {}
export const hasPermission = (permission: string): boolean => {}

// ✅ 推荐：转换函数使用 to 开头
export const toQueryString = (params: object): string => {}
export const toFormData = (data: object): FormData => {}
```

## 🎯 最佳实践

### 1. 类型定义原则

#### 单一职责原则

```typescript
// ✅ 推荐：每个类型文件只关注一个业务领域
// user.ts
export interface User {}
export interface UserProfile {}
export interface UserSettings {}

// ❌ 不推荐：混合多个业务领域
// common.ts
export interface User {}
export interface Product {}
export interface Order {}
```

#### 开放封闭原则

```typescript
// ✅ 推荐：使用泛型和继承来扩展类型
export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

export interface User extends BaseEntity {
  name: string
  email: string
}

export interface Product extends BaseEntity {
  title: string
  price: number
}
```

### 2. 导入导出规范

#### 统一导出

```typescript
// ✅ 推荐：在 index.ts 中统一导出
// types/index.ts
export * from './user'
export * from './product'
export * from './order'

// ✅ 推荐：在组件中从统一入口导入
import type { User, Product, Order } from '@/types'
```

#### 按需导入

```typescript
// ✅ 推荐：只导入需要的类型
import type { User, UserProfile } from '@/types'

// ❌ 不推荐：导入整个模块
import * as UserTypes from '@/types/user'
```

### 3. 类型复用策略

#### 组合优于继承

```typescript
// ✅ 推荐：使用组合
export interface Address {
  street: string
  city: string
  country: string
}

export interface User {
  id: string
  name: string
  address: Address
}

export interface Company {
  id: string
  name: string
  address: Address
}
```

#### 使用工具类型

```typescript
// ✅ 推荐：使用 TypeScript 内置工具类型
export type CreateUserRequest = Omit<User, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateUserRequest = Partial<Pick<User, 'name' | 'email'>>
export type UserResponse = Pick<User, 'id' | 'name' | 'email'>
```

### 4. 类型安全实践

#### 严格的类型定义

```typescript
// ✅ 推荐：使用联合类型而不是字符串
export type UserRole = 'admin' | 'user' | 'guest'
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled'

// ❌ 不推荐：使用宽泛的类型
export interface User {
  role: string // 太宽泛
  status: any // 失去类型安全
}
```

#### 使用品牌类型

```typescript
// ✅ 推荐：使用品牌类型区分相似的基础类型
export type UserId = string & { readonly brand: unique symbol }
export type ProductId = string & { readonly brand: unique symbol }

// 这样可以防止意外的类型混用
const userId: UserId = 'user-123' as UserId
const productId: ProductId = 'product-456' as ProductId
// userId = productId // 编译错误
```

## 📚 示例场景

### 场景 1：新增用户管理功能

1. **创建类型文件**

   ```typescript
   // src/types/user.ts
   export interface User {
     id: string
     name: string
     email: string
     role: UserRole
     status: UserStatus
   }

   export type UserRole = 'admin' | 'user' | 'guest'
   export type UserStatus = 'active' | 'inactive' | 'pending'
   ```

2. **创建常量文件**

   ```typescript
   // src/constants/user.ts
   export const USER_ROLES_LIST: UserRole[] = ['admin', 'user', 'guest']
   export const USER_STATUS_LIST: UserStatus[] = ['active', 'inactive', 'pending']
   ```

3. **在组件中使用**
   ```typescript
   // src/views/UserManagement.vue
   import type { User, UserRole } from '@/types'
   import { USER_ROLES_LIST } from '@/constants'
   ```

### 场景 2：新增产品管理功能

按照相同的模式创建 `types/product.ts` 和 `constants/product.ts`，保持结构一致性。

## 🔍 代码审查检查点

在代码审查时，请检查以下几点：

1. **类型定义是否放在正确的文件中？**
   - 业务相关的类型是否按领域分类？
   - 是否避免了在 common.ts 中放置特定业务类型？

2. **命名是否规范？**
   - 接口名称是否描述性强？
   - 常量是否使用 SCREAMING_SNAKE_CASE？
   - 函数是否使用动词开头？

3. **导入导出是否合理？**
   - 是否从统一入口导入？
   - 是否避免了不必要的全量导入？

4. **类型安全是否充分？**
   - 是否使用了联合类型而不是字符串？
   - 是否避免了 any 类型的滥用？

## 🚀 迁移指南

如果你的项目当前使用了不同的组织方式，可以按以下步骤迁移：

1. **分析现有类型**：识别哪些类型属于同一业务领域
2. **创建新的类型文件**：按业务领域创建新文件
3. **逐步迁移**：一个模块一个模块地迁移类型定义
4. **更新导入**：更新所有组件中的类型导入
5. **清理旧文件**：删除不再使用的旧类型文件

这种组织方式的优势：

- **可维护性**：相关类型集中管理，易于维护
- **可扩展性**：新增功能时只需创建对应的类型文件
- **团队协作**：不同开发者可以并行开发不同业务领域
- **代码复用**：同一业务领域的类型可以更好地复用
