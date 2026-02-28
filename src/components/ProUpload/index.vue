<template>
  <div class="pro-upload" :class="{ 'hide-upload': shouldHideUpload }">
    <el-upload
      v-model:file-list="fileList"
      :action="uploadUrl"
      :headers="uploadHeaders"
      :data="uploadData"
      :limit="limit"
      :disabled="disabled"
      :accept="computedAccept"
      :list-type="computedListType"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-remove="handleRemove"
      :on-preview="handlePreview"
      :on-exceed="handleExceed"
    >
      <!-- 上传按钮 - 只在文件数量未达到限制时显示 -->
      <template #default>
        <template v-if="fileList.length < limit">
          <el-button v-if="computedListType === 'text'" type="primary">
            <el-icon><Upload /></el-icon>
            选择文件
          </el-button>
          <div v-else class="upload-trigger">
            <el-icon><Plus /></el-icon>
          </div>
        </template>
      </template>

      <!-- 提示文字 -->
      <template v-if="tip" #tip>
        <div class="el-upload__tip">{{ tip }}</div>
      </template>
    </el-upload>

    <!-- 调试信息（开发环境） -->
    <div v-if="isDev" class="text-xs text-gray-400 mt-2">
      fileList: {{ fileList.length }} / limit: {{ limit }} / shouldHide: {{ shouldHideUpload }}
    </div>

    <!-- 图片预览对话框 -->
    <el-dialog v-model="previewVisible" title="图片预览" width="800px">
      <img :src="previewUrl" style="width: 100%" alt="预览图片" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Upload } from '@element-plus/icons-vue'

interface UploadFile {
  uid: number
  name: string
  url?: string
  status?: string
}

interface UploadRawFile extends File {
  uid: number
}

interface Props {
  modelValue: FileInfo | FileInfo[]
  type?: 'image' | 'file'
  limit?: number
  maxSize?: number
  accept?: string
  disabled?: boolean
  tip?: string
  listType?: 'text' | 'picture' | 'picture-card'
}

interface FileInfo {
  url: string
  name: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'file',
  limit: 1,
  maxSize: 10,
  accept: '',
  disabled: false,
  tip: '',
  listType: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: FileInfo | FileInfo[]]
}>()

// 上传配置
const uploadUrl = computed(() => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || '/api'
  return `${baseUrl}/api/file/type`
})

const uploadHeaders = computed(() => {
  const token = localStorage.getItem('auth_token')

  // config.headers[

  return token ? { Authorization: token, 'Project-Id': '56', 'Project-Status': 'review' } : {}
})

// 上传时附加的额外数据
const uploadData = computed(() => {
  return {
    type: 'image' //props.type === 'image' ? 'image' : 'file'
  }
})

// 自动推断 listType
const computedListType = computed(() => {
  if (props.listType) return props.listType
  return props.type === 'image' ? 'picture-card' : 'text'
})

// 自动推断 accept
const computedAccept = computed(() => {
  if (props.accept) return props.accept
  return props.type === 'image' ? 'image/*' : '*'
})

// 文件列表
const fileList = ref<UploadFile[]>([])

// 是否应该隐藏上传按钮
const shouldHideUpload = computed(() => {
  return fileList.value.length >= props.limit
})

// 是否开发环境
const isDev = import.meta.env.DEV

// 初始化文件列表
watch(
  () => props.modelValue,
  newVal => {
    // 将新值转换为 UploadFile 数组
    let newFiles: UploadFile[] = []

    if (newVal) {
      const values = Array.isArray(newVal) ? newVal : [newVal]
      newFiles = values
        .filter(item => item && item.url) // 过滤掉空对象
        .map((item, index) => ({
          uid: Date.now() + index,
          name: item.name || item.url.split('/').pop() || `file-${index}`,
          url: item.url,
          status: 'success'
        }))
    }

    // 获取当前 fileList 的 URL 数组
    const currentUrls = fileList.value.map(f => f.url).filter(Boolean)
    const newUrls = newFiles.map(f => f.url).filter(Boolean)

    // 比较 URL 数组是否相同
    if (JSON.stringify(newUrls) !== JSON.stringify(currentUrls)) {
      fileList.value = newFiles
    }
  },
  { immediate: true }
)

// 上传前校验
const beforeUpload = (rawFile: UploadRawFile) => {
  // 校验文件类型
  if (props.type === 'image') {
    const isImage = rawFile.type.startsWith('image/')
    if (!isImage) {
      ElMessage.error('只能上传图片文件！')
      return false
    }
  }

  // 校验文件大小
  const isLtSize = rawFile.size / 1024 / 1024 < props.maxSize
  if (!isLtSize) {
    ElMessage.error(`文件大小不能超过 ${props.maxSize}MB！`)
    return false
  }

  return true
}

// 上传成功
const handleSuccess = (response: Record<string, any>, uploadFile: UploadFile) => {
  if (response.code === 200 || response.code === 0) {
    uploadFile.url = response.data?.url || response.data
    // 保持原始文件名（uploadFile.name 已经是用户选择的文件名）
    ElMessage.success('上传成功')
    updateValue()
  } else {
    ElMessage.error(response.message || '上传失败')
    // 移除失败的文件
    const index = fileList.value.findIndex((f: UploadFile) => f.uid === uploadFile.uid)
    if (index > -1) {
      fileList.value.splice(index, 1)
    }
  }
}

// 上传失败
const handleError = (error: Error) => {
  console.error('上传失败:', error)
  ElMessage.error('上传失败，请重试')
}

// 删除文件
const handleRemove = (uploadFile: UploadFile) => {
  console.log('删除前 fileList 长度:', fileList.value.length)
  console.log('被删除的文件:', uploadFile.name)

  // Element Plus 会自动从 fileList 中移除
  // 使用 nextTick 确保 fileList 已经被更新
  nextTick(() => {
    console.log('删除后 fileList 长度:', fileList.value.length)
    updateValue()
  })
}

// 超出数量限制
const handleExceed = () => {
  ElMessage.warning(`最多只能上传 ${props.limit} 个文件`)
}

// 更新 v-model
const updateValue = () => {
  const files = fileList.value.filter((file: UploadFile) => file.status === 'success' && file.url)

  // 统一返回对象格式：{ url, name }
  const fileInfos = files.map((file: UploadFile) => ({
    url: file.url as string,
    name: file.name
  }))

  if (props.limit === 1) {
    emit('update:modelValue', fileInfos[0] || { url: '', name: '' })
  } else {
    emit('update:modelValue', fileInfos)
  }
}

// 图片预览
const previewVisible = ref(false)
const previewUrl = ref('')

const handlePreview = (uploadFile: Record<string, any>) => {
  if (props.type === 'image' && uploadFile.url) {
    previewUrl.value = uploadFile.url
    previewVisible.value = true
  } else if (uploadFile.url) {
    // 文件类型直接下载
    window.open(uploadFile.url, '_blank')
  }
}
</script>

<style scoped lang="scss">
.pro-upload {
  .upload-trigger {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    transition: var(--el-transition-duration-fast);

    &:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon {
      font-size: 28px;
      color: var(--el-text-color-secondary);
    }
  }

  // 当达到上传限制时，强制隐藏上传按钮
  &.hide-upload {
    :deep(.el-upload--picture-card) {
      display: none !important;
    }

    :deep(.el-upload) {
      display: none !important;
    }
  }
}
</style>
