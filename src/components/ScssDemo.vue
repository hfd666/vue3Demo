<template>
  <div class="scss-demo">
    <div class="demo-header">
      <h2 class="demo-title">SCSS 功能演示</h2>
      <p class="demo-subtitle">展示 SCSS 变量、混入和嵌套功能</p>
    </div>

    <div class="demo-content">
      <div class="demo-section">
        <h3>颜色变量演示</h3>
        <div class="color-palette">
          <div class="color-item primary">Primary</div>
          <div class="color-item success">Success</div>
          <div class="color-item warning">Warning</div>
          <div class="color-item danger">Danger</div>
          <div class="color-item info">Info</div>
        </div>
      </div>

      <div class="demo-section">
        <h3>按钮样式演示</h3>
        <div class="button-group">
          <button class="demo-btn primary">Primary Button</button>
          <button class="demo-btn success">Success Button</button>
          <button class="demo-btn warning">Warning Button</button>
          <button class="demo-btn danger">Danger Button</button>
        </div>
      </div>

      <div class="demo-section">
        <h3>卡片和混入演示</h3>
        <div class="demo-cards">
          <div class="demo-card">
            <h4>卡片标题 1</h4>
            <p class="ellipsis-text">
              这是一段很长的文本，用来演示文本省略功能，当文本超出容器宽度时会显示省略号
            </p>
          </div>
          <div class="demo-card">
            <h4>卡片标题 2</h4>
            <p class="multiline-ellipsis">
              这是一段很长的多行文本，用来演示多行文本省略功能。当文本超出指定行数时，会在最后一行显示省略号。这个功能在移动端和卡片布局中非常有用。
            </p>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h3>响应式演示</h3>
        <div class="responsive-demo">
          <div class="responsive-item">在不同屏幕尺寸下我会有不同的样式</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这个组件主要用于演示 SCSS 功能，不需要复杂的逻辑
</script>

<style lang="scss" scoped>
// 使用现代的 @use 语法导入 SCSS 变量和混入
@use '@/assets/styles/variables.scss' as vars;
@use '@/assets/styles/mixins.scss' as mixins;

.scss-demo {
  padding: vars.$spacing-lg;
  max-width: 1200px;
  margin: 0 auto;

  .demo-header {
    text-align: center;
    margin-bottom: vars.$spacing-xl;

    .demo-title {
      color: vars.$primary-color;
      font-size: vars.$font-size-xl * 1.5;
      margin-bottom: vars.$spacing-sm;
      font-weight: 600;
    }

    .demo-subtitle {
      color: vars.$text-secondary;
      font-size: vars.$font-size-md;
      margin: 0;
    }
  }

  .demo-content {
    .demo-section {
      margin-bottom: vars.$spacing-xl;

      h3 {
        color: vars.$text-primary;
        font-size: vars.$font-size-lg;
        margin-bottom: vars.$spacing-md;
        border-bottom: 2px solid vars.$border-light;
        padding-bottom: vars.$spacing-sm;
      }
    }
  }

  // 颜色调色板
  .color-palette {
    display: flex;
    gap: vars.$spacing-md;
    flex-wrap: wrap;

    .color-item {
      padding: vars.$spacing-md vars.$spacing-lg;
      border-radius: vars.$border-radius-md;
      color: white;
      font-weight: 500;
      text-align: center;
      min-width: 120px;
      @include mixins.transition();

      &:hover {
        transform: translateY(-2px);
        @include mixins.shadow(2);
      }

      &.primary {
        background-color: vars.$primary-color;
      }
      &.success {
        background-color: vars.$success-color;
      }
      &.warning {
        background-color: vars.$warning-color;
      }
      &.danger {
        background-color: vars.$danger-color;
      }
      &.info {
        background-color: vars.$info-color;
      }
    }
  }

  // 按钮组
  .button-group {
    display: flex;
    gap: vars.$spacing-md;
    flex-wrap: wrap;

    .demo-btn {
      padding: vars.$spacing-sm vars.$spacing-lg;
      border: none;
      border-radius: vars.$border-radius-md;
      font-size: vars.$font-size-sm;
      font-weight: 500;
      cursor: pointer;
      @include mixins.transition();

      &:hover {
        transform: translateY(-1px);
        @include mixins.shadow(1);
      }

      &.primary {
        background-color: vars.$primary-color;
        color: white;
        &:hover {
          // 使用现代的 color-mix 函数替代 darken
          background-color: color-mix(in srgb, vars.$primary-color 90%, black 10%);
        }
      }

      &.success {
        background-color: vars.$success-color;
        color: white;
        &:hover {
          background-color: color-mix(in srgb, vars.$success-color 90%, black 10%);
        }
      }

      &.warning {
        background-color: vars.$warning-color;
        color: white;
        &:hover {
          background-color: color-mix(in srgb, vars.$warning-color 90%, black 10%);
        }
      }

      &.danger {
        background-color: vars.$danger-color;
        color: white;
        &:hover {
          background-color: color-mix(in srgb, vars.$danger-color 90%, black 10%);
        }
      }
    }
  }

  // 卡片演示
  .demo-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: vars.$spacing-lg;

    .demo-card {
      @include mixins.card;
      @include mixins.transition();

      &:hover {
        @include mixins.shadow(2);
        transform: translateY(-2px);
      }

      h4 {
        color: vars.$primary-color;
        margin: 0 0 vars.$spacing-md 0;
        font-size: vars.$font-size-md;
      }

      .ellipsis-text {
        @include mixins.ellipsis;
        color: vars.$text-regular;
        margin: 0;
      }

      .multiline-ellipsis {
        @include mixins.ellipsis-multiline(3);
        color: vars.$text-regular;
        margin: 0;
        line-height: 1.5;
      }
    }
  }

  // 响应式演示
  .responsive-demo {
    .responsive-item {
      padding: vars.$spacing-lg;
      background-color: vars.$primary-color;
      color: white;
      text-align: center;
      border-radius: vars.$border-radius-md;
      font-weight: 500;

      // 响应式样式
      @include mixins.respond-to(xs) {
        background-color: vars.$danger-color;
        &::after {
          content: ' (超小屏幕)';
        }
      }

      @include mixins.respond-to(sm) {
        background-color: vars.$warning-color;
        &::after {
          content: ' (小屏幕)';
        }
      }

      @include mixins.respond-to(md) {
        background-color: vars.$info-color;
        &::after {
          content: ' (中等屏幕)';
        }
      }

      @include mixins.respond-to(lg) {
        background-color: vars.$success-color;
        &::after {
          content: ' (大屏幕)';
        }
      }

      @include mixins.respond-to(xl) {
        background-color: vars.$primary-color;
        &::after {
          content: ' (超大屏幕)';
        }
      }
    }
  }
}
</style>
