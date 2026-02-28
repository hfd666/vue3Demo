<template>
  <div class="dialog-demo p-6">
    <el-card>
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-lg font-semibold">ProDialog 弹窗组件示例</span>
          <el-tag type="success">推荐使用</el-tag>
        </div>
      </template>

      <div class="space-y-6">
        <!-- 基础示例 -->
        <div>
          <h3 class="text-base font-semibold mb-3">基础用法</h3>
          <div class="flex flex-wrap gap-3">
            <el-button type="primary" @click="dialog1.visible = true"> 标准表单弹窗 </el-button>
            <el-button @click="dialog2.visible = true"> 只读弹窗（无底部） </el-button>
            <el-button type="success" @click="dialog3.visible = true"> 确认提示弹窗 </el-button>
          </div>
        </div>

        <!-- 高级示例 -->
        <div>
          <h3 class="text-base font-semibold mb-3">高级用法</h3>
          <div class="flex flex-wrap gap-3">
            <el-button type="warning" @click="dialog4.visible = true"> 自定义底部 </el-button>
            <el-button type="info" @click="dialog5.visible = true"> 全屏弹窗 </el-button>
            <el-button @click="dialog6.visible = true"> 大尺寸弹窗 </el-button>
          </div>
        </div>

        <!-- 表单示例 -->
        <div>
          <h3 class="text-base font-semibold mb-3">表单场景</h3>
          <div class="flex flex-wrap gap-3">
            <el-button type="primary" @click="handleAddUser"> 新增用户 </el-button>
            <el-button type="success" @click="handleEditUser"> 编辑用户 </el-button>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 功能说明 -->
    <el-card class="mt-6">
      <template #header>
        <span class="text-lg font-semibold">功能说明</span>
      </template>
      <div class="space-y-4">
        <div>
          <h4 class="font-semibold mb-2">核心特性：</h4>
          <ul class="list-disc list-inside space-y-1 text-gray-600">
            <li>统一样式：标准化的弹窗外观</li>
            <li>简化 API：只保留最常用的配置项</li>
            <li>Loading 支持：确认按钮自动 loading 状态</li>
            <li>灵活底部：支持隐藏底部或自定义底部内容</li>
            <li>自动关闭：点击取消或遮罩自动关闭</li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-2">使用方式：</h4>
          <el-alert type="info" :closable="false">
            <pre class="text-sm">{{ usageCode }}</pre>
          </el-alert>
        </div>
      </div>
    </el-card>

    <!-- 弹窗实例 -->
    <!-- 1. 标准表单弹窗 -->
    <ProDialog
      v-model="dialog1.visible"
      title="编辑用户"
      :loading="dialog1.loading"
      @confirm="handleDialog1Confirm"
    >
      <el-form :model="dialog1.form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="dialog1.form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="dialog1.form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="dialog1.form.phone" placeholder="请输入手机号" />
        </el-form-item>
      </el-form>
    </ProDialog>

    <!-- 2. 只读弹窗 -->
    <ProDialog v-model="dialog2.visible" title="用户详情" :show-footer="false">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="用户名">张三</el-descriptions-item>
        <el-descriptions-item label="邮箱">zhangsan@example.com</el-descriptions-item>
        <el-descriptions-item label="手机号">13800138000</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag type="success">启用</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间" :span="2">
          2024-01-01 10:00:00
        </el-descriptions-item>
      </el-descriptions>
    </ProDialog>

    <!-- 3. 确认提示弹窗 -->
    <ProDialog
      v-model="dialog3.visible"
      title="提示"
      width="400px"
      confirm-text="确认删除"
      @confirm="handleDialog3Confirm"
    >
      <div class="flex items-center">
        <el-icon class="text-warning text-2xl mr-3"><WarningFilled /></el-icon>
        <span>确定要删除这条数据吗？此操作不可恢复。</span>
      </div>
    </ProDialog>

    <!-- 4. 自定义底部 -->
    <ProDialog v-model="dialog4.visible" title="分步表单">
      <el-steps :active="dialog4.step" align-center class="mb-6">
        <el-step title="基本信息" />
        <el-step title="详细信息" />
        <el-step title="完成" />
      </el-steps>
      <div class="text-center py-8">
        <p class="text-lg">当前步骤：{{ dialog4.step + 1 }} / 3</p>
      </div>
      <template #footer>
        <div class="flex justify-between w-full">
          <el-button v-if="dialog4.step > 0" @click="dialog4.step--"> 上一步 </el-button>
          <div class="flex-1"></div>
          <el-button @click="dialog4.visible = false">取消</el-button>
          <el-button v-if="dialog4.step < 2" type="primary" @click="dialog4.step++">
            下一步
          </el-button>
          <el-button v-else type="primary" @click="handleDialog4Finish"> 完成 </el-button>
        </div>
      </template>
    </ProDialog>

    <!-- 5. 全屏弹窗 -->
    <ProDialog
      v-model="dialog5.visible"
      title="全屏弹窗"
      :fullscreen="true"
      @confirm="dialog5.visible = false"
    >
      <div class="h-full flex items-center justify-center">
        <div class="text-center">
          <el-icon class="text-6xl text-primary mb-4"><FullScreen /></el-icon>
          <p class="text-xl">这是一个全屏弹窗</p>
          <p class="text-gray-500 mt-2">适合展示大量内容或复杂表单</p>
        </div>
      </div>
    </ProDialog>

    <!-- 6. 大尺寸弹窗 -->
    <ProDialog
      v-model="dialog6.visible"
      title="大尺寸弹窗"
      width="80%"
      @confirm="dialog6.visible = false"
    >
      <div class="py-8 text-center">
        <p class="text-lg">这是一个宽度为 80% 的弹窗</p>
        <p class="text-gray-500 mt-2">可以根据需要自定义宽度</p>
      </div>
    </ProDialog>

    <!-- 用户表单弹窗 -->
    <ProDialog
      v-model="userDialog.visible"
      :title="userDialog.title"
      :loading="userDialog.loading"
      @confirm="handleUserSubmit"
      @cancel="handleUserCancel"
    >
      <el-form
        ref="userFormRef"
        :model="userDialog.form"
        :rules="userDialog.rules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userDialog.form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userDialog.form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userDialog.form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="userDialog.form.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </ProDialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { WarningFilled, FullScreen } from '@element-plus/icons-vue'
import ProDialog from '@/components/ProDialog/index.vue'

// 弹窗1：标准表单
const dialog1 = reactive({
  visible: false,
  loading: false,
  form: {
    username: '',
    email: '',
    phone: ''
  }
})

const handleDialog1Confirm = async () => {
  dialog1.loading = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  dialog1.loading = false
  dialog1.visible = false
  ElMessage.success('保存成功')
}

// 弹窗2：只读
const dialog2 = reactive({
  visible: false
})

// 弹窗3：确认提示
const dialog3 = reactive({
  visible: false
})

const handleDialog3Confirm = () => {
  dialog3.visible = false
  ElMessage.success('删除成功')
}

// 弹窗4：自定义底部
const dialog4 = reactive({
  visible: false,
  step: 0
})

const handleDialog4Finish = () => {
  dialog4.visible = false
  dialog4.step = 0
  ElMessage.success('操作完成')
}

// 弹窗5：全屏
const dialog5 = reactive({
  visible: false
})

// 弹窗6：大尺寸
const dialog6 = reactive({
  visible: false
})

// 用户表单弹窗
const userFormRef = ref()
const userDialog = reactive({
  visible: false,
  loading: false,
  title: '新增用户',
  form: {
    username: '',
    email: '',
    phone: '',
    status: 1
  },
  rules: {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
    ],
    phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
  }
})

const handleAddUser = () => {
  userDialog.title = '新增用户'
  userDialog.form = { username: '', email: '', phone: '', status: 1 }
  userDialog.visible = true
}

const handleEditUser = () => {
  userDialog.title = '编辑用户'
  userDialog.form = {
    username: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    status: 1
  }
  userDialog.visible = true
}

const handleUserSubmit = async () => {
  try {
    await userFormRef.value.validate()
    userDialog.loading = true
    await new Promise(resolve => setTimeout(resolve, 1000))
    userDialog.loading = false
    userDialog.visible = false
    ElMessage.success('保存成功')
  } catch {
    ElMessage.warning('请填写完整信息')
  }
}

const handleUserCancel = () => {
  userFormRef.value?.resetFields()
}

// 使用示例代码
const usageCode = `<ProDialog
  v-model="visible"
  title="编辑用户"
  :loading="loading"
  @confirm="handleConfirm"
>
  <el-form :model="form">
    <el-form-item label="用户名">
      <el-input v-model="form.username" />
    </el-form-item>
  </el-form>
</ProDialog>`
</script>

<style scoped lang="scss">
.dialog-demo {
  width: 100%;
}
</style>
