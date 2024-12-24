import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  server: {
    host: 'store.onlycorn.com',
    port: 5174,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import "@/assets/base.css";`
      }
    }
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg', '@/assets/*.png'], // include your image formats here

})
