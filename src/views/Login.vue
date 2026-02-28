<template>
  <div class="login-container">
    <div class="login-box">
      <!-- Logo 和标题 -->
      <div class="login-header">
        <el-icon :size="48" color="#409eff">
          <Grid />
        </el-icon>
        <h1 class="login-title">{{ appTitle }}</h1>
        <p class="login-subtitle">欢迎登录管理系统</p>
      </div>

      <!-- 登录表单 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        @keyup.enter="handleLogin"
      >
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" size="large" clearable>
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            show-password
            clearable
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="captcha">
          <div class="captcha-wrapper">
            <el-input
              v-model="loginForm.captcha"
              placeholder="请输入验证码"
              size="large"
              clearable
              maxlength="5"
            >
              <template #prefix>
                <el-icon><Picture /></el-icon>
              </template>
            </el-input>
            <div class="captcha-image" @click="refreshCaptcha">
              <el-image
                v-if="captchaImage"
                :src="captchaImage"
                fit="contain"
                style="width: 100%; height: 100%; cursor: pointer"
              >
                <template #error>
                  <div class="image-error">
                    <el-icon><Picture /></el-icon>
                    <span>加载失败</span>
                  </div>
                </template>
              </el-image>
              <div v-else class="captcha-loading">
                <el-icon class="is-loading"><Loading /></el-icon>
              </div>
            </div>
          </div>
        </el-form-item>

        <el-form-item>
          <div class="login-options">
            <el-checkbox v-model="loginForm.remember">记住密码</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="large"
            :loading="loading"
            class="login-button"
            @click="handleLogin"
          >
            {{ loading ? '登录中...' : '登录' }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 背景装饰 -->
    <div class="login-bg">
      <div class="bg-circle circle-1"></div>
      <div class="bg-circle circle-2"></div>
      <div class="bg-circle circle-3"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Grid, User, Lock, Picture, Loading } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus/es/components/form'
import { useUserStore } from '@/stores/user'
import { getCaptcha } from '@/api'

const router = useRouter()
const userStore = useUserStore()

// 应用标题
const appTitle = computed(() => {
  return import.meta.env.VITE_APP_TITLE || 'Vue3 Admin'
})

// 表单引用
const loginFormRef = ref<FormInstance>()

// 验证码相关
const captchaImage = ref('')
const captchaKey = ref('')

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: '',
  captcha: '',
  remember: true
})

// 加载状态
const loading = ref(false)

// 表单验证规则
const loginRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 5, message: '验证码长度为 5 个字符', trigger: 'blur' }
  ]
}

// 获取验证码
const refreshCaptcha = async () => {
  try {
    const res = await getCaptcha()
    captchaImage.value = res.image
    captchaKey.value = res.key
  } catch (error) {
    console.error('获取验证码失败:', error)
    ElMessage.error('获取验证码失败，请重试')
  }
}

// 处理登录
const handleLogin = async () => {
  if (!loginFormRef.value) return

  try {
    // 验证表单
    await loginFormRef.value.validate()

    loading.value = true

    // 使用 userStore.login() 方法登录
    const result = await userStore.login({
      userName: loginForm.username,
      password: loginForm.password,
      authKey: captchaKey.value,
      authCode: loginForm.captcha
    })

    if (result.success) {
      ElMessage.success('登录成功')

      // 获取重定向路径
      const redirect = (router.currentRoute.value.query.redirect as string) || '/'

      // 跳转到目标页面
      await router.push(redirect)
    } else {
      ElMessage.error(result.error || '登录失败')
      // 登录失败后刷新验证码
      refreshCaptcha()
      // 清空验证码输入
      loginForm.captcha = ''
    }
  } catch (error: any) {
    console.error('登录失败:', error)
    ElMessage.error(error.message || '登录失败，请重试')
    // 登录失败后刷新验证码
    refreshCaptcha()
    // 清空验证码输入
    loginForm.captcha = ''
  } finally {
    loading.value = false
  }
}

// 页面加载时获取验证码
onMounted(() => {
  refreshCaptcha()
})
</script>

<style scoped lang="scss">
.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
}

.login-box {
  position: relative;
  z-index: 1;
  width: 420px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;

  .el-icon {
    margin-bottom: 16px;
  }

  .login-title {
    font-size: 28px;
    font-weight: 600;
    color: #303133;
    margin: 0 0 8px 0;
  }

  .login-subtitle {
    font-size: 14px;
    color: #909399;
    margin: 0;
  }
}

.login-form {
  .el-form-item {
    margin-bottom: 24px;
  }

  .captcha-wrapper {
    display: flex;
    gap: 12px;
    width: 100%;

    .el-input {
      flex: 1;
    }

    .captcha-image {
      width: 120px;
      height: 40px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        border-color: #409eff;
        box-shadow: 0 0 8px rgba(64, 158, 255, 0.2);
      }

      .captcha-loading {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f5f7fa;

        .el-icon {
          font-size: 20px;
          color: #909399;
        }
      }

      .image-error {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #f5f7fa;
        color: #909399;
        font-size: 12px;

        .el-icon {
          font-size: 16px;
          margin-bottom: 4px;
        }
      }
    }
  }

  .login-options {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .login-button {
    width: 100%;
    height: 44px;
    font-size: 16px;
    font-weight: 500;
  }
}

// 背景装饰
.login-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;

  .bg-circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    animation: float 20s infinite ease-in-out;

    &.circle-1 {
      width: 300px;
      height: 300px;
      top: -100px;
      left: -100px;
      animation-delay: 0s;
    }

    &.circle-2 {
      width: 200px;
      height: 200px;
      bottom: -50px;
      right: -50px;
      animation-delay: 5s;
    }

    &.circle-3 {
      width: 150px;
      height: 150px;
      top: 50%;
      right: 10%;
      animation-delay: 10s;
    }
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .login-box {
    width: 90%;
    padding: 32px 24px;
  }

  .login-header {
    .login-title {
      font-size: 24px;
    }
  }
}
</style>
