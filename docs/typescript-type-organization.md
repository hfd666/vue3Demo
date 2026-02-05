# TypeScript 类型组织最佳实践

## 问题回答

**问题：如果有多个页面用到了同样的 TypeScript 类型，那么是不是可以把它写到 common？**

**答案：是的！** 这是 TypeScript 类型组织的最佳实践。

## 类型组织原则

### ✅ 应该放到 `common.ts` 的类型

1. **跨多个业务领域使用的基础类型**
   - 被 3 个或以上不同模块使用的类型
   - 通用的工具类型和基础接口
   - 与具体业务无关的抽象类型

2. **示例类型**

   ```typescript
   // ✅ 适合放在 common.ts
   export interface BaseResponse<T = any> {
     code: number
     message: string
     data: T
     success: boolean
   }

   export interface PaginationParams {
     page: number
     pageSize: number
     total?: number
   }

   export interface Option<T = any> {
     label: string
     value: T
     disabled?: boolean
   }
   ```

### 📁 应该放到专门文件的类型

1. **业务领域特定的类型**
   - 只在特定业务模块中使用
   - 与具体业务逻辑紧密相关
   - 单一职责的类型定义

2. **示例类型**

   ```typescript
   // ✅ 适合放在 api.ts
   export interface LoginRequest {
     username: string
     password: string
   }

   // ✅ 适合放在 ui.ts
   export interface MenuItem {
     path: string
     title: string
     icon?: any
   }
   ```

## 当前项目的类型文件结构

```
src/types/
├── index.ts          # 统一导出所有类型
├── common.ts         # 通用基础类型
├── api.ts           # API 接口相关类型
├── ui.ts            # UI 组件相关类型
├── system.ts        # 系统配置相关类型
├── tech-stack.ts    # 技术栈相关类型
├── home.ts          # 首页相关类型
├── env.d.ts         # 环境变量类型声明
├── auto-imports.d.ts # 自动导入类型声明
├── components.d.ts   # 组件类型声明
└── element-plus.d.ts # Element Plus 类型声明
```

## 类型放置决策流程

```
是否被多个业务领域使用？
├── 是 → 是否是基础通用类型？
│   ├── 是 → 放到 common.ts
│   └── 否 → 考虑创建专门的共享类型文件
└── 否 → 放到对应的业务领域类型文件
```

## 实际案例

### 案例 1：ActionButton 类型

```typescript
// ✅ 放在 common.ts - 多个组件都需要操作按钮
export interface ActionButton {
  text: string
  type?: 'primary' | 'success' | 'warning' | 'danger'
  handler: () => void
  disabled?: boolean
}
```

**使用场景：**

- 表格操作列
- 表单提交按钮
- 卡片操作按钮
- 弹窗确认按钮

### 案例 2：MenuItem 类型

```typescript
// ✅ 放在 ui.ts - 主要用于菜单组件
export interface MenuItem {
  path: string
  title: string
  icon?: any
  children?: MenuItem[]
}
```

**使用场景：**

- 侧边栏菜单
- 顶部导航菜单
- 面包屑导航

### 案例 3：TechStackItem 类型

```typescript
// ✅ 放在 tech-stack.ts - 特定业务领域
export interface TechStackItem {
  name: string
  icon: string
  color: string
  description: string
  url: string
}
```

**使用场景：**

- 技术栈展示页面
- 项目介绍组件

## 重构指南

### 识别需要移动的类型

1. **查找重复定义**

   ```bash
   # 搜索重复的接口定义
   grep -r "interface ActionButton" src/types/
   ```

2. **分析使用频率**
   ```bash
   # 搜索类型的使用情况
   grep -r "ActionButton" src/
   ```

### 移动类型的步骤

1. **确定目标文件** - 根据使用场景选择合适的文件
2. **移动类型定义** - 将类型定义移动到目标文件
3. **更新导入语句** - 修改所有使用该类型的文件的导入
4. **删除重复定义** - 清理原文件中的重复定义
5. **运行类型检查** - 确保没有类型错误

## 维护建议

1. **定期审查** - 每月检查类型文件，识别可以合并的重复类型
2. **命名规范** - 使用清晰的命名，避免类型名称冲突
3. **文档注释** - 为每个类型添加清晰的注释说明用途
4. **版本控制** - 类型变更要谨慎，考虑向后兼容性

## 工具支持

### ESLint 配置

```javascript
// 允许在类型文件中使用 any
overrides: [
  {
    files: ['**/*.d.ts', 'src/types/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
]
```

### TypeScript 配置

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

通过合理的类型组织，可以提高代码的可维护性、复用性和类型安全性。
