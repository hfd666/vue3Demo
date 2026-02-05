<template>
  <div class="element-plus-test p-6">
    <h2 class="text-2xl font-bold mb-4">Element Plus 自动导入测试</h2>

    <!-- 测试按钮组件自动导入 -->
    <div class="mb-4">
      <el-button type="primary" @click="handleClick">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </div>

    <!-- 测试输入框组件自动导入 -->
    <div class="mb-4">
      <el-input v-model="inputValue" placeholder="请输入内容" class="w-64" />
      <p class="mt-2 text-gray-600">输入的内容: {{ inputValue }}</p>
    </div>

    <!-- 测试消息提示 -->
    <div class="mb-4">
      <el-button @click="showMessage">显示消息提示</el-button>
      <el-button @click="showNotification">显示通知</el-button>
    </div>

    <!-- 测试卡片组件 -->
    <el-card class="mt-4">
      <template #header>
        <div class="flex justify-between items-center">
          <span>卡片标题</span>
          <el-button link>操作按钮</el-button>
        </div>
      </template>
      <p>这是一个使用 Element Plus 自动导入的测试组件。</p>
      <p>所有组件都无需手动导入，由 unplugin-vue-components 自动处理。</p>
    </el-card>

    <!-- 测试表格组件 -->
    <el-table :data="tableData" class="mt-4" border>
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="age" label="年龄" width="180" />
      <el-table-column prop="address" label="地址" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
// 测试 Vue API 自动导入（由 unplugin-auto-import 处理）
// 无需手动导入 ref, reactive, computed 等
const inputValue = ref('')
const count = ref(0)

// 测试 Element Plus API 自动导入
// ElMessage 和 ElNotification 也会自动导入
const handleClick = () => {
  count.value++
  ElMessage.success(`按钮被点击了 ${count.value} 次`)
}

const showMessage = () => {
  ElMessage({
    message: '这是一条消息提示',
    type: 'success',
    duration: 3000
  })
}

const showNotification = () => {
  ElNotification({
    title: '通知标题',
    message: '这是一条通知消息',
    type: 'info',
    duration: 3000
  })
}

// 测试数据
const tableData = reactive([
  { name: '张三', age: 28, address: '北京市朝阳区' },
  { name: '李四', age: 32, address: '上海市浦东新区' },
  { name: '王五', age: 25, address: '广州市天河区' }
])
</script>

<style scoped>
.element-plus-test {
  max-width: 800px;
  margin: 0 auto;
}
</style>
