/**
 * 环境相关工具函数
 * Environment-related Utility Functions
 */

import type { EnvironmentInfo } from '@/types'

/**
 * 获取环境信息
 * Get Environment Information
 */
export const getEnvironmentInfo = (): EnvironmentInfo => {
  return {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
    appTitle: import.meta.env.VITE_APP_TITLE || '',
    mode: import.meta.env.MODE || 'development',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    buildTime: import.meta.env.VITE_BUILD_TIME || new Date().toISOString()
  }
}

/**
 * 检查是否为开发环境
 * Check if it's development environment
 */
export const isDevelopment = (): boolean => {
  return import.meta.env.DEV
}

/**
 * 检查是否为生产环境
 * Check if it's production environment
 */
export const isProduction = (): boolean => {
  return import.meta.env.PROD
}

/**
 * 获取当前环境名称
 * Get current environment name
 */
export const getCurrentEnvironment = (): string => {
  return import.meta.env.MODE
}

/**
 * 验证必需的环境变量
 * Validate required environment variables
 */
export const validateRequiredEnvVars = (requiredVars: string[]): string[] => {
  const missingVars = requiredVars.filter(varName => {
    const value = import.meta.env[varName]
    return !value || value === ''
  })

  return missingVars
}

/**
 * 获取环境变量值
 * Get environment variable value
 */
export const getEnvVar = (key: string, defaultValue: string = ''): string => {
  return import.meta.env[key] || defaultValue
}
