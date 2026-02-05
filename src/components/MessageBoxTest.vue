<template>
  <div class="message-box-test">
    <h3>Element Plus 消息框测试</h3>
    <div class="test-buttons">
      <el-button type="primary" @click="showConfirm">确认对话框</el-button>
      <el-button type="warning" @click="showWarning">警告对话框</el-button>
      <el-button type="danger" @click="showError">错误对话框</el-button>
      <el-button type="success" @click="showSuccess">成功对话框</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox, ElMessage } from 'element-plus'

const showConfirm = () => {
  ElMessageBox.confirm('确定要清理缓存吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      ElMessage.success('操作成功')
    })
    .catch(() => {
      ElMessage.info('已取消操作')
    })
}

const showWarning = () => {
  ElMessageBox.alert('这是一个警告消息', '警告', {
    confirmButtonText: '确定',
    type: 'warning'
  })
}

const showError = () => {
  ElMessageBox.alert('这是一个错误消息', '错误', {
    confirmButtonText: '确定',
    type: 'error'
  })
}

const showSuccess = () => {
  ElMessageBox.alert('这是一个成功消息', '成功', {
    confirmButtonText: '确定',
    type: 'success'
  })
}
</script>

<style lang="scss" scoped>
.message-box-test {
  padding: 20px;

  h3 {
    margin-bottom: 20px;
    color: #333;
  }

  .test-buttons {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
}
</style>
