<template>
  <div class="summary-ledger p-6">
    <!-- 表格 -->
    <ProTable
      :columns="columns"
      :data="tableData"
      :auto-merge-columns="autoMergeColumns"
      :manual-spans="manualSpans"
      :show-pagination="false"
      :show-index="false"
      border
      :row-class-name="getRowClassName"
    >
      <!-- 工具栏 -->
      <template #toolbar>
        <div class="flex w-full items-center justify-between gap-4">
          <span class="text-lg font-semibold"> 2026年浙江省国有水利资源总账 </span>

          <div class="flex gap-2">
            <el-button type="primary" size="default">导出Excel</el-button>
            <el-button type="success" size="default">打印</el-button>
          </div>
        </div>
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ProTable from '@/components/ProTable/index.vue'
import type { TableColumn } from '@/components/ProTable/index.vue' // 根据你的实际路径调整

// 行样式类名
const getRowClassName = ({ row }: { row: any }) => {
  if (row.isProvinceTotal) return 'province-total-row'
  if (row.isCityTotal) return 'city-total-row'
  return ''
}

// ────────────────────────────────────────────────
// 列定义（多级表头）
const columns = ref<TableColumn[]>([
  {
    prop: 'area',
    label: '地级市',
    width: 100,
    align: 'center',
    fixed: 'left'
  },
  {
    prop: 'county',
    label: '县（市、区）',
    width: 140,
    align: 'center',
    fixed: 'left'
  },
  // 河道
  {
    label: '地表水资源',
    children: [
      {
        label: '河道',
        children: [
          { prop: 'river_count', label: '数量\n(条)', width: 90, align: 'center' },
          { prop: 'river_area', label: '水域面积\n(km²)', width: 110, align: 'center' },
          { prop: 'river_length', label: '长度\n(km)', width: 90, align: 'center' }
        ]
      },
      // 湖泊
      {
        label: '湖泊',
        children: [
          { prop: 'lake_count', label: '数量\n(个)', width: 90, align: 'center' },
          { prop: 'lake_area', label: '水域面积\n(km²)', width: 110, align: 'center' }
        ]
      },
      // 水库
      {
        label: '水库',
        children: [
          { prop: 'reservoir_count', label: '数量\n(个)', width: 90, align: 'center' },
          { prop: 'reservoir_area', label: '水域面积\n(km²)', width: 110, align: 'center' },
          { prop: 'reservoir_total', label: '总库容\n(万m³)', width: 110, align: 'center' }
        ]
      },
      // 山塘
      {
        label: '山塘',
        children: [
          { prop: 'pond_count', label: '数量\n(个)', width: 90, align: 'center' },
          { prop: 'pond_area', label: '水域面积\n(km²)', width: 110, align: 'center' },
          { prop: 'pond_total', label: '总容积\n(万m³)', width: 110, align: 'center' }
        ]
      },
      // 其他水域
      {
        label: '其他水域',
        children: [
          { prop: 'other_count', label: '数量\n(条/个)', width: 100, align: 'center' },
          { prop: 'other_area', label: '水域面积\n(km²)', width: 110, align: 'center' }
        ]
      }
    ]
  },

  // 地下水 & 非常规
  { prop: 'groundwater', label: '地下水资源\n(万m³)', width: 130, align: 'center' },
  { prop: 'unconventional', label: '非常规水资源\n(万m³)', width: 140, align: 'center' }
])

// 需要自动纵向合并的字段（地级市名称）
const autoMergeColumns = ['area']

// tableData（示例数据 + 小计 + 全省合计）
const tableData = ref<any[]>([
  // 杭州市 市本级
  {
    area: '杭州市',
    county: '市本级',
    river_count: '128',
    river_area: '456.2',
    river_length: '2345',
    lake_count: '45',
    lake_area: '89.7',
    reservoir_count: '156',
    reservoir_area: '234.5',
    reservoir_total: '12345',
    pond_count: '678',
    pond_area: '123.4',
    pond_total: '5678',
    other_count: '23',
    other_area: '45.6',
    groundwater: '8900',
    unconventional: '1200'
  },
  {
    area: '杭州市',
    county: '上城区',
    river_count: '15',
    river_area: '23.4',
    river_length: '156',
    lake_count: '3',
    lake_area: '12.3',
    reservoir_count: '8',
    reservoir_area: '34.5',
    reservoir_total: '890',
    pond_count: '45',
    pond_area: '23.4',
    pond_total: '456',
    other_count: '5',
    other_area: '8.9',
    groundwater: '560',
    unconventional: '80'
  },
  {
    area: '杭州市',
    county: '拱墅区',
    river_count: '22',
    river_area: '34.5',
    river_length: '234',
    lake_count: '5',
    lake_area: '18.9',
    reservoir_count: '12',
    reservoir_area: '45.6',
    reservoir_total: '1234',
    pond_count: '67',
    pond_area: '34.5',
    pond_total: '678',
    other_count: '8',
    other_area: '12.3',
    groundwater: '780',
    unconventional: '120'
  },
  // 杭州市小计
  {
    area: '小计',
    county: '小计',
    river_count: '856',
    river_area: '1456.8',
    river_length: '7890',
    lake_count: '234',
    lake_area: '456.7',
    reservoir_count: '567',
    reservoir_area: '890.1',
    reservoir_total: '45678',
    pond_count: '2345',
    pond_area: '567.8',
    pond_total: '23456',
    other_count: '123',
    other_area: '234.5',
    groundwater: '34567',
    unconventional: '4567',
    isCityTotal: true
  },
  // 宁波市 市本级
  {
    area: '宁波市',
    county: '市本级',
    river_count: '145',
    river_area: '567.8',
    river_length: '3456',
    lake_count: '56',
    lake_area: '123.4',
    reservoir_count: '178',
    reservoir_area: '345.6',
    reservoir_total: '15678',
    pond_count: '789',
    pond_area: '234.5',
    pond_total: '6789',
    other_count: '34',
    other_area: '67.8',
    groundwater: '12345',
    unconventional: '1678'
  },
  {
    area: '宁波市',
    county: '海曙区',
    river_count: '18',
    river_area: '28.9',
    river_length: '189',
    lake_count: '4',
    lake_area: '15.6',
    reservoir_count: '10',
    reservoir_area: '42.3',
    reservoir_total: '1123',
    pond_count: '56',
    pond_area: '28.9',
    pond_total: '567',
    other_count: '6',
    other_area: '11.2',
    groundwater: '678',
    unconventional: '95'
  },
  {
    area: '宁波市',
    county: '江北区',
    river_count: '25',
    river_area: '41.2',
    river_length: '267',
    lake_count: '6',
    lake_area: '22.3',
    reservoir_count: '15',
    reservoir_area: '56.7',
    reservoir_total: '1567',
    pond_count: '78',
    pond_area: '41.2',
    pond_total: '789',
    other_count: '9',
    other_area: '15.6',
    groundwater: '890',
    unconventional: '145'
  },
  // 宁波市小计
  {
    area: '小计',
    county: '小计',
    river_count: '923',
    river_area: '1678.9',
    river_length: '8901',
    lake_count: '267',
    lake_area: '523.4',
    reservoir_count: '645',
    reservoir_area: '1012.3',
    reservoir_total: '52345',
    pond_count: '2678',
    pond_area: '645.6',
    pond_total: '26789',
    other_count: '145',
    other_area: '267.8',
    groundwater: '39876',
    unconventional: '5234',
    isCityTotal: true
  },
  // 全省合计
  {
    area: '浙江省',
    county: '全省合计',
    river_count: '12456',
    river_area: '28976.5',
    river_length: '156789',
    lake_count: '3456',
    lake_area: '6789.2',
    reservoir_count: '8901',
    reservoir_area: '15678.9',
    reservoir_total: '678901',
    pond_count: '34567',
    pond_area: '8901.2',
    pond_total: '345678',
    other_count: '1789',
    other_area: '3456.7',
    groundwater: '567890',
    unconventional: '78901',
    isProvinceTotal: true
  }
])

// 手动合并配置：小计行和全省合计行合并前两列（地级市 + 县市区）
const manualSpans = computed(() => {
  const spans: { rows: number[]; columns: number[] }[] = []

  tableData.value.forEach((row, index) => {
    if (row.isCityTotal || row.isProvinceTotal) {
      spans.push({
        rows: [index],
        columns: [0, 1] // 合并第1列（地级市）和第2列（县市区）
      })
    }
  })

  return spans
})
</script>

<style scoped>
.summary-ledger {
  border-radius: 8px;
}

/* 表头样式 */
:deep(.el-table th) {
  background-color: #f5f7fa !important;
}

/* 表头换行支持和居中 */
:deep(.el-table th .cell) {
  white-space: pre-line;
  line-height: 1.4;
  text-align: center;
  justify-content: center;
  font-weight: 600;
  color: #606266;
}

/* 市级小计行样式 */
:deep(.city-total-row) {
  font-weight: bold;
  background-color: #f9fafb !important;
}

/* 全省合计行样式 */
:deep(.province-total-row) {
  font-weight: bold;
  color: #343434 !important;
  background-color: #e6e6e6 !important;
}
</style>
