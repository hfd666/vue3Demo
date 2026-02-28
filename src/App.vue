<template>
  <div id="app">
    <router-view v-if="route.meta.layout === 'blank'" />
    <DefaultLayout v-else />
  </div>
</template>

<script setup lang="ts">
// 手动导入布局组件
import DefaultLayout from '@/layouts/DefaultLayout.vue'

// 导入状态管理
import { useLayoutStore, useUserStore } from '@/stores'

/**
 * 初始化应用
 */
const route = useRoute()

const initApp = () => {
  const layoutStore = useLayoutStore()
  const userStore = useUserStore()

  // 初始化布局设置
  layoutStore.initLayout()

  // 初始化用户信息
  userStore.initAuthState()
}

// 应用启动时初始化
onMounted(() => {
  initApp()
})
</script>

<style lang="scss">
// 全局样式重置
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Helvetica Neue', sans-serif;
}

#app {
  height: 100vh;
  // overflow: hidden;
}

// 滚动条样式
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;

  &:hover {
    background: #a8a8a8;
  }
}

// Element Plus 样式覆盖
.el-menu--horizontal {
  border-bottom: none !important;
}
</style>
