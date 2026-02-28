<template>
  <div class="layout-breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="item in breadcrumbItems"
        :key="item.path"
        :to="item.path === route.path ? undefined : item.path"
      >
        <el-icon v-if="item.icon" class="breadcrumb-icon">
          <component :is="item.icon" />
        </el-icon>
        {{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { House } from '@element-plus/icons-vue'
import { markRaw } from 'vue'
import type { BreadcrumbItem } from '@/types'

/**
 * 当前路由
 */
const route = useRoute()

/**
 * 面包屑项目
 */
const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  const items: BreadcrumbItem[] = []

  // 添加首页
  if (route.path !== '/') {
    items.push({
      path: '/',
      title: '首页',
      icon: markRaw(House)
    })
  }

  // 根据路由生成面包屑
  const pathSegments = route.path.split('/').filter(Boolean)
  let currentPath = ''

  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`

    // 获取路由元信息中的标题
    const title = (route.matched[index + 1]?.meta?.title as string) || segment

    items.push({
      path: currentPath,
      title
    })
  })

  return items
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as vars;

.layout-breadcrumb {
  padding: vars.$spacing-md vars.$spacing-lg;
  background: #fff;
  border-bottom: 1px solid vars.$border-light;

  .breadcrumb-icon {
    margin-right: vars.$spacing-xs;
    font-size: 14px;
  }

  :deep(.el-breadcrumb__item) {
    .el-breadcrumb__inner {
      display: flex;
      align-items: center;
      color: vars.$text-regular;

      &:hover {
        color: vars.$primary-color;
      }
    }

    &:last-child .el-breadcrumb__inner {
      color: vars.$text-primary;
      font-weight: 500;
    }
  }
}
</style>
