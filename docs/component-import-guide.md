# 组件导入指南

## 概述

本项目采用了混合的组件导入策略：

- **第三方组件库**（如 Element Plus）：自动导入
- **自定义组件**：手动导入

这种策略平衡了开发效率和代码可维护性。

## 自动导入的组件

### Element Plus 组件

所有 Element Plus 组件都可以直接使用，无需手动导入：

```vue
<template>
  <!-- 直接使用，无需导入 -->
  <el-button type="primary">按钮</el-button>
  <el-input v-model="value" />
  <el-card>
    <p>卡片内容</p>
  </el-card>
</template>

<script setup lang="ts">
// Element Plus API 也会自动导入
const handleClick = () => {
  ElMessage.success('操作成功')
  ElNotification({
    title: '通知',
    message: '这是一条通知消息'
  })
}
</script>
```

### Vue Router 组件

Vue Router 的组件也会自动导入：

```vue
<template>
  <!-- 直接使用，无需导入 -->
  <router-link to="/about">关于</router-link>
  <router-view />
</template>
```

## 手动导入的组件

### 自定义组件

所有自定义组件都需要手动导入：

```vue
<template>
  <div>
    <!-- 使用自定义组件 -->
    <HelloWorld greeting="欢迎" />
    <HttpClientDemo />
    <ElementPlusTest />
  </div>
</template>

<script setup lang="ts">
// 必须手动导入自定义组件
import HelloWorld from '@/components/HelloWorld.vue'
import HttpClientDemo from '@/components/HttpClientDemo.vue'
import ElementPlusTest from '@/components/ElementPlusTest.vue'
</script>
```

## 为什么这样设计？

### 自动导入的优势

1. **减少样板代码** - 无需重复导入常用的第三方组件
2. **提高开发效率** - 专注于业务逻辑而不是导入语句
3. **减少打包体积** - 只打包实际使用的组件（Tree Shaking）

### 手动导入的优势

1. **明确的依赖关系** - 清楚地看到组件之间的依赖
2. **更好的 IDE 支持** - 更准确的类型提示和代码跳转
3. **避免命名冲突** - 防止自定义组件与第三方组件冲突
4. **更好的团队协作** - 团队成员能清楚看到组件来源

## 配置说明

### Vite 配置 (vite.config.ts)

```typescript
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    // 自动导入 Element Plus 组件（仅限第三方组件库）
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'src/types/components.d.ts',
      // 禁用目录扫描，不自动导入自定义组件
      dirs: []
    })
  ]
})
```

### 类型定义文件

自动导入的组件类型定义会生成在 `src/types/components.d.ts` 中：

```typescript
declare module 'vue' {
  export interface GlobalComponents {
    // 只包含 Element Plus 组件
    ElButton: (typeof import('element-plus/es'))['ElButton']
    ElInput: (typeof import('element-plus/es'))['ElInput']
    // ... 其他 Element Plus 组件

    // Vue Router 组件
    RouterLink: (typeof import('vue-router'))['RouterLink']
    RouterView: (typeof import('vue-router'))['RouterView']
  }
}
```

## 最佳实践

### 1. 组件命名

- **自定义组件**：使用 PascalCase，如 `UserProfile.vue`
- **页面组件**：使用 PascalCase，如 `UserList.vue`

### 2. 导入顺序

```vue
<script setup lang="ts">
// 1. Vue 相关导入（自动导入，无需写出）
// 2. 第三方库导入
import { someUtility } from 'some-library'

// 3. 自定义组件导入
import UserProfile from '@/components/UserProfile.vue'
import UserCard from '@/components/UserCard.vue'

// 4. API 和类型导入
import { getUserList, type User } from '@/api'

// 5. 其他导入
import { formatDate } from '@/utils'
</script>
```

### 3. 组件注册检查

如果你不确定某个组件是否需要手动导入，可以：

1. 先尝试直接使用
2. 如果 TypeScript 报错，则需要手动导入
3. 查看 `src/types/components.d.ts` 确认哪些组件是自动导入的

## 常见问题

### Q: 为什么我的自定义组件不能自动导入？

A: 这是设计如此。自定义组件需要手动导入以提高代码可维护性。

### Q: 如何添加新的第三方组件库的自动导入？

A: 在 `vite.config.ts` 中添加相应的 resolver：

```typescript
Components({
  resolvers: [
    ElementPlusResolver(),
    // 添加其他组件库的 resolver
    AntDesignVueResolver()
  ]
})
```

### Q: 可以让自定义组件也自动导入吗？

A: 技术上可以，但不推荐。如果确实需要，可以在 `vite.config.ts` 中配置：

```typescript
Components({
  resolvers: [ElementPlusResolver()],
  dirs: ['src/components'] // 启用自定义组件自动导入
})
```

但这会降低代码的可读性和可维护性。

### Q: Vetur 插件报错 "Module has no default export"？

A: **Vetur 已被弃用**，请使用 Volar 插件：

1. **禁用 Vetur 插件**
2. **安装推荐插件**：
   - `Vue Language Features (Volar)`
   - `TypeScript Vue Plugin (Volar)`
3. **重启 VS Code**

Vetur 是为 Vue 2 设计的，对 Vue 3 的 `<script setup>` 语法支持不完善。

## IDE 插件推荐

### VS Code 推荐插件

项目已配置 `.vscode/extensions.json`，VS Code 会自动推荐以下插件：

**必需插件**：

- `Vue Language Features (Volar)` - Vue 3 官方语言服务
- `TypeScript Vue Plugin (Volar)` - TypeScript 支持

**推荐插件**：

- `Tailwind CSS IntelliSense` - Tailwind CSS 智能提示
- `Prettier - Code formatter` - 代码格式化
- `ESLint` - 代码检查

**不推荐插件**：

- `Vetur` - 已弃用，与 Vue 3 不兼容

### 插件配置

项目已配置 `.vscode/settings.json`，包含：

- Volar 优化配置
- 禁用 Vetur（如果安装了）
- ESLint 和 Prettier 集成
- Tailwind CSS 支持
