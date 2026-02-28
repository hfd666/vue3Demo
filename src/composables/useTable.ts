/**
 * 表格数据管理 Hook
 * 统一管理表格的查询、分页、加载状态等逻辑
 */

import { ref, reactive, onMounted } from 'vue'
import type { Ref } from 'vue'

export interface Pagination {
  current: number
  pageSize: number
  total: number
}

export interface TableParams {
  page?: number
  pageSize?: number
  [key: string]: any
}

export interface UseTableOptions<T = any> {
  immediate?: boolean // 是否立即加载数据，默认 true
  defaultPageSize?: number // 默认每页条数，默认 10
  onSuccess?: (data: T[]) => void // 请求成功回调
  onError?: (error: any) => void // 请求失败回调
}

export interface UseTableReturn<T = any, P = any> {
  // 状态
  searchParams: P
  tableData: Ref<T[]>
  loading: Ref<boolean>
  pagination: Pagination

  // 方法
  search: () => Promise<void>
  reset: () => void
  handleSearch: () => Promise<void>
  handleReset: () => void
  handlePageChange: (page: number) => Promise<void>
  handleSizeChange: (size: number) => Promise<void>
}

/**
 * 表格数据管理 Hook
 * @param apiFn API 请求函数
 * @param initParams 初始查询参数
 * @param options 配置选项
 */
export function useTable<T = any, P extends Record<string, any> = any>(
  apiFn: (params: TableParams) => Promise<{ list: T[]; total: number }>,
  initParams: P = {} as P,
  options: UseTableOptions<T> = {}
): UseTableReturn<T, P> {
  const { immediate = true, defaultPageSize = 10, onSuccess, onError } = options

  // 查询参数
  const searchParams = reactive<P>({ ...initParams })

  // 初始查询参数备份（用于重置）
  const initialParams = { ...initParams }

  // 表格数据
  const tableData = ref<T[]>([]) as Ref<T[]>

  // 加载状态
  const loading = ref(false)

  // 分页信息
  const pagination = reactive<Pagination>({
    current: 1,
    pageSize: defaultPageSize,
    total: 0
  })

  /**
   * 加载表格数据
   */
  const loadData = async () => {
    loading.value = true

    try {
      const params: TableParams = {
        ...searchParams,
        page: pagination.current,
        pageSize: pagination.pageSize
      }

      const result = await apiFn(params)

      tableData.value = result.list || []
      pagination.total = result.total || 0

      onSuccess?.(tableData.value)
    } catch (error) {
      console.error('加载表格数据失败:', error)
      tableData.value = []
      pagination.total = 0
      onError?.(error)
    } finally {
      loading.value = false
    }
  }

  /**
   * 搜索（重置到第一页）
   */
  const search = async () => {
    pagination.current = 1
    await loadData()
  }

  /**
   * 重置查询条件
   */
  const reset = () => {
    // 重置查询参数
    Object.keys(searchParams).forEach(key => {
      searchParams[key] = initialParams[key]
    })

    // 重置分页
    pagination.current = 1

    // 重新加载数据
    loadData()
  }

  /**
   * 页码改变
   */
  const handlePageChange = async (page: number) => {
    pagination.current = page
    await loadData()
  }

  /**
   * 每页条数改变
   */
  const handleSizeChange = async (size: number) => {
    pagination.pageSize = size
    pagination.current = 1
    await loadData()
  }

  // 组件挂载时自动加载数据
  if (immediate) {
    onMounted(() => {
      loadData()
    })
  }

  return {
    searchParams: searchParams as P,
    tableData,
    loading,
    pagination,
    search,
    reset,
    handleSearch: search,
    handleReset: reset,
    handlePageChange,
    handleSizeChange
  }
}
