# 封装组件使用文档

本文档介绍项目中封装的三个核心组件的使用方法。

## 1. ProTable + SearchForm（表格组件）

### 特性

- 集成查询表单和表格
- 自动管理分页、加载状态
- 使用 `useTable` Hook 简化状态管理
- 支持自定义列、插槽

### 基础用法

```vue
<template>
  <div>
    <!-- 查询表单 -->
    <SearchForm v-model="searchParams" @search="handleSearch" @reset="handleReset">
      <el-col :span="6">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="searchParams.username" placeholder="请输入" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="状态" prop="status">
          <el-select v-model="searchParams.status" placeholder="请选择">
            <el-option label="全部" value="" />
            <el-option label="启用" value="1" />
          </el-select>
        </el-form-item>
      </el-col>
    </SearchForm>

    <!-- 表格 -->
    <ProTable
      :columns="columns"
      :data="tableData"
      :loading="loading"
      :pagination="pagination"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
    >
      <!-- 工具栏 -->
      <template #toolbar>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </template>

      <!-- 自定义列 -->
      <template #status="{ row }">
        <el-tag :type="row.status === 1 ? 'success' : 'danger'">
          {{ row.status === 1 ? '启用' : '禁用' }}
        </el-tag>
      </template>

      <!-- 操作列 -->
      <template #operation="{ row }">
        <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
        <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="ts">
import { useTable } from '@/composables/useTable'
import { getUserList } from '@/api/user'

// 使用 useTable Hook
const {
  searchParams,
  tableData,
  loading,
  pagination,
  handleSearch,
  handleReset,
  handlePageChange,
  handleSizeChange,
  refresh
} = useTable(getUserList, {
  username: '',
  status: ''
})

// 列配置
const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'username', label: '用户名' },
  { prop: 'status', label: '状态', slot: 'status' },
  { prop: 'operation', label: '操作', slot: 'operation', fixed: 'right' }
]

const handleAdd = () => {
  // 新增逻辑
}

const handleEdit = (row: any) => {
  // 编辑逻辑
}

const handleDelete = async (row: any) => {
  // 删除后刷新
  await deleteUser(row.id)
  refresh()
}
</script>
```

### API 说明

#### useTable Hook

```typescript
const {
  searchParams, // 查询参数（响应式）
  tableData, // 表格数据
  loading, // 加载状态
  pagination, // 分页信息
  handleSearch, // 搜索（重置到第一页）
  handleReset, // 重置查询条件
  handlePageChange, // 页码改变
  handleSizeChange, // 每页条数改变
  refresh // 刷新当前页
} = useTable(apiFn, initParams, options)
```

**参数：**

- `apiFn`: API 请求函数，需返回 `{ list: T[], total: number }`
- `initParams`: 初始查询参数
- `options`: 配置选项
  - `immediate`: 是否立即加载，默认 `true`
  - `defaultPageSize`: 默认每页条数，默认 `10`

#### ProTable Props

| 参数           | 说明         | 类型            | 默认值  |
| -------------- | ------------ | --------------- | ------- |
| columns        | 列配置       | `TableColumn[]` | -       |
| data           | 表格数据     | `any[]`         | -       |
| loading        | 加载状态     | `boolean`       | `false` |
| pagination     | 分页信息     | `Pagination`    | -       |
| showPagination | 是否显示分页 | `boolean`       | `true`  |

#### TableColumn 配置

```typescript
interface TableColumn {
  prop: string // 字段名
  label: string // 列标题
  width?: string | number // 列宽度
  minWidth?: string | number // 最小宽度
  fixed?: 'left' | 'right' // 固定列
  align?: 'left' | 'center' | 'right' // 对齐方式
  slot?: string // 自定义插槽名
  formatter?: Function // 格式化函数
}
```

---

## 2. ProDialog（弹窗组件）

### 特性

- 统一的弹窗样式
- 自动处理确认按钮 loading
- 支持自定义底部
- 简洁的 API

### 基础用法

```vue
<template>
  <!-- 标准表单弹窗 -->
  <ProDialog
    v-model="visible"
    title="编辑用户"
    :loading="loading"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <el-form :model="form">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
    </el-form>
  </ProDialog>

  <!-- 查看详情（无底部） -->
  <ProDialog v-model="visible" title="用户详情" :show-footer="false">
    <div>详情内容</div>
  </ProDialog>

  <!-- 自定义底部 -->
  <ProDialog v-model="visible" title="高级">
    <div>内容</div>
    <template #footer>
      <el-button @click="prevStep">上一步</el-button>
      <el-button type="primary" @click="nextStep">下一步</el-button>
    </template>
  </ProDialog>
</template>

<script setup lang="ts">
const visible = ref(false)
const loading = ref(false)

const handleConfirm = async () => {
  loading.value = true
  try {
    await submitForm()
    visible.value = false
  } finally {
    loading.value = false
  }
}
</script>
```

### API 说明

#### Props

| 参数           | 说明             | 类型      | 默认值   |
| -------------- | ---------------- | --------- | -------- |
| modelValue     | 是否显示         | `boolean` | -        |
| title          | 标题             | `string`  | -        |
| width          | 宽度             | `string`  | `'50%'`  |
| showFooter     | 是否显示底部     | `boolean` | `true`   |
| confirmText    | 确认按钮文案     | `string`  | `'确定'` |
| cancelText     | 取消按钮文案     | `string`  | `'取消'` |
| loading        | 确认按钮 loading | `boolean` | `false`  |
| fullscreen     | 是否全屏         | `boolean` | `false`  |
| destroyOnClose | 关闭时销毁       | `boolean` | `false`  |

#### Events

| 事件名  | 说明     | 参数 |
| ------- | -------- | ---- |
| confirm | 点击确认 | -    |
| cancel  | 点击取消 | -    |

#### Slots

| 插槽名  | 说明     |
| ------- | -------- |
| default | 内容区   |
| footer  | 底部区域 |

---

## 3. ProUpload（上传组件）

### 特性

- 支持图片和文件上传
- 自动校验文件类型和大小
- 图片预览
- 查看模式（disabled）

### 基础用法

```vue
<template>
  <el-form :model="form">
    <!-- 单图上传 -->
    <el-form-item label="头像">
      <ProUpload v-model="form.avatar" type="image" />
    </el-form-item>

    <!-- 多图上传 -->
    <el-form-item label="商品图片">
      <ProUpload v-model="form.images" type="image" :limit="5" tip="最多上传5张图片" />
    </el-form-item>

    <!-- 文件上传 -->
    <el-form-item label="合同">
      <ProUpload v-model="form.contract" accept=".pdf,.doc,.docx" tip="支持 PDF、Word 格式" />
    </el-form-item>

    <!-- 查看模式 -->
    <el-form-item label="头像">
      <ProUpload v-model="detail.avatar" type="image" disabled />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
const form = reactive({
  avatar: '', // 单个：字符串
  images: [], // 多个：数组
  contract: ''
})
</script>
```

### API 说明

#### Props

| 参数       | 说明             | 类型                                    | 默认值   |
| ---------- | ---------------- | --------------------------------------- | -------- |
| modelValue | 绑定值（URL）    | `string \| string[]`                    | -        |
| type       | 上传类型         | `'image' \| 'file'`                     | `'file'` |
| limit      | 最大数量         | `number`                                | `1`      |
| maxSize    | 最大大小(MB)     | `number`                                | `10`     |
| accept     | 接受的文件类型   | `string`                                | -        |
| disabled   | 禁用（查看模式） | `boolean`                               | `false`  |
| tip        | 提示文字         | `string`                                | -        |
| listType   | 展示方式         | `'text' \| 'picture' \| 'picture-card'` | 自动推断 |

### 注意事项

1. **上传接口配置**：需要在 `.env` 文件中配置 `VITE_API_BASE_URL`
2. **接口返回格式**：需要返回 `{ code: 200, data: { url: 'xxx' } }` 格式
3. **认证 Token**：自动从 `localStorage.getItem('auth_token')` 获取

---

## 完整示例

查看 `src/views/ComponentDemo.vue` 文件获取完整的使用示例。

访问路径：`/docs/demo`

---

## 常见问题

### 1. 表格数据不显示？

检查 API 返回格式是否为：

```typescript
{
  list: T[],
  total: number
}
```

### 2. 上传失败？

- 检查 `VITE_API_BASE_URL` 是否配置
- 检查接口返回格式是否正确
- 检查文件大小和类型限制

### 3. 弹窗关闭后数据没清空？

使用 `destroyOnClose` 属性：

```vue
<ProDialog v-model="visible" destroy-on-close>
```

或在 `@cancel` 事件中手动清空数据。
