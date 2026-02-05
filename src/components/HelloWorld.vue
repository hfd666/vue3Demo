<template>
  <div class="hello-world p-6 bg-white rounded-lg shadow-md">
    <!-- 标题 -->
    <h2 class="text-2xl font-bold text-gray-800 mb-4">
      {{ greeting }}
    </h2>

    <!-- 描述 -->
    <p class="text-gray-600 mb-6">
      这是一个使用 Vue 3 Composition API 和 TypeScript 构建的示例组件。
    </p>

    <!-- 计数器示例 -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-gray-700 mb-2">计数器示例</h3>
      <div class="flex items-center space-x-4">
        <el-button type="primary" :disabled="count <= 0" @click="decrement"> - </el-button>
        <span class="text-2xl font-bold text-blue-600">{{ count }}</span>
        <el-button type="primary" @click="increment"> + </el-button>
        <el-button v-if="count > 0" type="danger" @click="reset"> 重置 </el-button>
      </div>
    </div>

    <!-- 输入框示例 -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-gray-700 mb-2">双向绑定示例</h3>
      <el-input v-model="message" placeholder="请输入内容" class="mb-2" clearable />
      <p class="text-sm text-gray-600">
        你输入的内容: <span class="font-semibold text-blue-600">{{ displayMessage }}</span>
      </p>
    </div>

    <!-- 计算属性示例 -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-gray-700 mb-2">计算属性示例</h3>
      <p class="text-sm text-gray-600">
        计数器的双倍值: <span class="font-semibold text-green-600">{{ doubleCount }}</span>
      </p>
      <p class="text-sm text-gray-600">
        消息长度: <span class="font-semibold text-purple-600">{{ messageLength }}</span> 个字符
      </p>
    </div>

    <!-- Tailwind CSS 样式示例 -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-gray-700 mb-2">Tailwind CSS 样式示例</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 bg-blue-100 rounded-lg text-center">
          <p class="text-blue-800 font-semibold">蓝色卡片</p>
        </div>
        <div class="p-4 bg-green-100 rounded-lg text-center">
          <p class="text-green-800 font-semibold">绿色卡片</p>
        </div>
        <div class="p-4 bg-purple-100 rounded-lg text-center">
          <p class="text-purple-800 font-semibold">紫色卡片</p>
        </div>
      </div>
    </div>

    <!-- TypeScript 类型示例 -->
    <div>
      <h3 class="text-lg font-semibold text-gray-700 mb-2">TypeScript 类型示例</h3>
      <div class="bg-gray-50 p-4 rounded-lg">
        <p class="text-sm text-gray-600 mb-2">用户信息:</p>
        <ul class="text-sm text-gray-700 space-y-1">
          <li><strong>姓名:</strong> {{ user.name }}</li>
          <li><strong>年龄:</strong> {{ user.age }}</li>
          <li><strong>邮箱:</strong> {{ user.email }}</li>
          <li><strong>角色:</strong> {{ user.role }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Props 定义
 */
interface Props {
  greeting?: string
}

/**
 * 用户类型定义
 */
interface User {
  name: string
  age: number
  email: string
  role: 'admin' | 'user' | 'guest'
}

/**
 * 接收 props
 */
const _props = withDefaults(defineProps<Props>(), {
  greeting: 'Hello Vue 3 + TypeScript!'
})

/**
 * 响应式状态
 */
const count = ref<number>(0)
const message = ref<string>('')

/**
 * 用户数据示例
 */
const user = ref<User>({
  name: '张三',
  age: 28,
  email: 'zhangsan@example.com',
  role: 'admin'
})

/**
 * 计算属性：计数器的双倍值
 */
const doubleCount = computed<number>(() => count.value * 2)

/**
 * 计算属性：消息长度
 */
const messageLength = computed<number>(() => message.value.length)

/**
 * 计算属性：显示消息（如果为空则显示提示）
 */
const displayMessage = computed<string>(() => {
  return message.value || '(暂无内容)'
})

/**
 * 方法：增加计数
 */
const increment = (): void => {
  count.value++
}

/**
 * 方法：减少计数
 */
const decrement = (): void => {
  if (count.value > 0) {
    count.value--
  }
}

/**
 * 方法：重置计数
 */
const reset = (): void => {
  count.value = 0
}
</script>

<style scoped>
.hello-world {
  max-width: 800px;
  margin: 0 auto;
}
</style>
