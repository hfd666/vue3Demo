<template>
  <div class="table-demo p-6">
    <!-- 查询表单 -->
    <SearchForm v-model="searchParams" @search="handleSearch" @reset="handleReset">
      <el-form-item label="户主姓名" prop="name">
        <el-input v-model="searchParams.name" placeholder="请输入户主姓名" clearable />
      </el-form-item>
      <el-form-item label="户号" prop="doorNo">
        <el-input v-model="searchParams.doorNo" placeholder="请输入户号" clearable />
      </el-form-item>
      <el-form-item label="所属位置" prop="locationType">
        <el-select v-model="searchParams.locationType" placeholder="请选择所属位置" clearable>
          <el-option
            v-for="item in locationTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="填报状态" prop="reportStatus">
        <el-select v-model="searchParams.reportStatus" placeholder="请选择填报状态" clearable>
          <el-option
            v-for="item in reportStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </SearchForm>

    <!-- 表格 -->
    <ProTable
      :columns="columns"
      :data="tableData"
      :loading="loading"
      :pagination="pagination"
      :show-index="true"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
    >
      <!-- 工具栏 -->
      <template #toolbar>
        <div class="flex w-full items-center justify-between gap-4">
          <span class="text-lg font-semibold">农户信息列表</span>

          <div class="flex gap-2">
            <el-button type="primary" :icon="Plus" @click="handleAdd"> 新增 </el-button>
            <el-button :icon="Download">导出</el-button>
          </div>
        </div>
      </template>

      <!-- 财产户列 -->
      <template #hasPropertyAccount="{ row }">
        <el-tag :type="row.hasPropertyAccount ? 'success' : 'info'">
          {{ row.hasPropertyAccountText }}
        </el-tag>
      </template>

      <!-- 签字状态列 -->
      <template #signStatus="{ row }">
        <el-tag :type="row.signStatus === 'Sign' ? 'success' : 'warning'">
          {{ row.signStatus === 'Sign' ? '已签字' : '未签字' }}
        </el-tag>
      </template>

      <!-- 操作列 -->
      <template #operation="{ row }">
        <el-button link type="primary" :icon="View" @click="handleView(row)"> 查看 </el-button>
        <el-button link type="primary" :icon="Edit" @click="handleEdit(row)"> 编辑 </el-button>
        <el-button link type="danger" :icon="Delete" @click="handleDelete(row)"> 删除 </el-button>
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Download, Edit, Delete, View } from '@element-plus/icons-vue'
import ProTable from '@/components/ProTable/index.vue'
import SearchForm from '@/components/ProTable/SearchForm.vue'
import { useTable } from '@/composables/useTable'
import { getPeasantHouseholdList } from '@/api'
import type { TableColumn } from '@/components/ProTable/index.vue'

// 所属位置选项
const locationTypeOptions = [
  { label: '全部', value: '' },
  { label: '淹没区', value: 'SubmergedArea' },
  { label: '影响区', value: 'InfluenceArea' },
  { label: '枢纽工程建设区', value: 'HubConstructionArea' },
  { label: '输水工程建设区', value: 'WaterConstructionArea' }
]

// 填报状态选项
const reportStatusOptions = [
  { label: '全部', value: '' },
  { label: '填报成功', value: 'ReportSucceed' }
]

// API 请求函数
const fetchTableData = async (params: Record<string, any>) => {
  const response = await getPeasantHouseholdList({
    sort: 'id,desc',
    status: 'survey',
    projectId: 56,
    type: 'PeasantHousehold',
    page: params.page - 1, // 后端从 0 开始
    size: params.pageSize,
    ...params
  })

  return {
    list: response.content,
    total: response.total
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
  handleSizeChange
} = useTable(fetchTableData, {
  name: '',
  doorNo: '',
  locationType: '',
  reportStatus: ''
})

// 表格列配置
const columns: TableColumn[] = [
  { prop: 'name', label: '户主姓名', minWidth: 120, fixed: 'left' },
  { prop: 'showDoorNo', label: '户号', minWidth: 120 },
  {
    prop: 'area',
    label: '所属区域',
    minWidth: 250,
    formatter: (row: any) =>
      `${row.townCodeText || ''} ${row.villageText || ''} ${row.virutalVillageText || ''}`
  },
  {
    prop: 'reportStatus',
    label: '填报状态',
    minWidth: 120,
    formatter: (row: any) => (row.reportStatus === 'ReportSucceed' ? '填报成功' : row.reportStatus)
  },
  {
    prop: 'hasPropertyAccount',
    label: '财产户',
    minWidth: 100,
    slot: 'hasPropertyAccount'
  },
  { prop: 'locationTypeText', label: '所属位置', minWidth: 150 },
  {
    prop: 'reportDate',
    label: '填报时间',
    minWidth: 180,
    formatter: (row: any) => {
      if (!row.reportDate) return '-'
      return new Date(row.reportDate).toLocaleString('zh-CN')
    }
  },
  { prop: 'signStatus', label: '是否签字', minWidth: 100, slot: 'signStatus' },
  { prop: 'operation', label: '操作', minWidth: 220, fixed: 'right', slot: 'operation' }
]

const handleAdd = () => {
  ElMessage.success('点击了新增按钮')
}

const handleView = (row: any) => {
  ElMessage.info(`查看农户: ${row.name}`)
}

const handleEdit = (row: any) => {
  ElMessage.info(`编辑农户: ${row.name}`)
}

const handleDelete = async (row: any) => {
  try {
    await ElMessageBox.confirm(`确定要删除农户 ${row.name} 吗？`, '提示', {
      type: 'warning',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    })
    ElMessage.success('删除成功')
  } catch {
    // 取消删除
  }
}
</script>

<style scoped lang="scss">
.table-demo {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}
</style>
