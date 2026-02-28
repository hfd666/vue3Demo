<template>
  <div class="component-demo">
    <el-card header="ProTable + SearchForm 示例" style="margin-bottom: 20px">
      <!-- 查询表单 -->
      <SearchForm v-model="searchParams" @search="handleSearch" @reset="handleReset">
        <el-col :span="6">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="searchParams.username" placeholder="请输入用户名" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态" prop="status">
            <el-select v-model="searchParams.status" placeholder="请选择状态" clearable>
              <el-option label="全部" value="" />
              <el-option label="启用" value="1" />
              <el-option label="禁用" value="0" />
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
          <el-button type="primary" @click="handleAdd">新增用户</el-button>
          <el-button>批量删除</el-button>
        </template>

        <!-- 状态列 -->
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
    </el-card>

    <!-- ProDialog 示例 -->
    <el-card header="ProDialog 示例" style="margin-bottom: 20px">
      <el-space>
        <el-button type="primary" @click="dialogVisible = true">打开弹窗</el-button>
        <el-button @click="dialogVisible2 = true">无底部弹窗</el-button>
      </el-space>

      <!-- 标准表单弹窗 -->
      <ProDialog
        v-model="dialogVisible"
        title="编辑用户"
        :loading="dialogLoading"
        @confirm="handleDialogConfirm"
        @cancel="handleDialogCancel"
      >
        <el-form :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email" />
          </el-form-item>
        </el-form>
      </ProDialog>

      <!-- 无底部弹窗 -->
      <ProDialog v-model="dialogVisible2" title="用户详情" :show-footer="false">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="用户名">张三</el-descriptions-item>
          <el-descriptions-item label="邮箱">zhangsan@example.com</el-descriptions-item>
          <el-descriptions-item label="状态">启用</el-descriptions-item>
          <el-descriptions-item label="创建时间">2024-01-01</el-descriptions-item>
        </el-descriptions>
      </ProDialog>
    </el-card>

    <!-- ProUpload 示例 -->
    <el-card header="ProUpload 示例">
      <el-form :model="uploadForm" label-width="100px">
        <el-form-item label="头像上传">
          <ProUpload v-model="uploadForm.avatar" type="image" :max-size="5" />
        </el-form-item>

        <el-form-item label="多图上传">
          <ProUpload
            v-model="uploadForm.images"
            type="image"
            :limit="5"
            tip="最多上传5张图片，每张不超过5MB"
          />
        </el-form-item>

        <el-form-item label="文件上传">
          <ProUpload v-model="uploadForm.file" accept=".pdf,.doc,.docx" tip="支持 PDF、Word 格式" />
        </el-form-item>

        <el-form-item label="查看模式">
          <ProUpload v-model="uploadForm.avatar" type="image" disabled />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleUploadSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import ProTable from '@/components/ProTable/index.vue'
import SearchForm from '@/components/ProTable/SearchForm.vue'
import ProDialog from '@/components/ProDialog/index.vue'
import ProUpload from '@/components/ProUpload/index.vue'
import { useTable } from '@/composables/useTable'
import type { TableColumn } from '@/components/ProTable/index.vue'

// ========== 表格示例 ==========

// 模拟 API 请求
const getUserList = async (params: Record<string, any>) => {
  console.log('请求参数:', params)

  // 模拟延迟
  await new Promise(resolve => setTimeout(resolve, 500))

  // 模拟数据
  const list = Array.from({ length: params.pageSize }, (_, i) => ({
    id: (params.page - 1) * params.pageSize + i + 1,
    username: `用户${(params.page - 1) * params.pageSize + i + 1}`,
    email: `user${i + 1}@example.com`,
    status: Math.random() > 0.5 ? 1 : 0,
    createTime: '2024-01-01'
  }))

  return {
    list,
    total: 95 // 模拟总数
  }
}

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

// 表格列配置
const columns: TableColumn[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'username', label: '用户名', minWidth: 120 },
  { prop: 'email', label: '邮箱', minWidth: 180 },
  { prop: 'status', label: '状态', width: 100, slot: 'status' },
  { prop: 'createTime', label: '创建时间', width: 180 },
  { prop: 'operation', label: '操作', width: 180, fixed: 'right', slot: 'operation' }
]

const handleAdd = () => {
  ElMessage.info('点击了新增')
}

const handleEdit = (row: Record<string, any>) => {
  ElMessage.info(`编辑用户: ${row.username}`)
}

const handleDelete = async (row: Record<string, any>) => {
  try {
    await ElMessageBox.confirm(`确定要删除用户 ${row.username} 吗？`, '提示', {
      type: 'warning'
    })
    ElMessage.success('删除成功')
    refresh()
  } catch {
    // 取消删除
  }
}

// ========== 弹窗示例 ==========

const dialogVisible = ref(false)
const dialogVisible2 = ref(false)
const dialogLoading = ref(false)

const form = reactive({
  username: '',
  email: ''
})

const handleDialogConfirm = async () => {
  dialogLoading.value = true

  // 模拟提交
  await new Promise(resolve => setTimeout(resolve, 1000))

  dialogLoading.value = false
  dialogVisible.value = false
  ElMessage.success('保存成功')
}

const handleDialogCancel = () => {
  ElMessage.info('取消了操作')
}

// ========== 上传示例 ==========

const uploadForm = reactive({
  avatar: '',
  images: [],
  file: ''
})

const handleUploadSubmit = () => {
  console.log('上传表单数据:', uploadForm)
  ElMessage.success('提交成功')
}
</script>

<style scoped lang="scss">
.component-demo {
  width: 100%;
  padding: 20px;
}
</style>
