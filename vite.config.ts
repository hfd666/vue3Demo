import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      AutoImport({
        imports: ['vue', 'vue-router'],
        resolvers: [
          ElementPlusResolver({
            // 不自动导入样式，我们在 main.scss 中手动导入
            importStyle: false
          })
        ],
        dts: 'src/types/auto-imports.d.ts'
      }),
      // 自动导入 Element Plus 组件（仅限第三方组件库）
      Components({
        resolvers: [
          ElementPlusResolver({
            // 不自动导入样式，我们在 main.scss 中手动导入
            importStyle: false
          })
        ],
        dts: 'src/types/components.d.ts',
        // 只包含第三方组件库，排除自定义组件
        globs: [],
        // 或者可以使用 dirs 配置为空数组来禁用目录扫描
        dirs: []
      })
    ],

    // 路径别名配置
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },

    // 开发服务器配置
    server: {
      port: 3000,
      host: true,
      open: true,
      cors: true,
      // 代理配置（可选）
      proxy: {
        '^/api': {
          target: env.VITE_API_BASE_URL,
          ws: true,
          changeOrigin: true
        }
      }
    },

    // 构建配置
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      // 生产环境移除 console
      minify: 'terser' as const,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      // 分块策略
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          manualChunks: {
            // 将 Vue 相关库打包到一起
            vue: ['vue', 'vue-router'],
            // 将 Element Plus 单独打包
            'element-plus': ['element-plus'],
            // 将 axios 单独打包
            axios: ['axios']
          }
        }
      },
      // 设置打包大小警告阈值
      chunkSizeWarningLimit: 1000
    },

    // CSS 配置
    css: {
      preprocessorOptions: {
        scss: {
          // 使用现代 Sass API 以避免 legacy-js-api 弃用警告
          api: 'modern-compiler',
          // 静默弃用警告（可选）
          silenceDeprecations: ['legacy-js-api']
        }
      }
    }
  }
})
