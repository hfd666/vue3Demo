<template>
  <!-- 有子菜单的情况 -->
  <el-sub-menu v-if="menuItem.children && menuItem.children.length > 0" :index="menuItem.path">
    <template #title>
      <el-icon v-if="menuItem.icon">
        <component :is="menuItem.icon" />
      </el-icon>
      <span>{{ menuItem.title }}</span>
    </template>

    <!-- 递归渲染子菜单 -->
    <template v-for="child in menuItem.children" :key="child.path">
      <SidebarMenuItem :menu-item="child" />
    </template>
  </el-sub-menu>

  <!-- 普通菜单项 -->
  <el-menu-item v-else :index="menuItem.path">
    <el-icon v-if="menuItem.icon">
      <component :is="menuItem.icon" />
    </el-icon>
    <template #title>
      <span>{{ menuItem.title }}</span>
    </template>
  </el-menu-item>
</template>

<script setup lang="ts">
import type { MenuItem } from '@/types'

/**
 * 组件属性
 */
interface Props {
  menuItem: MenuItem
}

defineProps<Props>()
</script>
