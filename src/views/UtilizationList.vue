<template>
  <div class="utilization-list p-6">
    <!-- 表格 -->
    <ProTable
      :columns="columns"
      :data="tableData"
      :loading="loading"
      :pagination="pagination"
      @pagination-change="handlePaginationChange"
    >
      <!-- 工具栏 -->
      <template #toolbar>
        <div class="flex w-full items-center justify-between gap-4">
          <span class="text-lg font-semibold">利用清单</span>

          <div class="flex gap-2">
            <el-button type="primary">导出</el-button>
          </div>
        </div>
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TableColumn, Pagination, PaginationChange } from '@/components/ProTable/index.vue'

const columns: TableColumn[] = [
  { prop: 'date', label: '日期', width: 120 },
  { prop: 'itemName', label: '项目名称', minWidth: 200 },
  { prop: 'category', label: '类别', width: 120 },
  { prop: 'quantity', label: '数量', width: 100, align: 'right' },
  { prop: 'unit', label: '单位', width: 80 },
  { prop: 'amount', label: '金额', width: 120, align: 'right' },
  { prop: 'remark', label: '备注', minWidth: 150 }
]

const tableData = ref([])
const loading = ref(false)
const pagination = ref<Pagination>({
  current: 1,
  pageSize: 10,
  total: 0
})

const handlePaginationChange = ({ current, pageSize }: PaginationChange) => {
  pagination.value.current = current
  pagination.value.pageSize = pageSize
  // TODO: 加载数据
}
</script>

<style scoped lang="scss">
.utilization-list {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}
</style>
