<template>
  <footer class="layout-footer">
    <div class="footer-content">
      <div class="footer-left">
        <p class="copyright">
          © {{ currentYear }} {{ appTitle }}. Built with Vue 3 + TypeScript + Vite
        </p>
      </div>

      <div class="footer-right">
        <el-link href="https://github.com" target="_blank" type="primary"> GitHub </el-link>
        <el-divider direction="vertical" />
        <el-link href="https://vuejs.org" target="_blank" type="primary"> Vue.js </el-link>
        <el-divider direction="vertical" />
        <el-link href="https://element-plus.org" target="_blank" type="primary">
          Element Plus
        </el-link>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
/**
 * 应用标题
 */
const appTitle = computed(() => {
  return import.meta.env.VITE_APP_TITLE || 'Vue3 Admin'
})

/**
 * 当前年份
 */
const currentYear = computed(() => {
  return new Date().getFullYear()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as vars;
@use '@/assets/styles/mixins.scss' as mixins;

.layout-footer {
  background: #fff;
  border-top: 1px solid vars.$border-light;
  margin-top: auto;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: vars.$spacing-md vars.$spacing-lg;
  max-width: 100%;
}

.footer-left {
  .copyright {
    margin: 0;
    font-size: vars.$font-size-xs;
    color: vars.$text-secondary;
  }
}

.footer-right {
  display: flex;
  align-items: center;
  gap: vars.$spacing-xs;

  :deep(.el-link) {
    font-size: vars.$font-size-xs;
  }
}

/* 响应式设计 */
@include mixins.respond-to(xs) {
  .footer-content {
    flex-direction: column;
    gap: vars.$spacing-sm;
    text-align: center;
  }

  .footer-right {
    justify-content: center;
  }
}
</style>
