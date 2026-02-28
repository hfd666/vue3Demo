<template>
  <div class="layout-container">
    <!-- 顶部导航栏 -->
    <LayoutHeader />

    <!-- 主体内容区域 -->
    <div class="layout-main">
      <!-- 侧边栏 -->
      <LayoutSidebar v-if="showSidebar" />

      <!-- 内容区域 -->
      <div class="layout-content" :class="{ 'with-sidebar': showSidebar }">
        <!-- 面包屑导航 -->
        <LayoutBreadcrumb v-if="showBreadcrumb" />

        <!-- 页面内容 -->
        <div class="page-content">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <!-- <LayoutFooter /> -->
  </div>
</template>

<script setup lang="ts">
// 手动导入布局组件
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutSidebar from './components/LayoutSidebar.vue'
import LayoutBreadcrumb from './components/LayoutBreadcrumb.vue'
// import LayoutFooter from './components/LayoutFooter.vue'

// 导入布局配置
import { useLayoutStore } from '@/stores/layout'

/**
 * 布局配置
 */
const layoutStore = useLayoutStore()
const route = useRoute()

/**
 * 是否显示侧边栏
 */
const showSidebar = computed(() => layoutStore.showSidebar)

/**
 * 是否首页
 */
const isHomePage = computed(() => route.path === '/' || route.name === 'Home')

/**
 * 是否显示面包屑
 */
const showBreadcrumb = computed(() => layoutStore.showBreadcrumb && !isHomePage.value)
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as vars;
@use '@/assets/styles/mixins.scss' as mixins;

.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: vars.$bg-color-page;
}

.layout-main {
  display: flex;
  flex: 1;
  min-height: 0; /* 关键修复：允许 flex 子元素收缩 */
}

.layout-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0; /* 关键修复：允许 flex 子元素收缩 */
  height: calc(100vh - 61px);
  overflow-x: auto;

  &.with-sidebar {
    margin-left: 0;
  }
}

.page-content {
  flex: 1;
  overflow-y: auto;
  background-color: vars.$bg-color-page;
}

/* 页面过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
