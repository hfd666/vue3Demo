<template>
  <div class="detail-ledger p-6">
    <!-- 表格 -->
    <ProTable
      :columns="columns"
      :data="tableData"
      :auto-merge-columns="['categoryLevel1', 'categoryLevel2', 'responsibleDept']"
      :manual-spans="manualSpans"
      :show-pagination="false"
    >
      <!-- 工具栏 -->
      <template #toolbar>
        <div class="flex w-full items-center justify-between gap-4">
          <span class="text-lg font-semibold">横向、纵向单元格合并演示</span>

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
import ProTable from '@/components/ProTable/index.vue'
import type { TableColumn, ManualSpan } from '@/components/ProTable/index.vue'

// 手动合并配置
// 使用数组方式指定要合并的行和列
const manualSpans = ref<ManualSpan[]>([
  // 地下水资源行：合并前3列（索引 0, 1, 2）
  {
    rows: [13], // 第13行（地下水资源）
    columns: [0, 1, 2] // 前3列
  },
  // 非常规水资源行：合并前3列
  {
    rows: [14], // 第14行（非常规水资源）
    columns: [0, 1, 2] // 前3列
  }
])

// 列定义（与原表对应）
const columns = ref<TableColumn[]>([
  {
    prop: 'categoryLevel1',
    label: '类别',
    align: 'center',
    width: 140,
    showOverflowTooltip: true
  },
  {
    prop: 'categoryLevel2',
    label: '类别',
    align: 'center',
    width: 160,
    showOverflowTooltip: true
  },
  {
    prop: 'categoryLevel3',
    label: '类别',
    align: 'center',
    width: 180,
    showOverflowTooltip: true
  },
  {
    prop: 'unit',
    label: '单位',
    align: 'center',
    width: 100
  },
  {
    prop: 'quantity',
    label: '数量',
    align: 'center',
    width: 120
  },
  {
    prop: 'responsibleDept',
    label: '责任处室',
    align: 'center',
    width: 140,
    showOverflowTooltip: true
  },
  {
    prop: 'remark',
    label: '备注',
    align: 'left',
    minWidth: 180,
    showOverflowTooltip: true
  }
])

// 表格数据（2026年XX县国有水利资源明细账）
const tableData = ref([
  // 1. 河道 - 数量
  {
    categoryLevel1: '地表水资源',
    categoryLevel2: '河道',
    categoryLevel3: '数量',
    unit: '条',
    quantity: '', // 待填
    responsibleDept: '河湖处',
    remark: '包含江河、溪流、人工水道'
  },
  // 2. 河道 - 水域面积
  {
    categoryLevel1: '地表水资源',
    categoryLevel2: '河道',
    categoryLevel3: '水域面积',
    unit: 'km²',
    quantity: '',
    responsibleDept: '河湖处',
    remark: '包含江河、溪流、人工水道'
  },
  // 3. 河道 - 长度
  {
    categoryLevel1: '地表水资源',
    categoryLevel2: '河道',
    categoryLevel3: '长度',
    unit: 'km',
    quantity: '',
    responsibleDept: '河湖处',
    remark: ''
  },

  // 4-5. 湖泊
  {
    categoryLevel1: '地表水资源',
    categoryLevel2: '湖泊',
    categoryLevel3: '数量',
    unit: '个',
    quantity: '',
    responsibleDept: '河湖处',
    remark: ''
  },
  {
    categoryLevel1: '地表水资源',
    categoryLevel2: '湖泊',
    categoryLevel3: '水域面积',
    unit: 'km²',
    quantity: '',
    responsibleDept: '河湖处',
    remark: ''
  },

  // 6. 水库 - 数量
  {
    categoryLevel1: '地表水资源',
    categoryLevel2: '水库',
    categoryLevel3: '数量',
    unit: '个',
    quantity: '',
    responsibleDept: '运管处',
    remark: ''
  },
  // 7. 水库 - 水域面积
  {
    categoryLevel1: '地表水资源',
    categoryLevel2: '水库',
    categoryLevel3: '水域面积',
    unit: 'km²',
    quantity: '',
    responsibleDept: '河湖处',
    remark: ''
  },
  // 8. 水库 - 总库容
  {
    categoryLevel1: '地表水资源',
    categoryLevel2: '水库',
    categoryLevel3: '总库容',
    unit: 'm³',
    quantity: '',
    responsibleDept: '运管处',
    remark: ''
  },

  // 9-11. 山塘（塘堰）
  {
    categoryLevel1: '地表水资源',
    categoryLevel2: '山塘',
    categoryLevel3: '数量',
    unit: '个',
    quantity: '',
    responsibleDept: '运管处',
    remark: ''
  },
  {
    categoryLevel1: '地表水资源',
    categoryLevel2: '山塘',
    categoryLevel3: '水域面积',
    unit: 'km²',
    quantity: '',
    responsibleDept: '河湖处',
    remark: ''
  },
  {
    categoryLevel1: '地表水资源',
    categoryLevel2: '山塘',
    categoryLevel3: '总容积',
    unit: 'm³',
    quantity: '',
    responsibleDept: '运管处',
    remark: ''
  },

  // 12-13. 其他水域
  {
    categoryLevel1: '地表水资源',
    categoryLevel2: '其他水域',
    categoryLevel3: '数量',
    unit: '条',
    quantity: '',
    responsibleDept: '河湖处',
    remark: ''
  },
  {
    categoryLevel1: '地表水资源',
    categoryLevel2: '其他水域',
    categoryLevel3: '水域面积',
    unit: 'km²',
    quantity: '',
    responsibleDept: '河湖处',
    remark: ''
  },

  // 14. 地下水资源
  {
    categoryLevel1: '地下水资源',
    categoryLevel2: '',
    categoryLevel3: '',
    unit: 'm³',
    quantity: '',
    responsibleDept: '水资源处',
    remark: ''
  },

  // 15. 非常规水资源
  {
    categoryLevel1: '非常规水资源',
    categoryLevel2: '',
    categoryLevel3: '',
    unit: 'm³',
    quantity: '',
    responsibleDept: '水资源处',
    remark: ''
  }
])
</script>

<style scoped lang="scss">
.detail-ledger {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}
</style>
