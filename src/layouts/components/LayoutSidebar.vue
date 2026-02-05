<template>
  <aside class="layout-sidebar" :class="{ collapsed: isCollapsed }">
    <div class="sidebar-content">
      <!-- 侧边栏菜单 -->
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapsed"
        :unique-opened="true"
        :router="true"
        class="sidebar-menu"
      >
        <!-- 递归渲染菜单项 -->
        <template v-for="item in menuItems" :key="item.path">
          <SidebarMenuItem :menu-item="item" />
        </template>
      </el-menu>
    </div>

    <!-- 折叠按钮 -->
    <div class="sidebar-footer">
      <el-button
        :icon="isCollapsed ? Expand : Fold"
        text
        class="collapse-btn"
        @click="toggleCollapse"
      >
        {{ isCollapsed ? '' : '收起菜单' }}
      </el-button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue'
import SidebarMenuItem from './SidebarMenuItem.vue'

// 导入状态和组合式函数
import { useLayoutStore } from '@/stores/layout'
import { useSidebarMenus } from '@/composables/useSidebarMenus'

/**
 * 布局状态
 */
const layoutStore = useLayoutStore()

/**
 * 当前路由
 */
const route = useRoute()

/**
 * 是否折叠
 */
const isCollapsed = computed(() => layoutStore.sidebarCollapsed)

/**
 * 当前激活的菜单
 */
const activeMenu = computed(() => route.path)

/**
 * 侧边栏菜单项
 */
const { menuItems } = useSidebarMenus()

/**
 * 切换折叠状态
 */
const toggleCollapse = () => {
  layoutStore.toggleSidebarCollapse()
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as vars;
@use '@/assets/styles/mixins.scss' as mixins;

.layout-sidebar {
  width: 240px;
  background: #fff;
  border-right: 1px solid vars.$border-light;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 61px);
  @include mixins.transition(width);

  &.collapsed {
    width: 64px;
  }
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar-menu {
  border-right: none;

  :deep(.el-menu-item),
  :deep(.el-sub-menu__title) {
    height: 48px;
    line-height: 48px;

    &:hover {
      background-color: color-mix(in srgb, vars.$primary-color 10%, transparent);
    }
  }

  :deep(.el-menu-item.is-active) {
    background-color: color-mix(in srgb, vars.$primary-color 15%, transparent);
    color: vars.$primary-color;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background-color: vars.$primary-color;
    }
  }

  :deep(.el-sub-menu) {
    .el-menu-item {
      padding-left: 48px !important;

      &.is-active {
        background-color: color-mix(in srgb, vars.$primary-color 20%, transparent);
      }
    }
  }
}

.sidebar-footer {
  padding: vars.$spacing-sm;
  border-top: 1px solid vars.$border-light;

  .collapse-btn {
    width: 100%;
    justify-content: flex-start;
  }
}

/* 响应式设计 */
@include mixins.respond-to(md) {
  .layout-sidebar {
    position: fixed;
    left: 0;
    top: 60px;
    bottom: 0;
    z-index: 999;
    transform: translateX(-100%);
    @include mixins.transition(transform);

    &.show {
      transform: translateX(0);
    }
  }
}
</style>
