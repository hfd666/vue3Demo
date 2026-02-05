<template>
  <div class="not-found-page flex items-center justify-center min-h-[60vh]">
    <div class="text-center">
      <!-- 404 大标题 -->
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-gray-300 select-none">404</h1>
        <div class="relative -mt-8">
          <div class="absolute inset-0 flex items-center justify-center">
            <el-icon :size="80" color="#409eff" class="animate-bounce">
              <QuestionFilled />
            </el-icon>
          </div>
        </div>
      </div>

      <!-- 错误信息 -->
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">页面未找到</h2>
        <p class="text-lg text-gray-600 mb-2">抱歉，您访问的页面不存在或已被移除。</p>
        <p class="text-sm text-gray-500">请检查 URL 是否正确，或返回首页继续浏览。</p>
      </div>

      <!-- 操作按钮 -->
      <div class="flex justify-center space-x-4">
        <el-button type="primary" size="large" @click="goHome">
          <el-icon class="mr-2">
            <HomeFilled />
          </el-icon>
          返回首页
        </el-button>
        <el-button size="large" @click="goBack">
          <el-icon class="mr-2">
            <Back />
          </el-icon>
          返回上一页
        </el-button>
      </div>

      <!-- 装饰性元素 -->
      <div class="mt-12 flex justify-center space-x-8">
        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <el-icon :size="32" color="#409eff">
            <Search />
          </el-icon>
        </div>
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <el-icon :size="32" color="#67c23a">
            <Document />
          </el-icon>
        </div>
        <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
          <el-icon :size="32" color="#9c27b0">
            <Setting />
          </el-icon>
        </div>
      </div>

      <!-- 提示信息 -->
      <div class="mt-8">
        <el-alert title="提示" type="info" :closable="false" show-icon class="inline-block">
          <template #default>
            <span class="text-sm"> 如果您认为这是一个错误，请联系网站管理员。 </span>
          </template>
        </el-alert>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

/**
 * 路由实例
 */
const router = useRouter()

/**
 * 返回首页
 */
const goHome = (): void => {
  router.push('/')
}

/**
 * 返回上一页
 */
const goBack = (): void => {
  // 如果有历史记录则返回，否则跳转到首页
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.not-found-page {
  padding: 2rem;
}

/* 弹跳动画 */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .not-found-page h1 {
    font-size: 6rem;
  }

  .not-found-page h2 {
    font-size: 1.5rem;
  }

  .not-found-page p {
    font-size: 0.875rem;
  }
}
</style>
