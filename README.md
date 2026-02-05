# Vue3 应用模版

一个现代化的 Vue3 + TypeScript 应用模版，集成了 Vite、Tailwind CSS 和 Element Plus，提供开箱即用的开发体验。

## ✨ 特性

- ⚡️ **Vite 5** - 极速的开发服务器和构建工具
- 🖖 **Vue 3** - 渐进式 JavaScript 框架，使用 Composition API
- 🔷 **TypeScript** - 类型安全的 JavaScript 超集
- 🎨 **Tailwind CSS** - 实用优先的 CSS 框架
- 🎨 **Sass/SCSS** - 强大的 CSS 预处理器，支持变量、混入、嵌套等功能
- 🎭 **Element Plus** - 基于 Vue 3 的组件库，支持按需导入
- 🛣️ **Vue Router** - 官方路由管理器
- 📡 **Axios** - 基于 Promise 的 HTTP 客户端，已封装拦截器
- 🔍 **ESLint** - 代码质量检查工具
- 💅 **Prettier** - 代码格式化工具
- 🌍 **多环境支持** - 开发、测试、生产环境配置

## 📦 技术栈

### 核心框架

- [Vue 3.4+](https://vuejs.org/) - 前端框架
- [TypeScript 5.3+](https://www.typescriptlang.org/) - 开发语言
- [Vite 5.0+](https://vitejs.dev/) - 构建工具

### UI 和样式

- [Tailwind CSS 3.4+](https://tailwindcss.com/) - CSS 框架
- [Element Plus 2.5+](https://element-plus.org/) - UI 组件库
- [PostCSS](https://postcss.org/) - CSS 处理工具
- [Sass/SCSS](https://sass-lang.com/) - CSS 预处理器

### 路由和网络

- [Vue Router 4.2+](https://router.vuejs.org/) - 路由管理
- [Axios 1.6+](https://axios-http.com/) - HTTP 客户端

### 代码质量

- [ESLint 8.56+](https://eslint.org/) - 代码检查
- [Prettier 3.1+](https://prettier.io/) - 代码格式化
- [TypeScript ESLint](https://typescript-eslint.io/) - TypeScript 规则

### 开发工具

- [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) - 自动导入 API
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) - 自动导入组件

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 yarn >= 1.22.0 或 pnpm >= 8.0.0

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install

# 或使用 pnpm
pnpm install
```

### 开发

启动开发服务器，支持热更新：

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动。

### 构建

#### 测试环境构建

```bash
npm run build:test
```

#### 生产环境构建

```bash
npm run build:prod
```

构建产物将输出到 `dist` 目录。

### 预览构建结果

```bash
npm run preview
```

## 📁 项目结构

```
vue3-app-template/
├── .vscode/                    # VSCode 编辑器配置
│   └── settings.json          # 编辑器设置（自动格式化、ESLint）
├── public/                     # 静态资源目录
│   └── favicon.svg            # 网站图标
├── src/                        # 源代码目录
│   ├── api/                   # API 请求模块
│   │   └── index.ts          # API 接口定义
│   ├── assets/                # 资源文件
│   │   └── styles/           # 样式文件
│   │       ├── main.scss     # 主样式文件（Tailwind CSS + SCSS）
│   │       ├── variables.scss # SCSS 全局变量
│   │       └── mixins.scss   # SCSS 混入
│   ├── components/            # 公共组件
│   │   ├── HelloWorld.vue    # 示例组件
│   │   └── ...
│   ├── router/                # 路由配置
│   │   └── index.ts          # 路由定义
│   ├── types/                 # TypeScript 类型定义
│   │   ├── api.ts            # API 相关类型
│   │   └── env.d.ts          # 环境变量类型
│   ├── utils/                 # 工具函数
│   │   └── request.ts        # HTTP 客户端封装
│   ├── views/                 # 页面组件
│   │   ├── Home.vue          # 首页
│   │   ├── NotFound.vue      # 404 页面
│   │   └── ...
│   ├── App.vue               # 根组件
│   └── main.ts               # 应用入口
├── .editorconfig              # 编辑器配置
├── .env.development           # 开发环境变量
├── .env.test                 # 测试环境变量
├── .env.production           # 生产环境变量
├── .eslintrc.cjs             # ESLint 配置
├── .gitignore                # Git 忽略文件
├── .prettierrc.json          # Prettier 配置
├── .prettierignore           # Prettier 忽略文件
├── index.html                # HTML 入口文件
├── package.json              # 项目配置和依赖
├── postcss.config.js         # PostCSS 配置
├── tailwind.config.js        # Tailwind CSS 配置
├── tsconfig.json             # TypeScript 配置
├── tsconfig.node.json        # Node 环境 TypeScript 配置
└── vite.config.ts            # Vite 配置
```

## 📜 可用脚本

### 开发相关

| 命令                 | 说明             |
| -------------------- | ---------------- |
| `npm run dev`        | 启动开发服务器   |
| `npm run build:test` | 构建测试环境版本 |
| `npm run build:prod` | 构建生产环境版本 |
| `npm run preview`    | 预览构建结果     |

### 代码质量

| 命令                 | 说明                       |
| -------------------- | -------------------------- |
| `npm run lint`       | 运行 ESLint 检查代码       |
| `npm run lint:fix`   | 运行 ESLint 并自动修复问题 |
| `npm run format`     | 使用 Prettier 格式化代码   |
| `npm run type-check` | 运行 TypeScript 类型检查   |

## 🔧 环境变量配置

项目支持多环境配置，通过 `.env` 文件管理环境变量。

### 环境文件

- `.env.development` - 开发环境配置
- `.env.test` - 测试环境配置
- `.env.production` - 生产环境配置

### 环境变量说明

| 变量名              | 说明         | 示例                        |
| ------------------- | ------------ | --------------------------- |
| `VITE_API_BASE_URL` | API 基础地址 | `http://localhost:3000/api` |
| `VITE_APP_TITLE`    | 应用标题     | `Vue3 App Template`         |

### 使用环境变量

在代码中通过 `import.meta.env` 访问环境变量：

```typescript
// 获取 API 基础地址
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

// 获取应用标题
const appTitle = import.meta.env.VITE_APP_TITLE
```

**注意**：

- 环境变量必须以 `VITE_` 开头才能在客户端代码中访问
- 修改环境变量后需要重启开发服务器
- 所有环境变量都有 TypeScript 类型定义（见 `src/types/env.d.ts`）

## 🧩 组件导入策略

本项目采用了混合的组件导入策略，平衡开发效率和代码可维护性：

### 自动导入的组件

**Element Plus 组件** - 无需手动导入，直接使用：

```vue
<template>
  <!-- 直接使用，无需导入 -->
  <el-button type="primary">按钮</el-button>
  <el-input v-model="value" />
</template>

<script setup lang="ts">
// Element Plus API 也会自动导入
ElMessage.success('操作成功')
</script>
```

**Vue Router 组件** - 也会自动导入：

```vue
<template>
  <router-link to="/about">关于</router-link>
  <router-view />
</template>
```

### 手动导入的组件

**自定义组件** - 必须手动导入：

```vue
<template>
  <HelloWorld greeting="欢迎" />
  <HttpClientDemo />
</template>

<script setup lang="ts">
// 必须手动导入自定义组件
import HelloWorld from '@/components/HelloWorld.vue'
import HttpClientDemo from '@/components/HttpClientDemo.vue'
</script>
```

### 为什么这样设计？

- **自动导入**：减少第三方组件的样板代码，提高开发效率
- **手动导入**：保持自定义组件的明确依赖关系，提高代码可读性

详细说明请参考：

- [组件导入指南](./docs/component-import-guide.md)
- [SCSS 使用指南](./docs/scss-guide.md)
- [前端架构指南](./docs/architecture-guide.md)
- [HTTP 客户端使用指南](./docs/http-client-simple.md)
- [SCSS 使用指南](./docs/scss-guide.md)

## 🛠️ IDE 支持

### VS Code 推荐插件

项目已配置插件推荐，首次打开项目时 VS Code 会提示安装：

**必需插件**：

- `Vue Language Features (Volar)` - Vue 3 官方语言服务
- `TypeScript Vue Plugin (Volar)` - TypeScript 支持

**推荐插件**：

- `Tailwind CSS IntelliSense` - Tailwind CSS 智能提示
- `Prettier - Code formatter` - 代码格式化
- `ESLint` - 代码检查

**⚠️ 重要提醒**：

- **不要使用 Vetur 插件**，它已被弃用且与 Vue 3 不兼容
- 如果已安装 Vetur，请禁用它并使用 Volar

### 配置文件

- `.vscode/extensions.json` - 插件推荐配置
- `.vscode/settings.json` - 工作区设置，包含 Volar、ESLint、Prettier 等配置

## 🎯 核心功能

### HTTP 客户端

项目封装了基于 Axios 的 HTTP 客户端，提供统一的请求和响应处理。

**特性**：

- ✅ 自动添加 API 基础地址
- ✅ 请求/响应拦截器
- ✅ 统一错误处理
- ✅ TypeScript 类型支持
- ✅ 支持 GET、POST、PUT、DELETE 方法

**使用示例**：

```typescript
import { httpClient } from '@/utils/request'

// GET 请求
const data = await httpClient.get<User>('/user/profile')

// POST 请求
const result = await httpClient.post<Response>('/user/login', {
  username: 'admin',
  password: '123456'
})
```

### Element Plus 按需导入

项目配置了 Element Plus 组件的自动按需导入，无需手动注册组件。

**使用示例**：

```vue
<template>
  <!-- 直接使用，无需导入 -->
  <el-button type="primary">按钮</el-button>
  <el-input v-model="value" placeholder="请输入" />
</template>
```

### 路径别名

配置了 `@` 别名指向 `src` 目录，简化导入路径。

```typescript
// 使用别名
import HelloWorld from '@/components/HelloWorld.vue'
import { httpClient } from '@/utils/request'

// 而不是相对路径
import HelloWorld from '../../components/HelloWorld.vue'
```

## 🎨 代码规范

### ESLint

项目使用 ESLint 进行代码质量检查，配置了 Vue3 和 TypeScript 规则。

```bash
# 检查代码
npm run lint

# 自动修复
npm run lint:fix
```

### Prettier

使用 Prettier 进行代码格式化，确保代码风格一致。

```bash
# 格式化代码
npm run format
```

### 编辑器配置

推荐使用 VSCode 编辑器，项目已配置：

- 保存时自动格式化
- 保存时自动修复 ESLint 错误
- Prettier 作为默认格式化工具

其他编辑器可参考 `.editorconfig` 文件配置基础规范。

## 📝 开发建议

### 组件开发

1. **使用 Composition API**：推荐使用 `<script setup>` 语法
2. **类型定义**：为 props、emits 添加 TypeScript 类型
3. **组件命名**：使用 PascalCase 命名组件文件

```vue
<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})

const emit = defineEmits<{
  update: [value: number]
}>()
</script>
```

### API 请求

1. **集中管理**：在 `src/api` 目录定义 API 接口
2. **类型定义**：为请求和响应添加类型定义
3. **错误处理**：使用 HTTP 客户端的统一错误处理

```typescript
// src/api/user.ts
import { httpClient } from '@/utils/request'

export interface User {
  id: number
  name: string
  email: string
}

export const getUserProfile = () => {
  return httpClient.get<User>('/user/profile')
}
```

### 样式开发

1. **优先使用 Tailwind CSS**：利用实用类快速构建界面
2. **SCSS 预处理器**：支持变量、混入、嵌套等高级功能
3. **组件样式**：使用 `<style lang="scss" scoped>` 编写组件样式
4. **全局样式**：在 `src/assets/styles` 目录添加全局样式

**SCSS 功能**：

```scss
// 使用全局变量
.my-component {
  color: $primary-color;
  padding: $spacing-md;

  // 使用混入
  @include center-flex;
  @include transition();

  // 嵌套语法
  .title {
    font-size: $font-size-lg;

    &:hover {
      color: darken($primary-color, 10%);
    }
  }

  // 响应式混入
  @include respond-to(md) {
    padding: $spacing-lg;
  }
}
```

**全局 SCSS 变量和混入**：

- `src/assets/styles/variables.scss` - 颜色、间距、字体等变量
- `src/assets/styles/mixins.scss` - 常用的样式混入
- 这些文件会自动导入到所有 SCSS 文件中，无需手动导入

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

[MIT License](LICENSE)

## 🔗 相关链接

- [Vue 3 文档](https://cn.vuejs.org/)
- [Vite 文档](https://cn.vitejs.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/zh/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Element Plus 文档](https://element-plus.org/zh-CN/)
- [Vue Router 文档](https://router.vuejs.org/zh/)
