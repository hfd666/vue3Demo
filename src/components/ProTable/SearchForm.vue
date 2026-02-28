<template>
  <div class="search-form">
    <el-form
      ref="formRef"
      :model="modelValue"
      v-bind="$attrs"
      class="search-form-content flex gap-4 flex-wrap"
      :class="{ 'is-collapsed': collapsed && showCollapse }"
    >
      <slot />

      <el-button type="primary" :icon="Search" @click="handleSearch"> 查询 </el-button>
      <el-button :icon="Refresh" @click="handleReset"> 重置 </el-button>
      <el-button
        v-if="showCollapse"
        type="text"
        :icon="collapsed ? ArrowDown : ArrowUp"
        @click="toggleCollapse"
      >
        {{ collapsed ? '展开' : '收起' }}
      </el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search, Refresh, ArrowDown, ArrowUp } from '@element-plus/icons-vue'

interface Props {
  modelValue: Record<string, any>
  showCollapse?: boolean // 是否显示展开/收起按钮
}

withDefaults(defineProps<Props>(), {
  showCollapse: false
})

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, any>]
  search: []
  reset: []
}>()

const formRef = ref()
const collapsed = ref(true)

const handleSearch = () => {
  emit('search')
}

const handleReset = () => {
  formRef.value?.resetFields()
  emit('reset')
}

const toggleCollapse = () => {
  collapsed.value = !collapsed.value
}
</script>

<style scoped lang="scss">
.search-form {
  padding: 16px;
  background-color: var(--el-bg-color);
  border-radius: 8px;
  margin-bottom: 16px;
  max-width: 100%;
  overflow: hidden;

  .search-form-content {
    :deep(.el-form-item) {
      width: 250px;
      margin-bottom: 0;
    }

    &.is-collapsed {
      :deep(.el-row) {
        max-height: 40px;
        overflow: hidden;
      }
    }
  }
}
</style>
