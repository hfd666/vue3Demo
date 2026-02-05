# 设计文档

## 概述

本设计文档描述了 Vue3 应用模版的技术架构和实现细节。该模版基于 Vite + Vue3 + TypeScript 技术栈，集成了 Tailwind CSS、Element Plus、ESLint 和 Prettier，提供了完整的开发环境配置和工具链。

### 技术栈

- **构建工具**: Vite 5.x
- **前端框架**: Vue 3.x (Composition API)
- **开发语言**: TypeScript 5.x
- **样式方案**: Tailwind CSS 3.x
- **UI 组件库**: Element Plus
- **HTTP 客户端**: Axios
- **代码检查**: ESLint 8.x
- **代码格式化**: Prettier 3.x
- **路由管理**: Vue Router 4.x

## 架构

### 整体架构

应用采用标准的 Vue3 单页应用（SPA）架构，使用 Vite 作为开发服务器和构建工具。架构分为以下几层：

```
┌─────────────────────────────────────┐
│         视图层 (Views)              │
│    - 页面组件                        │
│    - Element Plus UI 组件           │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│       组件层 (Components)           │
│    - 可复用组件                      │
│    - 业务组件                        │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│        服务层 (Services)            │
│    - API 请求模块                    │
│    - HTTP 客户端封装                 │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│       工具层 (Utils)                │
│    - 通用工具函数                    │
│    - 类型定义                        │
└─────────────────────────────────────┘
```

### 目录结构

```
vue3-app-template/
├── .vscode/                    # VSCode 配置
│   └── settings.json          # 编辑器设置
├── public/                     # 静态资源
│   └── favicon.ico
├── src/
│   ├── api/                   # API 请求模块
│   │   └── index.ts          # API 导出
│   ├── assets/                # 资源文件
│   │   └── styles/           # 样式文件
│   │       └── main.css      # 主样式文件
│   ├── components/            # 公共组件
│   │   └── HelloWorld.vue    # 示例组件
│   ├── router/                # 路由配置
│   │   └── index.ts          # 路由定义
│   ├── types/                 # TypeScript 类型定义
│   │   ├── env.d.ts          # 环境变量类型
│   │   └── api.ts            # API 类型
│   ├── utils/                 # 工具函数
│   │   └── request.ts        # HTTP 客户端封装
│   ├── views/                 # 页面组件
│   │   └── Home.vue          # 首页
│   ├── App.vue               # 根组件
│   └── main.ts               # 应用入口
├── .env.development           # 开发环境配置
├── .env.staging              # 测试环境配置
├── .env.production           # 生产环境配置
├── .eslintrc.cjs             # ESLint 配置
├── .prettierrc.json          # Prettier 配置
├── index.html                # HTML 模板
├── package.json              # 项目配置
├── postcss.config.js         # PostCSS 配置
├── tailwind.config.js        # Tailwind CSS 配置
├── tsconfig.json             # TypeScript 配置
├── tsconfig.node.json        # Node TypeScript 配置
└── vite.config.ts            # Vite 配置
```

## 组件和接口

### 1. 构建配置 (vite.config.ts)

Vite 配置文件负责定义构建行为、插件和开发服务器设置。

**配置项**:
- `plugins`: Vue 插件、自动导入插件
- `resolve.alias`: 路径别名配置（@ 指向 src）
- `server`: 开发服务器配置（端口、代理）
- `build`: 构建输出配置

**关键插件**:
```typescript
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
```

### 2. TypeScript 配置

**tsconfig.json**: 主配置文件
- `target`: ES2020
- `module`: ESNext
- `moduleResolution`: bundler
- `strict`: true（启用严格模式）
- `jsx`: preserve
- `paths`: 路径映射配置

**tsconfig.node.json**: Node 环境配置
- 用于配置文件（vite.config.ts 等）

### 3. 环境配置系统

**环境变量文件**:
- `.env.development`: 开发环境
- `.env.staging`: 测试环境
- `.env.production`: 生产环境

**环境变量格式**:
```bash
# API 基础地址
VITE_API_BASE_URL=http://localhost:3000/api

# 应用标题
VITE_APP_TITLE=Vue3 App Template
```

**类型定义** (src/types/env.d.ts):
```typescript
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

### 4. HTTP 客户端封装

**文件**: `src/utils/request.ts`

**接口设计**:
```typescript
// 响应数据结构
interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}

// 请求配置
interface RequestConfig extends AxiosRequestConfig {
  skipErrorHandler?: boolean
}

// HTTP 客户端类
class HttpClient {
  private instance: AxiosInstance
  
  constructor(baseURL: string)
  get<T>(url: string, config?: RequestConfig): Promise<T>
  post<T>(url: string, data?: any, config?: RequestConfig): Promise<T>
  put<T>(url: string, data?: any, config?: RequestConfig): Promise<T>
  delete<T>(url: string, config?: RequestConfig): Promise<T>
}
```

**拦截器设计**:

*请求拦截器*:
- 添加认证 token
- 设置请求头
- 添加时间戳

*响应拦截器*:
- 统一处理响应数据
- 错误处理和提示
- Token 过期处理

### 5. 路由配置

**文件**: `src/router/index.ts`

**路由结构**:
```typescript
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
```

### 6. 应用入口

**文件**: `src/main.ts`

**初始化流程**:
1. 创建 Vue 应用实例
2. 注册 Element Plus（按需导入）
3. 注册路由
4. 导入全局样式
5. 挂载应用

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

### 7. 样式系统

**主样式文件**: `src/assets/styles/main.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 自定义样式 */
```

**Tailwind 配置**: `tailwind.config.js`
```javascript
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
```

### 8. 代码质量配置

**ESLint 配置** (.eslintrc.cjs):
- 继承 Vue3 推荐规则
- 继承 TypeScript 推荐规则
- 集成 Prettier 规则
- 自定义规则配置

**Prettier 配置** (.prettierrc.json):
```json
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "none",
  "arrowParens": "avoid"
}
```

### 9. 编辑器配置统一

为确保团队成员使用不同编辑器时都能执行统一的代码规范，项目包含以下配置：

**VSCode 配置** (.vscode/settings.json):
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue"
  ]
}
```

**EditorConfig 配置** (.editorconfig):
```ini
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

**配置说明**:
- `.vscode/settings.json`: 为 VSCode 用户提供统一的编辑器设置，包括保存时自动格式化和 ESLint 自动修复
- `.editorconfig`: 跨编辑器的基础配置文件，被大多数主流编辑器支持（VSCode、WebStorm、Sublime Text 等）
- 这两个配置文件确保无论使用什么编辑器，基本的代码风格（缩进、换行符、字符编码等）都保持一致
- Prettier 和 ESLint 配置文件进一步确保代码格式化和质量检查的统一性

## 数据模型

### API 响应模型

```typescript
// 通用响应结构
interface ApiResponse<T = any> {
  code: number        // 状态码
  data: T            // 响应数据
  message: string    // 响应消息
}

// 分页响应结构
interface PageResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// 错误响应结构
interface ErrorResponse {
  code: number
  message: string
  details?: any
}
```

### 环境配置模型

```typescript
// 环境变量接口
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_TITLE: string
  readonly MODE: string
}
```

## 正确性属性

*属性是一种特征或行为，应该在系统的所有有效执行中保持为真——本质上是关于系统应该做什么的正式声明。属性充当人类可读规范和机器可验证正确性保证之间的桥梁。*


### 属性反思

在分析所有验收标准后，发现本项目的需求主要是关于项目脚手架的结构和配置验证，而不是运行时行为的通用规则。所有验收标准都是具体的示例验证：
- 验证特定文件是否存在
- 验证配置文件是否包含特定内容
- 验证依赖是否正确安装

这些都是一次性的结构验证，不涉及"对于所有输入"的通用属性。因此，本项目不需要属性测试（property-based testing），而是需要结构验证测试。

### 验证属性

由于本项目是应用模版脚手架，主要关注点是项目结构和配置的正确性，而非运行时行为。因此，我们定义以下验证属性：

**属性 1: 项目结构完整性**
*对于任何*通过本模版创建的项目，所有必需的目录和文件都应该存在且位于正确的位置
**验证需求: 1.4, 1.5, 2.3, 3.6, 3.7, 6.1, 6.2, 6.3, 8.1-8.8**

**属性 2: 依赖配置正确性**
*对于任何*通过本模版创建的项目，package.json 应该包含所有必需的依赖项，且版本符合要求
**验证需求: 1.1, 1.2, 1.3, 2.1, 3.1, 3.2, 4.1, 7.2**

**属性 3: 构建脚本完整性**
*对于任何*通过本模版创建的项目，应该包含所有环境的构建和开发脚本
**验证需求: 5.1, 5.2, 5.3, 5.5, 3.5**

**属性 4: 环境配置完整性**
*对于任何*环境配置文件，都应该包含必需的环境变量定义
**验证需求: 6.5**

**属性 5: TypeScript 配置正确性**
*对于任何*通过本模版创建的项目，TypeScript 配置应该启用严格模式并包含正确的路径映射
**验证需求: 1.5, 6.6, 7.7**

**属性 6: HTTP 客户端功能完整性**
*对于任何*通过本模版创建的项目，HTTP 客户端应该实现所有标准 HTTP 方法并配置拦截器
**验证需求: 7.3, 7.4, 7.5, 7.6, 7.8**

**属性 7: 代码质量工具集成**
*对于任何*通过本模版创建的项目，ESLint 和 Prettier 应该正确配置且互不冲突
**验证需求: 3.3, 3.4**

**属性 8: UI 组件库集成**
*对于任何*通过本模版创建的项目，Element Plus 应该配置为按需导入模式
**验证需求: 4.2, 4.3, 4.4**

## 错误处理

### HTTP 请求错误处理

**错误类型**:
1. **网络错误**: 无法连接到服务器
2. **超时错误**: 请求超时
3. **HTTP 状态错误**: 4xx、5xx 状态码
4. **业务错误**: 响应 code 不为成功状态

**处理策略**:
```typescript
// 响应拦截器中的错误处理
response.interceptors.response.use(
  (response) => {
    const { code, data, message } = response.data
    if (code === 200) {
      return data
    } else {
      ElMessage.error(message || '请求失败')
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    if (error.response) {
      // HTTP 状态错误
      const status = error.response.status
      switch (status) {
        case 401:
          ElMessage.error('未授权，请重新登录')
          // 跳转到登录页
          break
        case 403:
          ElMessage.error('拒绝访问')
          break
        case 404:
          ElMessage.error('请求的资源不存在')
          break
        case 500:
          ElMessage.error('服务器错误')
          break
        default:
          ElMessage.error('请求失败')
      }
    } else if (error.request) {
      // 网络错误
      ElMessage.error('网络连接失败')
    } else {
      ElMessage.error('请求配置错误')
    }
    return Promise.reject(error)
  }
)
```

### 环境变量缺失处理

如果必需的环境变量未定义，应用应该在启动时给出明确的错误提示：

```typescript
// 在 main.ts 中验证环境变量
if (!import.meta.env.VITE_API_BASE_URL) {
  console.error('错误: VITE_API_BASE_URL 环境变量未定义')
  throw new Error('缺少必需的环境变量')
}
```

### 路由错误处理

配置 404 页面和路由守卫错误处理：

```typescript
// 404 路由
{
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/views/NotFound.vue')
}

// 路由守卫错误处理
router.onError((error) => {
  console.error('路由错误:', error)
})
```

## 测试策略

### 测试方法

本项目作为应用模版，测试重点在于验证项目结构和配置的正确性，而非运行时行为。采用以下测试方法：

**1. 结构验证测试**
- 使用 Node.js 脚本验证文件和目录结构
- 验证所有必需文件存在
- 验证文件内容包含必需的配置

**2. 配置验证测试**
- 解析并验证 JSON 配置文件（package.json、tsconfig.json）
- 验证依赖版本符合要求
- 验证脚本命令正确定义

**3. 构建测试**
- 执行构建命令验证构建成功
- 验证构建输出包含预期文件
- 验证不同环境的构建使用正确的配置

**4. 代码质量测试**
- 运行 ESLint 验证代码符合规范
- 运行 Prettier 验证代码格式正确
- 验证 ESLint 和 Prettier 配置不冲突

### 测试工具

- **测试框架**: Vitest（与 Vite 集成良好）
- **断言库**: Vitest 内置断言
- **文件系统操作**: Node.js fs 模块
- **JSON 解析**: 原生 JSON.parse

### 测试覆盖范围

**必须测试的内容**:
1. 所有必需文件和目录存在性（需求 8）
2. package.json 包含所有必需依赖（需求 1-4, 7）
3. 构建脚本正确定义（需求 5）
4. 环境配置文件存在且包含必需变量（需求 6）
5. TypeScript 配置正确（需求 1）
6. ESLint 和 Prettier 配置存在（需求 3）
7. HTTP 客户端实现完整（需求 7）

**测试示例**:
```typescript
import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'

describe('项目结构验证', () => {
  it('应该包含所有必需的目录', () => {
    const dirs = [
      'src',
      'src/api',
      'src/components',
      'src/views',
      'src/router',
      'src/utils',
      'src/types',
      'public'
    ]
    
    dirs.forEach(dir => {
      expect(existsSync(resolve(dir))).toBe(true)
    })
  })
  
  it('应该包含所有必需的配置文件', () => {
    const files = [
      'package.json',
      'tsconfig.json',
      'vite.config.ts',
      '.eslintrc.cjs',
      '.prettierrc.json',
      'tailwind.config.js',
      '.env.development',
      '.env.staging',
      '.env.production'
    ]
    
    files.forEach(file => {
      expect(existsSync(resolve(file))).toBe(true)
    })
  })
})

describe('依赖配置验证', () => {
  it('package.json 应该包含所有必需的依赖', () => {
    const pkg = JSON.parse(readFileSync('package.json', 'utf-8'))
    
    // 验证运行时依赖
    expect(pkg.dependencies).toHaveProperty('vue')
    expect(pkg.dependencies).toHaveProperty('vue-router')
    expect(pkg.dependencies).toHaveProperty('axios')
    expect(pkg.dependencies).toHaveProperty('element-plus')
    
    // 验证开发依赖
    expect(pkg.devDependencies).toHaveProperty('vite')
    expect(pkg.devDependencies).toHaveProperty('typescript')
    expect(pkg.devDependencies).toHaveProperty('eslint')
    expect(pkg.devDependencies).toHaveProperty('prettier')
    expect(pkg.devDependencies).toHaveProperty('tailwindcss')
  })
  
  it('应该定义所有环境的构建脚本', () => {
    const pkg = JSON.parse(readFileSync('package.json', 'utf-8'))
    
    expect(pkg.scripts).toHaveProperty('dev')
    expect(pkg.scripts).toHaveProperty('build')
    expect(pkg.scripts).toHaveProperty('build:staging')
    expect(pkg.scripts).toHaveProperty('build:prod')
    expect(pkg.scripts).toHaveProperty('lint')
  })
})
```

### 测试执行

**测试命令**:
```bash
# 运行所有测试
npm run test

# 运行测试并生成覆盖率报告
npm run test:coverage

# 监听模式运行测试
npm run test:watch
```

**持续集成**:
- 在 CI/CD 流程中自动运行测试
- 构建前必须通过所有测试
- 代码提交前运行 lint 检查

### 测试维护

- 当添加新的必需文件或目录时，更新结构验证测试
- 当添加新的依赖时，更新依赖验证测试
- 定期检查测试覆盖率，确保所有关键配置都被测试
- 保持测试代码简洁，专注于验证项目结构和配置的正确性
