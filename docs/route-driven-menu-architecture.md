# 路由驱动菜单架构设计

## 设计理念

采用 **"路由驱动菜单"** 的架构模式，即菜单配置完全基于路由配置生成，确保路由和菜单的一致性。

## 架构优势

### ✅ 单一数据源

- 路由配置是唯一的数据源
- 菜单从路由配置自动生成
- 避免数据重复和不一致

### ✅ 自动同步

- 路由更新时菜单自动更新
- 无需手动维护两套配置
- 减少维护成本和出错概率

### ✅ 类型安全

- 扩展了 Vue Router 的 `RouteMeta` 接口
- 提供完整的 TypeScript 类型支持
- 编译时检查配置正确性

## 核心实现

### 1. 扩展路由元信息

```typescript
declare module 'vue-router' {
  interface RouteMeta {
    title?: string // 菜单标题
    requiresAuth?: boolean // 是否需要认证
    icon?: Component // 菜单图标
    hidden?: boolean // 是否在菜单中隐藏
    permission?: string // 权限标识
    order?: number // 菜单排序
  }
}
```

### 2. 路由配置示例

```typescript
{
  path: '/user',
  name: 'User',
  redirect: '/user/list',
  meta: {
    title: '用户管理',
    icon: User,
    requiresAuth: true,
    permission: 'user:view',
    order: 3
  },
  children: [
    {
      path: 'list',
      name: 'UserList',
      component: () => import('@/views/user/List.vue'),
      meta: {
        title: '用户列表',
        requiresAuth: true,
        permission: 'user:list',
        order: 1
      }
    }
  ]
}
```

### 3. 菜单生成逻辑

```typescript
const generateMenuItems = (): MenuItem[] => {
  return router
    .getRoutes()
    .filter(route => {
      return (
        !route.path.includes('/:') && // 排除动态路由
        !route.meta?.hidden && // 排除隐藏路由
        route.meta?.title
      ) // 必须有标题
    })
    .map(route => routeToMenuItem(route))
    .filter((item): item is MenuItem => item !== null)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
}
```

## 使用方式

### 1. 添加新菜单

只需在路由配置中添加路由，菜单会自动生成：

```typescript
// 在 src/router/index.ts 中添加
{
  path: '/new-feature',
  name: 'NewFeature',
  component: () => import('@/views/NewFeature.vue'),
  meta: {
    title: '新功能',
    icon: NewIcon,
    requiresAuth: true,
    order: 6
  }
}
```

### 2. 隐藏菜单项

设置 `hidden: true` 即可：

```typescript
{
  path: '/admin-only',
  name: 'AdminOnly',
  component: () => import('@/views/AdminOnly.vue'),
  meta: {
    title: '管理员专用',
    hidden: true // 不在菜单中显示
  }
}
```

### 3. 权限控制

通过 `permission` 字段控制菜单显示：

```typescript
// 路由配置
meta: {
  permission: 'user:create'
}

// 使用时
const { getVisibleMenus } = useSidebarMenus()
const userPermissions = ['user:view', 'user:create']
const visibleMenus = getVisibleMenus(userPermissions)
```

## 文件结构

```
src/
├── router/
│   └── index.ts              # 路由配置（菜单数据源）
├── composables/
│   └── useSidebarMenus.ts    # 菜单生成逻辑
├── types/
│   └── ui.ts                 # MenuItem 类型定义
└── layouts/
    └── components/
        └── LayoutSidebar.vue # 菜单渲染组件
```

## 最佳实践

### 1. 路由命名规范

- 使用 PascalCase 命名路由
- 子路由名称包含父路由前缀
- 例：`User` -> `UserList`, `UserRoles`

### 2. 权限设计

- 使用层级权限：`module:action`
- 例：`user:view`, `user:create`, `system:settings`

### 3. 图标管理

- 统一从 `@element-plus/icons-vue` 导入
- 在路由配置顶部集中导入所有图标

### 4. 排序策略

- 使用 `order` 字段控制菜单顺序
- 建议使用 10 的倍数，便于插入新菜单

## 迁移指南

### 从旧架构迁移

1. **移除硬编码菜单**：删除 `useSidebarMenus.ts` 中的静态菜单数据
2. **完善路由配置**：为所有路由添加必要的 `meta` 信息
3. **更新组件**：确保菜单组件使用新的 composable API

### 兼容性考虑

- 保持 `MenuItem` 接口向后兼容
- 渐进式迁移，可以同时支持静态和动态菜单
- 提供降级方案，路由配置不完整时使用默认值

## 总结

路由驱动菜单架构通过统一数据源、自动同步和类型安全，显著提升了项目的可维护性和开发效率。这是现代 Vue 应用的推荐架构模式。
