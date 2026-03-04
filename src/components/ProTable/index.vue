<template>
  <div v-loading="loading" class="pro-table">
    <!-- 工具栏 -->
    <div v-if="$slots.toolbar" class="table-toolbar">
      <slot name="toolbar" />
    </div>

    <!-- 表格容器 -->
    <div class="table-container">
      <!-- 表格 -->
      <el-table
        :data="data"
        :loading="loading"
        :border="true"
        :span-method="autoSpanMethod"
        v-bind="$attrs"
      >
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

        <!-- 动态列（支持多级表头） -->
        <TableColumnComponent
          v-for="column in columns"
          :key="column.prop || column.label"
          :column="column"
        >
          <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope" />
          </template>
        </TableColumnComponent>

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
import TableColumnComponent from './TableColumn.vue'

defineOptions({
  inheritAttrs: false
})

export interface TableColumn {
  prop?: string // 多表头分组列可以没有 prop
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
  children?: TableColumn[] // 子列，支持多级表头
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

export interface SpanMethodProps {
  row: Record<string, any>
  column: Record<string, any>
  rowIndex: number
  columnIndex: number
}

export interface ManualSpan {
  rows: number[] // 要合并的行索引数组，例如 [13] 或 [13, 14]
  columns: number[] // 要合并的列索引数组，例如 [0, 1, 2] 表示合并前3列
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
  spanMethod?: (data: SpanMethodProps) => number[] | { rowspan: number; colspan: number }
  autoMergeColumns?: string[] // 需要自动合并的列的 prop 数组
  manualSpans?: ManualSpan[] // 手动指定的单元格合并配置
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
  emptyText: '暂无数据',
  autoMergeColumns: () => [],
  manualSpans: () => []
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

// 自动合并单元格的逻辑
const autoSpanMethod = ({ row, column, rowIndex, columnIndex }: SpanMethodProps) => {
  // 如果用户提供了自定义的 spanMethod，优先使用
  if (props.spanMethod) {
    return props.spanMethod({ row, column, rowIndex, columnIndex })
  }

  // 调整列索引（如果有序号列，需要减1）
  const actualColumnIndex = props.showIndex ? columnIndex - 1 : columnIndex

  // 1. 优先检查手动合并配置
  if (props.manualSpans && props.manualSpans.length > 0) {
    for (const span of props.manualSpans) {
      const isInRows = span.rows.includes(rowIndex)
      const isInColumns = span.columns.includes(actualColumnIndex)

      if (isInRows && isInColumns) {
        // 判断当前单元格是否是合并区域的起始单元格（最小行索引和最小列索引）
        const minRow = Math.min(...span.rows)
        const minCol = Math.min(...span.columns)

        if (rowIndex === minRow && actualColumnIndex === minCol) {
          // 这是起始单元格，返回合并的行数和列数
          return {
            rowspan: span.rows.length,
            colspan: span.columns.length
          }
        } else {
          // 这是被合并的单元格，需要隐藏
          return { rowspan: 0, colspan: 0 }
        }
      }
    }
  }

  // 2. 如果没有配置自动合并列，返回默认值
  if (!props.autoMergeColumns || props.autoMergeColumns.length === 0) {
    return { rowspan: 1, colspan: 1 }
  }

  // 3. 执行自动合并逻辑
  // 获取当前列的 prop
  const currentProp = column.property

  // 如果当前列不在自动合并列表中，返回默认值
  if (!currentProp || !props.autoMergeColumns.includes(currentProp)) {
    return { rowspan: 1, colspan: 1 }
  }

  // 计算需要合并的行数
  const currentValue = row[currentProp]

  // 如果当前值为空（null、undefined、空字符串），不合并
  if (currentValue === null || currentValue === undefined || currentValue === '') {
    return { rowspan: 1, colspan: 1 }
  }

  let rowspan = 1
  let colspan = 1

  // 向下查找相同值的行
  for (let i = rowIndex + 1; i < props.data.length; i++) {
    if (props.data[i][currentProp] === currentValue) {
      rowspan++
    } else {
      break
    }
  }

  // 向上查找，如果上一行的值相同，说明当前行应该被合并（隐藏）
  if (rowIndex > 0 && props.data[rowIndex - 1][currentProp] === currentValue) {
    return { rowspan: 0, colspan: 0 }
  }

  return { rowspan, colspan }
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
