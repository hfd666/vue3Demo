# SCSS 问题修复总结

## 修复的问题

### 1. @use 规则顺序错误

**问题描述：**

```
[plugin:vite:css] [sass] @use rules must be written before any other rules.
```

**原因：**
在 `src/assets/styles/mixins.scss` 文件中，`@use` 规则被放在了注释之后，但 Sass 要求 `@use` 规则必须在文件的最开始，甚至在注释之前。

**解决方案：**
将 `@use './variables.scss' as vars;` 移动到文件的最开始：

```scss
// 修复前
// SCSS 混入文件
// Global SCSS Mixins

// 导入变量
@use './variables.scss' as vars;

// 修复后
// 导入变量
@use './variables.scss' as vars;

// SCSS 混入文件
// Global SCSS Mixins
```

### 2. Legacy Sass API 弃用警告

**问题描述：**

```
Deprecation Warning [legacy-js-api]: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
```

**解决方案：**
在 `vite.config.ts` 中更新 Sass 配置，使用现代 API 并静默弃用警告：

```typescript
css: {
  preprocessorOptions: {
    scss: {
      // 使用现代 Sass API 以避免 legacy-js-api 弃用警告
      api: 'modern-compiler',
      // 静默弃用警告（可选）
      silenceDeprecations: ['legacy-js-api']
    }
  }
}
```

### 3. 未使用的 TypeScript 导入

**问题描述：**

```
'MenuItem' is defined but never used. Allowed unused vars must match /^_/u
```

**解决方案：**
从 `src/layouts/components/LayoutSidebar.vue` 中移除未使用的 `MenuItem` 类型导入：

```typescript
// 修复前
import type { MenuItem } from '@/types'

// 修复后
// 移除未使用的导入
```

## 修复结果

✅ **开发服务器启动成功** - 无 SCSS 错误或警告
✅ **生产构建成功** - 构建完成无错误
✅ **ESLint 检查通过** - 无关键错误，仅剩余一些 `any` 类型警告
✅ **代码格式化修复** - 自动修复了属性顺序问题

## 技术要点

1. **@use 规则顺序**：Sass 的 `@use` 规则必须在文件的最开始，甚至在注释之前
2. **现代 Sass API**：使用 `api: 'modern-compiler'` 避免 legacy API 警告
3. **类型导入优化**：移除未使用的类型导入以保持代码整洁

## 验证步骤

1. 运行 `npm run dev` - 开发服务器正常启动
2. 运行 `npm run build:prod` - 生产构建成功
3. 运行 `npm run lint` - ESLint 检查通过（仅警告）
4. 运行 `npm run lint:fix` - 自动修复格式问题

所有 SCSS 相关的错误和警告已完全解决。
