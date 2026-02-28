<template>
  <el-dialog
    :model-value="modelValue"
    :title="title"
    :width="width"
    :fullscreen="fullscreen"
    :destroy-on-close="destroyOnClose"
    :close-on-click-modal="false"
    @update:model-value="handleUpdateVisible"
    @close="handleClose"
  >
    <!-- 内容区 -->
    <slot />

    <!-- 底部按钮 -->
    <template #footer v-if="showFooter">
      <slot name="footer">
        <div class="dialog-footer">
          <el-button @click="handleCancel">
            {{ cancelText }}
          </el-button>
          <el-button type="primary" :loading="loading" @click="handleConfirm">
            {{ confirmText }}
          </el-button>
        </div>
      </slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  title?: string
  width?: string
  showFooter?: boolean
  confirmText?: string
  cancelText?: string
  loading?: boolean
  fullscreen?: boolean
  destroyOnClose?: boolean
}

withDefaults(defineProps<Props>(), {
  title: '',
  width: '50%',
  showFooter: true,
  confirmText: '确定',
  cancelText: '取消',
  loading: false,
  fullscreen: false,
  destroyOnClose: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
  cancel: []
}>()

const handleUpdateVisible = (value: boolean) => {
  emit('update:modelValue', value)
}

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
  emit('update:modelValue', false)
}

const handleClose = () => {
  emit('cancel')
}
</script>

<style scoped lang="scss">
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
