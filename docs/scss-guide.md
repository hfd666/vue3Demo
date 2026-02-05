# SCSS 使用指南

本项目已集成 Sass/SCSS 预处理器，提供强大的样式编写功能，包括变量、混入、嵌套、函数等高级特性。

## 🎯 功能特性

- ✅ **全局变量**：颜色、间距、字体等设计系统变量
- ✅ **混入 (Mixins)**：可复用的样式片段
- ✅ **嵌套语法**：更清晰的样式结构
- ✅ **响应式混入**：简化媒体查询编写
- ✅ **现代 @use 语法**：避免弃用警告，更好的模块化
- ✅ **与 Tailwind CSS 兼容**：两者可以完美配合使用

## 📁 文件结构

```
src/assets/styles/
├── main.scss          # 主样式文件
├── variables.scss     # 全局变量定义
└── mixins.scss        # 混入定义
```

## 🎨 全局变量

### 颜色变量

```scss
// 主题色
$primary-color: #409eff;
$success-color: #67c23a;
$warning-color: #e6a23c;
$danger-color: #f56c6c;
$info-color: #909399;

// 文本颜色
$text-primary: #303133;
$text-regular: #606266;
$text-secondary: #909399;
$text-placeholder: #c0c4cc;

// 边框颜色
$border-base: #dcdfe6;
$border-light: #e4e7ed;
$border-lighter: #ebeef5;
$border-extra-light: #f2f6fc;
```

### 间距变量

```scss
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;
```

### 字体大小

```scss
$font-size-xs: 12px;
$font-size-sm: 14px;
$font-size-md: 16px;
$font-size-lg: 18px;
$font-size-xl: 20px;
```

### 其他变量

```scss
// 圆角
$border-radius-sm: 2px;
$border-radius-md: 4px;
$border-radius-lg: 6px;
$border-radius-xl: 8px;

// 阴影
$box-shadow-light:
  0 2px 4px rgba(0, 0, 0, 0.12),
  0 0 6px rgba(0, 0, 0, 0.04);
$box-shadow-base:
  0 2px 4px rgba(0, 0, 0, 0.12),
  0 0 6px rgba(0, 0, 0, 0.12);
$box-shadow-dark:
  0 2px 4px rgba(0, 0, 0, 0.12),
  0 0 6px rgba(0, 0, 0, 0.24);

// 断点
$breakpoint-xs: 480px;
$breakpoint-sm: 768px;
$breakpoint-md: 992px;
$breakpoint-lg: 1200px;
$breakpoint-xl: 1920px;
```

## 🔧 常用混入

### 布局混入

```scss
// 居中对齐
@include mixins.center-flex;

// 垂直居中
@include mixins.vertical-center;

// 水平居中
@include mixins.horizontal-center;

// 绝对定位居中
@include mixins.absolute-center;
```

### 文本处理

```scss
// 单行文本省略
@include mixins.ellipsis;

// 多行文本省略
@include mixins.ellipsis-multiline(3); // 3行后省略
```

### 响应式设计

```scss
// 响应式断点
@include mixins.respond-to(xs) {
  // 超小屏幕样式
}

@include mixins.respond-to(sm) {
  // 小屏幕样式
}

@include mixins.respond-to(md) {
  // 中等屏幕样式
}

@include mixins.respond-to(lg) {
  // 大屏幕样式
}

@include mixins.respond-to(xl) {
  // 超大屏幕样式
}
```

### 样式效果

```scss
// 过渡动画
@include mixins.transition(); // 默认 all 0.3s ease
@include mixins.transition(color, 0.2s, ease-in-out);

// 阴影效果
@include mixins.shadow(1); // 轻阴影
@include mixins.shadow(2); // 中等阴影
@include mixins.shadow(3); // 重阴影

// 卡片样式
@include mixins.card;

// 输入框基础样式
@include mixins.input-base;

// 按钮变体
@include mixins.button-variant(#fff, vars.$primary-color, vars.$primary-color);
```

## 📝 使用示例

### 在 Vue 组件中使用（现代 @use 语法）

```vue
<template>
  <div class="my-component">
    <h2 class="title">标题</h2>
    <p class="description">描述文本</p>
    <button class="action-btn">操作按钮</button>
  </div>
</template>

<style lang="scss" scoped>
// 使用现代的 @use 语法导入变量和混入
@use '@/assets/styles/variables.scss' as vars;
@use '@/assets/styles/mixins.scss' as mixins;

.my-component {
  padding: vars.$spacing-lg;
  background: vars.$bg-color;
  border-radius: vars.$border-radius-md;
  @include mixins.shadow(1);

  .title {
    color: vars.$primary-color;
    font-size: vars.$font-size-lg;
    margin-bottom: vars.$spacing-md;

    &:hover {
      // 使用现代的 color-mix 函数替代 darken
      color: color-mix(in srgb, vars.$primary-color 90%, black 10%);
    }
  }

  .description {
    color: vars.$text-regular;
    line-height: 1.6;
    @include mixins.ellipsis-multiline(2);
  }

  .action-btn {
    @include mixins.button-variant(#fff, vars.$primary-color, vars.$primary-color);
    margin-top: vars.$spacing-md;

    @include mixins.respond-to(xs) {
      width: 100%;
    }
  }
}
</style>
```

### 全局样式扩展

在 `src/assets/styles/main.scss` 中添加全局样式：

```scss
// 使用 @use 语法导入
@use './variables.scss' as vars;
@use './mixins.scss' as mixins;

// 自定义全局样式
.my-global-class {
  @include mixins.center-flex;
  padding: vars.$spacing-md;
  background: vars.$bg-color;

  @include mixins.respond-to(md) {
    padding: vars.$spacing-lg;
  }
}
```

## 🎯 最佳实践

### 1. 使用现代 @use 语法

```scss
// ✅ 推荐 - 现代 @use 语法
// 重要：@use 规则必须在所有其他规则之前
@use '@/assets/styles/variables.scss' as vars;
@use '@/assets/styles/mixins.scss' as mixins;

// 然后才能使用其他规则（如 @tailwind、样式规则等）
@tailwind base;
@tailwind components;
@tailwind utilities;

.component {
  color: vars.$primary-color;
  padding: vars.$spacing-md;
  @include mixins.transition();
}

// ❌ 不推荐 - 旧的 @import 语法（会产生弃用警告）
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

// ❌ 错误 - @use 规则不能在其他规则之后
@tailwind base;
@use '@/assets/styles/variables.scss' as vars; // 这会导致编译错误
```

### 2. 使用现代颜色函数

```scss
// ✅ 推荐 - 现代 color-mix 函数
.button {
  background-color: vars.$primary-color;

  &:hover {
    background-color: color-mix(in srgb, vars.$primary-color 90%, black 10%);
  }
}

// ❌ 不推荐 - 旧的 darken 函数（会产生弃用警告）
.button {
  background-color: vars.$primary-color;

  &:hover {
    background-color: darken(vars.$primary-color, 10%);
  }
}
```

### 3. 合理使用嵌套

```scss
// ✅ 推荐 - 适度嵌套
.card {
  padding: vars.$spacing-md;

  .title {
    font-size: vars.$font-size-lg;
  }

  .content {
    margin-top: vars.$spacing-sm;
  }
}

// ❌ 不推荐 - 过度嵌套
.card {
  .header {
    .title {
      .text {
        .span {
          color: red; // 嵌套太深
        }
      }
    }
  }
}
```

### 4. 使用混入提高复用性

```scss
// ✅ 推荐
.btn-primary {
  @include mixins.button-variant(#fff, vars.$primary-color, vars.$primary-color);
}

.btn-success {
  @include mixins.button-variant(#fff, vars.$success-color, vars.$success-color);
}

// ❌ 不推荐 - 重复代码
.btn-primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  // ... 重复的样式
}
```

### 5. 响应式设计

```scss
// ✅ 推荐
.component {
  padding: vars.$spacing-md;

  @include mixins.respond-to(xs) {
    padding: vars.$spacing-sm;
  }

  @include mixins.respond-to(lg) {
    padding: vars.$spacing-xl;
  }
}
```

## � 与 Tailwind CSS 配合使用

SCSS 和 Tailwind CSS 可以完美配合：

```vue
<template>
  <!-- 使用 Tailwind 类 -->
  <div class="flex items-center justify-center p-4">
    <!-- 使用自定义 SCSS 类 -->
    <div class="custom-card">
      <h3 class="text-lg font-semibold">标题</h3>
      <p class="text-gray-600">内容</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as vars;
@use '@/assets/styles/mixins.scss' as mixins;

.custom-card {
  @include mixins.card;
  @include mixins.transition();

  &:hover {
    @include mixins.shadow(2);
  }
}
</style>
```

## 🚀 高级功能

### 自定义函数

可以在 `mixins.scss` 中添加自定义函数：

```scss
// 计算相对单位
@function rem($px) {
  @return #{$px / 16}rem;
}

// 使用
.component {
  font-size: rem(18); // 输出 1.125rem
}
```

### 条件语句

```scss
@mixin button-size($size) {
  @if $size == small {
    padding: vars.$spacing-xs vars.$spacing-sm;
    font-size: vars.$font-size-xs;
  } @else if $size == large {
    padding: vars.$spacing-md vars.$spacing-lg;
    font-size: vars.$font-size-lg;
  } @else {
    padding: vars.$spacing-sm vars.$spacing-md;
    font-size: vars.$font-size-sm;
  }
}
```

### 循环生成样式

```scss
// 生成间距工具类
@for $i from 1 through 5 {
  .m-#{$i} {
    margin: #{$i * 4}px;
  }

  .p-#{$i} {
    padding: #{$i * 4}px;
  }
}
```

## 📚 参考资源

- [Sass 官方文档](https://sass-lang.com/)
- [SCSS 语法指南](https://sass-lang.com/guide)
- [Sass 函数参考](https://sass-lang.com/documentation/modules)
- [CSS 架构最佳实践](https://sass-guidelin.es/)
- [现代 Sass 模块系统](https://sass-lang.com/documentation/at-rules/use)

## 🔧 配置说明

项目中的 SCSS 配置位于 `vite.config.ts`：

```typescript
css: {
  preprocessorOptions: {
    scss: {
      // 移除全局导入以避免 @import 弃用警告
      // 现在使用现代的 @use 语法在每个文件中按需导入
      // additionalData: `@import "@/assets/styles/variables.scss"; @import "@/assets/styles/mixins.scss";`

      // 配置 Sass API 选项以避免 legacy-js-api 警告
      api: 'modern-compiler' // 使用现代编译器 API
    }
  }
}
```

### 关于 Sass API 配置

- `api: 'modern-compiler'`：使用现代的 Sass 编译器 API，避免 `legacy-js-api` 弃用警告
- 这个配置告诉 Vite 使用新的 Sass JavaScript API，而不是即将被弃用的旧 API
- 这样可以确保项目与未来的 Dart Sass 2.0.0 版本兼容

## ⚠️ 重要变更说明

### SCSS @use 规则重要提醒

**关键规则**：`@use` 规则必须在文件的最开始，在所有其他规则（包括 `@tailwind`、样式规则等）之前。

```scss
// ✅ 正确的顺序
@use '@/assets/styles/variables.scss' as vars;
@use '@/assets/styles/mixins.scss' as mixins;

@tailwind base;
@tailwind components;
@tailwind utilities;

.my-class {
  color: vars.$primary-color;
}

// ❌ 错误的顺序 - 会导致编译错误
@tailwind base;
@use '@/assets/styles/variables.scss' as vars; // 错误：@use 必须在最前面
```

### 从旧版本升级

如果你从使用全局 `@import` 的旧版本升级，需要注意以下变更：

1. **移除全局导入**：不再通过 Vite 配置全局导入变量和混入
2. **使用 @use 语法**：在每个需要的文件中使用 `@use` 导入
3. **命名空间**：变量和混入现在需要使用命名空间前缀
4. **现代颜色函数**：使用 `color-mix()` 替代 `darken()` 等旧函数

### 迁移示例

```scss
// 旧版本写法
.component {
  color: $primary-color; // 直接使用变量
  @include transition(); // 直接使用混入

  &:hover {
    color: darken($primary-color, 10%); // 使用 darken 函数
  }
}

// 新版本写法
@use '@/assets/styles/variables.scss' as vars;
@use '@/assets/styles/mixins.scss' as mixins;

.component {
  color: vars.$primary-color; // 使用命名空间
  @include mixins.transition(); // 使用命名空间

  &:hover {
    color: color-mix(in srgb, vars.$primary-color 90%, black 10%); // 现代颜色函数
  }
}
```

这些变更确保了：

- ✅ 消除所有 SCSS 弃用警告
- ✅ 使用现代 Sass 语法
- ✅ 更好的模块化和命名空间管理
- ✅ 更清晰的依赖关系

## 🔧 故障排除

### 常见警告和解决方案

#### 1. `@use rules must be written before any other rules`

**问题**：`@use` 规则必须在文件的最开始

```scss
// ❌ 错误
@tailwind base;
@use './variables.scss' as vars;

// ✅ 正确
@use './variables.scss' as vars;
@tailwind base;
```

#### 2. `legacy-js-api` 弃用警告

**问题**：Vite 使用旧版 Sass JavaScript API
**解决方案**：在 `vite.config.ts` 中配置现代 API：

```typescript
css: {
  preprocessorOptions: {
    scss: {
      api: 'modern-compiler'
    }
  }
}
```

#### 3. `@import` 弃用警告

**问题**：使用了旧的 `@import` 语法
**解决方案**：改用现代的 `@use` 语法：

```scss
// ❌ 旧语法
@import './variables.scss';

// ✅ 新语法
@use './variables.scss' as vars;
```

#### 4. `darken()` 函数弃用警告

**问题**：使用了即将弃用的颜色函数
**解决方案**：使用现代的 `color-mix()` 函数：

```scss
// ❌ 旧函数
color: darken($primary-color, 10%);

// ✅ 新函数
color: color-mix(in srgb, $primary-color 90%, black 10%);
```

### 性能优化建议

1. **按需导入**：只在需要的文件中导入变量和混入
2. **避免深层嵌套**：保持 SCSS 嵌套层级在 3 层以内
3. **合理使用混入**：对于复用性高的样式使用混入，简单样式直接编写
4. **优化构建**：使用 `api: 'modern-compiler'` 提升编译性能
