/**
 * 布局状态管理
 * 管理侧边栏、面包屑等布局相关状态
 */

import { defineStore } from 'pinia'

/**
 * 布局状态接口
 */
interface LayoutState {
  /** 是否显示侧边栏 */
  showSidebar: boolean
  /** 侧边栏是否折叠 */
  sidebarCollapsed: boolean
  /** 是否显示面包屑 */
  showBreadcrumb: boolean
  /** 是否固定头部 */
  fixedHeader: boolean
  /** 主题模式 */
  theme: 'light' | 'dark'
}

export const useLayoutStore = defineStore('layout', {
  state: (): LayoutState => ({
    showSidebar: true,
    sidebarCollapsed: false,
    showBreadcrumb: true,
    fixedHeader: true,
    theme: 'light'
  }),

  getters: {
    /**
     * 获取侧边栏宽度
     */
    sidebarWidth: (state): string => {
      if (!state.showSidebar) return '0px'
      return state.sidebarCollapsed ? '64px' : '240px'
    }
  },

  actions: {
    /**
     * 切换侧边栏显示/隐藏
     */
    toggleSidebar() {
      this.showSidebar = !this.showSidebar
    },

    /**
     * 切换侧边栏折叠状态
     */
    toggleSidebarCollapse() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },

    /**
     * 设置侧边栏折叠状态
     */
    setSidebarCollapsed(collapsed: boolean) {
      this.sidebarCollapsed = collapsed
    },

    /**
     * 切换面包屑显示/隐藏
     */
    toggleBreadcrumb() {
      this.showBreadcrumb = !this.showBreadcrumb
    },

    /**
     * 设置主题模式
     */
    setTheme(theme: 'light' | 'dark') {
      this.theme = theme
      // 这里可以添加主题切换逻辑
      document.documentElement.setAttribute('data-theme', theme)
    },

    /**
     * 初始化布局设置
     * 从本地存储恢复设置
     */
    initLayout() {
      const savedSettings = localStorage.getItem('layout-settings')
      if (savedSettings) {
        try {
          const settings = JSON.parse(savedSettings)
          Object.assign(this.$state, settings)
        } catch (error) {
          console.warn('Failed to parse layout settings from localStorage:', error)
        }
      }
    },

    /**
     * 保存布局设置到本地存储
     */
    saveLayout() {
      localStorage.setItem('layout-settings', JSON.stringify(this.$state))
    }
  }
})
