<template>
  <div class="summary-ledger p-6">
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
          <span class="text-lg font-semibold">汇总账</span>

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
  { prop: 'account', label: '科目', width: 150 },
  { prop: 'accountName', label: '科目名称', minWidth: 200 },
  { prop: 'openingBalance', label: '期初余额', width: 120, align: 'right' },
  { prop: 'debitAmount', label: '借方发生额', width: 120, align: 'right' },
  { prop: 'creditAmount', label: '贷方发生额', width: 120, align: 'right' },
  { prop: 'closingBalance', label: '期末余额', width: 120, align: 'right' }
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
.summary-ledger {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}
</style>
