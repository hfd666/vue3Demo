<template>
  <div class="pro-table" v-loading="loading">
    <!-- 工具栏 -->
    <div v-if="$slots.toolbar" class="table-toolbar">
      <slot name="toolbar" />
    </div>

    <!-- 表格容器 -->
    <div class="table-container">
      <!-- 表格 -->
      <el-table :data="data" :loading="loading" :border="true" v-bind="$attrs">
        <!-- 序号列 -->
        <el-table-column
          v-if="showIndex"
          type="index"
          :label="indexLabel"
          :width="indexWidth"
          :fixed="indexFixed"
          :align="indexAlign"
          :index="getIndex"
        />

        <!-- 动态列 -->
        <template v-for="column in columns" :key="column.prop">
          <!-- 自定义插槽列 -->
          <el-table-column
            v-if="column.slot"
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
            :min-width="column.minWidth"
            :fixed="column.fixed"
            :align="column.align"
          >
            <template #default="scope">
              <slot :name="column.slot" v-bind="scope" />
            </template>
          </el-table-column>

          <!-- 普通列 -->
          <el-table-column
            v-else
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
            :min-width="column.minWidth"
            :fixed="column.fixed"
            :align="column.align"
            :formatter="column.formatter"
            :show-overflow-tooltip="column.showOverflowTooltip ?? true"
          />
        </template>

        <!-- 空数据 -->
        <template #empty>
          <el-empty :description="emptyText" />
        </template>
      </el-table>
    </div>

    <!-- 分页 -->
    <div v-if="showPagination && pagination" class="table-pagination">
      <el-pagination
        :current-page="pagination.current"
        :page-size="pagination.pageSize"
        :page-sizes="pageSizes"
        :total="pagination.total"
        :layout="paginationLayout"
        :background="true"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})

export interface TableColumn {
  prop: string
  label: string
  width?: string | number
  minWidth?: string | number
  fixed?: 'left' | 'right'
  align?: 'left' | 'center' | 'right'
  slot?: string // 自定义插槽名称
  formatter?: (
    row: Record<string, any>,
    column: Record<string, any>,
    cellValue: any,
    index: number
  ) => any
  showOverflowTooltip?: boolean
}

export interface Pagination {
  current: number
  pageSize: number
  total: number
}

export interface PaginationChange {
  current: number
  pageSize: number
}

interface Props {
  columns: TableColumn[]
  data: Record<string, any>[]
  loading?: boolean
  showIndex?: boolean
  indexLabel?: string
  indexWidth?: string | number
  indexFixed?: 'left' | 'right'
  indexAlign?: 'left' | 'center' | 'right'
  indexMethod?: (index: number) => number
  pagination?: Pagination
  showPagination?: boolean
  pageSizes?: number[]
  paginationLayout?: string
  emptyText?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  showIndex: false,
  indexLabel: '序号',
  indexWidth: 70,
  indexFixed: 'left',
  indexAlign: 'center',
  indexMethod: undefined,
  pagination: () => ({ current: 1, pageSize: 10, total: 0 }),
  showPagination: true,
  pageSizes: () => [10, 20, 50, 100],
  paginationLayout: 'total, sizes, prev, pager, next, jumper',
  emptyText: '暂无数据'
})

const emit = defineEmits<{
  'pagination-change': [pagination: PaginationChange]
  'page-change': [page: number]
  'size-change': [size: number]
}>()

const handlePageChange = (page: number) => {
  emit('pagination-change', { current: page, pageSize: props.pagination.pageSize })
  emit('page-change', page)
}

const handleSizeChange = (size: number) => {
  emit('pagination-change', { current: 1, pageSize: size })
  emit('page-change', 1)
  emit('size-change', size)
}

const getIndex = (index: number) => {
  if (props.indexMethod) {
    return props.indexMethod(index)
  }

  const current = props.pagination.current
  const pageSize = props.pagination.pageSize
  return (current - 1) * pageSize + index + 1
}
</script>

<style scoped lang="scss">
.pro-table {
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  max-width: 100%;
  overflow: hidden;

  .table-toolbar {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .table-container {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .table-pagination {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
