# 布局系统使用指南

本项目采用了现代化的后台管理系统布局架构，提供了完整的 Layout 组件系统，支持响应式设计和灵活的配置。

## 🏗️ 架构概览

### 布局组件结构

```
src/layouts/
├── DefaultLayout.vue          # 默认布局容器
└── components/
    ├── LayoutHeader.vue       # 顶部导航栏
    ├── LayoutSidebar.vue      # 侧边栏
    ├── SidebarMenuItem.vue    # 侧边栏菜单项
    ├── LayoutBreadcrumb.vue   # 面包屑导航
    └── LayoutFooter.vue       # 页脚
```

### 状态管理

```
src/stores/
├── layout.ts                  # 布局状态管理
├── user.ts                    # 用户状态管理
└── index.ts                   # 状态管理入口
```

### 工具函数

```
src/composables/
└── useSidebarMenus.ts         # 侧边栏菜单逻辑
```

## 🎯 核心特性

### 1. 响应式布局

- **桌面端**：完整的侧边栏 + 顶部导航
- **平板端**：可折叠侧边栏
- **移动端**：抽屉式侧边栏

### 2. 灵活的配置

- 侧边栏显示/隐藏
- 侧边栏折叠/展开
- 面包屑导航开关
- 主题模式切换

### 3. 权限控制

- 基于角色的菜单显示
- 路由级别的权限验证
- 按钮级别的权限控制

## 📝 使用方法

### 基本使用

在 `App.vue` 中使用默认布局：

```vue
<template>
  <div id="app">
    <DefaultLayout />
  </div>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>
```

### 布局状态管理

```typescript
import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()

// 切换侧边栏
layoutStore.toggleSidebar()

// 切换折叠状态
layoutStore.toggleSidebarCollapse()

// 设置主题
layoutStore.setTheme('dark')
```

### 用户状态管理

```typescript
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// 获取用户信息
const userInfo = computed(() => userStore.userInfo)

// 检查权限
const hasPermission = userStore.hasPermission('read')

// 检查角色
const hasRole = userStore.hasRole('admin')
```

## 🔧 配置选项

### 布局配置

在 `src/stores/layout.ts` 中可以配置：

```typescript
interface LayoutState {
  showSidebar: boolean // 是否显示侧边栏
  sidebarCollapsed: boolean // 侧边栏是否折叠
  showBreadcrumb: boolean // 是否显示面包屑
  fixedHeader: boolean // 是否固定头部
  theme: 'light' | 'dark' // 主题模式
}
```

### 菜单配置

在 `src/composables/useSidebarMenus.ts` 中配置菜单：

```typescript
const menuItems = ref<MenuItem[]>([
  {
    path: '/',
    title: '首页',
    icon: House
  },
  {
    path: '/dashboard',
    title: '仪表盘',
    icon: DataBoard,
    children: [
      {
        path: '/dashboard/analytics',
        title: '数据分析'
      }
    ]
  }
])
```

## 🎨 样式定制

### SCSS 变量

布局组件使用了统一的 SCSS 变量系统：

```scss
// 在组件中使用
@use '@/assets/styles/variables.scss' as vars;
@use '@/assets/styles/mixins.scss' as mixins;

.layout-header {
  background: #fff;
  border-bottom: 1px solid vars.$border-light;
  box-shadow: vars.$box-shadow-light;
}
```

### 主题定制

可以通过修改 SCSS 变量来定制主题：

```scss
// src/assets/styles/variables.scss
$primary-color: #409eff; // 主色调
$success-color: #67c23a; // 成功色
$warning-color: #e6a23c; // 警告色
$danger-color: #f56c6c; // 危险色
```

## 📱 响应式设计

### 断点配置

```scss
$breakpoint-xs: 480px; // 超小屏幕
$breakpoint-sm: 768px; // 小屏幕
$breakpoint-md: 992px; // 中等屏幕
$breakpoint-lg: 1200px; // 大屏幕
$breakpoint-xl: 1920px; // 超大屏幕
```

### 响应式混入

```scss
@include mixins.respond-to(xs) {
  // 超小屏幕样式
}

@include mixins.respond-to(md) {
  // 中等屏幕样式
}
```

## 🔐 权限系统

### 菜单权限

```typescript
// 在菜单配置中添加权限要求
{
  path: '/admin',
  title: '系统管理',
  icon: Setting,
  permission: 'admin'  // 需要 admin 权限
}
```

### 路由权限

```typescript
// 在路由配置中添加权限验证
{
  path: '/dashboard',
  name: 'Dashboard',
  component: () => import('@/views/Dashboard.vue'),
  meta: {
    title: '仪表盘',
    requiresAuth: true  // 需要登录
  }
}
```

### 组件权限

```vue
<template>
  <el-button v-if="hasPermission('delete')" type="danger"> 删除 </el-button>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const hasPermission = (permission: string) => userStore.hasPermission(permission)
</script>
```

## 🚀 最佳实践

### 1. 组件组织

- **布局组件**：放在 `src/layouts/` 目录
- **页面组件**：放在 `src/views/` 目录
- **通用组件**：放在 `src/components/` 目录

### 2. 状态管理

- **布局状态**：使用 `useLayoutStore`
- **用户状态**：使用 `useUserStore`
- **业务状态**：创建对应的 store

### 3. 样式规范

- 使用 SCSS 变量和混入
- 遵循 BEM 命名规范
- 保持样式的模块化

### 4. 类型安全

- 为所有接口定义 TypeScript 类型
- 使用严格的类型检查
- 避免使用 `any` 类型

## 📚 扩展指南

### 添加新的布局组件

1. 在 `src/layouts/components/` 创建组件
2. 在 `DefaultLayout.vue` 中引入和使用
3. 添加相应的状态管理逻辑

### 添加新的菜单项

1. 在 `useSidebarMenus.ts` 中添加菜单配置
2. 创建对应的页面组件
3. 在路由中添加路由配置

### 自定义主题

1. 修改 SCSS 变量文件
2. 添加主题切换逻辑
3. 更新组件样式

## 🔧 故障排除

### 常见问题

1. **侧边栏不显示**
   - 检查 `layoutStore.showSidebar` 状态
   - 确认菜单数据是否正确加载

2. **权限验证不生效**
   - 检查用户权限数据
   - 确认路由守卫配置

3. **样式不生效**
   - 检查 SCSS 变量导入
   - 确认样式作用域设置

### 调试技巧

```typescript
// 在开发环境中启用调试
if (import.meta.env.DEV) {
  console.log('Layout Store:', layoutStore.$state)
  console.log('User Store:', userStore.$state)
}
```

## 📖 参考资源

- [Vue 3 官方文档](https://vuejs.org/)
- [Element Plus 组件库](https://element-plus.org/)
- [Pinia 状态管理](https://pinia.vuejs.org/)
- [Vue Router 路由](https://router.vuejs.org/)
- [TypeScript 类型系统](https://www.typescriptlang.org/)

---

这个布局系统为后台管理系统提供了完整的解决方案，支持现代化的开发需求和用户体验。通过合理的组件划分和状态管理，可以轻松构建复杂的管理界面。
