<template>
  <div class="dashboard-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">数据仪表盘</h1>
      <p class="page-description">实时监控系统运行状态和关键指标</p>
    </div>

    <!-- 数据概览卡片 -->
    <div class="overview-cards">
      <el-card v-for="card in overviewData" :key="card.title" class="overview-card" shadow="hover">
        <div class="card-content">
          <div class="card-icon" :style="{ backgroundColor: card.color }">
            <el-icon :size="28">
              <component :is="card.icon" />
            </el-icon>
          </div>
          <div class="card-info">
            <div class="card-value">{{ card.value }}</div>
            <div class="card-title">{{ card.title }}</div>
            <div class="card-trend" :class="card.trend">
              <el-icon :size="12">
                <component :is="card.trend === 'up' ? ArrowUp : ArrowDown" />
              </el-icon>
              {{ card.changePercent }}%
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 图表区域 -->
    <el-row :gutter="24" class="charts-section">
      <el-col :xs="24" :lg="16">
        <el-card header="访问趋势" class="chart-card">
          <div class="chart-placeholder">
            <el-icon :size="48" color="#ddd">
              <TrendCharts />
            </el-icon>
            <p>图表组件占位符</p>
            <p class="chart-note">可以集成 ECharts 或其他图表库</p>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :lg="8">
        <el-card header="系统状态" class="chart-card">
          <div class="status-list">
            <div v-for="status in systemStatus" :key="status.name" class="status-item">
              <div class="status-indicator" :class="status.status"></div>
              <div class="status-info">
                <div class="status-name">{{ status.name }}</div>
                <div class="status-value">{{ status.value }}</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 数据表格 -->
    <div class="table-section">
      <el-card header="最近活动">
        <el-table :data="recentActivities" stripe>
          <el-table-column prop="time" label="时间" width="180" />
          <el-table-column prop="user" label="用户" width="120" />
          <el-table-column prop="action" label="操作" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="getStatusType(row.status)">
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  User,
  Document,
  Monitor,
  Warning,
  ArrowUp,
  ArrowDown,
  TrendCharts
} from '@element-plus/icons-vue'

/**
 * 概览数据
 */
const overviewData = ref([
  {
    title: '今日访问',
    value: '2,345',
    icon: User,
    color: '#409eff',
    trend: 'up' as const,
    changePercent: 12.5
  },
  {
    title: '新增用户',
    value: '156',
    icon: Document,
    color: '#67c23a',
    trend: 'up' as const,
    changePercent: 8.2
  },
  {
    title: '系统负载',
    value: '68%',
    icon: Monitor,
    color: '#e6a23c',
    trend: 'down' as const,
    changePercent: 3.1
  },
  {
    title: '错误数量',
    value: '12',
    icon: Warning,
    color: '#f56c6c',
    trend: 'down' as const,
    changePercent: 15.6
  }
])

/**
 * 系统状态
 */
const systemStatus = ref([
  {
    name: 'Web 服务器',
    value: '运行正常',
    status: 'online'
  },
  {
    name: '数据库',
    value: '运行正常',
    status: 'online'
  },
  {
    name: 'Redis 缓存',
    value: '运行正常',
    status: 'online'
  },
  {
    name: '消息队列',
    value: '连接异常',
    status: 'warning'
  },
  {
    name: '文件存储',
    value: '运行正常',
    status: 'online'
  }
])

/**
 * 最近活动
 */
const recentActivities = ref([
  {
    time: '2024-01-29 14:30:25',
    user: '张三',
    action: '登录系统',
    status: '成功'
  },
  {
    time: '2024-01-29 14:28:15',
    user: '李四',
    action: '修改用户信息',
    status: '成功'
  },
  {
    time: '2024-01-29 14:25:10',
    user: '王五',
    action: '上传文件',
    status: '失败'
  },
  {
    time: '2024-01-29 14:22:05',
    user: '赵六',
    action: '删除数据',
    status: '成功'
  },
  {
    time: '2024-01-29 14:20:00',
    user: '钱七',
    action: '导出报表',
    status: '成功'
  }
])

/**
 * 获取状态标签类型
 */
const getStatusType = (status: string) => {
  switch (status) {
    case '成功':
      return 'success'
    case '失败':
      return 'danger'
    case '警告':
      return 'warning'
    default:
      return 'info'
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as vars;
@use '@/assets/styles/mixins.scss' as mixins;

.dashboard-page {
  padding: vars.$spacing-lg;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: vars.$spacing-xl;

  .page-title {
    font-size: vars.$font-size-xl * 1.6;
    font-weight: 600;
    color: vars.$text-primary;
    margin-bottom: vars.$spacing-xs;
  }

  .page-description {
    font-size: vars.$font-size-md;
    color: vars.$text-secondary;
    margin: 0;
  }
}

.overview-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: vars.$spacing-lg;
  margin-bottom: vars.$spacing-xl;

  .overview-card {
    @include mixins.transition();

    &:hover {
      transform: translateY(-4px);
      @include mixins.shadow(2);
    }

    :deep(.el-card__body) {
      padding: vars.$spacing-lg;
    }
  }
}

.card-content {
  display: flex;
  align-items: center;
  gap: vars.$spacing-md;

  .card-icon {
    width: 70px;
    height: 70px;
    border-radius: vars.$border-radius-lg;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
  }

  .card-info {
    flex: 1;

    .card-value {
      font-size: vars.$font-size-xl * 1.8;
      font-weight: 700;
      color: vars.$text-primary;
      line-height: 1;
      margin-bottom: vars.$spacing-xs;
    }

    .card-title {
      font-size: vars.$font-size-md;
      color: vars.$text-secondary;
      margin-bottom: vars.$spacing-xs;
    }

    .card-trend {
      display: flex;
      align-items: center;
      gap: vars.$spacing-xs;
      font-size: vars.$font-size-sm;
      font-weight: 500;

      &.up {
        color: vars.$success-color;
      }

      &.down {
        color: vars.$danger-color;
      }
    }
  }
}

.charts-section {
  margin-bottom: vars.$spacing-xl;

  .chart-card {
    height: 400px;

    :deep(.el-card__header) {
      background-color: vars.$bg-color-page;
      font-weight: 600;
    }

    :deep(.el-card__body) {
      height: calc(100% - 60px);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.chart-placeholder {
  text-align: center;
  color: vars.$text-secondary;

  p {
    margin: vars.$spacing-sm 0;
    font-size: vars.$font-size-md;
  }

  .chart-note {
    font-size: vars.$font-size-sm;
    color: vars.$text-placeholder;
  }
}

.status-list {
  .status-item {
    display: flex;
    align-items: center;
    gap: vars.$spacing-md;
    padding: vars.$spacing-md 0;
    border-bottom: 1px solid vars.$border-lighter;

    &:last-child {
      border-bottom: none;
    }

    .status-indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      flex-shrink: 0;

      &.online {
        background-color: vars.$success-color;
      }

      &.warning {
        background-color: vars.$warning-color;
      }

      &.offline {
        background-color: vars.$danger-color;
      }
    }

    .status-info {
      flex: 1;

      .status-name {
        font-size: vars.$font-size-sm;
        color: vars.$text-primary;
        font-weight: 500;
        margin-bottom: vars.$spacing-xs;
      }

      .status-value {
        font-size: vars.$font-size-xs;
        color: vars.$text-secondary;
      }
    }
  }
}

.table-section {
  :deep(.el-card__header) {
    background-color: vars.$bg-color-page;
    font-weight: 600;
  }
}

/* 响应式设计 */
@include mixins.respond-to(xs) {
  .dashboard-page {
    padding: vars.$spacing-md;
  }

  .overview-cards {
    grid-template-columns: 1fr;
    gap: vars.$spacing-md;
  }

  .charts-section {
    :deep(.el-col) {
      margin-bottom: vars.$spacing-lg;
    }
  }
}
</style>
