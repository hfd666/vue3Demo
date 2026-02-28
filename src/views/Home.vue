<template>
  <div class="home-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">欢迎使用 Vue3 管理系统</h1>
      <p class="page-description">
        基于 Vue 3 + TypeScript + Element Plus 构建的现代化管理系统模板
      </p>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-grid">
      <el-card v-for="stat in statsData" :key="stat.title" class="stat-card" shadow="hover">
        <div class="stat-content">
          <div class="stat-icon" :style="{ backgroundColor: stat.color }">
            <el-icon :size="24">
              <component :is="stat.icon" />
            </el-icon>
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-title">{{ stat.title }}</div>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 功能展示区域 -->
    <div class="features-section">
      <el-row :gutter="24">
        <!-- 技术栈展示 -->
        <el-col :xs="24" :lg="12">
          <el-card class="feature-card" header="技术栈">
            <div class="tech-stack-grid">
              <div
                v-for="tech in techStack"
                :key="tech.name"
                class="tech-item"
                :title="tech.description"
              >
                <el-icon :size="20" :color="tech.color">
                  <component :is="tech.icon" />
                </el-icon>
                <span class="tech-name">{{ tech.name }}</span>
              </div>
            </div>
          </el-card>
        </el-col>

        <!-- 快速操作 -->
        <el-col :xs="24" :lg="12">
          <el-card class="feature-card" header="快速操作">
            <div class="quick-actions">
              <el-button
                v-for="action in quickActions"
                :key="action.title"
                :type="action.type"
                :icon="action.icon"
                class="action-btn"
                @click="action.handler"
              >
                {{ action.title }}
              </el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 功能演示标签页 -->
    <div class="demo-section">
      <el-card header="功能演示">
        <el-tabs v-model="activeTab" type="border-card">
          <!-- Vue 3 组件示例 -->
          <el-tab-pane label="Vue 3 组件" name="component">
            <HelloWorld greeting="欢迎体验 Vue 3 Composition API!" />
          </el-tab-pane>

          <!-- Element Plus 组件示例 -->
          <el-tab-pane label="Element Plus" name="element">
            <ElementPlusTest />
          </el-tab-pane>

          <!-- HTTP 请求示例 -->
          <el-tab-pane label="HTTP 请求" name="http">
            <HttpClientDemo />
          </el-tab-pane>

          <!-- SCSS 功能演示 -->
          <el-tab-pane label="SCSS 演示" name="scss">
            <ScssDemo />
          </el-tab-pane>

          <!-- 消息框测试 -->
          <el-tab-pane label="消息框测试" name="messagebox">
            <MessageBoxTest />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  User,
  Document,
  DataBoard,
  Setting,
  Plus,
  View,
  Edit,
  Delete
} from '@element-plus/icons-vue'
import { markRaw } from 'vue'
import { ElMessageBox } from 'element-plus/es'

// 手动导入自定义组件
import HelloWorld from '@/components/HelloWorld.vue'
import ElementPlusTest from '@/components/ElementPlusTest.vue'
import HttpClientDemo from '@/components/HttpClientDemo.vue'
import ScssDemo from '@/components/ScssDemo.vue'
import MessageBoxTest from '@/components/MessageBoxTest.vue'

// 导入类型和常量
import type { HomeTabName } from '@/types'
import { CORE_TECH_STACK } from '@/constants'

/**
 * 当前激活的标签页
 */
const activeTab = ref<HomeTabName>('component')

/**
 * 技术栈列表
 */
const techStack = ref(CORE_TECH_STACK)

/**
 * 统计数据
 */
const statsData = ref([
  {
    title: '总用户数',
    value: '1,234',
    icon: markRaw(User),
    color: '#409eff'
  },
  {
    title: '文档数量',
    value: '567',
    icon: markRaw(Document),
    color: '#67c23a'
  },
  {
    title: '数据报表',
    value: '89',
    icon: markRaw(DataBoard),
    color: '#e6a23c'
  },
  {
    title: '系统配置',
    value: '12',
    icon: markRaw(Setting),
    color: '#f56c6c'
  }
])

/**
 * 快速操作
 */
const quickActions = ref([
  {
    title: '新建用户',
    type: 'primary' as const,
    icon: markRaw(Plus),
    handler: () => ElMessage.info('新建用户功能开发中...')
  },
  {
    title: '查看报表',
    type: 'success' as const,
    icon: markRaw(View),
    handler: () => ElMessage.info('查看报表功能开发中...')
  },
  {
    title: '编辑设置',
    type: 'warning' as const,
    icon: markRaw(Edit),
    handler: () => ElMessage.info('编辑设置功能开发中...')
  },
  {
    title: '清理缓存',
    type: 'danger' as const,
    icon: markRaw(Delete),
    handler: () => {
      ElMessageBox.confirm('确定要清理缓存吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage.success('缓存清理成功')
        })
        .catch(() => {
          ElMessage.info('已取消清理')
        })
    }
  }
])
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as vars;
@use '@/assets/styles/mixins.scss' as mixins;

.home-page {
  width: 100%;
  padding: vars.$spacing-lg;
}

.page-header {
  margin-bottom: vars.$spacing-xl;
  text-align: center;

  .page-title {
    font-size: vars.$font-size-xl * 1.8;
    font-weight: 600;
    color: vars.$text-primary;
    margin-bottom: vars.$spacing-sm;
  }

  .page-description {
    font-size: vars.$font-size-md;
    color: vars.$text-secondary;
    margin: 0;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: vars.$spacing-lg;
  margin-bottom: vars.$spacing-xl;

  .stat-card {
    @include mixins.transition();

    &:hover {
      transform: translateY(-2px);
      @include mixins.shadow(2);
    }

    :deep(.el-card__body) {
      padding: vars.$spacing-lg;
    }
  }
}

.stat-content {
  display: flex;
  align-items: center;
  gap: vars.$spacing-md;

  .stat-icon {
    width: 60px;
    height: 60px;
    border-radius: vars.$border-radius-lg;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
  }

  .stat-info {
    flex: 1;

    .stat-value {
      font-size: vars.$font-size-xl * 1.5;
      font-weight: 600;
      color: vars.$text-primary;
      line-height: 1;
      margin-bottom: vars.$spacing-xs;
    }

    .stat-title {
      font-size: vars.$font-size-sm;
      color: vars.$text-secondary;
    }
  }
}

.features-section {
  margin-bottom: vars.$spacing-xl;

  .feature-card {
    height: 100%;

    :deep(.el-card__header) {
      background-color: vars.$bg-color-page;
      font-weight: 600;
    }
  }
}

.tech-stack-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: vars.$spacing-md;

  .tech-item {
    display: flex;
    align-items: center;
    gap: vars.$spacing-xs;
    padding: vars.$spacing-sm;
    border-radius: vars.$border-radius-md;
    background-color: vars.$bg-color-page;
    @include mixins.transition();

    &:hover {
      background-color: color-mix(in srgb, vars.$primary-color 10%, transparent);
    }

    .tech-name {
      font-size: vars.$font-size-sm;
      color: vars.$text-regular;
      font-weight: 500;
    }
  }
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: vars.$spacing-md;

  .action-btn {
    height: 48px;
  }
}

.demo-section {
  :deep(.el-card__header) {
    background-color: vars.$bg-color-page;
    font-weight: 600;
  }

  :deep(.el-tabs__content) {
    padding: vars.$spacing-lg 0;
  }
}

/* 响应式设计 */
@include mixins.respond-to(xs) {
  .home-page {
    padding: vars.$spacing-md;
  }

  .page-header {
    .page-title {
      font-size: vars.$font-size-xl * 1.4;
    }
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: vars.$spacing-md;
  }

  .tech-stack-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: vars.$spacing-sm;
  }

  .quick-actions {
    grid-template-columns: 1fr;
  }
}
</style>
