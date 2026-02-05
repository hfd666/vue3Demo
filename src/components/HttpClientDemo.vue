<template>
  <div class="http-client-demo p-6">
    <el-card class="mb-4">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-bold">HTTP 客户端演示</span>
        </div>
      </template>

      <div class="space-y-4">
        <div>
          <h3 class="text-md font-semibold mb-2">功能说明</h3>
          <ul class="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>基于 Axios 封装的 HTTP 客户端</li>
            <li>自动添加认证 Token 和请求时间戳</li>
            <li>统一的响应数据处理</li>
            <li>完善的错误处理和提示</li>
            <li>支持 TypeScript 泛型类型推断</li>
          </ul>
        </div>

        <el-divider />

        <div>
          <h3 class="text-md font-semibold mb-2">API 配置</h3>
          <div class="text-sm">
            <p><strong>基础地址:</strong> {{ apiBaseUrl }}</p>
            <p><strong>超时时间:</strong> 15 秒</p>
            <p><strong>认证方式:</strong> Bearer Token</p>
          </div>
        </div>

        <el-divider />

        <div>
          <h3 class="text-md font-semibold mb-2">测试请求</h3>
          <div class="space-y-2">
            <el-button type="primary" :loading="loading" @click="testGetRequest">
              测试 GET 请求
            </el-button>
            <el-button type="success" :loading="loading" @click="testPostRequest">
              测试 POST 请求
            </el-button>
            <el-button type="warning" :loading="loading" @click="testErrorHandling">
              测试错误处理
            </el-button>
          </div>
        </div>

        <div v-if="response" class="mt-4">
          <h3 class="text-md font-semibold mb-2">响应结果</h3>
          <el-alert
            :title="response.title"
            :type="response.type"
            :description="response.message"
            show-icon
            :closable="false"
          />
        </div>
      </div>
    </el-card>

    <el-card>
      <template #header>
        <div class="card-header">
          <span class="text-lg font-bold">使用示例</span>
        </div>
      </template>

      <div class="code-example">
        <pre class="text-sm bg-gray-50 p-4 rounded overflow-x-auto"><code>// 导入 HTTP 客户端
import { httpClient } from '@/utils/request'

// GET 请求
const users = await httpClient.get&lt;User[]&gt;('/users')

// POST 请求
const newUser = await httpClient.post&lt;User&gt;('/users', {
  name: 'John Doe',
  email: 'john@example.com'
})

// PUT 请求
const updatedUser = await httpClient.put&lt;User&gt;(`/users/${id}`, {
  name: 'Jane Doe'
})

// DELETE 请求
await httpClient.delete(`/users/${id}`)
</code></pre>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { httpClient } from '@/utils/request'
import { getUserList, createUser } from '@/api'

const loading = ref(false)
const response = ref<{
  title: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
} | null>(null)

const apiBaseUrl = computed(() => {
  return import.meta.env.VITE_API_BASE_URL || '/api'
})

const testGetRequest = async () => {
  loading.value = true
  response.value = null

  try {
    // 注意：这是一个演示，实际的 API 可能不存在
    // 在真实环境中，这会触发错误处理
    await getUserList(1, 10)

    response.value = {
      title: 'GET 请求成功',
      type: 'success',
      message: '成功获取用户列表数据'
    }
  } catch (error) {
    response.value = {
      title: 'GET 请求失败',
      type: 'error',
      message: '这是预期的错误，因为演示 API 不存在。错误已被正确捕获和处理。'
    }
  } finally {
    loading.value = false
  }
}

const testPostRequest = async () => {
  loading.value = true
  response.value = null

  try {
    // 注意：这是一个演示，实际的 API 可能不存在
    await createUser({
      name: 'Test User',
      email: 'test@example.com'
    })

    response.value = {
      title: 'POST 请求成功',
      type: 'success',
      message: '成功创建用户'
    }
  } catch (error) {
    response.value = {
      title: 'POST 请求失败',
      type: 'error',
      message: '这是预期的错误，因为演示 API 不存在。错误已被正确捕获和处理。'
    }
  } finally {
    loading.value = false
  }
}

const testErrorHandling = async () => {
  loading.value = true
  response.value = null

  try {
    // 故意请求一个不存在的端点来测试错误处理
    await httpClient.get('/non-existent-endpoint')

    response.value = {
      title: '请求成功',
      type: 'success',
      message: '请求成功'
    }
  } catch (error) {
    response.value = {
      title: '错误处理测试',
      type: 'warning',
      message: 'HTTP 客户端成功捕获并处理了错误。错误信息已通过 Element Plus Message 组件显示。'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.http-client-demo {
  max-width: 800px;
  margin: 0 auto;
}

.code-example pre {
  margin: 0;
}

.code-example code {
  font-family: 'Courier New', Courier, monospace;
}
</style>
