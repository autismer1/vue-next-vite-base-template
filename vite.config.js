import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
import styleImport, { VantResolve } from 'vite-plugin-style-import'
// import legacyPlugin from '@vitejs/plugin-legacy'
import path from 'path'
const resolve = (dir) => path.join(__dirname, dir)
const isProduction = process.env.NODE_ENV === 'production'

// 环境变量
const config = loadEnv(process.env.NODE_ENV, process.cwd())

export default defineConfig({
  base: isProduction ? './' : '',
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': resolve('src'),
      components: resolve('src/components'),
      views: resolve('src/views'),
      utils: resolve('src/utils'),
      api: resolve('src/api'),
      icons: resolve('src/icons')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@import "@/assets/scss/variable.scss";@import "@/assets/scss/mixin.scss";'
      }
    }
  },
  server: {
    open: true,
    host: '0.0.0.0',
    port: 56438,
    cors: true,
    force: true,
    proxy: {
      '/api': {
        target: config.VITE_VUE_APP_BASE_API,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    minify: 'terser',
    assetsDir: 'static',
    outDir: `./dist`,
    brotliSize: true,
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[hash].js',
        entryFileNames: 'static/js/[hash].js',
        assetFileNames: 'static/[ext]/[hash].[ext]'
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  ssr: false,
  plugins: [
    vue(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    }),
    styleImport({
      resolves: [VantResolve()]
    })
    // 为打包后的文件提供传统浏览器兼容性支持
    // legacyPlugin({
    //   targets: ['chrome 52'], // 需要兼容的目标列表，可以设置多个
    //   additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 面向IE11时需要此插件
    // })
  ]
})
