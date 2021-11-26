import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // 字符串简写方式
      '/taskman': 'http://106.52.160.142:19090/',
      // 选项写法
      '/capacity': {
        target: 'http://106.52.160.142:39096/', // 所要代理的目标地址
        changeOrigin: true,  // true/false, Default: false - changes the origin of the host header to the target URL
      }
    }
  }
})
