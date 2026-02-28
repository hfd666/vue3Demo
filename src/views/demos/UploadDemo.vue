<template>
  <div class="upload-demo p-6">
    <el-card>
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-lg font-semibold">ProUpload 上传组件示例</span>
          <el-tag type="success">推荐使用</el-tag>
        </div>
      </template>

      <div class="space-y-8">
        <!-- 图片上传 -->
        <div>
          <h3 class="text-base font-semibold mb-3">图片上传</h3>
          <el-form :model="form" label-width="120px">
            <el-form-item label="单图上传">
              <ProUpload v-model="form.avatar" type="image" :max-size="5" />
              <div class="text-sm text-gray-500 mt-2">
                当前值: {{ form.avatar.url || '(未上传)' }}
                <span v-if="form.avatar.name"> - {{ form.avatar.name }}</span>
              </div>
            </el-form-item>

            <el-form-item label="多图上传">
              <ProUpload
                v-model="form.images"
                type="image"
                :limit="5"
                :max-size="5"
                tip="最多上传5张图片，每张不超过5MB"
              />
              <div class="text-sm text-gray-500 mt-2">当前值: {{ form.images.length }} 张图片</div>
            </el-form-item>

            <el-form-item label="查看模式">
              <ProUpload v-model="form.avatar" type="image" disabled />
              <div class="text-sm text-gray-500 mt-2">disabled 状态，只能查看不能操作</div>
            </el-form-item>
          </el-form>
        </div>

        <el-divider />

        <!-- 文件上传 -->
        <div>
          <h3 class="text-base font-semibold mb-3">文件上传</h3>
          <el-form :model="form" label-width="120px">
            <el-form-item label="单文件上传">
              <ProUpload
                v-model="form.file"
                accept=".pdf,.doc,.docx"
                tip="支持 PDF、Word 格式，不超过10MB"
              />
              <div class="text-sm text-gray-500 mt-2">
                当前值: {{ form.file.url || '(未上传)' }}
                <span v-if="form.file.name"> - {{ form.file.name }}</span>
              </div>
            </el-form-item>

            <el-form-item label="多文件上传">
              <ProUpload
                v-model="form.files"
                :limit="10"
                :max-size="20"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.zip"
                tip="支持常见文档格式，单个文件不超过20MB"
              />
              <div class="text-sm text-gray-500 mt-2">当前值: {{ form.files.length }} 个文件</div>
            </el-form-item>
          </el-form>
        </div>

        <el-divider />

        <!-- 操作按钮 -->
        <div class="flex gap-3">
          <el-button type="primary" @click="handleSubmit"> 提交表单 </el-button>
          <el-button @click="handleReset"> 重置 </el-button>
          <el-button @click="handleFillDemo"> 填充示例数据 </el-button>
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
            <li>统一组件：图片和文件上传用同一个组件</li>
            <li>自动校验：文件类型和大小自动校验</li>
            <li>图片预览：图片类型自动支持预览</li>
            <li>查看模式：disabled 状态只展示不能操作</li>
            <li>单/多文件：通过 limit 控制上传数量</li>
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
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import ProUpload from '@/components/ProUpload/index.vue'

const form = reactive({
  avatar: { url: '', name: '' },
  images: [] as { url: string; name: string }[],
  file: { url: '', name: '' },
  files: [] as { url: string; name: string }[]
})

const handleSubmit = () => {
  console.log('表单数据:', form)
  ElMessage.success('提交成功')
}

const handleReset = () => {
  form.avatar = { url: '', name: '' }
  form.images = []
  form.file = { url: '', name: '' }
  form.files = []
  ElMessage.info('已重置')
}

const handleFillDemo = () => {
  form.avatar = { url: 'https://via.placeholder.com/150', name: '头像.jpg' }
  form.images = [
    { url: 'https://via.placeholder.com/150/FF0000', name: '红色图片.jpg' },
    { url: 'https://via.placeholder.com/150/00FF00', name: '绿色图片.jpg' },
    { url: 'https://via.placeholder.com/150/0000FF', name: '蓝色图片.jpg' }
  ]
  form.file = { url: 'https://example.com/document.pdf', name: '文档.pdf' }
  form.files = [
    { url: 'https://example.com/file1.pdf', name: '文件1.pdf' },
    { url: 'https://example.com/file2.docx', name: '文件2.docx' }
  ]
  ElMessage.success('已填充示例数据')
}

const usageCode = `<!-- 单图上传 -->
<ProUpload v-model="form.avatar" type="image" />
<!-- form.avatar = { url: "https://...", name: "照片.jpg" } -->

<!-- 多图上传 -->
<ProUpload v-model="form.images" type="image" :limit="5" />
<!-- form.images = [
  { url: "https://...", name: "照片1.jpg" },
  { url: "https://...", name: "照片2.jpg" }
] -->

<!-- 文件上传 -->
<ProUpload v-model="form.file" accept=".pdf,.doc" />

<!-- 查看模式 -->
<ProUpload v-model="form.avatar" type="image" disabled />`
</script>

<style scoped lang="scss">
.upload-demo {
  width: 100%;
}
</style>
