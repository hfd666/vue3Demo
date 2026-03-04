<template>
  <header class="layout-header">
    <div class="header-content">
      <!-- 左侧：Logo 和标题 -->
      <div class="header-left">
        <div class="logo-section">
          <el-icon :size="24" color="#409eff" class="logo-icon">
            <Grid />
          </el-icon>
          <h1 class="app-title">{{ appTitle }}</h1>
        </div>
      </div>

      <!-- 中间：导航菜单 -->
      <nav class="header-nav">
        <el-menu
          :default-active="activeMenu"
          mode="horizontal"
          :ellipsis="false"
          @select="handleMenuSelect"
        >
          <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
            <el-icon v-if="item.icon">
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
      </nav>

      <!-- 右侧：用户操作区域 -->
      <div class="header-right">
        <!-- 全屏切换 -->
        <el-tooltip v-if="false" content="全屏" placement="bottom">
          <el-button :icon="FullScreen" text @click="toggleFullscreen" />
        </el-tooltip>

        <!-- 主题切换 -->
        <el-tooltip v-if="false" content="主题设置" placement="bottom">
          <el-button :icon="Setting" text @click="openThemeSettings" />
        </el-tooltip>

        <!-- 用户头像和菜单 -->
        <el-dropdown @command="handleUserCommand">
          <div class="user-avatar">
            <el-avatar :size="32" :src="userInfo.avatar">
              {{ userInfo.name.charAt(0) }}
            </el-avatar>
            <span class="user-name">{{ userInfo.name }}</span>
            <el-icon class="dropdown-icon">
              <ArrowDown />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">
                <el-icon><User /></el-icon>
                个人中心
              </el-dropdown-item>
              <el-dropdown-item command="settings">
                <el-icon><Setting /></el-icon>
                系统设置
              </el-dropdown-item>
              <el-dropdown-item divided command="logout">
                <el-icon><SwitchButton /></el-icon>
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import {
  Grid,
  FullScreen,
  Setting,
  User,
  ArrowDown,
  SwitchButton,
  House
  // Document
} from '@element-plus/icons-vue'
import { markRaw } from 'vue'
import { ElMessageBox } from 'element-plus/es'

// 导入类型和工具
import type { MenuItem, UserInfo } from '@/types'
import { useUserStore } from '@/stores/user'

/**
 * 应用标题
 */
const appTitle = computed(() => {
  return import.meta.env.VITE_APP_TITLE || 'Vue3 Admin'
})

const userStore = useUserStore()

/**
 * 当前路由
 */
const route = useRoute()
const router = useRouter()

/**
 * 当前激活的菜单
 */
const activeMenu = computed(() => route.path)

/**
 * 用户信息
 */
const userInfo = computed<UserInfo>(() => userStore.userInfo)

/**
 * 顶部菜单项
 */
const menuItems = ref<MenuItem[]>([
  {
    path: '/',
    title: '首页',
    icon: markRaw(House)
  }
])

/**
 * 处理菜单选择
 */
const handleMenuSelect = (path: string) => {
  if (path !== route.path) {
    router.push(path)
  }
}

/**
 * 切换全屏
 */
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

/**
 * 打开主题设置
 */
const openThemeSettings = () => {
  ElMessage.info('主题设置功能开发中...')
}

/**
 * 处理用户下拉菜单命令
 */
const handleUserCommand = (command: string) => {
  switch (command) {
    case 'profile':
      ElMessage.info('个人中心功能开发中...')
      break
    case 'settings':
      ElMessage.info('系统设置功能开发中...')
      break
    case 'logout':
      ElMessageBox.confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          userStore.logout()
          router.push('/login')
          ElMessage.success('已退出登录')
        })
        .catch(() => {
          // 用户取消
        })
      break
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as vars;
@use '@/assets/styles/mixins.scss' as mixins;

.layout-header {
  background: #fff;
  border-bottom: 1px solid vars.$border-light;
  box-shadow: vars.$box-shadow-light;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 vars.$spacing-lg;
  max-width: 100%;
}

.header-left {
  display: flex;
  align-items: center;
  gap: vars.$spacing-md;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: vars.$spacing-sm;

  .logo-icon {
    flex-shrink: 0;
  }

  .app-title {
    font-size: vars.$font-size-lg;
    font-weight: 600;
    color: vars.$text-primary;
    margin: 0;
    white-space: nowrap;
  }
}

.sidebar-toggle {
  margin-left: vars.$spacing-sm;
}

.header-nav {
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 600px;
  display: none;

  :deep(.el-menu) {
    border-bottom: none;
    background: transparent;
  }

  :deep(.el-menu-item) {
    border-bottom: 2px solid transparent;

    &:hover {
      background-color: vars.$bg-color-page;
    }

    &.is-active {
      border-bottom-color: vars.$primary-color;
      color: vars.$primary-color;
    }
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: vars.$spacing-sm;
}

.user-avatar {
  display: flex;
  align-items: center;
  gap: vars.$spacing-xs;
  padding: vars.$spacing-xs vars.$spacing-sm;
  border-radius: vars.$border-radius-md;
  cursor: pointer;
  @include mixins.transition();

  &:hover {
    background-color: vars.$bg-color-page;
  }

  .user-name {
    font-size: vars.$font-size-sm;
    color: vars.$text-regular;
    white-space: nowrap;
  }

  .dropdown-icon {
    font-size: 12px;
    color: vars.$text-secondary;
  }
}

/* 响应式设计 */
@include mixins.respond-to(md) {
  .header-content {
    padding: 0 vars.$spacing-md;
  }

  .header-nav {
    display: none;
  }

  .user-name {
    display: none;
  }
}

@include mixins.respond-to(xs) {
  .header-content {
    padding: 0 vars.$spacing-sm;
  }

  .app-title {
    display: none;
  }
}
</style>
