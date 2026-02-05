/**
 * 侧边栏菜单 Composable
 * 从路由配置中生成菜单数据和逻辑
 */

import { useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { MenuItem } from '@/types'

export function useSidebarMenus() {
  const router = useRouter()

  /**
   * 将路由配置转换为菜单项
   */
  const routeToMenuItem = (route: RouteRecordRaw, parentPath = ''): MenuItem | null => {
    // 跳过隐藏的路由
    if (route.meta?.hidden) {
      return null
    }

    // 构建完整路径
    let fullPath: string
    if (route.path.startsWith('/')) {
      // 绝对路径
      fullPath = route.path
    } else {
      // 相对路径，需要拼接父路径
      fullPath = parentPath ? `${parentPath}/${route.path}` : `/${route.path}`
    }

    // 规范化路径，移除多余的斜杠
    fullPath = fullPath.replace(/\/+/g, '/')

    const menuItem: MenuItem = {
      path: fullPath,
      title: (route.meta?.title as string) || route.name?.toString() || route.path,
      icon: route.meta?.icon,
      permission: route.meta?.permission as string,
      order: route.meta?.order as number
    }

    // 处理子路由
    if (route.children && route.children.length > 0) {
      const children = route.children
        .map(child => routeToMenuItem(child, fullPath))
        .filter((item): item is MenuItem => item !== null)
        .sort((a, b) => (a.order || 0) - (b.order || 0))

      if (children.length > 0) {
        menuItem.children = children
      }
    }

    return menuItem
  }

  /**
   * 从路由配置生成菜单项
   */
  const generateMenuItems = (): MenuItem[] => {
    // 直接从路由器的原始配置获取顶级路由
    const routes = router.options.routes || []

    return routes
      .filter(route => {
        // 只包含有标题且不隐藏的路由
        return route.meta?.title && !route.meta?.hidden
      })
      .map(route => routeToMenuItem(route))
      .filter((item): item is MenuItem => item !== null)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
  }

  /**
   * 侧边栏菜单项（从路由配置生成）
   */
  const menuItems = computed(() => generateMenuItems())

  /**
   * 根据权限过滤菜单
   */
  const filterMenusByPermission = (menus: MenuItem[], permissions: string[]): MenuItem[] => {
    return menus.filter(menu => {
      // 如果菜单项没有权限要求，则显示
      if (!menu.permission) return true

      // 检查用户是否有对应权限
      const hasPermission = permissions.includes(menu.permission)

      // 如果有子菜单，递归过滤
      if (menu.children && menu.children.length > 0) {
        menu.children = filterMenusByPermission(menu.children, permissions)
        // 如果过滤后没有子菜单，且自身也没有权限，则不显示
        return hasPermission || menu.children.length > 0
      }

      return hasPermission
    })
  }

  /**
   * 获取当前用户可见的菜单
   */
  const getVisibleMenus = (permissions: string[] = []) => {
    return filterMenusByPermission(menuItems.value, permissions)
  }

  /**
   * 根据路径查找菜单项
   */
  const findMenuByPath = (path: string, menus: MenuItem[] = menuItems.value): MenuItem | null => {
    for (const menu of menus) {
      if (menu.path === path) {
        return menu
      }

      if (menu.children && menu.children.length > 0) {
        const found = findMenuByPath(path, menu.children)
        if (found) return found
      }
    }

    return null
  }

  /**
   * 获取菜单的面包屑路径
   */
  const getMenuBreadcrumb = (path: string): MenuItem[] => {
    const breadcrumb: MenuItem[] = []

    const findPath = (targetPath: string, menus: MenuItem[], parents: MenuItem[] = []): boolean => {
      for (const menu of menus) {
        const currentPath = [...parents, menu]

        if (menu.path === targetPath) {
          breadcrumb.push(...currentPath)
          return true
        }

        if (menu.children && menu.children.length > 0) {
          if (findPath(targetPath, menu.children, currentPath)) {
            return true
          }
        }
      }

      return false
    }

    findPath(path, menuItems.value)
    return breadcrumb
  }

  /**
   * 根据路由名称获取菜单项
   */
  const findMenuByName = (name: string): MenuItem | null => {
    const route = router.resolve({ name })
    return findMenuByPath(route.path)
  }

  return {
    menuItems: menuItems,
    getVisibleMenus,
    findMenuByPath,
    findMenuByName,
    getMenuBreadcrumb
  }
}
