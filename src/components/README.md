# 封装组件说明

本目录包含项目中封装的核心业务组件。

## 组件列表

### 1. ProTable（表格组件）

- 路径：`src/components/ProTable/`
- 包含：
  - `index.vue` - 表格主组件
  - `SearchForm.vue` - 查询表单组件
- 配合 `src/composables/useTable.ts` Hook 使用

### 2. ProDialog（弹窗组件）

- 路径：`src/components/ProDialog/index.vue`
- 统一的弹窗封装，支持自定义底部

### 3. ProUpload（上传组件）

- 路径：`src/components/ProUpload/index.vue`
- 支持图片和文件上传，自动校验

## 使用方式

### 方式一：按需导入

```typescript
import ProTable from '@/components/ProTable/index.vue'
import SearchForm from '@/components/ProTable/SearchForm.vue'
import ProDialog from '@/components/ProDialog/index.vue'
import ProUpload from '@/components/ProUpload/index.vue'
```

### 方式二：统一导入

```typescript
import { ProTable, SearchForm, ProDialog, ProUpload } from '@/components'
```

## 示例页面

访问 `/docs/demo` 查看完整的使用示例。

源码：`src/views/ComponentDemo.vue`

## 详细文档

查看 `docs/components-usage.md` 获取详细的 API 文档和使用说明。

## 组件特性

- ✅ TypeScript 支持
- ✅ 响应式设计
- ✅ 简洁的 API
- ✅ 高度可定制
- ✅ 开箱即用
