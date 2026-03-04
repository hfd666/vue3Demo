<template>
  <!-- 有子列的分组表头 -->
  <el-table-column
    v-if="column.children && column.children.length > 0"
    :label="column.label"
    :width="column.width"
    :min-width="column.minWidth"
    :fixed="column.fixed"
    :align="column.align"
  >
    <!-- 递归渲染子列 -->
    <TableColumn v-for="child in column.children" :key="child.prop || child.label" :column="child">
      <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
        <slot :name="slotName" v-bind="slotProps || {}" />
      </template>
    </TableColumn>
  </el-table-column>

  <!-- 自定义插槽列 -->
  <el-table-column
    v-else-if="column.slot"
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

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { computed, useSlots } from 'vue'
import type { TableColumn as TableColumnType } from './index.vue'

defineOptions({
  name: 'TableColumn'
})

interface Props {
  column: TableColumnType
}

defineProps<Props>()

const slots = useSlots()
const slotNames = computed(() => Object.keys(slots))
</script>
