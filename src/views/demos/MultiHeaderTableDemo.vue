<template>
  <div class="multi-header-table-demo">
    <el-card header="多表头示例">
      <ProTable :columns="columns" :data="tableData" :show-pagination="false" :show-index="true">
        <template #status="{ row }">
          <el-tag :type="row.status === '在职' ? 'success' : 'info'">
            {{ row.status }}
          </el-tag>
        </template>
      </ProTable>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProTable from '@/components/ProTable/index.vue'
import type { TableColumn } from '@/components/ProTable/index.vue'

// 多表头配置（支持任意层级嵌套）
const columns = ref<TableColumn[]>([
  {
    label: '基本信息',
    align: 'center',
    children: [
      {
        prop: 'name',
        label: '姓名',
        width: 120
      },
      {
        prop: 'age',
        label: '年龄',
        width: 80,
        align: 'center'
      },
      {
        prop: 'gender',
        label: '性别',
        width: 80,
        align: 'center'
      }
    ]
  },
  {
    label: '联系方式',
    align: 'center',
    children: [
      {
        prop: 'phone',
        label: '电话',
        width: 140
      },
      {
        prop: 'email',
        label: '邮箱',
        minWidth: 180
      }
    ]
  },
  {
    label: '工作信息',
    align: 'center',
    children: [
      {
        label: '部门信息',
        align: 'center',
        children: [
          {
            prop: 'department',
            label: '部门',
            width: 120
          },
          {
            prop: 'position',
            label: '职位',
            width: 140
          }
        ]
      },
      {
        label: '薪资信息',
        align: 'center',
        children: [
          {
            prop: 'salary',
            label: '基本工资',
            width: 120,
            align: 'right',
            formatter: row => `¥${row.salary.toLocaleString()}`
          },
          {
            prop: 'bonus',
            label: '绩效奖金',
            width: 120,
            align: 'right',
            formatter: row => `¥${row.bonus.toLocaleString()}`
          }
        ]
      },
      {
        prop: 'status',
        label: '状态',
        width: 100,
        align: 'center',
        slot: 'status'
      }
    ]
  }
])

const tableData = ref([
  {
    name: '张三',
    age: 28,
    gender: '男',
    phone: '13800138000',
    email: 'zhangsan@example.com',
    department: '技术部',
    position: '前端工程师',
    salary: 15000,
    bonus: 5000,
    status: '在职'
  },
  {
    name: '李四',
    age: 32,
    gender: '女',
    phone: '13800138001',
    email: 'lisi@example.com',
    department: '产品部',
    position: '产品经理',
    salary: 18000,
    bonus: 8000,
    status: '在职'
  },
  {
    name: '王五',
    age: 26,
    gender: '男',
    phone: '13800138002',
    email: 'wangwu@example.com',
    department: '技术部',
    position: '后端工程师',
    salary: 16000,
    bonus: 6000,
    status: '离职'
  },
  {
    name: '赵六',
    age: 30,
    gender: '女',
    phone: '13800138003',
    email: 'zhaoliu@example.com',
    department: '设计部',
    position: 'UI设计师',
    salary: 14000,
    bonus: 4000,
    status: '在职'
  },
  {
    name: '孙七',
    age: 35,
    gender: '男',
    phone: '13800138004',
    email: 'sunqi@example.com',
    department: '技术部',
    position: '架构师',
    salary: 25000,
    bonus: 12000,
    status: '在职'
  }
])
</script>

<style scoped lang="scss">
.multi-header-table-demo {
  padding: 20px;
}
</style>
