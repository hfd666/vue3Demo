/**
 * Element Plus 类型声明
 * 解决 TypeScript 模块解析问题
 */

// 声明 element-plus 模块
declare module 'element-plus' {
  export * from 'element-plus/es'
  export { default } from 'element-plus/es'
}

// 声明 element-plus/es 模块
declare module 'element-plus/es' {
  // Message 组件类型
  export interface MessageOptions {
    message: string
    type?: 'success' | 'warning' | 'info' | 'error'
    duration?: number
    showClose?: boolean
    center?: boolean
    onClose?: () => void
  }

  export interface MessageHandler {
    close(): void
  }

  export interface ElMessageType {
    (options: string | MessageOptions): MessageHandler
    success(message: string): MessageHandler
    warning(message: string): MessageHandler
    info(message: string): MessageHandler
    error(message: string): MessageHandler
  }

  // Notification 组件类型
  export interface NotificationOptions {
    title: string
    message?: string
    type?: 'success' | 'warning' | 'info' | 'error'
    duration?: number
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
    showClose?: boolean
    onClick?: () => void
    onClose?: () => void
  }

  export interface NotificationHandler {
    close(): void
  }

  export interface ElNotificationType {
    (options: NotificationOptions): NotificationHandler
    success(options: NotificationOptions): NotificationHandler
    warning(options: NotificationOptions): NotificationHandler
    info(options: NotificationOptions): NotificationHandler
    error(options: NotificationOptions): NotificationHandler
  }

  // MessageBox 组件类型
  export interface MessageBoxOptions {
    title?: string
    message?: string
    type?: 'success' | 'warning' | 'info' | 'error'
    confirmButtonText?: string
    cancelButtonText?: string
    showCancelButton?: boolean
    showConfirmButton?: boolean
    beforeClose?: (action: string, instance: any, done: () => void) => void
    callback?: (action: string) => void
  }

  export interface ElMessageBoxType {
    (message: string, title?: string, options?: MessageBoxOptions): Promise<string>
    alert(message: string, title?: string, options?: MessageBoxOptions): Promise<string>
    confirm(message: string, title?: string, options?: MessageBoxOptions): Promise<string>
    prompt(
      message: string,
      title?: string,
      options?: MessageBoxOptions
    ): Promise<{ value: string; action: string }>
  }

  // 导出具体的组件
  export const ElMessage: ElMessageType
  export const ElMessageBox: ElMessageBoxType
  export const ElNotification: ElNotificationType

  // 导出所有 Element Plus 组件
  export const ElButton: any
  export const ElInput: any
  export const ElCard: any
  export const ElTable: any
  export const ElTableColumn: any
  export const ElAlert: any
  export const ElAvatar: any
  export const ElDivider: any
  export const ElEmpty: any
  export const ElIcon: any
  export const ElStep: any
  export const ElSteps: any
  export const ElTabPane: any
  export const ElTabs: any
  export const ElTag: any

  // 默认导出
  const ElementPlus: any
  export default ElementPlus
}
