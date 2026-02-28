# 登录页面使用说明

## 页面路由

- 路径：`/login`
- 访问：http://localhost:3000/login

## 功能特性

### 1. 登录表单

- 用户名输入（3-20个字符）
- 密码输入（6-20个字符，支持显示/隐藏）
- 记住密码选项
- 回车键快速登录

### 2. 表单验证

- 必填项验证
- 长度验证
- 实时错误提示

### 3. 测试账号

**默认账号：**

- 用户名：`admin`
- 密码：`123456`

### 4. 其他功能

- 忘记密码（占位）
- 第三方登录（微信、QQ、GitHub - 占位）
- 美观的渐变背景和动画效果

## 登录流程

1. 访问登录页面
2. 输入用户名和密码
3. 点击"登录"按钮或按回车键
4. 验证通过后自动跳转到首页
5. 登录状态会保存在 localStorage 中

## 路由守卫

### 登录检查

- 访问需要认证的页面时，会自动检查登录状态
- 未登录会重定向到登录页
- 登录成功后会跳转到原目标页面

### 已登录检查

- 已登录用户访问登录页会自动重定向到首页

## 退出登录

在顶部导航栏的用户下拉菜单中点击"退出登录"：

1. 弹出确认对话框
2. 确认后清除登录状态
3. 自动跳转到登录页

## 技术实现

### 状态管理

使用 Pinia store (`src/stores/user.ts`) 管理：

- 用户信息
- 登录状态
- Token
- 权限和角色

### 路由守卫

在 `src/router/index.ts` 中实现：

- `beforeEach` 守卫检查登录状态
- 保存重定向路径
- 自动跳转逻辑

### Token 存储

- 存储位置：`localStorage`
- Key：`auth_token`
- 登录时保存，退出时清除

## 样式特点

- 渐变背景（紫色系）
- 毛玻璃效果卡片
- 浮动动画装饰
- 响应式设计（移动端适配）
- 平滑过渡动画

## 自定义配置

### 修改默认账号

编辑 `src/views/Login.vue`：

```typescript
const loginForm = reactive({
  username: 'admin', // 修改默认用户名
  password: '123456', // 修改默认密码
  remember: false
})
```

### 对接真实 API

替换登录逻辑中的模拟请求：

```typescript
// 当前是模拟登录
await new Promise(resolve => setTimeout(resolve, 1000))

// 替换为真实 API 调用
const response = await loginApi(loginForm)
```

### 修改背景颜色

编辑 `src/views/Login.vue` 的样式：

```scss
.login-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  // 修改为你喜欢的渐变色
}
```

## 注意事项

1. **安全性**：当前是演示版本，实际项目中需要：
   - 使用 HTTPS
   - 密码加密传输
   - Token 过期处理
   - 刷新 Token 机制

2. **验证码**：生产环境建议添加验证码功能

3. **错误处理**：根据实际 API 返回的错误码进行处理

4. **记住密码**：当前仅为 UI，需要实现实际的密码保存逻辑

## 相关文件

- 登录页面：`src/views/Login.vue`
- 用户 Store：`src/stores/user.ts`
- 路由配置：`src/router/index.ts`
- 布局头部：`src/layouts/components/LayoutHeader.vue`
